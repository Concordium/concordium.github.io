.. include:: ../../variables.rst
.. _add-baker-mw:

====================================
Add baker
====================================

Prior to becoming a baker, read :ref:`Baker management<baker-pool>` to learn about best practices for bakers.

.. Note::

   All transfers and transactions cost a fee, including staking and unstaking transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees. A locked-for-staking balance cannot be used to pay for these transactions.
   You can see the fee in the transaction log.

.. dropdown:: Desktop wallet

    .. Note::

        A Single-signature account is an account with only one credential holder. A Multi-signature account is an account where multiple individuals are credential holders and a certain number of credential holders must sign transactions on the account. For more information about multi-signature accounts, see :ref:`overview-shared-accounts`.

    .. dropdown:: Single signature account

        #. Go to **Accounts** and select the account you want to add as baker account and click **More options**.

        #. Select **Register as a baker**.

            .. image:: ../images/desktop-wallet/dw-account-menu-regular.png
                :width: 50%
                :alt: screen showing all account options

        #. Specify the amount that you want to stake where it says **Amount**. The more you stake, the greater the probability that your account will be chosen to bake the next block.

            Baker accounts receive a reward when they have baked a block, and the reward is added to the staked amount on the account by default. However, you can change this setting so that the reward is added to the disposable amount instead.

            Select **No, don’t restake** if you'd rather add the rewards to the disposable amount on the account.

        #. Choose if you want to open a baker pool so delegators may delegate stake to your baker.

            - Choose Open to open your baker pool for this baker. Click **Continue**. Click **Continue** after reviewing the commission rates. Enter your Baker metadata URL if you want to provide this information to potential delegators. This is optional. **Click Continue**.

            - Choose Closed if you do not want to open a baker pool. Click **Continue** after reviewing the commission rates and Baker metadata URL.

        #. You have to export the baker credentials so that you can start the node with the baker keys. Select **Export baker credentials** and navigate to the place on your computer where you want to save the file. If you're running Windows make sure that **All Files** is selected in **Save as type**. Give the file a name and the extension .json, and then click **Save** and navigate to the place on your computer where you want to save the file.

        .. Warning::

            This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else, make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

        6. There's a message saying **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on the LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** in the Desktop Wallet and select **Submit**.

        #. On the LEDGER device, a message says **Review transaction**. Review the information to verify that it matches the transaction details in the Desktop Wallet.

        #. When the LEDGER device says **Sign transaction**, press both buttons to confirm the transaction. The LEDGER device says **Concordium is ready**.

        #. In the Desktop Wallet, you can see that the transaction has been submitted to the chain. Select **Finish**.

    .. dropdown:: Multi signature account

        #. Go to the **Multi Signature Transactions** tab, and then select **Make new proposal**.

        #. Click **Register as a Baker**.

        #. Select the account you want to add as baker account, and then select **Continue**.

        **Stake an amount**

        You need to stake an amount of CCD on the account that you want to add as baker account. When you have staked an amount, the amount is still part of the balance, but you can't transfer it to other accounts. The account always shows how much of the balance that's been staked.

        #. Specify the amount that you want to stake where it says **Amount**. The more you stake the greater is the probability that your account will be chosen to bake the next block.

            Baker accounts receive a reward when they have baked a block, and the reward is added to the staked amount on the account by default. However, you can change this setting so that the reward is added to the disposable amount instead.

            -  Select **No, don’t restake** if you'd rather add the rewards to the disposable amount on the account.

        #. Choose if you want to open a baker pool so delegators may delegate stake to your baker.

            - Choose Open to open your baker pool for this baker. Click **Continue**. Click **Continue** after reviewing the commission rates. Enter your Baker metadata URL if you want to provide this information to potential delegators. **Click Continue**.

            - Choose Closed if you do not want to open a baker pool. Click **Continue** after reviewing the commission rates and Baker metadata URL.

        #. When you look at the **Transaction Details** in the left pane, you can see the identity of the account owner, the account where the CCD are staked from, the staked amount, the estimated fee, and whether rewards are going to be restaked. Verify that the details are as you intended.

        #. Select **Generate keys**. The baker keys are generated and the public keys are displayed in the left pane. There are three public keys:

            - Election verify key
            - Signature verify key
            - Aggregation verify

        #. Select **Continue** to generate the transaction.

        **Generate the transaction**

        There are two ways that you can generate the transaction:

        -  :ref:`Generate the transaction without signing<generate-without-sign>`. This option enables you to export the transaction proposal without signing it. You don't need a LEDGER device but you do need an internet connection.

        -  :ref:`Generate and sign the transaction<generate-sign>` This option requires a LEDGER device and an internet connection.

        In combination, these two options enable organizations to distribute the responsibility of creating and signing transfers among more people. It makes it possible to have one employee create the proposals and another one sign the proposals. It also makes it possible to sign the transaction on the Ledger in a different location than where the proposal was created.

        .. _generate-without-sign:

        *Generate the transaction without signing*

        #. Verify that the Transaction details are as you are as you intended, and then select **I am sure that the proposed changes are correct**.

        #. Select **Generate without signing**. You can now :ref:`export the baker credentials<export-baker-credentials>`.

        .. _generate-sign:

        *Generate and sign the transaction on the LEDGER device*

        #. Connect the LEDGER device to the computer if you haven't done so already. There’s a message saying **Waiting for device. Please connect your Ledger**.

        #. Enter your PIN code on the LEDGER device. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready**.

        #. In the Desktop Wallet verify that all transaction details are correct and select **I am sure that the proposed changes are correct**.

        #. Select **Generate and sign**. There's a message saying **Waiting for user to finish the process on the device**.

        #. On the LEDGER device, there's a message saying **Review transaction**. Review the information to verify that it matches the transaction details in the Desktop Wallet.

        #. When the LEDGER device says **Sign transaction**, press both buttons to confirm the transaction. The LEDGER device says **Concordium is ready**.

        .. Note::
            If  you want to decline the transaction, press the right button on the LEDGER device. The hardware wallet now says **Decline to sign transaction**. Press both buttons to decline. In the Desktop Wallet there's a message saying **The action was declined on the Ledger device. Please try again.**

            .. _export-baker-credentials:

        **Export baker credentials**

        #. You have to export the baker credentials so that you can start the node with the baker keys. Select **Export baker credentials** and navigate to the place on your computer where you want to save the file.

        You can now see **Transaction details**, **Signatures**, and **Security & Submission Details**, which includes the status of the transaction, the identicon, and the digest to sign. You can also see the date and time before which you must submit the transaction proposal. If no more signatures are required, you can :ref:`submit the transaction to the blockchain <submit-transaction>`. If more signatures are required, you'll have to export and send the transaction proposal to the co-signers.

        .. Warning::
            This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

        **Export a transaction proposal**

        If more than one signature is needed to sign off on the baker account proposal, you must share a file of the type JSON with the co-signers. In the **Signatures** pane, you can see how many signatures are required before you can submit the transaction to the blockchain.

        #. In the Desktop Wallet, select **Export transaction proposal**.

        #. Navigate to the location on your computer where you want to save the file. If you're on Windows make sure that **All Files** is selected. Give the file a name and the extension .json, and then click **Save**.

        #. Send a copy of the file through a secure channel to the co-signers that must sign the transaction. Optionally, you can also send a copy of the identicon through a secure channel that is different from the one used to send the file.

        **Receive signatures from co-signers**

        When the co-signers have signed the transaction, they return the signed transaction proposal to you, and you have to import the files into the Desktop Wallet before you can submit the transaction to the chain.

        #. If you left the page with the account transaction, go to **Multi-signature Transactions**, and then select **Your proposed transactions**. If you're still on the same page, go to step 3.

        #. Select the transaction that you want to submit to the chain. You can see an overview of the transaction details and an overview of the signatures. You can also see that the status of the transaction is **Unsubmitted**, and you can see the identicon, and the transaction hash.

        #. Select **Browse to file** and then navigate to the location on your computer where you saved the signed transaction files. Select the relevant files, and then select **OK**. The files are uploaded to the Desktop Wallet and added to the list of signatures. Alternatively, you can drag and drop the signature files from their location on the computer and on to the Desktop Wallet.

        .. _submit-transaction:

        **Submit the transaction to the blockchain**

        When you have received and added all the required signatures, you can submit the transaction to the blockchain.

        #. Review the transaction details carefully to ensure that all information is correct.

        #. Select **I understand this is the final submission, and that it cannot be reverted.**

            -  If you don't want to submit the transaction to the chain, you can select **Cancel**. The proposal is no longer active; however it is still visible in the list of proposals.

        #. Select **Submit transaction to chain.** The transaction is submitted to the chain and finalized on the ledger.

        #. Select **Finish** to leave the page.

