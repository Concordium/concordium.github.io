.. _manage-transaction-costs:

=========================
Manage transaction costs
=========================


.. admonition:: At a glance

   This guide explains how to set up and manage the CCD account used to pay for on-chain operations in the Verify and Access solution. You will need a Concordium account and CCD — transaction costs are fixed in EUR and are not subject to market volatility. After following this guide, you will have a funded CCD wallet correctly configured to run ZKP verification operations without interruption.

All :term:`transactions <transaction>` on Concordium require a small amount of :term:`CCD` as :term:`gas`. CCD is stored securely in an on-chain wallet. This wallet is essential for holding the CCD required to pay for on-chain actions. For :term:`zero-knowledge proofs (ZKPs)<Zero-knowledge proof>`, there is no charge for the user, but on-chain transactions are required for anchoring the ZKPs.

**What you need:**

* An on-chain account to act as your digital identity.
* CCD to pay for all network actions.
* Active monitoring of your wallet's CCD balance to avoid failed operations.

Establish an on-chain account
==============================

First, you must establish an on-chain account. This account functions as your digital identity on the blockchain and serves as the secure repository from which all your operations will be initiated.

Use CCD for ZKP operations
==========================

Simply having an account isn't enough. To execute any on-chain action, such as generating or anchoring ZKPs for compliance or identity purposes, you will need CCD. This is the native currency used to pay for all network computation and transaction fees.

A key advantage for your business is that these operational costs are fixed to the Euro. This means the cost of a ZKP-related action is predictable and not affected by network congestion or market volatility. Your wallet simply converts this fixed Euro price into the equivalent amount of CCD at the time of the operation.

Manage your wallet actively
============================

Because CCD is required for all actions, you must treat this wallet as a form of operational capital that needs active management. You must consistently monitor your wallet's CCD balance and ensure it is topped up regularly.

**Important:** If your CCD balance runs out, all your subsequent operations will fail. This could halt your compliance checks, disrupt your services, and prevent you from paying for network usage.

