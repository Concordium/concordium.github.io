.. _create-baker-desktop:

=========================================
Add a baker account in the Desktop Wallet
=========================================

A :ref:`baker <baker-concept>` is a node that participates in the network by baking (creating) new blocks that are added to the chain. Each baker has a set of cryptographic keys called baker keys that the node needs to bake blocks. You generate the baker keys in the Desktop Wallet when you add a baker account. The baker node will start baking two :ref:`epochs <glossary-epoch>` after the transaction has been approved.

The process of becoming a baker involves the following:

#. Create a set of baker keys.
#. Register the baker keys with the account.
#. Start a :ref:`node <run-node-windows>` with the baker keys.

This guide goes through all the steps involved in adding a baker in the Desktop Wallet. To start baking, you must start your node with the baker keys. You can run a baker node with keys generated in the Desktop Wallet on :ref:`Ubuntu <run-node-ubuntu>`, :ref:`Windows <run-node-windows>`, :ref:`Docker/Linux <run-a-node>`, or :ref:`macOS <run-node-macos>`.


Prerequisites
=============
There are a couple of things you must set up in preparation before you can start baking.

- Run a node on the Concordium blockchain. Make sure that you have a setup where the node can operate around the clock.
- Set up a Ledger hardware wallet for your private key.
- Download and install the Desktop Wallet.
- Set up an initial account and an identity.
- Set up a new account that you'll be using as baker account.
- Verify that the account balance has the required amount of CCD.

.. Note::

   All transfers and transactions cost a fee, including staking and unstaking transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees. A locked-for-staking balance cannot be used to pay for these transactions.
   You can see the fee in the transaction log.

.. Note::

   A Single-signature account is an account with only one credential holder. A Multi-signature account is an account where multiple individuals are credential holders and a certain number of credential holders must sign transactions on the account. For more information about multi-signature accounts, see :ref:`overview-shared-accounts`.

Add baker (Single-signature account)
====================================

#. Go to **Accounts**, select the account you want to add as baker account, change the view to the detailed view, and select **Add baker**.

#. Specify the amount that you want to stake where it says **Amount**. The more you stake, the greater the probability that your account will be chosen to bake the next block.

   Baker accounts receive a reward when they have baked a block, and the reward
   is added to the staked amount on the account by default. However, you can change this setting so that the reward is added to the disposable amount instead.

   -  Select **No, don’t restake** if you'd rather add the rewards to the disposable amount on the account.

#. You have to export the baker credentials so that you can start the node with the baker keys. Select **Export baker credentials** and navigate to the place on your computer where you want to save the file. If you're running Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save** and navigate to the place on your computer where you want to save the file.

.. Warning::
      This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else, make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

4. There's a message saying **Waiting for device. Please connect your Ledger**. Connect the Ledger device to the computer and enter your PIN on the Ledger device.

#. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** in the Desktop Wallet and select **Submit**.

#. On the Ledger device, a message says **Review transaction**. Review the **Amount to stake** and the **Restake earnings** information to verify that it matches the transaction details in the Desktop Wallet.

#. When the Ledger device says **Sign transaction**, press both buttons to confirm the transaction. The Ledger device says **Concordium is ready**.

#. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

Add baker (Multi-signature account)
===================================

Select an account to add as baker account
-----------------------------------------

#. Go to the **Multi Signature Transactions** tab, and then select **Add Baker**.

#. Select the account you want to add as baker account, and then select **Continue**.

Stake an amount
---------------

You need to stake an amount of CCD on the account that you want to add as baker account. When you have staked an amount, the amount is still part of the balance, but you can't transfer it to other accounts. The account always shows how much of the balance that's been staked.

#. Specify the amount that you want to stake where it says **Amount**. The more you stake the greater is the probability that your account will be chosen to bake the next block.

   Baker accounts receive a reward when they have baked a block, and the reward
   is added to the staked amount on the account by default. However, you can change this setting so that the reward is added to the disposable amount instead.

   -  Select **No, don’t restake** if you'd rather add the rewards to the disposable amount on the account.

#. When you look at the **Transaction Details** in the left pane, you can see the identity of the account owner, the account where the CCD are staked from, the staked amount, the estimated fee, and whether rewards are going to be restaked. Verify that the details are as you intended.

#. Select **Generate keys**. The baker keys are generated and the public keys are displayed in the left pane. There are three public keys:

   - Election verify key
   - Signature verify key
   - Aggregation verify

#. Select **Continue** to generate the transaction.

Generate the transaction
------------------------

There are two ways that you can generate the transaction:

