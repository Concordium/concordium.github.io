.. _verify-and-access:

==================
Verify and Access
==================

This guide covers implementing zero-knowledge proof identity verification using Concordium's Verify and Access solution. It walks you through the verification process, configuration decisions, and technical integration requirements. Whether you're evaluating the solution or ready to begin implementation, this guide provides the foundation for privacy-preserving, compliant identity verification.

Privacy-preserving verification with ZKPs
=========================================
The demand for reliable user verification is rapidly intensifying across various sectors. However, traditional verification methods create significant liabilities; companies face steep financial penalties for data breaches, while users are increasingly concerned about their privacy and the oversharing of personal information. Compounding this, any system must meet the stringent requirement for auditable and consistently maintained checks.

Zero-knowledge proofs resolve these issues. A zero-knowledge proof (ZKP) is a cryptographic method that allows one party (the "prover") to prove to another party (the "verifier") that a statement is true, without revealing any information beyond the validity of the statement itself. In the context of ID verification, a user can prove they are over 18 without ever disclosing their actual date of birth. This enables robust, verifiable identity checks that eliminate the need to store sensitive data and fully preserve user privacy.

Concordium is a science-backed, public, and permissionless Layer-1 blockchain designed to meet the needs of modern businesses. It uniquely balances user privacy with regulatory accountability through a built-in identity layer at the protocol level. This core feature establishes a trusted, secure, and compliant environment, allowing developers, users, and enterprises to build and transact with confidence on a platform that is both fast and cost-effective.

Concordium ZKP key features
===========================

* **Fast verification times:** Concordium ensures rapid ZKP validation on-chain with a fast finality time of 4 seconds.

* **Low cost:** Transaction fees for ZKP operations are pegged to a stable €0.02, making privacy-focused applications affordable to build and use.

* **Quick and easy to integrate:** User-friendly SDKs and APIs enable integration without needing deep expertise in cryptography.

* **Low friction for users:** Users can verify their identity or specific attributes with a single click in their wallet, eliminating repetitive onboarding and repeated document uploads.

* **Fully auditable checks:** ZKP verifications are recorded on-chain, providing a permanent, tamper-proof record that a check was completed.

* **Lower legal risks:** The solution balances user privacy with regulatory needs by allowing authorized parties to reveal identities under justified legal circumstances.


Guide structure
================

This guide is structured to help you understand and implement Concordium's Verify and Access solution effectively. It begins with an overview of how the verification process works, followed by detailed guidance on key implementation decisions and technical integration steps.

* :ref:`how-it-works` explains the verification process from initial user setup through the live verification flow.

* :ref:`select-verification-method` covers choosing between verification against an ID or account for your use case.

* :ref:`select-identity-provider` guides you in selecting the right IDP for your regulatory requirements.

* :ref:`manage-transaction-costs` explains how to manage a CCD account with sufficient funds for operations.

* :ref:`integrate-with-verification-flow` provides technical implementation guidance for integrating the verification flow into your platform.

* :ref:`access-the-concordium-network` covers connecting to the Concordium network through your own node or a hosted service.


.. toctree::
   :hidden:
   :maxdepth: 1

   how-it-works
   select-verification-method
   select-identity-provider
   manage-transaction-costs
   integrate-with-verification-flow
   access-the-concordium-network

