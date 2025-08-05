.. _ft-smart-contract:

.. _CIS-2: https://proposals.concordium.software/CIS/cis-2.html

=================================================
Smart contract implementation for fungible tokens
=================================================

For your token contract, use the `cis2-multi contract from Concordium’s example smart contract repository on GitHub <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis2-multi>`_. You will make some minor modifications to it in this tutorial, such as the maximum supply of your token, circulating supply, and a burn function. Basically, no one will be able to mint a token again if it already met the maximum supply. Your token will be deflationary in that sense. Burning a token will not affect the circulating supply; if you want, you can adjust the corresponding function so it could affect circulating supply.

Minting
=======

First, add the changes to your contract for the minting parameters that you require when ``mint()`` is invoked. It will ask for the minting amount and ``max_supply``. Create a struct called ``TokenParams`` and add this to the tokens tree as shown below.

.. code-block:: rust

    #[derive(Serial, Deserial, SchemaType)]
    struct TokenParams {
        amount: TokenAmountU64,
        max_supply: ContractTokenAmount,
    }

    /// The parameter for the contract function `mint` which mints a number of
    /// token types and/or amounts of tokens to a given address.
    #[derive(Serial, Deserial, SchemaType)]
    struct MintParams {
        /// Owner of the newly minted tokens.
        owner: Address,
        /// A collection of tokens to mint.
        tokens: collections::BTreeMap<ContractTokenId, (TokenMetadata, TokenParams)>,
    }

Now, you need to update the ``state`` struct which keeps the current state of your contract. In this case, you want it to store the maximum supply and the circulating supply. Here in ``max_supply`` you have the tokenId as the key and the amount as the value in the map, and then you have the ``token_balance`` map which holds the tokenId as the key and circulating amount as the value.

.. code-block:: rust

    /// The contract state,
    ///
    /// Note: The specification does not specify how to structure the contract state
    /// and this could be structured in a more space efficient way.
    #[derive(Serial, DeserialWithState)]
    #[concordium(state_parameter = "S")]
    struct State<S = StateApi> {
        /// The state of addresses.
        state: StateMap<Address, AddressState, S>,
        /// All of the token IDs
        tokens: StateMap<ContractTokenId, MetadataUrl, S>,
        // max supply of the token
        max_supply: StateMap<ContractTokenId, ContractTokenAmount, S>,

        token_balance: StateMap<ContractTokenId, ContractTokenAmount, S>,
        /// Map with contract addresses providing implementations of additional
        /// standards.
        implementors: StateMap<StandardIdentifierOwned, Vec<ContractAddress>, S>,
    }

Then, add some custom errors in your ``CustomContractError`` enum. As you can see below, the last two are new for this use case.

.. code-block:: rust

    /// The different errors the contract can produce.
    #[derive(Serialize, Debug, PartialEq, Eq, Reject, SchemaType)]
    enum CustomContractError {
        /// Failed parsing the parameter.
        #[from(ParseError)]
        ParseParams,
        /// Failed logging: Log is full.
        LogFull,
        /// Failed logging: Log is malformed.
        LogMalformed,
        /// Invalid contract name.
        InvalidContractName,
        /// Only a smart contract can call this function.
        ContractOnly,
        /// Failed to invoke a contract.
        InvokeContractError,
        /// Minted token unique ID
        TokenAlreadyMinted,
        // max supply reached
        MaxSupplyReached,
        // burning
        NoBalanceToBurn,
    }

Since you added new maps to your state, you need to handle their initialization in the ``empty()`` method of the state implementations. To do this, call ``state_builder.new_map()``.

.. code-block:: rust

    fn empty(state_builder: &mut StateBuilder) -> Self {
            State {
                state: state_builder.new_map(),
                tokens: state_builder.new_map(),
                max_supply: state_builder.new_map(),
                token_balance: state_builder.new_map(),
                implementors: state_builder.new_map(),
            }
        }

