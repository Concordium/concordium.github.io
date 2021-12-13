.. _Discord: https://discord.gg/xWmQ5tp

.. _run-a-node:

======================
Run a node with Docker
======================

.. contents::
   :local:
   :backlinks: none

In this guide, you learn how to run a node on your Linux computer that
participates in the Concordium network. This means that you receive
blocks and transactions from other nodes, as well as propagate
information about blocks and transactions to the nodes in the Concordium
network. After following this guide, you will be able to

-  run a Concordium node
-  observe it on the network dashboard and
-  query the state of the Concordium blockchain directly from your
   machine.

You do not need an account to run a node.

Before you begin
================

Before running a Concordium node you will need to

1. Install and run Docker.

   -  On *Linux*, allow Docker to be run as a non-root user.

2. Download and extract the :ref:`full suite for running a node on Linux<concordium-docker-package-download>`.

Upgrading from version 1.0.1 to 1.1.3
=====================================

To upgrade do the following steps after downloading the new version.

1. Run the ``concordium-node-stop`` executable from the unzipped archive and
   wait for it to terminate. This might take a few seconds.

2. Start the node again by running the ``concordium-node`` executable from the
   unzipped archive. If your node is already caught up consider using
   ``--no-block-state-import`` to avoid downloading data you already have.

.. note::
   If your node does not show on the network dashboard after upgrading to 1.1.3,
   it could be that the node was started by the old version of the runner.
   The old version of the software does not configure the docker container correctly, and this
   misconfiguration can persist even if you then use the new version.
   To fix this:

   #. Ensure that you have downloaded and extracted the :ref:`latest version of the software<concordium-docker-package-download>`.

   #. Check the version by running ``concordium-node --help``. It should show 1.1.3.

   #. Stop any running node with ``concordium-node-stop``.

   #. Remove the misconfigured docker container with ``docker rm concordium-client``.

   #. Start the node again with ``concordium-node --no-block-state-import``.

.. _running-a-node:

Running a node
==============

To start running a client that will join the |Net| follow these
steps:

1. Open the ``concordium-node`` executable from the unzipped archive.

   -  When *restarting* a node consider using the
      ``--no-block-state-import`` option. This will download just the
      updates to the Concordium blockchain that occurred while the node was
      inactive and might speed up the boot process.

2. Enter a name for your node. This name will be displayed in the public
   dashboard.

3. If the tool has been started before you will be asked if you want to
   delete the local node database before starting. Pressing **y** will
   delete and subsequently recreate the information on the state of the
   Concordium blockchain that was saved on your computer. **Note that
   deleting the local node database means it will take longer for your
   node to catch-up with the Concordium network.**

The tool will now download the Concordium Client image and load it into
Docker. The client will launch and start outputting logging information
about the operation of the node.

Seeing your node on the dashboard
=================================

After running ``concordium-node`` you can

-  see your node on the `Network Dashboard`_
-  :ref:`query<testnet-query-node>` information about blocks, transactions, and accounts

Network dashboard
-----------------

It will take the client a while to catch up with the state of the
Concordium blockchain. This involves, for example, downloading
information about all the blocks in the chain.

Among other information, on the `Network Dashboard`_ you can
get an idea of how long it will take your node to catch up with the
chain. For that you can compare the node's **Length** value (number of
blocks your node received) with the **Total Length** value (number of
blocks in the longest chain in the network) which is displayed at the
top of the dashboard.


Enabling inbound connections
============================

If you are running your node behind a firewall, or behind your home
router, then you will probably only be able to connect to other nodes,
but other nodes will not be able to initiate connections to your node.
This is perfectly fine, and your node will fully participate in the
Concordium network. It will be able to send transactions and,
:ref:`if so configured<become-a-baker>`, to bake and finalize.

However you can also make your node an even better network participant
by enabling inbound connections. By default, ``concordium-node`` listens
on port ``8888`` for inbound connections. Depending on your network and
platform configuration you will either need to forward an external port
to ``8888`` on your router, open it in your firewall, or both. The
details of how this is done will depend on your configuration.

Configuring ports and tokens
----------------------------

The node listens on four ports, which can be configured by supplying the
appropriate command line arguments when starting the node. The ports
used by the node are as follows:

-  8888, the port for peer-to-peer networking, which can be set with
   ``--listen-node-port``
-  8082, the port used by middleware, which can be set with ``--listen-middleware-port``
-  8099, the port used by the node dashboard, which can be set with ``--listen-dashboard-port``
-  10000, the gRPC port for mainnet, which can be set with ``--listen-grpc-port``
-  10001, the gRPC port for testnet, which can be set with ``--listen-grpc-port``

An additional mapping is the gRPC token, which defaults to ``rpcadmin``, and can
be set with ``--rpc-server-token``.

When changing the mappings above the docker container must be
stopped (:ref:`stop-a-node`), reset, and started again. To reset the container either use
``concordium-node-reset-data`` or run ``docker rm concordium-client`` in
a terminal.

We strongly recommend that you configure your firewall to only
allow public connections on port 8888 (the peer-to-peer networking
port). Someone with access to the other ports might be able to take
control of your node or accounts you have saved on the node.

.. warning::

   Docker makes changes to the `iptable <https://en.wikipedia.org/wiki/Iptables>`_ on Linux, which means that it is not
   easy to block ports in practice.
   This is especially a problem `when using UFW
   <https://github.com/chaifeng/ufw-docker#problem>`_.
   Because the gRPC port is currently not considered secure, we strongly recommend changing the default gRPC token via the
   ``--rpc-server-token`` flag when running a node.
   This will provide reasonable security if the token is only ever used through
   a secure channel.

.. _stop-a-node:

Stopping the node
=================

To stop the node, press **CTRL+c**, and wait for the node to do a clean
shutdown.

If you accidentally close the window without explicitly shutting down
the client, it will keep running in the background in Docker. In that
case, use the ``concordium-node-stop`` binary in the same way you opened
the ``concordium-node`` executable.

Retrieve node logs
==================

Logging information for your node can be retrieved using the
``concordium-node-retrieve-logs`` tool. This will save logs from the
running image to a file. Additionally, if given permission, it will
retrieve information about the programs currently running on the system.
