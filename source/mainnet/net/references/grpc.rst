.. _grpc-documentation:

====================
 gRPC documentation
====================

The Concordium node has a `gRPC <https://grpc.io/>`_ interface that enables
queries, sending of transactions, and more.
While the gRPC interface is powerful, it is not the most convenient tool.
We provide a number of SDKs that build on top of the gRPC interface, which are
much more ergonomic to use.

These are the SDKs we currently provide:

- `Concordium Rust SDK <https://github.com/Concordium/concordium-rust-sdk>`_
- `Concordium Javascript (Node / Web) SDK <https://github.com/Concordium/concordium-node-sdk-js>`_
- `Concordium Java SDK <https://github.com/Concordium/concordium-java-sdk>`_
- `Concordium .NET (C#) SDK <https://github.com/Concordium/concordium-net-sdk>`_
- `Concordium Go SDK <https://github.com/Concordium/concordium-go-sdk>`_

The gRPC interface uses a mixture of protobuf-defined types and JSON. For the
JSON types, a `JSON Schema <https://json-schema.org/>`_ is provided.
The protobuf types are defined in `the protobuf file defining the gRPC interface
<https://github.com/Concordium/concordium-grpc-api/blob/232e34fbe163f3f537277d406f058774a8d3a432/concordium_p2p_rpc.proto>`_.

For the JSON schemas, you may find these two tools useful:

- `JSON Schema Faker <https://json-schema-faker.js.org/>`_: Generates fake data
  that conforms to the provided schema.
- `JSON Schema Validator <https://www.jsonschemavalidator.net/>`_: Validates
  whether the JSON input follows the provided schema.


Notation
========

This page uses the following notation:

- ``?a`` means ``a`` OR ``null``.

  - Queries that return ``?a`` will only do so if the input is malformed or
    refers to non-existent data, for example a ``BlockHash`` for a block that
    doesn't exist on the chain.

- ``[a]`` means a list of type ``a``.
- JSON Schemas follow the `JSON Schema (Draft 7) <https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01>`_.
- Protobuf code follow the `Protocol Buffers Version 3 Language Specification <https://developers.google.com/protocol-buffers/docs/reference/proto3-spec>`_.
- ``Foo ::= (n: UInt16) (bars: Byteⁿ)``

  - Denotes the serialization of the type ``Foo``, which starts with an unsigned
    16-bit big-endian integer, ``n``, which describes the number of bytes used to represent
    ``bars``. So if ``n == 100``, then ``bars`` is represented with ``100`` bytes.

Transactions
============

.. _grpc-send-transaction:

.. function:: SendTransaction(network_id: Int32, payload: [Byte]) -> Bool

   Send a transaction to the given network.
   The node will do basic transaction validation, such as signature checks and
   account nonce checks, and if these fail, the call will return a gRPC error.
   The payload is in binary encoding, read more in the
   :ref:`grpc-transaction-encoding` section.

   :param Int32 network_id: The network that the transaction should be sent to
                           (only ``100`` is currently supported).
   :param payload: Binary encoding of the transaction payload.
   :type payload: ``[Byte]`` of |grpc-block-item|_
   :returns: Either ``True`` or one of the following gRPC errors:

               - ``INVALID_ARGUMENT``: The transaction was deemed invalid or
                 exceeds the maximum size allowed (the raw size of the transaction).
               - ``FAILED_PRECONDITION``: The network was stopped due to an
                 unrecognized protocol update.
               - ``DUPLICATE_ENTRY``: The transaction was a duplicate.
               - ``INTERNAL``: An internal error happened and as such the
                 transaction could not be processed. The node will retrun a gRPC
                 status if the transaction was deemed invalid.
   :rtype: Bool

