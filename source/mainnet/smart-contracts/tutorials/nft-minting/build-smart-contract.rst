.. _build-smart-contract:

========================
Build the Smart contract
========================

Now, in order to deploy our contract you need to change directory (with “cd” command) to the cis2-nft folder. Then run the commands below to build and deploy your contract. For the sake of simplicity, in this tutorial you are going to use the sample smart contract shared by Concordium in this repository.

.. code-block:: console

    cd cis2-nft
    mkdir -p ../dist/smart-contract
    cargo concordium build --out ../dist/smart-contract/module.wasm --schema-out ../dist/smart-contract/schema.bin

After these steps, you should be able to see something like the above. We are almost ready to mint our first NFT on Concordium to do that we need to run a local node, which in this tutorial where we use a Mac is a Docker image in the repository. To start it run the command below. Docker file configurations can be found in the docker-compose.yml file as described below. Dont forget the set a name for your node with the parameter CONCORDIUM_COLLECTOR_NODE_NAME. The docker-compose configuration is inspired by the docker docs from the Concordium website.

This runs a Docker image of a node. This step takes some time potentially hours based on your device configuration, because your node is freshly started and needs to recover all the previous blocks. In the near future, hopefully, there will be a tool that will eliminate this step and allows you to connect via a URL to a node. Like the Infura. Once the height value is the same as the height in CCDScan you can continue with the development.

Remember you are working on the testnet. Check if your node collector is up and running in CCDScan. Look for the name of your node that is specified in the docker-compose.yml file in the network section of the dashboard.

Install required packages
=========================

You are going to invoke some functions from your deployed contract using ts-client and will cover minting and transferring NFTs. You can install all the dependent packages with either “yarn” or “npm”, if you dont have node in your system you should install it first.

.. code-block:: console

    cd node-cli
    yarn install
    yarn add -g ts-node

Wallet decryption
=================

Navigate to the cli.ts file inside of node-cli folder and add the following lines to it.

.. code--block:: console

    const cli = new commander.Command();
    cli
        .parseAsync(process.argv)
        .catch((e) => console.error(e))
        .then((res) => console.log("cli exited"));
    cli.showHelpAfterError().showSuggestionAfterError().allowUnknownOption(false);

Now, you need to decrypt your wallet backup file in order to make some function calls to do that use the following command. It should create a concordium-backup.concordiumwallet.json file. Open up that file and navigate the signKey and address. You need them while making function calls.

Deploy your smart contract
==========================

In order to deploy the contract add the following lines to your cli.ts file. You need to specify the compiled module file and the other arguments will be passed from the terminal.

Run the command below on your terminal. Paste the signKey value and the address from the decrypted concordium-backup.concordiumwallet.json file.

.. code-block:: console

    ts-node ./src/cli.ts deploy \
    --wasm ../dist/smart-contract/module.wasm \
    --sender <ACCOUNT-ADDRESS> \
    --sign-key <SIGN-KEY>

If you have the output below, you’ve successfully deployed your first smart contract on Concordium! You can also verify it either by looking at CCDScan or the testnet dashboard lookup section.

As you can see here the NFT minting contract is deployed and it allows you to verify the time, sender account and the block itself. It costs ~148 CCD which is less than 1.9 euros currently which is not bad for a 39.8 KB contract. 
You can check the remaining balance in your mobile wallet too.

Now you need go to the dashboard and get the hash value from there, using the url in the terminal. Click on the “Deployed module with reference” and copy the hash value. You will need it to initialize the contract in the next section.

Initializing the smart contract
===============================

After deploying a contract you have to initialize it. It’s like object-oriented programming: you create a class which is a module, and then you initialize it to create an object. It is the same here. An object of a class is a way to store both states of the class and its functionality. This time you are going to use the hash value you got in the previous step. First, make sure initialize function is implemented in your cli.ts file.

Run the code below. Use the hash value in the <Module Hash> part, signKey from your decrypted wallet file and the address of your account. That will create another transaction on chain.

.. code-block:: console

    ts-node ./src/cli.ts init --module <Module Hash> --sender <ACCOUNT-ADDRESS> --sign-key <SIGN-KEY>

If you have the output shown below that means you have successfully initialized your contract. 

Go to the url to get your contract's index value. From the dashboard you can easily see the index, account address as sender, event details and transaction hash.

Continue to the :ref:`next part<mint-transfer>` of the tutorial to mint and transfer your NFT.
