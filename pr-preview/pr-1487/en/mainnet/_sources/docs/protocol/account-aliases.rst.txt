.. include:: ../../variables.rst
.. _account-aliases-details:

================
Account aliases
================


.. _account-aliasses:

In protocol versions 1 and 2 accounts and account addresses have a one-to-one relationship. In protocol version 3 each account has ``16777216`` addresses, namely a so-called canonical account address together with
matching :term:`account aliases<alias>`. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial ``29 bytes`` are referred to as account aliases for
the same account. Thus, accounts can be referred to by any address whose initial ``29 bytes`` match.

This allows each account to have aliases for different uses and creates a kind of sub-account structure. An account owner can give out different aliases for different uses to keep track of transfers and assign them meaning.

Each account still has one total account balance. Hence, transfers to and from aliases of an account add to and subtract from that total account balance, respectively. Transfers between different aliases of the same account do not change the balance of the account, apart from cost. Rewards are always received on the account's canonical address.

To show aliases, :ref:`run a transaction in Concordium Client<account-aliases>`.

How account aliases work
========================

Concordium account addresses are ``32 bytes`` long with a specific structure:

- Bytes ``0-28`` (``29`` bytes): **Account identifier** - identical for all aliases of the same account
- Bytes ``29-31`` (``3`` bytes): **Alias identifier** - varies to create different aliases (``0`` to ``16,777,215``)

All aliases mathematically exist and do not need to be created or registered on the blockchain. They are simply different valid representations of the same account.

Use cases and considerations
============================

You can generate and verify aliases using the Concordium SDKs:

- ``Rust SDK``: use the ``get_alias`` and ``is_alias`` methods on the `AccountAddress type <https://docs.rs/concordium-rust-sdk/latest/concordium_rust_sdk/common/types/struct.AccountAddress.html#method.get_alias>`_. An `utility <https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/aliases.rs>`_ that checks whether a list of accounts are all aliases of each other is also available.
- ``TypeScript SDK``: use the ``getAlias`` and ``isAlias`` `methods <https://github.com/Concordium/concordium-node-sdk-js/blob/main/packages/sdk/src/types/AccountAddress.ts#L182>`_ for reference.

Key points to remember:

- All aliases share the same account balance and transaction history.
- Transfers between aliases of the same account only cost transaction fees.
- All ``16,777,216`` aliases exist mathematically from the moment you created your account on-chain.

.. note:: Token Behavior with Alias Account Addresses

   - ``CCD`` / ``PLTs``: Can be sent directly to alias account addresses since the aliases feature is built into the Concordium protocol.
   - ``CIS-2 tokens``: Are not aware of aliases by default. Smart contracts typically treat each alias address as an independent entity, meaning each alias address maintains its own separate CIS-2 token balance. However, this behavior depends on the specific smart contract implementation—contracts can be designed to mimic the protocol layer's alias handling.
   - Important consideration for smart contract developers: Special care should be taken when implementing blacklisting/whitelisting functionality due to alias behavior. Each alias address may need to be handled individually unless the contract is specifically designed to recognize aliases. Reference example: `CIS-2 Multi Contract Implementation <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-multi/src/lib.rs#L831>`_.

