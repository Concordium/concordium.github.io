.. include:: ../../variables.rst
.. _shield-CCD-wallets:

==========================
Unshield CCD on an account
==========================

.. _shielded-balance-feature-deprecation:

.. note::

   Functionalities related to shielding a balance are deprecated in protocol 7 and above.
   No additional shielded balance can be added to an account and no transfer of shielded balance is possible.
   Only unshielding of an already shielded balance is possible and recommended to be done.
   Wallets and command-line tools will continue to display shielded balances and support the
   unshielding flow to recover already shielded funds.

.. Note::

   All transfers and transactions cost a fee, including unshielding transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

.. Note::

    On Testnet you can request CCDs for testing purposes. Use the button in either Desktop Wallet, |mw-gen2|, or |mw-gen1| to request 2000 CCDs.

.. dropdown:: Desktop Wallet

    .. dropdown:: Unshield CCD

        #. Select **Shielded Balance** on the relevant account, and then select **Unshield**.

            .. image:: ../images/desktop-wallet/dw-unshield.png

        #. Enter the amount of CCD that you want to unshield, and then select **Continue**.

            .. image:: ../images/desktop-wallet/dw-unshield-ccd.png

        #. There's a message saying **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on LEDGER device.

        #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** and select **Submit**.

        #. Press both buttons on the LEDGER device to confirm the decryption.

        #. Review the transaction on the LEDGER device and verify that the information matches the **Transaction details** in the Desktop Wallet. Navigate to the right and verify the sender address is correct. Continue navigating to the right and verify that the amount and the recipient address are correct.

        #. Press both buttons to sign the transaction. In the Desktop Wallet, you can see that the transfer has been submitted to the chain. Select **Finish**. When the transaction has been finalized, you can see the shielded balance on the account overview.

        When the transaction has been finalized, you can see that the shielded balance has changed, and you can see the the amount you unshielded in the **Transfers** list.

.. dropdown:: |mw-gen2|

    .. dropdown:: Unshield CCD

        #. Go to the **Accounts** page.

        #. Tap the account you want to unshield CCD on or tap |more-acct| on the account card.

        #. If the Shielded balance is already shown, tap the Shielded balance tab.

            - If the **Unshield** button and **Shielded balance** tab are not visible, tap |acct-settings| then select **Show shielded balance**.

        #. Now the totals area contains tabs for both **Balance** and **Shielded Balance** and an **Unhield** button.

        #. Tap |unshield-mw|.

        #. Enter the amount you want to move to the regular balance.

            .. image:: ../images/mobile-wallet/MW48.png
               :width: 25%

        #. Tap **Unshield amount**.

            .. image:: ../images/mobile-wallet/MW49.png
                :width: 25%

        #. Confirm your choices and tap **Unshield amount**.

            .. image:: ../images/mobile-wallet/MW50.png
                :width: 25%

        #. Your shielding transaction has now been submitted to the blockchain. Tap **Finish**.

            .. image:: ../images/mobile-wallet/MW51.png
                :width: 25%

        The transaction might take a little while to finalize on the blockchain, and you can follow the status in the transaction log.

        .. Note::

            You can hide the shielded balance. In the Account transaction overview tap |acct-settings| and tap
            **Hide shielded balance**. This removes the shielded balance tab. Note that the shielded balance still
            exists on the account; it is just not shown in the interface.

    .. |more-acct| image:: ../images/more-acct.png
        :alt: Button with double-headed arrow
        :width: 50px

    .. |acct-settings| image:: ../images/acct-settings.png
                    :alt: gear wheel on blue background
                    :width: 50px

    .. |unshield-mw| image:: ../images/unshield-mw.png
                    :alt: dissolving shield on blue background
                    :width: 50px

.. dropdown:: |mw-gen1|

    .. dropdown:: Unshield CCD

        #. Go to the **Accounts** page.

        #. Tap the account you want to unshield CCD on or tap |moredetails| on the account card.

        #. If the Shielded balance is already shown, tap the Shielded balance tab.

            - If the **Unshield** button and **Shielded balance** tab are not visible, tap the |hamburger| menu in the upper right corner. Tap **Show shielded balance on account name**.

        #. Now the totals area contains tabs for both **Balance** and **Shielded Balance** and an **Unhield** button.

        #. Tap **UNSHIELD**.

            .. image:: ../images/mobile-wallet/MW47.png
                :width: 25%

        #. Enter the amount you want to move to the regular balance.

            .. image:: ../images/mobile-wallet/MW48.png
                :width: 25%

        #. Tap **Unshield amount**.

            .. image:: ../images/mobile-wallet/MW49.png
                :width: 25%

        #. Confirm your choices and tap **Unshield amount**.

            .. image:: ../images/mobile-wallet/MW50.png
                :width: 25%

        #. Your shielding transaction has now been submitted to the blockchain. Tap **Finish**.

            .. image:: ../images/mobile-wallet/MW51.png
                :width: 25%

        The transaction might take a little while to finalize on the blockchain, and you can follow the status in the transaction log.

        .. Note::

            You can hide the shielded balance. In the Account transaction overview tap the |hamburger| menu and
            tap **Hide shielded balance for account name**. This removes the shielded balance tab view.
            Note that the shielded balance still exists on the account, it is just not shown in the interface.

    .. |hamburger| image:: ../images/hamburger.png
            :alt: Three horizontal lines
            :width: 20px

    .. |moredetails| image:: ../images/more-arrow.png
            :alt: Button with More and double-headed arrow
            :width: 50px
