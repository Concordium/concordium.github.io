.. include:: ../../variables.rst
.. _update-baker-mw:

========================
Change validator options
========================

.. Note::

   All transfers and transactions cost a fee, including staking and unstaking transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees. A locked-for-staking balance cannot be used to pay for these transactions.
   You can see the fee in the transaction log.

.. Warning::
    Transactions on the blockchain can't be reversed or deleted. They will always exist on the blockchain. Therefore, carefully review transactions before submitting.

The following information describes how to access validator settings to update your stake or restaking preference, to open and manage a staking pool, update validator keys, or stop validation for the |cryptox|, |bw|, and Desktop Wallet.

The steps to get to these settings for |cryptox| are described below.

.. dropdown:: |cryptox|

    #. Tap the account.

    #. Tap |cryptoX-earn| on the account balance screen.

    #. Tap **Change validating status**.

        .. image:: ../images/cryptoX/cryptoX-change-validator-status.png
            :width: 50%
            :alt: screen showing current validator settings and change button


Once you access the validator settings for your wallet, you have four options:

- Update validator stake
- Update pool settings
- Update validator keys
- Stop validation

.. _update-baker-stake-mw:

Update validator stake and restaking preference
===============================================

You can change the :ref:`staked amount <concepts-baker-stake>` on a validator account. Changes will take effect at the next :term:`pay day`.
If the change is made in the last epoch before pay day, then the change will not occur until the following pay day.
However, if you decrease the stake, there is a cool-down period of three weeks.
After the cool-down period, the amount you’ve decreased the stake with is returned to your disposable balance at the next pay day.

When you change the stake it can influence your :term:`chance of being selected to produce a block<winning probability>` and receive block rewards. If you decrease the stake, you decrease your chances of producing blocks. Likewise, if you increase the stake, you increase your chances of producing a block.

.. dropdown:: |cryptox|

    #. Tap **Update validator stake**.

    #. You can now go through informational screens explaining the options for changing validator status. Tap Next to navigate through the screens. Tap Skip to proceed directly to updating the validator stake.

       .. image:: ../images/cryptoX/cryptoX-update-validator-stake.png
            :width: 50%
            :alt: screen to update validator stake showing amount and restake preference options

    #. Now you see your balance and the current Validator stake amount.
       Enter the total amount you want to stake.
       You can also choose to adjust your restake setting between **Yes, restake** rewards or **No, don’t restake** rewards. Tap **Continue**.

    #. On the overview screen, check the information. Once you are satisfied, tap **Submit validator transaction**.


.. dropdown:: |bw|

    #. In the dropdown list, select the account for which you want to update the validation options and click **Earn**.

    #. On the next screen, click **Update**.

       .. image:: ../images/browser-wallet/new/update_validation1.png
           :width: 50%

    #. On the next screen, click **Update validation stake**.

       .. image:: ../images/browser-wallet/new/update_validation2.png
            :width: 50%
            :alt: buttons for update validaton options

    #. You can now change the staked amount by updating the *Amount* field or change your restaking preferences by toggling the 'Restake rewards' option. When the *Restake rewards* toggle is enabled, your validation rewards will automatically be added to your validation amount, increasing your stake over time. When the *Restake rewards* toggle is disabled, your rewards will instead be deposited to your disposable balance at each pay day. When you're satisfied with your staking configuration, tap the **Continue** to proceed with your updates.

       .. image:: ../images/browser-wallet/new/update_validation3.png
           :width: 50%
           :alt: screen showing firld and toggle to set preferences


    #. Review the transaction details. Click **Submit validation** to submit the transaction. If you need to make any changes, you can go back to the previous step.

       .. image:: ../images/browser-wallet/new/update_validation4.png
           :width: 50%
           :alt: screen showing transaction receipt

    #. The wallet displays a confirmation screen with a green checkmark, indicating your validation settings have been successfully updated. You can click **Transaction details** to view more information about the transaction, or **Return to account** to go back to your account overview.

       .. image:: ../images/browser-wallet/new/update_validation5.png
           :width: 50%
           :alt: screen showing transaction receipt

