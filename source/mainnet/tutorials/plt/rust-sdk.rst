.. _plt-rust-sdk:

========
Rust SDK
========

This guide shows how to work with Protocol-Level Tokens using Concordium's Rust SDK.

Installation and setup
======================

Before using this example, make sure your Cargo.toml includes:

.. code-block:: toml

  # Concordium dependencies
  concordium-rust-sdk = "=8.0.0"
  concordium_base = "=9.0.0"


Available examples
===================

See the following sections for detailed examples:

**Querying tokens:**

- :ref:`Get token list<rust-get-token-list>`
- :ref:`Get token information<rust-get-token-info>`
- :ref:`Get account information<rust-get-account-info>`

**Token holder operations:**

- :ref:`Transfer tokens<rust-transfer-tokens>`
- :ref:`Mint tokens<rust-mint-tokens>`
- :ref:`Burn tokens<rust-burn-tokens>`

**Token governance operations:**

- :ref:`Add account to allow list<rust-add-to-allow-list>`
- :ref:`Remove account from allow list<rust-remove-from-allow-list>`
- :ref:`Add account to deny list<rust-add-to-deny-list>`
- :ref:`Remove account from deny list<rust-remove-from-deny-list>`
- :ref:`Pause a token<rust-pause-token>`
- :ref:`Unpause a token<rust-unpause-token>`


Querying tokens
===============

.. _rust-get-token-list:

Get token list
--------------

This example demonstrates how to retrieve a list of all Protocol Level Tokens on the Concordium blockchain.
Optionally specify a block hash for historical token lists.

.. code-block:: rust

    //! # Get Protocol Level Token List
    //! This example demonstrates how to retrieve a list of all (PLTs) on the Concordium blockchain.
    //! ## How to use this example:
    //! 1. Optionally set a specific block hash in `BLOCK_HASH` (or leave as None for latest)
    //! 2. Run with: `cargo run --example get_token_list`

    use anyhow::Context;
    use concordium_base::hashes::BlockHash;
    use concordium_rust_sdk::v2;
    use futures::StreamExt;
    use std::str::FromStr;

    // CONFIGURATION - Modify these values for your use case
    const BLOCK_HASH: Option<&str> = None; // Set to Some("blockhash") for specific block, None for latest

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        // Determine block identifier
        let block_ident = match BLOCK_HASH {
            Some(hash_str) => {
                let block_hash = BlockHash::from_str(hash_str).context("Invalid block hash format")?;
                v2::BlockIdentifier::Given(block_hash)
            }
            None => v2::BlockIdentifier::LastFinal,
        };

        // Get token list
        let mut response = client
            .get_token_list(&block_ident)
            .await
            .context("Failed to get token list")?;

        println!(
            "Listing the Token ID of every protocol level token on chain at the time of block hash {}:",
            response.block_hash
        );
        // Collect tokens
        while let Some(token_id) = response
            .response
            .next()
            .await
            .transpose()
            .context("Error while reading token from stream")?
        {
            println!(" - {}", String::from(token_id));
        }

        Ok(())
    }

.. _rust-get-token-info:

Get token information
---------------------

This example demonstrates how to retrieve information about a Protocol Level Token (PLT).
Set the token ID to query and optionally specify a block hash for historical data.

