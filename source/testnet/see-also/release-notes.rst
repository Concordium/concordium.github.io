.. _download page: /testnet/docs/downloads
.. _iOS Concordium ID: /testnet/docs/downloads
.. _Added import to app: /testnet/docs/quickstart-export-import
.. _Encrypted(shielded) amounts and transfers: /testnet/docs/quickstart-shielded-transfers
.. _here: https://developer.concordium.com/testnet/docs/downloads#concordium-id
.. _upgrade: /testnet/docs/quickstart-node#upgrade-from-open-testnet-v1
.. _Concordium Node version 0.2.13: /testnet/docs/downloads#concordium-node-and-client
.. _Concordium ID: /testnet/docs/downloads#concordium-id
.. _Concordium Node and Client Software: /testnet/docs/downloads#concordium-node-and-client
.. _Dashboard: https://dashboard.testnet.concordium.com/

=============
Release Notes
=============

.. contents::
   :local:
   :backlinks: none

Open Testnet v4
===============

January 13th, 2020

Smart contracts:
----------------
* Smart contracts support on chain
* Rust supported as off-chain SC language
* Cargo-concordium tool for building and testing smart contracts off-chain
* Documentation for smart contracts added to developer docs
* SC transactions added to Concordium client

Tokenomics (to match tokenomics model):
---------------------------------------
* Rewards for baking and finalization changed
* Minting changed
* Chain parameters updated
* Updated network dashboard block explorer to include new info
* Amount lock-up transaction with schedule added
* Staking changed so staked amount is locked
* Mobile app updated to show staking and amount lockup schedules
* Delegation disabled

ID provider:
------------
* Initial account creation added to ID provider process
* Mobile app updated to support initial account creation




Open Testnet v3 update 2
========================

October 16th, 2020

A new Mac version is released after fixing an issue with adding a baker on the
dashboard. The `download page`_ has been updated accordingly. Please download
the latest Mac release, then stop your node, reset your data, and restart your
node.

Open Testnet v3 update 1
========================

October 8th, 2020

New mobile wallets are released after some bug fixes on both iOS and Android.
The released versions are ConcordiumID version 0.1.52 for iOS and version 0.5.24
for Android. The `download page`_ has been updated accordingly. The node
software is unaffected by this update.

Open Testnet v3
===============

October 6th, 2020.

-  Chain visualization: The connection of blocks has been made more
   stable to ensure that it progresses smoothly.
-  `iOS Concordium ID`_ app available.
-  `Added import to app`_. It is now possible to import a file that has
   previously been exported. This enables moving identities and accounts
   to other mobile devices and restoring from backup.
-  µGTU. The smallest unit has been changed from 10-4 to 10-6.
-  Bulletproofs. The core blockchain has been updated to support use of
   bulletproofs.
-  `Encrypted(shielded) amounts and transfers`_. Support for shielded
   transactions has been added to the core blockchain. Support for
   sending and receiving shielded amounts are added to the mobile apps
   and the Concordium client.
-  Anonymity revocation tool available for anonymity revokers.
-  Block storage improvements for storing the chain on nodes.

Open Testnet v2 update 1
========================

July 2, 2020

An issue was identified in the Concordium ID app for Android. When using an
identification document with no expiry date (such as a Swiss driving license)
the app will crash upon completion of the ID issuance process. An app update has
been issued and is available `here`_. The node software is unaffected by this
update.

Open Testnet v2
===============

June 29, 2020

*Follow our instructions on how to*\ `upgrade`_\ *to Open Testnet v2
from v1.*

The Testnet v2 is the second public release of the Concordium Blockchain. Open
Testnet aims at demonstrating the technology behind the Concordium Blockchain.
This version is not feature-complete compared to the expected features for the
first Mainnet version of the Concordium Blockchain.

This version of the Testnet is running `Concordium Node version
0.2.13`_.

Updates
=======

-  `Concordium ID`_, an Android mobile app for accessing identities and
   accounts
-  Identity provider integration in Android mobile app

   -  Notabene developer identity issuance flow
   -  Notabene identity issuance flow

-  Catch-up time improvements

   -  The time needed for new nodes to catch-up has been significantly
      reduced
   -  Restarting nodes can now choose to start from their local database
      removing the need to do a complete catch-up.

-  Storage requirements improvements

   -  Storage of the chain on nodes has been optimized

-  `Concordium Node and Client Software`_ improvements. Extended in the
   following areas:

   -  Managing bakers
   -  Account delegation
   -  Module query
   -  Account management

-  Block explorer added to dashboard
-  Node dashboard with support for becoming a baker
-  Improvements to the """ , networkDashboardLink , """

Open Testnet v1
===============

April 2, 2020

The Testnet v1 is the first public release of the Concordium Blockchain. Open
Testnet aims at demonstrating the technology behind the Concordium Blockchain.
This version is not feature-complete compared to the expected features for the
first Mainnet version of the Concordium Blockchain.

This is the initial version of the Testnet. It will be running
Concordium Node version 0.2.4.

Features
--------

This release contains the following main features:

-  Node software in a dockerized container featuring:

   -  *Passive node:* A node that participates in the Concordium
      network. It relays messages, provides an API for submitting
      transactions and inspecting the chain, and processes blocks, but
      does not produce any blocks on its own.
   -  *Baker node:* Does everything a passive node does, but in addition
      participates in consensus, producing blocks.
   -  *Finalizer node:* Does everything a baker node does, but in
      addition participates in the finalization part of our consensus.
   -  *Concordium Client:* A command-line interface to the Concordium
      Blockchain. Can send transactions and inspect the state of the
      node and the chain.
   -  Tools for interacting with the container

-  A demo Web wallet

   -  Creating identities
   -  Creating accounts
   -  Making transfers
   -  Depositing GTU tokens
   -  Exporting identities and accounts

-  A demo Identity service
-  A Network `Dashboard`_

Concordium Nodes
================

Concordium will be running 19 nodes in Europe for this iteration of the Testnet
and an additional node in Hong Kong (all running both baker and finalizer).

