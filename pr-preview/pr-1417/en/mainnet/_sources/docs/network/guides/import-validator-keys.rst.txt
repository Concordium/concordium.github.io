.. _`mainnet dashboard`: https://dashboard.mainnet.concordium.software/
.. _`testnet dashboard`: https://dashboard.testnet.concordium.com/
.. _Discord: https://discord.gg/xWmQ5tp
.. include:: ../../../variables.rst
.. _import-validator-keys:

======================
Import validator keys
======================

This guide describes how to set up a node to run as a :ref:`validator <baker-concept>` node that participates in the Concordium network on different platforms. A node receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network. In addition, a validator node also participates in the lottery and produces its own blocks. The validator node will start producing blocks two :term:`epochs <epoch>` after the transaction has been approved.

.. Note::

   Validator credentials registered on mainnet will not work with a testnet node and vice versa.

Platform-specific configuration
===============================

Select your platform below to configure your node with validator keys.

.. dropdown:: Windows

   **Prerequisites**

   - Run Windows 10 or later or Windows Server 2019 or later
   - Have the administrator password to your computer
   - :ref:`Run a node on Windows<run-node-windows>`
   - Have generated validator keys, see :ref:`Add a validator <add-baker-mw>` for details. For an overview of the process, see :ref:`baker-concept`.

   Watch the video guide below to learn how to import validator keys to your Windows node:
      .. raw:: html

         <iframe width="560" height="315" src="https://www.youtube.com/embed/DY_1nD2JgGM"
         title="YouTube video player" frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen></iframe>

   **Configure a validator node on Windows**

   #. Create validator keys in |bw|, |cryptox|, Desktop Wallet or Concordium Client and associate them with an account either on mainnet or testnet. Follow :ref:`this <add-baker-mw>` article for help.

      .. Note::

         The validator credentials file must be accessible by the SYSTEM user and can't be encrypted.

      .. Warning::

         Do not edit the name or contents of the validator-credentials.json file.

   #. Once you've added validation to an account and exported the validator keys, you have to change the configuration file for the Concordium Node Service. Open **Configure Concordium Node Service** from the **Start** menu, and select **Yes** when you see the message *Do you want to allow this app to make changes to your device?*. The configuration file opens.

   #. Add the following in the ``[node.mainnet]`` section if the credentials are for mainnet, or the ``[node.testnet]`` section if they are for testnet. Make sure that you add the credentials to the network the account was created on.

      .. code-block:: console

        baker_credentials = 'C:\path\to\validator-credentials.json'

      where you replace ``C:\path\to\validator-credentials.json`` with the full path to the validator credentials file.

   #. Save the file.

   #. Stop and restart the node runner service using the **Stop Concordium Service Node** and the **Start Concordium Service Node** shortcuts. Don't use *End task* in the Task Manager as it might cause errors.

   **View the node log**

   You can find the node logs here:

   - Mainnet: ``C:\ProgramData\Concordium\Node Runner\mainnet\logs``
   - Testnet: ``C:\ProgramData\Concordium\Node Runner\testnet\logs``

   **Troubleshooting**

   If a node fails to start, for example because of a configuration issue, or stops unexpectedly, there will be an Error-level event in the **Event Viewer** that explains why. The following are common error scenarios and possible solutions.

   - The node doesn't restart after you've set the credentials in the configuration file. This error can occur when the specified location of the credentials file is incorrect. In the **Event Viewer** an error such as the following might appear. When this happens, change the path in the configuration file.

      .. image:: ./images/Node-setup-win-10.png
            :width: 60%

   - The node doesn't start validation, and in the log file you see the message *Validator keys are incorrect* repeatedly. It takes 1-2 hours after validator keys have been added to an account for the keys to be eligible to produce blocks. If this problem persists beyond two hours, then likely the keys are incorrect. Double check that you are not using keys from testnet on mainnet, or vice-versa.

   For more information on the logs, see :ref:`Run a node on Windows<view-windows-node-log>`.

