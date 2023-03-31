
.. include:: ../../variables.rst
.. _downloads:

===================
Downloads - Mainnet
===================

This topic contains information about where you can download the Concordium Wallets and tools for Mainnet. You can also find out about the hardware requirements for running a node.


.. _downloads-mwgen2:

|mw-gen2|
========================

The |mw-gen2| is available for Android™. The |mw-gen2| supports Android 8 or later.

.. Note::

   The |mw-gen2| is not supported on tablet devices.

You can find |mw-gen2| on Google Play.

   .. image:: ../images/mobile-wallet/google-play-badge.png
      :width: 29.5%
      :target: https://play.google.com/store/apps/details?id=software.concordium.mobilewallet.seedphrase.mainnet

|mw-gen1|
========================

The |mw-gen1| is available for iOS and Android™. The |mw-gen1| supports iOS 13 or later and Android 8 or later.

.. Note::

   The |mw-gen1| is not supported on tablet devices.

You can find |mw-gen1| on App Store and on Google Play.

   .. image:: ../images/mobile-wallet/app-store-badge.svg
      :width: 23%
      :target: https://apps.apple.com/us/app/concordium-mobile-wallet/id1566996491
   .. image:: ../images/mobile-wallet/google-play-badge.png
      :width: 29.5%
      :target: https://play.google.com/store/apps/details?id=software.concordium.mobilewallet.mainnet

.. _downloads-browser-wallet:

|bw|
=================================

The |bw| is available to download as an extension for the `chromium web browsers <https://chrome.google.com/webstore/detail/concordium-wallet/mnnkpffndmickbiakofclnpoiajlegmg?hl=en-US>`_.

.. _downloads-desktop-wallet:

Concordium Desktop Wallet
=================================

Windows v1.5.0
--------------

-  `Download the Desktop Wallet for Windows <https://distribution.mainnet.concordium.software/tools/windows/concordium-desktop-wallet-1.5.0.exe>`_

MacOS v1.5.0
------------
-  `Download the Desktop Wallet for macOS <https://distribution.mainnet.concordium.software/tools/macos/concordium-desktop-wallet-1.5.0.dmg>`_

Linux® v1.5.0
-------------
-  Download the Desktop Wallet for Linux®:

   -  `Mainnet AppImage <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.5.0.AppImage>`_

      - SHA256 checksum of the download: :substitution-code:`|cdw-appimage-checksum|`
      - :ref:`Verification instructions <verification-cdw-appimage>`

   -  `Mainnet Debian package <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.5.0.deb>`_

      - SHA256 checksum of the download: :substitution-code:`|cdw-deb-checksum|`
      - :ref:`Verification instructions <verification-cdw-deb>`

   -  `Mainnet RPM <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.5.0.rpm>`_

      - SHA256 checksum of the download: :substitution-code:`|cdw-rpm-checksum|`
      - :ref:`Verification instructions <verification-cdw-rpm>`

Concordium LEDGER App
=====================

.. Note::

   LEDGER firmware version 2.0.0 is no longer supported for the LEDGER NANO S.

.. Note::

   The LEDGER NANO X is not supported currently.

When installing the certificate, ensure that the public key of the certificate is :substitution-code:`|ledger-app-public-key|`.

- For LEDGER NANO S, `download the Concordium LEDGER App 3.0.1 for LEDGER firmware version 2.1.0 <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-3.0.1-target-2.1.0.zip>`_

- For LEDGER NANO S PLUS, `download the Concordium LEDGER App 3.1.0 for LEDGER firmware version 1.1.0 <https://distribution.mainnet.concordium.software/tools/concordium-ledger-app-3.1.0-nanos-plus-1.1.0.zip>`_

.. _concordium-node-and-client-download:

Concordium Client v5.0.2
========================

-  `Download the Mainnet Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_5.0.2-0>`_

      - SHA256 checksum of the download: :substitution-code:`|client-linux-checksum|`
      - :ref:`Verification instructions <verification-client-linux>`

   Before you can use the downloaded Concordium Client on Linux you have to make the downloaded file executable. Run the following command to make the file you download executable:

      .. code-block:: console

         chmod +x concordium-client_*

   where you replace `*` with |client-version|.

