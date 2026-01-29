.. include:: ../../variables.rst
.. _verification-instructions:

=========================
Verification instructions
=========================

To find instructions on how to verify the integrity of the file you have downloaded, navigate to the respective section that outlines the steps needed for that specific file.

Concordium Desktop Wallet
=========================

Linux
-----

.. _verification-cdw-appimage:

AppImage
^^^^^^^^

.. include:: cdw-verification-instructions/cdw-appimage.rst

.. _verification-cdw-deb:

Debian package
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

.. _verification-client-linux:

Linux
-----

.. include:: client-verification-instructions/client-linux.rst

Cargo Concordium
================

.. _verification-cargo-linux:

Linux
-----

.. include:: cargo-verification-instructions/cargo-linux.rst

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

**macOS**

.. code-block:: console
    :substitutions:

    $shasum -a 256 |mainnet-genesis-block|
    |mainnet-genesis-block-checksum|

**Linux**

.. code-block:: console
    :substitutions:

    $sha256sum |mainnet-genesis-block|
    |mainnet-genesis-block-checksum|
