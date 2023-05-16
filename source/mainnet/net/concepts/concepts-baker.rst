.. include:: ../../variables.rst
.. _baker-concept:

======
Bakers
======

Baking is key to the Concordium blockchain. A :ref:`baker <baker-concept>` is a :ref:`node<glossary-node>` that participates in the network by :ref:`baking<glossary-baker>` (creating) new :ref:`blocks<glossary-block>` that are added to the chain. The blockchain consists of multiple :ref:`baker<glossary-baker>` nodes that maintain the blockchain by baking and :ref:`finalizing<glossary-finalization>` :ref:`blocks<glossary-block>`.

How baking works
================

A node is a baker node when it participates actively in the network by creating new blocks that are added to the chain. A :ref:`baker<glossary-baker>` collects, orders, and validates the :ref:`transactions<glossary-transaction>` that are included in a block to maintain the integrity of the blockchain. The bakers sign each block that they bake so that the block can be verified and executed by the rest of the participants of the network.

The chain a baker builds upon is the :ref:`best chain <glossary-best-chain>` when making a new block. The best chain is selected using :ref:`consensus protocol <glossary-consensus>`. In particular, the best chain has the most finalized blocks and the most blocks after the last finalized block.

Baker keys
----------
A node uses a set of :ref:`cryptographic keys<glossary-private-keys>` called baker keys to sign the blocks that it bakes. The baker keys are uniquely determined from the associated account. The baker keys are used for signing the block that the node bakes and for verifying whether the baker has won the :ref:`lottery <glossary-lottery-power>` as described below. To become a baker node, the node must be configured with a set of baker keys. You generate the baker keys in the wallet when you add a baker account. The baker node will start baking after the next :ref:`pay day<glossary-pay-day>` once the transaction has been approved.

Baker account
-------------

Each account can use a set of baker keys to register a baker. Whenever a baker bakes a valid block that gets included in the chain, a reward is paid to the baker's account (and the baker pool delegators if they have a pool) at :ref:`pay day<glossary-pay-day>`. The reward is derived from transaction fees paid for transactions included in the block and its predecessors, as well as from newly-minted CCDs.

The account can be viewed either in the Desktop Wallet, the |mw-gen2|, the |mw-gen1|, or the |bw| depending on where the account was created.

Rewards are added to the staked amount by default. However, you can choose to receive the rewards in the account balance instead of staking them automatically.

.. Note::

   It is not possible to have multi signature baker accounts in |mw-gen2| or |mw-gen1|. If you need this functionality, you need to run Desktop Wallet.

Baker pool
----------

You have the option when adding a baker to open a :ref:`baker pool<glossary-baker-pool>`. A baker pool allows others who want to earn rewards to do so without the need to run a node or become a baker themselves. To do this they :ref:`delegate<delegation-concept>` an amount of stake to your baker pool which then increases your stake and your :ref:`chances of winning the lottery<glossary-winning-probability>` to bake a block. You can also choose not to open a pool, in which case only your own stake applies toward the lottery. You can always open a pool later.

.. _concepts-baker-stake:

Stake and lottery
-----------------

A baker needs to :ref:`stake<glossary-staked-amount>` a part of its CCD balance on the baker account. Later, the baker can then manually release a part of or all of the staked amount. The staked amount cannot be moved or transferred until it's released by the baker.

.. note::

   If an account owns an amount that was transferred with a release schedule,
   the amount can be staked even if it hasn't been released yet.

To be chosen to bake a block, the baker must take part in a
*lottery*. The greater the baker's stake, the greater the baker's chance of :ref:`winning the lottery<glossary-lottery-power>` and being selected to bake a block.

The same stake is used when calculating whether a baker is included in the :ref:`finalization <glossary-finalization>` committee or not.

Time concepts
-------------
The Concordium blockchain divides time into :ref:`epochs <glossary-epoch>` and :ref:`slots <glossary-slot>`.

.. image:: ../images/concepts/epochs-slots.png
   :alt: timeline showing how 14400 slots make up one epoch

