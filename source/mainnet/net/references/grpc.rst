====================
 gRPC Documentation
====================

Notation
========

This page uses the following notation:

- ``?a`` means ``a`` OR ``null``.
- ``[a]`` means a list of type ``a``.

Transactions
============

SendTransaction
---------------

.. function:: GetTransactionStatus(TransactionHash) -> ?TransactionStatus

   Get the status of a given transaction.

   :param TransactionHash: The transaction to query
   :type TransactionHash: |grpc-transaction-hash|_
   :returns: The status of the transaction
   :rtype: ``?TransactionStatus`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetTransactionStatus.json
         :language: json

.. function:: GetTransactionStatusInBlock(TransactionHash, BlockHash) -> ?TransactionStatus

   Get the status of a given transaction in a given block.

   :param TransactionHash: The transaction to query
   :param BlockHash: The block to query in
   :type TransactionHash: |grpc-transaction-hash|_
   :type BlockHash: |grpc-block-hash|_
   :returns: The status of the transaction
   :rtype: ``TransactionStatusInBlock`` (see JSON schema below)

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

.. function:: GetBlockSummary(BlockHash) -> ?BlockSummary

   Get a summary of the transactions and data for a given block.

   :param BlockHash: The block to query.
   :type BlockHash: |grpc-block-hash|_
   :returns: A summary of the transactions and data in the block.
   :rtype: ``?BlockSummary`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBlockSummary.json
         :language: json

.. function:: GetBlocksAtHeight(BlockHeight) -> [BlockHash]

   Get a list of the blocks at the given height.

   :param BlockHeight: A block height
   :type BlockHeight: |grpc-block-height|_
   :returns: A list of block hashes
   :rtype: [:ref:`BlockHash <grpc-block-hash>`]

.. function:: GetAncestors(BlockHashAndAmount) -> ?[BlockHash]

   TODO: Generate schema

.. function:: GetBranches() -> Branch

   Get the branches of the tree. This is the part of the tree above the last
   finalized block.

   :returns: The branches of the tree.
   :rtype: ``Branch`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBranches.json
         :language: json

Accounts
========

.. function:: GetAccountList(BlockHash) -> ?[AccountAddress]

   Get a list of all accounts that exist when the given block was created.

   :param BlockHash: The block to query.
   :type BlockHash: |grpc-block-hash|_
   :returns: A list of accounts
   :rtype: ``AccountList`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetAccountList.json
         :language: json


.. function:: GetAccountInfo(BlockHash, AccountAddress) -> ?AccountInfo

   Get the state of an account in the given block.

   :param BlockHash: The block
   :param AccountAddress: The account to query
   :type BlockHash: |grpc-block-hash|_
   :type AccountAddress: |grpc-account-address|_
   :returns: The state of the account.
   :rtype: ``?AccountInfo`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetAccountInfo.json
         :language: json


.. function:: GetAccountNonFinalizedTransactions(AccountAddress) -> ?[TransactionHash]

   Get a list of non-finalized transactions present on an account.

   :param AccountAddress: The account to query
   :type AccountAddress: |grpc-account-address|_
   :returns: A list of hashes of non-finalized transactions
   :rtype: ``[TransactionHash]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetAccountNonFinalized.json
         :language: json

.. function:: GetNextAccountNonce(AccountAddress) -> ?AccountNonceResponse

   Returns the next available nonce for this account.

   :param AccountAddress: The account to query
   :type AccountAddress: |grpc-account-address|_
   :returns: An account nonce and whether there are any non-finalized
             transactions for the account
   :rtype: ``?AccountNonceResponse`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetNextAccountNonce.json
         :language: json

Smart contracts
===============

.. function:: GetModuleList(BlockHash) -> ?[ModuleHash]

   Get a list of all smart contract modules that existed when the given block was created.

   :param BlockHash: The block
   :type BlockHash: |grpc-block-hash|_
   :returns: A list of hashes of smart contract modules
   :rtype: ``[ModuleHash]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetModuleList.json
         :language: json

.. function:: GetInstances(BlockHash) -> ?[ContractAddress]

   Get a list of all smart contract instances that existed when the given block
   was created.

   :param BlockHash: The block
   :type BlockHash: |grpc-block-hash|_
   :returns: A list of smart contract addresses
   :rtype: ``[ContractAddress]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetInstances.json
         :language: json

