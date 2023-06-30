.. _fractionalized-nft-sc:

=================================
Fractionalized NFT smart contract
=================================

The smart contract is organized slightly differently than usual for this tutorial. First, there will be a **lib.rs** which is basically the main function of your contract like the other programming languages. The compiler starts from this file to compile it. The second file will be the **contract.rs** which will be your primary CIS-2 contract that includes all the logic provided for the requirements. The **State.rs**, **Params.rs**, and **Error.rs** files have been kept separate just for demonstration purposes, meaning you can keep them all in your **lib.rs** file. Finally, you will have a **cis2_client.rs** file which will enable the master contract to do some operations on the CIS-2 token contract. One little reminder: there will be some additions to the CIS2-multi contract. You can check the particular contract `in this link <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis2-multi>`_.

State.rs
========

Start with the **state.rs** file. As you already know from the previous tutorials, the state will keep the asset's latest state. The contract has to have an initialization function to create an empty state in the beginning, which includes four maps such as **state, tokens, token_supply, implementors, and collaterals**. There is one addition which is the **collaterals**; practically, the tokens to be locked will be stored in this ``StateMap<CollateralKey, CollateralState, S>``.

.. code-block:: rust

    /// The contract state,
    ///
    /// Note: The specification does not specify how to structure the contract state
    /// and this could be structured in a more space-efficient way.
    #[derive(Serial, DeserialWithState, StateClone)]
    #[concordium(state_parameter = "S")]
    pub struct State<S> {
        /// The state of addresses.
        pub(crate) state: StateMap<Address, AddressState<S>, S>,
        /// All of the token IDs
        pub(crate) tokens: StateMap<ContractTokenId, MetadataUrl, S>,
        /// Map with tokenId and token amount for the supply
        pub(crate) token_supply: StateMap<ContractTokenId, ContractTokenAmount, S>,
        pub(crate) implementors: StateMap<StandardIdentifierOwned, Vec<ContractAddress>, S>,
        pub(crate) collaterals: StateMap<CollateralKey, CollateralState, S>,
    }

You need to create a new state variable for your collateralized token, in other words, the tokens to be locked. You will need to keep the token’s contract address, its ID, and who locked it which all are provided in the ``CollateralKey`` struct below. Then you need the token amounts for the total number of fractions and the new token IDs.

Basically, when someone sends the fraction token to this contract, you will assume that they want to burn that asset and you will burn it and the ``new()`` function will be invoked when someone wants to add new collateral to mint its fractions.

.. code-block:: rust

    #[derive(Serial, Deserial, Clone, SchemaType, Copy)]
    pub struct CollateralKey {
        pub contract: ContractAddress,
        pub token_id: ContractTokenId,
        pub owner: AccountAddress,
    }

    #[derive(Serial, Deserial, Clone, Copy, SchemaType)]
    pub struct CollateralState {
        pub received_token_amount: ContractTokenAmount,
        pub minted_token_id: Option<ContractTokenId>,
    }

    impl CollateralState {
        fn new() -> Self {
            CollateralState {
                received_token_amount: ContractTokenAmount::from(0),
                minted_token_id: Option::None,
            }
        }
    }

There are five additions to the **cis2-multi** contract state functions for handling the collateral state. The first one is the ``add_collateral()`` function. It expects the **token contract address**, **token_id**, **owner address**, and the **token amount** to be locked.

The second one is ``has_collateral()``, which similarly takes the **token contract address**, **token_id**, and **owner address** as input to create a key in the form of a ``CollateralKey`` struct to look into the **StateMap**. If someone has already collateralized the token, this will return **true** and you will use this to make sure that they will not be able to do it again.

The third one is ``find_collateral()`` which takes **token_id (fraction)** as a parameter and checks its existence in the minted tokens. If a token with that ID exists, it returns a clone of it.

The fourth one is ``has_fractions()``. You will use this to check whether a token is already fractionalized into new ones. You don't want to allow people to create more and more fractions when they lock their assets once.

