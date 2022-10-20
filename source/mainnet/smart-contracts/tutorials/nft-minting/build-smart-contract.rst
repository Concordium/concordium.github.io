.. _build-smart-contract:

========================
Build the Smart contract
========================

Now, in order to deploy your contract you need to change directory (with “cd” command) to the cis2-nft folder. Then run the commands below to build and deploy your contract. For the sake of simplicity, in this tutorial you are going to use the sample smart contract shared by Concordium in this repository.

.. code-block:: console

    cd cis2-nft

.. code-block:: console

    mkdir -p ../dist/smart-contract

.. code-block:: console

    cargo concordium build --out ../dist/smart-contract/module.wasm --schema-out ../dist/smart-contract/schema.bin

After these steps, you should be able to see something like the below.

.. image:: .images/prep-to-build-sc.png
    :width: 100%

Run a node
==========

You are almost ready to mint your first NFT on Concordium. To do that you need to run a local node, which in this tutorial is a Docker image in the repository. To start it run the command below. Docker file configurations can be found in the docker-compose.yml file as described below. Don't forget the set a name for your node with the parameter ``CONCORDIUM_COLLECTOR_NODE_NAME``. The docker-compose configuration below is inspired by the Docker docs from the Concordium website.

.. code-block:: console

    version: '3'
    services:
        node:
            # platform: linux/x86_64
            # platform: linux/amd64
        container_name: testnet-node
        image: concordium/testnet-node:latest
        pull_policy: always
        ports:
            - ${CONCORDIUM_NODE_PORT}:${CONCORDIUM_NODE_PORT}
        working_dir: /
        environment:
            ## Refer https://github.com/Concordium/concordium-node/blob/main/VARIABLES.md#grpc
            CONCORDIUM_NODE_RPC_SERVER_ADDR: 0.0.0.0
            CONCORDIUM_NODE_RPC_SERVER_PORT: ${CONCORDIUM_NODE_PORT}
            CONCORDIUM_NODE_LISTEN_ADDRESS: 0.0.0.0
            CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE: /testnet-genesis.dat
            CONCORDIUM_NODE_CONFIG_DIR: "/node/concordium-node-data"
            CONCORDIUM_NODE_DATA_DIR: "/node/concordium-node-config"
            CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES: bootstrap.testnet.concordium.com:8888
            CONCORDIUM_NODE_CONNECTION_HARD_CONNECTION_LIMIT: 20
            CONCORDIUM_NODE_CONNECTION_THREAD_POOL_SIZE: 2
            CONCORDIUM_NODE_CONNECTION_BOOTSTRAPPING_INTERVAL: 1800
        volumes:
            - ./dist/node/data:/node/concordium-node-data
            - ./dist/node/config:/node/concordium-node-config
        entrypoint:
            - ./concordium-node
    testnet-node-collector:
        container_name: testnet-node-collector
        image: concordium/testnet-node:latest
        pull_policy: always
        environment:
            # Settings that should be customized by the user.
            CONCORDIUM_NODE_COLLECTOR_NODE_NAME: <YOUR NODE NAME>
            # Environment specific settings.
            CONCORDIUM_NODE_COLLECTOR_URL: https://dashboard.testnet.concordium.com/nodes/post
            # Collection settings.
            # How often to collect the statistics from the node.
            CONCORDIUM_NODE_COLLECTOR_COLLECT_INTERVAL: 5000
            # The URL where the node can be reached. Note that this will use the
            # docker created network which maps `testnet-node` to the internal IP of
            # the `testnet-node`. If the name of the node service is changed from
            # `testnet-node` then the name here must also be changed.
            CONCORDIUM_NODE_COLLECTOR_GRPC_HOST: http://node:10001
        entrypoint: [ "/node-collector" ]

This runs a Docker image of a node. This step takes some time, potentially hours based on your device configuration, because your node is freshly started and needs to recover all the previous blocks. Using the node synchronization for your node platform can speed up the catch up. In the near future, there will be a tool that will eliminate this step and allows you to connect via a URL to a node. Once the height value is the same as the height in `CCDScan <https://testnet.ccdscan.io/blocks>`__ you can continue with the development.

Remember you are working on the testnet. Check if your node collector is up and running in CCDScan. Look for the name of your node that is specified in the docker-compose.yml file in the network section of the dashboard.

.. image:: .images/node-collector.png
    :width: 100%

Install required packages
=========================

You are going to invoke some functions from your deployed contract using ts-client and will cover minting and transferring NFTs. You can install all the dependent packages with either “yarn” or “npm”. If you don't have node in your system you should install it first.

.. code-block:: console

    cd node-cli

.. code-block:: console

    yarn install

.. code-block:: console

    yarn add -g ts-node

Wallet decryption
=================

Navigate to the cli.ts file in the **node-cli** folder and add the following lines to it. **NOTE: Remember, the cloned repository already has it. If you have it already you should not add it again.**

.. code--block:: console

    const cli = new commander.Command();
    cli
        .parseAsync(process.argv)
        .catch((e) => console.error(e))
        .then((res) => console.log("cli exited"));
    cli.showHelpAfterError().showSuggestionAfterError().allowUnknownOption(false);

The contract looks like this:

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

Now, you need to decrypt your wallet backup file in order to make some function calls. To do that use the following command. (This needs to be adjusted to use browser wallet key export!!!!)

.. code-block:: console

    ts-node ./src/cli.ts decrypt --wallet ../concordium-backup.concordiumwallet --password YOUR_PASSWORD --out ../concordium-backup.concordiumwallet.json

