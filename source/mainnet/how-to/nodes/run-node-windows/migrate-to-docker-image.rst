.. _migrate-windows-to-docker:

=================
Migrate to Docker
=================

.. admonition:: At a glance

   Move an existing native Windows node to the ``concordium/node`` Docker image
   using Docker Desktop and WSL2 on the same computer.
   This procedure preserves the original Windows node data for rollback.

The native Windows node distribution is deprecated.
The Docker image includes the node, collector, and mainnet and testnet genesis
files. Select the correct network in the Compose configuration.

.. warning::

   Never run two nodes with the same validator credentials simultaneously.
   Stop and disable the native Windows node before starting Docker.
   Do not generate new validator keys or register the validator again.

1. Find settings and prepare
============================

Install `Docker Desktop for Windows <https://docs.docker.com/desktop/setup/install/windows-install/>`_
and enable the WSL2 backend. See the
`Docker WSL2 setup guide <https://docs.docker.com/desktop/features/wsl/>`_
for details.

Install Ubuntu 24.04 LTS
^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

   Ubuntu 24.04 LTS is used throughout this guide for consistency,
   but it is not a strict requirement. Other supported Ubuntu
   versions may also be used, provided they are compatible with
   WSL2 and Docker Desktop. Adjust the distribution name in the
   commands accordingly.

By default, WSL installs Ubuntu on the Windows system drive
(typically ``C:``). Ubuntu stores its Linux filesystem in a virtual
disk that grows as data is added, including the migrated Concordium
blockchain database.

Before installing Ubuntu, make sure the destination drive has enough
free space for the existing blockchain database and future growth.

To install Ubuntu 24.04 LTS in the default location, run in PowerShell:

.. code-block:: powershell

   wsl --install -d Ubuntu-24.04

If your system drive does not have enough free space, you can install
Ubuntu on another drive using the ``--location`` option.

For example, to install Ubuntu on drive ``D:``, first create the
destination directory in PowerShell:

.. code-block:: powershell

   New-Item -ItemType Directory -Force -Path "D:\WSL\Ubuntu-24.04"

Then install Ubuntu into that directory:

.. code-block:: powershell

   wsl --install -d Ubuntu-24.04 --location "D:\WSL\Ubuntu-24.04"

Choose only one of the installation commands above.

During installation, Ubuntu may prompt you to create a default Linux
username and password. Complete this setup before proceeding.
Restart Windows if prompted.

For subsequent sessions, open Ubuntu from PowerShell:

.. code-block:: powershell

   wsl -d Ubuntu-24.04

In Docker Desktop, open **Settings > Resources > WSL Integration**
and enable integration for Ubuntu 24.04. Make sure Docker Desktop
is running before continuing.

For large node databases, store the migrated data inside the Ubuntu
Linux filesystem rather than under ``/mnt/c`` or ``/mnt/d``.

In Ubuntu, verify Docker access without ``sudo``:

.. code-block:: console

   docker version
   docker compose version
   docker ps


If Docker reports a permission error when connecting to
``/var/run/docker.sock``, exit Ubuntu and reopen it from PowerShell:

.. code-block:: console

   exit

.. code-block:: powershell

   wsl -d Ubuntu-24.04

Then retry:

.. code-block:: console

   docker ps

If the error persists, verify that Docker Desktop is running and
that WSL integration is enabled for Ubuntu 24.04 under
**Settings > Resources > WSL Integration**.

Locate the existing Windows node configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Open **Configure Concordium Node Service** from the Windows Start
menu. This opens the Node Runner configuration file, typically located
at ``C:\ProgramData\Concordium\Node Runner\nodes.toml``.

Find the section for the network you are migrating, such as
``[node.mainnet]`` or ``[node.testnet]``, and record:

- ``data_dir``: the existing blockchain database directory.
- ``config_dir``: the node configuration directory.
- ``baker_credentials``: the validator credentials file, if configured.
- ``collector.node_name``: the name displayed on the network dashboard.
- Any custom network ports or other configuration settings.

