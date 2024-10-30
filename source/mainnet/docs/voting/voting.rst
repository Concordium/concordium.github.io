.. _voting:
.. include:: ../../variables.rst

===========
How to vote
===========

The user flow for the voter is as follows. It assumes the user has a wallet on the Concordium blockchain with some CCD, enough to pay for transaction fees.

For |cryptox|, |bw|, |mw-gen2| and |cryptox| wallet holders
===========================================================

Note that |mw-gen2| users with Android 14 might experience a technical bug preventing them from connecting to the voting dApp. They can import their account into the |bw| or the |cryptox| with their seed phrase, and vote from those wallets.

#. Navigate to the voting dApp.

#. The voting dApp presents a list of candidates. Each candidate has a small graphic and a link to a description of their choice. **The image below is only an example.**

    .. image:: ../images/voting/voting-dapp.png
                :alt: example voting dapp site
                :width: 100%

#. When the election is open, the user selects zero or more candidates for which they want to vote and selects **Submit**. They can vote multiple times.

#. The user is asked to **connect** the wallet to the voting dApp and send the update transaction to the smart contract. The voting weight that is shown is the average number of CCD in the account that is voting during the past three months.

    .. image:: ../images/voting/voting-dapp-connected.png
                :alt: voting dapp sidebar when connected to wallet
                :width: 100%

The voting dApp also has a separate page where the user can see the list of all their (encrypted) ballot submissions.

Voting from multiple accounts
-----------------------------

Since the votes are weighted by the number of CCD on the account, for a user to vote with their full weight they need to vote from all their accounts. For |cryptox| and |mw-gen2| wallet holders, it is sufficient to disconnect and reconnect: the user is then given the choice to connect with a different account. With the |bw|, disconnecting and connecting again will always reconnect with the same account. To change accounts, follow the instructions here below.

.. dropdown:: |bw|

    #. In the wallet, click **connected** next to the account address. If you have an account open that is not connected, the button will say **not connected** instead. Clicking this is fine as well.

        .. image:: ../images/voting/connected-account.png
                    :alt: account connected to a dApp
                    :width: 50%

    #. This opens the **Allowlist** menu, where the user can check every account that is allowed to connect to the dApp.

        .. image:: ../images/voting/allow-list.png
                    :alt: account connected to a dApp
                    :width: 50%

    #. Return to the main wallet window with the arrow or cross.
    #. Select the account in the wallet which should connect to the voting dApp.
    #. Disconnect and reconnect in the voting dApp. The user will now be connected to the account that is open in the wallet.
    #. Repeat the two last steps above to vote with all accounts.

For Desktop wallet, |mw-gen1| and Concordium Client wallet holders
==================================================================

These older wallets do not have the capability to connect to dApps. But you do have an option to exercise your vote.

.. dropdown:: Desktop wallet

    Users need to create a new account in |bw| or |cryptox| and delegate their vote from their Desktop wallet account(s) to the new account, then vote from the new account. You can create the new account in |bw| or |cryptox| at any time before delegating your vote. But the memo transaction, which effectively delegates the vote, and the vote from the new account both need to take place within the official voting window.

    **To delegate your vote:**

    #. In the account from which you want to vote, click **Send**.

    #. Enter any amount of CCD (1 micro-CCD is enough). The target account in |bw| or |cryptox| is the recipient (in the image below the recipient account has been added to the address book and named My vote delegation). Add a transaction memo that says **delegatevote2024**.

        .. image:: ../images/voting/dw-vote-delegation.png
            :alt: send CCD window in desktop wallet showing how to delegate vote
            :width: 100%

    #. Continue with the transaction by signing it using your LEDGER device as with all other transactions.

        .. image:: ../images/voting/dw-transaction-submitted.png
            :alt: send CCD window in desktop wallet showing how to delegate vote
            :width: 100%

    #. It is possible to check from the Voting DApp that the delegation worked. The window for delegating votes is the same as voting with the DApp.

.. dropdown:: |mw-gen1|

   |mw-gen1| users are recommended to migrate to the |cryptox|, as this is actively maintained and supports walletconnect, which is required to interact with dApps such as the application used for voting in the election. The |cryptox| can be installed for either `Android <https://play.google.com/store/apps/details?id=com.pioneeringtechventures.wallet>`_ or `iOS <https://apps.apple.com/dk/app/cryptox-concordium-wallet/id1593386457>`_.

   .. Note::
       For more information on how to create a backup in the |mw-gen1| and import this into a compatible wallet, see :ref:`backup and restore<mobile-wallet-recover>`

   #. **Backup your wallet data** in in your |mw-gen1|. This creates an export file with all the identities and accounts in your wallet.

   #. If you haven't already done so, download |cryptox| for either `Android <https://play.google.com/store/apps/details?id=com.pioneeringtechventures.wallet>`_ or `iOS <https://apps.apple.com/dk/app/cryptox-concordium-wallet/id1593386457>`_.

   #. **Import the backup** created in step 1 into |cryptox|.

   **Alternative route**

   Alternatively, users need to create a new account in |bw| or |cryptox|, and delegate their vote from their |mw-gen1| account(s) to the new account, then vote from the new account. You can create the new account in |bw| or |cryptox| at any time before delegating your vote. But the memo transaction, which effectively delegates the vote, and the vote from the new account both need to take place within the official voting window.

   #. Tap **Send** on the account to delegate from.

   #. Enter any amount of CCD (1 micro-CCD is enough). Enter the recipient address which is the target account in |bw| or |cryptox|. You can paste the address after copying it, scan the QR code of the account, or select it from the address book. In **Optional: Add memo** add a memo that says **delegatevote2024**. Tap **Send amount**.

       .. image:: ../images/voting/mwgen1-delegate-vote.png
           :alt: send CCD window in old mobile wallet showing how to delegate vote
           :width: 100%

   #. Tap **Send funds**.

       .. image:: ../images/voting/mwgen1-delegate-vote-confirm.png
           :alt: window in old mobile wallet asking user to confirm transaction
           :width: 100%

   #. Tap **Finish**.

       .. image:: ../images/voting/mwgen1-transaction-submitted.png
           :alt: window in old mobile wallet showing successful transaction submission
           :width: 100%

   #. It is possible to check from the Voting DApp that the delegation worked. The window for delegating votes is the same as voting with the DApp.

.. dropdown:: Concordium Client

    Users need to create a new account in |bw| or |cryptox| and delegate their vote from their Concordium Client wallet account(s) to the new account, then vote from the new account. You can create the new account in |bw| or |cryptox| at any time before delegating your vote. But the memo transaction, which effectively delegates the vote, and the vote from the new account both need to take place within the official voting window.

    **To delegate your vote:**

    .. code-block:: console

        $concordium-client --secure --grpc-ip grpc.mainnet.concordium.software transaction send --amount AMOUNT --receiver A --sender B --memo delegatevote2024

    #. Enter the command above in the Concordium Client, where AMOUNT is the number of CCD to be sent (1 micro-CCD is enough), A is the name/address of the account to which the vote is delegated, and B is the sender name/address. Note the memo *delegatevote2024* for the delegation to be valid. Furthermore, there is no service license agreement for the grpc endpoint.

    #. Vote from the account that has received the delegation.

How to see delegations
======================

It is possible to see delegations to an account in the voting dApp. Anyone can check the delegations on an account. You do not need to connect a wallet to do this.

To see delegations, click **Delegations**. Enter or paste the Concordium account number for which you want to see all delegations.

.. image:: ../images/voting/voting-dapp.png
        :alt: example voting dapp site
        :width: 100%