.. code-block:: rust

    //! # Get Protocol Level Token Information
    //! This example demonstrates how to retrieve information about a Protocol Level Token (PLT).
    //! ## How to use this example:
    //! 1. Set the token ID to query in the `TOKEN_ID` constant below
    //! 2. Optionally set a specific block hash in `BLOCK_HASH` (or leave as None for latest)
    //! 3. Run with: `cargo run --example get_token_info`

    use anyhow::Context;
    use concordium_base::{hashes::BlockHash, protocol_level_tokens::TokenId};
    use concordium_rust_sdk::v2;
    use std::str::FromStr;

    // CONFIGURATION - Modify these values for your use case
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with the actual token ID you want to query
    const BLOCK_HASH: Option<&str> = None; // Set to Some("blockhash") for specific block, None for latest

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        // Parse token ID
        let token_id = TokenId::try_from(TOKEN_ID.to_string()).context("Invalid token ID format")?;

        // Determine block identifier
        let block_ident = match BLOCK_HASH {
            Some(hash_str) => {
                let block_hash = BlockHash::from_str(hash_str).context("Invalid block hash format")?;
                v2::BlockIdentifier::Given(block_hash)
            }
            None => v2::BlockIdentifier::LastFinal,
        };

        // Get token information
        let response = client
            .get_token_info(token_id.clone(), &block_ident)
            .await
            .context("Failed to get token info")?;

        let token_info = &response.response;
        let token_state = &token_info.token_state;

        // Display token information
        println!("Total token supply: {}", token_state.total_supply);
        println!("decimals: {}", token_state.decimals);
        println!("moduleRef: {}", token_state.token_module_ref);
        println!("Token id: {}", String::from(token_info.token_id.clone()));
        println!("Token state: {:#?}", token_state.decode_module_state());
        Ok(())
    }

.. _rust-get-account-info:

Get account information
-----------------------

This example demonstrates how to retrieve account information including PLT balances.
Set the account address to query and optionally specify a block hash for historical data.

.. code-block:: rust

    //! # Get Account Information
    //! This example demonstrates how to retrieve account information including PLT balances.
    //! ## How to use this example:
    //! 1. Set the account address to query in the `ACCOUNT_ADDRESS` constant below
    //! 2. Optionally set a specific block hash in `BLOCK_HASH` (or leave as None for latest)
    //! 3. Run with: `cargo run --example get_account_info`

    use anyhow::Context;
    use concordium_base::{contracts_common::AccountAddress, hashes::BlockHash};
    use concordium_rust_sdk::v2;
    use std::str::FromStr;

    // CONFIGURATION - Modify these values for your use case
    const ACCOUNT_ADDRESS: &str = "TARGET_ADDRESS"; // Replace with the actual account address you want to query
    const BLOCK_HASH: Option<&str> = None; // Set to Some("blockhash") for specific block, None for latest

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        // Parse account address
        let account_address =
            AccountAddress::from_str(ACCOUNT_ADDRESS).context("Invalid account address format")?;

        // Determine block identifier
        let block_ident = match BLOCK_HASH {
            Some(hash_str) => {
                let block_hash = BlockHash::from_str(hash_str).context("Invalid block hash format")?;
                v2::BlockIdentifier::Given(block_hash)
            }
            None => v2::BlockIdentifier::LastFinal,
        };

        // Get account information
        let account_info = client
            .get_account_info(&account_address.into(), &block_ident)
            .await
            .context("Failed to get account info")?;

        // Display basic account information
        println!("Account balance: {}", account_info.response.account_amount);
        println!("Account address: {}", account_info.response.account_address);

        // Display PLT token balances
        let token_balances = &account_info.response.tokens;
        for balance in token_balances {
            println!(
                "Token {}, balance {}",
                String::from(balance.token_id.clone()),
                balance.state.balance
            );
            println!(
                "Token {}, state {:#?}",
                String::from(balance.token_id.clone()),
                balance.state.decode_module_state()
            );
        }

        Ok(())
    }

Token holder operations
=======================

.. _rust-transfer-tokens:

Transfer tokens
---------------

This example demonstrates how to transfer Protocol Level Tokens from one account to another.
Configure the recipient address and amount to complete the transfer.

