
.. _shield-CCD-desktop:

========================
Shield CCD on an account
========================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

Shield CCD
==========

When you shield an amount on an account, only the account's credential holder can see the shielded amounts. Other participants in the network will be able to see the shielding transaction, but can't see the shielded balance or any shielded transfers going in or out of the account. You can't make shielded transfers on multi-signature accounts, only on accounts with a single credential.

If you have an account with CCD in the shielded balance, you can't add new credentials to that account. Furthermore, once a shielded transfer has been logged on an account, you'll no longer be able to add more credentials to that account. This is also the case even if you unshield all CCD in the shielded balance.

.. Note::
   All transfers and transactions cost a fee, including shielding and unshielding transactions. The fee is based on the set NRG for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

#. Go to **Accounts** and select the relevant account.

#. Select **Shield**.

#. Enter the amount of CCD that you want to shield. If the amount you want to transfer including the transfer fee exceeds the amount in your account, you’ll see a message saying **Insufficient funds**. This means that there's not enough CCD in the account and you’ll have to change the amount. Also, the amount must be greater than zero. Select **Continue**.

#. There's a message saying **Waiting for device. Please connect your Ledger**. Connect the Ledger to the computer and enter your PIN on Ledger.

#. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** and select **Submit**.

#. Review the transaction on the Ledger and verify that the information matches the **Transaction details** in the Desktop Wallet. Navigate to the right and verify the sender address is correct. Continue navigating to the right and verify that the amount and the recipient address are correct.

#. Press both buttons to sign the transaction. In the Desktop Wallet, you can see that the transfer has been submitted to the chain. Select **Finish**. When the transaction has been finalized, you can see the shielded balance on the account overview.

.. _unshield-CCD:

Unshield CCD
============
The steps to unshield CCD are similar to the ones to shield CCD.

#. Select **Shielded Balance** on the relevant account, and then select **Unshield**.

#. Enter the amount of CCD that you want to unshield, and then select **Continue**.

#. Follow steps 4-7 as described above. When the transaction has been finalized, you can see that the shielded balance has changed, and you can see the the amount you unshielded in the **Transfers** list.
