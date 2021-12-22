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

.. _configure-baker-windows:

Configure a baker node on Windows
=================================

#. Create baker keys and associate them with an account either on mainnet or testnet. Doing this with the :ref:`Desktop Wallet<create-baker-desktop>` is recommended. However, if you want use an account from the mobile wallet as a baker account, you have to use the :ref:`Concordium Client<become-a-baker>`, in partiuclar the commands:

   .. code-block:: console

     concordium-client baker generate-keys <keys-file>.json

   and 

 
   .. code-block:: console

     concordium-client baker add <keys-file>.json --sender bakerAccount --stake <amount-to-stake> --out <concordium-data-dir>/baker-credentials.json

   In the following, the baker keys are referred to as baker-credentials.json.

   .. Note::

      The baker credentials file must be accessible by the SYSTEM user and can’t be encrypted.


   .. Warning::
     Do not edit the name or contents of the baker-credentials.json file.

#. Once you've created the baker account and exported the baker credentials, you have to change the configuration file for the Concordium Node Service. Open **Configure Concordium Node Service** from the **Start** menu, and select **Yes** when you see the message *Do you want to allow this app to make changes to your device?*. The configuration file opens.

#. Add the following in the ``[node.mainnet]`` section if the credentials are for mainnet, or the ``[node.testnet]`` section if they are for testnet. Make sure that you add the credentials to the network the account was created on.

   .. code-block:: console

     baker_credentials = 'C:\path\to\baker-credentials.json'

   where you replace ``C:\path\to\baker-credentials.json`` with the full path to the baker credentials file.

#. Save the file.

#. Stop and restart the node runner service using the **Stop Concordium Service Node** and the **Start Concordium Service Node** shortcuts. Don’t use *End task* in the Task Manager as it might cause errors.

View the node log
=================
   You can find the node logs here:

   - Mainnet: ``C:\ProgramData\Concordium\Node Runner\mainnet\logs``
   - Testnet: ``C:\ProgramData\Concordium\Node Runner\testnet\logs``

Baker node troubleshooting
--------------------------

If a node fails to start, for example because of a configuration issue, or stops unexpectedly, there will be an Error-level event in the **Event Viewer** that explains why. The following are common error scenarios and possible solutions.

- The node doesn't restart after you've set the credentials in the configuration file. This error can occur when the specified location of the credentials file is incorrect. In the **Event Viewer** an error such as the following might appear. When this happens, change the path in the configuration file.

   .. image:: ../images/run-node/Node-setup-win-10.png
         :width: 60%

- The node doesn't start baking, and in the log file you see the message *Baker keys are incorrect* repeatedly. It takes 1-2 hours after baker keys have been added to an account for the keys to be eligible for baking. If this problem persists beyond two hours, then the keys likely are incorrect. Double check that you are not using keys from testnet on mainnet, or vice-versa.

For more information on the logs, see :ref:`Run a node on Windows<view-windows-node-log>`.

Other options for running a baker node
======================================

If you're not using Windows, you can run a node by using :ref:`Docker <run-a-node>`, :ref:`Ubuntu <run-node-ubuntu>`, or :ref:`macOS <run-node-macos>`.