It should create a concordium-backup.concordiumwallet.json file. Open that file and navigate to the signKey and address. You need them while making function calls.

Deploy your smart contract
==========================

In order to deploy the contract add the following lines to your cli.ts file to specify the compiled module file and the other arguments that will be passed from the terminal.

.. code-block:: console

    function setupCliDeployModule(cli: commander.Command) {
        return (
            cli
            .command("deploy")
            .description(`Deploy Smart Contract Wasm Module`)
            .requiredOption("--wasm <wasm>", "Compile Module file path", "../dist/smart-contract/module.wasm")
            // Sender Account Args
            .requiredOption("--sign-key <signKey>", "Account Signing Key")
            .requiredOption("--sender <sender>", "Sender Account Address. This should be the owner of the Contract")
            // Node Client args
            .requiredOption("--auth-token <authToken>", "Concordium Node Auth Token", "rpcadmin")
            .requiredOption("--ip <ip>", "Concordium Node IP", "127.0.0.1")
            .requiredOption("--port <port>", "Concordium Node Port", (v) => parseInt(v), 10001)
            .requiredOption("--timeout <timeout>", "Concordium Node request timeout", (v) => parseInt(v), 15000)
            .action(
                async (args: DeployModuleArgs) =>
                await sendAccountTransaction(
                    args,
                    args.sender,
                    args.signKey,
                    // payload
                    { content: Buffer.from(readFileSync(args.wasm)) } as DeployModulePayload,
                    // Transaction Type
                    AccountTransactionType.DeployModule,
                ),
            )
        );
    }
    setupCliDeployModule(cli);

Run the command below on your terminal. Paste the signKey value and the address from the decrypted concordium-backup.concordiumwallet.json file.

.. code-block:: console

    ts-node ./src/cli.ts deploy \
    --wasm ../dist/smart-contract/module.wasm \
    --sender <ACCOUNT-ADDRESS> \
    --sign-key <SIGN-KEY>

If you have the output below, you’ve successfully deployed your first smart contract on Concordium! You can also verify it either by looking at `CCDScan <https://ccdscan.io/>`__ or the `testnet dashboard lookup section <https://dashboard.testnet.concordium.com/`__.

.. image:: .images/deployed-sc.png
    :width: 100%

As you can see below the NFT minting contract is deployed and it allows you to verify the time, sender account and the block itself. It costs ~148 CCD which is less than 1.9 euros currently which is not bad for a 39.8 KB contract.
You can check the remaining balance in your Concordium wallet too.

.. image:: .images/deployed-sc-ccdscan.png
    :width: 100%

Now you need go to the `dashboard <https://dashboard.testnet.concordium.com/`__ and get the hash value from there, using the URL in the terminal. Click **Deployed module with reference** and copy the hash value. You will need it to initialize the contract in the next section.

Initializing the smart contract
===============================

After deploying a contract you have to initialize it. It’s like object-oriented programming: you create a class which is a module, and then you initialize it to create an object. It is the same here. An object of a class is a way to store both states of the class and its functionality. This time you are going to use the hash value you got in the previous step. First, make sure the ``initialize`` function is implemented in your cli.ts file.

.. code-block:: console

    function setupCliInitContract(cli: commander.Command) {
        return (
            cli
            .command("init")
            .description(`Initializes a Smart Contract`)
            .requiredOption("--module <module>", "Module Reference", "CIS2-NFT")
            .requiredOption("--energy <energy>", "Maximum Contract Execution Energy", (v) => BigInt(v), 6000n)
            .requiredOption("--contract <contract>", "Contract name", "CIS2-NFT")
            // Sender Account Args
            .requiredOption("--sender <sender>", "Sender Account Address. This should be the owner of the Contract")
            .requiredOption("--sign-key <signKey>", "Account Signing Key")
            // Node Client args
            .requiredOption("--auth-token <authToken>", "Concordium Node Auth Token", "rpcadmin")
            .requiredOption("--ip <ip>", "Concordium Node IP", "127.0.0.1")
            .requiredOption("--port <port>", "Concordum Node Port", (v) => parseInt(v), 10001)
            .requiredOption("--timeout <timeout>", "Concordium Node request timeout", (v) => parseInt(v), 15000)
            .action(
                async (args: InitContractArgs) =>
                await sendAccountTransaction(
                    args,
                    args.sender,
                    args.signKey,
                    // Payload
                    {
                    amount: new GtuAmount(0n),
                    moduleRef: new ModuleReference(args.module),
                    contractName: args.contract,
                    parameter: Buffer.from([]),
                    maxContractExecutionEnergy: args.energy,
                    } as InitContractPayload,
                    // Transaction Type
                    AccountTransactionType.InitializeSmartContractInstance,
                ),
            )
        );
    }
    setupCliInitContract(cli);

Run the code below. Use the hash value in the <Module Hash> part, signKey from your decrypted wallet file and the address of your account. That will create another transaction on chain.

.. code-block:: console

    ts-node ./src/cli.ts init --module <Module Hash> --sender <ACCOUNT-ADDRESS> --sign-key <SIGN-KEY>

If you have the output shown below that means you have successfully initialized your contract.

.. image:: .images/initialized-sc.png
    :width: 100%

Go to the URL to get your contract's index value. From the dashboard you can easily see the index, account address as sender, event details and transaction hash.

.. image:: .images/dashboard-success-init.png
    :width: 100%

Continue to the :ref:`final part<mint-transfer>` of the tutorial to mint and transfer your NFT.
