.. _overview-settings:

=======================
Desktop Wallet settings
=======================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

The Desktop Wallet has a number of settings such as password and node settings that you access by going to the **Settings** page.

Preferences
===========
The Desktop Wallet provides a set of multi-signature transactions called Foundation transactions that only members of the Concordium Foundation can sign.

These transactions are disabled by default, and if you're not a member of the Concordium Foundation we strongly recommend that you don't enable them. If you do enable the transactions, they will be listed on the multi-signature transactions page. However, you'll not be able to actually sign or submit any of these transactions.

Node settings
=============
Here you specify which node on the blockchain that you want to connect to.

- If you're running the mainnet version of the Desktop Wallet, you must connect to a mainnet node. In the **Address field**, enter *127.0.0.1* and in the **Port field** enter *10000*.

- If you're running the testnet version of the Desktop Wallet, you must connect to a testnet node. In the **Address** field, enter *127.0.0.1* and in the **Port field** enter *10001*.

- Select **Set connection**. If the connection works, there's a message saying **Successfully connected**.

You can run a node using :ref:`Windows<run-node-windows>`, :ref:`macOS <run-node-macos>`, and :ref:`Docker <run-a-node>` or :ref:`Ubuntu <run-node-ubuntu>` for Linux.

Change wallet password
==========================

On the this page, you can update the existing password for the Desktop Wallet, providing that you remember the current password.

We strongly recommend that create a backup of your Desktop Wallet database to ensure that you can recover your accounts, identities, and addresses if, for example, you lose the password to the Desktop Wallet. For more information, see :ref:`Make a backup of identities, accounts, and addresses <export-import-desktop>`.

Recover existing accounts
=========================

If you lose your accounts, you can recover the accounts by using the Ledger device that you used to create the accounts. You only have to perform a recovery if you have lost the backup of your accounts and identities. For more information, see :ref:`Account recovery<account-recovery-desktop>`.

Terms and conditions
====================

If you want to view the latest version of the *License notices* and *Terms and conditions for the Desktop Wallet* do the following.

- On Windows, press **Alt** to display the menu bar, and then in the **Help** menu, choose the document you want to view.

- On macOS, select **Help** in the menu bar, and then choose the document you want to view.
