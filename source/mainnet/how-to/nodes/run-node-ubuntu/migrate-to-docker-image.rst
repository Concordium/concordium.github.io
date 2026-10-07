.. _migrate-debian-to-docker:

=================
Migrate to Docker
=================

.. admonition:: At a glance

   Move an existing Ubuntu node to the Docker image on the same host.
   You need Docker Compose and disk space for a state copy.
   After this procedure, Docker uses a copy of your node data and configuration.

.. note::

   This guide uses the Docker setup in :ref:`install-node-docker-image` as the
   migration destination. If you change its paths, filenames, service names,
   or ports, adjust the commands and examples to match your setup.
   Use the actual paths and settings of your existing installation as the source.

The Debian distribution is deprecated.
The ``concordium/node`` Docker image contains the mainnet and testnet genesis files.
Select the network and its settings in the Compose file.

In this guide, state means the node data and configuration.
The procedure keeps the original Debian state unchanged for rollback.
Rollback means that you stop Docker and start the original installation again.
This procedure does not include different hosts or custom networks.
Plan a period when the node does not operate.

.. warning::

   Do not run two nodes with the same validator credentials at the same time.
   Stop and disable the old services before you start the Docker node.
   Do not generate new keys or send another validator registration transaction.

1. Find settings and prepare
============================

Check the prerequisites in :ref:`install-node-docker-image`.
The commands below use mainnet.
For testnet, replace ``mainnet`` with ``testnet`` in service names and the
network directory name. Both networks use ``compose.yaml`` and ``./data``.

Display the node service and its drop-in configuration files:

.. code-block:: console

   $sudo systemctl cat concordium-mainnet-node.service

Find the ``Environment=`` entries under ``[Service]``.
These entries set node environment variables.
The output identifies each file, including overrides created with
``systemctl edit``. Read later overrides before you copy a value.
An empty ``Environment=`` resets earlier entries.
``UnsetEnvironment=`` removes the specified variables.

Display the collector service to find its node name and backend settings:

.. code-block:: console

   $sudo systemctl cat concordium-mainnet-node-collector.service

Create a new network directory and ``compose.yaml`` from
:ref:`configure-docker-image`. Copy applicable values into the ``node`` service's
``environment`` mapping. For example, translate this collector entry:

.. code-block:: ini

   [Service]
   Environment="CONCORDIUM_NODE_COLLECTOR_NODE_NAME=My node"

Into this Compose entry:

.. code-block:: yaml

   environment:
     CONCORDIUM_NODE_COLLECTOR_NODE_NAME: "My node"

Keep the other environment entries from the Docker example.
Use section 2 below to select settings and translate paths.
Do not copy the ``Environment=`` prefix or systemd quoting into the YAML key.

2. Translate configuration
==========================

This guide assumes the Ubuntu package's default ``config/`` and ``data/``
directories. It covers only settings described in the Ubuntu installation and
:ref:`advanced configuration <advanced-node-configuration-on-ubuntu>` guides.
If you added other custom settings, migrate those settings separately.

Use the Compose example for your network from :ref:`configure-docker-image`.
Keep its genesis path, bootstrap nodes, ports, and collector backend URL.
The Docker image uses ``/mnt/data`` for both configuration and the database.
Do not add data or configuration directory overrides.
Section 3 copies the contents of the old directories into ``./data``.

Copy these settings where applicable:

- **Collector name:** Set ``CONCORDIUM_NODE_COLLECTOR_NODE_NAME`` to the name
  from the old collector service.
- **Catch-up:** If you disabled out-of-band catch-up, remove
  ``CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM`` from the Compose example.
  Otherwise, keep the example's network catch-up URL.
- **Inbound connections:** Keep firewall and router forwarding for port ``8888``
  on mainnet or ``8889`` on testnet. Check Docker's firewall behavior.
- **TLS:** If you configured gRPC TLS, mount the certificate and key files
  read-only and use their container paths. Set the collector's gRPC URL to
  match the certificate domain and container port ``20000``.
  See :ref:`advanced-docker-image`.
- **Validator credentials:** Follow section 4 to mount your existing keys.
  Do not generate or register new keys.

Convert the applicable ``Environment=`` values to Compose entries as shown in
section 1. Do not copy systemd directives or ``ExecStart`` into the Compose file.
Keep the image's default ``entrypoint`` so it can manage the node and collector.

The Compose examples limit host gRPC access to loopback.
If your clients connect remotely, configure trusted access as described in
:ref:`advanced-docker-image`.
Run the remaining commands beside ``compose.yaml``.
Do not start the node or run the new-node directory preparation steps yet.

3. Stop and copy state
======================

Find the old service's working directory before stopping it:

.. code-block:: console

   $sudo systemctl show concordium-mainnet-node.service -p WorkingDirectory

The package's default state root is ``/var/lib/concordium-<genesis-hash>``.
It contains the ``config/`` and ``data/`` directories.
The real directory can be under ``/var/lib/private/``.
A symbolic link in ``/var/lib/`` can refer to this directory.
Resolve the path with ``sudo readlink -f <path>`` and use that real state root
in the copy commands below. Do not copy only the symbolic link.
For testnet, use ``concordium-testnet-node.service``.

Stop and disable the old node and collector services:

.. code-block:: console

   $sudo systemctl disable --now concordium-mainnet-node-collector.service concordium-mainnet-node.service

Check that both services report ``inactive``. A nonzero exit status is expected
when they are inactive:

