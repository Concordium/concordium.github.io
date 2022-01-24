.. _Dashboard: https://dashboard.testnet.concordium.com/

.. _testnet-release-notes:

=============
Release Notes
=============

.. contents::
   :local:
   :backlinks: none

Open Testnet v7 Update 1
========================

January 10, 2022

Concordium Desktop Wallet v1.3.1
--------------------------------
- Fixed issue that caused the wallet to crash when inspecting identities with missing date attributes.
- Fixed identity issuance with DTS.

January 3, 2022

Concordium Node v3.0.1
----------------------
- Fixed a starvation bug in some cases of parallel node queries.

December 17, 2021

Concordium Desktop Wallet v1.3.0
--------------------------------
- Added a GTU drop option for testnet.
- In the case of a failed identity, the error details received from the identity provider are now displayed to the user.
- Added UI flows for baker transactions for single signer accounts.
- Auxiliary data in an Update Protocol transaction is now optional.
- Updated terms and conditions.
- Updated UI to reflect the rename of GTU to CCD, meaning anywhere tokens were referred to as GTU, it now says CCD. The GTU icon has also been replaced with the icon representing CCD.
- Datetimes are now selected with a date picker from a calendar.
- Finalized transactions are no longer stored in the local database, but are instead always fetched from the wallet proxy when needed.
- Failed database migrations errors are now shown correctly to the user.

Concordium Mobile Wallet for Android v1.0.22
--------------------------------------------

- Changed naming from GTU to CCD.
- Various bug fixes.

December 13, 2021

Concordium Ledger App v2.0.3
----------------------------
- Supports Ledger Nano S firmware version 2.1.0.
- Removed references to GTU in the UI.
- An acceptance step has been added to the export of private key seeds.

December 7, 2021

Concordium Mobile Wallet for iOS v1.1(27)
-------------------------------------------

- Changed GTU/Ǥ naming to CCD/Ͼ.
- Support for the new memo functionality in simple, shielded, and scheduled transfers:

   - It is now possible to add memos to simple and shielded transfers.
   - Memos can also be displayed for transfers with a release schedule.

- Various improvements of the identity issuance flow, account creation and related support options.

   - Added a new dialogue shown when an identity request fails. There is now an option to contact the identity provider directly via an auto-filled e-mail, containing an issuance reference for better personal support, as well as system information of the user for better debugging.
   - Added a small dialogue to remind the user to check for a response on new identity requests.
   - Users will now be notified on successful creation of new accounts inside the app.
   - Various back-end improvements by the identity provider to make their service more robust.
   - Various improvements to make the identity issuance and account creation flow more robust.

- Various bug fixes.
- Various smaller textual updates.

Open Testnet v7
===============

November 29th 2021

Concordrium Node v3.0.0
-----------------------

- Introduced support for account aliases via protocol P3. Accounts can be queried in ``GetAccountInfo``, ``GetAccountNonFinalizedTransactions``, ``GetNextAccountNonce`` by any alias.
- ``GetAccountInfo`` object now has an additional field ``accountAddress`` that contains the canonical address of the account.
- Fixed a bug due to incorrect use of LMDB database environments, where a node would crash if queried at specific times.
- Faster state queries by avoiding locking the block state file when reading.
- Fixed a bug caused by shutting down RPC before the node, which caused the node to crash when attempting a graceful shutdown while processing RPC requests.
- The node now drops all connections on an unrecognized protocol update and refuses to accept new transactions.

Concordium-client v3.0.4
------------------------

