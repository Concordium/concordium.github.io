.. _Discord: https://discord.gg/xWmQ5tp

.. _run-a-node:

===================================
Install and manage a node on Docker
===================================

This article explains how to run a Concordium node in Docker on Linux on mainnet or testnet, and how to set up your node as a :ref:`validator node<configure-baker-docker>`.

An account is not required to run a node, but you will need one if you want to become a validator.

You can also watch the video to learn how to run a node with Docker.

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/DRk1NSIKZSM"
   title="YouTube video player" frameborder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
   allowfullscreen></iframe>

Prerequisites
=============

Before running a Concordium node you will need to

- Install and run `Docker <https://www.docker.com/>`_.

   -  On *Linux*, allow Docker to be run as a non-root user.

- `Install the compose plugin <https://docs.docker.com/compose/install/>`_.

.. _running-a-node:

Installing and running Concordium Node on Docker
================================================

Concordium provides two Docker images, a `mainnet <https://hub.docker.com/r/concordium/mainnet-node>`_ one and a `testnet <https://hub.docker.com/r/concordium/testnet-node>`_ one.
These images are designed to be used together with docker-compose, or a similar driver. This guide provides a sample configuration using ``docker compose``.

The node requires a database which must be stored on the host system so that it persists when the docker container is stopped. It is up to the user to select the location of the database on their host system. In the guide the location used is ``/var/lib/concordium-mainnet`` or ``/var/lib/concordium-testent`` but any location to which the user that runs the Docker command has access to will do.

.. note::
  The dollar sign (``$``) in a codeblock means that you should run the command that follows the ``$`` in a terminal.

