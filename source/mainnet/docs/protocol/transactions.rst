.. include:: ../../variables.rst
.. _transactions:

============
Transactions
============


A transaction on the Concordium blockchain is an operation which applies some change to the chain. All transactions are recorded on the chain and once recorded, they are immutable. A transaction always has one sender :term:`account` and is signed using the keys of this account.

The most basic transaction is the CCD transfer that is used to send CCD from one account to another. However, there are several :ref:`transaction types<transaction-types-overview>` on the Concordium blockchain.

How transactions work
=====================

When a :term:`validator` receives a transaction from a participant on the chain, it performs a few basic checks to verify that the transaction is eligible for *inclusion* in a :term:`block`. Transactions that meet all checks are considered *successful* and their changes are applied to the chain. If any of the checks fail, the transaction is ignored.

In some situations, transactions are included in the blockchain but recorded as *rejected*. This can happen, for example, if a sender tries to overdraw their account. If a transaction is rejected, the transaction fee is still deducted from the sender account but other than that, it has no effect.

There’s a :term:`sequence number<transaction sequence number>` associated with each account. This number increases sequentially with each transaction sent from the account and is recorded into the transaction. If a transaction has a sequence number that doesn’t  match the current sequence number of the account, the transaction is not eligible for inclusion on the chain. This ensures that transactions are included only once and in a specific order.

.. _transaction-types-overview:

Transaction types
=================
**1. Simple transfer**

This is the most fundamental transaction type, used for sending the native CCD token from one account to another. It is a straightforward value transfer, equivalent to a standard payment on other blockchains.

**2. Smart contract transactions**

This category covers all interactions with :term:`smart contracts<smart contract>`. It enables users to interact with dApps and manage tokens built on the CIS-2 standard (Concordium's universal token standard for Fungible, Non-Fungible, and Semi-Fungible tokens). Common actions include:

* Deploying and initializing contracts
* Updating contracts (e.g., calling a transfer function on a CIS-2 token)

**3. Staking and delegation transactions**

These transactions are essential for participating in Concordium's :term:`proof-of-stake` network. Key transactions for :term:`delegators<Delegator>` include:

* Add delegation: Staking CCD with a validator pool
* Update delegation: Changing the staked amount
* Remove delegation: Unstaking CCD

**4. Account and identity transactions**

Unique to Concordium's architecture, this category includes the crucial create account transaction. This must be submitted with the cryptographic credential from a user's verified :term:`identity object`, linking the new account to that identity.


References
==========

For a complete list of all transaction types and information about which wallets support each transaction, see :ref:`Transaction reference<transaction-reference>`.


.. toctree::
   :hidden:
   :maxdepth: 1

   transaction-reference
   transaction-fees
