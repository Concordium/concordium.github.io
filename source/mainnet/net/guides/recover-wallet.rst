.. include:: ../../variables.rst
.. _recover-wallet:

===================
Recover your Wallet
===================

In case you get a new device or need to restore your existing device, you can recover your identities, accounts, and keys with the secret recovery phrase you wrote down during wallet setup.

.. tabs::

    .. tab:: |mw-gen2|

        #. After reinstalling the |mw-gen2| app, open the app.

        #. On the Getting Started screen, tap **Recover wallet**.

        #. After the screens explaining recovery tap **Continue**.

        #. Enter each word of your recovery phrase in the correct order. When you start typing, possible words appear for you to select. Once the words are correct, tap **Continue** to submit the recovery request to the identity provider(s).

        #. When recovery is successful, the screen below appears.

        .. Note::

            Sometimes recovery can take longer. Here are some scenarios that you might encounter.

            +------------------------+---------------------------------------------------------------------------------------------+
            | Image                  | Description                                                                                 |
            +========================+=============================================================================================+
            |                        | Pending                                                                                     |
            |                        | The wallet recovery is still pending.                                                       |
            +------------------------+---------------------------------------------------------------------------------------------+
            |                        | Identity provider unresponsive                                                              |
            |                        | One of the identity providers is unresponsive. You can try again now or wait until later    |
            |                        | to try to recover. If you wait until later you can continue to the wallet. Accounts with    |            
            |                        | an unrecovered identity are shown like this (screenshot).                                   |
            |                        | To continue recovery, go to the ...More page and tap **Recovery** to continue.              |              
            +------------------------+---------------------------------------------------------------------------------------------+
            |                        | Partially recovered                                                                         |
            |                        | The accounts and identities have been partially recovered. You can continue to the wallet.  |
            |                        | Accounts with an unrecovered identity are shown like this (screenshot).                     |
            |                        | To continue recovery, go to the ...More page and tap **Recovery** to continue.              |
            +------------------------+---------------------------------------------------------------------------------------------+
            |                        | Nothing to recover                                                                          |
            |                        | The seed phrase entered does not have any keys, accounts, or identities associated with it. |
            +------------------------+---------------------------------------------------------------------------------------------+

.. Note::

    When you recover your wallet, any account names that you might have edited will be reset to the account number. You can :ref:`edit the account name<change-mw-acct-name>`, if desired.
