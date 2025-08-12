.. include:: ../../variables.rst

.. _reference-tokenomics:

============================
Concordium tokenomics system
============================

CCD
===
CCD is the native token on the Concordium Platform. CCD can be used for a variety of purposes, including for smart contracts execution fees, transfers between users, and for commercial transactions. 10 billion CCD have been created in the genesis block. After this, the only mechanism to create more CCD is the minting process. The number of CCD that exists on the platform at any time is defined and publicly known. It can be found on `CCDscan <https://ccdscan.io/>`_.

CCD are minted daily at a rate of 4% growth annually, with the goal of reaching 2% in the long term. These are distributed as rewards to validators and delegators. The mint rate will decrease when the number of transactions increases, assuring that the validators receive adequate rewards.

Transactions
============
To submit a transaction to the blockchain, a fee must be paid in CCD. The price of transactions is fixed in EUR, not in CCD. This means that they are not subject to the fluctuations of CCD. Businesses can thus plan the cost of their operations.

The cost of a basic CCD transfer is set at 0.01 EUR. The costs of more complex operations such as smart contract calls depend on a variety of parameters, including the computational complexity of the operation and the amount of data handled.

Validators
==========
Validators are the heart of a decentralized blockchain. Their role is to order the transactions submitted to the chain by grouping them into blocks and adding new blocks at the end of the chain.

In order to become a validator, a user has to stake at least 500,000 CCD, which is then locked in their wallet. They can then run the required software and have a probability of creating blocks and receiving rewards which is proportional to their relative stake. If they decide to shut down their validator, the stake is unlocked after a cool-down period.

Staking pools
=============
Validators can decide to open a pool. The stake in a pool consists of the stake of the validator and any stake added by delegators. The validator can choose whether the pool is open to all delegators, closed to new delegators (but the existing ones can stay), or closed to all delegators (existing delegators are removed). Furthermore, the validator can choose the commission that their delegators pay to them. These parameters can be changed by the validator at any time.

The probability of a validator winning the lottery to create the next block is proportional to their relative pool size. The rewards earned for creating the block are distributed to all users with stake in the pool as described in the rewards section below.

The sizes of pools are limited in the following ways. Firstly, the stake in a pool is capped at 5% of all staked CCD. The purpose of this bound is to foster decentralization and avoid a too large fraction of stake going offline if a machine fails or the software is updated. If this limit is exceeded, then only 5% counts towards the lottery power and rewards. If a user wishes to stake more than this amount, they can run a second validator with a different pool. To improve the stability of the system, the second validator should be run on a different machine in a different location.

The second bound on pool sizes states that the total stake in a pool can be at most 6 times the stake of the validator. Here too, any stake exceeding this amount will not be counted towards the lottery power and rewards. The purpose of this bound is to preserve the fundamental principle of proof-of-stake, namely that the probability of creating a block should be related to the stake of the validator. The assumption that at least a given threshold (e.g., 2/3) of the stake is controlled by honest people is justified by them having their own money in the game. If there is no bound on how much can be delegated, then a validator could be controlling only other people’s funds and the incentive to behave honestly is weaker.

Delegators
==========
Users that do not wish to run validators have the option of delegating CCD to validators and profiting from some of the rewards. A delegator has two options: delegating to a specific validator’s pool or choosing passive delegation.

Delegating to a pool has been mentioned in the section above: a delegator adds their stake to the pool of a validator, increasing this validator’s probability of adding new blocks to the chain and earning rewards. These rewards are then shared with all pool members. Each staker in the pool gets a share proportional to their stake, minus the delegation commission that is given to the validator.

Passive delegation
------------------
Passive delegation is an innovation of Concordium. It provides rewards to the delegator equivalent to what one would get if one were to split one’s stake amongst all pools proportionally to the pools’ stake, but with a fixed commission of 25% that is shared amongst all pools.

By choosing passive delegation, the return will be the average rewards over all pools (minus the fixed passive commission), which mitigates the risk of picking a validator that performs poorly or goes offline. This security comes at an increased cost: a delegator to a pool can choose one with a commission below 25%. More details are provided in the rewards section.

Rewards
=======
The reward distribution explained in this section is illustrated in the figure at the top of page 2. Rewards are computed and distributed once a day. This currently takes place around 9:00 UTC. The period between two payouts is called a pay day.





