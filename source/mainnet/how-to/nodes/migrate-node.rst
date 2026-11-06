.. _migrate-to-docker:

=============================
Migrate from old distribution
=============================

.. admonition:: At a glance

   Move an existing node to the ``concordium/node`` Docker image on the same
   computer. You need Docker Compose and access to your existing state and
   validator credentials. After migration, Docker runs your node using its
   existing state and settings.

These procedures cover mainnet and testnet on the same computer, not transfers
to another host or custom networks. Examples use mainnet; for testnet, use its
service names, paths, ports, and Compose configuration. Migrate each network
using a separate working directory.

State means the node database and saved configuration. Plan downtime and keep
the original configuration and validator credentials. Ubuntu, macOS, and legacy
Docker migrations copy the state and retain the original for rollback. Windows
reuses its database directly through VirtioFS; back it up after stopping the
native node and before Docker writes to it.

.. warning::

   Never run two nodes with the same validator credentials simultaneously.

Prerequisites
=============

Meet the :ref:`node requirements <node-requirements>` and check that the
selected Docker image is available for your host platform.

.. tab-set::
   :sync-group: migration

   .. tab-item:: Ubuntu
      :sync: ubuntu

      Install `Docker Engine <https://docs.docker.com/engine/install/>`__ and the
      `Compose plugin <https://docs.docker.com/compose/install/>`__.
      Allow enough disk space for a copy of the node state.

   .. tab-item:: macOS
      :sync: macos

      Install and start `Docker Desktop for Mac
      <https://docs.docker.com/desktop/setup/install/mac-install/>`__.
      Allocate resources that meet the node requirements and allow enough disk
      space for the copied database. Configure file sharing for external drives
      if needed. Keep Docker Desktop running while the node runs; container
      restart policies do not start Docker Desktop after a reboot.

   .. tab-item:: Windows
      :sync: windows

      Install `WSL2 with Ubuntu
      <https://learn.microsoft.com/en-us/windows/wsl/install>`__, then install
      `Docker Engine <https://docs.docker.com/engine/install/ubuntu/>`__ and the
      `Compose plugin <https://docs.docker.com/compose/install/linux/>`__ inside
      Ubuntu. Docker Desktop is not required. The examples use ``Ubuntu-24.04``;
      substitute your registered distribution name where needed.
      Allocate resources that meet the node requirements. Keep enough free space
      on the Windows database drive for blockchain growth and in Ubuntu for
      Docker images and configuration.

      Enable `systemd in WSL2
      <https://learn.microsoft.com/en-us/windows/wsl/systemd>`_. Inside Ubuntu,
      verify that PID 1 reports ``systemd`` and that Docker and Compose work:

      .. code-block:: bash
         :caption: Ubuntu WSL2 (Bash)

         ps -p 1 -o comm=
         sudo docker version
         sudo docker compose version

      This guide uses ``sudo`` for Docker commands; Docker group membership is
      not required. Restrict Docker socket access to trusted users because it
      grants root-equivalent privileges. Enabling systemd does not make Windows
      start WSL2 at boot; see :ref:`migration-autostart`.
   .. tab-item:: Legacy Docker images
      :sync: docker

      Ensure Docker Compose is installed and allow enough disk space for a
      copy of the node state. Use Docker Engine on Linux, Docker Desktop on
      macOS, or Docker Engine inside Ubuntu WSL2 on Windows; see the
      prerequisites in :ref:`install-node-docker-image`.

.. _migration-prepare:

1. Find settings and prepare
============================

Record the original settings and state paths before changing anything.
Use your actual paths if they differ from the examples.

.. tab-set::
   :sync-group: migration

   .. tab-item:: Ubuntu
      :sync: ubuntu
      :name: migrate-debian-to-docker

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

   .. tab-item:: macOS
      :sync: macos
      :name: migrate-macos-to-docker

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

   .. tab-item:: Windows
      :sync: windows
      :name: migrate-windows-to-docker

      .. rubric:: Enable VirtioFS for Windows drives

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

      .. rubric:: Locate the existing Windows node configuration

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

   .. tab-item:: Legacy Docker images
      :sync: docker
      :name: migrate-network-specific-images

      Keep a protected copy of the old Compose file. Record its image version,
      state bind mount, validator credential mount, custom node settings, collector
      settings, and port mappings. Keep the original state and image for rollback.
      Exporting state from an old named volume is outside this guide's scope.

      Check the release notes for a supported upgrade from your installed version.

