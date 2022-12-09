
.. include:: ../../variables.rst
.. _downloads-testnet:

===================
Downloads - Testnet
===================

This topic contains information about where you can download the Concordium Wallets and tools for Testnet. You can also find out about the hardware requirements for running a node.

|mw-gen2|
========================

The |mw-gen2| is available for iOS and Android™. The |mw-gen2| supports iOS 13or later and Android 8 or later.

.. Note::

   The |mw-gen2| is not supported on tablet devices.

iOS
---

#.  Install `TestFlight <https://apps.apple.com/us/app/testflight/id899247664>`_ on your iPhone to get the Concordium Mobile Wallet for Testnet on iOS.
#.  Follow `this link <https://testflight.apple.com/join/HZRi1WDT>`_ on your iPhone to join our beta. You must have TestFlight installed.

Android
-------

- `Download the Android version of Concordium Wallet for Mobile for Testnet <https://play.google.com/store/apps/details?id=software.concordium.mobilewallet.seedphrase.testnet>`_


.. _downloads-mobile-wallet-testnet:

|mw-gen1|
========================

The |mw-gen1| is available for iOS and Android™. The |mw-gen1| supports iOS 13 or later and Android 8 or later.

.. Note::

   The |mw-gen1| is not supported on tablet devices.

iOS
---

#.  Install `TestFlight <https://apps.apple.com/us/app/testflight/id899247664>`_ on your iPhone to get the Concordium Mobile Wallet for Testnet on iOS.
#.  Follow `this link <https://testflight.apple.com/join/HZRi1WDT>`_ on your iPhone to join our beta. You must have TestFlight installed.

Android
-------

- `Download the Android version of Concordium Mobile Wallet for Testnet <https://distribution.testnet.concordium.com/tools/android/concordium-mobile-wallet_3.0.3(107).apk>`_

.. _downloads-browser-wallet-testnet:

|bw|
=================================

The |bw| is available to download as an extension for the `chromium web browsers <https://chrome.google.com/webstore/detail/concordium-wallet/mnnkpffndmickbiakofclnpoiajlegmg?hl=en-US>`_.

.. _downloads-desktop-wallet-testnet:

Concordium Desktop Wallet
=========================

Windows v1.5.0
--------------

- `Download the Testnet version of Concordium Desktop Wallet for Windows <https://distribution.testnet.concordium.com/tools/windows/concordium-desktop-wallet-testnet-1.5.0.exe>`_


MacOS v1.5.0
------------
- `Download the Testnet version of Concordium Desktop Wallet for MacOS <https://distribution.testnet.concordium.com/tools/macos/concordium-desktop-wallet-testnet-1.5.0.dmg>`_


Linux® v1.5.0
-------------
-  Download the Testnet version of Concordium Desktop Wallet for Linux®:

   -  `Testnet AppImage <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.5.0.AppImage>`_
      -  SHA256 checksum of the download: ``044d8b2aa039428b7e6626d3af1dade21e52bee04dbcfc9f78d303bd0f1c855e``

   -  `Testnet Debian package <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.5.0.deb>`_
      -  SHA256 checksum of the download: ``f15d996f9e73118cf12820265af6303a9d6359b30c1e3c401bd0f292e977ceb2``

   -  `Testnet RPM <https://distribution.testnet.concordium.com/tools/linux/concordium-desktop-wallet-testnet-1.5.0.rpm>`_
      -  SHA256 checksum of the download: ``66d2a9ce4809a6e84a84accdb0768d6c1c6a7dcb046b751667a80d75a8a66464``

Concordium Ledger App - Sirius
==============================

The version of the Ledger App is the same for Mainnet and Testnet. So if you already have that installed for one or the other, you do not need to reinstall.

.. Note::

   Ledger firmware version 2.0.0 is no longer supported.

.. Note::

   The Ledger Nano X is not supported currently.

- For Ledger Nano S, `download the Concordium Ledger App 3.0.1 for Ledger firmware version 2.1.0 <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-3.0.1-target-2.1.0.zip>`_

- For Ledger Nano S Plus, `download the Concordium Ledger App 3.0.1 for Ledger firmware version 1.0.4 <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-3.0.1-nanos-plus-1.0.4.zip>`_

.. _concordium-node-and-client-download-testnet:

Concordium Client v5.0.1
========================

