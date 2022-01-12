
.. _send-CCD-single-desktop:

=========================================
Create CCD transfer in the Desktop Wallet
=========================================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

Send CCD from an account
========================

This topic describes how you can send CCD from an account, when only one participant is required to sign the transfer. If you want to learn about sending CCD with a schedule, see :ref:`Create a single signer CCD transfer with a schedule <CCD-single-schedule-desktop>`.

#. Go to **Accounts** and select the relevant account.

#. Select **Send**.

#. In the right pane, enter the amount of CCD that you want to send. If the amount you want to transfer including the transfer fee exceeds the amount in your account, you’ll see a message saying **Insufficient funds**. This means that there's not enough CCD in the account, and you’ll have to change the amount.

#. Enter a **Memo** if you want to send a message to the recipient along with the shielded amount. Note that there's a fee associated with sending a memo and the fee depends on the size of the memo in bytes.

.. Warning::
    Transaction memos are public, permanent and visible to everyone on the blockchain. Therefore, carefully review all information before you submit the memo to the blockchain.

#. Select the recipient and select **Continue**.

#. There's a message saying **Waiting for device. Please connect your Ledger**. Connect the Ledger to the computer and enter your PIN on Ledger.

#. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** and select **Submit**.

#. Review the transaction on the Ledger and verify that the information matches the **Transaction details** in the Desktop Wallet. Navigate to the right and verify the sender address is correct. Continue navigating to the right and verify that the recipient address is correct.

#. Press both buttons to sign the transaction. In the Desktop Wallet, you can see that the transfer has been submitted to the chain. Select **Finish**.

.. Note::
   All transactions and transactions cost a fee, including shielding and unshielding transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.
