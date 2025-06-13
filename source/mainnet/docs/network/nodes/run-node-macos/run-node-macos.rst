.. _run-node-macos:

==================================
Install and manage a node on macOS
==================================

This article explains how to run a Concordium node on macOS on mainnet or testnet, and how to set up your node as a :ref:`validator node<configure-baker-macos>`.

An account is not required to run a node, but you will need one if you want to become a validator.

Prerequisites
=============

- Run macOS 11 BigSur or later.
- Have the administrator password to your computer.
- The server must be running around the clock.
- Meet the :ref:`minimum system requirements<node-requirements>` for running a node.

Installing and running Concordium Node on macOS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. Note::
  See :ref:`change-node-settings` for information about how to change the service configuration settings.

.. dropdown:: Mainnet

  #. Go to :ref:`Downloads<node-downloads>`, and download the latest macOS installer package (``.pkg`` file).

  #. In the folder where you downloaded the .pkg file, double-click the .pkg file. The **Install Concordium Node** program opens.

  #. Click **Allow** to the message saying: *This package will run a program to determine if the software can be installed.* If you have an M1 based Mac, the installer might `ask you to install Rosetta <https://support.apple.com/en-us/HT211861>`_ if you haven't already. Click **Install** if that's the case.

  #. If you already have a version of the node installed, click **OK** to the message saying *Previous Installation Detected*.

  #. Click **Continue** on the *Introduction* page.

  #. Click **Continue** on the *License* page, and then **Agree** to accept the license agreement.

  #. On the *Configuration* page you have the following options.

    .. image:: ../images/Node-setup-mac-1.png
       :width: 60%

    - **Run a [mainnet/testnet] node at start-up**: When selected, the node runs when the system starts. Choose this option when you plan to use the node frequently and need it to be up-to-date at short notice. If you don’t select this option,   you’ll have to start the node manually when required, for example, when you want to use the Desktop Wallet or Concordium Client. If you choose to start the node manually, it might take longer for the node to get up-to-date with the blockchain depending on when the node was last up-to-date.

    - **Start the node after installation is complete**: The node will automatically start running after the installation is complete. Do not choose this option if you want to make further configuration changes before starting the node.

    - **Report to the network dashboard**: Select this option if you want to publish your node statistics to the relevant dashboard when the node is running. Deselect this option if you don't want your node displayed on the dashboard. If selected, you can view the statistics on the `CCDScan <https://ccdscan.io/>`_

    - **Public node name**: Specify the name of your node as you want it to appear on the network dashboard if the node reports to the network dashboard. You must enter a name for at least one of the nodes.

  #. Once configured, click **Continue** to go to the **Installation Type** page.

  #. Click **Install** and enter your administrator password. The installer needs the password because it installs the node for all users and runs it as a system service.

  #. Once installed, click **Close**. The following helper applications are now available on your computer (you can view them in the LaunchPad or in the */Applications/Concordium Node* folder):

    - **Concordium Node Start Mainnet**

    - **Concordium Node Stop Mainnet**

.. dropdown:: Testnet

  #. Go to :ref:`Downloads<testnet-node-downloads>`, and download the latest macOS installer package (.pkg file).

  #. In the folder where you downloaded the .pkg file, double-click the .pkg file. The **Install Concordium Node** program opens.

  #. Click **Allow** to the message saying: *This package will run a program to determine if the software can be installed.* If you have an M1 based Mac, the installer might `ask you to install Rosetta <https://support.apple.com/en-us/HT211861>`_ if you haven't already. Click **Install** if that's the case.

  #. If you already have a version of the node installed, click **OK** to the message saying *Previous Installation Detected*.

  #. Click **Continue** on the *Introduction* page.

  #. Click **Continue** on the *License* page, and then **Agree** to accept the license agreement.

  #. On the *Configuration* page you have the following options.

    .. image:: ../images/Node-setup-mac-1.png
        :width: 60%

    - **Run a [mainnet/testnet] node at start-up**: When selected, the node runs when the system starts. Choose this option when you plan to use the node frequently and need it to be up-to-date at short notice. If you don’t select this option, you’ll have to start the node manually when required, for example, when you want to use the Desktop Wallet or Concordium Client. If you choose to start the node manually, it might take longer for the node to get up-to-date with the blockchain depending on when the node was last up-to-date.

    - **Start the node after installation is complete**: The node will automatically start running after the installation is complete. Do not choose this option if you want to make further configuration changes before starting the node.

    - **Report to the network dashboard**: Select this option if you want to publish your node statistics to the relevant dashboard when the node is running. Deselect this option if you don't want your node displayed on the dashboard. If selected, you can view the statistics on the `CCDScan for the testnet <https://testnet.ccdscan.io/>`_.

    - **Public node name**: Specify the name of your node as you want it to appear on the network dashboard if the node reports to the network dashboard. You must enter a name for at least one of the nodes.

  8. Once configured, click **Continue** to go to the **Installation Type** page.

  9. Click **Install** and enter your administrator password. The installer needs the password because it installs the node for all users and runs it as a system service.

  10. Once installed, click **Close**. The following helper applications are now available on your computer (you can view them in the LaunchPad or in the */Applications/Concordium Node* folder):

    - **Concordium Node Start Testnet**

    - **Concordium Node Stop Testnet**

Upgrading Concordium node version on macOS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To upgrade your Concordium node on macOS, simply download the latest ``.pkg`` installer from the :ref:`Downloads <node-downloads>` page and run it. The installer will automatically detect any previous installation of Concordium Node on your system and perform an in-place upgrade.
No manual removal of the previous version is required. The upgrade process will retain your existing configuration and data while updating the node to the latest version.

.. Note::

  When upgrading your Concordium node, it is generally possible to upgrade directly to the latest version without upgrading through each intermediate version. This applies to both minor and major releases. For patch versions, you can also upgrade directly to the desired version (e.g., from X.X.0 to X.X.3 or from X.1.1 to X.2.3) without the need to apply each patch in sequence. To download previous node versions, see :ref:`Previous node versions<previous-downloads>`.

Uninstall Concordium Node on macOS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Press **Cmd + Space** on your keyboard to open **Spotlight Search** or click the Spotlight icon in the menu bar.

#. Search for ``Concordium Node Uninstaller`` and open the application that is found.

#. You now have two options:

   - To delete the node and keep the data and keys, click **Yes**.

   - To delete the node as well as data and keys, click **Yes, and delete data**.
     (Make sure to back up your keys beforehand).

.. _configure-baker-macos:

Run a validator node on macOS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For information about validation on a macOS node, see :ref:`baker-macos`.
