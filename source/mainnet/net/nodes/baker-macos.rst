.. _`mainnet dashboard`: https://dashboard.mainnet.concordium.software/
.. _`testnet dashboard`: https://dashboard.testnet.concordium.com/
.. include:: ../../variables.rst
.. _baker-macos:

=========================
Run a baker node on macOS
=========================

This guide describes how to configure and manage baking on a macOS node.

Prerequisites
=============

- Have the administrator password to your computer.
- :ref:`Install and run the node<run-node-macos>`

Configure a node as a baker
===========================

To run a node as baker, you first have to generate baker keys and then register the keys on an account. Depending on whether you are using Desktop Wallet or |mw-gen2| / |mw-gen1|, the process to generate baker keys differs.
For information about the process for each type of wallet, see :ref:`baker-concept`.
You then need to move the generated baker keys file to a location accessible by the node,
and finally specify this location in the service file for the Concordium Node.

.. note::
   Baker credentials registered on mainnet will not work with a testnet node
   and vice versa.

On mainnet
----------

#. Move the ``baker-credentials.json`` file to the node's config folder:

   .. code-block:: console

      $sudo cp "/path/to/mainnet/baker-credentials.json" "/Library/Application Support/Concordium Node/Mainnet/Config/baker-credentials.json"

   (replacing ``/path/to/mainnet/baker-credentials.json`` with the actual file path to your baker credentials for mainnet).

#. Edit the service file as an administrator. The service file is found here: ``/Library/Concordium\
   Node/LaunchDaemons/software.concordium.mainnet.node.plist``

#. Underneath the ``<dict>`` tag in the *EnviromentVariables* section of the file add the following::

    <!-- Path to the baker credentials file. -->
    <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
    <string>/Library/Application Support/Concordium Node/Mainnet/Config/baker-credentials.json</string>

#. Restart your node by running **Concordium Node Stop Mainnet** (if running) and then
   **Concordium Node Start Mainnnet**.

On testnet
----------

#. Move the ``baker-credentials.json`` file to the node's config folder:

   .. code-block:: console

      $sudo cp "/path/to/testnet/baker-credentials.json" "/Library/Application Support/Concordium\ Node/Testnet/Config/baker-credentials.json"

   (replacing ``/path/to/testnet/baker-credentials.json`` with the actual file path to your baker credentials for testnet).

#. Edit the service file as an administrator. The service file is found here: ``/Library/Concordium\
   Node/LaunchDaemons/software.concordium.testnet.node.plist``

#. In the *EnviromentVariables* section of the file add the following::

    <!-- Path to the baker credentials file. -->
    <key>CONCORDIUM_NODE_BAKER_CREDENTIALS_FILE</key>
    <string>/Library/Application Support/Concordium Node/Testnet/Config/baker-credentials.json</string>

#. Restart your node by running **Concordium Node Stop Testnet** (if running) and then
   **Concordium Node Start Testnet**.

In the Desktop Wallet, |mw-gen2|, and |mw-gen1|, a bread icon is added to
the account associated with the baker node. The bread icon appears as
soon as the transaction has been submitted. That is, before the two
epochs have elapsed.
