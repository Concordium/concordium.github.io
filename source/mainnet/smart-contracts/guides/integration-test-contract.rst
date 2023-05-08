.. _integration-test-contract:

===================================
Integration test a contract in Rust
===================================
.. contents::
   :local:
   :backlinks: none

This guide describes how to write *integration tests* in Rust for your smart contracts using the `Concordium smart contract testing library <https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/>`_.
The library allows you to test individual contracts in isolation, but, notably, also interactions between multiple contracts.
When running the tests, they are executed locally on the exact contract code that is deployed on the chain, and using the same execution engine that the nodes use.
V0 smart contracts are not supported, but all V1 smart contract features are, including upgrades, and it is also possible to see the energy usage of your contracts.
This allows you to refactor and optimize your contracts for speed and efficiency with greater confidence.

The high-level process of adding integration tests to your existing smart contract project is as follows:

1. Add the testing library to your ``Cargo.toml`` file and use Rust edition ``2021``:

   .. code-block:: yaml

      [package]
      # ...
      edition = "2021"

      [dev-dependencies]
      concordium-smart-contract-testing = "1.0"

   By putting it under ``dev-dependencies``, it is only included for tests.
   You must use edition ``2021`` or greater as that is a requirement for the testing library.

2. Compile your contract with ``$cargo-concordium build ...``.
3. Write tests in files residing in ``my-project/tests/``.
   Example content:

   .. code-block:: rust

      use concordium-smart-contract-testing::*;

      #[test]
      fn my_test() { .. }

   where you specify the path the Wasm file built in step two (details will be explained later).
4. Run your tests with ``cargo test``
5. If your tests fail due to a bug in your smart contract, fix the bug and recompile your contract with ``cargo-concordium`` as in the second step before running the tests again. Otherwise, the changes are not reflected in the tests.

With a high-level understanding of the workflow, you are ready to write the actual tests.
Each section below covers part of a typical integration test.

Creating a chain
----------------

The primary construct used for testing is the |Chain|_ type, which you should only create one of per test.
It represents the blockchain and has methods for creating accounts and deploying and working with contracts.

Use the |Chain_new|_ method to create a chain with default settings.

.. code-block:: rust

   #[test]
   fn my_test() {
       let mut chain = Chain::new();
   }

There are also other constructors which allow you to specify certain chain parameters, such as the block time (slot time) and exchange rates between energy, CCD, and Euro.

Creating accounts
-----------------

The next step is to create one or more |Account|_ entities and add them to the chain.

Accounts have multiple constructors that allow you to specify more details.
The simplest one is |Account_new|_, which takes an |AccountAddress|_ and a total balance of the account.
Once constructed, use the |Chain_create_account|_ method to add it to the chain.
This step is important, as simply constructing an ``Account`` does not make the chain aware of it.

.. code-block:: rust

   #[test]
   fn my_test() {
       let mut chain = Chain::new();
       let account_address = AccountAddress([0u8;32]);
       let account = Account::new(account_address, Amount::from_ccd(123));
       chain.create_account(account);
   }

The account address is ``[0u8;32]``, which is a Rust shorthand for creating a byte array with all zeroes.
Also note that account addresses are aliases of one another if they match on the first 29 bytes.
Creating accounts ``[0u8;32]``, ``[1u8;32]``, ``[3u8;32]``, etc. will ensure that they aren't aliases, which is what you want in most cases.
It is important to set an appropriate balance for the account, as executing transactions, for example deploying modules, on the chain deducts CCD from the account's balance, and running out of CCD gives you an error.
You can check the account balance with |Chain_account_balance_available|_ after each of the transactions you execute in the following sections to see that the transaction fees are subtracted from the balance.

.. note::

  It is also possible to use real account addresses from the chain, which shown in base58 encoding, but still represent 32 bytes.
  For example:

  .. code-block:: rust

        let my_chain_account: AccountAddress =
            "3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G".parse().unwrap();


Deploy modules
--------------

Deploying smart contract modules is a two-step process.
First, you load the module with the function |module_load_v1|_, then you deploy it to the chain with the method |Chain_module_deploy_v1|_.
Loading as a separate step allows you to reuse the loaded module across multiple tests for efficiency.

The module to load should be a ``wasm`` module compiled with ``cargo concordium build``.
For example, for ``cargo concordium build --embed-schema --out my_module.wasm.v1``, you write:

.. code-block:: rust

   #[test]
   fn my_test() {
       // .. Lines omitted for brevity
       let module = module_load_v1("my_module.wasm.v1").unwrap();
   }

