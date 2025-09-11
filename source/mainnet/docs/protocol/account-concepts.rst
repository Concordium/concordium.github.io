.. include:: ../../variables.rst
.. _account-concepts:

=================
Account concepts
=================

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


Account sequence number
=======================

Each account on the Concordium blockchain has a :term:`sequence number<transaction sequence number>` and each
transaction signed by the account must have a sequence number. For a transaction
to be considered valid its sequence number must be the next available one for
the account. The sequence number is maintained by all the bakers in order to
validate transactions.

You can :ref:`look up the sequence number<account-seqno>` from an up to date node using Concordium Client.

The |cryptox| keeps track of the sequence number and assigns the correct one when sending transactions.
``concordium-client`` tracks the sequence number automatically, but it can
also be set manually.


