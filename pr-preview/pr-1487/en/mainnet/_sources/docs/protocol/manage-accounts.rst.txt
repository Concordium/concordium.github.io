.. _Discord: https://discord.com/invite/xWmQ5tp
.. include:: ../../variables.rst
.. _managing_accounts:

========
Accounts
========

Accounts and identities are strongly linked on the Concordium platform. To participate on the blockchain - whether holding :term:`CCD`, making :term:`transactions<transaction>`, or :term:`validating<validator>` - you need both an account and an :term:`identity`. This is regardless of whether you are using one of the :term:`Concordium wallets<wallet>` or :term:`Concordium Client` for your transactions.

You must have a verified identity and a user identity certificate issued by an authorized :term:`identity provider` to create accounts on the Concordium platform.

For detailed information about identities, see :ref:`Identity framework on Concordium<reference-identity>`.

For comprehensive developer documentation on the Concordium Client, see the :ref:`the Conclordium Client documentation<concordium-client>`.

What is an account
==================

An account on the Concordium blockchain is owned by one or more :term:`credential holders<credential holder>` and consists of two parts: The :term:`on-chain` part, which is publicly visible and maintained by the :term:`validators<validator>`, and the :term:`off-chain` part.

The on-chain part of the account consists of:

- the credentials of the credential holders associated with the account
- the public balance
- the account sequence number
- the public keys of each credential to verify transaction signatures.

The off-chain part of the account contains:

-  the private keys of credential holders which are used to sign actions by the
   account (e.g., sending transfers or deploying smart contracts)
-  the identity an account is created from (needed for managing
   the account on the chain)

.. Note::
   It is possible to create a shared account where multiple users share one account. For more information, see :ref:`Overview of shared accounts with multiple credentials<overview-shared-accounts>`.

How to use an account
======================

Concordium provides several ways of interacting with the on-chain account.
The same account can be used from multiple devices simultaneously, and off-chain parts of accounts can be transferred between different devices.

Concordium offers wallet applications in :doc:`mobile, browser and desktop versions<../guides/deciding-wallet>`.

Accounts on the chain are identified by an account address, which is a 32-byte
sequence. When using a Concordium wallet, however, you'll typically assign an **account name**
to make the account easier to identify. This is only a local alias not used by the Concordium blockchain - the name gets resolved to an actual address before any blockchain interactions.

How to get an account
=====================

Once you have a verified identity and user identity certificate, you can create accounts through your chosen wallet application. The process varies slightly depending on which wallet you use:

* Concordium Wallet and Concordium Wallet for Web: You create all accounts yourself directly in the wallet.

* Desktop Wallet: The identity provider creates an :ref:`initial account<initial-accounts>` for you during identity verification, though you may want to create additional regular accounts for enhanced privacy.

Account creation is an on-chain transaction that submits a credential containing cryptographic proofs to the blockchain. These proofs verify your identity without revealing personal information.

:ref:`See detailed information on the steps involved in the account creation process<reference-user-processes>`.

:ref:`See wallet-specific instructions on creating accounts<create-account>`.


.. toctree::
   :hidden:
   :maxdepth: 1

   account-concepts
   account-aliases
   key-derivation-and-usage

