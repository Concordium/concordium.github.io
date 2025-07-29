.. include:: ../../variables.rst
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
    On Testnet you can request CCDs for testing purposes. Use the button in an account to request 20000 CCDs.

.. dropdown:: |cryptox|

    #. Tap **Send** on the main screen.

    #. Enter the amount you want to transfer and specify the recipient. You can paste the recipient address, choose a recipient that already exists in your address book, or tap the Scan QR icon.

       .. image:: ../images/cryptoX/cryptox-send-funds1a.png
            :width: 50%

    #. Optionally you can add a memo to your transaction by tapping the **Add memo** field. A memo is a short message that will be shown with the transaction. Memos are publicly visible on the chain, so be careful what you write. Adding a memo will also increase the transaction fee.

       .. Warning::
            Transaction memos are public, permanent and visible to everyone on the blockchain. Therefore, carefully review all information before you submit the memo to the blockchain.

    #. Tap **Continue**.

    #. Review the transaction. If you need to correct something, use the arrow to go back to the previous screen. When ready, swipe to submit the transaction.

       .. image:: ../images/cryptoX/cryptox-send-funds2a.png
            :width: 50%

    #. The confirmation screen shows the sent amount. You can now view transaction details or tap **Close** to return to the main screen.

       .. image:: ../images/cryptoX/cryptox-send-funds3a.png
            :width: 50%


    .. |send-w-text| image:: ../images/send-w-text.png
         :alt: Paper airplane with text send
         :width: 50px


.. dropdown:: Desktop Wallet

    #. Go to **Accounts** and select the relevant account.

    #. Select **Send**.

         .. image:: ../images/desktop-wallet/dw-send.png

    #. In the right pane, enter the amount of CCD that you want to send. If the amount you want to transfer including the transfer fee exceeds the amount in your account, you’ll see a message saying **Insufficient funds**. This means that there's not enough CCD in the account, and you’ll have to change the amount. Enter a **Memo** if you want to send a message to the recipient along with the amount. Note that there's a fee associated with sending a memo and the fee depends on the size of the memo in bytes. Click **Select Recipient**.

        .. image:: ../images/desktop-wallet/dw-send-ccd.png

    .. Warning::
        Transaction memos are public, permanent and visible to everyone on the blockchain. Therefore, carefully review all information before you submit the memo to the blockchain.

    4. Select the recipient and click **Continue**.

    5. There's a message saying **Waiting for device. Please connect your Ledger**. Connect the LEDGER device to the computer and enter your PIN on LEDGER device.

    6. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The LEDGER device says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger device is ready** and select **Submit**.

    7. Review the transaction on the LEDGER device and verify that the information matches the **Transaction details** in the Desktop Wallet. Navigate to the right and verify the sender address is correct. Continue navigating to the right and verify that the recipient address is correct.

    8. Press both buttons to sign the transaction. In the Desktop Wallet, you can see that the transfer has been submitted to the chain. Select **Finish**.

.. dropdown:: |bw|

    #. Select your account from the dropdown menu and click **Send**.

    #. Select CCD as token and enter the amount to transfer. Note that you can click **Send max** to transfer all of your CCD minus the transaction fee.
       Enter the recipient address and click **Continue**.

       .. image:: ../images/browser-wallet/new/send_funds1.png

    #. On the confirmation screen, review the transaction and click **Send funds** to submit the transaction.
       If you need to correct the transfer, click on the  arrow to go back to the previous screen.

       .. image:: ../images/browser-wallet/new/send_funds2.png

    #. The success screen shows the sent amount. You can now view transaction details or return to the account.

       .. image:: ../images/browser-wallet/new/send_funds3.png

Your transaction is now submitted to the chain. It might take a little while for it to finalize on the chain, and you can follow the status of the transaction in the log.

.. |send-bw| image:: ../images/browser-wallet/send-ccd.png
             :alt: paper airplane
             :width: 50px
