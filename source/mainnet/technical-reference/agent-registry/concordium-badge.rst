.. include:: ../../variables.rst
.. _concordium-badge:

================
Concordium Badge
================

A Concordium Badge is the compact, verifiable identifier showing that an agent has a live on-chain identity in the :ref:`Agent Registry <agent-registry-reference>`. The badge is the agent's :doc:`CIS-8004 <cis-8004>` NFT **token address** — anyone can resolve it against the chain to confirm the agent's owner, its active status, and an integrity-checked :doc:`Agent Card <agent-card>`.

The badge is **not a new contract or token type**. It is a naming and resolution convention layered over existing Concordium standards, so adopting it requires no new deployment.

Badge string
============

A badge has two equivalent forms.

.. list-table::
   :header-rows: 1
   :widths: 20 45 35

   * - Form
     - Example
     - Use
   * - Short (Base58Check)
     - ``Mf22soLh1NuZYFgBK8iSs``
     - Display, profiles, quick lookup
   * - Canonical (CAIP-19)
     - ``ccd:9dd9ca4d19e9393877d2c44b70f89acb/cis-2:Mf22soLh1NuZYFgBK8iSs``
     - Portable identifier

**Short form.** The CIS-2 token address of the agent's CIS-8004 NFT:

.. code-block:: text

   Base58Check( 0x02 ‖ ULEB128(contract_index) ‖ ULEB128(contract_subindex) ‖ token_id_bytes )

where ``token_id`` is a ``TokenIdU64`` (8 bytes, little-endian). The ``@concordium/web-sdk`` helpers ``tokenAddressToBase58`` and ``tokenAddressFromBase58`` produce and parse this encoding.

**Canonical form.** The CAIP-19 asset identifier ``ccd:<first 32 hex characters of the network genesis hash>/cis-2:<short form>``.

- Chain identifier (CAIP-2), mainnet: ``ccd:9dd9ca4d19e9393877d2c44b70f89acb``
- Owner identifier (CAIP-10): ``ccd:9dd9ca4d19e9393877d2c44b70f89acb:<account>``

.. note::

   **Registry contracts.** :doc:`CIS-8004 <cis-8004>` and :doc:`CIS-8 <cis-8>` are open standards. Concordium operates the official registries — on mainnet, the CIS-8004 Agent Registry ``<10082,0>`` and the CIS-8 External Key Registry ``<10081,0>`` — but a badge is a Concordium Badge whenever its contract *implements the CIS-8004 standard*, not only when it resolves to the official instance. Each badge's ``contracts`` block names the specific contracts it resolves against, and a verifier decides which registries it trusts.

Resolve and verify a badge
==========================

Verification is trustless: given only the badge string, any party can verify it independently, without trusting whoever presented it.

.. note::

   **Zero-setup path.** A badge embedded in an Agent Card may advertise a ``verification`` block (defined under **Embed the badge**, below) that points at a hosted resolver. A consumer that has never used Concordium can then verify from the card alone — ``GET`` the ``verifyUrl`` and read the verdict — without first discovering which node, resolver, or MCP endpoint to call. The steps below are what that resolver runs, and what a consumer verifying directly against the chain performs itself.

#. **Parse** the Base58Check string into ``(contract, token_id)``. *(MCP tool: ``parse_token_address``)*

#. **Confirm the contract** implements CIS-8004 and is a registry your application trusts. Concordium's official mainnet registry is ``<10082,0>``.

#. **Resolve on-chain** with the CIS-8004 ``agent_of(token_id)`` query, which returns the owner account, agent wallet, status, ``agent_uri``, and ``metadata_hash``. Require ``status = "Active"``. *(MCP tools: ``agent_by_token_address`` / ``agent_of``)*

#. **Check card integrity.** Fetch the Agent Card at ``agent_uri``, compute the SHA-256 hash of its canonical bytes, and require that it equals the on-chain ``metadata_hash``. The published card cannot be swapped without the chain revealing a mismatch. *(MCP tool: ``verify_agent_card``)*

#. **(Optional)** Confirm an external cryptographic key bound to the agent via :doc:`CIS-8 <cis-8>`.

