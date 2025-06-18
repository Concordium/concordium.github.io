.. _plt-web-sdk:

=============
Web SDK usage
=============

This guide shows how to integrate Protocol-Level Tokens into web applications using Concordium's Web SDK.

Installation and setup
======================

Before using this example, make sure to install the required dependencies:

.. code-block:: bash

  npm install @concordium/web-sdk@10.0.0-alpha.6
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


.. _querying-tokens:

Querying tokens
===============

.. _web-sdk-get-token-list:

Get token list
--------------

Retrieve all Protocol-Level Tokens available on the network:

.. code-block:: typescript

    /**
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/plt/examples/nodejs/client/getTokenList.ts
    * Retrieves the protocol level tokens that exists at the end of a given block as an async
    * iterable. If a blockhash is not supplied it will pick the latest finalized
    * block. An optional abortSignal can also be provided that closes the stream.
    * Note: A stream can be collected to a list with the streamToList function.
    */

    import {
       BlockHash
    } from '@concordium/web-sdk';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';

    const client = new ConcordiumGRPCNodeClient(
       "grpc.devnet-plt-alpha.concordium.com",
       Number(20000),
       credentials.createSsl() //  credentials.createInsecure(),
    );

    /**
    * The following example demonstrates how to query the list of PLTs available in the network.
    */
       // If using a specific block hash, uncomment and replace with actual hash
       // const blockHash = BlockHash.fromHexString("someblockhash");
       // Or use undefined for latest finalized block
       const blockHash = undefined;
       const tokens = await client.getTokenList(blockHash);
       console.log('Protocol level tokens (PLTs) that exists at the end of the given block:');
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
    * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/plt/examples/nodejs/client/getTokenInfo.ts
    * @param symbol
    * @returns TokenInfo {TokenId, TokenState}
    */

    import {
       BlockHash
    } from '@concordium/web-sdk';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { TokenId, TokenInfo } from '@concordium/web-sdk/plt';
    const client = new ConcordiumGRPCNodeClient(
       "grpc.devnet-plt-alpha.concordium.com",
       Number(20000),
       credentials.createSsl() //  credentials.createInsecure(),
    );

    /**
    * Retrieves information about an protocol level token (PLT). The function must be provided a
    * token id.
    */
       // token symbol
       const tokenId = TokenId.fromString("PLT_SYM");
       // If using a specific block hash, uncomment and replace with actual hash
       // Or use undefined for latest finalized block
       const blockHash = undefined;
       // blockHash = BlockHash.fromHexString("someblockhash");
       const tokenInfo: TokenInfo = await client.getTokenInfo(tokenId, blockHash);
       console.log('Total token supply:', tokenInfo.state.totalSupply);
       console.log('Token issuer:', tokenInfo.state.issuer);
       console.log('decimals:', tokenInfo.state.decimals);
       console.log('moduleRef:', tokenInfo.state.moduleRef); // only V1 for all PLTs initially.

.. _web-sdk-get-account-info:

Get account information
-----------------------

Query account information including PLT balances:

.. code-block:: typescript

    /**
     * Returns the account information including PLT balances
     * full code example using cli: https://github.com/Concordium/concordium-node-sdk-js/blob/plt/examples/nodejs/client/getTokenInfo.ts
     */
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { AccountAddress, AccountInfo, BlockHash } from '@concordium/web-sdk';

    async function main() {
        const client = new ConcordiumGRPCNodeClient(
            "grpc.devnet-plt-alpha.concordium.com",
            Number(20000),
            credentials.createSsl() // Change to credentials.createSsl() if you want to use SSL
        );

        /**
         * Retrieves information about an account including its PLT balances
         */
        const accountAddress = AccountAddress.fromBase58("your_account_address"); // Replace with a real address

        // If using a specific block hash, uncomment and replace with actual hash
        // Or use undefined for latest finalized block
        const blockHash = undefined;
        // const blockHash = BlockHash.fromHexString("someblockhash");

        const accountInfo: AccountInfo = await client.getAccountInfo(accountAddress, blockHash);

        console.log('Account balance:', accountInfo.accountAmount);
        console.log('Account address:', accountInfo.accountAddress);

        const tokenAccountInfo = accountInfo.accountTokens;
        tokenAccountInfo.forEach(balance =>
            console.log(`Token ${balance.id}, balance ${balance.state.balance}`)
        );
        console.log('FULL Token account info:', tokenAccountInfo);
    }

    main().catch(error => console.error('Error:', error));

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
    */
    import {
       AccountAddress,
       parseWallet,
       buildAccountSigner,
       TransactionSummaryType,
       TransactionKindString,
       RejectReasonTag,
    } from '@concordium/web-sdk';
    import { TokenId, TokenAmount, V1, Cbor } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
       "grpc.devnet-plt-alpha.concordium.com",
       Number(20000),
       credentials.createSsl() //  credentials.createInsecure(),
    );

    /**
    * The following example demonstrates how a simple transfer can be created.
    */
       // #region documentation-snippet
       console.log("Current working directory:", process.cwd());
       // using wallet.export file
       const walletFile = readFileSync("wallet.export", 'utf8');
       const walletExport = parseWallet(walletFile);
       const sender = AccountAddress.fromBase58(walletExport.value.address);
       const signer = buildAccountSigner(walletExport);

       // using wallet.json file
       // const walletJson = readFileSync("wallet.json", 'utf8');
       // const keys = JSON.parse(walletJson);
       // const signer = buildAccountSigner(keys);

       // parse the other arguments
       const tokenSymbol = TokenId.fromString("ExampleToken"); // Replace with actual token ID
       const amount = TokenAmount.fromDecimal(123); // some amount to transfer
       const recipient = AccountAddress.fromBase58("Recipient address"); // replace with actual address to receive
       const memo = undefined;
       // memo = CborMemo.fromString("Any Message To add")

       const transfer: V1.TokenTransfer = {
           recipient,
           amount,
           memo,
       };
       console.log('Specified transfer:', JSON.stringify(transfer, null, 2));

       // From a service perspective:
       // create the token instance
       const token = await V1.Token.fromId(client, tokenSymbol);
       const transaction = await V1.Token.transfer(token, sender, transfer, signer);
       console.log(`Transaction submitted with hash: ${transaction}`);

       const result = await client.waitForTransactionFinalization(transaction);
       console.log('Transaction finalized:', result);

       if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
           throw new Error('Unexpected transaction type: ' + result.summary.type);
       }

       switch (result.summary.transactionType) {
           case TransactionKindString.TokenHolder:
           case TransactionKindString.TokenGovernance:
               console.log('TokenTransfer events:');
               result.summary.events.forEach((e) => console.log(e.event));
               break;
           case TransactionKindString.Failed:
               if (result.summary.rejectReason.tag !== RejectReasonTag.TokenHolderTransactionFailed) {
                   throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason.tag);
               }
               const details = Cbor.decode(result.summary.rejectReason.contents.details);
               console.error(result.summary.rejectReason.contents, details);
               break;
           default:
               throw new Error('Unexpected transaction kind: ' + result.summary.transactionType);
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
    * Shows how to mint tokens with both wallet connection and payload creation.
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
    } from '@concordium/web-sdk';
    import { TokenId, TokenAmount, V1, Cbor } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-alpha.concordium.com",
        Number(20000),
        credentials.createSsl() //  credentials.createInsecure(),
    );

    /**
    * The following example demonstrates how to mint new tokens.
    */
    console.log("Current working directory:", process.cwd());
    // using wallet.export file
    const walletFile = readFileSync("wallet.export", 'utf8');
    // parse the arguments
    const tokenId = TokenId.fromString("PLT_SYM");
    const tokenAmount = TokenAmount.fromDecimal(1000); // amount to mint

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
         Requires direct access to wallet files containing private keys. The service
         can sign and execute transactions immediately. Use this when building APIs,
         trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        try {
            // create the token instance
            const token = await V1.Token.fromId(client, tokenId);
            // Only the token issuer can modify the deny list
            console.log(`Attempting to remove ${targetAddress.toString()} from deny list for ${tokenId.toString()}...`);

            // Execute the remove from deny list operation
            const transaction = await V1.Governance.removeDenyList(token, sender, targetAddress, signer);
            console.log(`Transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenHolder:
                case TransactionKindString.TokenGovernance:
                    console.log('RemoveDenyListEvent events:');
                    result.summary.events.forEach((e) => console.log(e.event));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason.tag !== RejectReasonTag.TokenHolderTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason.tag);
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
        console.log(`Wallet file is empty!`);
    }port);

        try {
            // create the token instance
            const token = await V1.Token.fromId(client, tokenId);
            // Only the token issuer can mint tokens
            console.log(`Attempting to mint ${tokenAmount.toString()} ${tokenId.toString()} tokens...`);

            // Execute the mint operation
            const transaction = await V1.Governance.mint(token, sender, tokenAmount, signer);
            console.log(`Mint transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenHolder:
                case TransactionKindString.TokenGovernance:
                    console.log('TokenMint events:');
                    result.summary.events.forEach((e) => console.log(e.event));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason.tag !== RejectReasonTag.TokenHolderTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason.tag);
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
        console.log(`Wallet file is empty!`);
    }

