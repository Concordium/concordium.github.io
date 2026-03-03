.. _web3id-issuer:
.. include:: ../../../variables.rst

.. meta::
    :description lang=en:
        Anyone can become an issuer of verifiable credentials for Web3 ID. Concordium provides an easy issuer tool to start the process.

===============
Web3 ID issuers
===============

Web3 ID includes many types of credentials that are not identity credentials. This might be employment history, certifications from educational courses or diplomas, membership in loyalty clubs or rewards programs, and more. Because of this anyone can become an :term:`issuer`!

How to become an issuer
=======================

An issuer needs to have the following components.

1. Some way of identifying users to whom the credentials will be issued, e.g., an existing database of users.
2. JSON schemas and metadata for credentials. These are used by the wallet to display and style the credential. This might be a logo, a background color, how the attributes will appear in the credential (e.g., date format, title), and so on. The `Concordium Web3 ID Issuer Frontend <https://web3id-issuer-onboarding.mainnet.concordium.software/>`__ helps with setting up your metadata which you then should upload to a public URL. The Concordium Web3 Issuer Frontend works on both mainnet and testnet.
3. A smart contract where credential lifetime is managed, together with its metadata such as expiry time. The `Concordium Web3 ID Issuer Frontend <https://web3id-issuer-onboarding.mainnet.concordium.software/>`__ helps with setting up your credential registry contract.
4. A dApp where the user will request credentials with the help of the wallet.
5. A backend which will issue credentials, which involves registering the credential in the smart contract, and returning it to the holder's wallet.

To make it easier to become an issuer, you can use the `Concordium Web3 ID Issuer Frontend <https://web3id-issuer-onboarding.mainnet.concordium.software/>`__. This tool walks you through steps two and three when becoming an issuer. The Concordium Web3 Issuer Frontend works on both mainnet and testnet.

Concordium Issuer tool
----------------------

Concordium also provides a generic issuer for Web3ID credentials. It exposes a REST API for registering credentials, and handles the correct formatting of credentials to submit to the chain, and communication with the node.

Concordium provides Docker images to make it simple to run the issuer tool, but the issuer themselves have to run it since issuing credentials requires access to private keys of the issuer, and payment of transaction fees.

The issuer has the following endpoints:

- ``POST v0/issue``

- ``GET v0/status/:transactionHash``

The status endpoint returns the minimal status of a transaction.

If the transaction is not present it returns the 404 status code. If the return code is 200, then the response is a JSON body with the following fields:

- status (required) either "finalized" or "notFinalized".

- block (optional) and present if status is "finalized". The block hash in which the transaction is finalized.

- success (optional) and present if status is "finalized". A boolean indicating whether the transaction was successful.

An example response is:

.. code-block:: json

  {
    "status": "finalized",
    "block": "075a91a1b371a0bb532f357cef3fb126da3580640ddc18963e6f11f9573655cf",
    "success": true
  }

The issuer endpoint accepts a JSON body with the request to issue the credential and if successful returns a transaction hash that may be queried for status.

.. todo::

  JSON Schemas for requests and responses are available at (link).

Credential metadata controls how the credential is displayed in the wallet. An example is:

.. code-block:: json

    {
      "title": "Mixed credential",
      "logo": {
        "url": "https://avatars.gibhubusercontent.com/u/39614219?s=200&v=4"
      },
      "backgroundColor": "#ffaa00"
    }

You can update the metadata for verifiable credentials, such as title, image, colors, or localization, but the credential attributes cannot be edited once the smart contract is deployed.
