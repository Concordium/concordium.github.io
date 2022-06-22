.. _mainnet-release-notes:

=======================
Release notes - Mainnet
=======================

Mainnet 4: Sirius
=================

July 1, 2022

Concordium Mobile Wallet v3.0.0
-------------------------------

Concordium Mobile Wallet 3.0.0 contains the long-awaited and highly anticipated delegation and baking functionality.

You can now delegate stake to a baker pool or passive delegation from Mobile Wallet, update delegation, or stop delegation.

If you have enough stake to become a baker, you can also do that from Mobile Wallet. Additionally, you can open a baker pool, update baker stake and settings, update your baker keys, or stop baking.

June 21, 2022

Concordium Desktop Wallet v1.4.2
--------------------------------
Concordium Desktop Wallet 1.4.2 is a hotfix release specifically for macOS containing the following fixes:

-   Fixed an issue on macOS where an error popup would show after closing the main application window and opening it again.
-   Fixed an issue on macOS where identity creation was not possible after closing the main application window and opening it again.

June 15, 2022

Concordium Node 4.1.1
---------------------

Concordium Node 4.1.1 introduces new functionality to support delegation to baker pools or passive delegation, and a new version Smart Contracts.

Note that when the protocol update happens on June 23, 2022 that the cool-down period for reducing baker stake or stopping baking increases from one week to three weeks. If you reduce your stake or stop baking BEFORE the protocol update takes effect, the cool-down remains one week.

V1 smart contracts include the following key features:
   - Unlimited contract state size
   - Synchronous contract calls
   - Fallback entrypoints
   - An increased smart contract module size limit of 512kB
   - A number of cryptographic primitives

Other improvements in this version include:
   - The SendTransaction function exposed via the gRPC interface now provides the caller with detailed error messages.
   - Support for wire-protocol version 0 is dropped, meaning that the node cannot connect to peers that do not support wire-protocol version 1, which is supported since version 1.1.0.
   - The macOS installer has been improved so it no longer overwrites the service files when reinstalling.
   - When using the Mac installer users now can leave one (but not both) of the net configurations empty when they don't want to configure a node for it. On the initial installation, leaving a net configuration empty means that the start/stop app shortcuts and the application support folder for that net won't be installed.
   - Consensus queries have been made more robust by validating input more extensively. This affects all queries whose input was a block or transaction hash. These queries now return an InvalidArgument error.
   - The maximum number of retries for Node Collector has been removed so it will keep querying indefinitely.
   - Nodes can now be stopped during out of band catchup by using the signals ``SIGINT`` and ``SIGTERM``.
   - The ``GetAccountInfo`` endpoint supports querying the account via the account index.
   - Baker pools and stake delegation are implemented for the P4 protocol version.
   - The new gRPC endpoint ``GetBakerList`` retrieves a JSON list of the baker IDs of the bakers registered in a known block. It returns null for an unknown block.
   - The new gRPC endpoint ``GetPoolStatus`` retrieves a status record for a baker pool, or for the set of passive delegators.
   - The bakerStakeThreshold level-2 keys are renamed to poolParameters keys; two additional access structures are defined: cooldownParameters and timeParameters.
   - Smart contract modules are cached on startup from the existing state to improve smart contract execution.

Concordium Client 4.0.3
-----------------------

Concordium Client 4.0.3 supports version 1 Smart Contracts with the following changes.

   - A ``contract invoke`` command has been added for simulating contracts locally on the node.
   - Module deploy now expects modules with a version prefix. This prefix is added automatically when building with cargo-concordium version >= 2. The flag ``--contract-version`` has been added to support modules without the version prefix.
   - The ``contract update`` command now uses ``--entrypoint`` to specify the function to invoke. This is renamed from the previous ``--func``.
   - When calling ``contract update`` or ``contract invoke`` with a non-existent entrypoint the fallback entrypoint is called if one is specified in the contract.

