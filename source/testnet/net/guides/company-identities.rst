.. _company-identities:

============================
Company identity creation
============================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

What is a company identity
==============================

A company identity is for companies that need an identity and accounts on the Concordium blockchain, but don't want that identity to belong to a specific person. Company identities are therefore issued with documents that identify the company and not an individual. Company identities are only relevant for a few companies, such as crypto exchanges.

You can't use the Desktop Wallet or the Mobile Wallet to create a company identity. You need to use a set of command-line tools, and you need to contact Concordium Technical Support. This guide describes how you create a company identity.

.. Note::

   The process below is valid only for **testnet**.

Create a company identity
=========================

#. Download the `tools <https://github.com/Concordium/concordium.github.io/files/8196573/enterprise-identities-dry-run.zip>`_.

#. Extract the files in the bundle to the same location on your computer. The bundle contains the following files:

   - ``cryptographic-parameters-testnet.json``

   - ``ars-testnet.json``

   - ``ip-info-testnet.json`` (public keys of the identity provider)

#. Download ``concordium-client`` for your platform.

   - `Linux <https://distribution.concordium.software/tools/linux/concordium-client_3.0.4-0>`_
      - SHA256 checksum of the download: ``6ea2674ebae5dafd9de3c730db536fc0675627b6b867f05a944a1a60dd5ceca8``

   - `Windows <https://distribution.concordium.software/tools/windows/signed/concordium-client_3.0.4-0.exe>`_
      - SHA256 checksum of the download: ``f6cafdd472b02ead818cc0f463a4cf40053dda33a824a2dfed816744a48a579c``

   - `MacOS <https://distribution.concordium.software/tools/macos/signed/concordium-client_3.0.4-0.zip>`_
      - SHA256 checksum of the download: ``3173cbe28373d9a787978b236aefdaa20d129496b61e545ed7369d8922e10d05``


#. To generate a request for an identity object, follow the `generate request instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#generate-a-request-for-the-identity-objectinstructions>`_. Email the ``request.json`` output file to support@concordium.software with the subject line "Test company identity". Store the auxiliary output securely.

#. When the identity has been verified successfully, Concordium will notify you by email, and they will send you an identity object file named ``id-object.json``. Concordium also creates the initial account.

#. To create additional accounts from the identity object returned by Concordium, follow the `create accounts instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#create-accounts-from-an-identity-object>`_. You must deploy the credential.json output file to the chain exactly as described. If you don't, the account will not be created. You need access to a node to complete this step. Store the auxiliary output securely.

Support for company identity creation
========================================

If you experience issues, please contact Concordium’s technical support via support@concordium.software.
