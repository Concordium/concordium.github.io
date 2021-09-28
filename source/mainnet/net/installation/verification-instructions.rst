.. include:: ../../variables.rst
.. _verification-instructions:

=========================
Verification instructions
=========================

.. contents::
   :local:
   :backlinks: none
   :depth: 2

To find instructions on how to verify the integrity of the file you have downloaded, navigate to the respective section, which will outline the steps needed for that specific file.

Concordium Desktop Wallet
=========================

.. _verification-cdw-windows:

Windows
-------

.. include:: cdw-verification-instructions/cdw-windows.rst

.. _verification-cdw-mac:

MacOS
-----

.. include:: cdw-verification-instructions/cdw-macos.rst

Linux
-----

.. _verification-cdw-appimage:

AppImage
^^^^^^^^

.. include:: cdw-verification-instructions/cdw-appimage.rst

.. _verification-cdw-deb:

Debain package
^^^^^^^^^^^^^^

.. include:: cdw-verification-instructions/cdw-deb.rst

.. _verification-cdw-rpm:

RPM
^^^

.. include:: cdw-verification-instructions/cdw-rpm.rst

Automatic updates
-----------------

When the desktop wallet updates itself, it performs the necessary steps to verify both the checksum and signature of the downloaded update. If verification is unsuccessful, the update is rejected.

Concordium Client
=================

.. _verification-client-windows:

Windows
-------

.. include:: client-verification-instructions/client-windows.rst

.. _verification-client-mac:

MacOS
-----

.. include:: client-verification-instructions/client-mac.rst

.. _verification-client-linux:

Linux
-----

.. include:: client-verification-instructions/client-linux.rst

.. _verification-node-debian-package:

Node Debian package
===================

**Verify checksum of download**

In a terminal:

#. Navigate to the download.
#. Then paste the first line of the following block into the terminal.
#. Verify that the output matches the second line in the block.

.. code-block:: console
    :substitutions:

    $sha256sum |node-deb-package|
    |node-deb-package-checksum|

.. _verification-mainnet-genesis-block:

Mainnet genesis block
=====================

**Verify checksum of download**

In a terminal:

#. Navigate to the download.
#. Then paste the first line of the following block into the terminal.
#. Verify that the output matches the second line in the block.

**Windows**

.. code-block:: console
    :substitutions:

    $Get-FileHash |mainnet-genesis-block| -Algorithm SHA256
    |mainnet-genesis-block-checksum|

**MacOS**

.. code-block:: console
    :substitutions:

    $shasum -a 256 |mainnet-genesis-block|
    |mainnet-genesis-block-checksum|

**Linux**

.. code-block:: console
    :substitutions:

    $sha256sum |mainnet-genesis-block|
    |mainnet-genesis-block-checksum|
