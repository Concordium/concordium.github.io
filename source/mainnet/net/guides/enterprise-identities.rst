.. _enterprise-identities:

============================
Enterprise identity creation
============================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

What is an enterprise identity
==============================

An enterprise identity is for enterprises that need an identity and accounts on the Concordium blockchain, but don't want that identity to belong to a specific person. Enterprise identities are therefore issued with documents that identify the enterprise and not an individual. Enterprise identities are only relevant for a few enterprises such as crypto exchanges.

You can't use the Desktop Wallet or the Mobile Wallet to create an enterprise identity. You need to use a set of command-line tools, and you need to communicate directly with the identity provider (currently Notabene). This guide describes how you create an enterprise identity.

Create an enterprise identity
=============================

#. Download the ``enterprise-identities`` tools for your platform.

   - `Tools for Linux <https://distribution.concordium.software/tools/linux/enterprise-identities.tar.gz>`_

   - `Tools for Windows <https://distribution.concordium.software/tools/windows/signed/enterprise-identities.zip>`_

   - `Tools for MacOS <https://distribution.concordium.software/tools/macos/signed/enterprise-identities.zip>`_

#. Extract the files in the bundle to the same location on your computer. The bundle contains the following files:

   - ``user_cli`` (tool)

   - ``cryptographic-parameters.json``

   - ``ars.json``

   - ``ip-info.json`` (public keys of the identity provider Notabene)

#. Download ``concordium-client`` for your platform.

   - `Linux <https://distribution.concordium.software/tools/linux/concordium-client_3.0.4-0>`_

   - `Windows <https://distribution.concordium.software/tools/windows/signed/concordium-client_3.0.4-0.exe>`_

   - `MacOS <https://distribution.concordium.software/tools/macos/signed/concordium-client_3.0.4-0.zip>`_


#. To generate a request for an identity object, follow the `generate request instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#generate-a-request-for-the-identity-objectinstructions>`_. Email the ``request.json`` output file to ania@notabene.id. Store the auxiliary output securely.

#. To verify your identity towards Notabene, follow the `entity verification instructions <https://notaben.notion.site/Entity-verification-2e5cc78149af4677bfe2c27ca5625731>`_. When the identity has been verified successfully, Notabene will notify you by email, and they will send you an identity object file named ``id-object.json``.

#. To create additional accounts from the identity object returned by Notabene, follow the `create accounts instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#create-accounts-from-an-identity-object>`_. You must deploy the credential.json output file to the chain exactly as described. If you don't, the account will not be created. You need access to a node to complete this step. Store the auxiliary output securely.

Support for enterprise identity creation
========================================

If you experience issues with steps 1, 2,3,4, or 6, please contact Concordium’s technical support via support@concordium.software.com.

If you experience issues with step 5, identity verification, please contact Notabene via ania@notabene.id.
