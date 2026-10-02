
.. _multi-credentials:

=============================
Add credentials to an account
=============================

Add more credentials on an account
==================================

This guide describes how you add more credentials to an account, and how you :ref:`change the signature threshold for transactions<guide-change-signature>` on the account. For more information about the process of sharing an account, see :ref:`Overview of shared accounts with multiple credentials <overview-shared-accounts>`.

Prerequisites
=============

-  Create the account that's going to hold more credentials and share the account address with the users whose credentials, you're going to add to the account.

-  Receive and save one or more files with the credentials that you want to associate with the account. For more information, see :ref:`Create a file with credentials <create-credentials-file>`.

:ref:`overview-shared-accounts` explains the steps involved to set up a multiple signature (shared) account.

Select an identity and an account
=================================
#. Go to the **Multi Signature Transactions** tab, select **Make new proposal**, and then select **Update account credentials**.

#. Select the account whose credentials you want to update. When you look at the **Transaction Details** in the left pane, you can see the current signature threshold and the current number of credentials associated with the account.

   If you only want to update the threshold, you can skip the next steps and go to :ref:`Change the signature Threshold <guide-change-signature>`.

#. To add the new credentials, select **Browse to file** in the right pane and then navigate to the location on your computer where you saved the file with the credentials. Select the file and select **Open**. Alternatively, you can drag and drop the file from its location on the computer and onto the Desktop Wallet. Verify that the key and the identicon match those of the new custodian. Optionally, you can specify who owns the key.

#. Select **Add Credential to proposal**, and then select **Continue**.

#. Set an **expiry date and time** for your proposal. You must set the expiry time so that it’s possible for any co-signers to return their signatures in time.

.. _guide-change-signature:

Change the signature threshold
==============================

You can either keep the current signature threshold as is or change it.

-  Enter the new signature threshold where it says **New Signature threshold** or keep the existing threshold, and then select **Continue**.

Generate the transaction
========================

There are two ways that you can generate the transaction:

Option 1: :ref:`Generate the transaction without signing<credentials-generate-without-sign>`.  This option enables you to export the transaction proposal without signing it. You don't need a LEDGER device, but you do need an internet connection.

Option 2: :ref:`Generate and sign the transaction<credentials-generate-sign>` This option requires a LEDGER device but no internet connection.

In combination, these two options enable organizations to distribute the responsibility of creating and signing transfers among more people. It makes it possible to have one employee create the proposals and another one sign the proposals. It also makes it possible to sign the transaction on the LEDGER device in a different location than were the proposal was created.

.. _credentials-generate-without-sign:

Option 1: Generate the transaction without signing
---------------------------------------------------

#. Verify that the Transaction details are as you are as you intended, and then select **I am sure that the proposed changes are correct**.

#.  Select **Generate without signing**. You can now :ref:`export the transaction proposal <credentials-export-transaction-proposal>`.

.. _credentials-generate-sign:

Option 2: Generate and sign the transaction on the LEDGER device
----------------------------------------------------------------

#.  Verify that the Transaction details are as you intended, and then select **I am sure that the proposed changes are correct**.

#.  Select **Generate and sign**.

#. Connect the LEDGER device to the computer if you haven't done so already. There’s a message saying **Waiting for device. Please connect your Ledger**.

#. Enter your PIN code on the LEDGER device. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Waiting for the user to finish the process on device**.

#. The LEDGER device says **Review transaction**. Navigate to the right to view **Sender** and the sender address. This is the address of the account whose credentials you’re updating.

#. Continue navigating to the right. When you see **Continue with transaction** press both buttons. The LEDGER device says **Public-key**, which is the public key of the first of the credentials you are adding to the account. Navigate to the right until you’ve reached the last section of the public key and press both buttons.

#. The LEDGER device says **Signature threshold** which is the number of signatures that’s currently required to make transactions with the account. Navigate to the right and verify that the following information is correct, and then press both buttons.

   -  *AR threshold*: this is the number of Privacy Guardians required to disclose an identity on the account.

   -  *Cred. sig. threshold*: this is the number of signatures required to sign transactions on the account.

#. Press both buttons to sign the transaction.

#. Repeat the above steps on the LEDGER device for each of the credentials you’ve added to the proposal.

#. The LEDGER device says **Threshold** again. This is the new threshold you’ve proposed for the account. Navigate to the right. The LEDGER device says **Review transaction**. When the LEDGER device says **Sign transaction**, press both buttons to confirm the transaction. The LEDGER device says **Concordium is ready**.

.. Note::
    If you want to decline the transaction, press the right button on the LEDGER device. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In The Desktop Wallet there's a message saying **The action was declined on the Ledger device. Please try again.**

.. _credentials-export-transaction-proposal:

Export the transaction proposal
================================

If you already have more than one credential on the account, it means that more than one signature is needed to sign the proposal. You must therefore share a file of the type JSON with the co-signers. In the **Signatures** pane, you can see how many signatures are required before you can submit the transaction to the blockchain. When you have the necessary number of signatures, you can generate and sign the transaction.

#.  In the Desktop Wallet, select **Export transaction proposal**.

#. Navigate to the location on your computer where you want to save the file. If you're on Windows, make sure that **Save as type** is set to **All Files**. Give the file a name and the extension .json, and then click **Save**.

#. Send a copy of the file through a secure channel to the co-signers that must sign the transaction. Likewise, send a copy of the identicon through a secure channel that is different from the one used to send the file.

Receive signatures from co-signers
==================================

When the co-signers have signed the transaction, they return the signed transaction proposal to you, and you have to import the files into the Desktop Wallet before you can submit the transaction to the chain.

#.  If you left the page with the account transaction, go to **Multi-signature Transactions**, and then select **Your proposed transactions**. If you're still on the same proposal page, you can go straight to step 3.

#. Select the transaction that you want to submit to the chain. You can see an overview of the transaction details and an overview of the signatures. You can also see that the status of the transaction is **Unsubmitted**, and you can see the identicon, and the transaction hash.

#. Select **Browse to file** and then navigate to the location on your computer where you saved the signed transaction files. Select the relevant files, and then select **OK**. The files are uploaded to the Desktop Wallet and added to the list of signatures. Alternatively, you can drag and drop the signature files from their location on the computer and on to the Desktop Wallet.

.. _credentials-submit-transaction:

Submit the transaction to the blockchain
========================================

When you have received and added all the required signatures, you can submit the transaction to the blockchain.

#. Review the transaction details carefully to ensure that all information is correct.

#. Select **I understand this is the final submission, and that it cannot be reverted.**

   - If you don't want to submit the transaction to the chain, you can select **Cancel proposal**. The proposal is no longer active. However, it is still visible in the list of proposals.

#. Select **Submit transaction to chain.** The transaction is submitted to the chain and finalized on the ledger.

#. Select **Finish** to leave the page.

.. Warning::
    Transactions on the blockchain are permanent. That is, they are irreversible and can't be deleted. Therefore, carefully review that all the transaction details are correct before submitting.
