.. include:: ../../variables.rst
.. _transactions-overview:

=====================
Transactions overview
=====================

A transaction on the Concordium blockchain is an operation which applies some change to the chain. All transactions are recorded on the chain and once recorded, they are immutable. A transaction always has one sender :ref:`account<glossary-account>` and is signed using the keys of this account.

The most basic transaction is the CCD transfer that is used to send CCD from one account to another. However, there are several transaction types on the Concordium blockchain.

You can make transactions using either the Desktop Wallet, the |mw-gen2|, |mw-gen1|, or the Concordium Client. Note that the |mw-gen1|, and |mw-gen2| don’t support all transaction types, and that you need a Ledger device to submit transactions from the Desktop Wallet.

+----------------------------+---------------+----------------+---------------+-------------------+
|                            | |mw-gen1|     | |mw-gen2|      |Desktop Wallet | Concordium Client |
+============================+===============+================+===============+===================+
| Send CCD                   | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Send CCD with a schedule   |               |                | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Shield CCD                 | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Unshield CCD               | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Make shielded transfer     | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Add baker                  | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Remove baker               | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Update baker stake         | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Update restake earnings    | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Update baker keys          | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Update account credentials |               | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+
| Connect to dApps           |               |                |               |                   |
+----------------------------+---------------+----------------+---------------+-------------------+
| Delegation                 | |check|       | |check|        | |check|       | |check|           |
+----------------------------+---------------+----------------+---------------+-------------------+

- |mw-gen1| and |mw-gen2|: supports send CCD, receive CCD, shield CCD and unshield CCD, baker management, delegation.
- Desktop Wallet: supports all transaction types (except smart contract transactions).
- Concordium Client: supports all transaction types.

How transactions work
=====================

When a baker receives a transaction from a participant on the chain, it performs a few basic checks to verify that the transaction is eligible for *inclusion* in a :ref:`block<glossary-block>`. Transactions that meet all checks are considered *successful* and their changes are applied to the chain. If any of the checks fail, the transaction is ignored. A transaction is permanent when the block that contains the transactions is :ref:`finalized<glossary-finalization>`.

In some situations, transactions are included in the blockchain but recorded as *rejected*. This can happen, for example, if a sender tries to overdraw their account. If a transaction is rejected, the transaction fee is still deducted from the sender account but other than that, it has no effect.

There’s a :ref:`sequence number<glossary-transaction-sequence-number>` associated with each account. This number increases sequentially with each transaction sent from the account and is recorded into the transaction. If a transaction has a sequence number that doesn’t  match the current sequence number of the account, the transaction is not eligible for inclusion on the chain. This ensures that transactions are included only once and in a specific order.

Transaction fees
=================

Every transaction has a well-defined *fee*, and the fee of each transaction depends on the transaction type. When the transaction is submitted to the chain, the fee is deducted from the sender's account and paid to the Concordium network as a fee for carrying out the transaction. The fee is measured in the unit NRG which corresponds to CCD according to a variable conversion factor (currently 1 NRG = 0.0001 CCD). The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. Read more about conversions between CCD, NRG, and Euros in :ref:`exchange-rates`.

The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.

You can see the fee in the transaction log.

Tools
=====

The Desktop Wallet
------------------

The Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts from your desktop and to create transactions such as sending CCD, adding a baker, and exporting and importing account information.

The |mw-gen1|
-----------------

The |mw-gen1| is a digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, bake and delegate, and to export and import your accounts and identities.

The |mw-gen2|
------------------

The |mw-gen2| is a second generation digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, bake and delegate, and to export and import your accounts and identities.

To learn more about the differences between the wallets, see :ref:`Deciding between the wallets<choosing-wallet>`.

.. warning:: You can't exchange identities and accounts between the |mw-gen1| or |mw-gen2| and the Desktop Wallet. You can, however, send CCD from one wallet to another.

Command-line tool
-----------------

The Concordium distribution ships with a command-line tool named
:ref:`concordium-client<concordium-client>`. It is designed as a low-level interface to the
Concordium blockchain. It cannot be used to create identities, but it can
:ref:`import accounts<concordium-client-import-accounts-keys>` exported from the mobile wallets. Once an account has been
imported, the tool can be used to do CCD transfers from the account, as well as
send all other :ref:`transaction<transactions>` types supported by the Concordium blockchain.

.. |check|  unicode:: U+2713 .. CHECKMARK