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

The Concordium Mobile Wallet is available for iOS and Android. The Mobile Wallet supports iOS 13 or later and Android 8 or later.

iOS
----

#.  Install `TestFlight <https://apps.apple.com/us/app/testflight/id899247664>`_ on your iPhone to get the Concordium Mobile Wallet for Testnet on iOS.
#.  Follow `this link <https://testflight.apple.com/join/HZRi1WDT>`_ on your iPhone to join our beta. You must have TestFlight installed.

Android
-------

- Download the Android version of `Concordium Mobile Wallet for Testnet. <http://distribution.testnet.concordium.com/tools/android/concordium-mobile-wallet_1.0.7(46).apk>`_


Concordium Desktop Wallet
=========================

- `Download the Testnet version of Concordium Desktop Wallet for Windows. <https://distribution.testnet.concordium.com/tools/windows/concordium-desktop-wallet-testnet-1.1.6.exe>`_

- `Download the Testnet version of Concordium Desktop Wallet for MacOS. <https://distribution.testnet.concordium.com/tools/macos/concordium-desktop-wallet-testnet-1.1.6.dmg>`_

Currently, the Desktop Wallet doesn't support Apple M1 Macs.

- Download the Testnet version of Concordium Desktop Wallet for Linux:

   - `AppImage <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.1.6.AppImage>`_
   - `Debian package <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.1.6.deb>`_
   - `RPM. <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.1.6.rpm>`_


Concordium Ledger App
=====================

- `Download the Concordium Ledger App. <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-1.0.2-target-2.0.0.zip>`_

This version of the Ledger App is the same as the one used for Mainnet, so if you already have that installed, you do not need to install this version.

.. _concordium-node-and-client-download:


Concordium Client
=================
Download the Concordium Client:

-  `Download the Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_1.0.1>`_

-  `Download the Concordium Client for macOS <https://distribution.concordium.software/tools/macos/concordium-client_1.0.1>`_.

   - You need to make the client executable by running ``chmod +x
     path/to/concordium-client_1.0.1`` in a terminal. Make sure to provide the
     correct path to the downloaded client.
   - You also need to `grant it permission to run in your Security & Privacy
     settings <https://support.apple.com/en-gb/guide/mac-help/mh40616/mac>`_.

-  `Download the Concordium Client for Windows <https://distribution.concordium.software/tools/windows/concordium-client_1.0.1.exe>`_


Cargo-concordium
================
Download cargo-concordium:

-  `Download cargo-concordium for Linux <https://distribution.concordium.software/tools/linux/cargo-concordium_1.0.0>`_

-  `Download cargo-concordium for MacOS <https://distribution.concordium.software/tools/macos/cargo-concordium_1.0.0>`_

   - You need to make the tool executable by running ``chmod +x
     path/to/cargo-concordium_1.0.0`` in a terminal. Make sure to provide the
     correct path to the downloaded tool.
   - You also need to `grant it permission to run in your Security & Privacy
     settings <https://support.apple.com/en-gb/guide/mac-help/mh40616/mac>`_.

-  `Download cargo-concordium for Windows <https://distribution.concordium.software/tools/windows/cargo-concordium_1.0.0.exe>`_


Concordium Node Distributions
=============================

Node Debian package
-------------------
To run a node on a server with Ubuntu, you need a Debian package.

- `Download the Debian package <https://distribution.testnet.concordium.com/deb/concordium-node_1.0.1-testnet_amd64.deb>`_.


Full suite for running a node on Linux using Docker
---------------------------------------------------
Download the full suite for running a node on Linux using Docker. The suite contains Concordium Node, Concordium Client and cargo-concordium.

- `Download the suite for Linux <https://distribution.testnet.concordium.com/tools/linux/concordium-software-linux-1.0.1-testnet.tar.gz>`_

Native Windows node

To run a node on Windows, you need a Windows Installer package.

- `Download the Windows Installer package<https://distribution.concordium.software/windows/Signed/Node-1.1.1.msi>`
-------------------

Native Mac Node
----------------

.. _requirements-run-node:

Requirements for running a node
===============================

The following are the minimum system requirements for running a node. If your system does not meet or exceed these requirements, you might not be able to run the node properly.

You need a broadband connection to run a node, and we strongly recommend that the node is running around the clock. This is especially important if you're running a baker node.

If you use a laptop in combination with Docker, sleep mode can cause problems with the Docker container used to run the node.

System requirements
-------------------

-  CPU: A quad core CPU or better of a new generation x64 (AMD Ryzen 5000 series or Intel Core 11000 series desktop or mobile CPUs or CPU with similar single threaded performance).

-  Minimum 16 GB of RAM.

-  Minimum of 1TB fast SSD disk space available (minimum NVMe PCI Express 3.0 4x SSD).



*Apple® is a trademark of Apple Inc., registered in the U.S. and other countries*.
