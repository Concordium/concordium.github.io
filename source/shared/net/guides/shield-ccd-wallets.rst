
.. _shield-CCD-wallets:

=====================================
Shield and unshield CCD on an account
=====================================

Accounts on the Concordium blockchain have two balances, the **Balance** and the :ref:`shielded balance <glossary-shielded-balance>`. You can move funds between these
two balances using either a :ref:`shield CCD transaction<glossary-shielding>` or an :ref:`unshield CCD transaction<glossary-unshielding>`.

When you shield an amount on an account, only the account's credential holder can see the shielded amounts. Other participants in the network will be able to see the shielding transaction, but can't see the shielded balance or any shielded transfers going in or out of the account. You can't make shielded transfers on multi-signature accounts, only on accounts with a single credential.

If you have an account with CCD in the shielded balance, you can't add new credentials to that account. Furthermore, once a shielded transfer has been logged on an account, you'll no longer be able to add more credentials to that account. This is also the case even if you unshield all CCD in the shielded balance.

.. Warning::
   Do not shield all of your funds or you will not have enough funds to cover transaction fees for unshielding or sending them.

.. Note::
   The amount contained in the Balance is publicly visible, while the amount on the Shielded balance is encrypted and is only visible for
   the account holder. Moving funds between the balances is also publicly visible, including the amount. Only shielded transfers between
   two different accounts have their amounts encrypted.

.. Note::

   All transfers and transactions cost a fee, including shielding and unshielding transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

.. Note::
    On Testnet you can request CCDs for testing purposes. Use the button in either Desktop Wallet or Mobile Wallet to request 2000 CCDs.

.. tabs::

    .. tab:: Desktop Wallet

        .. tabs::

            .. tab:: Shield CCD

                #. Go to **Accounts** and select the relevant account.

                #. Select **Shield**.

                #. Enter the amount of CCD that you want to shield. If the amount you want to transfer including the transfer fee exceeds the amount in your account, you’ll see a message saying **Insufficient funds**. This means that there's not enough CCD in the account and you’ll have to change the amount. Also, the amount must be greater than zero. Select **Continue**.

                #. There's a message saying **Waiting for device. Please connect your Ledger**. Connect the Ledger to the computer and enter your PIN on Ledger.

                #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** and select **Submit**.

                #. Review the transaction on the Ledger and verify that the information matches the **Transaction details** in the Desktop Wallet. Navigate to the right and verify the sender address is correct. Continue navigating to the right and verify that the amount and the recipient address are correct.

                #. Press both buttons to sign the transaction. In the Desktop Wallet, you can see that the transfer has been submitted to the chain. Select **Finish**. When the transaction has been finalized, you can see the shielded balance on the account overview.

            .. tab:: Unshield CCD

                The steps to unshield CCD are similar to the ones to shield CCD.

                #. Select **Shielded Balance** on the relevant account, and then select **Unshield**.

                #. Enter the amount of CCD that you want to unshield, and then select **Continue**.

                #. There's a message saying **Waiting for device. Please connect your Ledger**. Connect the Ledger to the computer and enter your PIN on Ledger.

                #. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** and select **Submit**.

                #. Review the transaction on the Ledger and verify that the information matches the **Transaction details** in the Desktop Wallet. Navigate to the right and verify the sender address is correct. Continue navigating to the right and verify that the amount and the recipient address are correct.

                #. Press both buttons to sign the transaction. In the Desktop Wallet, you can see that the transfer has been submitted to the chain. Select **Finish**. When the transaction has been finalized, you can see the shielded balance on the account overview.

                When the transaction has been finalized, you can see that the shielded balance has changed, and you can see the the amount you unshielded in the **Transfers** list.

    .. tab:: Mobile Wallet

        .. tabs::

            .. tab:: Shield CCD

                #. Go to the **Accounts** page.

                #. Tap the **Balance** area of the account you want to transfer CCD from or tap |moredetails|.

                    - If the **Shield** button and **Shielded balanace** tab are not visible, tap the |hamburger| menu in the upper right corner. Tap **Show shielded balance on account name**.

                #. Now the totals area contains tabs for both **Balance** and **Shielded Balance** and a **Shield** button.

                    .. image:: ../images/mobile-wallet/MW32.png
                        :width: 25%

                #. Tap **Shield**. Remember to leave enough funds in your disposable balance to cover transaction fees to unshield or for other transactions.

                #. Enter the amount you want to move to the shielded balance.

                    .. image:: ../images/mobile-wallet/MW33.png
                        :width: 25%

                #. Confirm your choices and tap **Shield amount**.

                    .. image:: ../images/mobile-wallet/MW35.png
                        :width: 25%

                #. Your shielding transaction has now been submitted to the blockchain. Tap **Finish**.

                    .. image:: ../images/mobile-wallet/MW76.png
                        :width: 25%

                The transaction might take a little while to finalize on the blockchain, and you can follow the status in the transaction log.
                Once it has been finalized, you can browse to your shielded balance to see the newly shielded amount.

                .. Note::

                    You can hide the shielded balance when finished to prevent accidental shielding. In the Account page tap the |hamburger| menu and tap **Hide shielded balance for account name**. This removes the shielded balance tab and the Shield button from the accounts view. Note that the shielded balance still exists on the account, it is just not shown in the interface.

            .. tab:: Unshield CCD

                #. Go to the **Accounts** page.

                #. Tap the account you want to unshield CCD on or tap |moredetails| on the account card.

                #. If the Shielded balance is already shown, press the Shielded balance tab.

                    - If the **Shield** button and **Shielded balance** tab are not visible, tap the |hamburger| menu in the upper right corner. Tap **Show shielded balance on account name**.

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
                Once it has been finalized, you can browse to your shielded balance to see the newly shielded amount.

                .. Note::

                    You can hide the shielded balance when finished to prevent accidental shielding. In the Account page tap the |hamburger| menu and tap **Hide shielded balance for account name**. This removes the shielded balance tab and the Shield button from the accounts view. Note that the shielded balance still exists on the account, it is just not shown in the interface.
            
            .. |hamburger| image:: ../images/hamburger.png
                         :alt: Three horizontal lines

            .. |moredetails| image:: ../images/more-arrow.png
                         :alt: Button with More and double-headed arrow
