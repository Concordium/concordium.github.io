.. _plt-web-sdk:

=======
Web SDK
=======

This guide shows how to work with Protocol-Level Tokens using Concordium's Web SDK.

Installation and setup
======================

Before using this example, make sure to install the required dependencies:

.. code-block:: bash

  npm install @concordium/web-sdk@11.0.0
  npm install @grpc/grpc-js


Available examples
==================

See the following sections for detailed examples:

**Querying tokens:**

- :ref:`Get token list<web-sdk-get-token-list>`
- :ref:`Get token information<web-sdk-get-token-info>`
- :ref:`Get account information<web-sdk-get-account-info>`

**Token holder operations:**

- :ref:`Transfer tokens<web-sdk-transfer-tokens>`
- :ref:`Mint tokens<web-sdk-mint-tokens>`
- :ref:`Burn tokens<web-sdk-burn-tokens>`

**Token governance operations:**

- :ref:`Add account to allow list<web-sdk-add-account-to-allow-list>`
- :ref:`Remove account from allow list<web-sdk-remove-account-from-allow-list>`
- :ref:`Add account to deny list<web-sdk-add-account-to-deny-list>`
- :ref:`Remove account from deny list<web-sdk-remove-account-from-deny-list>`
- :ref:`Pause a token<web-sdk-pause-plt-transfers>`
- :ref:`Unpause a token<web-sdk-unpause-plt-transfers>`

.. _querying-tokens:

Querying tokens
===============

.. _web-sdk-get-token-list:

Get token list
--------------

Retrieve all Protocol-Level Tokens available on the network:

.. code-block:: typescript

    /**
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/client/getTokenList.ts
    * Retrieves the protocol level tokens that exists at the end of a given block as an async
    * iterable. If a blockhash is not supplied it will pick the latest finalized
    * block. An optional abortSignal can also be provided that closes the stream.
    * Note: A stream can be collected to a list with the streamToList function.
    */
    import { BlockHash } from '@concordium/web-sdk';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.testnet.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * The following example demonstrates how to query the list of PLTs available in the network.
    */
    // If using a specific block hash, uncomment and replace with actual hash
    //const blockHash = BlockHash.fromHexString("fb035b994852a9e246e1f48ffd7ab83e6f0ec5fff1f3ced6e5af2373227c2733");
    // Or use undefined for latest finalized block
    const blockHash = undefined;
    const tokens = await client.getTokenList(blockHash);
    console.log('Protocol level tokens (PLTs) that exists at the end of the given block: \n',JSON.stringify(tokens, null, 2));
    for await (const token of tokens) {
        console.log(token.toString());
    }

.. _web-sdk-get-token-info:

Get token information
---------------------

Retrieve detailed information about a specific PLT:

.. code-block:: typescript

    /**
    * Returns the PLT information with symbol
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/client/getTokenInfo.ts
    * @param symbol
    * @returns TokenInfo {TokenId, TokenState}
    */
    import { BlockHash } from '@concordium/web-sdk';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { Cbor, TokenId, TokenInfo } from '@concordium/web-sdk/plt';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.testnet.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * Retrieves information about an protocol level token (PLT). The function must be provided a
    * token id.
    */
    // token symbol
    const tokenId = TokenId.fromString("TOKEN_ID"); // Replace with actual token symbol

    // If using a specific block hash, uncomment and replace with actual hash
    // Or use undefined for latest finalized block
    const blockHash = undefined;
    // const blockHash = BlockHash.fromHexString("someblockhash");

    const tokenInfo: TokenInfo = await client.getTokenInfo(tokenId, blockHash);

    console.log('Total token supply:', tokenInfo.state.totalSupply);
    console.log('decimals:', tokenInfo.state.decimals);
    console.log('Module state:', Cbor.decode(tokenInfo.state.moduleState));
    console.log('moduleRef:', tokenInfo.state.moduleRef.toString());
    console.log('Token id:', tokenInfo.id);

.. _web-sdk-get-account-info:

Get account information
-----------------------

Query account information including PLT balances:

.. code-block:: typescript

    /**
    * Returns the account information including PLT balances
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/client/getAccountInfo.ts
    */
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { AccountAddress, AccountInfo, BlockHash} from '@concordium/web-sdk';
    import { Cbor } from '@concordium/web-sdk/plt';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.testnet.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * Retrieves information about an account including its PLT balances
    */
    const accountAddress = AccountAddress.fromBase58("ACCOUNT_ADDRESS"); // Replace with a real address

    // If using a specific block hash, uncomment and replace with actual hash
    // Or use undefined for latest finalized block
    const blockHash = undefined;
    // const blockHash = BlockHash.fromHexString("someblockhash");

    const accountInfo: AccountInfo = await client.getAccountInfo(accountAddress, blockHash);

    console.log('Account balance:', accountInfo.accountAmount);
    console.log('Account address:', accountInfo.accountAddress);

    const tokenAccountInfo = accountInfo.accountTokens;
    tokenAccountInfo.forEach(balance => {
        console.log(`Token ${balance.id}, balance ${balance.state.balance}`);
        // Decode the CBOR-encoded moduleState
        const decodedState = balance.state.moduleState ? Cbor.decode(balance.state.moduleState) : 'No module state';
        console.log(`Token ${balance.id} decoded state:`, JSON.stringify(decodedState, null, 2));
    });

