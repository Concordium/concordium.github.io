.. _`mainnet dashboard`: https://dashboard.mainnet.concordium.software/
.. _`testnet dashboard`: https://dashboard.testnet.concordium.com/
.. _Discord: https://discord.gg/xWmQ5tp
.. include:: ../../variables.rst
.. _import-validator-keys:

======================
Import validator keys
======================

.. admonition:: At a glance

   Import validator keys into a running Concordium node. You need a node using
   the supported Docker image and a set of generated validator keys. After
   configuration, the node can validate when the network includes it in the
   validators for the current epoch.

A validator node receives and propagates blocks and transactions and produces
blocks when selected. See :ref:`baker-concept` for validation requirements.
Credentials registered on mainnet do not work with a testnet node, or vice versa.

Prerequisites
=============

- Run a node with :ref:`the Docker image <install-node-docker-image>` on Linux,
  macOS, or Windows. On Windows, run Docker commands inside Ubuntu WSL2 using
  ``sudo`` if required for Docker socket access.
- Have generated validator keys. See :ref:`add-baker-mw` and :ref:`baker-concept`.

These instructions use the setup in :ref:`install-node-docker-image`. If your
paths or service names differ, adjust the examples to match.

.. warning::

   Never run two nodes with the same validator credentials simultaneously.
   For an existing native or network-specific Docker validator, follow
   :ref:`migrate-to-docker`. Reuse its credentials and registration; do not
   register an existing validator again during migration.

Register a new validator
========================

If you already registered the keys with a wallet or Concordium Client, skip
this step. Use the exported ``validator-credentials.json`` file.

To register new keys with Concordium Client, send a ``validator add``
transaction from a running node:

.. code-block:: console

   $concordium-client validator add <keys-file>.json --sender validatorAccount --stake <amount-to-stake> --validator-credentials-out ./validator-credentials.json

Replace ``<keys-file>.json`` with your generated keys file.
Replace ``validatorAccount`` with your validator account.
Replace ``<amount-to-stake>`` with the initial stake in CCD.
The command writes credentials to ``./validator-credentials.json``.

.. warning::

   Keep enough CCD to pay transaction fees. Do not stake all your funds.
   Do not give all users read access to credentials.
   Do not put credentials in a repository.

To disable automatic restaking, add ``--no-restake`` to the command.
See :ref:`restake-earnings`.

Configure the node
==================

Run these commands in the network directory containing ``compose.yaml``.
Use ``mainnet-node/`` or ``testnet-node/`` from the installation guide.
Put the exported credentials file in this directory.
The steps below copy it into the existing ``data/`` mount.

#. Stop the node:

   .. code-block:: console

      $docker compose stop

   Read the last 100 log lines to check for a clean shutdown:

   .. code-block:: console

      $docker compose logs --tail 100 node

   Confirm a clean shutdown before continuing.

#. Copy the credentials into the existing ``data/`` directory.
   Give the container's UID ``10001`` read access:

   .. code-block:: console

      $sudo install -o 10001 -g 10001 -m 0400 ./validator-credentials.json ./data/validator-credentials.json

   Protect the original credentials file separately.
   Include the credentials when you back up ``data/``.
   Limit access to these backups.

#. Add this entry to the ``node`` service's existing ``environment`` mapping
   in ``compose.yaml``:

   .. code-block:: yaml

      CONCORDIUM_NODE_VALIDATOR_CREDENTIALS_FILE: /mnt/data/validator-credentials.json

   The existing ``./data:/mnt/data`` mount gives the node access to the file.
   No separate credential mount is necessary.

#. Check the Compose file for configuration errors:

   .. code-block:: console

      $docker compose config --quiet

   Start the node in the background:

   .. code-block:: console

      $docker compose up --detach

   Follow the logs to check that the node loads the credentials without errors:

   .. code-block:: console

      $docker compose logs --follow node

   The node produces blocks when the network includes it in the validators
   for the current epoch.

Verify that a node is a validator node
======================================

Two :term:`epochs <epoch>` must have elapsed before you can see the validator ID of the node on the dashboard.

You can use ``concordium-client`` to see the status of the node. For more information, see :ref:`Concordium Client <concordium-client>`.

.. code-block:: console

   $ concordium-client raw GetNodeInfo

   ...

   Consensus type: "Active"

   ...

In the wallets, a badge is added to the account associated with the validator node. The badge appears as soon as the transaction has been submitted. That is, before the two :term:`epochs <epoch>` have elapsed.
