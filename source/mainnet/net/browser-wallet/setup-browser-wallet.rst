.. include:: ../../variables.rst
.. _setup-browser-wallet:

=========================
Set up the |bw|
=========================

The |bw| is a digital wallet that enables you to create and manage your Concordium
:ref:`identities<glossary-identity>` and :ref:`accounts<glossary-account>` and to create transactions, such as sending CCD.

To learn more about identities and accounts, see :ref:`identities<reference-id-accounts>` and :ref:`accounts<managing_accounts>`.

Read the following guide to learn how to set up the wallet.

.. _setup-bw:

Get started
===========

#. Download the |bw| extension. See :ref:`Downloads <downloads>`.

.. tabs::

   .. tab:: Chrome

      #. Click **Add to Chrome** from the Chrome Web Store.

      #. If prompted, click **Add extension**.

      #. Click on the puzzle icon. Click **Concordium Wallet** to start the extension.

      #. Create a six-digit passcode or use a full password.

      #. Choose whether you are creating a new wallet or :ref:`recovering an existing one<recover-wallet>`.

         .. image:: ../images/browser-wallet/wallet-choice.png
                  :width: 25%

   .. tab:: Safari

      |bw| is not available yet for Safari.

Recovery phrase setup
=====================

If you are creating a new wallet, you must set up a recovery phrase. This is a 24 word phrase that stores your private keys, identities, and accounts. You must write down and confirm your recovery phrase. It is important to keep this secret recovery phrase in a safe location in case you need to recover your wallet on a new device.

#. Once you click on **Create** you are shown the 24 word secret recovery phrase. Write it down and click **Continue**.

   .. image:: ../images/browser-wallet/recovery-phrase.png
            :width: 25%

#. Enter all 24 words of your secret recovery phrase to confirm it. Click **Continue**.

#. Choose whether to connect to Mainnet or Testnet to create your wallet.

Request your identity
=====================

Having set up your passcode, you must then submit a request for an identity.

#. Select a third-party identity provider from the list. An external web page opens within the app.

#. Enter the information requested by the third-party identity provider. The information might vary depending on the identity provider. However, they will ask you to provide photos of identification documents and a selfie.

#. When you have submitted the information to the identity provider, you will have a pending identity in your app.  The verification or rejection is usually retrieved from the identity provider within minutes, but check frequently to retrieve the result. The result can be retrieved for up to seven days.

Create an account
=================

#. To switch to the accounts page, click |hamburger-bw| and select **Accounts**.

#. Click the Accounts drop-down. Then click **Add new**.

#. Select the Identity to use for the account. Click **Add account**.

Remove the |bw|
===============

Removing your wallet does not remove your data on the Concordium blockchain.

.. Warning::

   Before proceeding, if you wish to continue to access your wallet and accounts, make sure you have your secret recovery phrase.

.. tabs::

   .. tab:: Chrome

      #. Click |chrome-ext|. Click |chrome-options| to the right of **Concordium Wallet**.

      #. Click **Remove from Chrome**.

   .. tab:: Safari

      |bw| is not available yet for Safari.

.. |chrome-ext|    image:: ../images/browser-wallet/chrome-extensions-icon.png
                    :width: 20px
                    :alt: puzzle piece

.. |chrome-options| image:: ../images/browser-wallet/chrome-options-icon.png
                    :width: 20px
                    :alt: three vertical dots

.. |hamburger-bw| image:: ../images/browser-wallet/hamburger-menu.png
                    :width: 20px
                    :alt: three horizontal lines
