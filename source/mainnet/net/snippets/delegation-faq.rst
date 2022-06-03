Delegation FAQ
==============

For bakers
----------

**Can I create a pool on my existing baker node?**
Yes. See :ref:`Update a baker pool<update-baker-pool-dw>` for instructions about how to set up a baker pool on an existing baker.

**How do I activate a baker pool?**
All new bakers come with pool support built in. You can actively choose to disable this feature upon creating your baker keys. Read more about setting up a baker here: alsdkflsadkjfsdjfk

**How often are rewards distributed to bakers?**
If your baker is chosen to bake the next block on the blockchain you will receive rewards for this. All rewards are distributed at :ref:`pay day<glossary-pay-day>` which is once every 24 hours. If your baker is also baking CCDs delegated to it, the pool owner rewards from the delegated stake (if any) are also distributed each pay day.

**What does it mean for a baker to accept delegators?**
To open a baker pool for delegators means that users who want to earn rewards but perhaps don't want to be a baker, can delegate some of their stake to a baker pool. By doing this, they give the baker the right to bake with their stake. When they delegate their stake to the baker this increases the baker’s stake and thus the odds of being selected to bake a block. This increase in rewards is then shared with the delegator.

**Are there any limits to the size of a baker pool?**
Concordium blockchain imposes two caps on the amount of stake in a single pool:

A pool cannot have more than 10% of all staked CCD
The total stake of a pool cannot be more than 3x the size of the pool owners own stake

The first limit ensures that the blockchain remains distributed and prevents the crash of one baker from affecting the whole system. A party with lots of capital is welcome to run multiple bakers to avoid this cap as in turn this would increase decentralization.

The second cap is for security reasons as it prevents a party with a small stake from controlling too large a part of the system using leverage.

**What happens when the maximum stake cap is reached for my baker?**
These two caps are soft caps in the sense that a pool can have more stake than allowed, but only the allowed amounts are taken into account in the consensus algorithm and when distributing rewards. A pool violating the amount limits will gradually receive less rewards per CCD in the pool as the size of the pool continues to increase.

**How much less/more can I expect to earn when opening my pool to delegators?**
The amount you earn depends on how much stake your pool is baking. The more delegators, the more stake you have and the greater your chances of being selected to bake a block are. 10% of the additional rewards the delegators’ stake in your pool attracts will go to the pool owner. As you are able to have 2x your own stake delegated to your pool, you are effectively able to increase your rewards by 20% if your pool is full.

Therefore, attracting delegators and managing your baker responsibly will maximize rewards for all. In :ref:`Baker management<baker-pool>` you'll find information about how to be a responsible baker.

**Is there a cool-down period for bakers?**
Yes, the cool-down period for bakers is three weeks when reducing stake or stopping baking.

**Can I change my restaking preference if I am in a cool-down period?**
Yes, you can. Note that anything that is restaked during the cool-down period will be unstaked after the stake reduction takes effect. 

**How much does it cost to begin baking?**
There is no specific fee to begin baking, however, you do need to stake a minimum of 14,000 CCD, and you need to have enough CCD left in your disposable balance to cover transaction fees to generate your baker keys (link to definition?).


For delegators
--------------

**Can I delegate to more than one baker at a time?**
Yes. You can delegate to multiple bakers but an account can only have one delegation. To delegate to multiple bakers, you need multiple accounts.

**Can I move from one baker pool to another without having to wait for the next pay day?**
Changes to the pools take effect every 24 hours. So increasing the stake, moving the stake between pools or between passive delegation and a baking pool all take effect at the :ref:`pay day<glossary-pay-day>`.

**How much does it cost to begin delegating?**
There is no minimum amount required to delegate stake to a pool or enable passive delegation. You just have to have enough CCD left in your disposable balance to cover transaction fees.

**How much can I expect to earn as a delegator?**
This depends on the baker pool you select and how reliable this baker is. It also depends on how much stake the baker has. It is important to use `CCDScan <https://ccdscan.io>`_ to research bakers before delegating stake.

To cover the costs of running the baker node 10% of the delegators’ share of the pool rewards are awarded to the pool owner. For example, suppose that a pool has 1,000,000 CCD staked and out of that you have delegated 10,000 CCD to the pool (1%). Suppose that in a 24 hour period this pool earns 500 CCD. Your delegation’s share of the rewards is 1% equal to 5 CCD. Of this amount 10% (0.5 CCD) is awarded to the pool owner and you receive the remaining 4.5 CCD. 

**If I delegate stake to a baker pool or passive delegation, can I use it for transactions?**
No, any stake that you delegate is not part of the disposable balance; it is locked and cannot be used for transactions or to pay transaction fees.

**Is there a “cool-down” period when delegating and how does it work?**
Yes, for certain changes there is a cool-down period built into the pool system. The cool-down period is two weeks. During the cool-down it is not possible to change the delegated amount or move the delegated amount to a different baker pool. The cool-down period is activated when you decrease the delegated amount or stop delegation entirely. 

**Why is there a cool-down when I decrease / stop my delegation?**
The cool-down period is there to provide stability to the blockchain and to make sure that a baker does not become unstable too quickly if delegators withdraw their stake.

**Can I change my restaking preference if I am in a cool-down period?**
Yes, you can change whether you want earnings restaked or not during a cool-down period.

**Can I change the delegated amount if I am in a cool-down period?**
No, if you are in a cool-down period, you cannot change the delegated amount until the cool-down period ends. The cool-down period is two weeks.

**I want to update my delegation amount, but the input is locked. Why is that?**
The amount is locked because you are in a cool-down period and the delegation amount cannot be changed. The cool-down period is two weeks when decreasing your delegation amount or stopping delegation.

**Where can I see a list of all the baker pools I can delegate to?**
You can see a list of all pools and some performance metrics on `CCDScan <https://ccdscan.io>`_.

**How do I know whether a baker pool is good or bad? Where can I research baker performance and reliability?**
You can research baker performance and pool reliability on `CCDScan <https://ccdscan.io>`_. For information about how to judge baker performance and reliability, see :ref:`Baker management<baker-pool>`.

**What happens if a baker I delegate to closes the pool?**
If a baker closes their pool your delegation is moved to passive delegation.

**I didn't receive a reward at pay day. Why is that?**
It could be because the baker to whose pool you have delegated stake was not selected to bake a block. There are several reasons this could have happened. It might be a good idea to check the baker's performance regularly.

**What is “passive delegation”?**
For CCD holders who do not want to regularly check the performance of a chosen pool but just want a stable way of earning rewards, passive delegation offers a low-risk, low-reward alternative. This staking strategy is not associated with a specific baker, so there is no risk of poor baker health. The trade off when choosing passive delegation is that the rewards will be less than what you may receive when delegating to a specific baker pool.

**My account is suddenly delegating to passive delegation. Why is that?**
It is likely because the baker pool to which you were delegating has been closed. You can continue to delegate to passive delegation or select a new baker pool for your delegation.
