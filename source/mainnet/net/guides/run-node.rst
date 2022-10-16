.. _Discord: https://discord.gg/xWmQ5tp

.. _run-a-node:

======================
Run a node with Docker
======================

In this guide, you learn how to run a node on your Linux computer that
participates in the Concordium network. This means that you receive
blocks and transactions from other nodes, as well as propagate
information about blocks and transactions to the nodes in the Concordium
network. After following this guide, you will be able to

-  run a Concordium node
-  observe it on the network dashboard
-  query the state of the Concordium blockchain directly from your
   machine.

You do not need an account to run a node.

Before you begin
================

Before running a Concordium node you will need to

1. Install and run Docker.

   -  On *Linux*, allow Docker to be run as a non-root user.

2. `Install the compose plugin <https://docs.docker.com/compose/install/>`_.

.. _running-a-node:

Running/upgrading a node
========================

Concordium provides two Docker images, a `mainnet <https://hub.docker.com/r/concordium/mainnet-node>`_ one and a `testnet <https://hub.docker.com/r/concordium/testnet-node>`_ one.
These images are designed to be used together with docker-compose, or a similar driver. This guide provides a sample configuration using ``docker-compose``.

The node requires a database which must be stored on the host system so that it persists when the docker container is stopped. It is up to the user to select the location of the database on their host system. In the guide the location used is ``/var/lib/concordium-mainnet`` or ``/var/lib/concordium-testent`` but any location to which the user that runs the Docker command has access to will do.

.. Note::

   Node version 4.5.0 introduced the GRPC V2 interface which is enabled by the
   sample configurations listed below. If you have done special configuration of
   your node and want to re-use the configuration file and have the new API
   enabled, make sure to edit your configuration, adding ``CONCORDIUM_NODE_GRPC2_LISTEN_PORT``
   and ``CONCORDIUM_NODE_GRPC2_LISTEN_ADDRESS`` as in the sample configurations.

.. Note::

   When upgrading, you can only upgrade one minor version at a time, or from the last release of major version X to major version X+1. You cannot skip versions. For patches, you can skip versions e.g. X.X.0 to X.X.3, or `X.1.1` to `X.2.3`.

   If you are running version 4.2.3 you can :ref:`migrate to the latest version<migration-docker-distribution>`. If you are running any version older than 4.2.3 you will have to delete your database and start over using the instructions on this page.

Run a testnet node
==================

To run a node on testnet use the following configuration file and follow the steps below.

.. code-block:: yaml

   # This is an example configuration for running the testnet node
   version: '3'
   services:
     testnet-node:
       container_name: testnet-node
       image: concordium/testnet-node:latest
       pull_policy: always
       environment:
         # Environment specific configuration
         # The url where IPs of the bootstrap nodes can be found.
         - CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES=bootstrap.testnet.concordium.com:8888
         # Where the genesis is located
         - CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE=/testnet-genesis.dat
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
         # Address of the V2 GRPC server
         - CONCORDIUM_NODE_GRPC2_LISTEN_PORT=0.0.0.0
         # And its port
         - CONCORDIUM_NODE_GRPC2_LISTEN_ADDRESS=20001
         # Maximum number of __connections__ the node can have. This can temporarily be more than
         # the number of peers when incoming connections are processed. This limit
         # ensures that there cannot be too many of those.
         - CONCORDIUM_NODE_CONNECTION_HARD_CONNECTION_LIMIT=20
         # Number of threads to use to process network events. This should be
         # adjusted based on the resources the node has (in combination with
         # `CONCORDIUM_NODE_BAKER_HASKELL_RTS_FLAGS`) below.
         - CONCORDIUM_NODE_CONNECTION_THREAD_POOL_SIZE=2
         # The bootstrapping interval in seconds. This makes the node contact the
         # specified bootstrappers at a given interval to discover new peers.
         - CONCORDIUM_NODE_CONNECTION_BOOTSTRAPPING_INTERVAL=1800
         # Haskell RTS flags to pass to consensus. `-N2` means to use two threads
         # for consensus operations. `-I0` disables the idle garbage collector
         # which reduces CPU load for non-baking nodes.
         - CONCORDIUM_NODE_BAKER_HASKELL_RTS_FLAGS=-N2,-I0
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
       - "10001:10001"
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
         - CONCORDIUM_NODE_COLLECTOR_GRPC_HOST=http://testnet-node:10001
       entrypoint: ["/node-collector"]

