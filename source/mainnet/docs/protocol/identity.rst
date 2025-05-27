.. include:: ../../variables.rst

.. _reference-identity:

================================
Identity framework on Concordium
================================

Concordium's identity solution is designed to provide secure blockchain infrastructure that maintains accountability while preserving user privacy. The approach balances these requirements, enabling blockchain adoption across jurisdictions and ensuring regulatory compliance.

Concordium features two independent but interrelated identity layers that work together to provide a complete identity solution, :ref:`ConcordiumID <concordium-id>` and :ref:`Web3 ID <web3-id>`.


.. _concordium-id:

ConcordiumID
============

The ConcordiumID (also known as Base ID or Core ID) is the protocol-level identity system on Concordium. All users must obtain a ConcordiumID through identity verification with an approved :term:`identity provider` before they can create and use accounts on the blockchain.

After successful identity verification, the account holder receives a ConcordiumID, which enables them to:

- :doc:`Create accounts <manage-accounts>` on the Concordium blockchain
- :doc:`Conduct transactions <transactions>` within the networkusing :term:`zero-knowledge proofs<zero-knowledge proof>` without revealing the underlying data

- Prove certain identity attributes (such as age or citizenship)
The ConcordiumID is foundational to the accountability and privacy features of the Concordium blockchain.


.. _web3-id:

Web3 ID
=======

The Web3 ID suite (also referred to as Portable ID) is a system for issuing and managing :term:`verifiable credentials<verifiable credential>`, based on the :term:`W3C standard`. :doc:`Learn more about using Concordium's ID layer <../network/web3-id/index>`.

This next-generation portable ID tool can be used for:

- Issuance, management, and verification of digital certifications
- Portable :term:`KYC`
- Professional certifications
- Various other use cases requiring verified digital credentials

While interaction with the Concordium blockchain always requires a ConcordiumID, Web3 ID verifiable credentials can be used both within the Concordium ecosystem and in off-chain environments.

Key participants
================
The identity solution on Concordium involves several key participants, each with specific roles and responsibilities in the process.

* **Users**: Individuals or businesses who interact on the Concordium blockchain. :doc:`Users must complete an identity verification process to create an account <user-processes>` and become participants on the network.

* **Identity Providers (IDPs)**: Third-party organizations that provide off-chain identity verification. They issue structured identity objects while storing verification data securely. Currently available IDPs include `Notabene <https://notabene.id/>`_, `Digital Trust Solutions <https://www.digitaltrustsolutions.nl/>`_, and `Global Finreg <https://globalfinreg.com/en>`_ (for businesses), with the potential to add additional IDPs in the future.

* **Identity Disclosure Authority (IDAs)**: Authorized entities that participate in :doc:`Concordium's Identity Disclosure process <identity-disclosure-processes>` when legally required. Typically legal firms adept at handling disclosure requests in compliance with court orders, they play a crucial role in the decryption process.

* **The Authority**: The entity that has obtained a court order to request identity disclosure. The court order must originate in the governing jurisdiction where the IDA is based, with a second court order from the IDP's jurisdiction also required. The Authority :doc:`initiates the identity disclosure process <identity-disclosure-processes>` when there is a legal need, such as in cases of fraud or criminal activity.

Key concepts
============

Understanding Concordium's identity framework requires familiarity with several key concepts:

* **Account**: An account is used to send and receive funds on the Concordium chain. The associated account credential defines the cryptographic keys that control the account. The account credential also contains information necessary for the identity disclosure. Multiple accounts can be created underneath an Identity Credential.

* **Identity Credential**: An Identity Credential contains attributes on a user's identity and is used to open accounts on-chain. It is issued by IDPs during :doc:`user onboarding <user-processes>` based on identity documents (e.g. passports). It is stored in both the user's wallet and IDP's database, but never accessible to Concordium. Users can share verified attributes using zero-knowledge proofs without revealing the underlying data.

* **Identity Disclosure**: In fraudulent and criminal cases, :doc:`a process can be followed <identity-disclosure-processes>` with multiple stakeholders (Authorities, IDPs and IDAs) to disclose the identity of the user of a given account or the finding of all accounts of a given user. This process requires court orders and involves multiple participants to protect user privacy under normal circumstances.

* **Base Layer ID**: This is the identity system described above where users open accounts with Identity Credentials.

* **Web3 ID**: This is a generic verifiable credential system. It can be used to provide a user with additional credentials, such as membership cards or degrees.

* **Identity Disclosure Data**: Each account credential contains encrypted identifiers linking it to the owner's identity record at the IDP. This data, along with encrypted linking information that can reveal all accounts of a user, requires decryption by multiple IDAs. This ensures that no single party—not even the IDP—can connect identities to accounts outside the proper disclosure process.

* **Wallet**: A wallet is a secure application where users manage their accounts, hold and transfer tokens, and store Identity Credentials. Wallets enable users to generate zero-knowledge proofs to share verified information without revealing personal data. Wallets hold cryptographic addresses that control the accounts. :doc:`View wallet setup guides <../guides/setup-wallets-lp>`.

* **Seed (phrase)**: A seed phrase is secret randomness created during wallet initialization. All cryptographic material needed for identity and account credentials is derived from this seed, allowing users to recover their Concordium accounts if needed.

Principles of privacy
=====================
Concordium's identity system has been designed to be privacy first and incorporates several key privacy principles.

Protection of personal identifiable information
-----------------------------------------------

Users personal identifiable information (PII) such as name, birthdate etc, are never available on chain, either encrypted or unencrypted. PII is only stored locally within the user's wallet and with the IDP for compliance purposes. For avoidance of doubt, Concordium does not have access to any of this user information.

Separation of powers
--------------------

No single party can link a user's Identity to the accounts they have on Concordium. This can only be done through the Identity Disclosure Process.

- IDPs cannot identify a user's account (or on chain wallet address). They cannot connect an identity to on chain activity or an address.

- A single IDA cannot decrypt a user's Identity Disclosure Data, this means they cannot access the mapping between a user's identity and their on-chain presence. In addition they do not have access to the PII which is stored within the IDPs systems.

- It is only possible to connect a user's PII identity to an account by :doc:`following the identity disclosure process <identity-disclosure-processes>`.

Selective disclosure through zero-knowledge proofs
--------------------------------------------------

With Concordium users can choose to reveal zero-knowledge proof verifications of attributes of their identity across both ConcordiumID and Web3 ID, without revealing the underlying data (e.g. proving they are over 18 without revealing their birth date).

.. toctree::
   :maxdepth: 1

   user-processes
   identity-disclosure-processes
