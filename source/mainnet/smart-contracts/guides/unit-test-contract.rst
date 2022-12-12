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
This makes the test environment closer to the run environment on-chain and could,
in some cases, catch more bugs.
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
``#[receive(..)]``, you can test these functions directly in the unit test.

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

   For more information and examples, see the crate documentation of
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
entrypoints for which no mock has been set up, results in a runtime error:

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

    The ``returning_err`` method is generic because
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

For more advanced types of mocks, use the functions ``MockFn::new_v1``, ``MockFn::new_v0``, or
``MockFn::new``.
Each of these functions takes a closure that has access to the parameter and amount
used in ``invoke_contract(parameter, amount, ..)``, but also the balance and
state of the contract you are testing.
The methods differ in what the closure should return.
V0 contracts do not have a return value, whereas V1 contracts always do.

Here is an example of a mocked entrypoint that only uses the parameter
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

Testing with state rollbacks
============================

Invocations of smart contracts on the chain are transactional. This means that
if a contract changes its state and then fails, the state is rolled back to how
it was before the invocation.

If you want the same behavior when testing, it is necessary to use a helper
method on the |TestHost|_, namely |with_rollback|_.
To illustrate, here is an example in which the receive function increments the
state and then immediately fails:

.. code-block:: rust
   :emphasize-lines: 23, 25, 35, 37

   type State = u8;

   #[receive(contract = "my_contract", name = "increment", mutable)]
   fn receive<S: HasStateApi>(
       _ctx: &impl HasReceiveContext,
       host: &mut impl HasHost<State, StateApiType = S>,
   ) -> ReceiveResult<()> {
       *host.state_mut() += 1; // Mutate state.
       Err(Reject::default())  // Then fail.
   }

   #[concordium_cfg_test]
   mod tests {
       use super::*;
       use concordium_std::test_infrastructure::*;

       #[test]
       fn test_without_rollback() {
           let state = 0;
           let ctx = TestReceiveContext::empty();
           let mut host = TestHost::new(state, StateBuilder::new());

           let _ = receive(&ctx, &mut host);

           claim_eq!(*host.state(), 0); // FAILS! State wasn't rolled back.
       }

       #[test]
       fn test_with_rollback() {
           let state = 0;
           let ctx = TestReceiveContext::empty();
           let mut host = TestHost::new(state, StateBuilder::new());

           // Use the `with_rollback` method.
           let _ = host.with_rollback(|host| receive(&ctx, host));

           claim_eq!(*host.state(), 0); // Success!
       }
   }

|with_rollback|_ works by creating a clone of the ``State``, invoking the
receive function and, if it failed, rolling back the state.
This means that ``State`` must implement the trait |StateClone|_, which
fortunately is implemented for all |Clone|_ types.
However, it is not possible to implement |Clone|_ correctly for your state if it
includes one of the special state types.

This is how to handle the two scenarios:

- Derive |StateClone|_ for your state (see example below) if it has one or more fields comprised
  of |StateBox|_, |StateSet|_, or |StateMap|_.
- Otherwise, derive |Clone|_ for your ``State``.

Here is an example of how to derive |StateClone|_:

.. code-block:: rust

   #[derive(StateClone)]
   #[concordium(state_parameter = "S")]
   struct State<S> {
     my_state_map: StateMap<SomeType, SomeOtherType, S>,
   }

You can read more about deriving |StateClone|_ on `docs.rs <https://docs.rs/concordium-std-derive/latest/concordium_std_derive/derive.StateClone.html>`_.

.. note::

   The state also needs to be rolled back on errors occuring in mock
   entrypoints, as described in
   :ref:`testing_contract_invocations`, but that is handled by the test
   framework itself. This means that mock entrypoints are handled
   transactionally, even without the use of |with_rollback|_.

Testing transfers
=================

|TestHost|_ has three helper methods that are useful when testing that the correct
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

.. _writing_property_based_tests:

Writing property-based tests
============================

The property-based testing technique allows for testing statements about your code that are expected to be true for any input parameters.
The input to such tests is generated randomly.
Property-based testing is supported using the |QuickCheck|_ crate.
The tests should be placed in the same module as regular unit tests and annotated with the ``#[concordium_quickcheck]`` macro.
The return value of the function should be a boolean corresponding to whether the property holds.

To get started, add the ``concordium-quickcheck`` feature to ``concordium-std`` as a ``dev``-dependency in ``Cargo.toml``:

.. code-block::

    ...

    [dev-dependencies]
    concordium-std = { version = "5", features = ["concordium-quickcheck"] }

    ...

The ``concordium_quickcheck`` macro takes the ``num_tests`` attribute for specifying the number of random tests to run.
In the code snippet below, the parameters ``address`` and ``amount`` are generated randomly.
The process of generating random input and running the test is repeated ``num_tests = 500``.

.. code-block:: rust

    #[concordium_cfg_test]
    mod test {

       #[concordium_quickcheck(num_tests = 500)]
       fn some_property_test(address: Address, amount: Amount) -> bool {
        ...
        // Instantiate custom struct with random parameters.
        let input = MyParameters { sender: address, payment: amount }
        ...
        }
    }

The types ``Address`` and ``Amount`` in the example have ``Arbitrary`` trait implementations, which are used to obtain random values.
Read more about available ``Arbitrary`` instances for Concordium-specific types in |concordium_contracts_common|_ documentation.
|QuickCheck|_ defines ``Arbitrary`` instances for standard data types, like numbers and collections (``Vec``, ``BTreeMap``, etc.).
These instances are available automatically when writing tests.
Custom user data type instances can be created directly in tests using the random input parameters or by defining ``Arbitrary`` instances.
See more details on QuickCheck's ``Arbitrary`` `here <https://docs.rs/quickcheck/latest/quickcheck/trait.Arbitrary.html>`_.

