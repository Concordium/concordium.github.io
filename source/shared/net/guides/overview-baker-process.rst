.. _overview-baker:

=============================
Overview of the baker process
=============================

Baking is possible with both Mobile Wallet and Desktop Wallet, however the process differs between the two. The overviews below give a brief description of the process.

.. Note::

   If you plan to be a baker, Concordium recommends using the Desktop Wallet.

Baking with Desktop Wallet
==========================

This overview describes the recommended scenario for running a node and becoming a baker on the Concordium blockchain, using Desktop Wallet in combination with a Ledger Nano S hardware wallet to generate baker keys.

Step 1: Set up the node
-----------------------

The Desktop Wallet must be connected to a running node on the Concordium blockchain. You can run a node :ref:`on Windows<run-node-windows>`, :ref:`on macOS<run-node-macos>`, :ref:`on Ubuntu<run-node-ubuntu>` or using :ref:`Docker<run-a-node>`.

Step 2: Set up the Ledger Nano S
--------------------------------

The Desktop Wallet requires that you store your keys on a Ledger Nanos S hardware device. This is to ensure that your private account keys are kept secure. To be able to use the Ledger Nano S with the Desktop Wallet, you must install the Concordium Ledger App on the hardware wallet. See :ref:`Install the Ledger App guide<install-ledger-app>`.

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

Baking with Mobile Wallet
=========================

This overview describes the recommended scenario for running a node and becoming a baker on the Concordium blockchain when using Mobile Wallet and running a node. Baking when using Mobile Wallet requires you to use Concordium Client to configure and manage the baker.

Step 1: Set up the node
-----------------------

For baking you must be running a node on the Concordium blockchain. You can run a node :ref:`on Windows<run-node-windows>`, :ref:`on macOS<run-node-macos>`, :ref:`on Ubuntu<run-node-ubuntu>` or using :ref:`Docker<run-a-node>`.

Step 2: Set up the Concordium Mobile Wallet
-------------------------------------------

The Mobile Wallet is available for iOS and Android. For instructions about download and setup, see :ref:`setup-mobile-wallet`.

Step 3: Set up an identity and initial account
----------------------------------------------

Once you've installed the Mobile Wallet, you must set up an identity and an initial account. It is recommended to create a separate account to use as a baker account. For instructions, see :ref:`create-initial-account` and :ref:`create-account`.

Step 4: Export the account keys
-------------------------------

You must export the account keys of the account you will use as your baker account in Mobile Wallet. For instructions, see :ref:`export-import`.

Step 4: Download and run Concordium Client
------------------------------------------

Go to :ref:`downloads` to download the latest version of Concordium Client for your operating system. Once you have downloaded it, you need to run it.

Step 5: Import Mobile Wallet account using Concordium Client
------------------------------------------------------------

You must import the account you exported keys for into Concoridum Client. For instructions, see :ref:`become-a-baker`.

Step 6: Create and register baker keys
--------------------------------------

You need to create and register baker keys for your account. See :ref:`become-a-baker` for information about the commands to do this.

Once you have performed these steps, you can :ref:`manage your baker using Concordium Client<become-a-baker>`.

.. toctree::
   :hidden:
   :maxdepth: 1

   baker-pool
   baker-windows
   ../nodes/baker-macos
   ../nodes/baker-ubuntu
   ../nodes/baker-docker
   become-baker
