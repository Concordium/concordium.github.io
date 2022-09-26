.. include:: ../../variables.rst
.. _company-identities:

============================
Company identity creation
============================

A company identity is for companies that need an identity and accounts on the Concordium blockchain, but don't want that identity to belong to a specific person. Company identities are therefore issued with documents that identify the company and not an individual. Company identities are only relevant for a few companies, such as crypto exchanges.

You can't use the Desktop Wallet, |mw-gen2|, or |mw-gen1| to create a company identity. You need to use a set of command-line tools, and you need to communicate directly with the identity provider (currently Notabene). The tabs below describe how you create a company identity. Note that the process differs for testnet and mainnet.

.. tabs::

   .. tab:: Mainnet

      #. Download the tools for your platform.

         - `Tools for Linux <https://distribution.concordium.software/tools/linux/enterprise-identities.tar.gz>`_
            - SHA256 checksum of the download: ``b9981c542f46e92dd05e8b3e9bf46684e9de364bd331cd6fa8db98ed99b4df84``

         - `Tools for Windows <https://distribution.concordium.software/tools/windows/signed/enterprise-identities.zip>`_
            - SHA256 checksum of the download: ``4a13eec29b6c7fc8214555c6b13e431c20df449bfd11e1a2f26b6a6e91a03957``

         - `Tools for MacOS <https://distribution.concordium.software/tools/macos/signed/enterprise-identities.zip>`_
            - SHA256 checksum of the download: ``242a0ff19f84c91ec0c1a3c7696718eee61f144a73a3700d8969f3531384ad6e``

      #. Extract the files in the bundle to the same location on your computer. The bundle contains the following files:

         - ``user_cli`` (tool)

         - ``cryptographic-parameters.json``

         - ``ars.json``

         - ``ip-info.json`` (public keys of the identity provider Notabene)

      #. Download ``concordium-client`` for your platform.

         - `Linux <https://distribution.concordium.software/tools/linux/concordium-client_3.0.4-0>`_
            - SHA256 checksum of the download: ``6ea2674ebae5dafd9de3c730db536fc0675627b6b867f05a944a1a60dd5ceca8``

         - `Windows <https://distribution.concordium.software/tools/windows/signed/concordium-client_3.0.4-0.exe>`_
            - SHA256 checksum of the download: ``f6cafdd472b02ead818cc0f463a4cf40053dda33a824a2dfed816744a48a579c``

         - `MacOS <https://distribution.concordium.software/tools/macos/signed/concordium-client_3.0.4-0.zip>`_
            - SHA256 checksum of the download: ``3173cbe28373d9a787978b236aefdaa20d129496b61e545ed7369d8922e10d05``

      #. To generate a request for an identity object, follow the `generate request instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#generate-a-version-0-request-for-the-version-0-identity-object>`_. Email the ``request.json`` output file to ania@notabene.id. Store the auxiliary output securely.

      #. To verify your identity towards Notabene, follow the `entity verification instructions <https://notaben.notion.site/Entity-verification-2e5cc78149af4677bfe2c27ca5625731>`_. When the identity has been verified successfully, Notabene will notify you by email, and they will send you an identity object file named ``id-object.json``.

      #. To create additional accounts from the identity object returned by Notabene, follow the `create accounts instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#create-accounts-from-a-version-0-identity-object>`_. You must deploy the credential.json output file to the chain exactly as described. If you don't, the account will not be created. You need access to a node to complete this step. Store the auxiliary output securely.

      If you experience issues with steps 1, 2, 3, 4, or 6, please contact Concordium’s technical support via support@concordium.software. If you experience issues with step 5, identity verification, please contact Notabene via ania@notabene.id.


   .. tab:: Testnet

      #. Download the tools for your platform.

         - `Tools for Linux <https://distribution.concordium.software/tools/linux/enterprise-identities.tar.gz>`_
            - SHA256 checksum of the download: ``b9981c542f46e92dd05e8b3e9bf46684e9de364bd331cd6fa8db98ed99b4df84``

         - `Tools for Windows <https://distribution.concordium.software/tools/windows/signed/enterprise-identities.zip>`_
            - SHA256 checksum of the download: ``4a13eec29b6c7fc8214555c6b13e431c20df449bfd11e1a2f26b6a6e91a03957``

         - `Tools for MacOS <https://distribution.concordium.software/tools/macos/signed/enterprise-identities.zip>`_
            - SHA256 checksum of the download: ``242a0ff19f84c91ec0c1a3c7696718eee61f144a73a3700d8969f3531384ad6e``

      #. Download the testnet-specific `configuration files <https://github.com/Concordium/concordium.github.io/files/8196573/enterprise-identities-dry-run.zip>`_.

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

      #. To generate a request for an identity object, follow the `generate request instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#generate-a-version-0-request-for-the-version-0-identity-object>`_. Email the ``request.json`` output file to support@concordium.software with the subject line "Test company identity". Store the auxiliary output securely.

      #. When the identity has been verified successfully, Concordium will notify you by email, and they will send you an identity object file named ``id-object.json``. Concordium also creates the initial account.

      #. To create additional accounts from the identity object returned by Concordium, follow the `create accounts instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#create-accounts-from-a-version-0-identity-object>`_. You must deploy the credential.json output file to the chain exactly as described. If you don't, the account will not be created. You need access to a node to complete this step. Store the auxiliary output securely.

      Once you have created accounts, you can request CCDs for testing. To request CCDs for testing, run the following command:

      ``curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/3GXM6cEuAwEA47EEtFpax9PLhMWchWmkaPmNZmW1kbDaWaKBxV`` where you replace 3GXM6cEuAwEA47EEtFpax9PLhMWchWmkaPmNZmW1kbDaWaKBxV with the account address that should receive the CCDs.

      If you experience issues, please contact Concordium’s technical support via support@concordium.software.