When considering the rewards and other baking-related concepts, the concept of an *epoch* is used as a unit of time that defines a period in which the set of current bakers and stakes are fixed. Epochs have a duration of 1 hour and the duration is fixed at the :ref:`Genesis block <glossary-genesis-block>`.

Epochs are subdivided into slots. On any given :ref:`branch <glossary-branch>`, each slot can have a maximum of one block, but multiple blocks on different branches can be produced in the same slot. Slots have a duration of 250ms, and the duration is fixed at the :ref:`Genesis block <glossary-genesis-block>`.

A :ref:`pay day<glossary-pay-day>` is the point at which new CCDs are minted and rewards to bakers and delegators are distributed. The stakes of bakers and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when updates to delegation and baking take effect, such as increasing stake, restaking preferences, adding delegation. In the case of decreasing stake or removing delegation or baking, there is a longer cool-down period, after which the change is executed at the **next pay day after the cool-down period ends**. The cool-down period is 2 weeks for delegators and 3 weeks for bakers. Pay day is every 24 hours at 08:05 UTC on Mainnet and 11:05 UTC on Testnet.

A :ref:`cool-down period <glossary-cool-down-period>` describes a period of time during which certain activities or transactions are frozen. For example, if you decrease a baker stake, the stake will be decreased at the first pay day after the cool-down period ends. The cool-down period is 3 weeks. During the cool-down period, you’ll not be able update the stake. After the cool-down period, the amount by which you decreased your stake is returned to your disposable balance at the next :ref:`pay day<glossary-pay-day>` and your stake is reduced to the amount you specified. (This also means that any rewards that are earned in this period, if restaking earnings is enabled, will also be unstaked after the cool-down.)

Finalization
============

:ref:`Finalization<glossary-finalization>` ensures that baked blocks become finalized as quickly as possible and with 100% certainty.

What is finalization?
---------------------

Finalization is the voting process by which a block is marked to be “finalized”, i.e., part of the authoritative chain. Transactions that are part of finalized blocks are considered authoritative. New blocks can be only added following the last finalized block to ensure the integrity of the chain. The finalization process is conducted periodically by the bakers with a staked amount of at least 0.1% of the total amount of existing CCD, known as the Finalization committee.
When a sufficiently large number of members of the committee have received the block and agree on its outcome, the block is finalized. Newer blocks must have the finalized block as an ancestor to ensure the integrity of the chain.

Finalization committee
----------------------

The finalization committee is formed by the bakers with a staked amount of at least 0.1% of the total amount of existing CCD. This specifically implies that in order to participate in the finalization committee you will probably have to modify the staked amount to reach the threshold.

Participating in the finalization committee produces rewards on each block that is finalized. The rewards are paid to the baker account some time after the block is finalized.

Overview of the baker process
=============================

Baking is possible with |mw-gen2|, |mw-gen1|, and Desktop Wallet, however the process differs between them. The overviews below give a brief description of the process.

.. Attention::

   Before proceeding, read :ref:`Baker management<baker-pool>` for information about best practices for bakers.

.. Note::

   To check the minimum required amount of CCD (currently 14000) to become a baker, see :ref:`consensus show-chain-parameters`.

Baking with Desktop Wallet
==========================

This overview describes the recommended scenario for running a node and becoming a baker on the Concordium blockchain, using Desktop Wallet in combination with a LEDGER device to generate baker keys.

.. dropdown:: Step 1: Set up the node

   The Desktop Wallet must be connected to a running node on the Concordium blockchain. You can run a node :ref:`on Windows<run-node-windows>`, :ref:`on macOS<run-node-macos>`, :ref:`on Ubuntu<run-node-ubuntu>` or using :ref:`Docker<run-a-node>`.

.. dropdown:: Step 2: Set up the LEDGER device

   The Desktop Wallet requires that you store your keys on a LEDGER device. This is to ensure that your private account keys are kept secure. To be able to use the LEDGER device with the Desktop Wallet, you must install the Concordium LEDGER App on the hardware wallet. See :ref:`Install the Ledger App guide<install-ledger-app>`.

