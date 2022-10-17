.. include:: ../../variables.rst
.. _company-identities:

============================
Company identity creation
============================

A company identity is for companies that need an identity and accounts on the Concordium blockchain, but don't want that identity to belong to a specific person. Company identities are therefore issued with documents that identify the company and not an individual. Company identities are only relevant for a few companies, such as crypto exchanges.

You can't use the Desktop Wallet, |mw-gen2|, or |mw-gen1| to create a company identity. You need to use a set of command-line tools, and you need to communicate directly with the identity provider (currently Notabene). `This page <https://notaben.notion.site/Entity-verification-next-1b4fbcd8e32042e1ac3b0018a3cc27bc>`_ describes Notabene's process, including recovery of company identities.

The tabs below describe how to create a company identity. Note that the process differs for testnet and mainnet.

.. tabs::

   .. tab:: Mainnet

      #. Download the tools for your platform.

         - `Tools for Linux <https://distribution.concordium.software/tools/linux/enterprise-identities-v2.tar.gz>`__
            - SHA256 checksum of the download: ``fd3620f3f3e2e9540b262ae68b8273c59816fbaa12d495629b07555c65bab4a2``

         - `Tools for Windows <https://distribution.concordium.software/tools/windows/signed/enterprise-identities-v2.zip>`__
            - SHA256 checksum of the download: ``38433e51efa95121ee4e25a15552dd02905193e3de5d3976e4b067bd9cb46096``

         - `Tools for MacOS <https://distribution.concordium.software/tools/macos/signed/enterprise-identities-v2.zip>`__
            - SHA256 checksum of the download: ``1bb44659a66dcd8b60fed5f43d53d9575e8e35710ac785a87a9c161c51b1acc7``

      #. Extract the files in the bundle to the same location on your computer. The bundle contains the following files:

         - ``user_cli`` (tool)

         - ``cryptographic-parameters.json``

         - ``ars.json``

         - ``ip-info.json`` (public keys of the identity provider Notabene)

      #. Download ``concordium-client`` for your platform.  See :ref:`Downloads<concordium-node-and-client-download>` to get the file and checksum.

      #. To generate a request for an identity object, follow the `generate request instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#generate-a-version-1-request-for-the-version-1-identity-object>`__. Email the ``request.json`` output file to ania@notabene.id. Store the auxiliary output securely.

      #. To verify your identity towards Notabene, follow the `entity verification instructions <https://notaben.notion.site/Entity-verification-next-1b4fbcd8e32042e1ac3b0018a3cc27bc>`_. When the identity has been verified successfully, Notabene will notify you by email, and they will send you an identity object file named ``id-object.json``.

      #. To create additional accounts from the identity object returned by Notabene, follow the `create accounts instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#create-accounts-from-a-version-1-identity-object>`__. You must deploy the credential.json output file to the chain exactly as described. If you don't, the account will not be created. You need access to a node to complete this step. Store the auxiliary output securely.

      #. To recover your identity object (e.g. if you lost it), follow the `recovery of identity instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#recovery-of-identity>`__. Email the ``recovery-request.json`` output file to ania@notabene.id. When the recovery request has been validated successfully, Notabene will notify you by email, and they will return the identity object named ``id-object.json`` that you lost. With the recovered identity object, you can then recreate your account keys, if needed.

      If you experience issues with steps 1, 2, 3, 4, 6 or 7, please contact Concordium’s technical support via support@concordium.software. If you experience issues with step 5, identity verification, please contact Notabene via ania@notabene.id.


   .. tab:: Testnet

      #. Download the tools for your platform.

         - `Tools for Linux <https://distribution.concordium.software/tools/linux/enterprise-identities-v2.tar.gz>`__
            - SHA256 checksum of the download: ``fd3620f3f3e2e9540b262ae68b8273c59816fbaa12d495629b07555c65bab4a2``

         - `Tools for Windows <https://distribution.concordium.software/tools/windows/signed/enterprise-identities-v2.zip>`__
            - SHA256 checksum of the download: ``38433e51efa95121ee4e25a15552dd02905193e3de5d3976e4b067bd9cb46096``

         - `Tools for MacOS <https://distribution.concordium.software/tools/macos/signed/enterprise-identities-v2.zip>`__
            - SHA256 checksum of the download: ``1bb44659a66dcd8b60fed5f43d53d9575e8e35710ac785a87a9c161c51b1acc7``

      #. Download the testnet-specific `configuration files <https://github.com/Concordium/concordium.github.io/files/8196573/enterprise-identities-dry-run.zip>`__.

      #. Extract the files in the bundle to the same location on your computer. The bundle contains the following files:

         - ``cryptographic-parameters-testnet.json``

         - ``ars-testnet.json``

         - ``ip-info-testnet.json`` (public keys of the identity provider)

      #. Download ``concordium-client`` for your platform. See :ref:`Downloads<concordium-node-and-client-download-testnet>` to get the file and checksum.

      #. To generate a request for an identity object, follow the `generate request instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#generate-a-version-1-request-for-the-version-1-identity-object>`__. Email the ``request.json`` output file to support@concordium.software with the subject line "Test company identity". Store the auxiliary output securely.

      #. When the identity has been verified successfully, Concordium will notify you by email, and they will send you an identity object file named ``id-object.json``.

      #. To create accounts from the identity object returned by Concordium, follow the `create accounts instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#create-accounts-from-a-version-1-identity-object>`__. You must deploy the credential.json output file to the chain exactly as described. If you don't, the account will not be created. You need access to a node to complete this step. Store the auxiliary output securely.

      #. To recover your identity object (e.g. if you lost it), follow the `recovery of identity instructions <https://github.com/Concordium/concordium-base/blob/main/rust-bins/docs/user-cli.md#recovery-of-identity>`__. Email the ``recovery-request.json`` output file to support@concordium.software with the subject line "Recover company identity".

      #. When the recovery request has been validated successfully, Concordium will notify you by email, and they will return the identity object named ``id-object.json`` that you lost. With the recovered identity object, you can then recreate your account keys, if needed.

      Once you have created accounts, you can request CCDs for testing. To request CCDs for testing, run the following command:

      ``curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/3GXM6cEuAwEA47EEtFpax9PLhMWchWmkaPmNZmW1kbDaWaKBxV`` where you replace 3GXM6cEuAwEA47EEtFpax9PLhMWchWmkaPmNZmW1kbDaWaKBxV with the account address that should receive the CCDs.

      If you experience issues, please contact Concordium’s technical support via support@concordium.software.