Mint function
=============

As discussed earlier, you have new inputs in ``MintParams``, so when you get the JSON parameter as the input you expect an object that holds both metadata and another struct that holds the maximum supply and the amount to be minted. That is why there is ``token_info``. ``token_info.0`` will represent the ``TokenMetadata`` struct and ``token_info.1`` will represent ``TokenParams``.

Unlike the NFT tutorials, this time you actually want the token to be mintable with the same ID. Just keep it less than the maximum value. That is why you commented on the first ensure statement which makes sure that the tokenId is unique for a token.

.. code-block:: rust

    #[receive(
        contract = "fungible-cis2",
        name = "mint",
        parameter = "MintParams",
        error = "ContractError",
        enable_logger,
        mutable
    )]
    fn contract_mint(
        ctx: &ReceiveContext,
        host: &mut Host<State>,
        logger: &mut Logger,
    ) -> ContractResult<()> {
        // Get the contract owner
        let owner = ctx.owner();
        // Get the sender of the transaction
        let sender = ctx.sender();

        ensure!(sender.matches_account(&owner), ContractError::Unauthorized);

        // Parse the parameter.
        let params: MintParams = ctx.parameter_cursor().get()?;

        let (state, builder) = host.state_and_builder();
        for (token_id, token_info) in params.tokens {
            // ensure!(
            //     !state.contains_token(&token_id),
            //     ContractError::Custom(CustomContractError::TokenAlreadyMinted)
            // );

            if !state.contains_token(&token_id) {
                state.set_max_supply(&token_id, token_info.1.max_supply)
            } else {
                let max_supply = state.get_token_supply(&token_id)?;
                let circulating_suppy = state.get_circulating_supply(&token_id)?;

                ensure!(
                    circulating_suppy <= max_supply,
                    ContractError::Custom(CustomContractError::MaxSupplyReached)
                );

                ensure!(
                    &token_info.1.amount <= &(max_supply - circulating_suppy),
                    ContractError::Custom(CustomContractError::MaxSupplyReached)
                );
            }

            // Mint the token in the state.
            state.mint(
                &token_id,
                &token_info.0,
                token_info.1.amount,
                &params.owner,
                builder,
            );

            // Event for minted token.
            logger.log(&Cis2Event::Mint(MintEvent {
                token_id,
                amount: token_info.1.amount,
                owner: params.owner,
            }))?;

            // Metadata URL for the token.
            logger.log(&Cis2Event::TokenMetadata::<_, ContractTokenAmount>(
                TokenMetadataEvent {
                    token_id,
                    metadata_url: token_info.0.to_metadata_url(),
                },
            ))?;
        }
        Ok(())
    }

In the following ``if`` clause you are checking if this token has been minted before. If not, set its maximum supply in the state by using the ``set_max_supply()`` function.

.. code-block:: rust

    if !state.contains_token(&token_id) {
        state.set_max_supply(&token_id, token_info.1.max_supply)
    } else {
        let max_supply = state.get_token_supply(&token_id)?;
        let circulating_supply = state.get_circulating_supply(&token_id)?;

        ensure!(
            circulating_supply <= max_supply,
            ContractError::Custom(CustomContractError::MaxSupplyReached)
        );

        ensure!(
            &token_info.1.amount <= &(max_supply - circulating_supply),
            ContractError::Custom(CustomContractError::MaxSupplyReached)
        );
    }

Otherwise, it means you have minted this token before, so you need to check how many were minted already, and based on that, decide to either mint or throw an error.

Look a bit closer at these helper functions, including ``set_max_supply()``. It takes the ``&mut self`` as a parameter because it will change the state so the mutable self of the state should be provided. In ``token_id`` enter the tokenId to set the key, and enter ``max_supply`` to set the value.

.. code-block:: rust

    #[inline(always)]
        fn set_max_supply(&mut self, token_id: &ContractTokenId, max_supply: ContractTokenAmount) {
            self.max_supply.insert(*token_id, max_supply);
        }

