====================
 gRPC Documentation
====================

.. contents:: Table of contents
   :local:

Transactions
============

SendTransaction
---------------

``GetTransactionStatus``
------------------------

.. function:: GetTransactionStatus(transactionHash) -> TransactionStatus

   Get the status of a given transaction.

   :param transactionHash: The transaction to query
   :type transactionHash: :ref:`TransactionHash <grp-transaction-hash>`

:Description: Get the status of a given transaction.
:Input: :ref:`TransactionHash <grpc-transaction-hash>`
:Output: Status of the transaction.
:Output Type: ``TransactionStatus`` (see JSON schema below).

.. collapse:: View JSON schema

   .. literalinclude:: grpc-json-schemas/GetTransactionStatus.json
      :language: json

``GetTransactionStatusInBlock``
-------------------------------

:Description: Get the status of a given transaction in a given block.
:Input: :ref:`GetTransactionStatusInBlockRequest <grpc-transaction-in-block-request>`
:Output: Status of the transaction in the block.
:Output Type: ``TransactionStatusInBlock`` (see JSON schema below).

.. collapse:: View JSON schema

   .. literalinclude:: grpc-json-schemas/GetTransactionStatusInBlock.json
      :language: json

Blocks and Consensus
====================

.. function:: GetConsensusInfo() -> ConsensusInfo

   Get the consensus information.

   :returns: Information about the consensus.
   :rtype: ``ConsensusInfo`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetConsensusInfo.json
         :language: json

.. function:: GetBlockSummary(blockHash) -> BlockSummary

   Get a summary of the transactions and data for a given block.

   :param blockHash: The block to query.
   :type blockHash: |grpc-block-hash|_
   :returns: A summary of the transactions and data in the block.
   :rtype: ``BlockSummary`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBlockSummary.json
         :language: json

.. function:: GetBlocksAtHeight(blockHeight) -> [BlockHash]

   Get a list of the blocks at the given height.

   :param blockHeight: A block height
   :type blockHeight: |grpc-block-height|_
   :returns: A list of block hashes
   :rtype: [:ref:`BlockHash <grpc-block-hash>`]

GetAncestors
------------

GetBranches
-----------

Accounts
========

GetAccountList
--------------

GetAccountInfo
--------------

GetAccountNonFinalized
----------------------

GetNextAccountNonce
-------------------

Smart contracts
===============

GetModuleList
-------------

GetInstances
------------

GetInstanceInfo
---------------

InvokeContract
--------------

Baking
======

GetPoolStatus
-------------

GetRewardStatus
---------------

GetBirkParameters
-----------------

GetBakerList
------------

StartBaker
----------

StopBaker
---------

The Node
========

``GetNodeInfo``
---------------
:Description: Get information about the node.
:Input: Empty
:Output: The node info.
:Output Type: ``NodeInfoResponse`` (See Protobuf definition below)

TODO: Add link to protobuf

Shutdown
--------

DumpStart
---------

DumpStop
--------

Networks and peers
==================

GetPeerData
-----------

GetPeerUptime
-------------

PeerConnect
-----------

PeerDisconnect
--------------

BanNode
-------

UnbanNode
---------

GetBannedPeers
--------------

JoinNetwork
-----------

LeaveNetwork
------------

Chain Data
==========

GetIdentityProviders
--------------------

GetAnonymityRevokers
--------------------

GetCryptographicParameters
--------------------------

Types
=====

.. _grpc-transaction-hash:

``TransactionHash``
-------------------
Base-16 encoded hash of a transaction (64 characters)

.. code-block:: none

   2e71affba96da648ca628eccda190c3f2c3868d16a99619337dd50725582c2d1

.. _grpc-block-hash:

``BlockHash``
-------------

Base-16 encoded hash of a block (64 characters).

.. code-block:: none

   987d6c06256fbf874d6ba14f19baee4390a31c6ee58edd9cc4efef62e89d22d7

.. _grpc-block-height:

``BlockHeight``
---------------

The block height.
See more details in the protobuf file: TODO link


.. _grpc-transaction-in-block-request:

``GetTransactionStatusInBlockRequest``
--------------------------------------

A :ref:`TransactionHash <grpc-transaction-hash>` followed by a :ref:`BlockHash <grpc-block-hash>`.

.. |grpc-block-hash| replace:: ``BlockHash``
.. |grpc-block-height| replace:: ``BlockHeight``
.. |grpc-transaction-hash| replace:: ``TransactionHash``
