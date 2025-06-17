.. _plt-create-and-manage:

Create and manage PLTs
======================

This guide covers token governance operations for Protocol Layer Tokens (PLTs), including minting, burning, and managing allow/deny lists.

.. _prerequisites:

Prerequisites
-------------

Before using the available operations, make sure to install the required dependencies:

.. code-block:: bash

   npm install @concordium/web-sdk@10.0.0-alpha.4
   npm install @grpc/grpc-js

Available operations
--------------------

- :ref:`Mint tokens <mint-tokens>`
- :ref:`Burn tokens <burn-tokens>`
- :ref:`Add account to allow list <add-allow-list>`
- :ref:`Remove account from allow list <remove-allow-list>`
- :ref:`Add account to deny list <add-deny-list>`
- :ref:`Remove account from deny list <remove-deny-list>`

.. note::
   Only the nominated account (token issuer) can perform these governance operations.


.. _plt-mint-tokens:

Mint tokens
-----------

Mints new tokens to the issuer's account.

.. code-block:: javascript

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

.. _plt-burn-tokens:

Burn tokens
-----------

Burns tokens from the issuer's account.

.. code-block:: javascript

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


.. _add-allow-list:

Add account to allow list
-------------------------

Adds an account to the token's allow list. Only accounts on the allow list can hold the token when allow list is enabled.

.. code-block:: javascript

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

.. _remove-allow-list:

Remove account from allow list
------------------------------

Removes an account from the token's allow list.

.. code-block:: javascript

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

.. _add-deny-list:

Add account to deny list
------------------------

Adds an account to the token's deny list. Accounts on the deny list cannot hold the token when deny list is enabled.

.. code-block:: javascript

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


.. _remove-deny-list:

Remove account from deny list
-----------------------------

Removes an account from the token's deny list.

.. code-block:: javascript

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
