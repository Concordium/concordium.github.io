.. _nft-w-id-sc:

====================
The minting contract
====================

You will update the `cis2-multi contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis2-multi>`_ . Remember what you want to achieve: you would like to have a minting dApp that uses Concordium’s ID layer and according to the scenario, you should prove that you are older than 18 in order to mint a token. The most obvious solution to this is could be to ask for ID proofs from the smart contract, but the proofs are not available to use like that from directly the contract. Instead, to create the same logic using the verifier back-end server, you will implement it in the following manner:

* You assume the owner of the verifier and the smart contract instance owner (dApp owner) is the same person. When you run the verifier backend server, you will use an account's sign and verify keys.
* While creating a new instance of the contract, the owner has to send its verify key(public key) and the contract will keep it in the state (to verify the signature).
* When a user wants to mint a token, the dApp will ask for a **challenge** and a **statement** from the verifier.
* Using that challenge, the dApp expects that the user accepts the information from his/her wallet that is going to be shared with it.
* The proof will be shared with the verifier backend, and if they are verified then the verifier will sign the public address of the user with its sign key which is given as an input parameter while starting the server.
* This signature will be the input of the minting function and using the public key stored in the state, the smart contract will verify that it's coming from the verifier and is valid really.
* The ``mint()`` function will be executed.

Create a project for your smart contract called cis2-multi.

.. code-block:: console

    cargo new cis2-multi

Add the following dependencies to the **Cargo.toml** file.

.. code-block:: toml

    [features]
    default = ["std"]
    std = ["concordium-std/std", "concordium-cis2/std"]

    [dependencies]
    concordium-std = { version = "*", default-features = false }
    concordium-cis2 = { version = "*", default-features = false }
    hex = "*"

    [lib]
    crate-type=["cdylib", "rlib"]

    [profile.release]
    codegen-units = 1
    opt-level = "s"

.. image:: ../../images/adv-sc1.png
    :alt: visual studio code window in dark mode while editing cargo.toml file

Create a **lib.rs** file and copy\paste the code from the example contract. Start modification with the ``State`` struct and add a variable for the ``verify_key`` and add it to the state’s ``empty()`` function. Note that unlike a regular ``empty()`` function, this one takes the ``verify_key`` as a parameter.

.. code-block:: console

    /// The contract state,
    ///
    /// Note: The specification does not specify how to structure the contract state
    /// and this could be structured in a more space efficient way.
    #[derive(Serial, DeserialWithState, StateClone)]
    #[concordium(state_parameter = "S")]
    struct State<S> {
        /// The state of addresses.
        state: StateMap<Address, AddressState<S>, S>,
        /// All of the token IDs
        tokens: StateMap<ContractTokenId, MetadataUrl, S>,
        /// Map with contract addresses providing implementations of additional
        /// standards.
        implementors: StateMap<StandardIdentifierOwned, Vec<ContractAddress>, S>,
        verify_key: PublicKeyEd25519,
    }


    impl<S: HasStateApi> State<S> {
        /// Construct a state with no tokens
        fn empty(state_builder: &mut StateBuilder<S>, verify_key: PublicKeyEd25519) -> Self {
            State {
                state: state_builder.new_map(),
                tokens: state_builder.new_map(),
                implementors: state_builder.new_map(),
                verify_key,
            }
        }
    /// rest of the state functions below
    }

While creating a new instance, you will need to store the ``verify_key`` or the public key of the owner. So create a struct called ``InitParam`` to get that input parameter.

.. code-block:: console

    #[derive(Serial, Deserial, SchemaType)]
    struct InitParams {
        verify_key: PublicKeyEd25519,
    }

And for the last part of the state, while minting you will require the signature in order to verify, so the mint parameters should send it. Add it as shown below.

.. code-block:: console

    /// The parameter for the contract function `mint` which mints a number of
    /// token types and/or amounts of tokens to a given address.
    #[derive(Serial, Deserial, SchemaType)]
    struct MintParams {
        /// Owner of the newly minted tokens.
        owner: Address,
        /// A collection of tokens to mint.
        tokens: collections::BTreeMap<ContractTokenId, (TokenMetadata, ContractTokenAmount)>,
        /// Signature from the owner of the contract
        signature: SignatureEd25519,
    }

Finally, update the ``mint()`` function by adding:

.. code-block:: console

    #[receive(
        contract = "CIS2-Multi",
        name = "mint",
        crypto_primitives,
        parameter = "MintParams",
        error = "ContractError",
        enable_logger,
        mutable
    )]
    fn contract_mint<S: HasStateApi>(
        ctx: &impl HasReceiveContext,
        host: &mut impl HasHost<State<S>, StateApiType = S>,
        logger: &mut impl HasLogger,
        crypto_primitives: &impl HasCryptoPrimitives,
    ) -> ContractResult<()> {
        // Get the sender of the transaction
        let sender: AccountAddress = match ctx.sender() {
            Address::Account(a) => a,
            Address::Contract(_) => bail!(ContractError::Custom(CustomContractError::AccountOnly)),
        };

        // Parse the parameter.
        let params: MintParams = ctx.parameter_cursor().get()?;

        let (state, builder) = host.state_and_builder();

        // Verifying that the signature belongs to the public key which was added at the time of init.
        ensure!(
            crypto_primitives.verify_ed25519_signature(state.verify_key, params.signature, &sender.0),
            ContractError::Unauthorized
        );

        for (token_id, token_info) in params.tokens {
            ensure!(
                state.contains_token(&token_id).eq(&false),
                ContractError::Custom(CustomContractError::TokenAlreadyMinted)
            );

            // Mint the token in the state.
            state.mint(
                &token_id,
                &token_info.0,
                token_info.1,
                &params.owner,
                builder,
            );

            // Event for minted token.
            logger.log(&Cis2Event::Mint(MintEvent {
                token_id,
                amount: token_info.1,
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

Nice! You are done with the smart contract. Without slowing down, start the :ref:`front-end development<nft-w-id-frontend>`.
