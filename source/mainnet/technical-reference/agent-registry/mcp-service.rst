.. include:: ../../variables.rst
.. _agent-registry-mcp:

===========
MCP service
===========

The Agent Registry MCP service is a `Model Context Protocol <https://modelcontextprotocol.io/>`__ server that exposes every Agent Registry operation as an AI-callable tool. It lets AI development tools — including Claude, GPT, LangChain, and Cursor — read from and write to the :doc:`CIS-8004 <cis-8004>` and :doc:`CIS-8 <cis-8>` contracts without requiring the AI to understand Concordium's wire formats or cryptography.

The service holds **no private keys**. All tools that produce transactions return a sign-ready payload (hex-encoded parameter bytes plus metadata) that the caller's wallet must sign and submit. The MCP service is stateless with respect to user credentials.

Hosted service
==============

A hosted instance of the MCP service is available for direct use in AI assistants and agent frameworks. Connect your MCP-compatible client to the hosted endpoint to gain immediate access to all registry tools on mainnet, testnet, and devnet.

Contact the Concordium team or check the `Concordium developer portal <https://developer.concordium.software>`__ for the current hosted endpoint URL and connection instructions.

Running locally
===============

For production deployments, custom network configurations, or offline use, you can run the MCP service locally alongside your own :doc:`Indexer <indexer>` instance.

Prerequisites
-------------

- Docker (recommended) or a Node.js runtime.
- A reachable Concordium gRPC v2 endpoint for the target network.
- A running :doc:`Indexer <indexer>` instance if you need discovery and search tools (``list_agents``, ``search_agents``, ``recent_registrations``).

Configuration
-------------

