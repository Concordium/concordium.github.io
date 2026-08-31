.. include:: ../../variables.rst
.. _agent-card:

==========
Agent Card
==========

An Agent Card is a JSON document that describes a registered AI agent: its identity, capabilities, service endpoints, and on-chain coordinates. It is hosted at a public URL (the agent's ``agent_uri``) and its integrity is protected by a SHA-256 hash anchored on-chain in the :doc:`CIS-8004 <cis-8004>` contract.

Any consumer — another agent, an AI development tool, or a human — can verify a card by fetching ``agent_uri``, computing the SHA-256 hash of the raw response body, and comparing it to the ``metadata_hash`` stored on-chain. The MCP tool ``verify_agent_card`` performs this check automatically.

Concordium's Agent Card is a single **combined document**: it is simultaneously a valid ERC-8004 (Trustless Agents) *agent registration file* and a valid A2A v1.0 *Agent Card*, with the Verified by Concordium badge carried as an A2A extension. One anchored JSON therefore serves ERC-8004 tooling, A2A clients, and Concordium verification at once. This works because the two standards compose cleanly: their shared fields (``name``, ``description``) mean the same thing, and each specification tolerates the other's fields — A2A requires implementations to ignore unrecognized fields, and ERC-8004 permits additional fields beyond its mandatory structure.

Top-level fields
================

Fields drawn from **ERC-8004** (registration file structure):

.. list-table::
   :header-rows: 1
   :widths: 25 15 60

   * - Field
     - Type
     - Description
   * - ``type``
     - string
     - Identifies the document as an ERC-8004 registration file. Fixed value: ``https://eips.ethereum.org/EIPS/eip-8004#registration-v1``.
   * - ``image``
     - URI
     - Agent image, for compatibility with ERC-721 applications that render the agent NFT.
   * - ``services``
     - array
     - Named service endpoints, each ``{name, endpoint, version}`` — e.g. an ``A2A`` entry pointing at the card's public URL and an ``MCP`` entry for the agent's MCP endpoint. The list is open-ended.
   * - ``x402Support``
     - boolean
     - Whether the agent supports x402 proof-of-payment.
   * - ``active``
     - boolean
     - Whether the agent is operational.
   * - ``registrations``
     - array
     - The agent's on-chain registrations. Each entry has a numeric ``agentId`` (the CIS-8004 token id) and ``agentRegistry`` as a :doc:`CAIP-10 contract address <../caip-identifiers>`. An array because one agent may be registered in several registries across chains.

Fields drawn from **A2A v1.0** (Agent Card structure):

.. list-table::
   :header-rows: 1
   :widths: 25 15 60

   * - Field
     - Type
     - Description
   * - ``name``
     - string
     - Display name of the agent. Shared with ERC-8004. Maximum 128 characters.
   * - ``description``
     - string
     - Human-readable description of what the agent does. Shared with ERC-8004. Maximum 2048 characters.
   * - ``version``
     - string
     - Semantic version of the agent (e.g. ``1.0.0``).
   * - ``provider``
     - object (optional)
     - The organisation that operates the agent. Has ``organization`` (string) and ``url`` (URI) sub-fields.
   * - ``supportedInterfaces``
     - array
     - Endpoints where the agent's A2A service is reachable, each ``{url, protocolBinding, protocolVersion}``, in preference order.
   * - ``capabilities``
     - object
     - Declared A2A capabilities (``streaming``, ``pushNotifications``) and the ``extensions`` array carrying the :doc:`Verified by Concordium badge <concordium-badge>` extension.
   * - ``defaultInputModes`` / ``defaultOutputModes``
     - array
     - Default request and response media types, e.g. ``["text/plain"]``.
   * - ``skills``
     - array
     - Capabilities the agent exposes. Each entry has ``id``, ``name``, ``description``, and ``tags`` (string array).
   * - ``documentationUrl``
     - URI (optional)
     - Link to extended documentation.

Verified by Concordium badge extension
======================================

The badge — the agent's on-chain identity — is declared in ``capabilities.extensions`` under the extension URI ``https://docs.concordium.com/a2a-extensions/concordium-badge/v1``, with its on-chain coordinates (CAIP-19 token address, CAIP-10 owner and contracts, verification hints) in the extension's ``params``. The :doc:`Verified by Concordium badge <concordium-badge>` page is the normative definition of the extension and its fields; the example below shows it in place. The MCP tool ``build_agent_card`` injects the extension, the ``registrations`` entry, and all other Concordium-specific fields automatically.

Example card
============

.. code-block:: json

   {
     "type": "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
     "name": "Market Data Agent",
     "description": "Fetches and summarises real-time CCD/EUR market data on demand.",
     "image": "https://agents.example.com/market-data/icon.png",
     "version": "2.0.0",
     "provider": { "organization": "Example Labs", "url": "https://example.com" },
     "supportedInterfaces": [
       { "url": "https://agents.example.com/market-data/a2a/v1", "protocolBinding": "HTTP+JSON", "protocolVersion": "1.0" }
     ],
     "capabilities": {
       "streaming": false,
       "pushNotifications": false,
       "extensions": [
         {
           "uri": "https://docs.concordium.com/a2a-extensions/concordium-badge/v1",
           "description": "Verified by Concordium badge — on-chain agent identity in a CIS-8004 registry",
           "required": false,
           "params": {
             "tokenAddress": "ccd:9dd9ca4d19e9393877d2c44b70f89acb/cis-2:Mf22soLh1NuZYFgBK8iSs",
             "owner": {
               "account": "ccd:9dd9ca4d19e9393877d2c44b70f89acb:3z9dkoTnLi2HEZvjnmKrMec2Gk2NKcEhdi4PugDWzP4GQtZiFa"
             },
             "contracts": {
               "cis8004": "ccd:9dd9ca4d19e9393877d2c44b70f89acb:10082.0",
               "cis8": "ccd:9dd9ca4d19e9393877d2c44b70f89acb:10081.0"
             },
             "verify": "Resolve tokenAddress via CIS-8004 agent_of; confirm owner + status is Active + card SHA-256 equals metadata_hash.",
             "verification": {
               "service": "Concordium Agent Registry",
               "verifyUrl": "https://agent-registry-mcp.concordium.com/v1/badge-check/Mf22soLh1NuZYFgBK8iSs",
               "mcp": "https://agent-registry-mcp.concordium.com/mcp",
               "docs": "https://docs.concordium.com/en/mainnet/technical-reference/agent-registry/concordium-badge.html"
             }
           }
         }
       ]
     },
     "defaultInputModes": ["text/plain"],
     "defaultOutputModes": ["text/plain"],
     "skills": [
       { "id": "fetch-price", "name": "Fetch price", "description": "Returns the current CCD/EUR mid-market price.", "tags": ["market", "price", "ccd"] },
       { "id": "summarise-day", "name": "Summarise day", "description": "Returns a one-paragraph summary of today's CCD price action.", "tags": ["market", "summary", "ccd"] }
     ],
     "services": [
       { "name": "A2A", "endpoint": "https://agents.example.com/market-data/.well-known/agent-card.json", "version": "1.0" },
       { "name": "MCP", "endpoint": "https://agents.example.com/market-data/mcp", "version": "2025-06-18" }
     ],
     "x402Support": false,
     "active": true,
     "registrations": [
       { "agentId": 484, "agentRegistry": "ccd:9dd9ca4d19e9393877d2c44b70f89acb:10082.0" }
     ]
   }

Cards published before this specification carry the badge as a top-level ``concordium`` object; see :doc:`Legacy embedding <concordium-badge>` on the badge page. Verifiers accept both forms.

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
