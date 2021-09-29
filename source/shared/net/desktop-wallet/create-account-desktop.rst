
.. _create-account-desktop:

========================================
Create an account in the  Desktop Wallet
========================================

.. contents::
    :local:
    :backlinks: none
    :depth: 2

Once you've created an identity and an initial account, you can create as many accounts as you need.

.. note::
    You can't import accounts that were created on the Mobile Wallet.

Prerequisites
=============
-   A Ledger hardware wallet with the Concordium Ledger App installed. See :ref:`Set up the Ledger Nano S and install the Concordium Ledger App<install-ledger-app>`.
-   An identity and an initial account. See :ref:`Create an identity and an initial account in the Desktop Wallet<install-ledger-app>`.

Create an account
=================

#. Go to **Accounts**. You can now see all the accounts that you're the custodian of.

#. Select the plus sign in the upper right corner to create a new account.

#. Enter a name for your new account, and then select **Continue**.

#. Select the identity you want to create the new account from. All available identities are listed in the right pane.

#. Select whether you want to reveal any attributes on the account or not. The available attributes depend on the identity provider.

.. note::
    If you select **Choose attributes to reveal**, the selected attributes will be public on the blockchain. We recommend that you do not reveal any attributes.

#. Select **Submit without revealing attributes**.

#. Connect your Ledger hardware wallet if you haven't done so already, and enter your PIN code. Press the up and down arrows to choose a digit, and then press both buttons to select the digit. The Ledger says **Concordium is ready**.

#. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** and select **Submit**.

#. Press both buttons to confirm the following on the Ledger:

   - Create credential (each credential is assigned a number)
   - Public key

#. Verify that the public key on the Ledger corresponds to the public key in the Desktop Wallet. Press both buttons, and then use the right button to navigate through the key.

#. Press both buttons to confirm, and then in the Desktop Wallet, select **Continue**.

#. The Ledger says **Review details**. Press both buttons, and then press the right button to navigate through the public key and verify that it corresponds to the information in the Desktop Wallet. Press both buttons to confirm.

#. Verify that the signature threshold on the Ledger corresponds to the threshold in the Desktop Wallet.

#.  Press the right button to verify that the anonymity revoker threshold on the Ledger corresponds to the threshold in the Desktop Wallet, and then press both buttons.

#. The Ledger says **Sign details**. Press both buttons to sign the transaction. In the Desktop Wallet you can now see the that the account has been submitted to the blockchain.

#. Select **Finished**. Your new account is now listed along with the other accounts you're the custodian of.