.. dropdown:: Mainnet

   To run a node on mainnet use the following configuration file and follow the steps below.

   1. Create a file named ``mainnet-node.yaml`` and add the following content to it:

   .. code-block:: yaml

      # This is an example configuration for running the mainnet node
      services:
         mainnet-node:
            container_name: mainnet-node
            image: concordium/mainnet-node:latest
            platform: linux/amd64
            pull_policy: always
            environment:
               # Environment specific configuration
               # The url where IPs of the bootstrap nodes can be found.
               - CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES=bootstrap.mainnet.concordium.software:8888
               # Where the genesis is located
               - CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE=/mainnet-genesis.dat
               # The url of the catchup file. This speeds up the catchup process.
               - CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM=https://catchup.mainnet.concordium.software/blocks.idx
               # General node configuration Data and config directories (it's OK if they
               # are the same). This should match the volume mount below. If the location
               # of the mount inside the container is changed, then these should be
               # changed accordingly as well.
               - CONCORDIUM_NODE_DATA_DIR=/mnt/data
               - CONCORDIUM_NODE_CONFIG_DIR=/mnt/data
               # The port on which the node will listen for incoming connections. This is a
               # port inside the container. It is mapped to an external port by the port
               # mapping in the `ports` section below. If the internal and external ports
               # are going to be different then you should also set
               # `CONCORDIUM_NODE_EXTERNAL_PORT` variable to what the external port value is.
               - CONCORDIUM_NODE_LISTEN_PORT=8888
               # Desired number of nodes to be connected to.
               - CONCORDIUM_NODE_CONNECTION_DESIRED_NODES=5
               # Maximum number of __nodes__ the node will be connected to.
               - CONCORDIUM_NODE_CONNECTION_MAX_ALLOWED_NODES=10
               # Address of the V2 GRPC server.
               - CONCORDIUM_NODE_GRPC2_LISTEN_ADDRESS=0.0.0.0
               # And its port which has to be the same as in `CONCORDIUM_NODE_COLLECTOR_GRPC_HOST`
               # that is defined for the collector.
               - CONCORDIUM_NODE_GRPC2_LISTEN_PORT=20000
               # Maximum number of __connections__ the node can have. This can temporarily be more than
               # the number of peers when incoming connections are processed. This limit
               # ensures that there cannot be too many of those.
               - CONCORDIUM_NODE_CONNECTION_HARD_CONNECTION_LIMIT=20
               # Number of threads to use to process network events. This should be
               # adjusted based on the resources the node has (in combination with
               # `CONCORDIUM_NODE_RUNTIME_HASKELL_RTS_FLAGS`) below.
               - CONCORDIUM_NODE_CONNECTION_THREAD_POOL_SIZE=2
               # The bootstrapping interval in seconds. This makes the node contact the
               # specified bootstrappers at a given interval to discover new peers.
               - CONCORDIUM_NODE_CONNECTION_BOOTSTRAPPING_INTERVAL=1800
               # Haskell RTS flags to pass to consensus. `-N2` means to use two threads
               # for consensus operations. `-I0` disables the idle garbage collector
               # which reduces CPU load for non-validator nodes.
               - CONCORDIUM_NODE_RUNTIME_HASKELL_RTS_FLAGS=-N2,-I0
            entrypoint: ["/concordium-node"]
            # Exposed ports. The ports the node listens on inside the container (defined
            # by `CONCORDIUM_NODE_LISTEN_PORT` and `CONCORDIUM_NODE_RPC_SERVER_PORT`)
            # should match what is defined here. When running multiple nodes the
            # external ports should be changed so as not to conflict.
            # In the mapping below, the first port is the `host` port, and the second
            # port is the `container` port. When the `container` port is changed the
            # relevant environment variable listed above must be changed as well. For
            # example, changing `10000:10000` to `10000:13000` would mean that
            # `CONCORDIUM_NODE_RPC_SERVER_PORT` should be set to `13000`. Otherwise
            # the node's gRPC interface will not be available from the host.
            ports:
            - "8888:8888"
            - "20000:20000"
            volumes:
            # The node's database should be stored in a persistent volume so that it
            # survives container restart. In this case we map the **host** directory
            # /var/lib/concordium-mainnet to be used as the node's database directory.
            - /var/lib/concordium-mainnet:/mnt/data
         # The collector reports the state of the node to the network dashboard. A node
         # can run without reporting to the network dashboard. Remove this section if
         # that is desired.
         mainnet-node-collector:
            container_name: mainnet-node-collector
            image: concordium/mainnet-node:latest
            platform: linux/amd64
            pull_policy: always
            environment:
               # Settings that should be customized by the user.
               - CONCORDIUM_NODE_COLLECTOR_NODE_NAME=docker-test-mainnet
               # Environment specific settings.
               - CONCORDIUM_NODE_COLLECTOR_URL=https://dashboard.mainnet.concordium.software/nodes/post
               # Collection settings.
               # How often to collect the statistics from the node.
               - CONCORDIUM_NODE_COLLECTOR_COLLECT_INTERVAL=5000
               # The URL where the node can be reached. Note that this will use the
               # docker created network which maps `mainnet-node` to the internal IP of
               # the `mainnet-node`. If the name of the node service is changed from
               # `mainnet-node` then the name here must also be changed.
               # The port also has to be the same as in `CONCORDIUM_NODE_GRPC2_LISTEN_PORT`
               # that is defined for the node.
               - CONCORDIUM_NODE_COLLECTOR_GRPC_HOST=http://mainnet-node:20000
            entrypoint: ["/node-collector"]

   2. Possibly modify the **volume mount** to map the database directory to a different location on the host system. The volume mount is the following section.

      .. code-block:: yaml

         volumes:
            # The node's database should be stored in a persistent volume so that it
            # survives container restart. In this case we map the **host** directory
            # /var/lib/concordium-mainnet to be used as the node's database directory.
            - /var/lib/concordium-mainnet:/mnt/data

   3. Modify the node name that appears on the network dashboard. This is set by
      the environment variable

      .. code-block:: yaml

         - CONCORDIUM_NODE_COLLECTOR_NODE_NAME=docker-main

      This name can be set to any non-empty string. If the name has spaces it should be quoted.

   4. Start the node and the collector.

      .. code-block:: console

         $docker compose -f mainnet-node.yaml up

   The configuration starts two containers, one running the node, and another
   running the node collector that reports the node state to the network dashboard.

   If you wish to have the node running in the background, then add a ``-d`` option to the above command.

   .. Note::

      The sample configuration always downloads the latest node image. It is
      good practice to choose the version deliberately. To choose a specific
      version, find the correct version in
      `hub.docker.com/concordium/mainnet-node <https://hub.docker.com/r/concordium/mainnet-node>`_ and change the
      ``image`` value from

         .. code-block:: yaml

            image: concordium/mainnet-node:latest

      to, e.g.,

         .. code-block:: yaml

            image: concordium/mainnet-node:4.2.3-0


