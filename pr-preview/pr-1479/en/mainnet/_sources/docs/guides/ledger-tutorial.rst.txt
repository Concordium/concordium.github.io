.. _ledger-tutorial:

============================================================
Use your Ledger Device with Concordium Desktop Wallet
============================================================

Introduction
------------

A Ledger Device is a hardware wallet that is considered one of the most secure ways to store your digital assets. It uses an offline method (also known as cold storage) method for generating private keys, making it the preferred choice for many cryptocurrency users. This guide will help you to connect your Ledger Device to the Concordium Desktop Wallet. The Concordium Desktop Wallet enables you to Send and Receive CCD with the Ledger Device.

Quick links
-----------

* :ref:`Set up the Desktop Wallet<overview-desktop>`
* :ref:`Wallet activities<manage-wallets-lp>`
* :ref:`Send CCD<send-CCD-wallets>`
* :ref:`Transfer CCD with a schedule in the Desktop Wallet<CCD-single-schedule-desktop>`
* :ref:`Desktop wallet Navigation and settings<overview-account-desktop>`

Prerequisites
-------------

Before you start, make sure that:

* You have one of the following supported Ledger devices:

  * Ledger Nano S+
  * Ledger Nano X
  * Ledger Stax
  * Ledger Flex

* You've `initialized <https://support.ledger.com/article/360000613793-zd?redirect=false>`_ your Ledger Device
* The latest firmware is `installed <https://support.ledger.com/article/360002731113-zd?redirect=false>`_
* Ledger Live is `ready to use <https://support.ledger.com/article/4404389503889-zd>`_
* You've installed the latest version of `Concordium Desktop Wallet <https://www.concordium.com/wallet/end-users#wallet>`_

Install the Concordium app on your Ledger Device
------------------------------------------------

#. Open the Manager in Ledger Live
#. Connect and unlock your Ledger Device
#. If asked, follow the onscreen instructions and Allow Ledger Manager
#. Find Concordium in the app catalog and install the Concordium app

   .. image:: ../../docs/images/ledger-tutorial/Install1.png
      :alt: Concordium app in Ledger Live catalog

#. Click **Install**.

   a. An installation window appears.
   b. Your device displays *Processing*.…
   c. The app installation is confirmed.

   .. image:: ../../docs/images/ledger-tutorial/1Ledger.jpeg
      :alt: Concordium app on Ledger device

   .. image:: ../../docs/images/ledger-tutorial/2LEDGER.jpeg
      :alt: Installation confirmation

#. Close Ledger Live

Connect to the Concordium Desktop Wallet
----------------------------------------

#. Connect and unlock your Ledger Device.
#. Open the Concordium app on your Ledger Device.

   .. image:: ../../docs/images/ledger-tutorial/1Ledger.jpeg
      :alt: Concordium app on Ledger device

   - Ledger Nano X shows *Concordium*.

   .. image:: ../../docs/images/ledger-tutorial/2LEDGER.jpeg
      :alt: Installation confirmation

   Ledger Nano x shows *Concordium is ready*.

#. Open the Concordium Desktop Wallet Application and create your account.

   .. image:: ../../docs/images/ledger-tutorial/ConnectStep3.png
      :alt: Create account screen

#. Accept credential on a device, then click **Submit** on the right side of the screen.

   .. image:: ../../docs/images/ledger-tutorial/ConnectStep3.5.png
      :alt: Accept credential screen

   .. image:: ../../docs/images/ledger-tutorial/ConnectStep4.png
      :alt: Submit button location

#. Confirm the public key export on a device.

   .. image:: ../../docs/images/ledger-tutorial/ConnectStep5.png
      :alt: Public key export confirmation

#. Verify that the address on the Concordium Desktop Wallet matches the address on your Ledger Device.

   .. image:: ../../docs/images/ledger-tutorial/ConnectStep6.png
      :alt: Address verification screen