.. code-block:: rust

    //! # Transfer Protocol Level Tokens
    //! This example demonstrates how to transfer Protocol Level Tokens (PLTs) from one account to another.
    //! ## How to use this example:
    //! 1. Set your wallet file path in the `WALLET_FILE` constant below
    //! 2. Set the token ID in the `TOKEN_ID` constant
    //! 3. Set the recipient address in the `RECIPIENT_ADDRESS` constant
    //! 4. Set the amount to transfer in the `TOKEN_AMOUNT` constant
    //! 5. Run with: `cargo run --example transfer_tokens`
    //! full example in the rust sdk repository: https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/plt-transfer.rs

    use anyhow::Context;
    use concordium_base::{
        contracts_common::AccountAddress,
        protocol_level_tokens::{operations, TokenAmount, TokenId},
    };
    use concordium_rust_sdk::{
        common::types::TransactionTime,
        types::{
            transactions::{send, BlockItem},
            WalletAccount,
        },
        v2::{self, BlockIdentifier},
    };
    use rust_decimal::Decimal;
    use std::{path::PathBuf, str::FromStr}; // Added PathBuf import

    // CONFIGURATION - Modify these values for your use case
    const WALLET_FILE: &str = "keys/wallet.export";
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with the actual token ID you want to transfer
    const RECIPIENT_ADDRESS: &str = "RECIPIENT_ADDRESS"; // Replace with the actual recipient address
    const TOKEN_AMOUNT: &str = "1"; // Amount to transfer as decimal string

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        // Parse token ID
        let token_id = TokenId::try_from(TOKEN_ID.to_string())?;

        // Get token info for decimal handling
        let token_info = client
            .get_token_info(token_id.clone(), BlockIdentifier::LastFinal)
            .await?
            .response;

        // Convert amount to proper token amount with decimals
        let mut amount = Decimal::from_str(TOKEN_AMOUNT)?;
        amount.rescale(token_info.token_state.decimals as u32);
        let token_amount =
            TokenAmount::from_raw(amount.mantissa().try_into()?, amount.scale().try_into()?);

        println!("Token amount: {}", token_amount);

        // Parse recipient address
        let recipient_address = AccountAddress::from_str(RECIPIENT_ADDRESS)?;

        // Load account keys from wallet file
        let keys: WalletAccount = WalletAccount::from_json_file(PathBuf::from(WALLET_FILE))
            .context("Could not read the wallet file")?;

        // Get the next nonce
        let nonce = client
            .get_next_account_sequence_number(&keys.address)
            .await?
            .nonce;

        // Set expiry to now + 5 minutes
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

        // Create transfer operation (like in the original)
        let operation = operations::transfer_tokens(recipient_address, token_amount);

        // Compose operation to transaction (like in the original)
        let txn = send::token_update_operations(
            &keys,
            keys.address,
            nonce,
            expiry,
            token_id,
            [operation].into_iter().collect(),
        )?;

        let item = BlockItem::AccountTransaction(txn);

        // Submit transaction
        let transaction_hash = client.send_block_item(&item).await?;
        println!(
            "Transaction {} submitted (nonce = {})",
            transaction_hash, nonce
        );

        // Wait for finalization
        let (block_hash, block_summary) = client.wait_until_finalized(&transaction_hash).await?;
        println!("Transaction finalized in block {}", block_hash);
        println!("The outcome is {:#?}", block_summary);

        Ok(())
    }

.. _rust-mint-tokens:

Mint tokens
-----------

This example demonstrates how to mint new Protocol Level Tokens.
Only the token issuer can perform mint operations, adding new tokens to circulation.