The ``get_token_supply()`` function first checks if the ``token_id`` is correct, meaning whether the state has that token, and then it will get the ``max_supply`` for that token which is specified while minting. The following section shows the minting function.

.. code-block:: rust

    /// Check that the token ID currently exists in this contract.
        #[inline(always)]
        fn get_token_supply(&self, token_id: &ContractTokenId) -> ContractResult<ContractTokenAmount> {
            ensure!(
                self.contains_token(&token_id),
                ContractError::InvalidTokenId
            );
            let supply = self.max_supply.get(token_id).map_or(0.into(), |x| *x);
            Ok(supply)
        }

The last helper is the ``get_circulating_supply()`` which will be used to get the circulating supply.

.. code-block:: rust

    // check cirulating supply
        #[inline(always)]
        fn get_circulating_supply(
            &self,
            token_id: &ContractTokenId,
        ) -> ContractResult<ContractTokenAmount> {
            ensure!(self.contains_token(token_id), ContractError::InvalidTokenId);
            let circulating_supply = self.token_balance.get(token_id).map_or(0.into(), |x| *x);
            Ok(circulating_supply)
        }

Contract mint function
----------------------

You will compare the circulating supply, maximum supply and the amount to be minted. If the mint amount + circulating supply is more than the maximum supply you will not allow minting.

In the ``contact_mint`` function below see the following changes accordingly. First, the parameters are read as a form of JSON. See the ``MintParams`` struct for the details of the parameters. In the first ``if`` clause, it first checks if the token exists in the state. If not, meaning you are going to mint this token for the first time, you will set the maximum supply by calling the ``set_max_supply()`` function. The max_supply value is in the ``TokenParam`` struct as the second item.

If the ``mint()`` function is not called for the first time, then you need to check the conditions. Therefore, you need to ``get_token_supply()`` and ``get_circulating_supply()``. Here you have to make sure of two conditions: first, you need to check that the circulating supply is already less than or equal to the maximum supply; and then when you add the new token amount to be minted to the existing amount, meaning the circulating supply, this should be less than or equal to the maximum supply. The following two ``ensure`` statements check that these conditions are sufficient before calling the state’s ``mint()`` function.

.. code-block:: rust

    #[receive(
        contract = "fungible-cis2",
        name = "mint",
        parameter = "MintParams",
        error = "ContractError",
        enable_logger,
        mutable
    )]
    fn contract_mint(
        ctx: &ReceiveContext,
        host: &mut Host<State>,
        logger: &mut Logger,
    ) -> ContractResult<()> {
        // Get the contract owner
        let owner = ctx.owner();
        // Get the sender of the transaction
        let sender = ctx.sender();

        ensure!(sender.matches_account(&owner), ContractError::Unauthorized);

        // Parse the parameter.
        let params: MintParams = ctx.parameter_cursor().get()?;

        let (state, builder) = host.state_and_builder();
        for (token_id, token_info) in params.tokens {
            // ensure!(
            //     state.contains_token(&token_id),
            //     ContractError::Custom(CustomContractError::TokenAlreadyMinted)
            // );

            if !state.contains_token(&token_id) {
                state.set_max_supply(&token_id, token_info.1.max_supply)
            } else {
                let max_supply = state.get_token_supply(&token_id)?;
                let circulating_suppy = state.get_circulating_supply(&token_id)?;

                ensure!(
                    circulating_suppy <= max_supply,
                    ContractError::Custom(CustomContractError::MaxSupplyReached)
                );

                ensure!(
                    &token_info.1.amount <= &(max_supply - circulating_suppy),
                    ContractError::Custom(CustomContractError::MaxSupplyReached)
                );
            }

            // Mint the token in the state.
            state.mint(
                &token_id,
                &token_info.0,
                token_info.1.amount,
                &params.owner,
                builder,
            );

            // Event for minted token.
            logger.log(&Cis2Event::Mint(MintEvent {
                token_id,
                amount: token_info.1.amount,
                owner: params.owner,
            }))?;

            // Metadata URL for the token.
            logger.log(&Cis2Event::TokenMetadata::<_, ContractTokenAmount>(
                TokenMetadataEvent {
                    token_id,
                    metadata_url: token_info.0.to_metadata_url(),
                },
            ))?;
        }
        Ok(())
    }

State mint function
-------------------

There is only one minor change needed in the state’s mint function, which is increasing the circulating supply when a token is minted. You are keeping the circulating balance in the ``token_balance`` map, using the ``token_id`` key of the map to call the value and update it, which you do in the last statement.

.. code-block:: rust

        /// Mints an amount of tokens with a given address as the owner.
        fn mint(
            &mut self,
            token_id: &ContractTokenId,
            token_metadata: &TokenMetadata,
            amount: ContractTokenAmount,
            owner: &Address,
            state_builder: &mut StateBuilder,
        ) {
            self.tokens
                .insert(*token_id, token_metadata.to_metadata_url());
            let mut owner_state = self
                .state
                .entry(*owner)
                .or_insert_with(|| AddressState::empty(state_builder));
            let mut owner_balance = owner_state.balances.entry(*token_id).or_insert(0.into());
            *owner_balance += amount;

            let mut circulating_supply = self.token_balance.entry(*token_id).or_insert(0.into());
            *circulating_supply += amount;
        }

Contract burn function
----------------------

Based on the requirements, you should be able to call tokens. In order to do that, you'll be adding the ``contract burn()`` function in the existing cis2-multi contract.

But first, you need another parameter to get the information about the tokens that will be burned. Create a struct, called ``BurnParams``; you will need ``token_id`` and the amount to be burned.

.. code-block:: rust

    #[derive(Serial, Deserial, SchemaType)]
    struct BurnParams {

        token_id: ContractTokenId,
        amount: ContractTokenAmount,
    }

When you get the parameters, ensure the token exists with the ``ensure!`` and ``contains_token()`` functions. Note that, when you call the ``burn()`` function, you need to emit the ``BurnEvent``. For more details, see the CIS-2_ standard documentation.

.. code-block:: rust

    #[receive(
        contract = "fungible-cis2",
        name = "burn",
        parameter = "BurnParams",
        error = "ContractError",
        enable_logger,
        mutable
    )]
    fn contract_burn(
        ctx: &ReceiveContext,
        host: &mut Host<State>,
        logger: &mut Logger,
    ) -> ContractResult<()> {
        // Get the contract owner
        // let owner = ctx.owner();
        // Get the sender of the transaction
        let sender = ctx.sender();

        // Parse the parameter.
        let params: BurnParams = ctx.parameter_cursor().get()?;
        let token_id = params.token_id;

        let amount = params.amount;
        ensure!(
                self.contains_token(&token_id),
                ContractError::InvalidTokenId
            );
        let (state, builder) = host.state_and_builder();

        // can use the value to store it in the state.
        let remaining_amount: ContractTokenAmount = state.burn(&token_id, amount, &sender)?;

        // log burn event
        logger.log(&Cis2Event::Burn(BurnEvent {
            token_id,
            amount,
            owner: sender,
        }))?;
        Ok(())
    }

Now add the ``burn()`` implementation to the state functions as shown below. You will simply remove the amount for that particular token from the state but you need to take into account that the address that called this has a balance. As a control statement, in case someone wants to burn 0 tokens, check it and let them know burning nothing is successful by returning ``Ok(amount)`` where the amount equals zero.

Then get the balance of the owner using its address. Since you will change the balance you need to have a mutable state. With the match statement, you will iterate the addresses from the ``address_state``, and when you find the matching one you will get the mutable balance. If it has enough balance to burn, you will subtract that amount from the mutable balance. Then state burn() function will return ``ContractResult()`` with the burned amount if it is successful; otherwise, it will prompt a ``CustomContractError::NoBalanceToBurn``.

