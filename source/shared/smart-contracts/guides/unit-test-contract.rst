.. _unit-test-contract:

============================
Unit test a contract in Rust
============================

.. contents::
   :local:
   :backlinks: none

This guide will show you how to write unit tests for a smart contract written in
Rust.
For testing a smart contract Wasm module, see :ref:`local-simulate`.

A smart contract in Rust is written as a library and we can unit test it like a
library by annotating functions with a ``#[test]`` attribute.

.. code-block:: rust

    // contract code
    ...

    #[cfg(test)]
    mod test {

        #[test]
        fn some_test() { ... }

        #[test]
        fn another_test() { ... }
    }

Running the test can be done using ``cargo``:

.. code-block:: console

   $cargo test

By default, this command compiles the contract and tests to machine code for
your local target (most likely ``x86_64``), and runs them.
This kind of testing can be useful in initial development and for testing
functional correctness.
For comprehensive testing, it is important to involve the target platform, i.e.,
`Wasm32`.

.. _tests_in_wasm:

Running tests in Wasm
=====================

Compiling the tests to native machine code is sufficient for most cases, but it
is also possible to compile the tests to Wasm and run them using the exact
interpreter that is used by the nodes.
This makes the test environment closer to the run environment on-chain and could
in some cases catch more bugs.
One notable difference between different environments is regarding the size of
pointers, where `Wasm32` uses four bytes as opposed to eight, which is common
for most platforms.

The development tool ``cargo-concordium`` includes a test runner for Wasm, which
uses the same Wasm-interpreter as the one shipped in the Concordium nodes.

.. seealso::

   For a guide of how to install ``cargo-concordium``, see :ref:`setup-tools`.

The unit test have to be annotated with ``#[concordium_test]`` instead of
``#[test]``, and we use ``#[concordium_cfg_test]`` instead of ``#[cfg(test)]``:

.. code-block:: rust

   // contract code
   ...

   #[concordium_cfg_test]
   mod test {

       #[concordium_test]
       fn some_test() { ... }

       #[concordium_test]
       fn another_test() { ... }
   }

The ``#[concordium_test]`` macro sets up our tests to be run in Wasm, when
``concordium-std`` is compiled with the ``wasm-test`` feature, and otherwise
falls back to behave just like ``#[test]``, meaning it is still possible to run
unit tests targeting native code using ``cargo test``.

Similarly the macro ``#[concordium_cfg_test]`` includes our module when build
``concordium-std`` with ``wasm-test`` otherwise behaves like ``#[test]``,
allowing us to control when to include tests in the build.

Tests can now be build and run using:

.. code-block:: console

   $cargo concordium test

This command compiles the tests for Wasm with the ``wasm-test`` feature enabled
for ``concordium-std`` and uses the test runner from ``cargo-concordium``.

.. warning::

   Error messages from ``panic!``, and therefore also the different variations
   of ``assert!``, are *not* shown when compiling to Wasm.

   Instead use ``fail!`` and the ``claim!`` variants to do assertions when
   testing, as these reports back the error messages to the test runner *before*
   failing the test.
   Both are part of ``concordium-std``.

   The remainder of this guide will use the ``claim!`` variants for assertions.

Writing unit tests
==================

Unit tests typically follow a three-part structure in which you: set up some
state, run some unit of code, and make assertions about the state and output of
the code.

If the contract functions are written using ``#[init(..)]`` or
``#[receive(..)]``, we can test these functions directly in the unit test.

