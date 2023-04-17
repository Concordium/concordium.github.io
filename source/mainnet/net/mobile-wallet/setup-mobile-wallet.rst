.. include:: ../../variables.rst
.. _setup-mobile-wallet:

========================
Set up the |mw-gen1|
========================

The |mw-gen1| is a digital :ref:`wallet<glossary-wallet>` that enables you to create and manage your Concordium
:ref:`identities<glossary-identity>` and :ref:`accounts<glossary-account>` and to create transactions such as sending CCD, :ref:`shielding<glossary-shielding>` and :ref:`unshielding<glossary-unshielding>` CCD,
and sending :ref:`shielded transactions<glossary-shielded-transfer>`.

To learn more about identities and accounts, see :ref:`identities<reference-id-accounts>` and :ref:`accounts<managing_accounts>`.

Read the following guide to learn how to set up the wallet.

Get started
===========

#. Install |mw-gen1| on either an iPhone or an Android phone. See :ref:`Downloads <downloads>`.

#. Open |mw-gen1|; read and accept the Terms and Conditions.

#. Create a six-digit passcode or use a full password.

   .. image:: ../images/mobile-wallet/MW4.png
      :width: 50%
      :alt: screen to enter six digit passcode or enter a full password

#. Decide whether or not you want to enable biometrics.

   .. image:: ../images/mobile-wallet/MW5.png
      :width: 50%
      :alt: screen to choose if biometrics is enabled

Request your identity and initial account
=========================================

Having set up your passcode and possibly biometrics, you must then submit a request for an identity
and an initial account. You do this immediately after setting up the passcode and biometrics.

#. If you don’t have any identities or accounts, tap **I want to create my initial account**.

   - If you already have one or more identities and accounts, you can just import them now.

#. Read the next page in the app, shortly explaining the initial account and identity. Tap **Okay, got it**!

#. Enter a name for your initial account. This name is only stored locally in the app and is only known by you. Tap **Continue**.

#. Enter a name for your identity. Again, this name is only stored locally in the app and only known by you. Tap **Continue to identity providers**.

   .. image:: ../images/mobile-wallet/MW10.png
      :width: 50%
      :alt: screen to enter name for identity

#. Select a third party identity provider from the list. An external web page opens.

   .. image:: ../images/mobile-wallet/MW11.png
      :width: 50%
      :alt: screen to select third-party identity provider to use to verify identity

#. Enter the information requested by the third-party identity provider. The information might vary depending on the identity provider.
   However, they will ask you to provide photos of identification documents and a selfie.

#. When you have submitted the information to the identity provider, you will have a pending initial account and identity in your app.
   The verification or rejection is usually retrieved from the identity provider within minutes, but check your app frequently to retrieve
   the result. The result can be retrieved for up to seven days.

   .. image:: ../images/mobile-wallet/MW12.png
      :width: 50%
      :alt: screen showing that identity verification has been submitted

.. Warning::
   **When your identity and initial account has been verified, backup is essential. If you lose your mobile phone or need to restore your mobile phone and you don't have a backup, you can't access your wallet and your CCDs are permanently inaccessible.**
   **Concordium does not take any responsibility if you lose access to your accounts. Concordium strongly advise you to complete a backup every time you create an account and store the backup file in a secure place - preferably offline.**
   For more information, see :ref:`Make a backup of identities, accounts, and addresses<export-import>`.

.. Note::
   To access the **Balance** of the new account, tap the Balance area on the account card or tap More.