.. dropdown:: |mw-gen2|

    #. You can either: tap |earn| on the account you want to delegate from in the **Accounts** page, or tap on an account card and tap |earn| on the account transaction overview screen.

    #. Select **Continue to baker setup**.

    #. After the screens explaining baking, specify the amount that you want to stake on the Register Baker screen. The more you stake, the greater the probability that your account will be chosen to bake the next block. Baker accounts receive a reward when they have baked a block, and the reward is added to the staked amount on the account by default. However, you can change this setting so that the reward is added to the disposable amount instead. Select **Don’t restake** if you'd rather add the rewards to the disposable amount on the account.

        .. image:: ../images/mobile-wallet/add-baker-amt-mw.png
            :alt: screen to register baker for first time showing balance, amount to stake, and restake parameters
            :width: 50%

    .. Note::

        There is a minimum amount to stake (14000 CCD) to become a baker.

    .. Warning::

       Do not stake all of your funds or you will not have enough to cover transaction fees for unstaking or other transactions.

    4. Choose whether you want to open a :ref:`baker pool<glossary-baker-pool>` or keep it closed. By opening a baker pool, others can delegate stake to your baker, thus increasing the chance that you are selected to bake a block and earn rewards. If you have a baker pool with delegators, the delegators also earn rewards when you bake blocks. Bakers are also paid a commission by the delegators for baking on their behalf. You can choose **Close for delegation** if you do not wish to run a baker pool.

        .. image:: ../images/mobile-wallet/add-baker-pool-mw.png
            :alt: screen to register baker for first time showing options to open or close pool for delegation
            :width: 50%

    5. If you open a baker pool, you can optionally enter a URL with information about your baker to give delegators more information about your baker pool to help them research baker pools. This information is not shared in the case of a closed baker.

        .. image:: ../images/mobile-wallet/add-baker-pool-url-mw.png
            :alt: screen to register baker for first time showing field to paste URL with metadata for baker pools
            :width: 50%

    6. You have to export the baker credentials so that you can start the node with the baker keys. Tap **Export baker keys** and navigate to the place on your device where you want to save the file. Give the file a name and the extension .json.

        .. image:: ../images/mobile-wallet/add-baker-export-keys-mw.png
            :alt: screen to register baker for first time showing all of the baker keys with option to export
            :width: 50%

    .. Warning::

        This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else, make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

    7. Once you have saved the keys, you see an overview screen of the add baker transaction. Review the information then tap **Submit baker transaction**.

        .. image:: ../images/mobile-wallet/add-baker-submit-mw.png
            :alt: screen to register baker for first time showing transaction details with option to submit
            :width: 50%

    8. The wallet shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active baker screen appears where you have the possibility to update baker settings.

        .. image:: ../images/mobile-wallet/add-baker-finish-mw.png
            :alt: screen to register baker for first time showing transaction submission and finish option
            :width: 50%

    9. You need to import your baker keys file to your node in order to start baking. It is preferable to update them on the node as close to the next :ref:`pay day<glossary-pay-day>` as possible to prevent the node from being down as a baker for a longer time.

        - :ref:`Windows<baker-windows>`
        - :ref:`macOS<baker-macos>`
        - :ref:`Docker<baking-docker>`
        - :ref:`Ubuntu<baker-ubuntu>`

    Once the transaction is finalized after importing your baker keys to the node, you see the baking status reflected in the account list and on the account card.

    .. image:: ../images/mobile-wallet/account-list-baking.png
        :alt: account information in list showing baking bread
        :width: 40%

    .. image:: ../images/mobile-wallet/account-details-baking.png
        :alt: account card showing staked amount with baker number
        :width: 40%

