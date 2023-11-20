.. include:: ../../variables.rst
.. _update-baker-mw:

====================
Change baker options
====================

.. Note::

   All transfers and transactions cost a fee, including staking and unstaking transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees. A locked-for-staking balance cannot be used to pay for these transactions.
   You can see the fee in the transaction log.

.. Warning::
    Transactions on the blockchain can't be reversed or deleted. They will always exist on the blockchain. Therefore, carefully review transactions before submitting.

The following information describes how to access baker settings to update your stake or restaking preference, to open and manage a baker pool, update baker keys, or stop baking.

The steps to get to these settings differ between |mw-gen2| and |mw-gen1|. They are described below.

.. dropdown:: |mw-gen2|

    #. You can either: tap |earn| on the account you want to delegate from in the **Accounts** page, or tap on an account card and tap |earn| on the account transaction overview screen.

    #. In the Baker status screen tap **Update baker settings**.

        .. image:: ../images/mobile-wallet/baker-status-mw.png
            :width: 50%
            :alt: screen showing current baker settings and update button

.. dropdown:: |mw-gen1|

    #. Go to **Accounts**. Tap on the balance area of the baker account you want update or tap **More** |moredetails|.

    #. In the hamburger menu |hamburger| tap **Baking**.

    #. In the Baker status screen tap **Update baker settings**.

        .. image:: ../images/mobile-wallet/baker-status-mw.png
            :width: 50%
            :alt: screen showing current baker settings and update button

Once you have access baker settings for your wallet, you have four options:

    - Update baker stake
    - Update pool settings
    - Update baker keys
    - Stop baking

.. _update-baker-stake-mw:

Update baker stake and restaking preference
===========================================

You can change the :ref:`staked amount <concepts-baker-stake>` on a baker account except during a :term:`cool-down period`. If you increase the stake, the new stake takes effect at the next :term:`pay day`. If the change is made in the last epoch before pay day, then the change will not occur until the following pay day. However, if you decrease the stake, there is a longer cool-down period of three weeks before the new stake is applied. During this period, you'll not be able to remove the baker account or further update the stake. After the cool-down period, the amount you’ve decreased the stake with is returned to your disposable balance at the next pay day.

When you change the stake it can influence your :term:`chance of being selected to bake a block<winning probability>` and receive baker rewards and of being included in the :term:`finalization` committee. If you decrease the stake, you decrease your chances of baking blocks and of being included in the finalization committee. Likewise, if you increase the stake, you increase your chances of baking a block and of being included in the finalization committee.

.. dropdown:: |mw-gen2| and |mw-gen1|

    If you choose **Update baker stake** you see your balance and the current Baker stake amount. Enter the amount you want to stake. This is the full amount to stake and is not added to the existing stake. You can also choose to adjust your restake setting between **Yes, restake** rewards or **No, don’t restake** rewards. Tap **Continue**.

    .. image:: ../images/mobile-wallet/update-baker-stake-amt-mw.png
        :width: 50%
        :alt: screen to update baker stake showing amount and restake preference options

    On the overview screen, check the information. Once you are satisfied, tap **Submit baker transaction**.

    Once the transaction is submitted you see a confirmation screen. Tap **Finish** to complete the action.

    .. Note::

        Reducing your stake results in a longer :term:`cool-down period`. The staked amount will be locked during this period and cannot be increased or decreased; you can still change restaking preferences during cool-down. The stake reduction is not effective until the next :term:`pay day` after cool-down period ends. During the cool-down period the staked amount continues earning rewards.

