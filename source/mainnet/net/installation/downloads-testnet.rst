
.. include:: ../../variables.rst
.. _downloads-testnet:

===================
Downloads - Testnet
===================

This topic contains information about where you can download the Concordium Wallets and tools for Testnet. You can also find out about the hardware requirements for running a node.

Concordium Mobile Wallet
========================

The Concordium Mobile Wallet is available for iOS and Android™. The Mobile Wallet supports iOS 13 or later and Android 8 or later.

.. Note::

   The Concordium Mobile Wallet is not supported on tablet devices.

iOS
---

#.  Install `TestFlight <https://apps.apple.com/us/app/testflight/id899247664>`_ on your iPhone to get the Concordium Mobile Wallet for Testnet on iOS.
#.  Follow `this link <https://testflight.apple.com/join/HZRi1WDT>`_ on your iPhone to join our beta. You must have TestFlight installed.

Android
-------

- `Download the Android version of Concordium Mobile Wallet for Testnet <https://distribution.testnet.concordium.com/tools/android/concordium-mobile-wallet_2.0.0(75).apk>`_

.. _downloads-desktop-wallet-testnet:

Concordium Desktop Wallet v1.4.0
================================

- `Download the Testnet version of Concordium Desktop Wallet for Windows <https://distribution.testnet.concordium.com/tools/windows/concordium-desktop-wallet-testnet-1.4.0.exe>`_

- `Download the Testnet version of Concordium Desktop Wallet for MacOS <https://distribution.testnet.concordium.com/tools/macos/concordium-desktop-wallet-testnet-1.4.0.dmg>`_

- Download the Testnet version of Concordium Desktop Wallet for Linux®:

- `Testnet AppImage <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.4.0.AppImage>`_

   - SHA256 checksum of the download: ``59dc17c2cf47dfff8c60c0c662b7145cd08a10fcb44d1fa367ff62afa57e35c4``

- `Testnet Debian package <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.4.0.deb>`_

   - SHA256 checksum of the download: ``2bcd2f29498d5de58c049525b44508b675b4ef9afebd0d01052c555e7ee09b30``

- `Testnet RPM <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.4.0.rpm>`_

   - SHA256 checksum of the download: ``152885940a03502d63e5a052805f5d1a2a3252e3df18a9f719641b8f7bc4b3ef``

Concordium Ledger App - Sirius
==============================

The version of the Ledger App is the same for Mainnet and Testnet. So if you already have that installed for one or the other, you do not need to reinstall.

.. Note::

   Ledger firmware version 2.0.0 is no longer supported.

.. Note::

   The Ledger Nano S Plus and Ledger Nano X are not supported currently.

- `Download the Concordium Ledger App 3.0.1 for Ledger firmware version 2.1.0 <https://distribution.testnet.concordium.software/tools/concordium-ledger-app-3.0.1-target-2.1.0.zip>`_

.. _concordium-node-and-client-download-testnet:

Concordium Client v4.0.3
========================

-  `Download the Testnet Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_4.0.3-0>`_

   - SHA256 checksum of the download: ``6ea2674ebae5dafd9de3c730db536fc0675627b6b867f05a944a1a60dd5ceca8``

-  `Download the Testnet Concordium Client for macOS <https://distribution.concordium.software/tools/macos/concordium-client_4.0.3-0>`_

-  `Download the Testnet Concordium Client for Windows <https://distribution.concordium.software/tools/windows/concordium-client_4.0.3-0.exe>`_

Cargo-concordium v2.0.1
=======================

Download cargo-concordium:

   -  `Download Testnet cargo-concordium for Linux <https://distribution.concordium.software/tools/linux/cargo-concordium_2.0.1-0>`_

   -  `Download Testnet cargo-concordium for MacOS <https://distribution.concordium.software/tools/macos/cargo-concordium_2.0.1-0>`_

   -  `Download Testnet cargo-concordium for Windows <https://distribution.concordium.software/tools/windows/cargo-concordium_2.0.1-0.exe>`_

For information about installing cargo-concordium, see :ref:`Install tools for development <setup-tools>`.

Concordium node distributions v4.0.11
=====================================

For the system requirements to run a node, see :ref:`System requirements to run a node<node-requirements>`.

Ubuntu
------

To run a node on a server with Ubuntu, you need a Debian package.

   - `Download the Testnet Debian package <https://distribution.testnet.concordium.com/deb/concordium-testnet-node_4.0.11_amd64.deb>`_

      - SHA256 checksum of the download: ``12cfdc47a5f791ccaaadf46b4493e4cb144442228915c40bc8ae7906f9cb25a9``

   To learn how to run a node with Ubuntu, see :ref:`Run a node on a server with Ubuntu <run-node-ubuntu>`.

Linux-Docker
------------

.. _concordium-docker-package-download-testnet:

Download the full suite for running a node on Linux using Docker. The suite contains Concordium Node, Concordium Client and cargo-concordium.

   - `Download the Testnet suite for Linux <https://distribution.testnet.concordium.com/tools/linux/concordium-software-linux-4.0.11-0-testnet.tar.gz>`_

      - SHA256 checksum of the download: ``05b4922b201015043d8bda7a3dce151e04897a122d77f1e03d72c2dbdbe1a29d``

To learn how to run a node with Docker, see :ref:`Run a node with Docker <run-a-node>`.

Windows
-------

To run a node on Windows, you need a Windows Installer package. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

   - `Download the Testnet Windows Installer package <https://distribution.concordium.software/windows/Signed/Node-4.0.11-0.msi>`_

To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`.

Mac
---

To run a node on macOS, you need a macOS installer package.

   - `Download the Testnet macOS installer package <https://distribution.concordium.software/macos/signed/concordium-node-4.0.11.pkg>`_

To learn how to run a node on Mac, see :ref:`Run and manage a node on macOS  <run-node-macos>`.

Genesis block
=============

The genesis block is included in node distributions.
Download the block separately to inspect it or to run a node in a custom configuration.

   - `Download the testnet genesis block <https://distribution.testnet.concordium.com/data/genesis.dat>`_

      - SHA256 checksum of the download: ``592a921e8b43185f1726037bf7e23e78a2ea22ced82179a0840d42088e28f44a``

Auxiliary tools
===============

Auxiliary tools are a collection of tools that can be used by developers to perform actions as needed.

Encrypt/decrypt tool v1.0.0
---------------------------

- `Download the Encrypt/decrypt tool for Linux <https://distribution.concordium.software/tools/linux/utils-1.0.0>`_

- `Download the Encrypt/decrypt tool for Windows <https://distribution.concordium.software/tools/windows/signed/utils-1.0.0.zip>`_

- `Download the Encrypt/decrypt tool for MacOS <https://distribution.concordium.software/tools/macos/signed/utils-1.0.0.zip>`_

For information about how to use the encrypt/decrypt tool, see :ref:`Auxiliary tools  <developer-tools>`.