1. Save the contents as ``testnet-node.yaml``.
2. Possibly modify the **volume mount** to map the database directory to a different location on the host system. The volume mount is the following section.

   .. code-block:: yaml

      volumes:
         # The node's database should be stored in a persistent volume so that it
         # survives container restart. In this case we map the **host** directory
         # /var/lib/concordium-testnet to be used as the node's database directory.
         - /var/lib/concordium-testnet:/mnt/data

3. Modify the node name that appears on the network dashboard. This is set by
   the environment variable

   .. code-block:: yaml

      - CONCORDIUM_NODE_COLLECTOR_NODE_NAME=docker-test

   This name can be set to any non-empty string. If the name has spaces it should be quoted.

4. Start the node and the collector.

   .. code-block:: console

      $docker-compose -f testnet-node.yaml up

The configuration starts two containers, one running the node, and another
running the node collector that reports the node state to the network dashboard.

If you wish to have the node running in the background, then add a ``-d`` option to the above command.

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

       image: concordium/testnet-node:4.2.3-0

Enable inbound connections
==========================

If you are running your node behind a firewall, or behind your home
router, then you will probably only be able to connect to other nodes,
but other nodes will not be able to initiate connections to your node.
This is perfectly fine, and your node will fully participate in the
Concordium network. It will be able to send transactions and,
:ref:`if so configured<become-a-baker>`, to bake and finalize.

However you can also make your node an even better network participant by
enabling inbound connections. The sample configuration above makes the node
listen on port ``8889`` for inbound connections. Depending on your network and
platform configuration you will either need to forward an external port to
``8889`` on your router, open it in your firewall, or both. The details of how
this is done will depend on your configuration.

Retrieve node logs
------------------

The sample configuration presented above logs data using Docker's default
logging infrastructure. To retrieve the logs for the node run:

.. code-block:: console

      $docker logs testnet-node

This outputs the logs to ``stdout``.

Run a mainnet node
==================

The same steps apply as for the testnet node, except the following sample
configuration file should be used.

The main differences from the testnet configuration are:

- the image used is the mainnet image. See `hub.docker.com/concordium/mainnet-node
  <https://hub.docker.com/r/concordium/mainnet-node>`_
  for a list of currently available versions.
- the node listens on port 8888 instead of 8889 by default
- the node's GRPC interface is exposed on port 10000 instead of 10001
- the database directory is ``/var/lib/concordium-mainnet`` instead of
  ``/var/lib/concordium-testnet``

To retrieve mainnet node logs run:

.. code-block:: console

   $docker logs mainnet-node