.. _web-sdk-token-holder-operations:

Token holder operations
=======================

.. _web-sdk-transfer-tokens:

Transfer tokens
---------------

Transfer PLTs between accounts:

.. code-block:: typescript

    /**
    * Transfers the specified amount of PLT to another address.
    * Shows how to use 2 different wallet exports (.export and .json)
    * Queries the PLT with symbol, and executes transfer with/without memo
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/plt/transfer.ts
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
        isKnown,
        serializeAccountTransactionPayload,
        AccountTransactionType,
    } from '@concordium/web-sdk';
    import { TokenId, TokenAmount, Cbor, Token, TokenTransfer, TokenHolder, CborAccountAddress, TokenTransferOperation, createTokenUpdatePayload } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { existsSync, readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.testnet.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * The following example demonstrates how a simple transfer can be created.
    */
    // using wallet.export file
    const walletFilePath = "keys/wallet.export";
    let walletFile: string | undefined;

    // Only read the file if it exists
    if (existsSync(walletFilePath)) {
        walletFile = readFileSync(walletFilePath, 'utf8');
    }
    // parse the other arguments
    const tokenId = TokenId.fromString("TOKEN_ID"); // Replace with actual token ID

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
        Requires direct access to wallet files containing private keys. The service
        can sign and execute transactions immediately. Use this when building APIs,
        trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        // using wallet.json file
        // const walletJson = readFileSync("wallet.json", 'utf8');
        // const keys = JSON.parse(walletJson);
        // const signer = buildAccountSigner(keys);

        try {
            const token = await Token.fromId(client, tokenId);
            const amount = TokenAmount.fromDecimal(100, token.info.state.decimals); // some amount to transfer
            const recipient = TokenHolder.fromAccountAddress(AccountAddress.fromBase58("RECIPIENT_ADDRESS")).address; // replace with actual address to receive
            const memo = undefined;
            // memo = CborMemo.fromString("Any Message To add")

            const transfer: Token.TransferInput = {
                recipient,
                amount,
                memo,
            };
            console.log('Specified transfer:', JSON.stringify(transfer, null, 2));

            // From a service perspective:
            // create the token instance
            const transaction = await Token.transfer(token, sender, transfer, signer);
            console.log(`Transfer transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (!isKnown(result.summary)) {
                    throw new Error('Unexpected transaction outcome');
            }

            if (result.summary!.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary!.type);
            }

            switch (result.summary!.transactionType) {
                case TransactionKindString.TokenUpdate:
                    console.log('TokenTransfer events:');
                    result.summary!.events.forEach((e) => console.log(e));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary!.rejectReason!.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary!.rejectReason!.tag);
                    }
                    const details = Cbor.decode(result.summary!.rejectReason.contents.details);
                    console.error(result.summary!.rejectReason.contents, details);
                    break;
                default:
                    throw new Error('Unexpected transaction kind: ' + result.summary!.transactionType);
            }
        } catch (error) {
            console.error('Error during transfer operation:', error);
        }
    } else {
        /* Wallet perspective: For dApps and wallet integrations
        Creates a transaction payload that can be signed by wallet applications.
        The wallet holds the private keys and the user reviews transactions before signing.
        Use this when building dApps where users connect their wallet (Browser Wallet,
        Mobile Wallet, etc.) and maintain control of their keys. */
        // Create the payload for transferring tokens
        const token = await Token.fromId(client, tokenId);
        const amount = TokenAmount.fromDecimal(100, token.info.state.decimals); // some amount to transfer
        const recipient = AccountAddress.fromBase58("RECIPIENT_ADDRESS"); // replace with actual address to receive
        const memo = undefined;
        // memo = CborMemo.fromString("Any Message To add")

        const transfer: TokenTransfer = {
            recipient: CborAccountAddress.fromAccountAddress(recipient),
            amount,
            memo,
        };

        const transferOperation: TokenTransferOperation = {
            transfer,
        };

        console.log('Specified transfer:', JSON.stringify(transferOperation, null, 2));

        const payload = createTokenUpdatePayload(tokenId, transferOperation);
        console.log('Created payload:', payload);

        // Serialize payload for signing/submission by wallet
        const serialized = serializeAccountTransactionPayload({
            payload,
            type: AccountTransactionType.TokenUpdate,
        });
        console.log('Serialized payload for wallet to sign & send:', serialized.toString('hex'));
    }

.. _web-sdk-token-governance-operations:

Token governance operations
===========================

.. _web-sdk-mint-tokens:

Mint tokens
-----------

Mint new tokens (issuer only):

.. code-block:: typescript

    /**
    * Mints new tokens to the issuer's account.
    * Only the nominated account (token issuer) can perform mint operations.
    * Shows how to mint tokens.
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/plt/update-supply.ts
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
        isKnown,
        serializeAccountTransactionPayload,
        AccountTransactionType,
    } from '@concordium/web-sdk';
    import { TokenId, TokenAmount, Cbor, Token, TokenSupplyUpdate, TokenOperation, createTokenUpdatePayload } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { existsSync, readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.testnet.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * The following example demonstrates how to mint new tokens.
    */
    // using wallet.export file
    const walletFilePath = "keys/wallet.export";
    let walletFile: string | undefined;

    // Only read the file if it exists
    if (existsSync(walletFilePath)) {
        walletFile = readFileSync(walletFilePath, 'utf8');
    }
    // parse the arguments
    const tokenId = TokenId.fromString("TOKEN_ID"); // Replace with actual token ID
    // create the token instance
    const token = await Token.fromId(client, tokenId);
    const tokenAmount = TokenAmount.fromDecimal(10, token.info.state.decimals); // amount to mint

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
        Requires direct access to wallet files containing private keys. The service
        can sign and execute transactions immediately. Use this when building APIs,
        trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        // using wallet.json file
        // const walletJson = readFileSync("wallet.json", 'utf8');
        // const keys = JSON.parse(walletJson);
        // const signer = buildAccountSigner(keys);

        try {

            // Only the token issuer can mint tokens
            console.log(`Attempting to mint ${tokenAmount.toString()} ${tokenId.toString()} tokens...`);

            // Execute the mint operation
            const transaction = await Token.mint(token, sender, tokenAmount, signer);
            console.log(`Mint transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (!isKnown(result.summary)) {
                throw new Error('Unexpected transaction outcome');
            }

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenUpdate:
                    console.log('TokenMint events:');
                    result.summary.events.forEach((e) => console.log(e));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason!.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason!.tag);
                    }
                    const details = Cbor.decode(result.summary.rejectReason.contents.details);
                    console.error(result.summary.rejectReason.contents, details);
                    break;
                default:
                    throw new Error('Unexpected transaction kind: ' + result.summary.transactionType);
            }
        } catch (error) {
            console.error('Error during minting operation:', error);
        }
    } else {
    /* Wallet perspective: For dApps and wallet integrations
        Creates a transaction payload that can be signed by wallet applications.
        The wallet holds the private keys and the user reviews transactions before signing.
        Use this when building dApps where users connect their wallet (Browser Wallet,
        Mobile Wallet, etc.) and maintain control of their keys. */
        // Create the payload for minting tokens
        const update: TokenSupplyUpdate = { amount: tokenAmount };

        const operation: TokenOperation = {
            'mint': update,
        };

        console.log('Specified mint action:', JSON.stringify(operation, null, 2));

        const payload = createTokenUpdatePayload(tokenId, operation);
        console.log('Created payload:', payload);

        // Serialize payload for signing/submission by wallet
        const serialized = serializeAccountTransactionPayload({
            payload,
            type: AccountTransactionType.TokenUpdate,
        });
        console.log('Serialized payload for wallet to sign & send:', serialized.toString('hex'));
    }

