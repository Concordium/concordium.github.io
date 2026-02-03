.. _signature-proofs:

=============================
Verifying account ownership
=============================

This tutorial shows how to verify that a user controls a Concordium account by having them sign a challenge message. This is useful for authentication, compliance screening or any situation where you need proof that someone owns a particular account.

.. note::

   This is different from identity proofs. Identity proofs verify attributes like age or nationality. Signature proofs only verify that someone holds the private key.

The flow is straightforward:

* your server generates a challenge
* the user signs it
* your server verifies the signature against on-chain credentials.

No transactions, no gas fees.

Prerequisites
=============

- `Node.js <https://nodejs.org/>`_ v18+
- `Concordium Browser Wallet <https://chrome.google.com/webstore/detail/concordium-wallet/mnnkpffndmickbiakofclnpoiajlegmg>`_

SDK functions
=============

`Web SDK <https://www.npmjs.com/package/@concordium/web-sdk>`_ (``@concordium/web-sdk``):

- ``signMessage`` - Signs a message with an account's private key
- ``verifyMessageSignature`` - Verifies a signature against account credentials

`Rust SDK <https://crates.io/crates/concordium-rust-sdk>`_ equivalents: ``sign_as_account`` and ``verify_account_signature``

Build the server
================

.. code-block:: console

   $ mkdir signature-proof-server && cd signature-proof-server
   $ npm init -y
   $ npm install express cors @concordium/web-sdk @grpc/grpc-js

Create ``index.js``:

Set up imports and connect to the node
--------------------------------------

The ``@concordium/web-sdk/nodejs`` package provides the gRPC client for server-side node communication.

.. code-block:: jsx

   import express from 'express';
   import cors from 'cors';
   import crypto from 'crypto';
   import { ConcordiumGRPCNodeClient } from '@concordium/web-sdk/nodejs';
   import { credentials } from '@grpc/grpc-js';
   import { AccountAddress, verifyMessageSignature } from '@concordium/web-sdk';

   const app = express();
   app.use(cors());
   app.use(express.json());

   const client = new ConcordiumGRPCNodeClient(
       'grpc.testnet.concordium.com',
       20000,
       credentials.createSsl(),
       { timeout: 15000 }
   );

   // Use Redis in production - this won't survive restarts
   const challenges = new Map();

Create the challenge endpoint
-----------------------------

This endpoint generates a unique challenge for the user to sign. The challenge includes the account address to bind it to a specific account, a random nonce to prevent reuse, and a timestamp to enable expiry checks.

.. code-block:: jsx

   app.post('/api/challenge', (req, res) => {
       const { account } = req.body;

       try {
           AccountAddress.fromBase58(account);
       } catch {
           return res.status(400).json({ error: 'Invalid account address' });
       }

       const id = crypto.randomBytes(8).toString('hex');
       const challenge = `Prove ownership of ${account}\nNonce: ${crypto.randomBytes(16).toString('hex')}\nTime: ${Date.now()}`;

       challenges.set(id, { account, challenge, expires: Date.now() + 300000 });

       res.json({ id, challenge });
   });

Create the verification endpoint
--------------------------------

The endpoint retrieves the pending challenge, fetches account credentials from the chain using ``getAccountInfo``, and verifies the signature with ``verifyMessageSignature``.

.. code-block:: jsx

   app.post('/api/verify', async (req, res) => {
       const { id, account, signature } = req.body;

       const pending = challenges.get(id);
       if (!pending || pending.account !== account || Date.now() > pending.expires) {
           return res.status(400).json({ error: 'Invalid or expired challenge' });
       }

       try {
           const accountInfo = await client.getAccountInfo(AccountAddress.fromBase58(account));
           const valid = verifyMessageSignature(pending.challenge, signature, accountInfo);

           challenges.delete(id);

           if (valid) {
               res.json({ verified: true, account });
           } else {
               res.status(401).json({ verified: false, error: 'Invalid signature' });
           }
       } catch (err) {
           res.status(500).json({ error: err.message });
       }
   });

A common point of confusion: ``verifyMessageSignature`` accepts the full ``accountInfo`` object directly. Earlier SDK versions required extracting ``accountCredentials`` first, but that is no longer necessary.

If verification fails unexpectedly, check that the challenge string matches exactly what was signed - whitespace differences will cause failures.

Start the server and configure the project
------------------------------------------

.. code-block:: jsx

   app.listen(3001, () => {
       console.log('Server running on port 3001');
   });

Add to ``package.json``:

.. code-block:: json

   {
     "type": "module",
     "scripts": {
       "start": "node index.js"
     }
   }
With the server complete, you're now ready to build the client application.
Build the client
================

