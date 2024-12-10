.. include:: ../../variables.rst

.. _reference-id-accounts:

==========
Identities
==========

Accounts and identities are strongly linked on the Concordium Platform. To be able to hold, send, or receive :term:`CCD<ccd>` or become a validator on the Concordium blockchain, you need an :term:`account` and an identity. This is regardless of which wallet you use for your transactions.

Before you can use the Concordium Platform, an :term:`identity provider` must verify and record your real-world identity. This identification is performed when you create your first account.

About identities
================

Identities are issued by an :term:`identity provider`. There is a :ref:`registry of selected identity providers and their contact information publicly accessible from the Concordium blockchain<identity-commands>`.

.. Note::

   It is possible to create a company identity that is not associated with a specific individual but is issued with documents that identify a company.
   Company identities are only relevant for a few companies. The way they are created differs from how individual identities are created. For more information, see `Company identity creation <https://developer.concordium.software/en/mainnet/net/guides/company-identities.html#company-identities>`_.

While identities facilitate compliance with relevant regulations, they also allow users to be represented :term:`on-chain` in a way that protects users’ privacy. That is, transactions on the chain are processed without exposing the identity of the sender or receiver. The identity of an account owner can only be revealed via the process of :ref:`disclosing an identity <revoke-anomity>`. Disclosing an identity can only happen in exceptional circumstances, for example if authorities have detected suspicious activity on the account, and requires action by one or more identity disclosure authorities and the identity provider who issued the account's identity.

Every account on the chain must be derived from an identity that is verified and signed by an approved identity provider. It is publicly visible which identity provider issued an identity for an account, and who the :term:`identity disclosure authorities<Identity disclosure authority>` are for the account and the identity. Being able to see who issued the identity enables whoever wishes to interact with an account to judge the level of risk in the transaction.

An identity contains a number of cryptographic values, i.e. a number of public and private keys, a signature from the identity provider, as
well as a number of secret values the user must use to be able to use the identity to create accounts.

In addition to this basic information which enables regulatory compliance, an account owner can choose to publicly reveal other values on their account. These values are called :term:`attributes` and can be, for example, nationality or country of residence. The attributes are also certified by the identity provider. If you choose to reveal attributes, you should have a good reason to do so. The general recommendation is not to reveal attributes.

Obtain an identity
------------------

You can :ref:`create identities<create-initial-account>` in the |cryptox|, Desktop Wallet, or |bw|. Identity creation is an :term:`off-chain` action.

.. Warning::
   Because of difference in the way private keys are handled, you cannot exchange identities and accounts between Desktop Wallet and other wallets.

Identity issuance requires *Identity Verification*, which is the process of verifying the real-life identity of the user. This typically requires taking photographs or scans of identification documents, such as a passport. Identity verification also checks that the user-chosen attributes are valid for the user.

Upon verification of the user's identification documents and attributes, the Identity provider issues a :term:`user identity certificate`. The User identity certificate contains attributes about the user. It is basically the Identity Provider’s signature over some cryptographic keys of the user and the validated personal attributes.

.. image:: ./images/identity-creation.png
   :alt: graphic drawing showing how the user interacts with the identity provider

.. Note::

   If using |cryptox| or |bw| with Digitial Trust Solutions (DTS) as your identity provider, and you have a mitID (Denmark) or Suomi.fi e-identification (Finland), you can use that to complete the identity verification process.


.. _revoke-anomity:

.. include:: ../snippets/disclosing-identity.rst

