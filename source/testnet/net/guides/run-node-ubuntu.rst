.. _run-node-ubuntu:

==================================
Run a node on a server with Ubuntu
==================================

.. contents::
   :local:
   :backlinks: none

This guide describes how organizations can run a node on the Concordium network from a server and how to set up the node to run as a :ref:`baker node<baker-node-Ubuntu>`.

You can also watch the video to learn how to run a node with Ubuntu.

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/lFqf0tgS_r0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Prerequisites
=============

-  Ubuntu 20.04 must be installed on the server that is running the node.

-  The server must be running around the clock.

-  If you want to run the node as a baker, you must have generated baker keys. You can generate the keys in the Desktop Wallet. See :ref:`create-baker-desktop`.

Install the Debian package and run a node
=========================================

To run the node, you must install a Debian package.
After installation, the ``concordium-testnet-node`` and ``concordium-testnet-node-collector`` services will be started.
The services are also enabled to start automatically on system start.

#. Download the :ref:`Debian package <downloads>`

#. Install the package:

   .. code-block:: console

    sudo apt install /path-to-downloaded-package

  Where ``path-to-downloaded-package`` is the location of the downloaded ``.deb`` file.

  The path should be absolute, e.g., ``./concordium-testnet-node.deb``, otherwise ``apt`` will assume that you want to install a package from the registry.

3. Enter a ``node name`` when prompted. The node name is visible on the network dashboard. When you have installed the services, the ``concordium-testnet-node`` will be running automatically.

#. To verify that the node is running, go to the `Concordium dashboard <https://dashboard.testnet.concordium.com/>`__ and look for a node with the name you provided.

.. Note::
   If the node is installed fresh, you can speed up initial catchup by downloading a batch of blocks and using `Out of band catchup <https://github.com/Concordium/concordium-node/blob/main/scripts/distribution/ubuntu-packages/README.md#out-of-band-catchup>`__.
   Testnet blocks can be downloaded from `catchup.testnet.concordium.com <https://catchup.testnet.concordium.com/blocks_to_import.mdb>`__.

The ``concordium-testnet-node`` service that you just installed will be running around the clock, except if you’re going to restart the node with baker keys.

.. Note::
   If you want more detailed information about building and maintaining a node, or if your node is not running, see the `Building .deb packages for ubuntu distributions README from Concordium <https://github.com/Concordium/concordium-node/blob/main/scripts/distribution/ubuntu-packages/README.md>`__

Enable inbound connections
==========================

If you are running your node behind a firewall, or behind your home
router, then you will probably only be able to connect to other nodes,
but other nodes will not be able to initiate connections to your node.
This is perfectly fine, and your node will fully participate in the
Concordium network. It will be able to send transactions and,
:ref:`if so configured<become-a-baker>`, to bake and finalize.

However you can also make your node an even better network participant
by enabling inbound connections. By default, ``concordium-node`` listens
on port ``8889`` for inbound connections on **Testnet**. Depending on your network and
platform configuration you will need to forward an external port
to ``8889`` on your router, open it in your firewall, or both. The
details of how this is done will depend on your configuration.

.. _upgrade-node-Ubuntu:

Upgrade version
===============

To upgrade to a newer version of the `concordium-testnet-node` package you need to:

- Install the new package

   .. code-block:: console

    apt install ./concordium-testnet-node_(version)_amd64.deb

  This step performs automatic database migration, so that the new node doesn't have to catch up from scratch. After installation is completed, the node and the collector are started as before.

.. _baker-node-Ubuntu:

Run a baker node on Ubuntu
==========================

The following steps show you how to run a node as a :ref:`baker <baker-concept>` on a server that participates in the Concordium network. A node receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network. In addition, a baker node also participates in the lottery and produces its own blocks. If the stake is high enough the baker node also participates in finalization.

Configure the node with baker keys
----------------------------------

#. Move the JSON file with the baker keys you generated in the :ref:`Desktop Wallet <create-baker-desktop>` to the server that's running the node.
   Store it, for example, in ``/home/user/concordium/baker-credentials.json``.

#. In the terminal, enter:

   .. code-block:: console

      sudo systemctl edit concordium-testnet-node.service

#. Add the following snippet to the opened file (the file is empty the first time you open it):

   .. code-block:: console

      [Service]

      Environment=CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/baker-credentials.json
      BindReadOnlyPaths=/home/user/concordium/baker-credentials.json:%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/baker-credentials.json

   Where you replace the path `/home/user/concordium/baker-credentials.json` with the actual location of the file.

#. Save the edited file.

#. Restart for the changes to take effect. Enter:

   .. code-block:: console

      sudo systemctl restart concordium-testnet-node.service

#. To verify the node is running, enter:

   .. code-block:: console

      sudo systemctl status concordium-testnet-node.service

Verify that a node is a baker node.
-----------------------------------

Two :ref:`epochs <glossary>` must have elapsed before you can see the baker ID of the node on the dashboard.

You can use ``concordium-client`` to see the status of the node. For more information, see :ref:`Concordium Client <concordium_client>`.

.. code-block:: console

   $concordium-client --grpc-port 10001 raw GetNodeInfo

   ...

   Consensus type: "Active"

   ...

In the Desktop Wallet and the Mobile Wallet, a bread icon is added to
the account associated with the baker node. The bread icon appears as
soon as the transaction has been submitted. That is, before the two
epochs have elapsed.
