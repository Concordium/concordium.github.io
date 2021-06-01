
.. _multi-credentials:

=============================
Add credentials to an account
=============================

.. contents::
   :local:
   :backlinks: none
   :depth: 1

Prerequisites
=============
-  A JSON file with the credentials that you want to associate with the account.

Update credentials on an account
================================
Sometimes organizations need to add multiple credentials to a single account to enable more than one person to manage the account. Likewise, organizations might also have to :ref:`change the signature threshold <guide-change-signature>` that controls the number of signatures that are needed before a transaction can be submitted to the blockchain. This guide describes how you add more credentials to an account and change the signature threshold for transactions related to the account.

Select an identity and an account
=================================
#. Go to the **Multi Signature Transactions** tab, select **Make new proposal**, and then select **Update account credentials**.

#. Select the identity that's associated with the account whose credentials you want to update, and then select **Continue**.

#. Select the account whose credentials you want to update. When you look at the **Transaction Details** in the left pane, you can see the current signature threshold and the current number of credentials associated with the account. Select **Continue**.

   If you only want to update the threshold, you can skip the next steps and go to :ref:`Change the signature Threshold <guide-change-signature>`.

#. To add the new credentials, select **Browse to file** in the right pane and then navigate to the location on your computer where you saved the file with the credentials. Select the file and select **Continue**. Alternatively, you can drag and drop the file from its location on the computer and onto the Desktop Wallet. We recommend that you double check the identicon to make sure you are adding the right person’s credentials to the account.

#. Set an **expiry date and time** for your proposal. You must submit proposals to the chain within the last 2 hours up to the expiry date. This means you must set the expiry time so that it’s possible for any co-signers to return their signatures in time.

.. _guide-change-signature:

Change the signature threshold
==============================

You can either keep the current signature threshold as is or change it.

-  Enter the new signature threshold where it says **New Signature threshold** or keep the existing threshold, and then select **Continue**.

Generate the transaction
========================

There are two ways that you can generate the transaction:

Option 1: :ref:`Generate the transaction without signing<credentials-generate-without-sign>`. This option enables you to export the transaction proposal without signing it. You don't need a Ledger or an internet connection to do this.

Option 2: :ref:`Generate and sign the transaction<credentials-generate-sign>` This option requires a Ledger and an internet connection.

.. _credentials-generate-without-sign:

Option 1: Generate the transaction without signing
---------------------------------------------------

#. Verify that the Transaction details are as you are as you intended, and then select **I am sure that the proposed changes are correct**.

#.  Select **Generate without signing**. You can now :ref:`export the transaction proposal <credentials-export-transaction-proposal>`.

.. _credentials-generate-sign:

Option 2: Generate and sign the transaction on the Ledger
---------------------------------------------------------

#.  Verify that the Transaction details are as you intended, and then select **I am sure that the proposed changes are correct**.

#.  Select **Generate and sign**.

#. Connect the Ledger to the computer if you haven't done so already. There’s a message saying **Waiting for device**.

#. Enter your PIN code on the Ledger. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready**.

#. The Ledger says **Review Transaction**. Navigate to the right, till you see **Sender** and then an address. This is the address of the account whose credentials you’re updating.

#. Continue navigating to the right. When you see **Continue with transaction** press both buttons. The Ledger says **Public-key**, which is the public key of the first of the credentials you are adding to the account. Navigate to the right until you’ve reached the last section of the public key and press both buttons.

#. The Ledger says **Sig threshold** which is the number of signatures that’s currently required to make transactions with the account. Navigate to the right and verify that the following information is correct, and then press both buttons.

   -  *RegIdCred* (must match of the credentials you added to the proposal)

   -  *Identity Provider*

   -  *Revocation threshold*

#. Verify that the following information is correct, and then press both buttons.

   -  *Valid to* date

   -  *Created at* date

#. Repeat the above steps on the Ledger for each of the credentials you’ve added to the proposal.

#. The Ledger says **Threshold** again. This is the new threshold you’ve proposed for the account. Navigate to the right. The Ledger says **Review transaction**. When the Ledger says **Sign transaction**, press both buttons to confirm the transaction. The Ledger says **Concordium is ready**.

.. Note::
    If you want to decline the transaction, press the right button on the Ledger. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In The Desktop Wallet there's a message saying **The action was declined on the Ledger device. Please try again.**

    .. _credentials-export-transaction-proposal:

Export the transaction proposal
================================

If you already have more than one credential on the account, it means that more than one signature is needed to sign the proposal. You must therefore share a file of the type JSON with the co-signers. In the **Signatures** pane, you can see how many signatures are required before you can submit the transaction to the blockchain. If you have the necessary number of signatures, you can :ref:`credentials-generate-sign.

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

#. Select **Submit transaction to chain.** The transaction is submitted to the chain and finalized on the Ledger.

#. Select **Finish** to leave the page.

.. Warning::
    Transactions on the blockchain are permanent. That is, they are irreversible and can't be deleted. Therefore, carefully review that all the transaction details are correct before submitting.
