.. _overview-baker:

.. contents::
   :local:
   :backlinks: none

================================
Overview of the baker process
================================

This overview describes the recommended scenario for running a node and becoming a baker on the Concordium blockchain. The guide assumes that you'll be using the Desktop Wallet in combination with a Ledger Nano S hardware wallet to generate baker key and that you'll be running the baker node on a server with Ubuntu.

Step 1: Set up the node
=======================

The Desktop Wallet must be connected to a running node on the Concordium blockchain, so you'll have to run a node using Ubuntu. See :ref:`Run a node on Ubuntu<run-node-ubuntu>`

Step 2: Set up the Ledger Nano S
================================

The Desktop Wallet requires that you store your keys on a Ledger Nanos S hardware wallet. This is to ensure that your private account keys are kept secure. To be able to use the Ledger Nano S with the Desktop Wallet, you must install the Concordium Ledger App on the hardware wallet. See :ref:`Install the Ledger App guide<install-ledger-app>`

Step 3: Set up the Concordium Desktop Wallet
============================================

You'll need to install and set up the Desktop Wallet to create and manage identities and accounts and add a baker. See :ref:`Get started with the Desktop Wallet<get-started-desktop>`.

Step 4: Set up an identity and an initial account
==================================================

Once you've installed the Desktop Wallet, you must set up an identity and an initial account. We also recommend that you create a separate account to use as a baker account. See :ref:`Create an identity and an initial account in the Desktop Wallet <create-initial-account-desktop>` and :ref:`Create an account in the Desktop Wallet<create-account-desktop>`.

Step 5: Add a baker in the Desktop Wallet
=========================================
You're now ready to add a baker in the Desktop Wallet and generate baker keys. This process varies depending on whether you need one or more signatures before you can submit the transaction to the chain. See :ref:`Add a baker account in the Desktop Wallet <create-baker-desktop>`. You can also change the number of signatures required on an account before a transaction can be submitted to the blockchain. See :ref:`Change the signature threshold <guide-change-signature>`

Step 6: Configure the node with the baker keys
==============================================

The last step is to configure the running node with the baker keys so the node
can start baking. See :ref:`Run a baker node on Ubuntu<baker-node-Ubuntu>`.