-  `Download the Testnet Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_5.0.1-0>`_

   - SHA256 checksum of the download: 3ed9f3878d07c53d6f2233d4832fed45eea74363e1f8671d42be45043dd3937b

   Before you can use the downloaded Concordium Client on Linux you have to make the downloaded file executable. Run the following command to make the file you download executable:

      .. code-block:: console

         chmod +x concordium-client_*

   where you replace `*` with |client-version|.

-  `Download the Testnet Concordium Client for macOS <https://distribution.concordium.software/tools/macos/signed/concordium-client-5.0.1-0.pkg>`_

   - The macOS distribution is an installer that places an alias to the binary
     into the folder ``/usr/local/bin``. So after installing, you should have
     ``concordium-client`` on your path.

-  `Download the Testnet Concordium Client for Windows <https://distribution.concordium.software/tools/windows/signed/concordium-client_5.0.1-0.exe>`_

Cargo-concordium v2.4.0
=======================

Download cargo-concordium:

   -  `Download Testnet cargo-concordium for Linux <https://distribution.concordium.software/tools/linux/cargo-concordium_2.4.0>`_

   -  `Download Testnet cargo-concordium for MacOS <https://distribution.concordium.software/tools/macos/signed/cargo-concordium_2.4.0>`_

   -  `Download Testnet cargo-concordium for Windows <https://distribution.concordium.software/tools/windows/signed/cargo-concordium_2.4.0.exe>`_

For information about installing `cargo-concordium`, see :ref:`Install tools for development <setup-tools>`.

Concordium node distributions v5.0.6
====================================

For the system requirements to run a node, see :ref:`System requirements to run a node<node-requirements>`.

.. Note::

   When upgrading, you can only upgrade one minor version at a time, or from the last release of major version X to major version X+1. You cannot skip versions. For patches, you can skip versions e.g. X.X.0 to X.X.3, or `X.1.1` to `X.2.3`. To download previous node versions, see :ref:`Previous node versions<previous-downloads>`.

Ubuntu
------

To run a node on a server with Ubuntu, you need a Debian package.

   - `Download the Testnet Debian package <https://distribution.testnet.concordium.com/deb/concordium-testnet-node_5.0.6-0_amd64.deb>`_

      - SHA256 checksum of the download: ``fa361845715991142c721b5ac0803d4fcc615b4a4fb865a48533d03ea9ba6a17``

   To learn how to run a node with Ubuntu, see :ref:`Run a node on a server with Ubuntu <run-node-ubuntu>`.

Linux-Docker
------------

.. _concordium-docker-package-download-testnet:

To learn how to run a node with Docker, see :ref:`Run a node with Docker <run-a-node>`.

To upgrade your Docker node either restart the service if you are using the `:latest` image tag, or change the image tag to the new version. See :ref:`Running/upgrading a node<running-a-node>` for details.

Windows
-------

To run a node on Windows, you need a Windows Installer package. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

   - `Download the Testnet Windows Installer package <https://distribution.concordium.software/windows/Signed/Node-5.0.6-0.msi>`_

To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`.

Mac
---

To run a node on macOS, you need a macOS installer package.

   - `Download the Testnet macOS installer package <https://distribution.concordium.software/macos/signed/concordium-node-5.0.6-0.pkg>`_

To learn how to run a node on Mac, see :ref:`Run and manage a node on macOS <run-node-macos>`.

Genesis block
=============

The genesis block is included in node distributions.
Download the block separately to inspect it or to run a node in a custom configuration.

   - `Download the testnet genesis block <https://distribution.testnet.concordium.com/data/genesis.dat>`_

      - SHA256 checksum of the download: ``69db4360f0a16414db86a920513600cfe29241c0c713a07d8e79dad19103e91d``

.. _downloads-testnet-auxiliary-tools:

Auxiliary tools
===============

Auxiliary tools are a collection of tools that can be used by developers to perform actions as needed.

Encrypt/decrypt tool v1.0.0
---------------------------

- `Download the Encrypt/decrypt tool for Linux <https://distribution.concordium.software/tools/linux/utils-1.0.0>`_

- `Download the Encrypt/decrypt tool for Windows <https://distribution.concordium.software/tools/windows/signed/utils-1.0.0.zip>`_

- `Download the Encrypt/decrypt tool for MacOS <https://distribution.concordium.software/tools/macos/signed/utils-1.0.0.zip>`_

For information about how to use the encrypt/decrypt tool, see :ref:`Auxiliary tools  <developer-tools>`.
