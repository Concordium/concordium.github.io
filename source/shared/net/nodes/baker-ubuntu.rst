.. _baker-ubuntu:

==========================
Run a baker node on Ubuntu
==========================

.. contents::
   :local:
   :backlinks: none

This guide describes how to set up the node to run as a :ref:`baker node<baker-node-Ubuntu>`.

Prerequisites
=============

-  The node is installed and running.

-  If you want to run the node as a baker, you must have generated baker keys. How you generate baker keys depends on whether you are using Desktop Wallet or Mobile Wallet. For an overview of the process for both wallets, see :ref:`overview-baker`.

Run a baker node on Ubuntu
==========================

The following steps show you how to run a node as a :ref:`baker <baker-concept>` on a server that participates in the Concordium network. A node receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network. In addition, a baker node also participates in the lottery and produces its own blocks. If the stake is high enough the baker node also participates in finalization.

Configure the node with baker keys
----------------------------------

#. Move the JSON file with the baker keys you generated to the server that's running the node.
   Store it, for example, in ``/home/user/concordium/baker-credentials.json``.

#. In the terminal, enter:

   .. code-block:: console

      $sudo systemctl edit concordium-mainnet-node.service

#. Add the following snippet to the opened file (the file is empty the first time you open it):

   .. code-block:: console

      [Service]

      Environment=CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/baker-credentials.json
      BindReadOnlyPaths=/home/user/concordium/baker-credentials.json:%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/baker-credentials.json

   Where you replace the path `/home/user/concordium/baker-credentials.json` with the actual location of the file.

.. Note::
   The path `%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/` is the default path to the baker's state directory, where `9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478` is the genesis hash.

#. Save the edited file.

#. Restart the node for the changes to take effect. Enter:

   .. code-block:: console

      sudo systemctl restart concordium-mainnet-node.service

#. To verify the node is running, enter:

   .. code-block:: console

      sudo systemctl status concordium-mainnet-node.service

Verify that a node is a baker node.
-----------------------------------

Two :ref:`epochs <glossary>` must have elapsed before you can see the baker ID of the node on the dashboard.

You can use ``concordium-client`` to see the status of the node. For more information, see :ref:`Concordium Client <concordium_client>`.

.. code-block:: console

   $concordium-client raw GetNodeInfo

   ...

   Consensus type: "Active"

   ...

In the Desktop Wallet and the Mobile Wallet, a bread icon is added to
the account associated with the baker node. The bread icon appears as
soon as the transaction has been submitted. That is, before the two
epochs have elapsed.
