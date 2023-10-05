.. _node-requirements:

========================
Run a node on Concordium
========================

When you run a node on the Concordium blockchain, you are participating in the Concordium blockchain by validating transactions.

Nodes are required for most things, from using a Concordium wallet to baking. You can choose to run a node yourself or you can have a third-party provider run a node for you. If you choose to run the node yourself, you can
choose from four different platforms to run your node: Ubuntu, Windows, MacOS, or Docker/Linux.

System requirements to run a node
=================================

The following are the minimum system requirements for running a node. If your system does not meet or exceed these requirements, you might not be able to run the node properly.

You need a broadband connection to run a node, and Concordium strongly recommends that the node is running around the clock in a reliable place. This is especially important if you're running a baker node.

If you use a laptop in combination with Docker, sleep mode can cause problems with the Docker container used to run the node.

.. _system-requirements-node-mainnet:

System requirements
-------------------

-  CPU: A quad core CPU or better of a new generation x64 (AMD Ryzen™ 5000 series or Intel® Core™ 11000 series desktop or mobile CPUs or CPU with similar single threaded performance).

-  Minimum 16 GB of RAM.

-  Minimum of 1TB fast SSD disk space available (minimum NVMe PCI Express 3.0 4x SSD).

Platforms
---------

You can run a node on :ref:`Ubuntu<ubuntu-node>`, :ref:`Docker<docker-node>`, :ref:`Windows<windows-node>`, or :ref:`MacOS<macos-node>`.

Node metrics
============

You can use the `Prometheus monitoring system <https://prometheus.io/download/>` to export node metrics for monitoring your node performance. For information about configuration and the exposed metrics, see the `documentation in the repository <https://github.com/Concordium/concordium-node/blob/main/docs/prometheus-exporter.md>`__.

For node runners using Grafana®, Concordium provides a node performance dashboard using the exposed Prometheus metrics. You can `download it from the Grafana marketplace <https://grafana.com/grafana/dashboards/18983-concordium-node-external/>`__.

Synchronize a node with the network
===================================

When you start a node for the first time, it can take a while to synchronize
the node with the rest of the network, since it has to get all blocks from
its peers.

The startup time of the node can be improved by downloading the blocks from
an out-of-band catchup service before starting the node. While it will still
take time to process the blocks, it will typically be faster than requesting
them from peers.

This feature is enabled by default in all operating systems since version 6.1
and is controlled by the ``CONCORDIUM_NODE_CONSENSUS_DOWNLOAD_BLOCKS_FROM``
environment variable in the configuration file. To disable this feature
unset the environment variable.

.. Note::

    Subscribe to the `Mainnet status page <https://status.mainnet.concordium.software/>`_ and the `release information on Discourse <https://support.concordium.software/c/releases/9>`_ to stay informed about updates and changes that may affect you as a node runner, including node software releases and protocol updates.

    To subscribe to updates on the Mainnet status page click **Subscribe** to get all updates or click **Get updates** to choose to get all updates or only updates for specific products.

.. toctree::
    :hidden:
    :maxdepth: 1

    ubuntu
    macos
    windows
    docker
