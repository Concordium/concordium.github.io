.. include:: ../../variables.rst
.. _create-account:

=================
Create an account
=================

If you created your :ref:`identity<glossary-identity>` for Desktop Wallet and |mw-gen1|, it came with an :ref:`initial account<glossary-initial-account>`. The initial account is a special account that the :ref:`identity provider<glossary-identity-provider>` submits to the chain. When you already have an identity, you can create more :ref:`accounts<glossary-account>` with that identity yourself.

If you are using |mw-gen2|, you created your :ref:`identity<glossary-identity>` during setup. Once you have an identity, you can create :ref:`accounts<glossary-account>` with that identity.

To learn more about identities and accounts, see :ref:`Identities <reference-id-accounts>` and :ref:`Accounts <managing_accounts>`.

.. tabs::

    .. tab:: Desktop Wallet

            .. note::
                You can't import accounts that were created on |mw-gen2| or |mw-gen1|.

        Before you create more accounts, you need a Ledger hardware wallet with the Concordium Ledger App installed. See :ref:`Set up the Ledger device and install the Concordium Ledger App<install-ledger-app>`.

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

        7. Connect your Ledger hardware wallet if you haven't done so already, and enter your PIN code. Press the up and down arrows to choose a digit, and then press both buttons to select the digit. The Ledger says **Concordium is ready**.

        8. Wait for the message in the Desktop Wallet saying **Ledger Nano S is ready** or **Ledger Nano S Plus is ready** and select **Submit**.

        9. You now have to confirm the following on the Ledger:

            - Create credential (each credential is assigned a number): Press the right button and then both buttons to confirm **Accept**.
            - Public key: Press both buttons to accept.

        10. Verify that the public key on the Ledger corresponds to the public key in the Desktop Wallet. Use the right button to navigate through the key.

        11. Press both buttons to confirm, and then in the Desktop Wallet, select **Continue**.

        12. The Ledger says **Review details**. Press both buttons, and then press the right button to navigate through the public key and verify that it corresponds to the information in the Desktop Wallet. Press both buttons to confirm.

        13. Verify that the signature threshold on the Ledger corresponds to the threshold in the Desktop Wallet.

        14.  Press the right button to verify that the anonymity revoker threshold on the Ledger corresponds to the threshold in the Desktop Wallet, and then press both buttons.

        15. The Ledger says **Sign details**. Press both buttons to sign the transaction. In the Desktop Wallet you can now see the that the account has been submitted to the blockchain.

        16. Select **Finished**. Your new account is now listed along with the other accounts you're the custodian of.

    .. tab:: |mw-gen2|

        #. Go to the **Accounts** page.

        #. Tap the **+** in the upper right corner.

        #. Tap the identity you want to use to create the account.

            .. image:: ../images/mobile-wallet-gen2/create-acct-select-id.png
                :width: 25%

        #. Finally, tap **Submit account**.

            .. image:: ../images/mobile-wallet-gen2/create-acct-submit.png
                :width: 25%

        Your new account is now visible on the Accounts page. It might take a little while for it to finalize on the chain.

        You can edit the account name after it has been created so that it is more descriptive in your wallet. For more information, see :ref:`Change account name<change-mw-acct-name>`.

    .. tab:: |mw-gen1|

        .. Note::

            It is no longer possible for users of |mw-gen1| to create new accounts.

        #. Go to the **Accounts** page.

        #. Tap the **+** in the upper right corner.

            .. image:: ../images/mobile-wallet/MW13.png
                :width: 25%

        #. Enter a name for your new account. Tap **Next**.

            .. image:: ../images/mobile-wallet/MW15.png
                :width: 25%

        #. Tap the identity you want to use to create the account.

            .. image:: ../images/mobile-wallet/MW16.png
                :width: 25%

        #. You now have the option to reveal some attributes publicly on the account. Unless you have a good reason to do so, it is recommended not to reveal any attributes.

            - If you want to reveal some attributes, tap **Reveal account attributes**, select the attributes you want to reveal, and then tap **Submit account**.
            - If you don’t want to reveal any attributes, tap **Submit account**.

            .. image:: ../images/mobile-wallet/MW17.png
                :width: 25%

        #. Finally, tap **Ok, thanks**.

            .. image:: ../images/mobile-wallet/MW19.png
                :width: 25%

        Your new account is now visible on the Accounts page. It might take a little while for it to finalize on the chain.

        You can edit the account name after it has been created so that it is more descriptive in your wallet. For more information, see :ref:`Change account name<change-mw-acct-name>`.

        .. Warning::
            **Backup is essential. If you lose your mobile phone or need to restore your mobile phone and you don't have a backup from the Mobile Wallet, you can't access your wallet and your CCDs are permanently inaccessible.**
            **Concordium does not take any responsibility if you lose access to your accounts. Concordium strongly advise you to complete a backup every time you create an account and store the backup file in a secure place - preferably offline.**
            For more information, see :ref:`Make a backup of identities and accounts in Mobile Wallet<export-import>`.

        .. Note::
            To access the **Balance** of the new account, tap the Balance area on the account card or tap |moredetails|.

.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
             :width: 50px
