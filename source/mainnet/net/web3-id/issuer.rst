.. _web3id-issuer:
.. include:: ../../variables.rst

===============
Web3 ID issuers
===============

Web3 ID includes many types of credentials that are not identity credentials. This might be employment history, certifications from educational courses or diplomas, membership in loyalty clubs or rewards programs, and more. Because of this anyone can become an issuer!

How to become an issuer
=======================

An issuer needs to have the following components.

1. Some way of identifying users to whom the credentials will be issued, e.g., an existing database of users.
2. JSON schemas and metadata for credentials. These are used by the wallet to display and style the credential. This might be a logo, a background color, how the attributes will appear in the credential (e.g., date format, title), and so on.
3. A smart contract where credential lifetime is managed, together with its metadata such as expiry time.
4. A dApp where the user will request credentials with the help of the wallet.
5. A back end which will issue credentials, which involves registering the credential in the smart contract, and returning it to the holder's wallet.

Concordium Issuer tool
----------------------

To make it easier to become an issuer, Concordium provides a generic issuer for Web3ID credentials. It exposes a REST API for registering credentials, and handles the correct formatting of credentials to submit to the chain, and communication with the node.

Concordium provides Docker images to make it simple to run the issuer tool, but the issuer themselves have to run it since issuing credentials requires access to private keys of the issuer, and payment of transaction fees.

The issuer has the following endpoints:

- ``POST v0/issue``

- ``GET v0/status/:transactionHash``

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

The issuer endpoint accepts a JSON body with the request to issue the credential and if successful returns a transaction hash that may be queried for status.

JSON Schemas for requests and responses are available at (link).

.. todo

An example request is:

.. code-block:: json

   {
     "credentialSubject": {
       "attributes": {
         "Another attribute": "World",
         "Attribute 0": 1234,
         "Some attribute": "Hello"
       },
       "id": "did:ccd:testnet:pkc:c162a48f58448234da9f3848dc3bc5fd7f2aa0e4b7e5e15654876365f8b86c1b"
     },
     "validFrom": "1970-01-01T00:00:00.017Z",
     "validUntil": "1970-01-01T00:00:12.345Z",
     "holderRevocable": true,
     "metadataUrl": {
       "url": "http://link/to/schema",
       "hash": null
     }
   }

``validUntil`` makes it possible for creditals to expire. ``validFrom`` allows you to set a start date and time for the credential, such as in the case of a backstage pass for a concert.

An example response would be:

.. code-block:: json

   {
     "txHash": "179de883eb0e748b05dcb3a3632302cea56d0f410df86a1cc4558f3274c1cf3e",
     "credential": {
       "credentialSchema": {
         "id": "http://link/to/schema",
         "type": "JsonSchema2023"
       },
       "credentialSubject": {
         "attributes": {
           "Another attribute": "World",
           "Attribute 0": 1234,
           "Some attribute": "Hello"
         },
         "id": "did:ccd:testnet:pkc:c162a48f58448234da9f3848dc3bc5fd7f2aa0e4b7e5e15654876365f8b86c1b"
       },
       "id": "did:ccd:testnet:sci:3:17/credentialEntry/c162a48f58448234da9f3848dc3bc5fd7f2aa0e4b7e5e15654876365f8b86c1b",
       "issuer": "did:ccd:testnet:sci:3:17/issuer/",
       "proof": {
         "proofPurpose": "assertionMethod",
         "proofValue": "facdb03a1d054a55808875864abc85cc41d2c32290929bbb361a710b0fda5e7f333ac33abdb1b5f0ebb5662335c34410b8e96ca6730df7eb100f814f223d0b07",
         "type": "Ed25519Signature2020",
         "verificationMethod": "did:ccd:testnet:pkc:7f9a19691d30963a13477da2e0e4ee5a78c61000eb36867141b519f003256f9b"
       },
       "randomness": {
         "Another attribute": "6490531ea308a2e661f62c4678e00bb87c9f602be7a053e910f8e44609bc5adb",
         "Attribute 0": "29b439aa58324b2be5c5a3ceb7ba23b48397ba1d1d9081869f56ff1c96a2b32f",
         "Some attribute": "2f5e0279c8ff6bcb004024dd4ba4f3e29d30ec91e3e4583855c2dae35ae83f8d"
       },
       "type": [
         "ConcordiumVerifiableCredential",
         "UniversityDegreeCredential",
         "VerifiableCredential"
       ],
       "validFrom": "1970-01-01T00:00:00.017Z",
       "validUntil": "1970-01-01T00:00:12.345Z"
     }
   }



Revoke

Some text here.

Credential metadata controls how the credential is displayed in the wallet. An example is:

.. code-block:: json

    {
      "title": "Mixed credential",
      "logo": {
        "url": "https://avatars.gibhubusercontent.com/u/39614219?s=200&v=4"
      },
      "backgroundColor": "#ffaa00"
    }

You can update the metadata for verifiable credentials, such as title, image, colors, or localization, but the credential information cannot be edited.
