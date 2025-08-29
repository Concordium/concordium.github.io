.. include:: ../../variables.rst
.. _delegation-faq-old:

Delegation and validation FAQ
=============================

.. Note::

    **Changes from Protocol 6 to Protocol 7**

    - In P6, when you reduce or remove your stake, the effect of the change is delayed for the cooldown period.
      You can't make other changes to the stake while this change is pending. The stake is still active in this period and cannot be spent.
    - In P7, when you reduce or remove your stake, it immediately goes into an inactive cooldown state, where it cannot be spent,
      but won't count as active stake (e.g. for rewards). The stake in cooldown will be available to spend after the cooldown period elapses.


.. Note::

    **Changes from Protocol 7 to Protocol 8**

    In P8, the following changes were introduced:

    - Validators are automatically suspended if they do not produce blocks for a certain number of rounds.
    - The configure-validator transaction can suspend or resume a validator, including adding a validator in a suspended state.
    - Suspended validators are paused from participating in the consensus algorithm.

    For more information about validator suspension, see :ref:`Validator suspension<validator-suspension>`



For delegators
--------------

.. dropdown:: Do I risk losing my CCDs when delegating?

    When you delegate, the CCDs do not leave your wallet. They are locked there, so you can not spend them, and their value is added to the value of the staking pool or to :term:`passive delegation`. But the CCDs never leave your wallet, so they can never be lost. There is no more risk delegating than not delegating. The worst thing that can happen is that the staking pool stops producing blocks but stays open, and then you will not get any rewards. If the pool closes, your stake will be transferred to passive delegation automatically and from here you can easily stop delegation if you want to. It is important to use `CCDScan`_ to monitor validator and pool performance.

.. dropdown:: Can I delegate to more than one validator at a time?

    Yes. You can delegate to multiple validators but an account can only have one delegation. To delegate to multiple validators, you need multiple accounts.

.. dropdown:: How can I see what commission rates a staking pool has? And how can I be notified that a pool is changing commission rates?

    To see the commission rates in the pools, go to the Staking page on `CCDScan`_. You can sort the pools by commission rates. If you want to be notified about commission rate changes, sign up for the e-mail notification service on CCDScan (with more info to come once the service is built.)

    If you are unsatisfied with the commission in your current staking pool you can :ref:`move your stake to another pool or to passive delegation<update-delegation>`, or :ref:`stop the delegation<remove-delegation>`.

.. dropdown:: Can I move from one staking pool to another without having to wait for the next pay day?

    Changes to the pools take effect every 24 hours. So increasing the stake, moving the stake between pools or between :term:`passive delegation` and a staking pool all take effect at the next :term:`pay day`.

.. dropdown:: How much does it cost to begin delegating?

    There is no minimum amount required to delegate stake to a pool or enable :term:`passive delegation`. You just have to have enough CCD left in your disposable balance to cover transaction fees.

.. dropdown:: How much can I expect to earn as a delegator?

    This depends on how much you delegate, the staking pool you select, the delegation commissions set by the pool owner, and how reliable this validator is. It also depends on how much stake the validator has. It is important to use `CCDScan`_ to research validators before delegating stake.

    For example, suppose that you have a delegation to a pool where, to cover the costs of running the validator node, the pool owner has set that 10% of the delegators’ share of the pool rewards are awarded to the pool owner. Then suppose that a pool has 1,000,000 CCD staked and out of that you have delegated 10,000 CCD to the pool (1%). Suppose that in a 24 hour period this pool earns 500 CCD. Your delegation’s share of the rewards is 1% equal to 5 CCD. Of this amount 10% (0.5 CCD) is awarded to the pool owner and you receive the remaining 4.5 CCD.

.. dropdown:: If I delegate stake to a staking pool or passive delegation, can I use it for transactions?

    No, any stake that you delegate is not part of the disposable balance; it is locked and cannot be used for transactions or to pay transaction fees.

.. dropdown:: Is there a “cool-down” period when delegating and how does it work?

    If you decrease or remove delegations, the funds are not released to your account until after a :term:`cool-down<cool-down period>` period.
    The cool-down period is three weeks. The cool-down period is activated when you decrease the delegated amount or stop delegation entirely.

.. dropdown:: Why is there a cool-down when I decrease / stop my delegation?

    The :term:`cool-down<cool-down period>` period is there to provide stability to the blockchain and to make sure that a validator does not become unstable too quickly if delegators withdraw their stake.

.. dropdown:: Can I change my restaking preference if I am in a cool-down period?

    Yes, you can change whether you want earnings restaked or not during a :term:`cool-down<cool-down period>` period.

.. dropdown:: Can I change the delegated amount if I am in a cool-down period?

    Yes, you can.

.. dropdown:: Where can I see a list of all the staking pools I can delegate to?

    You can see a list of all pools and some performance metrics on `CCDScan`_.

