.. _migrate-macos-to-docker:

=================
Migrate to Docker
=================

.. admonition:: At a glance

   Move an existing macOS package installation to Docker Desktop on the same Mac.
   You need Docker Compose and disk space for a copy of your state.
   The procedure preserves the original installation for rollback.

The macOS package distribution is deprecated. The ``concordium/node`` image
includes the node, collector, and mainnet and testnet genesis files.
Use the Compose examples in :ref:`configure-docker-image` as the destination.
Use the macOS prerequisite tab in :ref:`install-node-docker-image`.
For existing state, use the copy and access checks below rather than the
installation guide's new-node directory preparation steps.

State means the node database and saved configuration. Keep the original state
unchanged for rollback. This guide covers migration on the same MacOS host,
not a transfer to another host or a custom network. Plan a period when the node
does not operate.

.. warning::

   Never run two nodes with the same validator credentials at the same time.
   Stop the native services and disable their automatic startup before starting
   Docker. Reuse existing validator keys; do not register them again.

1. Find settings and prepare
============================

Follow the macOS prerequisites in :ref:`install-node-docker-image`, including
Docker Desktop resources, image architecture, and external-drive file sharing.
Allow enough disk space for the copied database.

The examples below use mainnet. For testnet, replace ``mainnet`` with ``testnet``
in service names and plist filenames. Use a separate Compose directory and state
copy for each network.

Display the native node and collector settings:

.. code-block:: console

   $plutil -p "/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist"
   $plutil -p "/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node-collector.plist"

Read ``EnvironmentVariables`` in the node plist. Record the actual values of
``CONCORDIUM_NODE_CONFIG_DIR`` and ``CONCORDIUM_NODE_DATA_DIR``, as they can point to
custom directories or an external drive.
Record validator credential paths, custom settings, and the collector's name
and reporting settings. Keep a protected copy of both plists for reference.

Record whether either service has an automatic-start link:

.. code-block:: console

   $ls -l /Library/LaunchDaemons/software.concordium.mainnet.node.plist /Library/LaunchDaemons/software.concordium.mainnet.node-collector.plist

A missing link means that service is not configured for automatic startup through
this mechanism. Record which links exist so that rollback restores only those.

Create a new network directory and ``compose.yaml`` using
:ref:`configure-docker-image`, but do not start the container yet.

2. Translate configuration
==========================

Copy applicable plist ``EnvironmentVariables`` values into the ``node`` service's
``environment`` mapping. For example:

.. code-block:: xml

   <key>CONCORDIUM_NODE_COLLECTOR_NODE_NAME</key>
   <string>My node</string>

becomes:

.. code-block:: yaml

   environment:
     CONCORDIUM_NODE_COLLECTOR_NODE_NAME: "My node"

Keep the example's genesis path, bootstrap nodes, ports, and collector backend
URL for the selected network. Keep the image's default entrypoint, which manages
both the node and collector. Do not copy launchd directives into Compose.

The Docker image uses ``/mnt/data`` for both database and saved configuration.
Do not copy the native ``CONCORDIUM_NODE_CONFIG_DIR`` or
``CONCORDIUM_NODE_DATA_DIR`` settings. Section 3 combines their contents in
``./data``, mounted at ``/mnt/data``.

Translate these settings where applicable:

- **Collector:** Preserve the public node name. If reporting was disabled, set
  ``CONCORDIUM_NODE_COLLECTOR_ENABLED`` to ``"false"``.
- **Catch-up:** If you disabled out-of-band catch-up, remove
  ``CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM``. Otherwise keep the
  network-specific URL from the Compose example.
- **Inbound connections:** Preserve router and firewall forwarding for mainnet
  port ``8888`` or testnet port ``8889``. Verify access through Docker Desktop.
- **TLS:** Mount certificate and key files read-only and use container paths.
  Configure the collector's gRPC URL to match the certificate domain and the
  container port. See :ref:`advanced-docker-image`.
- **Validator credentials:** Use section 4 rather than copying a native host path
  or the legacy ``CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE`` setting.

Host gRPC remains ``20000`` for mainnet and ``20001`` for testnet; the container
uses ``20000`` for either network. The examples allow only loopback access.
For existing remote clients, configure trusted access as described in
:ref:`advanced-docker-image`. Migrate other custom settings separately.

3. Stop and copy state
======================

Run **Concordium Node Stop Mainnet** from ``/Applications/Concordium Node``.
For testnet, use **Concordium Node Stop Testnet**. The launcher removes both
loaded services with ``launchctl remove`` using administrator privileges.
Stopping a process in Activity Monitor is not sufficient because launchd can
restart it.

Disable automatic startup by removing only the existing links recorded in
section 1. Verify each is a symbolic link to the installed plist before removal.
Do not remove the source plists under ``/Library/Concordium Node/LaunchDaemons``.
For mainnet, the links are:

.. code-block:: console

   $sudo rm /Library/LaunchDaemons/software.concordium.mainnet.node.plist
   $sudo rm /Library/LaunchDaemons/software.concordium.mainnet.node-collector.plist