.. _migration-configuration:

2. Translate configuration
==========================

Create a new working directory and open a terminal there. On Windows, run
these commands inside Ubuntu WSL2. Use ``testnet-node`` for testnet:

.. code-block:: console

   $mkdir -m 0700 mainnet-node
   $cd mainnet-node

Create ``compose.yaml`` from the matching network example in
:ref:`configure-docker-image`. Do not run the installation guide's new-node
data-directory preparation commands or start the node yet. Run subsequent
Compose and state-copy commands beside this new file.

Keep the image's default entrypoint, which manages both node and collector.
Keep the example's network-specific genesis path, bootstrap nodes, collector
backend URL, and ``stop_grace_period: 5m``. Increase the grace period if needed
for a clean shutdown.

Translate applicable existing settings:

- **Collector:** Preserve the public node name in
  ``CONCORDIUM_NODE_COLLECTOR_NODE_NAME`` and any custom reporting settings.
  If reporting was disabled, set ``CONCORDIUM_NODE_COLLECTOR_ENABLED`` to
  ``"false"``.
- **Catch-up:** Preserve custom catch-up settings. If out-of-band catch-up was
  disabled, remove ``CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM``.
  Otherwise, keep the network URL from the example unless you use a custom URL.
- **Inbound connections:** Preserve firewall and router forwarding for mainnet
  port ``8888`` or testnet port ``8889``. Verify Docker's firewall behavior and,
  on macOS, access through Docker Desktop.
- **gRPC:** The container uses port ``20000`` for either network. Examples expose
  it on loopback host port ``20000`` for mainnet or ``20001`` for testnet.
  Configure trusted access for existing remote clients.
- **TLS and other file mounts:** Mount certificates and keys read-only and use
  container paths. Match the collector's gRPC URL to the certificate domain
  and container port. Preserve other required mounts and runtime settings.
- **Validator credentials:** Use your existing keys as described in step 4.

See :ref:`advanced-docker-image` for advanced settings and remote access.
The image uses ``/mnt/data`` for both the database and saved configuration.
The state mount depends on your existing distribution:

.. tab-set::
   :sync-group: migration

   .. tab-item:: Ubuntu
      :sync: ubuntu

      Copy applicable values into the ``node`` service's
      ``environment`` mapping. For example, translate this collector entry:

      .. code-block:: ini

         [Service]
         Environment="CONCORDIUM_NODE_COLLECTOR_NODE_NAME=My node"

      Into this Compose entry:

      .. code-block:: yaml

         environment:
           CONCORDIUM_NODE_COLLECTOR_NODE_NAME: "My node"

      Do not copy the ``Environment=`` prefix, systemd quoting, ``ExecStart``, or other
      systemd directives into YAML. This procedure covers the package's default
      ``config/`` and ``data/`` directories. The shared instructions above cover
      inbound connections, catch-up, TLS, and the collector name. Read the
      service's ``Environment=`` overrides and ``UnsetEnvironment=`` entries to
      identify these settings; for example,
      ``UnsetEnvironment=CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM`` means
      catch-up was disabled. Migrate other custom settings separately.
      Do not add data or configuration directory overrides: step 3 combines
      both directories in ``./data``.

   .. tab-item:: macOS
      :sync: macos

      Copy applicable plist ``EnvironmentVariables`` values into the ``node`` service's
      ``environment`` mapping. For example:

      .. code-block:: xml

         <key>CONCORDIUM_NODE_COLLECTOR_NODE_NAME</key>
         <string>My node</string>

      becomes:

      .. code-block:: yaml

         environment:
           CONCORDIUM_NODE_COLLECTOR_NODE_NAME: "My node"

      Do not copy launchd directives, native host directory paths, or the legacy
      ``CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE`` setting. Step 3 combines the saved
      configuration and database in ``./data``. Step 4 mounts the existing credentials
      using the current Docker setting.

   .. tab-item:: Windows
      :sync: windows

      Replace the example's state volume with this bind mount for mainnet (use
      ``testnet/data`` for testnet):

      .. code-block:: yaml

         volumes:
           - type: bind
             source: /mnt/c/ProgramData/Concordium/Node Runner/mainnet/data
             target: /mnt/data
             bind:
               create_host_path: false

      The examples mount the existing Windows blockchain database directly
      into the container using VirtioFS. No database copy is required.

      Replace the example ``source`` path with the actual Windows node data
      directory identified in ``nodes.toml``, using its WSL path under
      ``/mnt/<drive-letter>/``.

      The ``create_host_path: false`` option prevents Docker Compose from
      silently creating an empty source directory when the path is incorrect.
      Verify that the directory exists and contains the expected blockchain
      database before starting the container.

      Review custom settings from ``nodes.toml`` and translate applicable values into
      the ``node`` service's ``environment`` mapping. Use container paths for mounted
      files, rather than native Windows paths. Step 3 checks Windows filesystem
      permissions; step 4 mounts the existing validator credentials.

   .. tab-item:: Legacy Docker images
      :sync: docker

      Copy your custom settings from the old Compose file:

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


