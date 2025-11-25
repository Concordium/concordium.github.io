.. include:: ../../variables.rst
.. _Rust: https://www.rust-lang.org/
.. _voting-dapp:


===============
The Voting dApp
===============

In this tutorial, you are going to get familiar with the deployed voting dApp on testnet. The voting dApp example is intended to show how you can use Concordium to conduct an election using the |bw| to enable users to cast their vote in your election.
You are going to write a basic web frontend example that can read from and write to the deployed smart contract on testnet.

If you want to try this example before starting the tutorial:

#. Download and configure the |bw| on Testnet. You need an account with some CCD. Use the :ref:`testnet faucet for CCDs<testnet-faucet>` if you don't have any.

#. Go to the `example dApp site <https://voting.testnet.concordium.com/>`_. Click **Setup election**.

#. Click **Connect**. When prompted in your |bw|, accept the connection.

#. Enter an election description and add options for voting selections. Change the deadline if you wish. Then click **Create election**. Click **Sign & Submit** in the |bw|.

#. Click **Vote now**. You can vote and send the link to any other voters. When you click **Cast vote** you must click **Sign & submit** in the |bw|.

#. Click **Results** to see the election results. Note that your vote may not appear instantaneously after voting, as the vote transaction waits for confirmation. Give it a few seconds and the vote should appear.

In the :ref:`first part<voting-sc>`, you will learn about the voting smart contract.

In the :ref:`second part<voting-frontend>`, you will download the |bw| and set up a basic web frontend locally.

.. warning::

   This tutorial assumes the reader has basic knowledge of what a blockchain and a smart contract is, and some experience with Rust_ and web frontend development.
   Consider reading the simpler :ref:`Counter smart contract tutorial <counter-sc>` first.

To start the tutorial click :ref:`here<voting-sc>`.

.. toctree::
   :hidden:
   :maxdepth: 1

   Writing a voting smart contract <./voting-sc>
   Setting up the frontend <./voting-dapp>
