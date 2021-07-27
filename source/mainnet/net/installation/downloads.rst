
.. include:: ../../variables.rst
.. _downloads:

=========
Downloads
=========

.. contents::
   :local:
   :backlinks: none

This topics contains information about where you can download the Concordium Wallets and tools for |Net|. You can also find out about the hardware requirements for running a node.

Mobile Wallet
=============

The Concordium Mobile Wallet is available for iOS and Android. The Mobile Wallet supports iOS 13 or later and Android 8 or later.

You can find Concordium Mobile Wallet on App Store and Google Play.

.. image:: ../images/mobile-wallet/app-store-badge.svg
   :width: 23%
   :target: https://apps.apple.com/us/app/concordium-mobile-wallet/id1566996491
.. image:: ../images/mobile-wallet/google-play-badge.png
   :width: 29.5%
   :target: https://play.google.com/store/apps/details?id=software.concordium.mobilewallet.mainnet

The Concordium Mobile Wallet has been verified by NowSecure.

.. image:: ../images/mobile-wallet/nowsecure_certificate.png
      :width: 32%
      :target: https://www.nowsecure.com/certified-apps/concordium/



Concordium Desktop Wallet
=========================

-  `Download for Windows <https://distribution.mainnet.concordium.software/tools/windows/concordium-desktop-wallet-1.1.5.exe>`_

-  `Download for macOS <https://distribution.mainnet.concordium.software/tools/macos/concordium-desktop-wallet-1.1.5.dmg>`_

Currently, the Desktop Wallet doesn't support Apple MacBook Air 2020 M1.

-  Download for Linux

   -  `AppImage <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.1.5.AppImage>`_

   -  `Debian package <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.1.5.deb>`_

   -  `RPM <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.1.5.rpm>`_

Concordium Ledger App
=====================

`Download the Concordium Ledger App <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-1.0.2-target-2.0.0.zip>`_

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


Node Debian package
===================
To run a node on a server with Ubuntu, you'll need to `download a Debian package <https://distribution.mainnet.concordium.software/deb/concordium-node_1.0.1-mainnet_amd64.deb>`_.

- SHA256 checksum of the download: ``dcb76543e4fb0346242df1d8873bbdf89af6ccbd49ea6b4d315bd1dc4c14a135``


Full suite for running a node using Docker
=============================================================
Download the full suite for running a node on Linux using Docker. The suite contains Concordium Node, Concordium Client and cargo-concordium.

- `Download the suite for Linux <https://distribution.mainnet.concordium.software/tools/linux/concordium-software-linux-1.0.1-mainnet.tar.gz>`_


Mainnet genesis block
=====================
The genesis block is included in node distributions.
Download the block separately to inspect it or to run a node in a custom configuration.

- `Download the mainnet genesis block <https://distribution.mainnet.concordium.software/data/genesis.dat>`_

  - SHA256 checksum of the download: ``5fe6a62824d5b0dba6143243e90987ddf3e15cca079f21992de04d078d9ea6dc``

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