.. code-block:: rust

   use concordium_std::*;

   #[init(contract = "my_contract")]
   fn contract_init<S: HasStateApi>(
      ctx: &impl HasInitContext,
      state_builder: &mut StateBuilder<S>,
   ) -> InitResult<State> { ... }

   #[receive(contract = "my_contract", name = "my_receive")]
   fn contract_receive<S: HasStateApi>(
      ctx: &impl HasReceiveContext,
      host: &impl HasHost<State, StateApiType = S>,
   ) -> ReceiveResult<MyReturnValue> { ... }

   #[cfg(test)]
   mod test {
       use super::*;
       use concordium_std::test_infrastructure::*;

       #[test]
       fn some_init_test() {
           // Create a test context.
           let mut ctx = TestInitContext::empty();
           // Set the fields that your init method accesses.
           ctx.set_init_origin(AccountAddress([0; 32]));
           // Create a test state builder.
           let mut state_builder = TestStateBuilder::new();

           // Call the init method.
           let result = contract_init(&ctx, &mut state_builder);

           // Assert properties.
           claim_eq!(result, Ok(State::new()));
       }

       #[test]
       fn some_receive_test() {
           // Create a test context.
           let mut ctx = TestReceiveContext::empty();
           // Set the fields that your receive method accesses.
           ctx.set_self_address(ContractAddress{ index: 0, subindex: 0 });
           // Create a test host with state.
           let host = TestHost::new(State::new(), TestStateBuilder::new());

           // Call the receive method.
           let result = contract_receive(&ctx, &host);

           // Make assertions.
           claim_eq!(result, Ok(MyReturnValue::new()));
           claim_eq!(host.get_transfers(), []); // No transfers occured.
       }
   }


The submodule |test_infrastructure|_ of |concordium_std|_ contains a number of
test stubs, including the ones shown in the example, e.g., ``TestHost`` and ``TestInitContext``.

.. seealso::

   For more information and examples see the crate documentation of
   |concordium_std|_.


.. _testing_contract_invocations:

Testing contract invocations with mocks
=======================================

To test receive methods that invoke contracts with
``host.invoke_contract(...)``, you should set up mocking functions that act as
the invoked contract. The |test_infrastructure|_ has a number of helpers for
mocking contracts.

To set up a mock entrypoint, use the |setup_mock_entrypoint|_ method from |TestHost|_.
It expects a ``ContractAddress`` and an ``OwnedEntrypointName`` to specify which
entrypoint on which contract you are mocking.
It also expects a ``MockFn``, which you can create in several different ways.

The simplest way to create a ``MockFn`` is with ``returning_ok``, which creates
a mock function that returns the same ``Ok(..)`` value every time:

.. code-block:: rust
   :emphasize-lines: 14

   // Contract code + general test setup

   #[test]
   fn mock_test_return_ok() {
       ...
       let mut host = TestHost::new(State::new(), TestStateBuilder::new());

       host.setup_mock_entrypoint(
           ContractAddress {
               index:    1,
               subindex: 0,
           },
           OwnedEntrypointName::new_unchecked("some_receive_method".to_string()),
           MockFn::returning_ok(42u8),
       );
       ...
   }

For returning the same error every time, use the ``returning_err``.
Use this to test missing contracts or entrypoints, as invoking
entrypoints, for which no mock has been set up, results in a runtime error:

.. code-block:: rust
   :emphasize-lines: 8

       ...
       host.setup_mock_entrypoint(
           ContractAddress {
               index:    1,
               subindex: 0,
           },
           OwnedEntrypointName::new_unchecked("some_receive_method".to_string()),
           MockFn::returning_err::<()>(CallContractError::MissingContract),
       );
       ...

.. note::

    The ``returning_err`` method is generic, because
    ``CallContractError<ReturnValueType>`` is generic and can return a value
    with its logic error:

    .. code-block:: rust
       :emphasize-lines: 8-9

           ...
           host.setup_mock_entrypoint(
               ContractAddress {
                   index:    1,
                   subindex: 0,
               },
               OwnedEntrypointName::new_unchecked("some_receive_method".to_string()),
               MockFn::returning_err::<String>(CallContractError::LogicReject{
               reason: -1, return_value: "Something went wrong!".to_string()}),
           );
           ...

For more advanced types of mocks, use ``MockFn::new_v1``, ``MockFn::new_v0``, or
``MockFn::new``.
Each of the which take a closure that has access to the parameter and amount
used in ``invoke_contract(.., parameter, .., amount)``, but also the balance and
state of contract you are testing.
The methods differ in what the closure should return.
V0 contracts do not have a return value, whereas V1 contracts always do.

