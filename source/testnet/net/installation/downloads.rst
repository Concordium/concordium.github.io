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

- `Download the Android version of Concordium Mobile Wallet for Testnet <http://distribution.testnet.concordium.com/tools/android/concordium-mobile-wallet_1.0.16(55).apk>`_


Concordium Desktop Wallet
=========================

- `Download the Testnet version of Concordium Desktop Wallet for Windows <https://distribution.testnet.concordium.com/tools/windows/concordium-desktop-wallet-testnet-1.2.0.exe>`_

- `Download the Testnet version of Concordium Desktop Wallet for MacOS <https://distribution.testnet.concordium.com/tools/macos/concordium-desktop-wallet-testnet-1.2.0.dmg>`_

- Download the Testnet version of Concordium Desktop Wallet for Linux:

   - `AppImage <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.2.0.AppImage>`_

      - SHA256 checksum of the download: ``f699430654081a842ed8841c0806c423353e77d2adc294cc801503ae589f7a41``

   - `Debian package <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.2.0.deb>`_

      - SHA256 checksum of the download: ``f8cdb56590d7a36c8d275ee5ac7dbb2056eeccc6626f4901b6c3dba86c729e95``

   - `RPM. <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.2.0.rpm>`_

      - SHA256 checksum of the download: ``21f057c487e95fff86826a5dc405fe5b0012d24bb3f6d4b6a6e7ab0f09ca3227``

Currently, the Desktop Wallet doesn't support Apple M1 Macs.

Concordium Ledger App
=====================

- `Download the Concordium Ledger App <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-2.0.1-target-2.0.0.zip>`_

This version of the Ledger App is the same as the one used for Mainnet, so if you already have that installed, you do not need to install this version.

.. _concordium-node-and-client-download:


Concordium Client
=================
Download the Concordium Client:

-  `Download the Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_3.0.4-0>`_

   - SHA256 checksum of the download: ``6ea2674ebae5dafd9de3c730db536fc0675627b6b867f05a944a1a60dd5ceca8``

-  `Download the Concordium Client for macOS <https://distribution.concordium.software/tools/macos/signed/concordium-client_3.0.4-0.zip>`_

-  `Download the Concordium Client for Windows <https://distribution.concordium.software/tools/windows/signed/concordium-client_3.0.4-0.exe>`_


Cargo-concordium
================
Download cargo-concordium:

-  `Download cargo-concordium for Linux <https://distribution.concordium.software/tools/linux/cargo-concordium_1.0.0-2>`_

-  `Download cargo-concordium for MacOS <https://distribution.concordium.software/tools/macos/cargo-concordium_1.0.0-2>`_

   - You need to make the tool executable by running ``chmod +x
     path/to/cargo-concordium_1.0.0-0`` in a terminal. Make sure to provide the
     correct path to the downloaded tool.
   - You also need to `grant it permission to run in your Security & Privacy
     settings <https://support.apple.com/en-gb/guide/mac-help/mh40616/mac>`_.

-  `Download cargo-concordium for Windows <https://distribution.concordium.software/tools/windows/cargo-concordium_1.0.0-2.exe>`_


Concordium node distributions
=============================

Node Debian package
-------------------
To run a node on a server with Ubuntu, you need a Debian package.

- `Download the Debian package <https://distribution.testnet.concordium.com/deb/concordium-testnet-node_3.0.0_amd64.deb>`_

   - SHA256 checksum of the download: ``183bcb5a0d7da56e1f1998215955f6b685623f4c828bb4843a811b285da716b7``

To learn how to run a node with Ubuntu, see :ref:`Run a node on a server with Ubuntu <run-node-ubuntu>`.

.. _concordium-docker-package-download:

Full suite for running a node on Linux using Docker
---------------------------------------------------
Download the full suite for running a node on Linux using Docker. The suite contains Concordium Node, Concordium Client and cargo-concordium.

- `Download the suite for Linux <https://distribution.testnet.concordium.com/tools/linux/concordium-software-linux-1.1.3-2-testnet.tar.gz>`_

   - SHA256 checksum of the download: ``ab60fb80db4401604cd6d7bfa04013cb7d16debb8ad30ee813f1a4029529ed0b``

To learn how to run a node with Docker, see :ref:`Run a node with Docker <run-a-node>`.

Native Windows node
------------------------

To run a node on Windows, you need a Windows Installer package. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

- `Download the Windows Installer package <https://distribution.concordium.software/windows/Signed/Node-3.0.0.msi>`_

To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`

Native Mac node
----------------

To run a node on macOS, you need a macOS installer package. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

- `Download the macOS installer package <https://distribution.concordium.software/macos/signed/concordium-node-3.0.0.pkg>`_

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

-  CPU: A quad core CPU or better of a new generation x64 (AMD Ryzen 5000 series or Intel Core 11000 series desktop or mobile CPUs or CPU with similar single threaded performance).

-  Minimum 16 GB of RAM.

-  Minimum of 1TB fast SSD disk space available (minimum NVMe PCI Express 3.0 4x SSD).

Developer tools
===============

Developer tools are a collection of tools that can be used by developers to perform actions as needed.

- `Download the Encrypt/decrypt tool for Linux <https://distribution.concordium.software/tools/linux/utils-1.0.0>`_

- `Download the Encrypt/decrypt tool for Windows <https://distribution.concordium.software/tools/windows/signed/utils-1.0.0.zip>`_

- `Download the Encrypt/decrypt tool for MacOS <https://distribution.concordium.software/tools/macos/signed/utils-1.0.0.zip>`_

For information about how to use the encrypt/decrypt tool, see :ref:`Developer tools  <developer-tools>`.

*Apple® is a trademark of Apple Inc., registered in the U.S. and other countries*.