A passing check proves that the agent is registered in the Agent Registry, is currently active, is owned by an accountable Concordium account, and that its published card is exactly the one committed on-chain. The trust root is Concordium — not the party presenting the badge.

Embed the badge
===============

Agent Card
----------

Add a ``concordium`` block to the :doc:`Agent Card <agent-card>`:

.. code-block:: json

   "concordium": {
     "tokenAddress": "ccd:9dd9ca4d19e9393877d2c44b70f89acb/cis-2:Mf22soLh1NuZYFgBK8iSs",
     "tokenAddressBase58": "Mf22soLh1NuZYFgBK8iSs",
     "chain": "ccd:9dd9ca4d19e9393877d2c44b70f89acb",
     "owner": { "account": "<account>", "caip10": "ccd:9dd9ca4d…:<account>" },
     "contracts": { "cis8004": "10082,0", "cis8": "10081,0" },
     "verify": "Resolve tokenAddress via CIS-8004 agent_of; confirm owner + status=Active + card SHA-256 == metadata_hash.",
     "verification": {
       "service": "Concordium Agent Registry",
       "verifyUrl": "https://agent-registry-mcp.concordium.com/v1/badge-check/<account>",
       "mcp": "https://agent-registry-mcp.concordium.com/mcp",
       "docs": "https://docs.concordium.com/mainnet/technical-reference/agent-registry/concordium-badge.html"
     }
   }

The ``verify`` string names the steps; the optional ``verification`` block names **where to run them** — ``service``, ``verifyUrl``, ``mcp``, and ``docs``. Together they make a badge *self-resolving*: a consumer that has never seen Concordium can verify it from the card alone. The values below are Concordium's official Agent Registry service, shown as an example — the block is **not limited to them**. Any issuer may point these fields at a different service that runs the same checks, and any party may ignore the hints entirely and resolve directly against the contracts in ``contracts``.

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Field
     - Purpose
   * - ``service``
     - Human-readable name of the resolver / registry service.
   * - ``verifyUrl``
     - REST endpoint — the owner account's badge check — returning a JSON verdict for each of the account's badges, including this one (owner, ``status``, and card-hash match). One ``GET``, no MCP client, SDK, or node access required.
   * - ``mcp``
     - MCP endpoint for agents that speak the Model Context Protocol; they can call ``verify_agent_card`` / ``agent_by_token_address`` directly.
   * - ``docs``
     - This specification, for a consumer that prefers to verify manually against the chain.

A service named here is a convenience, not an authority — it returns chain-derived data the consumer can re-check against the contracts in the badge. Issuers point these fields at whichever hosted verification service — resolver and :doc:`MCP <mcp-service>` — they operate or trust. Discovery and enumeration (finding agents you don't already have a badge for) is a separate concern handled by the :doc:`Indexer <indexer>`, not the badge.

Profile or bio
--------------

.. code-block:: text

   Concordium Badge: Mf22soLh1NuZYFgBK8iSs
   Agent Card: https://…/.well-known/agent-card.json

Visual mark
===========

The human-facing badge is the official **"Verified by Concordium"** logomark from the Concordium Agent Registry brand kit. It should link to the resolved badge — the agent's registry or explorer entry.

.. warning::

   The visual is a claim; the string is the proof. Always pair the logomark with the badge string so the claim can be verified.

Built on existing standards
===========================

The badge introduces no new standard. It composes:

- :doc:`CIS-8004 <cis-8004>` — Agent Registry / agent NFT
- CIS-2 — token-address encoding
- CAIP-2 / CAIP-10 / CAIP-19 — portable chain, account, and asset identifiers
- :doc:`CIS-8 <cis-8>` — external key binding
- :doc:`Agent Card <agent-card>` — the agent's published metadata document

Tooling
=======

- :doc:`MCP service <mcp-service>` tools: ``parse_token_address``, ``token_address``, ``agent_by_token_address``, ``agent_of``, ``verify_agent_card``
- Encoding helpers (``@concordium/web-sdk``): ``tokenAddressToBase58``, ``tokenAddressFromBase58``
