.. include:: ../../../variables.rst
.. _wallet-integration:

==================
Wallet integration
==================

This guide covers the technical requirements for integrating Concordium blockchain support into a crypto wallet. It walks you through core protocol features and key architectural decisions. Whether you're evaluating Concordium for integration or ready to begin implementation, this guide provides the foundation for making informed decisions.

Integration overview
====================

Concordium is a Layer-1 :term:`proof-of-stake` blockchain with a built-in :ref:`identity layer<reference-identity>` at protocol level balancing user privacy with regulatory compliance. The platform supports multiple transaction types, offers native staking and :term:`delegation` functionality, and uses an efficient gRPC-based node communication protocol.

Integrating Concordium involves implementing support for several protocol-specific features:

* **Identity layer management:** handling verified on-chain identities
* **Zero-knowledge proofs (ZKPs):** managing cryptographic proofs for privacy-preserving identity verification
* **Transaction types:** supporting CCD transfers, smart contracts, staking, and protocol-level tokens
* **Staking functionality:** enabling users to delegate CCD and earn rewards

In addition to implementing these features, you'll need to establish network connectivity through Concordium's gRPC-based communication protocol. You may consider using a wallet proxy for simplified data handling.

Guide structure
===============

The following pages provide detailed guidance for each integration area, including technical specifications and links to relevant SDKs and APIs.

* :ref:`Integrating Concordium's ID layer<integrating-identity-layer>`
* :ref:`Supporting zero-knowledge proofs (ZKPs)<supporting-zero-knowledge-proofs>`
* :ref:`Supporting transactions<supporting-transactions>`
* :ref:`Supporting staking<supporting-staking>`
* :ref:`Connecting your wallet to the network<connecting-wallet-to-network>`


.. toctree::
   :hidden:
   :maxdepth: 1

   integrating-identity-layer
   supporting-zero-knowledge-proofs
   supporting-transactions
   supporting-staking
   connecting-wallet-to-network


