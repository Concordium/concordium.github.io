.. Should cover:
.. - Unit testing in native
.. - Unit testing in Wasm
.. - Custom error
.. - Simulating locally

.. _Rust: https://www.rust-lang.org/
.. _concordium-std: https://docs.rs/concordium-std/latest/concordium_std/index.html
.. |concordium-std| replace:: ``concordium-std``
.. _test_infrastructure: https://docs.rs/concordium-std/latest/concordium_std/test_infrastructure/index.html
.. |test_infrastructure| replace:: ``test_infrastructure``
.. _init: https://docs.rs/concordium-std/latest/concordium_std/attr.init.html
.. |init| replace:: ``#[init]``
.. _receive: https://docs.rs/concordium-std/latest/concordium_std/attr.receive.html
.. |receive| replace:: ``#[receive]``
.. _InitContextTest: https://docs.rs/concordium-std/2.0.0/concordium_std/test_infrastructure/type.InitContextTest.html
.. |InitContextTest| replace:: ``InitContextTest``
.. _ReceiveContextTest: https://docs.rs/concordium-std/2.0.0/concordium_std/test_infrastructure/type.ReceiveContextTest.html
.. |ReceiveContextTest| replace:: ``ReceiveContextTest``
.. _HasInitContext: https://docs.rs/concordium-std/latest/concordium_std/trait.HasInitContext.html
.. |HasInitContext| replace:: ``HasInitContext``
.. _HasActions: https://docs.rs/concordium-std/2.0.0/concordium_std/trait.HasActions.html
.. |HasActions| replace:: ``HasActions``
.. _ActionsTree: https://docs.rs/concordium-std/2.0.0/concordium_std/test_infrastructure/enum.ActionsTree.html
.. |ActionsTree| replace:: ``ActionsTree``
.. _AccountAddress: https://docs.rs/concordium-std/latest/concordium_std/struct.AccountAddress.html
.. |AccountAddress| replace:: ``AccountAddress``
.. _set_owner: https://docs.rs/concordium-std/2.0.0/concordium_std/test_infrastructure/type.ReceiveContextTest.html#method.set_owner
.. |set_owner| replace:: ``set_owner``
.. _Address: https://docs.rs/concordium-std/latest/concordium_std/enum.Address.html
.. |Address| replace:: ``Address``
.. _set_sender: https://docs.rs/concordium-std/2.0.0/concordium_std/test_infrastructure/type.ReceiveContextTest.html#method.set_sender
.. |set_sender| replace:: ``set_sender``
.. _set_self_balance: https://docs.rs/concordium-std/2.0.0/concordium_std/test_infrastructure/type.ReceiveContextTest.html#method.set_self_balance
.. |set_self_balance| replace:: ``set_self_balance``
.. _concordium_cfg_test: https://docs.rs/concordium-std/latest/concordium_std/attr.concordium_cfg_test.html
.. |concordium_cfg_test| replace:: ``#[concordium_cfg_test]``
.. _concordium_test: https://docs.rs/concordium-std/latest/concordium_std/attr.concordium_test.html
.. |concordium_test| replace:: ``#[concordium_test]``
.. _fail: https://docs.rs/concordium-std/latest/concordium_std/macro.fail.html
.. |fail| replace:: ``fail!``
.. _expect_report: https://docs.rs/concordium-std/latest/concordium_std/trait.ExpectReport.html#tymethod.expect_report
.. |expect_report| replace:: ``expect_report``
.. _expect_err_report: https://docs.rs/concordium-std/latest/concordium_std/trait.ExpectErrReport.html#tymethod.expect_err_report
.. |expect_err_report| replace:: ``expect_err_report``
.. _claim: https://docs.rs/concordium-std/latest/concordium_std/macro.claim.html
.. |claim| replace:: ``claim!``
.. _claim_eq: https://docs.rs/concordium-std/latest/concordium_std/macro.claim_eq.html
.. |claim_eq| replace:: ``claim_eq!``
.. _ensure: https://docs.rs/concordium-std/latest/concordium_std/macro.ensure.html
.. |ensure| replace:: ``ensure!``

.. _piggy-bank-testing-v0:

=====================================
Testing the piggy bank smart contract
=====================================

This is the second :ref:`part of a tutorial<piggy-bank>` on smart contract
development.
So far you have written a piggy bank smart contract in the Rust_ programming
language.
This part will focus on how you can write unit tests for your piggy bank smart
contract and how to setup and locally simulate an invocation of a smart
contract.

.. warning::

   The reader is assumed to have basic knowledge of what a blockchain and smart
   contract is, and some experience with Rust_.