.. dropdown:: Ubuntu

   **Prerequisites**

   - Run Ubuntu 22.04 or later
   - Have the administrator password to your computer
   - :ref:`Run a node on Ubuntu <run-node-ubuntu>`
   - Have generated validator keys, see :ref:`Add a validator <add-baker-mw>` for details. For an overview of the process, see :ref:`baker-concept`.

   Watch the video guide below to learn how to import validator keys to your Ubuntu node:
      .. raw:: html

         <iframe width="560" height="315" src="https://www.youtube.com/embed/UMnu8ADg5ig"
         title="YouTube video player" frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen></iframe>

   **Configure the node with validator keys**

   #. Move the JSON file with the validator keys you generated to the server that's running the node. Store it, for example, in ``/home/user/concordium/validator-credentials.json``.

   #. In the terminal, enter one of the following depending on your network:

      For **Mainnet**:

      .. code-block:: console

         $sudo systemctl edit concordium-mainnet-node.service

      For **Testnet**:

      .. code-block:: console

         $sudo systemctl edit concordium-testnet-node.service

   #. Add the following snippet to the opened file (the file is empty the first time you open it):

      For **Mainnet**:

      .. code-block:: console

         [Service]

         Environment=CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/validator-credentials.json
         BindReadOnlyPaths=/home/user/concordium/validator-credentials.json:%S/concordium-9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478/validator-credentials.json

      For **Testnet**:

      .. code-block:: console

         [Service]

         Environment=CONCORDIUM_NODE_VALIDATOR_CREDENTIALS_FILE=%S/concordium-b6078154d6717e909ce0da4a45a25151b592824f31624b755900a74429e3073d/validator-credentials.json
         BindReadOnlyPaths=/home/user/concordium/validator-credentials.json:%S/concordium-b6078154d6717e909ce0da4a45a25151b592824f31624b755900a74429e3073d/validator-credentials.json

      Where you replace the path `/home/user/concordium/validator-credentials.json` with the actual location of the file.

      .. Note::

         The paths above contain the default paths to the validator's state directory, where the long hash is the genesis hash for each network.

   #. Save the edited file.

   #. Restart the node for the changes to take effect. Enter:

      For **Mainnet**:

      .. code-block:: console

         $sudo systemctl restart concordium-mainnet-node.service

      For **Testnet**:

      .. code-block:: console

         $sudo systemctl restart concordium-testnet-node.service

   #. To verify the node is running, enter:

      For **Mainnet**:

      .. code-block:: console

         $sudo systemctl status concordium-mainnet-node.service

      For **Testnet**:

      .. code-block:: console

         $sudo systemctl status concordium-testnet-node.service

.. dropdown:: macOS

   **Prerequisites**

   - Run macOS 11 BigSur or later
   - Have the administrator password to your computer
   - :ref:`Run a node on macOS <run-node-macos>`
   - Have generated validator keys, see :ref:`Add a validator <add-baker-mw>` for details. For an overview of the process, see :ref:`baker-concept`.

   Watch the video guide below to learn how to import validator keys to your macOS node:
      .. raw:: html

         <iframe width="560" height="315" src="https://www.youtube.com/embed/ZWpMfIeTP6U"
         title="YouTube video player" frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen></iframe>

   **Configure a node as a validator**

   Once you have generated validator keys, you need to move the generated validator keys file to a location accessible by the node, and finally specify this location in the service file for the Concordium Node.

   #. Move the ``validator-credentials.json`` file to the node's config folder:

      For **Mainnet**:

      .. code-block:: console

         $sudo cp "/path/to/mainnet/validator-credentials.json" "/Library/Application Support/Concordium Node/Mainnet/Config/validator-credentials.json"

      For **Testnet**:

      .. code-block:: console

         $sudo cp "/path/to/testnet/validator-credentials.json" "/Library/Application Support/Concordium Node/Testnet/Config/validator-credentials.json"

      (replacing the source path with the actual file path to your validator credentials).

   #. Edit the service file as an administrator:

      For **Mainnet**: ``"/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist"``

      For **Testnet**: ``"/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node.plist"``

   #. In the *EnvironmentVariables* section of the file add the following:

      For **Mainnet**::

         <!-- Path to the validator credentials file. -->
         <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
         <string>/Library/Application Support/Concordium Node/Mainnet/Config/validator-credentials.json</string>

      For **Testnet**::

         <!-- Path to the validator credentials file. -->
         <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
         <string>/Library/Application Support/Concordium Node/Testnet/Config/validator-credentials.json</string>

   #. Restart your node:

      For **Mainnet**: Run **Concordium Node Stop Mainnet** (if running) and then **Concordium Node Start Mainnet**.

      For **Testnet**: Run **Concordium Node Stop Testnet** (if running) and then **Concordium Node Start Testnet**.