.. function:: GetInstanceInfo(BlockHash, ContractAddress) -> ?InstanceInfo

   Get information about the given smart contract instance in the given block.

   :param BlockHash: The block
   :type BlockHash: |grpc-block-hash|_
   :param ContractAddress: The smart contract instance
   :type ContractAddress: |grpc-contract-address|_
   :returns: Information about the smart contract instance
   :rtype: ``?InstanceInfo`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetInstanceInfo.json
         :language: json

.. function:: InvokeContract(BlockHash, ContractContext) -> ?InvokeContractResult

   Invoke a smart contract instance and view its results as if it had been
   updated at the end of the given block.

   :param BlockHash: The block
   :type BlockHash: |grpc-block-hash|_
   :param ContractContext: The context in which to invoke the contract
   :type ContractContext: |grpc-contract-context|_
   :returns: An invocation result
   :rtype: ``?InvokeContractResult`` (see JSON schema below)

   .. collapse:: View JSON schema

      TODO: Generate invoke contract JSON schema and add it here

Baking
======

.. function:: GetPoolStatus(BlockHash, PassiveDelegation, BakerId) -> ?PoolStatus

   Get the status of a pool.
   If the boolean argument is ``true``, this returns the status for the passive delegators.
   Otherwise, it returns the status for the baker with the specified ID (if it exists).

   :param BlockHash: The block
   :type BlockHash: |grpc-block-hash|_
   :param bool PassiveDelegation: Whether the request is for passive delegation or a
                             specific baker.
   :param integer BakerId: The baker id to get the status of.
   :returns: The status of the pool.
   :rtype: ``?PoolStatus`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetPoolStatus.json
         :language: json


.. function:: GetRewardStatus(BlockHash) -> ?RewardStatus

   Get an overview of the current balance of special accounts.

   :param BlockHash: The block
   :type BlockHash: |grpc-block-hash|_
   :returns: The reward status in the given block.
   :rtype: ``RewardStatus`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetRewardStatus.json
         :language: json

.. function:: GetBirkParameters(BlockHash) -> ?BirkParameters

   Get an overview of the parameters used for baking.

   :param BlockHash: The block
   :type BlockHash: |grpc-block-hash|_
   :returns: The parameters used for baking in the given block.
   :rtype: ``?BirkParameters`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBirkParameters.json
         :language: json

.. function:: GetBakerList(BlockHash) -> ?[BakerId]

   Get a list of all baker IDs registered at that block in ascending order. Or
   ``null``, if the block is invalid.

   :param BlockHash: The block
   :type BlockHash: |grpc-block-hash|_
   :returns: A list of baker IDs
   :rtype: ``?[BakerId]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBakerList.json
         :language: json

.. function:: StartBaker() -> bool

   Start the baker.

   :returns: Whether starting the baker succeeded.
   :rtype: bool

.. function:: StopBaker() -> bool

   Stop the baker.

   :returns: Whether stopping the baker succeeded.
   :rtype: bool

The Node
========

.. function:: NodeInfo() -> NodeInfoResponse

   Get information about the running node.

   :returns: Information about the running node
   :rtype: |NodeInfoResponse|_

TODO: Add comments to protobuf file.

.. function:: Shutdown() -> bool

   Shut down the node.

   :returns: Whether shutting down succeeded.
   :rtype: bool

.. function:: DumpStart(File, Raw) -> bool

   Start dumping packages into the specified file.

   :param FilePath File: The file to dump packages into.
   :param bool Raw: Whether it should dump the raw packages. TODO: Is this correct?
   :returns: Whether it started dumping correctly
   :rtype: bool

.. function:: DumpStop() -> bool

   Stop dumping packages.

   :returns: Whether it stopped dumping correctly
   :rtype: bool

Networks and peers
==================

.. function:: PeerStats(IncludeBootstrappers) -> PeerStatsResponse

   Get information on the peers that the node is connected to.

   :param bool IncludeBootstrappers: Whether to include the bootstrapper nodes
                                     in the response.
   :returns: Information about the peers.
   :rtype: |PeerStatsResponse|_


.. function:: PeerUptime() -> uint64

   Get the uptime of the *node* in milliseconds.

   :returns: The uptime of the queried node in milliseconds.
   :rtype: uint64

.. function:: PeerConnect(IP, Port) -> bool

   Suggest the node to connect to the submitted peer. This, if successful, adds
   the peer to the list of peers.

   :param String IP: IP of the peer
   :param int32 Port: Port of the peer
   :returns: Whether the request was processed successfully.
   :rtype: bool

.. function:: PeerDisconnect(IP, Port) -> bool

   Disconnect from the peer and remove them from the given addresses list if
   they are on it.

   :param String IP: IP of the peer
   :param int32 Port: Port of the peer
   :returns: Whether the request was processed successfully.
   :rtype: bool

.. function:: BanNode(PeerElement) -> bool

   Ban a node from being a peer.

   :param PeerElement: The peer to ban (see the `protobuf definition <https://github.com/Concordium/concordium-grpc-api/blob/44e9c5825b1b18d9e81d15db30546316aa5906ec/concordium_p2p_rpc.proto#L34>`_)
   :returns: Whether the banning succeeded.
   :rtype: bool

.. function:: UnbanNode(PeerElement) -> bool

   Unban a previously banned node.

   :param PeerElement: The peer to unban.
   :type PeerElement: |PeerElement|_
   :returns: Whether the unbanning succeeded.
   :rtype: bool