-  :ref:`Generate the transaction without signing<generate-without-sign>`. This option enables you to export the transaction proposal without signing it. You don't need a Ledger but you do need an internet connection.

-  :ref:`Generate and sign the transaction<generate-sign>` This option requires a Ledger and an internet connection.

In combination, these two options enable organizations to distribute the responsibility of creating and signing transfers among more people. It makes it possible to have one employee create the proposals and another one sign the proposals. It also makes it possible to sign the transaction on the Ledger in a different location than where the proposal was created.

.. _generate-without-sign:

Generate the transaction without signing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Verify that the Transaction details are as you are as you intended, and then select **I am sure that the proposed changes are correct**.

#. Select **Generate without signing**. You can now :ref:`export the baker credentials<export-baker-credentials>`.

.. _generate-sign:

Generate and sign the transaction on the Ledger
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Connect the Ledger to the computer if you haven't done so already. There’s a message saying **Waiting for device. Please connect your Ledger**.

#. Enter your PIN code on the Ledger. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready**.

#. In the Desktop Wallet verify that all transaction details are correct and select **I am sure that the proposed changes are correct**.

#. Select **Generate and sign**. There's a message saying **Waiting for user to finish the process on the device**.

#. On the Ledger, there's a message saying **Review transaction**. Review the **Amount to stake** and the **Restake earnings** information to verify that it matches the transaction details in the Desktop Wallet.

#. When the Ledger says **Sign transaction**, press both buttons to confirm the transaction. The Ledger says **Concordium is ready**.

.. Note::
    If  you want to decline the transaction, press the right button on the Ledger. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In the Desktop Wallet there's a message saying **The action was declined on the Ledger device. Please try again.**

    .. _export-baker-credentials:

Export baker credentials
------------------------

#. You have to export the baker credentials so that you can start the node with the baker keys. Select **Export baker credentials** and navigate to the place on your computer where you want to save the file.

   You can now see **Transaction details**, **Signatures**, and **Security & Submission Details**, which includes the status of the transaction, the identicon, and the digest to sign. You can also see the date and time before which you must submit the transaction proposal. If no more signatures are required, you can :ref:`submit the transaction to the blockchain <submit-transaction>`. If more signatures are required, you'll have to export and send the transaction proposal to the co-signers.

.. Warning::
    This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

Export a transaction proposal
-----------------------------
If more than one signature is needed to sign off on the baker account proposal, you must share a file of the type JSON with the co-signers. In the **Signatures** pane, you can see how many signatures are required before you can submit the transaction to the blockchain.

#. In the Desktop Wallet, select **Export transaction proposal**.

#. Navigate to the location on your computer where you want to save the file. If you're on Windows make sure that **All Files** is selected. Give the file a name and the extension .json, and then click **Save**.

#. Send a copy of the file through a secure channel to the co-signers that must sign the transaction. Optionally, you can also send a copy of the identicon through a secure channel that is different from the one used to send the file.

Receive signatures from co-signers
----------------------------------

When the co-signers have signed the transaction, they return the signed transaction proposal to you, and you have to import the files into the Desktop Wallet before you can submit the transaction to the chain.

#. If you left the page with the account transaction, go to **Multi-signature Transactions**, and then select **Your proposed transactions**. If you're still on the same page, go to step 3.

#. Select the transaction that you want to submit to the chain. You can see an overview of the transaction details and an overview of the signatures. You can also see that the status of the transaction is **Unsubmitted**, and you can see the identicon, and the transaction hash.

#. Select **Browse to file** and then navigate to the location on your computer where you saved the signed transaction files. Select the relevant files, and then select **OK**. The files are uploaded to the Desktop Wallet and added to the list of signatures. Alternatively, you can drag and drop the signature files from their location on the computer and on to the Desktop Wallet.

.. _submit-transaction:

Submit the transaction to the blockchain
----------------------------------------
When you have received and added all the required signatures, you can submit the transaction to the blockchain.

#. Review the transaction details carefully to ensure that all information is correct.

#. Select **I understand this is the final submission, and that it cannot be reverted.**

   -  If you don't want to submit the transaction to the chain, you can select **Cancel**. The proposal is no longer active; however it is still visible in the list of proposals.

#. Select **Submit transaction to chain.** The transaction is submitted to the chain and finalized on the Ledger.

#. Select **Finish** to leave the page.

.. Warning::
    Transactions on the blockchain are permanent. That is, they are irreversible and can't be deleted. Therefore, carefully review that you have selected the right account to add as baker, and that you have entered the correct amount to stake.
