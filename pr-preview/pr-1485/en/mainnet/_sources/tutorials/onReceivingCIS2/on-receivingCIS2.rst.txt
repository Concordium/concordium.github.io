.. _cis2-receiving:

========================================
Implementing CIS-2 token receiving hooks
========================================

In this tutorial, you'll learn how to handle incoming **CIS-2 tokens** in your Concordium smart contract by implementing the ``onReceivingCIS2`` hook.
You will write a simple contract that automatically forwards any received tokens to prevent them from being locked in the contract.

Understanding token receiving hooks
===================================

On Concordium, `CIS-2 <https://proposals.concordium.software/CIS/cis-2.html>`_ is a token standard that defines a standard interface for both fungible and non-fungible tokens implemented in a smart contract.

When one contract sends CIS-2 tokens to another contract, the receiving contract needs a way to handle these incoming tokens properly. This is where the ``onReceivingCIS2`` hook comes in.

This mechanism enables contracts to process incoming tokens correctly. Think of the ``onReceivingCIS2`` function like a building's mailroom. Just as a mailroom has specific procedures for receiving, sorting, and distributing packages, this function defines how your contract handles incoming tokens. \
When another contract sends tokens to your contract, the ``onReceivingCIS2`` hook automatically triggers, allowing your contract to process these tokens according to your defined rules.

This hook is essential because:

- It prevents tokens from becoming permanently locked
- It lets you define specific handling logic for incoming tokens
- It enables secure contract-to-contract token transfers

Creating a token forwarder contract
====================================

Follow these steps to create a contract that automatically forwards any received tokens to its owner. This pattern helps protect against tokens becoming stuck in your contract.

Initialize the Project
----------------------

Create a new smart contract project using the **init** command. After selecting template `default`, the command line will ask for a project name. Call it `token-receiver` to follow along with this tutorial.
Then add the **concordium-cis2** library.

.. code-block:: console

   $ cargo concordium init
   $ cd token-receiver
   $ cargo add concordium-cis2

Now that we have our project structure, we'll implement the contract step by step.

Writing the contract
--------------------

Open ``src/lib.rs``, we will modify the template.

1. First, let's define our imports and type aliases:

.. code-block:: rust

    #![cfg_attr(not(feature = "std"), no_std)]

    use concordium_cis2::*;
    use concordium_std::*;

    type ContractTokenId = TokenIdVec;
    type ContractTokenAmount = TokenAmountU256;

We are using the `TokenIdVec <https://docs.rs/concordium-cis2/latest/concordium_cis2/struct.TokenIdVec.html>`_ and `TokenAmountU256 <https://docs.rs/concordium-cis2/latest/concordium_cis2/struct.TokenAmountU256.html>`_ types in order to allow for any type of **CIS2 tokens** to be sent to the contract.
In order to use the **TokenAmountU256** structure, the dependencies in ``Cargo.toml`` need to be updated by enabling this feature:

.. code-block:: rust

    [dependencies]
    concordium-cis2 = { version = "6.2.0", features = ["u256_amount"] }
    concordium-std = { version = "10.0", default-features = false }

2. Modify the template code, replace the template's ``State`` and ``Error`` with simpler versions:

.. code-block:: rust

    #[derive(Serialize, SchemaType)]
    struct State {
        message: String,
    }

    #[derive(Debug, PartialEq, Eq, Reject, Serialize, SchemaType)]
    enum CustomContractError {
        #[from(ParseError)]
        ParseParams,
        InvokeContractError,
    }

    impl From<CustomContractError> for Cis2Error<CustomContractError> {
        fn from(c: CustomContractError) -> Self {
            Cis2Error::Custom(c)
        }
    }

    impl<T> From<CallContractError<T>> for CustomContractError {
        fn from(_: CallContractError<T>) -> Self {
            Self::InvokeContractError
        }
    }

    type ContractError = Cis2Error<CustomContractError>;

A simple message string will be stored in the state.

3. Modify the initialization function:

.. code-block:: rust

    #[init(contract = "token_forwarder")]
    fn init(_ctx: &InitContext, _state_builder: &mut StateBuilder) -> InitResult<State> {
        Ok(State {
            message: "Token Forwarder initialized!".to_string(),
        })
    }

This method will initialize the contract and assign a value to the **message string**.

4. Modify the token receiving function. This will become the main method of the contract, the ``onReceivingCIS2`` function that handles incoming tokens:

.. code-block:: rust

    #[receive(
    contract = "token_forwarder",
    name = "onReceivingCIS2",
    parameter = "OnReceivingCis2Params<ContractTokenId, ContractTokenAmount>",
    error = "ContractError",
    mutable
    )]
    fn contract_receive_cis2(ctx: &ReceiveContext, host: &mut Host<State>) -> Result<(), ContractError> {
        // Get information about received tokens
        let params: OnReceivingCis2Params<ContractTokenId, ContractTokenAmount> = ctx.parameter_cursor().get()?;

        // Get the token contract that sent the tokens
        let token_contract = match ctx.sender() {
            Address::Contract(contract) => contract,
            _ => return Ok(()), // Non-contract senders are ignored
        };

        // Create transfer to forward tokens to contract owner
        let transfer = Transfer {
            token_id: params.token_id.clone(),
            amount: params.amount,
            from: Address::Contract(ctx.self_address()),
            to: Receiver::from_account(ctx.owner()),
            data: AdditionalData::empty(),
        };

        // Update the message with forwarding information
        let new_message = format!(
            "Forwarded tokenId {:?} from contract with index {} to owner",
            params.token_id,
            token_contract.index
        );
        host.state_mut().message = new_message;

        // Execute the transfer
        host.invoke_contract_read_only(
            &token_contract,
            &TransferParams::from(vec![transfer]),
            EntrypointName::new_unchecked("transfer"),
            Amount::zero(),
        )?;

        Ok(())
    }

