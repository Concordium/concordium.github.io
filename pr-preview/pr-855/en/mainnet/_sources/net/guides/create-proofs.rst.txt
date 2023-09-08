.. include:: ../../variables.rst
.. _create-proofs:

=============
Create proofs
=============

A :ref:`verifier<glossary-verifier>` is a business or use-case that provides a service contingent on the holder providing information about themselves using :ref:`verifiable credentials<glossary-verifiable-credential>` or :ref:`account credentials<glossary-account-credential>` they have. A verifier will typically consist of two components:

1. A dApp that interacts with the wallet and requests a :ref:`verifiable presentation<glossary-verifiable-presentation>` from the user.
2. A back end that will verify the provided presentations, and provide the required service if successful.

The |bw| allows verifiers to request verifiable presentations using dApps or services that the user meets some requirement, such as proof the user is over a certain age, or resides in a specific set of countries or area. The wallet owner chooses whether to prove these :ref:`attributes<glossary-attribute>` to the dApp or service. The dApp or service constructs a list of :ref:`statements<glossary-statement>` to request a corresponding list of :ref:`zero knowledge proofs<glossary-zero-knowledge-proof>` of the attribute(s) necessary without revealing anything beyond the truth of the statement. Presentations contain the zero-knowledge proofs.

The dApp or service can also request that attributes are revealed. The wallet owner can choose whether they want to reveal these attributes to the dApp or service. The verifiable credentials themselves never leave the holder's wallet, only the information requested by the verifier does.

The verification of presentations consists of two parts.

1. The cryptographic verification of zero-knowledge proofs, and checks that the verifiable credential is valid, which involves checks in smart contracts.
2. The checking whether the properties attested to are the ones required. This is the custom business logic of the verifier.

Note that the presentation can combine requirements for account credentials and verifiable credentials.

The diagram below shows the interaction between the Rust server/backend, the dApp, and the wallet.

.. image:: ../images/browser-wallet/proof-concept.png
    :width: 100%

You have a server or backend that contains the :ref:`challenge<glossary-challenge>` and the statement.

1. The dApp requests the :ref:`challenge<glossary-challenge>` from the server/backend.
2. The server/backend returns the challenge to the dApp. The dApp uses it when sending the :ref:`statements<glossary-statement>`. Your dApp can request the statement from the server or it can contain the statement. Note however that it is the backend that ultimately checks proofs, and so it must be aware of the statement.
3. The dApp sends a request for proof for the given challenge and statement to the wallet.
4. The wallet sends proof back to the dApp (if accepted by the user).
5. The dApp sends the proof to the backend which verifies it with respect to the challenge it has issued.

General rules
=============

For the dApp or service developer there are some general rules about proofs that you have to follow.

- There is no limit to the amount of attributes that can be revealed.
- An attribute can only be used in one proof at a time.

The identity provider issued attributes that can be revealed from :ref:`account credentials<glossary-account-credential>` are:

- First name
- Last name
- Sex
- Date of birth
- Country of residence
- Country of nationality
- ID document type
- ID document number
- ID document issuer
- ID valid from
- ID valid to
- National ID number
- Tax ID number

You can also build statements that include proofs for attributes in :ref:`verifiable credentials<glossary-verifiable-credential>`. In this case, there is not a fixed list of attributes; it depends on the :ref:`issuer's needs<web3id-issuer>`.

You can find more information about building proof statements in the `Concordium node SDK js repository <https://github.com/Concordium/concordium-node-sdk-js/tree/main/packages/common#identity-proofs>`_.

Asking a user to reveal attributes
==================================

You can construct a reveal statement in which the wallet owner must consent to reveal one or more specific attributes.

In the example below, the wallet owner's country of residence is requested to be revealed.

.. code-block:: console

    [
      {
        "type": "RevealAttribute",
        "attributeTag": "countryOfResidence"
      }
    ]

Unless it is absolutely critical to know a specific attribute, it is good policy to use the proof types below instead to determine a user's eligibility for your app instead of requesting that they reveal information to you.

Range proofs
============

:ref:`Range proofs<glossary-range-proofs>` allow you to present a range of values to the user's wallet to determine whether the user meets the required attribute. For example, you might want to know if a user over 18 years of age but under 30 years of age. You can present this as a range proof to be verified by the wallet.

Relevant attributes for range proofs are:

- Date of birth
- ID valid to
- ID valid from

.. Note::

  Age proofs are a common abstraction on date of birth proofs. There are `age helper functions in the SDK <https://github.com/Concordium/concordium-node-sdk-js/tree/main/packages/common#minimum-age>`_ to aid in constructing these.

Structure a range proof
-----------------------

In the example below, you see a range proof constructed to check that wallet owner is between 25 and 65 years old (as of 2022-12-12).

