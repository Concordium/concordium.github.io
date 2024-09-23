.. include:: ../../variables.rst
.. _recover-wallet:

===================
Recover your Wallet
===================

You may need to recover your wallet, e.g. if you've switched devices or lost access to your wallet. Recovering your wallet means restoring your identities, accounts, and keys. This can be done either through your seed phrase or a backup file, depending on the specific wallet app you're using.

.. Note::

    You cannot recover testnet wallets on mainnet, or vice versa.


.. dropdown:: |cryptox| - recover with seed phrase

    |cryptox| offers two recovery methods: using a seed phrase or using an exported backup file. This is the procedure for recovering with seed phrase.

    #. After installing or reinstalling the |cryptox| app, open the app.

    #. On the Welcome screen, read and accept Terms and Conditions and Pricacy Policy and tap **Get started**.

        .. image:: ../images/cryptoX/cryptox-recover-wallet1.png
            :width: 40%

    #. Decide whether or not to allow activity tracking. This tracking only applies to the general app usage, not funds, transactions or any personal data.

        .. image:: ../images/cryptoX/cryptox-recover-wallet2.png
            :width: 40%

    #. You now have the opportunity to watch a tutorial video on Tap **Activate account**.

        .. image:: ../images/cryptoX/cryptox-recover-wallet3.png
            :width: 40%

    #. Tap **Import wallet**.

        .. image:: ../images/cryptoX/cryptox-recover-wallet4.png
            :width: 40%

    #. Enter and then re-enter a 6-digit passcode for your wallet.

        .. image:: ../images/cryptoX/cryptox-recover-wallet4b.png
            :width: 40%

    #. Tap **Use seed phrase**

        .. image:: ../images/cryptoX/cryptox-recover-wallet5.png
            :width: 40%

    #. Enter each word of your seed phrase in the correct order. When you start typing, possible words appear for you to select.

       If you have a copy of your seed phrase, you can also tap **Paste your seed phrase** to paste it from your clipboard.

        .. image:: ../images/cryptoX/cryptox-recover-wallet6.png
            :width: 40%

    #. Once the words are correct, tap **Recover** to submit the recovery request to the identity provider(s).

        .. image:: ../images/cryptoX/cryptox-recover-wallet7.png
            :width: 40%

    #. It may take a little while for recovery to complete.

        .. image:: ../images/cryptoX/cryptox-recover-wallet8.png
            :width: 40%


    #. Your wallet has now been restored on |cryptox|.

        .. image:: ../images/cryptoX/cryptox-recover-wallet9.png
            :width: 40%


    .. Note::

        When you recover your wallet, any account or identity names that you might have edited will be reset. You can :ref:`edit the account name<change-mw-acct-name>`, if desired.


.. dropdown:: |cryptox| - recover with backup file

    |cryptox| offers two recovery methods: using a seed phrase or using an exported backup file. This is the procedure for recovering with backup file.

    #. After installing or reinstalling the |cryptox| app, open the app.

    #. On the Welcome screen, read and accept Terms and Conditions and Pricacy Policy and tap **Get started**.

        .. image:: ../images/cryptoX/cryptox-recover-wallet1.png
            :width: 40%

    #. Decide whether or not to allow activity tracking. This tracking only applies to the general app usage, not funds, transactions or any personal data.

        .. image:: ../images/cryptoX/cryptox-recover-wallet2.png
            :width: 40%

    #. Tap **Activate account**.

        .. image:: ../images/cryptoX/cryptox-recover-wallet3.png
            :width: 40%

    #. Tap **Import wallet**.

        .. image:: ../images/cryptoX/cryptox-recover-wallet4.png
            :width: 40%

    #. Enter and then re-enter a 6-digit passcode for your wallet.

        .. image:: ../images/cryptoX/cryptox-recover-wallet4b.png
            :width: 40%

    #. Tap **Use exported file** and pick the file in the system dialog

        .. image:: ../images/cryptoX/cryptox-recover-wallet5.png
            :width: 40%

    #. Enter the password you created when exporting the backup file. Tap **Continue**. It may take a little while for recovery to complete.

        .. image:: ../images/cryptoX/cryptox-recover-wallet10.png
            :width: 40%

    #. You have now imported your wallet to |cryptox|. Tap **Okay** to go to the Accounts list.

        .. image:: ../images/cryptoX/cryptox-recover-wallet11.png
            :width: 40%


.. dropdown:: |bw|

    #. After :ref:`reinstalling<setup-bw>` the |bw|, open the extension, create a passcode, and when prompted, choose **Restore**.

        .. image:: ../images/browser-wallet/wallet-choice.png
            :width: 25%

    #. Enter your 24 word seed phrase. Click **Continue**.

    #. Select whether to recover your wallet in Mainnet or Testnet.

    If recovery is successful, you will see a screen similar to below. If recovery is only partial, you can try to recover using the **Restore IDs and accounts option** in Wallet settings.

    .. image:: ../images/browser-wallet/recovery-success-bw.png
        :width: 25%

    .. image:: ../images/browser-wallet/wallet-settings.png
        :width: 25%

    .. Note::

        You cannot recover a wallet created in Mainnet in Testnet, and vice versa. Once you have recovered on the correct network, you can :ref:`switch between mainnet and testnet<switch-network>`.
        If you use both networks, you can recover on the other net after setup, through the settings page.

    .. Warning::

        If you had previously configured your wallet to be able to view selected tokens and you recover your wallet, the tokens will not be recovered. You must :ref:`add the tokens<tokens>` again to view them in your wallet.

    .. Note::

        If you forget your passcode for your installed |bw|, you will need to :ref:`remove the extension in your internet browswer and reinstall it<setup-browser-wallet>`, choosing the option to recover your wallet. Use your seed phrase to recover the wallet.

.. dropdown:: |mw-gen2|

    #. After reinstalling the |mw-gen2| app, open the app.

    #. On the Getting Started screen, tap **Recover wallet**.

        .. image:: ../images/mobile-wallet-gen2/choice-start.png
            :width: 25%

    #. After the screens explaining recovery tap **Continue**.

    #. Enter each word of your recovery phrase in the correct order. When you start typing, possible words appear for you to select. Once the words are correct, tap **Continue** to submit the recovery request to the identity provider(s).

        .. image:: ../images/mobile-wallet-gen2/recovery-enter-phrase.png
            :width: 25%

    #. When recovery is successful, the screen below appears.

        .. image:: ../images/mobile-wallet-gen2/recovery-success.png
            :width: 25%

    Sometimes recovery can take longer. You might encounter a partial recovery.

    This means that accounts and identities have been partially recovered. This could be because one of the identity providers is unresponsive. Tap **Try again** to attempt recovery again now or tap **Continue** to wait until later to try to recover. If you wait until later you can continue to the wallet.

    To continue recovery, tap |wallet-settings| and tap **Recovery** to continue.

    .. Note::

        When you recover your wallet, any account names that you might have edited will be reset to the account number. You can :ref:`edit the account name<change-mw-acct-name>`, if desired.

.. dropdown:: |mw-gen1|

    Recovery of |mw-gen1| requires a valid backup file. For more information about this process, see :ref:`backup and restore<mobile-wallet-recover>`.

    If you want to recover your |mw-gen1| wallet to |cryptox|, see the description above for recovering on |cryptox| with a backup file.

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
