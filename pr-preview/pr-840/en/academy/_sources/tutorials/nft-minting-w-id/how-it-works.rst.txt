.. _nft-w-id-demo:
.. include:: ../../../mainnet/variables.rst

============
How it works
============

In this last section, you will learn how to run the dApp to mint an NFT.

Verifier back end
=================

First you need to run the verifier backend. Your dApp will be communicating with it to get the statement, challenge and post the proof and get the signature back. It expects parameters from the terminal but you are free to use all of them from a JSON file. We will use a mixture by giving the keys (verify and sign) as a parameter from the terminal and the statement from a JSON. In order to create a custom statement, you can check read about :ref:`how to create proofs<create-proofs>`. For this tutorial scenario, you will use age proofs to be able to verify if a person is older than 18 or not, but you can also check if the person is from a certain country or not.

.. code-block:: console

    [
        {
            "type": "AttributeInRange",
            "attributeTag": "dob",
            "lower": "19000327",
            "upper": "20050327"
        }
    ]

When you have the statement JSON file, run the application inside of your executable path. If you are using your own node change the node IP to localhost; if you are using the testnet node keep it as below.

.. code-block:: console

    ./<Executable-Name> --node http://node.testnet.concordium.com --port 8100 --log-level info --verify-key <YOUR-VERIFY-KEY> --sign-key <YOUR-SIGN-KEY> --statement "$(<PATH-TO-YOUR-STATEMENT/statement.json)"

.. image:: ../../images/adv-how-it-works1.png
    :alt: visual studio code window in dark mode with statement age.json file open

Run the dApp and request a proof
================================

In the mint-ui directory start the dApp with the following command:

.. code-block:: console

    yarn start

You will create a new instance of the cis2-multi contract and try to mint an NFT with another account. Click **DEPLOY NEW** to create a new instance. As you notice, it sends the ``verify_key`` as an initiation parameter. The contract index is 4168,0.

.. image:: ../../images/adv-how-it-works2.png
    :alt: browser tab open running localhost with web wallet extension visible

Click **GET SIGNATURE** and accept the request. Wait for the proof verification. If it’s verified you have a signature signed by the private key (``signKey``) given when running the application.

.. image:: ../../images/adv-how-it-works3.png
    :alt: browser tab open running localhost with web wallet extension visible with proof request

If everything goes well, you have a signature similar to the one below.

.. image:: ../../images/adv-how-it-works4.png
    :alt: browser tab open running localhost with signature shown

You are almost there. Since you now have the signature, you will be able to mint a token because you have proven that you are older than 18! Provide the metadata and the contract index to mint a token!

.. image:: ../../images/adv-how-it-works5.png
    :alt: browser tab open running localhost with web wallet extension visible

When the transaction is finalized, you will have an alert notifying that minting is successful!

.. image:: ../../images/adv-how-it-works6.png
    :alt: browser tab open running localhost with mint success message shown
