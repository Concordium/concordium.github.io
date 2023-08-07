.. include:: ../../variables.rst
.. _IP address: https://en.wikipedia.org/wiki/IP_address
.. _port number: https://en.wikipedia.org/wiki/Port_(computer_networking)
.. _company-identities:

============================
Company identity creation
============================

A company identity is for companies that need an identity and accounts on the Concordium blockchain, but don't want that identity to belong to a specific person. Company identities are therefore issued with documents that identify the company and not an individual. Company identities are only relevant for a few companies, such as crypto exchanges.

You can't use the Desktop Wallet, |bw|, |mw-gen2|, or |mw-gen1| to create a company identity. You need to use a set of command-line tools, and you need to communicate directly with the identity provider (currently Notabene). `This page <https://notaben.notion.site/Entity-verification-next-1b4fbcd8e32042e1ac3b0018a3cc27bc>`_ describes Notabene's process, including recovery of company identities.

The information below describes how to create a company identity, how to create accounts with a company identity, and how to recover a company identity. Note that the process differs for testnet and mainnet.

Create an identity request
==========================

.. dropdown:: Mainnet

   #. Download the tools for your platform.

      - `Tools for Linux <https://distribution.concordium.software/tools/linux/enterprise-identities-v2.tar.gz>`__
         - SHA256 checksum of the download: ``fd3620f3f3e2e9540b262ae68b8273c59816fbaa12d495629b07555c65bab4a2``

      - `Tools for Windows <https://distribution.concordium.software/tools/windows/signed/enterprise-identities-v2.zip>`__
         - SHA256 checksum of the download: ``38433e51efa95121ee4e25a15552dd02905193e3de5d3976e4b067bd9cb46096``

      - `Tools for MacOS <https://distribution.concordium.software/tools/macos/signed/enterprise-identities-v2.zip>`__
         - SHA256 checksum of the download: ``6f457a05dc2f3345b48fd7d9d387e80b46d37ceaa6ebeadd759b6de4e634a4ca``

   #. Extract the files in the bundle to the same location on your computer. The bundle contains the following files:

      - ``user_cli`` (tool)

      - ``cryptographic-parameters.json``

      - ``ars.json``

      - ``ip-info.json`` (public keys of the identity provider Notabene)

      The ``user_cli`` tool supports three modes: the ``generate-request-v1`` mode, the ``create-credential-v1`` mode and ``recover-identity``. The ``generate-request-v1`` generates the request for the identity object that is to be sent to the identity provider. In the ``create-credential-v1`` mode the tool requires the identity object returned by the identity provider and generates a credential that can be sent to the chain to create an account. The ``recover-identity`` request generates an identity recovery request to be sent to the identity provider.

   #. Download ``concordium-client`` for your platform.  See :ref:`Downloads<concordium-node-and-client-download-testnet>` to get the file and checksum.

   #. To generate a request for an identity object, use the following command, modifying the paths as appropriate.

      .. code-block:: console

         user_cli generate-request-v1 --cryptographic-parameters cryptographic-parameters.json \
                          --ars ars.json \
                          --ip-info ip-info.json \
                          --request-out request.json # request to send to the identity provider

      The above command will ask for some additional input. You have to choose anonymity revokers and revocation threshold. Use arrow keys to navigate through the lists and the space key to select and deselect list entries. Select whether the identity shall be used for Mainnet or Testnet. Afterwards, 24 BIP-39 will be generated and shown; write down the words and type them in again. This is your secret recovery phrase.

      The command outputs the ``request.json`` file which contains the request that should be sent to ania@notabene.id. Store the auxiliary output securely.

   #. To verify your identity towards Notabene, follow the `entity verification instructions <https://notaben.notion.site/Entity-verification-next-1b4fbcd8e32042e1ac3b0018a3cc27bc>`_. When the identity has been verified successfully, Notabene will notify you by email, and they will send you an identity object file named ``id-object.json``. If you experience any issues with this step, identity verification, please contact Notabene via ania@notabene.id.

   If you experience issues with steps 1, 2, 3, or 4 please contact Concordium’s technical support via support@concordium.software.


