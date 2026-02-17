.. include:: ../../variables.rst
.. _export-key:

==========================
Export account private key
==========================

In certain situations, such as testing interaction with smart contracts, you may need to export your private key for an account in your wallet. The file format of the key export is specifically for :ref:`import<concordium-client-import-accounts-keys>` to ``concordium-client``. If you just copy the key to the clipboard, it's just the key itself and can be used for other purposes.


.. dropdown:: |cryptox|

    #. Go to the Your Accounts screen (tap the account identifier on the main screen).

    #. Open Account Settings by tapping the gear icon in the upper right of the screen.

    #. Tap **Export private key**.

    #. Tapp **Reveal** to show the key.

    #. Enter your passcode when prompted.

    #. Now you can tap **Copy key** to copy copy the key to the clipboard, or **Export to file** to save the key as a file that is compatible with other tools like ``concordium-client``.

    .. image:: ../images/cryptoX/export_account_private_key_cryptox.png
         :width: 100%


.. dropdown:: |bw|

    #. Go to the Accounts page and locate the account you want to export the private key for.

    #. Click **Export** next to *Private key*.

    #. Enter your passcode and click **Show private key**.

    #. When your private key is shown, you can click **Copy account private key** to get the key's value, or click **Export** to get a file compatible with other tools like ``concordium-client``.

    .. image:: ../images/browser-wallet/new/export_account_private_key_bw.png
        :width: 100%


.. |cryptoX-acct-settings| image:: ../images/cryptoX/cryptoX-acct-settings.png
                    :alt: gear wheel on blue background
                    :width: 50px
