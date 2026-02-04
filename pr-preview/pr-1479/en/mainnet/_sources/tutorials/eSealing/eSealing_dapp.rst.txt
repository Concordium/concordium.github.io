.. include:: ../../variables.rst
.. _eSealing_dapp:

=============
eSealing dApp
=============

You can explore the `hosted eSealing service <https://esealing.testnet.concordium.com>`_ or
start your own frontend by following the instructions in the README.md file of this
`repository <https://github.com/Concordium/concordium-browser-wallet/tree/main/examples/eSealing>`_ to get an overview of the dApp flow.

.. note::

   Comprehensive instructions on how to set up the |bw|, create an account in the |bw|,
   get some testnet CCD and run a local frontend can be found in :ref:`setup a wallet <setup-wallet>`.

The frontend supports the following two flows with the |bw| (or the |mw-gen2| that uses WalletConnect):

- Compute the file hash of a selected file => register its file hash in the smart contract
- Compute the file hash of a selected file => retrieve the timestamp and witness (sealer account) that registered the file hash

.. note::

   Select the **registration tab** to register the file hash and the **display tab** to look up the
   timestamp and witness (sealer account) of an already registered file.

.. note::

   A file hash is an algorithmic way to assign a unique string to a file using a cryptographic hash function (e.g., `SHA-2 <https://en.wikipedia.org/wiki/SHA-2>`_) based on the file content.
   Changing the file's content would result in a completely new file hash. The eSealing smart contract expects a file hash of length 256-bits as an
   input parameter because of the used `HashSha2256 <https://docs.rs/concordium-std/latest/concordium_std/struct.HashSha2256.html>`_ type.

Register a file
===============

Select the **Registration tab** to register the file hash as shown below:

.. image:: ./images/registrationTab.gif
   :alt: StreamPlayer
   :align: center

View timestamp and witness
==========================

Select the **Display tab** to look up the timestamp and witness (sealer account) of an already registered file as shown below:

.. image:: ./images/displayTab.gif
   :alt: StreamPlayer
   :align: center

Use Concordium Client
=====================

The frontend is connected to a deployed eSealing smart contract on the Concordium testnet
with `this source code <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/eSealing>`_.

You can interact directly with the smart contract using ``concordium-client`` and your local node
that is running at port 20001 to register a file hash as follows:

.. code-block:: console

   $ concordium-client contract update 2481 --entrypoint registerFile --sender <YourAccount> --energy 30000 --parameter-json fileHash.json --grpc-port 20001

Create a ``fileHash.json`` file with a file hash as content similar to:

.. code-block:: json

   "14fe0aed941aa0a0be1118d7b7dd70bfca475310c531f1b5a179b336c075db65"

.. image:: ./images/registerFile.png
   :align: center

.. note::

   Comprehensive instructions on how to set up a local Concordium testnet node on port 20001 (or alternatively link to a remote node via grpc),
   and download ``concordium-client`` can be found in :ref:`Setup the development environment<setup-env>`.

.. note::

   In Unix-like systems you can calculate the sha256 hash of a file with the following command:

   .. code-block:: console

      $ sha256sum ./yourFile.txt

You can view the ``timestamp`` and ``witness`` (sealer account) of an already timestamped file as follows:

.. code-block:: console

    $ concordium-client contract invoke 2481 --entrypoint getFile --parameter-json fileHash.json --grpc-port 20001

.. image:: ./images/displayFile.png
   :align: center

What is the cost of using your account to seal a file?
======================================================

The cost is currently approximately 4-5 cents (Euro) to register a file hash in the smart contract on mainnet.
Displaying the timestamp and witness (sealer_account) of a file hash is free of charge because you don't send a transaction,
you just look up the values from the chain.
