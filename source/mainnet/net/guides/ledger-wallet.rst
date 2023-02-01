:orphan:

.. _guide-ledger:

=========================================================
Get started using a Ledger device with the Desktop Wallet
=========================================================

Introduction
============

The Concordium Desktop Wallet is used to manage CCD, Concordium’s native token. To use the Desktop Wallet to receive and send CCD, you'll need a Ledger Nano S or Ledger Nano X device and the Concordium Ledger Application. The Ledger adds additional security to your accounts.

This guide walks you through the steps of getting started using the Concordium Desktop Wallet with a Ledger device.

Before you start
================

Before you install the Concordium Ledger App, make sure you’ve completed the following steps:

- You’re running a node on the Concordium blockchain with either :ref:`Windows <run-node-windows>`, :ref:`macOS <run-node-macos>`, :ref:`Ubuntu <run-node-ubuntu>`, or :ref:`Docker on Linux <run-a-node>`.

- You’ve set up the `Ledger Nano S <https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-your-Ledger-Nano-S?docs=true>`_ or the `Ledger Nano X <https://support.ledger.com/hc/en-us/articles/360018784134-Set-up-your-Ledger-Nano-X?docs=true>`_.

- You’ve downloaded `Ledger Live <https://www.ledger.com/ledger-live/download>`_.

.. Warning:: During the process described in this guide, you’ll generate private keys on the Ledger Nano S or Nano X, and you’ll receive a 24-word recovery phrase. This is the only backup of your private keys, and you need it to access you accounts if you lose your Ledger device. Make sure that you store it securely.

Install the Desktop Wallet
==========================

#. :ref:`Download <downloads>` the latest version of the Desktop Wallet.

#. Open the Desktop Wallet and create a password that contains at least 6 characters. Keep the password safe. You’ll need it to sign into the Desktop Wallet again.

#. If this is the first time you're opening the Desktop Wallet, you're asked to connect to a node. If you don't see this message, go to **Settings**, and then select **Node settings**.

#. Enter the **Address** and **Port** of the node you’re running. The address is the network address of the node.

   - If you're running the mainnet version of the Desktop Wallet, you must connect to a mainnet node. In the **Address field**, enter *127.0.0.1*, and in the **Port field** enter *10000*.

   - If you're running the testnet version of the Desktop Wallet, you must connect to a testnet node. In the **Address** field, enter *127.0.0.1*, and in the **Port field** enter *10001*.

     .. image:: ../images/run-node/Node-setup-win-9.png
         :width: 60%

#. Select **Set connection**. If the connection is working properly, there’s a message saying *Successfully connected*.

Install the Concordium Ledger App using Ledger Live
===================================================

You're now ready to install the Concordium Ledger App on the Ledger device.

#. Open the Ledger Live app, and then select **Manager** in the left side panel.

#. Connect the Ledger device to your computer, and enter your PIN code to unlock the Ledger.

#. The Ledger says **Allow Ledger Manager**. Press both buttons simultaneously to allow the manager on your Ledger.

#. Press the right button to navigate to **Install app**, and then press both buttons.

#. Search for **Concordium Ledger App** in the App catalog in Ledger Live, and then select **Install**.

Set up an initial account and an identity
=========================================

Now that you've set up the Ledger device, you're ready to start using the Desktop Wallet. You'll have to set up an :ref:`initial account <glossary-initial-account>` and have an identity provider issue an :ref:`identity <glossary-identity>`.

#. In the Desktop Wallet, go to **Accounts**. A message is displayed saying you don’t have an identity or an initial account yet. Select **Request new**.

#. Enter a name for your identity, and then enter a name for your initial account. Select **Continue**.

#. Select an identity provider.

#. Connect your Ledger device to your computer if you haven't done so already and enter your PIN code on the Ledger. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

#. In the Desktop Wallet, there’s a message asking you to open the Concordium application on the Ledger. Press both buttons on the Ledger when it says **Concordium**. The Ledger says **Concordium is ready**.

