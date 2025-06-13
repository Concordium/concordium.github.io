.. include:: ../../variables.rst
.. _create-account:

=================
Create an account
=================

Desktop Wallet users: When you created your :term:`identity`, it came with an :term:`initial account`. The initial account is a special account that the :term:`identity provider` submits
to the chain. When you already have an identity, you can create more :term:`accounts<account>` with that identity yourself.

|bw| and |cryptox| users: No initial account was created when you created your :term:`identity`. You create all :term:`accounts<account>` related to your identities.

To learn more about identities and accounts, see :ref:`Identity framework on Concordium <reference-identity>` and :ref:`Accounts <managing_accounts>`.

.. dropdown:: |cryptox|

    #. Go to the Your Accounts screen (tap the account identifier on the main screen).

    #. Tap **Create new account**.

    #. Enter the name of the account and tap **Continue**.

       .. image:: ../images/cryptoX/create-account.png
            :width: 50%

    #. Tap the identity you want to use for the new account.

       .. image:: ../images/cryptoX/cryptox-create-account-identity.png
            :width: 50%

    #. Tap **Create account**.

    It might take a few seconds for your new account to finalize on the chain. After that, it will be visible in the account list on the Your Accounts screen .

    You can access settings for your new account by tapping the gear icon in the upper right corner.

.. dropdown:: Desktop Wallet

    .. note::
        You can't import accounts that were created on |bw|.

    Before you create more accounts, you need a LEDGER device with the Concordium LEDGER App installed. See :ref:`Set up the LEDGER device and install the Concordium LEDGER App<install-ledger>`.

    #. Go to **Accounts**. You can now see all the accounts that you're the custodian of.

    #. Select the plus sign in the upper right corner to create a new account.

        .. image:: ../images/desktop-wallet/dw-add-account-plus.png

    #. Enter a name for your new account, and then select **Continue**.

        .. image:: ../images/desktop-wallet/dw-new-account-name.png

    #. Select the identity you want to create the new account from. All available identities are listed in the right pane.

        .. image:: ../images/desktop-wallet/dw-new-account-identity.png

    #. Select whether you want to reveal any attributes on the account or not. The available attributes depend on the identity provider.

        .. image:: ../images/desktop-wallet/dw-new-account-attributes.png

    .. note::
        If you select **Reveal attributes**, the selected attributes will be public on the blockchain. Concordium recommends that you do not reveal any attributes.

    6. Select **Submit without revealing attributes**.

    7. Connect your LEDGER device if you haven't done so already, and enter your PIN code. Press the up and down arrows to choose a digit, and then press both buttons to select the digit. The LEDGER device says **Concordium is ready**.

    8. Wait for the message in the Desktop Wallet saying **Ledger device is ready** and select **Submit**.

    9. You now have to confirm the following on the LEDGER device:

        - Create credential (each credential is assigned a number): Press the right button and then both buttons to confirm **Accept**.
        - Public key: Press both buttons to accept.

    10. Verify that the public key on the LEDGER device corresponds to the public key in the Desktop Wallet. Use the right button to navigate through the key.

    11. Press both buttons to confirm, and then in the Desktop Wallet, select **Continue**.

    12. The LEDGER device says **Review details**. Press both buttons, and then press the right button to navigate through the public key and verify that it corresponds to the information in the Desktop Wallet. Press both buttons to confirm.

    13. Verify that the signature threshold on the LEDGER device corresponds to the threshold in the Desktop Wallet.

    14.  Press the right button to verify that the identity disclosure threshold on the LEDGER device corresponds to the threshold in the Desktop Wallet, and then press both buttons.

    15. The LEDGER device says **Sign details**. Press both buttons to sign the transaction. In the Desktop Wallet you can now see the that the account has been submitted to the blockchain.

    16. Select **Finished**. Your new account is now listed along with the other accounts you're the custodian of.

    .. Note::

        To set the currently selected account the default account, click the star icon. Setting this means that this will be the account initially visible when opening the account page.

        .. image:: ../images/desktop-wallet/dw-favorite-account.png
           :alt: dark account balance area with favorite button highlighted



.. dropdown:: |bw|

    Go to the Accounts page ( select **Accounts** in the menu).

    If you do not have any accounts, click **Create account**.

    If you do not have an identity, click **Create new identity**.

    If you already have an account and want to create more accounts:

    #. Click on the **+**.
    #. Click on the identity you want to use to create the account.
    #. Click **Create account**.


.. toctree::
   :hidden:
   :maxdepth: 1

   change-account-name

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
.. |hamburger-bw| image:: ../images/browser-wallet/hamburger-menu.png
                    :width: 20px
                    :alt: three horizontal lines