.. code-block:: yaml

   # This is an example configuration for running the mainnet node
   version: '3'
   services:
     mainnet-node:
       container_name: mainnet-node
       image: concordium/mainnet-node:latest
       pull_policy: always
       environment:
         # Environment specific configuration
         # The url where IPs of the bootstrap nodes can be found.
         - CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES=bootstrap.mainnet.concordium.software:8888
         # Where the genesis is located
         - CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE=/mainnet-genesis.dat
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
         # Address of the GRPC server
         - CONCORDIUM_NODE_RPC_SERVER_ADDR=0.0.0.0
         # And its port
         - CONCORDIUM_NODE_RPC_SERVER_PORT=10000
         # Address of the V2 GRPC server
         - CONCORDIUM_NODE_GRPC2_LISTEN_PORT=0.0.0.0
         # And its port
         - CONCORDIUM_NODE_GRPC2_LISTEN_ADDRESS=20000
         # Maximum number of __connections__ the node can have. This can temporarily be more than
         # the number of peers when incoming connections are processed. This limit
         # ensures that there cannot be too many of those.
         - CONCORDIUM_NODE_CONNECTION_HARD_CONNECTION_LIMIT=20
         # Number of threads to use to process network events. This should be
         # adjusted based on the resources the node has (in combination with
         # `CONCORDIUM_NODE_BAKER_HASKELL_RTS_FLAGS`) below.
         - CONCORDIUM_NODE_CONNECTION_THREAD_POOL_SIZE=2
         # The bootstrapping interval in seconds. This makes the node contact the
         # specified bootstrappers at a given interval to discover new peers.
         - CONCORDIUM_NODE_CONNECTION_BOOTSTRAPPING_INTERVAL=1800
         # Haskell RTS flags to pass to consensus. `-N2` means to use two threads
         # for consensus operations. `-I0` disables the idle garbage collector
         # which reduces CPU load for non-baking nodes.
         - CONCORDIUM_NODE_BAKER_HASKELL_RTS_FLAGS=-N2,-I0
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
       - "10000:10000"
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
         - CONCORDIUM_NODE_COLLECTOR_GRPC_HOST=http://mainnet-node:10000
       entrypoint: ["/node-collector"]

.. _migration-docker-distribution:

Migration from the previous Docker distribution
===============================================

In the past Concordium provided a ``concordium-software`` package which
contained a ``concordium-node`` binary which orchestrated downloading a Docker
image and running the node. To migrate from that setup:

1. Stop the running node (e.g., using ``concordium-node-stop``)
2. Either modify the relevant example configuration file above by mapping the
   existing node database directory for use by the new container, i.e., replacing

   .. code-block:: yaml

          - /var/lib/concordium-mainnet:/mnt/data

   with

   .. code-block:: yaml

          - ~/.local/share/concordium:/mnt/data

   Or, alternatively, moving the contents of ``~/.local/share/concordium`` to,
   e.g., ``/var/lib/concordium-mainnet`` and keeping the configuration files as
   they are.
3. If your node is an existing baker node, update the configuration file above to include

   .. code-block:: yaml

      - CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=/mnt/data/baker-credentials.json

   into the ``environment`` section of the ``node`` service section of the file.
4. Start the node and the collector.

   .. code-block:: console

      $docker-compose -f mainnet-node.yaml up

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

       image: concordium/mainnet-node:4.3.1-0


Troubleshooting
===============

The above configuration describes a basic configuration and has been tested on
Ubuntu 20.04. Other Linux distributions might require some modifications. Below
are some common issues.

Mounting host directories under SELinux
---------------------------------------

When mounting host directories on distributions running `SELinux <https://en.wikipedia.org/wiki/Security-Enhanced_Linux>`_ special considerations apply.
In particular, this includes Fedora and its derivatives. See `the Docker documentation <https://docs.docker.com/storage/bind-mounts/#configure-the-selinux-label>`_ for details on how to proceed.

Letting the node container access the internet
----------------------------------------------

Some Linux distributions whose firewall is not based on iptables, Fedora and
CentOS among them, require additional steps to allow docker containers to access
external networks, e.g., the internet.

On Fedora run the following command to allow docker containers to access external networks.

.. code-block:: console

   $sudo firewall-cmd --permanent --zone=trusted --add-interface=docker0

Note that this will allow any Docker container access to the internet,
not just the Concordium node.

Some users on Ubuntu have reported the node does not have internet access. In this case, adding `network_mode: bridge` to each service might solve this problem:

.. code-block:: yaml
   :emphasize-lines: 4, 8

   services:
     mainnet-node:
       container_name: mainnet-node
       network_mode: bridge
       ...
     mainnet-node-collector:
       container_name: mainnet-node-collector
       network_mode: bridge
       ...

