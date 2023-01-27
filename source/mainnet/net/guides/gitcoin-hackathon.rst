:orphan:

.. include:: ../../variables.rst
.. _gitcoin-hackathon:

============================
Gitcoin Hackathon Essentials
============================

This page helps you to get started with Concordium for the Gitcoin hackathon February 6 - 26, 2023.

With a total of $15K in prizes, it is the largest Concordium hackathon.
You can sign up and read more about the bounties and timelines on the `hackathon website <https://gitcoin.co/hackathon/concordium-identity/onboard>`_.

Join our free workshop sessions before the hackathon starts.

Workshop Sessions
=================

- 1st February @ 12:00 CET - Welcome, Concordium Overview & Intro to Rust
- 2nd February @ 12:00 CET - Building Smart Contracts
- 3rd February @ 12:00 CET - Building dApps & Ideation Session

- 8th, 15th and 22nd February @ 9:00 - 17:00 CET - Weekly Developer Relations Office Hours

The materials from the workshop sessions are available on `GitHub <https://github.com/Concordium/voting-workshop>`_.

Recording from previous workshops can be watched here:

- `Building Concordium Smart Contracts <https://www.youtube.com/watch?v=9po12_IavKU>`_.

- `Building A Front-end Integration <https://www.youtube.com/watch?v=ux00M5XLHZk>`_.

Quick guide
===========

- Install Rust
- Install ``cargo concordium``
- Install ``concordium-client``
- Import a wallet key into ``concordium-client``

These setup steps are explained in detail :ref:`here<setup-env>`.
An overview of the `developer documentation <https://developer.concordium.software/en/mainnet/index.html>`_ will help you to find the topics that you are interested in.

.. note::

    There is a public Concordium testnet node available at node.testnet.concordium.com on port 10000 (GRPCv1) and port 20000 (gRPCv2 and gRPC-web), if you don't want to sync your own node.

You can check that you have access to the node by executing the command:

.. code-block:: console

    $concordium-client consensus status --grpc-port 10000 --grpc-ip node.testnet.concordium.com

The command will return a list of values relevant to the consensus if you have a connection to the Concordium testnet node.

DApp examples
=============

An overview of different :ref:`dApp examples <dapp-examples>` to get started.
