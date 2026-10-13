.. _advanced-docker-image:

=====================================
Advanced node configuration on Docker
=====================================

.. admonition:: At a glance

   Configure network access, TLS, and monitoring for the Docker image.
   You need a running node and its Compose file.
   After these procedures, your node uses the settings that you select.

.. note::

   This guide assumes the setup in :ref:`install-node-docker-image`.
   If you use different paths, filenames, service names, or ports, adjust the
   commands and examples to match your setup.

Run the commands from the network directory that contains ``compose.yaml``.
Use ``mainnet-node/`` for mainnet or ``testnet-node/`` for testnet.
The Compose service is ``node`` and mounts ``./data`` at ``/mnt/data``.
Add settings to the existing service. Keep the other environment entries and mounts.

Change node settings
====================

1. Check the available options in the selected image:

   .. code-block:: console

      $docker compose run --rm node --help

2. Add the required environment entries to the Compose file.
3. Check the file with ``docker compose config --quiet``.
4. Stop the service with ``docker compose stop``.
5. Check the logs for a clean shutdown.
6. Apply the settings with ``docker compose up --detach``.

Keep the image's default ``entrypoint``.
An override can prevent the image from managing the node and collector.

Configure inbound P2P connections
=================================

The installation examples use P2P port ``8888`` for mainnet and ``8889`` for testnet.
Open the applicable TCP port in your firewall.
If you use a router, forward that port to the Docker host.

If the host and container ports differ, set ``CONCORDIUM_NODE_EXTERNAL_PORT``
to the external port. Keep ``CONCORDIUM_NODE_LISTEN_PORT`` equal to the
container port in the Compose mapping.

Check Docker's firewall rules. Do not rely only on the host firewall rules.
For connection problems, see :ref:`troubleshoot-docker-image`.

Configure gRPC access and TLS
=============================

The examples limit host gRPC access to the loopback interface.
Mainnet uses host port ``20000``. Testnet uses host port ``20001``.
Both examples use container port ``20000``.

For remote clients, select a trusted host interface and configure access controls.
Do not expose an unprotected gRPC endpoint to the internet.

For TLS settings, follow the
`gRPC TLS instructions <https://github.com/Concordium/concordium-node/blob/main/docs/grpc2.md#grpc-api-v2>`_.
Mount the certificate and key files read-only.
Use their container paths in the node settings.
Make sure that UID ``10001`` can read the required files.
Do not give all users read access to private keys.

With TLS enabled, set ``CONCORDIUM_NODE_COLLECTOR_GRPC_HOST`` to an HTTPS URL.
Use the certificate domain and the container gRPC port, for example
``https://node.example.com:20000``.
Make sure that this domain resolves to the node from inside the container.
The host port mapping does not change the collector's internal endpoint.

Configure the collector
=======================

The Docker image can run the collector in the node container.
To enable it, set these environment entries:

- ``CONCORDIUM_NODE_COLLECTOR_ENABLED``: ``"true"``.
- ``CONCORDIUM_NODE_COLLECTOR_NODE_NAME``: your dashboard name.
- ``CONCORDIUM_NODE_COLLECTOR_URL``: the backend URL for your network.

Use the network backend URL from :ref:`configure-docker-image`.
To disable reports, set ``CONCORDIUM_NODE_COLLECTOR_ENABLED`` to ``"false"``.

The default collector endpoint is ``http://127.0.0.1:20000`` inside the container.
If you change the container gRPC port, change the collector endpoint to agree.
If the collector stops, the node continues to run.
The image does not restart the collector automatically.
See :ref:`troubleshoot-docker-image` before you restart the service.

Enable Prometheus metrics
=========================

The Prometheus exporter is disabled by default.
Add these entries to the existing ``node`` service:

.. code-block:: yaml

   ports:
     - "127.0.0.1:9100:9100"
   environment:
     CONCORDIUM_NODE_PROMETHEUS_LISTEN_ADDRESS: 0.0.0.0
     CONCORDIUM_NODE_PROMETHEUS_LISTEN_PORT: "9100"

Keep the existing port mappings and environment entries.
Apply the settings with the procedure above.
Read the metrics from the host:

.. code-block:: console

   $curl --fail http://127.0.0.1:9100/metrics

The exporter does not require authentication.
Limit access to a trusted interface or use your monitoring access controls.
If Prometheus uses the same Compose network, it can read ``node:9100``.
In that case, you do not need a host port mapping for metrics.

Configure mounted files
=======================

The image uses UID and GID ``10001:10001``.
Give this identity the required access to mounted files and directories.
Do not change the original state ownership during migration.

On hosts with SELinux, mounts can need additional labels.
Follow the
`Docker SELinux instructions <https://docs.docker.com/storage/bind-mounts/#configure-the-selinux-label>`_.
Do not disable host security controls to correct a file access problem.

For validator credentials, see :ref:`import-validator-keys`.
For an existing validator, use the applicable migration guide instead of
registering new keys.
