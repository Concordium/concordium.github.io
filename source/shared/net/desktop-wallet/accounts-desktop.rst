
.. _overview-account-desktop:

=====================
Overview of accounts
=====================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

Work with accounts in the Desktop Wallet
========================================

This topic describes the information and the tasks that are available on accounts in the Desktop Wallet. To learn more about creating accounts, see :ref:`Create an account in the  Desktop Wallet <create-account-desktop>`.

-  To view information about an account, go to **Accounts** and select the relevant account.

The most common tasks on an account are:

-  **Send**: Send GTU to a recipient in your address book. See :ref:`Create GTU transfer in the Desktop Wallet <send-GTU-single-desktop>`.

-  **Shield**: Transfer GTU from your public balance to your shielded balance. See :ref:`Shield GTU on an account <shield-GTU-desktop>`.

In addition, you can see the following information about the selected account:

-  The **Account Total** shows the total number of GTU on the account, which includes the GTU that is available and any staked GTU or shielded GTU. It also includes GTU that is scheduled to be released to your account on a future date.

-  The **Balance** shows the GTU that are at your disposal, the amount of GTU that you've staked, and any GTU that are locked in a release schedule. It does not include any shielded amounts.

-  The **At disposal** amount is the amount you can use for transactions, which excludes staked GTU and GTU in a release schedule.

-  The **Shielded balance** shows the amount of GTU that you've shielded. The **Balance** is visible to all participants on the Concordium Blockchain, while the **Shielded balance** is visible to you only.

   .. Note::
      Shielded transfers and Shielded balance is only available on accounts with a single credential. You can't make shielded transfers on multi-signature accounts.

-  **Latest transfers**: This is a list of the 10 latest transfers on the account including transfers to other accounts, shielded transfers, and scheduled transfers. When you select a transfer, you'll see the sender and recipient address, the transaction hash, and the block hash. Both successful and failed transactions are listed.

-  **Account address**: Select this to display the account address. Select the icon to the right to copy the address if you want to share it with other participants in the network.

Change view
-----------

When you select **Change view**, you'll see a variety of information about your account and a number of tasks you can perform:

-  **Transaction log**. View a list of transactions on the account. Use **Log filters** to specify which transaction types you want to be displayed in the **Transfers** list. See :ref:`Apply a transaction log filter <transaction-log>`.

-  **Send GTU with a schedule**: Send GTU according to a schedule. See :ref:`Transfer GTU with a schedule <GTU-single-schedule-desktop>`.

-  **Inspect release schedule**: Shows any future GTU releases that are scheduled to be released on your account.

- **Export account reports**: Export a file with a list of all transactions on the account. Set the relevant time period and filters, and then select **Make account report**. Save the export as a .csv file.

-  **Credentials and attribute information**: Here you can see all credential ID that are associated with the account and the attributes that are revealed for each credential ID (if any). You can also see the creation dates and valid to dates of the credentials. One or more credentials can be associated with the an account.

-  **Update credentials**: Add new credentials to the account. See :ref:`Add credentials to an account <multi-credentials>`.

-  **Add baker**: Make the account a baker account. See :ref:`See Add a baker account in the Desktop Wallet <create-baker-desktop>`
