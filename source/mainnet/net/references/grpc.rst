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
:Description: Get the status of a given transaction.
:Input: :ref:`TransactionHash <grpc-transaction-hash>`
:Output: Status of the transaction.
:Output Type: ``TransactionStatus`` (see JSON schema below).

.. collapse:: View JSON schema

   .. literalinclude:: grpc-json-schemas/GetTransactionStatus.json
      :language: json


GetTransactionStatusInBlock
---------------------------

Blocks and Consensus
====================

GetConsensusInfo
----------------

GetBlockSummary
---------------

GetBlocksAtHeight
-----------------

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

Example::

   2e71affba96da648ca628eccda190c3f2c3868d16a99619337dd50725582c2d1

``NodeInfoResponse``
--------------------

Something..
