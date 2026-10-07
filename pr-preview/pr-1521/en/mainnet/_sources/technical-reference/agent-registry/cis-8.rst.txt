.. include:: ../../variables.rst
.. _cis-8:

==============================
CIS-8: External Key Registry
==============================

CIS-8 is the Concordium External Key Registry standard. It records cryptographically-proven bindings between Concordium native accounts and public keys from external chains — Ethereum, Solana, Cosmos, Fetch.ai, and any other chain whose signature scheme is supported.

A CIS-8 binding is the foundation for cross-chain agent ownership: an agent registered in :doc:`CIS-8004 <cis-8004>` can carry a ``Cis8`` external reference that links it to an Ethereum address, making the agent discoverable and attributable from outside the Concordium ecosystem without sacrificing the compliance properties that come with Concordium's identity layer.

Mainnet contract: index ``10081``, subindex ``0``.

How a binding works
===================

A binding records three things on-chain:

1. **The Concordium account** — the Base58 native account that claims control of the external key.
2. **The external key** — the namespace, key type, and hex-encoded public key of the external address.
3. **The proof** — a signature by the external key over a canonical byte string, proving that the Concordium account holder also controls the external private key.

The canonical bytes that the external key must sign are deterministically derived from the Concordium account address, the external key fields, and the proof scheme. Use the MCP service tool ``build_cis8_canonical_bytes`` to obtain the exact bytes before signing.

The registration call (``build_cis8_register``) carries both the external key record and the proof. The contract verifies the signature on-chain and records the binding if it is valid.

External key format
===================

.. list-table::
   :header-rows: 1
   :widths: 20 20 60

   * - Field
     - Type
     - Description
   * - ``namespace``
     - string
     - CAIP-2 chain identifier. For Ethereum mainnet: ``eip155:1``. For Solana: ``solana:mainnet``.
   * - ``key_type``
     - string
     - Encoding of the public key. Common values: ``secp256k1-uncompressed`` (Ethereum/Cosmos), ``ed25519`` (Solana, Fetch.ai).
   * - ``public_key_hex``
     - hex string
     - The raw public key bytes, hex-encoded without ``0x`` prefix.

Proof format
============

.. list-table::
   :header-rows: 1
   :widths: 20 20 60

   * - Field
     - Type
     - Description
   * - ``scheme``
     - string
     - The signing scheme used. See supported schemes below.
   * - ``signature_hex``
     - hex string
     - The signature bytes, hex-encoded without ``0x`` prefix.

Supported proof schemes
-----------------------

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - Scheme name
     - Chain
     - How signing works
   * - ``ethereum-personal-sign``
     - Ethereum
     - Prepends ``\x19Ethereum Signed Message:\n<len>`` before the canonical bytes, then applies keccak256 and signs with secp256k1.
   * - ``solana-ed25519``
     - Solana
     - Signs the canonical bytes directly with ed25519.
   * - ``cosmos-secp256k1``
     - Cosmos
     - Signs the canonical bytes with secp256k1 using the Cosmos signature format.
   * - ``fetch-ai-ed25519``
     - Fetch.ai
     - Signs the canonical bytes with ed25519.

Registration workflow
=====================

1. Derive the canonical bytes with ``build_cis8_canonical_bytes``, supplying the Concordium account, the external key fields, and the proof scheme.
2. Sign those bytes with the external key using the appropriate scheme.
3. Call ``build_cis8_register`` with the external key record, the proof (scheme + signature), and the Concordium sender account. The tool returns a sign-ready transaction payload.
4. Sign the transaction with the Concordium account's keys and submit it to the network.

Contract entrypoints
====================

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Entrypoint
     - Description
   * - ``register``
     - Records a new binding. Callable only by the Concordium account named in the call. Verifies the external-key signature on-chain.
   * - ``revoke``
     - Removes an existing binding. Callable by the account that created it.
   * - ``updateMetadata``
     - Stores or updates arbitrary key-value metadata on a binding. The key is a UTF-8 string of at most 64 bytes; the value is opaque bytes.

On-chain lookup
===============

Given an external key (namespace + key type + public key), the MCP tool ``owner_of_key`` returns the Concordium account that registered that key, or null if no binding exists. The complementary tool ``agent_by_external_reference`` looks up a CIS-8004 agent that carries a matching ``Cis8`` external reference.

Metadata key
============

The reserved on-chain metadata key ``agentWallet`` is shared with the CIS-8004 Agent Registry and represents the payment wallet address for the agent. Setting it on a CIS-8 binding ties the payment wallet to the cross-chain identity.
