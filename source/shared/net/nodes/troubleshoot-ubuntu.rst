.. _troubleshoot-node-ubuntu:

===========================================
Troubleshoot a node on a server with Ubuntu
===========================================

.. contents::
   :local:
   :backlinks: none

This guide describes how to troubleshoot a node on the Concordium network from a server with Ubuntu.

Database invariant violation error
==================================

This error occurs due to the node running out of memory during the protocol update, which is more memory intensive than normal operation.

Your node state directory should look something like this:

.. code-block:: console

   -rw-r--r-- 1 concordium-mainnet-node concordium-mainnet-node 3.5G Nov 19 23:32 blockstate-0.dat
   -rw-r--r-- 1 concordium-mainnet-node concordium-mainnet-node 2.3G Dec  6 12:00 blockstate-1.dat
   -rw-r--r-- 1 concordium-mainnet-node concordium-mainnet-node 1.3G Jan 19 08:17 blockstate-2.dat
   drwxr-xr-x 2 concordium-mainnet-node concordium-mainnet-node 4.0K Nov 19 16:55 treestate-0
   drwxr-xr-x 2 concordium-mainnet-node concordium-mainnet-node 4.0K Nov 19 23:32 treestate-1
   drwxr-xr-x 2 concordium-mainnet-node concordium-mainnet-node 4.0K Dec  6 12:00 treestate-2

But because of the error it might look like this:

.. code-block:: console

   -rw-r--r-- 1 concordium-mainnet-node concordium-mainnet-node 3.5G Nov 19 23:32 blockstate-0.dat
   -rw-r--r-- 1 concordium-mainnet-node concordium-mainnet-node 2.3G Dec  6 12:00 blockstate-1.dat
   -rw-r--r-- 1 concordium-mainnet-node concordium-mainnet-node 1.3G Jan 19 08:17 blockstate-2.dat
   drwxr-xr-x 2 concordium-mainnet-node concordium-mainnet-node 4.0K Nov 19 16:55 treestate-0
   drwxr-xr-x 2 concordium-mainnet-node concordium-mainnet-node 4.0K Nov 19 23:32 treestate-1

To fix this error, do the following:

#. Stop any memory heavy applications that are running.
#. Stop the node.
#. Locate the state directory for your mainnet node. The state directory for your mainnet node can be found at /var/lib/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/data/database-v4 (unless you have changed the defaults). Inside that there should be a directory database-v4 and inside there is where the treestate-... and blockstate-...dat directories and files are.
#. Delete the offending file.
#. Restart the node.

Node crash or database corruption
=================================

A node crash or database corruption is the problem if:

- the node fails to start
- the node is in a restart loop with an error message about database corruption
- or you get a "too few bytes" message.

The solution is to delete the relevant portion of the database.

The database directory should contain matching pairs of ``blockstate-$i.dat`` and ``treestate-$i`` files for some number of consecutive i's starting at 0.

.. code-block:: console

   blockstate-0.dat
   blockstate-1.dat
   blockstate-2.dat
   treestate-0
   treestate-1
   treestate-2

To resolve a crash or non-starting node, delete files, starting at the largest ``i``, until the node starts or until there are no more files in the directory.

- If only one of ``treestate-i`` or ``blockstate-$i.dat`` files exists, delete the other and try starting the node.
- Otherwise delete both files of the ``treestate-$i`` and ``blockstate-$i.dat`` pair and try starting the node.

.. Note::

   The database is only accessible to specific users.
