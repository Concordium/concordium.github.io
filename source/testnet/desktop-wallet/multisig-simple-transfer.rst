

.. _create-multisig:

=====================================================================
Create a multi-signature GTU transfer in the Desktop Wallet
=====================================================================

.. contents::
   :local:
   :backlinks: none
   :depth: 1

Multi-signature GTU transfer
============================

A multi-signature transfer of GTU is a transaction that
requires two or more co-signers to sign with their private keys to
authorize the transaction.

Prerequisites
=============

-  Set up an :ref:`identity and an account <create-initial-account-desktop>`.

-  Set up a :ref:`Ledger Nano S hardware device identity <install-Ledger-app>`.

Make a transfer proposal
========================

#.  Go to **Multi Signature Transactions**, and then select **Make new proposal**. All available transactions are listed in the right pane.

#.  Select **Send GTU**.

#.  Select the relevant proposer. You’ll see a list of all the identities that you’re the custodian of. When you select an identity, the **Transactions Details** in the left pane are updated with the identity information and the current transaction expiry time. You'll be able to change the expiry time later in this process. Use the scrollbar if you can't see all the information. Select **Continue**.

#. Select the relevant sender account from the list of available accounts, and then select **Continue**.

#.  In **Amount**, enter the amount of GTU you want to transfer. If the amount you want to transfer including the transfer fee exceeds the amount in your account, you’ll see a message saying **Insufficient funds**. This means that there's not enough GTU in the account and you’ll have to change the amount. Also, the amount must be greater than zero. In the **Transaction details** under **Amount**, you can see the estimated fee. Select **Continue**.

#.  Select the relevant recipient from the list. If there are many recipients in the list, you can use search to find the right recipient. Select **Continue**.

#. Set the **Transaction expiry** time and then select **Continue**.

.. Note::
   You must submit proposals to the chain within the last 2 hours up to the expiry date, so take this into consideration, when you set the expiry time. It's important that you leave enough time for the co-signers to return their signatures in time.

Generate the transaction
========================

There are two ways that you can generate the transaction:

-  :ref:`Generate the transaction proposal without signing<generate-transfer-without-sign>`. This option enables you to export the transaction proposal without signing it. You don't need a Ledger, but you do need an internet connection.

-  :ref:`Generate and sign the transaction<generate-sign-transfer>` This option requires a Ledger but no internet connection.

In combination, these two options enable organizations to distribute the responsibility of creating and signing transfers among more people. It makes it possible to have one employee create the proposals and another one sign the proposals.

.. _generate-transfer-without-sign:

Generate the transaction proposal without signing
-------------------------------------------------

#. Verify that the **Transaction details** are as you are as you intended, and then select **I am sure that the proposed changes are correct**.

#.  Select **Generate without signing**. You can now :ref:`export the transaction proposal<export-scheduled-proposal>`.

.. _generate-sign-transfer:

Generate and sign the transaction proposal on the Ledger
--------------------------------------------------------

#.  Connect the Ledger to the computer if you haven't done so already. There’s a message saying **Waiting for device**.

#. Enter your PIN code on the Ledger. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready**.

#. In the Desktop Wallet, verify that the **Transaction details** are as you intended, and then select **I am sure that the proposed changes are correct**. (If you're not on the proposal page, go to **Multi Signature Transactions** -> **Your proposed transactions**, and then select the proposal you want to sign.)

#.  Select **Generate and sign**.

#. The Ledger says **Review Transaction**. Navigate to the right, till you see **Sender** and then an address. This is the address of the account you're transferring GTU from.

#. Continue navigating to the right. The Ledger shows the **Amount** you're going to transfer. Navigate to the right. The Ledger says **Recipient** and shows the recipient's address.

#. When you've navigated through and verified that the information is correct, the Ledger says **Sign transaction**. Press both buttons.

#. The Ledger says **Concordium is ready**. In the Desktop Wallet, you can now see the details of the transaction proposal including how many signatures that are required before you can submit the transaction to the chain.

.. _export-transfer-proposal:

Export a transaction proposal
=============================

To propose a transaction to other co-signers, you have to share a file with them of the type JSON, which contains the transaction information.

#.  In the Desktop Wallet, select **Export transaction proposal**.

#.  Navigate to the location on your computer where you want to save the file. In **Save as type** make sure that **All Files** is selected. Give the file a name and the extension .json, and then click **Save**.

#.  Send a copy of the file through a secure channel to the co-signers that must sign the transaction. We recommend that you send a copy of the identicon through a secure channel that is different from the one used to send the file.

#. To print a copy of the proposal, select the printer icon in the upper-right corner, select Print to PDF, and then navigate to the place on your computer where you want to save the PDF.

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