Here is a example of a mocked entrypoint that only uses the parameter
and amount. For simplicity, it just traps if the input is not as expected:

.. code-block:: rust
   :emphasize-lines: 10-23

       ...
       let mut host = TestHost::new(State::new(), TestStateBuilder::new());

       host.setup_mock_entrypoint(
           ContractAddress {
               index:    1,
               subindex: 0,
           },
           OwnedEntrypointName::new_unchecked("some_receive_method".to_string()),
           MockFn::new_v1(|parameter, amount, _balance, _state: &mut State| {
               let n: u64 = match from_bytes(parameter.0) {
                    Ok(n) => n,
                    Err(_) => return Err(CallContractError::Trap),
               };

               if amount.micro_ccd < 100 {
                   return Err(CallContractError::Trap),
               }

               let state_modified = false; // Mock did not modify the state.

               Ok((state_modified, n + 1))
           }),
       );
       ...

To test contracts that invoke itself, either directly or indirectly (e.g., ``A`` calls
``B`` which then calls ``A``, or with even more indirections), use the
state and balance fields:

.. code-block:: rust
   :emphasize-lines: 2-7, 11-24

       ...
       let mut ctx = TestReceiveContext::empty();
       let self_address = ContractAddress {
           index:    0,
           subindex: 0,
       };
       ctx.set_self_address(self_address);

       let mut host = TestHost::new(State::new(), TestStateBuilder::new());

       // Meant to mock calls to the contract itself, where amounts sent
       // don't leave the contract and each call increments a counter.
       host.setup_mock_entrypoint(
           self_address,
           OwnedEntrypointName::new_unchecked("self_receive".to_string()),
           MockFn::new_v1(|_parameter, amount, balance, state: &mut State| {

               *balance += amount;
               state.counter += 1;

               let state_modified = true; // Mock _did_ modify the state.

               Ok((state_modified, ()))
           }),
       );
       ...

.. warning::

   You should watch out for *reentrancy problems*, which can occur when calls to
   ``invoke_contract`` end up updating the state of your own contract.

   .. code-block:: rust

      let state_copy = *host.state();
      host.invoke_contract(...);

      // *host.state() and state_copy might not be equal any more due to reentrancy.
      do_something_with(state_copy);

Testing transfers
=================

|TestHost|_ has a three helper methods to useful when testing that the correct
``invoke_transfer``'s has occurred.

Use ``transfer_occurred`` to check for specific transfers:

.. code-block:: rust
   :emphasize-lines: 8

   // Contract code + general test setup

   #[test]
   fn test_transfer() {
       ...
       let receiver = AccountAddress([0;32]);
       let amount = Amount::from_ccd(10);
       claim!(host.transfer_occurred(&receiver, amount));
   }

Use ``get_transfers`` to get a sorted list of all transfers that occurred:

.. code-block:: rust
   :emphasize-lines: 4

        let receiver0 = AccountAddress([0;32]);
        let receiver1 = AccountAddress([1;32]);
        let amount = Amount::from_ccd(10);
        claim_eq!(host.get_transfers(), [(receiver0, amount), (receiver1, amount)]);

Use ``get_transfers_to`` to get a sorted list of all transfers to a specific
account:

.. code-block:: rust
   :emphasize-lines: 4

        let receiver0 = AccountAddress([0;32]);
        let amount0 = Amount::from_ccd(10);
        let amount1 = Amount::from_ccd(20);
        claim_eq!(host.get_transfers_to(receiver0), [amount0, amount1]);


.. |test_infrastructure| replace:: ``test_infrastructure``
.. _test_infrastructure: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure
.. |concordium_std| replace:: ``concordium_std``
.. _concordium_std: https://docs.rs/concordium-std/latest/concordium_std
.. _TestHost: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/struct.TestHost.html
.. |TestHost| replace:: ``TestHost``
.. _setup_mock_entrypoint: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/struct.TestHost.html#method.setup_mock_entrypoint
.. |setup_mock_entrypoint| replace:: ``setup_mock_entrypoint``