Skip a command if its link does not exist. Check that neither service remains
loaded:

.. code-block:: console

   $sudo launchctl list | grep -E 'software\.concordium\.mainnet\.node(-collector)?$'

No output is expected; ``grep`` returns a nonzero status when there is no match.
Check Activity Monitor for remaining native node processes and inspect shutdown
logs:

.. code-block:: console

   $log show --last 15m --predicate 'subsystem == "software.concordium.mainnet.node"'

Confirm a clean shutdown before copying. Do not manually start the native node
while Docker uses its validator credentials.

.. warning::

   Never copy a running database or merge into an existing Docker database.
   Stop if a command fails or the destination already exists. Do not delete
   database files using the legacy troubleshooting procedure during migration.

Run the remaining commands beside the new ``compose.yaml``. Replace the quoted
source paths below with the actual directories read from the plist:

.. code-block:: console

   $ mkdir -m 0700 data
   $ cp -pR "/actual/native/config-directory/." ./data/
   $ cp -piR "/actual/native/data-directory/." ./data/
   $ sudo chown -R 10001:10001 data
   $ sudo chmod 0700 data

If the second copy prompts to overwrite a file, cancel and resolve the name
conflict before continuing. If your user cannot read the source, use ``sudo``
for the copy. Assign UID/GID ``10001:10001`` only to the destination copy,
not the original.
Check symbolic links that refer outside the mount. Keep source directories
unchanged, including their ownership and permissions.

4. Mount existing validator credentials (validators only)
=========================================================

Find the existing credential file using the native plist setting. Older
installations use ``CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE``. Do not assume it is
inside the default config directory. Reuse that file and existing registration.

Create a protected directory beside Compose and copy the credentials:

.. code-block:: console

   $ mkdir -m 0700 secrets
   $ sudo cp -p "/actual/native/validator-credentials.json" ./secrets/validator-credentials.json
   $ sudo chown 10001:10001 secrets/validator-credentials.json
   $ sudo chmod 0400 secrets/validator-credentials.json

The copied file belongs to the container's UID/GID ``10001:10001`` and is
readable only by its owner under ordinary file permissions. Keep the original
unchanged. Add these entries to the service's
existing mappings and lists, retaining other settings and the state mount:

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

Check that the non-root container user can read the mount without displaying
credential contents:

.. code-block:: console

   $ docker compose run --rm --no-deps --entrypoint /bin/sh node -c 'test -r /run/secrets/validator-credentials.json'

Stop if this check fails. Resolve access without making credentials readable
by all users. Never put credentials or their backups in a repository.
If section 3 also copied a credential file into ``data``, protect that copy too;
this procedure uses the separate read-only ``secrets`` mount.

5. Start and verify
===================

Keep ``stop_grace_period: 5m`` from the Compose example. Increase it if your node
needs more time for a clean shutdown. Check the configuration and start:

.. code-block:: console

   $ docker compose config --quiet
   $ docker compose up --detach
   $ docker compose ps
   $ docker compose logs --follow node

Before accepting the migration:

- Confirm the correct network and that the node loads copied state rather than
  creating a new database. Check for database compatibility, configuration,
  permission, genesis, and credential errors.
- Check peers after catch-up. Use ``concordium-client`` on host port ``20000``
  (mainnet) or ``20001`` (testnet). Verify recent finalized blocks and continued
  progress. Test existing local and remote clients.
- If reporting is enabled, verify collector logs and dashboard reports.
  Container status alone does not prove collector health.
- For validators, verify loaded credentials and expected validator identity
  and status as described in :ref:`import-validator-keys`. Participation depends
  on network state; a running container alone is insufficient.
- On Apple Silicon, monitor CPU, memory, and synchronization under emulation.
  Verify the node keeps up with the network before retiring the native package.

6. Roll back or retire the package
==================================

If verification fails, stop Docker before restarting the native installation:

.. code-block:: console

   $ docker compose stop
   $ docker compose logs --tail 100 node
   $ docker compose down

Confirm a clean shutdown and that the container no longer runs. Restore any
native settings you changed. Run **Concordium Node Start Mainnet** (or Testnet)
with the unchanged original state. Restore only automatic-start links that
existed before migration, following :ref:`change-node-settings`.
Check that the network still supports the old binary version.

.. warning::

   Do not give the old native binary state modified by Docker. Database upgrades
   can prevent older versions from reading it. The original node must catch up
   on blocks finalized during migration.

After all checks pass, monitor Docker for your selected observation period.
Then run **Concordium Node Uninstaller** and select **Yes** to retain data and
keys. Do not select **Yes, and delete data** during migration. The uninstaller
removes both networks' native installation; migrate both first if you use both.

Keep original state, plists, and credentials according to your retention policy.
After uninstalling, native rollback requires installing a suitable package again.
Do not delete Docker's state directory. For subsequent container upgrades, use
:ref:`upgrade-docker-image`.
