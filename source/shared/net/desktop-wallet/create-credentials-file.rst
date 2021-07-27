
.. _create-credentials-file:

=========================
Create a credentials file
=========================

.. contents::
   :local:
   :backlinks: none
   :depth: 1


This topic describes how you create and export a file with credentials. For information about adding more credentials to an account, see :ref:`Add credentials to an account <multi-credentials>`.

Create and export a file with credentials
=========================================

#. First, you need the address of the account your credentials will be added to. If you have the account in you address book, you can copy it from there. Otherwise, you'll have to ask the address creator to send you a copy of the account address.

#. Go to **Multi Signature Transactions** in the Desktop Wallet.

#. Select **Export a key**, and then select **Account credentials**.

#. Select the identity you want to add to the account. The identity must have been created on the Ledger that's connected to the computer. Otherwise, you'll see an error message. Select **Continue**.

#. Paste the address of the account that you want to add credentials to, and then give the account a name. This is the name that will be shown in your list of accounts.

#. Select **Reveal attributes** if you want any attributes to be public on the blockchain. We recommend that you don't reveal any attributes. Select **Continue**.

#. On the Ledger there's a message saying **Waiting for device. Please connect your Ledger**. Connect the Ledger to your computer and enter your PIN on the Ledger.

#. On the Ledger press both buttons to open the Concordium application. There's a message saying **Concordium is ready**.

#. In the Desktop Wallet, there's a message saying **Ledger Nano S is ready**. Select **Submit**.

#. Press both buttons on the Ledger to confirm the following information: **Export PRF key**, **Export IdCredSec**, and **Publickey**.

#. Compare the public key on the Ledger with the public key in the Desktop Wallet and make sure they match. Press both buttons to confirm.

#. In the Desktop Wallet, select **Continue**.

#. On the Ledger, press both buttons to review the transaction. Verify that the information on the Ledger matches the details in the Desktop Wallet.

#. Press both buttons to sign the transaction. In the Desktop Wallet, the account credential summary is displayed.

#. Select **Export** and navigate to the place on your computer where you want to save the file with the credentials. Make sure that you save the file with the extension .json.

#. Click on the identicon to copy it. Send the file and the copy of the identicon through secure channels to the current owner of the account.

#. Select **Finish**.

The creator of the account now has to import the file and add the credentials to the account. See :ref:`Add credentials to an account <multi-credentials>`.