.. dropdown:: Testnet

   #. Download the tools for your platform.

      - `Tools for Linux <https://distribution.concordium.software/tools/linux/enterprise-identities-v2.tar.gz>`__
         - SHA256 checksum of the download: ``fd3620f3f3e2e9540b262ae68b8273c59816fbaa12d495629b07555c65bab4a2``

      - `Tools for Windows <https://distribution.concordium.software/tools/windows/signed/enterprise-identities-v2.zip>`__
         - SHA256 checksum of the download: ``38433e51efa95121ee4e25a15552dd02905193e3de5d3976e4b067bd9cb46096``

      - `Tools for MacOS <https://distribution.concordium.software/tools/macos/signed/enterprise-identities-v2.zip>`__
         - SHA256 checksum of the download: ``6f457a05dc2f3345b48fd7d9d387e80b46d37ceaa6ebeadd759b6de4e634a4ca``

   #. Extract the files in the bundle to the same location on your computer. The bundle contains the following files:

      - ``user_cli`` (tool)

      - ``cryptographic-parameters-testnet.json``

      - ``ars-testnet.json``

      - ``ip-info-testnet.json`` (public keys of the identity provider)

      The ``user_cli`` tool supports three modes: the ``generate-request-v1`` mode, the ``create-credential-v1`` mode and ``recover-identity``. The ``generate-request-v1`` generates the request for the identity object that is to be sent to the identity provider. In the ``create-credential-v1`` mode the tool requires the identity object returned by the identity provider and generates a credential that can be sent to the chain to create an account. The ``recover-identity`` request generates an identity recovery request to be sent to the identity provider.

   #. Download ``concordium-client`` for your platform. See :ref:`Downloads<concordium-node-and-client-download-testnet>` to get the file and checksum.

   #. To generate a request for an identity object, use the following command, modifying the paths as appropriate.

      .. code-block:: console

         user_cli generate-request-v1 --cryptographic-parameters cryptographic-parameters-testnet.json \
                          --ars ars-testnet.json \
                          --ip-info ip-info-testnet.json \
                          --request-out request.json # request to send to the identity provider

      The above command will ask for some additional input. You have to choose anonymity revokers and revocation threshold. Use arrow keys to navigate through the lists and the space key to select and deselect list entries. Select whether the identity shall be used for Mainnet or Testnet. Afterwards, 24 BIP-39 will be generated and shown; write down the words and type them in again. You need these when creating credentials.

      The command outputs the ``request.json`` file which contains the request that should be sent to the identity provider.

   #. Email the ``request.json`` output file to support@concordium.software with the subject line "Test company identity". The request should be sent to the identity provider through a trusted channel, together with any other required identity data. Store the auxiliary output securely.

   #. When the identity has been verified successfully, Concordium will notify you by email, and they will send you an identity object file named ``id-object.json``. Use this identity object file when creating accounts.

   If you experience issues, please contact Concordium’s technical support via support@concordium.software.

Create accounts
===============

After obtaining the ``id-object.json`` identity object from the identity provider you can create additional accounts on the chain. Accounts are created by deploying credentials. The user_cli tool can only be used to create credentials. To deploy them to the chain, thus creating accounts, you need to use concordium-client and access to a node.

