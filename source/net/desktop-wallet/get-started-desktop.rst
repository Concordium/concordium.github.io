.. _get-started-desktop:

====================================
Get started with the Desktop Wallet
====================================

The Concordium Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts, and to create transactions such as sending GTU, adding a baker, and exporting and importing account information.

The Desktop Wallet also supports storing of your private keys on a hardware wallet. Currently, only the Ledger Nano S is supported.

Prerequisites
=============

-  :ref:`Run a node <run-node-ubuntu>` on the Concordium blockchain. The node enables the Desktop Wallet to interact with the Concordium blockchain to receive updates and post transaction.

-  Set up a :ref:`Ledger Nano S hardware device and install the Concordium Ledger App <install-Ledger-app>`.

.. Note::
    Without GTU you can't submit transactions on the Concordium blockchain. This includes creating multi-signature accounts and creating baker transactions. However, you can create identities, accounts that only require one signature, and you can add account addresses to your address book.

Set up the Desktop Wallet
=========================

#. Install the Desktop Wallet. For more information, see :ref:`Installation downloads <downloads>`.

#. Open the Desktop Wallet and create a password that contains at least 6 characters. Keep the password safe. You’ll need it to sign into the Desktop Wallet again.

1. In the Desktop Wallet go to **Settings**, select **Multi signature settings**, and then select **Node settings**.

#. Enter the **Address** and **Port** of the node you're running. The address is the network address of the node.

#. Select **Set connection**. If the connection is working properly, there's a message saying **Successfully connected**.

The next step is to :ref:`set up an initial account and an identity <create-initial-account-desktop>`.

.. Warning::
    Currently, it is not possible to exchange identities and accounts between the Mobile Wallet and the Desktop Wallet. If you try to import a file that has been exported from the Mobile Wallet into the Desktop Wallet, the import will fail, and likewise, if you try to import a file exported from the Desktop Wallet into the Mobile Wallet.