Do not start Docker until the original node is stopped and the state and
credential access checks below pass.

.. _migration-state:

3. Stop the old node and prepare state
======================================

Stop the original node cleanly and prevent automatic restart before copying or
mounting its state. Do not copy a database from a running node.

The container runs with UID/GID ``10001:10001``. For state copies, change
ownership only on the copy, not the original. Windows instead needs access to
its original database through VirtioFS and Windows filesystem permissions.

.. tab-set::
   :sync-group: migration

   .. tab-item:: Ubuntu
      :sync: ubuntu

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

      Replace ``/actual/resolved/concordium-state-directory`` with the real state root.
      In the new Compose directory, copy the saved configuration and database:

      .. code-block:: console

         $mkdir -m 0700 data
         $sudo cp -a /actual/resolved/concordium-state-directory/config/. ./data/
         $sudo cp -ai /actual/resolved/concordium-state-directory/data/. ./data/
         $sudo chown -R 10001:10001 data
         $sudo chmod 0700 data

      The second copy asks before overwriting files. Cancel any overwrite prompt and
      resolve conflicting names. These commands preserve the original state and
      ownership. Check symbolic links to paths outside the bind mount.

   .. tab-item:: macOS
      :sync: macos

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

      Run these commands beside the new Compose file. Substitute the actual source
      directories read from the plist:

      .. code-block:: console

         $mkdir -m 0700 data
         $cp -pR "/actual/native/config-directory/." ./data/
         $cp -piR "/actual/native/data-directory/." ./data/
         $sudo chown -R 10001:10001 data
         $sudo chmod 0700 data

      Cancel any overwrite prompt and resolve conflicting names. If your user cannot
      read the source, use ``sudo`` for the copy. Keep the original directories,
      ownership, and permissions unchanged. Check symbolic links outside the mount.
      Do not use legacy troubleshooting commands to delete database files.

   .. tab-item:: Windows
      :sync: windows

      .. rubric:: Stop and disable the native Windows node

      Open PowerShell as an administrator and stop the native Windows service:

      .. code-block:: powershell
         :caption: Windows PowerShell (Administrator)

         Stop-Service ConcordiumNode
         Set-Service ConcordiumNode -StartupType Disabled
         Get-Service ConcordiumNode | Select-Object Name,Status,StartType

      Confirm that the service reports ``Stopped`` and ``Disabled``.
      Do not start the Docker node while the native Windows node is running.
      Confirm a clean shutdown in the native node logs. Back up the existing database,
      configuration, and credentials before continuing. Docker writes to the original
      database, so rollback may require this pre-migration backup.

      .. rubric:: Verify the existing Windows database

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

      .. rubric:: Configure Windows filesystem permissions

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

   .. tab-item:: Legacy Docker images
      :sync: docker

      Set ``path/to/mainnet-node.yaml`` to the absolute path of your old Compose file.
      For testnet, use the old testnet file:

      .. code-block:: console

         $docker compose -f path/to/mainnet-node.yaml stop --timeout 300
         $docker compose -f path/to/mainnet-node.yaml logs --tail 100

      Check the logs for a clean shutdown before you remove the stopped containers:

      .. code-block:: console

         $docker compose -f path/to/mainnet-node.yaml down

      Make sure that no automatic process starts the old installation again.

      Do not use ``down --volumes`` on the old installation. Find the host directory
      mounted at ``/mnt/data`` in the old Compose file. Replace the example source
      below with its actual path, including for testnet. Run beside the new Compose
      file:

      .. code-block:: console

         $mkdir -m 0700 data
         $sudo cp -a /var/lib/concordium-mainnet/. ./data/
         $sudo chown -R 10001:10001 data
         $sudo chmod 0700 data

      Change ownership only on the state copy, not the Compose file or its parent.
      If configuration and data use separate directories, copy their contents into
      one new directory using the collision checks in the Ubuntu tab of this step.
      Check symbolic links and other paths outside the copied directory.