.. _web-sdk-burn-tokens:

Burn tokens
-----------

Burn existing tokens (issuer only):

.. code-block:: typescript

    /**
    * Burns tokens from the issuer's account.
    * Only the nominated account (token issuer) can perform burn operations.
    * Shows how to burn tokens with both wallet connection and payload creation.
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
    } from '@concordium/web-sdk';
    import { TokenId, TokenAmount, V1, Cbor } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-alpha.concordium.com",
        Number(20000),
        credentials.createSsl() //  credentials.createInsecure(),
    );

    /**
    * The following example demonstrates how to burn existing tokens.
    */
    console.log("Current working directory:", process.cwd());
    // using wallet.export file
    const walletFile = readFileSync("wallet.export", 'utf8');
    // parse the arguments
    const tokenId = TokenId.fromString("ExampleToken"); // replace with your token ID
    const tokenAmount = TokenAmount.fromDecimal(44); // amount to burn

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
         Requires direct access to wallet files containing private keys. The service
         can sign and execute transactions immediately. Use this when building APIs,
         trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        try {
            // create the token instance
            const token = await V1.Token.fromId(client, tokenId);
            // Only the token issuer can burn tokens
            console.log(`Attempting to burn ${tokenAmount.toString()} ${tokenId.toString()} tokens...`);

            // Execute the burn operation
            const transaction = await V1.Governance.burn(token, sender, tokenAmount, signer);
            console.log(`Burn transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenHolder:
                case TransactionKindString.TokenGovernance:
                    console.log('TokenBurn events:');
                    result.summary.events.forEach((e) => console.log(e.event));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason.tag !== RejectReasonTag.TokenHolderTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason.tag);
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
        console.log(`Wallet file is empty!`);
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
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
    } from '@concordium/web-sdk';
    import { TokenId, V1, Cbor } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-alpha.concordium.com",
        Number(20000),
        credentials.createSsl() //  credentials.createInsecure(),
    );

    /**
    * The following example demonstrates how to add an account to the allow list.
    */
    console.log("Current working directory:", process.cwd());
    // using wallet.export file
    const walletFile = readFileSync("wallet.export", 'utf8');
    // parse the arguments
    const tokenId = TokenId.fromString("ExampleToken");
    const targetAddress = AccountAddress.fromBase58("your-target-address-here"); // Replace with actual target address

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
         Requires direct access to wallet files containing private keys. The service
         can sign and execute transactions immediately. Use this when building APIs,
         trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        try {
            // create the token instance
            const token = await V1.Token.fromId(client, tokenId);
            // Only the token issuer can modify the allow list
            console.log(`Attempting to add ${targetAddress.toString()} to allow list for ${tokenId.toString()}...`);

            // Execute the add to allow list operation
            const transaction = await V1.Governance.addAllowList(token, sender, targetAddress, signer);
            console.log(`Transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenHolder:
                case TransactionKindString.TokenGovernance:
                    console.log('AddAllowListEvent events:');
                    result.summary.events.forEach((e) => console.log(e.event));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason.tag !== RejectReasonTag.TokenHolderTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason.tag);
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
       console.log(`Wallet file is empty!`);
    }

.. _web-sdk-remove-account-from-allow-list:

Remove account from allow list
------------------------------

Remove an account from the token's allow list (issuer only):

