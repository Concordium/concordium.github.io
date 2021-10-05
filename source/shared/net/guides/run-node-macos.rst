.. _run-node-macos:

==============================
Run and manage a node on macOS
==============================

.. contents::
   :local:
   :backlinks: none

This guide describes how to run and manage a node on macOS. You can also run a
node using :ref:`Docker <run-a-node>`, :ref:`Ubuntu <run-node-ubuntu>`, or :ref:`Windows <run-node-windows>`.

Prerequisites
=============

- Run macOS 10.14 or later.
- Have the administrator password to your computer.
- Meet the :ref:`minimum system requirements<requirements-run-node>` for running
  a node.

Install and run a node
======================

#. Go to :ref:`Downloads<downloads>`, and download the latest macOS installer
   package (.pkg file).

#. In the folder where you downloaded the .pkg file, double-click the .pkg file.
   This will open the **Install Concordium Node** program.

#. Click **Allow** to the message saying *This package will run a program to
   determine if the software can be installed.* If you have an M1 based Mac, the installer
   may ask you to install Rosetta, if you haven't already. Click **Install** if that's the case.

#. If you already have a version of the node installed, click **OK** to the
   message saying *Previous Installation Detected*.

#. Click **Continue** on the *Introduction* page.

#. Click **Continue** on the *License* page, and then **Agree** to accept the license agreement.

#. On the *Configuration* page you have the following options for both a
   mainnet and testnet node.

   - **Run a [mainnet/testnet] node at start-up**: When selected, the node runs
     when the system starts. Choose this option when you plan to use the node
     frequently and need it to be up-to-date at short notice. If you don’t
     select this option, you’ll have to start the node manually when required,
     for example, when you want to use the Desktop Wallet or concordium-client.
     If you choose to start the node manually, it might take longer for the node
     to get up-to-date with the blockchain depending on when the node was last
     up-to-date.

   - **Start the node after installation is complete**: The node will
     automatically start running after the installation is complete. Do not
     choose this option if you want to make further configuration changes before
     starting the node.

   -  - **Report to the network dashboard**: Select this option if you want to publish your node statistics to the relevant dashboard when the node is running. Go to the mainnet or testnet dashboard to view the statistics:

     - https://dashboard.mainnet.concordium.software/

     - https://dashboard.testnet.concordium.com/

   - **Public node name**: Specify the name of your node as you want it to appear
     on the network dashboard if the node reports to the network dashboard. *NB:
     You must enter a name for both nodes, even if you only want to run one of them.*

#. Once configured, click **Continue** to go to the *Installation Type* page.

#. Click **Install** and enter your administrator password. The installer needs
   the password because it installs the node for all users and runs it as a
   system service.

#. Once installed, click **Close**. The following helper-applications are now
   available on your computer (you can view them in the LaunchPad or in the
   */Applications/Concordium Node* folder):

   - **Concordium Node Start Mainnet**

   - **Concordium Node Stop Mainnet**

   - **Concordium Node Start Testnet**

   - **Concordium Node Stop Testnet**

Verify that the node is running
===============================

The node runs as a background service with no user interface. To verify that
it's running, use the **Activity Monitor**.

#. Open the **Activity Monitor** application from the LaunchPad.

#. Look at the list and verify that the following is running:

   - ``concordium-node`` for each node you are running. For example, if you're
     running a node on both testnet and mainnet, you'll see two instances of
     concordium-node.

   - ``node-collector`` for each node that reports to a network dashboard.

#. If the node is running properly and reporting to the network dashboard, you
   can see it on the dashboard:

   - https://dashboard.mainnet.concordium.software/

   - https://dashboard.testnet.concordium.com/

Connect a node to the Desktop Wallet
------------------------------------

You can also verify that a node is running by connecting it to the Desktop Wallet.

#. In the Desktop Wallet, go to **Settings**, and then select **Node settings**.

#. In the Desktop Wallet, go to **Settings**, and then select **Node settings**.

   - If you're running the mainnet version of the Desktop Wallet, you must connect to a mainnet node. In the **Address field**, enter *127.0.01* and in the **Port field** enter *10000*.

   - If you're running the testnet version of the Desktop Wallet, you must connect to a testnet node. In the **Address** field, enter *127.0.0.1* and in the **Port field** enter *10001*.

#. Select **Set connection**. If the connection works and the node is running properly, there’s a message saying *Successfully connected*.

Change the node startup settings
================================

If you want to change whether the node services start automatically, you have
two options.

- If you're not familiar with using a terminal, the easiest option is to reinstall the macOS node and configure it differently.