The last one is ``update_collateral_token()``. You will use this when you have locked the tokens while minting new fractions. Based on the amount of fractions, it will update the state with the new tokens.

One important note here is that you can lock a semi-fungible token technically with this example. If you would like to limit it you can adjust it simply by checking the amount.

.. code-block:: rust

    pub(crate) fn add_collateral(
        &mut self,
        contract: ContractAddress,
        token_id: ContractTokenId,
        owner: AccountAddress,
        received_token_amount: ContractTokenAmount,
    ) {
        let key = CollateralKey {
            contract,
            token_id,
            owner,
        };

        let mut cs = match self.collaterals.get(&key) {
            Some(v) => *v,
            None => CollateralState::new(),
        };

        cs.received_token_amount += received_token_amount;

        self.collaterals.insert(key, cs);
    }

    pub(crate) fn has_collateral(
        &self,
        contract: &ContractAddress,
        token_id: &ContractTokenId,
        owner: &AccountAddress,
    ) -> bool {
        let key = CollateralKey {
            contract: *contract,
            token_id: *token_id,
            owner: *owner,
        };

        self.collaterals.get(&key).is_some()
    }

    pub(crate) fn find_collateral(
        &self,
        token_id: &ContractTokenId,
    ) -> Option<(CollateralKey, ContractTokenAmount)> {
        for c in self.collaterals.iter() {
            match c.1.minted_token_id {
                Some(t) => {
                    if t.eq(token_id) {
                        return Some((c.0.clone(), c.1.received_token_amount));
                    }
                }
                None => continue,
            };
        }

        None
    }

    pub(crate) fn has_fraction(
        &self,
        contract: &ContractAddress,
        token_id: &ContractTokenId,
        owner: &AccountAddress,
    ) -> Option<ContractTokenId> {
        let key = CollateralKey {
            contract: *contract,
            token_id: *token_id,
            owner: *owner,
        };

        self.collaterals.get(&key)?.minted_token_id
    }

    pub(crate) fn update_collateral_token(
        &mut self,
        contract: ContractAddress,
        token_id: ContractTokenId,
        owner: AccountAddress,
        minted_token_id: ContractTokenId,
    ) -> ContractResult<()> {
        let key = CollateralKey {
            contract,
            token_id,
            owner,
        };

        match self.collaterals.entry(key) {
            Entry::Vacant(_) => bail!(Cis2Error::Custom(CustomContractError::InvalidCollateral)),
            Entry::Occupied(mut e) => {
                e.modify(|s| s.minted_token_id = Some(minted_token_id));
                Ok(())
            }
        }
    }


Token supply helpers
--------------------

.. code-block:: rust

  fn increase_supply(&mut self, token_id: ContractTokenId, amount: ContractTokenAmount) {
        let curr_supply = self.get_supply(&token_id);
        self.token_supply.insert(token_id, curr_supply + amount);
    }
  fn decrease_supply(&mut self, token_id: ContractTokenId, amount: ContractTokenAmount) {
        let curr_supply = self.get_supply(&token_id);
        let remaining_supply = curr_supply - amount;
        if remaining_supply.cmp(&ContractTokenAmount::from(0)).is_eq() {
            self.token_supply.remove(&token_id);
        } else {
            self.token_supply.insert(token_id, curr_supply - amount);
        }
    }
   pub(crate) fn get_supply(&self, token_id: &ContractTokenId) -> ContractTokenAmount {
        match self.token_supply.get(token_id) {
            Some(amount) => *amount,
            None => ContractTokenAmount::from(0),
        }
    }

State mint function
-------------------

There is only one addition to the existing ``mint()`` function in the cis2-multi contract, which is the ``increase_supply()`` when a token is minted.

.. code-block:: rust

   /// Mints an amount of tokens with a given address as the owner.
    pub(crate) fn mint(
        &mut self,
        token_id: &ContractTokenId,
        token_metadata: &TokenMetadata,
        amount: ContractTokenAmount,
        owner: &Address,
        state_builder: &mut StateBuilder<S>,
    ) {
        {
            self.tokens
                .insert(*token_id, token_metadata.to_metadata_url());
            let mut owner_state = self
                .state
                .entry(*owner)
                .or_insert_with(|| AddressState::empty(state_builder));
            let mut owner_balance = owner_state.balances.entry(*token_id).or_insert(0.into());
            *owner_balance += amount;
        }

        self.increase_supply(*token_id, amount);
    }


State burn function
-------------------

You need to add a ``burn()`` function to the state so that you will be able to burn the fractions. An example is shown below. You will use the ``decrease_supply()`` function to update the state when you burn something.

.. code-block:: rust

    pub(crate) fn burn(
        &mut self,
        token_id: &ContractTokenId,
        amount: ContractTokenAmount,
        owner: &Address,
    ) -> ContractResult<ContractTokenAmount> {
        let ret = {
            match self.state.get_mut(owner) {
                Some(address_state) => match address_state.balances.get_mut(token_id) {
                    Some(mut b) => {
                        ensure!(
                            b.cmp(&amount).is_ge(),
                            Cis2Error::Custom(CustomContractError::NoBalanceToBurn)
                        );

                        *b -= amount;
                        Ok(*b)
                    }
                    None => Err(Cis2Error::Custom(CustomContractError::NoBalanceToBurn)),
                },
                None => Err(Cis2Error::Custom(CustomContractError::NoBalanceToBurn)),
            }
        };

        self.decrease_supply(*token_id, amount);

        ret
    }

Params.rs
=========

In this file, you will keep the parameter structs and some implementation for them to mint, for metadata operations, and to view. They are almost identical to the **cis2-multi** parameters with some additions for collaterals.

.. code-block:: rust

    use concordium_cis2::*;
    use concordium_std::*;
    use core::convert::TryInto;

    use crate::{
        state::{CollateralKey, CollateralState},
        ContractTokenAmount, ContractTokenId,
    };

    #[derive(Serial, Deserial, SchemaType)]
    pub struct TokenMintParams {
        pub metadata: TokenMetadata,
        pub amount: ContractTokenAmount,
        pub contract: ContractAddress,
        pub token_id: ContractTokenId,
    }

    /// The parameter for the contract function `mint` which mints a number of
    /// token types and/or amounts of tokens to a given address.
    #[derive(Serial, Deserial, SchemaType)]
    pub struct MintParams {
        /// Owner of the newly minted tokens.
        pub owner: Address,
        /// A collection of tokens to mint.
        pub tokens: collections::BTreeMap<ContractTokenId, TokenMintParams>,
    }

    /// The parameter type for the contract function `setImplementors`.
    /// Takes a standard identifier and a list of contract addresses providing
    /// implementations of this standard.
    #[derive(Debug, Serialize, SchemaType)]
    pub struct SetImplementorsParams {
        /// The identifier for the standard.
        pub id: StandardIdentifierOwned,
        /// The addresses of the implementors of the standard.
        pub implementors: Vec<ContractAddress>,
    }

    #[derive(Debug, Serialize, Clone, SchemaType)]
    pub struct TokenMetadata {
        /// The URL following the specification RFC1738.
        #[concordium(size_length = 2)]
        pub url: String,
        /// A optional hash of the content.
        #[concordium(size_length = 2)]
        pub hash: String,
    }

    impl TokenMetadata {
        fn get_hash_bytes(&self) -> Option<[u8; 32]> {
            match hex::decode(self.hash.to_owned()) {
                Ok(v) => {
                    let slice = v.as_slice();
                    match slice.try_into() {
                        Ok(array) => Option::Some(array),
                        Err(_) => Option::None,
                    }
                }
                Err(_) => Option::None,
            }
        }

        pub(crate) fn to_metadata_url(&self) -> MetadataUrl {
            MetadataUrl {
                url: self.url.to_string(),
                hash: self.get_hash_bytes(),
            }
        }
    }

    #[derive(Serialize, SchemaType)]
    pub struct ViewAddressState {
        pub balances: Vec<(ContractTokenId, ContractTokenAmount)>,
        pub operators: Vec<Address>,
    }

    #[derive(Serialize, SchemaType)]
    pub struct ViewState {
        pub state: Vec<(Address, ViewAddressState)>,
        pub tokens: Vec<ContractTokenId>,
        pub collaterals: Vec<(CollateralKey, CollateralState)>,
    }

    /// Parameter type for the CIS-2 function `balanceOf` specialized to the subset
    /// of TokenIDs used by this contract.
    pub type ContractBalanceOfQueryParams = BalanceOfQueryParams<ContractTokenId>;

    /// Response type for the CIS-2 function `balanceOf` specialized to the subset
    /// of TokenAmounts used by this contract.
    pub type ContractBalanceOfQueryResponse = BalanceOfQueryResponse<ContractTokenAmount>;

    pub type TransferParameter = TransferParams<ContractTokenId, ContractTokenAmount>;

