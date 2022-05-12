.. include:: ../../variables.rst
.. _downloads:

=========
Downloads
=========

.. contents::
   :local:
   :backlinks: none

This topic contains information about where you can download the Concordium tools and Concordium Wallets for |Net|. You can also find out about the hardware requirements for running a node.


Concordium Mobile Wallet
========================

The Concordium Mobile Wallet is available for iOS and Android™. The Mobile Wallet supports iOS 13 or later and Android 8 or later.

.. Note::

   The Concordium Mobile Wallet is not supported on tablet devices.

iOS
----

#.  Install `TestFlight <https://apps.apple.com/us/app/testflight/id899247664>`_ on your iPhone to get the Concordium Mobile Wallet for Testnet on iOS.
#.  Follow `this link <https://testflight.apple.com/join/HZRi1WDT>`_ on your iPhone to join our beta. You must have TestFlight installed.

Android
-------

- `Download the Android version of Concordium Mobile Wallet for Testnet <https://distribution.testnet.concordium.com/tools/android/concordium-mobile-wallet_2.0.0(75).apk>`_


Concordium Desktop Wallet v1.3.1
================================

- `Download the Testnet version of Concordium Desktop Wallet for Windows <https://distribution.testnet.concordium.com/tools/windows/concordium-desktop-wallet-testnet-1.3.1.exe>`_

- `Download the Testnet version of Concordium Desktop Wallet for MacOS <https://distribution.testnet.concordium.com/tools/macos/concordium-desktop-wallet-testnet-1.3.1.dmg>`_

- Download the Testnet version of Concordium Desktop Wallet for Linux®:

   - `AppImage <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.3.1.AppImage>`_

      - SHA256 checksum of the download: ``59dc17c2cf47dfff8c60c0c662b7145cd08a10fcb44d1fa367ff62afa57e35c4``

   - `Debian package <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.3.1.deb>`_

      - SHA256 checksum of the download: ``2bcd2f29498d5de58c049525b44508b675b4ef9afebd0d01052c555e7ee09b30``

   - `RPM. <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.3.1.rpm>`_

      - SHA256 checksum of the download: ``152885940a03502d63e5a052805f5d1a2a3252e3df18a9f719641b8f7bc4b3ef``


Concordium Ledger App
=====================


  - `Download the Concordium Ledger App 2.0.3 for Ledger firmware version 2.1.0 <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-2.0.3-target-2.1.0.zip>`_
  - `Download the Concordium Ledger App 2.0.1 for Ledger firmware version 2.0.0 <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-2.0.1-target-2.0.0.zip>`_

This version of the Ledger App is the same as the one used for Mainnet, so if you already have that installed, you do not need to install this version.

.. _concordium-node-and-client-download:


Concordium Client v3.0.4
========================

Download the Concordium Client:

-  `Download the Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_3.0.4-0>`_

   - SHA256 checksum of the download: ``6ea2674ebae5dafd9de3c730db536fc0675627b6b867f05a944a1a60dd5ceca8``

-  `Download the Concordium Client for macOS <https://distribution.concordium.software/tools/macos/signed/concordium-client_3.0.4-0.zip>`_

-  `Download the Concordium Client for Windows <https://distribution.concordium.software/tools/windows/signed/concordium-client_3.0.4-0.exe>`_


Cargo-concordium v1.0.0-2
=========================

Download cargo-concordium:

-  `Download cargo-concordium for Linux <https://distribution.concordium.software/tools/linux/cargo-concordium_1.0.0-2>`_

-  `Download cargo-concordium for MacOS <https://distribution.concordium.software/tools/macos/cargo-concordium_1.0.0-2>`_

-  `Download cargo-concordium for Windows <https://distribution.concordium.software/tools/windows/cargo-concordium_1.0.0-2.exe>`_

For information about installing cargo-concordium, see :ref:`Install tools for development <setup-tools>`

Concordium node distributions v3.0.2
====================================

Node Debian package
-------------------
To run a node on a server with Ubuntu, you need a Debian package.

- `Download the Debian package <https://distribution.testnet.concordium.com/deb/concordium-testnet-node_3.0.2_amd64.deb>`_

   - SHA256 checksum of the download: ``12cfdc47a5f791ccaaadf46b4493e4cb144442228915c40bc8ae7906f9cb25a9``

To learn how to run a node with Ubuntu, see :ref:`Run a node on a server with Ubuntu <run-node-ubuntu>`.

.. _concordium-docker-package-download:

Full suite for running a node on Linux using Docker
---------------------------------------------------
Download the full suite for running a node on Linux using Docker. The suite contains Concordium Node, Concordium Client and cargo-concordium.

- `Download the suite for Linux <https://distribution.testnet.concordium.com/tools/linux/concordium-software-linux-3.0.2-0-testnet.tar.gz>`_

   - SHA256 checksum of the download: ``05b4922b201015043d8bda7a3dce151e04897a122d77f1e03d72c2dbdbe1a29d``

To learn how to run a node with Docker, see :ref:`Run a node with Docker <run-a-node>`.

Native Windows node
------------------------

To run a node on Windows, you need a Windows Installer package. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

- `Download the Windows Installer package <https://distribution.concordium.software/windows/Signed/Node-3.0.2.msi>`_

To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`

Native Mac node
----------------

To run a node on macOS, you need a macOS installer package. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

- `Download the macOS installer package <https://distribution.concordium.software/macos/signed/concordium-node-3.0.2.pkg>`_

To learn how to run a node on Mac, see :ref:`Run and manage a node on macOS  <run-node-macos>`.

Testnet genesis block
=====================
The genesis block is included in node distributions.
Download the block separately to inspect it or to run a node in a custom configuration.

- `Download the testnet genesis block <https://distribution.testnet.concordium.com/data/genesis.dat>`_

  - SHA256 checksum of the download: ``592a921e8b43185f1726037bf7e23e78a2ea22ced82179a0840d42088e28f44a``


.. _requirements-run-node:

Requirements for running a node
===============================

The following are the minimum system requirements for running a node. If your system does not meet or exceed these requirements, you might not be able to run the node properly.

You need a broadband connection to run a node, and we strongly recommend that the node is running around the clock. This is especially important if you're running a baker node.

If you use a laptop in combination with Docker, sleep mode can cause problems with the Docker container used to run the node.

System requirements
-------------------

-  CPU: A quad core CPU or better of a new generation x64 (AMD Ryzen™ 5000 series or Intel® Core™ 11000 series desktop or mobile CPUs or CPU with similar single threaded performance).

-  Minimum 16 GB of RAM.

-  Minimum of 1TB fast SSD disk space available (minimum NVMe PCI Express 3.0 4x SSD).

Auxiliary tools
===============

Auxiliary tools are a collection of tools that can be used by developers to perform actions as needed.

Encrypt/decrypt tool v1.0.0
---------------------------

- `Download the Encrypt/decrypt tool for Linux <https://distribution.concordium.software/tools/linux/utils-1.0.0>`_

- `Download the Encrypt/decrypt tool for Windows <https://distribution.concordium.software/tools/windows/signed/utils-1.0.0.zip>`_

- `Download the Encrypt/decrypt tool for MacOS <https://distribution.concordium.software/tools/macos/signed/utils-1.0.0.zip>`_

For information about how to use the encrypt/decrypt tool, see :ref:`Auxiliary tools  <developer-tools>`.