.. dropdown:: Mainnet

   #. To create additional accounts from the identity object returned by Notabene, run the following command:

      .. code-block:: console

         user_cli create-credential-v1 --cryptographic-parameters cryptographic-parameters.json \
                           --ars ars.json \
                           --ip-info ip-info.json \
                           --id-object id-object.json \
                           --keys-out account-keys.json \
                           --credential-out credential.json

      You will have to select whether to reveal the LEI, which was optional when creating the identity object. Use the space key to select and deselect list entries. You will also be asked whether to create credential for Mainnet or Testnet. Afterwards you will be asked to type in the 24 BIP-39 words from earlier.

      The command outputs the following files:

      - ``account-keys.json`` which contains account keys of the account that will be created by the credential.
      - ``credential.json`` which contains the payload of the account creation transaction. This must be sent to the chain, otherwise the account will not be created. By default this must be sent to the chain within 15 minutes. A larger or shorter message expiry may be set with --message-expiry flag to the command. Note that the credential number must be unique for each respective ``id-object.json``. Duplicate credential numbers for the same ``id-object.json`` will be rejected when submitting to chain.

   .. Note::

      You must deploy the ``credential.json`` output file to the chain exactly as described below. If you don't, the account will not be created. You need access to a node to complete this step. Store the auxiliary output securely.

   2. To create the account on the chain make sure you have access to a node, then run the following command with concordium-client:

      .. code-block:: console

         concordium-client transaction deploy-credential credential.json

      where ``credential.json`` is the file obtained in the previous step. If the node runs on a different machine or in a custom setup, the options ``--grpc-ip`` and ``--grpc-port`` can be used to set the `IP address`_ and `port number`_ where the node is accessible.

   If you experience issues, please contact Concordium’s technical support via support@concordium.software.

.. dropdown:: Testnet

   #. To create additional accounts from the identity object returned by Concordium, run the following command:

      .. code-block:: console

         user_cli create-credential-v1 --cryptographic-parameters cryptographic-parameters-testnet.json \
                           --ars ars-testnet.json \
                           --ip-info ip-info-testnet.json \
                           --id-object id-object.json \
                           --keys-out account-keys.json \
                           --credential-out credential.json

      You will have to select whether to reveal the LEI, which was optional when creating the identity object. Use the space key to select and deselect list entries. You will also be asked whether to create credential for Mainnet or Testnet. Afterwards you will be asked to type in the 24 BIP-39 words from earlier.

      The command outputs the following files:

      - ``account-keys.json`` which contains account keys of the account that will be created by the credential.
      - ``credential.json`` which contains the payload of the account creation transaction. This must be sent to the chain, otherwise the account will not be created. By default this must be sent to the chain within 15 minutes. A larger or shorter message expiry may be set with --message-expiry flag to the command. Note that the credential number must be unique for each respective ``id-object.json``. Duplicate credential numbers for the same ``id-object.json`` will be rejected when submitting to chain.

   .. Note::

      You must deploy the ``credential.json`` output file to the chain exactly as described below. If you don't, the account will not be created. You need access to a node to complete this step. Store the auxiliary output securely.

   2. To create the account on the chain make sure you have access to a node, then run the following command with ``concordium-client``:

      .. code-block:: console

         concordium-client transaction deploy-credential credential.json

      where ``credential.json`` is the file obtained in the previous step. If the node runs on a different machine or in a custom setup, the options ``--grpc-ip`` and ``--grpc-port`` can be used to set the `IP address`_ and `port number`_ where the node is accessible.

   Once you have created accounts, you can request CCDs for testing. To request CCDs for testing, run the following command:

   ``curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/3GXM6cEuAwEA47EEtFpax9PLhMWchWmkaPmNZmW1kbDaWaKBxV`` where you replace 3GXM6cEuAwEA47EEtFpax9PLhMWchWmkaPmNZmW1kbDaWaKBxV with the account address that should receive the CCDs.

   If you experience issues, please contact Concordium’s technical support via support@concordium.software.

Recovery
========

If the identity object used to create credentials is lost, it can be recovered from the identity provider by generating a recovery request using the 24 words used when the identity was originally created. Note that the process differs between mainnet and testnet.

