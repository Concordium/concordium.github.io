.. include:: ../../variables.rst
.. _account-concepts:

=================
Account concepts
=================

.. _managing-account-balances:

Account balances
================

An account has a *public balance* which can be *seen* by anyone.
The public balance of the account is used for payment of transaction fees,
producing blocks, and transfers.

At any given time some of the public balance might be unavailable for use. This
can happen in two ways:

- the account has staked some of the public
  balance in order to become a validator or to delegate
- some of the public balance is locked up because it was received via a
  :term:`transfer with schedule`

The locked-up balance can be staked, but it can not be used for payment of
transaction fees, nor can it be transferred to other accounts.

Here's an example that illustrates the relationship between the different balances (in this explanation, transaction fees are ignored). Suppose that on January 1 the account starts
with 100 CCD on the public balance. None of it is locked-up or staked.

Then on January 2 the account receives 50 CCD via a :term:`transfer with
schedule` with the release scheduled for
December 31 of the same year. At this point, January 2, the account has 100 CCD
at disposal, the rest being locked. If the account tried to transfer more than
100 CCD the transaction would be rejected.

On January 3 the account becomes a validator with the initial stake of 125 CCD.
This is successful because the total public balance is 150CCD.
After this the account still has 25 CCD at disposal, because CCD locked in a release schedule will be prioritized for stakes.


Account sequence number
=======================

Each account on the Concordium blockchain has a :term:`sequence number<transaction sequence number>` and each
transaction signed by the account must have a sequence number. For a transaction
to be considered valid its sequence number must be the next available one for
the account. The sequence number is maintained by all the bakers in order to
validate transactions.

You can :ref:`look up the sequence number<account-seqno>` from an up to date node using Concordium Client.

The |cryptox| keeps track of the sequence number and assigns the correct one when sending transactions.
``concordium-client`` tracks the sequence number automatically, but it can
also be set manually.

.. _account-aliasses:

Account aliases
===============

In protocol versions 1 and 2 accounts and account addresses have a one-to-one relationship. In protocol version 3 each account has ``16777216`` addresses, namely a so-called canonical account address together with
matching :term:`account aliases<alias>`. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial ``29 bytes`` are referred to as account aliases for
the same account. Thus, accounts can be referred to by any address whose initial ``29 bytes`` match.

This allows each account to have aliases for different uses and creates a kind of sub-account structure. An account owner can give out different aliases for different uses to keep track of transfers and assign them meaning.

Each account still has one total account balance. Hence, transfers to and from aliases of an account add to and subtract from that total account balance, respectively. Transfers between different aliases of the same account do not change the balance of the account, apart from cost. Rewards are always received on the account's canonical address.

To show aliases, :ref:`run a transaction in Concordium Client<account-aliases>`.

How account aliases work
------------------------

Concordium account addresses are ``32 bytes`` long with a specific structure:

- Bytes ``0-28`` (``29`` bytes): **Account identifier** - identical for all aliases of the same account
- Bytes ``29-31`` (``3`` bytes): **Alias identifier** - varies to create different aliases (``0`` to ``16,777,215``)

All aliases mathematically exist and do not need to be created or registered on the blockchain. They are simply different valid representations of the same account.

Use cases and considerations
----------------------------

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

