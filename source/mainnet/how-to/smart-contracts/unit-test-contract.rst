.. _unit-test-contract:

============
Unit testing
============

.. warning::

   Unit testing your contracts with the |test_infrastructure|_ has been deprecated in favor of |concordium-smart-contract-testing|_.
   To migrate your contracts and tests see :ref:`migrate-contracts-for-std-8.1` and :ref:`integration-test-contract`.

   If you are not ready to migrate your contracts, you can still use the guide below.
   Just make sure to add an ``#[allow(deprecated)]`` attribute above your test module to avoid warnings:

   .. code-block:: rust

      #[allow(deprecated)]
      #[cfg(test)]
      mod tests{
          use concordium_std::test_infrastructure::*;
          // ...
      }

This guide describes how to write unit tests for a smart contract written in
Rust.

A smart contract in Rust is written as a library and you can unit test it like a
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

Use ``cargo`` to run the test:

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

   For instructions about how to install ``cargo-concordium``, see :ref:`build-contract`.

The unit test has to be annotated with ``#[concordium_test]`` instead of
``#[test]``, and ``#[concordium_cfg_test]`` is used instead of ``#[cfg(test)]``:

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

The ``#[concordium_test]`` macro sets up your tests to be run in Wasm when
``concordium-std`` is compiled with the ``wasm-test`` feature. Otherwise, it
falls back to behave just like ``#[test]``, meaning it is still possible to run
unit tests targeting native code using ``cargo test``.

Similarly, the macro ``#[concordium_cfg_test]`` includes your module when build
``concordium-std`` with ``wasm-test`` otherwise behaves like ``#[test]``,
allowing you to control when to include tests in the build.

Tests can now be built and run using:

.. code-block:: console

   $cargo concordium test

This command compiles the tests for Wasm with the ``wasm-test`` feature enabled
for ``concordium-std`` and uses the test runner from ``cargo-concordium``.

.. warning::

   Error messages from ``panic!``, and therefore also the different variations
   of ``assert!``, are *not* shown when compiling to Wasm.

   Instead, use ``fail!`` and the ``claim!`` variants to do assertions when
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
entrypoints for which no mock has been set up results in a runtime error:

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

To test a contract that invokes itself, either directly or indirectly (e.g., ``A`` calls
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

.. _reentracny-unit-testing:

Reentrancy
----------

When invoking another smart contract, you give away control to that contract in the middle of execution.
The external contract can, for example, call back entrypoints of your contract.
This behavior is called *reentrancy* and is well-known from concurrency: a procedure can be interrupted in the middle of its execution, called again, and then resume execution.
See the details about handling external calls and ways of protecting against reentrancy-related issues in the :ref:`development best practices <best-practices-external-calls>`.

The state of your contract might not be the same before and after ``invoke_contract``, since the contract you call can invoke any entrypoint of your own contract.

.. code-block:: rust

    let state_copy = *host.state();
    host.invoke_contract(...);

    // *host.state() and state_copy might not be equal any more due to reentrancy.
    do_something_with(state_copy);

Consider a concrete example of reentrancy when the state is *not* updated properly before making an external call.
This can lead to reentrant calls that pass some validation that is based on the current state, even though these calls should fail.
The classic example of such a security issue is `the DAO <https://en.wikipedia.org/wiki/The_DAO_(organization)>`_ Ethereum smart contract that was drained of funds due to the reentrancy vulnerability.
Below is a code snippet that implements a small part similar to the DAO contract that stores balances for arbitrary addresses in a map ``StateMap<Address, Amount, S>``.
The users can request their funds back; if a user is a smart contract, the funds are sent to a specified entrypoint.

.. code-block:: rust
    :emphasize-lines: 40-42

    #[receive(
        contract = "reentrancy",
        name = "withdraw_reentrancy",
        parameter = "OwnedEntrypointName",
        error = "Error",
        mutable
    )]
    fn withdraw_reentrancy<S: HasStateApi>(
        ctx: &impl HasReceiveContext,
        host: &mut impl HasHost<State<S>, StateApiType = S>,
    ) -> Result<(), Error> {
        let sender = ctx.sender();

        // Get balance for the sender, or reject if the sender is not found or the
        // balance is zero.
        let sender_balance = match host.state().balances.get(&sender) {
            Some(bal) if *bal > Amount::zero() => *bal,
            _ => return Err(Error::WithdrawWithoutFunds),
        };

        match sender {
            Address::Account(acc) => host.invoke_transfer(&acc, sender_balance)?,
            Address::Contract(addr) => {
                let entrypoint: OwnedEntrypointName = ctx.parameter_cursor().get()?;
                // At this point we are handing out the control out to an unknown
                // smart contract. This contract can call this entry point
                // again multiple times before the rest of the code is reached.
                host.invoke_contract(
                    &addr,
                    &Parameter(&[]),
                    entrypoint.as_entrypoint_name(),
                    sender_balance,
                )?;
            }
        };

        // Reset the sender's balance to zero.
        // This code is reached only after transfering CCD back/calling an
        // external contract.
        if let Some(mut v) = host.state().balances.get_mut(&sender) {
            *v = Amount::zero();
        }

        Ok(())
    }

