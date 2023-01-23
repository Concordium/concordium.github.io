.. _delegation-faq:

Delegation FAQ
==============

For delegators
--------------

.. dropdown:: Do I risk losing my CCDs when delegating?

    When you delegate, the CCDs do not leave your wallet. They are locked there, so you can not spend them, and their value is added to the value of the baker pool or to passive delegation. But the CCDs never leave your wallet, so they can never be lost. There is no more risk delegating than not delegating. The worst thing that can happen is that the baker pool stops baking but stays open, and then you will not get any rewards. If the pool closes, your stake will be transferred to passive delegation automatically and from here you can easily stop delegation if you want to. It is important to use `CCDScan`_ to monitor baker and pool performance.

.. dropdown:: Can I delegate to more than one baker at a time?

    Yes. You can delegate to multiple bakers but an account can only have one delegation. To delegate to multiple bakers, you need multiple accounts.

.. dropdown:: Can I move from one baker pool to another without having to wait for the next pay day?

    Changes to the pools take effect every 24 hours. So increasing the stake, moving the stake between pools or between passive delegation and a baking pool all take effect at the :ref:`pay day<glossary-pay-day>`.

.. dropdown:: How much does it cost to begin delegating?

    There is no minimum amount required to delegate stake to a pool or enable passive delegation. You just have to have enough CCD left in your disposable balance to cover transaction fees.

.. dropdown:: How much can I expect to earn as a delegator?

    This depends on how much you delegate, the baker pool you select and how reliable this baker is. It also depends on how much stake the baker has. It is important to use `CCDScan`_ to research bakers before delegating stake.

    To cover the costs of running the baker node 10% of the delegators’ share of the pool rewards are awarded to the pool owner. For example, suppose that a pool has 1,000,000 CCD staked and out of that you have delegated 10,000 CCD to the pool (1%). Suppose that in a 24 hour period this pool earns 500 CCD. Your delegation’s share of the rewards is 1% equal to 5 CCD. Of this amount 10% (0.5 CCD) is awarded to the pool owner and you receive the remaining 4.5 CCD.

.. dropdown:: If I delegate stake to a baker pool or passive delegation, can I use it for transactions?

    No, any stake that you delegate is not part of the disposable balance; it is locked and cannot be used for transactions or to pay transaction fees.

.. dropdown:: Is there a “cool-down” period when delegating and how does it work?

    Yes, for certain changes there is a cool-down period built into the pool system. The cool-down period is two weeks. During the cool-down it is not possible to change the delegated amount or move the delegated amount to a different baker pool. The cool-down period is activated when you decrease the delegated amount or stop delegation entirely.

.. dropdown:: Why is there a cool-down when I decrease / stop my delegation?

    The cool-down period is there to provide stability to the blockchain and to make sure that a baker does not become unstable too quickly if delegators withdraw their stake.

.. dropdown:: Can I change my restaking preference if I am in a cool-down period?

    Yes, you can change whether you want earnings restaked or not during a cool-down period.

.. dropdown:: Can I change the delegated amount if I am in a cool-down period?

    No, if you are in a cool-down period, you cannot change the delegated amount until the cool-down period ends. The cool-down period is two weeks.

.. dropdown:: I want to update my delegation amount, but the input is locked. Why is that?

    The amount is locked because you are in a cool-down period and the delegation amount cannot be changed. The cool-down period is two weeks when decreasing your delegation amount or stopping delegation.

.. dropdown:: Where can I see a list of all the baker pools I can delegate to?

    You can see a list of all pools and some performance metrics on `CCDScan`_.

.. dropdown:: How do I know whether a baker pool is good or bad? Where can I research baker performance and reliability?

    You can research baker performance and pool reliability on `CCDScan`_. For information about how to judge baker performance and reliability, see :ref:`Baker management<baker-pool>`.

.. dropdown:: What happens if a baker I delegate to closes the pool?

    If a baker closes their pool your delegation is moved to passive delegation.

.. dropdown:: I didn't receive a reward at pay day. Why is that?

    It could be because the baker to whose pool you have delegated stake was not selected to bake a block. There are several reasons this could have happened. It might be a good idea to check the baker's performance regularly.

.. dropdown:: What is “passive delegation”?

    For CCD holders who do not want to regularly check the performance of a chosen pool but just want a stable way of earning rewards, passive delegation offers a low-risk, low-reward alternative. This staking strategy is not associated with a specific baker, so there is no risk of poor baker health. The trade off when choosing passive delegation is that the rewards will be less than what you may receive when delegating to a specific baker pool.

    The commission rates for passive delegation are:

    - Baking commission: 12.00%
    - Finalization commission: 100.00%
    - Transaction commission: 12.00%

.. dropdown:: My account is suddenly delegating to passive delegation. Why is that?

    It is likely because the baker pool to which you were delegating has been closed. You can continue to delegate to passive delegation or select a new baker pool for your delegation.

.. dropdown:: If the baker pool I delegate to wins the lottery, what is the estimated amount of rewards I would receive in CCDs?

    The best tool to estimate rewards is `CCDScan`_. Look at the average past rewards for the baker pool or passive delegation. It is important to remember that small pools earn rewards less often, but relatively more at a time. So the percentage for the (annual) interest given on CCDScan is less reliable for small pools as there is more variance. Rewards from Passive delegation are added on a daily basis.