.. dropdown:: Desktop Wallet

    .. dropdown:: Single signature account

        #. Go to **Accounts** and select the account whose validator stake you want to change. Click **More options**.

        #. Click **Validation**.

        #. Click **Update validator stake**.

           .. image:: ../images/desktop-wallet/dw-baker-menu.png
               :alt: screen showing all validator options
               :width: 50%

        #. Enter the new amount that you want to stake if you want to change the amount. Change the restaking preference if you want to change that. Click **Continue**.

           .. image:: ../images/desktop-wallet/dw-baker-stake.png
               :alt: screen to update validator stake and restake preference options
               :width: 50%


        5. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** in the Desktop Wallet and select **Submit**.

        #. On the LEDGER device, a message says **Review transaction**. Verify that the sender account is correct and navigate to the right. The LEDGER device says **Update stake to** and then the amount you're going to update the stake to. Navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

    .. dropdown:: Multi signature account

        #. Go to **Multi Signature Transactions**, select **Make new proposal**, and then select **Update validator stake**.

        #. Select the account whose validator stake you want to change.

        #. Enter the new amount that you want to stake if you want to change that. Change the restaking preference if you want to change that. Click **Continue**.

        #. Set an expiry date and time for your proposal. Consider this when you set the expiry time so that the co-signers can return their signatures in time. Select Continue. You can now generate the transaction.

        **Generate the transaction**

        There are two ways that you can generate the transaction:

        -  Generate the transaction without signing. This option enables you to export the transaction proposal without signing it. You don’t need a LEDGER device but you do need an internet connection.

        -  Generate and sign the transaction This option requires a LEDGER device and an internet connection.

        In combination, these two options enable you to distribute the responsibility of creating and signing transfers among more people. You can, for example, have one person create the proposal and another one sign the proposal. It also makes it possible for you to sign the transaction on the LEDGER device in a different location than where the proposal was created.

        *Generate the transaction without signing*

        #. Verify that the **Transaction details** are as you intended, and then select **I am sure that the proposed changes are correct**.

        #. Select **Generate without signing**. You can now export the proposal.

        *Generate and sign the transaction on the LEDGER*

        #. If you haven't connected the LEDGER device, there's a message in the Desktop Wallet saying **Waiting for connection** until you connect the LEDGER device. Enter your PIN code on the LEDGER device. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

        #. Wait for the message in the Desktop Wallet saying **Open the Concordium application on your Ledger Nano S** or **Open the Concordium application on your Ledger Nano S Plus**. On the LEDGER device, press the right button to navigate to the Concordium app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying LEDGER device is ready.

        #. In the Desktop Wallet, Verify that the **Transaction details** are as you intended, select **I am sure that the proposed changes are correct**, and then select **Generate and Sign**.

        #. On the LEDGER device, there's a message saying **Review transaction**. Verify that the sender account is correct, and navigate to the right. The LEDGER device says **Update stake to** and then the amount you're going to update the stake to. Navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        .. Note::

            If you want to decline the transaction, press the right button on the LEDGER devuce. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In the Desktop Wallet, there's a message saying **The action was declined on the Ledger device. Please try again.**

        In the Desktop Wallet, you can now see **Transaction details**, **Signatures**, and **Security & Submission Details**, which include the status of the transaction, the identicon, and the transaction hash. If you have all the required signatures, you can :ref:`submit the transaction to the chain <submit-stake-change>`, otherwise, you'll have to export the proposal and receive signatures from the co-signers.

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

        .. _submit-stake-change:

        **Submit the transaction to the blockchain**

        When you have received and added all the required signatures, you can submit the transaction to the blockchain.

        #. Review the transaction details carefully to ensure that all information is correct.

        #. Select **I understand this is the final submission and that it cannot be reverted**.

            If you don’t want to submit the transaction to the chain, you can select **Cancel**. The proposal is no longer active. However, it is still visible in the list of proposals.

        #. Select **Submit transaction to chain**. The transaction is submitted to the chain and finalized on the ledger.

        #. Select **Finish** to leave the page.

.. _update-pool-settings:

