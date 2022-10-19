.. _mint-transfer:

=========================
Mint and transfer the NFT
=========================

Now, you are ready to call the mint function. First, place the ``setupCliUpdateContract`` function below in your cli.ts file. In this step, you serialize the parameters taken from the terminal that are going to be input for your update function.

.. code-block:: console

    function setupCliUpdateContract(cli: commander.Command, updateContractAction: string) {
        return (
        cli
        .command(updateContractAction)
        .description(`${updateContractAction} an NFT`)
        .requiredOption("--params <params>", "params file path", (f) => fs.realpathSync(f))
        .requiredOption(
            "--schema <schema>",
            "Contract schema file path",
            (f) => fs.realpathSync(f),
            "../dist/smart-contract/schema.bin",
        )
        .requiredOption("--energy <energy>", "Maximum Contract Execution Energy", (v) => BigInt(v), 6000n)
        .requiredOption("--contract <contract>", "Contract name", "CIS2-NFT")
        .requiredOption("--function <function>", "Contract function name to call", updateContractAction)
        .requiredOption("--index <index>", "Contract Address Index", (v) => BigInt(v))
        .requiredOption("--sub-index <subIndex>", "Contract Address Sub Index", (v) => BigInt(v), 0n)
        // Sender Account Args
        .requiredOption("--sender <sender>", "Sender Account Address. This should be the owner of the Contract")
        .requiredOption("--sign-key <signKey>", "Account Signing Key")
        // Node Client args
        .requiredOption("--auth-token <authToken>", "Concordium Node Auth Token", "rpcadmin")
        .requiredOption("--ip <ip>", "Concordium Node IP", "127.0.0.1")
        .requiredOption("--port <port>", "Concordum Node Port", (v) => parseInt(v), 10001)
        .requiredOption("--timeout <timeout>", "Concordium Node request timeout", (v) => parseInt(v), 15000)
        .action(
            async (args: UpdateContractArgs) =>
            await sendAccountTransaction(
                args,
                args.sender,
                args.signKey,
                // Payload
                {
                parameter: serializeUpdateContractParameters(
                    args.contract,
                    args.function,
                    JSON.parse(readFileSync(args.params).toString()),
                    Buffer.from(readFileSync(args.schema)),
                    SchemaVersion.V2,
                ),
                amount: new GtuAmount(0n),
                contractAddress: {
                    index: BigInt(args.index),
                    subindex: BigInt(args.subIndex),
                },
                receiveName: `${args.contract}.${args.function}`,
                maxContractExecutionEnergy: BigInt(args.energy),
                } as UpdateContractPayload,
                // Transaction Type
                AccountTransactionType.UpdateSmartContractInstance,
            ),
        )
    );
    }
    // Mint
    setupCliUpdateContract(cli, "mint");

You need to set the mint parameters in mint-params.json file as described below. The account address is the wallet address. You are going to generate one copy of it since it’s a non-fungible token. The URL is the IPFS link of the metadata file and hash is the SHA-256 output of the link.

.. image:: ./images/mint-parameters.png
   :width: 100 %

Run the command below with the index value you got previously, your account address and the signKey from your decrypted wallet.json file.

.. code-block:: console

    ts-node ./src/cli.ts mint --params ../nft-artifacts/mint-params.json --schema ../dist/smart-contract/schema.bin --index <YOUR INDEX> --sender <ACCOUNT-ADDRESS> --sign-key <SIGN-KEY>

The result should look similar to the following:

.. image:: ./images/mint-result.png
    :width: 100%

Check the dashboard again to see the transaction.

.. image:: ./images/mint-result-db.png
    :width: 100%

You have just minted your first NFT on Concordium successfully! Now you will want to get the metadata on-chain and see what you have in there. In order to do that, use ``setupCliInvokeContract`` and use view functions. Since with this function you are not going to change the state of the blockchain, there will be no transaction fee. This is almost the same with the ``setupCliUpdateContract`` except there are no internal state changes in the smart contract. View functions read the current state of the contract.

It expects the IPFS URL that you added in the metadata-json file and the hash value you added in the mint function. You can also store another value on-chain in addition to the URL. In order to get the details on-chain run the following command.

.. code-block:: console

    ts-node src/cli.ts view --index <YOUR INDEX> --sender <YOUR ADDRESS>

.. image:: ./images/mint-metadata.png
    :width: 100%

Now you can visit the URL you stored on-chain in a web browser.

If you stored the metadata successfully in IPFS you should see something similar to what is shown below.

.. image:: .images/mint-metadata-result.png
    :width: 100%

If you are implementing a project it is a good idea to run your own IPFS node and pin the data to guarantee that at least one participant has it.

Transfer function
=================

Before you transfer the NFT, you should change the sender account and receiver account in the  ``../nft-artifacts/transfer-params.json`` file. You don't have to do it like this, I just decided to read all these values from a JSON file because it’s easier to understand and follow otherwise it can get quickly messy. So make sure you made the adjustments of addresses accordingly like the one I shared below. I created another account on my mobile wallet (and this time I made some changes to my data like revealing my nationality and country of residence. Which is one of the strongest parts of Concordium, explore it!) and will transfer this token to that.

.. image:: .images/transfer-values.png
    :width: 100%

Now you can transfer it with the following command. You will check the balance of your account and the other wallet in the following steps. One reminder, you should be the owner of it to be able to transfer it, so try not to get confused in this step. The original minter account should be in the **from** key’s value and the receiver will be located in the **to** key’s value.

.. code-block:: console

    ts-node ./src/cli.ts transfer --params ../nft-artifacts/transfer-params.json --schema ../dist/smart-contract/schema.bin --index <YOUR INDEX> --sender <ACCOUNT-ADDRESS> --sign-key <SIGN-KEY>

The transfer is successfully completed. 

.. image:: .images/transfer-success.png
    :width: 100%

.. image:: .images/transfer-success-db.png
    :width: 100%

Check the state of the token once more with the view function.

.. code-block:: console

    ts-node src/cli.ts view --index <YOUR INDEX> --sender <YOUR ADDRESS> --schema ../cis2-nft

As you can see the second account is now the owner of the asset and you can see the previous owners. 

.. image:: .images/transfer-view.png
    :width: 100%

As a final step,  try to transfer it with your first account again. This should not be possible! The transaction is shown below.

.. image:: .images/retransfer.png
    :width: 100%

As expected, it can not be transferred because the owner is changed. The second account is the owner and you need to use its signKey and address in order to transfer it.

.. image:: .images/retransfer-reject.png
    :width: 100%

You have now completed part one of the NFT minting tutorial.