Loading a module can fail in multiple ways, for example because it is missing or corrupt, so the function returns ``Result``, which you ``unwrap`` here because you know it will succeed.
If it doesn't succeed, the test will fail and you can fix your mistake.
You can also use ``.expect("Loading module should succeed")`` instead to provide better error messages on failures, but the remainder of this guide will use ``unwrap`` for brevity.

With the module loaded, you are ready to deploy it.
Since this is a transaction, it involves an account that pays for the cost.
Additionally, you must specify a |Signer|_ with a number of keys.
This mimics the behavior on the real chain, where one or more keys must sign a transaction.
The only observable difference between using one or more keys is the cost of the transaction, where each extra key increases the cost slightly.

.. code-block:: rust

   #[test]
   fn my_test() {
       let mut chain = Chain::new();
       let account_address = AccountAddress([0u8;32]);
       // .. Lines omitted for brevity
       let module = module_load_v1("my_module.wasm.v1").unwrap();
       let deployment = chain
           .module_deploy_v1(
               Signer::with_one_key(),
               account_address,
               module)
           .unwrap();
   }

Since deployment can fail, for example if the account doesn't have sufficient CCD to cover the cost, the method returns ``Result``, which is unwrapped.
The struct returned has information about the energy used, transaction fee, and a |ModuleReference|_ that you use for initializing contracts.

.. note::

   If you are familiar with the `anyhow crate <https://docs.rs/anyhow/latest/anyhow/>`_, you can use it to replace ``unwrap`` / ``expect`` with the more ergonomic ``?`` operator.
   For example:

   .. code-block:: rust
      :emphasize-lines: 2, 6, 11, 12

      #[test]
      fn my_test() -> anyhow::Result<()> {
          let mut chain = Chain::new();
          let account_address = AccountAddress([0u8;32]);
          // .. Lines omitted for brevity
          let module = module_load_v1("my_module.wasm.v1")?;
          let deployment = chain
              .module_deploy_v1(
                  Signer::with_one_key(),
                  account_address,
                  module)?;
          Ok(())
       }


Initialize contracts
--------------------

With the module deployed, you are ready to initialize a contract with the chain method |Chain_contract_init|_.
The method has the following parameters:

- A |Signer|_ to sign the transaction.
- An |AccountAddress|_, which pays for the transaction.
- A maximum |Energy|_ that the contract initialization can use.
- A |ModuleReference|_, which you got from the deployment section above.
- An |OwnedContractName|_ that specifies which contract in the module you want to initialize.
  Contract names are prefixed with ``init_`` on the chain to distinguish them from receive functions (entrypoints).
  You constuct it with either |OwnedContractName_new|_, which checks the validity and returns a ``Result``, or |OwnedContractName_new_unchecked|_, which performs no checking.
- An |OwnedParameter|_, which is a wrapper over a byte array that you construct with one of the following methods:

  - |OwnedParameter_from_serial|_, which serializes the input and checks that the parameter size is valid,
  - ``TryFrom::<Vec<u8>>::try_from(..)``, which also checks the parameter size,
  - or |OwnedParameter_empty|_, which always succeeds.

- An |Amount|_ to send to the contract.

.. code-block:: rust

   #[test]
   fn my_test() {
       // .. Lines omitted for brevity
       let initialization = chain
           .contract_init(
               Signer::with_one_key(),
               account_address,
               Energy::from(10000),
               InitContractPayload {
                   mod_ref: deployment.module_reference,
                   init_name: OwnedContractName::new_unchecked("init_my_contract".to_string()),
                   param: OwnedParameter::from_serial(&"my_param").unwrap(),
                   amount: Amount::zero(),
               }
           )
           .unwrap();
   }

Initialization can fail for several different reasons, and thus returns a ``Result``, which is unwrapped.
The struct returned contains information about the energy used, transaction fee, contract events (logs) produced, and a |ContractAddress|_ that you use for updating the contract in the next section.

Update contract entrypoints
---------------------------

With the contract initialized, you are ready to update it with the chain method |Chain_contract_update|_, which has the following parameters:

- A |Signer|_ to sign the transaction.
- An ``invoker`` of type |AccountAddress|_, which pays for the transaction.
- An ``sender`` of type |Address|_, which can either be an |AccountAddress|_ or a |ContractAddress|_.

  - The main utility of the parameter is that it allows you to test internal calls in your contracts directly.
  - For example, if you have a more complex scenario where an account calls contract ``A`` which internally calls contract ``B``.

    - In this case you can test the complete integration by calling ``A``.
    - But you can also test ``B`` as its own unit by calling it directly and specifying ``A`` as the ``sender``.