#. In the Desktop Wallet, there’s a message saying the Ledger is ready. Select **Submit**.

#. Press both buttons to confirm the following on the Ledger:

   - **Create credential**: the number that is assigned to the credential is displayed.

   - **Public key**: press both buttons to confirm the export of the public key. Next, verify that the public key on the Ledger corresponds to the public key in the Desktop Wallet. Use the right button to navigate through the key, and then press both buttons to confirm.

#. In the Desktop Wallet, select **Continue**.

#. The Ledger says **Review identity provider info**. Press both buttons, and then press the right button to navigate through the public key and verify that it corresponds to the information in the Desktop Wallet. Press both buttons to confirm.

#. Verify that the **Signature threshold** on the Ledger corresponds to the threshold in the Desktop Wallet. The signature threshold is the number of signatures needed to sign a transaction.

#. Press the right button. The Ledger says **Sign identity provider info** and then press both buttons to sign the identity provider information.

#. In the Desktop Wallet, the **New identity** page is displayed. Enter the identity verification information and select **Submit**. This information will vary depending on the identity provider. The identity provider verifies your identity, submits your initial account to the blockchain, and returns your identity to the Desktop Wallet. When the confirmation has been completed, a green check mark is displayed next to the Concordium logo on the identity. Your initial account is then ready for use.

#. Select **Finished**. If you create more accounts, you can recognize your initial account by the text *initial* next to the name.

View the account balance
========================

To view the account balance in the Concordium Desktop Wallet do the following:

- In the Desktop Wallet, go to **Accounts**, and then select the account whose balance you want to see. You can now see the following account information:

  - **Account Total** shows the total number of CCD on the account

  - **Balance** shows the sum of CCD that are at your disposal, the amount of CCD that you’ve staked, and any CCD that are locked in a release schedule.

    - **At disposal** shows the amount of CCD that is available for use. You can't use CCD that are locked in a :ref:`stake<concepts-baker-stake>` or a :ref:`release schedule<CCD-single-schedule-desktop>`.

    - **Staked** shows the amount of CCD you've staked if you're node is :ref:`baking <baker-concept>` blocks.

  - **Shielded balance** shows the amount of CCD that you’ve shielded.

For more information about accounts, see :ref:`Overview of accounts <overview-account-desktop>`.

How to receive CCD
==================

Currently, you don’t have to use the Ledger to receive CCD. To see any transfers to your account do the following:

#. In the Desktop Wallet, go to **Accounts**, and then select the relevant account.

#. In the **Latest transactions** area, you can see all CCD transfers on the account.

#. If you need to share your address with someone, select **Account address**, copy the address or scan the QR code.

How to send CCD
===============

#. In the Desktop Wallet, go to **Accounts** and select the relevant account.

#. Select **Send**.

#. Enter the amount of CCD that you want to send.

#. Select the recipient and select **Continue**. If you haven't connected the Ledger to your computer, there’s a message saying **Please open the Concordium application on your Ledger**. Connect the Ledger device to the computer and enter your PIN on Ledger.

#. Press the right button to navigate to the Concordium app, and then press both buttons to open the app.

#. The Ledger says **Concordium is ready**.  Wait for the message in the Desktop Wallet saying **Ledger is ready** and select **Submit**.

#. In the Desktop Wallet, there’s a message saying **Waiting for the user to finish the process on the device**. Review the transaction on the Ledger and verify that the information matches the **Transaction details** in the left pane of the Desktop Wallet. Press the right button to navigate to the right and verify the **Sender address** is correct. Continue navigating to the right and verify that the **Amount** is correct, and then verify that the **Recipient address** is correct.

#. Press both buttons to sign the transaction. In the Desktop Wallet, you can see that the transfer has been submitted to the chain, and you can see the transaction hash. Select **Finish**. The transfer appears in the list of transfers.
