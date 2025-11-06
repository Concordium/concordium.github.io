
.. include:: ../../variables.rst
.. _downloads:

=========
Downloads
=========

This topic contains information about where you can download the Concordium Wallets and tools for Mainnet and Testnet.

.. _downloads-cryptox:

|cryptox|
=========

The |cryptox| is available for iOS (16.4 or later) and Android™ (8 or later).

It is the main Concordium mobile wallet and has the widest set of features.

.. dropdown:: Mainnet

   You can find |cryptox| on App Store and on Google Play.

   .. image:: ../images/mobile-wallet/app-store-badge.svg
      :width: 23%
      :target: https://apps.apple.com/us/app/cryptox-concordium-wallet/id1593386457
   .. image:: ../images/mobile-wallet/google-play-badge.png
      :width: 29.5%
      :target: https://play.google.com/store/apps/details?id=com.pioneeringtechventures.wallet

   You can download standalone installable packages (APKs) for Android here: https://github.com/Concordium/cryptox-android/releases

.. dropdown:: Testnet

   **iOS**

   #.  Install `TestFlight <https://apps.apple.com/us/app/testflight/id899247664>`__ on your iPhone to get the |cryptox| for Testnet on iOS.
   #.  Follow `this link <https://testflight.apple.com/join/gnWggXOz>`__ on your iPhone to join the |cryptox| beta. You must have TestFlight installed.

   **Android**

   Click below to download the Android version of |cryptox| for Testnet.

   .. image:: ../images/mobile-wallet/google-play-badge.png
      :width: 29.5%
      :target: https://play.google.com/store/apps/details?id=com.pioneeringtechventures.wallet.testnet

   You can download standalone installable packages (APKs) for Android here: https://github.com/Concordium/cryptox-android/releases



.. _downloads-browser-wallet:
.. _downloads-browser-wallet-testnet:

|bw|
====

The |bw| is available to download as an extension for the `chromium web browsers <https://chrome.google.com/webstore/detail/concordium-wallet/mnnkpffndmickbiakofclnpoiajlegmg?hl=en-US>`_. The extension supports both Mainnet and Testnet.

.. _downloads-desktop-wallet:
.. _downloads-desktop-wallet-testnet:

Concordium Desktop Wallet
=========================

.. dropdown:: Mainnet

   .. card:: Windows v1.9.3
      :link: https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-mainnet/concordium-desktop-wallet-1.9.3.exe

   .. card:: macOS v1.9.3
      :link: https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-mainnet/concordium-desktop-wallet-1.9.3.dmg

   .. dropdown:: Linux v1.9.3

      - `Mainnet AppImage <https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-mainnet/concordium-desktop-wallet-1.9.3.AppImage>`_

         - SHA256 checksum of the download: :substitution-code:`|cdw-appimage-checksum|`
         - :ref:`Verification instructions <verification-cdw-appimage>`

      - `Mainnet Debian package <https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-mainnet/concordium-desktop-wallet-1.9.3.deb>`_

         - SHA256 checksum of the download: :substitution-code:`|cdw-deb-checksum|`
         - :ref:`Verification instructions <verification-cdw-deb>`

      - `Mainnet RPM <https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-mainnet/concordium-desktop-wallet-1.9.3.rpm>`_

         - SHA256 checksum of the download: :substitution-code:`|cdw-rpm-checksum|`
         - :ref:`Verification instructions <verification-cdw-rpm>`

.. dropdown:: Testnet

   .. card:: Windows v1.9.3
      :link: https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-testnet/concordium-desktop-wallet-testnet-1.9.3.exe

   .. card:: macOS v1.9.3
      :link: https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-testnet/concordium-desktop-wallet-testnet-1.9.3.dmg

   .. dropdown:: Linux v1.9.3

      Download the Testnet version of Concordium Desktop Wallet for Linux:

      -  `Testnet AppImage <https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-testnet/concordium-desktop-wallet-testnet-1.9.3.AppImage>`_
         -  SHA256 checksum of the download: ``d38c74635a30f467e1acdf17e1fd2409cb59caecf1365942c16fd79a5cf0db60``

      -  `Testnet Debian package <https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-testnet/concordium-desktop-wallet-testnet-1.9.3.deb>`_
         -  SHA256 checksum of the download: ``d480b27f8d2f5dd4e7f3b4901d6647c8341ac89b3124a6255cfbe12dad42a9a2``

      -  `Testnet RPM <https://github.com/Concordium/concordium-desktop-wallet/releases/download/desktop-wallet%2F1.9.3-testnet/concordium-desktop-wallet-testnet-1.9.3.rpm>`_
         -  SHA256 checksum of the download: ``10dc5e84158f9eae1d009eb9bb55298bbe7e8aa49be592f129795c751df73e77``

.. _ledger-app-download:

Concordium LEDGER App
=====================

Install the LEDGER App for use with the Desktop Wallet from LEDGER Live. For information, see :ref:`Install the LEDGER app<install-ledger>`.


.. _concordium-node-and-client-download:

Concordium Client |client-version|
===================================

