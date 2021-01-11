.. _Obtaining an identity: #obtaining-an-identity
.. _Creating an account: #creating-an-account
.. _Benefits: #benefits
.. _`anonymity revocation`: /testnet/references/id-accounts.html#revoking-anonymity
.. _Concordium ID: /testnet/see-also/downloads.html#concordium-id
.. _Notabene: https://notabene.id/
.. _Onfido: https://onfido.com/
.. _`mobile wallet`: /test/guides/get-started.html
.. _Discord: https://discord.com/invite/xWmQ5tp

=======================
Identities and accounts
=======================

.. contents::
   :local:
   :backlinks: none


In order to be an active participant on the Concordium blockchain (e.g., hold,
send, receive :ref:`glossary-GTU`) a user must create an *account*.

To facilitate compliance with relevant regulations, an account can only be
created from an *identity* which is issued :ref:`glossary-off-chain` by an Identity provider.
While an account has to be created from an identity, the user's privacy is still
protected, and the account owner's identity can only be revealed via the process
of `anonymity revocation`_, which can only happen under stringent regulations,
such as upon a court order. In particular, a key feature of the design of
identities and accounts is that the identity provider cannot reveal the identity
of an account on their own.

Anonymity revocation can only happen in exceptional circumstances (e.g., if
authorities have detected suspicious activity on the account) and requires
action by one or more anonymity revokers and the identity provider who issued
the account's identity.

Obtaining an identity
=====================

Identities are issued by an identity provider. There is a registry of approved
identity providers publicly accessible from the Concordium blockchain, with
their contact information. Concordium Foundation will maintain the list in the
beginning.

Each identity contains a number of cryptographic values, and a number of
user-chosen attributes, such as nationality or country of residence. These
attributes are certified by the identity provider. The cryptographic values are
a number of public and private keys, a signature from the identity provider, as
well as a number of secret values the user must use to be able to use the
identity to create accounts.

Identities can be created via the `mobile wallet`_. Identity issuance requires
*Identity Verification*, which is the process of verifying the real-life
identity of the user. This will typically involve taking photographs, scans of
identification documents (e.g., passport), etc. Identity verification also
checks that the user-chosen attributes are valid for the user.

Concordium ID (mobile wallet) identity
--------------------------------------

In the testnet phase the `Concordium ID`_ app supports two identity issuance
flows: *Notabene* and *Notabene (development)*. In both cases the identity
provider is `Notabene`_, but the identity verifiers differ.

The *Notabene* flow is supported by `Onfido`_ and requires the user to take
photos of themselves, as well as supporting documentation such as a passport,
driver's license or identity card. The identity attributes are determined based
on the provided documentation.

The *Notabene (development)* flow allows the user to provide their own
attributes and does no verification. This flow is available for testing
purposes, and will not be supported on the :ref:`glossary-mainnet`.

Creating an account
===================

Once a user has an identity, they can use it to create a number of accounts. In
contrast to obtaining an identity, opening an account is an :ref:`glossary-on-chain` action
and requires sending a transaction to a node participating in the Concordium
network. The input to the transaction is a *credential* which contains a number
of cryptographic proofs, as well as a selection of attributes the user wishes to
reveal publicly. The proofs establish that the attributes the user revealed
publicly are the ones approved by the identity provider. The proofs reveal no
other information. In particular, the identity provider itself cannot determine
the owner of the account. (Revealing the owner is only possible through
`anonymity revocation`_, which requires the identity provider and anonymity
revokers to act together.) Note that revealing attributes publicly is completely
optional. The benefit gained from revealing attributes is that other users may
decide whether to trust the account based on the publicly available information.

Benefits
========

Every account on the chain must be derived from an identity that is verified and
signed by an approved identity provider. It is publicly visible which identity
provider issued an identity for an account, and who the anonymity revokers are
for the account and the identity. In addition to this basic information which
enables regulatory compliance, an account owner can choose to publicly reveal
other values on their account, such as their nationality or country of
residence. Since this information is publicly accessible anybody can check it
before interacting with an account. Moreover, being able to see who issued the
identity enables whoever wishes to interact with an account to judge the level
of risk in the transaction.

.. _revoking-anomity:

Revoking anonymity
==================

When necessary, the anonymity revokers and identity provider can work together
to determine the owner of an account and determine which accounts belong to the
same owner. (They should only do so when legally obliged to, such as by a court
order.) Anonymity revocation is a two-stage process requiring cooperation of
multiple parties.

1. Each account has an encryption of a specific *user identifier*. This
   number can be decrypted by sufficiently many of the anonymity revokers
   working together. (The set of anonymity revokers and the number of them
   required to decrypt the user identifier are determined when the identity is
   issued.)
2. Once the user identifier is decrypted the identity provider can look
   up the real-life identity of the owner of the account.

After step 2 the anonymity revokers can additionally decrypt a value that is
held by the identity provider and allows the revokers to find all accounts the
user has created from a given identity. Additionally, this value allows
anonymity revokers to see the amount of GTUs in the shielded balance of
de-anonymized accounts.

All of these actions are subject to rules and processes, and only the relevant
entities learn any information about the account owner. No information is
publicly revealed.

Support & Feedback
==================

If you run into any issues or have suggestions, post your question or feedback
on `Discord`_, or contact us at testnet@concordium.com.
