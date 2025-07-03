.. _advanced-node-configuration-on-ubuntu:

=====================================
Advanced node configuration on Ubuntu
=====================================

.. Note::
   If the node is `configured with TLS <https://github.com/Concordium/concordium-node/blob/main/docs/grpc2.md#grpc-api-v2>`_, then `CONCORDIUM_NODE_COLLECTOR_GRPC_HOST` must be configured such that it uses the domain of the certificate, for example, ``CONCORDIUM_NODE_COLLECTOR_GRPC_HOST=https://example.concordium-node.io:20000``.

Enable inbound connections
~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are running your node behind a firewall, or behind your home
router, then you will probably only be able to connect to other nodes,
but other nodes will not be able to initiate connections to your node.
This is perfectly fine, and your node will fully participate in the
Concordium network. It will be able to send transactions and,
:ref:`if so configured <import-validator-keys>`, to produce blocks.

However you can also make your node an even better network participant
by enabling inbound connections. By default, ``concordium-node`` listens
on port ``8888`` for inbound connections on **Mainnet**. Depending on your network and
platform configuration you will need to forward an external port
to ``8888`` on your router, open it in your firewall, or both. The
details of how this is done will depend on your configuration.

On the Testnet, ``concordium-node`` listens on port ``8889`` for inbound connections.

Synchronize a node with the network
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you start a node for the first time, it can take a while to synchronize
the node with the rest of the network, since it has to get all blocks from
its peers. That is why all node distributions since 6.1 come with out of band
catchup enabled. This will speed up the initial catchup and during out of
band catchup the node will not have any peers.

The out of band catchup can be kept enabled even after the node is caught up,
but is not necessary. To disable out of band catchup unset the ``CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM`` environment variable as shown in step 3 below:

  1. Stop the node if it is running

    .. code-block:: console

      $sudo systemctl stop concordium-mainnet-node.service

  2. Edit the node service configuration file

    .. code-block:: console

      $sudo systemctl edit concordium-mainnet-node.service

  3. Add the following under the ``[Service]`` section (create the section if it does not exist)

    .. code-block:: ini

      UnsetEnvironment=CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM

  4. Start the service again

    .. code-block:: console

      $sudo systemctl start concordium-mainnet-node.service

On the Testnet, the service responsible for the ``concordium-node`` is called ``concordium-testnet-node.service``

After the node is caught up remove the out of band catchup configuration to speed up further node restarts.

.. _changing-node-name-ubuntu:

Changing the node name
~~~~~~~~~~~~~~~~~~~~~~

If you want to change the node name, you need to edit the ``concordium-mainnet-node-collector.service`` service. You can edit your overrides with:

.. code-block:: console

  $ sudo systemctl edit concordium-mainnet-node-collector.service

This will open your overrides in your default editor. Below is an example for the node name ``MyValidatorNode``:

.. code-block:: ini

  [Service]
  Environment='CONCORDIUM_NODE_COLLECTOR_NODE_NAME=MyValidatorNode'

Save and restart the ``concordium-mainnet-node-collector.service`` service with

.. code-block:: console

  $ sudo systemctl restart concordium-mainnet-node-collector.service

On the Testnet, the service responsible for the node collector is called ``concordium-testnet-node-collector.service``

