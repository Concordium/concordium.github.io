
.. _overview-desktop:

=========================
Set up the Desktop Wallet
=========================

The Concordium Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts, and to create transactions such as sending CCD, adding a baker, and exporting and importing account information.

The Desktop Wallet also supports storing of your private keys on a hardware device. Currently, the Ledger Nano S and Ledger Nano S Plus are supported.

This topic contains an overview of each task you need to complete to set up and start using the Desktop Wallet. The guide assumes that you'll be using the Desktop Wallet in combination with a Ledger device to generate and store keys and sign transactions.

Step 1: Set up the node
=======================

The Desktop Wallet must be connected to a running **trusted** node on the Concordium blockchain, so you'll have to run a node. The node enables the Desktop Wallet to interact with the Concordium blockchain to receive updates and submit transactions. You can run a node using :ref:`Windows<run-node-windows>`, :ref:`macOS <run-node-macos>`, and :ref:`with Docker <run-a-node>` or :ref:`a Debian package <run-node-ubuntu>` on Linux. You can also have a third-party provider run a node for you.

Step 2: Set up the Ledger device
================================

The Desktop Wallet requires that you store your keys on a Ledger device. This is to ensure that your private account keys are kept secure. To be able to use the Ledger device with the Desktop Wallet, you must install the Concordium Ledger App on the hardware wallet. See :ref:`Install the Ledger App guide<install-ledger-app>`.

Step 3: Set up the Concordium Desktop Wallet
============================================

You'll need to install and set up the Desktop Wallet to create and manage identities and accounts and add a baker.

.. Note::
    Without CCD you can't submit transactions on the Concordium blockchain. This includes creating multi-signature accounts and creating baker transactions. However, you can create identities, accounts that only require one signature, and you can add account addresses to your address book.

    You can buy CCD on many exchanges. If you are running on testnet, you can request CCD for testing using a button in the wallet.

To set up the Desktop Wallet:

#. Install the Desktop Wallet. For more information, see :ref:`Installation downloads <downloads>`.

#. Open the Desktop Wallet and create a password that contains at least 6 characters. Keep the password safe. You’ll need it to sign into the Desktop Wallet again.

#. In the Desktop Wallet go to **Settings** and then select **Node settings**.

#. The Virtual Hive node (concordiumwalletnode.com) is inserted by default, but you can change this to any other node that you prefer or the node provided by your third-party provider. Enter the **Address** and **Port** of the node you're running. The address is the network address of the node.

#. Select **Set connection**. If the connection is working properly, there's a message saying **Successfully connected**.

.. Warning::
    Currently, it is not possible to exchange identities and accounts between the Mobile Wallet and the Desktop Wallet. If you try to import a file that has been exported from the Mobile Wallet into the Desktop Wallet, the import will fail, and likewise, if you try to import a file exported from the Desktop Wallet into the Mobile Wallet.

Step 4: Set up an identity and an initial account
==================================================

Once you've installed the Desktop Wallet, you must set up an identity and an initial account. Concordium also recommends that you create a separate account to use as a baker account. See :ref:`Create an identity and an initial account in the Desktop Wallet <create-initial-account>` and :ref:`Create an account in the Desktop Wallet<create-account>`.

You're now ready to start using the Desktop Wallet.

.. toctree::
    :hidden:
    :maxdepth: 1

    ../desktop-wallet/install-ledger-app
