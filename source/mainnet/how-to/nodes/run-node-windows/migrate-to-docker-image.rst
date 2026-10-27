.. _migrate-windows-to-docker:

=================
Migrate to Docker
=================

.. admonition:: At a glance

   Move an existing native Windows node to the ``concordium/node`` Docker image
   using Docker Engine inside Ubuntu WSL2 on the same computer.
   The node can start automatically when Windows boots, without requiring
   a user to sign in.
   The existing Windows blockchain database is reused directly through
   VirtioFS. A pre-migration backup is recommended for rollback.

The native Windows node distribution is deprecated.
The Docker image includes the node, collector, and mainnet and testnet
genesis files. This guide supports both networks, but the step-by-step
commands use Testnet as the example unless otherwise specified.
For Mainnet, select the corresponding Compose configuration and adjust
network-specific paths, ports, and settings accordingly.

.. warning::

   Never run two nodes with the same validator credentials simultaneously.
   Stop and disable the native Windows node before starting Docker.
   Do not generate new validator keys or register the validator again.

1. Find settings and prepare
============================

This guide covers Windows 10 and Windows 11 using Docker Engine
installed directly inside Ubuntu WSL2, without Docker Desktop.

Install Ubuntu 24.04 LTS
^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

   Ubuntu 24.04 LTS is used throughout this guide for consistency,
   but it is not a strict requirement. Other supported Ubuntu
   versions may also be used, provided they are compatible with
   WSL2 and Docker Engine. Adjust the distribution name in the
   commands accordingly.

By default, WSL installs Ubuntu on the Windows system drive
(typically ``C:``). Ubuntu stores its Linux filesystem in a virtual
disk that grows as data is added.

With the direct VirtioFS migration described in this guide, the
existing blockchain database remains on its original Windows drive.
Make sure that drive has enough free space for future blockchain
growth. The Ubuntu filesystem also requires space for Docker images,
configuration, and other Linux files.

To install Ubuntu 24.04 LTS in the default location, run in PowerShell:

.. code-block:: powershell
   :caption: Windows PowerShell

   wsl --install -d Ubuntu-24.04

If your system drive does not have enough free space, you can install
Ubuntu on another drive using the ``--location`` option.

For example, to install Ubuntu on drive ``D:``, first create the
destination directory in PowerShell:

.. code-block:: powershell
   :caption: Windows PowerShell

   New-Item -ItemType Directory -Force -Path "D:\WSL\Ubuntu-24.04"

Then install Ubuntu into that directory:

.. code-block:: powershell
   :caption: Windows PowerShell

   wsl --install -d Ubuntu-24.04 --location "D:\WSL\Ubuntu-24.04"

Choose only one of the installation commands above.

During installation, Ubuntu may prompt you to create a default Linux
username and password. Complete this setup before proceeding.
Restart Windows if prompted.

For subsequent sessions, open Ubuntu from PowerShell:

.. code-block:: powershell
   :caption: Windows PowerShell

   wsl -d Ubuntu-24.04

Enable VirtioFS for Windows drives
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This migration uses the existing Windows blockchain database directly
from Ubuntu WSL2, without copying it into the Linux filesystem.
The Windows drive must be mounted using VirtioFS rather than the
default 9P filesystem.

First, update WSL from Windows PowerShell:

.. code-block:: powershell
   :caption: Windows PowerShell

   wsl --update
   wsl --version

Make sure that the installed WSL version supports VirtioFS for
Windows drive mounts. The availability of this feature depends on
the WSL version and Linux kernel.

In Windows PowerShell, open the global WSL configuration file:

.. code-block:: powershell
   :caption: Windows PowerShell

   notepad "$env:USERPROFILE\.wslconfig"

Add the following configuration:

.. code-block:: ini
   :caption: Windows - .wslconfig

   [wsl2]
   virtiofs=true

If the file already contains a ``[wsl2]`` section, add
``virtiofs=true`` to that section instead of creating a duplicate.

Save the file and restart WSL:

.. code-block:: powershell
   :caption: Windows PowerShell

   wsl --shutdown
   wsl -d Ubuntu-24.04

Inside Ubuntu, verify the filesystem used for the Windows drive:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   findmnt -T /mnt/c -o TARGET,SOURCE,FSTYPE,OPTIONS

The ``FSTYPE`` column must report ``virtiofs`` rather than ``9p``.

Do not continue with the direct Windows database mount if the drive
is still using ``9p``. Check the WSL version, configuration, and
kernel support before proceeding.

