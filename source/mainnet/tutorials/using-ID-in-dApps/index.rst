.. _zk-proof-index:

==================================================
Building a Zero-Knowledge Proof dApp on Concordium
==================================================

In this tutorial, you'll learn how to integrate Concordium's browser and mobile wallets into a React-based decentralized application (dApp), and generate zero-knowledge (ZK) proofs.

Concordium is an identity-based blockchain with a unique approach to balancing privacy and compliance. Through wallets, users can generate zero-knowledge proofs and selectively disclose identity attributes on their accounts like nationality, age, etc., instead of sharing the entire ID information.

Concordium wallets serve a unique dual purpose compared to wallets on other blockchains. They not only hold :ref:`accounts <managing_accounts>` (blockchain addresses) but also manage :ref:`identities <reference-identity>`.
Users first create an identity in their wallet by completing a verification process with an :term:`identity provider` (using a passport or ID card). Then, they can create on-chain accounts through a :ref:`transaction <transactions>` that associates each account with their verified identity.

Unlike other blockchains where addresses exist without any identity context, Concordium accounts are explicitly linked to real-world identities.
This architecture enables wallets to generate zero-knowledge proofs about the identity information associated with a user's account, allowing for selective disclosure of attributes in a self-sovereign way.

Unlike many other blockchains where implementing zero-knowledge proofs requires deep cryptographic expertise, Concordium simplifies this process significantly:

1. **Built-in identity layer**: Identity credentials are already associated with accounts, read :ref:`this article <reference-identity>` for more details
2. **Wallet-managed proofs**: The cryptographic heavy lifting happens in the wallet
3. **Flexible proof types**: Support for revealing attributes, range proofs, and set membership proofs, read :ref:`this article <create-proofs>` for more information
4. **Simple developer experience**: No need for specialized ZK languages or custom implementations

This architecture allows developers to focus on defining what needs to be proven rather than implementing complex cryptography.

What you will learn
-------------------

In this tutorial, you will:

* Create a flexible wallet connection interface supporting both browser and mobile wallets
* Define various types of zero-knowledge proof statements
* Generate secure, time-limited challenges for ZK proofs
* Request identity proofs from Concordium wallets
* Process and display the results of these proofs

By the end, you'll understand how to build privacy-preserving applications that can verify user eligibility while minimizing data exposure - a perfect balance of compliance and privacy.

.. Note::

   This tutorial focuses primarily on wallet integration and ZK proof generation from the frontend perspective.
   While we discuss verification concepts and security considerations throughout, the implementation of a secure backend verification system is not covered in detail.

   In a production environment, proper verification of ZK proofs on a secure backend is critical to ensure:

   1. The cryptographic proofs are mathematically valid
   2. The challenge used in the proof is recent (using block hash verification)
   3. The challenge has not been used in a previous proof (preventing replay attacks)
   4. All other application-specific requirements are met

   For backend implementation details, we reference the `compliant-reward-distribution dApp <https://github.com/Concordium/concordium-dapp-examples/tree/main/compliant-reward-distribution>`_
   and the `web3id-verifier <https://github.com/Concordium/concordium-web3id/tree/main/services/web3id-verifier>`_ which demonstrate a more complete verification flow.
   We recommend studying that example alongside this tutorial for more comprehensive understanding.

.. toctree::
   :hidden:
   :maxdepth: 1
   :caption: Using ID in dApps

   wallet-connectors-tutorial
   zk-proofs-tutorial