For a standard Mainnet installation, ``nodes.toml`` typically uses
relative paths:

.. code-block:: toml

   config_dir = 'mainnet\config'
   data_dir = 'mainnet\data'

Relative paths are resolved against the directory containing
``nodes.toml``. For example, if the configuration file is located at
``C:\ProgramData\Concordium\Node Runner\nodes.toml``, the corresponding
absolute paths are:

- Configuration: ``C:\ProgramData\Concordium\Node Runner\mainnet\config``
- Blockchain data: ``C:\ProgramData\Concordium\Node Runner\mainnet\data``

Use the actual paths from your ``nodes.toml`` file if they differ.
Do not modify or delete the existing database or validator credentials.

2. Translate configuration
==========================

The Docker image supports both mainnet and testnet.

In Ubuntu WSL2, create a working directory for your node.
The following example uses ``testnet-node``. For mainnet, replace it
with ``mainnet-node``.

.. code-block:: console

   mkdir -m 700 ~/testnet-node
   cd ~/testnet-node
   mkdir -m 700 data secrets

Create a ``compose.yaml`` file in the working directory using the
``nano`` text editor:

.. code-block:: console

   nano compose.yaml

Copy the configuration for your network from the **Mainnet** or
**Testnet** example below and paste it into the editor.

To save the file and exit ``nano``:

#. Press **Ctrl+O** (the letter O) to save the file.
#. Press **Enter** to confirm the filename ``compose.yaml``.
#. Press **Ctrl+X** to exit the editor.

The file is now saved in your node's working directory.

The image includes the node, collector, and genesis files for both networks.
Keep the image's default entrypoint so it can manage the node and collector.

.. dropdown:: Mainnet ``compose.yaml``

   .. code-block:: yaml

      services:
        node:
          image: concordium/node:latest
          container_name: mainnet-node
          restart: unless-stopped
          stop_grace_period: 5m
          ports:
            - "8888:8888"
            - "127.0.0.1:20000:20000"
          volumes:
            - ./data:/mnt/data
          environment:
            CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE: /genesis/mainnet-genesis.dat
            CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES: bootstrap.mainnet.concordium.software:8888
            CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM: https://catchup.mainnet.concordium.software/blocks.idx
            CONCORDIUM_NODE_COLLECTOR_ENABLED: "true"
            CONCORDIUM_NODE_COLLECTOR_NODE_NAME: my-mainnet-node
            CONCORDIUM_NODE_COLLECTOR_URL: https://dashboard.mainnet.concordium.software/nodes/post

.. dropdown:: Testnet ``compose.yaml``

   .. code-block:: yaml

      services:
        node:
          image: concordium/node:latest
          container_name: testnet-node
          restart: unless-stopped
          stop_grace_period: 5m
          ports:
            - "8889:8889"
            - "127.0.0.1:20001:20000"
          volumes:
            - ./data:/mnt/data
          environment:
            CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE: /genesis/testnet-genesis.dat
            CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES: bootstrap.testnet.concordium.com:8888
            CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM: https://catchup.testnet.concordium.com/blocks.idx
            CONCORDIUM_NODE_LISTEN_PORT: "8889"
            CONCORDIUM_NODE_COLLECTOR_ENABLED: "true"
            CONCORDIUM_NODE_COLLECTOR_NODE_NAME: my-testnet-node
            CONCORDIUM_NODE_COLLECTOR_URL: https://dashboard.testnet.concordium.com/nodes/post

Replace ``CONCORDIUM_NODE_COLLECTOR_NODE_NAME`` with the name of your
existing node or another name you want displayed publicly.

The examples expose the network's peer-to-peer port and restrict gRPC
access to localhost. Testnet maps host port ``20001`` to container port
``20000``.

