
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

-  **Send**: Send CCD to a recipient in your address book. See :ref:`Create CCD transfer in the Desktop Wallet <send-CCD-single-desktop>`.

-  **Shield**: Transfer CCD from your public balance to your shielded balance. See :ref:`Shield CCD on an account <shield-CCD-desktop>`.

In addition, you can see the following information about the selected account:

-  The **Account Total** shows the total number of CCD on the account, which includes the CCD that is available and any staked CCD or shielded CCD. It also includes CCD that is scheduled to be released to your account on a future date.

-  The **Balance** shows the CCD that are at your disposal, the amount of CCD that you've staked, and any CCD that are locked in a release schedule. It does not include any shielded amounts.

-  The **At disposal** amount is the amount you can use for transactions, which excludes staked CCD and CCD in a release schedule.

-  The **Shielded balance** shows the amount of CCD that you've shielded. The **Balance** is visible to all participants on the Concordium Blockchain, while the **Shielded balance** is visible to you only.

   .. Note::
      Shielded transfers and Shielded balance is only available on accounts with a single credential. You can't make or receive shielded transfers on multi-signature accounts.

-  **Latest transactions**: This is a list of the 10 latest transactions on the account including transfers to other accounts, shielded transfers, and scheduled transfers. When you select a transfer, you'll see the sender and recipient address, the transaction hash, and the block hash. Both successful and failed transactions are listed. If you have any log filters on the account, they are also applied here.

-  **Account address**: Select this to display the account address. Select the icon to the right to copy the address if you want to share it with other participants in the network.

Change view
-----------

When you select **Change view**, you'll see a variety of information about your account and a number of tasks you can perform:

-  **Transaction log**. View a list of transactions on the account. Use **Log filters** to specify which transaction types you want to be displayed in the **Transfers** list. See :ref:`Apply a transaction log filter <transaction-log>`.

-  **Send CCD with a schedule**: Send CCD according to a schedule. See :ref:`Transfer CCD with a schedule <CCD-single-schedule-desktop>`.

-  **Inspect release schedule**: Shows any future CCD releases that are scheduled to be released on your account.

- **Export account reports**: Export a file with a list of all transactions on the account. Set the relevant time period and filters, and then select **Make account report**. Save the export as a .csv file.

-  **Credentials and attribute information**: Here you can see all credential ID that are associated with the account and the attributes that are revealed for each credential ID (if any). You can also see the creation dates and valid to dates of the credentials. One or more credentials can be associated with the an account.

-  **Update credentials**: Add new credentials to the account. See :ref:`Add credentials to an account <multi-credentials>`.

-  **Add baker**: Make the account a baker account. See :ref:`See Add a baker account in the Desktop Wallet <create-baker-desktop>`. If the account is already a baker account, you'll see a list of options for managing a baker account: :ref:`Remove baker <remove-baker>`, :ref:`Update baker keys<update-baker-keys>`, :ref:`Update baker stake<change-baker-stake>`, and :ref:`Update baker restake earnings<change-restake-settings>`.
