==========
Run a Node
==========

.. contents::
   :local:
   :backlinks: none

In this guide, you learn how to run a node on your computer that
participates in the Concordium network. This means that you receive
blocks and transactions from other nodes, as well as propagate
information about blocks and transactions to the nodes in the Concordium
network. After following this guide, you will be able to

-  run a Concordium node
-  observe it on the network dashboard and
-  query the state of the Concordium blockchain directly from your
   machine.

You do not need an account to run a node.

.. _Before you begin: #before-you-begin
.. _Running a node: #running-a-node
.. _Seeing your node on the dashboard: #seeing-your-node-on-the-dashboard
.. _Enabling inbound connections: #enabling-inbound-connections
.. _Stopping the node: #stopping-the-node

Before you begin
================

Before running a Concordium node you will need to

1. Install and run Docker.

   -  On *Linux*, allow Docker to be run as a non-root user.

2. Download and extract the `Concordium Node and Client`_ software. This
   produces a directory named ``concordium-software``. Move this folder
   into the ``Documents`` folder of your home directory. It's very
   important that this directory is moved in its entirety and with the
   name unchanged. The final path should be
   ``$HOME/Documents/concordium-software/<executables>``.

Upgrade from an earlier version of Open Testnet
===============================================

To upgrade to the current Concordium software for Open Testnet 3:

-  Follow the above steps to `download`_ the most recent Concordium
   software.

-  Run the ``concordium-node-reset-data`` executable from the unzipped
   archive.

   -  For *Mac* users: the first time you open the tool, right-click the
      ``concordium-node-reset-data`` file and select **Open**. A message
      will appear that the software is from an unidentified developer.
      Select **Open** again.
   -  For *Windows* users: the first time you open the tool,
      double-click the ``concordium-node-reset-data`` file. A message
      will appear that the software is from an unidentified developer.
      Select **More info** → **Run anyway**.

-  The tool will ask:

      *Do you also want to remove saved keys?*

   Accounts that were created for prior versions are no longer valid on
   Open Testnet 3. Therefore, if you have stored accounts from prior
   versions we recommend entering **y** which will delete all account
   keys.

.. _Concordium Node and Client: /testnet/docs/downloads#concordium-node-and-client
.. _download: /testnet/docs/downloads#concordium-node-and-client

.. _my-reference-label:

Running a node
==============

To start running a client that will join the Open Testnet follow these
steps:

1. Open the ``concordium-node`` executable from the unzipped archive.

-  For *Mac* users: the first time you open the tool, right-click the
   ``concordium-node`` binary and select **Open**. A message will appear
   that the software is from an unidentified developer. Select **Open**
   again.
-  For *Windows* users: the first time you open the tool, double-click
   the ``concordium-node`` binary. A message will appear that the
   software is from an unidentified developer. Select **More info** →
   **Run anyway**.
-  When *restarting* a node consider using the
   ``--no-block-state-import`` option. This will download just the
   updates to the Concordium blockchain that occurred while the node was
   inactive and might speed up the boot process.

2. Enter a name for your node. This name will be displayed in the public
   dashboard.

3. If the tool has been started before you will asked if you want to
   delete the local node database before starting. Pressing **y** will
   delete and subsequently recreate the information on the state of the
   Concordium blockchain that was saved on your computer. **Note that
   deleting the local node database means it will take longer for your
   node to catch-up with the Concordium network.**

The tool will now download the Concordium Client image and load it into
Docker. The client will launch and start outputting logging information
about the operation of the node.

Seeing your node on the dashboards
==================================

After running ``concordium-node`` you can

-  see your node on the """ , networkDashboardLink , """
-  `query`_ information about blocks, transactions, and accounts

Network dashboard
-----------------

It will take the client a while to catch up with the state of the
Concordium blockchain. This involves, for example, downloading
information about all the blocks in the chain.

Among other information, on the """ , networkDashboardLink , """ you can
get an idea of how long it will take your node to catch up with the
chain. For that you can compare the node's **Length** value (number of
blocks your node received) with the **Chain Len** value (number of
blocks in the longest chain in the network) which is displayed at the
top of the dashboard.

.. _query: /testnet/docs/queries

Enabling inbound connections
============================

If you are running your node behind a firewall, or behind your home
router, then you will probably only be able to connect to other nodes,
but other nodes will not be able to initiate connections to your node.
This is perfectly fine, and your node will fully participate in the
Concordium network. It will be able to send transactions and, `if so
configured`_, to bake and finalize.

However you can also make your node an even better network participant
by enabling inbound connections. By default, ``concordium-node`` listens
on port ``8888`` for inbound connections. Depending on your network and
platform configuration you will either need to forward an external port
to ``8888`` on your router, open it in your firewall, or both. The
details of how this is done will depend on your configuration.

.. _if so configured: /testnet/docs/quickstart-baker

Configuring ports
-----------------

The node listens on four ports, which can be configured by supplying the
appropriate command line arguments when starting the node. The ports
used by the node are as follows:

-  8888, the port for peer-to-peer networking, which can be set with
   ``--listen-node-port``
-  8099, the port used by the node dashboard, which can be set with
   ``--listen-dashboard-port``
-  8082, the port used by middleware, which can be set with ``--listen-middleware-port``
-  10000, the gRPC port, which can be set with ``--listen-grpc-port``

When changing the mappings above the docker container must be
`stopped`_, reset, and started again. To reset the container either use
``concordium-node-reset-data`` or run ``docker rm concordium-client`` in
a terminal.

We *strongly recommend* that your firewall should be configured to only
allow public connections on port 8888 (the peer-to-peer networking
port). Someone with access to the other ports may be able to take
control of your node or accounts you have saved on the node. Remote
access to the node dashboard is not supported, but `see here`_ for a
workaround.

Stopping the node
=================

To stop the node, press **CTRL+c**, and wait for the node to do a clean
shutdown.

If you accidentally close the window without explicitly shutting down
the client, it will keep running in the background in Docker. In that
case, use the ``concordium-node-stop`` binary in the same way you opened
the ``concordium-node`` executable.

.. _stopped: #stopping-the-node
.. _see here: /testnet/docs/troubleshooting#node-dashboard-does-not-load

Support & Feedback
==================

Logging information for your node can be retrieved using the
``concordium-node-retrieve-logs`` tool. This will save logs from the
running image to a file. Additionally, if given permission, it will
retrieve information about the programs currently running on the system.

You can send your logs, system information, questions and feedback to
testnet@concordium.com. You can also reach out at our `Discord`_, or
check out our `Troubleshooting`_ page.

.. _Discord: https://discord.gg/xWmQ5tp
.. _Troubleshooting: /testnet/docs/troubleshooting
