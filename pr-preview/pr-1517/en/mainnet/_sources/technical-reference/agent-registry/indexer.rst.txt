.. include:: ../../variables.rst
.. _agent-registry-indexer:

=======
Indexer
=======

The Agent Registry Indexer is a service that subscribes to the Concordium chain, processes :doc:`CIS-8004 <cis-8004>` smart-contract events, and stores them in a queryable database. It exposes a REST API that powers the discovery and search tools in the :doc:`MCP service <mcp-service>`.

The Indexer is **optional** for deployments that only need on-chain reads and transaction building. It is **required** for the following MCP tools:

- ``list_agents``
- ``search_agents``
- ``recent_registrations``
- ``recent_transfers``
- ``agent_history``

Without an Indexer, those tools return an error. All other tools read directly from the chain and work without it.

Indexed events
==============

The Indexer processes the following CIS-8004 event types emitted by the Agent Registry contract:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Event
     - Triggered by
   * - ``Registered``
     - A new agent NFT is minted via the ``register`` entrypoint.
   * - ``Revoked``
     - An agent is deactivated via the ``revoke`` entrypoint.
   * - ``TokenMetadataChanged``
     - ``agent_uri`` or ``metadata_hash`` is updated via ``setAgentURI``.
   * - ``Transfer``
     - The agent NFT is transferred to a new owner.
   * - ``UpdateOperator``
     - An operator is added or removed for an agent.

Each indexed event records the block height, block hash, transaction hash, and the decoded event payload.

Running the Indexer
===================

Prerequisites
-------------

- Docker (recommended) or a compatible Rust runtime.
- A reachable Concordium gRPC v2 endpoint for the target network.
- A PostgreSQL database (version 14 or later).

Configuration
-------------

The Indexer reads configuration from environment variables:

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Variable
     - Description
   * - ``INDEXER_NETWORK``
     - Target network. One of ``mainnet``, ``testnet``, ``devnet``.
   * - ``INDEXER_GRPC_ENDPOINT``
     - gRPC v2 endpoint of a Concordium node. Default: public endpoint for the configured network.
   * - ``INDEXER_CONTRACT_INDEX``
     - Index of the CIS-8004 contract to watch. Default: ``10082`` (mainnet).
   * - ``INDEXER_CONTRACT_SUBINDEX``
     - Subindex of the CIS-8004 contract. Default: ``0``.
   * - ``INDEXER_DATABASE_URL``
     - PostgreSQL connection string (e.g. ``postgres://user:pass@localhost:5432/agent_registry``).
   * - ``INDEXER_PORT``
     - Port for the REST API. Default: ``4400``.
   * - ``INDEXER_START_HEIGHT``
     - Optional block height to start indexing from. Omit to start from the contract's deployment block.

Docker quick-start
------------------

.. code-block:: bash

   docker run -e INDEXER_NETWORK=mainnet \
              -e INDEXER_DATABASE_URL=postgres://user:pass@host.docker.internal:5432/agent_registry \
              -p 4400:4400 \
              concordium/agent-registry-indexer:latest

The Indexer begins streaming events from the chain on startup and catches up from the last indexed block on restart. It exposes the REST API on port ``4400`` once the initial sync is complete.

REST API
========

The Indexer exposes a lightweight REST API consumed by the MCP service. The base URL is configurable; the default for local deployments is ``http://localhost:4400``.

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Endpoint
     - Description
   * - ``GET /agents``
     - List agents with optional ``status``, ``owner``, ``limit``, and ``offset`` query parameters.
   * - ``GET /agents/search?q=<term>``
     - Substring search across ``agent_uri`` and token ID text.
   * - ``GET /agents/:token_id``
     - Full record for a single agent by token ID.
   * - ``GET /agents/:token_id/history``
     - Chronological list of all indexed events for an agent.
   * - ``GET /events/registrations``
     - Recent ``Registered`` events. Supports ``limit`` and ``since_block`` query parameters.
   * - ``GET /events/transfers``
     - Recent ``Transfer`` events. Supports ``limit`` query parameter.
   * - ``GET /health``
     - Returns the Indexer's current block height and lag behind the chain tip.

Sync state
==========

The Indexer maintains a cursor of the last successfully processed block. On restart, it resumes from that cursor rather than re-indexing from the beginning. The ``network_status`` MCP tool surfaces the Indexer's current block height and its lag (in blocks) behind the chain's latest finalised block.

A lag of a few blocks is normal; a growing lag indicates the Indexer cannot keep up with the chain and may need more resources or a faster database connection.