.. dropdown:: |bw|

    #. Click |earn| on the navigation bar. Use the left and right arrow to locate the button if necessary. Use the Accounts drop-down at the top of the window to select the account.

       .. image:: ../images/browser-wallet/setup-baking-delegation.png
           :width: 40%

    #. You see the current baker setup. Click **Update**.

       .. image:: ../images/browser-wallet/update-baker-options.png
           :width: 40%
           :alt: screen showing current baker setup and buttons to stop or update

    #. Click **Update baker stake**. Review the information about updating baker stake and click **Continue**.

       .. image:: ../images/browser-wallet/update-baker-actions.png
           :width: 40%
           :alt: screen showing actions to update baker

    #. You can change the restake preference if desired. Click **Continue**.

       .. image:: ../images/browser-wallet/update-baker-restake-pref.png
           :width: 40%
           :alt: screen showing buttons to set restake preference

    #. You can change the amount staked if desired. Click **Continue**.

       .. image:: ../images/browser-wallet/update-baker-stake.png
           :width: 40%
           :alt: screen showing text box to update staked amount

    #. Review the transaction details. Click **Send** to submit the transaction.

       .. image:: ../images/browser-wallet/update-baker-stake-review.png
           :width: 40%
           :alt: screen showing transaction receipt

    #. The wallet shows that the transaction has been submitted to the chain. Click **Finish**.

       .. image:: ../images/browser-wallet/update-baker-stake-finalize.png
           :width: 40%
           :alt: screen showing transaction receipt

.. dropdown:: Desktop Wallet

    .. dropdown:: Single signature account

        #. Go to **Accounts** and select the account whose baker stake you want to change.

        #. Click **More options** and select **Baking**.

        #. Click **Update baker stake**.

            .. image:: ../images/desktop-wallet/dw-baker-menu.png
                :alt: screen showing all baker options

        #. Enter the new amount that you want to stake if you want to change the amount. Change the restaking preference if you want to change that. Click **Continue**.

            .. image:: ../images/desktop-wallet/dw-baker-stake.png
                :alt: screen to update baker stake and restake preference options

        .. Note::
            If you reduce the staked amount, a :term:`cool-down<cool-down period>` period applies.

        5. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** in the Desktop Wallet and select **Submit**.

        #. On the LEDGER device, a message says **Review transaction**. Verify that the sender account is correct and navigate to the right. The LEDGER device says **Update stake to** and then the amount you're going to update the stake to. Navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

    .. dropdown:: Multi signature account

        #. Go to **Multi Signature Transactions**, select **Make new proposal**, and then select **Update baker stake**.

        #. Select the account whose baker stake you want to change.

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

.. dropdown:: |mw-gen2| and |mw-gen1|

    If you choose **Update pool settings**, you have three options:

    .. image:: ../images/mobile-wallet/update-baker-pool-mw.png
        :width: 50%
        :alt: screen showing three baker pool options

    - Open pool: open a pool for a previously closed baker
    - Closed for new: close the pool to new delegators. Existing delegators are not affected. You might do this when, for example, the pool is close to meeting one or both of the :ref:`bounding caps<delegation-concept>`. **It is the baker’s responsibility to monitor the stake to make pool management decisions.**
    - Close pool: close a pool permanently.

    If you choose **Open pool**:

    #. You can optionally enter a URL with information about your baker to give delegators more information about your baker pool to help them research baker pools. This information is not shared in the case of a closed baker.

    #. In the Update pool settings overview screen review the information then tap **Submit delegation transaction**.

    #. The |mw-gen2| or |mw-gen1| shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active baker screen appears where you have the possibility to update baker settings.

    If you choose **Closed for new**:

    Existing delegators remain in the pool. You have the option to adjust commission fees and your baker information URL.

    #. Enter an optional URL with information about your baker to give delegators more information about your baker pool to help them research baker pools. This information is not shared in the case of a closed baker.

    #. In the Update pool settings overview screen review the information then tap **Submit delegation transaction**.

    #. The |mw-gen2| or |mw-gen1| shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active baker screen appears where you have the possibility to update baker settings.

    If you choose **Close pool**:

    This closes the pool completely for both existing delegators and new delegators.

    #. In the Update pool settings overview screen review the information then tap **Submit delegation transaction**.

    #. The |mw-gen2| or |mw-gen1| shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active baker screen appears where you have the possibility to update baker settings.

