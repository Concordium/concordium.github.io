.. _install-node-docker-image:

===================================
Install and manage a node on Docker
===================================

.. admonition:: At a glance

   Use Docker Compose to run a mainnet or testnet node on Linux.
   You need Docker Engine and the Compose plugin.
   After this procedure, your node runs in a Docker container.

The ``concordium/node`` Docker image includes the node, the collector, and both
network genesis files. Select the network in the Compose file.

If you are running a node already, avoid catching up from scratch using the matching migration guide:

- :ref:`Ubuntu package migration guide<migrate-debian-to-docker>`.
- :ref:`Network-specific docker image migration guide<migrate-network-specific-images>`.
- TODO MacOS
- TODO Windows

Prerequisites
=============

- Meet the :ref:`node requirements <node-requirements>`.
- Make sure that the selected image is available for your host platform.
- Install `Docker Engine <https://docs.docker.com/engine/install/>`_ and the
  `Compose plugin <https://docs.docker.com/compose/install/>`_.

.. _configure-docker-image:

Configure a node
================

1. Create a directory for storing node configuration and data, like ``mainnet-node`` or ``testnet-node``.
2. In the directory, create ``compose.yaml`` from one the network-configuration examples below.
3. Replace the collector name with your desired node's dashboard name, :emphasis:`note this name will be publicly visible`.

.. dropdown:: Mainnet ``mainnet-node/compose.yaml`` example

   Example of Concordium node configuration for running a node on Concordium Mainnet.

   .. code-block:: yaml

      services:
        node:
          image: concordium/node:latest
          container_name: mainnet-node
          restart: unless-stopped
          stop_grace_period: 5m
          ports:
            - "8888:8888"
            - "127.0.0.1:20000:20000"
          volumes:
            - ./data:/mnt/data
          environment:
            CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE: /genesis/mainnet-genesis.dat
            CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES: bootstrap.mainnet.concordium.software:8888
            CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM: https://catchup.mainnet.concordium.software/blocks.idx
            CONCORDIUM_NODE_COLLECTOR_ENABLED: "true"
            CONCORDIUM_NODE_COLLECTOR_NODE_NAME: my-mainnet-node
            CONCORDIUM_NODE_COLLECTOR_URL: https://dashboard.mainnet.concordium.software/nodes/post

.. dropdown:: Testnet ``testnet-node/compose.yaml`` example

   Example of Concordium node configuration for running a node on Concordium Testnet.

   .. code-block:: yaml

      services:
        node:
          image: concordium/node:latest
          container_name: testnet-node
          restart: unless-stopped
          stop_grace_period: 5m
          ports:
            - "8889:8889"
            - "127.0.0.1:20001:20000"
          volumes:
            - ./data:/mnt/data
          environment:
            CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE: /genesis/testnet-genesis.dat
            CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES: bootstrap.testnet.concordium.com:8888
            CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM: https://catchup.testnet.concordium.com/blocks.idx
            CONCORDIUM_NODE_LISTEN_PORT: "8889"
            CONCORDIUM_NODE_COLLECTOR_ENABLED: "true"
            CONCORDIUM_NODE_COLLECTOR_NODE_NAME: my-testnet-node
            CONCORDIUM_NODE_COLLECTOR_URL: https://dashboard.testnet.concordium.com/nodes/post

The examples mount a local ``./data`` directory beside the ``compose.yaml`` ensuring the node data and configurations are persisted across restart and updates.

The examples give public access to the P2P port and limit host gRPC access to the loopback interface.
Testnet uses host port ``20001`` and container port ``20000``.

They setup the network specific genesis data and the concordium-provided bootstrapper nodes, source for out-of-band blocks (improves catchup time) and enables the collector handling telemetrics which allows the node to show up in the various blockchain explorers.

.. note::

   The image runs as a non-root user with user ID (UID) ``10001`` and group ID (GID) ``10001``.
   This intentionally limits the process's permissions inside the container.
   The container user must be able to write to the mounted ``data/`` directory, therefore instructions below cover creating this directory and handing ownership to the container user.

Start the node
==============

1. Open a terminal in the directory that contains ``compose.yaml`` from the previous section.
2. For a new node, we first have to create the local state directory and give container user ownership:

   .. code-block:: console

      $ mkdir data
      $ sudo chown 10001:10001 data

3. Start the node using

   .. code-block:: console

     $ docker compose up --detach

   For network and TLS settings, see :ref:`advanced-docker-image`.
   For startup or reporting problems, see :ref:`troubleshoot-docker-image`.

4. Verify the node is running by inspecing the logs:

   .. code-block:: console

     $ docker compose logs --follow

.. _upgrade-docker-image:

Upgrade the node
================

1. Read the `release notes <https://github.com/Concordium/concordium-node/releases>`_
   for any additional instructions.
2. Stop the node by running ``docker compose stop`` from the directory that contains ``compose.yaml``.
3. Check the logs for a clean shutdown ``docker compose logs``.
4. If the Compose file uses a fixed tag, update the ``image`` entry to the new
   version. Then run ``docker compose pull`` to download the selected image.
   Run this command for both ``latest`` and fixed tags.
5. Start the node with ``docker compose up --detach``.
6. Verify the node is running by inspecing the logs:

   .. code-block:: console

     $ docker compose logs --follow

.. _remove-docker-image:

Stop or remove the node
=======================

To stop and take down the node run:

.. code-block:: console

   $docker compose stop
   $docker compose down

The example configurations use 5 minute shutdown grace period for the node to stop.
Check the logs for a clean shutdown.

.. warning::

   If you delete the local state directory, you lose its data and configuration.
   Do not delete this directory during migration or rollback.
   First, check that the new installation operates correctly.
   Then, remove old state or backups only as permitted by your retention policy.

.. _validator-docker-image:

Run a validator node
====================

For a new validator, see :ref:`Import validator keys <import-validator-keys>`.
For an existing Debian validator, follow :ref:`migrate-debian-to-docker`.
Use the existing validator keys. Do not generate new keys or register them again.
