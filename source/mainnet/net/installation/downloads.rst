
.. include:: ../../variables.rst
.. _downloads:

=========
Downloads
=========

This topic contains information about where you can download the Concordium Wallets and tools for Mainnet.

.. _downloads-mwgen2:

|mw-gen2|
========================

The |mw-gen2| is available for iOS and Android™. The |mw-gen2| supports iOS 15 or later and Android 8 or later.

.. Note::

   The |mw-gen2| is not supported on tablet devices.

You can find |mw-gen2| on App Store and on Google Play.

   .. image:: ../images/mobile-wallet/app-store-badge.svg
      :width: 23%
      :target: https://apps.apple.com/us/app/concordium-blockchain-wallet/id6444703764
   .. image:: ../images/mobile-wallet/google-play-badge.png
      :width: 29.5%
      :target: https://play.google.com/store/apps/details?id=software.concordium.mobilewallet.seedphrase.mainnet

.. _downloads-mwgen1:

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

The |bw| is available to download as an extension for the `chromium web browsers <https://chrome.google.com/webstore/detail/concordium-wallet/mnnkpffndmickbiakofclnpoiajlegmg?hl=en-US>`_. The extension supports both Mainnet and Testnet.

.. _downloads-desktop-wallet:

Concordium Desktop Wallet
=================================

.. card:: Windows v1.6.0
    :link: https://distribution.mainnet.concordium.software/tools/windows/concordium-desktop-wallet-1.6.0.exe

.. card:: MacOS v1.6.0
    :link: https://distribution.mainnet.concordium.software/tools/macos/concordium-desktop-wallet-1.6.0.dmg

.. dropdown:: Linux® v1.6.0

   Download the Desktop Wallet for Linux®:

   - `Mainnet AppImage <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.6.0.AppImage>`_

      - SHA256 checksum of the download: :substitution-code:`|cdw-appimage-checksum|`
      - :ref:`Verification instructions <verification-cdw-appimage>`

   - `Mainnet Debian package <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.6.0.deb>`_

      - SHA256 checksum of the download: :substitution-code:`|cdw-deb-checksum|`
      - :ref:`Verification instructions <verification-cdw-deb>`

   - `Mainnet RPM <https://distribution.mainnet.concordium.software/tools/linux/concordium-desktop-wallet-1.6.0.rpm>`_

      - SHA256 checksum of the download: :substitution-code:`|cdw-rpm-checksum|`
      - :ref:`Verification instructions <verification-cdw-rpm>`

.. _ledger-app-download:

Concordium LEDGER App
=====================

Install the LEDGER App for use with the Desktop Wallet from LEDGER Live. For information, see :ref:`Install the LEDGER app<install-ledger>`.

.. _concordium-node-and-client-download:

Concordium Client |client-version|
===================================

-  `Download the Mainnet Concordium Client for Linux <https://distribution.concordium.software/tools/linux/concordium-client_6.0.1-0>`_

      - SHA256 checksum of the download: :substitution-code:`|client-linux-checksum|`
      - :ref:`Verification instructions <verification-client-linux>`

   Before you can use the downloaded Concordium Client on Linux you have to make the downloaded file executable. Run the following command to make the file you download executable:

      .. code-block:: console

         chmod +x concordium-client_*

   where you replace `*` with |client-version|.

-  `Download the Mainnet Concordium Client for macOS <https://distribution.concordium.software/tools/macos/signed/concordium-client-6.0.1.pkg>`_

   - The macOS distribution is an installer that places an alias to the binary
     into the folder ``/usr/local/bin``. So after installing, you should have
     ``concordium-client`` on your path.

-  `Download the Mainnet Concordium Client for Windows <https://distribution.concordium.software/tools/windows/signed/concordium-client_6.0.1-0.exe>`_

``cargo-concordium``
====================

For information about installing ``cargo-concordium``, see :ref:`Install tools for development <setup-tools>`.

.. Note::

   From version 2.8.0 the distribution for ``cargo-concordium`` has been simplified. Now, once you have installed rustup, you can quickly and easily install ``cargo-concordium`` without downloading a separate package or going through many steps. If you already have ``cargo-concordium`` installed, you may need to remove the existing ``cargo-concordium`` from your PATH to be able to update versions in the future.

