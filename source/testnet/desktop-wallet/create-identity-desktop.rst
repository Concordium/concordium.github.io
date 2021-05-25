
.. _create-initial-account-desktop:

================================================================
Create an identity and an initial account in the Desktop Wallet
================================================================

.. contents::
    :local:
    :backlinks: none

Before you can start using the Desktop Wallet and submit transactions to the blockchain, you need an identity and an initial account issued by an identity provider. The identity provider will submit the initial account to the chain and will know the identity of the owner of the initial account, but not of any regular accounts that you create.

.. xref to identities and accounts doc

Prerequisites
=============
-   Understanding of the concepts of identity and account.
-   A Ledger hardware wallet that stores your private keys.

.. Note::
   You can't import accounts and identities created in the Concordium Mobile wallet.

.. xref to conceptual docs
.. An encrypted transfer to or from an account is only valid if that account has only a single credential. If the account has non-zero encrypted balance, it is not possible to add new credentials to that account.

Create an initial account
=========================

#. Go to **Accounts**. A message is displayed saying you don't have an identity or an initial account yet. Select **Request new**. If you've been using another computer, and you already have an existing account, you can select **Import existing**.

#. Enter a name for your identity, and then enter a name for your initial account. Select **Continue**.

#. Select an identity provider. Currently, Notabene is the only one available.

#. Connect your Ledger hardware wallet if you haven't done so already and enter your pin code on the Ledger. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit. When you've entered the PIN, press both buttons, and when it says **Concordium** press both buttons again. The Ledger says **Concordium is ready**.

#. In the Desktop Wallet select **Submit**, when it says **Ledger Nano S is ready**. 

#. Press both buttons to confirm the export of the following on the Ledger:

   - Export PRF key
   - Export IdCredSec
   - Public-key

#. Press the right button to review the transaction on the Ledger. Verify that the following information on Ledger is identical to the information in the Desktop Wallet.

   - Identity Credentials Public (IdCredPub)
   - Registration ID (RegId)
   - Verification Key
   - Threshold

#. The Ledger says **Sign transaction**. Press both buttons to sign the transaction.

#. In the Desktop Wallet, enter the identity verification information and select **Submit**. This information will vary depending on the identity provider. The identity provider submits the identity to the blockchain. When the initial account is created in a finalized block on the blockchain, the identity provider confirms the identity, and after confirmation, a green check mark is displayed next to the Concordium logo on the identity.

#. Select **Finished**. When you've created more accounts, you can recognize you initial account by the text **(identity)** next to the name.
