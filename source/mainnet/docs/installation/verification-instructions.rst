.. include:: ../../variables.rst
.. _verification-instructions:

=========================
Verification instructions
=========================

To find instructions on how to verify the integrity of the file you have downloaded, navigate to the respective section that outlines the steps needed for that specific file.

.. _verify-docker-image:

Verify Concordium Node Docker Image
===================================

The Docker images are signed with Sigstore Cosign. To verify
the signature run ``cosign verify`` with the ``certificate-oidc-issuer`` and ``certificate-identity`` as specified (important):

.. code-block:: console
    :substitutions:

    $cosign verify concordium/mainnet-node:|mainnet-node-version| \ 
        --certificate-identity=https://github.com/Concordium/concordium-node/.github/workflows/release.yaml@refs/heads/main \
        --certificate-oidc-issuer=https://token.actions.githubusercontent.com

This verifies that the image was build and signed by Concordium. You can replace the image with ``testnet-node`` and the tag with the tag you want to run.

To make sure the image is not modified between you check the signature and you use the image,
you should first get the image hash and then verify and run the image by referencing the hash:

.. code-block:: console
    :substitutions:

    $crane digest concordium/mainnet-node:|mainnet-node-version|
    $cosign verify concordium/mainnet-node@sha256:6a4f8c65345ddea7db82431b76c8eadb09b9d0ebd93d4825870704e878d81f1a \ 
        --certificate-identity=https://github.com/Concordium/concordium-node/.github/workflows/release.yaml@refs/heads/main \
        --certificate-oidc-issuer=https://token.actions.githubusercontent.com

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
