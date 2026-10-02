.. _mid-tutorial-contract-interactions:

==============================================
Contract interactions with Concordium-Rust-SDK
==============================================

Now, continue with the client development. First, you will create a new instance of your deployed contract with the module reference you have. To structure things a bit, create another folder for your client with cargo.

.. code-block:: console

    cargo new cis2-rust-sdk-minting

As the first step, you need to add dependencies to the **Cargo.toml** file. Add the dependencies shown below, including SDK, web client components, command line and error handlers, serialization, and time libraries.

.. code-block:: toml

    [dependencies]

    concordium-rust-sdk="2"
    tokio = { version = "1", features = ["full"] }
    warp = "0.3"
    log = "0.4.11"
    env_logger = "0.9"
    clap = { version = "4", features = ["derive"] }
    anyhow = "1.0"
    chrono = "0.4.19"
    thiserror = "1"
    structopt = "0.3.26"
    serde = { version = "1.0", features = ["derive"] }
    serde_json = "1.0"
    strum = "0.24"
    strum_macros = "0.24"

Then in **main.rs** start adding the necessary libraries to your program. You need the command line argument parser (clap) for getting parameters and **structopt** for parsing the input parameters as a struct. You also need the **path** library to manipulate file paths, for example, the path of your wallet file, and many internal concordium-rust-sdk functions for making the transactions, serialization, accounts and more.

.. code-block:: console

    use crate::clap::AppSettings;
    use anyhow::Context;
    use concordium_rust_sdk::{
        common::{self, types::TransactionTime, SerdeDeserialize, SerdeSerialize},
        smart_contracts::{
            common as concordium_std,
            common::Amount,
            types::{OwnedContractName, OwnedReceiveName},
        },
        types::{
            smart_contracts::{ModuleReference, OwnedParameter, WasmModule},
            transactions::{send, BlockItem, InitContractPayload, UpdateContractPayload},
            AccountInfo, ContractAddress, WalletAccount,
        },
        v2,
    };
    use std::path::PathBuf;
    use structopt::*;

    use strum_macros::EnumString;

For simplicity, create an enum that represents the actions that you would like to do. In that ``Action`` enum, specify the transaction types as following: ``Deploy``, ``Init``, ``WithSchema``. In the ``Deploy`` action, specify your module's path, and in the ``Init`` action, specify only the deployed module reference. In the ``WithSchema`` action, specify the transaction parameter for minting, transferring, or viewing the contract state. Note that all will be invokable with the schema file.

.. code-block:: console

    #[derive(StructOpt)]
    enum Action {
        #[structopt(about = "Deploy the module")]
        Deploy {
            #[structopt(long = "module", help = "Path to the contract module.")]
            module_path: PathBuf,
        },
        #[structopt(about = "Initialize the CIS-2 NFT contract")]
        Init {
            #[structopt(
                long,
                help = "The module reference used for initializing the contract instance."
            )]
            module_ref: ModuleReference,
        },
        #[structopt(
            about = "Update the contract and set the provided  using JSON parameters and a \
                    schema."
        )]
        WithSchema {
            #[structopt(long, help = "Path of the JSON parameter.")]
            parameter: PathBuf,
            #[structopt(long, help = "Path to the schema.")]
            schema: PathBuf,
            #[structopt(long, help = "The contract to update.")]
            address: ContractAddress,
            #[structopt(long, help = "Transaction Type")]
            transaction_type_: TransactionType,
        },
    }

Add an enum to distinguish all transactions that require a schema that comes with the ``WithSchema`` parameter. You need the schema file for both state-changing and view functions (to print in a human-readable form).

.. code-block:: console

    #[derive(StructOpt, EnumString)]
    enum TransactionType {
        #[structopt(about = "Mint")]
        Mint,
        #[structopt(about = "Transfer")]
        Transfer,
        #[structopt(about = "TokenMetadata")]
        TokenMetadata,
        #[structopt(about = "View")]
        View,
    }