The problem in the code above is that resetting the sender's balance to zero happens *after* the call to an external contract is completed.
The sender's balance in the *contract state* is used to determine how much funds should be transferred to the sender.
Since it is not updated, the external contract can make a call back to ``withdraw_reentrancy`` and pass the balance validation.
Testing this behavior with mocks require some insights.
In particular, the example below mimics the original ``withdraw_reentrancy`` code in the mock entrypoint.

.. code-block:: rust

    #[concordium_test]
    fn test_withdraw_reentrancy() {
        ...

        // Assume that `CONTRACT_ADDRESS` has 1 micro CCD
        // Set the contract balance to 2 micro CCD
        host.set_self_balance(Amount::from_micro_ccd(2));

        // Set up a mock entrypoint that calls back to our contract.
        // The mock emulates the `withdraw_reentrancy` logic to model
        // a reentrancy attack that will withdraw the sender's balance twice.
        host.setup_mock_entrypoint(
            CONTRACT_ADDRESS,
            OwnedEntrypointName::new_unchecked("withdraw_reentrancy".to_string()),
            MockFn::new_v1(|_parameter, _amount, balance, state: &mut State<_>| {
                // `invoke_contract` cannot be called inside this mock, but
                // `balance` gives access to the balance of the contract making
                // this invocation. The `withdraw_reentrancy` invocation can be
                // simulated by subtracting the sender's amount stored in the
                // contract state from `balance`.

                let b = state.balances.get_mut(&Address::Contract(CONTRACT_ADDRESS));

                let mut sender_balance = match b {
                    Some(bal) if *bal > Amount::zero() => bal,
                    _ => fail!("Insufficent funds"),
                };

                // Emulate withdraw by subtracting the sender's balance.
                *balance -= *sender_balance;

                // Reset the sender's balance to zero.
                *sender_balance = Amount::zero();

                let state_modified = true;
                Ok((state_modified, ()))
            }),
        );
        // Withdraw 1 micro CCD
        withdraw_reentrancy(&ctx, &mut host).expect_report("Withdraw call failed");

        let resulting_balance = host.self_balance();
        let expected_balance = 1;

        claim_eq!(
            resulting_balance,
            expected_balance,
            "Balance is not updated correctly: expected {:?}, found: {:?}",
            expected_balance,
            resulting_balance
        );
    }

The test fails with the following message:

.. code-block:: text

    Incorrect balance: expected Amount { micro_ccd: 1 }, found: Amount { micro_ccd: 0 }

That means that the contract called has stolen funds through a reentrant call.
A simple fix to this behavior is to place the highlighted line in ``withdraw_reentrancy`` *before* making a call to an external contract.
In this case, the ``withdraw_reentrancy`` call will fail because the non-zero balance condition is no longer satisfied in the mock entrypoint.

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
   entrypoints as described in
   :ref:`testing_contract_invocations`, but that is handled by the test
   framework itself. This means that mock entrypoints are handled
   transactionally, even without the use of |with_rollback|_.

Testing transfers
=================

|TestHost|_ has three helper methods that are useful when testing that the correct ``invoke_transfer`` s have occurred.

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

The property-based testing technique allows for testing statements about your code that are expected to be true for any input parameters, possibly satisfying some precondition.
You can think of a precondition and a property as functions returning a boolean.
That is, for a function ``fun``, a property looks as the following: "for any input ``x``, ``y``, ``z``, such that ``precondition(x, y, z) = true``, ``property(x, y, z, fun(x,y,z)) = true``".
The input to such tests is generated randomly.
An example of a property is "for any integers ``n`` and ``m``, such that ``even(n) = true`` and ``even(m) = true``, ``even(n + m) = true``".

