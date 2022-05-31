
Delegation FAQ
==============

For bakers
----------

**Can I create a pool on my existing baker node?**
Yes. See :ref:`Update a baker pool<update-baker-pool-dw>` for instructions about how to set up a baker pool on an existing baker.

**What does it mean for a baker to accept delegators?**
To open a baker pool for delegators means that users who want to earn interest but perhaps don't want to be a baker, can delegate some of their stake to your baker pool. By doing this, they give you the right to stake with their stake. When they delegate stake to you this increases your baker stake and thus your odds of being selected to bake a block.

**As a baker when do I have to split my stake?**
Concordium imposes two caps on the amount of stake in a single pool. The first cap bounds the size of a pool with respect to a fraction of the total staked CCDs. For example, with the capital bound cap a pool cannot have more than 10% of all the staked CCD. This limit ensures that the pools remain distributed and prevents the crash of one baker from affecting the whole system. A party with lots of capital can run multiple bakers to avoid this cap. This would increase decentralization.

The second cap is on the amount of stake in a pool with respect to the stake of the baker. For example, the total stake of a pool can be at most 3 times the stake of the baker. This bound is for security reasons as it prevents a party with a small stake from controlling too large a part of the system.

Check regularly to make sure that you are not close to the bounding cap for max capital for a baker. If you're getting close to the max capital, you can split and make another baker to divide the capital.

**What happens when the maximum stake cap is reached for my baker?**
These two caps are soft caps in the sense that a pool can have more stake than allowed, but then at most the cap value will be taken into account in the consensus algorithm and when distributing rewards. This means that a pool violating this bound will gradually receive less rewards per CCD in the pool as the size of the pool continues to increase.

To fix this, you should make another baker and divide your capital.

**How much less/more can I expect to earn when opening my pool to delegators?**
The amount you earn depends on how much stake you have. The more delegators, the more stake you have and the greater your chances of being selected to bake a block are. So you need to attract delegators and also manage your baker responsibly so that the pool maximizes rewards for all. In :ref:`Baker management<baker-pool>` you'll find information about how to be a responsible baker.

For delegators
--------------

**Can I delegate to more than one baker at a time?**
Yes. You can delegate to multiple bakers but an account can only have one delegation. So to delegate to multiple bakers, you need multiple accounts.

**Can I move from one baker pool to another without having to wait for the next pay day?**
Changes to the pools take effect every 24 hours. So opening a pool, increasing the stake, moving the stake between pools or between passive delegation and a baking pool all take effect at the :ref:`pay day<glossary-pay-day>`.

**How much does it cost to begin delegating?**

**Can I change my restaking preference if I am in a cool-down period?**
Yes, you can change whether you want earnings restaked or not during a cool-down period.

**Can I change the delegated amount if I am in a cool-down period because I decreased my delegation amount?**
No, if you have decreased your delegated amount and you are in a cool-down period you cannot change the delegated amount until the cool-down period ends. The cool-down period is two weeks.

**How do I know whether a baker pool is good or bad? Where can I research baker performance and reliability?**
You can research baker performance and reliability on CCDScan (link). For information about how to judge baker performance and reliability, see :ref:`Baker management<baker-pool>`.

**What happens if a baker I delegate to closes their pool?**
If a baker closes their pool your delegation is moved to passive delegation.

**How much can I expect to earn as a delegator?**
This depends on the baker pool you select and how reliable the baker is. It also depends on how much stake the baker has. It is important to use `CCDScan <https://ccdscan.io>`_ to reseach bakers before delegating stake.

Remember that commissions are also distributed to the baker. For example, suppose that a pool has 10,000 CCD. And suppose that in a 24 hour period this pool earns 30 CCD as reward and the commission of the baker is 10%. The baker receives 3 CCD as commission. The rest (27 CCD) is distributed to the members of the pool according to their relative stake in their pool. This means a party with 1,000 CCD in the pool will receive 2.7 CCD.

**Why is there a cool-down when I decrease / stop my delegation?**

**I didn't receive a reward at pay day. Why is that?**
It could be because the baker to whose pool you have delegated stake was not selected to bake a block. There are several reasons this could have happened. 

**My account is suddenly delegating to passive delegation. Why is that?**
It is likely because the baker pool to which you were delegating has been closed. You can continue to delegate to passive delegation or select a new baker pool for your delegation.

**I want to update my delegation amount, but the input is locked. Why is that?**
The amount is locked because you are in a cool-down period and the delegation amount cannot be changed. The cool-down period is two weeks when decreasing your delegation amount or stopping delegation.