.. function:: GetTransactionStatus(transaction_hash: TransactionHash, block_hash: BlockHash) -> JsonResponse

   Get the status of a given transaction.

   :param transaction_hash: The transaction to query.
   :type transaction_hash: |grpc-transaction-hash|_
   :returns: The status of the transaction, or ``null`` if either the transaction
             or block hash is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?TransactionStatus`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetTransactionStatus.json
         :language: json

.. function:: GetTransactionStatusInBlock(transaction_hash: TransactionHash, block_hash: BlockHash) -> JsonResponse

   Get the status of a given transaction in a given block.

   :param transaction_hash: The transaction to query.
   :param block_hash: The given block.
   :type transaction_hash: |grpc-transaction-hash|_
   :type block_hash: |grpc-block-hash|_
   :returns: The status of the transaction, or ``null`` if either the transaction
             or block hash is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?TransactionStatusInBlock`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetTransactionStatusInBlock.json
         :language: json

Blocks and consensus
====================

.. function:: GetConsensusStatus() -> JsonResponse

   Get the information about the consensus.

   :returns: Information about the consensus.
   :rtype: ``JsonResponse`` with ``ConsensusInfo`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetConsensusInfo.json
         :language: json

.. function:: GetBlockInfo(block_hash: BlockHash) -> JsonResponse

   Get information, such as height, timings, and transaction counts for the
   given block.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :returns: Information about the block, or ``null`` if the block hash is
             malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?BlockInfo`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBlockInfo.json
         :language: json

.. function:: GetBlockSummary(block_hash: BlockHash) -> JsonResponse

   Get a summary of the transactions and data in a given block.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :returns: A summary of the transactions and data in the block, or ``null`` if
             the block hash is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?BlockSummary`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBlockSummary.json
         :language: json

.. function:: GetBlocksAtHeight(block_height: BlockHeight) -> JsonResponse

   Get a list of the blocks at the given height.

   :param block_height: A block height.
   :type block_height: |grpc-block-height|_
   :returns: A list of block hashes.
   :rtype: ``JsonResponse`` with ``[BlockHash]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBlocksAtHeight.json
         :language: json

.. function:: GetAncestors(block_hash: BlockHash, amount: Amount) -> JsonResponse

   Get a list of the blocks preceding the given block. The list will contain at
   most ``amount`` blocks.

   :param block_hash: The block to get ancestors of.
   :type block_hash: |grpc-block-hash|_
   :param UInt64 amount: The requested number of ancestors.
   :returns: A list of block hashes, or ``null`` if the block hash is malformed
             or doesn't exist.
   :rtype: ``JsonResponse`` with ``?[BlockHash]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetAncestors.json
         :language: json

.. function:: GetBranches() -> JsonResponse

   Get the branches of the tree. This is the part of the tree above the last
   finalized block.

   :returns: The branches of the tree.
   :rtype: ``JsonResponse`` with ``Branch`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBranches.json
         :language: json

Accounts
========

.. function:: GetAccountList(block_hash: BlockHash) -> JsonResponse

   Get a list of all accounts that exist in the state at the end of the given block.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :returns: A list of accounts, or ``null`` if the block hash is malformed or
             doesn't exist.
   :rtype: ``JsonResponse`` with ``?[AccountAddress]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetAccountList.json
         :language: json

.. _grpc-get-account-info:

.. function:: GetAccountInfo(block_hash: BlockHash, address: AccountAddress) -> JsonResponse

   Get the state of an account in the given block.

   :param block_hash: The given block.
   :param address: The account to query.
   :type block_hash: |grpc-block-hash|_
   :type address: |grpc-account-address|_
   :returns: The state of the account, or ``null`` if either the block hash or account
             address is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?AccountInfo`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetAccountInfo.json
         :language: json

.. function:: GetAccountNonFinalizedTransactions(account_address: AccountAddress) -> JsonResponse

   Get a list of non-finalized transactions present on an account.

   :param account_address: The account to query.
   :type account_address: |grpc-account-address|_
   :returns: A list of hashes of non-finalized transactions, or null if the
             account address is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?[TransactionHash]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetAccountNonFinalized.json
         :language: json

.. function:: GetNextAccountNonce(account_address: AccountAddress) -> JsonResponse

   Returns the next available nonce for this account.

   :param account_address: The account to query.
   :type account_address: |grpc-account-address|_
   :returns: An account nonce and whether there are any non-finalized
             transactions for the account. Or ``null`` if the account address is
             malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?AccountNonceResponse`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetNextAccountNonce.json
         :language: json