Error.rs
========

You will implement custom errors for this project like the ones below where the last six errors are custom errors. For more information about custom errors in Concordium smart contracts, see :ref:`Custom errors<custom-errors>`.

.. code-block:: rust

    pub enum CustomContractError {
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
        /// Unique tokenID
        TokenAlreadyMinted,
        /// Cant be collateralized
        InvalidCollateral,
        /// Same collateral ID twice
        AlreadyCollateralized,
        /// Cant burn
        NoBalanceToBurn,
        /// Contracts are not allowed
        AccountsOnly,
        /// Cant call another CIS-2 contract
        Cis2ClientError(Cis2ClientError),
    }

cis2_client.rs
==============

In order to call a contract from another smart contract you need to implement a relay layer which is the **cis2_client.rs**. It implements the transfer function. You will transfer the asset back to the original owner when all fractions are burned. In order to do that, you need to implement this client that will allow you to call the ``transfer()`` function in the NFT contract. Please remember that you should transfer it using the contract that minted the original token in the first place.

.. code-block:: rust

    //! CIS2 client is the intermediatory layer between fractionalizer contract and CIS2 contract.
    //!
    //! # Description
    //! It allows Fractionalizer contract to abstract away logic of calling CIS2 contract for the following methods
    //! - `transfer` : Calls [`transfer`](https://proposals.concordium.software/CIS/cis-2.html#transfer)

    use std::vec;

    use concordium_cis2::*;
    use concordium_std::*;

    use crate::state::State;

    pub const TRANSFER_ENTRYPOINT_NAME: &str = "transfer";

    #[derive(Serialize, Debug, PartialEq, Eq, Reject, SchemaType)]
    pub enum Cis2ClientError {
        InvokeContractError,
        ParseParams,
    }

    pub struct Cis2Client;

    impl Cis2Client {
        pub(crate) fn transfer<
            S,
            T: IsTokenId + Clone + Copy,
            A: IsTokenAmount + Clone + Copy + ops::Sub<Output = A>,
        >(
            host: &mut impl HasHost<State<S>, StateApiType = S>,
            token_id: T,
            nft_contract_address: ContractAddress,
            amount: A,
            from: Address,
            to: Receiver,
        ) -> Result<(), Cis2ClientError>
        where
            S: HasStateApi,
            A: IsTokenAmount,
        {
            let params = TransferParams(vec![Transfer {
                token_id,
                amount,
                from,
                data: AdditionalData::empty(),
                to,
            }]);

            Cis2Client::invoke_contract_read_only(
                host,
                &nft_contract_address,
                TRANSFER_ENTRYPOINT_NAME,
                &params,
            )?;

            Ok(())
        }

        fn invoke_contract_read_only<S: HasStateApi, R: Deserial, P: Serial>(
            host: &mut impl HasHost<State<S>, StateApiType = S>,
            contract_address: &ContractAddress,
            entrypoint_name: &str,
            params: &P,
        ) -> Result<R, Cis2ClientError> {
            let invoke_contract_result = host
                .invoke_contract_read_only(
                    contract_address,
                    params,
                    EntrypointName::new(entrypoint_name).unwrap_abort(),
                    Amount::from_ccd(0),
                )
                .map_err(|_e| Cis2ClientError::InvokeContractError)?;
            let mut invoke_contract_res = match invoke_contract_result {
                Some(s) => s,
                None => return Result::Err(Cis2ClientError::InvokeContractError),
            };
            let parsed_res =
                R::deserial(&mut invoke_contract_res).map_err(|_e| Cis2ClientError::ParseParams)?;

            Ok(parsed_res)
        }
    }

