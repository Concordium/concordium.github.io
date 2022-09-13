.. include:: ../../variables.rst
.. _setup-browser-wallet:

=========================
Set up the |bw|
=========================

The |bw| is a digital wallet that enables you to create and manage your Concordium
:ref:`identities<glossary-identity>` and :ref:`accounts<glossary-account>` and to create transactions, such as sending CCD.

To learn more about identities and accounts, see :ref:`identities<reference-id-accounts>` and :ref:`accounts<managing_accounts>`.

Read the following guide to learn how to set up the wallet.

Get started
===========

#. Download the |bw| extension. See :ref:`Downloads <downloads>`.

#. Open a Google Chrome browser. Click **Extensions**. Select **Manage Extensions**.

#. Turn on Developer mode. Click Load unpacked.

#. Add the extension from the folder to which it was downloaded (and maybe unzipped, only at the dist file folder). You can click Extensions and "pin" an icon to the toolbar for the browser wallet if you want, or set up a keyboard shortcut for it. Otherwise, click Extensions whenever you want to start the browser wallet. 

#. Create a six-digit passcode or use a full password.

#. Choose whether you are creating a new wallet or :ref:`recovering an existing one<recovery-wallet>`.

   .. image:: ../images/browser-wallet/wallet-choice.png

Recovery phrase setup
=====================

If you are creating a new wallet, you must set up a recovery phrase. This is a 24 word phrase that stores your private keys, identities, and accounts. You must write down and confirm your recovery phrase. It is important to keep this secret recovery phrase in a safe location in case you need to recover your wallet on a new device.

#. Once you click on **Create** you are shown the 24 word secret recovery phrase. Write it down and click **Continue**.

   .. image:: ../images/browser-wallet/recovery-phrase.png

#. Enter all 24 words of your secret recovery phrase to confirm it. Click **Continue**.

#. Choose whether to connect to Mainnet or Testnet to create your wallet.

Request your identity
=====================

Having set up your passcode, you must then submit a request for an identity.

#. If you don’t have any identities, click the ID cards drop-down.

#. Click **Request new**.

   .. image:: ../images/browser-wallet/id-cards-new.png

#. Select a third-party identity provider from the list. An external web page opens within the app.

#. Enter the information requested by the third-party identity provider. The information might vary depending on the identity provider. However, they will ask you to provide photos of identification documents and a selfie.

#. When you have submitted the information to the identity provider, you will have a pending identity in your app.  The verification or rejection is usually retrieved from the identity provider within minutes, but check frequently to retrieve the result. The result can be retrieved for up to seven days.

Create an account
=================

#. To switch to the accounts page, click the Concordium logo (screenshot) and select **Accounts**.

#. Click the Accounts drop-down. Then click **Add new**.

#. Select the Identity to use for the account. Click **Add account**.
