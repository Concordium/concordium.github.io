.. include:: ../../variables.rst
.. _add-delegation:

==============================================
Delegate to a baker pool or passive delegation
==============================================

You can delegate stake from an account to a :ref:`baker pool<glossary-baker-pool>` or to :ref:`passive delegation<glossary-passive-delegation>`.

When you delegate some stake to a baker pool, it can influence the chances of the baker owner of the baker pool being selected to bake a block and receive baker rewards and thus delegation rewards to you.

.. Note::

   All transfers and transactions cost a fee, including staking and unstaking transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees. A locked-for-staking balance cannot be used to pay for these transactions.
   You can see the fee in the transaction log.

.. Warning::
   Make sure you have enough funds in your disposable balance to cover transaction fees.

.. dropdown:: Desktop Wallet

        .. dropdown:: Single signature account

            #. Go to **Accounts** and select the account on which you want to delegate funds.

            #. Click **More options** then select **Register as a delegator**.

                .. image:: ../images/desktop-wallet/dw-account-menu-regular.png

            #. Select your target (a baker pool or passive delegation). Click **Continue**.

               .. image:: ../images/desktop-wallet/dw-delegation-target.png

            #. Enter the amount that you want to delegate and choose whether rewards should be redelegated or not. Click **Continue**.

                .. image:: ../images/desktop-wallet/dw-delegation-stake.png

            #. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

            #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** in the Desktop Wallet and select **Submit**.

            #. On the LEDGER device, a message says **Review transaction**. Verify that the sender account is correct and navigate to the right. Verify that the LEDGER device shows the correct amount to delegate and navigate to the right. Verify that the restake preference is correct and navigate to the right. Verify that the delegation target is correct and navigate to the right.

            #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

            #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

        .. dropdown:: Multi signature account

            #. Go to **Multi Signature Transactions**, select **Make new proposal**, and then select **Delegate to a pool**.

            #. Select the account on which you want to delegate funds.

            #. Enter the new amount that you want to stake and select **Continue**. Enter the amount that you want to delegate and choose whether rewards should be redelegated or not. Click **Continue**.

            #. Set an expiry date and time for your proposal. Consider when you set the expiry time so that the co-signers can return their signatures in time. Select Continue. You can now generate the transaction.

            **Generate the transaction**

            There are two ways that you can generate the transaction:

            -  Generate the transaction without signing. This option enables you to export the transaction proposal without signing it. You don’t need a LEDGER device but you do need an internet connection.

            -  Generate and sign the transaction This option requires a LEDGER device and an internet connection.

            In combination, these two options enable you to distribute the responsibility of creating and signing transfers among more people. You can, for example, have one person create the proposal and another one sign the proposal. It also makes it possible for you to sign the transaction on the LEDGER device in a different location than where the proposal was created.

            **Generate the transaction without signing**

            #. Verify that the **Transaction details** are as you intended, and then select **I am sure that the proposed changes are correct**.

            #. Select **Generate without signing**. You can now export the proposal.

            **Generate and sign the transaction on the LEDGER device**

            #. If you haven't connected the LEDGER device, there's a message in the Desktop Wallet saying **Waiting for connection** until you connect the LEDGER device. Enter your PIN code on the LEDGER device. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

            #. Wait for the message in the Desktop Wallet saying **Open the Concordium application on your Ledger Nano S** or **Open the Concordium application on your Ledger Nano S Plus**. On the LEDGER device, press the right button to navigate to the Concordium app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying LEDGER device is ready.

            #. In the Desktop Wallet, Verify that the **Transaction details** are as you intended, select **I am sure that the proposed changes are correct**, and then select **Generate and Sign**.

            #. On the LEDGER device, there's a message saying **Review transaction**. Verify that the sender account is correct and navigate to the right. Verify that the LEDGER device shows the correct amount to delegate and navigate to the right. Verify that the restake preference is correct and navigate to the right. Verify that the delegation target is correct and navigate to the right.

            #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

            .. Note::
                If you want to decline the transaction, press the right button on the LEDGER device. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In the Desktop Wallet, there's a message saying **The action was declined on the Ledger device. Please try again.**

            In the Desktop Wallet, you can now see **Transaction details**, **Signatures**, and **Security & Submission Details**, which include the status of the transaction, the identicon, and the transaction hash. If you have all the required signatures, you can :ref:`submit the transaction to the chain <submit-delegation>`, otherwise, you'll have to export the proposal and receive signatures from the co-signers.

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

            .. _submit-delegation:

            **Submit the transaction to the blockchain**

            When you have received and added all the required signatures, you can submit the transaction to the blockchain.

            #. Review the transaction details carefully to ensure that all information is correct.

            #. Select **I understand this is the final submission and that it cannot be reverted**.

                If you don’t want to submit the transaction to the chain, you can select **Cancel**. The proposal is no longer active. However, it is still visible in the list of proposals.

            #. Select **Submit transaction to chain**. The transaction is submitted to the chain and finalized on the ledger.

            #. Select **Finish** to leave the page.

