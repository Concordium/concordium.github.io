.. include:: ../../variables.rst
.. _how-to-become-a-validator:

==========================
How to become a validator
==========================

Validators run nodes that produce and verify blocks on the Concordium blockchain. By becoming a validator, you participate directly in the :ref:`consensus mechanism<reference-consensus-mechanisms>` and earn rewards for your contribution to network security.

Prerequisites
=============

To become a validator you will need:

* **A Concordium account:** A Concordium wallet with an account that has sufficient CCD balance for the stake and transaction fees
* **A Minimum stake:** 500,000 CCD that will be locked while you validate
* **Validator keys:** Generated through your wallet to sign blocks
* **Technical infrastructure:** Reliable hardware and network connection to run a node 24/7/365
* **Ongoing commitment:** Capacity to monitor your validator, stay informed about network updates and protocol changes, and perform regular maintenance

Validation setup
================

The validation setup process involves several key steps: preparing your validator account, generating validator keys, configuring and running your node, and registering as a validator on the blockchain.
The specific steps and tools you use depend on your preferred setup method. Concordium provides guides for different approaches:

* **For wallet-based setup:** :ref:`See Validation with Concordium wallets<validation-with-wallets>`.
* **For command-line setup:** :ref:`See Validation with the Concordium Client<become-a-validator>`.

Choose the method that works best for your setup, and follow the corresponding guide for detailed instructions. Before proceeding with setup, review :ref:`Validator management<baker-pool>` for information about best practices for validators.

After registration, your validator becomes active at the next :term:`pay day`.

Opening a staking pool (optional)
==================================

You can choose to open a staking pool, which allows others to delegate their CCD to your validator. This increases your total stake and your chances of being selected to produce blocks. You earn commission on the rewards earned by your delegators.
For more information about how rewards and commissions work, see :ref:`Concordium tokenomics system<tokenomics>`.

You can open a pool during initial registration or add it later by updating your validator configuration. You will be guided to instructions about opening and managing a staking pool when following the setup guides above. For frequently asked questions about staking pools and delegation, see :ref:`Delegation and validation FAQ<delegation-faq-old>`.

Next steps
==========

Once your validator is active, focus on maintaining reliable uptime and monitoring your validator's performance. Follow the best practices outlined in :ref:`Validator management<baker-pool>` to ensure your validator operates effectively and maximizes rewards for you and your delegators.

Useful resources
================

The following guides and resources provide detailed information about validation:

* :ref:`Validation with Concordium wallets<validation-with-wallets>`: Step-by-step setup using wallets
* :ref:`Validation with the Concordium Client<become-a-validator>`: Step-by-step setup using Concordium's command line interface
* :ref:`Validator management<baker-pool>`: Best practices for running and managing your validator
* :ref:`Block production and validation<baker-concept>`: Technical details on how block production and validation work
* :ref:`Concordium tokenomics system<tokenomics>`: Information about rewards, commissions, and staking economics
* :ref:`Delegation and validation FAQ<delegation-faq-old>`: For answers to the most commonly asked questions
* :ref:`CCDScan<ccd-scan>`: Tool for monitoring validator and pool performance