.. dropdown:: How do I know whether a staking pool is good or bad? Where can I research validator performance and reliability?

    You can research validator performance and pool reliability on `CCDScan`_. For information about how to judge validator performance and reliability, see :ref:`validator management<baker-pool>`.

.. dropdown:: What happens if a validator I delegate to closes the pool?

    If a validator closes their pool your delegation is moved to :term:`passive delegation`.

.. dropdown:: I didn't receive a reward at pay day. Why is that?

    It could be because the validator to whose pool you have delegated stake was not selected to produce a block. There are several reasons this could have happened. It might be a good idea to check the validator's performance regularly.

.. dropdown:: What is “passive delegation”?

    For CCD holders who do not want to regularly check the performance of a chosen pool but just want a stable way of earning rewards, :term:`passive delegation` offers a low-risk, low-reward alternative. This staking strategy is not associated with a specific validator, so there is no risk of poor validator health. The trade off when choosing passive delegation is that the rewards will be less than what you may receive when delegating to a specific staking pool.

    The commission rates for passive delegation are:

    - Block commission: 25.00%
    - Transaction commission: 25.00%

.. dropdown:: My account is suddenly delegating to passive delegation. Why is that?

    It is because the staking pool to which you were delegating has been closed. You can continue to delegate to :term:`passive delegation` or select a new staking pool for your delegation.

.. dropdown:: If the staking pool I delegate to wins the lottery, what is the estimated amount of rewards I would receive in CCDs?

    The best tool to estimate rewards is `CCDScan`_. Look at the average past rewards for the staking pool or :term:`passive delegation`. It is important to remember that small pools earn rewards less often, but relatively more at a time. So the percentage for the (annual) interest given on CCDScan is less reliable for small pools as there is more variance. Rewards from Passive delegation are added on a daily basis.

.. dropdown:: Can I delegate funds in a release schedule?

    Yes, the funds locked in a release schedule can be staked.

.. dropdown:: What happens if the validator I'm delegating to is suspended?

   If a validator you've delegated to becomes suspended, you'll see a warning banner in your wallet stating "Your validator has been suspended".
   When a validator is suspended, both the validator and its delegators stop earning rewards.

   To maintain your earning potential, you may consider moving your delegation to another active validator or to passive delegation.

   To update your delegation from a suspended validator, follow the standard update process in your wallet: :ref:`Update delegation<update-delegation>`


For validators
--------------

.. dropdown:: Can I open a pool on my existing validator node?

    Yes. See :ref:`Update a staking pool<update-pool-settings>` for instructions about how to set up a staking pool on an existing validator.

.. dropdown:: How do I activate a staking pool?

    All validators come with pool support built in. You can actively choose to disable this feature upon creating your validator keys. See :ref:`Update a staking pool<update-pool-settings>` for instructions about how to set up a staking pool.

.. dropdown:: How often are rewards distributed to validators?

    If your validator is chosen to produce the next block on the blockchain you will receive rewards for this. All rewards are distributed at :term:`pay day` which is once every 24 hours. If your validator is also producing blocks using CCDs delegated to it, the pool owner rewards from the delegated stake (if any) are also distributed each pay day.

.. dropdown:: What does it mean for a validator to accept delegators?

    To open a staking pool for delegators means that users who want to earn rewards but perhaps don't want to be a validator, can delegate some of their stake to a staking pool. By doing this, they give the validator the right to produce blocks with their stake. When they delegate their stake to the validator this increases the validator's stake and thus the odds of being selected to produce a block. This increase in rewards is then shared with the delegators.

.. dropdown:: Are there any limits to the size of a staking pool?

    Concordium blockchain imposes two caps on the amount of stake in a single pool:

    - A pool cannot have more than 5% of all stake in pools (i.e., excluding passive delegation)
    - The total stake of a pool cannot be more than 6x the size of the pool owners own stake

    The first limit ensures that the blockchain remains distributed and prevents the crash of one validator from affecting the whole system. A party with lots of capital is welcome to run multiple validators to avoid this cap as in turn this would increase decentralization.

    The second cap is for security reasons as it prevents a party with a small stake from controlling too large a part of the system using leverage.

.. dropdown:: What happens when the maximum stake cap is reached for my validator?

    These two caps are soft caps in the sense that a pool can have more stake than allowed, but only the allowed amounts are taken into account in the consensus algorithm and when distributing rewards. A pool violating the amount limits will gradually receive less rewards per CCD in the pool as the size of the pool continues to increase.

.. dropdown:: How much less/more can I expect to earn when opening my pool to delegators?

    The amount you earn depends on how much stake your pool has. The more delegators, the more stake you have and the greater your chances of being selected to produce a block are. Additional rewards to you as the pool owner come from the commissions on the delegators’ stake in your pool. The leverage bound for the pool is 6x the validator's stake: 5x from delegators and 1x from the validator. So the exact amount you can earn depends on the commissions you set.

    Therefore, attracting delegators and managing your validator responsibly will maximize rewards for all. In :ref:`Validator management<baker-pool>` you'll find information about how to be a responsible validator.

