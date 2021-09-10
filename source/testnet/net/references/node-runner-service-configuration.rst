.. include:: ../../variables.rst
.. _node-runner-service-configuration:

====================================================
Concordium Windows node runner service configuration
====================================================

.. contents::
   :local:
   :backlinks: none

The Concordium Node Runner Service ("service" for short) is configured using a TOML file. This file is typically located at ``C:\ProgramData\Concordium\Node Runner\nodes.toml.`` (The path on your system is determined by the ``Config`` value in the registry key ``HKEY_LOCAL_MACHINE\SOFTWARE\Concordium\Node Runner``.)

The service can be configured to run multiple nodes. Each node has its own section **[node.**\ *nodeid*\ **]** (where *nodeid* is a different identifier for each node), which defines the settings for that node.

Some settings can be shared among multiple nodes if they are specified in the section **[common]**. If a setting is present in **[common]** but not in **[node.**\ *nodeid*\ **]**, then the value from **[common]** will be used. If it is present in both, then **[node.**\ *nodeid*\ **]** takes precedence. Settings that can be set in **[common]** are indicated below by the word "common".

Some settings are paths of files or folders on your system. Relative paths are resolved relative to the configuration file itself. (Be aware that ``\`` must be escaped in TOML's basic strings (delimited by ``""``) but not in literal strings (delimited by ``''``).)

[node.\ *nodeid*]
=================

name
------

(string; default: nodeid)

.. code-block:: TOML

   name = "Mainnet Node"

The name used to refer to the node in the system event log.

enabled
-------

(boolean; default: true)

.. code-block:: TOML

   enabled = false

Setting this value to ``false`` will prevent the service from starting the node.

bootstrap_nodes
---------------

(string; required; common)

.. code-block:: TOML

   bootstrap_nodes = "bootstrap.testnet.concordium.com:8888"

The nodes to connect to for bootstrapping. The address and port of each node should be separated by ``:``. More than one bootstrapper can be specified by separating them with ``,``.

config_dir
----------

(string; required)

.. code-block:: TOML

   config_dir = 'C:\ProgramData\Concordium\Node Runner\mainnet\config'

The path to the configuration directory for the node. This must be a folder on your system, otherwise the node will fail to start.

data_dir
--------

(string; required)

.. code-block:: TOML

   data_dir = 'C:\ProgramData\Concordium\Node Runner\mainnet\data'

The path to the data directory for the node, where the node's databases and the genesis data are stored. This must be a folder on your system, and must contain the genesis data file ``genesis.dat``, otherwise the node will fail to start.

baker_credentials
-----------------

(string; optional)

.. code-block:: TOML

   baker_credentials = 'baker-credentials.json'

The path to a baker credentials file if the node is to run as a baker.

listen.port
-----------

(integer; optional)

.. code-block:: TOML

   listen.port = 8888

The port on which the node accepts incoming connections from peers in the network. If not specified, this uses the default determined by ``concordium-node.exe`` (which is **8888**). Note that multiple nodes can't listen on the same port, and a node will fail to start if the port is already in use.

listen.address
--------------

(string; optional)

.. code-block:: TOML

   listen.address = "0.0.0.0"

The IP address of the network interface on which to accept incoming peer connections. This can be either an IPV4 address or and IPV6 address. If not specified, this uses the default determined by ``concordium-node.exe`` (which is "**0.0.0.0**"). Typically, this should be "0.0.0.0", which listens on all IPV4 addresses.

rpc.enabled
-----------

(boolean; default: true; common)

.. code-block:: TOML

   rpc.enabled = true

Whether the node should listen for incoming GRPC requests.

rpc.port
--------

(integer; optional)

.. code-block:: TOML

   rpc.port = 10000

The port on which the node accepts incoming GRPC requests. This is the port that the desktop wallet and ``concordium-client`` use to connect to the node. If not specified, this uses the default determined by ``concordium-node.exe`` (which is **10000**). Note that multiple nodes cannot listen on the same port, and a node will fail to start if the port is already in use.

rpc.address
-----------

(string; optional)

.. code-block:: TOML

   rpc.address = 127.0.0.1

The IP address of the network interface on which to accept incoming GRPC requests. This can be either an IPV4 address or and IPV6 address. If not specified, this uses the default determined by ``concordium-node.exe`` (which is "**127.0.0.1**"). Typically, "127.0.0.1" is a good choice as it will only accept connections from the local machine. It is not recommended to accept connections on a public address, since this can be used to control the node.

rpc.token
---------

(string; optional; common)

.. code-block:: TOML

   rpc.token = "rpcadmin"

The token that an agent accessing the GRPC interface must use to authenticate itself. If not specified, this uses the default determined by ``concordium-node.exe`` (which is "**rpcadmin**").

node.exe
--------

(string; optional; common)

.. code-block:: TOML

   node.exe = 'C:\Program Files\Concordium\Node\concordium-node.exe'

The path of the node executable. By default, the service will look for ``concordium-node.exe`` in the same folder as its own executable.

node.env.*
----------

(string; optional; common)

.. code-block:: TOML

   node.env.CONCORDIUM_NODE_CONSENSUS_TRANSACTIONS_PURGING_DELAY = "300"

Environment variables to be set when starting the node. This can be used to set configuration options that do not have a dedicated setting in the configuration file. For instance, the above example sets the ``CONCORDIUM_NODE_CONSENSUS_TRANSACTIONS_PURGING_DELAY`` environment variable, which determines how frequently pending transactions are purged.

Note that a number of environment variables are already set by configuration options, so this should only be used where there is no explicit configuration option provided.

node.args
---------

(array of strings; optional; common)

.. code-block:: TOML

   node.args = ["--transaction-keep-alive", "600"]

Extra arguments to be supplied to the node executable. As with environment variables, this can be used to set configuration options that do not have a dedicated setting in the configuration file. Generally, setting arguments this way should not be used if there is another way to achieve the same result.

Note that setting **node.args** for a specific node will replace any **node.args** that are set in **[common]**.

collector.enabled
-----------------

(boolean; optional)

.. code-block:: TOML

   collector.enabled = true

Whether the node collector should be run for this node. The collector periodically queries the node (via GRPC) and sends the data to the network dashboard. This defaults to **true** if **collector.url** is specified and **rpc.enabled = true**. If it is set to **true** but **collector.url** is not specified or **rpc.enabled = false** then this will cause an error to be reported in the event log, and the collector will not be started.

collector.url
-------------

(string; optional)

.. code-block:: TOML

   collector.url = "https://dashboard.testnet.concordium.com/nodes/post"

The URL on which the network dashboard receives information from the collector. If this is not specified, the collector will not be started.

collector.node_name
-------------------

(string; default: name)

.. code-block:: TOML

   collector.node_name = "my testnet node"

The name of the node to report to the network dashboard.

collector.log_file
------------------

(string; optional)

.. code-block:: TOML

   collector.log_file = "collector.log"

The path of a file to receive the error output of the collector process. If not specified, the output will not be retained. If the file already exists, it will be truncated. The folder containing the file must exist, or the collector may fail to start. (Typically, the collector log is not useful, so retaining it is only recommended for diagnostic purposes.)

collector.exe
-------------

(string; optional; common)

.. code-block:: TOML

   collector.exe = 'C:\Program Files\Concordium\Node\node-collector.exe'

The path of the node collector executable. By default, the service will look for ``node-collector.exe`` in the same folder as its own executable.

collector.env.*
---------------

(string; optional; common)

.. code-block:: TOML

   collector.env.CONCORDIUM_NODE_COLLECTOR_ARTIFICIAL_START_DELAY = = "3000"

Environment variables to be set when starting the node collector. This can be used to set configuration options that do not have a dedicated setting in the configuration file. For instance, the above example sets the ``CONCORDIUM_NODE_COLLECTOR_ARTIFICIAL_START_DELAY`` environment variable, which determines how long the collector waits after starting before it begins querying the node (in milliseconds).

Note that a number of environment variables are already set by configuration options, so this should only be used where there is no explicit configuration option provided.

collector.args
--------------

(array of strings; optional; common)

.. code-block:: TOML

   collector.args = ["--collect-interval", "2000"]

Extra arguments to be supplied to the node collector. As with environment variables, this can be used to set configuration options that do not have a dedicated setting in the configuration file. Generally, setting arguments this way should not be used if there is another way to achieve the same result.

Note that setting **collector.args** for a specific node will replace any **collector.args** that are set in [common].

log.level
---------

(string; optional; common)

.. code-block:: TOML

   log.level = "info"

This should be one of: ``"error"``, ``"warn"``, ``"info"``, ``"debug"`` or ``"trace"``. This determines the verbosity level of logging, with each successive level including more log events than the previous.

log.path
--------

(string; optional)

.. code-block:: TOML

   log.path = 'node.log'

The path of the node log file. Log events are appended to this file, if it is specified. If neither **log.path** nor **log.config** is specified, then no log is kept for the node.

log.roll.size
-------------

(string; optional)

.. code-block:: TOML

   log.roll.size = "200MB"

The size at which the log file is rolled. If this is not specified, the log file will not be rolled. If no units are specified, then bytes are implied. Units of ``b``, ``kb``, ``mb``, ``gb`` and ``tb`` (case-insensitive) are supported, each being 1024 times the previous.

log.roll.count
--------------

(integer; optional; default: 0)

.. code-block:: TOML

   log.roll.count = 5

The number of rolled logs to keep. If this is unspecified or 0, the log will be deleted when it is rolled. Rolled logs are numbered, with 0 being the most recently rolled log.

log.roll.pattern
----------------

(string; optional)

   log.roll.pattern = 'node.{}.log.gz'

Pattern for naming rolled logs. This pattern must contain ``{}``, which is replaced by the rolled log index. If the pattern is not specified, a pattern is constructed from **log.path** by adding ``.{}`` before the file extension (or at the end, if none is given).

If the pattern ends with ``.gz``, then the rolled log file will be compressed using gzip compression.

log.config
-----------

(string; optional)

.. code-block:: TOML

   log.config = 'logconfig.toml'

The path to a TOML or YAML file for configuring logging for the node. The contents of this file is specified by log4rs and allows fine-grained configuration of logging behavior for the node. Setting **log.config** overrides the effects of other logging settings, except for **log.level**,which may still affect the level of log messages that are produced.