Update pool settings
====================

.. dropdown:: |cryptox|

    #. Tap **Update pool settings**

    #. You can now go through informational screens explaining the options for changing validator status.
       Tap Next to navigate through the screens. Tap Skip to proceed directly to updating the pool settings.

       .. image:: ../images/cryptoX/cryptoX-update-pool-settings1.png
            :width: 50%
            :alt: screen showing three staking pool options

       - Open pool: open a pool for a previously closed validator
       - Closed for new: close the pool to new delegators. Existing delegators are not affected. You might do this when, for example, the pool is close to meeting one or both of the :ref:`bounding caps<delegation-concept>`. **It is the validator's responsibility to monitor the stake to make pool management decisions.**
       - Close pool: close a pool permanently.

       If you choose **Open pool**:

        #. Use the sliders to update the validator commission rates or type in the percentage you want for your commission rates, if desired. This is the percentage you wish to earn from delegators to your pool when you have produced a block. Delegators can use this information when choosing a pool.

        #. Enter an optional URL with information about your validator to give delegators more information about your staking pool to help them research staking pools. This information is not shared in the case of a closed pool.

        #. In the Update pool settings overview screen review the information then tap **Submit delegation transaction**.

        #. The |cryptox| shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active validator screen appears where you have the possibility to update validator settings.

       If you choose **Closed for new**:

       Existing delegators remain in the pool. You have the option to adjust commission fees and your validator information URL.

        #. Use the sliders to update the validator commission rates or type in the percentage you want for your commission rates, if desired. This is the percentage you wish to earn from delegators to your pool when you have produced a block. Delegators can use this information when choosing a pool.

        #. Enter an optional URL with information about your validator to give delegators more information about your staking pool to help them research staking pools. This information is not shared in the case of a closed pool.

        #. In the Update pool settings overview screen review the information then tap **Submit delegation transaction**.

        #. The |cryptox| shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active validator screen appears where you have the possibility to update validator settings.

       If you choose **Close pool**:

       This closes the pool completely for both existing delegators and new delegators.

    #. In the Update pool settings overview screen review the information then tap **Submit delegation transaction**.
    #. The |cryptoX| shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active validator screen appears where you have the possibility to update validator settings.


.. dropdown:: |bw|

    #. In the dropdown list, select the account for which you want to update the validation options and click **Earn**.

    #. On the next screen, click **Update**.

       .. image:: ../images/browser-wallet/new/update_validation1.png
           :width: 50%

    #. On the next screen, click **Update pool settings**.

       .. image:: ../images/browser-wallet/new/update_validation2.png
            :width: 40%
            :alt: screen showing validator update options

    #. On this screen, you can toggle whether your validator is open for delegation. When enabled, other users can delegate their tokens to your validator, increasing your total stake and improving your chances of    producing blocks. Rewards earned will be distributed between you and your delegators at each pay day. If you prefer to validate with only your own stake, you can disable this option. Once you've made your   selection, tap **Continue** to proceed.

       .. image:: ../images/browser-wallet/new/update_pool_settings1.png
            :width: 50%
            :alt: screen showing options pool

    #. On the Commissions screen, you can set the percentage of rewards you keep when others delegate their stake to your validator pool. Use the sliders to adjust both the Transaction fee commission and Block reward commission - by default, both are set to 100% (meaning you keep all rewards). After setting your desired commission rates, click Continue to proceed.

       .. image:: ../images/browser-wallet/new/update_pool_settings2.png
           :width: 50%
           :alt: screen showing sliders and text boxes to adjust commissions

    #. Update the staking pool metadata URL, if desired. Click **Continue**.

       .. image:: ../images/browser-wallet/new/update_pool_settings3.png
            :width: 50%
            :alt: screen showing option for adding metadata

    #. Review the transaction details. When you’re satisfied with the configuration, scroll down and click **Submit validation** to finalize the transaction.

       .. image:: ../images/browser-wallet/new/update_pool_settings4.png
           :width: 50%
           :alt: screen showing transaction receipt

    #. The wallet shows a confirmation screen with a green checkmark indicating that your validation settings have been successfully updated. You can click **Transaction details** to view more information about the transaction, or **Return to account** to return to your account overview.

       .. image:: ../images/browser-wallet/new/update_pool_settings5.png
           :width: 50%
           :alt: screen showing transaction receipt