Enable systemd and install Docker Engine
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Docker Engine runs directly inside Ubuntu WSL2 and is managed by systemd.

First, verify that systemd is running as PID 1 inside Ubuntu:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   ps -p 1 -o comm=

The expected output is ``systemd``.

If systemd is not enabled, open ``/etc/wsl.conf`` with administrator
privileges and add the following configuration:

.. code-block:: ini
   :caption: Ubuntu WSL2 - /etc/wsl.conf

   [boot]
   systemd=true

Save the file, then shut down WSL from Windows PowerShell:

.. code-block:: powershell
   :caption: Windows PowerShell

   wsl --shutdown
   wsl -d Ubuntu-24.04

Verify that systemd is now running as PID 1.

Install Docker Engine and the Docker Compose plugin from Docker's
official APT repository.

First, remove any conflicting packages if they are installed:

.. warning::

   The following installation steps assume a fresh Ubuntu WSL2
   environment. If Docker is already installed and used by other
   workloads, review the package removal commands before proceeding.

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo apt remove -y docker.io docker-compose-v2 docker-compose docker-doc podman-docker containerd runc

Set up Docker's official APT repository:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo apt update
   sudo apt install -y ca-certificates curl

   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
     -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc

   sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null <<EOF
   Types: deb
   URIs: https://download.docker.com/linux/ubuntu
   Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
   Components: stable
   Signed-By: /etc/apt/keyrings/docker.asc
   EOF

Install Docker Engine, the CLI, containerd, and the Compose plugin:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io \
     docker-buildx-plugin docker-compose-plugin

Enable and start the Docker service:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo systemctl enable --now docker
   sudo systemctl status docker

Verify Docker Engine and Docker Compose:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker version
   sudo docker compose version
   sudo docker ps

The Docker service should report ``active (running)``, and the Docker
commands should complete successfully.

.. note::

   This guide uses ``sudo`` for Docker commands. Membership in the
   ``docker`` group is not required. Access to the Docker socket grants
   root-equivalent privileges and should be restricted to trusted users.

This guide uses VirtioFS to access the existing Windows blockchain
database directly, avoiding a second copy of the database inside
the Ubuntu filesystem.

Filesystem performance may differ from a native Linux filesystem.
Monitor node synchronization and disk performance after migration.
If direct access is unsuitable, copying the database into the Ubuntu
filesystem remains an alternative.

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

For a standard Testnet installation, ``nodes.toml`` typically uses
relative paths:

.. code-block:: toml
   :caption: Windows - nodes.toml

   config_dir = 'testnet\config'
   data_dir = 'testnet\data'

Relative paths are resolved against the directory containing
``nodes.toml``. For example, if the configuration file is located at
``C:\ProgramData\Concordium\Node Runner\nodes.toml``, the corresponding
absolute paths are:

- Configuration: ``C:\ProgramData\Concordium\Node Runner\testnet\config``
- Blockchain data: ``C:\ProgramData\Concordium\Node Runner\testnet\data``

Use the actual paths from your ``nodes.toml`` file if they differ.
Do not modify or delete the existing database or validator credentials.

2. Translate configuration
==========================

The Docker image supports both mainnet and testnet.

In Ubuntu WSL2, create a working directory for your node.
The following example uses ``testnet-node``. For mainnet, replace it
with ``mainnet-node``.

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   mkdir -m 700 ~/testnet-node
   cd ~/testnet-node
   mkdir -m 700 secrets

Create a ``compose.yaml`` file in the working directory using the
``nano`` text editor:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

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
      :caption: Docker Compose - compose.yaml (Mainnet)

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
            - type: bind
              source: /mnt/c/ProgramData/Concordium/Node Runner/mainnet/data
              target: /mnt/data
              bind:
                create_host_path: false
          environment:
            CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE: /genesis/mainnet-genesis.dat
            CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES: bootstrap.mainnet.concordium.software:8888
            CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM: https://catchup.mainnet.concordium.software/blocks.idx
            CONCORDIUM_NODE_COLLECTOR_ENABLED: "true"
            CONCORDIUM_NODE_COLLECTOR_NODE_NAME: my-mainnet-node
            CONCORDIUM_NODE_COLLECTOR_URL: https://dashboard.mainnet.concordium.software/nodes/post