.. dropdown:: |mw-gen1|

    #. Go to **Accounts**. Tap on the balance area of the account you want to add as a baker account or tap **More** |moredetails|.

    #. In the hamburger menu |hamburger| tap **Baking**.

    #. After the screens explaining baking, specify the amount that you want to stake on the Register Baker screen. The more you stake, the greater the probability that your account will be chosen to bake the next block. Baker accounts receive a reward when they have baked a block, and the reward is added to the staked amount on the account by default. However, you can change this setting so that the reward is added to the disposable amount instead. Select **Don’t restake** if you'd rather add the rewards to the disposable amount on the account.

        .. image:: ../images/mobile-wallet/add-baker-amt-mw.png
            :width: 50%
            :alt: screen to register baker with amount to stake and restake preference

    .. Note::

        There is a minimum amount to stake (14000 CCD) to become a baker.

    .. Warning::

       Do not stake all of your funds or you will not have enough to cover transaction fees for unstaking or other transactions.

    4. Choose whether you want to open a :ref:`baker pool<glossary-baker-pool>` or keep it closed. By opening a baker pool, others can delegate stake to your baker, thus increasing the chance that you are selected to bake a block and earn rewards. If you have a baker pool with delegators, the delegators also earn rewards when you bake blocks. Bakers are also paid a commission by the delegators for baking on their behalf. You can choose **Close for delegation** if you do not wish to run a baker pool.

        .. image:: ../images/mobile-wallet/add-baker-pool-mw.png
            :width: 50%
            :alt: screen to choose whether to open a baker pool

    5. If you open a baker pool, you can optionally enter a URL with information about your baker to give delegators more information about your baker pool to help them research baker pools. This information is not shared in the case of a closed baker.

        .. image:: ../images/mobile-wallet/add-baker-pool-url-mw.png
            :width: 50%
            :alt: screen to enter optional URL for baker pool metadata

    6. You have to export the baker credentials so that you can start the node with the baker keys. Tap **Export baker keys** and navigate to the place on your device where you want to save the file. Give the file a name and the extension .json.

        .. image:: ../images/mobile-wallet/add-baker-export-keys-mw.png
            :width: 50%
            :alt: screen to export baker keys to import them to node

    .. Warning::

        This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else, make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

    7. Once you have saved the keys, you see an overview screen of the add baker transaction. Review the information then tap **Submit baker transaction**.

        .. image:: ../images/mobile-wallet/add-baker-submit-mw.png
            :width: 50%
            :alt: screen to review baker submit transaction

    8. The wallet shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active baker screen appears where you have the possibility to update baker settings.

        .. image:: ../images/mobile-wallet/add-baker-finish-mw.png
            :width: 50%
            :alt: screen to show transaction submitted

    9. You need to import your baker keys file to your node in order to start baking. It is preferable to update them on the node as close to the next :ref:`pay day<glossary-pay-day>` as possible to prevent the node from being down as a baker for a longer time.

        - :ref:`Windows<baker-windows>`
        - :ref:`macOS<baker-macos>`
        - :ref:`Docker<baking-docker>`
        - :ref:`Ubuntu<baker-ubuntu>`

    Once the transaction is finalized after importing your baker keys to the node, you see the baking status reflected in the account list and on the account card.

    .. image:: ../images/mobile-wallet/account-list-baking.png
        :width: 40%
        :alt: account list screen showing a baker account with bread icon

    .. image:: ../images/mobile-wallet/account-details-baking.png
        :width: 40%
        :alt: account detail screen showing the account as baker with baker ID and staked amount

