
.. _create-multisig-scheduled:

=================================================
Create a scheduled transfer in the Desktop Wallet
=================================================

Send CCD with a schedule
========================

This guide describes how you create a multi-signature transfer with a schedule. For information about multi-signature transfer without a schedule, see :ref:`Create a multi-signature CCD transfer in the Desktop Wallet <create-multisig>`.

Prerequisites
=============

- Set up an :ref:`identity and an initial account <create-initial-account>`.

- Set up a :ref:`LEDGER device <install-ledger>`

- Set up an :ref:`account with multiple credentials <multi-credentials>`

A multi-signature transfer of CCD is a transaction that
requires two or more co-signers to sign with their private keys to
authorize the transaction.

To plan a multi-signature transfer ahead of time and to split the transfer into multiple releases, you can create a release schedule. Using a schedule, you specify the total amount of CCD to transfer and then the specific dates and times for each CCD release. In other words, you create one transfer with multiple releases.

How a scheduled transfer works
==============================

When you submit the transaction to the chain, the following happens:

- The total amount of CCD is transferred from the sender account to the recipient account. This is one transaction with a single transaction hash.

- The amount becomes part of the recipient's account total but not of the recipient's disposable amount.

- Whenever a release takes place, the released amount becomes part of the recipient's disposable amount.

- In the list of transfers on the sender account and on the recipient account, the transfer is identified in parenthesis by **(With schedule)**. You can also view the schedule on the account when you go to **Change view** and then **Inspect release schedule**. For more information, see :ref:`Use Desktop Wallet <overview-account-desktop>`.

Release schedule types
======================

You can create two types of release schedules: a regular interval
schedule and an explicit schedule.

-  Use a :ref:`regular interval schedule <multisig-schedule-regular>` to release an equal amount of CCD to a recipient at regular intervals.

-  Use an :ref:`explicit schedule <multisig-schedule-explicit>` if you want the intervals between releases to be of different lengths, or if you want to be able to release different amounts of CCD to the recipient at each interval.

Make a transfer proposal
========================

#.  Go to **Multi Signature Transactions**, and then select **Make new proposal**. All available transactions are listed in the right pane.

#.  Select **Send CCD with a schedule**.

#. All multi-signature accounts are displayed. Select the relevant sender account from the list of available accounts, and then select **Continue**. If only one account is available, this account will be selected automatically. You'll be able to change the expiry time later in this process. Use the scrollbar if you can't see all the information. Select **Continue**.

#.  In **Amount**, enter the amount of CCD you want to transfer. If the amount you want to transfer including the transfer fee exceeds the amount in your account, you’ll see a message saying **Insufficient funds**. This means that there's not enough CCD in the account and you’ll have to change the amount. (The amount must also be greater than zero.) In the **Transaction details** under **Amount**, you can see the estimated fee.

#. Optionally, in **You can enter a memo here**, enter a **Memo** if you want to send a message to the recipient along with the transfer. Note that there's a fee associated with sending a memo and the fee depends on the size of the memo in bytes.

   .. Warning::
     Transaction memos are public, permanent and visible to everyone on the blockchain. Therefore, carefully review all information before you submit the memo to the blockchain.

#. Select **Continue**.

#.  Select the relevant recipient from the list. If there are many recipients in the list, you can use search to find the right recipient. Select **Continue**. You can now set up a release schedule.

#. Set the **Transaction expiry** time, leaving enough time for the co-signers to return their signatures in time. Select **Continue**.

Add a release schedule
======================

You can now create a release schedule and specify when you want the transfer to take place. You can choose between a regular interval schedule and an explicit schedule.

.. _multisig-schedule-regular:

Option 1: Create a regular interval schedule
--------------------------------------------

#.  Select **Regular interval** in **Schedule type**.

#.  Select the frequency with which you want the transfers to be released in **Release every**.

#.  Specify how many intervals you want to split the transfer into in **Split transfer in**.

.. Note::
   The maximum number of releases is 255.

4.  Specify the date and time you want the first transfer to take place in **Starting**.

#.  When the schedule is complete, select **Continue**.

#. Set the **Transaction expiry time**, leaving enough time for the co-signers to return their signatures in time, and then select **Continue**. You can see the release schedule under **Transaction Details**, and you can :ref:`generate the transaction <multisig-schedule-generate>`.

