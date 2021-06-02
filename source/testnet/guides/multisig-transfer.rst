
.. _create-multisig-scheduled:

===========================================================
Create a multi-signature GTU transfer in the Desktop Wallet
===========================================================

.. contents::
   :local:
   :backlinks: none
   :depth: 1

Multi-signature GTU transfer
============================

A multi-signature transfer of GTU is a transaction that
requires two or more co-signers to sign with their private keys to
authorize the transaction. You can schedule the transaction in advance so
that a specific amount of GTU can be released on a specific date and at
a specific time in the future.

You can create two types of release schedules: a regular interval
schedule and an explicit schedule.

-  Use a regular interval schedule to release an equal amount of GTU to
   a recipient at regular intervals.

-  Use an explicit schedule if you want the intervals between releases
   to be of different lengths, and if you want to be able to release
   different amounts of GTU to the recipient at each interval.

Prerequisites
=============

-  Set up an :ref:`identity and an account <create-initial-account-desktop>`.

-  Set up a :ref:`Ledger Nano S hardware device identity <install-Ledger-app>`.

Make a transfer proposal
========================

#.  Go to **Multi Signature Transactions**, and then select **Make new proposal**. All available transactions are listed in the right pane.

#.  Select **Send GTU with a schedule**.

#.  Select the relevant proposer. You’ll see a list of all the identities that you’re the custodian of. When you select an identity, the **Transactions Details** in the left pane are updated with the identity information and the current transaction expiry time. You'll be able to change the expiry time later in this process. Use the scrollbar if you can't see all the information. Select **Continue**.

#. Select the relevant sender account from the list of available accounts, and then select **Continue**.

#.  In **Amount**, enter the amount of GTU you want to transfer. If the amount you want to transfer including the transfer fee exceeds the amount in your account, you’ll see a message saying **Insufficient funds**. This means that there's not enough GTU in the account and you’ll have to change the amount. Also, the amount must be greater than zero. In the **Transaction details** under **Amount**, you can see the estimated fee. Select **Continue**.

#.  Select the relevant recipient from the list. If there are many recipients in the list, you can use search to find the right recipient. Select **Continue**. You can now set up a release schedule.

Set the **Transaction expiry** time. You must submit proposals to the chain within the last 2 hours up to the expiry date. This means you must set the expiry time so that it’s possible for any co-signers to return their signatures in time. Select **Continue**.

Add a release schedule
======================

You’re now ready to create a release schedule where you can specify when you want the transfer to take place. You can choose between a regular interval schedule and an explicit schedule.

Option 1: Create a regular interval schedule
--------------------------------------------

#.  Select **Regular interval** in **Schedule type**.

#.  Select the frequency with which you want the transfers to be released in **Release every**.

#.  Specify how many intervals you want to split the transfer into in **Split transfer in**.

#.  Specify the date and time you want the first transfer to take place in **Starting**.

#.  When the schedule is complete, select **Continue**. You can now approve the transaction on the Ledger. You can see the release schedule under **Transaction Details.**

.. Note::
   You can divide a transfer into a maximum of 255 releases.

Option 2: Create an explicit schedule
-------------------------------------

#. Select **Explicit schedule**. For each release you want in the schedule, you have to specify the amount and the release time.

#. Select **Add release to schedule** in **Releases**.

#. Enter the amount you want to transfer in this release in **Amount**.

#. Specify the date and time you want the transfer to take place in **Release time**.

#. Select **Add**.

   Repeat the steps for each release you want to add to the schedule. The scheduled releases are listed in chronological order in the Desktop Wallet You can't edit the individual releases, but you can delete a release by selecting the Trash bin next to it.

#. When the schedule is complete, select **Continue**. You can see the release schedule under **Transaction Details**, and you can generate the transaction.

Generate the transaction
========================

There are two ways that you can generate the transaction:

-  :ref:`Generate the transaction without signing<generate-scheduled-without-sign>`. This option enables you to export the transaction proposal without signing it. You don't need a Ledger or an internet connection to do this.

-  :ref:`Generate and sign the transaction<generate-sign-scheduled>` This option requires a Ledger and an internet connection.

.. _generate-scheduled-without-sign:

Generate the transaction without signing
----------------------------------------

#. Verify that the **Transaction details** are as you are as you intended, and then select **I am sure that the proposed changes are correct**.

#.  Select **Generate without signing**. You can now :ref:`export the transaction proposal<export-scheduled-proposal>`.

.. _generate-sign-scheduled:

Generate and sign the transaction on the Ledger
-----------------------------------------------

#.  Connect the Ledger to the computer if you haven't done so already. There’s a message saying **Waiting for device**.

#. Enter your PIN code on the Ledger. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready**.

#. In the Desktop Wallet, verify that the Transaction details are as you intended, and then select **I am sure that the proposed changes are correct**.

#.  Select **Generate and sign**.

#. The Ledger says **Review Transaction**. Navigate to the right, till you see **Sender** and then an address. This is the address of the account you're transferring GTU from.

#. Continue navigating to the right. When you see **Continue with transaction** press both buttons.

#. The Ledger says **Release time**. Navigate to the right. The Ledger says **Amount**. Navigate to the right. The Ledger says **Continue with transaction**. Press both buttons to confirm. Continue with these steps for each release in the schedule.

#. When you've navigated through and verified the information for each release, the Ledger says **Sign transaction**. Press both buttons.

#. The Ledger says **Concordium is ready**. In the Desktop Wallet, you can now see the details of the transaction proposal including how many signatures that are required before you can submit the transaction to the chain.

.. _export-scheduled-proposal:

Export a transaction proposal
=============================

To propose a transaction to other co-signers, you have to share a file with them of the type JSON, which contains the transaction information.

#.  In the Desktop Wallet, select **Export transaction proposal**.

#.  Navigate to the location on your computer where you want to save the file. In **Save as type** make sure that **All Files** is selected. Give the file a name and the extension .json, and then click **Save**.

#.  Send a copy of the file through a secure channel to the co-signers that must sign the transaction. We recommend that you send a copy of the identicon through a secure channel that is different from the one used to send the file.

Receive signatures from co-signers
==================================

When the co-signers have signed the transaction, they return the signed transaction proposal to you, and you have to import the files into the Desktop Wallet before you can submit the transaction to the blockchain.

#.  If you're still on the proposal page, go to step 3. If you left the proposal page, go to **Multi-signature Transactions**, and then select **Your proposed transactions**.

#.  Select the transaction that you want to submit to the chain. You can see an overview of the transaction details and an overview of the signatures. You can also see that the status of the transaction is **Unsubmitted**, and you can see the identicon, and the transaction hash.

#.  Select **Browse to file** and then navigate to the location on your computer where you saved the signed transaction file. Select the relevant file, and then select **OK**. The file is uploaded to the Desktop Wallet and added to the list of signatures. Alternatively, you can drag and drop the signature files from their location on the computer and on to the Desktop Wallet.

Submit the transaction to the blockchain
========================================

When you have received and added all the required signatures, you can submit the transaction to the blockchain.

#. Review the transaction details carefully to ensure that all information is correct.

#. Select **I understand this is the final submission, and that it cannot be reverted.**

   - If you don't want to submit the transaction to the chain, you can select **Cancel proposal**. You're asked to verify that you want to close the proposal. The proposal is still visible in the list of proposals but it is no longer active.

#. Select **Submit transaction to chain.** The transaction is submitted to the chain and finalized on the Ledger.

#. Select **Finish** to leave the page.

.. Warning::
    Transactions on the blockchain are permanent. That is, they are irreversible and can't be deleted. Therefore, carefully review all information before you submit the transaction to the blockchain.
