.. include:: ../../variables.rst
.. _overview-baker:

=============================
Overview of the baker process
=============================

Baking is possible with |mw-gen2|, |mw-gen1|, and Desktop Wallet, however the process differs between them. The overviews below give a brief description of the process.

.. Note::

   If you plan to be a baker, Concordium recommends using the Desktop Wallet.

.. Note::

   To check the minimum amount required to become a baker, see :ref:`consensus show-chain-parameters`.

Baking with Desktop Wallet
==========================

This overview describes the recommended scenario for running a node and becoming a baker on the Concordium blockchain, using Desktop Wallet in combination with a LEDGER device to generate baker keys.

Step 1: Set up the node
-----------------------

The Desktop Wallet must be connected to a running node on the Concordium blockchain. You can run a node :ref:`on Windows<run-node-windows>`, :ref:`on macOS<run-node-macos>`, :ref:`on Ubuntu<run-node-ubuntu>` or using :ref:`Docker<run-a-node>`.

Step 2: Set up the LEDGER device
--------------------------------

The Desktop Wallet requires that you store your keys on a LEDGER device. This is to ensure that your private account keys are kept secure. To be able to use the LEDGER device with the Desktop Wallet, you must install the Concordium LEDGER App on the hardware wallet. See :ref:`Install the Ledger App guide<install-ledger-app>`.

Step 3: Set up the Concordium Desktop Wallet
--------------------------------------------

You'll need to install and set up the Desktop Wallet to create and manage identities and accounts and add a baker. See :ref:`Set up the Desktop Wallet<overview-desktop>`.

Step 4: Set up an identity and an initial account
-------------------------------------------------

Once you've installed the Desktop Wallet, you must set up an identity and an initial account. You may want to create a separate account to use as a baker account, since the Identity Provider knows the user who submits the initial account to the chain. See :ref:`Create an identity and an initial account in the Desktop Wallet <create-initial-account>` and :ref:`Create an account in the Desktop Wallet<create-account>`.

Step 5: Add a baker in the Desktop Wallet
-----------------------------------------

You're now ready to add a baker in the Desktop Wallet and generate baker keys. This process varies depending on whether you need one or more signatures before you can submit the transaction to the chain. See :ref:`Add a baker account in the Desktop Wallet <create-baker-desktop>`. You can also change the number of signatures required on an account before a transaction can be submitted to the blockchain. See :ref:`Change the signature threshold <guide-change-signature>`

Step 6: Configure the node with the baker keys
----------------------------------------------

The last step is to configure the running node with the baker keys so the node
can start baking.

- :ref:`On Windows<baker-windows>`

- :ref:`On macOS<baker-macos>`

- :ref:`On Ubuntu<baker-Ubuntu>`

- :ref:`On Docker/Linux<baking-docker>`.

For information about how to update your baker or stop baking, see :ref:`Baking in Desktop Wallet<baking-dw>`.

Baking with |mw-gen1| and |mw-gen2|
===================================

This overview describes the recommended scenario for running a node and becoming a baker on the Concordium blockchain when using |mw-gen1| or |mw-gen2| and running a node.

Step 1: Set up the node
-----------------------

For baking you must be running a node on the Concordium blockchain. You can run a node :ref:`on Windows<run-node-windows>`, :ref:`on macOS<run-node-macos>`, :ref:`on Ubuntu<run-node-ubuntu>` or using :ref:`Docker<run-a-node>`. You can also have a third-party run a node on your behalf.

Step 2: Set up the Wallet
-------------------------

The |mw-gen1| and |mw-gen2| are available for iOS and Android. For instructions about download and setup, see :ref:`setup-g2-mobile-wallet`.

Step 3: Set up an identity and initial account
----------------------------------------------

Once you've installed the Wallet, you must set up an identity and an account. If using |mw-gen1| it is recommended to create a separate account to use as a baker account. For instructions, see :ref:`create-initial-account` and :ref:`create-account`.

Step 4: Add baking to an account
--------------------------------

Configure baking for an account. For instructions, see :ref:`add-baker-mw`.

Step 5: Register baker keys
--------------------------------------

The last step is to configure the running node with the baker keys so the node
can start baking.

- :ref:`On Windows<baker-windows>`

- :ref:`On macOS<baker-macos>`

- :ref:`On Ubuntu<baker-Ubuntu>`

- :ref:`On Docker/Linux<baking-docker>`.

For information about how to update your baker or stop baking, see :ref:`Change baker options<update-baker-mw>`.

.. toctree::
   :hidden:
   :maxdepth: 1

   baker-pool
   baker-windows
   ../nodes/baker-macos
   ../nodes/baker-ubuntu
   ../nodes/baker-docker
   become-baker