Contract.rs
===========

Finally, you need modifications for the fractionalization of NFTs in the contract functions. There are two major changes in the ``contract_mint()`` and ``contract_transfer()`` functions, which are described below. The full code is shared at the end of the tutorial.

Mint Function
-------------

In the ``contract_mint()`` function, there are three additions.

First, you want to make sure that only accounts can lock and fractionalize the NFTs. You can see the ``match`` statement below that performs this particular control.

Second, it should be impossible to mint new fractions if the collateral is not locked first. So, you need to ensure that the token exists in the collateral list. The ``ensure!()`` statement checks this, and if violated, throws an ``InvalidCollateral`` custom error.

As a final addition to the ``mint()`` function, you need to update the state when a token is minted. Basically, you are storing which token from which contract is locked, which token on this contract is minted, and who is the owner. See the usage of the ``update_collateral_token()`` function below.

.. code-block:: rust

    #[receive(
        contract = "CIS2-Fractionalizer",
        name = "mint",
        parameter = "MintParams",
        error = "ContractError",
        enable_logger,
        mutable
    )]
    fn contract_mint<S: HasStateApi>(
        ctx: &impl HasReceiveContext,
        host: &mut impl HasHost<State<S>, StateApiType = S>,
        logger: &mut impl HasLogger,
    ) -> ContractResult<()> {
        let sender = match ctx.sender() {
            Address::Account(a) => a,
            Address::Contract(_) => bail!(CustomContractError::AccountsOnly.into()),
        };

        // Parse the parameter.
        let params: MintParams = ctx.parameter_cursor().get()?;

        let (state, builder) = host.state_and_builder();
        for (token_id, token_info) in params.tokens {
        ensure!(
                state.contains_token(&token_id),
                ContractError::Custom(CustomContractError::TokenAlreadyMinted)
            );

            ensure!(
                state.has_collateral(&token_info.contract, &token_info.token_id, &sender),
                concordium_cis2::Cis2Error::Custom(CustomContractError::InvalidCollateral)
            );
            // create a fraction only for once for a token
            ensure!(
                state
                    .has_fraction(&token_info.contract, &token_info.token_id, &sender)
                    .is_none(),
                concordium_cis2::Cis2Error::Custom(CustomContractError::AlreadyCollateralized)
            );

            // Mint the token in the state.
            state.mint(
                &token_id,
                &token_info.metadata,
                token_info.amount,
                &params.owner,
                builder,
            );

            state.update_collateral_token(
                token_info.contract,
                token_info.token_id,
                sender,
                token_id,
            )?;

            // Event for minted token.
            logger.log(&Cis2Event::Mint(MintEvent {
                token_id,
                amount: token_info.amount,
                owner: params.owner,
            }))?;

            // Metadata URL for the token.
            logger.log(&Cis2Event::TokenMetadata::<_, ContractTokenAmount>(
                TokenMetadataEvent {
                    token_id,
                    metadata_url: token_info.metadata.to_metadata_url(),
                },
            ))?;
        }
        Ok(())
    }

Transfer function
-----------------

You are about to finalize our contract development after one final step which is the ``contract_transfer()`` function. Basically, when you want to send your tokens to another address, you will invoke this function. In addition to that, you want to combine the burning process into this function.

