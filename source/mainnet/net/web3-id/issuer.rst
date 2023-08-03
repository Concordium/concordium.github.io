.. _web3id-issuer:
.. include:: ../../variables.rst

===============
Web3 ID issuers
===============

Web3 ID includes many types of credentials that are not identity credentials. This might be employment history, certifications from educational courses or diplomas, membership in loyalty clubs or rewards programs, and more. Because of this anyone can become an issuer!

How to become an issuer
=======================

The issuer needs a front end and a back end. The front end contains the interface and the back end has, among other things, two smart contracts that control how verifiable credentials are registered and stored for recovery purposes.

Example storage contract module and instance on testnet:
- Storage contract module
  - 06439d3c48c5c40b8110a36a1da8d9e6485d798f031c1b4d39e619194f7824eb
  - transaction hash that deployed it
    c2574679374d92c510ae24c60b24e9401a1428da9b3e100f28a30e7368dbac81

- Instance
  - {"index":4732,"subindex":0}
  - transaction hash that instantiated it
    e86374b654942b79075c3aae99c5f8e8541245af462d44da571d8b9efb12677a

Example registry contract on testnet. New issuers can be created from this.
Registry module
- 20c145580805cc1215bf11cb1472fa61ae61bd74d4a06a6e3265ba206c9fce27
- Transaction hash that deployed it e8105b23b1b4721cf14014b9e43a35fdcca5d1d405a85362abfc2190cbe4aa83

To create a new issuer based on the Concordium credential registry contract run the following:

.. code-block:: console

    cargo run -- new-issuer --metadata-url http://issuer-metadata-url.com --wallet /path/to/wallet.export --credential-type Foo --schema-ref http://foo-schema-url.com

Where ``new-issuer`` is the issuer name, ``metadata-url`` is the URL for the issuer, ``wallet`` is the path to the wallet export file, ``credential type`` is the credential to be issued, and ``schema-ref`` is the URL to the schema for the credential type.

Issuer front end
----------------

The front end has two flows:

- An issuer can deploy a new smart contract instance of the credential_registry_smart_contract.
- This issuer can issue new credentials by invoking the corresponding function in the credential_registry_smart_contract.

.. Note::

    Currently, only the |bw| is supported.

Prerequisites
^^^^^^^^^^^^^

-   |bw| must be installed in chromium web browser and the Concordium testnet needs to be selected.

Run the front end
^^^^^^^^^^^^^^^^^

Clone the repo:

.. code-block:: console

    git clone git@github.com:Concordium/concordium-web3id.git

Navigate into this folder:

.. code-block:: console

    cd ./issuer-front-end

Run ``yarn install`` in this folder.

To start the front end locally, do the following:

#. Run ``yarn build`` in this folder.

#. Run ``yarn start`` in this folder.

#. Open URL logged in console (typically http://127.0.0.1:8080).

To enable hot-reload (useful for development), do the following instead:

#. Run ``yarn watch`` in this folder in a terminal.

#. Run ``yarn start`` in this folder in another terminal.

#. Open URL logged in console (typically http://127.0.0.1:8080).

Use yarn (on Unix/macOS systems)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Some of the node modules have Windows-type line endings (\r\n), instead of Unix line endings (\n), which causes problems when using an old yarn package manager.

If you see an error message similar to this when executing ``yarn start``, then you've run into the problem:

.. code-block:: console

    env: node\r: No such file or directory

Use ``npm install`` instead of ``yarn install`` in the above command, or use an up-to-date `yarn` version (non-classic `yarn` version). `npm` (newer non-classic `yarn` versions) will correct the line ending.

Additional information can be found `here <https://techtalkbook.com/env-noder-no-such-file-or-directory/>`__.

Build and run the Docker image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To build the Docker image, run the following command **from the root of the repository**:

.. code-block:: console

    docker build -f issuer-front-end/Dockerfile -t issuer-front-end:$PROJECT_VERSION .

For example:

.. code-block:: console

    docker build -f issuer-front-end/Dockerfile -t issuer-front-end:3.0.0 .

To run the docker image run the following command:

.. code-block:: console

    docker run -it -d -p 8080:80 --name web issuer-front-end:$PROJECT_VERSION

For example:

.. code-block:: console

    docker run -it -d -p 8080:80 --name web issuer-front-end:3.0.0

Open http://127.0.0.1:8080 in your browser.

Concordium Issuer tool
----------------------

To make it easier to become an issuer, Concordium provides a generic issuer for Web3ID credentials. It exposes a REST API for registering credentials, and handles the correct formatting of credentials to submit to the chain, and communication with the node.

The issuer has the following endpoints:

- POST v0/issue

- GET v0/status/:transactionHash

The status endpoint returns the minimal status of a transaction.

If the transaction is not present it returns the 404 status code. If the return code is 200, then the response is a JSON body with the following fields:

- status (required) either "finalized" or "notFinalized".

- block (optional) and present if status is "finalized". The block hash in which the transaction is finalized.

- success (optional) and present if status is "finalized". A boolean indicating whether the transaction was successful.

An example response is

.. code-block:: json

      {
    "status": "finalized",
    "block": "075a91a1b371a0bb532f357cef3fb126da3580640ddc18963e6f11f9573655cf",
    "success": true
    }

The issue endpoint accepts a JSON body with the request to issue the credential and if successful returns a transaction hash that may be queried for status.

An example request is

.. code-block:: json

    {
    "credential": {
        "commitment": "83bf8600f4f9ad3912767a9e923152678963f096b6781d28b4aac354ae6a13dca78a3b0f110ed981482820ccb436817d",
        "credential_type": "Foo",
        "holder_id": "21a36ad44379339abf0b33816d59129bef9a91e33c90d72ace6504206e26ea76",
        "holder_revocable": true,
        "metadata_url": {
        "hash": null,
        "url": "http:://credential-metadaata.ccd"
        },
        "valid_from": "2023-06-04T18:46:10.218+00:00",
        "valid_until": null
    },
    "data": {
        "contract_address": {
        "index": 4732,
        "subindex": 0
        },
        "encrypted_credential": "98c1ae9a177c217ed8f2ed005800c7c3dffb2d72fa9ae3f10d00525854687f62fab966a123a22cfccbc65ac768f86257ef005594e08cf2da3f6c61d1b06ed3423342a841321a08d5e47f9403457b1f00bd19b6c0d1df2cdb0e4a76a5d458dd9e41fdb3f803e2",
        "timestamp": "2023-06-04T20:46:10+00:00",
        "version": 0
    },
    "signature": "ce6369076343021107f4ad770ba39a762238dd20530053d115ae2ca87d547eef2536d86d34baa6bb954ea2f38c6b7f0f3103e5111159cae03a9ec8ad0929f10c"
    }

Managing credentials
====================

    - Revoke
