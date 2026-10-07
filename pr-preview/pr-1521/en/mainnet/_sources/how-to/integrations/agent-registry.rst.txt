.. include:: ../../variables.rst
.. _agent-registry-how-to:

==========================
Use the Agent Registry
==========================

.. admonition:: At a glance

   This guide explains what the Concordium Agent Registry is, how native Concordium accounts differ from Ethereum-style addresses in this context, and what an Agent Card is. You will end the guide knowing how to register an agent, link an external key, and publish a verifiable Agent Card — whether you are coming from a Concordium-native background or from the Ethereum ecosystem.

The Agent Registry is an on-chain system that gives AI agents a persistent, verifiable identity on Concordium. Each agent is represented as a non-fungible token (an NFT minted under the :ref:`CIS-8004 <cis-8004>` standard) that carries a public URL pointing to an :ref:`Agent Card <agent-card>` — a JSON document describing the agent's name, capabilities, and service endpoints.

Because the registry is built on Concordium's identity layer, agents can be linked to verified human owners, making trust in agentic transactions concrete rather than speculative.

Native and external accounts
=============================

**Native accounts** are the standard Concordium account type — a Base58-encoded address derived from one or more cryptographic key pairs managed in a Concordium wallet. Every on-chain action in the registry (minting, transferring, revoking) is signed by the native account that owns the agent.

**External accounts** — most commonly Ethereum addresses — can also be linked to the registry through the :ref:`CIS-8 External Key Registry <cis-8>`. CIS-8 records a cryptographic proof on-chain that a given Ethereum (or Solana, Cosmos, or Fetch.ai) public key is controlled by the same person who controls a specific Concordium native account. Once that proof exists, a CIS-8004 agent can carry a ``Cis8`` external reference that exposes the Ethereum address to any tooling that knows how to read CIS-8 bindings.

The result is that agents are fully interoperable: Concordium tools address agents by token ID or native owner; Ethereum-side tooling addresses them by Ethereum public key; both resolve to the same on-chain NFT.

What is an Agent Card?
=======================

An Agent Card is a JSON file hosted at a public URL (the ``agent_uri`` of the registered agent). It is the agent's public identity document and contains:

- **Name and description** — human-readable metadata about what the agent does.
- **Skills** — a structured list of the capabilities the agent exposes, each with an ID, a name, a description, and optional tags.
- **Provider** — the organisation responsible for operating the agent.
- **Services** — named endpoint URLs the agent exposes to other agents (for example, a tipping MCP endpoint).
- **Concordium extension block** — on-chain coordinates: the CAIP-2 chain ID, the canonical token address, the CIS-8004 and CIS-8 contract addresses, and the owner account.

The SHA-256 hash of the card's raw bytes is stored on-chain as the ``metadata_hash``. Any consumer can re-fetch the card, recompute the hash, and confirm it matches the on-chain value — this is what the MCP tool ``verify_agent_card`` does automatically.

The card format is compatible with the A2A (Agent-to-Agent) protocol, so agents registered on Concordium are discoverable by any A2A-compatible framework.

Register a native agent
========================

1. **Generate the Agent Card JSON** using the MCP tool ``build_agent_card``. Supply the agent's name, description, skills, your Concordium owner account, and the URL where you will host the card. The tool returns the JSON and its SHA-256 hash.

2. **Host the card** at the URL you specified. The URL must be publicly reachable and must serve exactly the bytes the tool returned (no reformatting).

3. **Register on-chain** using ``build_register``. Pass the ``agent_uri``, the ``metadata_hash_hex`` from step 1, and your Concordium sender account. The tool returns a sign-ready transaction payload.

4. **Sign and submit** the payload with your Concordium wallet. On success, a new agent NFT is minted and you receive its ``token_id``.

5. **Confirm** by calling ``verify_agent_card`` with the new ``token_id``. It returns ``match: true`` when the on-chain hash and the hosted card agree.

Register with a linked Ethereum address
=========================================

Follow these steps to give your agent an on-chain link to an Ethereum address in addition to its Concordium native owner.

Step 1: Derive the canonical bytes
------------------------------------

Call ``build_cis8_canonical_bytes`` with:

- ``concordium_account``: your Concordium Base58 account address.
- ``external_namespace``: the CAIP-2 identifier of the Ethereum chain, e.g. ``eip155:1`` for Ethereum mainnet.
- ``external_key_namespace``: same value as ``external_namespace``.
- ``external_key_type``: ``secp256k1-uncompressed``.
- ``external_public_key_hex``: the uncompressed Ethereum public key, hex-encoded without ``0x``.
- ``proof_scheme``: ``ethereum-personal-sign``.

The tool returns a hex string of canonical bytes.

Step 2: Sign with the Ethereum key
------------------------------------

Using your Ethereum wallet or library, sign the canonical bytes using the ``eth_sign`` / personal-sign method (which prepends the Ethereum message prefix and applies keccak256 before signing). Record the resulting signature as a hex string.

Step 3: Submit the CIS-8 registration
---------------------------------------

Call ``build_cis8_register`` with the external key record (namespace, key type, public key) and the proof (scheme ``ethereum-personal-sign``, signature hex). Sign and submit the returned payload with your Concordium account.

Step 4: Register the agent with the Cis8 reference
------------------------------------------------------

Call ``build_register`` with an ``external_reference`` of kind ``Cis8`` pointing at the CIS-8 contract (index ``10081``, subindex ``0``) and the external key fields. Include ``agent_uri`` and ``metadata_hash_hex`` as in the native flow.

Sign and submit the payload with your Concordium account. The resulting agent NFT is now resolvable both by its Concordium token ID and by the linked Ethereum address.

Update an agent card
=====================

When the card content changes, update both the hosted file and the on-chain hash:

1. Regenerate the card JSON (or edit it manually — the ``concordium`` block fields must remain accurate).
2. Re-host the updated file at the same ``agent_uri``, or at a new URL.
3. Call ``build_set_agent_uri`` with the ``token_id``, the (possibly new) ``agent_uri``, and the SHA-256 hash of the new card bytes.
4. Sign and submit the payload.

Transfer an agent
==================

Agents are CIS-2 NFTs and can be transferred to a new Concordium owner using ``build_transfer``. Transferring an agent automatically clears the ``agentWallet`` metadata key — the new owner must set a new payment wallet if they want one.

Next steps
==========

- :ref:`CIS-8004 reference <cis-8004>` — full entrypoint and state specification.
- :ref:`CIS-8 reference <cis-8>` — cross-chain key binding details and supported proof schemes.
- :ref:`Agent Card reference <agent-card>` — complete field-by-field card specification.
- :ref:`MCP service reference <agent-registry-mcp>` — all available tools and configuration options.
