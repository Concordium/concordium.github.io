.. _migrate-contracts-for-std-8.1:

==============================================
Migrate contracts for ``concordium-std`` 8.1
==============================================

With the |concordium_std|_ version ``8.1`` release, writing and reading smart contracts is easier than ever before.
The new version of the standard library reduces the need for generics and traits in your init and receive methods.
These generics and traits were there to support testing with the |test_infrastructure|_, which has been deprecated in favor of the |concordium-smart-contract-testing|_ library.

This guide shows you how to migrate your contract code to use the simpler concrete types and use fewer generics.

.. note::

   You should only migrate your contract code if you are also ready to migrate all your tests, that invoke init or receive methods directly, to use the |concordium-smart-contract-testing|_ library.

Migrating ``init`` methods
==========================

To migrate a typical ``init`` method you must change the following:

- Remove the generic parameter ``<S: HasStateApi>`` on the init method
- Replace the trait ``&impl HasInitContext`` with the concrete type ``&InitContext``
- Remove the generic parameter ``<S>`` on the ``StateBuilder``

Here is an example:

.. code-block:: rust
   :emphasize-lines: 10-12

   /// Before
   #[init(contract = "contract_before")]
   fn init_before<S: HasStateApi>(
       ctx: &impl HasInitContext,
       state_builder: &mut StateBuilder<S>,
   ) -> InitResult<State> { todo!() }

   /// After
   #[init(contract = "contract_after")]
   fn init_after(                        // `<S: HasStateApi>` removed
       ctx: &InitContext,                // `impl` and `Has` removed
       state_builder: &mut StateBuilder, // `<S>` removed
   ) -> InitResult<State> { todo!() }


Migrating ``receive`` methods
=============================

To migrate a typical ``receive`` method you must change the following:

- Remove the generic parameter ``<S: HasStateApi>`` on the receive method
- Replace the trait ``&impl HasReceiveContext`` with the concrete type ``&ReceiveContext``
- Replace the trait ``&impl HasHost<..>`` with the concrete type ``&Host``
- Remove the generic parameter ``StateApiType = S`` on the ``Host``

Here is an example:

.. code-block:: rust
   :emphasize-lines: 10-12

   /// Before
   #[receive(contract = "my_contract", name = "my_receive")]
   fn receive_before<S: HasStateApi>(
       ctx: &impl HasReceiveContext,
       host: &impl HasHost<State, StateApiType = S>,
   ) -> ReceiveResult<MyReturnValue> { todo!() }

   /// After
   #[receive(contract = "my_contract", name = "my_receive")]
   fn receive_after(           // `<S: HasStateApi>` removed
       ctx: &ReceiveContext,   // `impl` and `Has` removed
       host: &Host<State>,     // `impl Has` and `, StateApiType = S removed
   ) -> ReceiveResult<MyReturnValue> { todo!() }

Migrating advanced state types
==============================

If your contract state directly, or indirectly, contains one or more advanced state types, i.e., |StateMap|_, |StateSet|_, or |StateBox|_, then you also need to make a small adjustment.
The advanced state types are generic over not only the types stored, such as the keys and values in a map but also over a type that implements the |HasStateApi|_ trait.
This is because the deprecated |test_infrastructure|_ used a different implementation of the underlying contract state, i.e., a different implementation of |HasStateApi|_, than the Concordium nodes do.
But |concordium-smart-contract-testing|_ uses the exact same state implementation as the nodes do and it is therefore possible to specify the concrete type, |StateApi|_, as the default.

Until the |test_infrastructure|_ module is completely removed, the libraries will still support it, and thus the generic parameter ``S`` must still be present.

To migrate an advanced state type you must change the following:

- Set ``StateApi`` as the default type for the generic parameters that must implement |HasStateApi|_ (typically named ``S``)
- Remove the generic type parameter for the |HasStateApi|_ type where you use your state type, e.g., ``MyState`` instead of ``MyState<S>``

Here is an example of the change you must make:

.. code-block:: rust
   :emphasize-lines: 15, 23

   /// Before
   struct MyState<S> {
       my_map: StateMap<AccountAddress, TokenCount, S>,
   }

   #[init(contract = "contract_before")]
   fn init_before<S: HasStateApi>(
       ctx: &impl HasInitContext,
       state_builder: &mut StateBuilder<S>,
   ) -> InitResult<MyState<S>> {
       Ok(MyState{ my_map: state_builder.new_map() })
   }

   /// After
   struct MyState<S = StateApi> {
       my_map: StateMap<AccountAddress, TokenCount, S>,
   }

   #[init(contract = "contract_before")]
   fn init_before(
       ctx: &InitContext,
       state_builder: &mut StateBuilder,
   ) -> InitResult<MyState> {
       Ok(MyState{ my_map: state_builder.new_map() })
   }

Reference material for migrating types and tests
================================================

The examples above show how to migrate most contracts, but for advanced contracts, there may be more types to migrate.
The list below shows how to achieve that.
It also includes types already described above:

- ``&impl HasInitContext`` becomes ``&InitContext``
- ``&impl HasReceiveContext`` becomes ``&ReceiveContext``
- ``&mut StateBuilder<S>`` becomes ``&mut StateBuilder``
- ``&impl HasHost<MyState, StateApiType = S>`` becomes ``&Host<MyState>``
- ``&mut impl HasHost<MyState, StateApiType = S>`` becomes ``&mut Host<MyState>``
- When using the ``low_level`` attribute:

  - On inits: ``&mut impl HasStateApi`` becomes ``&mut StateApi``
  - On receives: ``&mut impl Host<S>`` becomes ``&mut LowLevelHost``

- ``struct MyState<S> { my_map: StateMap<_,_, S> }`` becomes ``struct MyState<S = StateApi> { my_map: StateMap<_, _, S> }``
- ``&impl HasCryptoPrimitives`` becomes ``&CryptoPrimitives``
- ``&impl HasChainMetadata`` becomes ``&ChainMetadata``
- ``&mut impl HasLogger`` becomes ``&mut Logger``

To migrate your tests, read the how-to guide :ref:`integration-test-contract`.
You can also refer to the `pull request <https://github.com/Concordium/concordium-rust-smart-contracts/pull/347>`_, where our example contracts were rewritten.
This shows both the removal of generics and how to migrate tests from using |test_infrastructure|_ to |concordium-smart-contract-testing|_.

.. |concordium_std| replace:: ``concordium_std``
.. _concordium_std: https://docs.rs/concordium-std/latest/concordium_std
.. |test_infrastructure| replace:: ``test_infrastructure``
.. _test_infrastructure: https://docs.rs/concordium-std/8.1/concordium_std/test_infrastructure
.. _concordium-smart-contract-testing: https://docs.rs/concordium-std-derive/latest/concordium_smart-contract-testing
.. |concordium-smart-contract-testing| replace:: ``concordium-smart-contract-testing``
.. _StateBox: https://docs.rs/concordium-std/latest/concordium_std/struct.StateBox.html
.. |StateBox| replace:: ``StateBox``
.. _StateMap: https://docs.rs/concordium-std/latest/concordium_std/struct.StateMap.html
.. |StateMap| replace:: ``StateMap``
.. _StateSet: https://docs.rs/concordium-std/latest/concordium_std/struct.StateSet.html
.. |StateSet| replace:: ``StateSet``
.. _HasStateApi: https://docs.rs/concordium-std/8.0.0/concordium_std/trait.HasStateApi.html
.. |HasStateApi| replace:: ``HasStateApi``
.. _StateApi: https://docs.rs/concordium-std/latest/concordium_std/type.StateApi.html
.. |StateApi| replace:: ``StateApi``
.. _HasLogger: https://docs.rs/concordium-std/8.0.0/concordium_std/trait.HasLogger.html
.. |HasLogger| replace:: ``HasLogger``
