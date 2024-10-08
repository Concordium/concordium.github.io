.. include:: ../../variables.rst
.. _transactions-overview:

=====================
Transactions overview
=====================

A transaction on the Concordium blockchain is an operation which applies some change to the chain. All transactions are recorded on the chain and once recorded, they are immutable. A transaction always has one sender :term:`account` and is signed using the :term:`keys<private keys>` of this account.

The most basic transaction is the CCD transfer that is used to send CCD from one account to another. However, there are several transaction types on the Concordium blockchain.

You can make transactions using either the Desktop Wallet, the |cryptox|, |mw-gen2|, |mw-gen1|, |bw|, or the Concordium Client. Note that the |mw-gen1|, |mw-gen2|, |cryptox|, and |bw| don’t support all transaction types, and that you need a LEDGER device to submit transactions from the Desktop Wallet.

+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
|                            | |mw-gen1|     | |mw-gen2|      | |bw|              |Desktop Wallet | Concordium Client | |cryptox| |
+============================+===============+================+===================+===============+===================+===========+
| Send CCD                   | |check|       | |check|        | |check|           | |check|       | |check|           ||check|    |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Send CCD with a schedule   |               |                |                   | |check|       | |check|           |           |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Unshield CCD               |               |                |                   |               |                   | |check|   |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Add validator              | |check|       | |check|        | |check|           | |check|       | |check|           | |check|   |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Remove validator           | |check|       | |check|        | |check|           | |check|       | |check|           | |check|   |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Update validator stake     | |check|       | |check|        | |check|           | |check|       | |check|           | |check|   |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Update restake earnings    | |check|       | |check|        | |check|           | |check|       | |check|           | |check|   |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Update validator keys      | |check|       | |check|        | |check|           | |check|       | |check|           | |check|   |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Update account credentials |               | |check|        |                   | |check|       | |check|           | |check|   |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Connect to dApps           |               | |check|        | |check|           |               |                   | |check|   |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Delegation                 | |check|       | |check|        | |check|           | |check|       | |check|           | |check|   |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Smart contract transactions|               |                |                   |               | |check|           |           |
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+
| Manage tokens              |               | |check|        |                   | |check|       + |check|           + |check|   +
+----------------------------+---------------+----------------+-------------------+---------------+-------------------+-----------+

- |cryptox|: supports send CCD, receive CCD, validator management, delegation, connect to dApps, add and manage tokens, and unshielding.
- |bw|: supports send CCD, receive CCD, connect to dApps, validator management, delegation.
- |mw-gen2|: supports send CCD, receive CCD, unshield CCD (:ref:`deprecated<shielded-balance-feature-deprecation>`), validator management, delegation, connect to dApps, add and manage tokens.
- |mw-gen1|: supports send CCD, receive CCD, unshield CCD (:ref:`deprecated<shielded-balance-feature-deprecation>`), validator management, delegation
- Desktop Wallet: supports all transaction types (except smart contract transactions).
- Concordium Client: supports all transaction types.

How transactions work
=====================

When a validator receives a transaction from a participant on the chain, it performs a few basic checks to verify that the transaction is eligible for *inclusion* in a :term:`block`. Transactions that meet all checks are considered *successful* and their changes are applied to the chain. If any of the checks fail, the transaction is ignored.

In some situations, transactions are included in the blockchain but recorded as *rejected*. This can happen, for example, if a sender tries to overdraw their account. If a transaction is rejected, the transaction fee is still deducted from the sender account but other than that, it has no effect.

There’s a :term:`sequence number<transaction sequence number>` associated with each account. This number increases sequentially with each transaction sent from the account and is recorded into the transaction. If a transaction has a sequence number that doesn’t  match the current sequence number of the account, the transaction is not eligible for inclusion on the chain. This ensures that transactions are included only once and in a specific order.

Transaction fees
=================

Every transaction has a well-defined *fee*, and the fee of each transaction depends on the transaction type. When the transaction is submitted to the chain, the fee is deducted from the sender's account and paid to the Concordium network as a fee for carrying out the transaction. The fee is measured in the unit NRG which corresponds to CCD according to a variable conversion factor (currently 1 NRG = 0.0001 CCD). The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. Read more about conversions between CCD, NRG, and Euros in :ref:`exchange-rates`.

The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.

You can see the fee in the transaction log.

Tools
=====

The |cryptox|
------------------

The |cryptox| is a digital smartphone wallet with a simpler onboarding process that enables you to create and manage your Concordium identities and accounts, to create simple transactions, validate and delegate, add and manage tokens, connect to dApps, and to export and import your accounts and identities.

The Desktop Wallet
------------------

The Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts from your desktop and to create transactions such as sending CCD, adding a validator, and exporting and importing account information.

The |mw-gen2|
------------------

The |mw-gen2| is a second generation digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, validate and delegate, add and manage tokens, connect to dApps, and to export and import your accounts and identities.

The |bw|
----------------

The |bw| is a web wallet extension that enables you to create and manage your Concordium identities and accounts, to create simple transactions, validate and delegate, and to connect to dApps.

The |mw-gen1|
-----------------

The |mw-gen1| is a digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, validate and delegate, and to export and import your accounts and identities. If you are a validator who runs a staking pool, it is not possible for pool owners to set the commissions in the |mw-gen1|; they are fixed at 10%. If you want to be able to adjust commissions, you must use the |cryptox|, |mw-gen2|, or |bw|. For information about the process, see :ref:`the delegation FAQ<wallet-migrate>`.

Command-line tool
-----------------

The Concordium distribution ships with a command-line tool named :ref:`concordium-client<concordium-client>`. It is designed as a low-level interface to the Concordium blockchain. It cannot be used to create identities, but it can :ref:`import accounts<concordium-client-import-accounts-keys>` exported from the other wallets. Once an account has been imported, the tool can be used to do CCD transfers from the account, as well as send all other :ref:`transaction<transactions>` types supported by the Concordium blockchain.

To learn more about the differences between the wallets, see :ref:`Deciding between the wallets<choosing-wallet>`.

.. Warning::
   It is not possible to exchange identities and accounts between the |mw-gen1| and the Desktop Wallet. If you try to import a file that has been exported from the |mw-gen1| into the Desktop Wallet, the import will fail, and likewise, if you try to import a file exported from the Desktop Wallet into the |mw-gen1|.

.. Warning::
   Because of the difference in the way private keys are handled between |mw-gen2| / |bw| and the first generation wallets (|mw-gen1| and Desktop Wallet), you cannot exchange identities and accounts between them.

   It is possible to exchange accounts and identities between the |cryptox|, |mw-gen2|, and the |bw|. Additionally, |mw-gen1| users can import backup files to |cryptox|.

.. |check|  unicode:: U+2713 .. CHECKMARK
