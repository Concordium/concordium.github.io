.. _how-it-works:

============
How it works
============

This page provides a high-level overview of the zero-knowledge proof (ZKP) verification process for a user requesting access to a restricted resource on a website. It covers the initial one-time setups for both users and providers, and the detailed technical flow of an individual verification request.

The one-time user setup
========================

Before a user can verify themselves on your platform, they must create their reusable digital identity. This is a one-time process they complete independently.

* **Download & setup:** The user downloads a compatible digital ID app (e.g., a crypto wallet) and creates an account.

* **Onboard with Identity Provider (IDP):** Through the app, the user submits their identity documents and a selfie to a trusted third-party :term:`Identity Provider (IDP)<Identity Provider>`.

* **Receive cryptographic ID:** The IDP validates the documents and issues a secure, cryptographic Identity Object to the user's app. This credential is now stored privately on the user's device.

* **Create on-chain account:** If the user is using a :term:`Concordium ID` compatible wallet, a privacy-preserving account is created for the user on the Concordium blockchain using only the ZKP, ensuring no personal information is ever public. If using the Concordium ID app directly, then no on-chainchain account is created at this time. The user is now ready to verify their identity on any platform using the Concordium ID.

The service provider's one-time technical setup
================================================

Before you can process verification requests, your technical team needs to perform a one-time integration:

* **Connect to the blockchain:** Establish a connection between your backend systems and the Concordium blockchain. This enables your system to write and read audit records.

* **Integrate the verification flow:** Integrate the Concordium Verify and Access framework into the relevant part of your user journey (e.g., at registration, at checkout for age-restricted goods, or before accessing content).

* **Update the user interface (UI):** Modify your front-end to display the verification QR code and provide clear, simple instructions for your users on how to proceed.

The live verification flow (user and provider actions)
=======================================================

This section details the step-by-step interaction between a user and your platform during a live verification check using Concordium's ID app. The user in this example is using a desktop site, using a QR code to form the connection between the site and the ID app. If using a mobile device, a deeplink can be created to streamline the process further. See Deeplinks for more information.

+------+---------------------------+-----------------------------------------------------------------------+
| Step | Action                    | Behind the scenes (your technical flow)                               |
+======+===========================+=======================================================================+
| 1    | You display a QR code     | Your website's front-end generates a unique QR code for this specific |
|      |                           | verification session.                                                 |
+------+---------------------------+-----------------------------------------------------------------------+
| 2    | User scans the code       | The user opens their ID app, or any wallet that is compatible with    |
|      |                           | the Concordium ID, and scans the QR code from their screen.           |
+------+---------------------------+-----------------------------------------------------------------------+
| 3    | Secure connection is made | Scanning the code instantly establishes a secure WalletConnect        |
|      |                           | connection between your system and the user's ID app. Your backend    |
|      |                           | generates the context information (e.g., the specific attribute to be |
|      |                           | verified, like age > 18).                                             |
+------+---------------------------+-----------------------------------------------------------------------+
| 4    | Request is anchored       | Your system writes a :term:`Verification Request Anchor (VRA)         |
|      | on-chain                  | <Verification Request Anchor>` to the Concordium blockchain. This     |
|      |                           | creates an immutable, publicly auditable, and timestamped record that |
|      |                           | a verification process has begun. (This step incurs a small           |
|      |                           | transaction fee).                                                     |
+------+---------------------------+-----------------------------------------------------------------------+
| 5    | User approves the request | The ID app displays the specific request (e.g., "ExampleSite.com      |
|      |                           | requests proof you are over 18"). The user confirms their intent to   |
|      |                           | share this proof by approving the request.                            |
+------+---------------------------+-----------------------------------------------------------------------+
| 6    | You receive the ZKP       | The user's app generates the ZKP and sends it securely to your        |
|      |                           | system. Your backend has been waiting for this proof since step 4.    |
+------+---------------------------+-----------------------------------------------------------------------+
| 7    | You log the result        | Upon receiving the valid cryptographic proof, your system logs a      |
|      | internally                | :term:`Verification Audit Record (VAR)<Verification Audit Record>` in |
|      |                           | your internal database. This serves as your private record of the     |
|      |                           | successful check.                                                     |
+------+---------------------------+-----------------------------------------------------------------------+
| 8    | You grant or deny access  | Based on the valid proof, your front-end grants the user immediate    |
|      |                           | access to the product or service.                                     |
+------+---------------------------+-----------------------------------------------------------------------+
| 9    | Audit trail is completed  | Finally, your backend writes a :term:`Verification Audit Anchor (VAA) |
|      | on-chain                  | <Verification Audit Anchor>` to the Concordium blockchain. This       |
|      |                           | completes the end-to-end, tamper-proof audit trail, proving that the  |
|      |                           | check was successfully resolved without revealing any user data.      |
|      |                           | (This step also incurs a transaction fee).                            |
+------+---------------------------+-----------------------------------------------------------------------+


This entire process provides you with robust, auditable, and compliant identity verification while completely removing the liability and cost of handling users' personally identifiable information.
