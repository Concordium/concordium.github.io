.. _mint-xfer-ft:

========================================
Mint, transfer, and burn fungible tokens
========================================

Now you are ready to mint your new tokens. Before minting, look at the minting parameters in the JSON file below. You need to specify the owner, then the token data following with its tokenID, metadata location on IPFS with the URL that you got when you uploaded the metadata file, hash value of it, amount to be minted, and maximum supply number. In this case, it uses tokenID ``01``, and mint ``110`` tokens initially with a maximum supply of 1000.

.. code-block:: JSON

    {
        "owner": {
            "Account": [
                "3AiAikC2v4H3Rv4L58oHvdX5N8LJoarsQwN3G7oNS7BoFsmt7N"
            ]
        },
        "tokens": [
            [
                "01",
                [
                    {
                        "url": "https://gateway.pinata.cloud/ipfs/QmZBrF6HuoN12HyAznyk7gwFpnefooDbfxq3JeKTWToL1W",
                        "hash": "c00a140ea66af09c343083c0e7ccc77d5e0670d90014569798801bffad637d15"
                    },
                    {
                        "amount": "110",
                        "max_supply": "1000"
                    }
                ]
            ]
        ]
    }

Run the command below to call the contract ``mint()`` function. Remember that this is using the Concordium testnet node; if you are using your own node your command needs to be changed.

.. code-block:: console

    concordium-client contract update <YOUR-CONTRACT-INSTANCE> --entrypoint mint --parameter-json ../nft-artifacts/mint-params.json --sender <YOUR-ACCOUNT> --energy 6000 --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com --secure

Now you have successfully minted your fungible tokens.

.. image:: images/mint-tokens.png
    :width: 100%
    :alt: dark console screen with result of running the command above

Check the state to see the balance, circulating supply, and maximum supply. Run the command below to invoke the ``view()`` function. Note that you don't have to call the schema file since it is already embedded.

.. code-block:: console

    concordium-client contract invoke <YOUR-CONTRACT-INSTANCE> --entrypoint view --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com --secure

.. image:: images/invoke-after-mint.png
    :width: 100%
    :alt: dark console screen with result of running the command above

Try to mint 501 more. You will receive an error because the maximum supply is 1000. It would be OK if you want to mint, at most, 500. But set the mint amount to 501 to test it.

.. image:: images/error-maxsupplyreached.png
    :width: 100%
    :alt: dark console screen with result of running the command above

Unsurprisingly, you are not allowed to mint and it throws a custom error which was created by you in the ``MaxSupplyReached`` in your error enum.

Mint 500 more by adjusting the JSON file accordingly.

.. image:: images/mint-more.png
    :width: 100%
    :alt: dark console screen with result of running the command above

This was successful. Check the state once more by calling the ``view()`` function.

.. image:: images/invoke-after-mint-more.png
    :width: 100%
    :alt: dark console screen with result of running the command above

Transfer tokens
===============

Now you will test transferring some tokens to another account and checking the balances and the max/circulating supplies. Create a JSON file like the one below to set the transfer parameters. Transfer **11** tokens with the ID **01** to an account.

.. code-block:: JSON

    [
        {
            "token_id": "01",
            "amount": "11",
            "from": {
                "Account": [
                    "3AiAikC2v4H3Rv4L58oHvdX5N8LJoarsQwN3G7oNS7BoFsmt7N"
                ]
            },
            "to": {
                "Account": [
                    "4W59joBQavXqbyiKbPgBS7teZHDtEXsqx2BFUvPo2AzY3yPzeH"
                ]
            },
            "data": ""
        }
    ]

Run the command below to invoke the transfer. Remember that this is using the Concordium testnet node; if you are using your own node your command needs to be changed.

.. code-block:: console

    concordium-client contract update <YOUR-INDEX> --entrypoint transfer --parameter-json ../token-artifacts/transfer.json --sender <YOUR-ACCOUNT> --energy 6000 --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com --secure

Check the state one more time to see that the transfer worked as expected.

.. image:: images/invoke-after-xfer.png
    :width: 100%
    :alt: dark console screen with result of running the command above

Burn tokens
===========

Finally, burn some tokens. The amount will be deducted from the owner's account when the tokens are burned.

Before burning, check the state to see who owns what amount.

.. image:: images/check-before-burn.png
    :width: 100%
    :alt: dark console screen with result of running contract invoke

Create a JSON file for getting burn params like the one below. You need the token ID and the amount to be burned.

.. code-block:: JSON

    {
        "token_id": "01",
        "amount": "200"
    }

Burn 200 tokens from your first account. To do that, run the command below to call the ``burn()`` function.

.. code-block:: console

    concordium-client contract update <YOUR-INDEX> --entrypoint burn --parameter-json ../token-artifacts/burn.json --sender <YOUR-ACCOUNT> --energy 6000 --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com --secure

.. image:: images/burn-tokens.png
    :width: 100%
    :alt: dark console screen with result of running the command above

And finally, check the state. You have successfully burned 200 tokens from the first account. In this case the circulating supply was not updated intentionally when someone burned a token; if you need that in your use case you will need to update the state’s ``burn`` function.

.. image:: images/invoke-after-burn.png
    :width: 100%
    :alt: dark console screen with result of running the command above
