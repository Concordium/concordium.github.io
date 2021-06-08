
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

-  **Send GTU**: Send GTU to a recipient in your address book. See :ref:`Send GTU when only on co-signer is required <send-GTU-single-desktop>`

-  **Shield GTU**: Transfer GTU from your public balance to your shielded balance. See :ref:`Shield GTU on an account <shield-GTU-desktop>`

In addition, you can see the following information about the selected account:

-  **Account Total**: The total number of GTU on the account, which includes the GTU that is available and any staked GTU or shielded GTU. It also includes GTU that is scheduled to be released to your account on a future date. The **Balance** shows the GTU that are at your disposal and the amount of GTU that you've staked. The **Shielded balance** shows the amount of GTU that you've shielded. The **Balance** is visible to all participants on the Concordium Blockchain, while the **Shielded balance** is visible to you only.

-  **Transfers**: This is a list of the transfers on the account including transfers to other accounts, shielded transfers, and scheduled transfers. When you select a transfer, you'll see the sender and recipient address, the transaction hash, and the block hash. Both successful and failed transactions are listed.

-  **Identity data**: If you chose to reveal attributes, when you created the account, these attributes are visible here. If you created the account without revealing any attributes, there is no information here. Revealed attributes are visible to other participants on the chain.

If you select **More**, you'll see a variety of information about your account and a number of tasks you can perform:

-  **Account address**: Displays the account address. Select the icon to the right to copy the address if you want to share it with other participants in the network.

-  **Inspect release schedule**: Shows any future GTU releases that are scheduled to be released on your account.

-  **Send GTU with a schedule**: Send GTU according to a schedule. See :ref:`Create a single signer GTU transfer with a schedule <GTU-single-schedule-desktop>`.

- **Export transactions**: Export a file with a list of all transactions on the account. Select **Export transactions**, and then select **Export**. Save the fil as a .json file.

- **Transfer log filters**: Specify whether you want baker, block and finalization awards transfers to be visible in the **Transfers** list.

-  **Credential information**: Shows credentials that are associated with the account. This includes the credential ID, the creation date, and the valid to date.