.. code-block:: rust

    //! # Mint Protocol Level Tokens
    //! This example demonstrates how to mint new Protocol Level Tokens.
    //! Only the token issuer can perform mint operations.
    //! The minted tokens will be added to the issuer's account.
    //! ## How to use this example:
    //! 1. Set your wallet file path in the `WALLET_FILE` constant below
    //! 2. Set the token ID in the `TOKEN_ID` constant
    //! 3. Set the amount to mint in the `TOKEN_AMOUNT` constant
    //! 4. Run with: `cargo run --example mint_tokens`
    //! full example in the rust sdk repository: https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/plt-mint-and-burn.rs

    use anyhow::Context;
    use concordium_base::protocol_level_tokens::{operations, TokenAmount, TokenId};
    use concordium_rust_sdk::{
        common::types::TransactionTime,
        types::{
            transactions::{send, BlockItem},
            WalletAccount,
        },
        v2::{self, BlockIdentifier},
    };
    use rust_decimal::Decimal;
    use std::{path::PathBuf, str::FromStr};

    // CONFIGURATION - Modify these values for your use case
    const WALLET_FILE: &str = "keys/wallet.export";
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with your token ID
    const TOKEN_AMOUNT: &str = "10"; // Amount to mint as decimal string

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        let token_id = TokenId::try_from(TOKEN_ID.to_string())?;

        // Get token info for decimal handling
        let token_info = client
            .get_token_info(token_id.clone(), BlockIdentifier::LastFinal)
            .await?
            .response;

        let mut amount = Decimal::from_str(TOKEN_AMOUNT)?;
        amount.rescale(token_info.token_state.decimals as u32);
        let token_amount =
            TokenAmount::from_raw(amount.mantissa().try_into()?, amount.scale().try_into()?);

        let keys: WalletAccount = WalletAccount::from_json_file(PathBuf::from(WALLET_FILE))
            .context("Could not read the wallet file")?;

        let nonce = client
            .get_next_account_sequence_number(&keys.address)
            .await?
            .nonce;
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

        println!("Attempting to mint {} {} tokens...", token_amount, TOKEN_ID);

        let operation = operations::mint_tokens(token_amount);
        let txn = send::token_update_operations(
            &keys,
            keys.address,
            nonce,
            expiry,
            token_id,
            [operation].into_iter().collect(),
        )?;
        let item = BlockItem::AccountTransaction(txn);

        let transaction_hash = client.send_block_item(&item).await?;
        println!("Mint transaction submitted with hash: {}", transaction_hash);

        let (_, result) = client.wait_until_finalized(&transaction_hash).await?;
        println!("Transaction finalized: {:#?}", result);

        Ok(())
    }


.. _rust-burn-tokens:

Burn tokens
-----------

This example demonstrates how to burn existing Protocol Level Tokens.
Only the token issuer can perform burn operations, removing tokens from circulation.

.. code-block:: rust

    //! # Burn Protocol Level Tokens
    //! This example demonstrates how to burn existing Protocol Level Tokens.
    //! Only the token issuer can perform burn operations.
    //! The burned tokens will be removed from the issuer's account and the total supply.
    //! ## How to use this example:
    //! 1. Set your wallet file path in the `WALLET_FILE` constant below
    //! 2. Set the token ID in the `TOKEN_ID` constant
    //! 3. Set the amount to burn in the `TOKEN_AMOUNT` constant
    //! 4. Run with: `cargo run --example burn_tokens`
    //! full example in the rust sdk repository: https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/plt-mint-and-burn.rs

    use anyhow::Context;
    use concordium_base::protocol_level_tokens::{operations, TokenAmount, TokenId};
    use concordium_rust_sdk::{
        common::types::TransactionTime,
        types::{
            transactions::{send, BlockItem},
            WalletAccount,
        },
        v2::{self, BlockIdentifier},
    };
    use rust_decimal::Decimal;
    use std::{path::PathBuf, str::FromStr};

    // CONFIGURATION - Modify these values for your use case
    const WALLET_FILE: &str = "keys/wallet.export";
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with your token ID
    const TOKEN_AMOUNT: &str = "10"; // Amount to burn as decimal string

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        let token_id = TokenId::try_from(TOKEN_ID.to_string())?;

        // Get token info for decimal handling
        let token_info = client
            .get_token_info(token_id.clone(), BlockIdentifier::LastFinal)
            .await?
            .response;

        let mut amount = Decimal::from_str(TOKEN_AMOUNT)?;
        amount.rescale(token_info.token_state.decimals as u32);
        let token_amount =
            TokenAmount::from_raw(amount.mantissa().try_into()?, amount.scale().try_into()?);

        let keys: WalletAccount = WalletAccount::from_json_file(PathBuf::from(WALLET_FILE))
            .context("Could not read the wallet file")?;

        let nonce = client
            .get_next_account_sequence_number(&keys.address)
            .await?
            .nonce;
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

        println!("Attempting to burn {} {} tokens...", token_amount, TOKEN_ID);

        let operation = operations::burn_tokens(token_amount);
        let txn = send::token_update_operations(
            &keys,
            keys.address,
            nonce,
            expiry,
            token_id,
            [operation].into_iter().collect(),
        )?;
        let item = BlockItem::AccountTransaction(txn);

        let transaction_hash = client.send_block_item(&item).await?;
        println!("Burn transaction submitted with hash: {}", transaction_hash);

        let (_, result) = client.wait_until_finalized(&transaction_hash).await?;
        println!("Transaction finalized: {:#?}", result);

        Ok(())
    }

