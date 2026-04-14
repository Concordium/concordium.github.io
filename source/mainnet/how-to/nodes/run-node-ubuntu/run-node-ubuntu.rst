.. _run-node-ubuntu:

===================================
Install and manage a node on Ubuntu
===================================

This article explains how to run a Concordium node on Linux (Ubuntu) on mainnet or testnet, and how to set up your node as a :ref:`validator node<baker-node-Ubuntu>`.

An account is not required to run a node, but you will need one if you want to become a validator.

You can also watch the video to learn how to run a node with Ubuntu OS.

.. raw:: html

   <iframe width="560" height="315" src="https://www.youtube.com/embed/DmemZsdcdHQ"
   title="YouTube video player" frameborder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
   allowfullscreen></iframe>

Prerequisites
=============

-  Ubuntu 22.04, 24.04 or 25.04 must be installed on the server that is running the node.
-  The server must be running around the clock.
-  Meet the :ref:`minimum system requirements<node-requirements>` for running a node.

Installing and running Concordium Node on Ubuntu
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
  The dollar sign (``$``) in a codeblock means that you should run the command that follows the ``$`` in a terminal.

.. dropdown:: Mainnet

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

  #. To verify that the node is running, go to the nodes page on `CCDScan <https://ccdscan.io/nodes>`__ and look for a node with the name you provided.

  The ``concordium-mainnet-node`` service that you just installed will be running around the clock, except if you’re going to restart the node with validator keys.

  .. Note::
    If you want more detailed information about building and maintaining a node, or if your node is not running, see the `Building .deb packages for ubuntu distributions README from Concordium <https://github.com/Concordium/concordium-node/blob/main/scripts/distribution/ubuntu-packages/README.md>`__

.. dropdown:: Testnet

  To run the node, you must install a Debian package.
  After installation, the ``concordium-testnet-node`` and ``concordium-testnet-node-collector`` services will be started.
  The services are also enabled to start automatically on system start.

  #. Download the :ref:`Debian package <testnet-node-downloads>`

  #. Install the package:

      .. code-block:: console

        $sudo apt install /path-to-downloaded-package

      Where ``path-to-downloaded-package`` is the location of the downloaded ``.deb`` file.

      The path should be absolute, e.g., ``./concordium-testnet-node.deb``, otherwise ``apt`` will assume that you want to install a package from the registry.

  3. Enter a ``node name`` when prompted. The node name is visible on the network dashboard. When you have installed the services, the ``concordium-testnet-node`` will be running automatically.

  #. To verify that the node is running, go to the nodes page on `CCDScan for testnet <https://testnet.ccdscan.io/nodes/>`__ and look for a node with the name you provided.


  The ``concordium-testnet-node`` service that you just installed will be running around the clock, except if you’re going to restart the node with validator keys.

  .. Note::
    If you want more detailed information about building and maintaining a node, or if your node is not running, see the `Building .deb packages for ubuntu distributions README from Concordium <https://github.com/Concordium/concordium-node/blob/main/scripts/distribution/ubuntu-packages/README.md>`__

.. _upgrade-node-Ubuntu:

Upgrading Concordium Node Version on Ubuntu
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. Note::
  When upgrading your Concordium node, it is generally possible to upgrade directly to the latest version without upgrading through each intermediate version. However, if you wish to download previous node versions, see :ref:`Previous node versions<previous-downloads>`.

To upgrade to a newer version of the ``concordium-node`` package you need to:

On the **Mainnet**, you can install the new package with:

.. code-block:: console

    $sudo apt install ./concordium-mainnet-node_(version)_amd64.deb

On the **Testnet**, you can install the new package with:

.. code-block:: console

    $sudo apt install ./concordium-testnet-node_(version)_amd64.deb

This step performs automatic database migration, so that the new node doesn't have to catch up from scratch. After installation is completed, the node and
the collector are started as before.

Uninstall Concordium Node on Ubuntu
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To fully remove Concordium Node and all its data from your system:

1. **Uninstall the node package:**

   .. code-block:: console

      $sudo apt purge concordium-mainnet-node

2. **Delete the database directories for Mainnet and Testnet:**

   The node stores data in the following default directories (accessible only to root):

   - **Mainnet:** ``/var/lib/private/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478``
   - **Testnet:** ``/var/lib/private/concordium-4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796``

   You may also find matching symbolic links in ``/var/lib/``.

   Remove them with:

   .. code-block:: console

      $sudo -i
      $rm -rf /var/lib/concordium-* /var/lib/private/concordium-*
      $exit

.. warning::

   Deleting these directories is irreversible and will remove all blockchain data and node state on your machine.

.. _baker-node-Ubuntu:

Run a validator node on Ubuntu
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For information about how to configure a node to run as a validator, see :ref:`Import validator keys <import-validator-keys>`.