.. code-block:: console

    {
      "challenge": "a54bc4116655d247fa625d98f768d4d81e55ffe26ac6bab259bad5895d49ae00",
      "statement": [
        {
          "type": "AttributeInRange",
          "attributeTag": "dob",
          "lower": "19571212",
          "upper": "19971212"
        }
      ]
    }

Membership proofs
=================

:ref:`Membership proofs<glossary-membership-proof>` allow you to present a list of values to the user's wallet to determine whether the user has one of the required attributes in the list. For example, you might want to know if a user is a resident of the EU. You can present this as a membership proof to be verified by the wallet.

Relevant attributes for membership proofs are:

- Country of residence
- Country of nationality
- Identity document type
- Identity document issuer

.. Note::

  Country of nationality has `helper functions in the SDK <https://github.com/Concordium/concordium-node-sdk-js/tree/main/packages/common#eu-membership>`_ to aid in constructing statements.

Structure a membership proof
----------------------------

In the example below, the proof checks that the wallet owner is a citizen of one of the Nordic countries (Finland, Denmark, Sweden, Norway, or Iceland).

.. code-block:: console

    {
      "challenge": "6c7d69b121d4ce829392d9f2b16395708a458f6183caa20e9074e7283e377418",
      "statement": [
        {
          "type": "AttributeInSet",
          "attributeTag": "nationality",
          "set": [
            "DK",
            "FI",
            "IS",
            "NO",
            "SE"
          ]
        }
      ]
    }

Membership proofs can also prove that a user does NOT have an attribute or attributes in a set, in other words a :ref:`non-membership proof<glossary-non-membership-proof>`. For example, if you need to know that a user is **not** a resident of a country that is subject to trade sanctions to use your service, you might request a proof that the wallet owner does not reside in the relevant countries.

For example, the statement below asks if the wallet owner is a citizen of China or North Korea.

.. code-block:: console

    {
        "challenge": "4de5faf3d68c09e3e76fd8d82ce251c1ff0e49fdcc2661a2f875db35eba02f4d",
        "statement": [
          {
            "type": "AttributeNotInSet",
            "attributeTag": "nationality",
            "set": [
              "CN",
              "KP"
            ]
          }
        ]
    }

.. Note::

    Country codes to use for residence and nationality proofs are the `ISO-3166-1 alpha-2 codes <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>`_.

.. _verifier-tool:

Tool to verify credentials
==========================

Concordium has developed a verifier tool which is a self-contained service that handles the retrieval of credentials from the chain, and the cryptographic verification of presentations.
The tool is generic and the API exposed is minimal.
The verifier has a single POST endpoint and is meant to be used by another service, such as a dApp.

The response to the request will be 200 together with a JSON body that contains the request (i.e., challenge and statement for which the presentation is valid) together with the timestamp and block in which the verification took place. In case of an invalid request the error will be in the 4** range, either 404 if credentials cannot be found, or 400 for invalid proofs or otherwise malformed requests.

You can choose whether you want to run the hosted Concordium verifier for Mainnet (link) or `Testnet <https://web3id-verifier.testnet.concordium.com/v0/verify>`__, or whether you want to create your own verifier tool.

To create your own verifier tool, you can either build it with ``cargo`` or run it in Docker. The `readme file <https://github.com/Concordium/concordium-web3id/tree/main/services/web3id-verifier>`__ provides instructions for both methods.

An example response from the verifier tool is:

.. code-block:: json

   {
     "block": "c4fa02aa6940750e6692639092406f32282b4d414d0aab66222e328caabbd411",
     "blockTime": "2023-06-01T14:15:47.250Z",
     "challenge": "dbd9887999b7ce48236f86fa35d29dd7a8335287b422b186e11ec6d1d02b3291",
     "credentialStatements": [
       {
         "id": "did:ccd:testnet:sci:4718:0/credentialEntry/2eec102b173118dda466411fc7df88093788a34c3e2a4b0a8891f5c671a9d106",
         "statement": [
           {
             "attributeTag": 0,
             "set": [
               "bar",
               "baz",
               "foo",
               "qux"
             ],
             "type": "AttributeInSet"
           },
           {
             "attributeTag": 3,
             "lower": 0,
             "type": "AttributeInRange",
             "upper": 17
           }
         ],
         "type": [
           "ConcordiumVerifiableCredential",
           "MyCredential",
           "VerifiableCredential"
         ]
       }
     ]
   }

Example dApp
============

Concordium provides the following example demo app and repository for inspriation:

- `Demo dApp <https://gallery.testnet.concordium.com/>`_
- `Repository <https://github.com/Concordium/concordium-dapp-examples/tree/main/gallery>`_

The app is a gallery that requires the user to be over a certain minimum age and an EU resident to view some content.

Follow :ref:`this link<gallery>`, if you want to learn how to build your own dApp for ID authentication.
