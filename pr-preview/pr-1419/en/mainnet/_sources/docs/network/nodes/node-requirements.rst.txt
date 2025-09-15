.. _node-requirements:

=====================
Run a Concordium node
=====================

Running a Concordium node is required for network validation, building custom services, or integrating directly with the blockchain.
If you are a developer, operating your own node enables you to process events, access on-chain data, and build advanced integrations.
You can choose to run a node yourself or have a third-party provider operate it for you.
If you prefer to manage the node yourself, several options are available: :ref:`Ubuntu<run-node-ubuntu>`, :ref:`Windows<run-node-windows>`, :ref:`macOS<run-node-macos>`, :ref:`Docker<run-a-node>`, or cloud platforms such as :ref:`AWS<run-a-node-aws>`.
Alternatively, you can deploy your Concordium node through a decentralized Web3 provider like `Akash Network <https://akash.network/>`_.

When you run a node on the Concordium blockchain as a validator, you participate in the network by producing blocks and validating transactions.

.. Note::

  Subscribe to the `Mainnet status page <https://status.mainnet.concordium.software/>`_ or to the `Testnet status page <https://status.testnet.concordium.software/>`_ and the `release information on Discourse <https://support.concordium.software/c/releases/9>`_ to stay informed about updates and changes that may affect you as a node runner, including node software releases and protocol updates.

  To subscribe, click the **Get updates** button. You can choose all updates or only those for specific components.

System requirements to run a node
=================================

The following are the minimum system requirements for running a node. If your system does not meet or exceed these requirements, you might not be able to run the node properly.

You need a broadband connection to run a node, and Concordium strongly recommends that the node is running around the clock in a reliable place. This is especially important if you're running a validator node.

If you use a laptop in combination with Docker, sleep mode can cause problems with the Docker container used to run the node.

.. _system-requirements-node-mainnet:

Hardware requirements
---------------------

-  CPU: A quad core CPU or better of a new generation x64 (AMD Ryzen™ 5000 series or Intel® Core™ 11000 series desktop or mobile CPUs or CPU with similar single threaded performance).

-  Minimum 16 GB of RAM.

-  Minimum of 1TB fast SSD disk space available (minimum NVMe PCI Express 3.0 4x SSD).

Node metrics
============

You can use the `Prometheus monitoring system <https://prometheus.io/download/>`__ to export node metrics for monitoring your node performance. For information about configuration and the exposed metrics, see the `documentation in the repository <https://github.com/Concordium/concordium-node/blob/main/docs/prometheus-exporter.md>`__.

For node runners using Grafana®, Concordium provides a node performance dashboard using the exposed Prometheus metrics. You can `download it from the Grafana marketplace <https://grafana.com/grafana/dashboards/18983-concordium-node-external/>`__.

Synchronize a node with the network
===================================

When you start a node for the first time, it will take a while to synchronize the node with the network, since it has to get all blocks from its peers.

To speed up this process, Concordium nodes use an out-of-band catch-up service to download blocks as soon as the node starts. While it will still take time to process the blocks, this method is typically faster than requesting them directly from peers.

This feature is enabled by default in all distributions since version 6.1, and our packages are generally already set to use out-of-band catch-up. It is controlled by the ``CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM`` environment variable in the configuration file. To disable this feature, comment out the environment variable.

The speed of synchronization largely depends on the performance of your storage (NVMe drives are highly recommended).

.. toctree::
   :maxdepth: 1
   :hidden:

   run-node-ubuntu/index
   run-node-macos/index
   run-node-windows/index
   run-node-docker/index
   run-node-aws/index