.. dropdown:: Testnet ``compose.yaml``

   .. code-block:: yaml
      :caption: Docker Compose - compose.yaml (Testnet)

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
            - type: bind
              source: /mnt/c/ProgramData/Concordium/Node Runner/testnet/data
              target: /mnt/data
              bind:
                create_host_path: false
          environment:
            CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE: /genesis/testnet-genesis.dat
            CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES: bootstrap.testnet.concordium.com:8888
            CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM: https://catchup.testnet.concordium.com/blocks.idx
            CONCORDIUM_NODE_LISTEN_PORT: "8889"
            CONCORDIUM_NODE_COLLECTOR_ENABLED: "true"
            CONCORDIUM_NODE_COLLECTOR_NODE_NAME: my-testnet-node
            CONCORDIUM_NODE_COLLECTOR_URL: https://dashboard.testnet.concordium.com/nodes/post

The examples mount the existing Windows blockchain database directly
into the container using VirtioFS. No database copy is required.

Replace the example ``source`` path with the actual Windows node data
directory identified in ``nodes.toml``, using its WSL path under
``/mnt/<drive-letter>/``.

The ``create_host_path: false`` option prevents Docker Compose from
silently creating an empty source directory when the path is incorrect.
Verify that the directory exists and contains the expected blockchain
database before starting the container.

Replace ``CONCORDIUM_NODE_COLLECTOR_NODE_NAME`` with the name of your
existing node or another name you want displayed publicly.

The examples expose the network's peer-to-peer port and restrict gRPC
access to localhost. Testnet maps host port ``20001`` to container port
``20000``.

If your existing Windows installation uses custom settings, review them
and migrate the applicable configuration separately.
See :ref:`advanced-docker-image` for advanced Docker configuration.

.. note::

   The database is mounted directly from its existing Windows
   directory using a Docker bind mount over VirtioFS. No database
   copy or Docker named volume is required.

   The Docker image runs as a non-root user with UID and GID ``10001``.
   Section 3 explains how to configure Windows filesystem permissions
   and verify access to the existing database.

   For validators, section 4 adds the existing validator credentials
   to the selected Compose configuration.

Do not start the Docker node until the original Windows service has been
stopped and disabled, the database has been backed up, and
the filesystem permissions have been verified as described in section 3.

3. Stop the Windows node and prepare the database
=================================================

Stop and disable the native Windows node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Open PowerShell as an administrator and stop the native Windows service:

.. code-block:: powershell
   :caption: Windows PowerShell

   Stop-Service ConcordiumNode
   Set-Service ConcordiumNode -StartupType Disabled
   Get-Service ConcordiumNode | Select-Object Name,Status,StartType

Confirm that the service reports ``Stopped`` and ``Disabled``.
Do not start the Docker node while the native Windows node is running.

Back up the existing database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. warning::

   Docker will use and modify the original Windows blockchain database
   directly. The database will no longer remain unchanged for rollback.
   Create a backup before proceeding if you need to preserve the
   pre-migration state.

With the Windows node stopped, back up the complete data directory to
a separate location with sufficient free space. Do not merge the backup
with another node database.

Keep the backup until the Docker node has been verified and you are
confident that rollback is no longer required.

Verify the existing Windows database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Find the original Windows node data directory using ``nodes.toml``.
Windows drives are accessible from Ubuntu WSL2 under
``/mnt/<drive-letter>/``.

For example, the default Testnet path is:

.. code-block:: text
   :caption: Windows - Node Runner database path

   C:\ProgramData\Concordium\Node Runner\testnet\data

The corresponding Ubuntu WSL2 path is:

.. code-block:: text
   :caption: Ubuntu WSL2 - Node Runner database path

   /mnt/c/ProgramData/Concordium/Node Runner/testnet/data

Inside Ubuntu, verify that the directory exists and contains the
expected database files:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   ls -lah "/mnt/c/ProgramData/Concordium/Node Runner/testnet/data"

The directory should contain the existing blockchain database,
including files such as ``data.mdb`` and ``genesis.dat``.

Use the actual data directory from your Windows node configuration
if it differs from the example. Confirm that the same path is used
as the ``source`` in ``compose.yaml``.

Configure Windows filesystem permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Docker image runs as a non-root user with UID and GID ``10001``.
When the existing database is mounted from Windows using VirtioFS,
the container must have permission to modify the database files.

.. important::

   Open **Windows PowerShell as Administrator** before running the following
   commands. Modifying NTFS permissions under ``C:\ProgramData`` requires
   elevated privileges.

   Ensure that the account receiving permissions is the Windows user that
   will access the database through WSL2. If PowerShell was started using
   a different administrator account, specify the intended Windows account
   explicitly instead of using the automatically detected account.

In an elevated Windows PowerShell session, identify the Windows
account that will be granted access:

.. code-block:: powershell
   :caption: Windows PowerShell

   [System.Security.Principal.WindowsIdentity]::GetCurrent().Name

Grant that account Modify permissions on the existing data directory
and its contents. For example, for Testnet:

.. code-block:: powershell
   :caption: Windows PowerShell (Administrator)
   :class: migration-copy-raw

   $path = "C:\ProgramData\Concordium\Node Runner\testnet\data"
   $account = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
   icacls $path /grant "${account}:(OI)(CI)M" /T /C

.. raw:: html

   <script>
   document.addEventListener('click', function (event) {
     const button = event.target.closest('button.copybtn');
     if (!button) return;

     const selector = button.getAttribute('data-clipboard-target');
     if (!selector) return;

     const target = document.querySelector(selector);
     if (!target || !target.closest('.migration-copy-raw')) return;

     event.stopImmediatePropagation();
     event.preventDefault();

     const text = target.innerText.replace(/\n+$/, '') + '\n';

     navigator.clipboard.writeText(text).then(() => {
       button.setAttribute('data-tooltip', 'Copied!');
     }).catch(error => {
       console.error('Migration guide copy failed:', error);
     });
   }, true);
   </script>

For Mainnet, use the corresponding ``mainnet\data`` directory.

This grants Modify permissions to the selected Windows account,
including existing files and subdirectories. Avoid granting broad
access to groups such as ``Everyone``.

.. note::

   Windows ACLs and Linux UID/GID permissions are not equivalent.
   Verify access from the actual container user before starting the
   node. If the elevated Windows account differs from the account
   used for WSL drive access, adjust the ACL accordingly.

Before starting the node, verify that the container user can access
the existing database files. Run the following command inside Ubuntu
WSL2, using the actual database path for your network:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker run --rm --user 10001:10001 \
     --entrypoint /bin/sh \
     --mount "type=bind,source=/mnt/c/ProgramData/Concordium/Node Runner/testnet/data,target=/mnt/data" \
     concordium/node:latest \
     -c 'test -r /mnt/data/data.mdb && test -w /mnt/data/data.mdb && echo "Database access OK"'

The expected output is ``Database access OK``.

This check does not modify the database. If it fails, verify the
Windows ACLs and VirtioFS mount configuration before proceeding.
Do not change permissions on the database using recursive Linux
``chown`` commands.

Do not run ``chown -R`` on the Windows-mounted blockchain database.
The database remains on NTFS and is not copied into Ubuntu.

The original Windows service must remain disabled while Docker uses
the database.

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

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   cp "/mnt/c/Users/<username>/Downloads/validator-credentials.json" ./secrets/validator-credentials.json

Replace ``<username>`` and the source path with the actual location of
your credentials file.

Set ownership and permissions so that the Docker container user can read
the credentials:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo chown 10001:10001 ./secrets
   sudo chmod 700 ./secrets
   sudo chown 10001:10001 ./secrets/validator-credentials.json
   sudo chmod 400 ./secrets/validator-credentials.json

Verify the file ownership and permissions:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

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
   :caption: Docker Compose - validator configuration

   volumes:
     - ./secrets:/run/secrets:ro
   environment:
     CONCORDIUM_NODE_VALIDATOR_CREDENTIALS_FILE: /run/secrets/validator-credentials.json

Merge these entries into the existing ``volumes`` and ``environment``
sections. Do not create duplicate YAML keys.

Validate the updated Compose configuration before proceeding:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker compose config --quiet

If the command completes without output or errors, the Compose
configuration is valid. If an error is reported, correct the
``compose.yaml`` file and run the command again before starting
the node.

The entire ``secrets`` directory is mounted read-only to prevent
the container from modifying the validator credentials.
Keeping the files inside the Ubuntu filesystem also avoids
potential performance issues associated with Windows bind mounts.

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

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker compose pull

Before starting the node, verify that the container user can read and
write the existing blockchain database files.

The following checks require the Docker image to contain ``/bin/sh``.

For both validators and non-validator nodes, run:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker compose run --rm --no-deps --entrypoint /bin/sh node \
     -c 'id; test -r /mnt/data/data.mdb && test -w /mnt/data/data.mdb && echo "Database permissions OK"'

The expected output includes ``Database permissions OK``.

For validators, also verify that the container can read the existing
validator credentials:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker compose run --rm --no-deps --entrypoint /bin/sh node \
     -c 'test -r /run/secrets/validator-credentials.json && echo "Validator credentials OK"'

The expected output is ``Validator credentials OK``.

