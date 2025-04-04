.. include:: ../../variables.rst
.. _remove-delegation:

=========================================================
Remove delegation to a staking pool or passive delegation
=========================================================

You can remove the delegation on an account to stop delegating.

If you remove the delegation, there is a :term:`cool-down period` before the amount you had delegated is returned to your disposable balance.

.. Note::

   All transfers and transactions cost a fee, including staking and unstaking transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees. A locked-for-staking balance cannot be used to pay for these transactions.
   You can see the fee in the transaction log.

.. Warning::
   Make sure you have enough funds in your disposable balance to cover transaction fees.

.. dropdown:: |cryptox|

      #. Tap the **Earn** button on the main screen.

      #. On the earning status screen, tap **Stop**.

      #. You will see a screen explaining the implications of stopping your delegation, tap **Continue** to proceed.

      #. On the overview screen, review the information. Swipe right on the **Stop staking** slider to submit the delegation stop.

      #. The wallet shows a confirmation screen with a green checkmark indicating that your delegation update has been successfully submitted to the chain. You can click **Transaction details** to view more information about the transaction, or **Close** to return to the main screen.


.. dropdown:: Desktop Wallet

   .. dropdown:: Single signature account

      #. Go to **Accounts** and select the account on which you have delegated funds and click **More options**.

      #. Select **Delegation** and choose **Remove Delegation**.

         .. image:: ../images/desktop-wallet/dw-delegation-menu.png
            :width: 50%
            :alt: delegation screen with options to update or remove

      #. Review the cool-down period. Click **Continue**.

         .. image:: ../images/desktop-wallet/dw-remove-delegation.png
            :width: 50%
            :alt: remove delegation confirmation screen

      #. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

      #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger device is ready** in the Desktop Wallet and select **Submit**.

      #. On the LEDGER device, a message says **Review transaction**. The LEDGER device shows **Stop delegation**. Navigate to the right.

      #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

      #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

   .. dropdown:: Multi signature account

      #. Go to **Multi Signature Transactions**, select **Make new proposal**, and then select **Remove Delegation**.

      #. Select the account whose delegation stake you want to change.

      #. Review the cool-down period. Click **Continue**.

      #. Set an expiry date and time for your proposal. Consider when you set the expiry time so that the co-signers can return their signatures in time. Select Continue. You can now generate the transaction.

      **Generate the transaction**

      There are two ways that you can generate the transaction:

         -  Generate the transaction without signing. This option enables you to export the transaction proposal without signing it. You don’t need a LEDGER device but you do need an internet connection.

         -  Generate and sign the transaction This option requires a LEDGER device and an internet connection.

      In combination, these two options enable you to distribute the responsibility of creating and signing transfers among more people. You can, for example, have one person create the proposal and another one sign the proposal. It also makes it possible for you to sign the transaction on the Ledger in a different location than where the proposal was created.

      **Generate the transaction without signing**

      #. Verify that the **Transaction details** are as you intended, and then select **I am sure that the proposed changes are correct**.

      #. Select **Generate without signing**. You can now export the proposal.

      **Generate and sign the transaction on the LEDGER device**

      #. If you haven't connected the LEDGER device, there's a message in the Desktop Wallet saying **Waiting for connection** until you connect the LEDGER device. Enter your PIN code on the LEDGER device. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

      #. Wait for the message in the Desktop Wallet saying **Open the Concordium application on your Ledger device**. On the LEDGER device, press the right button to navigate to the Concordium app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying LEDGER device is ready.

      #. In the Desktop Wallet, Verify that the **Transaction details** are as you intended, select **I am sure that the proposed changes are correct**, and then select **Generate and Sign**.

      #. On the LEDGER device, there's a message saying **Review transaction**. The LEDGER device shows **Stop delegation**. Navigate to the right.

      #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

      .. Note::
         If you want to decline the transaction, press the right button on the LEDGER device. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In the Desktop Wallet, there's a message saying **The action was declined on the Ledger device. Please try again.**

      In the Desktop Wallet, you can now see **Transaction details**, **Signatures**, and **Security & Submission Details**, which include the status of the transaction, the identicon, and the transaction hash. If you have all the required signatures, you can :ref:`submit the transaction to the chain <submit-removal>`, otherwise, you'll have to export the proposal and receive signatures from the co-signers.

      **Export proposal**

      If more than one signature is needed to sign off on the proposal, you have to share a file of the type JSON, which contains the transaction information,  with the co-signers.

      #. In the Desktop Wallet, select **Export transaction proposal**.

      #. Navigate to the location on your computer where you want to save the file. If you're on Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save**.

      #. You have to export the transaction proposal and send it to the co-signer through a secure channel. Optionally, you can also send the Identicon to the co-signers through a different secure channel.

      **Receive signatures from co-signers**

      When the co-signers have signed the transaction, they return the signed transaction proposal to you, and you have to import the files into the Desktop Wallet before you can submit the transaction to the chain.

      #. If you’re still on the same page, go to step 3. If you left the page with the account transaction, go to **Multi-signature Transactions**, and then select Your proposed transactions.

      #. Select the transaction that you want to submit to the chain. You can see an overview of the transaction details and an overview of the signatures. You can also see that the status of the transaction is Unsubmitted, and you can see the identicon and the transaction hash.

      #. Select **Browse to file** and then navigate to the location on your computer where you saved the signed transaction files. Select the relevant files, and then select **OK**. The files are uploaded to the Desktop Wallet and added to the list of signatures. Alternatively, you can drag and drop the signature files from their location on the computer and onto the Desktop Wallet.

      .. _submit-removal:

      **Submit the transaction to the blockchain**

      When you have received and added all the required signatures, you can submit the transaction to the blockchain.

      #. Review the transaction details carefully to ensure that all information is correct.

      #. Select **I understand this is the final submission and that it cannot be reverted**.

         If you don’t want to submit the transaction to the chain, you can select **Cancel**. The proposal is no longer active. However, it is still visible in the list of proposals.

      #. Select **Submit transaction to chain**. The transaction is submitted to the chain and finalized on the LEDGER.

      #. Select **Finish** to leave the page.


.. dropdown:: |bw|

      #. In the dropdown list, select the delegating account and click **Earn**.

      #. On the next screen, click **Stop**

         .. image:: ../images/browser-wallet/new/stop_delegation1.png
          :width: 50%

      #. Review the information. Note that your delegated stake will be released after 7 days. Click **Send** to finalize the transaction.

         .. image:: ../images/browser-wallet/new/stop_delegation_send.png
          :width: 50%

      #. The wallet shows a confirmation screen with a green checkmark indicating that your delegation has been successfully stopped. You can click **Transaction details** to view more information about the transaction, or **Return to account** to return to your account overview.

         .. image:: ../images/browser-wallet/new/stop_delegation3.png
          :width: 50%



.. |earn| image:: ../images/earn.png
        :alt: Hand receiving money
        :width: 50px

.. |cryptoX-earn| image:: ../images/cryptoX/cryptoX-earn.png
        :alt: Hand receiving money
        :width: 50px

.. |hamburger| image:: ../images/hamburger.png
             :alt: Three horizontal lines
             :width: 20px

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
             :width: 50px