.. dropdown:: How can I change the delegation commissions for my staking pool?

    You can change the commissions for your staking pool within the allowed limits in the |bw|, |cryptox|, and Desktop Wallet. See :ref:`update pool settings<update-pool-settings>` for information about how to do this for each type of wallet.

.. dropdown:: Is there a cool-down period for validators?

    If you decrease stake or remove validation, the funds are not released to your account until after a :term:`cool-down<cool-down period>` period.
    The cool-down period is three weeks. The cool-down period is activated when you decrease the staked amount or stop validation entirely.

.. dropdown:: Can I change my restaking preference if I am in a cool-down period?

    Yes, you can.

.. dropdown:: How much does it cost to become a validator?

    There is no specific fee to begin validation, however, you do need to stake a minimum of 500,000 CCD, and you need to have enough CCD left in your disposable balance to cover transaction fees to register your validator keys on chain.

.. dropdown:: If I have a low amount of CCDs and become a validator, running my own node 24/7, is it true I may never win and may never receive any rewards because of my lottery power?

    No, that is not true. The lottery power will be calculated by the stake you have, and you will receive rewards.

.. dropdown:: Can I use funds in a release schedule to meet the minimum required amount of CCDs to become a validator?

    Yes, the funds locked in a release schedule can be staked.

.. dropdown:: What is validator suspension and how does it affect my rewards?

   A validator can be suspended in two ways:

   * **Self-suspension**: You can manually suspend your validator, for example during planned node maintenance.
   * **Automatic suspension**: The protocol may suspend your validator if it fails to produce blocks a certain number of times when selected as a round leader.

   When your validator is suspended, regardless of the cause:

   * Your validator stops earning rewards
   * Delegators to your validator stop earning rewards
   * Both you and any delegators are notified about the suspension

   Your stake remains locked while suspended, but you won't earn any rewards until you resume validation. For more details, see :ref:`Validator suspension<validator-suspension>`.

   To learn how to suspend or unsuspend a validator, see :ref:`Suspend/Unsuspend a validator<suspend-unsuspend-validator>`.

.. dropdown:: How can I prevent my validator from being automatically suspended?

   To prevent automatic suspension, you need to ensure your validator node stays active and properly connected to the network. Here are some key preventative measures:

   * Maintain reliable infrastructure (stable internet connection and server uptime)
   * Keep your node software updated to the latest version
   * Ensure your node is correctly configured with your validator keys
   * Monitor your node's performance and set up alerts for potential issues
   * For planned maintenance lasting longer than a day, use self-suspension.

   High-stake validators may reach the suspension threshold within hours due to their frequent selection as round leaders, while low-stake validators may take several days to reach the threshold.

   If your validator becomes primed for suspension (indicated by a warning banner in your wallet stating "Your validation is primed for suspension"), you must demonstrate activity before the next snapshot epoch by either producing a block or having your signature included in a quorum certificate.

   If you need to perform maintenance on your node, it's recommended to use the self-suspension feature to avoid automatic suspension. You can manually suspend your validator, perform the maintenance, and then resume validation when your node is operational again.

   For instructions on how to suspend or unsuspend a validator, see :ref:`Suspend/Unsuspend a validator<suspend-unsuspend-validator>`.


For validators, delegators and passive delegators
-------------------------------------------------

.. dropdown:: What is better and where can I earn more rewards: by becoming a validator, delegating to a staking pool, or delegating to passive delegation? What is the difference in rewards comparing a validator and a delegator, based on X amount of CCDs?

    If you assume your validator is running 24/7 then all things being equal the rewards for running a validator will be higher than if you delegate to a staking pool, and the delegation to a pool will have higher rewards than :term:`passive delegation` if the selected pool has commission rates less than 25%. If you are a validator and at the same time other CCD holders delegate their stake to your staking pool, your rewards will be even higher.

    When evaluating your options looking at the rewards is not sufficient as you also need to consider the costs of running your own validator node and risk of potentially delegating to a node that, e.g., goes offline. Finally, it is worth considering that all rewards are based on a lottery that takes place to decide which validator wins the right to produce the next block. The probability of winning the lottery - disregarding how you stake your CCD - is proportional to the size of the stake. Because of the nature of the lottery mechanism, it is important to keep in mind that the variance in rewards in the short term will greatly deminish over time. For the smallest validators it may take as much as a year for the rewards to align with the lottery power, whereas, very large validators may see consistent rewards within less than a week. No matter what, over time, the fraction of times you win will be proportional to your fraction of stake.

    Delegation to a pool may provide more frequent rewards compared to becoming your own validator, albeit, the actual rewards over time can be expected to be smaller.

.. _CCDScan: https://ccdscan.io/
