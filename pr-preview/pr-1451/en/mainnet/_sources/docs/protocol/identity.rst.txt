.. include:: ../../variables.rst

.. _reference-identity:

================================
Identity framework on Concordium
================================

Concordium's identity solution is designed to provide secure blockchain infrastructure that maintains accountability while preserving user privacy. The approach balances these requirements, enabling blockchain adoption across jurisdictions and ensuring regulatory compliance.

Concordium features two independent but interrelated identity layers that work together to provide a complete identity solution, :ref:`Concordium ID <concordium-id>` and :ref:`Web3 ID <web3-id>`.


.. _concordium-id:

Concordium ID
=============

The Concordium ID (also known as Base ID or Core ID) is the protocol-level identity system on Concordium. All users must obtain a Concordium ID through identity verification with an approved :term:`Identity Provider` before they can create and use accounts on the blockchain.

After successful identity verification, the account holder receives a Concordium ID, which enables them to:

- :doc:`Create accounts <manage-accounts>` on the Concordium blockchain
- :doc:`Conduct transactions <transactions>` within the networkusing :term:`zero-knowledge proofs<zero-knowledge proof>` without revealing the underlying data
- Prove certain identity attributes (such as age or citizenship)

The Concordium ID is foundational to the accountability and privacy features of the Concordium blockchain.

.. Note::

   It is possible to create a company identity using corporate documents rather than individual identification.
   Company identities are only relevant for specific business use cases and have different creation requirements than individual identities.
   For more information, see `Company identity creation <https://developer.concordium.software/en/mainnet/net/guides/company-identities.html#company-identities>`_.

.. _web3-id:

Web3 ID
=======

The Web3 ID suite (also referred to as Portable ID) is a system for issuing and managing :term:`verifiable credentials<verifiable credential>`, based on the
`W3C Verifiable Credentials Data Model <https://www.w3.org/TR/vc-data-model-2.0/>`_.

This next-generation portable ID tool can be used for:

- Issuance, management, and verification of digital certifications
- Portable :term:`KYC`
- Professional certifications
- Various other use cases requiring verified digital credentials

While interaction with the Concordium blockchain always requires a Concordium ID, Web3 ID verifiable credentials can be used both within the Concordium ecosystem and in off-chain environments.

:doc:`Learn more about using Concordium's ID layer <../network/web3-id/index>`.

Key participants
================
The identity solution on Concordium involves several key participants, each with specific roles and responsibilities in the process.

* **Users**: Individuals or businesses who interact on the Concordium blockchain. :doc:`Users must complete an identity verification process to create an account <user-processes>` and become participants on the network.

* **Identity Providers (IDPs)**: Third-party organizations that provide off-chain identity verification. They issue structured identity objects while storing verification data securely. Currently available IDPs include `Notabene <https://notabene.id/>`_, `Digital Trust Solutions <https://www.digitaltrustsolutions.nl/>`_, and `Global Finreg <https://globalfinreg.com/en>`_ (for businesses), with the potential to add additional IDPs in the future.

* **Privacy Guardians (PGs)**: Authorized entities that participate in :doc:`Concordium's Identity Disclosure Process <identity-disclosure-processes>` when legally required. Typically legal firms adept at handling disclosure requests in compliance with court orders, they play a crucial role in the decryption process.

* **The Authority**: The entity that has obtained a court order to request identity disclosure. The court order must originate in the governing jurisdiction where the PG is based, with a second court order from the IDP's jurisdiction also required. The Authority :doc:`initiates the identity disclosure process <identity-disclosure-processes>` when there is a legal need, such as in cases of suspicious activity.

Key concepts
============

Understanding Concordium's identity framework requires familiarity with several key concepts:

* **Account**: An account is used to send and receive funds on the Concordium chain. The account is associated with the user’s identity, however this association is encrypted and can only be disclosed through the :doc:`Identity Disclosure Process <identity-disclosure-processes>`.

* **Identity Credential**: An Identity Credential contains attributes on a user's identity. It is used to open accounts on-chain. These credentials are issued by Identity Providers during :doc:`user onboarding <user-processes>` and are derived from an identity document (e.g. a passport). The IDP keeps an identity record within their database. Identity Credentials are also stored within the wallet application. Concordium does not have any access to the user information within the Identity Credential. Individual attributes from the user’s Identity Credential can be shared by the user from their wallet with minimal data exposure using zero-knowledge proofs.

* **Identity Disclosure Process**: Unique to Concordium. In cases where an Authority suspects suspicious behaviour and wants to open an investigation, :doc:`a process can be followed <identity-disclosure-processes>` with multiple stakeholders (Authorities, IDPs and PGs) to disclose the identity of the user of a given account or the finding of all accounts of a given user.

* **Base Layer ID**: This is the identity system described above where users open accounts with Identity Credentials.

* **Wallet**: A wallet is a secure application where users manage their accounts, hold and transfer tokens on the network, and store Identity Credentials issued by Identity Providers. It also enables users to generate zero-knowledge proofs to share verified identity information without revealing personal data. :doc:`View wallet setup guides <../guides/setup-wallets-lp>`.

* **Seed (phrase)**: A seed phrase is secret randomness created during wallet initialization. All cryptographic material needed for identity and account credentials is derived from this seed, allowing users to recover their Concordium accounts if needed.

* **Public Holder Identifier**: An encrypted mapping between the user's Identity Credentials and their account. This identifier requires a court order and multiple Privacy Guardians to be decrypted.

* **Account Holder Identity Records**: A collection of records related to the account owner, including their identity information and an encrypted  :term:`linking key<Linking key>` that links to any other accounts opened with the same identity document. This data is stored in the IDP’s database.


.. toctree::
   :maxdepth: 1

   principles-of-privacy
   user-processes
   identity-disclosure-processes
