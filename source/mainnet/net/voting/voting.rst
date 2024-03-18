.. _voting:
.. include:: ../../variables.rst

===========
How to vote
===========

The user flow for the voter is as follows. It assumes the user has a wallet on the Concordium blockchain with some CCD, enough to pay for transaction fees.

For |cryptox|, |bw|, and |mw-gen2| wallet holders
=================================================

#. Navigate to the voting dApp.

#. The voting dApp presents a list of candidates. Each candidate has a small graphic and a link to a description of their choice.

#. The user selects zero or more candidates for which they want to vote and selects **Submit**. They can vote multiple times.

#. The user is asked to connect the wallet and send the update transaction to the smart contract. The voting weight that is shown is the average number of CCD in the account that is voting during the past three months.

The voting dApp also has a separate page where the user can see the list of all their (encrypted) votes.

For Desktop wallet and |mw-gen1| wallet holders
===============================================

These older wallets do not have the capability to connect to dApps. But you do have options to exercise your vote.

.. dropdown:: Desktop wallet

    Users need to create a new account in |bw|, |cryptox|, or |mw-gen2| and delegate their vote from their Desktop wallet account(s) to the new account, then vote from the new account. You can create the new account in |bw|, |cryptox|, or |mw-gen2| at any time before the election.

    **To delegate your vote:**

    #. In the account from which you want to vote, click **Send**.

    #. Enter any amount of CCD (1 micro-CCD is enough). The target account in |bw|, |cryptox|, or |mw-gen2| is the recipient (in the image below the recipient account has been added to the address book and named My vote delegation). Add a transaction memo that says **delegatevote2024**.

        .. image:: ../images/voting/dw-vote-delegation.png
            :alt: send ccd window in desktop wallet showing how to delegate vote
            :width: 50%

    #. Continue with the transaction by signing it using your LEDGER device as with all other transactions.

        .. image:: ../images/voting/dw-transaction-submitted.png
            :alt: send ccd window in desktop wallet showing how to delegate vote
            :width: 50%

    #. It is possible to check from the Voting DApp that the delegation worked. The window for delegating votes is the same as voting with the DApp.

.. dropdown:: |mw-gen1|

    You have two options.

    #. You can delegate votes,

    #. or you can import your accounts into the |cryptox| wallet and vote from there.

    To delegate votes, users need to create a new account in |bw|, |cryptox|, or |mw-gen2| and delegate their vote from their |mw-gen1| account(s) to the new account, then vote from the new account. You can create the new account in |bw|, |cryptox|, or |mw-gen2| at any time before the election.

    **To delegate your vote:**

    #. Tap **Send** on the account to delegate from.

    #. Enter any amount of CCD (1 micro-CCD is enough). Enter the recipient address which is the target account in |bw|, |cryptox|, or |mw-gen2|. You can paste the address after copying it, scan the QR code of the account, or select it from the address book. In **Optional: Add memo** add a memo that says **delegatevote2024**. Tap **Send amount**.

        .. image:: ../images/voting/mwgen1-delegate-vote.png
            :alt: send ccd window in old mobile wallet showing how to delegate vote
            :width: 50%

    #. Tap **Send funds**.

        .. image:: ../images/voting/mwgen1-delegate-vote-confirm.png
            :alt: window in old mobile wallet asking user to confirm transaction
            :width: 50%

    #. Tap **Finish**.

        .. image:: ../images/voting/mwgen1-transaction-submitted.png
            :alt: window in old mobile wallet showing successful transaction submission
            :width: 50%

    #. It is possible to check from the Voting DApp that the delegation worked. The window for delegating votes is the same as voting with the DApp.

    **To import your account to |cryptox|:**

