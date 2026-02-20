.. include:: ../../variables.rst
.. _set-up-a-sponsor-service:

=========================
Set up a sponsor service
=========================

The sponsor service runs on a secure backend and holds the sponsor wallet's private key. It creates transactions and signs them on behalf of the sponsor.

.. note::

   A full working example of a dApp using sponsored transactions is available on `GitHub <https://github.com/Concordium/concordium-dapp-examples/tree/main/DevnetSponsoredTx>`_.

Sponsor service code
====================

The following code is ready to copy into your project — just replace ``<GRPC_HOST>``, ``<GRPC_PORT>``, and ``<PATH_TO_SPONSOR_WALLET>`` with your own values. Read the :ref:`walkthrough below <sponsor-walkthrough>` to understand each step before adapting it for your use case. This example focuses on clarity rather than production hardening, so you will want additional input validation, error handling, rate limiting, and logging before deploying.

.. code-block:: typescript

   import {
       AccountAddress,
       TransactionExpiry,
       TokenId,
       TokenOperationType,
       TokenAmount,
       CborMemo,
       Cbor,
       CborAccountAddress,
       parseWallet,
       buildAccountSigner,
   } from '@concordium/web-sdk'
   import { Transaction } from '@concordium/web-sdk/transactions'
   import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs'
   import { credentials } from '@grpc/grpc-js'
   import { readFileSync } from 'node:fs'

   // Initialize gRPC client
   const grpcClient = new ConcordiumGRPCNodeClient(
       '<GRPC_HOST>',
       <GRPC_PORT>,
       credentials.createSsl()
   )

   // Load sponsor wallet
   const walletFile = readFileSync('<PATH_TO_SPONSOR_WALLET>', 'utf8')
   const walletExport = parseWallet(walletFile)
   const sponsorAccount = AccountAddress.fromBase58(walletExport.value.address)
   const sponsorSigner = buildAccountSigner(walletExport)

   export async function sponsorTokenTransfer(
       sender: string,
       recipient: string,
       amount: string,
       tokenId: string,
       decimals: number
   ) {
       const senderAddress = AccountAddress.fromBase58(sender)

       // Build token transfer operations
       const ops = [{
           [TokenOperationType.Transfer]: {
               amount: TokenAmount.fromDecimal(parseFloat(amount), decimals),
               recipient: CborAccountAddress.fromAccountAddress(
                   AccountAddress.fromBase58(recipient)
               ),
               memo: CborMemo.fromString('Sponsored transfer'),
           },
       }]

       // Create the transaction builder and get the sender's nonce
       const builder = Transaction.tokenUpdate({
           tokenId: TokenId.fromString(tokenId),
           operations: Cbor.encode(ops),
       })

       const nonce = await grpcClient.getNextAccountNonce(senderAddress)

       // Build the sponsorable transaction
       const sponsorable = builder
           .addMetadata({
               sender: senderAddress,
               nonce: nonce.nonce,
               expiry: TransactionExpiry.futureMinutes(5),
           })
           .addSponsor(sponsorAccount)
           .build()

       // Sign as sponsor
       const sponsored = await Transaction.sponsor(sponsorable, sponsorSigner)
       const sponsoredJSON = Transaction.toJSON(sponsored)

       // Serialize BigInt values for JSON transport
       const serialized = JSON.parse(
           JSON.stringify(sponsoredJSON, (_, value) => {
               if (typeof value === 'bigint') {
                   if (value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER) {
                       return Number(value)
                   }
                   return value.toString()
               }
               return value
           })
       )

       return serialized
   }

.. _sponsor-walkthrough:

Code walkthrough
================

.. dropdown:: gRPC client and wallet setup

   The ``ConcordiumGRPCNodeClient`` connects to a Concordium node, which is needed to query on-chain data such as account nonces.

   The sponsor wallet is loaded from an exported ``wallet.export`` file. ``parseWallet`` reads the wallet export format, and ``buildAccountSigner`` creates a signer that can produce cryptographic signatures on behalf of the sponsor account.

.. dropdown:: Building token transfer operations

   The ``ops`` array describes what the transaction does. Each operation uses ``TokenOperationType.Transfer`` to move tokens to a recipient. ``TokenAmount.fromDecimal`` converts a human-readable amount (e.g. ``"10.5"``) into the on-chain representation using the token's decimal places. An optional ``CborMemo`` can be attached to annotate the transfer.

.. dropdown:: Creating the transaction builder and nonce

   ``Transaction.tokenUpdate`` returns a transaction builder targeting a specific token by its ID. The builder pattern allows you to chain metadata and sponsorship before finalizing the transaction.

   The sender's next nonce is fetched from the chain via ``getNextAccountNonce``. The nonce increments with each transaction and prevents replay attacks.

.. dropdown:: Building the sponsorable transaction

   The builder's ``addMetadata`` method sets the sender's address, nonce, and expiry. ``addSponsor(sponsorAccount)`` designates the sponsor as the fee payer instead of the sender. The ``build()`` call produces a transaction ready for sponsorship.

.. dropdown:: Signing and serialization

   ``Transaction.sponsor`` adds the sponsor's cryptographic signature, committing them to pay the fees. The result is converted to JSON via ``Transaction.toJSON``.

   JavaScript's native ``JSON.stringify`` cannot serialize ``BigInt`` values, so a custom replacer converts small values to numbers and large values to strings to avoid precision loss.

Serve as an API endpoint
========================

To expose ``sponsorTokenTransfer`` as a POST endpoint, create a file called ``server.ts``:

.. code-block:: typescript

   import express from 'express'
   import cors from 'cors'
   import { sponsorTokenTransfer } from './sponsor'

   const app = express()
   app.use(cors())
   app.use(express.json())

   app.post('/sponsor', async (req, res) => {
       try {
           const { sender, recipient, amount, tokenId, decimals } = req.body

           if (!sender || !recipient || !amount || !tokenId || decimals === undefined) {
               return res.status(400).json({ error: 'Missing required fields' })
           }

           const sponsoredTransaction = await sponsorTokenTransfer(
               sender,
               recipient,
               amount,
               tokenId,
               Number(decimals)
           )

           return res.json({ sponsoredTransaction })
       } catch (error) {
           console.error('Sponsor error:', error)
           return res.status(500).json({ error: 'Failed to sponsor transaction' })
       }
   })

   const PORT = process.env.PORT || 3000
   app.listen(PORT, () => {
       console.log(`Sponsor service running on port ${PORT}`)
   })

Install Express, CORS, and their types:

.. code-block:: console

   $ npm install express cors
   $ npm install -D @types/express @types/cors

Run the server:

.. code-block:: console

   $ npx ts-node server.ts

The frontend (covered in :ref:`Create a sponsored transaction <create-a-sponsored-transaction>`) calls ``POST /sponsor`` with the transfer details and receives back the sponsor-signed transaction for the user's wallet to co-sign and submit.
