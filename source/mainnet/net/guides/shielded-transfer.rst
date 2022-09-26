.. include:: ../../variables.rst
.. _shielded-transfer:

======================================
Make a shielded transfer on an account
======================================

A shielded transfer is a transfer between two accounts where the **amount** of the transfer is encrypted. When you make a shielded transfer, the amount you transfer is only known to you and the recipient. However, the sender, receiver, and potential memo will be publicly visible on the blockchain.

Prerequisites
=============

-  You must have a shielded amount of CCD on the account you want to make the shielded transfer from. See :ref:`Shield CCD on an account <shield-CCD-wallets>`.

.. Warning::

    Exchanges do not support shielded transfers. Attempting to do a shielded transfer to an exchange may cause missing or inaccessible funds on the exchange wallet.

.. Note::
   You can't make shielded transfers on multi-signature accounts in the Desktop Wallet.

.. Note::

   All transfers and transactions cost a fee, including shielding and unshielding transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

.. Warning::

   Do not shield or transfer all of your funds or you will not have enough funds to cover transaction fees for unshielding or sending them.

.. Note::
    On Testnet you can request CCDs for testing purposes. Use the button in either Desktop Wallet, |mw-gen2|, or |mw-gen1| to request 2000 CCDs.

.. tabs::

    .. tab:: Desktop Wallet

        .. tabs::

            .. tab:: Send a shielded amount of CCD

                #. Go to **Accounts** and select the account you want to make the transfer from.

                #. Select **Shielded balance** on the account and select **Send**.

                    .. image:: ../images/desktop-wallet/dw-shielded-xfer.png

                #. In **Send shielded funds**, enter the amount of CCD that you want to send. Enter a **Memo** if you want to send a message to the recipient along with the shielded amount. Note that there's a fee associated with sending a memo and the fee depends on the size of the memo in bytes.

                    .. image:: ../images/desktop-wallet/dw-send-shielded.png

                .. Warning::

                    Transaction memos are public and visible on the blockchain, and they are permanent and can't be deleted. Therefore, carefully review all information before you submit the memo to the blockchain.

                4. Select the recipient of the CCD, and then select **Continue**.

                5. In the Desktop Wallet there’s a message saying **Waiting for device. Please connect your Ledger**. Connect the Ledger to your computer, and then enter your PIN code on the Ledger.

                6. On the Ledger, there's a message saying Concordium. Press both buttons. The Ledger says **Concordium is ready**, and in the Desktop Wallet, there's a message saying **Ledger Nano S is ready** or **Ledger Nano S Plus is ready**.

                7. In the Desktop Wallet, select **Submit**. There’s a message saying **Waiting for the user to finish the process on the device**.

                8. Press both buttons on the Ledger to confirm the decryption.

                9. On the Ledger there's a message saying **Concordium is ready**, and then it says **Review transaction**. Using the right button, you now have to navigate through the following information to verify that it's correct and matches the transaction details in the Desktop Wallet:

                    -  **Shielded transfer**: this is the type of transaction. Because the amount is encrypted, the Ledger can't display the actual amount that's going to be transferred.

                    -  **Sender**: this is the sender account.

                    -  **Recipient**: this is the recipient account.

                    -  **Memo**: the memo message, if applicable.

                10. On the Ledger there's a message saying **Sign transaction**. Press both buttons to sign the transaction.

                11. In the Desktop Wallet there’s a message saying **Shielded transfer submitted**, which means that the transfer has been submitted to the chain. Click **Finish**. The transfer is listed in the **Transfers** list.


            .. tab:: Decrypt a shielded amount of CCD

                If you have received a shielded transfer, a shield icon is displayed next to the shielded balance |shielded-xfer|. Before you can see the amount that you've received, you have to decrypt the shielded transaction.

                Any shielded transfers that you've already decrypted are visible in the shielded balance.

                #. Select the relevant account, and then select **Shielded balance**.

                #. The Desktop Wallet says **Decrypt shielded balance**. Click **Decrypt**.

                    .. image:: ../images/desktop-wallet/dw-decrypt-shielded.png

                #. The Desktop Wallet says **Waiting for device. Please connect your Ledger**. Connect the Ledger to your computer, and then enter your PIN code on the Ledger.

                #. On the Ledger, there's a message saying **Concordium is ready**, and in the Desktop Wallet, there's a message saying **Ledger Nano S is ready** or **Ledger Nano S Plus is ready**.

                #. In the Desktop Wallet, select **Decrypt**.

                #. On the Ledger, press both buttons to decrypt the amount. In the Desktop Wallet you can now see the amount that you decrypted.

            .. |shielded-xfer| image:: ../images/desktop-wallet/dw-shielded-xfer-received.png
                            :alt: Balance with a shield that has a lock on it

    .. tab:: |mw-gen2|

        .. tabs::

            .. tab:: Send a shielded amount of CCD

                #. Go to the Accounts page.

                #. Tap the Account you want to transfer CCD from or tap |more-acct| for the account.

                    - If the shielded balance is hidden for the account, go to the |hamburger| menu in the upper right corner and tap **Show shielded balance for your account name**.

                #. Tap the **Shielded balance** tab of the totals area.

                #. Tap **SEND**.

                #. Enter the amount you want to transfer.

                #. In **Paste recipient address**, enter the recipient address for the recipient of the transfer.

                    - You can also choose a recipient that already exists in your **Address Book**, or add a new one by tapping  **Scan QR**.

                #. Tap **Send Amount**.

                    .. image:: ../images/mobile-wallet/MW42.png
                        :width: 25%

                #. *Optional*: You can add a memo to your transaction. A memo is a short message that will be shown with the transaction. Memos are publicly visible on the chain, so be careful what you write. Adding a memo will also add to the fee of the transaction.

                #. Finally, tap **Send shielded amount**.

                    .. image:: ../images/mobile-wallet/MW43.png
                        :width: 25%

                #. The transaction is subbmitted; tap **Ok, thanks**.

                    .. image:: ../images/mobile-wallet/MW44.png
                        :width: 25%

                .. |more-acct| image:: ../images/more-acct.png
                                :alt: Button with double-headed arrow
                                :width: 50px

    .. tab:: |mw-gen1|

        .. tabs::

            .. tab:: Send a shielded amount of CCD

                #. Go to the Accounts page.

                #. Tap the Account you want to transfer CCD from or tap |moredetails| for the account.

                    - If the shielded balance is hidden for the account, go to the |hamburger| menu in the upper right corner and tap **Show shielded balance for your account name**.

                #. Tap the **Shielded balance** tab of the totals area.

                #. Tap **SEND**.

                   .. image:: ../images/mobile-wallet/MW37.png
                      :width: 25%

                #. Enter the amount you want to transfer.

                #. In **Paste recipient address**, enter the recipient address for the recipient of the transfer.

                    - You can also choose a recipient that already exists in your **Address Book**, or add a new one by tapping  **Scan QR**.

                #. Tap **Send Amount**.

                    .. image:: ../images/mobile-wallet/MW42.png
                        :width: 25%

                #. *Optional*: You can add a memo to your transaction. A memo is a short message that will be shown with the transaction. Memos are publicly visible on the chain, so be careful what you write. Adding a memo will also add to the fee of the transaction.

                #. Finally, tap **Send shielded amount**.

                    .. image:: ../images/mobile-wallet/MW43.png
                        :width: 25%

                #. The transaction is subbmitted; tap **Ok, thanks**.

                    .. image:: ../images/mobile-wallet/MW44.png
                        :width: 25%

            .. |hamburger| image:: ../images/hamburger.png
                         :alt: Three horizontal lines
                         :width: 20px

            .. |moredetails| image:: ../images/more-arrow.png
                         :alt: Button with More and double-headed arrow
                         :width: 50px

Your transaction is now submitted to the chain. It might take a little while for it to finalize on the chain, and you can follow the status of the transaction in the log.
