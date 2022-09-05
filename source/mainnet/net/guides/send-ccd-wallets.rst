
.. _send-CCD-wallets:

========
Send CCD
========

This topic describes how you can send CCD from an account when only one participant is required to sign the transfer.

.. Note::
   All transfers and transactions cost a fee. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

.. Warning::
   Make sure you have enough funds in your disposable balance to cover transaction fees.

.. Note::
    On Testnet you can request CCDs for testing purposes. Use the button in either Desktop Wallet or Mobile Wallet to request 2000 CCDs.

.. tabs::

    .. tab:: Desktop Wallet

        #. Go to **Accounts** and select the relevant account.

        #. Select **Send**.

            .. image:: ../images/desktop-wallet/dw-send.png

        #. In the right pane, enter the amount of CCD that you want to send. If the amount you want to transfer including the transfer fee exceeds the amount in your account, you’ll see a message saying **Insufficient funds**. This means that there's not enough CCD in the account, and you’ll have to change the amount. Enter a **Memo** if you want to send a message to the recipient along with the shielded amount. Note that there's a fee associated with sending a memo and the fee depends on the size of the memo in bytes. Click **Select Recipient**.

            .. image:: ../images/desktop-wallet/dw-send-ccd.png

        .. Warning::
            Transaction memos are public, permanent and visible to everyone on the blockchain. Therefore, carefully review all information before you submit the memo to the blockchain.

        4. Select the recipient and click **Continue**.

        5. There's a message saying **Waiting for device. Please connect your Ledger**. Connect the Ledger to the computer and enter your PIN on Ledger.

        6. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** and select **Submit**.

        7. Review the transaction on the Ledger and verify that the information matches the **Transaction details** in the Desktop Wallet. Navigate to the right and verify the sender address is correct. Continue navigating to the right and verify that the recipient address is correct.

        8. Press both buttons to sign the transaction. In the Desktop Wallet, you can see that the transfer has been submitted to the chain. Select **Finish**.

    .. tab:: Mobile Wallet

        #. Go to the Accounts page and tap **SEND** on the account from which you want to send CCD. Or with an individual account's transaction overview displayed, tap **SEND**.

            .. image:: ../images/mobile-wallet/MW13.png
                :width: 25%

            .. image:: ../images/mobile-wallet/MW22.png
                :width: 25%

        #. Enter the amount you want to transfer.

            .. image:: ../images/mobile-wallet/MW23.png
                :width: 25%

        #. In **Paste recipient address** you can paste the recipient address.

            - You can also choose a recipient that already exists in your **Address Book**, or tap **Scan QR** to add a new one.

        #. *Optional*: You can add a memo to your transaction. A memo is a short message that will be shown with the transaction. Memos are publicly visible on the chain, so be careful what you write. Adding a memo will also increase the fee of the transaction.

        .. Warning::
            Transaction memos are public, permanent and visible to everyone on the blockchain. Therefore, carefully review all information before you submit the memo to the blockchain.

        5. Tap **Send amount**.

            .. image:: ../images/mobile-wallet/MW26.png
                :width: 25%

        6. Confirm your choices, and tap **Send funds**.

            .. image:: ../images/mobile-wallet/MW27.png
                :width: 25%

        7. Tap **Finish**.

            .. image:: ../images/mobile-wallet/MW28.png
                :width: 25%

    .. tab:: |bw|

        #. Go to Accounts.
    
        #. Click |send|.

Your transaction is now submitted to the chain. It might take a little while for it to finalize on the chain, and you can follow the status of the transaction in the log.

.. |send| image:: ../images/send-ccd.png
             :alt: paper airplane
