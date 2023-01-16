.. include:: ../../variables.rst
.. _sc-tutorials:

==========
Tutorials
==========

You can go through a number of different tutorials to sharpen your skills as
a dApp (decentralized application) developer on the Concordium blockchain.

In the ``piggy bank`` tutorial, you are going to build a simple smart contract modelling a piggy bank.
It should allow any account to insert CCD and only the owner to smash it, taking all of the CCD inside.

In the ``wCCD`` tutorial, you are going to get familiar with the deployed wCCD token on testnet.
You are going to write a basic web front-end example that can read from and write to the deployed wCCD smart contract on testnet.

In the ``Minting`` tutorials you will mint various types of tokens.

In the ``eSealing`` tutorial, you are going to learn how to seal a document, so you can prove that it was in your possession at the time of sealing.
You will use a front end and the |bw| to register the file hash of a selected document in a smart contract and then
display the timestamp and the sealer from an already time-stamped document at the front end.

.. toctree::
   :maxdepth: 1
   :caption: Available tutorials:

   PiggyBank <./piggy-bank/index>
   wCCD <./wCCD/index>
   nft-minting/index
   sft-minting/index
   nft-marketplace/index
   eSealing <./eSealing/index>
