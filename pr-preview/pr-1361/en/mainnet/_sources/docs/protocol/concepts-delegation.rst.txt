.. include:: ../../variables.rst
.. _delegation-concept:

==========
Delegation
==========

On the Concordium blockchain, :term:`validators<validator>` run the protocol that generates blocks, and the action of creating and verifying blocks is an important part of what validators do. Validators are rewarded for every block that they create with a payment of some :term:`CCD<ccd>`. Because Concordium runs a proof-of-stake protocol, each validator needs to :term:`stake an amount to produce blocks<staked amount>`, and the :term:`probability of being selected to create the next block<lottery power>` is proportional to each validator's stake. So the payment may be seen as an interest on the validator's capital.

Not everyone with CCD has the resources needed to run a validator. :term:`Delegation<delegator>` enables everyone to earn rewards for delegating some stake without the need to run a node or become a validator. Any party with CCD may delegate some of their capital to a validator. This increases the validator's chance of producing the next block and getting rewards, which are then shared with the delegators. This is a non-custodial solution: when a party delegates an amount of CCD to a validator, the CCDs are not transferred to the validator and remain under the party's control; they are just considered part of the validator's stake for the proof-of-stake protocol. Staked CCDs, both for delegators and validators, cannot be spent while staked. Unstaking CCDs is subject to a :term:`cool-down period`.

You can only have one delegation per account. If you wish to delegate stake to multiple open pools, you can have multiple accounts and transfer CCD to those accounts to delegate.

.. Note::

   An account cannot be both a validator account and have a delegation.

Pools and Rewards
=================

A validator opens a :term:`staking pool`, and other CCD holders delegate some stake to this pool. The probability that the validator running the pool is chosen to produce the next block is then proportional to the total stake in the pool. When the pool rewards are distributed, the validator takes a commission and the rest of the rewards are distributed to the pool members in proportion to their stakes in the pool. For example, suppose that a pool has 10,000 CCD. And suppose that in a 24 hour period this pool earns 30 CCD as reward and the commission of the validator is 10%. The validator receives 3 CCD as commission. The rest (27 CCD) is distributed to the members of the pool according to their relative stake in their pool. This means a party with 1,000 CCD in the pool will receive 2.7 CCD.

Pool rewards are in two categories: block rewards and transaction fee rewards. These can have separate commission rates. A validator sets the delegation commission for their pool. They can set both values to anything between 0% and 100%.

.. _delegation-caps:

Bounding the size of pools
---------------------------

Concordium imposes two caps on the amount of stake in a single pool. The first cap bounds the size of a pool with respect to a fraction of all stake in pools (i.e., excluding passive delegation). For example, with the capital bound cap a pool cannot have more than 5% of all the stake in staking pools. This limit ensures that the pools remain distributed and prevents the crash of one validator from affecting the whole system. A party with lots of capital can run multiple validators to avoid this cap. This would increase decentralization.

The second cap is on the amount of stake in a pool with respect to the stake of the validator. For example, the total stake of a pool can be at most 6 times the stake of the validator. This bound is for security reasons as it prevents a party with a small stake from controlling too large a part of the system. Every validator's power is thus still proportional to their own stake, which is crucial for cryptographic security to hold.

These two caps are soft caps in the sense that a pool can have more stake than allowed, but then at most the cap value will be taken into account in the consensus algorithm and when distributing rewards. This means that a pool violating this bound will gradually receive less rewards per CCD in the pool as the size of the pool continues to increase.

Pool reliability
----------------

The rewards earned by a pool depend greatly on the reliability of the validator. If they miss producing a block they were selected to produce, or if they go offline, then less rewards will be distributed to the entire pool. If a validator misses a block, the blockchain knows who missed it. To help a delegator choose the best pool possible, statistics are available on `CCDScan <https://ccdscan.io>`_ about the performance of the different pools, the reliability of the validator, and the size of the pool.

Passive delegation
------------------

For CCD holders who do not want to regularly check the performance of their pool, but just want a safe way of earning interest, :term:`passive delegation` offers a low-risk low-reward alternative. Passive delegation is not associated with a specific validator; it can be thought of as distributing its capital to each staking pool in proportion to the pool's stake. It is not affected by the poor performance of a single validator. But the parameters are set in such a way that a party delegating to passive delegation earns less than by delegating to a reliable validator.

The commission rates for passive delegation are fixed at 25% for both block commissions and transaction commissions.

Time and cool-downs
===================

Changes to the pools take effect every 24 hours at :term:`pay day`. So opening a pool, changing the stake, moving the stake between pools or between passive delegation and a stakiing pool all take effect at the :term:`pay day`.
At pay day, rewards gathered over a 24 hour period are distributed at the same time. If, however, you make a change in delegation in the last :term:`epoch` before pay day, then the change has to wait until the second pay day.

When decreasing or removing the stake (whether for delegators or validators), the unstaked funds are not released until after a :term:`cool-down period`.

Where delegation is available
=============================

You can :ref:`delegate CCDs<add-delegation>` from any of the Concordium wallets or from :ref:`Concordium Client<transactions>`. It is recommended that you use :ref:`CCDScan<ccd-scan>` to research the various validators and pools prior to delegation if you plan to delegate to a specific pool.

Summary
=======

To earn rewards, a CCD holder can either delegate to passive delegation, to a staking pool, or become a validator. Being a validator oneself is the most challenging, as it requires resources to take part in the protocol, but it also provides the most rewards. Delegating to passive delegation provides the least rewards and requires the least actions from the investor. Delegating to a staking pool is somewhere between the two, both in terms of rewards and work, as it is recommended for a delegator to regularly check the performance of their pool’s validator, and change pool if it underperforms.

See the :ref:`Delegation FAQ<delegation-faq-old>` for answers to the most frequently asked questions.

