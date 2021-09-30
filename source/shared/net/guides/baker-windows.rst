.. include:: ../../variables.rst
.. _baker-windows:

===========================
Run a baker node on Windows
===========================

.. contents::
   :local:
   :backlinks: none

A baker node is a node that participates in the network by baking (creating) new blocks that are added to the chain. Each baker has a set of cryptographic keys called baker keys that the node needs to bake blocks. You generate the baker keys in the Desktop Wallet when you add a baker account. The baker node will start baking two epochs after the transaction has been approved.

Prerequisites
=============

-  Run Windows 10 or later or Windows Server 2019 or later.
-  Meet the :ref:`minimum system requirements<requirements-run-node>` for running a node.
-  :ref:`Run a node on Windows<run-node-windows>`

Configure a baker node on Windows
=================================

#. To run a Windows node as baker, you have to select an account as baker account in the Desktop Wallet and generate baker keys for the account. For more information, see :ref:`Add a baker account in the Desktop Wallet<create-baker-desktop>`. You get the account information by exporting a JSON file with the baker credentials from the Desktop Wallet.

#. Once you've created the baker account and exported the baker credentials, you have to change the configuration file for the Concordium Node Service.

   You register the baker credentials either on the mainnet or on the testnet. We recommend that you add the baker credentials for the network that you created the credentials on. Don’t use the same baker credentials on both networks.

   -  If you created the credentials in a mainnet version of the Desktop Wallet, add the credentials to ``node.mainnet``. 

   -  If you created credentials in a testnet version of the Desktop Wallet, add the credentials to ``node.testnet``.

#. Depending on whether you're running a node on testnet or mainnet or both, add the following in the ``[node.mainnet]`` or ``[node.testnet]`` section:

   .. code-block:: console

     baker_credentials = 'C:\path\to\baker-credentials.json'

   where you replace ``C:\path\to\baker-credentials.json`` with the full path to the baker credentials file.

#. Stop and restart the node runner service using the **Stop Concordium Service Node** and the **Start Concordium Service Node** shortcuts. Don’t use *End task* in the Task Manager as it might cause errors.

   .. Note::

      The baker credentials file must be accessible by the SYSTEM user and can’t be encrypted.

   You can find the node logs here:

   - Mainnet: ``C:\ProgramData\Concordium\Node Runner\mainnet\logs``
   - Testnet: ``C:\ProgramData\Concordium\Node Runner\testnet\logs``

   For more information on the logs, see :ref:`Run a node on Windows<run-node-windows>`.

Other options for running a baker node
======================================

If you're not using Windows, you can run a node by using :ref:`Docker <run-a-node>`, :ref:`Ubuntu <run-node-ubuntu>`, or :ref:`macOS <run-node-macos>`. You can also create an account in the Mobile Wallet and use the Concordium Client :ref:`Concordium Client<become-a-baker>` to register the baker keys with the account and start the node with the keys.