The same command is used for running Wasm QuickCheck tests as in :ref:`tests_in_wasm`:

.. code-block:: console

    $cargo concordium test

When a test fails, it reports the random seed used to produce the input values.
After making the required fixes to the code, you can use the same seed to see whether the previously failed tests work on the same generated values.
The seed is a ``u64`` number, which can be provided along with the test command:

.. code-block:: console

    $cargo concordium test --seed 1234567890

Concordium QuickCheck tests can also be run with:

.. code-block:: console

    $cargo test

By default, this command compiles the contract, unit tests, and QuickCheck tests to machine code for your local target (most likely x86_64) and runs them.

.. note::

    Printing and supplying a seed is only possible using ``cargo concordium test``.

.. warning::

    Avoid using ``fail!`` and ``claim!`` variants in ``#[concordium_quickcheck]`` tests.
    In Wasm unit tests (see :ref:`tests_in_wasm`) these commands report an error.
    However, using them in QuickCheck tests makes the tests fail without providing a counterexample when running with ``cargo concordium test``.
    Also avoid using ``assert_eq!``, ``panic!`` or any other command that panics.
    Return a boolean value instead.

Example
-------

Consider a counter with a threshold: if the count is less than the threshold, it gets incremented; otherwise, it stays unchanged.

.. code-block:: rust
   :emphasize-lines: 19-22

    use concordium_std::*;

    #[derive(Serialize)]
    struct State {
        threshold: u32,
        count:     u32,
    }

    impl State {
        fn new(threshold: u32) -> Self {
            State {
                count: 0,
                threshold,
            }
        }

        // Increment only if the current count is below the threshold.
        fn increment(&mut self) {
            // Can you see a problem here?
            if self.count <= self.threshold {
                self.count += 1;
            }
        }
    }

    #[init(contract = "my_contract")]
    fn contract_init<S: HasStateApi>(
        ctx: &impl HasInitContext,
        state_builder: &mut StateBuilder<S>,
    ) -> InitResult<State> { ... }

    #[receive(contract = "my_contract", name = "my_receive", mutable)]
    fn contract_update_counter<S: HasStateApi>(
        _ctx: &impl HasReceiveContext,
        host: &mut impl HasHost<State, StateApiType = S>,
    ) -> ReceiveResult<()> { ... }

    #[concordium_cfg_test]
    mod test {
        use super::*;

        // Property: counter stays below the threshold.
        // Run 1000 tests with random threshold values.
        #[concordium_quickcheck(num_tests = 1000)]
        fn prop_counter_never_above_threshold(threshold: u32) -> bool {
            let mut state = State::new(threshold);
            state.increment();
            state.count <= threshold
        }
    }

The test fails with a counterexample, i.e., an input that breaks the property:

.. code-block::

  TestResult {
    status: Fail,
    arguments: [
        "0",
    ],
    err: None,

The ``arguments`` part shows the values that caused the test to fail.
In this case, if the threshold is ``0``, then the counter becomes ``1`` after calling ``state.increment()``, breaking the property.

.. note::

    |QuickCheck|_ implements a special mechanism called "shrinking" to find a simplest counterexample.
    For the example above, ``0`` is the simplest input on which the test failed.

If you change the highlighted lines in the code above to

.. code-block:: rust

    if self.count < self.threshold {
        self.count += 1;
    }

Then all ``500`` tests pass successfully.

.. note::

    The fact that many random tests passed successfully does not automatically mean that the property holds for **all** inputs.
    Often the input space is quite large to be covered fully.
    In this case, it is important to think carefully about what an implementation of the ``Arbitrary`` trait is doing to generate random input for your specific data.
    In order to cover corner cases, you can bias the generated data to produce values that are deemed as potentially problematic.


.. |test_infrastructure| replace:: ``test_infrastructure``
.. _test_infrastructure: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure
.. |concordium_std| replace:: ``concordium_std``
.. _concordium_std: https://docs.rs/concordium-std/latest/concordium_std
.. |concordium_contracts_common| replace:: ``concordium_contracts_common``
.. _concordium_contracts_common: https://docs.rs/concordium-contracts-common/latest/concordium_contracts_common
.. _TestHost: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/struct.TestHost.html
.. |TestHost| replace:: ``TestHost``
.. _setup_mock_entrypoint: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/struct.TestHost.html#method.setup_mock_entrypoint
.. |setup_mock_entrypoint| replace:: ``setup_mock_entrypoint``
.. _with_rollback: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/struct.TestHost.html#method.with_rollback
.. |with_rollback| replace:: ``with_rollback``
.. _Clone: https://doc.rust-lang.org/std/clone/trait.Clone.html
.. |Clone| replace:: ``Clone``
.. _StateClone: https://docs.rs/concordium-std/latest/concordium_std/trait.StateClone.html
.. |StateClone| replace:: ``StateClone``
.. _StateBox: https://docs.rs/concordium-std/latest/concordium_std/struct.StateBox.html
.. |StateBox| replace:: ``StateBox``
.. _StateMap: https://docs.rs/concordium-std/latest/concordium_std/struct.StateMap.html
.. |StateMap| replace:: ``StateMap``
.. _StateSet: https://docs.rs/concordium-std/latest/concordium_std/struct.StateSet.html
.. |StateSet| replace:: ``StateSet``
.. |QuickCheck| replace:: ``QuickCheck``
.. _QuickCheck: https://docs.rs/quickcheck/latest/quickcheck
