
.. _create-initial-account:

=========================================
Create an identity and an initial account
=========================================

Before you can start using a Wallet and submit transactions to the blockchain, you need an initial account and an identity issued by an identity provider. The identity provider submits the initial account to the chain and knows the identity of the owner of the initial account, but not of any other accounts that you create.

To learn more about identities and accounts, see :ref:`Identities <reference-id-accounts>` and :ref:`Accounts <managing_accounts>`.

.. tabs::

    .. tab:: Desktop Wallet

         Before you start, you need a Ledger hardware device that's set up and ready for use.

         .. warning::
            You can't exchange identities and accounts between the Mobile Wallet and the Desktop Wallet. You can, however, send CCD from one wallet to another.

         #. Go to **Accounts**. A message is displayed saying you don't have an identity or an initial account yet. Select **Request new**. If you've been using another computer, and you already have an existing account, you can select **Import existing**.

         #. Enter a name for your identity, and then enter a name for your initial account. Select **Continue**.

         #. Select an identity provider.

         #. Connect your Ledger hardware device and enter your PIN code on the Ledger. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

         #. In the Desktop Wallet, there's a message asking you to open the Concordium application on the Ledger. On the Ledger, press both buttons when it says **Concordium**. The Ledger says **Concordium is ready**.

         #. In the Desktop Wallet there's a message saying **Ledger Nano S is ready**. Select **Submit**.

         #. Press both buttons to confirm the following on the Ledger:

            - Create credential (each credential is assigned a number): : Press the right button and then both buttons to confirm **Accept**.
            - Public key: Press both buttons to accept.

         #. Review that the public key on the Ledger corresponds to the public key in the Desktop Wallet. Use the right button to navigate through the key.

         #. Press both buttons to confirm, and then in the Desktop Wallet, select **Continue**.

         #. The Ledger says **Review identity provider info**. Press both buttons, and then press the right button to navigate through the public key and verify that it corresponds to the information in the Desktop Wallet. Press both buttons to confirm.

         #. Verify that the signature threshold on the Ledger corresponds to the threshold in the Desktop Wallet.

         #. Press the right button, and then press both buttons to sign the identity provider information.

         #. In the Desktop Wallet, the **New identity** page is displayed. Enter the identity verification information and select **Submit**. This information will vary depending on the identity provider. The identity provider submits the identity to the blockchain. When the initial account is created in a finalized block on the blockchain, the identity provider confirms the identity, and after confirmation, a green check mark is displayed next to the Concordium logo on the identity.

         #. Select **Finished**. When you've created more accounts, you can recognize you initial account by the text **(identity)** next to the name.

         .. Note::
            You can change the name of an identity after it has been created. Go to the Identities page. Select the identity. Click |edit| next to the identity name. Change the name and click the |save| to save the change.

   .. tab:: Mobile Wallet
      You can submit requests for additional :ref:`identities<glossary-identity>` and :ref:`initial accounts<glossary-initial-account>` in the Mobile Wallet. You do this from the **Identities** page.

      #. Go to the |morepage| page.

      #. Tap **Your identity cards** page.

      #. Tap the **+** in the upper right corner.

      #. Enter a name for your initial account. This name is only stored locally in the app and is only known by you. Tap **Continue**.

      #. Enter a name for your identity. Again, this name is only stored locally in the app and only known by you. Tap **Continue to identity providers**.

         .. image:: ../images/mobile-wallet/MW10.png
            :width: 25%

      #. Select a third-party identity provider from the list. An external web page opens within the app.

         .. image:: ../images/mobile-wallet/MW11.png
            :width: 25%

      #. Enter the information requested by the third-party identity provider.  The information might vary depending on the identity provider. However, they will ask you to provide photos of identification documents and a selfie.

      #. When you have submitted the information to the identity provider, you will have a pending initial account and identity in your app. The verification or rejection is usually retrieved from the identity provider within minutes, but check your app frequently to retrieve the result. It might take up to seven days for the result to appear.

         .. image:: ../images/mobile-wallet/MW12.png
            :width: 25%

      .. Warning::
            **When your identity and initial account has been verified, backup is essential. If you lose your mobile phone or need to restore your mobile phone and you don't have a backup from the Mobile Wallet, you can't access your wallet and your CCDs are permanently inaccessible.**
            **Concordium does not take any responsibility if you lose access to your accounts. Concordium strongly advise you to complete a backup every time you create an account and store the backup file in a secure place - preferably offline.**
            For more information, see :ref:`Make a backup of identities and accounts in Mobile Wallet<export-import-mw>`.

      .. Note::
            To access the **Balance** of the new account, tap the Balance area on the account card or tap More.

.. Note::
   When you've created your identity and account, Concordium strongly recommends that you make an export of all accounts, ID's and addresses. This way, you'll have a backup in case the database is damaged.

.. |edit|    image:: ../images/edit.png
                    :width: 20px
                    :alt: small square with pencil
.. |save|    image:: ../images/save.png
                    :width: 20px
                    :alt: check mark
.. |morepage| image:: ../images/more-ellipsis.png
             :alt: Three dots button
