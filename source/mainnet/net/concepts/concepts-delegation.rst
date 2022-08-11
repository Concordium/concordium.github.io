.. _delegation-concept:

==========
Delegation
==========

On the Concordium blockchain, :ref:`bakers<glossary-baker>` run the protocol that generates blocks, and the action of creating blocks is baking. Bakers are rewarded for every block that they create with a payment of some :ref:`CCD<glossary-ccd>`. Because Concordium runs a proof-of-stake protocol, each baker needs to :ref:`stake an amount to bake<glossary-staked-amount>`, and the :ref:`probability of being selected to create the next block<glossary-lottery-power>` is proportional to each baker’s stake. So the payment may be seen as an interest on the baker’s capital.

Not everyone with CCD has the resources needed to run a baker. :ref:`Delegation<glossary-delegate>` enables everyone to earn interest. Any party with CCD may delegate some of their capital to a baker. This increases the baker’s chance of baking the next block and getting rewards, which are then shared with the delegators. This is a non-custodial solution: when a party delegates an amount of CCD to a baker, the CCDs are not transferred to the baker and remain under the party's control; they are just considered part of the baker's stake for the proof-of-stake protocol. Staked CCDs, both for delegators and bakers, cannot be spent while staked. Unstaking CCDs is subject to a :ref:`cool-down period<glossary-cool-down-period>`.

Pools and Rewards
=================

A baker opens a :ref:`pool<glossary-baker-pool>`, and other CCD holders delegate some stake to this pool. The probability that the baker running the pool is chosen to bake the next block is then proportional to the total stake in the pool. When the pool rewards are distributed, the baker takes a commission and the rest of the rewards are distributed to the pool members in proportion to their stakes in the pool. For example, suppose that a pool has 10,000 CCD. And suppose that in a 24 hour period this pool earns 30 CCD as reward and the commission of the baker is 10%. The baker receives 3 CCD as commission. The rest (27 CCD) is distributed to the members of the pool according to their relative stake in their pool. This means a party with 1,000 CCD in the pool will receive 2.7 CCD.

Pool rewards are in three categories: finalization, baking and transaction fee rewards. These can have separate commission rates.

.. _delegation-caps:

Bounding the size of pools
---------------------------
Concordium imposes two caps on the amount of stake in a single pool. The first cap bounds the size of a pool with respect to a fraction of the total staked CCDs. For example, with the capital bound cap a pool cannot have more than 10% of all the staked CCD. This limit ensures that the pools remain distributed and prevents the crash of one baker from affecting the whole system. A party with lots of capital can run multiple bakers to avoid this cap. This would increase decentralization.

The second cap is on the amount of stake in a pool with respect to the stake of the baker. For example, the total stake of a pool can be at most 3 times the stake of the baker. This bound is for security reasons as it prevents a party with a small stake from controlling too large a part of the system. Every baker’s power is thus still proportional to their own stake, which is crucial for cryptographic security to hold.

These two caps are soft caps in the sense that a pool can have more stake than allowed, but then at most the cap value will be taken into account in the consensus algorithm and when distributing rewards. This means that a pool violating this bound will gradually receive less rewards per CCD in the pool as the size of the pool continues to increase.

Pool reliability
----------------

The rewards earned by a pool depend greatly on the reliability of the baker. If they miss a slot where they were chosen to bake, if they go offline, or if they do not follow the protocol and get jailed, then less rewards will be distributed to the entire pool. To help a delegator choose the best pool possible, statistics are available on `CCDScan <https://ccdscan.io>`_ about the performance of the different pools, the reliability of the baker, and the size of the pool.

Bakers cannot choose the commission values themselves. There is a fixed commission value that is the same for all pools. This is to favor healthy competition between pools based on the quality of their baking, and not have some dishonest parties try to increase their control over the system by setting commissions to 0 to attract more delegators.

Passive delegation
------------------

For CCD holders who do not want to regularly check the performance of their pool, but just want a safe way of earning interest, :ref:`passive delegation<glossary-passive-delegation>` offers a low-risk low-reward alternative. Passive delegation is not associated with a specific baker; it can be thought of as distributing its capital to each pool in proportion to the pool's stake. It is not affected by the poor performance of a single baker. But the parameters are set in such a way that a party delegating to passive delegation earns less than by delegating to a reliable baker.

The commission rates for passive delegation are:

- Baking commission: 12.00%
- Finalization commission: 100.00%
- Transaction commission: 12.00%

Time and cool-downs
===================

Changes to the pools take effect every 24 hours. So opening a pool, increasing the stake, moving the stake between pools or between passive delegation and a baking pool all take effect at the :ref:`pay day<glossary-pay-day>`. At pay day, rewards gathered over a 24 hour period are distributed at the same time. If, however, you make a change in delegation in the last :ref:`epoch<glossary-epoch>` before pay day, then the change has to wait until the second pay day.

But decreasing the stake (whether for delegators or bakers) is subject to a cool-down period. In other words, once the transaction has been included in a block the cool-down period starts. Unstaking takes effect at the pay day event after the cool-down has elapsed, and the party's stake will be unlocked. During the cool down, the stake is still invested in the pool and earns rewards as before.

Where delegation is available
=============================

You can delegate CCDs in :ref:`the Desktop Wallet, Mobile Wallet<delegation>` and :ref:`Concordium Client<transactions>`. It is recommended that you use the :ref:`CCD scan tool<ccd-scan>` to research the various bakers and pools prior to delegation if you plan to delegate to a specific pool.

Summary
=======

To earn rewards, a CCD holder can either delegate to passive delegation, to a baking pool, or start their own baker. Baking oneself is the most challenging, as it requires resources to take part in the protocol, but it also provides the most rewards. Delegating to passive delegation provides the least rewards and requires the least actions from the investor. Delegating to a baking pool is somewhere between the two, both in terms of rewards and work, as it is recommended for a delegator to regularly check the performance of their pool’s baker, and change pool if it underperforms.

See the :ref:`Delegation FAQ<delegation-faq>` for answers to the most frequently asked questions.
