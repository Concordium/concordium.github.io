.. include:: ../../variables.rst
.. _wallet-integration:

==================
Wallet integration
==================

This guide covers the technical requirements for integrating Concordium blockchain support into a cryptocurrency wallet. It walks you through core protocol features and key architectural decisions to help you plan your integration approach.

Concordium is a Layer-1 proof-of-stake blockchain with a built-in identity layer that balances user privacy with regulatory compliance through zero-knowledge proofs. The platform supports multiple transaction types, offers native staking and delegation functionality, and uses an efficient gRPC-based node communication protocol.

Integrating Concordium requires implementing support for several protocol-specific features:

* :ref:`Identity layer management <integrate-identity-layer>` - handling verified on-chain identities and zero-knowledge proofs
* :ref:`Transaction types <support-transaction-types>` - supporting CCD transfers, smart contracts, staking, and protocol-level tokens
* :ref:`Staking functionality <support-staking>` - enabling users to delegate CCD and earn rewards
* :ref:`Network connectivity <connect-wallet-to-network>` - establishing communication with Concordium nodes

This guide walks through each integration area and provides links to relevant SDKs, APIs, and reference implementations.


.. toctree::
   :hidden:
   :maxdepth: 1

   integrate-identity-layer
   support-transaction-types
   support-staking
   connect-wallet-to-network