These checks do not modify the database or credentials. They verify
basic filesystem access but do not guarantee that all database
operations will succeed.

If either check fails, review the Windows ACLs, VirtioFS configuration,
and the container mounts before proceeding.

If the Docker image does not contain ``/bin/sh``, these checks are
unavailable. Inspect the container startup logs for permission and
credentials errors instead.

Start the Docker node
^^^^^^^^^^^^^^^^^^^^^

Start the node:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker compose up -d
   sudo docker compose ps

Inspect the startup logs:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker compose logs --tail 100 node

To follow new log messages:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker compose logs --follow node

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
   :caption: Windows PowerShell

   concordium-client raw GetNodeInfo --grpc-ip 127.0.0.1 --grpc-port 20000
   concordium-client raw GetConsensusInfo --grpc-ip 127.0.0.1 --grpc-port 20000

For testnet:

.. code-block:: powershell
   :caption: Windows PowerShell

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
- The node resumes from the existing Windows blockchain database mounted
  through VirtioFS, rather than initializing an empty database.
- If the collector is enabled, the node appears on the appropriate network
  dashboard and its reporting continues.

Validator committee participation depends on network state. A running
container alone does not guarantee that the validator is operating correctly.


Configure automatic startup
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Docker Engine runs as a systemd service inside Ubuntu WSL2, and the
Compose configuration uses the ``unless-stopped`` restart policy.

However, WSL2 does not necessarily start when Windows boots.
To run the Concordium node without requiring a user to sign in,
configure a Windows Task Scheduler task that starts Ubuntu WSL2
at system startup and keeps the distribution running.

.. important::

   The scheduled task must run under the Windows account that owns
   the Ubuntu WSL2 distribution. Use the account password rather
   than an interactive logon session.

   The following commands require an elevated Windows PowerShell
   session.

First, confirm that the Ubuntu distribution is installed:

.. code-block:: powershell
   :caption: Windows PowerShell

   wsl --list --verbose

Confirm that your Ubuntu distribution uses WSL version 2. Note its exact
name, as shown by ``wsl --list --verbose``. The examples below use
``Ubuntu-24.04``; replace this name if your distribution is registered
under a different name.

Open Powershell with Administrator rights and create a scheduled task that starts Ubuntu when Windows boots:

.. code-block:: powershell
   :caption: Windows PowerShell (Administrator)
   :class: migration-copy-raw

   $taskName = "Concordium WSL Autostart"
   $credential = Get-Credential -Message "Enter your Windows account credentials"

   $action = New-ScheduledTaskAction `
       -Execute "$env:WINDIR\System32\wsl.exe" `
       -Argument "-d Ubuntu-24.04 -u root -- /usr/bin/tail -f /dev/null"

   $trigger = New-ScheduledTaskTrigger -AtStartup

   $settings = New-ScheduledTaskSettingsSet `
       -ExecutionTimeLimit (New-TimeSpan -Seconds 0) `
       -RestartCount 3 `
       -RestartInterval (New-TimeSpan -Minutes 1) `
       -MultipleInstances IgnoreNew

   Register-ScheduledTask `
       -TaskName $taskName `
       -Action $action `
       -Trigger $trigger `
       -Settings $settings `
       -User $credential.UserName `
       -Password $credential.GetNetworkCredential().Password `
       -RunLevel Highest

The ``tail -f /dev/null`` process keeps the WSL2 distribution running
after the scheduled task starts. Systemd then starts Docker Engine,
which restores the Concordium container according to its restart policy.

Verify the container restart policy inside Ubuntu WSL2:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker inspect $(sudo docker compose ps -q node) --format 'Status={{.State.Status}} RestartPolicy={{.HostConfig.RestartPolicy.Name}}'

The expected values are ``Status=running`` and
``RestartPolicy=unless-stopped``.

To verify automatic startup, restart Windows and do not sign in
immediately. Check the node's collector reporting from another
device, if available.

After signing in, inspect the scheduled task in an elevated
PowerShell session:

.. code-block:: powershell
   :caption: Windows PowerShell

   Get-ScheduledTaskInfo -TaskName "Concordium WSL Autostart"

Check ``LastRunTime`` and ``LastTaskResult``. A running task that
launches a long-lived WSL process may remain in the ``Running``
state, so task status alone does not prove that Docker and the
Concordium node started successfully.

Then check the container from Ubuntu WSL2, in the directory
containing ``compose.yaml``:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   cd ~/testnet-node
   sudo docker compose ps
   sudo docker compose logs --tail 100 node

For Mainnet, use ``~/mainnet-node`` instead.

Repeat the ``concordium-client`` consensus and validator checks
to confirm that the node resumed correctly.

.. note::

   The scheduled task requires a Windows account with a password
   and permission to run scheduled tasks at system startup.

   The collector is managed inside the same container as the node.
   Container status alone does not confirm that the collector is healthy.


.. dropdown:: Configure P2P access from the local network (optional)

   .. note::

      The examples below use the Testnet P2P port ``8889``.
      For Mainnet, use port ``8888`` instead, matching the
      Mainnet Docker Compose configuration.

   Opening the P2P port to incoming connections is optional.
   The Concordium node can synchronize with the network and
   participate in validation using outbound peer connections.

   If you are running a validator and do not need to accept
   incoming P2P connections, you can safely skip this section.
   The following instructions are only necessary if you want
   other computers on your local network to initiate P2P
   connections to your node.

   With the default WSL2 NAT networking mode, Docker's published P2P
   port may be accessible from Windows through ``127.0.0.1`` but not
   from other computers using the Windows host's LAN address.

   To make the node's P2P port available on the local network, configure
   a Windows TCP port proxy and an inbound firewall rule.

   The following example uses:

   - Windows LAN address: ``192.168.0.3``
   - WSL2 address: ``172.27.252.227``
   - Concordium P2P port: ``8889``
   - Allowed local subnet: ``192.168.0.0/24``

   Replace these addresses with values from your environment.

   Find the Windows LAN IPv4 address in PowerShell. Select the address
   of the physical network interface used to access your local network:

   .. code-block:: powershell
      :caption: Windows PowerShell

      Get-NetIPAddress -AddressFamily IPv4 |
         Where-Object {
            $_.IPAddress -notlike "169.254.*" -and
            $_.InterfaceAlias -notlike "vEthernet*" -and
            $_.InterfaceAlias -notlike "Loopback*"
         } |
         Select-Object InterfaceAlias, IPAddress

   Find the Ubuntu WSL2 IPv4 address:

   .. code-block:: powershell
      :caption: Windows PowerShell

      wsl -d Ubuntu-24.04 -u root -- /usr/sbin/ip -4 -o addr show dev eth0

   The WSL2 address can change after a restart, so the port proxy
   must be refreshed when Windows boots.

   First, configure the TCP port proxy from an elevated PowerShell
   session, substituting your addresses:

   .. code-block:: powershell
      :caption: Windows PowerShell

      netsh interface portproxy add v4tov4 `
         listenaddress=192.168.0.3 listenport=8889 `
         connectaddress=172.27.252.227 connectport=8889

   Allow incoming P2P connections from the local subnet:

   .. code-block:: powershell
      :caption: Windows PowerShell

      New-NetFirewallRule `
         -DisplayName "Concordium Node P2P WSL2" `
         -Direction Inbound -Action Allow -Protocol TCP `
         -LocalAddress 192.168.0.3 -LocalPort 8889 `
         -RemoteAddress 192.168.0.0/24 -Profile Private

   Verify the port proxy:

   .. code-block:: powershell
      :caption: Windows PowerShell

      netsh interface portproxy show v4tov4

   The Windows IP Helper service (``iphlpsvc``) must be running for
   the TCP port proxy to work.

   .. note::

      A DHCP reservation for the Windows computer is recommended so
      its LAN IPv4 address remains stable. If the Windows LAN address
      changes, update the port proxy's listening address and the
      Windows Firewall rule.

      The firewall rule above allows only the specified local subnet.
      Public Internet P2P access requires separate firewall and router
      configuration, if applicable.

      Keep the node's gRPC port restricted to localhost; do not expose
      it through the P2P port proxy.

   .. rubric:: Refresh the P2P port proxy automatically (optional)

   Because the WSL2 IPv4 address may change after a restart, configure
   a scheduled task to refresh the Windows port proxy automatically.

   Create the directory ``C:\ProgramData\Concordium`` and save the
   following script as ``Update-WSLPortProxy.ps1``.

   .. code-block:: powershell
      :caption: Windows PowerShell
      :class: migration-copy-raw

      $ErrorActionPreference = "Stop"
      $distro = "Ubuntu-24.04"
      $listenAddress = "192.168.0.3"
      $port = 8889
      $wslAddress = $null

      for ($attempt = 1; $attempt -le 60; $attempt++) {
         $output = & "$env:WINDIR\System32\wsl.exe" `
            -d $distro -u root -- /usr/sbin/ip -4 -o addr show dev eth0 2>$null

         if ($LASTEXITCODE -eq 0 -and $output -match 'inet\s+(\d+\.\d+\.\d+\.\d+)/') {
            $wslAddress = $Matches[1]
            break
         }

         Start-Sleep -Seconds 5
      }

      if (-not $wslAddress) {
         throw "Unable to determine WSL2 IPv4 address."
      }

      # Update only the Concordium P2P listener.
      & netsh interface portproxy delete v4tov4 `
         listenaddress=$listenAddress listenport=$port | Out-Null

      & netsh interface portproxy add v4tov4 `
         listenaddress=$listenAddress listenport=$port `
         connectaddress=$wslAddress connectport=$port

      if ($LASTEXITCODE -ne 0) {
         throw "Failed to configure Concordium P2P portproxy."
      }

      # Verify that the expected listener exists.
      $rules = & netsh interface portproxy show v4tov4

      if ($LASTEXITCODE -ne 0) {
         throw "Failed to inspect portproxy configuration."
      }

      $expected = "$listenAddress\s+$port\s+$wslAddress\s+$port"

      if (-not (($rules -join "`n") -match $expected)) {
         throw "Concordium P2P portproxy verification failed."
      }

      Write-Output "Portproxy updated: ${listenAddress}:${port} -> ${wslAddress}:${port}"

   Set ``$distro`` to the exact WSL distribution name reported by
   ``wsl --list --verbose``. Set ``$listenAddress`` to the Windows
   LAN IPv4 address and ``$port`` to ``8889`` for Testnet or ``8888``
   for Mainnet.

   Replace ``192.168.0.3`` with your Windows computer's LAN IPv4
   address before saving the script.

   The script waits for Ubuntu WSL2 to become available, discovers
   its current IPv4 address, and updates the Windows TCP port proxy.

   Run the script once from an elevated PowerShell session to verify
   that it works:

   .. code-block:: powershell
      :caption: Windows PowerShell

      powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass `
         -File "C:\ProgramData\Concordium\Update-WSLPortProxy.ps1"

   Verify the resulting configuration:

   .. code-block:: powershell
      :caption: Windows PowerShell

      netsh interface portproxy show v4tov4

   Create a scheduled task to refresh the port proxy at startup.
   Run the following commands from an elevated Windows PowerShell session:

   .. code-block:: powershell
      :caption: Windows PowerShell
      :class: migration-copy-raw

      $taskName = "Concordium WSL PortProxy"
      $credential = Get-Credential -Message "Enter your Windows account credentials"

      $action = New-ScheduledTaskAction `
         -Execute "powershell.exe" `
         -Argument '-NoProfile -NonInteractive -ExecutionPolicy Bypass -File "C:\ProgramData\Concordium\Update-WSLPortProxy.ps1"'

      $trigger = New-ScheduledTaskTrigger -AtStartup
      $trigger.Delay = "PT30S"

      $settings = New-ScheduledTaskSettingsSet `
         -ExecutionTimeLimit (New-TimeSpan -Minutes 10) `
         -RestartCount 3 `
         -RestartInterval (New-TimeSpan -Minutes 1) `
         -MultipleInstances IgnoreNew

      Register-ScheduledTask `
         -TaskName $taskName `
         -Action $action `
         -Trigger $trigger `
         -Settings $settings `
         -User $credential.UserName `
         -Password $credential.GetNetworkCredential().Password `
         -RunLevel Highest

   The task runs under the same Windows account that owns the
   Ubuntu WSL2 distribution. Do not configure it to run as
   ``SYSTEM``, because that account may not have access to the
   user's registered WSL2 distribution.

   The 30-second delay allows the WSL2 startup task to begin
   before the port proxy is updated. The script also retries
   while waiting for the WSL2 network interface to become available.

   Verify the scheduled task:

   .. code-block:: powershell
      :caption: Windows PowerShell

      Get-ScheduledTaskInfo -TaskName "Concordium WSL PortProxy"

   After restarting Windows, confirm that the task completed
   successfully and that the port proxy points to the current
   WSL2 IPv4 address:

   .. code-block:: powershell
      :caption: Windows PowerShell

      netsh interface portproxy show v4tov4
      wsl -d Ubuntu-24.04 -u root -- /usr/sbin/ip -4 -o addr show dev eth0

   To test connectivity from another Windows computer on the local
   network, run the following command in PowerShell:

   .. code-block:: powershell
      :caption: Windows PowerShell

      Test-NetConnection -ComputerName 192.168.0.3 -Port 8889

   Replace the address with the Windows host's LAN IPv4 address.
   For Mainnet, use port ``8888`` instead.

   A successful test reports ``TcpTestSucceeded : True``.
   If the test fails, check the Windows Firewall rule, the port
   proxy configuration, and whether the Docker node is running.

   .. note::

      The port proxy refreshes at Windows startup. If WSL2 is
      restarted separately and receives a different IPv4 address,
      rerun ``Update-WSLPortProxy.ps1`` from an elevated PowerShell
      session.

      This scheduled task is only required when incoming P2P
      connections have been enabled. It is not necessary for
      normal validator operation.