Smart contracts
===============

.. function:: GetModuleList(block_hash: BlockHash) -> JsonResponse

   Get a list of all smart contract modules that exist in the state at the end of the given block.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :returns: A list of hashes of smart contract modules, or ``null`` if the
             block hash is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?[ModuleHash]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetModuleList.json
         :language: json

.. function:: GetModuleSource(block_hash: BlockHash, module_ref: ModuleReference) -> ?[Byte]

   Get the binary source of a smart contract module.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :param module_ref: The reference (hash) of the smart contract module.
   :type block_hash: |grpc-module-reference|_
   :returns: The binary source of the module, or ``null`` if either the block hash or
             module reference is malformed or doesn't exist.
   :rtype: ``?[Byte]``

.. _grpc-get-instances:

.. function:: GetInstances(block_hash: BlockHash) -> JsonResponse

   Get a list of all smart contract instances that exist in the state at the end
   of the given block.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :returns: A list of smart contract addresses, or ``null`` if the block hash
             is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?[ContractAddress]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetInstances.json
         :language: json

.. _grpc-get-instance-info:

.. function:: GetInstanceInfo(block_hash: BlockHash, address: ContractAddress) -> JsonResponse

   Get information about the given smart contract instance in the given block.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :param address: The smart contract instance.
   :type address: |grpc-contract-address|_
   :returns: Information about the smart contract instance, or ``null`` if
             either the block hash or contract address is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?InstanceInfo`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetInstanceInfo.json
         :language: json

.. function:: InvokeContract(block_hash: BlockHash, context: ContractContext) -> JsonResponse

   Invoke a smart contract instance and view its results as if it had been
   updated at the end of the given block. Please note that *this is not a
   transaction*, so it won't affect the contract on chain. It only simulates the invocation.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :param context: The context in which to invoke the contract.
   :type context: |grpc-contract-context|_
   :returns: An invocation result, or ``null`` if the block hash is malformed or
             doesn't exist, or if the contract context is malformed or invalid.
   :rtype: ``JsonResponse`` with ``?InvokeContractResult`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/InvokeContract.json
         :language: json

Baking
======

.. function:: GetPoolStatus(block_hash: BlockHash, passive_delegation: Bool, baker_id: UInt64) -> JsonResponse

   Get the status of a pool.
   If ``passive_delegation == true``, this returns the status for the passive delegators.
   Otherwise, it returns the status for the baker with the specified ID (if it exists).

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :param Bool passive_delegation: Whether the request is for passive delegation or a
                             specific baker.
   :param UInt64 baker_id: The baker id to get the status of.
   :returns: The status of the pool, or ``null`` if the block hash is malformed,
             or if either the block hash or baker id doesn't exist.
   :rtype: ``JsonResponse`` with ``?PoolStatus`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetPoolStatus.json
         :language: json


.. function:: GetRewardStatus(block_hash: BlockHash) -> JsonResponse

   Get an overview of the balance of special accounts in the given block.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :returns: The reward status in the given block, or ``null`` if the block hash
             is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?RewardStatus`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetRewardStatus.json
         :language: json

