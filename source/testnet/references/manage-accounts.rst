.. _`The mobile wallet: Concordium ID`: #the-mobile-wallet-concordium-id
.. _Command-line tool: #command-line-tool
.. _Node Dashboard: #node-dashboard
.. _Account sequence number: #account-sequence-number
.. _on-chain: /testnet/docs/glossary#on-chain
.. _off-chain: /testnet/docs/glossary#off-chain
.. _shielded transfers: /testnet/docs/quickstart-shielded-transfers
.. _Concordium ID: /testnet/docs/downloads#concordium-id
.. _Notabene: https://notabene.id
.. _concordium-client: /testnet/docs/client
.. _import: /testnet/docs/client#import-accounts-and-keys-from-wallet-apps
.. _transaction: /testnet/docs/transactions
.. _Discord: https://discord.com/invite/xWmQ5tp

.. _managing_accounts:
   
=================
Managing Accounts
=================

.. contents::
   :local:
   :backlinks: none


An account on the Concordium blockchain consists of two parts. The `on-chain`_
part which is publicly visible, and maintained by the bakers, and the
`off-chain`_ part which contains

-  private keys of the account which are used to sign actions by the
   account (e.g., sending transfers, deploying smart contracts)
-  the identity an account is created from. This is needed for managing
   the account on the chain, e.g., renewing it.
-  decryption keys used for `shielded transfers`_.

Concordium provides several ways of interacting with the on-chain account.
Off-chain parts of accounts can be transferred between different devices, and
the same account can be used from multiple devices at the same time.

Accounts on the chain are identified via an account address, which is a 32-byte
sequence. The address is usually displayed in Base58Check encoding with version
byte 1. An example of such an address is
``3ZFGxLtnUUSJGW2WqjMh1DDjxyq5rnytCwkSqxFTpsWSFdQnNn``.

In the tools described below the user will typically select an **account name**
which makes the account easier to identify. It is important to note that an
account name is a purely local concept and is not used by the Concordium
blockchain.

The mobile wallet: Concordium ID
================================

`Concordium ID`_ is a smartphone app that allows creation of accounts from
identities issued by the external identity provider `Notabene`_, as well as
transfers of GTU from created accounts.

This app can export identities and accounts that the user created.

Command-line tool
=================

The Concordium distribution ships with a command-line tool named
concordium-client_. It is designed as a low-level interface to the
Concordium blockchain. It cannot be used to create identities, but it can
`import`_ accounts exported from the mobile wallets. Once an account has been
imported, the tool can be used to do GTU transfers from the account, as well as
send all other `transaction`_ types supported by the Concordium blockchain.

Node Dashboard
==============

The node dashboard can import accounts from the files exported from the wallet.
The dashboard only uses the account to register the node as a baker.

The node dashboard shares configuration with ``concordium-client``, so once an
account has been imported into one of the applications, it is also available in
the other.

Account sequence number
=======================

Each account on the Concordium blockchain has a sequence number and each
transaction signed by the account must have a sequence number. For a transaction
to be considered valid its sequence number must be the next available one for
the account. The sequence number is maintained by all the bakers in order to
validate transactions.

The sequence number can be looked up from an up to date node by running

.. code-block:: console

   $concordium-client account show [ACCOUNT]

where ``[ACCOUNT]`` is an optional argument that is either an address of an
account or the name of an account chosen when importing the account. If no
address is provided, ``concordium-client`` will use the account name
``default``.

The mobile wallets and the node dashboard automatically keep track of the
sequence number and assign the correct one when sending transactions.
``concordium-client`` also tracks the sequence number automatically, but it can
also be set manually via the option ``--nonce``.

.. _support--feedback:

Support & Feedback
==================

If you run into any issues or have suggestions, post your question or
feedback on Discord_, or contact us at testnet@concordium.com.
