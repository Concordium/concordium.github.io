.. _baker-concept:

======
Bakers
======

Baking is key to the Concordium blockchain. The blockchain consists of multiple baker nodes that maintain the blockchain by baking and finalizing blocks.

How baking works
================

A node is a baker node when it participates actively in the network by creating new blocks that are added to the chain. A baker collects, orders, and validates the transactions that are included in a block to maintain the integrity of the blockchain. The bakers sign each block that they bake so that the block can be verified and executed by the rest of the participants of the network.

Baker keys
----------
A node uses a set of cryptographic keys called baker keys to sign the blocks that it bakes. The baker keys are uniquely determined from the associated account. The baker keys are used for signing the block that the node bakes and  for verifying whether the baker has won the lottery as described below. To become a baker node, the node must be configured with a set of baker keys.

Baker account
-------------

Each account can use a set of baker keys to register a baker. Whenever a baker bakes a valid block that gets included in the chain, a reward is paid to the baker's account after some time. The baker account also receives an award after each epoch. The reward per block is determined by the contents of the block, and is usually lower than the reward that is paid after.

The account and can be viewed either in the Desktop Wallet or the Mobile Wallet depending on where the account was created.

Rewards are added to the staked amount by default. However, you can choose to receive the rewards in the account balance instead of staking them automatically.

.. _concepts-baker-stake:

Stake and lottery
-----------------

A baker needs to stake a part of its GTU balance on the baker account. Later, the baker can then manually release a part of or all of the staked amount. The staked amount cannot be moved or transferred until it's released by the baker.

.. note::

   If an account owns an amount that was transferred with a release schedule,
   the amount can be staked even if it hasn't been released yet.

To be chosen for baking a block, the baker must take part in a
*lottery*. The greater the stake the greater is the baker's chance of winning the lottery and being selected to bake a block.

The same stake is used when calculating whether a baker is included in the  :ref:`finalization <glossary-finalization>` committee or not.

Time concepts
----------------
The Concordium blockchain divides time into :ref:`epochs <glossary-epoch>` and :ref:`slots <glossary-slot>`.

When considering the rewards and other baking-related concepts, the concept of an *epoch* is used as a unit of time that defines a period in which the set of current bakers and stakes are fixed. Epochs have a duration of 1 hour and the duration is fixed at the Genesis block.

Epochs are subdivided into slots. On any given branch, each slot can have a maximum of one block, but multiple blocks on different branches can be produced in the same slot. Slots have a duration of 250ms, and the duration is fixed at the Genesis block.