6. Roll back or retire the Windows installation
===============================================

If the Docker node does not operate correctly, you may be able to return
to the native Windows installation.

Because Docker uses the original Windows database directly through
VirtioFS, the database may have been modified during migration.
Rolling back safely may require restoring the pre-migration backup.

Roll back to the Windows node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Before rolling back, disable the scheduled task that starts Ubuntu WSL2
automatically when Windows boots. Otherwise, Docker may restart the
validator container after a reboot.

Open Windows PowerShell as an administrator:

.. code-block:: powershell
   :caption: Windows PowerShell

   Disable-ScheduledTask -TaskName "Concordium WSL Autostart"

If you configured optional P2P port forwarding, disable its
scheduled task as well:

.. code-block:: powershell
   :caption: Windows PowerShell

   Disable-ScheduledTask -TaskName "Concordium WSL PortProxy"

These commands disable the scheduled tasks without deleting them.
They can be enabled again if you decide to return to Docker.

Next, stop the Docker node from Ubuntu WSL2, in the directory containing
``compose.yaml``:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker compose stop
   sudo docker compose logs --tail 100 node
   sudo docker compose down
   sudo docker ps

Check the logs to confirm that the node shut down cleanly.
Make sure that no Docker container continues using the same validator
credentials.

.. warning::

   Never run the original Windows validator and the Docker validator
   simultaneously with the same credentials.

   The Docker node has been writing directly to the original Windows
   database. Do not assume that the older native Windows node can
   read the database after it has been used by a newer Docker image.

   If database compatibility cannot be confirmed, restore the
   pre-migration backup before starting the native Windows service.
   Restore it only after Docker has been stopped completely.
   Preserve the current database separately if it may be needed
   for troubleshooting or returning to Docker.