.. code-block:: rust

    fn burn(
        &mut self,
        token_id: &ContractTokenId,
        amount: ContractTokenAmount,
        owner: &Address,
    ) -> ContractResult<ContractTokenAmount> {

        if amount == 0u64.into() {
            return Ok(amount);
        }

        match self.state.get_mut(owner) {
            Some(address_state) => match address_state.balances.get_mut(token_id) {
                Some(mut b) => {
                    ensure!(
                        *b >= amount,
                        Cis2Error::Custom(CustomContractError::NoBalanceToBurn)
                    );

                    *b -= amount;
                    Ok(*b)
                }
                None => Err(Cis2Error::Custom(CustomContractError::NoBalanceToBurn)),
            },
            None => Err(Cis2Error::Custom(CustomContractError::NoBalanceToBurn)),
        }
    }

Build, deploy, and initialize
=============================

Now that you have finished coding your smart contract you can build, deploy, and initialize it. You will use the ``concordium-client`` to build it, then deploy it to the testnet, and finally, mint/transfer/burn your token.

First, create a metadata file. You will use it to pick an image for it, and naming and description. One thing that is important to note is the **unique** flag. Since this is not an NFT, you should set it to **false**. Then upload it to the IPFS and save the CID address. For information about how to do this, see :ref:`Upload the NFT<upload-nft>`. You will use it while minting the token.

.. code-block:: console

    {
        "name": "YOUR-TOKEN-NAME",
        "unique": false,
        "description": "YOUR-TOKEN-DESCRIPTION",
        "display": {
            "url": "YOUR-IMAGE-PREVIEW-URL"
        },
        "attributes": []
    }

Build the smart contract
------------------------

Run the command below to create a Wasm compiled build file of your smart contract. It is a good habit to create a folder for the output files. For example, here the user created a parent folder named `dist` and a child folder named `fungible` inside of it.

You can embed the schema file in the module, which means you don’t have to call it again and again for your future function calls. To build the contract and embed the schema file, use the command below.

.. code-block:: console

    cargo concordium build --out dist/embedded/module.wasm.v1

.. image:: images/build-sc.png
    :width: 100%
    :alt: dark console screen with result of running the command above

Deploy the smart contract
-------------------------

If you don't have your own testnet node running, Concordium provides a running testnet gRPC node that is available at ``grpc.testnet.concordium.com`` on port 20000 (gRPCv2 and gRPC-web). You can use this node for API calls of *chain methods only*. This node is maintained by Concordium, but Concordium does not guarantee availability. The status of this node is available on the `Testnet status page <https://status.testnet.concordium.software>`__. For some use cases you might need to run your own local node due to the limitations of this one.

Run the command below to deploy the smart contract. This command is structured to use the Concordium testnet node described above. If you are using your own local node, adjust the command accordingly.

.. code-block:: console

    concordium-client module deploy dist/fungible/module.wasm.v1 --sender <YOUR-ACCOUNT> --name <YOUR-CONTRACT-NAME> --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com --secure

.. image:: images/deploy-sc.png
    :width: 100%
    :alt: dark console screen with result of running the command above

Initialize the smart contract
-----------------------------

Using the Module reference hash value, create a contract instance with the command below. This command is structured to use the Concordium testnet node described above. If you are using your own local node, adjust the command accordingly.

.. code-block:: console

    concordium-client contract init <MODULE-HASH> --sender <YOUR-ACCOUNT> --energy 30000 --contract <YOUR-CONTRACT-NAME> --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com --secure

.. image:: images/initialize-sc.png
    :width: 100%
    :alt: dark console screen with result of running the command above

|

:ref:`Click here<mint-xfer-ft>` to continue to the second part of the tutorial.
