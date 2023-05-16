
.. include:: ../../variables.rst
.. _downloads-testnet:

===================
Downloads - Testnet
===================

This topic contains information about where you can download the Concordium Wallets and tools for Testnet. You can also find out about the hardware requirements for running a node.

|mw-gen2|
========================

The |mw-gen2| is available for iOS and Android™. The |mw-gen2| supports iOS 13 or later and Android 8 or later.

.. Note::

   The |mw-gen2| is not supported on tablet devices.

iOS
---

#.  Install `TestFlight <https://apps.apple.com/us/app/testflight/id899247664>`__ on your iPhone to get the |mw-gen2| for Testnet on iOS.
#.  Follow `this link <https://testflight.apple.com/join/YaKKqYMA>`__ on your iPhone to join our beta. You must have TestFlight installed.

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

#.  Install `TestFlight <https://apps.apple.com/us/app/testflight/id899247664>`__ on your iPhone to get the Concordium Mobile Wallet for Testnet on iOS.
#.  Follow `this link <https://testflight.apple.com/join/HZRi1WDT>`__ on your iPhone to join our beta. You must have TestFlight installed.

Android
-------

- `Download the Android version of Concordium Mobile Wallet for Testnet <https://distribution.testnet.concordium.com/tools/android/concordium-mobile-wallet_3.2.0(111).apk>`_

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

Concordium LEDGER App - Sirius
==============================

The version of the LEDGER App is the same for Mainnet and Testnet. So if you already have that installed for one or the other, you do not need to reinstall.

.. Note::

   LEDGER firmware version 2.0.0 is no longer supported.

.. Note::

   The LEDGER NANO X is not supported currently.

When installing the certificate, ensure that the public key of the certificate is :substitution-code:`|ledger-app-public-key|`.

- For LEDGER NANO S, `download the Concordium LEDGER App 3.0.1 for LEDGER firmware version 2.1.0 <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-3.0.1-target-2.1.0.zip>`_

- For LEDGER NANO S PLUS, `download the Concordium LEDGER App 3.1.0 for LEDGER firmware version 1.1.0 <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-3.1.0-nanos-plus-1.1.0.zip>`_

.. _concordium-node-and-client-download-testnet:

Concordium Client v5.1.1
========================

-  `Download the Testnet Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_5.1.1>`_

   - SHA256 checksum of the download: :substitution-code:`|client-linux-checksum|`

   Before you can use the downloaded Concordium Client on Linux you have to make the downloaded file executable. Run the following command to make the file you download executable:

      .. code-block:: console

         chmod +x concordium-client_*

   where you replace `*` with |client-version|.

-  `Download the Testnet Concordium Client for macOS <https://distribution.concordium.software/tools/macos/signed/concordium-client-5.1.1.pkg>`_

   - The macOS distribution is an installer that places an alias to the binary
     into the folder ``/usr/local/bin``. So after installing, you should have
     ``concordium-client`` on your path.

-  `Download the Testnet Concordium Client for Windows <https://distribution.concordium.software/tools/windows/signed/concordium-client_5.1.1.exe>`_

.. _cargo-concordium-testnet:

``cargo-concordium`` v2.8.0
===========================

For information about installing ``cargo-concordium``, see :ref:`Install tools for development <setup-tools>`.

VSCode extension 1.0.1
----------------------

You can `install the VSCode extension <https://marketplace.visualstudio.com/items?itemName=Concordium.concordium-smart-contracts>`__ for smart contract development from the VSCode marketplace.

Concordium node distributions
=============================

For the system requirements to run a node, see :ref:`System requirements to run a node<node-requirements>`.

.. Note::

   When upgrading, you can only upgrade one minor version at a time, or from the last release of major version X to major version X+1. You cannot skip versions. For patches, you can skip versions e.g. X.X.0 to X.X.3, or `X.1.1` to `X.2.3`. To download previous node versions, see :ref:`Previous node versions<previous-downloads>`.

Ubuntu v5.4.x
-------------

To run a node on a server with Ubuntu, you need a Debian package.

   - `Download the Testnet Debian package <https://distribution.testnet.concordium.com/deb/concordium-testnet-node_5.4.x-0_amd64.deb>`_

      - SHA256 checksum of the download: ``cf035d33784473b13afdf6d9a047c35f970ad9864f1134867eed00ed7baa2007``

   To learn how to run a node with Ubuntu, see :ref:`Run a node on a server with Ubuntu <run-node-ubuntu>`.

Linux-Docker v5.4.x
-------------------

.. _concordium-docker-package-download-testnet:

To learn how to run a node with Docker, see :ref:`Run a node with Docker <run-a-node>`.

To upgrade your Docker node either restart the service if you are using the `:latest` image tag, or change the image tag to the new version. See :ref:`Running/upgrading a node<running-a-node>` for details.

Windows v5.4.x
--------------

To run a node on Windows, you need a Windows Installer package. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

   - `Download the Testnet Windows Installer package <https://distribution.concordium.software/windows/Signed/Node-5.4.x-0.msi>`_

To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`.

Mac v5.4.x
----------

To run a node on macOS, you need a macOS installer package.

   - `Download the Testnet macOS installer package <https://distribution.concordium.software/macos/signed/concordium-node-5.4.x.pkg>`_

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
