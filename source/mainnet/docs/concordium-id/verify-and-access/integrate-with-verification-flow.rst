.. _integrate-with-verification-flow:

================================
Integrate with verification flow
================================

This section covers the technical components required to integrate Concordium's Verify and Access solution into your platform. The integration involves setting up the verification service, establishing wallet connections, implementing security measures, managing audit records, and building the user interface.

Verifier service
================

The technical foundation of the integration rests on two critical components: the Concordium Verifier Service and the gRPC V2 communication protocol. These elements ensure that your application can talk to the blockchain securely and validate complex identity proofs without needing a team of cryptographers.

The Concordium Verifier Service
--------------------------------

Often referred to as the "brain" of the integration, this is an open source, self-hosted software package provided by Concordium.

**Transparency & Customization:** Since the package is fully open-source, you have total visibility into the logic. You can "comb through" the code to perform independent security audits or even write your own version of the service to meet specific organizational requirements.

**What it is:** A specialized middleware that acts as a translator between your standard web backend and the complex world of Zero-Knowledge Proofs (ZKP).

**Why you need it:** Instead of your backend manually calculating cryptographic hashes or validating ZKPs, it simply sends the user's proof to this service. The Verifier Service validates the proof against the blockchain's state and returns a simple "Verified" or "Failed" response.

**Deployment (Docker):** To ensure a secure, isolated environment, this service is distributed as a Docker container. You host it within your own Virtual Private Cloud (VPC), meaning user proof data never leaves your controlled infrastructure until it has been anonymized and anchored.

gRPC V2 Protocol & Node Access
-------------------------------

To verify a proof, the Verifier Service must "ask" the blockchain if the credentials used are still valid. It does this using gRPC V2.

**What it is:** gRPC (Google Remote Procedure Call) is a high-performance communication framework. Version 2 is the modern standard for Concordium, utilizing Protocol Buffers for faster, more reliable data transfer compared to traditional JSON-based APIs.

**Port Configuration:** By default, your service will connect to a node via Port 20000 (for the live Mainnet) or Port 20001 (for the Testnet development environment).

**Node Selection:** You require access to the Concordium network, see the section below on Access the concordium network.

Reown (WalletConnect) integration
==================================

As of 2026, the industry has standardized on Reown (formerly WalletConnect) as the secure, transport-agnostic bridge between merchant applications and user-owned wallets. It serves as the encrypted communication tunnel through which your application sends a proof request and receives a Zero-Knowledge Proof (ZKP).

Project ID & Session Lifecycle
------------------------------

To utilize the Reown network, your application must be registered within the Reown Cloud Dashboard.

**The Project ID:** This is a unique identifier required to initialize the SignClient or AppKit SDK. It authenticates your application to the Reown Relay Network, enabling it to discover and communicate with the user's Concordium ID App.

**Session Management:** A session is a cryptographically secured pairing between your frontend and the user's phone.

**Persistence:** Sessions are designed to be long-lived (often up to 30 days). Your frontend should store the session topic in local storage so that returning users don't have to scan a QR code every time they visit.

**Lifecycle Events:** Your code must listen for specific events such as session_delete (user disconnected from their phone) or session_expire. Gracefully handling these ensures that your "Verify" button doesn't lead to a dead connection.

Deep Linking UX: Seamless Transitions
-------------------------------------

The "one-click" experience is achieved through advanced deep-linking standards. These allow a user browsing your site on their phone to tap a button and have the Concordium ID App open automatically to the correct request screen.