Concordium Client 4.0.3 also supports delegation to baker pools or passive delegation, and commands have been added to open baker pools.

   - The commands ``delegator add``, ``delegator configure`` and ``delegator remove`` have been added. Commands to support the baker opening a baker pool have also been added, including ``baker configure``, ``baker update-url`` and ``baker update-delegation-status``.
   - The existing commands ``baker add``, ``baker remove``, ``baker set-key``, ``baker update-restake`` and ``baker update-stake`` have been updated so that in Protocol version < 4, they generate the former P3 transaction, and in Protocol version 4, they generate the relevant ``configure baker`` transaction.
   - Support has been added for the raw queries ``GetPoolStatus`` and ``GetBakerList``.
   - The subcommand ``consensus show-chain-parameters`` has been added to show the chain parameters. This subcommand shows useful information, such as the amount needed to become a baker, bounding caps for baker pools, commission percentages for delegation, exchange rate parameters, and more.

Concordium Desktop Wallet v1.4.1
--------------------------------

Concordium Desktop Wallet 1.4.1 contains functionality to support delegation to baker pools or passive delegation. In addition, the Desktop Wallet has an improved user interface. Note that the delegation functionality will not work until the protocol update occurs on June 23, 2022.

The Concordium Ledger app 3.0.1 is also released. With the Sirius release, Ledger firmware version 2.0.0 is no longer supported.

In addition, the following changes were made:

- When choosing a delegation target a link is now available that forwards the user to the delegation documentation website.
- Fixed an issue that made it impossible to create a transaction to do passive delegation.
- Fixed an issue that caused the wallet to crash when inspecting identities with missing date attributes.

Mainnet 3: Alpha Centauri 3.0
==============================

May 4, 2022

CCDScan release 1
-----------------