Token governance operations
===========================

.. _rust-add-to-allow-list:

Add account to allow list
--------------------------

This example demonstrates how to add an account to a Protocol Level Token's allow list.
Only the token issuer can modify the allow list.

.. code-block:: rust

    //! # Add Account to Token Allow List
    //! This example demonstrates how to add an account to a Protocol Level Token's allow list.
    //! Only the token issuer can modify the allow list.
    //! ## How to use this example:
    //! 1. Set your wallet file path in the `WALLET_FILE` constant below
    //! 2. Set the token ID in the `TOKEN_ID` constant
    //! 3. Set the target address to add in the `TARGET_ADDRESS` constant
    //! 4. Run with: `cargo run --example add_to_allow_list`
    //! full example in the rust sdk repository: https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/plt-allow-and-deny-list.rs

    use anyhow::Context;
    use concordium_base::{
        contracts_common::AccountAddress,
        protocol_level_tokens::{operations, TokenId},
    };
    use concordium_rust_sdk::{
        common::types::TransactionTime,
        types::{
            transactions::{send, BlockItem},
            WalletAccount,
        },
        v2,
    };
    use std::{path::PathBuf, str::FromStr};

    // CONFIGURATION - Modify these values for your use case
    const WALLET_FILE: &str = "keys/wallet.export";
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with the actual token ID
    const TARGET_ADDRESS: &str = "TARGET_ADDRESS"; // Replace with the actual target address

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        let token_id = TokenId::try_from(TOKEN_ID.to_string())?;
        let target_address = AccountAddress::from_str(TARGET_ADDRESS)?;

        let keys: WalletAccount = WalletAccount::from_json_file(PathBuf::from(WALLET_FILE))
            .context("Could not read the wallet file")?;

        let nonce = client
            .get_next_account_sequence_number(&keys.address)
            .await?
            .nonce;
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

        println!(
            "Attempting to add {} to allow list for {}...",
            target_address, TOKEN_ID
        );

        let operation = operations::add_token_allow_list(target_address);
        let txn = send::token_update_operations(
            &keys,
            keys.address,
            nonce,
            expiry,
            token_id,
            [operation].into_iter().collect(),
        )?;
        let item = BlockItem::AccountTransaction(txn);

        let transaction_hash = client.send_block_item(&item).await?;
        println!("Transaction submitted with hash: {}", transaction_hash);

        let (_, result) = client.wait_until_finalized(&transaction_hash).await?;
        println!("Transaction finalized: {:#?}", result);

        Ok(())
    }


.. _rust-remove-from-allow-list:

Remove account from allow list
-------------------------------

This example demonstrates how to remove an account from a Protocol Level Token's allow list.
Only the token issuer can modify the allow list.