For usage instructions see :ref:`Concordium-client <concordium-client>`

.. dropdown:: Linux

   -  `Download Concordium Client for Linux <https://github.com/Concordium/concordium-client/releases/download/9.1.4-0-rc/concordium-client-linux>`_

         - SHA256 checksum of the download: :substitution-code:`|client-linux-checksum|`
         - :ref:`Verification instructions <verification-client-linux>`

      Before you can use the downloaded Concordium Client on Linux you have to make the downloaded file executable. Run the following command to make the file you download executable:

         .. code-block:: console

            chmod +x concordium-client-linux

.. dropdown:: macOS

   -  Download Concordium Client for macOS: `ARM <https://github.com/Concordium/concordium-client/releases/download/9.1.4-0-rc/concordium-client-macos-arm.pkg>`_ `Intel <https://github.com/Concordium/concordium-client/releases/download/9.1.4-0-rc/concordium-client-macos-intel.pkg>`_

      The macOS distribution is an installer that places an alias to the binary
      into the folder ``/usr/local/bin``. So after installing, you should have
      ``concordium-client`` on your path.

.. dropdown:: Windows

   -  `Download Concordium Client for Windows <https://github.com/Concordium/concordium-client/releases/download/9.1.4-0-rc/concordium-client-windows.zip>`_

      The Windows distribution is a zip file that must be extracted before use.
      To do this, in Windows Explorer, right-click the downloaded file and select
      "Extract All...". After extraction, you will have a folder containing the
      Concordium Client executable (``concordium-client.exe``) as well as other files
      that are required to run the client.

.. _cargo-concordium-testnet:

cargo-concordium
================

For information about installing ``cargo-concordium``, see :ref:`Install tools for development <build-contract>`.

.. Note::

   From version 2.8.0 the distribution for ``cargo-concordium`` has been simplified. Now, once you have installed rustup, you can quickly and easily install ``cargo-concordium`` without downloading a separate package or going through many steps. If you already have ``cargo-concordium`` installed, you may need to remove the existing ``cargo-concordium`` from your PATH to be able to update versions in the future.

VSCode extension
----------------

You can `install the VSCode extension <https://marketplace.visualstudio.com/items?itemName=Concordium.concordium-smart-contracts>`__ for smart contract development from the VSCode marketplace.

For information about using the VSCode extension, `watch the video <https://www.youtube.com/watch?v=9qjcsGDeveg>`_.

Smart contract deploy and initialize tool
=========================================

To ease deployment and initialization, you can use the `Smart contract deploy and initialize tool <https://sctools.mainnet.concordium.software/>`__. It works with the |bw| to deploy and initialize smart contracts to Mainnet and Testnet.

.. _node-downloads:

Concordium node distributions
=============================

For the system requirements to run a node and installation instructions for each operating system, see :ref:`System requirements to run a node <node-requirements>`.

.. Note::

   When upgrading your Concordium node, it is generally possible to upgrade directly to the latest version without upgrading through each intermediate version. However, if you wish to download previous node versions, see :ref:`Previous node versions<previous-downloads>`.

.. dropdown:: Mainnet

   .. dropdown:: Ubuntu |mainnet-node-version|

      To run a node on a server with Ubuntu, `download a Mainnet Debian package <https://distribution.mainnet.concordium.software/deb/concordium-mainnet-node_9.0.7-3_amd64.deb>`_.

         - SHA256 checksum of the download: |node-deb-package-checksum|

         - :ref:`Verification instrcutions<verification-cdw-deb>`

   .. dropdown:: Linux-Docker |mainnet-node-version|

      To learn how to run a node with Docker, see :ref:`Run a node with Docker <run-a-node>`.

      To upgrade your Docker node either restart the service if you are using the `:latest` image tag, or change the image tag to the new version. See :ref:`Running/upgrading a node<running-a-node>` for details.

   .. dropdown:: Windows |mainnet-node-version|

      To run a node on Windows, `download a Mainnet Windows Installer package <https://distribution.concordium.software/windows/Node-9.0.7-3.msi>`_. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

      To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`.

   .. dropdown:: Mac |mainnet-node-version|

      To run a node on macOS, `download a Mainnet macOS installer package <https://distribution.concordium.software/macos/concordium-node-9.0.7-3.pkg>`_.

      To learn how to run a node on Mac, see :ref:`Run and manage a node on macOS  <run-node-macos>`.

.. _concordium-node-and-client-download-testnet:
.. _testnet-node-downloads:

.. dropdown:: Testnet

   .. dropdown:: Ubuntu |testnet-node-version|

      To run a node on a server with Ubuntu, `download a Testnet Debian package <https://distribution.testnet.concordium.com/deb/concordium-testnet-node_9.0.7-3_amd64.deb>`_.

      - SHA256 checksum of the download: ``676644f4b07204a62d45f5b7dc38f3dd89bff125d2e34f7b6238c5323da0a0bf``

      To learn how to run a node with Ubuntu, see :ref:`Run a node on a server with Ubuntu <run-node-ubuntu>`.

   .. dropdown:: Linux-Docker |testnet-node-version|

      .. _concordium-docker-package-download-testnet:

      To learn how to run a node with Docker, see :ref:`Run a node with Docker <run-a-node>`.

      To upgrade your Docker node either restart the service if you are using the `:latest` image tag, or change the image tag to the new version. See :ref:`Running/upgrading a node<running-a-node>` for details.

   .. dropdown:: Windows |testnet-node-version|

      To run a node on Windows, `download a Testnet Windows Installer package <https://distribution.concordium.software/windows/Node-9.0.7-3.msi>`_. **Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.**

      To learn how to run a node on Windows, see :ref:`Run and manage a node on Windows <run-node-windows>`.

   .. dropdown:: Mac |testnet-node-version|

      To run a node on macOS, `download a Testnet macOS installer package <https://distribution.concordium.software/macos/concordium-node-9.0.7-3.pkg>`_.

      To learn how to run a node on Mac, see :ref:`Run and manage a node on macOS <run-node-macos>`.

Node performance monitoring
---------------------------

You can use the `Prometheus monitoring system <https://prometheus.io/download/>`__ to export node metrics for monitoring your node performance. For information about configuration and the exposed metrics, see the `documentation in the repository <https://github.com/Concordium/concordium-node/blob/main/docs/prometheus-exporter.md>`__.

For node runners using Grafana®, Concordium provides a node performance dashboard using the exposed Prometheus metrics. You can `download it from the Grafana marketplace <https://grafana.com/grafana/dashboards/18983-concordium-node-external/>`__.

Genesis block
=============

The genesis block is included in node distributions.
Download the block separately to inspect it or to run a node in a custom configuration.

.. _mainnet-genesis-block:

.. dropdown:: Mainnet

   `Download the mainnet genesis block <https://distribution.mainnet.concordium.software/data/genesis.dat>`_

      - SHA256 checksum of the download: :substitution-code:`|mainnet-genesis-block-checksum|`
      - :ref:`Verification instructions <verification-mainnet-genesis-block>`

.. dropdown:: Testnet

   `Download the testnet genesis block <https://distribution.testnet.concordium.com/data/genesis.dat>`_

      - SHA256 checksum of the download: ``69db4360f0a16414db86a920513600cfe29241c0c713a07d8e79dad19103e91d``

.. _downloads-voting-tools:

.. only:: never

   Voting tools
   ============

   Coordinator tool
   Windows
   Mac
   Ubuntu

   The Guardian app, voting dApp, and election smart contract are created by the election coordinator during the setup phase of the election.

.. _downloads-auxiliary-tools:

Auxiliary tools
===============

Auxiliary tools are a collection of tools that can be used to perform actions as needed.

Encrypt/decrypt tool v1.0.0
---------------------------

For information about how to use the encrypt/decrypt tool, see :ref:`Auxiliary tools <developer-tools>`.

- `Download the Encrypt/decrypt tool for Linux <https://distribution.concordium.software/tools/linux/utils-1.0.0>`_

- `Download the Encrypt/decrypt tool for Windows <https://distribution.concordium.software/tools/windows/signed/utils-1.0.0.zip>`_

- `Download the Encrypt/decrypt tool for macOS <https://distribution.concordium.software/tools/macos/signed/utils-1.0.0.zip>`_

Company identity management tool v1.0.2
---------------------------------------

Use this tool to create a company identity, request accounts using a company identity, and recover a company identity.
For information about how to use the company identity management tool, see :ref:`company-identities`.

.. dropdown:: Linux

   - `Download the Company identity management tool for Linux - Debian package <https://distribution.concordium.software/tools/linux/concordium-company-id_1.0.2_amd64.deb>`_

      - Verification instructions

         In a terminal:

         #. Navigate to the download.
         #. Paste the following into the terminal: $sha256sum concordium-company-id_1.0.2_amd64.deb
         #. Verify that the output matches the SHA256 checksum ``c728dbe0b5ab950e4e705d7faceaee4b5ade615acd34b3bc6e75250acdedfaa9``.

   - `Download the Company identity management tool for Linux - App image <https://distribution.concordium.software/tools/linux/concordium-company-id_1.0.2_amd64.AppImage>`_

      - Verification instructions

         In a terminal:

         #. Navigate to the download.
         #. Paste the following into the terminal: $sha256sum concordium-company-id_1.0.2_amd64.AppImage
         #. Verify that the output matches the SHA256 checksum ``8b6964d827808d3a8a9244d202e3aa8cdffeb2462edf44b3e32e7b41549b710f``.

.. dropdown:: Windows

   - `Download the Company identity management tool for Windows <https://distribution.concordium.software/tools/windows/signed/Concordium_Company_ID_1.0.2_x64_en-US.msi>`_

.. dropdown:: macOS

   - `Download the Company identity management tool for macOS <https://distribution.concordium.software/tools/macos/signed/concordium_company_id_1.0.2-1_x64.dmg>`_

.. toctree::
   :hidden:
   :maxdepth: 1

   verification-instructions
