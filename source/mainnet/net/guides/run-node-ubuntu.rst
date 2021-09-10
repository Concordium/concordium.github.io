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


Upgrade from version 1.0.1 to 1.1.0
===================================

To upgrade from version `1.0.1` of the `concordium-node` package to version `1.1.0` of the `concordium-mainnet-node` package
package you need to

1. Remove the existing package

   .. code-block:: console

    apt remove --purge concordium-node

  This will stop the node and remove all the installed files, but it will keep the database files and any files you might have added to the node's configuration and data directories.

2. Install the new package

   .. code-block:: console

    apt install ./concordium-mainnet-node_1.1.0_amd64.deb

  This step will perform automatic database migration, so that the new node will
  not have to catch up from scratch. After installation is completed, the node and
  the collector will be started as before.

Changes to node management in version 1.1.0
-------------------------------------------

There are two main differences from version 1.0.1.

1. The services are named `concordium-mainnet-node` and
   `concordium-mainnet-node-collector` instead of `concordium-node` and
   `concordium-node-collector`. This means that all
   `journalctl` and `systemctl` commands must use the new service names. Any
   drop-in files that you may have will need to be moved and updated, e.g., the
   node settings overrride should be renamed from the old
   `/etc/systemd/system/concordium-node.service.d/override.conf` to
   `/etc/systemd/system/concordium-mainnet-node.service.d/override.conf`

2. The environment variables that are used to configure the node have been renamed.
   There is no longer a `concordium-node-wrapper` script, instead the  node binary directly supports configuration via environment variables.
   See `Building .deb packages for Ubuntu distributions README from Concordium <https://github.com/Concordium/concordium-node/tree/main/scripts/distribution/ubuntu-packages#configuration-of-the-node>`__ for details and the most common environment variables to adjust.

Install the Debian package and run a node
-----------------------------------------

To run the node, you must install a Debian package.
After installation, the ``concordium-mainnet-node`` and ``concordium-mainnet-node-collector`` services will be started.
The services are also enabled to start automatically on system start.

#. Download the :ref:`Debian package <downloads>`

#. Install the package:

   .. code-block:: console

    sudo apt install /path-to-downloaded-package

  Where ``path-to-downloaded-package`` is the location of the downloaded ``.deb`` file.

  The path should be absolute, e.g., ``./concordium-mainnet-node.deb``, otherwise ``apt`` will assume that you want to install a package from the registry.

3. Enter a ``node name`` when prompted. The node name is visible on the network dashboard. When you have installed the services, the ``concordium-mainnet-node`` will be running automatically.

#. To verify that the node is running, go to the `Concordium dashboard <https://dashboard.mainnet.concordium.software/>`__ and look for a node with the name you provided.

The ``concordium-mainnet-node`` service that you just installed will be running around the clock, except if you’re going to restart the node with baker keys.

.. Note::
   If you want more detailed information about building and maintaining a node, or if your node is not running, see the `Building .deb packages for ubuntu distributions README from Concordium <https://github.com/Concordium/concordium-node/blob/main/scripts/distribution/ubuntu-packages/README.md>`__

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

      sudo systemctl edit concordium-mainnet-node.service

#. Add the following snippet to the opened file (the file is empty the first time you open it):

   .. code-block:: console

      [Service]

      Environment=CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/baker-credentials.json
      BindReadOnlyPaths=/home/user/concordium/baker-credentials.json:%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/baker-credentials.json

   Where you replace the path `/home/user/concordium/baker-credentials.json` with the actual location of the file.

#. Save the edited file.

#. Restart for the changes to take effect. Enter:

   .. code-block:: console

      sudo systemctl restart concordium-mainnet-node.service

#. To verify the node is running, enter:

   .. code-block:: console

      sudo systemctl status concordium-mainnet-node.service

Verify that a node is a baker node.
-----------------------------------

Two :ref:`epochs <glossary>` must have elapsed before you can see the baker ID of the node on the dashboard.

You can use ``concordium-client`` to see the status of the node. For more information, see :ref:`Concordium Client <concordium_client>`.

.. code-block:: console

   $concordium-client raw GetNodeInfo

   ...

   Consensus type: "Active"

   ...

In the Desktop Wallet and the Mobile Wallet, a bread icon is added to
the account associated with the baker node. The bread icon appears as
soon as the transaction has been submitted. That is, before the two
epochs have elapsed.
