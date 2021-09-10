.. _run-node-macos:

==============================
Run and manage a node on macOS
==============================

.. contents::
   :local:
   :backlinks: none

This guide describes how to run and manage a node on macOS. You can also run a
node using :ref:`Docker <run-a-node>` for Linux distributions or :ref:`Ubuntu
<run-node-ubuntu>`.


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

#. Click **Allow** to the prompt stating *This package will run a program to
   determine if the software can be installed.*

#. If you already have a version of the node installed, click **OK** to the
   prompt stating *Previous Installation Detected*.

#. Click **Continue** on the *Introduction* page.

#. Click **Continue** on the *License* page, then **Agree** to the license
   agreement prompt.

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

   - **Report to the network dashboard**: Select this option if you want to
     publish your node statistics to the relevant dashboard when the node is
     running. E.g. https://dashboard.testnet.concordium.com/ for testnet.

   - **Public node name**: Specify the name of your node as you want it to appear
     on the network dashboard if the node reports to the network dashboard. *NB:
     You must enter a name for both nodes, even if you only want to run one of them.*

#. Once configured, click **Continue** to get to the *Installation Type* page.

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
   can see it on the dashboard: https://dashboard.testnet.concordium.com.

Connect a node to the Desktop Wallet
------------------------------------

You can also verify that a node is running by connecting it to the Desktop Wallet.

#. In the Desktop Wallet, go to **Settings**, and then select **Node settings**.

#. For the testnet version of the Desktop Wallet, you must connect to a testnet node. In the **Address** field, enter *127.0.0.1* and in the **Port field** enter *10001*.

#. Select **Set connection**. If the connection works and the node is running properly, there’s a message saying *Successfully connected*.

Change the node startup settings
================================

If you want to change whether the node services start automatically, you have
two options.

- For non-technical users, the easiest option is to reinstall the macOS node and configure it differently.

- For technical users (familiarity with a terminal required) the following
  options are available:

  - Text prefixed with a ``$`` is to be run in a terminal.

  - Enable automatic startup of the *node* by running:

  .. code-block:: console

     $ sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node.plist" "/Library/LaunchDaemons/"

  - Enable automatic startup of the *node-collector* by running:

  .. code-block:: console

     $sudo ln -s "/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node-collector.plist" "/Library/LaunchDaemons/"

  - Disable automatic startup of *node* by running:

  .. code-block:: console

     $sudo rm "/Library/LaunchDaemons/software.concordium.testnet.node.plist"

  - Disable automatic startup of *node-collector* by running:

  .. code-block:: console

     $sudo rm "/Library/LaunchDaemons/software.concordium.testnet.node-collector.plist"

Configure a node as a baker
===========================

To run a node as baker, you first have to generate baker keys in the desktop
wallet and then register the keys on an account. For more information, see,
:ref:`Add a baker account in the Desktop Wallet<create-baker-desktop>`.
You then have to change the service file for the Concordium Node.

#. Edit this file as an administrator: ``/Library/Concordium
   Node/LaunchDaemons/software.concordium.testnet.node.plist``
#. In the *EnviromentVariables* section of the file add the following::

    <!-- Path to the baker credentials file. -->
    <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
    <string>/full/path/to/baker-credentials.json</string>

#. Replace ``/full/path/to/baker-credentials.json`` with the full path to the
   baker credentials files.

View node logs
==============

The logs can be viewed in one of three ways:

- With *Console.app* you can start recording logs and view them, but not see
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

Uninstall a macOS node
======================

#. Open *Spotlight Search* by pressing **Cmd + Space** on your keyboard, or by
   clicking the search icon in menu bar.

#. Search for ``Concordium Node Uninstaller`` and open the found application.

#. You now have two options:

   - To delete the node and keep the data and keys, click **Yes**.

   - To delete the node *and* data and keys, click **Yes, and delete data**.
     (Make sure to back up your keys beforehand).