Use the ``TransactionResult`` to escape an error for incompatible type error for returning different results from each match. Every state change after each invocation, including ``init_contract``, ``deploy_contract``, and ``update_contract`` needs to be treated differently than the ``tokenMetadata()`` and the ``view()`` functions. In order to call these view functions (which won't cause any state changes), call the ``invoke_instance`` function, which has a return type. So having a parent enum helps you to return the same types, but gives you the ability to manipulate each one individually.

.. code-block:: console

    #[derive(Debug)]
    enum TransactionResult {
        StateChanging(AccountTransaction<EncodedPayload>),
        None,
    }

Now, you need to set the base configurations including node setup. Since you are going to deploy this contract to testnet, use the testnet node gRPC endpoint as the default provided by Concordium which is **testnet.node.concordium.com**. You also need your key file path (the file exported from the wallet) and the ``Action``. All of these are configurable from the terminal as an input parameter.

.. code-block:: console

    /// Node connection, key path and the action input struct
    #[derive(StructOpt)]
    struct App {
        #[structopt(
            long = "node",
            help = "GRPC interface of the node.",
            default_value = "http://node.testnet.concordium.com:20000"
        )]
        endpoint: v2::Endpoint,
        #[structopt(long = "account", help = "Path to the account key file.")]
        keys_path: PathBuf,
        #[structopt(subcommand, help = "The action you want to perform.")]
        action: Action,
    }

Now you can create your ``main()`` function. As you can see from the code below, it is a multi-threaded runtime that can handle multiple requests simultaneously. It reads the inputs from the terminal and creates a connection with Concordium by creating a client. Upload your key file by providing its path, and get the nonce of the last finalized block to have the full list of the accounts onboarded. Then check the ``action`` type to decide whether this is going to be a ``Deploy``, ``Init`` or ``WithSchema`` transaction in a match or switch case statement. (In Rust, there is no switch case statement.) Start coding ``Deploy`` and ``Init`` first, then continue with ``WithSchema``.