.. code-block:: rust

    //! # Remove Account from Token Allow List
    //! This example demonstrates how to remove an account from a Protocol Level Token's allow list.
    //! Only the token issuer can modify the allow list.
    //! ## How to use this example:
    //! 1. Set your wallet file path in the `WALLET_FILE` constant below
    //! 2. Set the token ID in the `TOKEN_ID` constant
    //! 3. Set the target address to remove in the `TARGET_ADDRESS` constant
    //! 4. Run with: `cargo run --example remove_from_allow_list`
    //! full example in the rust sdk repository: https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/plt-allow-and-deny-list.rs

    use anyhow::Context;
    use concordium_base::{
        contracts_common::AccountAddress,
        protocol_level_tokens::{operations, TokenId},
    };
    use concordium_rust_sdk::{
        common::types::TransactionTime,
        types::{
            transactions::{send, BlockItem},
            WalletAccount,
        },
        v2,
    };
    use std::{path::PathBuf, str::FromStr};

    // CONFIGURATION - Modify these values for your use case
    const WALLET_FILE: &str = "keys/wallet.export";
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with the actual token ID
    const TARGET_ADDRESS: &str = "TARGET_ADDRESS"; // Replace with the actual target address

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        let token_id = TokenId::try_from(TOKEN_ID.to_string())?;
        let target_address = AccountAddress::from_str(TARGET_ADDRESS)?;

        // Load account keys from wallet file
        let keys: WalletAccount = WalletAccount::from_json_file(PathBuf::from(WALLET_FILE))
            .context("Could not read the wallet file")?;

        let nonce = client
            .get_next_account_sequence_number(&keys.address)
            .await?
            .nonce;
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

        println!(
            "Attempting to remove {} from allow list for {}...",
            target_address, TOKEN_ID
        );

        let operation = operations::remove_token_allow_list(target_address);
        let txn = send::token_update_operations(
            &keys,
            keys.address,
            nonce,
            expiry,
            token_id,
            [operation].into_iter().collect(),
        )?;
        let item = BlockItem::AccountTransaction(txn);

        let transaction_hash = client.send_block_item(&item).await?;
        println!("Transaction submitted with hash: {}", transaction_hash);

        let (_, result) = client.wait_until_finalized(&transaction_hash).await?;
        println!("Transaction finalized: {:#?}", result);

        Ok(())
    }

.. _rust-add-to-deny-list:

Add account to deny list
------------------------

This example demonstrates how to add an account to a Protocol Level Token's deny list.
Accounts on the deny list cannot hold the token when deny list is enabled.

.. code-block:: rust

    //! # Add Account to Token Deny List
    //! This example demonstrates how to add an account to a Protocol Level Token's deny list.
    //! Accounts on the deny list cannot hold the token when deny list is enabled.
    //! Only the token issuer can modify the deny list.
    //! ## How to use this example:
    //! 1. Set your wallet file path in the `WALLET_FILE` constant below
    //! 2. Set the token ID in the `TOKEN_ID` constant
    //! 3. Set the target address to add in the `TARGET_ADDRESS` constant
    //! 4. Run with: `cargo run --example add_to_deny_list`
    //! full example in the rust sdk repository: https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/plt-allow-and-deny-list.rs

    use anyhow::Context;
    use concordium_base::{
        contracts_common::AccountAddress,
        protocol_level_tokens::{operations, TokenId},
    };
    use concordium_rust_sdk::{
        common::types::TransactionTime,
        types::{
            transactions::{send, BlockItem},
            WalletAccount,
        },
        v2,
    };
    use std::{path::PathBuf, str::FromStr};

    // CONFIGURATION - Modify these values for your use case
    const WALLET_FILE: &str = "wallet.export";
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with the actual token ID
    const TARGET_ADDRESS: &str = "TARGET_ADDRESS"; // Replace with the actual target address

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        let token_id = TokenId::try_from(TOKEN_ID.to_string())?;
        let target_address = AccountAddress::from_str(TARGET_ADDRESS)?;

        let keys: WalletAccount = WalletAccount::from_json_file(PathBuf::from(WALLET_FILE))
            .context("Could not read the wallet file")?;

        let nonce = client
            .get_next_account_sequence_number(&keys.address)
            .await?
            .nonce;
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

        println!(
            "Attempting to add {} to deny list for {}...",
            target_address, TOKEN_ID
        );

        let operation = operations::add_token_deny_list(target_address);
        let txn = send::token_update_operations(
            &keys,
            keys.address,
            nonce,
            expiry,
            token_id,
            [operation].into_iter().collect(),
        )?;
        let item = BlockItem::AccountTransaction(txn);

        let transaction_hash = client.send_block_item(&item).await?;
        println!("Transaction submitted with hash: {}", transaction_hash);

        let (_, result) = client.wait_until_finalized(&transaction_hash).await?;
        println!("Transaction finalized: {:#?}", result);

        Ok(())
    }