- Credentials revealing the newly introduced attribute LEI can be deployed.
- Renamed GTU token to CCD.
- Renamed ``send-gtu``, ``send-gtu-scheduled`` and ``send-gtu-encrypted`` to ``send``, ``send-scheduled`` and ``send-shielded``.
- Renamed ``account encrypt``/``decrypt`` to ``account shield``/``unshield``.
- Added command for generating aliases of an address.
- Now shows line breaks, tabs etc. in memo transfers (when it's CBOR encoded string), instead of escaping them as ``\n``, ``\t`` etc.
- Now displays memo as JSON in a more readable way.
- Added time units to slot duration and epoch duration in consensus status.
- Updated the ``register-data`` command to register data as CBOR encoded strings or JSON using the new flags ``--string`` and ``--json``. Raw data can still be registered using the new flag ``--raw``.
- Added ``raw DisconnectPeer``, a counterpart to the existing ``raw ConnectPeer``.
- Now warning  the user when trying to add a baker with a stake below the minimum threshold.
- Improved how contract schemas are shown as JSON:

   - Now displays complex types in arrays correctly.
   - Use angle brackets to indicate placeholders, e.g. ``"<UInt16>"`` instead of ``"UInt16"``.
- Improved ``module inspect``:

   - Now shows all contracts from a module regardless of whether a schema is included or not.
   - Now shows the receive methods for contracts as well.
- Now allows sending transactions where the sender is an account alias.


Open Testnet v6 Update 4
========================

November 16th, 2021

Concordium Mobile Wallet for Android (v. 1.0.16)
------------------------------------------------

-  Support for the new memo functionality in simple, shielded, and scheduled transfers:

      -  It is now possible to add memos to simple and shielded transactions.
      -  Memos can also be displayed for transfers with release schedule.

-  Various improvements of the identity issuance flow, account creation and related support options:

      -  Added a new dialogue, which is shown when an identity request fails. There is now an option to contact the identity provider directly via an autofilled e-mail,
         containing an issuance reference for better personal support as well as system information of the user for better debugging.
      -  Added a small dialogue to remind user to check for response on new identity requests.
      -  User will now be notified on successful creation of new accounts inside the app.
      -  Various back-end improvements by the identity provider to make their service more robust.

-  Various bug fixes.

-  Various smaller textual updates.

-  Mainnet and Testnet versions of the Concordium Mobile Wallet for Android can now both be installed at the same time.

The new version of Concordium Mobile Wallet for iOS is coming soon
------------------------------------------------------------------

.. _open-testnet-v6-update-3:

Open Testnet v6 Update 3
========================

Concordium Desktop Wallet v1.2.0
--------------------------------

:ref:`Concordium Desktop Wallet v1.2.0 <downloads>`

- Added memo functionality to simple, shielded and scheduled transfers.
- Automatic updates now supported.
- Added option to recover lost accounts from Ledger devices.
- The desktop wallet now shows connected node status in side bar.
- Added an option to change between two account views.
- Transaction log can now handle more than 100 transactions and filter functionality has been expanded.
- Failed identities now show more information, including how to contact support.
- Apple M1 Macs are now supported through Rosetta.
- It is now possible to view an account address QR-code in "fullscreen" mode.
- It is now possible to rename accounts and identities.
- Added an option to add an address book entry while creating a transfer transaction.
- Added an introductory screen to set up a node connection for first time users.
- It is now possible to remove a failed identity.
- The accounts page has been updated to make it clearer that multi credential accounts are not able to use shielded transactions.
- Transactions in the 'Transfers' list in the account view are now grouped by dates.
- Various smaller UI updates.
- Various smaller bug fixes.
- The desktop wallet is now open source.

Concordium Ledger App v2.0.1
----------------------------

- Improved state validation to deny instruction changes in multi command transactions.
- Support building for the Ledger Nano X.
- Simplified the UI by updating terminology and stopped displaying details that cannot feasibly be verified by a user.
- Export of private key seeds has been changed so that either the PRF key can be exported alone, or the PRF key and the IdCredSec are exported in a single command.
- Added support for transactions with memos.
- Support for the "Add identity provider" update.
- Support for the "Add anonymity revoker" update.
- Improved pagination of account addresses and hexadecimal strings, so that pages are split evenly and consistently.
- Fixed an issue in the add baker UI, where a response could be sent before signing or declining.


.. _open-testnet-v6-update-2:

Open Testnet v6 Update 2
========================

October 6, 2021

The :ref:`Concordium node release v1.1.3 <downloads>` is a bugfix release.

- `Changelog <https://github.com/Concordium/concordium-node/blob/1.1.3-1/CHANGELOG.md#concordium-node-113>`__

.. _open-testnet-v6-update-1:

Open Testnet v6 Update 1
========================

September 17, 2021

The :ref:`Concordium node release v1.1.2 <downloads>` is a bugfix release.

- `Changelog <https://github.com/Concordium/concordium-node/blob/1.1.2/CHANGELOG.md#concordium-node-112>`__


.. _open-testnet-v6:

Open Testnet v6
===============

September 15, 2021

Concordium Node v1.1.1
----------------------

The :ref:`Concordium node release v1.1.1 <downloads>` implements a protocol update to add memo functionality for simple, shielded and scheduled transfers. This means that node runners **must upgrade** their nodes before the new protocol takes effect on testnet on September 22, 2021. Old nodes will stop processing new blocks at that point. See `protocol updates <https://github.com/Concordium/concordium-update-proposals>`_ for more details.

- Added memo functionality for transactions to Protocol
- Windows support for running a node
- Mac support for running a node
- Mac ARM M1 support for running a node

Concordium Client v1.1.1
------------------------

:ref:`Concordium Client v1.1.1 <downloads>`

- Added memo functionality for transactions


.. _open-testnet-v5-update-4:

Open Testnet v5 Update 4
========================

July 28, 2021

Concordium Desktop Wallet v1.1.6
--------------------------------

- Fixed an issue where identity creation would fail consistently making it impossible to create new identities.

.. _open-testnet-v5-update-3:

Open Testnet v5 Update 3
========================

July 27, 2021

Concordium Desktop Wallet v1.1.5 for Testnet
--------------------------------------------

-  General improvements to the user interface, in particular for multi signature transaction flows.
-  Change of wallet password now enforces the same length restriction as when initially set.
-  Wallet exports now contain the genesis hash to prevent the import of a wallet from testnet to a mainnet wallet.
-  Improved messages when waiting for a Ledger device to be connected.
-  Transaction status is now included in an account report.
-  Fixed an issue where e.g. a loss of connection could result in a failed identity when it should not.
-  Security improvements. Node integration was available to the Electron renderer threads which is considered unsafe. This has now been disabled.
-  Added foundation feature for importing and creating multi signature transactions in bulk.
-  A number of bug fixes.

**Concordium Ledger App v1.0.2**

-  Scheduled transfer release times are now shown as human readable UTC date time strings.
-  Fixed a UI bug in remove baker transaction.

.. _open-testnet-v5-update-2:

Open Testnet v5 Update 2
========================

**Concordium Desktop Wallet v1.1.3 for Testnet.**

The Desktop Wallet is available on Testnet for Windows, macOS, and Linux including:

* All features released in v1.0.2 for Mainnet.
* Transaction status in account reports.
* Various bug fixes.
* Foundation feature: Added support for bulk import of proposals.



.. _open-testnet-v5-update-1:

Open Testnet v5 Update 1
========================

June 24th, 2021

:ref:`Concordium Mobile Wallet for iOS v1.0.5. <mainnet:downloads>`

* Added feature enabling change of passcode and biometrics.
* Updates to Account page UI for easier shielding/unshielding transactions.
* Added option to filter rewards in transaction log.
* Added About page.
* Improved security.
* Various bug fixes and robustness improvements.
* Code is now open source.

:ref:`Concordium Mobile Wallet for Android v1.0.7(46). <mainnet:downloads>`

* Added feature enabling change of passcode and biometrics.
* Updates to Account page UI for easier shielding/unshielding transactions.
* Added option to filter rewards in transaction log.
* Added About page.
* Improved security.
* Various bug fixes and robustness improvements.
* Code is now open source.

.. _open-testnet-v5:

Open Testnet v5
===============

May 12th, 2021

Updated Open Testnet to match Mainnet features including:


**Proof of Stake**

The Concordium Blockchain uses a proof of stake mechanism to ensure resource-efficient operation of the network.


**Two Layer Consensus Protocol**

Nakamoto-Style Consensus Bakers participate in a form of lottery to win the right to append blocks to the chain.

Finality Layer Concordium finality layer dynamically ‘checkpoints’ the blockchain using Byzantine agreement to identify and mark common blocks in the chains of honest users as final.


**Built in IDLayer**

Account creation is based on a validated identity, but at the same time it provides transactional privacy for users with a mechanism that allows accountability to local regulatory authorities.

Transactional privacy is further enhanced by support for shielded transfers.


**Smart Contracts**

Concordium blockchain has native support for smart contracts on-chain with our core on-chain language WebAssembly (Wasm), a portable well-defined assembly-like language.

Rust is the first off-chain high level smart contract language.


**Tokenomics and On-chain Incentivization**

The Concordium blockchain comprises a set of transactions and economic roles that interact within the economy. An economic role, such as a baker or account holder, is represented by an account on the Concordium platform.

The flow of CCD between accounts via transactions creates an economy that is designed to incentivize participation in the network and counter dishonest behaviour. It is the objective of the Concordium Foundation to guide the creation of a sustainable economy that rewards participants for their efforts in developing the network.


**Concordium Node**

The Concordium node software is available for Linux and available in two different packages:

* A distribution package, which provides wrappers for setting up the node in a Docker image.

* A Debian package built for Ubuntu 20.04. This package allows for greater customization of the node set up.



.. _open-testnet-v4-update-1:

Open Testnet v4 Update 1
========================

January 14th, 2020

* Fixed an issue in the node, where a parameter update transaction could cause the node to crash on restart.


.. _open-testnet-v4:

Open Testnet v4
===============

January 13th, 2020

Smart contracts:

* Smart contracts support on chain
* Rust supported as off-chain Smart Contract language
* `Concordium-std <https://crates.io/crates/concordium-std>`_ library added for developing smart contracts in Rust.
* ``Cargo-concordium`` tool for building and testing smart contracts off-chain
* Documentation for smart contracts added to `developer documentation <https://concordium.github.io/en/testnet4/smart-contracts/index.html>`_
* Smart Contract transactions added to ``concordium-client``


Tokenomics (to match tokenomics model):

* Rewards for baking and finalization changed
* Minting changed
* Extended the list of adjustable chain parameters
* Updated `network dashboard block explorer <https://dashboard.testnet.concordium.com/chain>`_ to include new info
* Amount lock-up transaction with schedule added
* Staking changed so staked amount is locked
* Mobile app updated to show staking and amount lockup schedules
* Delegation removed

ID layer:

* Initial account creation added to ID provider process
* Mobile app updated to support initial account creation




Open Testnet v3 update 2
========================

October 16th, 2020

A new Mac version is released after fixing an issue with adding a baker on the
dashboard. The :ref:`downloads page <downloads>` has been updated accordingly. Please download
the latest Mac release, then stop your node, reset your data, and restart your
node.

Open Testnet v3 update 1
========================

October 8th, 2020

New mobile wallets are released after some bug fixes on both iOS and Android.
The released versions are ConcordiumID version 0.1.52 for iOS and version 0.5.24
for Android. The :ref:`downloads page <downloads>` has been updated accordingly. The node
software is unaffected by this update.

Open Testnet v3
===============

October 6th, 2020.

-  Chain visualization: The connection of blocks has been made more
   stable to ensure that it progresses smoothly.
-  iOS Concordium ID app available.
-  Added import to app. It is now possible to import a file that has
   previously been exported. This enables moving identities and accounts
   to other mobile devices and restoring from backup.
-  µCCD. The smallest unit has been changed from 10-4 to 10-6.
-  Bulletproofs. The core blockchain has been updated to support use of
   bulletproofs.
-  Encrypted(shielded) amounts and transfers: Support for shielded
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
been issued and is available here (No longer available - See the :ref:`downloads page <downloads>` for the newest app). The node software is unaffected by this
update.

Open Testnet v2
===============

June 29, 2020

Follow our instructions on how to upgrade to Open Testnet v2
from v1.

The Testnet v2 is the second public release of the Concordium Blockchain. Open
Testnet aims at demonstrating the technology behind the Concordium Blockchain.
This version is not feature-complete compared to the expected features for the
first Mainnet version of the Concordium Blockchain.

This version of the Testnet is running Concordium Node version 0.2.13.

Updates
=======

-  Concordium ID, an Android mobile app for accessing identities and
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

-  Concordium Node and Client Software improvements. Extended in the
   following areas:

   -  Managing bakers
   -  Account delegation
   -  Module query
   -  Account management

-  Block explorer added to dashboard
-  Node dashboard with support for becoming a baker
-  Improvements to the `Network Dashboard <https://dashboard.testnet.concordium.com>`_

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
   -  Depositing CCD tokens
   -  Exporting identities and accounts

-  A demo Identity service
-  A Network `Dashboard`_

Concordium Nodes
================

Concordium will be running 19 nodes in Europe for this iteration of the Testnet
and an additional node in Hong Kong (all running both baker and finalizer).
