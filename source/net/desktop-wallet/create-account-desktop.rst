
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

.. contents::
    :local:
    :backlinks: none

Prerequisites
=============
-   A Ledger hardware wallet with the Concordium Ledger App installed. See :ref:`Set up the Ledger Nano S and install the Concordium Ledger App<install-ledger-app>`
-   An identity and an initial account. See :ref:`Create an identity and an initial account in the Desktop Wallet<install-ledger-app>`

Create an account
=================

#. Go to **Accounts**. Your initial account is listed.

#. Select the plus sign in the upper right corner to create a new account.

#. Enter a name for your new account, and then select **Continue**.

#. Select the identity you want to create the new account from. All available identities are listed in the right pane.

#. Select whether you want to reveal any attributes on the account or not.

.. note::
    If you select **Choose attributes to reveal**, the selected attributes will be public on the blockchain. We recommend that you do not reveal any attributes.

#. Select **Submit without revealing attributes**.

#. Connect your Ledger hardware wallet if you haven't done so already, and enter your PIN code. Press the up and down arrows to choose a digit, and then press both buttons to select the digit.

#. Press the right button to navigate to the **Concordium** app, and then press both buttons to open the app. The Ledger says **Concordium is ready**.

#. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** and select **Submit**.

#. Press both buttons to confirm the export of the following on the Ledger:

   - *Export PRF key*
   - *Export IdCredSec*
   - *Public-key*

#. The Ledger says **Review transaction**. Press both buttons to review. Press the right button to click through and verify all the information, and press both buttons to confirm the information. It's important the you verify the information for security reasons. The following information is displayed:

   -  the *public key*
   -  the *Sig threshold*
   -  the *RegidCred*,
   -  the *identity provider*
   -  the *revocation threshold*
   -  the *valid to date*
   -  the *created at date*

#. The Ledger says **Sign transaction**. Press the two buttons to sign the transaction.

#. On the Desktop Wallet you can now see the that the account has been submitted to the blockchain.

#. Select **Finished** when the process is complete. Your new account is now listed along with the other accounts you're the custodian of.
