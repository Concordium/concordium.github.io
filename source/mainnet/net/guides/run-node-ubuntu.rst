.. _run-node-ubuntu:

=============================================
Run a node on a server with Ubuntu on Mainnet
=============================================

This guide describes how organizations can run a node on the Concordium network from a server and how to set up the node to run as a :ref:`baker node<baker-node-Ubuntu>`.

You can also watch the video to learn how to run a node with Ubuntu.

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/lFqf0tgS_r0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Prerequisites
=============

-  Ubuntu 20.04 must be installed on the server that is running the node.

-  The server must be running around the clock.

-  If you want to run the node as a baker, you must have generated baker keys. You can generate the keys in the :ref:`Desktop Wallet <create-baker-desktop>` or :ref:`Concordium Client<become-a-baker>`.

Install the Debian package and run a node
=========================================

To run the node, you must install a Debian package.
After installation, the ``concordium-mainnet-node`` and ``concordium-mainnet-node-collector`` services will be started.
The services are also enabled to start automatically on system start.

#. Download the :ref:`Debian package <downloads>`

#. Install the package:

    .. code-block:: console

      $sudo apt install /path-to-downloaded-package

    Where ``path-to-downloaded-package`` is the location of the downloaded ``.deb`` file.

    The path should be absolute, e.g., ``./concordium-mainnet-node.deb``, otherwise ``apt`` will assume that you want to install a package from the registry.

3. Enter a ``node name`` when prompted. The node name is visible on the network dashboard. When you have installed the services, the ``concordium-mainnet-node`` will be running automatically.

#. To verify that the node is running, go to the `Concordium dashboard <https://dashboard.mainnet.concordium.software/>`__ and look for a node with the name you provided.

.. Note::
   If the node is well behind the head of the chain, you can speed up initial catchup by downloading a batch of blocks and using out of band catchup.

   1. Download mainnet blocks from `catchup.mainnet.concordium.software <https://catchup.mainnet.concordium.software/blocks_to_import.mdb>`__.
      The remaining steps assume that the file is stored in ``~/Downloads/blocks_to_import.mdb``.

   2. Stop the node if it is running

     .. code-block:: console

       $sudo systemctl stop concordium-mainnet-node.service


   3. Edit the node service configuration file

     .. code-block:: console

       $sudo systemctl edit concordium-mainnet-node.service

   4. Add the following under the ``[Service]`` section (create the section if it does not exist)

     .. code-block::

       Environment=CONCORDIUM_NODE_CONSENSUS_IMPORT_BLOCKS_FROM=%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/blocks_to_import.mdb
       BindReadOnlyPaths=~/Downloads/blocks_to_import.mdb:%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/blocks_to_import.mdb

   5. Start the service again

     .. code-block::

       $sudo systemctl start concordium-mainnet-node.service


  After the node is caught up remove the out of band catchup configuration to speed up further node restarts.

The ``concordium-mainnet-node`` service that you just installed will be running around the clock, except if you’re going to restart the node with baker keys.

.. Note::
   If you want more detailed information about building and maintaining a node, or if your node is not running, see the `Building .deb packages for ubuntu distributions README from Concordium <https://github.com/Concordium/concordium-node/blob/main/scripts/distribution/ubuntu-packages/README.md>`__

Enable inbound connections
==========================

If you are running your node behind a firewall, or behind your home
router, then you will probably only be able to connect to other nodes,
but other nodes will not be able to initiate connections to your node.
This is perfectly fine, and your node will fully participate in the
Concordium network. It will be able to send transactions and,
:ref:`if so configured<baker-ubuntu>`, to bake and finalize.

However you can also make your node an even better network participant
by enabling inbound connections. By default, ``concordium-node`` listens
on port ``8888`` for inbound connections on **Mainnet**. Depending on your network and
platform configuration you will need to forward an external port
to ``8888`` on your router, open it in your firewall, or both. The
details of how this is done will depend on your configuration.

.. _upgrade-node-Ubuntu:

Upgrade version
===============

.. Note::

   When upgrading, you can only upgrade one version higher (V+1) than your current version. You cannot skip versions. To download previous node versions, see :ref:`Previous node versions<previous-downloads>`.

To upgrade to a newer version of the `concordium-mainnet-node` package you need to:

#. Install the new package

   .. code-block:: console

    $apt install ./concordium-mainnet-node_(version)_amd64.deb

  This step performs automatic database migration, so that the new node doesn't have to catch up from scratch. After installation is completed, the node and
  the collector are started as before.

.. _baker-node-Ubuntu:

Run a baker node on Ubuntu
==========================

For information about how to configure a node to run as a baker, see :ref:`baker-ubuntu`.