.. dropdown:: Desktop Wallet

    .. dropdown:: Single signature account

        #. Go to **Accounts** and select the account on which you have a staking pool that you want to update and click **More options**.

        #. Select **Validation**.

        #. Click **Update staking pool**.

           .. image:: ../images/desktop-wallet/dw-baker-menu.png
               :alt: screen showing all validator options
               :width: 50%

        #. Choose the status for your staking pool if you want to change its status and click **Continue**. If you do not want to change the status, click **Continue**. Options are:

           - Open: open your staking pool to delegators.

           - Closed for new: close the staking pool to new delegators. Existing delegators remain in the pool.

           - Closed for all: close the pool for all delegators.

           .. image:: ../images/desktop-wallet/dw-pool-status.png
               :alt: screen showing staking pool options
               :width: 50%

        #. Review the commission rates and adjust with the sliders or type in the rate. Click **Continue**.

           .. image:: ../images/desktop-wallet/dw-pool-commission.png
               :alt: screen displaying the commission rates for staking pools
               :width: 50%

        #. Enter your validator metadata URL if you want to provide this information to potential delegators. This is optional. **Click Continue**.

           .. image:: ../images/desktop-wallet/dw-pool-url.png
               :alt: screen to enter a URL for staking pool metadata
               :width: 50%

        #. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** in the Desktop Wallet and select **Submit**.

        #. On the LEDGER device, a message says **Review transaction**. Verify that the sender account is correct and navigate to the right. Verify that the LEDGER device shows the correct amount to delegate and navigate to the right. Verify that the restake preference is correct and navigate to the right. Verify that the delegation target is correct and navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

    .. dropdown:: Multi signature account

        #. Go to **Multi Signature Transactions**, select **Make new proposal**, and then select **Update staking pool**.

        #. Choose the status for your staking pool if you want to change its status and click **Continue**. If you do not want to change the status, click **Continue**. Options are:

            - Open: open your staking pool to delegators.

            - Closed for new: close the staking pool to new delegators. Existing delegators remain in the pool.

            - Closed for all: close the pool for all delegators.

        #. Review the commission rates and adjust with the sliders or type in the rate. Click **Continue**.

        #. Enter your validator metadata URL if you want to provide this information to potential delegators. This is optional. **Click Continue**.

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

        #. Wait for the message in the Desktop Wallet saying **Open the Concordium application on your Ledger Nano S** or **Open the Concordium application on your Ledger Nano S Plus**. On the LEDGER device, press the right button to navigate to the Concordium app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying LEDGER device is ready.

        #. In the Desktop Wallet, Verify that the **Transaction details** are as you intended, select **I am sure that the proposed changes are correct**, and then select **Generate and Sign**.

        #. On the LEDGER device, there's a message saying **Review transaction**. Verify that the sender account is correct and navigate to the right. Verify that the LEDGER device shows the correct amount to delegate and navigate to the right. Verify that the restake preference is correct and navigate to the right. Verify that the delegation target is correct and navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        .. Note::
            If you want to decline the transaction, press the right button on the LEDGER device. The LEDGER device now says **Decline to sign transaction**. Press both buttons to decline. In the Desktop Wallet, there's a message saying **The action was declined on the Ledger device. Please try again.**

        In the Desktop Wallet, you can now see **Transaction details**, **Signatures**, and **Security & Submission Details**, which include the status of the transaction, the identicon, and the transaction hash. If you have all the required signatures, you can :ref:`submit the transaction to the chain <submit-pool-update>`, otherwise, you'll have to export the proposal and receive signatures from the co-signers.

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

        .. _submit-pool-update:

        **Submit the transaction to the blockchain**

        When you have received and added all the required signatures, you can submit the transaction to the blockchain.

        #. Review the transaction details carefully to ensure that all information is correct.

        #. Select **I understand this is the final submission and that it cannot be reverted**.

            If you don’t want to submit the transaction to the chain, you can select **Cancel**. The proposal is no longer active. However, it is still visible in the list of proposals.

        #. Select **Submit transaction to chain**. The transaction is submitted to the chain and finalized on the ledger.

        #. Select **Finish** to leave the page.