.. dropdown:: |mw-gen2|

        #. You can either: tap |earn| on the account you want to delegate from in the **Accounts** page, or tap on an account card and tap |earn| on the account transaction overview screen.

        #. Tap **Continue to delegation setup**. If you are delegating for the first time, you see some information about delegation.

        #. Tap **Register delegation**.

        #. If you want to delegate to a specific pool tap **Baker pool** and enter the Baker ID of the pool owner. If you are delegating to passive delegation, tap **Passive delegation**. Tap **Continue**.

            .. image:: ../images/mobile-wallet/add-delegation-mw.jpg

        #. You can see your balance available to delegate. **Enter the Amount you want to delegate** in the field. And tap **Yes, restake** to restake any rewards or tap **No, don't restake** if you don’t want to restake rewards. If you do not restake, rewards are deposited to your disposable balance. Tap **Continue**.

            .. image:: ../images/mobile-wallet/add-delegation-amt-mw.jpg

        #. Review the information in the transaction overview. When you are satisfied, tap **Submit delegation transaction**.

            .. image:: ../images/mobile-wallet/add-delegation-conf-mw.jpg

        #. Once the transaction is submitted you see a confirmation screen. Tap **Finish** to complete the action.

            .. image:: ../images/mobile-wallet/add-delegation-submit-mw.jpg

        Once the transaction is finalized, the delegation is effective from the next pay day. You can see the delegation in the account list and on the account card.

        .. image:: ../images/mobile-wallet/account-delegating.png
            :width: 40%

        .. image:: ../images/mobile-wallet/account-details-delegating.png
            :width: 40%

.. dropdown:: |mw-gen1|

        #. Go to the **Accounts** screen.

        #. Tap on the balance area of the account you want to delegate from or tap **More** |moredetails|.

        #. Tap the hamburger menu |hamburger| and tap **Delegation**. If you are delegating for the first time, you see some information about delegation.

            .. image:: ../images/mobile-wallet/account-hamburger-menu.png
                    :width: 25%

        #. Tap **Register delegation**.

        #. If you want to delegate to a specific pool tap **Baker pool** and enter the Baker ID of the pool owner. If you are delegating to passive delegation, tap **Passive delegation**. Tap **Continue**.

            .. image:: ../images/mobile-wallet/add-delegation-mw.jpg
                    :width: 25%

        #. You can see your balance available to delegate. **Enter the Amount you want to delegate** in the field. And tap **Yes, restake** to restake any rewards or tap **No, don't restake** if you don’t want to restake rewards. If you do not restake, rewards are deposited to your disposable balance. Tap **Continue**.

            .. image:: ../images/mobile-wallet/add-delegation-amt-mw.jpg
                    :width: 25%

        #. Review the information in the transaction overview. When you are satisfied, tap **Submit delegation transaction**.

            .. image:: ../images/mobile-wallet/add-delegation-conf-mw.jpg
                    :width: 25%

        #. Once the transaction is submitted you see a confirmation screen. Tap **Finish** to complete the action.

            .. image:: ../images/mobile-wallet/add-delegation-submit-mw.jpg
                    :width: 25%

        Once the transaction is finalized, the delegation is effective from the next pay day. You can see the delegation in the account list and on the account card.

        .. image:: ../images/mobile-wallet/account-delegating.png
            :width: 40%

        .. image:: ../images/mobile-wallet/account-details-delegating.png
            :width: 40%

.. dropdown:: |bw|

        #. Click |earn| on the navigation bar. Use the left and right arrow to locate the button if necessary.

        #. Click **Setup delegation**. If you are delegating for the first time, you see some information about delegation.

        #. On the **Register delegation** screen choose whether to delegate to a specific pool click **Baker pool** and enter the Baker ID of the pool owner. If you are delegating to passive delegation, click **Passive delegation**. Click **Continue**.

        #. Select your restake preference. Click **Yes, restake** to restake any rewards or click **No, don't restake** if you don’t want to restake rewards. If you do not restake, rewards are deposited to your disposable balance. Click **Continue**.

        #. You can see your available balance to delegate on the account that is in focus. You can change the account from the Accounts drop-down at the top of the screen if you want to set up delegation on a different account than the one in focus. **Enter the Amount you want to delegate** in the field. Click **Continue**.

        #. Review the information in the transaction overview. When you are satisfied, click **Send**.

        #. Once the transaction is submitted you see a confirmation screen. Click **Finish** to complete the action.

        Once the transaction is finalized, the delegation is effective from the next pay day. You can see the delegation in the account list and on the account card.

        .. |earn| image:: ../images/earn.png
             :alt: Hand receiving money
             :width: 50px

        .. |hamburger| image:: ../images/hamburger.png
             :alt: Three horizontal lines
             :width: 20px

        .. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
             :width: 50px
