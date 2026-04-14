.. _troubleshoot-node-docker:

=============================
Troubleshoot a node in Docker
=============================

This guide describes how to troubleshoot a node on the Concordium network running in Docker.

View the node logs
==================

The sample configuration logs data using Docker’s default logging infrastructure. To retrieve the logs:

for the Mainnet node, run:

.. code-block:: console

        $docker logs mainnet-node

for the Testnet node, run:

.. code-block:: console

        $docker logs testnet-node

To monitor the logs in real time, use the ``-f`` (follow) flag:

.. code-block:: console

        $docker logs mainnet-node -f

This outputs the logs to ``stdout``.

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

To fix this, do the following:

#. Stop any memory heavy applications that are running.
#. Stop the node.
#. Locate the state directory for your mainnet node (the example docker-compose configuration places this at ``/var/lib/concordium-mainnet`` or    ``/var/lib/concordium-testnet``, respectively). Inside that there should be a   directory database-v4 and inside there is where the ``treestate-...`` and ``blockstate-...dat`` directories and files are.
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