If your existing Windows installation uses custom settings, review them
and migrate the applicable configuration separately.
See :ref:`advanced-docker-image` for advanced Docker configuration.

.. note::

   The Docker image runs as a non-root user with UID and GID ``10001``.
   Section 3 explains how to give this user access to the copied database.

   For validators, section 4 adds the existing validator credentials
   to the selected Compose configuration.

Do not start the Docker node until the original Windows service has been
stopped and its data copied successfully.

3. Stop and copy state
======================

Open PowerShell as an administrator and stop the native Windows service:

.. code-block:: powershell

   Stop-Service ConcordiumNode
   Set-Service ConcordiumNode -StartupType Disabled
   Get-Service ConcordiumNode | Select-Object Name,Status,StartType

Confirm that the service reports ``Stopped`` and ``Disabled`` before copying
the database.

In Ubuntu WSL2, return to the node directory created in section 2.
For example:

.. code-block:: console

   cd ~/testnet-node

For mainnet, use ``~/mainnet-node`` instead.

Find the original Windows node data directory.
Windows drives are accessible from WSL2 under ``/mnt/<drive-letter>/``.

For example, the Windows path
``D:\Concordium\Node Runner\testnet\data`` corresponds to
``/mnt/d/Concordium/Node Runner/testnet/data`` in Ubuntu.

Copy the existing node data into the Ubuntu filesystem:

.. code-block:: console

   rsync -a --info=progress2 "/mnt/d/Concordium/Node Runner/testnet/data/" ./data/

Replace the example source path with the actual location of your node data.
Keep the trailing slash so that the directory contents are copied into
``./data``.

Wait for the copy to complete successfully before proceeding.
If ``rsync`` reports an error, resolve it before starting Docker.
Do not merge the copied state with an existing Docker database.

Give the container user ownership of the copied data:

.. code-block:: console

   sudo chown -R 10001:10001 ./data
   sudo chmod 700 ./data

Keep the original Windows database unchanged for rollback.

4. Mount existing validator credentials (validators only)
=========================================================

If your existing Windows node is a validator, reuse its current validator
credentials. Do not generate new keys or register the validator again.

Skip this section if you are migrating a non-validator node.

Locate the existing ``validator-credentials.json`` file on Windows.
Make sure you have access to the original file before proceeding.

Windows drives are accessible in Ubuntu WSL2 under ``/mnt/``.
For example, a file stored in ``C:\Users\<username>\Downloads`` is
accessible under ``/mnt/c/Users/<username>/Downloads``.

In Ubuntu, from the directory containing ``compose.yaml``, copy the
existing credentials into the ``secrets`` directory:

.. code-block:: console

   cp "/mnt/c/Users/<username>/Downloads/validator-credentials.json" ./secrets/validator-credentials.json

Replace ``<username>`` and the source path with the actual location of
your credentials file.

Set ownership and permissions so that the Docker container user can read
the credentials:

.. code-block:: console

   sudo chown 10001:10001 ./secrets
   sudo chmod 700 ./secrets
   sudo chown 10001:10001 ./secrets/validator-credentials.json
   sudo chmod 400 ./secrets/validator-credentials.json

Verify the file ownership and permissions:

.. code-block:: console

   sudo ls -ldn ./secrets
   sudo ls -ln ./secrets/validator-credentials.json

The owner and group should both be ``10001``, matching the user
and group used by the Concordium node inside the container.

Check the permissions in the command output:

- ``drwx------`` for the ``secrets`` directory: only its owner can
  access the directory and manage its contents.
- ``-r--------`` for ``validator-credentials.json``: only its owner
  can read the file. No user has permission to modify or execute it.

These restrictions help protect the validator's private keys from
access by other Linux users.

.. note::

   Your regular Ubuntu user may no longer be able to access the ``secrets``
   directory after changing its ownership. This is expected.
   Use ``sudo`` to inspect file metadata without displaying the credentials.