.. _web-sdk-burn-tokens:

Burn tokens
-----------

Burn existing tokens (issuer only):

.. code-block:: typescript

    /**
    * Burns tokens from the issuer's account.
    * Only the nominated account (token issuer) can perform burn operations.
    * Shows how to burn tokens.
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/plt/update-supply.ts
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
        isKnown,
        serializeAccountTransactionPayload,
        AccountTransactionType,
    } from '@concordium/web-sdk';
    import { TokenId, TokenAmount, Cbor, Token, TokenSupplyUpdate, TokenOperation, createTokenUpdatePayload } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { existsSync, readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.testnet.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * The following example demonstrates how to burn existing tokens.
    */
    // using wallet.export file
    const walletFilePath = "keys/wallet.export";
    let walletFile: string | undefined;

    // Only read the file if it exists
    if (existsSync(walletFilePath)) {
        walletFile = readFileSync(walletFilePath, 'utf8');
    }
    // parse the arguments
    const tokenId = TokenId.fromString("TOKEN_ID"); // replace with your token ID
    // create the token instance
    const token = await Token.fromId(client, tokenId);
    const tokenAmount = TokenAmount.fromDecimal(10, token.info.state.decimals); // amount to burn

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
        Requires direct access to wallet files containing private keys. The service
        can sign and execute transactions immediately. Use this when building APIs,
        trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        // using wallet.json file
        // const walletJson = readFileSync("wallet.json", 'utf8');
        // const keys = JSON.parse(walletJson);
        // const signer = buildAccountSigner(keys);

        try {
            // Only the token issuer can burn tokens
            console.log(`Attempting to burn ${tokenAmount.toString()} ${tokenId.toString()} tokens...`);

            // Execute the burn operation
            const transaction = await Token.burn(token, sender, tokenAmount, signer);
            console.log(`Burn transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (!isKnown(result.summary)) {
                throw new Error('Unexpected transaction outcome');
            }

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenUpdate:
                    console.log('TokenBurn events:');
                    result.summary.events.forEach((e) => console.log(e));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason!.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason!.tag);
                    }
                    const details = Cbor.decode(result.summary.rejectReason.contents.details);
                    console.error(result.summary.rejectReason.contents, details);
                    break;
                default:
                    throw new Error('Unexpected transaction kind: ' + result.summary.transactionType);
            }
        } catch (error) {
            console.error('Error during burning operation:', error);
        }
    } else {
        /* Wallet perspective: For dApps and wallet integrations
        Creates a transaction payload that can be signed by wallet applications.
        The wallet holds the private keys and the user reviews transactions before signing.
        Use this when building dApps where users connect their wallet (Browser Wallet,
        Mobile Wallet, etc.) and maintain control of their keys. */
        // Create the payload for burning tokens
        const update: TokenSupplyUpdate = { amount: tokenAmount };

        const operation: TokenOperation = {
            'burn': update,
        };

        console.log('Specified burn action:', JSON.stringify(operation, null, 2));

        const payload = createTokenUpdatePayload(tokenId, operation);
        console.log('Created payload:', payload);

        // Serialize payload for signing/submission by wallet
        const serialized = serializeAccountTransactionPayload({
            payload,
            type: AccountTransactionType.TokenUpdate,
        });
        console.log('Serialized payload for wallet to sign & send:', serialized.toString('hex'));
    }

.. _web-sdk-list-management:

Allow and deny list management
==============================

.. _web-sdk-add-account-to-allow-list:

Add account to allow list
-------------------------

Add an account to the token's allow list (issuer only):

.. code-block:: typescript

    /**
    * Adds an account to the token's allow list.
    * Only accounts on the allow list can hold the token when allow list is enabled.
    * Only the nominated account (token issuer) can modify the allow list.
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/plt/modify-list.ts
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
        TransactionEventTag,
        AccountTransactionType,
        serializeAccountTransactionPayload,
        isKnown,
    } from '@concordium/web-sdk';
    import { TokenId, Cbor, TokenHolder, Token, TokenListUpdate, TokenOperation, createTokenUpdatePayload, CborAccountAddress, parseTokenModuleEvent } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { existsSync, readFileSync } from 'node:fs';
    const client = new ConcordiumGRPCNodeClient(
        "grpc.testnet.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * The following example demonstrates how to add an account to the allow list.
    */
    // using wallet.export file
    const walletFilePath = "keys/wallet.export";
    let walletFile: string | undefined;

    // Only read the file if it exists
    if (existsSync(walletFilePath)) {
        walletFile = readFileSync(walletFilePath, 'utf8');
    }
    // parse the arguments
    const tokenId = TokenId.fromString("TOKEN_ID"); // Replace with actual token ID
    const targetAddress = TokenHolder.fromAccountAddress(AccountAddress.fromBase58("TARGET_ADDRESS")); // Replace with actual target address

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
        Requires direct access to wallet files containing private keys. The service
        can sign and execute transactions immediately. Use this when building APIs,
        trading bots, or administrative tools where the service manages tokens automatically.*/

        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        // using wallet.json file
        // const walletJson = readFileSync("wallet.json", 'utf8');
        // const keys = JSON.parse(walletJson);
        // const signer = buildAccountSigner(keys);

        try {
            // create the token instance
            const token = await Token.fromId(client, tokenId);
            // Only the token issuer can modify the allow list
            console.log(`Attempting to add ${targetAddress.toString()} to allow list for ${tokenId.toString()}...`);

            // Execute the add to allow list operation
            const transaction = await Token.addAllowList(token, sender, targetAddress.address, signer);
            console.log(`Transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (!isKnown(result.summary)) {
                throw new Error('Unexpected transaction outcome');
            }

            if (result.summary!.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary!.type);
            }

            switch (result.summary!.transactionType) {
                case TransactionKindString.TokenUpdate:
                    console.log('AddAllowListEvent events:');
                    result.summary!.events.forEach((e) => {
                        if (e?.tag !== TransactionEventTag.TokenModuleEvent) {
                            throw new Error('Unexpected event type: ' + e!.tag);
                        }
                        console.log('Token module event:', parseTokenModuleEvent(e));
                    });
                    break;
                case TransactionKindString.Failed:
                    if (result.summary!.rejectReason?.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary!.rejectReason?.tag);
                    }
                    const details = Cbor.decode(result.summary!.rejectReason.contents.details);
                    console.error(result.summary!.rejectReason.contents, details);
                    break;
                default:
                    throw new Error('Unexpected transaction kind: ' + result.summary!.transactionType);
            }
        } catch (error) {
            console.error('Error during list operation:', error);
        }
    } else {
        /* Wallet perspective: For dApps and wallet integrations
        Creates a transaction payload that can be signed by wallet applications.
        The wallet holds the private keys and the user reviews transactions before signing.
        Use this when building dApps where users connect their wallet (Browser Wallet,
        Mobile Wallet, etc.) and maintain control of their keys. */
        // Create the payload for adding to allow list
        const listPayload: TokenListUpdate = {
            target: CborAccountAddress.fromAccountAddress(targetAddress.address)
        };

        const listOperation: TokenOperation = {
            'addAllowList': listPayload,
        };

        console.log('Specified list action:', JSON.stringify(listOperation, null, 2));

        const payload = createTokenUpdatePayload(tokenId, listOperation);
        console.log('Created payload:', payload);

        // Serialize payload for signing/submission by wallet
        const serialized = serializeAccountTransactionPayload({
            payload,
            type: AccountTransactionType.TokenUpdate,
        });
        console.log('Serialized payload for wallet to sign & send:', serialized.toString('hex'));
    }

