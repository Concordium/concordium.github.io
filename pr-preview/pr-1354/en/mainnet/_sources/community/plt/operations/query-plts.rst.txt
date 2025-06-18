.. _plt-query:

=====================
Query PLT information
=====================

This guide covers how to query information about Protocol Layer Tokens (PLTs) and account balances on DevNet.

Prerequisites
=============

Before using these examples, make sure to install the required dependencies:

.. code-block:: bash

   npm install @concordium/web-sdk@10.0.0-alpha.4
   npm install @grpc/grpc-js


Available query operations
==========================

You can make three main types of queries:

- :ref:`Get account information: <get_account_info>`
  Returns account information including PLT balances for a specific account.

- :ref:`Get token information: <get_token_info>`
  Returns detailed information about a specific PLT by its symbol.

- :ref:`Get token list:  <get_token_list>`
  Retrieves all PLTs that exist at the end of a given block.

.. _get_account_info:

Get account information
-----------------------

This operation returns account information including PLT balances for a specific account.

.. code-block:: typescript

   import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
   import { credentials } from '@grpc/grpc-js';
   import { AccountAddress, AccountInfo, BlockHash } from '@concordium/web-sdk';

   const client = new ConcordiumGRPCNodeClient(
       "grpc.devnet-plt-alpha.concordium.com",
       Number(20000),
       credentials.createSsl() // credentials.createInsecure(),
   );

   const accountAddress = AccountAddress.fromBase58("someAddress");

   // If using a specific block hash, uncomment and replace with actual hash
   // Or use undefined for latest finalized block
   const blockHash = undefined;
   // blockHash = BlockHash.fromHexString("someblockhash");

   const accountInfo: AccountInfo = await client.getAccountInfo(accountAddress, blockHash);

   console.log('Account balance:', accountInfo.accountAmount);
   console.log('Account address:', accountInfo.accountAddress);

   const tokenAccountInfo = accountInfo.accountTokens;
   tokenAccountInfo.forEach(balance =>
       console.log(`Token ${balance.id}, balance ${balance.state.balance}`)
   );

.. note::
   The method ``get_account_info.rs`` currently works inconsistently and may not always display correct account information due to a known bug. A fix will be provided in an upcoming release.

.. _get_token_info:

Get token information
---------------------

This operation returns detailed information about a specific PLT by its symbol.

.. code-block:: typescript

   import { BlockHash } from '@concordium/web-sdk';
   import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
   import { credentials } from '@grpc/grpc-js';
   import { TokenId, TokenInfo } from '@concordium/web-sdk/plt';

   const client = new ConcordiumGRPCNodeClient(
       "grpc.devnet-plt-alpha.concordium.com",
       Number(20000),
       credentials.createSsl() // credentials.createInsecure(),
   );

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

.. _get_token_list:

Get token list
--------------

This operation retrieves all PLTs that exist at the end of a given block.

.. code-block:: typescript

   import { BlockHash } from '@concordium/web-sdk';
   import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
   import { credentials } from '@grpc/grpc-js';

   const client = new ConcordiumGRPCNodeClient(
       "grpc.devnet-plt-alpha.concordium.com",
       Number(20000),
       credentials.createSsl() // credentials.createInsecure(),
   );

   // If using a specific block hash, uncomment and replace with actual hash
   // const blockHash = BlockHash.fromHexString("someblockhash");
   // Or use undefined for latest finalized block
   const blockHash = undefined;

   const tokens = await client.getTokenList(blockHash);

   console.log('Protocol level tokens (PLTs) that exists at the end of the given block:');
   for await (const token of tokens) {
       console.log(token.toString());
   }


