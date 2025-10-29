.. include:: ../../variables.rst
.. _create-initial-account:

==================
Create an identity
==================

Before you can start using a Wallet and submit transactions to the blockchain, you need an identity issued by an identity provider.

For Desktop Wallet, the identity provider also issues an initial account and submits it to the chain. The identity provider knows the identity of the owner of this initial account, but not of any other accounts that you create.

For |bw| and |cryptox|, an initial account is not submitted by the identity provider.

To learn more about identities and accounts, see :ref:`Identitity <reference-identity>` and :ref:`Accounts <managing_accounts>`.


.. Note::

   If using |bw| or |cryptox| with Digitial Trust Solutions (DTS) as your identity provider, and you have a mitID (Denmark) or Suomi.fi e-identification (Finland), you can use that to complete the identity verification process.

.. dropdown:: |cryptox|

   You can submit requests for additional :term:`identities<identity>` in the |cryptox|. You do this from the **Identities** screen.

   #. Open *Wallet Settings* by tapping the gear icon in the lower right of the main screen.

   #. Tap **Identities**.

   #. On the Identities screen, tap the **+** in the upper right corner.

   #. Select a third-party identity provider from the list. An external web page opens within the app.

   #. Enter the information requested by the third-party identity provider. The information might vary depending on the identity provider. However, they will ask you to provide photos of identification documents and a selfie.

   #. When you have submitted the information to the identity provider, you will have a pending identity in your app. The verification or rejection is usually retrieved from the identity provider within minutes, but check your app frequently to retrieve the result. It might take up to seven days for the result to appear.


   You can edit the identity name after it has been created so that it is more descriptive in your wallet. This does not change anything with the identity provider or on chain. For more information, see :ref:`Change identity name<change-mw-id-name>`.

.. |wallet-settings| image:: ../images/settings.png
                        :alt: gear wheel
                        :width: 40px

.. dropdown:: Desktop Wallet

   Before you start, you need a LEDGER device that's set up and ready for use.

   #. Go to **Accounts**. A message is displayed if you don't have an identity or an initial account yet. Select **Request new**. If you've been using another computer, and you already have an existing account, you can select **Import existing**. You can also create a new identity if you already have one or more by going to **Identities** and clicking on the plus in the upper right corner of the window.

      .. image:: ../images/desktop-wallet/dw-add-identity-plus.png

   #. Enter a name for your identity, and then enter a name for your initial account. Select **Continue**.

      .. image:: ../images/desktop-wallet/dw-add-identity-name.png

   #. Select an identity provider.

      .. image:: ../images/desktop-wallet/dw-add-identity-provider.png

   #. Connect your LEDGER device and enter your PIN code on the LEDGER device. Press the buttons above the up and down arrows to choose a digit, and then press both buttons to select the digit.

   #. In the Desktop Wallet, there's a message asking you to open the Concordium application on the LEDGER device. On the LEDGER device, press both buttons when it says **Concordium**. The LEDGER device says **Concordium is ready**.

   #. In the Desktop Wallet there's a message saying **Ledger device is ready**. Select **Submit**.

   #. Press both buttons to confirm the following on the LEDGER device:

      - Create credential (each credential is assigned a number): : Press the right button and then both buttons to confirm **Accept**.
      - Public key: Press both buttons to accept.

   #. Review that the public key on the LEDGER device corresponds to the public key in the Desktop Wallet. Use the right button to navigate through the key.

   #. Press both buttons to confirm, and then in the Desktop Wallet, select **Continue**.

   #. The LEDGER device says **Review identity provider info**. Press both buttons, and then press the right button to navigate through the public key and verify that it corresponds to the information in the Desktop Wallet. Press both buttons to confirm.

   #. Verify that the signature threshold on the LEDGER device corresponds to the threshold in the Desktop Wallet.

   #. Press the right button, and then press both buttons to sign the identity provider information.

   #. In the Desktop Wallet, the **New identity** page is displayed. Enter the identity verification information and select **Submit**. This information will vary depending on the identity provider. The identity provider submits the identity to the blockchain. When the initial account is created in a block that is final on the blockchain, the identity provider confirms the identity, and after confirmation, a green check mark is displayed next to the Concordium logo on the identity.

   #. Select **Finished**. When you've created more accounts, you can recognize you initial account by the text **(identity)** next to the name.

   .. Note::
      You can change the name of an identity after it has been created. Go to the **Identities** page. Select the identity. Click |edit| next to the identity name. Change the name and click the |save| to save the change.

.. _create-testnet-identity-bw:

.. dropdown:: |bw|

   Identities are managed from the ID Cards page. To access this page, open the menu and select **ID Cards**.

   If you don't have any identities yet, you can click **Request Identity**.

   If you want to submit a request for an additional identity, click on the **+** in the upper right corner.


   .. image:: ../images/browser-wallet/new/request_identity.png
      :width: 50%


   #. Select a third-party identity provider from the list. An external web page opens in your default web browser.

   #. Enter the information requested by the third-party identity provider. The information might vary depending on the identity provider. However, they will ask you to provide photos of identification documents and a selfie.

   #. When you have submitted the information to the identity provider, you will have a pending identity in your app. The verification or rejection is usually retrieved from the identity provider within minutes, but check frequently to retrieve the result. The result can be retrieved for up to seven days.

.. toctree::
   :hidden:
   :maxdepth: 1

   change-identity-name

.. |edit|    image:: ../images/edit.png
                    :width: 20px
                    :alt: small square with pencil
.. |save|    image:: ../images/save.png
                    :width: 20px
                    :alt: check mark
.. |morepage| image:: ../images/more-ellipsis.png
             :alt: Three dots button
.. |hamburger-bw| image:: ../images/browser-wallet/hamburger-menu.png
                    :width: 20px
                    :alt: three horizontal lines

