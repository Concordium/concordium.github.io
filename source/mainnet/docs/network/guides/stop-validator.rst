.. include:: ../../../variables.rst
.. _stop-validator:

================
Stop a validator
================

If you remove a validator, the node that is configured with the validator keys will stop producing blocks after the next :term:`pay day`.

After the :term:`cool-down period`, the amount that you previously staked is returned to your disposable balance at the next pay day.

If your pool has any delegators, they will be automatically moved to passive delegation, if they don't decide to do something else.



When you've removed the validator, it is recommended that you also remove the keys from the node, but you should only do this after the node has stopped producing blocks, i.e. after the payday.
If you want to use the node for validation at a later point in time, you'll then have to create a new set of validator keys.


If you no longer wish to produce blocks on this account, you can stop validation.

.. dropdown:: |cryptox|

    #. Tap the **Earn** button on the main screen.

    #. On the validation screen, tap **Stop**.

    #. You will see a message explaining about the implications of stopping validation. Tap **Continue** to procced.

    #. On the overview screen, review the information. Swipe right on the **Stop validation** slider to submit the validation update.

    #. The wallet shows a confirmation screen with a green checkmark indicating that your validation update has been successfully submitted to the chain. You can click **Transaction details** to view more information about the transaction, or **Close** to return to the main screen.


.. dropdown:: |bw|

    #. In the dropdown list, select the account for which you want to stop validation and click **Earn**.

    #. On the next screen, click **Stop**.

       .. image:: ../../images/browser-wallet/new/update_validation1.png
            :width: 50%
            :alt: screen showing validator update options

    #. Review the transaction details for removing your validator. Note that the validator stake is released after 7 days. Click **Send** to confirm and send your transaction to the blockchain.

       .. image:: ../../images/browser-wallet/new/stop_validator_send.png
            :width: 50%
            :alt: screen showing send stop validator transaction


    #. The wallet displays a confirmation screen with a green checkmark, indicating your validator has successfully removed. You can click **Transaction details** to view more information about the transaction, or **Return to account** to go back to your account overview.

       .. image:: ../../images/browser-wallet/new/stop_validator2.png
            :width: 50%
            :alt: success screen for stopping validator


.. dropdown:: Desktop Wallet

    .. dropdown:: Single signature account

        #. Go to **Accounts**, select the account that you no longer want to be a validator account then click **More options**.

        #. Select **Validation**.

        #. Click **Stop validation**.

           .. image:: ../../images/desktop-wallet/dw-baker-menu.png
               :width: 50%
               :alt: screen showing all validator options

        #. The cool-down period is displayed. Select **Continue**.

           .. image:: ../../images/desktop-wallet/dw-remove-baker.png
               :width: 50%
               :alt: screen showing that validator will be removed

        #. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger device is ready**in the Desktop Wallet and select **Submit**.

        #. On the LEDGER device, a message says **Review transaction**. Verify that the sender account is correct, and navigate to the right. The LEDGER device says **Remove baker from pool**. Navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

    .. dropdown:: Multi signature account

        #. Go to **Multi Signature Transactions**, select **Make new proposal**, and then select **Stop validation**.

        #. Select the **Account** that you no longer want to be a validator account, and then select **Continue**.

        #. Set an expiry date and time for your proposal. You must set the expiry time so that the co-signers can return their signatures in time. Select **Continue**.

        **Generate the transaction**

        There are two ways that you can generate the transaction:

        -  Generate the transaction without signing. This option enables you to export the transaction proposal without signing it. You don’t need a LEDGER device but you do need an internet connection.

        -  Generate and sign the transaction This option requires a LEDGER device and an internet connection.

        In combination, these two options enable you to distribute the responsibility of creating and signing transfers among more people. You can, for example, have one person create the proposal and another one sign the proposal. It also makes it possible for you to sign the transaction on the Ledger in a different location than where the proposal was created.

        *Generate the transaction without signing*

        #. Verify that the **Transaction details** are as you intended, and then select **I am sure that the proposed changes are correct**.

        #. Select **Generate without signing**. You can now export the proposal.

        *Generate and sign the transaction on the LEDGER device*

        #. If you haven't connected the LEDGER device, there's a message in the Desktop Wallet saying **Waiting for connection** until you connect the LEDGER device. Enter your PIN code on the LEDGER device. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

        #. Wait for the message in the Desktop Wallet saying **Open the Concordium application on your Ledger device**. On the LEDGER device, press the right button to navigate to the Concordium app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying LEDGER device is ready.

        #. In the Desktop Wallet, Verify that the **Transaction details** are as you intended, select **I am sure that the proposed changes are correct**, and then select **Generate and Sign**.

        #. On the LEDGER device, there's a message saying **Review transaction**. Verify that the sender account is correct, and navigate to the right. The LEDGER device says **Remove baker from pool**. Navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        .. Note::

            If you want to decline the transaction, press the right button on the LEDGER device. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In the Desktop Wallet, there's a message saying **The action was declined on the Ledger device. Please try again.**

        In the Desktop Wallet, you can now see **Transaction details**, **Signatures**, and **Security & Submission Details**, which include the status of the transaction, the identicon, and the transaction hash. If you have all the required signatures, you can :ref:`submit the transaction to the chain <submit-remove-baker>`, otherwise, you'll have to export the proposal and receive signatures from the co-signers.

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

        .. _submit-remove-baker:

        **Submit the transaction to the blockchain**

        When you have received and added all the required signatures, you can submit the transaction to the blockchain.

        #. Review the transaction details carefully to ensure that all information is correct.

        #. Select **I understand this is the final submission, and that it cannot be reverted**.

            If you don’t want to submit the transaction to the chain, you can select **Cancel**. The proposal is no longer active. However, it is still visible in the list of proposals.

        #. Select **Submit transaction to chain**. The transaction is submitted to the chain and finalized on the ledger.

        #. Select **Finish** to leave the page.


.. Note::

   If you stop as a validator, remember that this does not shut down your node. You need to shut down the node in a separate action if you no longer wish to run a node on the Concordium blockchain.

.. |cryptoX-earn| image:: ../../images/cryptoX/cryptoX-earn.png
             :alt: Hand receiving money
             :width: 50px

