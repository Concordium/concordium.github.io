.. _run-node-ubuntu:

.. contents::
   :local:
   :backlinks: none

==================================
Run a node on a server with Ubuntu
==================================

This guide describes how organizations can run a node on the Concordium network from a server and how to set up the node to run as a :ref:`baker node<baker-node-Ubuntu>`.

Prerequisites
=============

-  Ubuntu 20.04 must be installed on the server that is running the node.

-  The server must be running around the clock.

-  If you want to run the node as a baker, you must have generated baker keys.You can generate the keys in the Desktop Wallet. See :ref:`create-baker-desktop`.

Install the Debian package and run a node
-----------------------------------------

To run the node, you must install a Debian package. After installation, the ``concordium-node`` and ``concordium-node-collector`` services will be started.

#. Download the Debian package.

#. Install the package:

   .. code-block:: console

    sudo apt install /path-to-downloaded-package

  Where ``path-to-downloaded-package`` is the location of the downloaded ``.deb`` file.

  The path should be absolute, e.g., ``./concordium-node.deb``, otherwise ``apt`` will assume that you want to install a package from the registry.

3. Enter a ``node name`` when prompted. The node name is visible on the network dashboard. When you have installed the services, the ``concordium-node`` will be running automatically.

#. To verify that the node is running, go to the `Concordium dashboard <https://dashboard.mainnet.concordium.software/>`__ and look for a node with the name you provided.

The ``concordium-node`` service that you just installed will be running around the clock, except if you’re going to restart the node with baker keys.

.. Note::
   If you want more detailed information about building and maintaining a node, or if your node is not running, see the `Building .deb packages for ubuntu distributions README from Concordium <https://github.com/Concordium/concordium-node/blob/main/scripts/distribution/ubuntu-packages/README.md>`__

.. _baker-node-Ubuntu:

Run a baker node on Ubuntu
==========================

The following steps show you how to run a node as a :ref:`baker <baker-concept>` on a server that participates in the Concordium network. When a node is a baker node, it receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network.

Configure the node with baker keys
----------------------------------

#. Move the JSON file with the baker keys you generated in the :ref:`Desktop Wallet <create-baker-desktop>` to the server that's running the node. Ensure that you have write permissions to the file. Store it, for example, in ``/var/lib/concordium/baker-credentials.json``.

#. In the terminal, enter:

   .. code-block:: console

      sudo systemctl edit concordium-node.service

#. Add the following snippet to the opened file (the file is empty the first time you open it):

   .. code-block:: console

      [Service]

      Environment=BAKER_CREDENTIALS_FILE=</var/lib/concordium/baker-credentials.json>

   Where you replace the path with the actual location of the file.

#. Save the edited file.

#. Restart for the changes to take effect. Enter:

   .. code-block:: console

      sudo systemctl restart concordium-node.service

#. To verify the node is running, enter:

   .. code-block:: console

      sudo systemctl status concordium-node

Verify that a node is a baker node.
-----------------------------------

Two epochs (link) must have elapsed before you can see the baker ID of the node on the dashboard.

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
