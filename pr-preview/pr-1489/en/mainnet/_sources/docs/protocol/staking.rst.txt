.. include:: ../../variables.rst
.. _staking:

========
Staking
========

Concordium uses a :term:`proof-of-stake<proof-of-stake>` mechanism to ensure resource-efficient operation and enhanced security of the network. Unlike :term:`proof-of-work<proof-of-work>` where validators compete using computational power, proof-of-stake selects validators through a lottery system where the probability of being chosen is proportional to the amount of CCD staked.

If you hold CCD, you can participate in two ways: you can either become a :term:`validator` by staking CCD and running your own :term:`node`, or you can delegate your CCD to existing validators. When you delegate to a validator, you increase that validator's chance of winning the lottery to produce a :term:`block`, and you share in the rewards they receive.

To understand the technical process of block production and validation, see :ref:`baker-concept`.

For detailed information about how the reward system works, see :ref:`tokenomics`.

Become a validator
==================

As a validator, you run a node and must stake a minimum of 500,000 CCD, which becomes locked while you are an active validator. Validators have the highest potential for rewards, but also require technical knowledge to run and maintain a node.

You can choose to open a :term:`staking pool`, which allows others to delegate their CCD to you and increase your chances of being selected to produce blocks.

For more information, see :ref:`how-to-become-a-validator`.

Become a delegator
==================

If you prefer not to run a validator yourself, you can delegate your CCD to an existing validator's pool. This is a non-custodial solution: Your CCD remains under your control, but counts towards the validator's total stake.

You choose which validator to delegate to, and you share rewards based on your portion of the pool's total stake, minus the commission the validator takes.

I you do not want to regularly check the performance of your pool, but just want a safe way of earning interest, Concordium offers a low-risk low-reward alternative, :term:`passive delegation`. Instead of delegating to a specific validator, your delegated amount is distributed proportionally among all pools. In this way, it is not affected by the poor performance of a single validator, but you will earn less than by delegating to a reliable validator.

For more information, see :ref:`delegation-concept`.



.. toctree::
   :hidden:
   :maxdepth: 1

   how-to-become-a-validator
   concepts-delegation

