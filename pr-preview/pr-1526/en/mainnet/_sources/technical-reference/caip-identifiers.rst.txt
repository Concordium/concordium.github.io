.. include:: ../variables.rst
.. _caip-identifiers:

================================
CAIP identifiers for Concordium
================================

Concordium uses Chain Agnostic Improvement Proposal (CAIP) identifiers wherever an on-chain object — a network, an account, a smart contract, or an asset — is referenced from an off-chain document, so that consumers on any chain can parse the reference without Concordium-specific knowledge. The :doc:`Verified by Concordium badge <agent-registry/concordium-badge>` and the :doc:`Agent Card <agent-registry/agent-card>` use these identifiers throughout.

This page documents the ``ccd`` namespace profile. The namespace and its CAIP-2 profile are registered in the ChainAgnostic namespaces registry; the CAIP-10 and CAIP-19 profiles below are being submitted to the registry and are documented here as the authoritative definition in the meantime.

CAIP-2 — Networks
=================

*Registered:* the ``ccd`` CAIP-2 profile is published in the ChainAgnostic namespaces registry.

Syntax
------

A Concordium network is identified by ``ccd:`` followed by the hash of the network's genesis block in hexadecimal encoding, truncated to the first 32 characters.

Resolution mechanics
--------------------

The genesis block hash is obtained from any Concordium node via the gRPC ``GetConsensusInfo`` query (``genesisBlock`` field), or with ``concordium-client raw GetConsensusInfo``, then truncated to the first 32 hexadecimal characters.

Test cases
----------

.. code-block:: text

   # Concordium mainnet
   ccd:9dd9ca4d19e9393877d2c44b70f89acb

   # Current Concordium testnet
   ccd:4221332d34e1694168c2a0c0b3fd0f27

CAIP-10 — Accounts and smart contracts
======================================

*Registration with the ChainAgnostic registry pending.*

Syntax
------

**Account address.** A Concordium account is identified by the CAIP-2 network identifier, a colon, and the account's Base58Check address:

.. code-block:: text

   ccd:<network>:<account-address>

**Smart contract address.** A Concordium smart contract is natively addressed by an index and subindex pair, written ``<index,subindex>``. In CAIP-10 form the comma is substituted with a dot, because the comma is not a valid CAIP-10 character:

.. code-block:: text

   ccd:<network>:<index>.<subindex>

Resolution mechanics
--------------------

An account identifier resolves by querying the account address on the identified network. A contract identifier ``ccd:<network>:1234.0`` resolves to the native contract address ``<1234,0>`` — split the final segment on the dot to recover the index and subindex, both non-negative integers. The two forms are distinguishable without ambiguity: contract references contain a dot and consist only of digits and a dot, while Base58Check account addresses do not.

Test cases
----------

.. code-block:: text

   # Concordium mainnet account
   ccd:9dd9ca4d19e9393877d2c44b70f89acb:4FmiTW2L2AccyR9VjzsnpWFSAcohXWf7Vf797i36y526mqiEcp

   # Current Concordium testnet account
   ccd:4221332d34e1694168c2a0c0b3fd0f27:3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G

   # Concordium mainnet smart contract <1234,0>
   ccd:9dd9ca4d19e9393877d2c44b70f89acb:1234.0

   # Current Concordium testnet smart contract <1234,0>
   ccd:4221332d34e1694168c2a0c0b3fd0f27:1234.0

CAIP-19 — Assets
================

*Registration with the ChainAgnostic registry pending.*

Syntax
------

A Concordium asset is identified by the CAIP-2 network identifier, a slash, an asset namespace, a colon, and an asset reference. Three asset namespaces are defined:

.. list-table::
   :header-rows: 1
   :widths: 15 35 50

   * - Namespace
     - Reference
     - Identifies
   * - ``cis-2``
     - Base58Check token address
     - A CIS-2 token instance. The token address encodes the contract address and token id in one string.
   * - ``plt``
     - Token symbol
     - A protocol-level token (PLT), identified by its unique symbol.
   * - ``slip44``
     - ``919``
     - CCD itself, per the SLIP-44 registered coin type for Concordium.

Resolution mechanics
--------------------

A ``cis-2`` reference is parsed with the ``@concordium/web-sdk`` helper ``tokenAddressFromBase58`` (inverse: ``tokenAddressToBase58``), yielding the contract address and token id: ``Base58Check( 0x02 ‖ ULEB128(contract_index) ‖ ULEB128(contract_subindex) ‖ token_id_bytes )``. A ``plt`` reference resolves via the protocol-level token registry on the identified network. ``slip44:919`` requires no resolution — it denotes the network's native CCD.

Test cases
----------

.. code-block:: text

   # Concordium mainnet
   ccd:9dd9ca4d19e9393877d2c44b70f89acb/cis-2:3rE6rK8FrW1nsQYB
   ccd:9dd9ca4d19e9393877d2c44b70f89acb/plt:eGOLD
   ccd:9dd9ca4d19e9393877d2c44b70f89acb/slip44:919

   # Current Concordium testnet
   ccd:4221332d34e1694168c2a0c0b3fd0f27/cis-2:9Caati1emwuNgVd3aBFmFEiYhRGPT2ra4u9T7mXn9wtHo2Kd4P278w
   ccd:4221332d34e1694168c2a0c0b3fd0f27/plt:EUDemo
   ccd:4221332d34e1694168c2a0c0b3fd0f27/slip44:919

Usage in the agent stack
========================

The :doc:`Verified by Concordium badge <agent-registry/concordium-badge>` is a CAIP-19 ``cis-2`` identifier; the badge extension's ``owner`` and ``contracts`` fields are CAIP-10 identifiers; and the ERC-8004 ``registrations`` entry uses the CAIP-10 contract form for ``agentRegistry``. Using full CAIP identifiers everywhere makes each value self-describing — the network is explicit in the string — and lets cross-chain tooling treat ``ccd:`` references exactly like references in any other registered namespace.