**Universal Links (iOS) & App Links (Android):** Unlike standard "custom schemes" (e.g., concordium://), these are verified, web-standard links.

**The .well-known Configuration:** To support these, your web domain must host a configuration file (like apple-app-site-association for iOS or assetlinks.json for Android). This file proves to the mobile operating system that your website and the Concordium ID App are authorized to talk to each other.

**Fallback Logic:** A robust implementation includes fallback logic. If the user doesn't have the ID App installed, the link should intelligently redirect them to the App Store or Google Play Store, rather than simply failing to open.

Automated key management (KMS)
===============================

Unlike traditional SaaS, your backend acts as a blockchain participant. It must programmatically "sign" data to prove its authenticity. This requires a robust security layer for your private keys and a constant supply of "gas" (CCD) to pay for network updates.

Security & Identity Management
------------------------------

Your On-Chain Identity is your authorization tool. If your private key is compromised, an attacker could forge verifications or drain your CCD balance.

**Institutional-Grade KMS/HSM:** Services like AWS KMS or Azure Key Vault ensure that your private keys are stored in FIPS 140-2 Level 3 validated hardware. Your application never sees the raw key; it simply sends data to the KMS, which returns a signature.

**MPC-based WaaS (Wallet-as-a-Service):** Providers, such as DFNS, use Multi-Party Computation. The key is never "whole" in one place, effectively eliminating the single point of failure.

**Why it matters:** Standard file-based storage (like .env files or local databases) is highly vulnerable to server breaches. HSM/KMS/MPC ensures that even if your application server is compromised, your master blockchain identity remains secure.

CCD Gas Management
---------------------

Concordium transaction fees are pegged to the Euro, ensuring that your operational costs remain predictable regardless of the CCD token's market volatility.

**Fixed Unit Cost:** Every on-chain anchor (VRA/VAA) costs approximately €0.02.

**Payment Currency:** Fees are paid in CCD (Concordium's native token), but the protocol automatically adjusts the CCD amount to match the Euro peg.

**Operational Risk:** If the account balance reaches zero, the backend cannot sign transactions. This results in an immediate halt of all user verifications.

**System Requirement:** You must deploy an automated monitoring script to alert your DevOps or Finance team before the balance reaches a critical level.

Audit database architecture (VAR/VAA mapping)
==============================================

Unlike traditional systems where a database record is the final source of truth, this architecture uses the blockchain as a "digital notary." Your developers must maintain a precise mapping between your private records and the public proofs to ensure the system remains auditable.

Off-Chain VAR Storage
----------------------

The Verification Audit Record (VAR) is the collection of metadata generated during a Zero-Knowledge Proof (ZKP) session.

**No PII Storage:** The VAR does not contain raw Personal Identifiable Information (like names or passport numbers). Instead, it stores the "evidence" that a verification took place.

**High Security Requirements:** Because the VAR is the primary document used during an audit, it must be stored in an encrypted database with strict access controls.

**Redundancy:** If the VAR data is lost, you lose the ability to prove the validity of a user's verification to regulators, even if the proof exists on the blockchain. Daily backups and multi-region replication are mandatory for full auditable compliance.

Tamper-Proof Linking
--------------------

To bridge the gap between your users and the blockchain, your database must act as a "lookup table" that connects internal identities to global transactions.

**Mapping User IDs:** Every internal User ID must be explicitly linked to a Verification Audit Anchor (VAA) transaction hash.

**The Verification Chain:** During an audit, an auditor will take your local VAR, run it through a hashing algorithm, and compare that hash to the one stored on the Concordium blockchain. If they match, the record is proven authentic.

**Integrity Checks:** Your backend should periodically verify that the transaction hashes stored in your database actually exist on-chain and haven't been modified or corrupted in your local environment.

Frontend SDK & UI integration
==============================

This section covers the tools and user experience (UX) patterns required to connect your users' Concordium wallets to your verification portal.

Recommended SDKs & Libraries
-----------------------------

Concordium provides several libraries to simplify wallet communication and cryptographic proof requests.

**@concordium/web-sdk:** A TypeScript SDK exposing high-level APIs for transaction construction and submission, wallet connectivity, core chain operations (including account creation and event listening), and Zero-Knowledge Proof functionality.

**concordium-rust-sdk:** A flagship Rust SDK providing comprehensive support for transaction construction and submission, core chain operations (including account creation and event listening), and advanced Zero-Knowledge Proof functionality.

**@concordium/wallet-connectors:** The preferred "all-in-one" library. it abstracts the complexity of supporting both the Concordium Browser Wallet (extension) and Mobile Wallets (via WalletConnect).

**@concordium/browser-wallet-api-helpers:** A lightweight library specifically for deep integration with the browser extension API.

**@concordium/react-components:** If your frontend is built with React, this package provides ready-made hooks like useWalletConnector to manage account states and connection logic.

Provided UI Elements & Resources
--------------------------------

You do not have to build the entire verification interface from scratch. Concordium offers several "jump-start" resources:

**dApp Starter Templates:** Official boilerplates are available that include the basic UI scaffolding for wallet connection, account selection, and signature requests.

**Ready-Made UI Logic:** While the @concordium/react-components library is "headless" (handling logic without forcing a specific style), it provides the foundational code for connection modals and status indicators.

**Brand Kit Assets:** Official icons, wallet logos, and "Connect Wallet" button assets are provided in the Concordium Brand Kit to ensure your UI looks consistent with the ecosystem.

Graceful Error Handling
-----------------------

Because the verification process involves external apps (wallets) and network consensus, your UI must handle several blockchain-specific edge cases:

**Expired ID Credentials:** If a user's underlying government ID has expired within their Concordium wallet, the proof request will fail. Your UI should detect this and provide a deep link or instructions for the user to "Renew Identity" inside their wallet app.

**User Rejection:** Users can manually decline the "Sign Request" or "Connection Request" in their wallet. Your frontend must catch these UserRejectedError exceptions to prevent the UI from "freezing" in a loading state.

**Connection Timeouts:** If the user takes too long to approve the request in their mobile wallet, the session may expire. Implement a countdown timer or a "Resend Request" button to recover the session.

**Finalization Lag:** While Concordium is fast (finality in ~1–2 seconds), your UI should show a "Verifying on-chain..." state until the transaction hash is confirmed, rather than redirecting the user prematurely.

