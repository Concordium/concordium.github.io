.. include:: ../../variables.rst
.. _setup-browser-wallet:

=========================
Set up the |bw|
=========================

The |bw| is a digital wallet that enables you to create and manage your Concordium
:term:`identities<identity>` and :term:`accounts<account>` and to create transactions, such as sending CCD.

To learn more about identities and accounts, see :ref:`Identity<reference-identity>` and :ref:`accounts<managing_accounts>`.

Read the following guide to learn how to set up the wallet.

.. Note::

   The |bw| extension is not supported in any of the web browsers below when used on a mobile phone or tablet.

.. _setup-bw:

Get started
===========

#. Download the |bw| extension for your browser.

.. dropdown:: Chrome

   #. Go to the `Chrome Web Store <https://chrome.google.com/webstore/category/extensions>`__ and search for Concordium Wallet.

   #. Click **Add to Chrome** from the Chrome Web Store.

   #. If prompted, click **Add extension**.

   #. Click on the puzzle icon. Click **Concordium Wallet** to start the extension.

   #. Click **Get started** on the welcome page.

      .. image:: ../images/browser-wallet/new/welcome_page.png
            :alt: Welcome screen
            :width: 50%

   #. Create a six-digit passcode or use a full password. Click **Continue**.

      .. image:: ../images/browser-wallet/new/create_passcode.png
            :alt: screen for setting up passcode
            :width: 50%

   #. Choose whether you are creating a new wallet or :ref:`recovering an existing one<backup-import-recover>`.

      .. image:: ../images/browser-wallet/new/create_restore.png
            :alt: screen with option to create or restore
            :width: 50%

.. dropdown:: Edge

   Extensions designed for Google Chrome can also be used in Microsoft Edge. To add an extension to Microsoft Edge from the Chrome Web Store:

   #. In Microsoft Edge, go to the `Chrome Web Store <https://chrome.google.com/webstore/category/extensions>`__.

   #. Select **Allow extensions from other stores** in the banner at the top of the page, then click **Allow** to confirm.

   #. Search for Concordium Wallet and select **Add to Chrome**.

   #. At the prompt showing permissions required by the extension carefully review the permissions, and then click **Add extension** if you wish to proceed. You'll see a final prompt confirming the extension has been added.

   #. Click on the Concordium icon to start the extension.

   #. Click **Get started** on the welcome page.

      .. image:: ../images/browser-wallet/new/welcome_page.png
            :alt: Welcome screen
            :width: 50%

   #. Create a six-digit passcode or use a full password.

      .. image:: ../images/browser-wallet/new/create_passcode.png
            :alt: screen for setting up passcode
            :width: 50%

   #. Choose whether you are creating a new wallet or :ref:`recovering an existing one<backup-import-recover>`.

      .. image:: ../images/browser-wallet/new/create_restore.png
            :alt: screen with option to create or restore
            :width: 50%

   For more information, see the `Microsoft support site <https://support.microsoft.com/en-us/microsoft-edge/add-turn-off-or-remove-extensions-in-microsoft-edge-9c0ec68c-2fbc-2f2c-9ff0-bdc76f46b026#:~:text=1%20Open%20Microsoft%20Edge%20and%20go%20to%20the,confirming%20the%20extension%20has%20been%20added.%20See%20More>`_.

.. dropdown:: Opera

   #. In Opera, go to the `Chrome Web Store <https://chrome.google.com/webstore/category/extensions>`__ and search for Concordium Wallet.

   #. Click **Add to Opera**.

   #. At the prompt showing permissions required by the extension carefully review the permissions, and then click **Add extension** if you wish to proceed. You'll see a final prompt confirming the extension has been added.

   #. Click on the cube icon in your Opera toolbar. Click **Concordium Wallet** to start the extension.

   #. Click **Get started** on the welcome page.

      .. image:: ../images/browser-wallet/new/welcome_page.png
            :alt: Welcome screen
            :width: 50%

   #. Create a six-digit passcode or use a full password.

      .. image:: ../images/browser-wallet/new/create_passcode.png
            :alt: screen for setting up passcode
            :width: 50%

   #. Choose whether you are creating a new wallet or :ref:`recovering an existing one<backup-import-recover>`.

      .. image:: ../images/browser-wallet/new/create_restore.png
            :alt: screen with option to create or restore
            :width: 50%

