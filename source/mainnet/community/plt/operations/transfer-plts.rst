.. _plt-transfer:

Transfer PLTs
=============

This guide shows how to transfer Protocol Layer Tokens (PLTs) to another account on DevNet.

About PLT transfer
------------------

There is only one token-holder operation that is implemented in the MVP, which is the transfer operation. (In the future, other operations may include scheduled send and creating locks, for instance.) As with token-governance, there will be a single token-holder account transaction that supports cases for each token-holder operation. All token-holder operations will identify the token by its ticker symbol.

Token transfer requirements
----------------------------

The token transfer transaction specifies the destination (currently limited to an account), the amount, and an optional memo. The originating account must have a sufficient balance in the PLT to cover the transfer. The receiving account must exist. If there is an allow list for the PLT, both accounts must be on the allow list. If there is a deny list, neither account may be on the deny list.

Prerequisites
-------------

Before using this example, make sure to install the required dependencies:

.. code-block:: bash

  npm install @concordium/web-sdk@10.0.0-alpha.4
  npm install @grpc/grpc-js

Transfer tokens
---------------

This example demonstrates how to transfer a specified amount of PLT to another address with memo support and signing.

.. code-block:: javascript

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
      credentials.createSsl() // credentials.createInsecure(),
  );

  /**
   * The following example demonstrates how a simple transfer can be created.
   */
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