The service reads configuration from environment variables:

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Variable
     - Description
   * - ``MCP_NETWORK``
     - Target network. One of ``mainnet``, ``testnet``, ``devnet``. Defaults to ``devnet``.
   * - ``MCP_GRPC_ENDPOINT``
     - gRPC v2 endpoint of a Concordium node. Defaults to the public endpoint for the configured network.
   * - ``MCP_INDEXER_URL``
     - Base URL of the Agent Registry Indexer REST API (e.g. ``http://localhost:4400``). Required for discovery tools; optional for read/write-only deployments.
   * - ``MCP_CIS8004_CONTRACT``
     - Override the CIS-8004 contract address in ``index,subindex`` format (e.g. ``10082,0``). Use only when pointing at a custom deployment.
   * - ``MCP_CIS8_CONTRACT``
     - Override the CIS-8 contract address. Same format as above.

Docker quick-start
------------------

.. code-block:: bash

   docker run -e MCP_NETWORK=mainnet \
              -e MCP_INDEXER_URL=http://host.docker.internal:4400 \
              -p 3000:3000 \
              concordium/agent-registry-mcp:latest

The server listens on port ``3000`` by default and exposes a standard MCP endpoint at ``/mcp``.

Available tools
===============

The MCP service exposes 35 tools, grouped by function.

Discovery and search (require Indexer)
--------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Tool
     - Description
   * - ``list_agents``
     - Lists all registered agents. Supports pagination, owner filter, and status filter (Active / Revoked).
   * - ``search_agents``
     - Substring search across ``agent_uri`` and token ID text.
   * - ``recent_registrations``
     - Returns the most recent ``Registered`` events, newest first. Optionally filter by block height.
   * - ``recent_transfers``
     - Returns the most recent ``Transfer`` events for agent NFTs.
   * - ``agent_history``
     - Full event history for a single agent token.

On-chain lookups (no Indexer required)
---------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Tool
     - Description
   * - ``agent_by_token_address``
     - Resolves a Base58Check token address to a full agent record.
   * - ``agent_by_external_reference``
     - Resolves a ``Cis8`` (external key) or ``Cis10`` (platform handle) reference to an agent.
   * - ``agents_by_owner``
     - Returns all agents owned by a given Concordium account.
   * - ``agent_of``
     - Returns the agent associated with a given account, if any.
   * - ``get_metadata``
     - Reads a single on-chain metadata key for an agent. Returns value as hex and UTF-8 text.
   * - ``get_agent_wallet``
     - Returns the payment wallet address stored in the reserved ``agentWallet`` metadata key.
   * - ``is_active``
     - Returns true if the agent's status is Active, false if Revoked or not found.
   * - ``owner_of_key``
     - Returns the Concordium account that registered a given CIS-8 external key, or null.

Transaction builders (CIS-8004)
---------------------------------

All builder tools return ``{ hex, schema_json }`` — the hex is the wire-encoded parameter, ready for signing. No private keys are required or accepted.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Tool
     - Description
   * - ``build_register``
     - Builds a ``register`` payload to mint a new agent NFT.
   * - ``build_revoke``
     - Builds a ``revoke`` payload to deactivate an agent.
   * - ``build_set_agent_uri``
     - Builds a ``setAgentURI`` payload to update ``agent_uri`` and/or ``metadata_hash``.
   * - ``build_set_metadata``
     - Builds a ``setMetadata`` payload for one or more key-value pairs.
   * - ``build_set_agent_wallet``
     - Builds a ``setAgentWallet`` payload to update the payment wallet.
   * - ``build_transfer``
     - Builds a CIS-2 ``transfer`` payload to transfer the agent NFT.
   * - ``build_transfer_admin``
     - Admin-only: builds a forced transfer payload.
   * - ``build_update_operator``
     - Builds an ``updateOperator`` payload to grant or revoke an operator.
   * - ``build_upgrade``
     - Admin-only: builds a module upgrade payload.
   * - ``build_set_external_registries``
     - Admin-only: updates the linked CIS-8 and CIS-10 contract addresses atomically.

Transaction builders (CIS-8)
------------------------------

.. list-table::
   :header-rows: 1
   :widths: 35 65

   * - Tool
     - Description
   * - ``build_cis8_canonical_bytes``
     - Returns the exact bytes the external key must sign before calling ``build_cis8_register``. Pure off-chain computation.
   * - ``build_cis8_register``
     - Builds a CIS-8 ``register`` payload to record a new cross-chain key binding.
   * - ``build_cis8_revoke``
     - Builds a CIS-8 ``revoke`` payload to remove a key binding.
   * - ``build_cis8_update_metadata``
     - Builds a CIS-8 ``updateMetadata`` payload.
   * - ``set_agent_wallet_canonical_bytes``
     - Returns the canonical bytes required to prove control of a wallet when setting ``agentWallet``.

Utilities
---------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Tool
     - Description
   * - ``build_agent_card``
     - Generates a complete, valid Agent Card JSON and its SHA-256 hash from human-readable inputs.
   * - ``verify_agent_card``
     - Fetches ``agent_uri`` and verifies its hash against the on-chain ``metadata_hash``.
   * - ``token_address``
     - Computes the Base58Check CIS-2 token address for a ``(contract_index, subindex, token_id)`` triple. Off-chain only.
   * - ``parse_token_address``
     - Decodes a Base58Check token address into its component fields. Off-chain only.
   * - ``agent_registry_capabilities``
     - Lists available tools, unavailable tools with reasons, and the configured backends for a given network.
   * - ``network_status``
     - Returns the gRPC endpoint, latest finalised block, and Indexer sync state for a network.
   * - ``contract_info``
     - Returns contract addresses, module references, and admin accounts for both CIS-8004 and CIS-8 on a given network.

Connecting Claude Desktop
=========================

Add the following block to your Claude Desktop MCP configuration (``claude_desktop_config.json``) to connect to the hosted service:

.. code-block:: json

   {
     "mcpServers": {
       "concordium-agent-registry": {
         "url": "<hosted-mcp-endpoint>"
       }
     }
   }

For a locally running server, replace the URL with ``http://localhost:3000/mcp``.
