.. include:: ../../variables.rst
.. _how-to-become-a-validator:

==========================
How to become a validator
==========================

Validators run nodes that produce and verify blocks on the Concordium blockchain. By becoming a validator, you participate directly in the consensus mechanism and earn rewards for your contribution to network security.

Prerequisites
=============

Before you can become a validator, you need:

* Minimum stake: 500,000 CCD that will be locked while you validate
* Technical infrastructure: Reliable hardware and network connection to run a node 24/7
* Concordium account: An account with sufficient CCD balance for the stake and transaction fees
* Validator keys: Generated through your wallet to sign blocks

Validation setup
================

Prepare your validator account
-------------------------------

Choose which account will be your validator account. This account will hold your staked CCD and receive your validation rewards. Make sure the account has at least 500,000 CCD available for staking, plus additional CCD for transaction fees.

Generate validator keys
-----------------------

Your validator keys are cryptographic keys used to sign the blocks you produce. Generate these keys through your wallet when setting up validation. Keep these keys secure - they are essential for your validator's operation.

Configure and run your node
----------------------------
Set up your validator node with the appropriate hardware and network configuration. Your node must run continuously to participate in block production. The configuration process depends on your chosen setup method.

Register as a validator
-----------------------

Submit a validator registration transaction to the blockchain. This transaction includes:

* Your validator account address
* The amount of CCD you want to stake (equity capital)
* Whether rewards should automatically be added to your stake
* Whether you want to open a staking pool for delegators

Once the transaction is approved, your validator will be registered.

When does validation start?
============================

After registration, your validator becomes active at the next pay day, which occurs every 24 hours at approximately 09:00 UTC on Mainnet. Your validator must be registered at least one hour before a pay day begins for validation to start at that pay day.

Opening a staking pool (optional)
==================================

You can choose to open a staking pool, which allows others to delegate their CCD to your validator. This increases your total stake and your chances of being selected to produce blocks. You earn commission on the rewards earned by your delegators.

You can open a pool during initial registration or add it later by updating your validator configuration.

Setup guides
============

For detailed step-by-step instructions on setting up your validator:

* **Validator management**: Best practices for running and managing your validator
* **Validation with Concordium wallets**: Setup using the Desktop Wallet or Mobile Wallet
* **Validation with the Concordium Client**: Setup using the command-line interface
* **Delegation and validation FAQ**: Answers to frequently asked questions

Next steps
==========

Once your validator is active:

* Monitor your validator's performance and uptime
* Consider subscribing to the Mainnet status page for updates
* If running a pool, create a website with information about your pool
* Regularly check your stake levels relative to the pool capital bounds

For ongoing validator management and best practices, see Validator management.