Add the following entries to the existing ``node`` service in
``compose.yaml``:

.. code-block:: yaml

   volumes:
     - ./data:/mnt/data
     - ./secrets:/run/secrets:ro
   environment:
     CONCORDIUM_NODE_VALIDATOR_CREDENTIALS_FILE: /run/secrets/validator-credentials.json

Merge these entries into the existing ``volumes`` and ``environment``
sections. Do not create duplicate YAML keys.

Validate the updated Compose configuration before proceeding:

.. code-block:: bash

   docker compose config --quiet

If the command completes without output or errors, the Compose
configuration is valid. If an error is reported, correct the
``compose.yaml`` file and run the command again before starting
the node.


The entire ``secrets`` directory is mounted read-only.
This avoids file bind-mount problems that can occur when Docker Desktop
restarts after a Windows reboot.

.. warning::

   Validator credentials are sensitive private keys.
   Never commit them to Git, share them publicly, or make them
   world-readable.

   Never run the original Windows validator and the Docker validator
   simultaneously with the same credentials.

5. Start and verify
===================

Before starting the Docker node, confirm that the original Windows node
service is stopped and disabled. Never run both installations with the same
validator credentials.

Download the Docker image
^^^^^^^^^^^^^^^^^^^^^^^^^

Open Ubuntu WSL2 and navigate to the directory containing ``compose.yaml``.

Download the selected Docker image:

.. code-block:: console

   docker compose pull

For validators, confirm that the container can read the credentials file
and write to the migrated data directory.

The following check requires the image to contain ``/bin/sh``:

.. code-block:: console

   docker compose run --rm --no-deps --entrypoint /bin/sh node -c 'id; test -r /run/secrets/validator-credentials.json && test -w /mnt/data && echo "Permissions OK"'

A successful check prints ``Permissions OK``.

If the image does not contain ``/bin/sh``, this check is unavailable.
Inspect the container startup logs for permission and credentials errors
instead. Do not assume that the credentials are accessible merely because
the Compose configuration is valid.

Start the Docker node
^^^^^^^^^^^^^^^^^^^^^

Start the node:

.. code-block:: console

   docker compose up -d
   docker compose ps

Inspect the startup logs:

.. code-block:: console

   docker compose logs --tail 100 node

To follow new log messages:

.. code-block:: console

   docker compose logs --follow node

Press ``Ctrl+C`` to stop following the logs. This does not stop the node.

.. note::

   During startup, you may see repeated messages such as:

   .. code-block:: text

      ERROR: gRPC failed with "transport error"

   These messages may come from the node collector, which attempts
   to retrieve node information through gRPC before the node is
   fully initialized.

   When starting with a migrated blockchain database, the node may
   need some time to load its existing state. During this period,
   the gRPC interface may not yet be available.

   These errors are usually temporary and should stop once the node
   finishes initializing and the collector can connect successfully.

   If the errors continue after the node has started and is
   operational, check the collector's gRPC address and port in
   ``compose.yaml`` and inspect the node logs for startup errors.

Verify consensus and validator status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Check the logs for database, genesis, configuration, and credentials errors.
Confirm that the node connects to peers and catches up with the network.

Use ``concordium-client`` from Windows PowerShell to inspect the running node.

For mainnet:

.. code-block:: powershell

   concordium-client raw GetNodeInfo --grpc-ip 127.0.0.1 --grpc-port 20000
   concordium-client raw GetConsensusInfo --grpc-ip 127.0.0.1 --grpc-port 20000

For testnet:

.. code-block:: powershell

   concordium-client raw GetNodeInfo --grpc-ip 127.0.0.1 --grpc-port 20001
   concordium-client raw GetConsensusInfo --grpc-ip 127.0.0.1 --grpc-port 20001

If ``concordium-client`` is not in your Windows ``PATH``, invoke it using
its full executable path.

Verify that:

- The node reports the expected network and connects to peers.
- The latest finalized block is recent and finalized blocks continue to
  advance.
- For validators, the node reports the existing validator ID and indicates
  that the validator is running.
- The node uses the migrated database rather than starting from an empty
  database.
- If the collector is enabled, the node appears on the appropriate network
  dashboard and its reporting continues.

Validator committee participation depends on network state. A running
container alone does not guarantee that the validator is operating correctly.

Configure automatic startup (optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you want the Concordium node to resume automatically after a
Windows restart, enable the following settings in Docker Desktop:

- **Settings > General > Start Docker Desktop when you sign in to your computer**.
- **Settings > Resources > WSL Integration** for your Ubuntu distribution.

The Docker container must also use the ``unless-stopped`` restart
policy, as specified in the Compose configuration.

You can verify the configured restart policy without rebooting:

.. code-block:: console

   docker inspect $(docker compose ps -q node) --format 'Status={{.State.Status}} RestartPolicy={{.HostConfig.RestartPolicy.Name}}'

The expected values are ``Status=running`` and
``RestartPolicy=unless-stopped``.

Optionally, test automatic startup by restarting Windows and signing
in to your account. Allow Docker Desktop to start.

Then open Ubuntu WSL2, navigate to the node directory, and run:

.. code-block:: console

   docker compose ps
   docker compose logs --tail 100 node

Repeat the ``concordium-client`` checks to verify that consensus
resumes. If the collector is enabled, confirm that dashboard
reporting resumes too.

.. note::

   Docker Desktop normally starts after the Windows user signs in.
   Enabling automatic startup does not guarantee that the validator
   runs before a user signs in after a system reboot.

   The collector is managed inside the same container as the node.
   Container status alone does not confirm that the collector is healthy.

6. Roll back or retire the Windows installation
===============================================

If the Docker node does not operate correctly, you can return to the
original Windows installation using its unchanged database and configuration.

Roll back to the Windows node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

First, stop the Docker node from Ubuntu WSL2, in the directory containing
``compose.yaml``:

.. code-block:: console

   docker compose stop
   docker compose logs --tail 100 node
   docker compose down

Check the logs to confirm that the node shut down cleanly.
Make sure that no Docker container continues using the same validator
credentials.

.. warning::

   Never run the original Windows validator and the Docker validator
   simultaneously with the same credentials.

   Do not copy the database modified by Docker back to the original
   Windows installation. The older Windows node version might not be
   able to read it.

Open PowerShell as an administrator and restore the original service:

.. code-block:: powershell

   Set-Service ConcordiumNode -StartupType Automatic
   Start-Service ConcordiumNode
   Get-Service ConcordiumNode | Select-Object Name,Status,StartType

Before restarting the native node, confirm that its version is still
compatible with the current Concordium network protocol.

The original node will need to catch up with blocks finalized while
the Docker node was running.

Retire the native Windows installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After the Docker node has passed all verification checks, including
successful recovery after a Windows reboot, monitor it for an appropriate
observation period.

Keep the native Windows service disabled while Docker is operating:

.. code-block:: powershell

   Get-Service ConcordiumNode | Select-Object Name,Status,StartType

The expected status is ``Stopped`` with startup type ``Disabled``.

When you no longer need the native installation, you can uninstall the
deprecated Windows Node Runner using the normal Windows application
uninstallation procedure.

Before removing any files:

- Confirm that the Docker node is running and synchronized.
- For validators, confirm that the original validator identity is active.
- Confirm that Docker Desktop starts and the node recovers after a reboot.
- Preserve validator credentials and any required backups.
- Keep the original Windows database for as long as your retention or
  rollback requirements specify.

.. warning::

   Do not delete the Docker node's ``data`` directory.
   It contains the active blockchain database.

   Do not delete the original Windows database or validator credentials
   as part of the migration procedure.

For future Docker image upgrades, see :ref:`upgrade-docker-image`.