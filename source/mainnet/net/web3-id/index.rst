.. _web3id-index:
.. include:: ../../variables.rst

===============
What is Web3 ID
===============

Web3 ID is an extension of the existing ID 2.0 infrastructure in Concordium to allow issuance of many different types of :ref:`verifiable credentials<glossary-verifiable-credential>` in addition to the existing :ref:`account credentials<glossary-account-credentials>`. Web3 ID allows you to add :ref:`verifiable credentials<glossary-verifiable-credential>` to your |bw|, such as club memberships, education credentials, employment history, rewards programs, customer loyalty programs, and more. :ref:`Proofs<glossary-zero-knowledge-proof>` can be made to verify these credentials, if necessary.

Concordium’s identity layer is built into the protocol. Every account on the chain has one or more credentials issued by specially sanctioned identity providers who are expected to be able to provide full anonymity revocation. ID 2.0 made it possible to use these identities off-chain: wallets allow using identities to prove properties about the holder, such as their nationality or age. These are known as :ref:`account credentials<glossary-account-credentials>`.

Web3 ID is an extension of the core protocol identity with other types of credentials that don’t have stringent requirements on anonymity revocation, but can also prove a number of other attributes of the holder. Examples of this could be club membership credentials, reward programs, etc. There are no requirements imposed on who can be an issuer of these credentials, and in contrast to protocol identities, the Web3 ID credentials can be revoked according to the logic imposed by the issuer. This could be that the credential holder can revoke it, the credential expires, or the issuer or some other third party has rights to revoke it.

Web3 ID credentials, like the existing ones, will contain commitments to a variety of attributes. :ref:`Zero-knowledge proofs<glossary-zero-knowledge-proof>` can be constructed to verify the committed values. The |bw| supports construction of these proofs. The proofs can contain a mix of verifiable credentials and account credentials.

Tools for issuers and verifiers
===============================

Since issuers for these credentials are meant to be smaller entities, it is important that we provide as much as possible tooling to enable them to become issuers as painlessly as possible. Similarly we must provide as convenient as possible tooling to verify proofs. This tooling is likely to involve support in SDKs for using credentials, but ideally also small services that can be used independently to handle the protocol specific computation (such as looking up credentials, verifying proofs), and expose as simple as possible an interface to integrate into a larger system.

For bw

Add credentials
Remove credentials
Recover credentials

For issuer

How to become an issuer
Issue credentials
Revoke credentials

For verifier

Verify credentials

Link to example project that users can clone to create their own solutions.
