.. include:: ../../variables.rst
.. _wallet-integration:

==================
Wallet integration
==================

This guide covers the technical requirements for integrating Concordium blockchain support into a crypto wallet. It walks you through core protocol features and key architectural decisions. Whether you're evaluating Concordium for integration or ready to begin implementation, this guide provides the foundation for making informed decisions.

Integration overview
====================

Concordium is a Layer-1 :term:`proof-of-stake` blockchain with a built-in :ref:`identity layer<reference-identity>` at protocol level balancing user privacy with regulatory compliance. The platform supports multiple transaction types, offers native staking and :term:`delegation` functionality, and uses an efficient gRPC-based node communication protocol.

Integrating Concordium requires implementing support for several protocol-specific features:

* **Identity layer management:** handling verified on-chain identities and zero-knowledge proofs
* **Transaction types:** supporting CCD transfers, smart contracts, staking, and protocol-level tokens
* **Staking functionality:** enabling users to delegate CCD and earn rewards

In addition to implementing these features, you'll need to establish network connectivity through Concordium's gRPC-based communication protocol. You may consider using a wallet proxy for simplified data handling.

Guide structure
===============

The following pages provide detailed guidance for each integration area, including technical specifications and links to relevant SDKs and APIs.

* :ref:`Integrate Concordium's ID layer<integrate-identity-layer>`
* :ref:`Support transactions<support-transactions>`
* :ref:`Support staking<support-staking>`
* :ref:`Connect your wallet to the network<connect-wallet-to-network>`


.. toctree::
   :hidden:
   :maxdepth: 1

   integrate-identity-layer
   support-transactions
   support-staking
   connect-wallet-to-network