.. contents::
   :local:
   :backlinks: None

.. todo::

   Link the repo with the final code.

Preparation
===========

Before you start, make sure to have the necessary tooling to build Rust
contracts.
The guide :ref:`setup-tools` shows you how to do this.
Also, make sure to have a text editor setup to write Rust.

Additionally, to run the tests you need to:

- set up a local testnet node using your preferred platform: :ref:`Windows<windows-node>`, :ref:`MacOS<macos-node>`, :ref:`Ubuntu<ubuntu-node>`, or :ref:`Docker/Linux<docker-node>`
- :ref:`create an account for testnet<create-account>`. The account will need some CCD to run tests.
- :ref:`import the created account using concordium-client<concordium-client-import-accounts-keys>`
- :ref:`deploy the smart contract to your local testnet node<deploy-module-v0>`.

Since you are going to extend the smart contract code written in the :ref:`previous
part<piggy-bank-writing-v0>`, either follow the previous part or copy the resulting code from there.

You are now ready to write unit tests for your smart contract!

.. Note::

   To request CCDs for testing, use the buttons in the Concordium Wallets when running Testnet.

Add a test module
=================

Since a smart contract module is written as a Rust library, you can test it as
one would test any library and write unit-tests as part of the Rust module.

At the bottom of the ``lib.rs`` file containing our code, make sure you have the
following starting point:

.. code-block:: rust

   // PiggyBank contract code up here

   #[cfg(test)]
   mod tests {
       use super::*;

   }

This is your test module, which is a common pattern for writing unit tests in
Rust, so the above code will not be explained here.

Test the contract functions just as if they were regular functions by
calling the functions you have annotated with |init|_ and |receive|_.

But in order to call them, you will need to first construct the arguments.
Luckily |concordium-std|_ contains a submodule |test_infrastructure|_ with
stubs for this, so first bring everything from the submodule into scope.

.. code-block:: rust
   :emphasize-lines: 4

   #[cfg(test)]
   mod tests {
       use super::*;
       use test_infrastructure::*;

   }

Now you can start adding tests to this module.

Testing instantiation of a piggy bank
=====================================

The first test to add is to verify a piggy bank is set up with the correct
state.

.. code-block:: rust

   #[test]
   fn test_init() {
      todo!("Implement")
   }

As mentioned above, you test the initialization by calling the function
``piggy_init`` directly.
To construct its argument for, you use |InitContextTest|_ which provides a
placeholder for the context.

.. code-block:: rust

   let ctx = InitContextTest::empty();

Just as the name suggests, the test context is empty and if any of the getter
functions are called, it will make sure to fail the test, which should be fine
for now since the piggy bank is not reading anything from the context.

.. note::

   As you will see later with the |ReceiveContextTest|_, these placeholders have
   setter functions, allowing us to partially specify the context.

Now you can call ``piggy_init`` and get a result containing the initial state.

.. code-block:: rust

   let state_result = piggy_init(&ctx);

First, you want the test to fail if the contract did not result in an
initial state:

.. code-block:: rust

       let state = state_result.expect("Contract initialization results in error.");

Next you assert the state is correctly set to ``Intact``:

.. code-block:: rust

   assert_eq!(
      state,
      PiggyBankState::Intact,
      "Piggy bank state should be intact after initialization."
   );

Putting it all together, you end up with the following test for initializing a
piggy bank:

.. code-block:: rust

   // PiggyBank contract code up here

   #[cfg(test)]
   mod tests {
       use super::*;
       use test_infrastructure::*;

       #[test]
       fn test_init() {
           let ctx = InitContextTest::empty();

           let state_result = piggy_init(&ctx);

           let state = state_result.expect("Contract initialization results in error.");

           assert_eq!(
               state,
               PiggyBankState::Intact,
               "Piggy bank state should be intact after initialization."
           );
       }
   }

Run the test to check that it compiles and succeeds.

.. code-block:: console

   $cargo test



Test inserting CCD into a piggy bank
====================================

Next you should test the different functions for interacting with a piggy bank.
This is done in the same way as initializing, except you use |ReceiveContextTest|
to construct the context.

To test ``piggy_insert`` you also need some amount of CCD and the current state
of your smart contract instance:

.. code-block:: rust

   let ctx = ReceiveContextTest::empty();
   let amount = Amount::from_micro_ccd(100);
   let mut state = PiggyBankState::Intact;

When calling ``piggy_insert`` you get back a result with actions instead of an
initial state as with ``piggy_init``. But you will need to help the compiler
infer which type to use for the generic ``A`` implementing |HasActions|_, so
add the result type ``ReceiveResult<ActionsTree>``:

.. code-block:: rust

   let actions_result: ReceiveResult<ActionsTree> = piggy_insert(&ctx, amount, &mut state);

For testing you can represent the actions as a simple tree structure
|ActionsTree|_, making it easy to inspect.

.. note::

   The |receive| macro uses another representation of the actions, when building
   the smart contract module. This representation depends on functions supplied
   by the host environment and is therefore not suitable for unit tests.

Now you need to check if the function succeeded and verify the resulting state and actions.
In this case the state should remain intact and the function produce only the action for accepting the CCD.

.. code-block:: rust

   let actions = actions_result.expect("Inserting CCD results in error.");

   assert_eq!(actions, ActionsTree::accept(), "No action should be produced.");
   assert_eq!(state, PiggyBankState::Intact, "Piggy bank state should still be intact.");

The second test becomes:

.. code-block:: rust

   #[test]
   fn test_insert_intact() {
       let ctx = ReceiveContextTest::empty();
       let amount = Amount::from_micro_ccd(100);
       let mut state = PiggyBankState::Intact;

       let actions_result: ReceiveResult<ActionsTree> = piggy_insert(&ctx, amount, &mut state);

       let actions = actions_result.expect("Inserting CCD results in error.");

       assert_eq!(actions, ActionsTree::accept(), "No action should be produced.");
       assert_eq!(state, PiggyBankState::Intact, "Piggy bank state should still be intact.");
   }

Again you should verify everything compiles and the tests succeeds using ``cargo
test``.

Next you could add a test to check that inserting into a piggy bank with state
``Smashed`` results in an error. You have been through everything needed to
do this, and can do this exercise on your own.

Test smashing a piggy bank
==========================

Testing ``piggy_smash`` will follow the same pattern, but this time you will need
to populate the context since this function uses the context for getting the
contract owner, the sender of the message triggering the function, and the
balance of contract.

If you only supply the function with an empty context it will fail, so instead
define the context as mutable:

.. code-block:: rust

   let mut ctx = ReceiveContextTest::empty();

Create an |AccountAddress|_ to represent the owner and use the setter
|set_owner| implemented on |ReceiveContextTest|_:

.. code-block:: rust

   let owner = AccountAddress([0u8; 32]);
   ctx.set_owner(owner);

.. note::

   Notice you created the account address using an array of 32 bytes, which is
   how account addresses are represented on the Concordium blockchain.
   These byte arrays can also be represented as a base58check encoding, but for
   testing it is usually more convenient to specify addresses directly in bytes.

Next set the sender to be the same address as the owner using |set_sender|_.
Since the sender can be a contract instance as well, you must wrap the owner
address in the |Address|_ type:

.. code-block:: rust

   let sender = Address::Account(owner);
   ctx.set_sender(sender);

Lastly, you need to set the current balance of the piggy bank instance using
|set_self_balance|_.

.. code-block:: rust

   let balance = Amount::from_micro_ccd(100);
   ctx.set_self_balance(balance);

Now that you have the test context setup, call the contract function
``piggy_smash`` and inspect the resulting action tree and state as you did
in the previous tests:

.. code-block:: rust

   #[test]
   fn test_smash_intact() {
       let mut ctx = ReceiveContextTest::empty();
       let owner = AccountAddress([0u8; 32]);
       ctx.set_owner(owner);
       let sender = Address::Account(owner);
       ctx.set_sender(sender);
       let balance = Amount::from_micro_ccd(100);
       ctx.set_self_balance(balance);

       let mut state = PiggyBankState::Intact;

       let actions_result: ReceiveResult<ActionsTree> = piggy_smash(&ctx, &mut state);

       let actions = actions_result.expect("Inserting CCD results in error.");
       assert_eq!(actions, ActionsTree::simple_transfer(&owner, balance));
       assert_eq!(state, PiggyBankState::Smashed);
   }

Ensure everything compiles and the test succeeds using ``cargo test``.

Testing cause of rejection
==========================

You want to test that the piggy bank rejects in certain contexts, for example
when someone besides the owner of the smart contract tries to smash it.

The test should:

- Make a context where the sender and owner are two different accounts.
- Set the state to be intact.
- Call ``piggy_smash``.
- Check that the result is an error.

The test could look like this:

