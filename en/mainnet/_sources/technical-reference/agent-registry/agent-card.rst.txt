.. include:: ../../variables.rst
.. _agent-card:

==========
Agent Card
==========

An Agent Card is a JSON document that describes a registered AI agent: its identity, capabilities, service endpoints, and on-chain coordinates. It is hosted at a public URL (the agent's ``agent_uri``) and its integrity is protected by a SHA-256 hash anchored on-chain in the :doc:`CIS-8004 <cis-8004>` contract.

Any consumer — another agent, an AI development tool, or a human — can verify a card by fetching ``agent_uri``, computing the SHA-256 hash of the raw response body, and comparing it to the ``metadata_hash`` stored on-chain. The MCP tool ``verify_agent_card`` performs this check automatically.

Concordium's Agent Card format is compatible with the A2A (Agent-to-Agent) protocol card format and adds a ``concordium`` extension block that carries the on-chain identifiers needed for cross-chain discovery.

Top-level fields
================

.. list-table::
   :header-rows: 1
   :widths: 25 15 60

   * - Field
     - Type
     - Description
   * - ``name``
     - string
     - Display name of the agent. Maximum 128 characters.
   * - ``description``
     - string
     - Human-readable description of what the agent does. Maximum 2048 characters.
   * - ``version``
     - string
     - Semantic version of the agent (e.g. ``1.0.0``).
   * - ``url``
     - URI
     - Canonical URL where this card is hosted. Must match the ``agent_uri`` registered on-chain.
   * - ``provider``
     - object (optional)
     - The organisation that operates the agent. Has ``organization`` (string) and ``url`` (URI) sub-fields.
   * - ``skills``
     - array
     - Capabilities the agent exposes. Each entry has ``id``, ``name``, ``description``, and ``tags`` (string array).
   * - ``documentationUrl``
     - URI (optional)
     - Link to extended documentation.
   * - ``concordium``
     - object
     - Concordium-specific extension block. See below.

Concordium extension block
==========================

The ``concordium`` object is injected automatically by the MCP tool ``build_agent_card``. It carries every on-chain identifier that a consuming system needs to locate and verify the agent without prior Concordium knowledge.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Field
     - Description
   * - ``chain_id``
     - CAIP-2 chain identifier for the network the agent is registered on. For mainnet: ``concordium:mainnet``.
   * - ``token_address``
     - Base58Check CIS-2 token address derived from ``(contract_index=10082, subindex=0, token_id)``. Uniquely identifies the agent across Concordium tooling.
   * - ``cis8004_contract``
     - JSON object ``{"index": 10082, "subindex": 0}`` — the Agent Registry contract address.
   * - ``cis8_contract``
     - JSON object ``{"index": 10081, "subindex": 0}`` — the External Key Registry contract address.
   * - ``owner``
     - Base58 Concordium account address of the agent's current owner.
   * - ``services``
     - Optional key-value map of named service endpoints. For example, ``{"tippingMcp": "https://..."}`` exposes an MCP endpoint that other agents can call to tip this agent. Keys and values are free-form strings.

Example card
============

.. code-block:: json

   {
     "name": "Market Data Agent",
     "description": "Fetches and summarises real-time CCD/EUR market data on demand.",
     "version": "1.0.0",
     "url": "https://agents.example.com/market-data/card.json",
     "provider": {
       "organization": "Example Labs",
       "url": "https://example.com"
     },
     "skills": [
       {
         "id": "fetch-price",
         "name": "Fetch price",
         "description": "Returns the current CCD/EUR mid-market price.",
         "tags": ["market", "price", "ccd"]
       },
       {
         "id": "summarise-day",
         "name": "Summarise day",
         "description": "Returns a one-paragraph summary of today's CCD price action.",
         "tags": ["market", "summary", "ccd"]
       }
     ],
     "concordium": {
       "chain_id": "concordium:mainnet",
       "token_address": "TKN1A2B3C4...",
       "cis8004_contract": {"index": 10082, "subindex": 0},
       "cis8_contract": {"index": 10081, "subindex": 0},
       "owner": "3z9dkoTnLi2HEZvjnmKrMec2Gk2NKcEhdi4PugDWzP4GQtZiFa",
       "services": {
         "tippingMcp": "https://agents.example.com/market-data/mcp"
       }
     }
   }

Building and hosting a card
============================

Use the MCP tool ``build_agent_card`` to generate a valid card JSON. The tool accepts human-readable inputs (name, description, skills, owner account, and an optional ``token_id`` if the agent is already registered) and injects all Concordium-specific fields automatically. It returns the canonical JSON and its SHA-256 hash.

After receiving the JSON:

1. Host the file at a stable public URL (``agent_uri``).
2. Pass the SHA-256 hash to ``build_set_agent_uri`` (for an existing agent) or ``build_register`` (when registering a new agent) so the hash is anchored on-chain.

Whenever you update the card content you must update ``agent_uri`` and ``metadata_hash`` on-chain via ``build_set_agent_uri`` to keep the integrity anchor current.

Card verification
=================

The MCP tool ``verify_agent_card`` performs the full verification cycle for a given ``token_id``:

1. Reads ``agent_uri`` and ``metadata_hash`` from the chain.
2. Fetches the URL and computes the SHA-256 of the response body.
3. Returns ``match: true`` when both hashes are present and equal, ``match: false`` on mismatch, and ``match: null`` when either side is absent (e.g. the agent has not yet set an ``agent_uri``).
