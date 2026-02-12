.. include:: ../../variables.rst
.. _set-up-a-sponsor-service:

=========================
Set up a sponsor service
=========================

The sponsor service runs on a secure backend and holds the sponsor wallet's private key. It creates transactions and signs them on behalf of the sponsor.

**Step 1: Import the required modules**

The ``@concordium/web-sdk`` provides transaction building and signing utilities, while the nodejs subpackage provides the gRPC client for communicating with Concordium nodes:

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

**Step 2: Initialize the gRPC client**

Establish the connection to a Concordium node, needed to query the chain and submit transactions:

.. code-block:: typescript

   // Initialize gRPC client
   const grpcClient = new ConcordiumGRPCNodeClient(
       '<GRPC_HOST>',
       <GRPC_PORT>,
       credentials.createSsl()
   )

**Step 3: Load the sponsor wallet**

Load the sponsor wallet from the exported wallet.export file. The ``parseWallet`` function reads the wallet export format, and ``buildAccountSigner`` creates the signer that can sign transactions on behalf of this account:

.. code-block:: typescript

   const walletFile = readFileSync('<PATH_TO_SPONSOR_WALLET>', 'utf8')
   const walletExport = parseWallet(walletFile)
   const sponsorAccount = AccountAddress.fromBase58(walletExport.value.address)
   const sponsorSigner = buildAccountSigner(walletExport)

**Step 4: Create the main sponsoring function**

Create the main sponsoring function. The sender is the user's account (who will authorize the transfer), while the recipient, amount and token details define what will be transferred:

.. code-block:: typescript

   export async function sponsorTokenTransfer(
       sender: string,
       recipient: string,
       amount: string,
       tokenId: string,
       decimals: number
   ) {
       const senderAddress = AccountAddress.fromBase58(sender)

**Step 5: Build the token transfer operations**

Inside the function, build the Protocol Level Token transfer operations. This creates an array of operations that describe what the transaction should do, in this case it will transfer tokens to a recipient with an optional memo:

.. code-block:: typescript

       const ops = [{
           [TokenOperationType.Transfer]: {
               amount: TokenAmount.fromDecimal(parseFloat(amount), decimals),
               recipient: CborAccountAddress.fromAccountAddress(
                   AccountAddress.fromBase58(recipient)
               ),
               memo: CborMemo.fromString('Sponsored transfer'),
           },
       }]

**Step 6: Create the base transaction and get the sender's nonce**

Then create the base transaction using ``Transaction.tokenUpdate``. This wraps the operations into a token update transaction that targets the specified token. Now query the chain for the sender's next nonce. The nonce increments with each transaction to prevent replay attacks:

.. code-block:: typescript

       const transaction = Transaction.tokenUpdate({
           tokenId: TokenId.fromString(tokenId),
           operations: Cbor.encode(ops),
       })

       const nonce = await grpcClient.getNextAccountNonce(senderAddress)

**Step 7: Build the sponsorable transaction**

Add the sender's metadata (address, nonce, expiry) and designate the sponsor account that will pay the fees. The ``build()`` call produces a transaction ready for sponsorship:

.. code-block:: typescript

       const builder = Transaction.builderFromJSON(Transaction.toJSON(transaction))
       const sponsorable = builder
           .addMetadata({
               sender: senderAddress,
               nonce: nonce.nonce,
               expiry: TransactionExpiry.futureMinutes(5),
           })
           .addSponsor(sponsorAccount)
           .build()

**Step 8: Sign the transaction as the sponsor**

Add the sponsor's cryptographic signature, committing them to pay the transaction fees:

.. code-block:: typescript

       const sponsored = await Transaction.sponsor(sponsorable, sponsorSigner)
       const sponsoredJSON = Transaction.toJSON(sponsored)

**Step 9: Serialize and return the transaction**

Convert BigInt values to numbers or strings. JavaScript's native ``JSON.stringify`` cannot serialize BigInt, so we handle small values as numbers and large values as strings to avoid precision loss:

.. code-block:: typescript

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


