.. _web3id-verifier:
.. include:: ../../variables.rst

=================
Web3 ID verifiers
=================

:ref:`Zero-knowledge proofs<glossary-zero-knowledge-proof>` are used to verify all types of credentials. These requests to verify credentials come from a dApp and are sent to a wallet for the user to verify.

The proof can combine :ref:`account credentials<glossary-account-credentials>` and :ref:`verifiable credentials<glossary-verifiable-credential>`.

Tool to verify credentials
==========================

Concordium has developed a Web3 ID verifier tool which is a self-contained service that handles the retrieval of credentials from the chain, and the cryptographic verification of presentations. The tool is generic and the API exposed is minimal. The verifier has a single POST endpoint and is meant to be used by another service, such as a dApp.

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
