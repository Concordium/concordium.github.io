
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

-  `Download for Windows <https://distribution.mainnet.concordium.software/tools/windows/concordium-desktop-wallet-1.1.6.exe>`_

   - SHA256 checksum of the download: ``58bceb96a9ff752530260f4b6c7aa4c6397901886ff67b6204a9d1990e8058ea``
   - :ref:`Verification instructions <verification-cdw-windows>`

-  `Download for macOS <https://distribution.mainnet.concordium.software/tools/macos/concordium-desktop-wallet-1.1.6.dmg>`_

   - SHA256 checksum of the download: ``53554244918ee58136317c3493d837bda9d633ea2674c4d364563553fc3838e8``
   - :ref:`Verification instructions <verification-cdw-mac>`

Currently, the Desktop Wallet doesn't support Apple MacBook Air 2020 M1.

-  Download for Linux

   -  `AppImage <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.1.6.AppImage>`_

      - SHA256 checksum of the download: ``5865abbf3351690c44240e10781b39cf1ab9f7e725cecd5bd23b240a3e748a95``
      - :ref:`Verification instructions <verification-cdw-appimage>`

   -  `Debian package <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.1.6.deb>`_

      - SHA256 checksum of the download: ``20aac964690154bd9afd11c72357b6082cd5437f1d7caa11e3110c606e204da1``
      - :ref:`Verification instructions <verification-cdw-deb>`

   -  `RPM <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.1.6.rpm>`_

      - SHA256 checksum of the download: ``2cd5a59b54691b3a33d37ec0789a4adc30893dba6c31fd64fd4cb01d195a270a``
      - :ref:`Verification instructions <verification-cdw-rpm>`

Concordium Ledger App
=====================

`Download the Concordium Ledger App <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-1.0.2-target-2.0.0.zip>`_

.. _concordium-node-and-client-download:

Concordium Client
=================
Download the Concordium Client:

-  `Download the Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_1.0.1>`_

   - SHA256 checksum of the download: ``bae20cf3bc93dbafc58a7b1eae462375ef3cfba2cc4905bf872735aa8233d98c``
   - :ref:`Verification instructions <verification-client-linux>`

-  `Download the Concordium Client for macOS <https://distribution.concordium.software/tools/macos/concordium-client_1.0.1>`_.

   - SHA256 checksum of the download: ``4495b0ae1ff6e343f23b57f3544d4a2c73502a3f8b23509ae48025cfffcc18a4``
   - You need to make the client executable by running ``chmod +x
     path/to/concordium-client_1.0.1`` in a terminal. Make sure to provide the
     correct path to the downloaded client.
   - You also need to `grant it permission to run in your Security & Privacy
     settings <https://support.apple.com/en-gb/guide/mac-help/mh40616/mac>`_.
   - :ref:`Verification instructions <verification-client-mac>`

-  `Download the Concordium Client for Windows <https://distribution.concordium.software/tools/windows/concordium-client_1.0.1.exe>`_

   -  SHA256 checksum of the download: ``db3bbce100749f36f7b143d915f573ea28a4dc09011cec35efea73f2165db79f``
   - :ref:`Verification instructions <verification-client-windows>`


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
- :ref:`Verification instructions <verification-node-debian-package>`


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
  - :ref:`Verification instructions <verification-mainnet-genesis-block>`

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
