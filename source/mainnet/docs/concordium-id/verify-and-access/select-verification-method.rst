.. _select-verification-method:

==========================
Select verification method
==========================

Choosing the correct identity verification method is a critical decision for your business. This choice directly impacts your users' experience and determines whether your compliance needs are met. Selecting a check that is mismatched for the task can create unnecessary friction for your users (e.g., asking them to verify twice) or, conversely, fail to meet essential regulatory requirements.

Concordium provides two distinct verification checks. While your technical method for performing the check remains the same, the proof the user provides will differ. Understanding these two options ensures you create a process that is both compliant and seamless.


.. _verification-against-id:

Option 1: Verification against an ID
=====================================

This check verifies a user's identity directly against an official :term:`Identity Object` (like a passport or driver's license) that has been validated by an approved :term:`Identity Provider (IDP)`.

**When to use it:** This method is best for simple identity-gating, such as verifying a user's attributes (e.g., "is over 18" or "is from X country") when the user has no payment or on-chain transaction to make.

**How it works:** The user can provide this proof from either a full wallet app (like the Concordium wallet) or the standalone Concordium ID App.

**Pros and cons**

* **Pro:** Offers high flexibility for the user, as they can verify from a lite ID-only app without needing to set up a full account.

* **Con:** If the user verifies with the standalone ID App, their account information is not stored. If that user later needs to make a payment (e.g., with a stablecoin), they will be forced to verify again with a wallet, creating a two-step process and significant friction.


.. _verification-against-account:

Option 2: Verification against an account
==========================================

This check verifies that the user has access to a given account and, by extension, can also verify their underlying identity. This is because, on Concordium, a user must first pass an identity check to create an account.

**When to use it:** This is the standard and most efficient method used when a payment or any on-chain transaction is required from the user.

**How it works:** This check must be done through a wallet app, as the ID App does not have access to accounts.

**Pros & Cons**

* **Pro:** This is an "all-in-one" verification. By proving ownership of the account, the user implicitly proves their verified identity attributes and their ability to make a payment, all in a single step.

* **Pro:** It creates a seamless, one-step process for any service that involves an on-chain transaction, removing the friction found in :ref:`Option 1 <verification-against-id>`.

* **Con:** This method cannot be performed by a user who only has the standalone ID App. They must have a full wallet with an account created.