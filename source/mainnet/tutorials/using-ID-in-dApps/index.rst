.. _zk-proof-index:

==================================================
Building a Zero-Knowledge Proof dApp on Concordium
==================================================

This tutorial walks through implementing Concordium blockchain features in a React-based decentralized application (dApp). You'll learn how to integrate wallet connections and zero-knowledge (ZK) proofs using Concordium's identity framework.

Concordium's blockchain is identity-based, with a unique approach to balancing privacy and compliance. Every user on Concordium has a real-world identity verified by an identity provider, but this doesn't mean sacrificing privacy. Through zero-knowledge proofs, users can selectively disclose specific attributes about themselves without revealing their entire identity.

Unlike many other blockchains where implementing zero-knowledge proofs requires deep cryptographic expertise, Concordium simplifies this process significantly:

1. **Built-in identity layer**: Identity credentials are already associated with accounts, read :ref:`this article <reference-id-accounts>` for more details
2. **Wallet-managed proofs**: The cryptographic heavy lifting happens in the wallet
3. **Flexible proof types**: Support for revealing attributes, range proofs, and set membership proofs, read :ref:`this article <create-proofs>` for more information
4. **Simple developer experience**: No need for specialized ZK languages or custom implementations

This architecture allows developers to focus on defining what needs to be proved rather than implementing complex cryptography.

What you will learn
-------------------

In this tutorial, you will:

* Create a flexible wallet connection interface supporting both browser and mobile wallets
* Define various types of zero-knowledge proof statements
* Generate secure, time-limited challenges for ZK proofs
* Request identity proofs from Concordium wallets
* Process and display the results of these proofs

By the end, you'll understand how to build privacy-preserving applications that can verify user eligibility while minimizing data exposure - a perfect balance of compliance and privacy.

.. toctree::
   :hidden:
   :maxdepth: 1
   :caption: Using ID in dApps

   wallet-connectors-tutorial
   zk-proofs-tutorial