VSCode extension
----------------

You can `install the VSCode extension <https://marketplace.visualstudio.com/items?itemName=Concordium.concordium-smart-contracts>`__ for smart contract development from the VSCode marketplace.

Smart contract deploy and initialize tool
=========================================

To ease deployment and initialization, you can use the `Smart contract deploy and initialize tool <https://sctools.mainnet.concordium.software/>`__. It works with the |bw| to deploy and initialize smart contracts to Mainnet and Testnet.

.. _node-downloads:

Concordium node distributions
=============================

For the system requirements to run a node, see :ref:`System requirements to run a node<node-requirements>`.

.. Note::

   When upgrading, you can only upgrade one minor version at a time, or from the last release of major version X to major version X+1. You cannot skip versions. For patches, you can skip versions e.g. X.X.0 to X.X.3, or `X.1.1` to `X.2.3`. To download previous node versions, see :ref:`Previous node versions<previous-downloads>`.

Ubuntu |mainnet-node-version|
-----------------------------

To run a node on a server with Ubuntu, `download a Mainnet Debian package <https://distribution.mainnet.concordium.software/deb/concordium-mainnet-node_6.0.4-0_amd64.deb>`_.

   - SHA256 checksum of the download: |node-deb-package-checksum|

   - :ref:`Verification instrcutions<verification-cdw-deb>`

Linux-Docker |mainnet-node-version|
-----------------------------------

To learn how to run a node with Ubuntu, see :ref:`Run a node on a server with Ubuntu <run-node-ubuntu>`. To upgrade your Docker node either restart the service if you are using the `:latest` image tag, or change the image tag to the new version. See :ref:`Running/upgrading a node<running-a-node>` for details.

Windows |mainnet-node-version|
------------------------------

To run a node on Windows, `download a Mainnet Windows Installer package <https://distribution.concordium.software/windows/Signed/Node-6.0.4-0.msi>`_. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`.

Mac |mainnet-node-version|
--------------------------

To run a node on macOS, `download a Mainnet macOS installer package <https://distribution.concordium.software/macos/signed/concordium-node-6.0.4-0.pkg>`_.

To learn how to run a node on Mac, see :ref:`Run and manage a node on macOS  <run-node-macos>`.

Node performance monitoring
---------------------------

You can use the `Prometheus monitoring system <https://prometheus.io/download/>`__ to export node metrics for monitoring your node performance. For information about configuration and the exposed metrics, see the `documentation in the repository <https://github.com/Concordium/concordium-node/blob/main/docs/prometheus-exporter.md>`__.

For node runners using Grafana®, Concordium provides a node performance dashboard using the exposed Prometheus metrics. You can `download it from the Grafana marketplace <https://grafana.com/grafana/dashboards/18983-concordium-node-external/>`__.

Genesis block
=============

The genesis block is included in node distributions.
Download the block separately to inspect it or to run a node in a custom configuration.

.. _mainnet-genesis-block:

`Download the mainnet genesis block <https://distribution.mainnet.concordium.software/data/genesis.dat>`_

   - SHA256 checksum of the download: :substitution-code:`|mainnet-genesis-block-checksum|`
   - :ref:`Verification instructions <verification-mainnet-genesis-block>`

.. _downloads-auxiliary-tools:

Auxiliary tools
===============

Auxiliary tools are a collection of tools that can be used by developers to perform actions as needed.

Encrypt/decrypt tool v1.0.0
---------------------------

- `Download the Encrypt/decrypt tool for Linux <https://distribution.concordium.software/tools/linux/utils-1.0.0>`_

- `Download the Encrypt/decrypt tool for Windows <https://distribution.concordium.software/tools/windows/signed/utils-1.0.0.zip>`_

- `Download the Encrypt/decrypt tool for MacOS <https://distribution.concordium.software/tools/macos/signed/utils-1.0.0.zip>`_

For information about how to use the encrypt/decrypt tool, see :ref:`Auxiliary tools <developer-tools>`.