.. code-block:: typescript

    /**
    * Removes an account from the token's allow list.
    * Only the nominated account (token issuer) can modify the allow list.
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
    } from '@concordium/web-sdk';
    import { TokenId, V1, Cbor } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-alpha.concordium.com",
        Number(20000),
        credentials.createSsl() //  credentials.createInsecure(),
    );

    /**
    * The following example demonstrates how to remove an account from the allow list.
    */
    console.log("Current working directory:", process.cwd());
    // using wallet.export file
    const walletFile = readFileSync("wallet.export", 'utf8');
    // parse the arguments
    const tokenId = TokenId.fromString("ExampleToken");
    const targetAddress = AccountAddress.fromBase58("replace-with-target-address"); // Replace with actual target address

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
         Requires direct access to wallet files containing private keys. The service
         can sign and execute transactions immediately. Use this when building APIs,
         trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        try {
            // create the token instance
            const token = await V1.Token.fromId(client, tokenId);
            // Only the token issuer can modify the allow list
            console.log(`Attempting to remove ${targetAddress.toString()} from allow list for ${tokenId.toString()}...`);

            // Execute the remove from allow list operation
            const transaction = await V1.Governance.removeAllowList(token, sender, targetAddress, signer);
            console.log(`Transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenHolder:
                case TransactionKindString.TokenGovernance:
                    console.log('RemoveAllowListEvent events:');
                    result.summary.events.forEach((e) => console.log(e.event));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason.tag !== RejectReasonTag.TokenHolderTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason.tag);
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
        console.log(`Wallet file is empty!`);
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
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
    } from '@concordium/web-sdk';
    import { TokenId, V1, Cbor } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-alpha.concordium.com",
        Number(20000),
        credentials.createSsl() //  credentials.Insecure(),
    );

    /**
    * The following example demonstrates how to add an account to the deny list.
    */
    console.log("Current working directory:", process.cwd());
    // using wallet.export file
    const walletFile = readFileSync("wallet.export", 'utf8');
    // parse the arguments
    const tokenId = TokenId.fromString("ExampleToken"); // Replace with actual token ID
    const targetAddress = AccountAddress.fromBase58("replace-with-target-address"); // Replace with actual target address

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
         Requires direct access to wallet files containing private keys. The service
         can sign and execute transactions immediately. Use this when building APIs,
         trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        try {
            // create the token instance
            const token = await V1.Token.fromId(client, tokenId);
            // Only the token issuer can modify the deny list
            console.log(`Attempting to add ${targetAddress.toString()} to deny list for ${tokenId.toString()}...`);

            // Execute the add to deny list operation
            const transaction = await V1.Governance.addDenyList(token, sender, targetAddress, signer);
            console.log(`Transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenHolder:
                case TransactionKindString.TokenGovernance:
                    console.log('AddDenyListEvent events:');
                    result.summary.events.forEach((e) => console.log(e.event));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason.tag !== RejectReasonTag.TokenHolderTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason.tag);
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
       console.log(`Wallet file is empty!`);
    }

.. _web-sdk-remove-account-from-deny-list:

Remove account from deny list
-----------------------------

Remove an account from the token's deny list (issuer only):

.. code-block:: typescript

    /**
    * Removes an account from the token's deny list.
    * Only the nominated account (token issuer) can modify the deny list.
    */
    import {
        AccountAddress,
        parseWallet,
        buildAccountSigner,
        TransactionSummaryType,
        TransactionKindString,
        RejectReasonTag,
    } from '@concordium/web-sdk';
    import { TokenId, V1, Cbor } from '@concordium/web-sdk/plt';
    import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
    import { credentials } from '@grpc/grpc-js';
    import { readFileSync } from 'node:fs';

    const client = new ConcordiumGRPCNodeClient(
        "grpc.devnet-plt-alpha.concordium.com",
        Number(20000),
        credentials.createSsl() //  credentials.createInsecure(),
    );

    /**
    * The following example demonstrates how to remove an account from the deny list.
    */
    console.log("Current working directory:", process.cwd());
    // using wallet.export file
    const walletFile = readFileSync("wallet.export", 'utf8');
    // parse the arguments
    const tokenId = TokenId.fromString("ExampleToken"); // Replace with actual token ID
    const targetAddress = AccountAddress.fromBase58("replace-with-target-address"); // Replace with actual target address

    if (walletFile !== undefined) {
        /* Service perspective: For backend services and automated systems
         Requires direct access to wallet files containing private keys. The service
         can sign and execute transactions immediately. Use this when building APIs,
         trading bots, or administrative tools where the service manages tokens automatically.*/
        const walletExport = parseWallet(walletFile);
        const sender = AccountAddress.fromBase58(walletExport.value.address);
        const signer = buildAccountSigner(walletExport);

        try {
            // create the token instance
            const token = await V1.Token.fromId(client, tokenId);
            // Only the token issuer can modify the deny list
            console.log(`Attempting to remove ${targetAddress.toString()} from deny list for ${tokenId.toString()}...`);

            // Execute the remove from deny list operation
            const transaction = await V1.Governance.removeDenyList(token, sender, targetAddress, signer);
            console.log(`Transaction submitted with hash: ${transaction}`);

            const result = await client.waitForTransactionFinalization(transaction);
            console.log('Transaction finalized:', result);

            if (result.summary.type !== TransactionSummaryType.AccountTransaction) {
                throw new Error('Unexpected transaction type: ' + result.summary.type);
            }

            switch (result.summary.transactionType) {
                case TransactionKindString.TokenHolder:
                case TransactionKindString.TokenGovernance:
                    console.log('RemoveDenyListEvent events:');
                    result.summary.events.forEach((e) => console.log(e.event));
                    break;
                case TransactionKindString.Failed:
                    if (result.summary.rejectReason.tag !== RejectReasonTag.TokenHolderTransactionFailed) {
                        throw new Error('Unexpected reject reason tag: ' + result.summary.rejectReason.tag);
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
        console.log(`Wallet file is empty!`);
    }
