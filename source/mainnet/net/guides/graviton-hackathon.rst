:orphan:

.. include:: ../../variables.rst
.. _graviton-hackathon:

=============================
Graviton Hackathon Essentials
=============================

This page helps you to get started with Concordium for the Graviton hackathon June 14 - 28, 2023.

With a total of $100K in bounties and grants, it is the largest Concordium hackathon ever held.
You can sign up and read more about the bounties and timelines on the `hackathon website <https://concordia.devfolio.co/>`_.

Focus areas for this hackathon are:

    - Decentralized Finance (DeFi)

    - Decentralized Identities

    - Web3 Experiences (DAO Tools, Gaming, Mobile dApps, etc)

Workshop Sessions
=================

Join our free workshop sessions before the hackathon starts.

- 12th June @ 09:30 CET - Introduction to Concordium and Rust Programming, and Setting up your first smart contract on Concordium
- 13th June @ 09:30 CET - Setting up the Browser Wallet and your first Concordium dApp

You can watch the workshops `live <https://www.airmeet.com/e/48fd9170-9344-11ed-87a2-15e85d06b129>`_.
The materials from the workshop sessions are available on `GitHub <https://github.com/Concordium/voting-workshop>`_.

Recordings from previous workshops can be watched here:

- `Building Concordium Smart Contracts <https://www.youtube.com/watch?v=9po12_IavKU>`_.

- `Building A Front-end Integration <https://www.youtube.com/watch?v=ux00M5XLHZk>`_.

Quick guide
===========

- Install Rust
- Install ``cargo concordium`` or the `Concordium smart contract VSCode extension <https://marketplace.visualstudio.com/items?itemName=Concordium.concordium-smart-contracts>`_
- Install ``concordium-client``
- Import a wallet key into ``concordium-client``
- Install |bw|

These setup steps are explained in detail :ref:`here<setup-env>`.
An overview of the `developer documentation <https://developer.concordium.software/en/mainnet/index.html>`_ will help you to find the topics that you are interested in.

.. note::

    There is a public Concordium testnet node available at ``node.testnet.concordium.com`` on port ``10000`` (GRPCv1) and port ``20000`` (gRPCv2 and gRPC-web).
    You can also :ref:`run your own node<node-requirements>`, but that will take some time to catch up to the newest blocks and thereby be usable.

You can check that you have access to the node by executing the command:

.. code-block:: console

    $concordium-client consensus status --grpc-port 20000 --grpc-ip node.testnet.concordium.com

The command will return a list of values relevant to the consensus if you have a connection to the Concordium testnet node.

DApp examples
=============

An overview of different :ref:`dApp examples <dapp-examples>` is available to get started.

Concordium Academy
==================

You can go through the tutorials at `Concordium Academy <https://academy.concordium.software/ccd-academy/getting-started>`__ to learn even more about the Concordium blockchain and earn badges.
