.. _web3id-index:
.. include:: ../../variables.rst

===============
What is Web3 ID
===============

Web3 ID is an extension of the existing ID 2.0 infrastructure in Concordium to allow issuance of many different types of :ref:`verifiable credentials<glossary-verifiable-credential>` in addition to the existing :ref:`account credentials<glossary-account-credential>`. Web3 ID allows you to add :ref:`verifiable credentials<glossary-verifiable-credential>` to your |bw|, such as club memberships, education credentials, employment history, rewards programs, customer loyalty programs, and more. :ref:`Proofs<glossary-zero-knowledge-proof>` can be made to verify these credentials, if necessary.

Concordium’s identity layer is built into the protocol. Every account on the chain has one or more credentials issued by specially sanctioned identity providers who are expected to be able to provide full anonymity revocation. ID 2.0 made it possible to use these identities off-chain: wallets allow using identities to prove properties about the holder, such as their nationality or age. These are known as :ref:`account credentials<glossary-account-credential>`.

Web3 ID is an extension of the core protocol identity with other types of credentials that don’t have stringent requirements on anonymity revocation, but can also prove a number of other attributes of the holder. Examples of this could be club membership credentials, reward programs, etc. There are no requirements imposed on who can be an issuer of these credentials, and in contrast to protocol identities, the Web3 ID credentials can be revoked according to the logic imposed by the issuer. This could be that the credential holder can revoke it, the credential expires, or the issuer or some other third party has rights to revoke it.

Web3 ID credentials, like the existing ones, will contain commitments to a variety of attributes. :ref:`Zero-knowledge proofs<glossary-zero-knowledge-proof>` can be constructed to verify the committed values. The |bw| supports construction of these proofs. The proofs can contain a mix of verifiable credentials and account credentials.

========
Entities
========

The core entities of the Web3ID ecosystem are :ref:`issuers<glossary-issuer>` which issue and manage the lifetime of verifiable credentials, :ref:`holders<glossary-credential-holder>` that have verifiable credentials in their wallets, and use them to prove properties about themselves to :ref:`verifiers<glossary-verifier>`.
Verifiers ask holders for proofs about their attributes, such as proof of club membership, and holders respond with zero knowledge proofs created using their verifiable credentials.
Verifiable credentials themselves never leave the user's wallet.

.. image:: ../images/web3id/web3id-entities.png

Support for issuers and verifiers
=================================

Concordium understands that issuers and verifiers may not have the resources to create a smart contract from scratch and the other tooling needed to issue and verify web3 credentials.
So tooling is provided that enables you to become an issuer and verify credentials as painlessly as possible.

Issuer
------

An issuer will typically consist of the following components.

1. Some existing way of identifying users.
2. A dApp that integrates with the wallet and allows the holder to request credential. An example dApp can be found (link).
3. A smart contract that manages the credential lifetime. When a verifiable credential is issued the metadata is stored in the contract,
   and the attributes and other secrets, the full verifiable credential, are returned to the dApp to be stored in the wallet.

In order to simplify issuance as much as possible Concordium provides a `template smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/credential-registry>`_
that is expected to suffice for most of the issuers, but can be modified if custom logic is required.

Concordium additionally provides an `issuer service <https://github.com/Concordium/concordium-web3id/tree/main/services/web3id-issuer>`_ that is designed to handle all of the chain-specific interactions, and provide a simple REST API, so that only the custom business logic of the issuer must be implemented.
Note that the service must be run by the issuer themselves, since only they have the secret keys necessary to run it.

In addition to the infrastructure listed above, the issuer must also provide JSON schemas for their credentials, and metadata.
These schemas and metadata are used by the holder's wallet to display the credentials in the wallet.

Verifier
--------

A verifier is expected to be a business or another use-case that will only provide a service provided specific proofs can be provided by the holder, for example proof of ownership of specific credential, such as a concert ticket.
This will typically consist of two components.

1. A dApp that will interact with the wallet to request from the user to attest to specific properties of their credentials. The result of such a request is a **presentation**.
2. A back-end component that will verify the provided **presentation** and allow the desired action or not.

Verification of presentations has two components, the cryptographic verification of the zero-knowledge proofs contained within, which establish that the holder indeed owns the relevant credentials and they are issued by the stated issuer, and the business logic checking that the required property was attested.
In particular, a key part of the business logic is whether the verifier trusts a particular issuer, which is identified by a smart contract address and the public key registered therein.

Concordium simplifies the checking of the cryptographic part by providing a `verifier service <https://github.com/Concordium/concordium-web3id/tree/main/services/web3id-verifier>`_.
This service can be run by the verifier themselves, and Concordium runs an instance of the verifier for Mainnet (link) or `Testnet <https://web3id-verifier.testnet.concordium.com/v0/verify>`__.
Using Concordium hosted services means that the verifier places trust in Concordium, but simplifies the implementation of the verifier.

An example verifier dApp can be found (link), and an example back end can be found (link).
