.. _migrate-network-specific-images:

=================
Migrate to Docker
=================

.. admonition:: At a glance

   Move a node from a network-specific image to the ``concordium/node`` Docker image.
   You need Docker Compose and disk space for a state copy.
   After this procedure, the new container uses your existing node state and settings.

.. note::

   This guide uses the setup in :ref:`install-node-docker-image` as the destination.
   If you use different paths, filenames, service names, or ports, adjust the
   commands and examples. Use the actual paths of your old installation as the source.

This guide applies to ``concordium/mainnet-node`` and ``concordium/testnet-node``
with host bind mounts. For Debian packages, use :ref:`migrate-debian-to-docker`.
Plan downtime. Keep the old Compose file, image, and original state for rollback.

1. Prepare the new configuration
================================

Create a separate ``mainnet-node/`` or ``testnet-node/`` directory.
Create ``compose.yaml`` from the matching example in :ref:`configure-docker-image`.
Open a terminal in this new directory. Run the remaining commands there.
Do not create ``data/`` or start the new node yet.

The new example sets the image, genesis path, bootstrap nodes, and catch-up URL
for your network. Copy your custom settings from the old Compose file:

- Keep your custom peer settings, runtime flags, and catch-up settings.
- Keep required port mappings. The new container uses gRPC port ``20000`` for
  both networks. Testnet maps host port ``20001`` to this port.
  The examples limit host gRPC access to loopback. Adjust access for remote clients.
- Keep required file mounts and update their container paths.
- Copy the collector name, backend URL, and custom collection settings into
  service ``node``. Remove the separate collector service and old node
  ``entrypoint`` override. The new image starts both processes.
- Do not copy the collector's old service-name-based gRPC endpoint.
  The default endpoint is ``http://127.0.0.1:20000`` inside the new container.
  Adjust it if you use TLS or a different container gRPC port.
- Use ``./data:/mnt/data`` for state. Remove overrides of old data and configuration directory when you use the image's shared ``/mnt/data`` default.

For validators, reuse the existing credentials with a separate read-only mount.
Find the host credentials file from the old Docker mounts. Use the credential
mounting instructions in :ref:`migrate-debian-to-docker`, not its systemd lookup
steps. Do not generate new keys or register the validator again.

Check the release notes for a supported upgrade from your installed version.
Check the new file and download its image:

.. code-block:: console

   $docker compose config --quiet
   $docker compose pull

2. Stop the old containers
==========================

Set ``path/to/mainnet-node.yaml`` to the absolute path of your old Compose file.
For testnet, use the old testnet file:

.. code-block:: console

   $docker compose -f path/to/mainnet-node.yaml stop --timeout 300
   $docker compose -f path/to/mainnet-node.yaml logs --tail 100

Check the logs for a clean shutdown before you remove the stopped containers:

.. code-block:: console

   $docker compose -f path/to/mainnet-node.yaml down

Make sure that no automatic process starts the old installation again.

.. warning::

   Do not use ``down --volumes`` on the old installation.
   Do not copy a running database.
   Do not run two nodes with the same validator credentials at the same time.

3. Copy the node state
======================

Find the old host directory mounted at ``/mnt/data`` in the old Compose file.
The copy command below uses ``/var/lib/concordium-mainnet`` from the old mainnet
example. Replace this path with your actual source path, including for testnet.

Run these commands beside the new ``compose.yaml``.

Create a new local state directory with access limited to its owner:

.. code-block:: console

   $mkdir -m 0700 data

Copy the database and saved node configuration from the old state directory:

.. code-block:: console

   $sudo cp -a /var/lib/concordium-mainnet/. ./data/

Give the new container's UID and GID ownership of the copied state:

.. code-block:: console

   $sudo chown -R 10001:10001 data

Limit access to the state directory to its new owner after copying:

.. code-block:: console

   $sudo chmod 0700 data

These commands change ownership only on the copy.
The Compose file and its parent directory keep your ownership.

If your old configuration and data use separate directories, use the collision
check and content-copy procedure in :ref:`migrate-debian-to-docker`.
Check symbolic links and additional file paths outside the copied directory.
Exporting state from an old named volume is outside this guide's scope.

4. Start and verify
===================

Start the new node from the directory that contains the replacement ``compose.yaml``:

.. code-block:: console

   $docker compose up --detach
   $docker compose logs --follow node

Check that the node uses the correct network and copied state without database
or permission errors. Check peers after catch-up and recent, advancing finalized
blocks. Check existing clients and collector dashboard reports separately.
The node continues to run if the collector stops.
For validators, check the expected identity and status as specified in
:ref:`import-validator-keys`.

If migration fails, stop the new node with ``docker compose stop``.
Check clean shutdown, then run ``docker compose down``.
Use the unchanged original state, not the copy that the new node modified.

Keep the original state until you accept the migration.
For later upgrades, use :ref:`upgrade-docker-image`.