- A maximum |Energy|_ that the contract update can use.
- A |ContractAddress|_, which you got from the initialization section above.
- An |OwnedReceiveName|_ that specifies which receive name in the module you want to initialize.

  - A "receive name" is the contract name concatenated with the entrypoint name and a dot in between.
  - In this example, the contract ``my_contract`` and the entrypoint ``my_entrypoint`` combine to become the receive name ``my_contract.my_entrypoint``.
  - You construct it with either |OwnedReceiveName_new|_, which checks the format and returns a ``Result``, or |OwnedReceiveName_new_unchecked|_, which performs no checks.

- An |OwnedParameter|_, which is a wrapper over a byte array that you construct with one of the following methods:

  - |OwnedParameter_from_serial|_, which serializes the input and checks that the parameter size is valid,
  - ``TryFrom::<Vec<u8>>::try_from(..)``, which also checks the parameter size,
  - or |OwnedParameter_empty|_, which always succeeds.

- An |Amount|_ to send to the contract.

.. code-block:: rust

   #[test]
   fn my_test(){
       // .. Lines omitted for brevity.
       let update = chain
           .contract_update(
               Signer::with_one_key(),
               account_address,
               Address::Account(account_address),
               Energy::from(10000),
               UpdateContractPayload {
                   address: initialization.contract_address,
                   receive_name: OwnedReceiveName::new_unchecked("my_contract.my_entrypoint".to_string()),
                   message: OwnedParameter::from_serial(&42u8).unwrap(),
                   amount: Amount::from_ccd(100),
               }
           )
           .unwrap();
   }

Updates can also fail, and thus return a ``Result``, which is unwrapped here.
The struct returned on success contains information about the energy used, the transaction fee, the return value from the entrypoint, a vector of |ContractTraceElement|_, whether the contract state has changed, and the contract's new balance.
The trace elements describe calls to other contracts, transfers to accounts, module upgrades, and whether each of these actions succeeded or not.

A method related to |Chain_contract_update|_ is |Chain_contract_invoke|_, which also executes an entrypoint, but without it being a transaction.

Invoke contract entrypoints
----------------------------

The method |Chain_contract_invoke|_ is similar to |Chain_contract_update|_ in that it allows you to execute contract entrypoints.
The difference is that an invoke is *not a transaction and is not persisted*, so contract states, account balances, etc. remain unchanged after the call.
For seasoned Rust programmers, that is easily seen by its function signature, which takes an immutable reference to the chain (``&self``), as opposed to the mutable reference (``&mut self``) used in the update method.
The primary purpose of |Chain_contract_invoke|_ is to get the return value of an entrypoint.

It has all the same parameters as a contract update, except for the ``signer``, which is only needed for transactions.
While the result of the invocation isn't saved on the chain, all the entities referred, e.g. contracts and accounts, must still exist in the ``chain``.

In this example, you get the result of calling the entrypoint called ``my_view`` with the contract itself as the ``sender``.

.. code-block:: rust

   #[test]
   fn my_test(){
       // .. Lines omitted for brevity.
       let invoke = chain
           .contract_invoke(
               account_address,
               Address::Contract(initialization.contract_address),
               Energy::from(10000),
               UpdateContractPayload {
                   address: initialization.contract_address,
                   receive_name: OwnedReceiveName::new_unchecked("my_contract.my_view".to_string()),
                   message: OwnedParameter::empty(),
                   amount: Amount::zero(),
               }
           )
           .unwrap();
   }

This concludes the introduction to the primary methods on the |Chain|_ type.
Next section covers how to access the common data needed for assertions in smart contract integration tests.

Data for assertions
-------------------

This section covers how to get the data most commonly used for assertions in smart contract integration tests.

Return values
=============

Both |Chain_contract_update|_ and |Chain_contract_invoke|_ have return values when they succeed, or if they fail in a specific way.
On success, you can access the return value directly, for example ``update.return_value``, which is a byte array, ``Vec<u8>``.
But the methods can fail in multiple ways, for example if the contract runs out of energy or it panics, and the return value is only available when the contract rejects on its own.
The helper method |return_value|_ on the |ContractInvokeError|_ struct tries to extract the return value and returns an ``Option<Vec<u8>>``.
To deserialize the return value into structured data, you can use the helper function |from_bytes|_, which returns a ``Result<T, ParseError>``, where ``T`` is the type you want to parse.
For example:

