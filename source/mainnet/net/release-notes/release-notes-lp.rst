.. include:: ../../variables.rst
.. _release-notes:

=============
Release notes
=============

.. Note::

   Subscribe to the `Mainnet status page <https://status.mainnet.concordium.software/>`_ or `Testnet status page <https://status.testnet.concordium.software/>`_ and the `release information on Discourse <https://support.concordium.software/c/releases/9>`_ to stay informed about updates and changes that may affect you as a node runner, including node software releases and protocol updates.

   To subscribe to updates on the Mainnet or Testnet status page click **Subscribe** to get all updates or click **Get updates** to choose to get all updates or only updates for specific products.

Wallets
=======

.. _rn-mwgen2-ios:

.. dropdown:: |mw-gen2| for iOS

    May 31, 2023

    |mw-gen2| for iOS 1.0.1 contains the following:

    - The prompt to review the terms and conditions has been updated, and it now points to a link where you can read the newest version of the terms and conditions before accepting. Additionally, a new prompt will be shown in the wallet if the terms and conditions are updated, so it no longer happens only after updating the application.

    - Also, a minor change was made to support integration with eID verifiers.

    - Fixed a crash caused by a change implemented by identity provider Notabene where the user is asked for access to the microphone, and if denied, crashed the app. Microphone access is required by the identity provider for proof-of-life.

    - The |mw-gen2| for iOS now requires iOS 15 as the minimum version.

.. _rn-mwgen2-android:

.. dropdown:: |mw-gen2| for Android

    May 31, 2023

    |mw-gen2| for Android 1.1.8 contains the following:

    - The prompt to review the terms and conditions has been updated, and it now points to a link where you can read the newest version of the terms and conditions before accepting. Additionally, a new prompt will be shown in the wallet if the terms and conditions are updated, so it no longer happens only after updating the application.

    - A minor change to the identity user interface was made to support integration with eID verifiers.

.. _rn-bw:

.. dropdown:: |bw|

    May 30, 2023

    |bw| 1.0.6 contains fixes for the following issues:

    - The About page link to the terms and conditions pointed to the wrong URL. It now uses the value retrieved from the wallet proxy, or the correct default to the unified terms and conditions page.

    - Fixed an empty recovery displaying an error instead of informing the user that nothing was found.

    - Fixed an issue where the transaction list view would show the Request CCD button while loading the initial batch of transactions.

    - Fixed an issue so the first call of the gRPC client no longer always fails.

    - Fixed an issue so the first call of the gRPC client after changing network uses the correct network.

    - Added a missing translation for the Request CCD button.

    - ``deployModule`` transactions are now supported in the ``sendTransaction`` endpoint of the wallet-api.

    - In the display of a `deployModule` transaction, the previously titled module hash is now titled module reference.

    - Display of a `deployModule` transaction includes a copy button for the module reference.

    - Updated web-sdk to fix incorrect estimated cost for `deployModule` transaction.

    - Added text that a transaction has been submitted.

    - Messages when confirming baker/delegation transactions no longer appear after the transaction has been submitted.

.. _rn-dw:

.. dropdown:: Desktop Wallet

.. _rn-mwgen1-ios:

.. dropdown:: |mw-gen1| for iOS

    May 30, 2023

    In |mw-gen1| for iOS 3.2.0 identity and account creation has been locked in |mw-gen1| for iOS devices. This means that you cannot create new identities or accounts in |mw-gen1| on an iOS device. You can continue to use |mw-gen1|, but if you need to create a new identity or account you must use |mw-gen2|. You can also still recover your wallet from a backup file in |mw-gen1| on an iOS device.

.. _rn-mwgen1-android:

.. dropdown:: |mw-gen1| for Android

Nodes
=====

.. _rn-node-mainnet:

.. dropdown:: Mainnet

    June 14, 2023

    Concordium node version 5.4.2 contains the following features and bug fixes:

    - Enable CORS support in grpc-web. This only applies when grpc-web is enabled.

    - Fixed a security issue.

    - Support using block height as block identifiers in gRPC v2 API.

    - Extend gRPC v2 API call ``GetBlockInfo`` with the protocol version of the block.

    - Do not keep a historical list of peers when running as a normal node.

    - Fixed a bug that caused an extra byte to be added when running ``getModuleSource`` in the V1 GRPC API.

.. _rn-node-testnet:

.. dropdown:: Testnet


Tools
=====

.. _rn-client:

.. dropdown:: Concordium client

    June 1, 2023

    Concordium Client 5.2.0 contains the following features and bug fixes:

    - Fix a bug in display of ``consensus show-chain-parameters`` output for protocol version 6.

    - Add ``raw GetBlockTransactionEvents`` that prints the list of transaction outcomes in a given block.

.. _rn-cargo:

.. dropdown:: ``cargo-concordium``

    May 11, 2023

    For ``cargo-concordium`` 2.8.0 the distribution method for ``cargo-concordium`` has been simplified. Now, once you have installed rustup, you can quickly and easily install ``cargo-concordium`` without downloading a separate package or going through many steps. For more information, see :ref:`Install tools for development<setup-tools>`.

    If you already have ``cargo-concordium`` installed, you may need to remove the existing ``cargo-concordium`` from your PATH to be able to update versions in the future.

.. _rn-ccdscan:

.. dropdown:: CCDScan

Libraries
=========

.. _rn-sclibraries:

.. dropdown:: Smart contract Libraries

    May 8, 2023

    Smart contract integration testing has been added to test your smart contracts: the `concordium-smart-contract-testing library <https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing>`__ makes it possible to create and run automatic integration tests of smart contracts. This will allow a smart contract developer to write code that runs multiple contracts in a locally-controlled environment, interacts with them, and asserts that the eventual output and state of the contracts are as expected. For more information about how to enable this, see :ref:`Integration test a contract in Rust<integration-test-contract>`.

Older release notes
===================

.. dropdown:: Mainnet

    - :ref:`Mainnet release notes<mainnet-release-notes>`

.. dropdown:: Testnet

    - :ref:`Testnet release notes<testnet-release-notes>`