According to this logic, when you transfer the fractions (tokens minted on this contract) back to the contract, it assumes you want to burn them. You need to be the owner of the asset when calling it. After you ensure that you are authorized (meaning have some tokens), then it checks that you want to send those tokens to the contract itself. The next step is calling the state’s ``burn()`` function which will reduce the token amount from your balance and the state's total supply followed by emitting a ``BurnEvent``. Note that when you call the ``burn()`` function, you need to emit the ``BurnEvent``. For more detail, check the `CIS-2 standard documentation <https://proposals.concordium.software/CIS/cis-2.html#cis-2-concordium-token-standard-2>`_.

The state’s ``burn()`` function will return the ``remaining_amount``. If this amount is 0 then you can say that this should be unlocked now as there is no need for the collateral. At this point, you need a client to communicate with this CIS-2 token (the one that was locked as collateral in the beginning) smart contract to invoke the ``transfer`` function. Basically, your contract will be transferring the asset back to the owner by getting their address from the state’s ``CollateralKey`` struct using the ``token_id``.

In the ``else`` statement, you are just transferring a token to someone else, so this part is identical to the cis2-multi contract’s ``transfer()`` function.

.. code-block:: rust

    #[receive(
        contract = "CIS2-Fractionalizer",
        name = "transfer",
        parameter = "TransferParameter",
        error = "ContractError",
        enable_logger,
        mutable
    )]
    fn contract_transfer<S: HasStateApi>(
        ctx: &impl HasReceiveContext,
        host: &mut impl HasHost<State<S>, StateApiType = S>,
        logger: &mut impl HasLogger,
    ) -> ContractResult<()> {
        // Parse the parameter.
        let TransferParams(transfers): TransferParameter = ctx.parameter_cursor().get()?;
        // Get the sender who invoked this contract function.
        let sender = ctx.sender();

        for Transfer {
            token_id,
            amount,
            from,
            to,
            data,
        } in transfers
        {
            let (state, builder) = host.state_and_builder();
            // Authenticate the sender for this transfer
            ensure!(
                from == sender || state.is_operator(&sender, &from),
                ContractError::Unauthorized
            );

            if to.address().matches_contract(&ctx.self_address()) {
                // tokens are being transferred to self
                // burn the tokens
                let remaining_amount: ContractTokenAmount = state.burn(&token_id, amount, &from)?;

                // log burn event
                logger.log(&Cis2Event::Burn(BurnEvent {
                    token_id,
                    amount,
                    owner: from,
                }))?;

                // Check of there is any remaining amount
                if remaining_amount.eq(&ContractTokenAmount::from(0)) {
                    // Everything has been burned
                    // Transfer collateral back to the original owner
                    let (collateral_key, collateral_amount) = state
                        .find_collateral(&token_id)
                        .ok_or(Cis2Error::Custom(CustomContractError::InvalidCollateral))?;

                    // Return back the collateral
                    Cis2Client::transfer(
                        host,
                        collateral_key.token_id,
                        collateral_key.contract,
                        collateral_amount,
                        concordium_std::Address::Contract(ctx.self_address()),
                        concordium_cis2::Receiver::Account(collateral_key.owner),
                    )
                    .map_err(CustomContractError::Cis2ClientError)?;
                }
            } else {
                let to_address = to.address();

                // Tokens are being transferred to another address
                // Update the contract state
                state.transfer(&token_id, amount, &from, &to_address, builder)?;

                // Log transfer event
                logger.log(&Cis2Event::Transfer(TransferEvent {
                    token_id,
                    amount,
                    from,
                    to: to_address,
                }))?;

                // If the receiver is a contract we invoke it.
                if let Receiver::Contract(address, entrypoint_name) = to {
                    let parameter = OnReceivingCis2Params {
                        token_id,
                        amount,
                        from,
                        data,
                    };
                    host.invoke_contract(
                        &address,
                        &parameter,
                        entrypoint_name.as_entrypoint_name(),
                        Amount::zero(),
                    )?;
                }
            }
        }

        Ok(())
    }
