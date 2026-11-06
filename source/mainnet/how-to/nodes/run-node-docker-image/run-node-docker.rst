.. _install-node-docker-image:

===================================
Install and manage a node on Docker
===================================

.. admonition:: At a glance

   Use Docker Compose to run a mainnet or testnet node on Linux or macOS.
   You need Docker Engine and the Compose plugin.
   After this procedure, your node runs in a Docker container.

The ``concordium/node`` Docker image includes the node, the collector, and both
network genesis files. Select the network in the Compose file.

If you are running a node already, avoid catching up from scratch using the matching migration guide:

- :ref:`Ubuntu package migration guide<migrate-debian-to-docker>`.
- :ref:`Network-specific docker image migration guide<migrate-network-specific-images>`.
- :ref:`macOS package migration guide <migrate-macos-to-docker>` (Docker Desktop).
- :ref:`Windows node migration guide <migrate-windows-to-docker>` (Docker Engine in WSL2).

Prerequisites
=============

- Meet the :ref:`node requirements <node-requirements>`.
- Make sure that the selected image is available for your host platform.

.. tab-set::
   :sync-group: os

   .. tab-item:: Linux
      :sync: linux

      Install `Docker Engine <https://docs.docker.com/engine/install/>`__ and the
      `Compose plugin <https://docs.docker.com/compose/install/>`_.

   .. tab-item:: macOS
      :sync: macos

      Install and start `Docker Desktop for Mac
      <https://docs.docker.com/desktop/setup/install/mac-install/>`_.
      Allocate resources that meet the node requirements. Keep Docker Desktop
      running while the node runs; container restart policies do not start
      Docker Desktop itself after a reboot.

   .. tab-item:: Windows
      :sync: windows

      Install `WSL2 with Ubuntu <https://learn.microsoft.com/en-us/windows/wsl/install>`__,
      then install `Docker Engine <https://docs.docker.com/engine/install/ubuntu/>`__
      and the `Docker Compose plugin <https://docs.docker.com/compose/install/linux/>`__
      inside Ubuntu. Docker Desktop is not required. Ensure WSL2 has
      sufficient resources to meet the node requirements.

      Enable `systemd in WSL2
      <https://learn.microsoft.com/en-us/windows/wsl/systemd>`_. Inside Ubuntu,
      verify that PID 1 reports ``systemd`` and that Docker and Compose work:

      .. code-block:: bash
         :caption: Ubuntu WSL2 (Bash)

         ps -p 1 -o comm=
         sudo docker version
         sudo docker compose version

      Use ``sudo`` for Docker commands inside Ubuntu if your user does not
      have Docker socket access. Systemd does not start WSL2 when Windows boots;
      see :ref:`autostart-docker-image` for optional boot-time startup.

.. _configure-docker-image:

Configure a node
================

1. Create a directory for storing node configuration and data, like ``mainnet-node`` or ``testnet-node``.
2. In the directory, create ``compose.yaml`` from one the network-configuration examples below.
3. Replace the collector name with your desired node's dashboard name, :emphasis:`note this name will be publicly visible`.

