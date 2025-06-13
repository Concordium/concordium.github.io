.. _troubleshoot-node-windows:

======================================
Troubleshoot a node on Windows
======================================

This guide describes how to troubleshoot a node running on Windows on the Concordium network.

View the node logs
==================

You can find the node logs here:

- Mainnet: ``C:\ProgramData\Concordium\Node Runner\mainnet\logs``
- Testnet: ``C:\ProgramData\Concordium\Node Runner\testnet\logs``

If you specified a different installation folder for the configuration and data, the path might be different.

The files ``mainnet.log`` and  ``testnet.log`` contain the latest logs, with ``mainnet.0.log`` and ``mainnet.1.log`` containing progressively older logs and the same for ``testnet.0.log`` and ``testnet.1.log``.

The log files are rolled when the latest log file exceeds 50 MB. This means that ``mainnet.0.log`` is renamed to ``mainnet.1.log`` (replacing the old file if present), ``mainnet.log`` is renamed to ``mainnet.0.log``, and a new, empty ``mainnet.log`` is created.

The same goes for testnet. ``testnet.0.log`` is renamed to ``testnet.1.log`` (replacing the old file if present), ``testnet.log`` is renamed to ``testnet.0.log``, and a new, empty ``testnet.log`` is created.

When nodes are stopped or started, this is also recorded in the system event log.

#. Search for event in the **Search** bar, and then select **Event Viewer**.

#. Select **Windows Logs**, and then under **Source** look for Concordium Node Runner Service.

   .. image:: ../images/Node-setup-win-7.png
         :width: 50%

Event viewer
============

Use the Event viewer to get more information about the problem. In the **Search** bar, search for **Event viewer**. In the **Windows Logs**, click **Application**. Use the warnings and errors to diagnose the issue.

.. image:: ../images/windows-event-viewer.png

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