.. dropdown:: Testnet

   The same steps apply as for the mainnet node, except the following sample
   configuration file should be used.

   The main differences from the mainnet configuration are:

   - the image used is the testnet image. See `hub.docker.com/concordium/testnet-node <https://hub.docker.com/r/concordium/testnet-node>`_ for a list of currently available versions.
   - the node listens on port ``8889`` instead of ``8888`` by default
   - the node’s GRPC V2 listens on port ``20001`` instead of ``20000``
   - the database directory is ``/var/lib/concordium-testnet`` instead of ``/var/lib/concordium-mainnet``

   .. code-block:: yaml

      # This is an example configuration for running the testnet node
      services:
         testnet-node:
            container_name: testnet-node
            image: concordium/testnet-node:latest
            platform: linux/amd64
            pull_policy: always
            environment:
               # Environment specific configuration
               # The url where IPs of the bootstrap nodes can be found.
               - CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES=bootstrap.testnet.concordium.com:8888
               # Where the genesis is located
               - CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE=/testnet-genesis.dat
               # The url of the catchup file. This speeds up the catchup process.
               - CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM=https://catchup.testnet.concordium.com/blocks.idx
               # General node configuration Data and config directories (it's OK if they
               # are the same). This should match the volume mount below. If the location
               # of the mount inside the container is changed, then these should be
               # changed accordingly as well.
               - CONCORDIUM_NODE_DATA_DIR=/mnt/data
               - CONCORDIUM_NODE_CONFIG_DIR=/mnt/data
               # The port on which the node will listen for incoming connections. This is a
               # port inside the container. It is mapped to an external port by the port
               # mapping in the `ports` section below. If the internal and external ports
               # are going to be different then you should also set
               # `CONCORDIUM_NODE_EXTERNAL_PORT` variable to what the external port value is.
               - CONCORDIUM_NODE_LISTEN_PORT=8889
               # Desired number of nodes to be connected to.
               - CONCORDIUM_NODE_CONNECTION_DESIRED_NODES=5
               # Maximum number of __nodes__ the node will be connected to.
               - CONCORDIUM_NODE_CONNECTION_MAX_ALLOWED_NODES=10
               # Address of the GRPC server
               - CONCORDIUM_NODE_RPC_SERVER_ADDR=0.0.0.0
               # And its port
               - CONCORDIUM_NODE_RPC_SERVER_PORT=10001
               # Address of the V2 GRPC server.
               - CONCORDIUM_NODE_GRPC2_LISTEN_ADDRESS=0.0.0.0
               # And its port which has to be the same as in `CONCORDIUM_NODE_COLLECTOR_GRPC_HOST`
               # that is defined for the collector.
               - CONCORDIUM_NODE_GRPC2_LISTEN_PORT=20001
               # Maximum number of __connections__ the node can have. This can temporarily be more than
               # the number of peers when incoming connections are processed. This limit
               # ensures that there cannot be too many of those.
               - CONCORDIUM_NODE_CONNECTION_HARD_CONNECTION_LIMIT=20
               # Number of threads to use to process network events. This should be
               # adjusted based on the resources the node has (in combination with
               # `CONCORDIUM_NODE_RUNTIME_HASKELL_RTS_FLAGS`) below.
               - CONCORDIUM_NODE_CONNECTION_THREAD_POOL_SIZE=2
               # The bootstrapping interval in seconds. This makes the node contact the
               # specified bootstrappers at a given interval to discover new peers.
               - CONCORDIUM_NODE_CONNECTION_BOOTSTRAPPING_INTERVAL=1800
               # Haskell RTS flags to pass to consensus. `-N2` means to use two threads
               # for consensus operations. `-I0` disables the idle garbage collector
               # which reduces CPU load for non-validator nodes.
               - CONCORDIUM_NODE_RUNTIME_HASKELL_RTS_FLAGS=-N2,-I0
            entrypoint: ["/concordium-node"]
            # Exposed ports. The ports the node listens on inside the container (defined
            # by `CONCORDIUM_NODE_LISTEN_PORT` and `CONCORDIUM_NODE_RPC_SERVER_PORT`)
            # should match what is defined here. When running multiple nodes the
            # external ports should be changed so as not to conflict.
            # In the mapping below, the first port is the `host` port, and the second
            # port is the `container` port. When the `container` port is changed the
            # relevant environment variable listed above must be changed as well. For
            # example, changing `10001:10001` to `10001:13000` would mean that
            # `CONCORDIUM_NODE_RPC_SERVER_PORT` should be set to `13000`. Otherwise
            # the node's gRPC interface will not be available from the host.
            ports:
            - "8889:8889"
            - "20001:20001"
            volumes:
            # The node's database should be stored in a persistent volume so that it
            # survives container restart. In this case we map the **host** directory
            # /var/lib/concordium-testnet to be used as the node's database directory.
            - /var/lib/concordium-testnet:/mnt/data
         # The collector reports the state of the node to the network dashboard. A node
         # can run without reporting to the network dashboard. Remove this section if
         # that is desired.
         testnet-node-collector:
            container_name: testnet-node-collector
            image: concordium/testnet-node:latest
            platform: linux/amd64
            pull_policy: always
            environment:
               # Settings that should be customized by the user.
               - CONCORDIUM_NODE_COLLECTOR_NODE_NAME=docker-test
               # Environment specific settings.
               - CONCORDIUM_NODE_COLLECTOR_URL=https://dashboard.testnet.concordium.com/nodes/post
               # Collection settings.
               # How often to collect the statistics from the node.
               - CONCORDIUM_NODE_COLLECTOR_COLLECT_INTERVAL=5000
               # The URL where the node can be reached. Note that this will use the
               # docker created network which maps `testnet-node` to the internal IP of
               # the `testnet-node`. If the name of the node service is changed from
               # `testnet-node` then the name here must also be changed.
               # The port also has to be the same as in `CONCORDIUM_NODE_GRPC2_LISTEN_PORT`
               # that is defined for the node.
               - CONCORDIUM_NODE_COLLECTOR_GRPC_HOST=http://testnet-node:20001
            entrypoint: ["/node-collector"]


   .. Note::

      The sample configuration always downloads the latest node image. It is
      good practice to choose the version deliberately. To choose a specific
      version, find the correct version in
      `hub.docker.com/concordium/testnet-node <https://hub.docker.com/r/concordium/testnet-node>`_ and change the
      ``image`` value from

         .. code-block:: yaml

            image: concordium/testnet-node:latest

      to, e.g.,

         .. code-block:: yaml

            image: concordium/testnet-node:4.5.0-0

