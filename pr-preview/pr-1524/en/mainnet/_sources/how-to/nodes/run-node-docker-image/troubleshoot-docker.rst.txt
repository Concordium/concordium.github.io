.. _troubleshoot-docker-image:

=============================
Troubleshoot a node in Docker
=============================

.. admonition:: At a glance

   Find log messages and recover from database errors in a Docker node.
   You need an installed node and access to Docker commands.
   Use this guide if your node crashes or cannot start.

.. note::

   This guide assumes the setup in :ref:`install-node-docker-image`.
   If you use different paths, filenames, service names, or ports, adjust the
   commands and examples to match your setup.

Run the commands from the network directory that contains ``compose.yaml``.
Use ``mainnet-node/`` for mainnet or ``testnet-node/`` for testnet.
Both networks use service ``node`` and mount ``./data`` at ``/mnt/data``.

View the node logs
==================

The example configuration uses Docker's default logging system.
To read the logs for either network, run:

.. code-block:: console

   $docker compose logs node

To follow new log messages, run:

.. code-block:: console

   $docker compose logs --follow node

The container includes the node and collector logs.
Check which process reports the error.

Database invariant violation error
==================================

A protocol update can need more memory than normal operation.
If the node runs out of memory during the update, a database invariant violation
can occur.

The node database normally contains matching block-state files and tree-state
directories. For example:

.. code-block:: text

   accountmap
   blockstate-0.dat
   blockstate-1.dat
   blockstate-2.dat
   treestate-0
   treestate-1
   treestate-2

After the error, an entry can be missing:

.. code-block:: text

   accountmap
   blockstate-0.dat
   blockstate-1.dat
   blockstate-2.dat
   treestate-0
   treestate-1

.. warning::

   Deleting database entries removes stored chain state.
   The node can need to download and process blocks again.
   Stop the node before you delete entries.
   Do not delete validator credentials or the original state kept for migration
   rollback.

To recover:

1. Stop other applications that use large amounts of memory.
2. Stop the node:

   .. code-block:: console

      $docker compose stop

3. Check the logs for a clean shutdown.
4. Find the database at ``./data/database-v4``.
   You can need ``sudo`` to inspect and change entries owned by UID ``10001``.
5. Delete the block-state file that has no matching tree-state directory.
   In the example above, delete ``blockstate-2.dat`` because ``treestate-2``
   is missing.
6. Restart the node:

   .. code-block:: console

      $docker compose up --detach

7. Check the logs for further errors and check synchronization progress.

Node crash or database corruption
=================================

Database corruption can cause these symptoms:

- The node cannot start.
- The node repeatedly restarts with a database corruption error.
- The logs show a "too few bytes" message.

A startup failure alone does not prove database corruption.
Check the logs before you remove database entries.

The database at ``./data/database-v4`` normally contains matching pairs of
``blockstate-i.dat`` files and ``treestate-i`` directories.
The index ``i`` starts at ``0`` and increases for each pair.
The number of pairs depends on the protocol version.
For example:

.. code-block:: text

   accountmap
   blockstate-0.dat
   blockstate-1.dat
   blockstate-2.dat
   treestate-0
   treestate-1
   treestate-2

.. warning::

   Deleting database entries removes stored chain state.
   Stop the node before each deletion attempt.
   Do not delete unrelated files, validator credentials, or the original state
   kept for migration rollback.

To recover from a database corruption error:

1. Stop the node with ``docker compose stop``.
2. Check the logs for a clean shutdown.
3. Find the largest index ``i`` in ``./data/database-v4``.
4. If only one entry in that pair exists, delete the remaining entry.
   If both entries exist, delete both ``blockstate-i.dat`` and ``treestate-i``.
5. Start the node with ``docker compose up --detach``.
6. Check the logs and synchronization progress.
7. If the same database error remains, stop the node again.
   Repeat the procedure with the next largest index.

Stop removing entries when the node starts successfully or no block-state and
tree-state pairs remain. If the error persists, contact
`Concordium support <https://support.concordium.software/>`_.