.. _migration-credentials:

4. Mount existing validator credentials
=======================================

Skip this step for non-validator nodes. Reuse your existing credentials and
registration. Run the commands beside the new ``compose.yaml``. On Windows,
run inside Ubuntu WSL2. Create a protected credential directory:

.. code-block:: console

   $mkdir -m 0700 secrets

.. tab-set::
   :sync-group: migration

   .. tab-item:: Ubuntu
      :sync: ubuntu

      Read the old service's credential setting and ``BindReadOnlyPaths`` mapping.
      Find the actual host file; its path can differ from the path inside the service.
      Copy it into the protected directory:

      .. code-block:: console

         $sudo install -o 10001 -g 10001 -m 0400 /actual/host/validator-credentials.json ./secrets/validator-credentials.json

   .. tab-item:: macOS
      :sync: macos

      Find the existing file using the native plist setting. Older installations use
      ``CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE``. It need not be inside the default
      configuration directory. Copy and protect it:

      .. code-block:: console

         $sudo cp -p "/actual/native/validator-credentials.json" ./secrets/validator-credentials.json
         $sudo chown 10001:10001 secrets/validator-credentials.json
         $sudo chmod 0400 secrets/validator-credentials.json

   .. tab-item:: Windows
      :sync: windows

      Locate the existing file using ``baker_credentials`` in ``nodes.toml``.
      Use its WSL path under ``/mnt/<drive-letter>/``. Inside Ubuntu, replace the
      example source with the actual credential path:

      .. code-block:: bash
         :caption: Ubuntu WSL2 (Bash)

         cp "/mnt/c/Users/<username>/Downloads/validator-credentials.json" ./secrets/validator-credentials.json
         sudo chown 10001:10001 ./secrets
         sudo chmod 700 ./secrets
         sudo chown 10001:10001 ./secrets/validator-credentials.json
         sudo chmod 400 ./secrets/validator-credentials.json
         sudo ls -ldn ./secrets
         sudo ls -ln ./secrets/validator-credentials.json

      Both owner and group must be ``10001``. Permissions must be ``drwx------`` for
      the directory and ``-r--------`` for the file. Your regular Ubuntu user may no
      longer be able to enter ``secrets``; use ``sudo`` to inspect metadata without
      displaying credentials. Do not broaden access to resolve this.


      Add these entries to the ``node`` service, retaining its existing mappings:

      .. code-block:: yaml

         volumes:
           - ./secrets:/run/secrets:ro
         environment:
           CONCORDIUM_NODE_VALIDATOR_CREDENTIALS_FILE: /run/secrets/validator-credentials.json

      Use the directory mount above instead of the file mount below.

   .. tab-item:: Legacy Docker images
      :sync: docker

      Find the host credential file using the old Compose file's bind mount.
      Do not use the Ubuntu package's systemd lookup commands. Copy the existing
      file into a protected ``secrets`` directory:

      .. code-block:: console

         $sudo install -o 10001 -g 10001 -m 0400 /actual/host/validator-credentials.json ./secrets/validator-credentials.json

      The Docker daemon must run as root for this example; rootless Docker UID
      mappings are outside its scope.


For Ubuntu, macOS, and legacy Docker, add these entries to the ``node``
service's existing mappings and lists. Windows uses the directory mount in its
tab above. Retain the other environment entries and state mount; do not create
duplicate YAML keys.

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

The daemon mounts the file; the container's UID ``10001`` must be able to read
it. The Ubuntu and legacy Docker examples assume a rootful Docker daemon.
On macOS, if step 3 also copied credentials into ``data/``, protect that copy
too; this procedure uses the separate read-only ``secrets`` mount.

.. _migration-verification:

5. Start and verify
===================

Check that Compose uses the state prepared in step 3. A forced stop is not a
clean shutdown; retain a sufficient ``stop_grace_period``.

