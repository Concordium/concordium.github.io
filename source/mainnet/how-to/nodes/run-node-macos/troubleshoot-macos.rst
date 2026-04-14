.. _troubleshoot-node-macos:

============================
Troubleshoot a node on macOS
============================

This guide describes how to troubleshoot a node running on macOS on the Concordium network.

View node logs
==============

There are two ways to view the logs:

- With the **Console.app** you can start recording logs and view them, but you can't see logs from the past.

  - Open the **Console app**, click on the **Start** button to begin recording logs.

  - In the search bar, enter the following and press enter:

    - For mainnet logs: ``software.concordium.mainnet.node``

    - For testnet logs: ``software.concordium.testnet.node``

  - Then click on the small **Any** button in the search bar and select **Subsystem** from the list of options.

- With a terminal and *log show* you can view logs from the past and as they are logged.

  - Open a terminal.

  - Use the ``log`` command by entering:

    - For mainnet logs: ``log show --predicate 'subsystem == "software.concordium.mainnet.node"'``

    - For testnet logs: ``log show --predicate 'subsystem == "software.concordium.testnet.node"'``

  - You can filter the logs with additional parameters, such as start and end date. Enter ``log show --help`` to see the parameters available.

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

Service cannot run after editing service (config) file
======================================================

When configuring your node to be a validator on Mac, you need to edit the service file (which is owned by root). One way to edit it is to change the ownership to your user and then edit it. But then you cannot run the service.

To see if this is your problem, try to load the service manually:

.. code-block:: console

   $sudo launchctl load "/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist"

If your file ownership has changed, you will see the following:

.. code-block:: console

   /Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist: Path had bad ownership/permissions
   Load failed: 122: Path had bad ownership/permissions

To resolve the issue, change the file ownership back to root.

.. code-block:: console

   $sudo chown root "/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist"