.. code-block:: rust

   let chain = Chain::new();
   // .. Creation of accounts and contracts omitted for brevity.

   // On success:
   let update = chain.contract_update(..).unwrap();
   let update_return_value = update.return_value;
   let returned_string: String = from_bytes(&update_return_value).unwrap();
   assert_eq!(returned_string, "My expected string");

   // On error:
   let update_error = chain.contract_update(..).unwrap_err();
   let update_error_return_value = update_error.return_value().unwrap(); // Unwrap the `Option`.
   let returned_contract_error: MyContractError = from_bytes(&update_error_return_value).unwrap();
   assert_eq!(returned_contract_error, MyContractError::NotOwner);

Balances
========

You can query the balance of accounts and contracts with the |Chain|_.
Since accounts can stake part of their balance and also receive transfers with a schedule, their balance has three parts.

- The total balance, part of which might be staked or locked.
- The staked amount of CCD.
- The locked amount which is unreleased, but can be used for staking.

The method |Chain_account_balance|_ returns all three elements, and the method |Chain_account_balance_available|_ returns only the amount of CCD available for making transactions and transfers, i.e. the part which isn't staked and/or locked.

Contracts only have one balance which you can query with |Chain_contract_balance|_.

All the balance methods return an ``Option`` as the account or contract might not exist.

Example:

.. code-block:: rust

   let chain = Chain::new();
   // .. Creation of accounts and contracts omitted for brevity.
   let account_balance = chain.account_balance_available(account_address);
   let contract_balance = chain.contract_balance(initialization.contract_address);

   assert_eq!(account_balance, Some(Amount::from_ccd(111)));
   assert_eq!(contract_balance, Some(Amount::from_ccd(22)));

Contract trace elements
=======================

The contract trace elements describe the contract calls, transfers to accounts, module upgrades, and the success of these during a |Chain_contract_update|_ or |Chain_contract_invoke|_.

The struct returned on success from these calls has a ``trace_elements`` field which is a list of *all* the elements in the order that they occurred.
If you want the trace elements grouped per contract address, use the method |trace_elements|_.

Example:

.. code-block:: rust

   let chain = Chain::new();
   // .. Creation of accounts and contracts omitted for brevity.
   let update = chain.contract_update(..).unwrap();
   let elements_per_contract = update.trace_elements();

   // No events occured for contract <123, 0>.
   assert_eq!(elements_per_contract.get(&ContractAddress(123,0))), None);
   // Check that the contract was updated.
   assert_eq!(elements_per_contract[&initialization.contract_address], [
        ContractTraceElement::Updated {
            data: InstanceUpdatedEvent {
                address:          contract_address,
                amount:           Amount::zero(),
                receive_name:     OwnedReceiveName::new_unchecked("my_contract.my_entrypoint".to_string()),
                contract_version: concordium_base::smart_contracts::WasmVersion::V1,
                instigator:       Address::Account(account_address),
                message:          OwnedParameter::empty(),
                events:           Vec::new(),
            },
        }
   ])


Writing out all the fields in the trace elements can be cumbersome, so using a ``matches!`` macro can be beneficial, as it allows you to use the pattern matching syntax for extracting only that parts you need.

This example checks that the correct types of trace elements are there (``Interrupted``, ``Upgraded``, ``Resumed``, ``Updated``), and that the module references of the upgrade are correct.

.. code-block:: rust

    assert!(matches!(update.trace_elements[..], [
                ContractTraceElement::Interrupted { .. },
                ContractTraceElement::Upgraded { from, to, .. },
                ContractTraceElement::Resumed { .. },
                ContractTraceElement::Updated { .. },
            ] if from == old_module_reference && to == new_module_reference));

Transfers to accounts
=====================

One of the trace elements from the previous section, ``Transferred``, describes a transfer from an contract to an account.
With the helper method |account_transfers|_, you can get an iterator over all transfers to accounts in the order that they occured in a single call of |Chain_contract_update|_ or |Chain_contract_invoke|_.

Example:

.. code-block:: rust

   let chain = Chain::new();
   // .. Creation of accounts and contracts omitted for brevity.
   let update = chain.contract_update(..).unwrap();
   // Collect the iterator into a vector.
   let account_transfers: Vec<Transfer> = update.account_transfers().collect();

   // Check that a single transfer of 10 CCD occurred.
   assert_eq!(
       account_transfers, [Transfer {
       from: ContractAddress::new(1, 0),
       amount: Amount::from_ccd(10),
       to: AccountAddress([0u8;32]),
   }]);