.. code-block:: rust

   #[test]
   fn test_smash_intact_not_owner() {
       let mut ctx = ReceiveContextTest::empty();
       let owner = AccountAddress([0u8; 32]);
       ctx.set_owner(owner);
       let sender = Address::Account(AccountAddress([1u8; 32]));
       ctx.set_sender(sender);
       let balance = Amount::from_micro_ccd(100);
       ctx.set_self_balance(balance);

       let mut state = PiggyBankState::Intact;

       let actions_result: ReceiveResult<ActionsTree> = piggy_smash(&ctx, &mut state);

       assert!(actions_result.is_err(), "Contract is expected to fail.")
   }

One thing to notice is that the test is not ensuring *why* the contract
rejected; your piggy bank might reject for a wrong reason and this would be a
bug.
This is probably fine for a simple smart contract like your piggy bank, but for a
smart contract with more complex logic and many reasons for rejecting, it would
be better if you tested this as well.

To solve this, introduce a ``SmashError`` enum  to represent the different
reasons for rejection:

.. code-block:: rust

   #[derive(Debug, PartialEq, Eq, Reject)]
   enum SmashError {
       NotOwner,
       AlreadySmashed,
   }

.. seealso::

   For more information about custom errors and deriving ``Reject``, see :ref:`custom-errors`.


To use this error type, the function ``piggy_smash`` should return ``Result<A,
SmashError>`` instead of ``ReceiveResult<A>``:

.. code-block:: rust
   :emphasize-lines: 5

   #[receive(contract = "PiggyBank", name = "smash")]
   fn piggy_smash<A: HasActions>(
       ctx: &impl HasReceiveContext,
       state: &mut PiggyBankState,
   ) -> Result<A, SmashError> {
      // ...
   }

and you also have to supply the |ensure| macros with a second argument, which is
the error to produce:

.. code-block:: rust
   :emphasize-lines: 9, 10

   #[receive(contract = "PiggyBank", name = "smash")]
   fn piggy_smash<A: HasActions>(
       ctx: &impl HasReceiveContext,
       state: &mut PiggyBankState,
   ) -> Result<A, SmashError> {
       let owner = ctx.owner();
       let sender = ctx.sender();

       ensure!(sender.matches_account(&owner), SmashError::NotOwner);
       ensure!(*state == PiggyBankState::Intact, SmashError::AlreadySmashed);

       *state = PiggyBankState::Smashed;

       let balance = ctx.self_balance();
       Ok(A::simple_transfer(&owner, balance))
   }

Since the return type has changed for the ``piggy_smash`` function, you have to
change the type in the tests as well:

.. code-block:: rust
   :emphasize-lines: 5, 14

   #[test]
   fn test_smash_intact() {
       // ...

       let actions_result: Result<ActionsTree, SmashError> = piggy_smash(&ctx, &mut state);

       // ...
   }

   #[test]
   fn test_smash_intact_not_owner() {
       // ...

       let actions_result: Result<ActionsTree, SmashError> = piggy_smash(&ctx, &mut state);

       // ...
   }

You can now check which error was produced in the test:

.. code-block:: rust
   :emphasize-lines: 15-16

   #[test]
   fn test_smash_intact_not_owner() {
       let mut ctx = ReceiveContextTest::empty();
       let owner = AccountAddress([0u8; 32]);
       ctx.set_owner(owner);
       let sender = Address::Account(AccountAddress([1u8; 32]));
       ctx.set_sender(sender);
       let balance = Amount::from_micro_ccd(100);
       ctx.set_self_balance(balance);

       let mut state = PiggyBankState::Intact;

       let actions_result: Result<ActionsTree, SmashError> = piggy_smash(&ctx, &mut state);

       let err = actions_result.expect_err("Contract is expected to fail.");
       assert_eq!(err, SmashError::NotOwner, "Expected to fail with error NotOwner")
   }

It is up to the reader to test whether smashing a piggy bank that has
already been smashed results in the correct error.

Compiling and running tests in Wasm
===================================

When running ``cargo test`` your contract module and tests are compiled targeting
your native platform, but on the Concordium blockchain a smart contract module
is in Wasm.
Therefore it is preferable to compile the tests targeting Wasm and run the tests
using a Wasm interpreter instead.
Luckily, the ``cargo-concordium`` tool contains such an interpreter, and
it is the same interpreter shipped with the official nodes on the Concordium
blockchain.

Before you can run tests in Wasm, you have to replace ``#[cfg(test)]`` at the
top of your test module with |concordium_cfg_test|_ and all the ``#[test]``
macros with |concordium_test|_.