.. code-block:: console

   $ mkdir signature-proof-client && cd signature-proof-client
   $ npm init -y
   $ npm install react react-dom @concordium/browser-wallet-api-helpers
   $ npm install -D vite @vitejs/plugin-react

Create the entry points
-----------------------

``index.html`` loads Bootstrap for styling and mounts the React application:

.. code-block:: html

   <!DOCTYPE html>
   <html lang="en" data-bs-theme="dark">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Signature Proof</title>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
   </head>
   <body>
       <div id="root"></div>
       <script type="module" src="/src/main.jsx"></script>
   </body>
   </html>

``src/main.jsx`` initializes the React application:

.. code-block:: jsx

   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App';

   ReactDOM.createRoot(document.getElementById('root')).render(<App />);

Create the App component
------------------------

``src/App.jsx`` - use ``detectConcordiumProvider`` to check if the wallet is installed, and ``provider.connect`` to request access to the user's account.

.. code-block:: jsx

   import { useState, useEffect } from 'react';
   import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';

   export default function App() {
       const [provider, setProvider] = useState(null);
       const [account, setAccount] = useState(null);
       const [status, setStatus] = useState({ type: 'idle', message: '' });
       const [result, setResult] = useState(null);

       useEffect(() => {
           detectConcordiumProvider()
               .then(setProvider)
               .catch(() => setStatus({ type: 'error', message: 'Wallet not found' }));
       }, []);

       const connect = async () => {
           const acc = await provider.connect();
           setAccount(acc);
       };

``detectConcordiumProvider`` rejects if the extension is not installed. In production, you'd add comprehensive error handling here.

Implement the verification flow
-------------------------------

The ``verify`` function handles the three-step process: request a challenge from the server, sign it with ``provider.signMessage``, and send the signature back for verification.

.. code-block:: jsx

       const verify = async () => {
           setStatus({ type: 'loading', message: 'Requesting challenge...' });

           const challengeRes = await fetch('/api/challenge', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ account }),
           });
           const { id, challenge } = await challengeRes.json();

           setStatus({ type: 'loading', message: 'Sign the message in your wallet...' });
           const signature = await provider.signMessage(account, challenge);

           setStatus({ type: 'loading', message: 'Verifying...' });
           const verifyRes = await fetch('/api/verify', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ id, account, signature }),
           });
           const data = await verifyRes.json();

           if (data.verified) {
               setResult({ success: true, account: data.account });
           }
       };

``provider.signMessage`` opens a wallet popup. If the user closes it without signing, the promise rejects - add error handling for real applications.

Render the UI
-------------

The UI shows different content based on the current state: a connect button, a verify button, or the verification result.

.. code-block:: jsx

       return (
           <div className="container py-5" style={{ maxWidth: 600 }}>
               <h1>Signature Proof</h1>
               {!account ? (
                   <button className="btn btn-primary" onClick={connect}>
                       Connect Wallet
                   </button>
               ) : result?.success ? (
                   <div className="alert alert-success">
                       Verified: {result.account}
                   </div>
               ) : (
                   <button className="btn btn-primary" onClick={verify}>
                       Sign & Verify
                   </button>
               )}
           </div>
       );
   }

Configure Vite and the project
------------------------------

``vite.config.js`` proxies API requests to the server during development:

.. code-block:: jsx

   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
       plugins: [react()],
       server: {
           port: 3000,
           proxy: {
               '/api': 'http://localhost:3001',
           },
       },
   });

Add to ``package.json``:

.. code-block:: json

   {
     "type": "module",
     "scripts": {
       "dev": "vite",
       "build": "vite build"
     }
   }

Run the application
===================

Terminal 1:

.. code-block:: console

   $ cd signature-proof-server && npm start

Terminal 2:

.. code-block:: console

   $ cd signature-proof-client && npm run dev

Open http://localhost:3000 with the Browser Wallet installed. Select **Connect Wallet**, then **Sign & Verify**, and approve the signature in your wallet.

Security notes
==============

Production considerations:

- The in-memory challenge store does not survive server restarts. Use Redis or a database.
- Always fetch fresh ``accountInfo`` at verification time. Account keys can be rotated, so stale credential data may cause valid signatures to fail.
- Five minutes is probably too generous for challenge expiry. Consider 60-90 seconds.
- Never verify signatures client-side only.

Summary
=======

This tutorial demonstrated how to verify account ownership using signature proofs. You built a server that generates challenges and verifies signatures, and a client application that requests challenges and signs them using the Browser Wallet.
The key functions are:

- ``signMessage`` (client, via wallet)
- ``getAccountInfo`` (server)
- ``verifyMessageSignature`` (server) - pass ``accountInfo`` directly

For Rust, see ``sign_as_account`` and ``verify_account_signature`` in the `Rust SDK docs <https://docs.rs/concordium-rust-sdk/latest/concordium_rust_sdk/>`_.