.. tab-set::
   :sync-group: migration

   .. tab-item:: Ubuntu
      :sync: ubuntu

      Check the Compose configuration and download the image:

      .. code-block:: console

         $docker compose config --quiet
         $docker compose pull

      For validators, verify credential access without displaying the file:

      .. code-block:: console

         $docker compose run --rm --no-deps --entrypoint /bin/sh node -c 'test -r /run/secrets/validator-credentials.json'

      Start the node and inspect its status and logs:

      .. code-block:: console

         $docker compose up --detach
         $docker compose ps
         $docker compose logs --follow node

   .. tab-item:: macOS
      :sync: macos

      Check the Compose configuration and download the image:

      .. code-block:: console

         $docker compose config --quiet
         $docker compose pull

      For validators, verify credential access without displaying the file:

      .. code-block:: console

         $docker compose run --rm --no-deps --entrypoint /bin/sh node -c 'test -r /run/secrets/validator-credentials.json'

      Start the node and inspect its status and logs:

      .. code-block:: console

         $docker compose up --detach
         $docker compose ps
         $docker compose logs --follow node

   .. tab-item:: Legacy Docker images
      :sync: docker

      Check the Compose configuration and download the image:

      .. code-block:: console

         $docker compose config --quiet
         $docker compose pull

      For validators, verify credential access without displaying the file:

      .. code-block:: console

         $docker compose run --rm --no-deps --entrypoint /bin/sh node -c 'test -r /run/secrets/validator-credentials.json'

      Start the node and inspect its status and logs:

      .. code-block:: console

         $docker compose up --detach
         $docker compose ps
         $docker compose logs --follow node

   .. tab-item:: Windows
      :sync: windows

      Validate the configuration before pulling or starting the image:

      .. code-block:: bash
         :caption: Ubuntu WSL2 (Bash)

         sudo docker compose config --quiet

      .. rubric:: Download the Docker image

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

      .. rubric:: Start the Docker node

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


Press **Ctrl+C** to stop following logs; this does not stop the node.
Do not accept the migration until all applicable checks pass:

- **State and network:** Confirm the correct network and existing state, not a
  new database. Check for database compatibility, permission, configuration,
  genesis, and credential errors.
- **Consensus:** Check peer connections after catch-up. Use
  ``concordium-client`` on host port ``20000`` for mainnet or ``20001`` for
  testnet. Confirm recent finalized blocks and continued progress.
- **Clients:** Test existing local and remote clients against their endpoints.
- **Collector:** If enabled, check collector logs and dashboard reporting.
  The node can continue running if the collector stops; container status
  alone does not prove collector health.
- **Validator:** Confirm loaded credentials, expected identity, and status as
  described in :ref:`import-validator-keys`. Committee participation depends
  on network state; container status alone is insufficient.
- **macOS:** On Apple Silicon, monitor CPU, memory, and synchronization under
  emulation. Confirm the node keeps up before retiring the native package.

The following client commands apply to Windows. For optional boot-time startup,
see :ref:`migration-autostart`.

.. dropdown:: Windows client commands

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

.. _migration-autostart:

6. Start automatically at system boot (optional)
================================================

The Compose configuration uses ``restart: unless-stopped``. This policy can
restart the container when Docker starts, but it does not start Docker itself
or a WSL2 distribution. A container you explicitly stop remains stopped until
you start it again.

Configure automatic startup only after the migration passes verification.

.. tab-set::
   :sync-group: migration

   .. tab-item:: Ubuntu
      :sync: ubuntu

      Enable Docker Engine at system boot:

      .. code-block:: console

         $sudo systemctl enable --now docker

      After a reboot, confirm that Docker and the node are running and repeat
      the checks in :ref:`migration-verification`.

   .. tab-item:: macOS
      :sync: macos

      Docker Desktop must be running before the container can restart.
      The container restart policy does not launch Docker Desktop after a
      reboot. Starting Docker Desktop at user sign-in is not the same as
      starting a node at system boot without a user signing in.

   .. tab-item:: Windows
      :sync: windows

      Enable Docker Engine inside Ubuntu WSL2:

      .. code-block:: bash
         :caption: Ubuntu WSL2 (Bash)

         sudo systemctl enable --now docker

      This starts Docker when Ubuntu starts, not when Windows boots.
      To run the node without requiring a user to sign in, configure a Windows
      Task Scheduler task that starts Ubuntu WSL2 at system startup and keeps
      the distribution running.

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

      Open PowerShell as an administrator and create the startup task:

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
      device, if available. Repeat the checks in :ref:`migration-verification`
      once you sign in.

   .. tab-item:: Legacy Docker images
      :sync: docker

      Keep the old installation's automatic startup disabled. Configure
      startup for the replacement according to the host: enable the Docker
      service on Linux, start Docker Desktop on macOS, or configure Docker
      and the WSL2 startup task on Windows. The other tabs in this section
      describe these host-specific requirements.

