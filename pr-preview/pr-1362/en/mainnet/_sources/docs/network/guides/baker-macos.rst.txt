.. _`mainnet dashboard`: https://dashboard.mainnet.concordium.software/
.. _`testnet dashboard`: https://dashboard.testnet.concordium.com/
.. include:: ../../../variables.rst
.. _baker-macos:

===============================
Import validator keys on macOS
===============================

This guide describes how to set up the node to run as a :ref:`validator <baker-concept>` node on a macOS node that participates in the Concordium network by importing your validation keys. A node receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network. In addition, a validator node also participates in the lottery and produces its own blocks. The validator node will start producing blocks two epochs after the transaction has been approved.

Prerequisites
=============

- Run macOS 11 BigSur or later.
- Have the administrator password to your computer.
- :ref:`Run a node on macOS <run-node-macos>`
- If you want to run the node as a validator, you must have generated validator keys, see :ref:`add a validator <add-baker-mw>` for details. For an overview of the process, see :ref:`baker-concept`.

Configure a node as a validator
===============================

Once you have generated validator keys, you then need to move the generated validator keys file to a location accessible by the node, and finally specify this location in the service file for the Concordium Node.

.. note::
   Validator credentials registered on mainnet will not work with a testnet node and vice versa.

.. dropdown:: Mainnet

   #. Move the ``validator-credentials.json`` file to the node's config folder:

      .. code-block:: console

         $sudo cp "/path/to/mainnet/validator-credentials.json" "/Library/Application Support/Concordium Node/Mainnet/Config/validator-credentials.json"

      (replacing ``/path/to/mainnet/validator-credentials.json`` with the actual file path to your validator credentials for mainnet).

   #. Edit the service file as an administrator. The service file is found here: ``"/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist"``

   #. Underneath the ``<dict>`` tag in the *EnviromentVariables* section of the file add the following::

      <!-- Path to the validator credentials file. -->
      <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
      <string>/Library/Application Support/Concordium Node/Mainnet/Config/validator-credentials.json</string>

   #. Restart your node by running **Concordium Node Stop Mainnet** (if running) and then
      **Concordium Node Start Mainnnet**.

.. dropdown:: Testnet

   #. Move the ``validator-credentials.json`` file to the node's config folder:

      .. code-block:: console

         $sudo cp "/path/to/testnet/validator-credentials.json" "/Library/Application Support/Concordium Node/Testnet/Config/validator-credentials.json"

      (replacing ``/path/to/testnet/validator-credentials.json`` with the actual file path to your validator credentials for testnet).

   #. Edit the service file as an administrator. The service file is found here: ``"/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node.plist"``

   #. In the *EnviromentVariables* section of the file add the following::

      <!-- Path to the validator credentials file. -->
      <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
      <string>/Library/Application Support/Concordium Node/Testnet/Config/validator-credentials.json</string>

   #. Restart your node by running **Concordium Node Stop Testnet** (if running) and then
      **Concordium Node Start Testnet**.

In the wallets, a badge is added to the account associated with the validator node. The badge appears as soon as the transaction has been submitted. That is, before the two epochs have elapsed.