.. _web-sdk-remove-account-from-allow-list:

Remove account from allow list
------------------------------

Remove an account from the token's allow list (issuer only):

.. code-block:: typescript

    /**
    * Removes an account from the token's allow list.
    * Only accounts on the allow list can hold the token when allow list is enabled.
    * Only the nominated account (token issuer) can modify the allow list.
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/plt/modify-list.ts
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
        TransactionEventTag,
        AccountTransactionType,
        serializeAccountTransactionPayload,
        isKnown,
    } from '@concordium/web-sdk';
    import { TokenId, Cbor, TokenHolder, Token, parseTokenModuleEvent, TokenListUpdate, TokenOperation, createTokenUpdatePayload, CborAccountAddress } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { existsSync, readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.testnet.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * The following example demonstrates how to remove an account from the allow list.
    */
    // using wallet.export file
    const walletFilePath = "keys/wallet.export";
    let walletFile: string | undefined;

    // Only read the file if it exists
    if (existsSync(walletFilePath)) {
        walletFile = readFileSync(walletFilePath, 'utf8');
    }
    // parse the arguments
    const tokenId = TokenId.fromString("TOKEN_ID"); // Replace with actual token ID
    const targetAddress = TokenHolder.fromAccountAddress(AccountAddress.fromBase58("TARGET_ADDRESS")); // Replace with actual target address

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
        Requires direct access to wallet files containing private keys. The service
        can sign and execute transactions immediately. Use this when building APIs,
        trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        // using wallet.json file
        // const walletJson = readFileSync("wallet.json", 'utf8');
        // const keys = JSON.parse(walletJson);
        // const signer = buildAccountSigner(keys);

        try {
            // create the token instance
            const token = await Token.fromId(client, tokenId);
            // Only the token issuer can modify the allow list
            console.log(`Attempting to remove ${targetAddress.toString()} from allow list for ${tokenId.toString()}...`);

            // Execute the remove from allow list operation
            const transaction = await Token.removeAllowList(token, sender, targetAddress.address, signer);
            console.log(`Transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (!isKnown(result.summary)) {
                throw new Error('Unexpected transaction outcome');
            }

            if (result.summary!.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary!.type);
            }

            switch (result.summary!.transactionType) {
                case TransactionKindString.TokenUpdate:
                    console.log('RemoveAllowListEvent events:');
                    result.summary!.events.forEach((e) => {
                        if (e!.tag !== TransactionEventTag.TokenModuleEvent) {
                            throw new Error('Unexpected event type: ' + e!.tag);
                        }
                        console.log('Token module event:', parseTokenModuleEvent(e!));
                    });
                    break;
                case TransactionKindString.Failed:
                    if (result.summary!.rejectReason!.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary!.rejectReason!.tag);
                    }
                    const details = Cbor.decode(result.summary!.rejectReason.contents.details);
                    console.error(result.summary!.rejectReason.contents, details);
                    break;
                default:
                    throw new Error('Unexpected transaction kind: ' + result.summary!.transactionType);
            }
        } catch (error) {
            console.error('Error during list operation:', error);
        }
    } else {
        /* Wallet perspective: For dApps and wallet integrations
        Creates a transaction payload that can be signed by wallet applications.
        The wallet holds the private keys and the user reviews transactions before signing.
        Use this when building dApps where users connect their wallet (Browser Wallet,
        Mobile Wallet, etc.) and maintain control of their keys. */
        // Create the payload for removing from allow list
        const listPayload: TokenListUpdate = {
            target: CborAccountAddress.fromAccountAddress(targetAddress.address)
        };

        const listOperation: TokenOperation = {
            'removeAllowList': listPayload,
        };

        console.log('Specified list action:', JSON.stringify(listOperation, null, 2));

        const payload = createTokenUpdatePayload(tokenId, listOperation);
        console.log('Created payload:', payload);

        // Serialize payload for signing/submission by wallet
        const serialized = serializeAccountTransactionPayload({
            payload,
            type: AccountTransactionType.TokenUpdate,
        });
        console.log('Serialized payload for wallet to sign & send:', serialized.toString('hex'));
    }

.. _web-sdk-add-account-to-deny-list:

Add account to deny list
------------------------

Add an account to the token's deny list (issuer only):

.. code-block:: typescript

    /**
    * Adds an account to the token's deny list.
    * Accounts on the deny list cannot hold the token when deny list is enabled.
    * Only the nominated account (token issuer) can modify the deny list.
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/plt/modify-list.ts
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
        TransactionEventTag,
        isKnown,
        serializeAccountTransactionPayload,
        AccountTransactionType,
    } from '@concordium/web-sdk';
    import { TokenId, Cbor, Token, TokenHolder, parseTokenModuleEvent, TokenListUpdate, CborAccountAddress, TokenOperation, createTokenUpdatePayload } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { existsSync, readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-beta.concordium.com",
        Number(20000),
        credentials.createSsl() //  credentials.Insecure(),
    );

    /**
    * The following example demonstrates how to add an account to the deny list.
    */
    // using wallet.export file
    const walletFilePath = "keys/wallet.export";
    let walletFile: string | undefined;

    // Only read the file if it exists
    if (existsSync(walletFilePath)) {
        walletFile = readFileSync(walletFilePath, 'utf8');
    }
    // parse the arguments
    const tokenId = TokenId.fromString("TOKEN_ID"); // Replace with actual token ID
    const targetAddress = TokenHolder.fromAccountAddress(AccountAddress.fromBase58("TARGET_ADDRESS")); // Replace with actual target address

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
        Requires direct access to wallet files containing private keys. The service
        can sign and execute transactions immediately. Use this when building APIs,
        trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        // using wallet.json file
        // const walletJson = readFileSync("wallet.json", 'utf8');
        // const keys = JSON.parse(walletJson);
        // const signer = buildAccountSigner(keys);

        try {
            // create the token instance
            const token = await Token.fromId(client, tokenId);
            // Only the token issuer can modify the deny list
            console.log(`Attempting to add ${targetAddress.toString()} to deny list for ${tokenId.toString()}...`);

            // Execute the add to deny list operation
            const transaction = await Token.addDenyList(token, sender, targetAddress.address, signer);
            console.log(`Transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (!isKnown(result.summary)) {
                throw new Error('Unexpected transaction outcome');
            }

            if (result.summary!.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary!.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenUpdate:
                    console.log('AddDenyListEvent events:');
                    result.summary.events.forEach((e) => {
                        if (e!.tag !== TransactionEventTag.TokenModuleEvent) {
                            throw new Error('Unexpected event type: ' + e!.tag);
                        }
                        console.log('Token module event:', parseTokenModuleEvent(e!));
                    });
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason!.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason!.tag);
                    }
                    const details = Cbor.decode(result.summary.rejectReason.contents.details);
                    console.error(result.summary.rejectReason.contents, details);
                    break;
                default:
                    throw new Error('Unexpected transaction kind: ' + result.summary.transactionType);
            }
        } catch (error) {
            console.error('Error during list operation:', error);
        }
    } else {
        /* Wallet perspective: For dApps and wallet integrations
        Creates a transaction payload that can be signed by wallet applications.
        The wallet holds the private keys and the user reviews transactions before signing.
        Use this when building dApps where users connect their wallet (Browser Wallet,
        Mobile Wallet, etc.) and maintain control of their keys. */
        // Create the payload for adding to allow list
        const listPayload: TokenListUpdate = {
            target: CborAccountAddress.fromAccountAddress(targetAddress.address)
        };

        const listOperation: TokenOperation = {
            'addDenyList': listPayload,
        };

        console.log('Specified list action:', JSON.stringify(listOperation, null, 2));

        const payload = createTokenUpdatePayload(tokenId, listOperation);
        console.log('Created payload:', payload);

        // Serialize payload for signing/submission by wallet
        const serialized = serializeAccountTransactionPayload({
            payload,
            type: AccountTransactionType.TokenUpdate,
        });
        console.log('Serialized payload for wallet to sign & send:', serialized.toString('hex'));
    }