.. _multisig-schedule-explicit:

Option 2: Create an explicit schedule
-------------------------------------

#. Select **Explicit schedule**. For each release you want in the schedule, you have to specify the amount and the release time.

#. Select **Add release to schedule** in **Releases**.

#. Enter the amount you want to transfer in this release in **Amount**.

#. Specify the date and time you want the transfer to take place in **Release time**.

#. Select **Add**.

#. Select the **plus** icon and repeat the previous steps for each release you want to add to the schedule. The scheduled releases are listed in chronological order in the Desktop Wallet. You can't edit the individual releases, but you can delete a release by selecting the Trash bin next to it.

#. When the schedule is complete, select **Continue**.

#. Set the **Transaction expiry time**, leaving enough time for the co-signers to return their signatures in time, and then select **Continue**. You can see the release schedule under **Transaction Details**, and you can :ref:`generate the transaction <multisig-schedule-generate>`.

.. _multisig-schedule-generate:

Generate the transaction
========================

There are two ways that you can generate the transaction:

-  :ref:`Generate the transaction proposal without signing<generate-scheduled-without-sign>`. This option enables you to export the transaction proposal without signing it. You don't need a LEDGER device but you do need an internet connection.

-  :ref:`Generate and sign the transaction<generate-sign-scheduled>` This option requires a LEDGER device but no internet connection.

In combination, these two options enable organizations to distribute the responsibility of creating and signing transfers among more people. It makes it possible to have one employee create the proposals and another one sign the proposals.

.. _generate-scheduled-without-sign:

Generate the transaction proposal without signing
-------------------------------------------------

#. Verify that the **Transaction details** are as you are as you intended, and then select **I am sure that the proposed changes are correct**.

#.  Select **Generate without signing**. You can now :ref:`export the transaction proposal<export-scheduled-proposal>`.

.. _generate-sign-scheduled:

Generate and sign the transaction proposal on the LEDGER device
---------------------------------------------------------------

#. Connect the LEDGER device to the computer if you haven't done so already. There’s a message saying **Waiting for device. Please connect your Ledger**.

#. Enter your PIN code on the LEDGER device. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger device is ready**.

#. In the Desktop Wallet, verify that the **Transaction details** are as you intended, and then select **I am sure that the proposed changes are correct**. If you're not on the proposal page, go to **Multi Signature Transactions** -> **Your proposed transactions**, and then select the proposal you want to sign.

#. Select **Generate and sign**.

#. The LEDGER device says **Review Transaction**. Navigate to the right, till you see **Sender** and then an address. This is the address of the account you're transferring CCD from.

#. Continue navigating to the right. When you see **Continue with transaction** press both buttons.

#. The LEDGER device says **Release time**. Navigate to the right. The LEDGER device says **Amount**. Navigate to the right. The LEDGER device says **Continue with transaction**. Press both buttons to confirm. Continue with these steps for each release in the schedule.

#. When you've navigated through and verified the information for each release, the LEDGER device says **Sign transaction**. Press both buttons.

#. The LEDGER device says **Concordium is ready**. In the Desktop Wallet, you can now see the details of the transaction proposal including how many signatures that are required before you can submit the transaction to the chain.

.. _export-scheduled-proposal:

Export a transaction proposal
=============================

To propose a transaction to other co-signers, you have to share a file with them of the type JSON, which contains the transaction information.

#.  In the Desktop Wallet, select **Export transaction proposal**.

#.  Navigate to the location on your computer where you want to save the file. In **Save as type** make sure that **All Files** is selected. Give the file a name and the extension .json, and then click **Save**.

#.  Send a copy of the file through a secure channel to the co-signers that must sign the transaction. Concordium recommends that you send a copy of the identicon through a secure channel that is different from the one used to send the file.

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

   - If you don't want to submit the transaction to the chain, you can select **Cancel proposal**. You're asked to verify that you want to close the proposal. The proposal is still visible in the list of proposals, but it's no longer active.

#. Select **Submit transaction to chain.** The transaction is submitted to the chain. After a short while, the transaction is finalized on the chain and its status changes to **Finalized**.

#. Select **Finish** to leave the page.

.. Warning::
    Transactions on the blockchain are permanent. That is, they are irreversible and can't be deleted. Therefore, carefully review all information before you submit the transaction to the blockchain.
