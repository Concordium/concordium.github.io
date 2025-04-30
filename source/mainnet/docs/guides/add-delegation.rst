.. include:: ../../variables.rst
.. _add-delegation:

================================================
Delegate to a staking pool or passive delegation
================================================

You can delegate stake from an account to a :term:`staking pool` or to :term:`passive delegation`.

When you delegate some stake to a staking pool, it can influence the chances of the pool owner of the staking pool being selected to produce a block and receive block rewards and thus delegation rewards to you.

.. Note::

   All transfers and transactions cost a fee, including staking and unstaking transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees. A locked-for-staking balance cannot be used to pay for these transactions.
   You can see the fee in the transaction log.

.. Warning::
   Make sure you have enough funds in your disposable balance to cover transaction fees.

.. dropdown:: |cryptox|

        #. Tap the **Earn** button on the main screen.

        #. Tap **Read more** to go to an informational screen explaining the key concepts of delegation on the Concordium blockchain, or tap **Start earning** to go directly to registering your delegation.

           .. image:: ../images/cryptoX/cryptox-add-validator1.png
                    :width: 50%
                    :alt: screen with earning options

        #. On the next screen, enter the amount you want to delegate. You can see your available balance. Tap **Staking mode** to specify wheter you want to set up passive delegation or delegation to a specific pool. In the latter case, you must also enter validate pool ID. Tap **Continue** to return to the previous screen. Toggle the **Restake rewards** switch if you want to automatically add your rewards to your stake amount. If disabled, rewards will be deposited to your disposable balance at each pay day. Tap **Continue** to proceed.

           .. image:: ../images/cryptoX/cryptox-register-delegation1.png
                    :width: 50%
                    :alt: screen with earning options

        #. Review the information in the transaction overview. When you are satisfied, Swipe right on the **Submit delegation** slider to submit the transaction.

           .. image:: ../images/cryptoX/cryptox-register-delegation2.png
                    :width: 50%
                    :alt: screen with transaction overview

        #. The wallet shows a confirmation screen with a green checkmark indicating that your delegation registration has been successfully submitted to the chain. You can see the amount you’re delegating. You can click **Transaction details** to view more information about the transaction, or **Close** to return to the main screen.

        Once the transaction is finalized, the delegation is effective from the next pay day.



.. dropdown:: Desktop Wallet

        .. dropdown:: Single signature account

            #. Go to **Accounts**, select the account on which you want to delegate funds then click **More options**.

            #. Click **Register as a delegator**.

            #. Select your target (a staking pool or passive delegation). Click **Continue**.

               .. image:: ../images/desktop-wallet/dw-delegation-target.png
                    :width: 50%
                    :alt: screen with options to select delegation type

            #. Enter the amount that you want to delegate and choose whether rewards should be redelegated or not. Click **Continue**.

               .. image:: ../images/desktop-wallet/dw-delegation-stake.png
                   :width: 50%
                   :alt: screen to enter amount to delegate and restake settings

            #. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

            #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger device is ready** in the Desktop Wallet and select **Submit**.

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

            #. Wait for the message in the Desktop Wallet saying **Open the Concordium application on your Ledger device**. On the LEDGER device, press the right button to navigate to the Concordium app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying LEDGER device is ready.

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


.. dropdown:: |bw|

        #. In the dropdown list, select the account that you want to delegate from and click **Earn**.

        #. In the *Delegation* section, click **Continue to delegation setup**.

           .. image:: ../images/browser-wallet/new/add_delegation1.png
               :width: 50%

        #. You can now go through anumber of informational screens explaining the key concepts of delegation on the Concordium blockchain, including delegation models, staking pools, passive delegation, pay days, and lock-ins/cool-downs. Click **Next** to navigate through the screens. Click **Skip** to proceed directly to registering your validation.

           .. image:: ../images/browser-wallet/new/add_delegation2.png
               :width: 50%

        #. On the Register delegation screen, you have two options: If you want to delegate to a specific pool, click **Validator** and enter the Validator ID of the pool owner. If you want to register a passive delegation, click **Passive**. Click **Continue** to proceed.

           .. image:: ../images/browser-wallet/new/add_delegation3.png
               :width: 50%

        #. You can see your balance available to delegate. Enter the amount you want to delegate in the field and select your restake preference. Delegators receive rewards proportional to their stake, and by default, these rewards can be automatically added to your delegation amount. Use the **Restake rewards** toggle to enable this feature if you prefer to have your rewards automatically added to your delegation amount at each pay day, increasing your stake and future rewards. If disabled, rewards will be deposited to your disposable balance instead. Click **Continue** to proceed.

           .. image:: ../images/browser-wallet/new/add_delegation4.png
               :width: 50%

        #. Review the information including your delegation style and amount, amount, reward settings, and commission rates. When you're satisfied with the configuration, scroll down and click **Send** to finalize the transaction.

           .. image:: ../images/browser-wallet/new/add_delegation_send.png
               :width: 50%

        #. The wallet shows a confirmation screen with a green checkmark indicating that your delegation transaction has been successfully submitted to the chain. You can see the amount you're delegating with. You can click **Transaction details** to view more information about the transaction, or **Return to account** to return to your account overview.

           .. image:: ../images/browser-wallet/new/add_delegation6.png
               :width: 50%

        Once the transaction is finalized, the delegation is effective from the next pay day. You can see the delegation type and amount on the account card.



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