.. _web-sdk-remove-account-from-deny-list:

Remove account from deny list
-----------------------------

Remove an account from the token's deny list (issuer only):

.. code-block:: typescript

    /**
    * Removes an account from the token's deny list.
    * Accounts on the deny list cannot hold the token when deny list is enabled.
    * Only the nominated account (token issuer) can modify the deny list.
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/plt/modify-list.ts
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
        TransactionEventTag,
        isKnown,
        serializeAccountTransactionPayload,
        AccountTransactionType,
    } from '@concordium/web-sdk';
    import { TokenId, Cbor, TokenHolder, Token, parseTokenModuleEvent, TokenListUpdate, CborAccountAddress, TokenOperation, createTokenUpdatePayload } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { existsSync, readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-beta.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * The following example demonstrates how to remove an account from the deny list.
    */
    // using wallet.export file
    const walletFilePath = "keys/wallet.export";
    let walletFile: string | undefined;

    // Only read the file if it exists
    if (existsSync(walletFilePath)) {
        walletFile = readFileSync(walletFilePath, 'utf8');
    }
    // parse the arguments
    const tokenId = TokenId.fromString("TOKEN_ID"); // Replace with actual token ID
    const targetAddress = TokenHolder.fromAccountAddress(AccountAddress.fromBase58("TARGET_ADDRESS")); // Replace with actual target address

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
        Requires direct access to wallet files containing private keys. The service
        can sign and execute transactions immediately. Use this when building APIs,
        trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        // using wallet.json file
        // const walletJson = readFileSync("wallet.json", 'utf8');
        // const keys = JSON.parse(walletJson);
        // const signer = buildAccountSigner(keys);

        try {
            // create the token instance
            const token = await Token.fromId(client, tokenId);
            // Only the token issuer can modify the deny list
            console.log(`Attempting to remove ${targetAddress.toString()} from deny list for ${tokenId.toString()}...`);

            // Execute the remove from deny list operation
            const transaction = await Token.removeDenyList(token, sender, targetAddress.address, signer);
            console.log(`Transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (!isKnown(result.summary)) {
                throw new Error('Unexpected transaction outcome');
            }

            if (result.summary!.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary!.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenUpdate:
                    console.log('RemoveDenyListEvent events:');
                    result.summary.events.forEach((e) => {
                        if (e!.tag !== TransactionEventTag.TokenModuleEvent) {
                            throw new Error('Unexpected event type: ' + e!.tag);
                        }
                        console.log('Token module event:', parseTokenModuleEvent(e!));
                    });
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason!.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason!.tag);
                    }
                    const details = Cbor.decode(result.summary.rejectReason.contents.details);
                    console.error(result.summary.rejectReason.contents, details);
                    break;
                default:
                    throw new Error('Unexpected transaction kind: ' + result.summary.transactionType);
            }
        } catch (error) {
            console.error('Error during list operation:', error);
        }
    } else {
        /* Wallet perspective: For dApps and wallet integrations
            Creates a transaction payload that can be signed by wallet applications.
            The wallet holds the private keys and the user reviews transactions before signing.
            Use this when building dApps where users connect their wallet (Browser Wallet,
            Mobile Wallet, etc.) and maintain control of their keys. */
        // Create the payload for removing from allow list
        const listPayload: TokenListUpdate = {
            target: CborAccountAddress.fromAccountAddress(targetAddress.address)
        };

        const listOperation: TokenOperation = {
            'removeDenyList': listPayload,
        };

        console.log('Specified list action:', JSON.stringify(listOperation, null, 2));

        const payload = createTokenUpdatePayload(tokenId, listOperation);
        console.log('Created payload:', payload);

        // Serialize payload for signing/submission by wallet
        const serialized = serializeAccountTransactionPayload({
            payload,
            type: AccountTransactionType.TokenUpdate,
        });
        console.log('Serialized payload for wallet to sign & send:', serialized.toString('hex'));
    }

.. _web-sdk-pause-plt-transfers:

Pause a token
-------------

This example demonstrates how to suspend balance transfer operations for a Protocol Level Token (PLT). Only the token issuer can pause the token.

.. code-block:: typescript

    /**
    * Pause: suspends balance transfer operations for the PLT.
    * Only the nominated account (token issuer) can pause the token.
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/plt/pause.ts
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
        TransactionEventTag,
        isKnown,
        serializeAccountTransactionPayload,
        AccountTransactionType,
    } from '@concordium/web-sdk';
    import { TokenId, Cbor, Token, parseTokenModuleEvent, TokenOperation, createTokenUpdatePayload } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { existsSync, readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-beta.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * The following example demonstrates how to pause a token.
    */
    // using wallet.export file
    const walletFilePath = "keys/wallet.export";
    let walletFile: string | undefined;

    // Only read the file if it exists
    if (existsSync(walletFilePath)) {
        walletFile = readFileSync(walletFilePath, 'utf8');
    }
    // parse the arguments
    const tokenId = TokenId.fromString("TOKEN_ID"); // Replace with actual token ID

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
        Requires direct access to wallet files containing private keys. The service
        can sign and execute transactions immediately. Use this when building APIs,
        trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        // using wallet.json file
        // const walletJson = readFileSync("wallet.json", 'utf8');
        // const keys = JSON.parse(walletJson);
        // const signer = buildAccountSigner(keys);

        try {
            // create the token instance
            const token = await Token.fromId(client, tokenId);

            // Only the token issuer can pause the token
            console.log(`Attempting to pause token ${tokenId.toString()}...`);

            // Execute the pause operation
            const transaction = await Token.pause(token, sender, signer);
            console.log(`Pause transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (!isKnown(result.summary)) {
                    throw new Error('Unexpected transaction outcome');
            }

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenUpdate:
                    console.log('TokenPause events:');
                    result.summary.events.forEach((e) => {
                        if (e!.tag !== TransactionEventTag.TokenModuleEvent) {
                            throw new Error('Unexpected event type: ' + e!.tag);
                        }
                        console.log('Token module event:', parseTokenModuleEvent(e!));
                    });
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason!.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason!.tag);
                    }
                    const details = Cbor.decode(result.summary.rejectReason.contents.details);
                    console.error(result.summary.rejectReason.contents, details);
                    break;
                default:
                    throw new Error('Unexpected transaction kind: ' + result.summary.transactionType);
            }
        } catch (error) {
            console.error('Error during pause operation:', error);
        }
    } else {
    /* Wallet perspective: For dApps and wallet integrations
        Creates a transaction payload that can be signed by wallet applications.
        The wallet holds the private keys and the user reviews transactions before signing.
        Use this when building dApps where users connect their wallet (Browser Wallet,
        Mobile Wallet, etc.) and maintain control of their keys. */
        // Create the payload for pausing the token
        const pauseOperation = { pause: true } as TokenOperation;
        console.log('Specified pause action:', JSON.stringify(pauseOperation, null, 2));

        const payload = createTokenUpdatePayload(tokenId, pauseOperation);
        console.log('Created payload:', payload);

        // Serialize payload for signing/submission by wallet
        const serialized = serializeAccountTransactionPayload({
            payload,
            type: AccountTransactionType.TokenUpdate,
        });
        console.log('Serialized payload for wallet to sign & send:', serialized.toString('hex'));
    }

