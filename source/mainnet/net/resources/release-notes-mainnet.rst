.. _mainnet-release-notes:

=============
Release notes
=============

.. contents::
   :local:
   :backlinks: none

Mainnet 1: Alpha Centauri
=========================

June 9, 2021

We are proud to announce that version 1 of the Concordium blockchain infrastructure, the “Alpha Centauri” release, is available for download.

Our Mainnet release has the following main features:

Proof of Stake
--------------

The Concordium Blockchain uses a proof of stake mechanism to ensure resource-efficient operation of the network.

Two Layer Consensus Protocol
----------------------------

-  Nakamoto-Style Consensus
   Bakers participate in a form of lottery to win the right to append blocks to the chain.

-  Finality Layer
   Concordium finality layer dynamically ‘checkpoints’ the blockchain using Byzantine agreement to identify and mark common blocks in the chains of honest users as final.

Built in IDLayer
----------------

Account creation is based on a validated identity, but at the same time it provides transactional privacy for users with a mechanism that allows accountability to local regulatory authorities.

Transactional privacy is further enhanced by support for shielded transfers.

Smart Contracts
---------------

Concordium blockchain has native support for smart contracts on-chain with our core on-chain language WebAssembly (Wasm), a portable well-defined assembly-like language.

Rust is the first off-chain high level smart contract language.

Tokenomics and On-chain Incentivization
---------------------------------------

The Concordium blockchain comprises a set of transactions and economic roles that interact within the economy. An economic role, such as a baker or account holder, is represented by an account on the Concordium platform.

The flow of GTU between accounts via transactions creates an economy that is designed to incentivize participation in the network and counter dishonest behaviour. It is the objective of the Concordium Foundation to guide the creation of a sustainable economy that rewards participants for their efforts in developing the network.

Concordium Node
---------------
The Concordium node software is available for Linux and available in two different packages:

-  A distribution package, which provides wrappers for setting up the node in a Docker image.

-  A Debian package built for Ubuntu 20.04. This package allows for greater customization of the node set up.

Mobile Wallet
-------------

The Mobile Wallet is available for iOS and Android with support for:

-  identity issuance and management.
-  account creation and management.
-  simple and shielded transactions.
-  platform security protection
-  export and import to other mobile wallets.
-  access to the blockchain through a “wallet proxy” operated by Concordium with no need to run a node.

Desktop Wallet
--------------

The Desktop Wallet is available for Windows, macOS, and Linux with support for:

-  identity issuance and management.
-  account creation and management.
-  protection by Ledger Nano S device.
-  multi signature account set up and management.
-  multiple transaction types:
   -  Simple
   -  Scheduled
   -  Shielded
   -  Multi-signature
-  filtering and printing historic transactions
-  baker management
-  access to blockchain via a service node, which is usually owned by the user of the Desktop Wallet.

Source Code
-----------

The source code for the Concordium Blockchain is free open source software. You can access our repositories on the `Concordium GitHub organization page <https://github.com/Concordium>`_.

