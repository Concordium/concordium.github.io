.. _advanced-node-configuration-on-windows:

======================================
Advanced node configuration on Windows
======================================

.. Note::
   If the node is `configured with TLS <https://github.com/Concordium/concordium-node/blob/main/docs/grpc2.md#grpc-api-v2>`_, then `CONCORDIUM_NODE_COLLECTOR_GRPC_HOST` must be configured such that it uses the domain of the certificate, for example, ``CONCORDIUM_NODE_COLLECTOR_GRPC_HOST=https://example.concordium-node.io:20000``.

.. _verify-running-node:

Verify that the node is running
===============================

The node runs as a background service with no user interface. To verify that it’s running, use the **Task Manager**.

#. Search for *task* in the **Search** bar, and then select **Task Manager**.
#. Select the **Details** tab, and verify that the following are running:

   - ``node-runner-service.exe``, which is the service.
   - ``concordium-node.exe`` for each node you are running. For example, if you’re running a node on both testnet and mainnet, you’ll see two instances of concordium-node.exe.
   - ``node-collector.exe`` for each node that reports to the network dashboard.

     .. image:: ../images/Node-setup-win-4.png
         :width: 60%

#. Select the **Services** tab and verify that ``ConcordiumNode`` is running.

     .. image:: ../images/Node-setup-win-5.png
         :width: 60%

#. If the node is running properly and reporting to the network dashboards, you can see it on the dashboard.

   - https://dashboard.mainnet.concordium.software/

   - https://dashboard.testnet.concordium.com/

Enable inbound connections
==========================

If you are running your node behind a firewall, or behind your home router, then you will probably only be able to connect to other nodes, but other nodes will not be able to initiate connections to your node. This is perfectly fine, and your node will fully participate in the Concordium network. It will be able to send transactions and, :ref:`if so configured<become-a-validator>`, to produce blocks.

However you can also make your node an even better network participant by enabling inbound connections. By default, ``concordium-node`` listens on port ``8888`` for inbound connections on **Mainnet** and on port ``8889`` for inbound connections on **Testnet**. Depending on your network and platform configuration you will either need to forward an external port to ``8888`` or ``8889`` on your router, open it in your firewall, or both. The details of how this is done will depend on your configuration. See :ref:`Concordium Windows node runner service configuration<node-runner-service-configuration>` for more information.

Connect a node to the Desktop Wallet
====================================

You can also verify that a node is running by connecting it to the Desktop Wallet.

#. In the Desktop Wallet, go to **Settings**, and then select **Node settings**.

   - If you're running the mainnet version of the Desktop Wallet, you must connect to a mainnet node. In the **Address field**, enter *127.0.0.1* and in the **Port field** enter *20000*.

   - If you're running the testnet version of the Desktop Wallet, you must connect to a testnet node. In the **Address** field, enter *127.0.0.1* and in the **Port field** enter *20001*.

     .. image:: ../images/Node-setup-win-9.png
         :width: 60%

#. Select **Set connection**. If the connection works and the node is running properly, there’s a message saying *Successfully connected*.

Change the node startup settings
================================

If you want to change whether the node runner service starts automatically, you can use the Services app.

#. Search for *services* in the **Search** bar, and then select **Services**.

#. Right-click **Concordium Node Runner Service**, and then select **Properties**.

   .. image:: ../images/Node-setup-win-6.png
         :width: 50%

#. On the **General** tab, select the relevant **Startup type** from the list, and then select **OK** or **Apply**.

.. _configure-node:

Configure the Concordium Node Service
=====================================

You can change the mainnet or testnet node configuration with the Configure Concordium Node Service.

-  Search for *configure concordium node* in the **Search** bar, and then select **Configure Concordium Node Service**. If you see a message saying *Do you want to allow this app to make changes to your device?*, select **Yes**. The configuration file opens in Notepad.

For more information, see :ref:`Concordium Windows node runner service configuration<node-runner-service-configuration>`.

.. _view-windows-node-log:

Synchronize a node with the network
===================================

When you start a node for the first time, it can take a while to synchronize
the node with the rest of the network, since it has to get all blocks from
its peers. That is why all node distributions since 6.1 come with out of band
catchup enabled. This will speed up the initial catchup and during out of
band catchup the node will not have any peers.

The out of band catchup can be kept enabled even after the node is caught up,
but is not necessary. If you wish to disable it do the the following:

#. Search for *configure concordium node* in the **Search** bar, and then select **Configure Concordium Node Service**. The configuration file opens in **Notepad**.

#. Remove the environment variables from the configuration file:

   - For mainnet, remove the following line from the ``[node.mainnet]`` section:

   .. code-block:: toml

      node.env.CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM = 'https://catchup.mainnet.concordium.software/blocks.idx'

   - For testnet, remove the following line from the ``[node.testnet]`` section:

   .. code-block:: toml

      node.env.CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM = 'https://catchup.testnet.concordium.com/blocks.idx'

   Save the configuration file.

#. In the **Search** bar, search for and select **Stop Concordium Service Node** to stop the node, and then search for and select **Start Concordium Service Node** to restart the node.