Before restarting the native Windows service, confirm that its node
version is compatible with the current Concordium network protocol.

If necessary, restore the complete pre-migration database backup to
the original Windows data directory. Verify that the restored database
belongs to the correct network and that the native node configuration
still references that directory.

Only after these checks, open PowerShell as an administrator and
restore the original service:

.. code-block:: powershell
   :caption: Windows PowerShell

   Set-Service ConcordiumNode -StartupType Automatic
   Start-Service ConcordiumNode
   Get-Service ConcordiumNode | Select-Object Name,Status,StartType

The original node will need to catch up with blocks finalized while
the Docker node was running.

Retire the native Windows installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After the Docker node has passed all verification checks, including
successful recovery after a Windows reboot, monitor it for an appropriate
observation period.

Keep the native Windows service disabled while Docker is operating:

.. code-block:: powershell
   :caption: Windows PowerShell

   Get-Service ConcordiumNode | Select-Object Name,Status,StartType

The expected status is ``Stopped`` with startup type ``Disabled``.

When you no longer need the native installation, you can uninstall the
deprecated Windows Node Runner using the normal Windows application
uninstallation procedure.

Before removing any files:

- Confirm that the Docker node is running and synchronized.
- For validators, confirm that the original validator identity is active.
- Confirm that Ubuntu WSL2, Docker Engine, and the Concordium node start
  automatically after a Windows reboot, without requiring a user to sign in.
- Preserve validator credentials and any required backups.
- Preserve the Windows database directory referenced by ``compose.yaml``,
  because it contains the active Docker blockchain state.
- Retain the pre-migration backup according to your rollback and
  recovery requirements.

.. warning::

   The original Windows blockchain database is also the active
   Docker database when using the VirtioFS bind mount.

   Do not delete, move, or modify this directory while the Docker
   node is using it. Uninstalling the native Windows Node Runner
   must not remove the database directory referenced by
   ``compose.yaml``.

   Preserve validator credentials and any backups required for
   recovery. Verify the uninstall procedure before removing
   the deprecated Windows installation.

For future Docker image upgrades, see :ref:`upgrade-docker-image`.