.. Note::

   Closing a pool does not mean that validation stops. You continue as a validator but only using your own stake. If you wish to stop being a validator, you must :ref:`stop validation<remove-baker-mw>`.

.. _update-baker-keys-mw:

Update validator keys
=====================

If you believe your validator keys have been compromised or lost, you can generate new validator keys. It is important to remember to update your validator keys on your node once you have exported them.

.. dropdown:: |cryptox|

    #. Tap **Update validator keys**

    #. You can now go through informational screens explaining the options for changing validator status.
       Tap Next to navigate through the screens. Tap Skip to proceed directly to updating the validator keys.

        .. image:: ../images/cryptoX/cryptoX-update-validator-keys.png
            :width: 50%
            :alt: screen showing new keys with button to export

    #. Tap **Export validator keys**.

        .. Warning::

           If you're going to transfer the validator keys to someone else, make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

    #. Once you have saved the keys, review the information on the overview screen of the add validator transaction then tap **Submit validator transaction**.

    #. The |cryptox| shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active validator screen appears where you have the possibility to update validator settings.

    #. You need to import your validator keys file to your node in order to start producing blocks with the new keys. It is preferable to update them on the node as close to :term:`pay day` as possible to prevent the node from being down as a validator for a longer time.

        - :ref:`Windows<baker-windows>`
        - :ref:`macOS<baker-macos>`
        - :ref:`Docker<baking-docker>`
        - :ref:`Ubuntu<baker-ubuntu>`


.. dropdown:: |bw|

    #. In the dropdown list, select the account for which you want to update the validation options and click **Earn**.

    #. On the next screen, click **Update**.

       .. image:: ../images/browser-wallet/new/update_validation1.png
            :width: 50%
            :alt: screen validator update options

    #. On the next screen, click **Update validator keys**. Review the information about updating validator keys and click **Continue**.

       .. image:: ../images/browser-wallet/new/update_validator_keys1.png
            :width: 50%
            :alt: screen showing validator options


    #. Click **Export export as .json** and the keys are automatically downloaded as `validator-credentials.json` to your default download folder. Click **Continue** to complete the transaction.

       .. image:: ../images/browser-wallet/new/update_validator_keys2.png
            :alt: screen with buttons to show keys or export validator keys
            :width: 50%

    #. Once you have saved the keys, you see an overview screen of the add validator transaction. Review the information, then scroll down and click **Submit validation**.

       .. image:: ../images/browser-wallet/new/update_validator_keys3.png
            :width: 40%

    #. The wallet shows a confirmation screen with a green checkmark indicating that your validation settings have been successfully updated. You can click **Transaction details** to view more information about the transaction, or **Return to account** to return to your account overview.

       .. image:: ../images/browser-wallet/new/update_validator_keys4.png
            :width: 50%

    #. You need to import your validator keys file to your node in order to start producing blocks. It is preferable to update them on the node as close to the next :term:`pay day` as possible to prevent the node from being down as a validator for a longer time.

       - :ref:`Windows<baker-windows>`
       - :ref:`macOS<baker-macos>`
       - :ref:`Docker<baking-docker>`
       - :ref:`Ubuntu<baker-ubuntu>`


