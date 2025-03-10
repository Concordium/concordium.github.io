.. include:: ../../variables.rst
.. _setup-cryptox-wallet:

===============================
Set up the |cryptox|
===============================

The |cryptox| is a digital :term:`wallet` that enables you to create and manage your Concordium
:term:`identities<identity>` and :term:`accounts<account>` and to create transactions such as sending CCD, :term:`shielding` and :term:`unshielding` CCD,
and sending :term:`shielded transactions<shielded transfer>`.

To learn more about identities and accounts, see :ref:`identities<reference-id-accounts>` and :ref:`accounts<managing_accounts>`.

Follow this guide to set up your wallet.

Get started
===========

#. Install the |cryptox| on an Android or iOS phone. See :ref:`Downloads<downloads-cryptox>`.

#. Open the |cryptox|. You'll see an introduction screen explaining the key features.

#. Read and accept the Terms and Conditions and Privacy Policy by checking the box.

   You can also choose to allow activity tracking in the app. This tracking only applies to general usage, not funds, transactions, or personal data.

#. Tap **Get started**.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding1.png
      :width: 40%
      :alt: screen with terms and conditions


Set up your wallet
==================

The wallet setup consists of three phases: Create a 6-digit passcode, Save seed phrase, and Verify identity.

You can pause between the phases and return later to continue.

Create passcode
---------------

#. Tap **Continue** to begin creating your new wallet.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding2.png
      :width: 40%
      :alt: screen with activate account

   .. Note::
      If you already have a wallet to import, you can select **Import a wallet** at the bottom of the screen. This allows you to :doc:`restore using a seed phrase, wallet private key, or backup file <./recover-wallet>`.

#. Create a six-digit passcode or use a full password. Repeat passcode or password.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding3.png
      :width: 40%
      :alt: screen with keypad to enter passcode


Save seed phrase
----------------

After setting up your passcode, you'll see the main wallet screen with a progress indicator showing your setup progress. Your progress is automatically saved, so you can close the app now and continue the setup later if you wish.

#. Tap **Save seed phrase** to continue setup.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding4.png
      :width: 40%
      :alt: screen with information about saving seed phrase

#. Now you see your seed phrase which is the access key to all the funds in your wallet.

   You can either write it down, make a digital copy, or take a screenshot of it.
   In either case, make sure to keep it somewhere safe in case you need to recover your wallet.

   When done, check the confirmation box and tap **Continue**.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding5.png
      :width: 40%
      :alt: screen with information about saving seed phrase

#. Enter your passcode when prompted.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding6.png
      :width: 40%
      :alt: screen with identity providers


Verify identity
---------------

After securing your seed phrase, you'll return to the main wallet screen. A progress bar shows that you're now ready for the final step. Your progress is automatically saved, so you can close the app now and continue the setup later if you wish.

#. Tap **Verify identity** to continue setup.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding7.png
      :width: 40%
      :alt: screen with identity providers



#. Now you must submit a request for an identity verification. Select an identity provider.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding8.png
      :width: 40%
      :alt: screen with identity providers

#. Enter your passcode or password when prompted. An external web page opens within the app.

#. Enter the information requested by the third-party identity provider. The information might vary depending on the identity provider.
   However, they will ask you to provide photos of identification documents and a selfie.

#. When you have submitted the information to the identity provider, the verification or rejection is usually retrieved from the identity provider within minutes, but check your app frequently to retrieve
   the result. The result can be retrieved for up to seven days.

   If your identity request is rejected, you see a message. Tap **Make new identity request** to create a new identity request. You can choose another identity provider.

Create account
==============

Once the identity provider has approved your verification request, you can create your first account. A progress bar shows that you have now completed the setup and can create your first account.

#. Tap **Create account** to set up your first account.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding9.png
      :width: 40%
      :alt: screen with identity providers

#. Enter your passcode or password when prompted.


#. Your new account will be visible in the Accounts list.

   .. image:: ../images/cryptoX/onboarding/cryptox-onboarding10.png
      :width: 40%
      :alt: screen showing first account in list

If you want to, you can :ref:`change the name of the account<change-mw-acct-name>`.

Basic navigation
================

In the wallet you have some navigation options.

.. image:: ../images/cryptoX/cryptoX-basic-navigation-callouts.png
      :alt: main wallet screen with position numbers
      :width: 60%

1. Balances: shows total balances of all accounts.
2. Account: shows the identity on which the account was created, and totals.
3. :ref:`More screen<mw-cryptoX-more-screen>`: contains actions for the wallet.
4. Scan QR code: tap to :ref:`scan a QR code to connect to a dApp<connect-app-bw>`.
5. Add: to :ref:`add a new account<create-account>`.
6. Account actions: range of actions you can perform on the account, such as send and receive.
7. Shortcut to Concordium News.
8. NFT administration.

.. _mw-cryptoX-more-screen:

More screen
-----------

In the More screen |more| you have the following options.

- Identities: view all identities in the wallet and details of the identities, :ref:`edit identity names<change-mw-id-name>`, and :ref:`create new identities<create-initial-account>`.
- Address book: :ref:`manage your address book<address-book-mw>`.
- Recovery: :ref:`recover your wallet<recover-wallet>`.
- Show my seed phrase: :ref:`show my seed phrase<show-seed-phrase>`
- Update passcode and biometrics: :ref:`change your wallet passcode or activate biometrics<change-passcode-mw>`.

In case you have created your wallet from a backup file, you will not have the Recovery and  Show my seed phrase options, but instead the options :ref:`Import<import-export-file>` and :ref:`Export<import-export-file>`.

Account navigation
------------------

When you tap an account, you see the details for the specific account, including balances and transactions.

.. image:: ../images/cryptoX/cryptoX-account-balance.png
      :width: 40%
      :alt: account details screen with navigation bar highlighted

The toolbar contains actions that can be performed on the account:

- Send: :ref:`send funds<send-CCD-wallets>`
- Receive: find and share your address
- Earn: configure and manage :ref:`validation<baker-concept>` or :ref:`delegation<delegation-concept>`

- Account settings: To perform less often used actions on an account tap |cryptoX-account-settings|

   - Transfer filters: configure filters to show or hide rewards
   - Release schedule: :ref:`inspect a release schedule<inspect-release-schedule-mw>`
   - Export private key: :ref:`export your private key<export-key>` for testing smart contracts, for example
   - Export transaction logs: :ref:`export transaction logs<export-transaction-logs>`
   - Change account name: :ref:`customize account names<change-mw-acct-name>`

.. |cryptoX-account-settings| image:: ../images/cryptoX/cryptoX-acct-settings.png
                        :alt: gear wheel
                        :width: 40px

.. |more| image:: ../images/cryptoX/cryptoX-more.png
                        :alt: more button
                        :width: 40px