For bakers
----------

.. dropdown:: Can I open a pool on my existing baker node?

    Yes. See :ref:`Update a baker pool for Desktop Wallet<update-baker-pool-dw>` or :ref:`Update a baker pool for mobile wallets<update-pool-settings>` for instructions about how to set up a baker pool on an existing baker.

.. dropdown:: How do I activate a baker pool?

    All bakers come with pool support built in. You can actively choose to disable this feature upon creating your baker keys. See :ref:`Update a baker pool for Desktop Wallet<update-baker-pool-dw>` or :ref:`Update a baker pool for mobile wallets<update-pool-settings>` for instructions about how to set up a baker pool.

.. dropdown:: How often are rewards distributed to bakers?

    If your baker is chosen to bake the next block on the blockchain you will receive rewards for this. All rewards are distributed at :ref:`pay day<glossary-pay-day>` which is once every 24 hours. If your baker is also baking using CCDs delegated to it, the pool owner rewards from the delegated stake (if any) are also distributed each pay day.

.. dropdown:: What does it mean for a baker to accept delegators?

    To open a baker pool for delegators means that users who want to earn rewards but perhaps don't want to be a baker, can delegate some of their stake to a baker pool. By doing this, they give the baker the right to bake with their stake. When they delegate their stake to the baker this increases the baker’s stake and thus the odds of being selected to bake a block. This increase in rewards is then shared with the delegators.

.. dropdown:: Are there any limits to the size of a baker pool?

    Concordium blockchain imposes two caps on the amount of stake in a single pool:

    - A pool cannot have more than 10% of all staked CCD
    - The total stake of a pool cannot be more than 3x the size of the pool owners own stake

    The first limit ensures that the blockchain remains distributed and prevents the crash of one baker from affecting the whole system. A party with lots of capital is welcome to run multiple bakers to avoid this cap as in turn this would increase decentralization.

    The second cap is for security reasons as it prevents a party with a small stake from controlling too large a part of the system using leverage.

.. dropdown:: What happens when the maximum stake cap is reached for my baker?

    These two caps are soft caps in the sense that a pool can have more stake than allowed, but only the allowed amounts are taken into account in the consensus algorithm and when distributing rewards. A pool violating the amount limits will gradually receive less rewards per CCD in the pool as the size of the pool continues to increase.

.. dropdown:: How much less/more can I expect to earn when opening my pool to delegators?

    The amount you earn depends on how much stake your pool is baking. The more delegators, the more stake you have and the greater your chances of being selected to bake a block are. 10% of the additional rewards the delegators’ stake in your pool attracts will go to the pool owner. As you are able to have 2x your own stake delegated to your pool, you are effectively able to increase your rewards by 20% if your pool is full.

    Therefore, attracting delegators and managing your baker responsibly will maximize rewards for all. In :ref:`Baker management<baker-pool>` you'll find information about how to be a responsible baker.

.. dropdown:: Is there a cool-down period for bakers?

    Yes, the :ref:`cool-down<glossary-cool-down-period>` period for bakers is three weeks when reducing stake or stopping baking. The stake is locked during the cool-down period and cannot be changed. The stake continues to earn rewards until the end of the cool-down period. The cool-down period is there to provide stability to the blockchain.

.. dropdown:: Can I change my restaking preference if I am in a cool-down period?

    Yes, you can. Note that anything that is restaked during the cool-down period will be unstaked after the stake reduction takes effect.

.. dropdown:: How much does it cost to begin baking?

    There is no specific fee to begin baking, however, you do need to stake a minimum of 14,000 CCD, and you need to have enough CCD left in your disposable balance to cover transaction fees to register your baker keys on chain.

.. dropdown:: If I have a low amount of CCDs and become a baker, running my own node 24/7, is it true I may never win and may never receive any rewards because of my lottery power?

    No, that is not true. The lottery power will be calculated by the stake you have, and you will receive rewards.

For bakers, delegators and passive delegators
---------------------------------------------

.. dropdown:: What is better and where can I earn more rewards: by becoming a baker, delegating to a baker pool, or delegating to passive delegation? What is the difference in rewards comparing a baker and a delegator, based on X amount of CCDs?

    If you assume your baker is running 24/7 then all things being equal the rewards for running a baker will be higher than if you delegate to a baker pool, and the delgation to a pool will have higher rewards than Passive delegation. If you are a baker and at the same time other CCD holders delegate their stake to your baker pool, your rewards will be even higher.

    When evaluating your options looking at the rewards is not sufficient as you also need to consider the costs of running your own baker node and risk of potentially delegating to a node that, e.g., goes offline. Finally, it is worth considering that all rewards are based on a lottery that takes place to decide which baker wins the right to bake the next block. The probability of winning the lottery - disregarding how you stake your CCD - is proportional to the size of the stake. Because of the nature of the lottery mechanism, it is important to keep in mind that the variance in rewards in the short term will greatly deminish over time. For the smallest bakers it may take as much as a year for the rewards to align with the lottery power, whereas, very large bakers may see consistent rewards within less than a week. No matter what, over time, the fraction of times you win will be proportional to your fraction of stake.

    Delegation to a pool may provide more frequent rewards compared to becoming your own baker, albeit, the actual rewards over time can be expected to be smaller.

.. _CCDScan: https://ccdscan.io/
