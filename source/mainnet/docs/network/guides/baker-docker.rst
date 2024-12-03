.. _Discord: https://discord.gg/xWmQ5tp
.. include:: ../../../variables.rst
.. _baking-docker:

===============================
Import validator keys on Docker
===============================

This guide describes how to set up the node to run as a :ref:`validator <baker-concept>` node on a Docker/Linux node that participates in the Concordium network. A node receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network. In addition, a validator node also participates in the lottery and produces its own blocks. The validator node will start producing blocks two epochs after the transaction has been approved.

Prerequisites
=============

- :ref:`Run a node on Docker<run-a-node>`
- If you want to run the node as a validator, you must have generated validator keys, see :ref:`add a validator <add-baker-mw>` for details. For an overview of the process, see :ref:`baker-concept`.

Configure a node as a validator
===============================

Once you have generated validator keys, you then need to move the generated validator keys file to a location accessible by the node, and finally specify this location in the service file for the Concordium Node.

To register the keys in the network you need to be :ref:`running a node <running-a-node>` and send a ``validator add`` transaction to the network:

.. code-block:: console

   $concordium-client validator add <keys-file>.json --sender validatorAccount --stake <amount-to-stake> --out <concordium-data-dir>/validator-credentials.json

where you replace

- ``<amount-to-stake>`` with the CCD amount for the validators's initial stake
- ``<concordium-data-dir>`` with the directory specified as the volume mount for the node database. In the :ref:`sample configuration file<run-a-node>` this is ``/var/lib/concordium-testnet`` for the testnet node, and ``/var/lib/concordium-mainnet`` for the mainnet node.

.. Warning::
   Do not stake all of your funds or you will not have enough funds to cover transaction fees.

Provide a ``--no-restake`` flag to avoid automatically adding the rewards to the staked amount on the validator account. Read more about this behavior in the section :ref:`Restake earnings<restake-earnings>`.

To start the node with these validator keys and produce blocks, do the following:

1. Stop the currently running node. To do this, press ``Ctrl + C`` on the terminal where the node is running or run

   .. code-block:: console

      $docker stop testnet-node

   or

   .. code-block:: console

      $docker stop mainnet-node

   depending on the environment.

2. Update the configuration file for the node by adding

   .. code-block:: yaml

      - CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=/mnt/data/validator-credentials.json

   into the ``environment`` section of the ``node`` service section of the file.

When you've placed the file in the appropriate directory, start the node again in the same way as the first time, e.g., ``docker-compose -f testnet-node.yaml
up``. The node will automatically start producing blocks when the validator is included in the validators for the current epoch.

In the wallets, a badge is added to the account associated with the validator node. The badge appears as soon as the transaction has been submitted. That is, before the two epochs have elapsed.
