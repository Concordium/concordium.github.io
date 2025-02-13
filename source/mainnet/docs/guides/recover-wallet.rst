.. include:: ../../variables.rst
.. _recover-wallet:

===================
Recover your Wallet
===================

You may need to recover your wallet, e.g. if you've switched devices or lost access to your wallet. Recovering your wallet means restoring your identities, accounts, and keys. This can be done either through your seed phrase or a backup file, depending on the specific wallet app you're using.

.. Note::

    You cannot recover testnet wallets on mainnet, or vice versa.


.. dropdown:: |cryptox|

    |cryptox| offers three recovery methods: using a seed phrase, a backup file, or a wallet private key.

    For all three methods, start doing this:

    #. After installing or reinstalling the |cryptox| app, open the app.

    #. On the Welcome screen, read and accept Terms and Conditions and Pricacy Policy by checking the box.

       You can also choose to allow activity tracking in the app. This tracking only applies to general usage, not funds, transactions, or personal data.

    #. Tap **Get started**.

       .. image:: ../images/cryptoX/onboarding/cryptox-onboarding1.png
         :width: 40%
         :alt: screen with terms and conditions


    #. Tap **Import a wallet**.

       .. image:: ../images/cryptoX/recovery/cryptox-recover2.png
         :width: 40%

    #. Enter and then re-enter a 6-digit passcode for your wallet.

    #. You now have three options: Import via seed phrase, import via wallet private key, or import via backup file.

       Tap on the desired option.

       .. image:: ../images/cryptoX/recovery/cryptox-recover3.png
         :width: 40%

    .. dropdown:: Import via seed phrase

         #. Enter each word of your seed phrase in the correct order. When you start typing, possible words appear for you to select.

            If you have a copy of your seed phrase, you can also tap **Paste your seed phrase** to paste it from your clipboard.

            .. image:: ../images/cryptoX/recovery/cryptox-recover4a.png
                :width: 40%

         #. Once the words are correct, tap **Recover** to submit the recovery request to the identity provider(s).

            .. image:: ../images/cryptoX/recovery/cryptox-recover5a.png
                :width: 40%

         #. It may take a little while for recovery to complete.

            .. image:: ../images/cryptoX/recovery/cryptox-recover6a.png
                :width: 40%


         #. Your wallet has now been restored on |cryptox|.

            .. image:: ../images/cryptoX/recovery/cryptox-recover7a.png
                :width: 40%



    .. dropdown:: Import via wallet private key

         #. Enter or paste your wallet private key.

            .. image:: ../images/cryptoX/recovery/cryptox-recover4b.png
                :width: 40%

         #. Once the key is entered, tap **Continue** to submit the recovery request to the identity provider(s).

            .. image:: ../images/cryptoX/recovery/cryptox-recover5b.png
                :width: 40%

         #. It may take a little while for recovery to complete.

            .. image:: ../images/cryptoX/recovery/cryptox-recover6b.png
                :width: 40%


         #. Your wallet has now been restored on |cryptox|.

            .. image:: ../images/cryptoX/recovery/cryptox-recover7b.png
                :width: 40%


    .. dropdown:: Import via backup file

         #. Tap **Import**.

            .. image:: ../images/cryptoX/recovery/cryptox-recover4c.png
                :width: 40%

         #. Select the file you want to import.

         #. Enter the password you created when exporting the backup file. Tap **Continue**. It may take a little while for recovery to complete.

            .. image:: ../images/cryptoX/recovery/cryptox-recover5c.png
                :width: 40%


         #. Once the import is finished, tap **Okay** to go to the Accounts list.

            .. image:: ../images/cryptoX/recovery/cryptox-recover6c.png
                :width: 40%


    .. Note::

            When you recover your wallet, any account or identity names that you might have edited will be reset. You can :ref:`edit the account name<change-mw-acct-name>`, if desired.


.. dropdown:: |bw|

    #. After :ref:`reinstalling<setup-bw>` the |bw|, open the extension and click **Get started** on the welcome page.

       .. image:: ../images/browser-wallet/new/welcome_page.png
         :width: 50%

    #. Create a six-digit passcode or use a full password. Click **Continue**.

       .. image:: ../images/browser-wallet/new/create_passcode.png
         :width: 50%

    #. Before clicking **Restore**, make sure that you have chosen the right network for restoring your wallet; Mainnet or Testnet. You must recover your wallet in the network where it was created. You can see the chosen network in the upper right corner. To switch network, click the network name in the upper right corner and select your desired network on the page that opens. Then, go back and click **Restore**.

       .. image:: ../images/browser-wallet/new/create_or_restore.png
         :width: 50%


       .. image:: ../images/browser-wallet/new/restore_mainnet_testnet.png
         :width: 50%

    #. Enter your 24 word seed phrase. Click **Continue**.

       .. image:: ../images/browser-wallet/new/restore_from_seedphrase.png
         :width: 50%

    #. After successful restore, you can see which identities and accounts were recovered. Click **Continue**.


    .. Note::

        You cannot recover a wallet created in Mainnet in Testnet, and vice versa. Once you have recovered on the correct network, you can :ref:`switch between Mainnet and Testnet<switch-network>`.
        If you use both networks, you can recover on the other net after setup, through the settings page.

    .. Warning::

        If you had previously configured your wallet to be able to view selected tokens and you recover your wallet, the tokens will not be recovered. You must :ref:`add the tokens<tokens>` again to view them in your wallet.

    .. Note::

        If you forget your passcode for your installed |bw|, you will need to :ref:`remove the extension in your internet browser and reinstall it<setup-browser-wallet>`, choosing the option to recover your wallet. Use your seed phrase to recover the wallet.


.. dropdown:: Desktop Wallet

    The recovery process for Desktop Wallet is different because of the LEDGER device. For detailed instructions, see :ref:`Desktop Wallet backup and recovery<desktop-wallet-recover>`.

.. |morepage| image:: ../images/more-ellipsis.png
             :alt: Three dots button
             :width: 40px
.. |moredetails| image:: ../images/more-arrow.png
             :alt: Button with More and double-headed arrow
             :width: 50px
.. |hamburger-bw| image:: ../images/browser-wallet/hamburger-menu.png
                    :width: 20px
                    :alt: three horizontal lines
.. |wallet-settings| image:: ../images/settings.png
                        :alt: gear wheel
                        :width: 40px