5. Add a view helper function to read the message stored in the state:

.. code-block:: rust

    #[receive(
        contract = "token_forwarder",
        name = "view",
        return_value = "String",
        error = "ContractError"
    )]
    fn view(_ctx: &ReceiveContext, host: &Host<State>) -> Result<String, ContractError> {
        Ok(host.state().message.clone())
    }

This method provides the ability to view the latest forwarding message stored in the state.

Build and Deploy
----------------

Now let's build our contract:

.. code-block:: console

    $ cargo concordium build --out tokenForwarder.module.wasm.v1

After building successfully, a module file will be created. Next, let's deploy the contract:

.. code-block:: console

    $ concordium-client --secure --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com \
    module deploy tokenForwarder.module.wasm.v1 \
    --sender <your-account-address> \
    --energy <max-energy-allowed>

After successful deployment, you'll receive a module reference in the following format:

.. code-block:: json
    :force:

    d121f262f3d34b9737faa5ded2135cf0b994c9c32fe90d7f11fae7cd31441e86

Save this reference - you'll need it for contract initialization and future reference. To initialize, run the following command:

.. code-block:: console

    $ concordium-client --secure --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com \
    contract init <saved_reference> \
    --sender <your-account-address> \
    --contract token_forwarder \
    --energy <max-energy-allowed>

If successful, you will receive a message with the contract's index and subindex, in the following format:

.. code-block:: json
    :force:

    Contract successfully initialized with address: {"index":10710,"subindex":0}


Testing the functionality
-------------------------

We will test our token forwarder on the testnet. We'll need some **CIS-2 tokens** (like wCCD) and we'll send them to the **token forwarder**, using the `wCCD <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/cis2-wccd/src/lib.rs>`_ contract as an entrypoint, such that the transfer will be sent from contract to contract.

You can acquire some wCCD tokens on the `wCCD dApp <https://wccd.testnet.concordium.com/>`_ by wrapping some of your **CCD**.

Here's the command, we are using the **transfer** function of the **wCCD smart contract** as an entrypoint:

.. code-block:: console

    $ concordium-client --secure --grpc-port 20000 --grpc-ip grpc.testnet.concordium.com \
    contract update <wCCD-contract-index> \
    --entrypoint "transfer" \
    --parameter-json transfer.json \
    --sender <your-account-address> \
    --energy <max-energy-allowed> \

.. dropdown:: Input parameters for the ``transfer`` function (click here)

    Create a ``transfer.json`` file and insert the below JSON array.

    .. code-block:: json
        :force:

        [
            {
                "amount": AMOUNT,
                "data": DATA_STRING,
                "from": {
                    "Enum": [
                        {
                            "Account": [
                                ACCOUNT_ADDRESS
                            ]
                        },
                        {
                            "Contract": [
                                {
                                    "index": INDEX,
                                    "subindex": SUBINDEX
                                }
                            ]
                        }
                    ]
                },
                "to": {
                    "Enum": [
                        {
                            "Account": [
                                ACCOUNT_ADDRESS
                            ]
                        },
                        {
                            "Contract": [
                                {
                                    "index": INDEX,
                                    "subindex": SUBINDEX
                                },
                                ENTRYPOINT_NAME
                            ]
                        }
                    ]
                },
                "token_id": TOKEN_ID
            }
        ]

    .. note::

        You can execute several transfers in the above array.

    If you insert everything correctly, the JSON array should look similar to
    the below JSON array that will transfer 1000 wCCD from an account address(your account in this case) to a contract.

    Replace **<token-forwarder-index>** with the index of the received in the previous section.

    .. code-block:: json
        :force:

        [
            {
            "amount": "1000",
            "data": "",
            "from": {
                "Account": [
                    "2xUeDsSS8fRfdXuPeDiFTsrJyxsAQhCw2xw9GYARnJpCM3iaeL"
                ]
            },
            "to": {
                "Contract": [
                    {
                        "index": <token-forwarder-index>,
                        "subindex": 0
                    },
                    "onReceivingCIS2"
                ]
            },
            "token_id": ""
            }
        ]

The index of the **wCCD contract** is **2059** on testnet.
The transfer process executes in the following steps:

1. Tokens are transfered from your account to the wCCD contract instance
2. The wCCD contract transfers tokens to the token_forwarder
3. The ``onReceivingCIS2`` function activates automatically
4. The token_forwarder contract verifies the sender, rejects non-contract senders and processes the tokens
5. The tokens are immediately forwarded to the contract owner's account

The ``onReceivingCIS2`` hook provides a foundation for safely handling incoming tokens while enabling sophisticated contract-to-contract interactions on Concordium.
