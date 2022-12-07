.. _Discord: https://discord.gg/xWmQ5tp
.. include:: ../../variables.rst
.. _baking-docker:

==========================
Run a baker node on Docker
==========================

This guide describes how to configure and manage baking on a Docker/Linux node.

Prerequisites
=============

- :ref:`Install and run the node<run-a-node>`
- Generate baker keys for the account you want to bake

Configure a node as a baker
===========================

To run a node as baker, you first have to generate baker keys and then register the keys on an account. Depending on whether you are using Desktop Wallet or |mw-gen2| / |mw-gen1|, the process to generate baker keys differs.
For information about the process for each type of wallet, see :ref:`overview-baker`.
You then need to move the generated baker keys file to a location accessible by the node,
and finally specify this location in the service file for the Concordium Node.

To register the keys in the network you need to be :ref:`running a node <running-a-node>`
and send a ``baker add`` transaction to the network:

.. code-block:: console

   $concordium-client baker add <keys-file>.json --sender bakerAccount --stake <amount-to-stake> --out <concordium-data-dir>/baker-credentials.json

where you replace

- ``<amount-to-stake>`` with the CCD amount for the baker's initial stake
- ``<concordium-data-dir>`` with the directory specified as the volume mount for the node database. In the :ref:`sample configuration file<run-a-node>` this is ``/var/lib/concordium-testnet`` for the testnet node, and ``/var/lib/concordium-mainnet`` for the mainnet node.

.. Warning::
   Do not stake all of your funds or you will not have enough funds to cover transaction fees.

Provide a ``--no-restake`` flag to avoid automatically adding the
rewards to the staked amount on the baker. Read more about this behavior in the section :ref:`Restake earnings<restake-earnings>`.

To start the node with these baker keys and bake blocks do the following.

1. Stop the currently running node. To do this, press ``Ctrl + C`` on the terminal where the node is running or run

   .. code-block:: console

      $docker stop testnet-node

   or

   .. code-block:: console

      $docker stop mainnet-node

   depending on the environment.

2. Update the configuration file for the node by adding

   .. code-block:: yaml

      - CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=/mnt/data/baker-credentials.json

   into the ``environment`` section of the ``node`` service section of the file.

When you've placed the file in the appropriate directory, start the node again in
the same way as the first time, e.g., ``docker-compose -f testnet-node.yaml
up``. The node will automatically start baking when the baker is included in the
bakers for the current epoch.

In the Desktop Wallet, |mw-gen2|, and |mw-gen1|, a bread icon is added to
the account associated with the baker node. The bread icon appears as
soon as the transaction has been submitted. That is, before the two
epochs have elapsed.