.. tab-set::
   :sync-group: os

   .. tab-item:: Linux
      :sync: linux

      .. dropdown:: Mainnet ``mainnet-node/compose.yaml`` example

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

      .. dropdown:: Testnet ``testnet-node/compose.yaml`` example

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

   .. tab-item:: macOS
      :sync: macos

      The current image uses AMD64. ``platform`` selects that architecture;
      Apple Silicon Macs require emulation. Check the selected image tag's
      architecture and verify that your node keeps up with the network.

      .. dropdown:: Mainnet ``mainnet-node/compose.yaml`` example

         .. code-block:: yaml

            services:
              node:
                image: concordium/node:latest
                platform: linux/amd64
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

      .. dropdown:: Testnet ``testnet-node/compose.yaml`` example

         .. code-block:: yaml

            services:
              node:
                image: concordium/node:latest
                platform: linux/amd64
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


   .. tab-item:: Windows
      :sync: windows

      On Windows 10 and 11, run Docker Engine directly inside Ubuntu WSL2,
      without Docker Desktop. Create a separate directory for each network
      and save the appropriate configuration as ``compose.yaml``.

      .. dropdown:: Mainnet ``mainnet-node/compose.yaml`` example

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
                  - ./data:/mnt/data
                environment:
                  CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE: /genesis/mainnet-genesis.dat
                  CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES: bootstrap.mainnet.concordium.software:8888
                  CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM: https://catchup.mainnet.concordium.software/blocks.idx
                  CONCORDIUM_NODE_COLLECTOR_ENABLED: "true"
                  CONCORDIUM_NODE_COLLECTOR_NODE_NAME: my-mainnet-node
                  CONCORDIUM_NODE_COLLECTOR_URL: https://dashboard.mainnet.concordium.software/nodes/post

      .. dropdown:: Testnet ``testnet-node/compose.yaml`` example

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
                  - ./data:/mnt/data
                environment:
                  CONCORDIUM_NODE_CONSENSUS_GENESIS_DATA_FILE: /genesis/testnet-genesis.dat
                  CONCORDIUM_NODE_CONNECTION_BOOTSTRAP_NODES: bootstrap.testnet.concordium.com:8888
                  CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM: https://catchup.testnet.concordium.com/blocks.idx
                  CONCORDIUM_NODE_LISTEN_PORT: "8889"
                  CONCORDIUM_NODE_COLLECTOR_ENABLED: "true"
                  CONCORDIUM_NODE_COLLECTOR_NODE_NAME: my-testnet-node
                  CONCORDIUM_NODE_COLLECTOR_URL: https://dashboard.testnet.concordium.com/nodes/post

      The ``./data`` directory stores the blockchain database and node data
      persistently inside Ubuntu WSL2. Keep Mainnet and Testnet in separate
      directories, each with its own ``compose.yaml`` and ``data`` directory.


The examples mount a local ``./data`` directory beside the ``compose.yaml`` ensuring the node data and configurations are persisted across restart and updates.

The examples give public access to the P2P port and limit host gRPC access to the loopback interface.
Testnet uses host port ``20001`` and container port ``20000``.

They setup the network specific genesis data and the concordium-provided bootstrapper nodes, source for out-of-band blocks (improves catchup time) and enables the collector handling telemetrics which allows the node to show up in the various blockchain explorers.

.. note::

   The image runs as a non-root user with user ID (UID) ``10001`` and group ID (GID) ``10001``.
   This intentionally limits the process's permissions inside the container.
   The container user must be able to write to the mounted ``data/`` directory, therefore instructions below cover creating this directory and handing ownership to the container user.

Start the node
==============

1. Open a terminal in the directory that contains ``compose.yaml`` from the previous section.
2. For a new node, we first have to create the local state directory and give container user ownership:

   .. code-block:: console

      $ mkdir data
      $ sudo chown 10001:10001 data

3. Start the node using

   .. code-block:: console

     $ docker compose up --detach

   For network and TLS settings, see :ref:`advanced-docker-image`.
   For startup or reporting problems, see :ref:`troubleshoot-docker-image`.

4. Verify the node is running by inspecing the logs:

   .. code-block:: console

     $ docker compose logs --follow

.. _autostart-docker-image:

Start automatically at system boot (optional)
================================================

The Compose configuration uses ``restart: unless-stopped``. This policy can
restart the container when Docker starts, but it does not start Docker itself
or a WSL2 distribution. A container you explicitly stop remains stopped until
you start it again.

Configure automatic startup only after verifying that your node runs correctly.

