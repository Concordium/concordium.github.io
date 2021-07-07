.. _send-shielded-amount:

========================
Make a shielded transfer
========================

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

#. Go to **Accounts**.

#. Select **Shielded balance** on the account you want to make the transfer from.

#. Select **Send**. In **Send shielded funds**, enter the amount of GTU that you want to send.

#. Select the recipient of the GTU, and then select **Continue**.

#. In the Desktop Wallet there’s a message saying **Waiting for device**. Connect the Ledger to your computer, and then enter your PIN code on the Ledger.

#. On the Ledger, there's a message saying **Concordium**. Press both buttons to open the **Concordium Ledger App**. On the Ledger, there's a message saying  **Concordium is ready**, and in the Desktop Wallet, there's a message saying **Ledger Nano S** is ready.

#. In the Desktop Wallet, select **Submit**. There’s a message saying **Waiting for the user to finish the process on the device**.

#. Press both buttons on the Ledger to confirm the following information: **Export PRF key**.

#. On the Ledger there's a message saying **Concordium is ready**, and then it says **Review transaction**. Using the right button, you now have to navigate through the following information to verify that it's correct and matches the transaction details in the Desktop Wallet:

   -  **Encrypted amount transfer**, which is the type of transaction. Because the amount is encrypted, the Ledger can't display the actual amount that's going to be transferred.

   -  **Sender**, which is the sender account.

   -  **Recipient**, which is the recipient account.

#. On the Ledger there's a message saying **Sign transaction**. Press both buttons to sign the transaction.

#. In the Desktop Wallet there’s a message saying **Transfer submitted**, which means that the transfer has been submitted to the chain.

#. Select **Finish**. The transfer is listed in the **Transfers** list.