.. _migration-rollback:

7. Roll back or retire the old installation
===========================================

If verification fails, stop Docker before restoring the old installation.
On Windows, first disable any WSL automatic-start task as shown in its tab.
For other distributions, stop the new container and inspect shutdown logs:

.. code-block:: console

   $docker compose stop
   $docker compose logs --tail 100 node
   $docker compose down

Confirm a clean shutdown and that no container continues using the same state
or validator credentials. Check that the network still supports the old binary
before restarting it. The original node must catch up on blocks finalized
during migration.

.. warning::

   Do not give an older binary state modified by Docker unless compatibility
   is confirmed. Ubuntu, macOS, and legacy Docker retain an unchanged original.
   Windows modifies the original database directly and may need its
   pre-migration backup restored after Docker has stopped completely.

After all verification checks pass, monitor the new installation for your
selected observation period before retiring the old one. Keep original state,
configuration, and credentials according to your retention policy.

.. tab-set::
   :sync-group: migration

   .. tab-item:: Ubuntu
      :sync: ubuntu

      1. Check the logs for a clean shutdown.
      2. Make sure that the container does not run.
      3. Restore any service settings that you changed.
      4. Start the original installation with its unchanged original state:

      .. code-block:: console

         $ sudo systemctl enable --now concordium-mainnet-node.service concordium-mainnet-node-collector.service

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

   .. tab-item:: macOS
      :sync: macos

      Confirm a clean shutdown and that the container no longer runs. Restore any
      native settings you changed. Run **Concordium Node Start Mainnet** (or Testnet)
      with the unchanged original state. Check that the network still supports
      the old binary version.

      Restore only the automatic-start links recorded in step 1. For mainnet,
      run each command only if its link existed before migration and is now
      absent. Do not overwrite an existing link or file:

      .. code-block:: console

         $sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist" "/Library/LaunchDaemons/"
         $sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node-collector.plist" "/Library/LaunchDaemons/"

      For testnet, replace ``mainnet`` with ``testnet`` in both filenames.
      Keep the source plists under ``/Library/Concordium Node/LaunchDaemons``
      unchanged. These links restore native startup for rollback, not Docker
      startup.

      After all checks pass, monitor Docker for your selected observation period.
      Then run **Concordium Node Uninstaller** and select **Yes** to retain data and
      keys. Do not select **Yes, and delete data** during migration. The uninstaller
      removes both networks' native installation; migrate both first if you use both.

      Keep original state, plists, and credentials according to your retention policy.
      After uninstalling, native rollback requires installing a suitable package again.
      Do not delete Docker's state directory. For subsequent container upgrades, use
      :ref:`upgrade-docker-image`.

   .. tab-item:: Windows
      :sync: windows

      If the Docker node does not operate correctly, you may be able to return
      to the native Windows installation.

      Because Docker uses the original Windows database directly through
      VirtioFS, the database may have been modified during migration.
      Rolling back safely may require restoring the pre-migration backup.

      .. rubric:: Roll back to the Windows node

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

      .. rubric:: Retire the native Windows installation

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

   .. tab-item:: Legacy Docker images
      :sync: docker

      After stopping the replacement container, start the old installation using its
      original Compose file and unchanged original state. Do not give the old image
      the copy that the replacement modified.

      Keep the old image, Compose file, and state until you accept the migration and
      your observation period has passed. Retain backups according to your policy.


Do not delete Docker's state directory. For future container upgrades, use
:ref:`upgrade-docker-image`.

.. raw:: html

   <script>
   // Named distribution links select the same distribution in every step.
   function selectMigrationTab() {
      const label = document.getElementById(window.location.hash.slice(1));
      if (label?.matches('.sd-tab-label[data-sync-group="migration"]')) {
         label.click();
      }
   }
   document.addEventListener('DOMContentLoaded', selectMigrationTab);
   window.addEventListener('hashchange', selectMigrationTab);
   document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (link && link.hash === window.location.hash &&
          link.pathname === window.location.pathname) {
         selectMigrationTab();
      }
   });
   </script>