.. dropdown:: Docker

   **Prerequisites**

   - :ref:`Run a node on Docker<run-a-node>`
   - Have generated validator keys, see :ref:`Add a validator <add-baker-mw>` for details. For an overview of the process, see :ref:`baker-concept`.

   Watch the video guide below to learn how to import validator keys to your Docker node:
      .. raw:: html

         <iframe width="560" height="315" src="https://www.youtube.com/embed/jLJb8ZqU5Ng"
         title="YouTube video player" frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen></iframe>

   **Configure a node as a validator**

   Once you have generated validator keys, you need to move the generated validator keys file to a location accessible by the node, and finally specify this location in the service file for the Concordium Node.

   To register the keys in the network you need to be :ref:`running a node <running-a-node>` and send a ``validator add`` transaction to the network:

   .. code-block:: console

      $concordium-client validator add <keys-file>.json --sender validatorAccount --stake <amount-to-stake> --validator-credentials-out <concordium-data-dir>/validator-credentials.json

   where you replace

   - ``<amount-to-stake>`` with the CCD amount for the validator's initial stake
   - ``<concordium-data-dir>`` with the directory specified as the volume mount for the node database. In the :ref:`sample configuration file<run-a-node>` this is ``/var/lib/concordium-testnet`` for the testnet node, and ``/var/lib/concordium-mainnet`` for the mainnet node.

   .. Warning::

      Do not stake all of your funds or you will not have enough funds to cover transaction fees.

   Provide a ``--no-restake`` flag to avoid automatically adding the rewards to the staked amount on the validator account. Read more about this behavior in the section :ref:`Restake earnings<restake-earnings>`.

   To start the node with these validator keys and produce blocks, do the following:

   #. Stop the currently running node. To do this, press ``Ctrl + C`` on the terminal where the node is running or run

      .. code-block:: console

         $docker stop testnet-node

      or

      .. code-block:: console

         $docker stop mainnet-node

      depending on the environment.

   #. Update the configuration file for the node by adding

      .. code-block:: yaml

         - CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE=/mnt/data/validator-credentials.json

      into the ``environment`` section of the ``node`` service section of the file.

   When you've placed the file in the appropriate directory, start the node again in the same way as the first time, e.g., ``docker compose -f testnet-node.yaml up``. The node will automatically start producing blocks when the validator is included in the validators for the current epoch.

Verify that a node is a validator node
======================================

Two :term:`epochs <epoch>` must have elapsed before you can see the validator ID of the node on the dashboard.

You can use ``concordium-client`` to see the status of the node. For more information, see :ref:`Concordium Client <concordium-client>`.

.. code-block:: console

   $concordium-client raw GetNodeInfo

   ...

   Consensus type: "Active"

   ...

In the wallets, a badge is added to the account associated with the validator node. The badge appears as soon as the transaction has been submitted. That is, before the two :term:`epochs <epoch>` have elapsed.
