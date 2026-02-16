.. _advanced-node-configuration-on-docker:

=====================================
Advanced node configuration on Docker
=====================================

.. Note::
   If the node is `configured with TLS <https://github.com/Concordium/concordium-node/blob/main/docs/grpc2.md#grpc-api-v2>`_, then `CONCORDIUM_NODE_COLLECTOR_GRPC_HOST` must be configured such that it uses the domain of the certificate, for example, ``CONCORDIUM_NODE_COLLECTOR_GRPC_HOST=https://example.concordium-node.io:20000``.


Enable inbound connections
--------------------------

If you are running your node behind a firewall, or behind your home
router, then you will probably only be able to connect to other nodes,
but other nodes will not be able to initiate connections to your node.
This is perfectly fine, and your node will fully participate in the
Concordium network. It will be able to send transactions and,
:ref:`if so configured<become-a-validator>`, to produce blocks.

However you can also make your node an even better network participant by
enabling inbound connections. The sample configuration makes the node
listen on port ``8888`` for Mainnet and ``8889`` for Testnet for inbound connections. Depending on your network and
platform configuration you will either need to forward an external port to
``8888`` or ``8889`` on your router, open it in your firewall, or both. The details of how
this is done will depend on your configuration.

Mounting host directories under SELinux
---------------------------------------

When mounting host directories on distributions running `SELinux <https://en.wikipedia.org/wiki/Security-Enhanced_Linux>`_ special considerations apply.
In particular, this includes Fedora and its derivatives. See `the Docker documentation <https://docs.docker.com/storage/bind-mounts/#configure-the-selinux-label>`_ for details on how to proceed.

Letting the node container access the internet
----------------------------------------------

Some Linux distributions whose firewall is not based on iptables, Fedora and
CentOS among them, require additional steps to allow docker containers to access
external networks, e.g., the internet.

On Fedora run the following command to allow docker containers to access external networks.

.. code-block:: console

   $sudo firewall-cmd --permanent --zone=trusted --add-interface=docker0

Note that this will allow any Docker container access to the internet,
not just the Concordium node.

Some users on Ubuntu have reported the node does not have internet access. In this case, adding `network_mode: bridge` to each service might solve this problem:

.. code-block:: yaml
   :emphasize-lines: 4, 8

   services:
     mainnet-node:
       container_name: mainnet-node
       network_mode: bridge
       ...
     mainnet-node-collector:
       container_name: mainnet-node-collector
       network_mode: bridge
       ...