.. dropdown:: Brave

   #. Go to the `Chrome Web Store <https://chrome.google.com/webstore/category/extensions>`__ and search for Concordium Wallet.

   #. Click **Add to Chrome** from the Chrome Web Store.

   #. If prompted, click **Add extension**.

   #. Click on the puzzle icon. Click **Concordium Wallet** to start the extension.

   #. Click **Get started** on the welcome page.

      .. image:: ../images/browser-wallet/new/welcome_page.png
            :alt: Welcome screen
            :width: 50%

   #. Create a six-digit passcode or use a full password.

      .. image:: ../images/browser-wallet/new/create_passcode.png
            :alt: screen for setting up passcode
            :width: 50%

   #. Choose whether you are creating a new wallet or :ref:`recovering an existing one<backup-import-recover>`.

      .. image:: ../images/browser-wallet/new/create_restore.png
            :alt: screen with option to create or restore
            :width: 50%

Recovery phrase setup
=====================

If you are creating a new wallet, you must set up a seed phrase. This is a 24 word phrase that stores your private keys, identities, and accounts. You must write down and confirm your seed phrase. It is important to keep this seed phrase in a safe location in case you need to recover your wallet on a new device.

#. When you click **Create**, the 24 word seed phrase is shown. Write it down and click **Continue**.

   .. image:: ../images/browser-wallet/new/recovery.png
            :alt: screen with recovery phrase and continue option
            :width: 50%

#. Enter all 24 words of your seed phrase to confirm it. Click **Continue**.

#. Choose whether to connect to Mainnet or Testnet to create your wallet.

Request your identity
=====================

Having set up your passcode, you must then submit a request for an identity.

#. Select a third-party identity provider from the list. An external web page opens within the app.

#. Enter the information requested by the third-party :term:`identity provider`. The information might vary depending on the identity provider. However, they will ask you to provide photos of identification documents and a selfie.

#. When you have submitted the information to the identity provider, you will have a pending identity in your app.  The verification or rejection is usually retrieved from the identity provider within minutes, but check frequently to retrieve the result. The result can be retrieved for up to seven days.

Create an account
=================

#. When you have no accounts, the main page will show *No accounts*. Click **Create account** to create your first account.

   .. image:: ../images/browser-wallet/new/create_account.png
            :alt: screen with option for creating account
            :width: 50%

#. Select the Identity to use for the account and click **Create account**.

Basic navigation
================

Main page
---------
The main page shows your account information and a menu accessible from the top-right corner. The page layout includes:

#. An account selector in the top left that lets you switch between accounts, showing the current account's address and a dropdown arrow.

#. Your total CCD balance.

#. Four quick action buttons: **Receive**, **Send**, **Earn**, and **Activity**.

#. A list of your tokens with their balances.

#. Option to manage your token list at the bottom.

   .. image:: ../images/browser-wallet/new/main_page.png
            :alt: menu at top of window with drop-down expanded to show options
            :width: 50%

Menu
----
Clicking the menu button |menu| in the top-right corner opens a page with additional features:

#. **Identities**: Manage your identities
#. **Accounts**: View and manage accounts
#. **Seed phrase**: Access your recovery phrase
#. **Passcode**: Security settings
#. **Web3 ID**: Web3 identity features
#. **Earn**: Staking and rewards
#. **Network**: Network settings
#. **About**: App information
#. **Restore**: Recovery options
#. **Old UI**: Previous interface version
#. **NFT**: NFT management

The menu can be closed by clicking the **X** in the top-right corner to return to the main page.

.. image:: ../images/browser-wallet/new/menu_screen.png
         :alt: screen with option for creating account
         :width: 50%


View account activity
---------------------

#. Select the account from the account selector in the top left of the main page.
#. Click |activity|
#. For transaction details, click on any specific transaction in the list.

Find and share your account address
-----------------------------------

#. Select the account from the account selector in the top left of the main page.
#. Click |new_receive|
#. Share your address:

    - You can let someone scan your QR code if they have the |mw-gen1| installed.

    - You can click **Copy Address** to copy the address and then paste it wherever needed.

