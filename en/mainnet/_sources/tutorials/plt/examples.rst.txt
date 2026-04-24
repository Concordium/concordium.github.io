.. _plt-integration:

============
PLT examples
============

.. admonition:: At a glance

   This page provides an overview of the PLT code examples available across three tools: the concordium-client CLI, the Web SDK (TypeScript/JavaScript), and the Rust SDK. After reading, you will know which example page to visit for your preferred tool and how to connect to the testnet gRPC node.

This section provides examples of how to work with Protocol-Level Tokens (PLTs) using tools and SDKs provided by Concordium:


:ref:`Concordium Client CLI Tool<plt-concordium-client>`:
Command line tool for performing PLT operations directly on testnet

:ref:`Web SDK<plt-web-sdk>`:
JavaScript/TypeScript SDK for PLT operations in web applications

:ref:`Rust SDK<plt-rust-sdk>`:
Concordium Rust SDK for PLT operations in native applications

Testnet gRPC Connection
===========================

When connecting to the testnet gRPC node, use the following parameters:

- **Address:** ``https://grpc.testnet.concordium.com``
- **Port:** ``20000``


.. toctree::
   :hidden:
   :maxdepth: 1

   concordium-client
   web-sdk
   rust-sdk