.. _upgrading-node-docker:

Upgrading Concordium Node Version on Docker
===========================================

.. Note::

   When upgrading your Concordium node, it is generally possible to upgrade directly to the latest version without upgrading through each intermediate version. However, if you wish to download previous node versions, see :ref:`Previous node versions<previous-downloads>`.

To update your ``concordium-node`` when using the ``latest`` tag, simply run the following commands to stop the node, pull the newest image, and restart your service:

.. code-block:: console

   $docker compose -f mainnet-node.yaml down
   $docker compose -f mainnet-node.yaml pull
   $docker compose -f mainnet-node.yaml up -d

This sequence ensures that your node runs the most recent version available with the ``latest`` tag.

If you are using a specific version tag (for example, ``8.0.3-1``), you should first stop your node with:

.. code-block:: console

   $docker compose -f mainnet-node.yaml down

Then, update the ``image:`` field in your ``mainnet-node.yaml`` file to reference the desired version. After saving the changes, start the node again with:

.. code-block:: console

   $docker compose -f mainnet-node.yaml up -d

This approach guarantees that your node is running the exact version you specify.

.. _remove-docker-node:

Uninstall Concordium Node on Docker
===================================

To fully remove your Concordium node—including all running or stopped containers, Docker images, and associated database files—follow these steps:

1. **Stop and remove containers**

   First, stop and remove any running containers for your node:

   .. code-block:: console

      $docker compose -f mainnet-node.yaml down

   Next, list all containers and remove any related to your node:

   .. code-block:: console

      $docker ps -a

2. **Remove the Docker image**

   Once all containers using the image are deleted, you can remove the image itself. List images to find the correct name and tag:

   .. code-block:: console

      $docker images

   Then, remove the Concordium node image (replace `<image_name>` and `<tag>` as appropriate):

   .. code-block:: console

      $docker rmi <image_name>:<tag>

   For example:

   .. code-block:: console

      $docker rmi concordium/concordium-node:latest

3. **Delete the node database**

   By default, the node's data is stored on the host filesystem. To remove all node data, delete the corresponding data directory:

   - For **mainnet**:

     .. code-block:: console

        $sudo rm -rf /var/lib/concordium-mainnet

   - For **testnet**:

     .. code-block:: console

        $sudo rm -rf /var/lib/concordium-testnet

.. warning::

   Deleting these directories is irreversible and will remove all blockchain data and node state on your machine.

Following these steps will completely remove the node, its Docker image, and all local data from your system.

.. _configure-baker-docker:

Run a validator node
====================

For information about how to run a validator node for Linux/Docker, see :ref:`Import validator keys<import-validator-keys>`.