.. _switch-network:

Change network
--------------

You can use the wallet on both Mainnet and Testnet without the need for a separate application. Use the **Network Settings** to switch between Mainnet and Testnet.

.. Note::

    Accounts and identities are NOT shared between mainnet and testnet.

#. Click |menu| to open the menu page.

#. Click **Network**.

#. Select the Network you want to connect to: Mainnet or Testnet. Note that the color of the user interface items in Mainnet is blue and the color of the user interface items in Testnet is green.

Switch between old and new UI
-----------------------------
You can switch between the old and the new wallet interface.

To access the old interface:

#. Click |menu| to open the menu page.
#. Click **Old UI**.

To return to the new interface:

#. Go to Wallet settings in the old interface.
#. Click **Wallet X**.


.. |gear| image:: ../images/browser-wallet/account-settings.png
             :alt: gear wheel
             :width: 50px

.. |log| image:: ../images/browser-wallet/transaction-log.png
             :alt: gear wheel
             :width: 50px

.. |copy| image:: ../images/copy.png
             :alt: two documents
             :width: 40px

.. |receive| image:: ../images/browser-wallet/receive-ccd.png
             :alt: button with qr code
             :width: 50px

.. |menu| image:: ../images/browser-wallet/new/menu_button.png
             :alt: button for opening menu
             :width: 50px

.. |activity| image:: ../images/browser-wallet/new/activity_button.png
             :alt: button for viewing wallet activities
             :width: 50px

.. |new_receive| image:: ../images/browser-wallet/new/receive_button.png
             :alt: button for viewing qr code
             :width: 50px

Remove the |bw|
===============

Removing your wallet does not remove your data on the Concordium blockchain.

.. Warning::

   Before proceeding, if you wish to continue to access your wallet and accounts, make sure you have your seed phrase.

.. dropdown:: Chrome

   #. Click |chrome-ext|. Click |chrome-options| to the right of **Concordium Wallet**.

   #. Click **Remove from Chrome**.

.. dropdown:: Edge

   #. Click |edge-exts|. Click |edge-options| to the right of **Concordium Wallet**.

   #. Click **Remove from Microsoft Edge**.

   #. Click **Remove** to confirm removal.

.. dropdown:: Opera

   #. Click |opera-exts|. Click |opera-options| to the right of **Concordium Wallet**.

   #. Click **Remove extension**.

   #. Click **Remove** to confirm removal.

.. dropdown:: Brave

   #. Click |brave-exts|. Click |brave-options| to the right of **Concordium Wallet**.

   #. Click **Remove from Brave**.

   #. Click **Remove** to confirm removal.

.. Note::

   If you forget your passcode for your installed |bw|, you will need to remove the extension in your internet browswer and reinstall it, choosing the option to :ref:`recover your wallet<backup-import-recover>`. Use your seed phrase to recover the wallet.

.. |chrome-ext|    image:: ../images/browser-wallet/chrome-extensions-icon.png
                    :width: 20px
                    :alt: puzzle piece

.. |chrome-options| image:: ../images/browser-wallet/chrome-options-icon.png
                    :width: 20px
                    :alt: three vertical dots

.. |edge-exts|    image:: ../images/browser-wallet/edge-exts.png
                    :width: 20px
                    :alt: puzzle piece

.. |edge-options| image:: ../images/browser-wallet/edge-options.png
                    :width: 20px
                    :alt: three horizontal dots

.. |brave-exts|    image:: ../images/browser-wallet/brave-exts.png
                    :width: 20px
                    :alt: puzzle piece

.. |brave-options| image:: ../images/browser-wallet/brave-options.png
                    :width: 20px
                    :alt: three horizontal lines

.. |opera-exts| image:: ../images/browser-wallet/opera-exts.png
                  :width: 20px
                  :alt: 3d cube

.. |opera-options| image:: ../images/browser-wallet/opera-actions.png
                     :width: 20px
                     :alt: three vertical dots

.. |hamburger-bw| image:: ../images/browser-wallet/hamburger-menu.png
                    :width: 20px
                    :alt: three horizontal lines