.. dropdown:: Desktop Wallet

    .. dropdown:: Single signature account

        #. Go to **Accounts** and select the account on which you have a staking pool that you want to update and click **More options**.

        #. Select **Validation**.

        #. Click **Update validator keys**.

           .. image:: ../images/desktop-wallet/dw-baker-menu.png
               :alt: screen showing all validator options
               :width: 50%

        #. You have to export the validator credentials so that you can restart the node with the new validator keys. Select **Export validator credentials**. If you're running Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save** and navigate to the place on your computer where you want to save the file.

           .. image:: ../images/desktop-wallet/dw-baker-keys.png
               :alt: screen showing new keys with button to export
               :width: 50%

        .. Warning::
            This is the only time that you can export the credentials. If you’re going to transfer the validator keys to someone else, make sure to do so through a secure channel.

        1. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** in the Desktop Wallet and click **Submit**.

        #. On the LEDGER device, a message says **Review transaction**. Verify that the sender account is correct and navigate to the right. The LEDGER device says **Update baker keys**. Navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

    .. dropdown:: Multi signature account

        #. Go to **Multi Signature Transactions**, and select **Make new proposal**, and then select **Update Validator Keys**.

        #. Select the **Account** whose validator keys you want to update, and then select **Continue**. Only validator accounts are listed.

        #. Set an expiry date and time for your proposal. You must set the expiry time so that the co-signers can return their signatures in time. Select **Generate keys**.

        The validator keys are generated and you can view the transaction details in the left pane. You can see the identity, the account, and the expiry time of the transaction. You can also see the public validator keys.

        #. You have to export the validator credentials so that you can restart the node with the new validator keys. Select **Export validator credentials**. If you're on Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save** and navigate to the place on your computer where you want to save the file.

        .. Warning::
            This is the only time that you can export the credentials. If you’re going to transfer the validator keys to someone else make sure to do so through a secure channel.

        **Generate the Transaction**

        There are two ways that you can generate the transaction:

        -  Generate the transaction without signing. This option enables you to export the transaction proposal without signing it. You don’t need a LEDGER device but you do need an internet connection.

        -  Generate and sign the transaction on the LEDGER device. This option requires a LEDGER device and an internet connection.

        In combination, these two options enable you to distribute the responsibility of creating and signing transfers among more people. You can, for example, have one person create the proposal and another one sign the proposal. It also makes it possible for you to sign the transaction on the Ledger in a different location than where the proposal was created.

        **Generate the transaction without signing**

        #. Verify that the **Transaction details** are as you intended, and then select **I am sure that the proposed changes are correct**.

        #. Select **Generate without signing**. You can now export the proposal.

        **Generate and sign the transaction on the LEDGER device**

        #. If you haven't connected the LEDGER device, there's a message in the Desktop Wallet saying **Waiting for connection** until you connect the LEDGER device. Enter your PIN code on the LEDGER device. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

        #. Wait for the message in the Desktop Wallet saying **Open the Concordium application on your Ledger Nano S** or **Open the Concordium application on your Ledger Nano S Plus**. On the LEDGER device, press the right button to navigate to the Concordium app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying LEDGER device is ready.

        #. In the Desktop Wallet, Verify that the **Transaction details** are as you intended, select **I am sure that the proposed changes are correct**, and then select **Generate and Sign**.

        #. On the LEDGER device, there's a message saying **Review transaction**. Verify that the sender account is correct, and navigate to the right. The LEDGER device says **Update baker keys**. Navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        .. Note::
            If you want to decline the transaction, press the right button on the LEDGER device. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In the Desktop Wallet, there's a message saying **The action was declined on the Ledger device. Please try again.**

        In the Desktop Wallet, you can now see **Transaction details**, **Signatures**, and **Security & Submission Details**, which include the status of the transaction, the identicon, and the transaction hash. If you have all the required signatures, you can :ref:`submit the transaction to the chain <submit-update-baker>`. Otherwise, you'll have to export the proposal and receive signatures from the co-signers.

        **Export a transaction proposal**

        If more than one signature is needed to sign off on the proposal, you have to share a file of the type JSON, which contains the transaction information,  with the co-signers.

        #. In the Desktop Wallet, select **Export transaction proposal**.

        #. Navigate to the location on your computer where you want to save the file. If you're on Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save**.

        #. You have to export the transaction proposal and send it to the co-signer through a secure channel. Optionally, you can also send the Identicon to the co-signers through a different secure channel.

        **Receive signatures from co-signers**

        When the co-signers have signed the transaction, they return the signed transaction proposal to you, and you have to import the files into the Desktop Wallet before you can submit the transaction to the chain.

        #. If you’re still on the same page, go to step 3. If you left the page with the account transaction, go to **Multi-signature Transactions**, and then select **Your proposed transactions**.

        #. Select the transaction that you want to submit to the chain. You can see an overview of the transaction details and an overview of the signatures. You can also see that the status of the transaction is Unsubmitted, and you can see the identicon and the transaction hash.

        #. Select **Browse to file** and then navigate to the location on your computer where you saved the signed transaction files. Select the relevant files, and then select **OK**. The files are uploaded to the Desktop Wallet and added to the list of signatures. Alternatively, you can drag and drop the signature files from their location on the computer and onto the Desktop Wallet.

        .. _submit-update-baker:

        **Submit the transaction to the blockchain**

        When you have received and added all the required signatures, you can submit the transaction to the blockchain.

        #. Review the transaction details carefully to ensure that all information is correct.

        #. Select **I understand this is the final submission and that it cannot be reverted**.

            If you don’t want to submit the transaction to the chain, you can select **Cancel**. The proposal is no longer active but still visible in the list of proposals.

        #. Select **Submit transaction to chain**. The transaction is submitted to the chain and finalized on the ledger.

        #. Select **Finish** to leave the page.

