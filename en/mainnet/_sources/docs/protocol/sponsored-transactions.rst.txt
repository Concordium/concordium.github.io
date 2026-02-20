.. include:: ../../variables.rst
.. _sponsored-transactions:

======================
Sponsored transactions
======================

Sponsored transactions are :term:`on-chain` transactions where a third party can pay for the transaction fee. This means if party A is transferring :term:`CCD` to party B, party C pays for the :ref:`transaction fee <transaction-fees>` on behalf of party A.

This feature operates at the protocol level, meaning it applies to all transaction types including :term:`Protocol-level token (PLT)` operations. This includes PLT and CCD transfers and :term:`Smart contract` operations such as deploying modules, initiating instances and updating contracts through the :term:`concordium-client<Concordium Client>`.

**Example use case:**
Bob is purchasing a bottle of wine from a wine merchant for 10 PLTs. In order to help facilitate, the wine merchant pays for all CCD transaction fees when a customer purchases wine using PLTs. When the transaction is submitted on chain and finalized, it will result in 10 PLTs being deducted from Bob’s account but the CCD transaction fee being deducted from the wine merchant’s account. Bob completes his purchase without needing to hold any CCD.

Why use sponsored transactions?
===============================

Sponsored transactions improve a user’s journey when submitting transactions on-chain. In the case of Bob purchasing wine, it means he doesn’t have to make sure he has both PLTs and CCD in order to complete his purchase - which would have otherwise introduced friction into the process.

It also unlocks potential for onboarding more Web2 users, businesses can get the benefits of Concordium’s blockchain without the user needing to interact with the chain or wallets - which can be intimidating to everyday users.

How it works
============

Sponsored transactions require coordination between two parties: the sender (the account initiating the transaction) and the sponsor (the account paying the fee).

Signing flow
------------
1. The user connects their wallet and initiates an action (e.g. checkout or manually initiate transfer).
2. The backend creates the transaction with pre-filled details and signs it with the sponsor key.
3. The user reviews and signs to authorize the transfer.
4. The sponsor's account pays the :term:`gas` when the transaction is submitted.

Both parties must sign the transaction before it can be submitted.

Fee handling
-------------
When the transaction executes:

* The chain validates signatures from both the sender and sponsor
* The transaction fee is deducted from the sponsor’s account
* The sender’s balance remains unaffected by fees
* The transaction (CCD, PLT transfer) executes normally

Rejected transactions
----------------------
The chain rejects the transaction if:

* Any required signature is missing or invalid (sender or sponsor)
* The sponsor account lacks sufficient CCD to cover the fee
* The transaction expires before inclusion in a :term:`block`


Start creating sponsored transactions
=====================================

Prerequisites
-------------
Anyone can create sponsored transactions but you need to meet the following prerequisites before you can begin to construct and propose sponsored transactions:

* Set up a :ref:`Concordium Wallet <setup-browser-wallet>`
* Set up :ref:`Concordium ID <create-initial-account>`
* Create :ref:`an account <create-account>` on-chain
* Obtain sufficient CCD to cover transaction fees (as a sponsor)

Run a sponsor service
----------------------

Once you have been through the :term:`KYB` process and have created an account, you will need to export your keys. An example sponsor service where you can import your keys and use the service for facilitating transaction signing is available below.

To export your keys, follow :ref:`this guide <export-key>`.

To run a sponsor service, follow :ref:`this tutorial <protocol-level-sponsored-transactions>`.

See an example implementation of a complete sponsored transactions dApp `here <https://github.com/Concordium/concordium-dapp-examples/tree/main/DevnetSponsoredTx>`__.