.. function:: GetBirkParameters(block_hash: BlockHash) -> JsonResponse

   Get an overview of the parameters used for baking.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :returns: The parameters used for baking in the given block, or ``null`` if
             the block hash is malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?BirkParameters`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBirkParameters.json
         :language: json

.. function:: GetBakerList(block_hash: BlockHash) -> JsonResponse

   Get a list of all baker IDs registered at that block in ascending order. Or
   ``null``, if the block is invalid.

   :param block_hash: The given block.
   :type block_hash: |grpc-block-hash|_
   :returns: A list of baker IDs, or ``null`` if the block hash is malformed or
             doesn't exist.
   :rtype: ``JsonResponse`` with ``?[BakerId]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetBakerList.json
         :language: json

.. function:: StartBaker() -> Bool

   Start the baker.

   :returns: Whether starting the baker succeeded.
   :rtype: Bool

.. function:: StopBaker() -> Bool

   Stop the baker.

   :returns: Whether stopping the baker succeeded.
   :rtype: Bool

The node
========

.. function:: NodeInfo() -> NodeInfoResponse

   Get information about the running node.

   :returns: Information about the running node.
   :rtype: |NodeInfoResponse|_

.. function:: PeerVersion() -> String

   Get the version of the node software.

   :returns: The version of the node software.
   :rtype: String

.. function:: PeerUptime() -> UInt64

   Get the uptime of the node in milliseconds.

   :returns: The uptime of the queried node in milliseconds.
   :rtype: UInt64

.. function:: PeerTotalSent() -> UInt64

   Get the total number of packets sent by the node.

   :returns: The total number of packets sent by the node.
   :rtype: UInt64

.. function:: PeerTotalReceive() -> UInt64

   Get the total number of packets received by the node.

   :returns: The total number of packets received.
   :rtype: UInt64

.. function:: Shutdown() -> Bool

   Shut down the node.

   :returns: Whether shutting down succeeded.
   :rtype: Bool

.. function:: DumpStart(file: FilePath, raw: Bool) -> Bool

   Start dumping packages into the specified file. *Only available on a node
   built with the network_dump feature.*

   :param FilePath file: The file to dump packages into.
   :param Bool raw: Whether it should dump the raw packages.
   :returns: Whether it started dumping correctly.
   :rtype: Bool

.. function:: DumpStop() -> Bool

   Stop dumping packages. *Only available on a node built with the
   network_dump feature.*

   :returns: Whether it stopped dumping correctly.
   :rtype: Bool

Networks and peers
==================

.. function:: PeerList(include_bootstrappers: Bool) -> PeerListResponse

   Get a list of the peers that the node is connected to.

   :param Bool include_bootstrappers: Whether to include the bootstrapper nodes
                                     in the response.
   :returns: A list of peers.
   :rtype: |PeerListResponse|_

.. function:: PeerStats(include_bootstrappers: Bool) -> PeerStatsResponse

   Get information on the peers that the node is connected to.

   :param Bool include_bootstrappers: Whether to include the bootstrapper nodes
                                     in the response.
   :returns: Information about the peers.
   :rtype: |PeerStatsResponse|_

.. function:: PeerConnect(ip: String, port: Int32) -> Bool

   Suggest the node to connect to the submitted peer. If successful, this adds
   the peer to the list of peers.

   :param String ip: IP of the peer.
   :param Int32 port: Port of the peer.
   :returns: Whether the request was processed successfully.
   :rtype: Bool

.. function:: PeerDisconnect(ip: String, port: Int32) -> Bool

   Disconnect from the peer and remove them from the given addresses list if
   they are on it.

   :param String ip: IP of the peer.
   :param Int32 port: Port of the peer.
   :returns: Whether the request was processed successfully.
   :rtype: Bool

.. function:: BanNode(node_id: String, port: UInt32, ip: String, catchup_status: CatchupStatus) -> Bool

   Ban a node from being a peer. Note that you should provide a ``node_id`` OR
   an ``ip``, but not both. Use ``null`` for the option not chosen.

   :param String node_id: The id of the node to ban.
   :param UInt32 port: *Deprecated*: No longer used. Pass in ``null``.
   :param String ip: The ip of the node.
   :param CatchupStatus catchup_status: *Deprecated*: No longer used. Pass in ``null``.
   :returns: Whether the banning succeeded.
   :rtype: Bool

.. function:: UnbanNode(node_id: String, port: UInt32, ip: String, catchup_status: CatchupStatus) -> Bool

   Unban a previously banned node. Note that you should provide a ``node_id`` OR
   an ``ip``, but not both. Use ``null`` for the option not chosen.

   :param String node_id: The id of the node to ban.
   :param UInt32 port: *Deprecated*: No longer used. Pass in ``null``.
   :param String ip: The ip of the node.
   :param CatchupStatus catchup_status: *Deprecated*: No longer used. Pass in ``null``.
   :returns: Whether the unbanning succeeded.
   :rtype: Bool

.. function:: GetBannedPeers() -> PeerListResponse

   Get a list of banned peers.

   :returns: A list of banned peers.
   :rtype: |PeerListResponse|_

.. function:: JoinNetwork(network_id: Int32) -> Bool

   Attempt to join the specified network.

   :param Int32 network_id: The network to join.
   :returns: Whether joining succeeded.
   :rtype: Bool

.. function:: LeaveNetwork(network_id: Int32) -> Bool

   Attempt to leave the specified network.

   :param Int32 network_id: The network to leave.
   :returns: Whether leaving succeeded.
   :rtype: Bool

Chain data
==========

.. function:: GetIdentityProviders(block_hash: BlockHash) -> JsonResponse

   Get a list of all identity providers that exist in the state at the end of the given block.

   :param block_hash: The block to query.
   :type block_hash: |grpc-block-hash|_
   :returns: A list of identity providers, or ``null`` if the block hash is
             malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?[IdentityProvider]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetIdentityProviders.json
         :language: json

.. function:: GetAnonymityRevokers(block_hash: BlockHash) -> JsonResponse

   Get a list of all anonymity revokers that exist in the state at the end of the given block.

   :param block_hash: The block to query.
   :type block_hash: |grpc-block-hash|_
   :returns: A list of anonymity revokers, or ``null`` if the block hash is
             malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?[AnonymityRevoker]`` (see JSON schema below)

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/GetAnonymityRevokers.json
         :language: json

.. function:: GetCryptographicParameters(block_hash: BlockHash) -> JsonResponse

   Get the cryptographic parameters used in the given block.

   :param block_hash: The block to query.
   :type block_hash: |grpc-block-hash|_
   :returns: The cryptographic parameters, or ``null`` if the block hash is
             malformed or doesn't exist.
   :rtype: ``JsonResponse`` with ``?CryptographicParameters`` (see JSON schema below)

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
   See more details in the protobuf file here: |BlockHeight|_.

.. _grpc-account-address:

``AccountAddress``
   A string with the account address.
   A base-58 check with version byte 1 encoded address (with Bitcoin mapping
   table). Example:

   .. code-block:: json

      "3DJoe7aUwMwVmdFdRU2QsnJfsBbCmQu1QHvEg7YtWFZWmsoBXe"

.. _grpc-module-reference:

``ModuleReference``
   A string with module reference, which is the hash of the module.
   Example:

   .. code-block:: json

      "eecfe4ceda7432e2727d8137b9c23c4c343634e41657b72313fb061e249aaa97"

.. _grpc-contract-address:

``ContractAddress``
   A JSON object with two fields: index and subindex. Example:

   .. code-block:: json

      { "index": 11235, "subindex": 0 }

.. _grpc-contract-context:

``ContractContext``
   The context in which a contract instance is invoked. Represented as a JSON
   object.

   .. collapse:: View JSON schema

      .. literalinclude:: grpc-json-schemas/ContractContext.json
         :language: json

.. _grpc-transaction-encoding:

Transaction encoding
--------------------

This section describes the ``BlockItem`` used in the |grpc-send-transaction|_.
The binary serialization of an ``BlockItem`` is also covered, as that is the
expected format when sending transactions.
All possible transactions are *not* covered on this page.
Instead, there is a **focus on transfers and the smart contract-related transactions**.

.. note::

   All numbers in this section use `big-endian encoding <https://www.freecodecamp.org/news/what-is-endianness-big-endian-vs-little-endian/>`_.


