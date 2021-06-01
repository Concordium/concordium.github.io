.. _get-started-desktop:

.. contents::
    :local:
    :backlinks: none
    :depth: 2

====================================
Get started with the Desktop Wallet
====================================

The Concordium Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts, and to create transactions such as sending GTU, adding a baker, and exporting and importing account information.

The Desktop Wallet also supports storing of your private keys on a hardware wallet. Currently, only the Ledger Nano S is supported.

Prerequisites
=============

-  :ref:`Run a node <run-node-ubuntu>` on the Concordium blockchain.

-  Set up a :ref:`Ledger Nano S hardware wallet and install the Concordium Ledger App <install-Ledger-app>`.

Set up the Desktop Wallet
=========================

#. Install the Desktop Wallet. For more information, see :ref:`Installation downloads <downloads>`.

#. Open the Desktop Wallet and create a password that contains at least 6 characters. Keep the password safe. You’ll need it to sign into the Desktop Wallet again.

.. Warning::

    If you lose the password to the Desktop Wallet, you can’t reset or restore it, and you’ll lose access to your accounts, ID’s and address. It’s therefore essential that you use **Export** to create a backup. If you lose  the password, you’ll then be able to import the backup file and restore your accounts, IDs. and addresses.

3. In the Desktop Wallet go to **Settings**, select **Multi signature settings**, and then select **Node settings**.

#. Enter the **Address** and **Port** of the node you're running.

The next step is to :ref:`set up an initial account and an identity <create-initial-account-desktop>`.

.. Note::
    Currently, you can't import or export private keys from the Ledger hardware wallet. As a result, you can't import identities or accounts created on the Concordium Mobile Wallet into the Desktop Wallet, and you can't export identities and accounts from the Desktop Wallet into the Mobile Wallet.