.. _rust-remove-from-deny-list:

Remove account from deny list
-----------------------------

This example demonstrates how to remove an account from a Protocol Level Token's deny list.
Only the token issuer can modify the deny list.

.. code-block:: rust

    //! # Remove Account from Token Deny List
    //! This example demonstrates how to remove an account from a Protocol Level Token's deny list.
    //! Only the token issuer can modify the deny list.
    //! ## How to use this example:
    //! 1. Set your wallet file path in the `WALLET_FILE` constant below
    //! 2. Set the token ID in the `TOKEN_ID` constant
    //! 3. Set the target address to remove in the `TARGET_ADDRESS` constant
    //! 4. Run with: `cargo run --example remove_from_deny_list`
    //! full example in the rust sdk repository: https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/plt-allow-and-deny-list.rs

    use anyhow::Context;
    use concordium_base::{
        contracts_common::AccountAddress,
        protocol_level_tokens::{operations, TokenId},
    };
    use concordium_rust_sdk::{
        common::types::TransactionTime,
        types::{
            transactions::{send, BlockItem},
            WalletAccount,
        },
        v2,
    };
    use std::{path::PathBuf, str::FromStr};

    // CONFIGURATION - Modify these values for your use case
    const WALLET_FILE: &str = "keys/wallet.export";
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with the actual token ID
    const TARGET_ADDRESS: &str = "TARGET_ADDRESS"; // Replace with the actual target address

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        let token_id = TokenId::try_from(TOKEN_ID.to_string())?;
        let target_address = AccountAddress::from_str(TARGET_ADDRESS)?;

        let keys: WalletAccount = WalletAccount::from_json_file(PathBuf::from(WALLET_FILE))
            .context("Could not read the wallet file")?;

        let nonce = client
            .get_next_account_sequence_number(&keys.address)
            .await?
            .nonce;
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

        println!(
            "Attempting to remove {} from deny list for {}...",
            target_address, TOKEN_ID
        );

        let operation = operations::remove_token_deny_list(target_address);
        let txn = send::token_update_operations(
            &keys,
            keys.address,
            nonce,
            expiry,
            token_id,
            [operation].into_iter().collect(),
        )?;
        let item = BlockItem::AccountTransaction(txn);

        let transaction_hash = client.send_block_item(&item).await?;
        println!("Transaction submitted with hash: {}", transaction_hash);

        let (_, result) = client.wait_until_finalized(&transaction_hash).await?;
        println!("Transaction finalized: {:#?}", result);

        Ok(())
    }

.. _rust-pause-token:

Pause a token
-------------

This example demonstrates how to suspend balance transfer operations for a Protocol Level Token (PLT). Only the token issuer can pause the token.

