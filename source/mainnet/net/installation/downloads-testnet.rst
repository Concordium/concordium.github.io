
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

   - SHA256 checksum of the download: ``c6054a1d2a507035066c5998e5b960de5d0272106909fdaea82ee3aa22436d57``

- `Testnet Debian package <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.4.0.deb>`_

   - SHA256 checksum of the download: ``8b21274a188e43b58de085490442047ece86ea2b8ed6d4b532e35a60f9440817``

- `Testnet RPM <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.4.0.rpm>`_

   - SHA256 checksum of the download: ``95f200a6aab4a139b05b51c3e88069a26260d37681ea9479a29b031a3dcee317``

Concordium Ledger App - Sirius
==============================

The version of the Ledger App is the same for Mainnet and Testnet. So if you already have that installed for one or the other, you do not need to reinstall.

.. Note::

   Ledger firmware version 2.0.0 is no longer supported.

.. Note::

   The Ledger Nano S Plus and Ledger Nano X are not supported currently.

- `Download the Concordium Ledger App 3.0.1 for Ledger firmware version 2.1.0 <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-3.0.1-target-2.1.0.zip>`_

.. _concordium-node-and-client-download-testnet:

Concordium Client v4.0.3
========================

-  `Download the Testnet Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_4.0.3-0>`_

   - SHA256 checksum of the download: ``7d082dfc8dad0d5b9099a62e80728c0527fa5453fa686a7b24bc1b7b7527e1da``

-  `Download the Testnet Concordium Client for macOS <https://distribution.concordium.software/tools/macos/signed/concordium-client_4.0.3-0.zip>`_

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

      - SHA256 checksum of the download: ``ad418857eb27ca17b0747198f91a1bee89728ba91d0d14965fa614af23d9d0f6``

   To learn how to run a node with Ubuntu, see :ref:`Run a node on a server with Ubuntu <run-node-ubuntu>`.

Linux-Docker
------------

.. _concordium-docker-package-download-testnet:

Download the full suite for running a node on Linux using Docker. The suite contains Concordium Node, Concordium Client and cargo-concordium.

   - `Download the Testnet suite for Linux <https://distribution.testnet.concordium.com/tools/linux/concordium-software-linux-4.0.11-0-testnet.tar.gz>`_

      - SHA256 checksum of the download: ``0978b1fdbb201dd99b7b8c2ee99f66d616a93ee22a2ef3e384e86dadd0a7051b``

To learn how to run a node with Docker, see :ref:`Run a node with Docker <run-a-node>`.

Windows
-------

To run a node on Windows, you need a Windows Installer package. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

   - `Download the Testnet Windows Installer package <https://distribution.concordium.software/windows/Signed/Node-4.0.11-0.msi>`_

To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`.

Mac
---

To run a node on macOS, you need a macOS installer package.

   - `Download the Testnet macOS installer package <https://distribution.concordium.software/macos/signed/concordium-node-4.0.11-1.pkg>`_

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