.. _remove-baker-mw:

Stop validation
===============

If you remove a validator, the node that is configured with the :term:`validator keys<private keys>` will stop producing blocks after the next :term:`pay day`.

After the :term:`cool-down period`, the amount that you previously staked is returned to your disposable balance at the next pay day. When you've removed the validator,
it is recommended that you also remove the keys from the node, but you should only do this after the node has stopped producing blocks, i.e. after the payday.
If you want to use the node for validation at a later point in time, you'll then have to create a new set of validator keys.


If you no longer wish to produce blocks on this account, you can stop validation.

.. dropdown:: |cryptox|

    #. Tap **Stop validation**.

        .. image:: ../images/cryptoX/cryptoX-stop-validation.png
            :width: 50%
            :alt: screen showing all validator options

    #. After the screens explaining validator removal, tap **Continue**.

    #. Review the information. When you are satisfied, tap **Submit validator transaction**.

    #. The |cryptox| shows that the transaction has been submitted to the chain. Tap **Finish**.


.. dropdown:: |bw|

    #. #. In the dropdown list, select the account for which you want to update validator options and click **Earn**.
    #. Click |earn| on the navigation bar. Use the left and right arrow to locate the button if necessary. Use the Accounts drop-down at the top of the window to select the account.

       .. image:: ../images/browser-wallet/setup-baking-delegation.png
           :width: 50%
           :alt: screen showing current validator setup and buttons to stop or update

    #. You see the current validator setup. Click **Stop**.

       .. image:: ../images/browser-wallet/update-baker-options.png
            :width: 50%
            :alt: screen showing current validator setup and buttons to stop or update

    #. Read the information about what happens when you stop validation. Click **Continue**.

    #. Review the transaction information. Click **Send**.

       .. image:: ../images/browser-wallet/stop-baking-review.png
           :width: 50%
           :alt: screen showing transaction details with send and back buttons

    #. Click **Finish** to finalize your transaction.

.. dropdown:: Desktop Wallet

    .. dropdown:: Single signature account

        #. Go to **Accounts**, select the account that you no longer want to be a validator account then click **More options**.

        #. Select **Validation**.

        #. Click **Stop validation**.

           .. image:: ../images/desktop-wallet/dw-baker-menu.png
               :width: 50%
               :alt: screen showing all validator options

        #. The cool-down period is displayed. Select **Continue**.

           .. image:: ../images/desktop-wallet/dw-remove-baker.png
               :width: 50%
               :alt: screen showing that validator will be removed

        #. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready**in the Desktop Wallet and select **Submit**.

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

        #. Wait for the message in the Desktop Wallet saying **Open the Concordium application on your Ledger Nano S** or **Open the Concordium application on your Ledger Nano S Plus**. On the LEDGER device, press the right button to navigate to the Concordium app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying LEDGER device is ready.

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
             :width: 20px