.. dropdown:: Mainnet

   #. To recover your identity object (e.g. if you lost it), run the following command, modifying the paths as appropriate:

      .. code-block:: console

        user_cli recover-identity --cryptographic-parameters cryptographic-parameters.json \
                          --ip-info ip-info.json \
                          --request-out recovery-request.json # recovery request to send to the identity provider

   #. Email the ``recovery-request.json`` output file to ania@notabene.id. The request should be sent to the identity provider through a trusted channel, together with any other required identity data. When the recovery request has been validated successfully, Notabene will notify you by email, and they will return the identity object named ``id-object.json`` that you lost. With the recovered identity object, you can then recreate your account keys(account-keys.json) by running ``user_cli create-credential-v1``.

   If you experience issues, please contact Concordium’s technical support via support@concordium.software.

.. dropdown:: Testnet

   #. To recover your identity object (e.g. if you lost it), run the following command, modifying the paths as appropriate:

      .. code-block:: console

        user_cli recover-identity --cryptographic-parameters cryptographic-parameters-testnet.json \
                          --ip-info ip-info-testnet.json \
                          --request-out recovery-request.json # recovery request to send to the identity provider

      Email the ``recovery-request.json`` output file to support@concordium.software with the subject line "Recover company identity".

   #. When the recovery request has been validated successfully, Concordium will notify you by email, and they will return the identity object named ``id-object.json`` that you lost. With the recovered identity object, you can then recreate your account keys(account-keys.json) by running ``user_cli create-credential-v1``.

   If you experience issues, please contact Concordium’s technical support via support@concordium.software.

Import created accounts into ``concordium-client``
==================================================

The account keys are primarily meant for clients to integrate into their key management solution and their software, e.g., an exchange integrating their trading platform with the Concordium chain.

However if the ``account-keys.json`` file is not encrypted it can be imported into ``concordium-client`` with the command:

.. code-block:: console

   concordium-client config account import account-keys.json --format=genesis --name my-account

where the ``--name`` option is optional, and if given, will name the account according to the given value ("my-account" in the example above).

If the account-keys.json file is encrypted then it must first be decrypted. This can be done with the :ref:`utils tool<downloads-auxiliary-tools>`.

The initial account keys cannot be directly imported into ``concordium-client``.

Format of the key files
-----------------------

Both initial account keys and subsequent account keys are stored in JSON files. The unencrypted data is a JSON record with a number of fields. For sending transactions the fields that are relevant are:

- ``accountKeys`` contains the account keys. It has the following format:

   .. code-block:: json

      "accountKeys": {
         "keys": {
            "0": {
            "keys": {
               "0": {
                  "signKey": "1e16c2e2302023fc5235c60734981a2427004f95b6ace50a1d8a205ee9e5f9e7",
                  "verifyKey": "7e9983b292cf5e5822b48dbed1c2d498aca97c097f7116511f7dcf6187d218c4"
               }
            },
            "threshold": 1
            }
         },
         "threshold": 1
      }

   which contains the account keys. In this example the account has a single credential with index 0, and that credential has a single key with index 0. The private key is 1e16c2e2302023fc5235c60734981a2427004f95b6ace50a1d8a205ee9e5f9e7 and its public key is 7e9983b292cf5e5822b48dbed1c2d498aca97c097f7116511f7dcf6187d218c4.

- ``address`` is the address of the account, e.g.,

   .. code-block:: json

      "address": "2xe6cXEzBJZ8KXSYwb5uXJdHPZfAstbSZjfdAqsoF7VEq6q7AP"

- keys for encrypted transfers. These are only needed for sending and receiving encrypted transfers.

   .. code-block:: json

      "encryptionPublicKey": "b14cbfe44a02c6b1f78711176d5f437295367aa4f2a8c2551ee10d25a03adc69d61a332a058971919dad7312e1fc94c58a2f44906bda77f42bc3503b53b604a851737829899ffd4895abc0184e2da448e673f5e87367991d4a453a7f562df974",
      "encryptionSecretKey": "b14cbfe44a02c6b1f78711176d5f437295367aa4f2a8c2551ee10d25a03adc69d61a332a058971919dad7312e1fc94c557da780304fba3b831439243201396e8c83daa83da1acc385a7a28519011e6da"
