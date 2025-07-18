.. include:: ../../variables.rst
.. _transactions:

============
Transactions
============


A transaction on the Concordium blockchain is an operation which applies some change to the chain. All transactions are recorded on the chain and once recorded, they are immutable. A transaction always has one sender :term:`account` and is signed using the keys of this account.

The most basic transaction is the CCD transfer that is used to send CCD from one account to another. However, there are several transaction types on the Concordium blockchain.

You can make transactions using one of the Concordium wallets or the Concordium Client. Note that some wallets do not support all transaction types, and that you need a LEDGER device to submit transactions from the Desktop Wallet.

+----------------------------+-------------------+---------------+-------------------+-----------+
|                            | |bw|              |Desktop Wallet | Concordium Client | |cryptox| |
+============================+===================+===============+===================+===========+
| Send CCD                   | |check|           | |check|       | |check|           ||check|    |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Send CCD with a schedule   |                   | |check|       | |check|           |           |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Unshield CCD               |                   |               |                   | |check|   |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Add validator              | |check|           | |check|       | |check|           | |check|   |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Remove validator           | |check|           | |check|       | |check|           | |check|   |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Update validator stake     | |check|           | |check|       | |check|           | |check|   |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Update restake earnings    | |check|           | |check|       | |check|           | |check|   |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Update validator keys      | |check|           | |check|       | |check|           | |check|   |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Update account credentials |                   | |check|       | |check|           | |check|   |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Connect to dApps           | |check|           |               |                   | |check|   |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Delegation                 | |check|           | |check|       | |check|           | |check|   |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Smart contract transactions|                   |               | |check|           |           |
+----------------------------+-------------------+---------------+-------------------+-----------+
| Manage tokens              |                   | |check|       + |check|           + |check|   +
+----------------------------+-------------------+---------------+-------------------+-----------+

- |cryptox|: supports send CCD, receive CCD, validator management, delegation, connect to dApps, add and manage tokens, and unshielding.
- |bw|: supports send CCD, receive CCD, connect to dApps, validator management, delegation.
- Desktop Wallet: supports all transaction types (except smart contract transactions).
- Concordium Client: supports all transaction types.

.. |check|  unicode:: U+2713 .. CHECKMARK

.. toctree::
   :hidden:
   :maxdepth: 1

   transaction lifecycle
   transaction-fees
