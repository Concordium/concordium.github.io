.. _use-ledger-device-with-desktop-wallet:

.. include:: ../../variables.rst

==============================================
Use your Ledger device with the Desktop Wallet
==============================================

Introduction
============
A Ledger device is a hardware wallet considered one of the most secure ways to store digital assets. It uses an offline method (also known as cold storage) for generating private keys, making it the preferred choice for many cryptocurrency users. This guide will help you connect your Ledger device to the Concordium Desktop Wallet. With this integration, you can send and receive CCD using your Ledger device.

Quick links:

:ref:`Set up the Desktop Wallet<overview-desktop>`

:ref:`Wallet activities<manage-wallets-lp>`

:ref:`Send CCD<send-ccd-wallets>`

:ref:`Transfer CCD with a schedule in the Desktop Wallet<CCD-single-schedule-desktop>`

:ref:`Desktop Wallet navigation and settings<overview-account-desktop>`

Prerequisites
=============
Before you start, make sure that:

#. You've initialized your Ledger device.

#. The latest firmware is installed (Ledger Nano S).

#. Ledger Live is ready to use.

#. You've installed the latest version of Concordium Desktop Wallet.

.. note::
Make sure all prerequisites are met before proceeding with the setup process.

Install the Concordium app on your Ledger device
================================================

#. Open the Manager in Ledger Live.

#. Connect and unlock your Ledger device.

#. If asked, follow the onscreen instructions and *Allow Ledger Manager*.

#. Find Concordium in the app catalog and install the Concordium app.

   .. image:: ../images/desktop-wallet/ledger-device/ledger-live-manager.png
      :alt: App catalog in Ledger Live Manager

#. Click **Install**.

    #. An installation window appears.

    #. Your device displays *Processing*

    #. The app installation is confirmed.

    .. image:: ../images/desktop-wallet/ledger-device/app-installation-ledger-confirmed.png
      :alt: Installation of Concordium app on Ledger device confirmed

#. Close Ledger Live.


Connect to the Desktop Wallet
=============================

#. Connect and unlock your Ledger device.

#. Open the Concordium app on your Ledger device.

    .. image:: ../images/desktop-wallet/ledger-device/ledger-nano-s-concordium.png
      :alt: Concordium shown in Ledger Nano s

    Ledger Nano S shows *Concordium*


    .. image:: ../images/desktop-wallet/ledger-device/ledger-nano-s-app-ready.png
      :alt: App ready shown in Ledger Nano s

    Ledger Nano S shows *App ready*.

#. Open the Concordium Desktop Wallet application and create your account.

    .. image:: ../images/desktop-wallet/ledger-device/desktop-wallet.png
      :alt: Create account in Desktop Wallet

#. Click **Submit** on the right side of the screen.

    .. image:: ../images/desktop-wallet/ledger-device/create-account.png
      :alt: Submit account in Desktop Wallet

#. Confirm the public key export on a device.

    .. image:: ../images/desktop-wallet/ledger-device/confirm-public-key-export.png
      :alt: Confirm export of the public key

#. Verify that the address on the Concordium Desktop Wallet matches the address on your Ledger Device.

    .. image:: ../images/desktop-wallet/ledger-device/verify-address.png
      :alt: Verify that address on Desktop Wallet matches that on Ledger device.

#. Confirm the Concordium Wallet address details on Ledger.

    .. image:: ../images/desktop-wallet/ledger-device/confirm-wallet-address-on-ledger.png
      :alt: Confirm the Concordium Wallet address details on Ledger.

#. Your new Concordium Desktop Wallet account has been created.

   .. image:: ../images/desktop-wallet/ledger-device/new-account-created.png
      :alt: Screen showing new Desktop Wallet account has been created.

   **For Ledger Nano S:** Click the right button to show the address.

   **For Ledger Nano X:** Click the right button to scroll to *Display Account*. Then click both buttons to show the address.


View Account Balance
====================
Your account balance is shown on the top bar of the Desktop Wallet denominated in CCD amount.

    .. image:: ../images/desktop-wallet/ledger-device/view-account-balance.png
      :alt: Screen showing the account balance.

Receive CCD in the Desktop Wallet
=================================

#. Make sure you have verified your Receive address as shown in Steps 5 and 6 of **Connecting to the Concordium Desktop Wallet**.

#. You can get your Receive address by simply copying the address to the clipboard or by scanning the QR Code.

    #. You can copy the address by clicking the **Copy** icon |copy| next to the address.

    #. To scan the QR Code, click the QR code, which will show an enlarged QR code to scan. Verify that the address matches after you have scanned. Click the **Collapse** button |collapse| to go back to the Main page.


        .. image:: ../images/desktop-wallet/ledger-device/verify-address2.png
            :alt: Screen showing the account balance.

        .. image:: ../images/desktop-wallet/ledger-device/enlarge-QR-code.png
            :alt: Screen showing QR code.

#. Once you have sent CCD from another Wallet, you will see it in your transaction history and your CCD balance will update.


Send CCD in the Desktop Wallet
==============================

#. Click **Send**, enter the CCD address and the amount on the right side of the screen. Then, click **Continue**.

    .. image:: ../images/desktop-wallet/ledger-device/send-CCD.png
      :alt: Screen showing how to enter amount and send CCD.


#. Review the amount you are sending and the transaction fee. Then, click **Submit**.

    .. image:: ../images/desktop-wallet/ledger-device/review-transaction.png
      :alt: Screen showing transacyion info for review.

#. Review and sign the transaction on your Ledger device.

    **For Ledger Nano S:**

    Press the right button on your Ledger device to review the transaction details (amount and address) until you see **Sign Transaction**.

        .. image:: ../images/desktop-wallet/ledger-device/ledger-nano-s-review-transaction.png
          :alt: Ledger device Nano S.

    Press both buttons on your Ledger Device to sign the transaction.

        .. image:: ../images/desktop-wallet/ledger-device/ledger-nano-s-sign-transaction.png
          :alt: Signing with Ledger device Nano S.



    **For Ledger Nano X:**
    Press the right button on your Ledger Device to review the transaction details (amount and address) until you see **Accept**. Then, press both buttons.

    .. image:: ../images/desktop-wallet/ledger-device/ledger-nano-x-sign-transaction.png
      :alt: Signing with Ledger device Nano X.


#. Once you sign the transaction on the Ledger device, a green banner appears to show that the transaction was successful and a *Sending* transaction will appear in the transaction history.

    .. image:: ../images/desktop-wallet/ledger-device/succesful-transaction.png
      :alt: Screen showing succesful transaction.

Video Guide
===========

https://drive.google.com/file/d/1PAp1DI8GQO0yYKUfG2U_2VIzjXoTmYgC/view?usp=sharing

Support
=======

Telegram: https://t.me/concordium_official

Github: https://github.com/Concordium

Support email: support@concoridum.com


How it was made
===============

This guide was made according to the ledger third-party application design guidelines: `Ledger and Third-Party Wallets <https://www.ledger.com/academy/hardwarewallet/ledger-and-third-party-wallets>`_.


.. |copy| image:: ../images/desktop-wallet/ledger-device/copy-button.png
             :alt: Three horizontal lines
             :width: 20px
.. |collapse|    image:: ../images/desktop-wallet/ledger-device/collapse-button.png
                    :width: 20px
                    :alt: small square with pencil

