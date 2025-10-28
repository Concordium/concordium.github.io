.. _gc-voting:
.. include:: ../../variables.rst

=========================================
Concordium Governance Committee elections
=========================================

Concordium Governance Committee elections are a vital part of decentralization, allowing the Concordium community to make decisions about the blockchain.

Users vote using their wallets and their vote is :term:`weighted<account weight>` by the amount of CCD held in their accounts. Thus, a user with multiple accounts should vote from all accounts for their votes to have maximum weight. If the *same account* votes multiple times, only the last vote will count.

Staked CCD, whether it is by validators or delegators, is still held in the user’s wallet, so it counts towards the weight of the vote. In contrast, CCD locked in smart contracts cannot be used to vote. CCD that is in a custody wallet, e.g., on a centralized exchange, will not count as part of the weight of the token owner, but as part of the weight of the custodian. It is thus important for all CCD owners who want to vote (or who don’t want custodians to vote in their name) to transfer all CCD to wallets of their own.

The voting system chosen for this election is called :term:`approval voting`. The voter may choose as many :term:`candidates<candidate>` as they like, i.e., they assign either 0 or 1 to every candidate. In standard approval voting, all votes are added up and the candidates with the most votes get the seats. In our weighted case, every candidate that receives a vote receives the corresponding full weight of the account from which the vote was cast — the weights are not split amongst the candidates that receive a vote. For example, suppose that there are four candidates, Peppa Pig, Rebecca Rabbit, Suzy Sheep and Zoe Zebra. And suppose that Alice has 4000 CCD and votes for Peppa, Bob has 2000 CCD and votes for Rebecca and Suzy, and Charlie has 3000 CCD and votes for Suzy and Zoe. Then the final tally is 4000 votes for Peppa, 2000 for Rebecca, 5000 for Suzy and 3000 for Zoe.

The candidates with the most votes are elected. In case of a tie, which is very unlikely given the weighted vote, a fair coin is flipped.

Our election protocol uses cryptographic proofs and the blockchain to ensure correctness and verifiability, i.e., it ensures that all (valid) votes are counted towards the end result.

:term:`Guardians<guardian>` ensure that election results are private and fair while further decentralizing the election process. A guardian is one of a number of independent, trustworthy individuals who participate in the election to ensure that votes are decrypted after the election. Guardians may also vote in the election, as may candidates.

The diagrams and descriptions below describe the process during each phase of the election.

Before the election
===================

The period of time before the election is the setup phase. Several roles are involved in the setup of the election.

.. image:: ../images/voting/pre-election.png
    :alt: diagram showing steps below
    :width: 100%

#. The Election Coordinator uses the coordinator tool to get the initial weight values and initialize an instance of the election smart contract.

#. Each guardian sends their account address to Concordium.

#. Candidates are nominated and can "campaign". Candidates can provide information such as name, an image or logo, and the URL of a site with information about their campaign. This information is shown in the Voter dApp.

#. The Election Coordinator adds the guardian addresses to the smart contract along with election parameters such as the start and end date and time, and candidates, and deploys and initializes the smart contract.

#. The election server is started, the indexer is started, and the Guardian App is built and released.

#. Guardians generate the shared decryption key using the Guardian App. Afterwards, the election public key is published.

During the election
===================

The period of time during the election is the :term:`election phase`.

.. image:: ../images/voting/election.png
    :alt: diagram showing steps below
    :width: 100%

#. Voters using the |bw|, or |cryptox|, open the dApp and cast their votes. The voter must connect their wallet and sign and submit the transaction to register it on the blockchain. For voters preferring to delegate their vote to another account (e.g., from a non-dApp enabled account in Desktop Wallet or from the Concordium Client to one with dApp connectivity), it doesn't matter when voting power is delegated, as long as it happens within the voting "window", i.e., between election start and end time. The latest delegation registration counts and voting power that has been delegated cannot be redelegated; only initial weight can be delegated.

#. The votes are registered in the smart contract and the server reads the votes from the contract.

After the election
==================

The period after the election is the :term:`tally phase`.

.. image:: ../images/voting/post-election.png
    :alt: diagram showing steps below
    :width: 100%

#. Once the election closes, the Election Coordinator uses the coordinator tool to get the :term:`final weights<accumulated weight>` (the initial weights plus weights after taking vote delegation into account) and compute the encrypted tally which is registered in the smart contract.

#. The guardians use the Guardian App to generate their :term:`decryption share<Decryption share>` of the tally and post that before the specified deadline. They then generate and register proof of correct decryption.

#. The decryption shares from each guardian and corresponding proofs of correct decryption are used to produce the election result, which is registered in the smart contract. The election coordinator posts the decrypted tally and voters can see the election result in the Voter dApp.

Components for voting
=====================

There are a number of components used during voting, including the coordinator tool, the Voter dApp, and the Guardian App. You can explore the `repository for the components <https://github.com/Concordium/concordium-governance-committee-voting>`_.