.. _grpc-block-item:

``BlockItem``
   A union type of the different categories of transactions.

   The only supported BiVersion is currently ``0``. All the transactions
   explained on this page belong to the category |grpc-account-transaction|_ which
   has ``BiTag == 0``.

   .. code-block::

      BiVersion ::= (x: Byte)                   =>  x                     if x < 2^7
                  | (m: BiVersion) (x: Byte)    =>  (x - 2^7) + 2^7 * m   if x >= 2^7

      BiTag ::= (n: UInt8)

      BlockItem ::= (version: BiVersion) (tag: BiTag) (transaction: TransactionType)

.. _grpc-account-transaction:

``AccountTransaction``
   A transaction that originates from a specific account (the sender), and is
   paid for by the sender.

   |grpc-transaction-signature|_: Signatures for the transaction. The message to sign is the SHA256 of the |grpc-transaction-header|_ + |grpc-transaction-payload|_.

   |grpc-transaction-header|_: A header with common data needed for all types of transactions.

   |grpc-transaction-payload|_: The actual contents of the transaction. For smart contracts this is DeployModule, InitContract, or Update.

   .. code-block::

      AccountTransaction ::= (signature: TransactionSignature) (header: TransactionHeader) (payload: TransactionPayload)

.. _grpc-transaction-signature:

``TransactionSignature``
   A transaction signature is a map from the index of the credential to another
   map from the key index to the actual signature.
   The credential index is relative to the account address, and the indices
   should be distinct.
   The key index is relative to the credential.
   The maximum length of the list is 255, and the minimum length is 1.

   .. code-block::

      Signature ::= (keyIndex: UInt8) (n: UInt16) (signature: Byteⁿ)

      Credential ::= (credentialIndex: UInt8) (n: UInt8) (signatures: Signatureⁿ)

      TransactionSignature ::= (n: UInt8) (credentials: Credentialⁿ)

.. _grpc-transaction-header:

``TransactionHeader``
   A transaction header is a struct which consists of the following fields:

   ``AccountAddress``: The sender account.

   ``Nonce``: Account nonce. Initial nonce is ``1``. Is incremented by 1 with
   every transaction originating from an account. Find the current nonce with
   |grpc-get-account-info|_.

   ``Energy``: The amount of energy allocated for the execution of this transaction.

   ``PayloadSize``: Size of the |grpc-transaction-payload|_ in bytes.

   ``TransactionExpiryTime``: Absolute expiration time after which transaction will not be executed. Measured in seconds since unix epoch.

   .. code-block::

      TransactionHeader ::= (accountAddress: Byte³²) (nonce: UInt64) (energy: UInt64) (payloadSize: UInt32) (transactionExpiryTime: UInt64)

.. _grpc-transaction-payload:

``TransactionPayload``
   A union type with the different types of transactions.
   This page only covers some transaction types.

   .. code-block::

      TransactionPayload ::= (0: UInt8) (content: DeployModule)
                           | (1: UInt8) (content: InitContract)
                           | (2: UInt8) (content: Update)
                           | (3: UInt8) (content: Transfer)
                           | (16: UInt8) (content: TransferWithMemo)
                           | (n: UInt8) (content: <Transaction-Content>)

   .. _grpc-module-deploy:

   ``DeployModule``
      Deploy a Wasm module to the chain.
      The smart contract ``version`` is prefixed.
      The chain currently support contract versions ``0`` and ``1``.

      .. code-block::

         DeployModule ::= (version: UInt32) (n: UInt32) (module: Byteⁿ)

      .. note::

         When working with smart contracts, a typical workflow is:

         - Deploy a smart contract module by sending a |grpc-module-deploy|_ transaction.
         - Create a contract instance from the module by sending an |grpc-init-contract|_ transaction.
         - Find the address of the contract instance via |grpc-get-instances|_ and |grpc-get-instance-info|_.
         - Update the contract by sending a |grpc-update|_ transaction.

   .. _grpc-init-contract:

   ``InitContract``
      Initialize a smart contract using a deployed smart contract module. If
      successful, it creates a smart contract *instance* with a unique |grpc-contract-address|_.

      ``amount``: Amount in microCCD (``10^-6 CCD``).

      ``moduleRef``: Hash of the module on chain. Byte-array of fixed size 32.

      ``initName``: Name of the init function including ``init_`` prefix. *In
      UTF-8 encoding.*

      ``parameter``: Parameter for the init function.

      .. code-block::

         InitName ::= (n: UInt16) (utf8: Byteⁿ)

         Parameter ::= (n: UInt16) (data: Byteⁿ)

         InitContract ::= (amount: UInt64) (moduleRef: Byte³²) (initName: InitName) (parameter: Parameter)

   .. _grpc-update:

   ``Update``
      Update a smart contract instance using its ``ContractAddress``.

      ``amount``: Amount in microCCD (``10^-6 CCD``).

      ``contractAddress``: Address of contract instance consisting of an index
      and subindex.

      ``ReceiveName``: Name of receive function including ``<contractName>.``
      prefix. (Notice the ``.``). *In UTF-8 encoding*.

      ``Parameter``: Parameter for the receive function.

      .. code-block::

         ContractAddress ::= (index: UInt64) (subindex: UInt64)

         ReceiveName ::= (n: UInt16) (utf8: Byteⁿ)

         Parameter ::= (n: UInt16) (data: Byteⁿ)

         Update ::= (amount: UInt64) (contractAddress: ContractAddress) (receiveName: ReceiveName) (parameter: Parameter)

   .. _grpc-transfer:

   ``Transfer``
      Transfer CCD from the sender account to the specified account address.
      The ``amount`` is microCCD (``10^-6 CCD``).

      .. code-block::

         Transfer ::= (accountAddress: Byte³²) (amount: UInt64)


   .. _grpc-transfer-with-memo:

   ``TransferWithMemo``
      Transfer CCD from the sender account the specified account address and
      include a memo. The memo can be up to 256 bytes long, excluding its
      length (``n``).

      .. code-block::

         Memo ::= (n: UInt16) (data: Byteⁿ)

         TransferWithMemo ::= (accountAddress: Byte³²) (memo: Memo) (amount: UInt64)

