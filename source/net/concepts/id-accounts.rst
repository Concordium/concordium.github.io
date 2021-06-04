
.. include:: ../../variables.rst

.. _reference-id-accounts:

=======================
Identities and accounts
=======================

.. contents::
   :local:
   :backlinks: none


In order to be an active participant on the Concordium blockchain (e.g., hold,
send, receive :ref:`glossary-GTU`) a user must create an *account*.

The user will get an :ref:`glossary-initial-account` at the same time as an *identity* has been issued
by an identity provider. As the initial account is submitted to the chain by the
identity provider, said identity provider will know the owner of the initial account. For this
reason, the user may consider not using the initial account, and create a regular account instead.

Regular accounts' owner is not known to the identity providers, or any other single entity. To facilitate
compliance with relevant regulations, a regular account can only be created from an *identity*
which is issued :ref:`glossary-off-chain` by an Identity provider. While an account
has to be created from an identity, the user's privacy is still protected, and the
account owner's identity can only be revealed via the process of :ref:`anonymity revocation<revoking-anomity>`,
which can only happen under stringent regulations, such as upon a court order. In
particular, a key feature of the design of identities and accounts is that the identity
provider cannot reveal the identity of an account on their own.

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

You can create identities in the :ref:`Desktop Wallet <create-initial-account-desktop>` or in the :ref:`Mobile Wallet <mobile-get-started>`. The |Net| release presently supports the Notabene identity issuance flow.

.. Warning::
   Currently, it is not possible to exchange identities and accounts between the Mobile Wallet and the Desktop Wallet. If you try to import a file that has been exported from the Mobile Wallet into the Desktop Wallet, the import will fail, and likewise, if you try to import a file exported from the Desktop Wallet into the Mobile Wallet.

Identity issuance requires *Identity Verification*, which is the process of verifying the real-life identity of the user. This will typically involve taking photographs, scans of identification documents (e.g., passport), etc. Identity verification also checks that the user-chosen attributes are valid for the user.

Creating an account
===================

Once a user has an identity, they can use it to create a number of accounts, besides the
:ref:`glossary-initial-account` created by the identity provider upon creating the identity. In
contrast to obtaining an identity, opening an account is an :ref:`glossary-on-chain` action
and requires sending a transaction to a node participating in the Concordium
network. The input to the transaction is a *credential* which contains a number
of cryptographic proofs, as well as a selection of attributes the user wishes to
reveal publicly. The proofs establish that the attributes the user revealed
publicly are the ones approved by the identity provider. The proofs reveal no
other information. In particular, the identity provider itself cannot determine
the owner of the account. (Revealing the owner is only possible through
:ref:`anonymity revocation<revoking-anomity>`, which requires the identity provider and anonymity
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
