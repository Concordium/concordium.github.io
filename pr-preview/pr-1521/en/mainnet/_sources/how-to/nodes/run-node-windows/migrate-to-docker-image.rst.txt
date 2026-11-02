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

The native Windows node distribution is deprecated. This guide covers migrating Mainnet
and Testnet nodes on Windows 10 and 11 to Docker Engine running directly inside Ubuntu WSL2,
without Docker Desktop. The Docker image includes the node, collector, and genesis files for
both networks. The commands use Mainnet as the default example; for Testnet, use the corresponding
Compose configuration and adjust network-specific paths, ports, and settings.

1. Find settings and prepare
============================

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
disk that grows as data is added. With the direct VirtioFS migration described in this guide, the
existing blockchain database remains on its original Windows drive.
Make sure that drive has enough free space for future blockchain
growth. The Ubuntu filesystem also requires space for Docker images,
configuration, and other Linux files.

To install Ubuntu 24.04 LTS in the default location, run in PowerShell:

.. code-block:: powershell
   :caption: Windows PowerShell

   wsl --install -d Ubuntu-24.04

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

Enable systemd
^^^^^^^^^^^^^^

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

Install Docker Engine and the Docker Compose plugin from Docker's official APT repository.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
   :caption: Windows - nodes.toml

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
The following example uses ``mainnet-node``. For testnet, replace it
with ``testnet-node``.

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   mkdir -m 700 ~/mainnet-node
   cd ~/mainnet-node
   mkdir -m 700 secrets

Create a ``compose.yaml`` file in the working directory using the
``nano`` text editor:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   nano compose.yaml

Copy the configuration for your network from the **Mainnet** or
**Testnet** example below and paste it into the editor.
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

To save the file and exit ``nano``:

#. Press **Ctrl+O** (the letter O) to save the file.
#. Press **Enter** to confirm the filename ``compose.yaml``.
#. Press **Ctrl+X** to exit the editor.

The file is now saved in your node's working directory.

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
   :caption: Windows PowerShell (Administrator)

   Stop-Service ConcordiumNode
   Set-Service ConcordiumNode -StartupType Disabled
   Get-Service ConcordiumNode | Select-Object Name,Status,StartType

Confirm that the service reports ``Stopped`` and ``Disabled``.
Do not start the Docker node while the native Windows node is running.

Verify the existing Windows database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Find the original Windows node data directory using ``nodes.toml``.
Windows drives are accessible from Ubuntu WSL2 under
``/mnt/<drive-letter>/``.

For example, the default Mainnet path is:

.. code-block:: text
   :caption: Windows - Node Runner database path

   C:\ProgramData\Concordium\Node Runner\mainnet\data

The corresponding Ubuntu WSL2 path is:

.. code-block:: text
   :caption: Ubuntu WSL2 - Node Runner database path

   /mnt/c/ProgramData/Concordium/Node Runner/mainnet/data

Inside Ubuntu, verify that the directory exists and contains the
expected database files:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   ls -lah "/mnt/c/ProgramData/Concordium/Node Runner/mainnet/data"

The directory should contain the existing blockchain ``database-v4`` directory, ``data.mdb`` and ``genesis.dat`` files.

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

   $path = "C:\ProgramData\Concordium\Node Runner\mainnet\data"
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

   function fallbackCopy() {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';

      document.body.appendChild(textarea);
      textarea.select();

      let copied = false;
      try {
         copied = document.execCommand('copy');
      } finally {
         document.body.removeChild(textarea);
      }

      return copied;
   }

   function showResult(success) {
      button.setAttribute(
         'data-tooltip',
         success ? 'Copied!' : 'Copy failed'
      );
   }

   if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
         .then(() => showResult(true))
         .catch(() => {
         try {
            showResult(fallbackCopy());
         } catch (error) {
            console.error('Migration guide copy failed:', error);
            showResult(false);
         }
         });
   } else {
      try {
         showResult(fallbackCopy());
      } catch (error) {
         console.error('Migration guide copy failed:', error);
         showResult(false);
      }
   }
   }, true);
   </script>

For Testnet, use the corresponding ``testnet\data`` directory.

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
     --mount "type=bind,source=/mnt/c/ProgramData/Concordium/Node Runner/mainnet/data,target=/mnt/data" \
     concordium/node:latest \
     -c 'test -r /mnt/data/data.mdb && test -w /mnt/data/data.mdb && echo "Database access OK"'

The expected output is ``Database access OK``.

4. Mount existing validator credentials (validators only)
=========================================================

If your existing Windows node is a validator, reuse its current validator
credentials. Do not generate new keys or register the validator again.
Skip this section if you are migrating a non-validator node.

Locate the existing ``validator-credentials.json`` file on Windows.
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

.. warning::

   Validator credentials are sensitive private keys.
   Never commit them to Git, share them publicly, or make them
   world-readable.

   Never run the original Windows validator and the Docker validator
   simultaneously with the same credentials.

5. Start and verify
===================

Download the Docker image
^^^^^^^^^^^^^^^^^^^^^^^^^

In Ubuntu WSL2 navigate to the directory containing ``compose.yaml``.
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

Configure automatic startup (optional)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

Verify the container restart policy inside Ubuntu WSL2:

.. code-block:: bash
   :caption: Ubuntu WSL2 (Bash)

   sudo docker inspect $(sudo docker compose ps -q node) --format 'Status={{.State.Status}} RestartPolicy={{.HostConfig.RestartPolicy.Name}}'

The expected values are ``Status=running`` and
``RestartPolicy=unless-stopped``.

To verify automatic startup, restart Windows and do not sign in
immediately. Check the node's collector reporting from another
device, if available.

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
   :caption: Windows PowerShell (Administrator)

   Disable-ScheduledTask -TaskName "Concordium WSL Autostart"

This command disable the scheduled tasks without deleting them.
It can be enabled again if you decide to return to Docker.

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

After these checks, open PowerShell as an administrator and
restore the original service:

.. code-block:: powershell
   :caption: Windows PowerShell (Administrator)

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

For future Docker image upgrades, see :ref:`upgrade-docker-image`.