.. dropdown:: |bw|

    #. Click |earn| on the navigation bar. Use the left and right arrow to locate the button if necessary. Use the Accounts drop-down at the top of the window to select the account.

       .. image:: ../images/browser-wallet/setup-baking-delegation.png
           :width: 40%

    #. You see the current baker setup. Click **Update**.

       .. image:: ../images/browser-wallet/update-baker-options.png
           :width: 40%
           :alt: screen showing current baker setup and buttons to stop or update

    #. Click **Update pool settings**. Review the information about updating baker pool settings and click **Continue**.

       .. image:: ../images/browser-wallet/update-baker-actions.png
           :width: 40%
           :alt: screen showing actions to update baker

    #. You can change the baker pool status, if desired. Click **Continue**. The options are:

       - Open pool: open a pool for a previously closed baker
       - Closed for new: close the pool to new delegators. Existing delegators are not affected. You might do this when, for example, the pool is close to meeting one or both of the :ref:`bounding caps<delegation-concept>`. **It is the baker’s responsibility to monitor the stake to make pool management decisions.**
       - Close pool: close a pool permanently.

       .. image:: ../images/browser-wallet/update-baker-pool-status.png
           :width: 40%
           :alt: screen showing actions to update baker pool status

    #. You can use the sliders to update the baker commission rates or type in the percentage you want for your commission rates, if desired. Click **Continue**.

       .. image:: ../images/browser-wallet/update-baker-pool-comms.png
           :width: 40%
           :alt: screen showing sliders and text boxes to adjust commissions

    #. Update the baker pool metadata URL, if desired. Click **Continue**.

       .. image:: ../images/browser-wallet/update-baker-pool-url.png
           :width: 40%
           :alt: screen showing text box to add or update baker pool URL

    #. Review the transaction details. Click **Send** to submit the transaction.

       .. image:: ../images/browser-wallet/update-baker-pool-review.png
           :width: 40%
           :alt: screen showing transaction receipt

    #. The wallet shows that the transaction has been submitted to the chain. Click **Finish**.

       .. image:: ../images/browser-wallet/update-baker-pool-finalize.png
           :width: 40%
           :alt: screen showing transaction receipt

.. dropdown:: Desktop Wallet

    .. dropdown:: Single signature account

        #. Go to **Accounts** and select the account on which you have a baker pool that you want to update and click **More options**.

        #. Select **Baking**.

        #. Click **Update baker pool**.

            .. image:: ../images/desktop-wallet/dw-baker-menu.png
                :alt: screen showing all baker options

        #. Choose the status for your baker pool if you want to change its status and click **Continue**. If you do not want to change the status, click **Continue**. Options are:

            - Open: open your baker pool to delegators.

            - Closed for new: close the baker pool to new delegators. Existing delegators remain in the pool.

            - Closed for all: close the pool for all delegators.

            .. image:: ../images/desktop-wallet/dw-pool-status.png
                :alt: screen showing baker pool options

        #. Review the commission rates. Click **Continue**.

            .. image:: ../images/desktop-wallet/dw-pool-commission.png
                :alt: screen displaying the commission rates for baker pools

        #. Enter your Baker metadata URL if you want to provide this information to potential delegators. This is optional. **Click Continue**.

            .. image:: ../images/desktop-wallet/dw-pool-url.png
                :alt: screen to enter a URL for baker pool metadata

        #. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** in the Desktop Wallet and select **Submit**.

        #. On the LEDGER device, a message says **Review transaction**. Verify that the sender account is correct and navigate to the right. Verify that the LEDGER device shows the correct amount to delegate and navigate to the right. Verify that the restake preference is correct and navigate to the right. Verify that the delegation target is correct and navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

    .. dropdown:: Multi signature account

        #. Go to **Multi Signature Transactions**, select **Make new proposal**, and then select **Update baker pool**.

        #. Choose the status for your baker pool if you want to change its status and click **Continue**. If you do not want to change the status, click **Continue**. Options are:

            - Open: open your baker pool to delegators.

            - Closed for new: close the baker pool to new delegators. Existing delegators remain in the pool.

            - Closed for all: close the pool for all delegators.

        #. Review the commission rates. Click **Continue**.

        #. Enter your Baker metadata URL if you want to provide this information to potential delegators. This is optional. **Click Continue**.

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

   Closing a pool does not mean that baking stops. You continue baking but only using your own stake. If you wish to stop baking, you must :ref:`stop baking<remove-baker-mw>`.

.. _update-baker-keys-mw:

Update baker keys
=================

If you believe your baker keys have been compromised or lost, you can generate new baker keys. It is important to remember to update your baker keys on your node once you have exported them.

