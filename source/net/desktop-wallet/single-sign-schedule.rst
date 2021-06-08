
.. _GTU-single-schedule-desktop:

===================================================
Create a single signer GTU transfer with a schedule
===================================================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

Send GTU with a schedule from an account
========================================

This topic describes how you can send GTU from an account with only one signer with a schedule. If you want to learn about sending GTU with a schedule when more co-signers are required, see :ref:`Create a scheduled multi-signature GTU transfer in the Desktop Wallet <create-multisig-scheduled>`.

You can create two types of release schedules: a regular interval
schedule and an explicit schedule.

-  Use a regular interval schedule to release an equal amount of GTU to
   a recipient at regular intervals.

-  Use an explicit schedule if you want the intervals between releases
   to be of different lengths, and if you want to be able to release
   different amounts of GTU to the recipient at each interval.

.. Note::
   You can divide a transfer into a maximum of 255 releases.

#. Go to **Accounts** and select the relevant account.

#. Select **More**, and then select **Send GTU with a schedule**

#. Enter the amount of GTU that you want to send. If the amount you want to transfer including the transfer fee exceeds the amount in your account, you’ll see a message saying **Insufficient funds**. This means that there's not enough GTU in the account and you’ll have to change the amount.

#. Select the recipient and select **Continue**.

Option 1: Create a regular interval schedule
--------------------------------------------

#.  Select **Regular interval** in **Schedule type**.

#.  Select the frequency with which you want the transfers to be released in **Release every**.

#.  Specify how many intervals you want to split the transfer into in **Split transfer in**.

#.  Specify the date and time you want the first transfer to take place in **Starting**.

#.  When the schedule is complete, select **Continue**. You can see the release schedule under **Transaction Details**.

#. There's a message saying **Waiting for device**. Connect the Ledger to the computer, and enter your PIN on Ledger.

#. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** and select **Submit**.

#. Review the transaction on the Ledger and verify that the information matches the **Transaction details** in the Desktop Wallet. Navigate to the right and verify the sender address is correct. Continue navigating to the right and verify that the recipient address is correct. When you see **Continue with transaction** press both buttons.

#. The Ledger says **Release time**. Navigate to the right. The Ledger says **Amount**, which is the amount of the release. Navigate to the right. The Ledger says **Continue with transaction**. Press both buttons to confirm. Continue with these steps for each release in the schedule.

#. When you've navigated through and verified the information for each release, the Ledger says **Sign transaction**. Press both buttons.

#. The Ledger says **Concordium is ready**. In the Desktop Wallet, you can now see the details of the transaction proposal and that it's been submitted to the chain. Select **Finish**.


Option 2: Create an explicit schedule
-------------------------------------

#. Select **Explicit schedule**. For each release you want in the schedule, you have to specify the amount and the release time.

#. Select **Add release to schedule** in **Releases**.

#. Enter the amount you want to transfer in this particular release in **Amount**.

#. Specify the date and time you want the transfer to take place in **Release time**.

#. Select **Add**.

#. Repeat the steps for each release you want to add to the schedule. The scheduled releases are listed in chronological order. You can't edit the individual releases, but you can delete a release by selecting the Trash bin next to it.

#. When the schedule is complete, select **Continue**. You can see the release schedule under **Transaction Details**, and you can generate the transaction.

#. There's a message saying **Waiting for device**. Connect the Ledger to the computer, enter your PIN on Ledger, and select **Submit** in the Desktop Wallet.

#. Review the transaction on the Ledger and verify that the information matches the **Transaction details** in the Desktop Wallet. Navigate to the right and verify the sender address is correct. Continue navigating to the right and verify that the recipient address is correct. When you see **Continue with transaction** press both buttons.

#. The Ledger says **Release time**. Navigate to the right. The Ledger says **Amount** and displays the amount of the release. Navigate to the right. The Ledger says **Continue with transaction**. Press both buttons to confirm. Continue with these steps for each release in the schedule.

#. When you've navigated through and verified the information for each release, the Ledger says **Sign transaction**. Press both buttons.

#. The Ledger says **Concordium is ready**. In the Desktop Wallet, you can now see the details of the transaction proposal and that it's been submitted to the chain. Select **Finish**.