.. code-block:: console

    #[tokio::main(flavor = "multi_thread")]
    async fn main() -> anyhow::Result<()> {
        use base64::{engine::general_purpose, Engine as _};
        let app = {
            let app = App::clap().global_setting(AppSettings::ColoredHelp);
            let matches = app.get_matches();
            App::from_clap(&matches)
        };

        let mut client = v2::Client::new(app.endpoint)
            .await
            .context("Cannot connect.")?;

        // load account keys and sender address from a file
        let keys: WalletAccount =
            WalletAccount::from_json_file(app.keys_path).context("Could not read the keys file.")?;

        // Get the initial nonce at the last finalized block.
        let acc_info: AccountInfo = client
            .get_account_info(&keys.address.into(), &v2::BlockIdentifier::Best)
            .await?
            .response;

        let nonce = acc_info.account_nonce;
        // set expiry to now + 5min
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

Deploy contract
===============

In order to deploy the contract and all other transactions, you use the ``send()`` wrapper from the concordium-rust-sdk under the **transactions** library. You read the Wasm compiled smart contract module, and after deserializing it, invoke the ``deploy_module()`` function from the same library. For structuring the directory a bit better, create a folder called **nft-params** and copy and paste the exported wallet file and the module from **concordium-out** into it.

.. code-block:: console

    let tx = match app.action {
            Action::Deploy { module_path } => {
                let contents = std::fs::read(module_path).context("Could not read contract module.")?;
                let payload: WasmModule =
                    common::Deserial::deserial(&mut std::io::Cursor::new(contents))?;
                TransactionResult::StateChanging(send::deploy_module(
                    &keys,
                    keys.address,
                    nonce,
                    expiry,
                    payload,
                ))
            }

.. image:: ../../images/mid-nft-scactions1.png

Build your file first, then run the executable in the target/debug folder with the command below.

.. code-block:: console

    cargo build
    cd target/debug
    ./cis2-rust-sdk-minting --account ../../nft-params/wallet.export deploy --module ../../nft-params/module.wasm.v1

.. image:: ../../images/mid-nft-scactions2.png

Congrats! You have successfully deployed your smart contract!

Initialize contract
===================

Now you will create a new instance of the deployed contract. The first ``match``checks whether the action is ``Init``. Then you add an empty ``OwnedParam`` because your smart contract ``init`` function doesn't require an input parameter, and similarly, there is no ``Amount`` for this function as a payment. But the ``init`` function itself requires the ``module_reference`` that you had in the previous step. Use that and call the ``init_contract()`` function from ``send`` wrapper of the **transactions** library.

.. code-block:: console

    Action::Init {
                module_ref: mod_ref,
            } => {
                let param = OwnedParameter::empty();
                //                 .expect("Known to not exceed parameter size limit.");
                let payload = InitContractPayload {
                    amount: Amount::zero(),
                    mod_ref,
                    init_name: OwnedContractName::new_unchecked(
                        "init_rust_sdk_minting_tutorial".to_string(),
                    ),
                    param,
                };
                TransactionResult::StateChanging(send::init_contract(
                    &keys,
                    keys.address,
                    nonce,
                    expiry,
                    payload,
                    10000u64.into(),
                ))
            }

.. code-block:: console

    ./cis2-rust-sdk-minting --account ../../nft-params/wallet.export init --module-ref <YOUR-MODULE-REFERENCE>

.. image:: ../../images/mid-nft-scactions3.png

In the following sections, you will use the schema file either while changing the state with ``transfer()`` or ``mint()`` functions, or to print return values in the form of JSON from the contract.

Using schema in view and state changing functions
=================================================

You will need the schema file when calling ``mint()`` and ``transfer()`` functions and any view functions printing, including ``tokenMetadata()`` and ``view()``. First, you need to read and load schema from the **.bs64** output file. For convenience, copy and paste it from the **concordium-out** folder to the **nft-params** folder. Note that base64 encoding is without padding, so decode it accordingly. Then you have the ``TransactionType`` enum which helps you to distinguish the transactions because each one needs different parameters, invokes different functions, and uses different parts of the schema.

For the sake of the ``match`` statement’s return type mismatch error, after every transaction the return type is ``TransactionResult``. Depending on the transaction, it returns ``TransactionResult::StateChanging`` (if it’s a mint or transfer), or ``TransactionResult::None`` (if it’s a view function).

.. code-block:: console

    Action::WithSchema {
                parameter,
                schema,
                address,
                transaction_type_,
            } => {
                let parameter: serde_json::Value = serde_json::from_slice(
                    &std::fs::read(parameter.unwrap()).context("Unable to read parameter file.")?,
                )
                .context("Unable to parse parameter JSON.")?;

                let schemab64 = std::fs::read(schema).context("Unable to read the schema file.")?;
                let schema_source = general_purpose::STANDARD_NO_PAD.decode(schemab64);

                let schema = concordium_std::from_bytes::<concordium_std::schema::VersionedModuleSchema>(
                    &schema_source?,
                )?;
                // schema_global = schema;
                match transaction_type_ {
                    TransactionType::Mint => {
                        let param_schema =
                            schema.get_receive_param_schema("rust_sdk_minting_tutorial", "mint")?;
                        let serialized_parameter = param_schema.serial_value(&parameter)?;
                        let message = OwnedParameter::try_from(serialized_parameter).unwrap();
                        let payload = UpdateContractPayload {
                            amount: Amount::zero(),
                            address,
                            receive_name: OwnedReceiveName::new_unchecked(
                                "rust_sdk_minting_tutorial.mint".to_string(),
                            ),
                            message,
                        };

                        TransactionResult::StateChanging(send::update_contract(
                            &keys,
                            keys.address,
                            nonce,
                            expiry,
                            payload,
                            10000u64.into(),
                        ))
                    }
                    //// Transfer Transaction which changes the state
                    TransactionType::Transfer => {
                        let param_schema =
                            schema.get_receive_param_schema("rust_sdk_minting_tutorial", "transfer")?;
                        let serialized_parameter = param_schema.serial_value(&parameter)?;
                        let message = OwnedParameter::try_from(serialized_parameter).unwrap();
                        let payload = UpdateContractPayload {
                            amount: Amount::zero(),
                            address,
                            receive_name: OwnedReceiveName::new_unchecked(
                                "rust_sdk_minting_tutorial.transfer".to_string(),
                            ),
                            message,
                        };
                        //// call update contract with the payload
                        TransactionResult::StateChanging(send::update_contract(
                            &keys,
                            keys.address,
                            nonce,
                            expiry,
                            payload,
                            10000u64.into(),
                        ))
                    }
                    /// Token Metadata function with no state change
                    TransactionType::TokenMetadata => {
                        let param_schema = schema
                            .get_receive_param_schema("rust_sdk_minting_tutorial", "tokenMetadata")?;
                        let rv_schema = schema.get_receive_return_value_schema(
                            "rust_sdk_minting_tutorial",
                            "tokenMetadata",
                        )?;

                        let serialized_parameter = param_schema.serial_value(&parameter)?;
                        let context = ContractContext {
                            invoker: None, //Account(AccountAddress),
                            contract: address,
                            amount: Amount::zero(),
                            method: OwnedReceiveName::new_unchecked(
                                "rust_sdk_minting_tutorial.tokenMetadata".to_string(),
                            ),
                            parameter: OwnedParameter::try_from(serialized_parameter).unwrap(), //Default::default(),
                            energy: 1000000.into(),
                        };
                        // invoke instance
                        let info = client
                            .invoke_instance(&BlockIdentifier::Best, &context)
                            .await?;

                        match info.response {
                                concordium_rust_sdk::types::smart_contracts::InvokeContractResult::Success { return_value, .. } => {
                                    let bytes: concordium_rust_sdk::types::smart_contracts::ReturnValue = return_value.unwrap();
                                    // deserialize and print return value
                                    println!( "{}",rv_schema.to_json_string_pretty(&bytes.value)?);//jsonxf::pretty_print(&param_schema.to_json_string_pretty(&bytes.value)?).unwrap());
                                }
                                _ => {
                                    println!("Could'nt succesfully invoke the instance. Check the parameters.")
                                }
                            }
                        TransactionResult::None

                        // info
                    }
                    TransactionType::View => {
                        let rv_schema = schema
                            .get_receive_return_value_schema("rust_sdk_minting_tutorial", "view")?;

                        let context = ContractContext {
                            invoker: None, //Account(AccountAddress),
                            contract: address,
                            amount: Amount::zero(),
                            method: OwnedReceiveName::new_unchecked(
                                "rust_sdk_minting_tutorial.view".to_string(),
                            ),
                            parameter: Default::default(),
                            energy: 1000000.into(),
                        };
                        // invoke instance
                        let info = client
                            .invoke_instance(&BlockIdentifier::Best, &context)
                            .await?;

                        match info.response {
                                concordium_rust_sdk::types::smart_contracts::InvokeContractResult::Success { return_value, .. } => {
                                    let bytes: concordium_rust_sdk::types::smart_contracts::ReturnValue = return_value.unwrap();
                                    // deserialize and print return value
                                    println!( "{}",rv_schema.to_json_string_pretty(&bytes.value)?);//jsonxf::pretty_print(&param_schema.to_json_string_pretty(&bytes.value)?).unwrap());
                                }
                                _ => {
                                    println!("Could'nt succesfully invoke the instance. Check the parameters.")
                                }
                            }
                        TransactionResult::None

                        // info
                    }
                }
            }

Finally, for the transaction output, you have one final ``match`` statement with ``TransactionResult``, which will print the transaction details including module reference when deployed, contract address when initialized, and rejection reason if it's rejected by looking at the ``BlockSummaryDetails``. The program will print the view functions’ returns in the previous section so in this final ``match`` they are just gracefully exiting.

.. code-block:: console

    match tx {
        TransactionResult::StateChanging(result) => {
            let item = BlockItem::AccountTransaction(result);
            // submit the transaction to the chain
            let transaction_hash = client.send_block_item(&item).await?;
            println!(
                "Transaction {} submitted (nonce = {}).",
                transaction_hash, nonce,
            );
            let (bh, bs) = client.wait_until_finalized(&transaction_hash).await?;
            println!("Transaction finalized in block {}.", bh);

            match bs.details {
                BlockItemSummaryDetails::AccountTransaction(ad) => {
                    match ad.effects {
                        AccountTransactionEffects::ModuleDeployed { module_ref } => {
                            println!("module ref is {}", module_ref);
                        }
                        AccountTransactionEffects::ContractInitialized { data } => {
                            println!("Contract address is {}", data.address);
                        }
                        AccountTransactionEffects::None {
                            transaction_type,
                            reject_reason,
                        } => {
                            println!("The Rejection Outcome is {:#?}", reject_reason);
                        }
                        _ => (),
                    };
                }
                BlockItemSummaryDetails::AccountCreation(_) => (),
                BlockItemSummaryDetails::Update(_) => {
                    println!("Transaction finalized in block {:?}.", bs.details);
                    ()
                }
            };
        }
         TransactionResult::None => {
            println!("No state changes, already printed, gracefully exiting.");
        }
    }

Mint function
=============

Now you can call the ``mint()`` function from your new instance. For the complete minting tutorial you can follow :ref:`the NFT minting tutorial from Concordium's developer portal<nft-index>`. Create a file called **nft-params.json** (similar to the tutorial) in the **nft-params** folder to mint your token and add your address and token ID to the file. And copy the schema file from the **concordium-out** folder to the **nft-params** folder.

.. code-block:: json

    {
        "owner": {
            "Account": ["YOUR-ACCOUNT-ADDRESS"]
        },
        "tokens": ["TOKEN-ID"]
    }

If you want to check the parameters you can always use ``— help`` keyword.

.. image:: ../../images/mid-nft-scactions4.png

You will call ``with-schema`` which requires the contract address, parameters, schema, and transaction type. Since there could be multiple transaction types like mint, transfer, view, burn, etc. you have added another enum ``TransactionType``. Specification of the transaction type is necessary while starting the program using the command line. You are also expected to provide the JSON parameters and the schema file; both will be read from the provided path. If you need more details use ``— help`` again.

.. image:: ../../images/mid-nft-scactions5.png

Use the command below to invoke the ``mint()`` function.

.. code-block:: console

    ./cis2-rust-sdk-minting --account ../../nft-params/wallet.export with-schema --address "<INDEX,SUBINDEX>" --parameter ../../nft-params/nft-params.json --schema ../../nft-params/module-schema.bs64 --transaction-type Mint

.. image:: ../../images/mid-nft-scactions6.png

Congrats! You have successfully minted your first token using the Concordium Rust-SDK!

TokenMetadata function
======================

Check your token’s metadata URL. Invoke the ``tokenMetadata()`` function of **cis2-nft**. It requires ``token_id``. Create a JSON file like below and add any ``token_id`` s to send as a parameter.

.. code-block:: json

    [
        "TOKEN-ID",
        "TOKEN-ID"
    ]

.. code-block:: console

    ./cis2-rust-sdk-minting --account ../../nft-params/wallet.export with-schema --address "<INDEX,SUBINDEX>" --parameter ../../nft-params/token-id.json --schema ../../nft-params/module-schema.bs64 --transaction-type TokenMetadata

.. image:: ../../images/mid-nft-scactions7.png

View function
=============

Finally, invoke the ``view()`` function, which simply returns the current state of the contract instance. It doesn't necessarily require a parameter to be invoked, but your program waits for a parameter so you can use the same **token_id.json** file to display the state.

.. code-block:: console

    ./cis2-rust-sdk-minting --account ../../nft-params/wallet.export with-schema --address "<INDEX,SUBINDEX>" --parameter ../../nft-params/token-id.json --schema ../../nft-params/module-schema.bs64 --transaction-type View

.. image:: ../../images/mid-nft-scactions8.png

Congrats! You have successfully completed the Concordium NFT Minting Tutorial with Rust-SDK! The full code can be found `here <https://github.com/bogacyigitbasi/nft-rust-sdk>`_.
