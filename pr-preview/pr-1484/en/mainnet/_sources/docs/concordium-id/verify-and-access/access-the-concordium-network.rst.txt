.. _access-the-concordium-network:

=============================
Access the Concordium network
=============================

A Concordium node is the gateway to the blockchain. For a valid, verifiable audit record of your platform, on-chain transactions (:term:`VRA<Verification Request Anchor>` and :term:`VAA<Verification Audit Anchor>`) must occur, requiring a connection with a Concordium node.

Concordium nodes communicate exclusively via gRPC (gRPC Remote Procedure Calls). This framework exposes the blockchain's unique features, including its built-in identity layer and specific data structures for accounts and smart contracts. This page outlines the recommended architecture for establishing a robust and scalable gRPC connection to your node.

Running a Concordium node
==========================

The foundation of any reliable ZKP service is running your own Concordium node. This is the most direct and secure way to interact with the blockchain, giving you full control over the availability and integrity of your connection.

**Purpose:** A self-hosted node provides direct access to the blockchain's raw data and serves as the endpoint for sending transactions. It is the authoritative source of truth for your application.

**Advantages:** You maintain complete control over service uptime and performance, removing any dependency on third-party infrastructure.

**Developer tools:** The primary resource for this step is :ref:`the official guide on running a node <node-requirements>`, which details all hardware and software requirements.

Connecting via a node as a service
===================================

For developers seeking a faster setup and reduced operational overhead, connecting to a hosted gRPC node is an excellent alternative to running your own infrastructure. This approach allows you to interact with the Concordium blockchain through a reliable third-party provider, simplifying your connection and letting you focus on application development.

**Purpose:** A hosted node service provides a ready-to-use gRPC endpoint for querying blockchain data and submitting transactions. It abstracts away the complexities of node maintenance, offering a managed gateway to the network.

**Advantages:** You benefit from instant access, scalability, and zero hardware maintenance, making it ideal for rapid prototyping, streamlined deployments, or projects where managing infrastructure is not a core focus.

**Developer tools:** To connect, you will need the gRPC endpoint address from your chosen provider. All interactions are then handled through Concordium's official SDKs, which are simply configured to communicate with the hosted endpoint instead of a local node.

Please note that Concordium does not offer a hosted gRPC node directly, but we have partnered with trusted third-party providers. If you are interested in learning more, please contact us.