.. |grpc-block-hash| replace:: ``BlockHash``
.. |grpc-block-height| replace:: ``BlockHeight``
.. |grpc-transaction-hash| replace:: ``TransactionHash``
.. |grpc-account-address| replace:: ``AccountAddress``
.. |grpc-contract-address| replace:: ``ContractAddress``
.. |grpc-contract-context| replace:: ``ContractContext``
.. |grpc-block-item| replace:: ``BlockItem``
.. |grpc-account-transaction| replace:: ``AccountTransaction``
.. |grpc-transaction-signature| replace:: ``TransactionSignature``
.. |grpc-transaction-header| replace:: ``TransactionHeader``
.. |grpc-transaction-payload| replace:: ``TransactionPayload``
.. |grpc-module-deploy| replace:: ``ModuleDeploy``
.. |grpc-init-contract| replace:: ``InitContract``
.. |grpc-update| replace:: ``Update``
.. |grpc-get-instances| replace:: ``GetInstances``
.. |grpc-get-instance-info| replace:: ``GetInstanceInfo``
.. |grpc-module-reference| replace:: ``ModuleReference``
.. |grpc-send-transaction| replace:: ``SendTransaction``
.. |grpc-get-account-info| replace:: ``GetAccountInfo``
.. _NodeInfoResponse: https://github.com/Concordium/concordium-grpc-api/blob/232e34fbe163f3f537277d406f058774a8d3a432/concordium_p2p_rpc.proto#L121
.. |NodeInfoResponse| replace:: ``NodeInfoResponse``
.. _BlockHeight: https://github.com/Concordium/concordium-grpc-api/blob/232e34fbe163f3f537277d406f058774a8d3a432/concordium_p2p_rpc.proto#L271
.. |BlockHeight| replace:: ``BlockHeight``
.. _PeerStatsResponse: https://github.com/Concordium/concordium-grpc-api/blob/232e34fbe163f3f537277d406f058774a8d3a432/concordium_p2p_rpc.proto#L89
.. |PeerStatsResponse| replace:: ``PeerStatsResponse``
.. _PeerListResponse: https://github.com/Concordium/concordium-grpc-api/blob/232e34fbe163f3f537277d406f058774a8d3a432/concordium_p2p_rpc.proto#L79
.. |PeerListResponse| replace:: ``PeerListResponse``
