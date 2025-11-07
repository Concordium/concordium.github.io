.. include:: ../../variables.rst
.. _connect-wallet-to-network:

==================================
Connect your wallet to the network
==================================

A Concordium node is the gateway to the blockchain. For your wallet to perform any on-chain action, it must communicate with a node.

Concordium nodes communicate exclusively via gRPC (gRPC Remote Procedure Calls). This high-performance framework exposes the blockchain's unique features, including its built-in identity layer and specific data structures for accounts and smart contracts. This section outlines the recommended architecture for establishing a robust and scalable gRPC connection to your node.

Running a Concordium node
=========================

The foundation of any reliable wallet service is running your own Concordium node. This is the most direct and secure way to interact with the blockchain, giving you full control over the availability and integrity of your connection.

A self-hosted node provides direct access to the blockchain's raw data and serves as the endpoint for sending transactions. It is the authoritative source of truth for your application.