.. _web-sdk-unpause-plt-transfers:

Unpause a token
---------------

This example demonstrates how to resume balance transfer operations for a Protocol Level Token (PLT). Only the token issuer can unpause the token.

.. code-block:: typescript

    /**
    * Unpause: resumes balance transfer operations for the PLT.
    * Only the nominated account (token issuer) can unpause the token.
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/main/examples/nodejs/plt/pause.ts
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
        TransactionEventTag,
        isKnown,
        serializeAccountTransactionPayload,
        AccountTransactionType,
    } from '@concordium/web-sdk';
    import { TokenId, Cbor, Token, parseTokenModuleEvent, TokenOperation, createTokenUpdatePayload } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { existsSync, readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-beta.concordium.com",
        Number(20000),
        credentials.createSsl()
    );

    /**
    * The following example demonstrates how to unpause a token.
    */
    // using wallet.export file
    const walletFilePath = "keys/wallet.export";
    let walletFile: string | undefined;

    // Only read the file if it exists
    if (existsSync(walletFilePath)) {
        walletFile = readFileSync(walletFilePath, 'utf8');
    }
    // parse the arguments
    const tokenId = TokenId.fromString("TOKEN_ID"); // Replace with actual token ID

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
        Requires direct access to wallet files containing private keys. The service
        can sign and execute transactions immediately. Use this when building APIs,
        trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        // using wallet.json file
        // const walletJson = readFileSync("wallet.json", 'utf8');
        // const keys = JSON.parse(walletJson);
        // const signer = buildAccountSigner(keys);

        try {
            // create the token instance
            const token = await Token.fromId(client, tokenId);

            // Only the token issuer can unpause the token
            console.log(`Attempting to unpause token ${tokenId.toString()}...`);

            // Execute the unpause operation
            const transaction = await Token.unpause(token, sender, signer);
            console.log(`Unpause transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (!isKnown(result.summary)) {
                throw new Error('Unexpected transaction outcome');
            }

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenUpdate:
                    console.log('TokenUnpause events:');
                    result.summary.events.forEach((e) => {
                        if (e!.tag !== TransactionEventTag.TokenModuleEvent) {
                            throw new Error('Unexpected event type: ' + e!.tag);
                        }
                        console.log('Token module event:', parseTokenModuleEvent(e!));
                    });
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason!.tag !== RejectReasonTag.TokenUpdateTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason!.tag);
                    }
                    const details = Cbor.decode(result.summary.rejectReason.contents.details);
                    console.error(result.summary.rejectReason.contents, details);
                    break;
                default:
                    throw new Error('Unexpected transaction kind: ' + result.summary.transactionType);
            }
        } catch (error) {
            console.error('Error during unpause operation:', error);
        }
    } else {
        /* Wallet perspective: For dApps and wallet integrations
        Creates a transaction payload that can be signed by wallet applications.
        The wallet holds the private keys and the user reviews transactions before signing.
        Use this when building dApps where users connect their wallet (Browser Wallet,
        Mobile Wallet, etc.) and maintain control of their keys. */
        // Create the payload for unpausing the token
        const pauseOperation = { pause: false } as TokenOperation;
        console.log('Specified unpause action:', JSON.stringify(pauseOperation, null, 2));

        const payload = createTokenUpdatePayload(tokenId, pauseOperation);
        console.log('Created payload:', payload);

        // Serialize payload for signing/submission by wallet
        const serialized = serializeAccountTransactionPayload({
            payload,
            type: AccountTransactionType.TokenUpdate,
        });
        console.log('Serialized payload for wallet to sign & send:', serialized.toString('hex'));
    }