.. tab-set::
   :sync-group: os

   .. tab-item:: Linux
      :sync: linux

      On a systemd-based host, enable Docker Engine at system boot:

      .. code-block:: console

         $sudo systemctl enable --now docker

      After a reboot, confirm that Docker and the node are running. Check the
      node logs, peer connections, and recent, advancing finalized blocks.
      If enabled, check collector reporting and validator status as well.

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
         the Ubuntu WSL2 distribution. Use the account password rather than
         an interactive logon session. Run the following commands in an
         elevated Windows PowerShell session.

      Confirm that your Ubuntu distribution uses WSL version 2. Note its exact
      name, as shown by ``wsl --list --verbose``. The examples below use
      ``Ubuntu-24.04``; replace it with your registered distribution name.

      Create the startup task:

      .. code-block:: powershell
         :caption: Windows PowerShell (Administrator)
         :class: autostart-copy-raw

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

      In Ubuntu WSL2, open the directory containing ``compose.yaml`` and verify
      the container restart policy:

      .. code-block:: bash
         :caption: Ubuntu WSL2 (Bash)

         sudo docker inspect $(sudo docker compose ps -q node) --format 'Status={{.State.Status}} RestartPolicy={{.HostConfig.RestartPolicy.Name}}'

      The expected values are ``Status=running`` and
      ``RestartPolicy=unless-stopped``.

      Restart Windows and do not sign in immediately. Check collector reporting
      from another device, if available. Once you sign in, check the node logs,
      peer connections, and recent, advancing finalized blocks. For validators,
      verify the expected identity and status.

      Before stopping the node permanently, disable the startup task in an
      elevated Windows PowerShell session:

      .. code-block:: powershell
         :caption: Windows PowerShell (Administrator)

         Disable-ScheduledTask -TaskName "Concordium WSL Autostart"

.. raw:: html

   <script>
   // Preserve PowerShell variables instead of stripping their leading '$'.
   document.addEventListener('click', function (event) {
      const button = event.target.closest('button.copybtn');
      if (!button) return;
      const selector = button.getAttribute('data-clipboard-target');
      const target = selector && document.querySelector(selector);
      if (!target?.closest('.autostart-copy-raw')) return;
      event.stopImmediatePropagation();
      event.preventDefault();
      navigator.clipboard.writeText(target.innerText.replace(/\n+$/, '') + '\n')
         .then(() => button.setAttribute('data-tooltip', 'Copied!'))
         .catch(() => button.setAttribute('data-tooltip', 'Copy failed'));
   }, true);
   </script>

.. _upgrade-docker-image:

Upgrade the node
================

1. Read the `release notes <https://github.com/Concordium/concordium-node/releases>`_
   for any additional instructions.
2. Stop the node by running ``docker compose stop`` from the directory that contains ``compose.yaml``.
3. Check the logs for a clean shutdown ``docker compose logs``.
4. If the Compose file uses a fixed tag, update the ``image`` entry to the new
   version. Then run ``docker compose pull`` to download the selected image.
   Run this command for both ``latest`` and fixed tags.
5. Start the node with ``docker compose up --detach``.
6. Verify the node is running by inspecing the logs:

   .. code-block:: console

     $ docker compose logs --follow

.. _remove-docker-image:

Stop or remove the node
=======================

To stop and take down the node run:

.. code-block:: console

   $ docker compose stop
   $ docker compose down

The example configurations use 5 minute shutdown grace period for the node to stop.
Check the logs for a clean shutdown.

.. warning::

   If you delete the local state directory, you lose its data and configuration.
   Do not delete this directory during migration or rollback.
   First, check that the new installation operates correctly.
   Then, remove old state or backups only as permitted by your retention policy.

.. _validator-docker-image:

Run a validator node
====================

For a new validator, see :ref:`Import validator keys <import-validator-keys>`.
For an existing Debian validator, follow :ref:`migrate-debian-to-docker`.
For an existing macOS validator, follow :ref:`migrate-macos-to-docker`.
Use the existing validator keys. Do not generate new keys or register them again.