CCDScan (https://ccdscan.io) is a Concordium blockchain explorer available for Concordium users and explorers.

CCDScan serves as a search engine for data on the Concordium blockchain and enables users to search for, explore, and analyze relevant on-chain data.
CCDScan release 1 includes core functionality to scan and gain insights into Concordium blockchain data and lays the foundation for additional value adding features to be included on the site.

CCDScan release 1 features include:
   - Block list view of the latest block data
   - Block details for each block
   - Transaction list view of the latest transaction data
   - Transaction details for each transaction
   - Account list view of the most recent account data
   - Account details for each account address including related transactions, an account statement, and amount locked in release schedule where relevant
   - Easy search for specific details on blocks, transactions and accounts and bakers
   - Cross-linking between all relevant entities for easy navigation between blocks, transactions, and accounts
   - A dashboard landing page with real-time updates from the Concordium blockchain
   - Core metrics, graphs, and statistics on blocks, transactions, and accounts, including blocks added, block time, finalization time, transactions and accounts created
   - Ability to switch between Mainnet and Testnet data
   - Ability to explore chain parameters and updates to these
   - List of bakers and their stake, including the ability to drill through to the underlying account address

April 21, 2022

Concordium Node v3.0.2
----------------------
- Fixed a security vulnerability in the network layer that could be used to crash the node, causing a denial of service.

March 22, 2022

Concordium Mobile Wallet for Android v2.0.0(75)
-----------------------------------------------

Version 2 of the Concordium Mobile Wallet simplifies the UI, bringing the most common interactions forward.

The simplified UI involves:

- Redesigned account cards with Send, Receive and More options.

- Updated simple and shielded transaction flows:

   - It is now possible to paste recipient addresses directly, without having to add them to the address book first.

   - A “Send all” button has been added.

- The shielded balance is now found behind a setting on each account. Enabling the setting will show a brief introduction of the shielded balance concept.

- The introduction flow shown when starting the app for the first time now includes more information on the Concordium identity and initial accounts.

March 21, 2022

Concordium Mobile Wallet for iOS v2.0.0(38)
-------------------------------------------

Version 2 of the Concordium Mobile Wallet simplifies the UI, bringing the most common interactions forward.

The simplified UI involves:

- Redesigned account cards with Send, Receive and More options.

- Updated simple and shielded transaction flows:

   - It is now possible to paste recipient addresses directly, without having to add them to the address book first.

   - A “Send all” button has been added.

- The shielded balance is now found behind a setting on each account. Enabling the setting will show a brief introduction of the shielded balance concept.

- The introduction flow shown when starting the app for the first time now includes more information on the Concordium identity and initial accounts.


February 10, 2022

Concordium Mobile Wallet for iOS v1.3(34)
-----------------------------------------

- Fixed a bug related to import of backup files.

February 1, 2022

Concordium Mobile Wallet for iOS v1.2(33)
-----------------------------------------

- Changed name of export file to ``concordium-backup.concordiumwallet``.
- Added prompts and dialogs to remind users to back up.

January 25, 2022

Concordium Mobile Wallet for Android v1.2.6
--------------------------------------------

- Changed name of export file to ``concordium-backup.concordiumwallet``.
- Added prompts and dialogs to remind users to back up.

January 13, 2022

Concordium Desktop Wallet v1.3.1
--------------------------------
-   Fixed issue that caused the wallet to crash when inspecting identities with missing date attributes.
-   Fixed identity issuance with DTS.

January 7, 2022

Concordium Node v3.0.1
----------------------
- Fixed a starvation bug in some cases of parallel node queries.

December 17, 2021

Concordium Desktop Wallet v1.3.0
--------------------------------
- Updated the default node configuration to point to concordiumwalletnode.com.
- In the case of a failed identity, the error details received from the identity provider are now displayed to the user.
- Added UI flows for baker transactions for single signer accounts.
- Auxiliary data in an Update Protocol transaction is now optional.
- Updated terms and conditions.
- Updated UI to reflect the rename of GTU to CCD, meaning anywhere tokens were referred to as GTU, it now says CCD. The GTU icon has also been replaced with the icon representing CCD.
- Datetimes are now selected with a date picker from a calendar.
- Finalized transactions are no longer stored in the local database, but are instead always fetched from the wallet proxy when needed.
- Failed database migrations errors are now shown correctly to the user.

Concordium Node v3.0.0
----------------------

- Introduced support for account aliases via protocol P3. Accounts can be queried in ``GetAccountInfo``, ``GetAccountNonFinalizedTransactions``, ``GetNextAccountNonce`` by any alias.
- ``GetAccountInfo`` object now has an additional field ``accountAddress`` that contains the canonical address of the account.
- Fixed a bug due to incorrect use of LMDB database environments, where a node would crash if queried at specific times.
- Faster state queries by avoiding locking the block state file when reading.
- Fixed a bug caused by shutting down RPC before the node, which caused the node to crash when attempting a graceful shutdown while processing RPC requests.
- The node now drops all connections on an unrecognized protocol update and refuses to accept new transactions.

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

December 10, 2021

Concordium Client v3.0.4
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


Mainnet 2: Alpha Centauri 2.2
=============================

December 9, 2021

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


Mainnet 2: Alpha Centauri 2.1
=============================

November 16th, 2021

Concordium Mobile Wallet for Android (v. 1.0.16)
------------------------------------------------

-  Support for the new memo functionality in simple, shielded, and scheduled transfers:

      -  It is now possible to add memos to simple and shielded transactions.
      -  Memos can also be displayed for transfers with release schedule.

-  Various improvements of the identity issuance flow, account creation, and related support options:

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


Mainnet 2: Alpha Centauri 2.0
==============================

October 6, 2021

Concordium Node v1.1.3
----------------------

The :ref:`Concordium node release v1.1.3 <downloads>` implements a protocol update to add memo functionality for simple, shielded and scheduled transfers.
This means that node runners **must upgrade** their nodes before the new protocol takes effect on testnet on October 13 at 12:00 CEST, 2021. Old nodes will
stop processing new blocks at that point. See `protocol updates <https://github.com/Concordium/concordium-update-proposals>`_ for more details.

- Added memo functionality for transactions to Protocol
- Windows support for running a node
- Mac support for running a node
- Mac ARM M1 support for running a node
- Various bug fixes

Concordium Client v1.1.1
------------------------

:ref:`Concordium Client v1.1.1 <downloads>`

- Added memo functionality for transactions

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


Mainnet 1: Alpha Centauri 1.2
=============================

July 28, 2021

Concordium Desktop Wallet v1.1.6
--------------------------------

- Fixed an issue where identity creation would fail consistently making it impossible to create new identities.

Mainnet 1: Alpha Centauri 1.1
==============================

July 27, 2021

Concordium Desktop Wallet v1.1.5
--------------------------------

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

Mainnet 1: Alpha Centauri 1.0
=============================

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

The flow of CCD between accounts via transactions creates an economy that is designed to incentivize participation in the network and counter dishonest behaviour. It is the objective of the Concordium Foundation to guide the creation of a sustainable economy that rewards participants for their efforts in developing the network.

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

