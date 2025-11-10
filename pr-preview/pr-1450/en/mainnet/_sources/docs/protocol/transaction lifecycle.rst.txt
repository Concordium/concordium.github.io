.. include:: ../../variables.rst
.. _transaction-lifecycle:

=====================
Transaction lifecycle
=====================

How transactions work
=====================

When a validator receives a transaction from a participant on the chain, it performs a few basic checks to verify that the transaction is eligible for *inclusion* in a :term:`block`. Transactions that meet all checks are considered *successful* and their changes are applied to the chain. If any of the checks fail, the transaction is ignored.

In some situations, transactions are included in the blockchain but recorded as *rejected*. This can happen, for example, if a sender tries to overdraw their account. If a transaction is rejected, the transaction fee is still deducted from the sender account but other than that, it has no effect.

There’s a :term:`sequence number<transaction sequence number>` associated with each account. This number increases sequentially with each transaction sent from the account and is recorded into the transaction. If a transaction has a sequence number that doesn’t  match the current sequence number of the account, the transaction is not eligible for inclusion on the chain. This ensures that transactions are included only once and in a specific order.

