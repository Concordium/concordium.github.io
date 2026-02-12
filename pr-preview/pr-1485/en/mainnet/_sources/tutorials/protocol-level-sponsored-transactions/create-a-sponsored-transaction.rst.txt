.. include:: ../../variables.rst
.. _create-a-sponsored-transaction:

==============================
Create a sponsored transaction
==============================

The frontend connects to the wallet, requests a sponsored transaction from the backend and sends it back to the user's wallet for signing.

**Step 1: Import the wallet detection helper**

First, import ``detectConcordiumProvider`` which, as the name suggests, detects and connects to the Concordium wallet, in our case, the Concordium Wallet for Web:

.. code-block:: typescript

   import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers'

**Step 2: Define your configuration**

Set up the backend URL and token details. The backend URL points to your sponsor service and the token details should match the token you want to transfer:

.. code-block:: typescript

   const BACKEND_URL = '<YOUR_BACKEND_URL>'
   const TOKEN_ID = '<YOUR_TOKEN_ID>'
   const TOKEN_DECIMALS = <YOUR_TOKEN_DECIMALS>

**Step 3: Create the function to send sponsored transfers**

Create a function that takes the connected account address and the transfer details:

.. code-block:: typescript

   async function sendSponsoredTransfer(
       account: string,
       recipient: string,
       amount: string
   ) {

**Step 4: Request a sponsored transaction from the backend**

Inside the function, request a sponsored transaction from your backend, the sponsor service we built before. It will create the transaction, sign it as a sponsor and return the sponsored transaction JSON:

.. code-block:: typescript

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

**Step 5: Send the transaction to the user's wallet**

Get the wallet provider and send the sponsored transaction. This opens the wallet popup where the user can review the transaction details and sign to authorize and submit to the chain. The transaction hash will be returned, as it's useful data:

.. code-block:: typescript

       const provider = await detectConcordiumProvider()
       const parsedTransaction = Transaction.signableFromJSON(sponsoredTransaction)
       const txHash = await provider.sendSponsoredTransaction(account, parsedTransaction)

       return txHash
   }

Security considerations
=======================

- Keep the sponsor private key on the backend only. Never expose it to the frontend.
- Implement rate limiting to prevent abuse of the sponsoring service.
- Validate all incoming transaction requests before sponsoring.
- Set reasonable expiry times on transactions (5 minutes is typical).
- Monitor the sponsor wallet balance and set up alerts for low funds.

