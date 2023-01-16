.. include:: ../../../variables.rst
.. _eSealing_dapp:

=============
eSealing dApp
=============

You can explore the `hosted eSealing service <https://eSealing.testnet.concordium.com>`_ or
start your own front-end by following the instructions in the READ.me file of this
`repository <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/eSealing>`_ to get an overview of the dApp flow.

.. note::

   Comprehensive instructions on how to set up the |bw|, create an account in the |bw|,
   get some testnet CCD and run a local front-end can be found in :ref:`wCCD front-end-set-up section <wCCD-front-end-set-up>`

The front end supports the following two flows with the |bw| (or |mw-gen2| that uses WalletConnect):

- Compute the file hash of a selected file => register its file hash in the smart contract
- Compute the file hash of a selected file => retrieve the timestamp and witness (sealer account) that registered the file hash

.. note::

   Select the ``registration tab`` to register the file hash and the ``display tab`` to look up the
   timestamp and witness (sealer account) of an already registered file.

.. note::

   A file hash is an algorithmic way to assign a unique string to a file using a cryptographic hash function (e.g., sha256) based on the file content.
   Changing the file's content would result in a completely new file hash. The eSealing smart contract expects a file hash of length 256-bits as an
   input parameter because of the used `HashSha2256 <https://docs.rs/concordium-std/latest/concordium_std/struct.HashSha2256.html>`_ type.

Register a file
===============

Select the ``registration tab`` to register the file hash.

.. image:: ./images/registrationTab.gif
   :alt: StreamPlayer
   :align: center

Registration Tab

View timestamp and witness
==========================

Select the ``display tab`` to look up the timestamp and witness (sealer account) of an already registered file.

.. image:: ./images/displayTab.gif
   :alt: StreamPlayer
   :align: center

Display Tab

Use Concordium Client
=====================

The front end is connected to a deployed eSealing smart contract on the Concordium testnet
with `this source code <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/eSealing>`_.

You can interact directly with the smart contract using ``concordium-client`` and your local node
that is running at port 10001 to register a file hash as follows:

.. code-block:: console

   $concordium-client contract update 2481 --entrypoint registerFile --sender <YourAccount> --energy 30000 --parameter-json fileHash.json --grpc-port 10001

Create a ``fileHash.json`` file with a file hash as content similar to:

.. code-block:: json

   "14fe0aed941aa0a0be1118d7b7dd70bfca475310c531f1b5a179b336c075db65"

.. note::

   Comprehensive instructions on how to set up a local Concordium testnet node on port 10001 (or alternatively link to a remote node via grpc),
   and download ``concordium-client`` can be found in :ref:`part 3<piggy-bank-preparing>` of the piggy bank tutorial.

You can view the ``timestamp`` and ``witness (sealer account)`` of an already timestamped file as follows:

.. code-block:: console

    $concordium-client contract invoke 2481 --entrypoint getFile --parameter-json fileHash.json --grpc-port 10001

What is the cost of using your account to seal a file?
======================================================

The cost is currently approximately 4-5 cents (Euro) to register a file hash in the smart contract on mainnet.
Displaying the timestamp and witness (sealer_account) of a file hash is free of charge.
