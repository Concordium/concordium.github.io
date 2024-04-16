.. _voting:
.. include:: ../../variables.rst

===========
How to vote
===========

The user flow for the voter is as follows. It assumes the user has a wallet on the Concordium blockchain with some CCD, enough to pay for transaction fees.

For |cryptox|, |bw|, and |mw-gen2| wallet holders
=================================================

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
    #. Select the account in the wallet which should connect to the voting dApp
    #. Disconnect and reconnect in the voting dApp. The user will now be connected to the account that is open in the wallet.
    #. Repeat the two last steps above to vote with all accounts.

For Desktop wallet and |mw-gen1| wallet holders
===============================================

These older wallets do not have the capability to connect to dApps. But you do have an option to exercise your vote.

.. dropdown:: Desktop wallet

    Users need to create a new account in |bw|, |cryptox|, or |mw-gen2| and delegate their vote from their Desktop wallet account(s) to the new account, then vote from the new account. You can create the new account in |bw|, |cryptox|, or |mw-gen2| at any time before the election.

    **To delegate your vote:**

    #. In the account from which you want to vote, click **Send**.

    #. Enter any amount of CCD (1 micro-CCD is enough). The target account in |bw|, |cryptox|, or |mw-gen2| is the recipient (in the image below the recipient account has been added to the address book and named My vote delegation). Add a transaction memo that says **delegatevote2024**.

        .. image:: ../images/voting/dw-vote-delegation.png
            :alt: send CCD window in desktop wallet showing how to delegate vote
            :width: 100%

    #. Continue with the transaction by signing it using your LEDGER device as with all other transactions.

        .. image:: ../images/voting/dw-transaction-submitted.png
            :alt: send CCD window in desktop wallet showing how to delegate vote
            :width: 100%

    #. It is possible to check from the Voting DApp that the delegation worked. The window for delegating votes is the same as voting with the DApp.

.. dropdown:: |mw-gen1|

    Users need to create a new account in |bw|, |cryptox|, or |mw-gen2| and delegate their vote from their |mw-gen1| account(s) to the new account, then vote from the new account. You can create the new account in |bw|, |cryptox|, or |mw-gen2| at any time before the election.

    #. Tap **Send** on the account to delegate from.

    #. Enter any amount of CCD (1 micro-CCD is enough). Enter the recipient address which is the target account in |bw|, |cryptox|, or |mw-gen2|. You can paste the address after copying it, scan the QR code of the account, or select it from the address book. In **Optional: Add memo** add a memo that says **delegatevote2024**. Tap **Send amount**.

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

How to see delegations
======================

It is possible to see delegations to an account in the voting dApp. Anyone can check the delegations on an account. You do not need to connect a wallet to do this.

To see delegations, click **Delegations**. Enter or paste the Concordium account number for which you want to see all delegations.

.. image:: ../images/voting/voting-dapp.png
        :alt: example voting dapp site
        :width: 100%