- If you're familiar with using a terminal, the following
  options are available:

  - Text prefixed with a ``$`` is to be run in a terminal.

  - Enable automatic startup of the *node* by running:

  .. code-block:: console

     $sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node.plist" "/Library/LaunchDaemons/"

  - Enable automatic startup of the *node-collector* by running:

  .. code-block:: console

     $sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node-collector.plist" "/Library/LaunchDaemons/"

  - Disable automatic startup of *node* by running:

  .. code-block:: console

     $sudo rm "/Library/LaunchDaemons/software.concordium.testnet.node.plist"

  - Disable automatic startup of *node-collector* by running:

  .. code-block:: console

     $sudo rm "/Library/LaunchDaemons/software.concordium.testnet.node-collector.plist"

.. _configure-baker-macos:

Configure a node as a baker
===========================

To run a node as baker, you first have to generate baker keys in the desktop
wallet and then register the keys on an account. For more information, see,
:ref:`Add a baker account in the Desktop Wallet<create-baker-desktop>`.
You then need to move the generated file to a location accessible by the node,
and finally specify this location in the service file for the Concordium Node.

#. Move the ``baker-credentials.json`` file to the node's config folder:

   .. code-block:: console

      sudo cp "/path/to/baker-credentials.json" "/Library/Application Support/Concordium Node/Testnet/Config/baker-credentials.json"

   (replacing ``/path/to/baker-credentials.json`` with the actual file path).

#. Edit the service file as an administrator. The service file is found here: ``/Library/Concordium
   Node/LaunchDaemons/software.concordium.testnet.node.plist``

#. In the *EnviromentVariables* section of the file add the following::

    <!-- Path to the baker credentials file. -->
    <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
    <string>/Library/Application Support/Concordium Node/Testnet/Config/baker-credentials.json</string>

#. Restart your node by running **Concordium Node Stop Testnet** (if running) and then
   **Concordium Node Start Testnet**.

View node logs
==============

There are two ways to view the logs:

- With *Console.app* you can start recording logs and view them, but you can't see
  logs from the past.

  - Open the application *Console**, click on the **Start** button to begin
    recording logs.

  - In the search bar, enter ``software.concordium.testnet.node`` and press
    enter.

  - Then click on the small **Any** button in the search bar and select
    **Subsystem** from the list of options.

- With a terminal and *log show* you can view logs from the past and as they are
  logged.

  - Open a terminal.

  - Enter ``log show --predicate 'subsystem ==
    "software.concordium.testnet.node"'``

  - You can filter the logs with additional parameters, such as start and end
    date. Enter ``log show --help`` to see the parameters available.

Synchronize a node with the network
===================================

When you start a node for the first time, it can take a while to synchronize the
node with the rest of the network, since it has to get all blocks from its
peers.

You can improve the performance by downloading the blocks before starting the
node. While it will still take time to process the blocks, it will typically be
faster than requesting them from peers.

Download the file with the blocks from the following addresses:

-  Testnet: https://catchup.testnet.concordium.com/blocks_to_import.mdb.

The file is downloaded to your default download location.

#. Move the file to the node's data folder:

   .. code-block:: console

      $sudo cp "/Users/<username>/Downloads/blocks_to_import.mdb" "/Library/Application Support/Concordium Node/Testnet/Data"

   (replacing ``<username>`` with your actual username).

#. Edit this service file as an administrator: ``/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node.plist``

#. In the *EnviromentVariables* section of the file add the following::

    <key>CONCORDIUM_NODE_CONSENSUS_IMPORT_BLOCKS_FROM</key>
    <string>/Library/Application Support/Concordium Node/Testnet/Data/blocks_to_import.mdb</string>

#. Restart your node by running the application **Concordium Node Stop Testnet** (if running) and then
   **Concordium Node Start Testnet**.

#. Open the service file again, remove the lines you just added, and then save
   the file. This ensures that these blocks will not be processed again the next
   time the node is restarted.

#. Go to the testnet dashboard to monitor when the node has caught up with its
   peers on the blockchain. You do so by comparing the finalized length of the
   chain with the length of your node. If they match, your node has caught up.

Uninstall a macOS node
======================

#. Open *Spotlight Search* by pressing **Cmd + Space** on your keyboard, or by
   clicking the search icon in menu bar.

#. Search for ``Concordium Node Uninstaller`` and open the found application.

#. You now have two options:

   - To delete the node and keep the data and keys, click **Yes**.

   - To delete the node as well as data and keys, click **Yes, and delete data**.
     (Make sure to back up your keys beforehand).
