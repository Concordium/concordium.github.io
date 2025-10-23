.. include:: ../../variables.rst
.. _account-concepts:

=================
Account concepts
=================

This section covers important technical aspects of how accounts work on the Concordium blockchain, including :ref:`account balances<managing-account-balances>`, :ref:`initial accounts<initial-accounts>`, and :ref:`account-sequence-numbers<account-sequence-number>`.

.. _managing-account-balances:

Account balances
================

An account has a *public balance* which can be *seen* by anyone.
The public balance of the account is used for payment of transaction fees,
producing blocks, and transfers.

At any given time some of the public balance might be unavailable for use. This
can happen in two ways:

- the account has staked some of the public
  balance in order to become a validator or to delegate
- some of the public balance is locked up because it was received via a
  :term:`transfer with schedule`

The locked-up balance can be staked, but it can not be used for payment of
transaction fees, nor can it be transferred to other accounts.

Here's an example that illustrates the relationship between the different balances (in this explanation, transaction fees are ignored). Suppose that on January 1 the account starts
with 100 CCD on the public balance. None of it is locked-up or staked.

Then on January 2 the account receives 50 CCD via a :term:`transfer with
schedule` with the release scheduled for
December 31 of the same year. At this point, January 2, the account has 100 CCD
at disposal, the rest being locked. If the account tried to transfer more than
100 CCD the transaction would be rejected.

On January 3 the account becomes a validator with the initial stake of 125 CCD.
This is successful because the total public balance is 150CCD.
After this the account still has 25 CCD at disposal, because CCD locked in a release schedule will be prioritized for stakes.

.. _initial-accounts:

Initial accounts
================

When using |cryptox| or |bw|, you create all accounts yourself. The procedure is different when using Desktop Wallet.

When using Desktop Wallet, you get an initial account at the same time as an :ref:`identity<reference-identity>` has been issued by an :term:`identity provider`. As the initial account is submitted to the chain by the identity provider, the identity provider knows the owner of the initial account. For this reason, you may not want to use the initial account and create a regular account instead. There can only be one initial account for one identity.

You additionally :ref:`create account keys<backup-import-recover>` for an initial account, which you store privately. The identity provider then verifies the validity of your identity information
and stores it locally in an identity object that is specific to you. Identity objects are only held by identity providers. The identity provider then opens an
account, the initial account, on your behalf. At the end of the identity verification process, you receive a user identity certificate that can be used for creating
additional accounts and you get access to the initial account on the Concordium Platform. These certificates are valid for a given period. You can obtain a new certificate
by creating a new identity and going through the identity verification process again with an identity provider.

Based on your user identity certificate the you can subsequently create other accounts (see below) that can only be linked to you if the :term:`privacy guardians<Privacy Guardian (PG)>` and the identity provider are
involved. This gives you a way to create accounts with an additional layer of privacy protection compared to that in the initial account. The owner of a regular account is not known to the identity providers or any other single entity. To facilitate compliance with relevant regulations, a regular account can only be created from an *identity* which is issued :term:`off-chain` by an Identity provider. While an account has to be created from an identity, your privacy is still protected, and the account owner's identity can only be revealed via the process of :ref:`disclosing an identity<reference-identity-disclosure-processes>`, which can only happen under stringent regulations. In particular, a key feature of the design of identities and accounts is that the identity provider cannot reveal the identity of an account on their own.

.. _account-sequence-number:

Account sequence numbers
========================

Each account on the Concordium blockchain has a :term:`sequence number<transaction sequence number>` and each
transaction signed by the account must have a sequence number. For a transaction
to be considered valid its sequence number must be the next available one for
the account. The sequence number is maintained by all the bakers in order to
validate transactions.

You can :ref:`look up the sequence number<account-seqno>` from an up to date node using Concordium Client.

The |cryptox| keeps track of the sequence number and assigns the correct one when sending transactions.
``concordium-client`` tracks the sequence number automatically, but it can
also be set manually.