.. dropdown:: |mw-gen2| and |mw-gen1|

    #. If you choose **Update baker keys**, after the screens explaining reasons for updating baker keys, you see the new baker keys. Tap **Export baker keys** and navigate to the place on your device where you want to save the file.

        .. image:: ../images/mobile-wallet/update-baker-keys.png
            :width: 50%
            :alt: screen showing new keys with button to export

    .. Warning::

        This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else, make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

    2. Once you have saved the keys, review the information on the overview screen of the add baker transaction then tap **Submit baker transaction**.

    3. The |mw-gen2| or |mw-gen1| shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active baker screen appears where you have the possibility to update baker settings.

    4. You need to import your baker keys file to your node in order to start baking with the new keys. It is preferable to update them on the node as close to :term:`pay day` as possible to prevent the node from being down as a baker for a longer time.

        - :ref:`Windows<baker-windows>`
        - :ref:`macOS<baker-macos>`
        - :ref:`Docker<baking-docker>`
        - :ref:`Ubuntu<baker-ubuntu>`

.. dropdown:: |bw|

    #. Click |earn| on the navigation bar. Use the left and right arrow to locate the button if necessary. Use the Accounts drop-down at the top of the window to select the account.

       .. image:: ../images/browser-wallet/setup-baking-delegation.png
           :width: 40%
           :alt: screen showing current baker setup and buttons to stop or update

    #. You see the current baker setup. Click **Update**.

       .. image:: ../images/browser-wallet/update-baker-options.png
           :width: 40%
           :alt: screen showing current baker setup and buttons to stop or update

    #. Click **Update baker keys**. Review the information about updating baker keys and click **Continue**.

       .. image:: ../images/browser-wallet/update-baker-actions.png
           :width: 40%
           :alt: screen showing actions to update baker

    #. Click **Export baker keys** and the keys are automatically downloaded as `baker-credentials.json` to your default download folder. Click **Continue** to complete the transaction.

       .. image:: ../images/browser-wallet/update-baker-keys.png
           :alt: screen with buttons to show keys or export baker keys
           :width: 40%

       .. image:: ../images/browser-wallet/add-baker-continue-after-export.png
           :alt: screen with buttons to continue after export and wallet screen dimmed behind
           :width: 40%

    #. Once you have saved the keys, you see an overview screen of the add baker transaction. Review the information then click **Send**.

       .. image:: ../images/browser-wallet/update-baker-keys-review.png
            :width: 40%

    #. The wallet shows that the transaction has been submitted to the chain. Click **Finish**.

       .. image:: ../images/browser-wallet/update-baker-keys-finish.png
            :width: 40%

    #. You need to import your baker keys file to your node in order to start baking. It is preferable to update them on the node as close to the next :term:`pay day` as possible to prevent the node from being down as a baker for a longer time.

       - :ref:`Windows<baker-windows>`
       - :ref:`macOS<baker-macos>`
       - :ref:`Docker<baking-docker>`
       - :ref:`Ubuntu<baker-ubuntu>`


.. dropdown:: Desktop Wallet

    .. dropdown:: Single signature account

        #. Go to **Accounts**, select the account whose baker keys you want to update.

        #. Click **More options** and select **Baking**.

        #. Click **Update baker keys**.

            .. image:: ../images/desktop-wallet/dw-baker-menu.png
                :alt: screen showing all baker options

        #. You have to export the baker credentials so that you can restart the node with the new baker keys. Select **Export baker credentials**. If you're running Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save** and navigate to the place on your computer where you want to save the file.

            .. image:: ../images/desktop-wallet/dw-baker-keys.png
                :alt: screen showing new keys with button to export

        .. Warning::
            This is the only time that you can export the credentials. If you’re going to transfer the baker keys to someone else, make sure to do so through a secure channel.

        5. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** in the Desktop Wallet and click **Submit**.

        #. On the LEDGER device, a message says **Review transaction**. Verify that the sender account is correct and navigate to the right. The LEDGER device says **Update baker keys**. Navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

    .. dropdown:: Multi signature account

        #. Go to **Multi Signature Transactions**, and select **Make new proposal**, and then select **Update Baker Keys**.

        #. Select the **Account** whose baker keys you want to update, and then select **Continue**. Only baker accounts are listed.

        #. Set an expiry date and time for your proposal. You must set the expiry time so that the co-signers can return their signatures in time. Select **Generate keys**.

        The baker keys are generated and you can view the transaction details in the left pane. You can see the identity, the account, and the expiry time of the transaction. You can also see the public baker keys.

        #. You have to export the baker credentials so that you can restart the node with the new baker keys. Select **Export baker credentials**. If you're on Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save** and navigate to the place on your computer where you want to save the file.

        .. Warning::
            This is the only time that you can export the credentials. If you’re going to transfer the baker keys to someone else make sure to do so through a secure channel.

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

