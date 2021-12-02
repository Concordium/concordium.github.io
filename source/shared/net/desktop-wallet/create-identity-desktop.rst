
.. _create-initial-account-desktop:

================================================================
Create an identity and an initial account in the Desktop Wallet
================================================================

.. contents::
   :local:
   :backlinks: none

Before you can start using the Desktop Wallet and submit transactions to the blockchain, you need an initial account and an identity issued by an identity provider. The identity provider will submit the initial account to the chain and will know the identity of the owner of the initial account, but not of any other accounts that you create.

Prerequisites
=============

-   A Ledger hardware device that's set up and ready for use.

.. warning:: You can't exchange identities and accounts between the Mobile Wallet and the Desktop Wallet. You can, however, send CCD from one wallet to another.

Create an initial account
=========================

#. Go to **Accounts**. A message is displayed saying you don't have an identity or an initial account yet. Select **Request new**. If you've been using another computer, and you already have an existing account, you can select **Import existing**.

#. Enter a name for your identity, and then enter a name for your initial account. Select **Continue**.

#. Select an identity provider.

#. Connect your Ledger hardware device and enter your PIN code on the Ledger. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

#. In the Desktop Wallet, there's a message asking you to open the Concordium application on the Ledger. On the Ledger, press both buttons when it says **Concordium**. The Ledger says **Concordium is ready**.

#. In the Desktop Wallet there's a message saying **Ledger Nano S is ready**. Select **Submit**.

#. Press both buttons to confirm the following on the Ledger:

   - Create credential (each credential is assigned a number): : Press the right button and then both buttons to confirm **Accept**.
   - Public key: Press both buttons to accept.

#. Review that the public key on the Ledger corresponds to the public key in the Desktop Wallet. Use the right button to navigate through the key.

#. Press both buttons to confirm, and then in the Desktop Wallet, select **Continue**.

#. The Ledger says **Review identity provider info**. Press both buttons, and then press the right button to navigate through the public key and verify that it corresponds to the information in the Desktop Wallet. Press both buttons to confirm.

#. Verify that the signature threshold on the Ledger corresponds to the threshold in the Desktop Wallet.

#. Press the right button, and then press both buttons to sign the identity provider information.

#. In the Desktop Wallet, the **New identity** page is displayed. Enter the identity verification information and select **Submit**. This information will vary depending on the identity provider. The identity provider submits the identity to the blockchain. When the initial account is created in a finalized block on the blockchain, the identity provider confirms the identity, and after confirmation, a green check mark is displayed next to the Concordium logo on the identity.

#. Select **Finished**. When you've created more accounts, you can recognize you initial account by the text **(identity)** next to the name.

.. Note::
   When you've created your identity and account, we strongly recommend that you make an export of all accounts, ID's and addresses. This way, you'll have a backup in case the database is damaged.