Property-based testing is supported using the |QuickCheck|_ crate.
The tests should be placed in the same module as regular unit tests and annotated with the ``#[concordium_quickcheck]`` macro.
The return value of the function should be a boolean corresponding to whether the property holds.

To get started, add the ``concordium-quickcheck`` feature to ``concordium-std`` as a ``dev``-dependency in ``Cargo.toml``:

.. code-block::

    ...

    [dev-dependencies]
    concordium-std = { version = "5.1", features = ["concordium-quickcheck"] }

    ...

The ``concordium_quickcheck`` macro takes the ``num_tests`` attribute for specifying the number of random tests to run.
In the code snippet below, the parameters ``address`` and ``amount`` are generated randomly.
The process of generating random input and running the test is repeated 500 times because you set ``num_tests = 500``.
If you omit the ``num_tests`` attribute, it defaults to a 100 tests.

.. code-block:: rust

    #[concordium_cfg_test]
    mod test {

       #[concordium_quickcheck(num_tests = 500)]
       fn some_property_test(address: Address, amount: Amount) -> bool {
        ...
        // Instantiate custom struct with random parameters, if necessary.
        let input = MyParameters { sender: address, payment: amount }
        ...
        }
    }

The types ``Address`` and ``Amount`` in the example have ``Arbitrary`` trait implementations, which are used to obtain random values.
Read more about available ``Arbitrary`` instances for Concordium-specific types in |concordium_contracts_common|_ documentation.
|QuickCheck|_ defines ``Arbitrary`` instances for standard data types, like numbers and collections (``Vec``, ``BTreeMap``, etc.).
These instances are available by default when writing tests.
Custom user data type instances, like ``MyParameters`` above, can be created directly in tests using the random input parameters or by defining ``Arbitrary`` instances.
See more details on QuickCheck's ``Arbitrary`` `here <https://docs.rs/quickcheck/latest/quickcheck/trait.Arbitrary.html>`_.

.. warning::

    The fact that many random tests passed successfully does not automatically mean that the property holds for **all** inputs.
    Often the input space is quite large to be covered fully.
    In this case, it is important to think carefully about what an implementation of the ``Arbitrary`` trait is doing to generate random input for your specific data.
    In order to cover corner cases, you can bias the generated data to produce values that are deemed as potentially problematic.



The same command is used for running Wasm QuickCheck tests as in :ref:`tests_in_wasm`:

.. code-block:: console

    $cargo concordium test

When a test fails, it reports the random seed used to produce the input values.
The random numbers are generated using a deterministic pseudo-random number generator from this seed.
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
    Also avoid using ``assert_eq!``, ``panic!``, or any other command that panics.
    Return a boolean value instead.

Example
-------

Consider a counter with a threshold: if the count is less than the threshold, it gets incremented; otherwise, it stays unchanged.

.. code-block:: rust
   :emphasize-lines: 19-22

    use concordium_std::*;

    #[derive(Serialize)]
    struct State {
        threshold: u16,
        count:     u16,
    }

    impl State {
        fn new(threshold: u16) -> Self {
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

        // Property: counter stays below the threshold for any number of calls `n`.
        // Run 500 tests with random `n` and `threshold` values.
        #[concordium_quickcheck(num_tests = 500)]
        fn prop_counter_always_below_threshold(threshold: u16, n: u16) -> bool {
            let mut state = State::new(threshold);
            for _ in 0..n {
                state.increment()
            }
            state.count <= threshold
        }
    }

The test fails with a counterexample, i.e., an input that breaks the property:

.. code-block::

    TestResult {
        status: Fail,
        arguments: [
            "0",
            "1",
        ],
        err: None,
    }

The ``arguments`` part shows the values that caused the test to fail.
In this case, if the threshold is ``0`` and the number of calls is ``1``, then the counter becomes ``1`` after calling ``state.increment()``, breaking the property.

.. note::

    |QuickCheck|_ implements a special mechanism called "shrinking" to find the simplest counterexample.
    For the example above, ``0`` and ``1`` is the simplest input on which the test failed.

The issue is the comparison operator.
It should be ``<`` instead of ``<=``.
If you change the highlighted lines in the code above to:

.. code-block:: rust

    if self.count < self.threshold {
        self.count += 1;
    }

then all ``500`` tests pass successfully.


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
.. _concordium-smart-contract-testing: https://docs.rs/concordium-std-derive/latest/concordium_smart-contract-testing
.. |concordium-smart-contract-testing| replace:: ``concordium-smart-contract-testing``
