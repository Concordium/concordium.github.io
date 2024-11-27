.. include:: ../../../variables.rst
.. _baker-ubuntu:

===============================
Import validator keys on Ubuntu
===============================

This guide describes how to set up the node to run as a :ref:`validator <baker-concept>` node on a server that participates in the Concordium network. A node receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network. In addition, a validator node also participates in the lottery and produces its own blocks. The validator node will start producing blocks two epochs after the transaction has been approved.

Prerequisites
=============

- Run Ubuntu 20.04 or later
- Have the administrator password to your computer.
- :ref:`Run a node on ubuntu - Mainnet <run-node-ubuntu>` or :ref:`Run a node on ubuntu - Testnet <run-node-ubuntu-testnet>`
-  If you want to run the node as a validator, you must have generated validator keys, see :ref:`add a validator <add-baker-mw>` for details. For an overview of the process, see :ref:`baker-concept`.

.. dropdown:: Configure the node with validator keys on Mainnet

   #. Move the JSON file with the validator keys you generated to the server that's running the node.
      Store it, for example, in ``/home/user/concordium/validator-credentials.json``.

   #. In the terminal, enter:

      .. code-block:: console

         $sudo systemctl edit concordium-mainnet-node.service

   #. Add the following snippet to the opened file (the file is empty the first time you open it):

      .. code-block:: console

         [Service]

         Environment=CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/validator-credentials.json
         BindReadOnlyPaths=/home/user/concordium/validator-credentials.json:%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/validator-credentials.json

      Where you replace the path `/home/user/concordium/validator-credentials.json` with the actual location of the file.

   .. Note::
      The path `%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/` is the default path to the validators's state directory, where `9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478` is the genesis hash.

   #. Save the edited file.

   #. Restart the node for the changes to take effect. Enter:

      .. code-block:: console

         $sudo systemctl restart concordium-mainnet-node.service

   #. To verify the node is running, enter:

      .. code-block:: console

         $sudo systemctl status concordium-mainnet-node.service

.. dropdown:: Configure the node with validator keys on Testnet

   #. Move the JSON file with the validator keys you generated to the server that's running the node.
      Store it, for example, in ``/home/user/concordium/validator-credentials.json``.

   #. In the terminal, enter:

      .. code-block:: console

         $sudo systemctl edit concordium-testnet-node.service

   #. Add the following snippet to the opened file (the file is empty the first time you open it):

      .. code-block:: console

         [Service]

         Environment=CONCORDIUM_NODE_VALIDATOR_CREDENTIALS_FILE=%S/concordium-b6078154d6717e909ce0da4a45a25151b592824f31624b755900a74429e3073d/validator-credentials.json
         BindReadOnlyPaths=/home/user/concordium/validator-credentials.json:%S/concordium-b6078154d6717e909ce0da4a45a25151b592824f31624b755900a74429e3073d/validator-credentials.json

      Where you replace the path `/home/user/concordium/validator-credentials.json` with the actual location of the file.

   .. Note::
      The path `%S/concordium-b6078154d6717e909ce0da4a45a25151b592824f31624b755900a74429e3073d/` is the default path to the validators's state directory, where `b6078154d6717e909ce0da4a45a25151b592824f31624b755900a74429e3073d` is the genesis hash.

   #. Save the edited file.

   #. Restart the node for the changes to take effect. Enter:

      .. code-block:: console

         $sudo systemctl restart concordium-testnet-node.service

   #. To verify the node is running, enter:

      .. code-block:: console

         $sudo systemctl status concordium-testnet-node.service

Verify that a node is a validator node
======================================

Two :term:`epochs <epoch>` must have elapsed before you can see the validator ID of the node on the dashboard.

You can use ``concordium-client`` to see the status of the node. For more information, see :ref:`Concordium Client <concordium-client>`.

.. code-block:: console

   $concordium-client raw GetNodeInfo

   ...

   Consensus type: "Active"

   ...

In the wallets, a badge is added to the account associated with the validator node. The badge appears as soon as the transaction has been submitted. That is, before the two epochs have elapsed.
