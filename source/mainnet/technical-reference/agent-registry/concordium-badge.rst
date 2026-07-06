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

   **Registry contracts (mainnet):** CIS-8004 Agent Registry ``<10082,0>``, CIS-8 External Key Registry ``<10081,0>``. A badge that parses to any other contract is not a Concordium Badge.

Resolve and verify a badge
==========================

Verification is trustless: given only the badge string, any party can verify it independently, without trusting whoever presented it.

#. **Parse** the Base58Check string into ``(contract, token_id)``. *(MCP tool: ``parse_token_address``)*

#. **Confirm the contract** is the expected CIS-8004 registry for the network (mainnet ``<10082,0>``).

#. **Resolve on-chain** with the CIS-8004 ``agent_of(token_id)`` query, which returns the owner account, agent wallet, status, ``agent_uri``, and ``metadata_hash``. Require ``status = "Active"``. *(MCP tools: ``agent_by_token_address`` / ``agent_of``)*

#. **Check card integrity.** Fetch the Agent Card at ``agent_uri``, compute the SHA-256 hash of its canonical bytes, and require that it equals the on-chain ``metadata_hash``. The published card cannot be swapped without the chain revealing a mismatch. *(MCP tool: ``verify_agent_card``)*

#. **(Optional)** Confirm the agent's platform handle via its CIS-10 assertion, and/or an external cryptographic key bound to the agent via :doc:`CIS-8 <cis-8>`.

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
     "verify": "Resolve tokenAddress via CIS-8004 agent_of; confirm owner + status=Active + card SHA-256 == metadata_hash."
   }

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

Worked example (mainnet)
========================

.. code-block:: text

   Badge:      Mf22soLh1NuZYFgBK8iSs
    parse   →  contract 10082,0 · token_id 484 (hex e401000000000000)
    agent_of→  owner   4DDvjwdcLmTy1Ar9FCKKPMiABrS261TvyXJGr4n4ypuuogXeFF
               status  Active   (registered 2026-06-17)
               card    https://…/.well-known/agent-card.json
               hash    1253bd8fa1618f6b5fd2ff741cc8f4d60a0e6ac0f8ea5f32640c71540001e0d0
    CAIP-19 →  ccd:9dd9ca4d19e9393877d2c44b70f89acb/cis-2:Mf22soLh1NuZYFgBK8iSs

Fetch the card, compute its SHA-256, and confirm it equals ``1253bd8f…`` — the badge is verified end-to-end.

Tooling
=======

- :doc:`MCP service <mcp-service>` tools: ``parse_token_address``, ``token_address``, ``agent_by_token_address``, ``agent_of``, ``verify_agent_card``
- Encoding helpers (``@concordium/web-sdk``): ``tokenAddressToBase58``, ``tokenAddressFromBase58``
