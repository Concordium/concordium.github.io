.. include:: ../../variables.rst
.. _delegation-concept:

=========================
How to become a delegator
=========================

The Concordium blockchain consists of multiple validator nodes that create and verify blocks, and enable CCD holders to earn rewards. However, not everyone with CCD wishes to run a validator node.
:term:`Delegation<delegator>` enables you to earn rewards for delegating some stake without the need to become a validator and run a node. Any CCD holder may delegate some of their CCD to a validator. This increases the validator's chance of being selected to produce the next block and getting rewards, which are then shared with the delegators.

When you delegate an amount of CCD to a validator, the CCDs are not transferred to the validator and remain under your control; they are just considered part of the validator's stake for the :term:`proof-of-stake<proof-of-stake>` protocol. While staked, these CCD cannot be spent, and if you later choose to unstake them, there will be a :term:`cool-down period` before they become available again.

You can only have one delegation per account. If you wish to delegate stake to multiple open pools, you can have multiple accounts and transfer CCD to those accounts to delegate.

.. Note::

   An account cannot be both a validator account and have a delegation.

Pool delegation vs passive delegation
=====================================

When delegating, you have two options: delegating to a specific validator's pool or choosing passive delegation.

Pool delegation
---------------

A validator opens a :term:`staking pool`, and other CCD holders delegate some stake to this pool. The probability that the validator running the pool is chosen to produce the next block is then proportional to the total stake in the pool. When the pool rewards are distributed, the validator takes a commission and the rest of the rewards are distributed to the pool members in proportion to their stakes in the pool. For example, suppose that a pool has 10,000 CCD. And suppose that in a 24 hour period this pool earns 30 CCD as reward and the commission of the validator is 10%. The validator receives 3 CCD as commission. The rest (27 CCD) is distributed to the members of the pool according to their relative stake in their pool. This means a party with 1,000 CCD in the pool will receive 2.7 CCD.

Pool rewards are in two categories: block rewards and transaction fee rewards. These can have separate commission rates. A validator sets the delegation commission for their pool. They can set both values to anything between 0% and 100%.

The rewards earned by a pool depend greatly on the reliability of the validator. If they miss producing a block they were selected to produce, or if they go offline, then less rewards will be distributed to the entire pool. If a validator misses a block, the blockchain knows who missed it. To help a delegator choose the best pool possible, statistics are available on `CCDScan <https://ccdscan.io>`_ about the performance of the different pools, the reliability of the validator, and the size of the pool.

For detailed information about reward rates, distribution mechanics, and overall tokenomics, see see :ref:`tokenomics`.

.. _delegation-caps:

Passive delegation
------------------

For CCD holders who do not want to regularly check the performance of their pool, but just want a safe way of earning interest, :term:`passive delegation` offers a low-risk low-reward alternative. Passive delegation is not associated with a specific validator; it can be thought of as distributing its capital to each staking pool in proportion to the pool's stake. It is not affected by the poor performance of a single validator, but the parameters are set in such a way that a party delegating to passive delegation earns less than by delegating to a reliable validator.

The commission rates for passive delegation are fixed at 25% for both block commissions and transaction commissions.

Time and cool-downs
===================

Changes to the pools take effect every 24 hours at :term:`pay day`. So opening a pool, changing the stake, moving the stake between pools or between passive delegation and a staking pool all take effect at the :term:`pay day`.
At pay day, rewards gathered over a 24 hour period are distributed at the same time. If, however, you make a change in delegation in the last :term:`epoch` before pay day, then the change has to wait until the second pay day.

When decreasing or removing the stake (whether for delegators or validators), the unstaked funds are not released until after a :term:`cool-down period`.

For detailed information about cool-down periods, staking parameters, and tokenomics, see see :ref:`tokenomics`.

How to become a delegator
=========================

You can :ref:`delegate CCDs<add-delegation>` by creating an account in any Concordium wallet.  If you plan to delegate to a specific validator pool, it is recommended that you research the various validators and their performance using :ref:`CCDScan<ccd-scan>` before making your decision.

See the :ref:`Delegation and validationcon FAQ<delegation-faq-old>` for answers to the most frequently asked questions.

