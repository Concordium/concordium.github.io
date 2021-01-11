.. _Notabene: https://notabene.id
.. _Discord: https://discord.com/invite/xWmQ5tp

.. _managing_accounts:

========
Accounts
========

.. contents::
   :local:
   :backlinks: none


An account on the Concordium blockchain consists of two parts. The :ref:`on-chain<glossary-on-chain>`
part which is publicly visible, and maintained by the bakers, and the
:ref:`off-chain<glossary-off-chain>` part which contains

-  private keys of the account which are used to sign actions by the
   account (e.g., sending transfers, deploying smart contracts)
-  the identity an account is created from. This is needed for managing
   the account on the chain.
-  decryption keys used for :ref:`shielded transfers<glossary-shielded-transfer>`.

Concordium provides several ways of interacting with the on-chain account.
Off-chain parts of accounts can be transferred between different devices, and
the same account can be used from multiple devices at the same time.

Accounts on the chain are identified via an account address, which is a 32-byte
sequence. The address is usually displayed in Base58Check encoding with version
byte 1. An example of such an address is
``3ZFGxLtnUUSJGW2WqjMh1DDjxyq5rnytCwkSqxFTpsWSFdQnNn``.

In the tools described below the user will typically select an **account name**
which makes the account easier to identify. This is only a local alias, and is not used by the Concordium blockchain.
The name is resolved to an address before interactions with the node.

.. _managing-concordium-id:

The mobile wallet: Concordium ID
================================

:ref:`concordium_id` is a smartphone app that allows creation of accounts from
identities issued by the external identity provider `Notabene`_, as well as
transfers of GTU from created accounts. It supports both plain and encrypted transfers.

This app can export identities and accounts that the user created.

Command-line tool
=================

The Concordium distribution ships with a command-line tool named
:ref:`concordium-client<concordium_client>`. It is designed as a low-level interface to the
Concordium blockchain. It cannot be used to create identities, but it can
:ref:`import accounts<concordium-client-import-accounts-keys>` exported from the mobile wallets. Once an account has been
imported, the tool can be used to do GTU transfers from the account, as well as
send all other :ref:`transaction<transactions>` types supported by the Concordium blockchain.

Account sequence number
=======================

Each account on the Concordium blockchain has a :ref:`sequence number<glossary-transaction-sequence-number>` and each
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

The :ref:`concordium_id` keeps track of the sequence number and assigns the correct one when sending transactions.
``concordium-client`` tracks the sequence number automatically, but it can
also be set manually via the option ``--nonce``.

Support & Feedback
==================

If you run into any issues or have suggestions, post your question or
feedback on Discord_, or contact us at testnet@concordium.com.