.. code-block:: rust
   :emphasize-lines: 3, 8, 13, 18, 23

   // PiggyBank contract code up here

   #[concordium_cfg_test]
   mod tests {
       use super::*;
       use test_infrastructure::*;

       #[concordium_test]
       fn test_init() {
           // ...
       }

       #[concordium_test]
       fn test_insert_intact() {
           // ...
       }

       #[concordium_test]
       fn test_smash_intact() {
           // ...
       }

       #[concordium_test]
       fn test_smash_intact_not_owner() {
           // ...
       }
   }

You also need to modify the tests a bit. Usually a test in Rust_ is failed
by panicking with an error message, but when compiling to Wasm this error
message is lost.
Instead you need generate code reporting the error back to the host who is
running the Wasm. To do so, |concordium-std| provides replacements:

- A call to ``panic!`` should be replaced with |fail|_.
- The ``expect`` and ``expect_err`` function should be replaced with
  |expect_report|_ and |expect_err_report|_.
- ``assert`` and ``assert_eq`` should be replaced with |claim|_ and |claim_eq|_
  respectively.

All of these macros are wrappers, which behave the same as their counterpart
except when you build your smart contract for testing in Wasm using
``cargo-concordium``. This means you can still run tests for targeting native
using ``cargo test``.

.. code-block:: rust
   :emphasize-lines: 14, 16, 31, 33, 34, 51, 52, 53, 70, 71

   // PiggyBank contract code up here

   #[concordium_cfg_test]
   mod tests {
      use super::*;
      use test_infrastructure::*;

      #[concordium_test]
      fn test_init() {
          let ctx = InitContextTest::empty();

          let state_result = piggy_init(&ctx);

          let state = state_result.expect_report("Contract initialization failed.");

          claim_eq!(
                state,
                PiggyBankState::Intact,
                "Piggy bank state should be intact after initialization."
          );
      }

      #[concordium_test]
      fn test_insert_intact() {
          let ctx = ReceiveContextTest::empty();
          let amount = Amount::from_micro_ccd(100);
          let mut state = PiggyBankState::Intact;

          let actions_result: ReceiveResult<ActionsTree> = piggy_insert(&ctx, amount, &mut state);

          let actions = actions_result.expect_report("Inserting CCD results in error.");

          claim_eq!(actions, ActionsTree::accept(), "No action should be produced.");
          claim_eq!(state, PiggyBankState::Intact, "Piggy bank state should still be intact.");
      }

      #[concordium_test]
      fn test_smash_intact() {
          let mut ctx = ReceiveContextTest::empty();
          let owner = AccountAddress([0u8; 32]);
          ctx.set_owner(owner);
          let sender = Address::Account(owner);
          ctx.set_sender(sender);
          let balance = Amount::from_micro_ccd(100);
          ctx.set_self_balance(balance);

          let mut state = PiggyBankState::Intact;

          let actions_result: Result<ActionsTree, SmashError> = piggy_smash(&ctx, &mut state);

          let actions = actions_result.expect_report("Inserting CCD results in error.");
          claim_eq!(actions, ActionsTree::simple_transfer(&owner, balance));
          claim_eq!(state, PiggyBankState::Smashed);
      }

      #[concordium_test]
      fn test_smash_intact_not_owner() {
          let mut ctx = ReceiveContextTest::empty();
          let owner = AccountAddress([0u8; 32]);
          ctx.set_owner(owner);
          let sender = Address::Account(AccountAddress([1u8; 32]));
          ctx.set_sender(sender);
          let balance = Amount::from_micro_ccd(100);
          ctx.set_self_balance(balance);

          let mut state = PiggyBankState::Intact;

          let actions_result: Result<ActionsTree, SmashError> = piggy_smash(&ctx, &mut state);

          let err = actions_result.expect_err_report("Contract is expected to fail.");
          claim_eq!(err, SmashError::NotOwner, "Expected to fail with error NotOwner")
      }
   }

Compiling and running the tests in Wasm can be done using:

.. code-block:: console

   $cargo concordium test

This will make a special test build of your smart contract module, exporting all
of your tests as functions, and it will then run each of these functions catching
the reported errors.

Simulating the piggy bank
=========================

So far the tests you have written are in Rust_ and have to be compiled alongside
the smart contract module in a test build. This is fine for unit testing, but
this test build is not the actual module that you intend to deploy on the
Concordium blockchain.

You should also test the smart contract wasm module meant for deployment, and you
can use the simulate feature of ``cargo-concordium``. It takes a smart contract
wasm module and uses the Wasm interpreter to run a smart contract function in a
given context. For a reference of the context, see :ref:`simulate-context-v0`.

For more on how to run simulations, see :ref:`local-simulate-v0`.