#. Confirm the Concordium Wallet address details on Ledger.

   .. image:: ../../docs/images/ledger-tutorial/ConnectStep7.png
      :alt: Ledger address confirmation

#. Your New Concordium Desktop Wallet account has been created.

   .. image:: ../../docs/images/ledger-tutorial/ConnectStep8.png
      :alt: New account creation confirmation

.. note::

   For Ledger Nano S+: Press the right button to show the address.

.. note::

   For Ledger Nano X: Press the right button to scroll to "Display Account". Then press both buttons to show the address.

View Account Balance
--------------------

Your account balance is shown on the top bar of the Desktop Wallet denominated in CCD amount.

.. image:: ../../docs/images/ledger-tutorial/ViewAccountBalance.png
   :alt: Account balance display

Receive CCD in the Concordium Desktop Wallet
--------------------------------------------

#. Make sure you have verified your Receive address as shown in Steps 5 and 6 of **Connecting to the Concordium Desktop Wallet**.
#. You can get your Receive address by simply copying the address to the clipboard or by scanning the QR code.

   a. You can copy the address by clicking the **Copy** icon |copy| next to the address.

      .. image:: ../../docs/images/ledger-tutorial/Receive1.png
         :alt: QR code display

   b. To scan the QR code, click the QR code, which will show an enlarged QR code to scan. Verify that the address matches after you have scanned. Click the **Collapse** icon |collapse| to go back to the Main page.

      .. image:: ../../docs/images/ledger-tutorial/Receive2.png
         :alt: Enlarged QR code

      .. image:: ../../docs/images/ledger-tutorial/Receive3.png
         :alt: Wating for user to finish process

   c. Once you have sent CCD from another wallet, you will see it in your transaction history and your CCD balance will update

Send CCD in the Concordium Desktop Wallet
-----------------------------------------

#. Click on **Send** on the left side, enter the CCD address and the amount on the right side of the screen, and click the **Continue**.

   .. image:: ../../docs/images/ledger-tutorial/SendStep1.png
      :alt: Send CCD screen

#. Review the amount you are sending and the transaction fees, and click the **Submit**.

   .. image:: ../../docs/images/ledger-tutorial/SendStep2.png
      :alt: Transaction review screen

#. Review and sign the transaction on your Ledger Device

   .. image:: ../../docs/images/ledger-tutorial/SendStep3_1.jpeg
      :alt: Ledger transaction review

   Press the right button on your Ledger Device to review the transaction details (Amount and Address) until you see *Sign Transaction*.

   .. image:: ../../docs/images/ledger-tutorial/SendStep3_2.jpeg
      :alt: Amount screen

   Press both buttons on your Ledger Device to sign the transaction.

   .. image:: ../../docs/images/ledger-tutorial/SendStep3_3.jpeg
      :alt: Transaction signing confirmation

#. Once you sign the Transaction on the Ledger Device, a green banner will appear to show that the transaction was successful and a *Sending transaction* appears in the Transaction history

   .. image:: ../../docs/images/ledger-tutorial/SendStep4.png
      :alt: Transaction success confirmation

Video guide
-----------

A video guide is available below:

.. video:: ../../docs/images/ledger-tutorial/Desktop_wallet_x_Ledger.mp4
    :width: 80%
    :align: center

Support
-------

* Telegram: https://t.me/concordium_official
* Github: https://github.com/Concordium
* Support email: support@concoridum.com

How it was made
---------------

This guide was made according to the ledger third-party application design guidelines: `Ledger and Third-Party Wallets <https://www.ledger.com/academy/hardwarewallet/ledger-and-third-party-wallets>`_.


.. |copy| image:: ../../docs/images/ledger-tutorial/copy-button.png
             :alt: two pages
             :width: 20px
.. |collapse|    image:: ../../docs/images/ledger-tutorial/collapse-button.png
                    :width: 20px
                    :alt: two arrows


