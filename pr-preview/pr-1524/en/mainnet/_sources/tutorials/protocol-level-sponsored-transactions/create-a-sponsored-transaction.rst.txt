.. include:: ../../variables.rst
.. _create-a-sponsored-transaction:

==============================
Create a sponsored transaction
==============================

.. admonition:: At a glance

   This part of the tutorial shows you how to build the React frontend for a sponsored transaction flow, where the user's wallet signs only their portion and the sponsor service submits the transaction to the chain. You will need Node.js, React, the @concordium/web-sdk, and the sponsor backend from the previous step. When you are done, you will have a dApp where users can execute transactions without paying CCD fees themselves.

The frontend connects to the user's wallet, sends the transfer details to the sponsor service, and submits the sponsor-signed transaction back to the wallet for the user to review and sign.

**Step 1: Import dependencies**

Import ``detectConcordiumProvider`` to connect to the Concordium Wallet for Web, ``Transaction`` to parse the sponsor-signed transaction, and ``AccountAddress`` to convert address strings into typed objects:

.. code-block:: typescript

   import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers'
   import { AccountAddress, Transaction } from '@concordium/web-sdk'

**Step 2: Define your configuration**

Set up the backend URL and token details. The backend URL points to your sponsor service and the token details should match the token you want to transfer:

.. code-block:: typescript

   const BACKEND_URL = '<YOUR_BACKEND_URL>'
   const TOKEN_ID = '<YOUR_TOKEN_ID>'
   const TOKEN_DECIMALS = <YOUR_TOKEN_DECIMALS>

**Step 3: Request a sponsored transaction from the backend**

Create a function that takes the connected account address and transfer details, then requests a sponsored transaction from the :ref:`sponsor service <set-up-a-sponsor-service>`. The backend will create the transaction, sign it as a sponsor and return the sponsored transaction JSON:

.. code-block:: typescript

   async function sendSponsoredTransfer(
       account: string,
       recipient: string,
       amount: string
   ) {
       const response = await fetch(`${BACKEND_URL}/sponsor`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
               sender: account,
               recipient,
               amount,
               tokenId: TOKEN_ID,
               decimals: TOKEN_DECIMALS,
           }),
       })

       if (!response.ok) {
           throw new Error('Failed to create sponsored transaction')
       }

       const { sponsoredTransaction } = await response.json()

**Step 4: Send the transaction to the user's wallet**

Parse the JSON back into a signable transaction object, then send it to the wallet. This opens the wallet popup where the user can review the transaction details and sign to authorize and submit to the chain:

.. code-block:: typescript

       const provider = await detectConcordiumProvider()
       const parsedTransaction = Transaction.signableFromJSON(sponsoredTransaction)
       const txHash = await provider.sendSponsoredTransaction(
           AccountAddress.fromBase58(account),
           parsedTransaction
       )

       return txHash
   }

Usage example
=============

Call ``sendSponsoredTransfer`` after the user connects their wallet. The recipient and amount would typically come from a form or your application logic:

.. code-block:: typescript

   async function handleTransfer(recipientAddress: string, transferAmount: string) {
       try {
           const provider = await detectConcordiumProvider()
           const account = await provider.connect()

           const txHash = await sendSponsoredTransfer(
               account,
               recipientAddress,
               transferAmount
           )

           console.log('Transaction submitted:', txHash)
       } catch (error) {
           console.error('Transfer failed:', error)
       }
   }

.. note::

   A full working example using ``@concordium/react-components`` for wallet management and ``WalletConnect`` support is available on `GitHub <https://github.com/Concordium/concordium-dapp-examples/tree/main/DevnetSponsoredTx>`_.

Security considerations
=======================

- Keep the sponsor private key on the backend only. Never expose it to the frontend.
- Implement rate limiting to prevent abuse of the sponsoring service.
- Validate all incoming transaction requests before sponsoring.
- Set reasonable expiry times on transactions (5 minutes is typical).
- Monitor the sponsor wallet balance and set up alerts for low funds.
