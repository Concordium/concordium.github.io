.. _transactions-view:

=============================
CCDScan Transactions overview
=============================

The Transactions overview shows information about the transactions during the selected time range in the filter.

.. image:: images/ccd-scan-transactions.png
    :alt: dark transactions screen with graphs at top and table at bottom

|

The graphs show the number of **cumulative transactions** since genesis and the number of **Transactions** in a range as determined by the time selected in the filter.

Below the graphs, the table contains the following:

- **Transaction hash**: the first six characters of the transaction hash. You can click Copy |copy| to copy the entire hash. Click the transaction hash to see the :ref:`transaction details<home-screen-transaction>`.
- **Status**: transaction status
- **Age**: transaction age
- **Type**: transaction type
- **Block height**: the block height of the transaction.
- **Sender**: the first six characters of the account that sent the transaction. You can click Copy |copy| to copy the entire hash. Click the account hash to see the :ref:`account details<accounts-view>`.
- **Cost**: the transaction fee.

.. _home-screen-transaction:

Transaction details
===================

When you click a transaction hash, transaction information appears. The information is different depending upon whether the transaction was successful or rejected.

.. image:: images/ccd-scan-home-transaction-success.png
    :alt: dark screen showing details of single successful transaction

|

The transaction details shows the following.

- **Transaction**: the first six characters of the transaction hash. Click Copy |copy| to copy the entire transaction hash. It also shows the transaction state.
- **Block height/block hash**: the block height and the first six characters of the block hash. Click Copy |copy| to copy the entire block hash. Click the block hash to see the :ref:`account details<blocks-view>`.
- **Age**: the transaction age with date/time stamp.
- **Transaction type/cost**: the transaction type and the transaction fee.
- **Sender**: the first six characters of the account that sent the transaction if available for that transaction. Click Copy |copy| to copy the entire hash. Click the account hash to see the :ref:`account details<accounts-view>`.
- **Events/Reject reason**:  list of events included in the transaction. It contains more details about the transaction, including drill-through links and copy options where available. There are many different transaction types and descriptions.

A successful transaction shows the **Events** that were the result of the transaction.

If the transaction was rejected, you see something similar to the following:

.. image:: images/ccd-scan-home-transaction-reject.png
    :alt: dark screen showing dtails of a single rejected transaction

|

The only effect of a rejected transaction is the payment for execution cost. In contrast, a successful transaction affects the state of the chain. The effects are described by the generated events.

.. |copy| image:: images/ccd-scan-copy.png
             :class: button
             :alt: Green document on top of another green document

.. |hamburger| image:: images/hamburger-menu.png
             :class: button
             :alt: Three horizontal lines on a dark background