Stop baking
===========

If you remove a baker, the node that is configured with the :term:`baker keys<private keys>` will stop baking after a :term:`cool-down period` of three weeks. During this period, you'll not be able update the stake. After the cool-down period, the amount that you previously staked is returned to your disposable balance at the next :term:`pay day`. When you've removed the baker, it is recommended that you also remove the keys from the node. If you want to use the node for baking at a later point in time, you'll then have to create a new set of baker keys.

If you no longer wish to bake on this account, you can stop baking.

.. dropdown:: |mw-gen2| and |mw-gen1|

    #. Tap **Stop baking**.

        .. image:: ../images/mobile-wallet/baker-hamburger-menu.png
            :width: 50%
            :alt: screen showing all baker options

    #. After the screens explaining baker removal, review the information on the overview screen. When you are satisfied, tap **Submit baker transaction**.

    #. The |mw-gen2| or |mw-gen1| shows that the transaction has been submitted to the chain. Tap **Finish**.

.. dropdown:: |bw|

    #. Click |earn| on the navigation bar. Use the left and right arrow to locate the button if necessary. Use the Accounts drop-down at the top of the window to select the account.

       .. image:: ../images/browser-wallet/setup-baking-delegation.png
           :width: 40%
           :alt: screen showing current validator setup and buttons to stop or update

    #. You see the current baker setup. Click **Stop**.

       .. image:: ../images/browser-wallet/update-baker-options.png
           :width: 40%
           :alt: screen showing current baker setup and buttons to stop or update

    #. Read the information about what happens when you stop baking. Click **Continue**.

    #. Review the transaction information. Click **Send**.

       .. image:: ../images/browser-wallet/stop-baking-review.png
           :width: 40%
           :alt: screen showing transaction details with send and back buttons

    #. Click **Finish** to finalize your transaction.

.. dropdown:: Desktop Wallet

    .. dropdown:: Single signature account

        #. Go to **Accounts**, select the account that you no longer want to be a baker account then click **More options**.

        #. Select **Baking**.

        #. Click **Stop baking**.

            .. image:: ../images/desktop-wallet/dw-baker-menu.png
                :width: 50%
                :alt: screen showing all baker options

        #. The cool-down period is displayed. Select **Continue**.

            .. image:: ../images/desktop-wallet/dw-remove-baker.png
                :width: 50%
                :alt: screen showing that baker will be removed

        #. A message says **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready**in the Desktop Wallet and select **Submit**.

        #. On the LEDGER device, a message says **Review transaction**. Verify that the sender account is correct, and navigate to the right. The LEDGER device says **Remove baker from pool**. Navigate to the right.

        #. The LEDGER device says **Sign transaction**. Press both buttons to sign the transaction. The LEDGER device says **Concordium is ready**.

        #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

    .. dropdown:: Multi signature account

        #. Go to **Multi Signature Transactions**, select **Make new proposal**, and then select **Stop baking**.

        #. Select the **Account** that you no longer want to be a baker account, and then select **Continue**.

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

    When you stop baking, there is a longer :term:`cool-down period` before the transaction takes effect. During the cool-down period, your stake continues to earn rewards.

.. Note::

   If you stop baking, remember that this does not shut down your node. You need to shut down the node in a separate action if you no longer wish to run a node on the Concordium blockchain.

.. |earn| image:: ../images/earn.png
             :alt: Hand receiving money
             :width: 50px

.. |hamburger| image:: ../images/hamburger.png
             :alt: Three horizontal lines
             :width: 20px

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
             :width: 20px
