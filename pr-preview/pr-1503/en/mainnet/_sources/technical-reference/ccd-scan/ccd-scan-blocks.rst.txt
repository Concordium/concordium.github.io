.. _blocks-view:

=======================
CCDScan Blocks overview
=======================

The Blocks overview shows information about the blocks created during the selected time range in the filter.

.. image:: images/ccd-scan-blocks.png
    :alt: dark screen with graphs at top, table at bottom with overview of blocks

|

The graphs show the number of blocks added, the average block time, and the average finalization time.

Below the graphs, the table contains the latest blocks added to the blockchain with the following information:

- **Block hash**: the first six characters of the block hash. Click Copy |copy| to copy the entire hash. Click the block hash to see :ref:`block details<home-screen-block>`.
- **Status**: the block status. Only Finalized blocks are shown.
- **Height**: block height
- **Age**: block age
- **Validator**: the validator ID of the validator who produced the block. Click the validator ID to see :ref:`validator details<home-screen-baker>`.
- **Transactions**: the number of transactions in the block

.. _home-screen-block:

Block details
=============

When you click a block hash, the following appears:

.. image:: images/ccd-scan-home-block-hash.png
    :alt: dark screen with details of a single block

|

The block details shows the following information about the block.

- **Block**: the first six characters of the block hash. You can click Copy |copy| to copy the entire hash.
- **Finalized**: state of the block. Only Finalized blocks are shown.
- **Age**: age of the block with date/time stamp.
- **Validator id**: validator ID of the validator who produced the block. Click on the validator ID for details about the :ref:`validator<home-screen-baker>`.
- **Tokenomics**: shows the tokenomics of the accrued block rewards.
- **Transactions**: shows the transaction(s) contained in the block, if any, including the first six characters of the transaction hash, transaction type, first six characters of the Sender account, and the cost of the transaction. You can click **Hash** for more :ref:`information about the transacation<home-screen-transaction>`, or click **Sender** for more :ref:`information about the sender<home-screen-sender>`. You can click Copy |copy| to copy the entire hash or account number.
- **Block statistics**: shows the block time (time since last block) and the finalization time of the block (the time before proof of finalization of the selected block was included in a subsequent block).

.. |copy| image:: images/ccd-scan-copy.png
             :class: button
             :alt: Green document on top of another green document

.. |hamburger| image:: images/hamburger-menu.png
             :class: button
             :alt: Three horizontal lines on a dark background