.. code-block:: rust

    //! # Pause Token
    //! This example demonstrates how to pause a Protocol Level Token.
    //! Pausing suspends balance transfer operations for the PLT
    //! Only the token issuer can pause the token.
    //! ## How to use this example:
    //! 1. Set your wallet file path in the `WALLET_FILE` constant below
    //! 2. Set the token ID in the `TOKEN_ID` constant
    //! 3. Run with: `cargo run --example pause_token`
    //! full example in the rust sdk repository: https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/plt-pause.rs

    use anyhow::Context;
    use concordium_base::protocol_level_tokens::{operations, TokenId};
    use concordium_rust_sdk::{
        common::types::TransactionTime,
        types::{
            transactions::{send, BlockItem},
            WalletAccount,
        },
        v2,
    };
    use std::{path::PathBuf, str::FromStr};

    // CONFIGURATION - Modify these values for your use case
    const WALLET_FILE: &str = "keys/wallet.export";
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with the actual token ID

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        let token_id = TokenId::try_from(TOKEN_ID.to_string())?;

        let keys: WalletAccount = WalletAccount::from_json_file(PathBuf::from(WALLET_FILE))
            .context("Could not read the wallet file")?;

        let nonce = client
            .get_next_account_sequence_number(&keys.address)
            .await?
            .nonce;
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

        println!("Attempting to pause token {}...", TOKEN_ID);

        let operation = operations::pause();
        let txn = send::token_update_operations(
            &keys,
            keys.address,
            nonce,
            expiry,
            token_id,
            [operation].into_iter().collect(),
        )?;
        let item = BlockItem::AccountTransaction(txn);

        let transaction_hash = client.send_block_item(&item).await?;
        println!("Pause transaction submitted with hash: {}", transaction_hash);

        let (_, result) = client.wait_until_finalized(&transaction_hash).await?;
        println!("Transaction finalized: {:#?}", result);

        Ok(())
    }

.. _rust-unpause-token:

Unpause a token
---------------

This example demonstrates how to resume balance transfer operations for a Protocol Level Token (PLT). Only the token issuer can unpause the token.

.. code-block:: rust

    //! # Unpause Token
    //! This example demonstrates how to unpause a Protocol Level Token.
    //! Unpausing resumes balance transfer operations for the PLT.
    //! Only the token issuer can unpause the token.
    //! ## How to use this example:
    //! 1. Set your wallet file path in the `WALLET_FILE` constant below
    //! 2. Set the token ID in the `TOKEN_ID` constant
    //! 3. Run with: `cargo run --example unpause_token`
    //! full example in the rust sdk repository: https://github.com/Concordium/concordium-rust-sdk/blob/main/examples/plt-pause.rs

    use anyhow::Context;
    use concordium_base::protocol_level_tokens::{operations, TokenId};
    use concordium_rust_sdk::{
        common::types::TransactionTime,
        types::{
            transactions::{send, BlockItem},
            WalletAccount,
        },
        v2,
    };
    use std::{path::PathBuf, str::FromStr};

    // CONFIGURATION - Modify these values for your use case
    const WALLET_FILE: &str = "keys/wallet.export";
    const TOKEN_ID: &str = "TOKEN_ID"; // Replace with the actual token ID

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let mut client = v2::Client::new(v2::Endpoint::from_str(
            "https://grpc.testnet.concordium.com:20000",
        )?)
        .await
        .context("Failed to connect to Concordium node")?;

        let token_id = TokenId::try_from(TOKEN_ID.to_string())?;

        let keys: WalletAccount = WalletAccount::from_json_file(PathBuf::from(WALLET_FILE))
            .context("Could not read the wallet file")?;

        let nonce = client
            .get_next_account_sequence_number(&keys.address)
            .await?
            .nonce;
        let expiry: TransactionTime =
            TransactionTime::from_seconds((chrono::Utc::now().timestamp() + 300) as u64);

        println!("Attempting to unpause token {}...", TOKEN_ID);

        let operation = operations::unpause();
        let txn = send::token_update_operations(
            &keys,
            keys.address,
            nonce,
            expiry,
            token_id,
            [operation].into_iter().collect(),
        )?;
        let item = BlockItem::AccountTransaction(txn);

        let transaction_hash = client.send_block_item(&item).await?;
        println!("Unpause transaction submitted with hash: {}", transaction_hash);

        let (_, result) = client.wait_until_finalized(&transaction_hash).await?;
        println!("Transaction finalized: {:#?}", result);

        Ok(())
    }