.. dropdown:: Step 3: Set up the Concordium Desktop Wallet

   You'll need to install and set up the Desktop Wallet to create and manage identities and accounts and add a baker. See :ref:`Set up the Desktop Wallet<overview-desktop>`.

.. dropdown:: Step 4: Set up an identity and an initial account

   Once you've installed the Desktop Wallet, you must set up an identity and an initial account. You may want to create a separate account to use as a baker account, since the Identity Provider knows the user who submits the initial account to the chain. See :ref:`Create an identity and an initial account in the Desktop Wallet <create-initial-account>` and :ref:`Create an account in the Desktop Wallet<create-account>`.

.. dropdown:: Step 5: Add a baker in the Desktop Wallet

   You're now ready to add a baker in the Desktop Wallet and generate baker keys. This process varies depending on whether you need one or more signatures before you can submit the transaction to the chain. See :ref:`Add a baker account in the Desktop Wallet <add-baker-mw>`.

.. dropdown:: Step 6: Configure the node with the baker keys

   The last step is to configure the running node with the baker keys so the node can start baking. You can also choose to have a third-party node runner run a node for you if you do not want to run the node yourself; in this case you will need to provide your baker keys to the node runner in a secure manner.

   - :ref:`On Windows<baker-windows>`

   - :ref:`On macOS<baker-macos>`

   - :ref:`On Ubuntu<baker-Ubuntu>`

   - :ref:`On Docker/Linux<baking-docker>`.

For information about how to update your baker or stop baking, see :ref:`Change baker options<update-baker-mw>`.

Baking with |mw-gen1| and |mw-gen2|
===================================

This overview describes the recommended scenario for running a node and becoming a baker on the Concordium blockchain when using |mw-gen1| or |mw-gen2| and running a node.

.. dropdown:: Step 1: Set up the node

   For baking you must be running a node on the Concordium blockchain. You can run a node :ref:`on Windows<run-node-windows>`, :ref:`on macOS<run-node-macos>`, :ref:`on Ubuntu<run-node-ubuntu>` or using :ref:`Docker<run-a-node>`. You can also have a third-party run a node on your behalf.

.. dropdown:: Step 2: Set up the Wallet

   The |mw-gen1| is available for iOS and Android devices. |mw-gen2| is available for Android devices. For instructions about download and setup, see :ref:`setup-g2-mobile-wallet`.

.. dropdown:: Step 3: Set up an identity and initial account

   Once you've installed the Wallet, you must set up an identity and an account. If using |mw-gen1| it is recommended to create a separate account to use as a baker account. For instructions, see :ref:`create-initial-account` and :ref:`create-account`.

.. dropdown:: Step 4: Add baking to an account

   Configure baking for an account. For instructions, see :ref:`add-baker-mw`.

.. dropdown:: Step 5: Register baker keys

   The last step is to configure the running node with the baker keys so the node can start baking. You can also choose to have a third-party node runner run a node for you if you do not want to run the node yourself; in this case you will need to provide your baker keys to the node runner in a secure manner.

   - :ref:`On Windows<baker-windows>`

   - :ref:`On macOS<baker-macos>`

   - :ref:`On Ubuntu<baker-Ubuntu>`

   - :ref:`On Docker/Linux<baking-docker>`.

For information about how to update your baker or stop baking, see :ref:`Change baker options<update-baker-mw>`.

Next steps
==========

- Read the information about :ref:`baker management<baker-pool>`.
- If you are interested in a baker pool, read the :ref:`Delegation FAQ<delegation-faq>`.
- You need to :ref:`add a baker <add-baker-mw>` to the account you created. Import the baker keys to your node.
- You can then :ref:`update baker settings <update-baker-mw>` as needed to manage your baker.

.. toctree::
   :hidden:
   :maxdepth: 2

   ../guides/baker-pool
   ../mobile-wallet/add-baker-mw
   ../mobile-wallet/update-baker-mw
   ../guides/baker-windows
   ../nodes/baker-macos
   ../nodes/baker-ubuntu
   ../nodes/baker-docker
   ../guides/become-baker