-  `Download the Mainnet Concordium Client for macOS <https://distribution.concordium.software/tools/macos/signed/concordium-client-5.0.2-0.pkg>`_

   - The macOS distribution is an installer that places an alias to the binary
     into the folder ``/usr/local/bin``. So after installing, you should have
     ``concordium-client`` on your path.

-  `Download the Mainnet Concordium Client for Windows <https://distribution.concordium.software/tools/windows/signed/concordium-client_5.0.2-0.exe>`_

Cargo-concordium v2.7.0
=======================

Download cargo-concordium:

   -  `Download Mainnet cargo-concordium for Linux <https://distribution.concordium.software/tools/linux/cargo-concordium_2.7.0>`_

      - SHA256 checksum of the download: :substitution-code:`|cargo-linux-checksum|`
      - :ref:`Verification instructions <verification-cargo-linux>`

   -  `Download Mainnet cargo-concordium for MacOS <https://distribution.concordium.software/tools/macos/signed/cargo-concordium_2.7.0>`_

   -  `Download Mainnet cargo-concordium for Windows <https://distribution.concordium.software/tools/windows/signed/cargo-concordium_2.7.0.exe>`_

For information about installing `cargo-concordium`, see :ref:`Install tools for development <setup-tools>`.

Concordium node distributions 5.1.3
===================================

For the system requirements to run a node, see :ref:`System requirements to run a node<node-requirements>`.

.. Note::

   When upgrading, you can only upgrade one minor version at a time, or from the last release of major version X to major version X+1. You cannot skip versions. For patches, you can skip versions e.g. X.X.0 to X.X.3, or `X.1.1` to `X.2.3`. To download previous node versions, see :ref:`Previous node versions<previous-downloads>`.

Ubuntu
------

To run a node on a server with Ubuntu, you need a Debian package.

   - `Download the Mainnet Debian package <https://distribution.mainnet.concordium.software/deb/concordium-mainnet-node_5.1.3-0_amd64.deb>`_

      - SHA256 checksum of the download: :substitution-code:`|node-deb-package-checksum|`
      - :ref:`Verification instructions <verification-node-debian-package>`

   To learn how to run a node with Ubuntu, see :ref:`Run a node on a server with Ubuntu <run-node-ubuntu>`.

Linux-Docker
------------

.. _concordium-docker-package-download:

To learn how to run a node with Docker, see :ref:`Run a node with Docker <run-a-node>`.

To upgrade your Docker node either restart the service if you are using the `:latest` image tag, or change the image tag to the new version. See :ref:`Running/upgrading a node<running-a-node>` for details.

Windows
-------

To run a node on Windows, you need a Windows Installer package. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

   - `Download the Mainnet Windows Installer package <https://distribution.concordium.software/windows/Signed/Node-5.1.3-1.msi>`_

To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`.

Mac
---

To run a node on macOS, you need a macOS installer package.

   - `Download the Mainnet macOS installer package <https://distribution.concordium.software/macos/signed/concordium-node-5.1.3-1.pkg>`_

To learn how to run a node on Mac, see :ref:`Run and manage a node on macOS  <run-node-macos>`.

Genesis block
=============

The genesis block is included in node distributions.
Download the block separately to inspect it or to run a node in a custom configuration.

- `Download the mainnet genesis block <https://distribution.mainnet.concordium.software/data/genesis.dat>`_

   - SHA256 checksum of the download: :substitution-code:`|mainnet-genesis-block-checksum|`
   - :ref:`Verification instructions <verification-mainnet-genesis-block>`


Auxiliary tools
===============

Auxiliary tools are a collection of tools that can be used by developers to perform actions as needed.

Encrypt/decrypt tool v1.0.0
---------------------------

- `Download the Encrypt/decrypt tool for Linux <https://distribution.concordium.software/tools/linux/utils-1.0.0>`_

- `Download the Encrypt/decrypt tool for Windows <https://distribution.concordium.software/tools/windows/signed/utils-1.0.0.zip>`_

- `Download the Encrypt/decrypt tool for MacOS <https://distribution.concordium.software/tools/macos/signed/utils-1.0.0.zip>`_

For information about how to use the encrypt/decrypt tool, see :ref:`Auxiliary tools  <developer-tools>`.
