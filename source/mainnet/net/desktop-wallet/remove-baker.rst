.. _remove-baker:

======================
Remove a baker account
======================

If you remove a baker in the desktop wallet, the node that is configured with the baker keys will stop baking after a cool-down period of three weeks. During this period, you'll not be able update the stake. After the cool-down period, the amount that you previously staked is returned to your disposable balance at the next :ref:`pay day<glossary-pay-day>`. When you've removed the baker, it is recommended that you also remove the keys from the node. If you want to use the node for baking at a later point in time, you'll then have to create a new set of baker keys.

.. Note::

   All transfers and transactions cost a fee, including staking and unstaking transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees. A locked-for-staking balance cannot be used to pay for these transactions.
   You can see the fee in the transaction log.

Remove a baker (Single-signature account)
=========================================

#. Go to **Accounts**, select the account that you no longer want to be a baker account then click **More options**.

#. Select **Baking**.

#. Click **Stop baking**.

   .. image:: ../images/desktop-wallet/dw-baker-menu.png

#. The cool-down period is displayed. Select **Continue**.

   .. image:: ../images/desktop-wallet/dw-remove-baker.png

#. A message says **Waiting for device. Please connect your Ledger**. Connect the Ledger device to the computer and enter your PIN on the Ledger device.

#. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready**in the Desktop Wallet and select **Submit**.

#. On the Ledger device, a message says **Review transaction**. Verify that the sender account is correct, and navigate to the right. The Ledger device says **Remove baker from pool**. Navigate to the right.

#. The Ledger device says **Sign transaction**. Press both buttons to sign the transaction. The Ledger device says **Concordium is ready**.

#. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

Remove a baker (Multi-signature account)
========================================

#. Go to **Multi Signature Transactions**, select **Make new proposal**, and then select **Stop baking**.

#. Select the **Account** that you no longer want to be a baker account, and then select **Continue**.

#. Set an expiry date and time for your proposal. You must set the expiry time so that the co-signers can return their signatures in time. Select **Continue**.

Generate the transaction
------------------------

There are two ways that you can generate the transaction:

-  Generate the transaction without signing. This option enables you to export the transaction proposal without signing it. You don’t need a Ledger but you do need an internet connection.

-  Generate and sign the transaction This option requires a Ledger and an internet connection.

In combination, these two options enable you to distribute the responsibility of creating and signing transfers among more people. You can, for example, have one person create the proposal and another one sign the proposal. It also makes it possible for you to sign the transaction on the Ledger in a different location than where the proposal was created.

Generate the transaction without signing
-----------------------------------------

#. Verify that the **Transaction details** are as you intended, and then select **I am sure that the proposed changes are correct**.

#. Select **Generate without signing**. You can now export the proposal.

Generate and sign the transaction on the Ledger
-----------------------------------------------

#. If you haven't connected the Ledger, there's a message in the Desktop Wallet saying **Waiting for connection** until you connect the Ledger. Enter your PIN code on the Ledger. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

#. Wait for the message in the Desktop Wallet saying **Open the Concordium application on your Ledger Nano S** or **Open the Concordium application on your Ledger Nano S Plus**. On the Ledger, press the right button to navigate to the Concordium app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying Ledger is ready.

#. In the Desktop Wallet, Verify that the **Transaction details** are as you intended, select **I am sure that the proposed changes are correct**, and then select **Generate and Sign**.

#. On the Ledger, there's a message saying **Review transaction**. Verify that the sender account is correct, and navigate to the right. The Ledger says **Remove baker from pool**. Navigate to the right.

#. The Ledger says **Sign transaction**. Press both buttons to sign the transaction. The Ledger says **Concordium is ready**.

.. Note::
   If you want to decline the transaction, press the right button on the Ledger. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In the Desktop Wallet, there's a message saying **The action was declined on the Ledger device. Please try again.**

In the Desktop Wallet, you can now see **Transaction details**, **Signatures**, and **Security & Submission Details**, which include the status of the transaction, the identicon, and the transaction hash. If you have all the required signatures, you can :ref:`submit the transaction to the chain <submit-remove-baker>`, otherwise, you'll have to export the proposal and receive signatures from the co-signers.

Export proposal
---------------

If more than one signature is needed to sign off on the proposal, you have to share a file of the type JSON, which contains the transaction information,  with the co-signers.

#. In the Desktop Wallet, select **Export transaction proposal**.

#. Navigate to the location on your computer where you want to save the file. If you're on Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save**.

#. You have to export the transaction proposal and send it to the co-signer through a secure channel. Optionally, you can also send the Identicon to the co-signers through a different secure channel.

Receive signatures from co-signers
-----------------------------------

When the co-signers have signed the transaction, they return the signed transaction proposal to you, and you have to import the files into the Desktop Wallet before you can submit the transaction to the chain.

#. If you’re still on the same page, go to step 3. If you left the page with the account transaction, go to **Multi-signature Transactions**, and then select Your proposed transactions.

#. Select the transaction that you want to submit to the chain. You can see an overview of the transaction details and an overview of the signatures. You can also see that the status of the transaction is Unsubmitted, and you can see the identicon and the transaction hash.

#. Select **Browse to file** and then navigate to the location on your computer where you saved the signed transaction files. Select the relevant files, and then select **OK**. The files are uploaded to the Desktop Wallet and added to the list of signatures. Alternatively, you can drag and drop the signature files from their location on the computer and onto the Desktop Wallet.

.. _submit-remove-baker:

Submit the transaction to the blockchain
----------------------------------------

When you have received and added all the required signatures, you can submit the transaction to the blockchain.

#. Review the transaction details carefully to ensure that all information is correct.

#. Select **I understand this is the final submission, and that it cannot be reverted**.

   If you don’t want to submit the transaction to the chain, you can select **Cancel**. The proposal is no longer active. However, it is still visible in the list of proposals.

#. Select **Submit transaction to chain**. The transaction is submitted to the chain and finalized on the Ledger.

#. Select **Finish** to leave the page.

.. Warning::
    Transactions on the blockchain can't be reversed or deleted. They will always exist on the blockchain. Therefore, carefully review that you have entered the correct amount to stake.