.. code-block:: console

   $sudo systemctl is-active concordium-mainnet-node.service concordium-mainnet-node-collector.service

Read the journal to confirm a clean shutdown. A timeout or forced stop is not
a clean shutdown:

.. code-block:: console

   $sudo journalctl -u concordium-mainnet-node.service -n 100 --no-pager

Make sure that no other process uses the same node or validator credentials.
Run the remaining commands beside the new ``compose.yaml``.
For testnet, use the testnet service names and network directory.

.. warning::

   Do not copy a database while the node runs.
   Do not merge the copy with an existing Docker database.
   Stop if any command fails or the destination already exists.
   Do not start the new node if the copy fails.

Replace ``/actual/resolved/concordium-state-directory`` in the copy commands
with the real state root found above.

Create a new ``data/`` directory with access limited to its owner:

.. code-block:: console

   $mkdir -m 0700 data

Copy the saved node configuration into ``data/``:

.. code-block:: console

   $sudo cp -a /actual/resolved/concordium-state-directory/config/. ./data/

Copy the database into the same directory. The ``-i`` option asks before
replacing an existing file. If an overwrite prompt appears, cancel the command
and resolve the conflicting names before you continue:

.. code-block:: console

   $sudo cp -ai /actual/resolved/concordium-state-directory/data/. ./data/

Give the container's UID and GID ownership of the copy:

.. code-block:: console

   $sudo chown -R 10001:10001 data

Limit access to the destination directory to its new owner:

.. code-block:: console

   $sudo chmod 0700 data

These commands use the package's default ``config/`` and ``data/`` directories.
They copy the contents without changing the original files or their ownership.
Check symbolic links to paths outside the bind mount.
Keep the original state for rollback.

4. Mount existing validator credentials (validators only)
=========================================================

1. Read the old service's credential setting and ``BindReadOnlyPaths`` mapping.
2. Find the real host credentials file.
   The path inside the service can differ from the host path.
3. Create a protected ``secrets`` directory beside the Compose file.
4. Copy the credentials to this directory.
   Use the same read-only mount as a new validator installation.

Use the existing file. Do not generate new keys or register them again.

.. code-block:: console

   $mkdir -m 0700 secrets
   $sudo install -o 10001 -g 10001 -m 0400 /actual/host/validator-credentials.json ./secrets/validator-credentials.json

5. Add these entries to the ``node`` service's existing mappings and lists:

.. code-block:: yaml

   environment:
     CONCORDIUM_NODE_VALIDATOR_CREDENTIALS_FILE: /run/secrets/validator-credentials.json
   volumes:
     - type: bind
       source: ./secrets/validator-credentials.json
       target: /run/secrets/validator-credentials.json
       read_only: true
       bind:
         create_host_path: false

Keep the other environment entries and the state mount.
The Docker daemon must run as root for this example.
The daemon mounts the file. The container's UID ``10001`` can read it.
This example does not include rootless Docker UID mappings.

.. warning::

   Do not give all users read access to validator credentials.
   Do not put validator credentials in a repository.

5. Start and verify
===================

1. Check the complete Compose file with ``config --quiet``.
2. Start the selected image with ``docker compose up --detach``.
3. Check the container status and logs.

.. code-block:: console

   $docker compose config --quiet
   $docker compose up --detach
   $docker compose ps
   $docker compose logs --follow node

Use the same local bind mount and shared directory as the installation guide.
Check that Compose uses the directory populated in section 3.
Keep ``stop_grace_period: 5m`` from the example.
Increase this period if your node needs more time to stop.
A forced stop is not a clean shutdown.

Complete these checks before you accept the migration:

- Check the logs for database, configuration, permission, genesis, and credential
  errors. Make sure that the node uses the correct network.
  Make sure that it loads the copied state, not a new database.
- Check peer connections after catch-up.
  Use ``concordium-client`` to check finalized blocks on host port ``20000``.
  For testnet, use port ``20001``.
  Make sure that the latest finalized block is recent and new blocks appear.
- Check existing local and remote clients against the correct endpoints.
- If you enabled the collector, check its logs and dashboard reports.
  The node continues to run if the collector stops.
  Container status alone does not show that the collector operates correctly.
- For validators, check that the node loads the credentials.
  Check the expected validator identity and status as specified in
  :ref:`import-validator-keys`.
  Committee participation depends on network state.
  Container status alone does not show that the validator operates correctly.

6. Roll back or retire the package
==================================

If a check fails, stop the Docker node first:

.. code-block:: console

   $docker compose stop
   $docker compose logs --tail 100 node
   $docker compose down

1. Check the logs for a clean shutdown.
2. Make sure that the container does not run.
3. Restore any service settings that you changed.
4. Start the original installation with its unchanged original state:

.. code-block:: console

   $ sudo systemctl enable --now concordium-mainnet-node.service concordium-mainnet-node-collector.service

Before you restart, check that the network still supports the old version.
The original node must get the blocks finalized during migration.

.. warning::

   Do not give the old binary the copy that Docker changed.
   The old binary might not read that database.

After all checks pass, monitor the new installation for your selected observation
period. Then, you can remove the old package:

.. code-block:: console

   $ sudo apt remove concordium-mainnet-node

Read the proposed package removal before you confirm it.
Keep original state, service configuration, and credentials as required by
your retention policy.
Do not use the deprecated guide's database deletion commands during migration.
Do not delete the new local state directory.
After package removal, you must install a suitable package again to use the old
services. For future Docker upgrades, use :ref:`upgrade-docker-image`.