.. _concordium-smart-contract-testing: https://docs.rs/concordium-std-derive/latest/concordium_smart-contract-testing
.. |concordium-smart-contract-testing| replace:: ``concordium-smart-contract-testing``
.. _Account: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Account.html
.. |Account| replace:: ``Account``
.. _Account_new: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Account.html#method.new
.. |Account_new| replace:: ``Account::new``
.. _Signer: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Signer.html
.. |Signer| replace:: ``Signer``
.. _Address: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/enum.Address.html
.. |Address| replace:: ``Address``
.. _AccountAddress: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.AccountAddress.html
.. |AccountAddress| replace:: ``AccountAddress``
.. _ContractAddress: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.ContractAddress.html
.. |ContractAddress| replace:: ``ContractAddress``
.. _ModuleReference: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/type.ModuleReference.html
.. |ModuleReference| replace:: ``ModuleReference``
.. _Energy: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Energy.html
.. |Energy| replace:: ``Energy``
.. _Amount: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Amount.html
.. |Amount| replace:: ``Amount``
.. _ContractTraceElement: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/enum.ContractTraceElement.html
.. |ContractTraceElement| replace:: ``ContractTraceElement``

.. _OwnedParameter: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.OwnedParameter.html
.. |OwnedParameter| replace:: ``OwnedParameter``
.. _OwnedParameter_from_serial: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.OwnedParameter.html#method.from_serial
.. |OwnedParameter_from_serial| replace:: ``OwnedParameter::from_serial``
.. _OwnedParameter_empty: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.OwnedParameter.html#method.empty
.. |OwnedParameter_empty| replace:: ``OwnedParameter::empty``
.. _OwnedReceiveName: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.OwnedReceiveName.html
.. |OwnedReceiveName| replace:: ``OwnedReceiveName``
.. _OwnedReceiveName_new: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.OwnedReceiveName.html#method.new
.. |OwnedReceiveName_new| replace:: ``OwnedReceiveName::new``
.. _OwnedReceiveName_new_unchecked: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.OwnedReceiveName.html#method.new_unchecked
.. |OwnedReceiveName_new_unchecked| replace:: ``OwnedReceiveName::new_unchecked``
.. _OwnedContractName: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.OwnedContractName.html
.. |OwnedContractName| replace:: ``OwnedContractName``
.. _OwnedContractName_new: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.OwnedContractName.html#method.new
.. |OwnedContractName_new| replace:: ``OwnedContractName::new``
.. _OwnedContractName_new_unchecked: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.OwnedContractName.html#method.new_unchecked
.. |OwnedContractName_new_unchecked| replace:: ``OwnedContractName::new_unchecked``

.. _from_bytes: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/fn.from_bytes.html
.. |from_bytes| replace:: ``from_bytes``
.. _module_load_v1: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/fn.module_load_v1.html
.. |module_load_v1| replace:: ``module_load_v1``

.. _Chain: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html
.. |Chain| replace:: ``Chain``
.. _Chain_new: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html#method.new
.. |Chain_new| replace:: ``Chain::new``
.. _Chain_contract_init: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html#method.contract_init
.. |Chain_contract_init| replace:: ``contract_init``
.. _Chain_contract_update: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html#method.contract_update
.. |Chain_contract_update| replace:: ``contract_update``
.. _Chain_contract_invoke: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html#method.contract_invoke
.. |Chain_contract_invoke| replace:: ``contract_invoke``
.. _Chain_create_account: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html#method.create_account
.. |Chain_create_account| replace:: ``create_account``
.. _Chain_module_deploy_v1: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html#method.module_deploy_v1
.. |Chain_module_deploy_v1| replace:: ``module_deploy_v1``
.. _Chain_account_balance: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html#method.account_balance
.. |Chain_account_balance| replace:: ``account_balance``
.. _Chain_account_balance_available: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html#method.account_balance_available
.. |Chain_account_balance_available| replace:: ``account_balance_available``
.. _Chain_contract_balance: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.Chain.html#method.contract_balance
.. |Chain_contract_balance| replace:: ``contract_balance``
.. _trace_elements: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.ContractInvokeSuccess.html#method.trace_elements
.. |trace_elements| replace:: ``trace_elements``
.. _account_transfers: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.ContractInvokeSuccess.html#method.account_transfers
.. |account_transfers| replace:: ``account_transfers``
.. _return_value: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.ContractInvokeError.html#method.return_value
.. |return_value| replace:: ``return_value``
.. _ContractInvokeError: https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/struct.ContractInvokeError.html
.. |ContractInvokeError| replace:: ``ContractInvokeError``
