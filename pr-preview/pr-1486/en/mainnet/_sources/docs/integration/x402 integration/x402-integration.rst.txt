.. include:: ../../../variables.rst
.. _x402-integration:

================
X402 Integration
================

X402 is an open payment protocol that revives the long-dormant HTTP 402 "Payment Required" status code. It is designed to embed payments directly into the standard internet request-response cycle, eliminating the need for traditional sign-ups, subscriptions, or complex API keys.

- **HTTP Native:** When a client (a human user, a developer's application, or an AI agent) requests a resource (like an API call or a piece of data), the server can respond with 402 Payment Required, specifying the exact price and payment details.
- **Frictionless micropayments:** The client then automatically sends a payment proof (typically a signed message) and instantly gains access to the resource. This allows for pay-per-use billing in denominations as low as fractions of a cent, which is essential for AI agent commerce where machines need to pay autonomously for data and compute.
- **Chain-agnostic:** X402 is a standard that works across multiple blockchain networks for settlement.

X402 on Concordium
===================

The integration of the X402 payment protocol with the Concordium blockchain establishes a new standard for digital commerce, seamlessly blending internet-native micropayments with regulatory compliance. X402 enables frictionless, pay-per-use transactions directly within the HTTP framework—ideal for the emerging AI and machine-to-machine economy. Concordium provides the necessary accountability and trust through its protocol-level identity layer, ensuring that every transaction is settled on a ledger compliant with global regulations (KYC/AML) while protecting user privacy via Zero-Knowledge Proofs. This synergy delivers a scalable, stable, and compliant payment rail ready for high-volume enterprise and automated applications.

- **Accountability with privacy:** Concordium's protocol-level ID ensures every account is tied to a verified real-world identity, which is stored off-chain by a trusted Identity Provider. This satisfies Know Your Customer (KYC) and Anti-Money Laundering (AML) requirements.
- **Zero-knowledge proofs (ZKPs):** For X402 transactions, users can prove a required attribute (e.g., "I am over 18" or "I am not on a sanctions list") without revealing their actual identity data. This preserves the user's privacy while maintaining the ability to lawfully disclose identity only when required by authorities (e.g., with a court order).
- **Global regulatory readiness:** It allows businesses to use X402's seamless payment rail while adhering to diverse global regulations like MiCA or local age-gating laws for content (e.g., gambling, adult content), enabling geofencing and access control.


How X402 works with Concordium's Verify & Pay
=============================================

The process involves two main phases: Requesting Payment/Verification, and Executing Payment/Granting Access.

**Phase 1: Requesting Payment and Verification**

* The Client initiates the process by sending a request (Get /content) for restricted content to the x402 Middleware.
* The x402 Middleware detects the content is restricted and responds with a 402 Status + payment details (amount, recipient, etc.).
* The Client performs two actions in preparation for payment:

  * Identity Verification: The Client verifies its identity (likely generating a ZKP using Concordium's ID layer).
  * Send a CCD Transaction: The Client sends the actual payment transaction to the Concordium Blockchain and receives a transaction hash ($\text{txHash}$).

**Phase 2: Executing Payment and Access**

* The Client constructs a Payment Payload that includes the received ($\text{txHash}$).
* The Client sends a second request (Get /content) back to the x402 Middleware, but this time includes the payment proof in the header X-PAYMENT: b64 payment payload.
* The x402 Middleware forwards the request to the Facilitator (a service responsible for payment validation) via a /verify endpoint.
* The Facilitator performs validation:

  * It verifies that the user's ZKP matches the requirements
  * It checks if the payment details in the payload match the requirements set by the service.
  * It sends a request to the Blockchain to getTransactionStatus(txHash) using the hash provided in the payload.
  * The Blockchain responds with the tx status (e.g., pending, confirmed, failed).
  * The Facilitator then confirms the transaction status and updates its database (DB).

* Once validated, the Facilitator sends the tx details (confirmation of payment) back to the x402 Middleware.
* The x402 Middleware then grants the request by returning the Requested content to the Client.


Next steps: Dive deeper into Concordium and X402
=================================================

Ready to explore the future of compliant, machine-to-machine commerce? We encourage you to engage with our community and continue your journey through the resources below:

* 📚 Technical Documentation:

  * Concordium ID and Zero Knowledge Proofs: Discover how our built-in identity layer works, including the :ref:`creation and verification of Zero-Knowledge Proofs<zk-proof-index>` (ZKPs) for compliance, on the :ref:`Concordium Identity Overview page<reference-identity>`.
  * Protocol Level Tokens (PLTs): Understand the role and functionality of the native :ref:`Protocol Level Tokens<plts>` on Concordium and how they are used for gas, staking, and settling the X402 payments on our PLTs Economics and Usage Guide.
  * Read the Official X402 Documentation: As an open standard, the `X402 protocol specification <https://www.x402.org/>`_ is maintained externally. We highly recommend reviewing the original source material for core concepts like the HTTP 402 standard, the roles of the Client/Server, and the Payment Requirements payload.

* 💬 Community & Support:

  * Discord Server: Connect directly with core developers, ask questions about integration strategy, and get real-time support from the community. Join our `Official Concordium Discord <https://discord.com/invite/buP87EBu>`_.