.. function:: GetBannedPeers() -> PeerListResponse

   Get a list of banned peers.

   :returns: A list of banned peers.
   :rtype: |PeerListResponse|_

.. function:: JoinNetwork(NetworkId) -> bool

   Attempt to join the specified network.

   :param int32 NetworkId: The network to join.
   :returns: Whether joining succeeded.
   :rtype: bool

.. function:: LeaveNetwork(NetworkId) -> bool

   Attempt to leave the specified network.

   :param int32 NetworkId: The network to leave.
   :returns: Whether leaving succeeded.
   :rtype: bool

Chain Data
==========

.. function:: GetIdentityProviders(BlockHash) -> ?[IdentityProvider]

   Get a list of all identity providers that existed when the given block was created.

   :param BlockHash: The block to query.
   :type BlockHash: |grpc-block-hash|_
   :returns: A list of identity providers.
   :rtype: ``?[IdentityProvider]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetIdentityProviders.json
         :language: json

.. function:: GetAnonymityRevokers(BlockHash) -> ?[AnonymityRevoker]

   Get a list of all anonymity revokers that existed when the given block was created.

   :param BlockHash: The block to query.
   :type BlockHash: |grpc-block-hash|_
   :returns: A list of anonymity revokers.
   :rtype: ``?[AnonymityRevoker]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetAnonymityRevokers.json
         :language: json

.. function:: GetCryptographicParameters(BlockHash) -> ?CryptographicParameters

   Get the cryptographic parameters used in the given block.

   :param BlockHash: The block to query.
   :type BlockHash: |grpc-block-hash|_
   :returns: The cryptographic parameters.
   :rtype: ``?CryptographicParameters`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetCryptographicParameters.json
         :language: json

Types
=====

.. _grpc-transaction-hash:

``TransactionHash``
   Base-16 encoded hash of a transaction (64 characters). Example:

   .. code-block:: json

      "2e71affba96da648ca628eccda190c3f2c3868d16a99619337dd50725582c2d1"

.. _grpc-block-hash:

``BlockHash``
   Base-16 encoded hash of a block (64 characters). Example:

   .. code-block:: json

      "987d6c06256fbf874d6ba14f19baee4390a31c6ee58edd9cc4efef62e89d22d7"

.. _grpc-block-height:

``BlockHeight``
   The block height.
   See more details in the |BlockHeight|_

.. _grpc-account-address:

``AccountAddress``
   A base-58 check with version byte 1 encoded address (with Bitcoin mapping
   table). Example:

   .. code-block:: json

      "3DJoe7aUwMwVmdFdRU2QsnJfsBbCmQu1QHvEg7YtWFZWmsoBXe"

.. _grpc-contract-address:

``ContractAddress``
   A JSON object with two fields: index and subindex. Example:

   .. code-block:: json

      { "index": 42, "subindex": 0 }

.. _grpc-contract-context:

``ContractContext``
   The context in which a contract instance is invoked. Represented as a JSON
   object.

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/ContractContext.json
         :language: json

.. |grpc-block-hash| replace:: ``BlockHash``
.. |grpc-block-height| replace:: ``BlockHeight``
.. |grpc-transaction-hash| replace:: ``TransactionHash``
.. |grpc-account-address| replace:: ``AccountAddress``
.. |grpc-contract-address| replace:: ``ContractAddress``
.. |grpc-contract-context| replace:: ``ContractContext``
.. _NodeInfoResponse: https://github.com/Concordium/concordium-grpc-api/blob/44e9c5825b1b18d9e81d15db30546316aa5906ec/concordium_p2p_rpc.proto#L67
.. |NodeInfoResponse| replace:: ``NodeInfoResponse``
.. _BlockHeight: _https://github.com/Concordium/concordium-grpc-api/blob/44e9c5825b1b18d9e81d15db30546316aa5906ec/concordium_p2p_rpc.proto#L146
.. |BlockHeight| replace:: ``BlockHeight``
.. _PeerElement: https://github.com/Concordium/concordium-grpc-api/blob/44e9c5825b1b18d9e81d15db30546316aa5906ec/concordium_p2p_rpc.proto#L34
.. |PeerElement| replace:: ``PeerElement``
.. _PeerStatsResponse: https://github.com/Concordium/concordium-grpc-api/blob/44e9c5825b1b18d9e81d15db30546316aa5906ec/concordium_p2p_rpc.proto#L51
.. |PeerStatsResponse| replace:: ``PeerStatResponse``
.. _PeerListResponse: https://github.com/Concordium/concordium-grpc-api/blob/44e9c5825b1b18d9e81d15db30546316aa5906ec/concordium_p2p_rpc.proto#L46
.. |PeerListResponse| replace:: ``PeerListResponse``
