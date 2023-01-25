.. include:: ../../variables.rst
.. _add-baker-mw:

====================================
Add baker in |mw-gen2| and |mw-gen1|
====================================

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

.. |earn| image:: ../images/earn.png
    :alt: Hand receiving money
    :width: 50px

.. |earn-w-text| image:: ../images/earn-w-text.png
    :alt: Hand receiving money with text earn
    :width: 50px

.. dropdown:: |mw-gen1|

    #. Go to **Accounts**. Tap on the balance area of the account you want to add as a baker account or tap **More** |moredetails|.

    #. In the hamburger menu |hamburger| tap **Baking**.

    #. After the screens explaining baking, specify the amount that you want to stake on the Register Baker screen. The more you stake, the greater the probability that your account will be chosen to bake the next block. Baker accounts receive a reward when they have baked a block, and the reward is added to the staked amount on the account by default. However, you can change this setting so that the reward is added to the disposable amount instead. Select **Don’t restake** if you'd rather add the rewards to the disposable amount on the account.

        .. image:: ../images/mobile-wallet/add-baker-amt-mw.png
            :width: 50%

    .. Note::

        There is a minimum amount to stake (14000 CCD) to become a baker.

    .. Warning::

       Do not stake all of your funds or you will not have enough to cover transaction fees for unstaking or other transactions.

    4. Choose whether you want to open a :ref:`baker pool<glossary-baker-pool>` or keep it closed. By opening a baker pool, others can delegate stake to your baker, thus increasing the chance that you are selected to bake a block and earn rewards. If you have a baker pool with delegators, the delegators also earn rewards when you bake blocks. Bakers are also paid a commission by the delegators for baking on their behalf. You can choose **Close for delegation** if you do not wish to run a baker pool.

        .. image:: ../images/mobile-wallet/add-baker-pool-mw.png
            :width: 50%

    5. If you open a baker pool, you can optionally enter a URL with information about your baker to give delegators more information about your baker pool to help them research baker pools. This information is not shared in the case of a closed baker.

        .. image:: ../images/mobile-wallet/add-baker-pool-url-mw.png
            :width: 50%

    6. You have to export the baker credentials so that you can start the node with the baker keys. Tap **Export baker keys** and navigate to the place on your device where you want to save the file. Give the file a name and the extension .json.

        .. image:: ../images/mobile-wallet/add-baker-export-keys-mw.png
            :width: 50%

    .. Warning::

        This is the only time that you can export the credentials. If you're going to transfer the baker keys to someone else, make sure to do so through a secure channel. Generate new keys if you believe the keys have been compromised or lost.

    7. Once you have saved the keys, you see an overview screen of the add baker transaction. Review the information then tap **Submit baker transaction**.

        .. image:: ../images/mobile-wallet/add-baker-submit-mw.png
            :width: 50%

    8. The wallet shows that the transaction has been submitted to the chain. Tap **Finish**. Once the transaction is approved, the active baker screen appears where you have the possibility to update baker settings.

        .. image:: ../images/mobile-wallet/add-baker-finish-mw.png
            :width: 50%

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

.. |hamburger| image:: ../images/hamburger.png
             :alt: Three horizontal lines
             :width: 20px

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
             :width: 50px
