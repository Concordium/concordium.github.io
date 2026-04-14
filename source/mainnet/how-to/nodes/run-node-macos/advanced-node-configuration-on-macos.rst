.. _advanced-node-configuration-on-macOS:

====================================
Advanced node configuration on macOS
====================================

.. Note::
   If the node is `configured with TLS <https://github.com/Concordium/concordium-node/blob/main/docs/grpc2.md#grpc-api-v2>`_, then `CONCORDIUM_NODE_COLLECTOR_GRPC_HOST` must be configured such that it uses the domain of the certificate, for example, ``CONCORDIUM_NODE_COLLECTOR_GRPC_HOST=https://example.concordium-node.io:20000``.

Verify that the node is running
===============================

The node runs as a background service with no user interface. To verify that it's running, use the **Activity Monitor**.

#. Open the **Activity Monitor** application from the LaunchPad.

#. Look at the list and verify that the following is running:

   - ``concordium-node`` for each node you are running. For example, if you're running a node on both testnet and mainnet, you'll see two instances of concordium-node.

   - ``node-collector`` for each node that reports to a network dashboard.

#. If the node is running properly with reporting to the network dashboard enabled, you can see the name of the node on the `CCDScan for the mainnet <https://ccdscan.io/>`_ or the `CCDScan for the testnet <https://testnet.ccdscan.io/>`_.

Connect a node to the Desktop Wallet
====================================

You can also verify that a node is running by connecting it to the Desktop Wallet.

#. In the Desktop Wallet, go to **Settings**, and then select **Node settings**.

   - If you're running the **mainnet** version of the Desktop Wallet, you must connect to a mainnet node. In the **Address field**, enter ``127.0.0.1`` and in the **Port field** enter ``20000``.

   - If you're running the **testnet** version of the Desktop Wallet, you must connect to a testnet node. In the **Address field**, enter ``127.0.0.1`` and in the **Port field** enter ``20001``.

#. Select **Set connection**. If the connection works and the node is running properly, there’s a message saying *Successfully connected*.

Enable inbound connections
==========================

If you are running your node behind a firewall, or behind your home
router, then you will probably only be able to connect to other nodes,
but other nodes will not be able to initiate connections to your node.
This is perfectly fine, and your node will fully participate in the
Concordium network. It will be able to send transactions and,
:ref:`if so configured<become-a-validator>`, to produce blocks.

However you can also make your node an even better network participant
by enabling inbound connections. By default, ``concordium-node`` listens
on port ``8888`` for inbound connections on **Mainnet** and on port ``8889`` for inbound connections on **Testnet**. Depending on your network and
platform configuration you will either need to forward an external port
to ``8888`` or ``8889`` on your router, open it in your firewall, or both. The
details of how this is done will depend on your configuration.

Synchronize a node with the network
===================================

When you start a node for the first time, it can take a while to synchronize
the node with the rest of the network, since it has to get all blocks from
its peers. That is why all node distributions since 6.1 come with out of band
catchup enabled. This will speed up the initial catchup and during out of
band catchup the node will not have any peers.

The out of band catchup can be kept enabled even after the node is caught up,
but is not necessary. If you wish to disable it do the following:

#. Remove the environment variables from the configuration file:

   - For mainnet:

     - Edit ``"/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist"`` as an
       administrator and remove the following in the *EnvironmentVariables* section:

       .. code-block:: xml

         <key>CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM</key>
         <string>https://catchup.mainnet.concordium.software/blocks.idx</string>

   - For testnet:

     - Edit ``"/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node.plist"`` as an
       administrator and remove the following in the *EnviromentVariables* section:

       .. code-block:: xml

         <key>CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM</key>
         <string>https://catchup.testnet.concordium.com/blocks.idx</string>

#. Restart the appropriate node by running the application **Concordium Node Stop [Mainnet/Testnet]** (if running) and then
   **Concordium Node Start [Mainnet/Testnet]**.

.. _change-node-settings:

Change the node startup settings
================================

If you want to change whether the node services start automatically, you have two options.

- If you're not familiar with using a terminal, the easiest option is to reinstall the macOS node and configure it differently.

- If you're familiar with using a terminal, the following options are available:

  .. note::
     The dollar sign (``$``) in a codeblock means that you should run the command that follows the ``$`` in a terminal.

  - Enable automatic startup of the *node* by running:

    - For mainnet:

      .. code-block:: console

          $sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist" "/Library/LaunchDaemons/"

    - For testnet:

      .. code-block:: console

          $sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node.plist" "/Library/LaunchDaemons/"

  - Enable automatic startup of the *node-collector* by running:

    - For mainnet:

      .. code-block:: console

         $sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node-collector.plist" "/Library/LaunchDaemons/"

    - For testnet:

      .. code-block:: console

         $sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node-collector.plist" "/Library/LaunchDaemons/"

  - Disable automatic startup of the *node* by running:

    - For mainnet:

      .. code-block:: console

         $sudo rm "/Library/LaunchDaemons/software.concordium.mainnet.node.plist"

    - For testnet:

      .. code-block:: console

         $sudo rm "/Library/LaunchDaemons/software.concordium.testnet.node.plist"

  - Disable automatic startup of *node-collector* by running:

    - For mainnet:

      .. code-block:: console

         $sudo rm "/Library/LaunchDaemons/software.concordium.mainnet.node-collector.plist"

    - For testnet:

      .. code-block:: console

         $sudo rm "/Library/LaunchDaemons/software.concordium.testnet.node-collector.plist"

.. _node-collector-configuration-macos:

