.. _send-shielded-amount:

====================================
Send and receive a shielded transfer
====================================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

Prerequisites
=============

-  You must have a shielded amount of GTU on the account you want to make the shielded transfer from. See :ref:`Shield GTU on an account <shield-GTU-desktop>`.

.. Note::
   You can't make shielded transfers on multi-signature accounts.

Send a shielded amount of GTU
=============================

When you make a shielded transfer, the amount you transfer is only known to you and the recipient. However, on the blockchain, it's possible to see which accounts are involved in the transfer.

#. Go to **Accounts** and select the account you want to make the transfer from.

#. Select **Shielded balance** on the account.

#. Select **Send**. In **Send shielded funds**, enter the amount of GTU that you want to send.

#. Enter a **Memo** if you want to send a message to the recipient along with the shielded amount. Note that there's a fee associated with sending a memo and the fee depends on the size of the memo in bytes.

.. Warning::
    Transaction memos are public and visible on the blockchain, and they are permanent and can't be deleted. Therefore, carefully review all information before you submit the memo to the blockchain.

#. Select the recipient of the GTU, and then select **Continue**.

#. In the Desktop Wallet there’s a message saying **Waiting for device. Please connect your Ledger**. Connect the Ledger to your computer, and then enter your PIN code on the Ledger.

#. On the Ledger, there's a message saying Concordium. Press both buttons. The Ledger says **Concordium is ready**, and in the Desktop Wallet, there's a message saying **Ledger Nano S** is ready.

#. In the Desktop Wallet, select **Submit**. There’s a message saying **Waiting for the user to finish the process on the device**.

#. Press both buttons on the Ledger to confirm the decryption.

#. On the Ledger there's a message saying **Concordium is ready**, and then it says **Review transaction**. Using the right button, you now have to navigate through the following information to verify that it's correct and matches the transaction details in the Desktop Wallet:

   -  **Shielded transfer**: this is the type of transaction. Because the amount is encrypted, the Ledger can't display the actual amount that's going to be transferred.

   -  **Sender**: this is the sender account.

   -  **Recipient**: this is the recipient account.

#. On the Ledger there's a message saying **Sign transaction**. Press both buttons to sign the transaction.

#. In the Desktop Wallet there’s a message saying **Shielded transfer submitted**, which means that the transfer has been submitted to the chain.

#. Select **Finish**. The transfer is listed in the **Transfers** list.

Receive a shielded amount of GTU
================================

If you have received a shielded transfer, a shield icon is displayed next to the shielded balance. Before you can see the amount that you've received, you have to decrypt the shielded transaction.

Any shielded transfers that you've already decrypted are visible in the shielded balance.

#. Select the relevant account, and then select **Shielded balance**.

#. The Desktop Wallet says **Decrypt shielded balance** and **Waiting for device. Please connect your Ledger**. Connect the Ledger to your computer, and then enter your PIN code on the Ledger.

#. On the Ledger, there's a message saying **Concordium is ready**, and in the Desktop Wallet, there's a message saying **Ledger Nano S** is ready.

#. In the Desktop Wallet, select **Decrypt**.

#. On the Ledger, press both buttons to decrypt the amount. In the Desktop Wallet you can now see the amount that you decrypted.






