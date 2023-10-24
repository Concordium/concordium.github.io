.. _`mainnet dashboard`: https://dashboard.mainnet.concordium.software/
.. _`testnet dashboard`: https://dashboard.testnet.concordium.com/
.. include:: ../../variables.rst
.. _baker-macos:

=============================
Run a validator node on macOS
=============================

This guide describes how to set up the node to run as a :ref:`validator <baker-concept>` node on a macOS node that participates in the Concordium network. A node receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network. In addition, a validator node also participates in the lottery and produces its own blocks.

Prerequisites
=============

- Have the administrator password to your computer.
- :ref:`Install and run the node<run-node-macos>`
- If you want to run the node as a validator, you must have generated validator keys. How you generate validator keys depends on which wallet you are using. For an overview of the process, see :ref:`baker-concept`.

Configure a node as a validator
===============================

Once you have generated validator keys, you then need to move the generated validator keys file to a location accessible by the node, and finally specify this location in the service file for the Concordium Node.

.. note::
   Validator credentials registered on mainnet will not work with a testnet node and vice versa.

.. dropdown:: Mainnet

   #. Move the ``baker-credentials.json`` file to the node's config folder:

      .. code-block:: console

         $sudo cp "/path/to/mainnet/baker-credentials.json" "/Library/Application Support/Concordium Node/Mainnet/Config/baker-credentials.json"

      (replacing ``/path/to/mainnet/baker-credentials.json`` with the actual file path to your baker credentials for mainnet).

   #. Edit the service file as an administrator. The service file is found here: ``"/Library/Concordium Node/LaunchDaemons/software.concordium.mainnet.node.plist"``

   #. Underneath the ``<dict>`` tag in the *EnviromentVariables* section of the file add the following::

      <!-- Path to the baker credentials file. -->
      <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
      <string>/Library/Application Support/Concordium Node/Mainnet/Config/baker-credentials.json</string>

   #. Restart your node by running **Concordium Node Stop Mainnet** (if running) and then
      **Concordium Node Start Mainnnet**.

.. dropdown:: Testnet

   #. Move the ``baker-credentials.json`` file to the node's config folder:

      .. code-block:: console

         $sudo cp "/path/to/testnet/baker-credentials.json" "/Library/Application Support/Concordium Node/Testnet/Config/baker-credentials.json"

      (replacing ``/path/to/testnet/baker-credentials.json`` with the actual file path to your baker credentials for testnet).

   #. Edit the service file as an administrator. The service file is found here: ``"/Library/Concordium Node/LaunchDaemons/software.concordium.testnet.node.plist"``

   #. In the *EnviromentVariables* section of the file add the following::

      <!-- Path to the baker credentials file. -->
      <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
      <string>/Library/Application Support/Concordium Node/Testnet/Config/baker-credentials.json</string>

   #. Restart your node by running **Concordium Node Stop Testnet** (if running) and then
      **Concordium Node Start Testnet**.

In the wallets, a bread icon is added to the account associated with the baker node. The bread icon appears as soon as the transaction has been submitted. That is, before the two epochs have elapsed.
