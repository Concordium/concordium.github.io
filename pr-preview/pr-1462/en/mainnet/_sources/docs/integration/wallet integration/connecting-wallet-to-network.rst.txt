.. include:: ../../../variables.rst
.. _connecting-wallet-to-network:

=====================================
Connecting your wallet to the network
=====================================

A :term:`Concordium node<Node>` is the gateway to the blockchain. For your wallet to perform any :term:`on-chain action<On-chain>`, it must communicate with a node.

Concordium nodes communicate exclusively via gRPC (gRPC Remote Procedure Calls). This framework exposes the blockchain's unique features, including its built-in identity layer and specific data structures for :term:`accounts<Account>` and :term:`smart contracts<Smart contract>`.

This section outlines the recommended architecture for establishing a robust and scalable gRPC connection to your node.

Running a Concordium node
=========================

The foundation of any reliable wallet service is running your own Concordium node. This is the most direct and secure way to interact with the blockchain, giving you full control over the availability and integrity of your connection.

A self-hosted node provides direct access to the blockchain's raw data and serves as the endpoint for sending transactions. It is the authoritative source of truth for your application.

**Advantages:** You maintain complete control over service uptime and performance, removing any dependency on third-party infrastructure.

**Developer tools:** The primary resource for this step is the official guide on :ref:`running a Concordium node<node-requirements>`, which details all hardware and software requirements, and provides installation and configuration instructions for all supported platforms.

Building a wallet proxy
=======================

While a direct node connection is essential, the raw data it provides can be complex to work with. To solve this, the recommended best practice is to build an intermediary **wallet proxy**. This is a service that you create and run which sits between your own Concordium node and your wallet application.

The proxy's job is to query your node for raw data, then process, enrich, and index it into a user-friendly format. It then serves this clean data to your wallet through a simple API (e.g., REST).

**Advantages:**

* Simplifies development by handling complex backend tasks like transaction indexing, making it much easier to display user transaction histories.

* Enriches data by adding useful metadata to on-chain information, such as adding logos and display names to the list of validators.

* Provides a clean API that presents a simple, custom-built interface to your wallet, abstracting away the complexities of raw gRPC calls.

**Developer tools:** The `Concordium Wallet Proxy <https://github.com/Concordium/concordium-wallet-proxy>`_ on GitHub serves as a valuable open-source reference implementation to guide you in building your own proxy service. Note that this example is not intended for production use.


