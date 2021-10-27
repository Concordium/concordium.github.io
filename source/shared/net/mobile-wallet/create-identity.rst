.. _create-identity:

==============================================================
Create an identity and an initial account in the Mobile Wallet
==============================================================

.. contents::
   :local:
   :backlinks: none

You can submit requests for additional identities and initial accounts in the Mobile Wallet. You do this from the **Identities** page.

.. Warning::
   Currently you can’t import accounts and identities created in the Concordium Desktop Wallet in the Mobile Wallet, and vice versa.

Create a new identity and initial account
=========================================

#. Go to the **Identities** page.

#. Press the **+** in the upper right corner.

#. Choose and input a name for your initial account. This name will only exist locally in the app, and will only be known by you. You can choose to call it whatever you like. Press **Continue**.

#. Enter a name for your identity. Again, this name is only stored locally in the app, and you don’t have to choose your actual name, it can be whatever you like. Press **Continue to identity providers**.

#. Select a third party identity provider from the list. This will open an external web flow within the app.

#. Finish the flow as presented by the third party identity provider. They will ask you to provide photos of identification documents and a selfie.

#. Having finished the external third party flow, you will have a pending initial account and identity in your app. The verification or rejection will usually be retrieved from the third party within minutes, but please check back in your app frequently for up to seven days, to retrieve the result.

|

.. image:: ../images/mobile-wallet/MW10.png
      :width: 25%
.. image:: ../images/mobile-wallet/MW11.png
      :width: 25%
.. image:: ../images/mobile-wallet/MW12.png
      :width: 25%

|

.. Note::
   When your identity and initial account has been verified, we strongly recommend that you make an export. This way, you’ll have a backup in case the database is damaged.

.. Note::
   Enter the **Balance** or **Shielded balance** of the new account, by pressing the Balance or Shielded balance areas on the account card.
