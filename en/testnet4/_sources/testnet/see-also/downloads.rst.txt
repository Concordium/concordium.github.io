.. _Open Testnet v4: /testnet/see-also/release-notes.html
.. _Concordium client: /testnet/docs/client
.. _node: /testnet/docs/quickstart-node
.. _client: /testnet/docs/client
.. _`Concordium ID APK`: https://client-distribution-testnet.concordium.com/wallet-testnet-release-0.5.24.apk
.. _TestFlight: https://apps.apple.com/dk/app/testflight/id899247664?l=da
.. _`TestFlight beta program`: https://testflight.apple.com/join/X9MJhsPC

.. _downloads:

=========
Downloads
=========

.. contents::
   :local:
   :backlinks: none

.. _concordium_id:

Concordium ID
=============

Installation on Android
-----------------------

Installation requirements: Android 8 or newer.

1. Download the `Concordium ID APK`_ to your phone.
2. You may see a warning about downloading the .apk-file. If you are asked whether you want to keep the .apk-file, press **OK**.
3. After opening the .apk-file, you may see a warning saying that your phone is not allowed to install apps from this source. Press **Settings**, toggle **Allow from this source** and go back.
4. You are now asked if you want to install the application. Press **Install**.


Installation on iOS
-------------------

Installation requirements: iOS 13 or newer.

Installing the Concordium ID app on iOS requires installation of Apple’s TestFlight app, which is used to distribute beta versions of iOS apps.

1. Install `TestFlight`_ via App Store.
2. Join our `TestFlight beta program`_ via your iPhone (it works best if you click the link directly on your iPhone), and follow the steps shown in there, to add Concordium ID to TestFlight.
3. Open the TestFlight app on your iPhone and install Concordium ID.

.. _concordium-node-and-client-download:

.. _concordium-node-and-client:

Concordium Node and Client
==========================

Concordium node and client software for `Open Testnet v4`_:

""", nodeSoftwareLinks , """

Download and extract the archive into the ``Documents`` folder of your home
directory. Please make sure to unpack the archive into this folder as this is
necessary to run the `Concordium client`_.

Read more about the Concordium `node`_ and `client`_ software in our reference
guides.

.. _requirements-1:

Requirements
------------

Below are the recommended requirements for running a node. Weaker hardware might
still run the node, however you might experience problems.

**Linux**

Desktop, server or laptop hardware running a recent version of 64-bit linux
with:

-  30 Gigabytes of free disk space
-  4 gigabytes of ram

**Windows**

Desktop, server or laptop hardware running 64-bit Windows 10 pro or Windows 10
home version 2004 with:

-  30 Gigabytes of free disk space
-  8 gigabytes of ram

**Mac**

Desktop, server or laptop hardware running a recent version of Mac OS with:

-  30 Gigabytes of free disk space
-  8 gigabytes of ram

You need a broadband connection to run our node. It is preferable to run the
node continuously. If you use a laptop please be aware that sleep can cause
problems with the docker container used to run the node. Refer to our known
problems list at https://developer.concordium.com/testnet/docs/troubleshooting

