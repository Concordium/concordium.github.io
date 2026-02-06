.. _select-identity-provider:

==========================
Select Identity Provider
==========================

To confirm that a digital credential corresponds to a real-world identity, it must be verified by an :term:`Identity Provider (IDP)<Identity Provider>`. These providers act as the bridge between off-chain legal documents and on-chain verification. Concordium currently supports three primary IDPs: Digital Trust Solutions, Notabene, and Global FinReg. Choosing the correct IDP is essential to ensure your business remains compliant while providing a smooth onboarding experience for your users. While most IDPs offer the same central service, some do specialise in certain areas.

Key considerations for selection
=================================

While all IDPs on the network perform basic identity assertions, they are not identical. Your choice should be guided by your specific regulatory and geographic needs.

**Regulatory coverage:** IDPs vary in terms of the jurisdictions and regulatory frameworks they support. An IDP that satisfies AML (Anti-Money Laundering) requirements in one region may not meet the specific "Travel Rule" or :term:`KYC (Know Your Customer)<KYC>` standards required in another.

**Business requirements:** You must ensure the IDP you select aligns with the legal obligations of your industry (e.g., MiCA in Europe or FinCEN regulations in the US).

Integration options
===================

When integrating Concordium's Verify and Access solution, you have two primary ways to handle IDP selection:

**Option 1: Universal acceptance**

In this configuration, you allow any of the supported IDPs to verify the user.

**When to use it:** This is best for global applications where the primary goal is simple identity gating and you want to offer the user maximum flexibility.

**Pro:** Lower friction for the user, as they can use any IDP they have already registered with.

**Option 2: Specified acceptance**

You can programmatically specify a list of one or more accepted IDPs when requesting proof from a user.

**When to use it:** Use this when your business is bound by specific regulations that only certain IDPs satisfy.

**Pro:** Guarantees that every user interacting with your service meets your exact compliance threshold.

**Con:** If a user has verified their identity through an IDP you don't support, they will be prompted to re-verify with one of your approved providers, creating additional friction.

Current Identity Providers
===========================

**Digital Trust Solutions:** Offers general-purpose, high-assurance identity verification for broad use cases.

**Notabene:** Specialises in crypto-specific regulatory requirements, with a particular focus on the Travel Rule.

**Global FinReg:** Focused on financial regulatory compliance and meeting institutional standards.

**Note:** If none of the current IDPs meet your specific regulatory requirements, please contact Concordium directly to discuss the possibility of onboarding additional providers to the ecosystem.