.. dropdown:: |bw|

    #. Click |earn| on the navigation bar. Use the left and right arrow to locate the button if necessary.

        .. image:: ../images/browser-wallet/setup-baking-delegation.png
            :width: 40%

    #. Click **Setup baking**. If you are baking for the first time on this account, you see some information about baking.

    #. Select your restake preference. Baker accounts receive a reward when they have baked a block, and the reward is added to the staked amount on the account by default. However, you can change this setting so that the reward is added to the disposable amount instead. Click **Yes, restake** to restake any rewards or click **No, don't restake** if you don’t want to restake rewards. If you do not restake, rewards are deposited to your disposable balance. Click **Continue**.

        .. image:: ../images/browser-wallet/add-baker-restake.png
            :alt: screen with Yes restake or No don't restake text boxes to choose
            :width: 40%

    #. Specify the amount that you want to stake. The more you stake, the greater the probability that your account will be chosen to bake the next block. Click **Continue**.

        .. image:: ../images/browser-wallet/add-baker-staked-amount.png
            :alt: screen with balances at the top and text box to enter amount to stake
            :width: 40%

    .. Note::

        There is a minimum amount to stake (14000 CCD) to become a baker.

    .. Warning::

       Do not stake all of your funds or you will not have enough to cover transaction fees for unstaking or other transactions.

    4. Choose whether you want to open a :ref:`baker pool<glossary-baker-pool>` or keep it closed. Choose **Open for delegation** to open a baker pool. By opening a baker pool, others can delegate stake to your baker, thus increasing the chance that you are selected to bake a block and earn rewards. If you have a baker pool with delegators, the delegators also earn rewards when you bake blocks. Bakers are also paid a commission by the delegators for baking on their behalf. You can choose **Close for delegation** if you do not wish to run a baker pool. Click **Continue**.

        .. image:: ../images/browser-wallet/add-baker-pool.png
            :alt: screen with buttons to open a pool for delegation or close a pool for delegation
            :width: 40%

    5. Review the commissions paid to bakers. When you open your baker as a pool, you earn commissions of stake delegated to your pool from other accounts. Click **Continue**.

        .. image:: ../images/browser-wallet/add-baker-comms.png
            :alt: screen showing commission amounts for bakers in read-only
            :width: 40%

    6. If you open a baker pool, you can optionally enter a URL with information about your baker to give delegators more information about your baker pool to help them research baker pools. This information is not shared in the case of a closed baker pool. Click **Continue**.

        .. image:: ../images/browser-wallet/add-baker-url.png
            :alt: screen with text box to enter url for baker pool information
            :width: 40%

    7. You have to export the baker keys so that you can start the node with the baker keys. Click **Export baker keys** and navigate to the place on your device where you want to save the file. Give the file a name and the extension .json. Click **Continue** to complete the transaction.

        .. image:: ../images/browser-wallet/add-baker-export-keys.png
            :alt: screen with buttons to show keys or export baker keys
            :width: 40%

        .. image:: ../images/browser-wallet/add-baker-continue-after-export.png
            :alt: screen with buttons to continue after export and wallet screen dimmed behind
            :width: 40%

    .. Warning::

        This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else, make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

    7. Once you have saved the keys, you see an overview screen of the add baker transaction. Review the information then click **Send**.

        (screenshot)

    8. The wallet shows that the transaction has been submitted to the chain. Click **Finish**.

        (screenshot)

    9. You need to import your baker keys file to your node in order to start baking. It is preferable to update them on the node as close to the next :ref:`pay day<glossary-pay-day>` as possible to prevent the node from being down as a baker for a longer time.

        - :ref:`Windows<baker-windows>`
        - :ref:`macOS<baker-macos>`
        - :ref:`Docker<baking-docker>`
        - :ref:`Ubuntu<baker-ubuntu>`

    Once the transaction is finalized after importing your baker keys to the node, you see the baking status reflected in the account list and on the account card.

    .. image:: ../images/mobile-wallet/account-list-baking.png
        :width: 40%

    .. image:: ../images/mobile-wallet/account-details-baking.png
        :width: 40%

.. Warning::

    Transactions on the blockchain are permanent. That is, they are irreversible and can't be deleted. Therefore, carefully review that you have selected the right account to add as baker, and that you have entered the correct amount to stake.

.. |earn| image:: ../images/earn.png
    :alt: Hand receiving money
    :width: 50px

.. |hamburger| image:: ../images/hamburger.png
             :alt: Three horizontal lines
             :width: 20px

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
             :width: 50px
