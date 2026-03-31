.. _verify-access-introduction:

Introduction
============

This tutorial teaches you how to build an age-gated web application where users can prove they're 18 or older **without revealing their actual birthdate**. You'll learn to integrate Concordium's zero-knowledge proof system with a Next.js application, creating a privacy-preserving verification flow that's both secure and user-friendly.

.. contents:: Table of Contents
   :depth: 2
   :local:

What You'll Build
-----------------

An age-gated application where users prove they're 18+ **without revealing their actual birthdate**. The verification happens through:

- **Zero-knowledge proofs** (user proves age without sharing date of birth (DOB))
- **Concordium ID wallet** (user's phone holds their credentials, ID information private)
- **On-chain anchoring** (verification is recorded on blockchain for audit or transparency purposes)

.. mermaid::

   sequenceDiagram
       participant User
       participant YourApp
       participant VerifierService
       participant ConcordiumWallet
       participant Blockchain

       User->>YourApp: Clicks "Verify Age"
       YourApp->>VerifierService: Create verification request
       VerifierService->>Blockchain: Anchor VRA (Verification Request Anchor)
       VerifierService-->>YourApp: Return VPR (Verifiable Presentation Request)
       YourApp->>ConcordiumWallet: Send VPR via WalletConnect
       ConcordiumWallet->>User: Show "Prove age 18+"
       User->>ConcordiumWallet: Approve
       ConcordiumWallet->>ConcordiumWallet: Generate ZK proof (age ≥ 18)
       ConcordiumWallet-->>YourApp: Return VP (Verifiable Presentation)
       YourApp->>VerifierService: Verify presentation
       VerifierService->>Blockchain: Anchor VAA (Verification Audit Anchor)
       VerifierService-->>YourApp: "Verified ✓"
       YourApp->>User: Grant access

Tutorial Code Disclaimer
-------------------------

.. warning::
   **This tutorial is designed for learning and development purposes.** The code examples prioritize clarity and education over production-readiness.

What this tutorial provides
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Correct cryptographic implementation (zero-knowledge proofs work properly)
- Clean architecture (separation of concerns, reusable components)
- Educational comments (learn how everything works)
- Working integration (fully functional age verification)

**Use this as a foundation to learn the concepts, then harden it for production use.**

Prerequisites
-------------

Before starting this tutorial, ensure you have:

- **Next.js 16+** application (this tutorial uses Next.js App Router with React Server Components)
- **Docker Desktop** installed (`download <https://www.docker.com/products/docker-desktop>`_)
- **Node.js 18+** and npm
- **Concordium account** with keys (`get testnet keys <https://developer.concordium.software/en/mainnet/net/guides/create-account.html>`_)
- **Concordium ID wallet** app (`iOS <https://apps.apple.com/app/concordium-id/id1549313170>`_ / `Android <https://play.google.com/store/apps/details?id=software.concordium.mobilewallet.seedmobile>`_)

Resources
---------

Additional resources for this tutorial:

- `Concordium Docs <https://developer.concordium.software/>`_
- `Verification Web UI SDK <https://www.npmjs.com/package/@concordium/verification-web-ui>`_
- `WalletConnect Docs <https://docs.walletconnect.com/>`_
- `Verifier Service GitHub <https://github.com/Concordium/concordium-dapp-examples>`_

**Questions?** Open an issue on `GitHub <https://github.com/Concordium/concordium-dapp-examples/issues>`_
