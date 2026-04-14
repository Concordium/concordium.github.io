.. _troubleshoot-node-ubuntu:

===========================================
Troubleshoot a node on Ubuntu
===========================================

This guide describes how to troubleshoot a node on the Concordium network from a server with Ubuntu.

View node logs
==============

To view logs for the ``concordium-mainnet-node.service``, you can use the ``journalctl`` command-line utility, which interfaces with the systemd journal to display logs for services managed by ``systemd``.

**To display all logs for the Concordium node service:**

.. code-block:: console

   $ journalctl -u concordium-mainnet-node.service

This command will show the complete log history for the ``concordium-mainnet-node.service``.

**To monitor the logs in real-time as new entries are added:**

.. code-block:: console

   $ journalctl -u concordium-mainnet-node.service -f

This is helpful for observing the service's behavior as it runs.

**On the Testnet, you can view the node logs with**

.. code-block:: console

      $ journalctl -u concordium-testnet-node.service

Database invariant violation error
==================================

This error occurs due to the node running out of memory during the protocol update, which is more memory intensive than normal operation.

Your node state directory should look something like this:

.. code-block:: console

   accountmap
   blockstate-0.dat
   blockstate-1.dat
   blockstate-2.dat
   treestate-0
   treestate-1
   treestate-2

But because of the error it might look like this:

.. code-block:: console

   accountmap
   blockstate-0.dat
   blockstate-1.dat
   blockstate-2.dat
   treestate-0
   treestate-1

To fix this error, do the following:

#. Stop any memory heavy applications that are running.
#. Stop the node.
#. Locate the state directory for your mainnet node. The state directory for your mainnet node can be found at ``/var/lib/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/data/database-v4`` (unless you have changed the defaults). Inside that there should be a directory database-v4 and inside there is where the treestate-... and blockstate-...dat directories and files are.
#. Delete the offending file. In the example above, you delete the blockstate2.dat file since it has no matching treestate file.
#. Restart the node.

Node crash or database corruption
=================================

A node crash or database corruption is the problem if:

- the node fails to start
- the node is in a restart loop with an error message about database corruption
- or you get a "too few bytes" message.

The solution is to delete the relevant portion of the database.

The database directory should contain matching pairs of ``blockstate-$i.dat`` and ``treestate-$i`` files for some number of consecutive i's starting at 0. The number of the files differs depending on which protocol version is current.

.. code-block:: console

   accountmap
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
