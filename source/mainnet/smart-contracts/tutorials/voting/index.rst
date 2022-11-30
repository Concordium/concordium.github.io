.. include:: ../../variables.rst
.. _voting-dapp:


=========================
The Voting dApp
=========================

In this tutorial, you are going to get familiar with the deployed voting dApp on testnet. The voting dApp example is intended to show how you can use Concordium to conduct a vote using the |bw|.
You are going to write a basic web front-end example that can read from and write to the deployed smart contract on testnet.

If you want to try this example before starting the tutorial:

#. Download and configure the |bw| on Testnet. You need an account with some CCD. Use the testnet faucet for CCDs if you don't have any.

#. Go to the `example dApp site <https://voting.testnet.concordium.com/>`_. Click **Setup election**.

#. Click **Connect**. When prompted in your |bw|, accept the connection.

#. Enter an election description and add options for voting selections. Change the deadline if you wish. Then click **Create election**. Click **Sign & Submit** in the |bw|.

#. Click **Vote now**. You can vote and send the link to any other voters. When you click **Cast vote** you must click **Sign & submit** in the |bw|.

#. Click **Results** to see the election results.

To write your own contract and create your own front-end you can follow the tutorial.

In the :ref:`first part<voting-sc>`, you will learn about the voting smart contract.

In the :ref:`second part<voting-frontend>`, you will download the |bw| and set up a basic web front-end locally.

.. warning::

   The reader is assumed to have basic knowledge of what a blockchain and smart
   contracts are, and some experience with web front-end development.

To start the tutorial click :ref:`here<wCCD-introduction>`.

.. toctree::
   :hidden:
   :maxdepth: 1

   Writing a voting smart contract <./voting-sc>
   Setting up the front-end <./voting-frontend>
