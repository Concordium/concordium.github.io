.. include:: ../../variables.rst
.. _protocol-level-sponsored-transactions:

======================
Sponsored transactions
======================

Sponsored transactions allow users to interact with the Concordium blockchain without paying :ref:`transaction fees<transaction-fees>` themselves. Instead, a sponsor wallet covers the fee on behalf of the user, enabling seamless user experiences for dApps.

This tutorial shows you how to implement a production-ready frontend/backend architecture for sponsored transactions. The tutorial has two parts:

1. :ref:`Set up a sponsor service <set-up-a-sponsor-service>` - A secure backend service that holds the sponsor wallet's private key, creates transactions, and signs them on behalf of the sponsor.
2. :ref:`Create a sponsored transaction <create-a-sponsored-transaction>` - A frontend implementation that requests sponsorship from the backend API and submits the transaction through the user's wallet.

.. note::

   For production use, keeping the sponsor private key on a secure backend is essential. The examples use ``@concordium/web-sdk`` version 12.0.0. Follow `this link <https://docs.concordium.com/concordium-node-sdk-js/12.0.0-devnet-p10.0/functions/transactions.Transaction.sponsor.html>`_ to see the function documentation.

Prerequisites
=============

Before starting this tutorial, you should have:

- Node.js and npm installed
- A Concordium wallet with CCD funds for the sponsor account
- Access to a Concordium node (gRPC endpoint)
- ``@concordium/web-sdk`` version 12.0.0-devnet-p10.0 or later

How sponsored transactions work
===============================

In a standard transaction, the sender pays the transaction fee. With sponsored transactions:

1. The user connects their wallet and initiates an action (e.g. checkout or manually initiate transfer).
2. The backend creates the transaction with pre-filled details and signs it with the sponsor key.
3. The user reviews and signs to authorize the transfer.
4. The sponsor's account pays the gas fee when the transaction is submitted.

This is useful for onboarding new users who may not have CCD to pay for fees, or for dApps that want to provide a frictionless experience.


.. toctree::
   :hidden:
   :maxdepth: 1

   Set up a sponsor service <./set-up-a-sponsor-service.rst>
   Create a sponsored transaction <./create-a-sponsored-transaction.rst>

