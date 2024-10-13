.. include:: ../../../variables.rst
.. _baker-windows:

===============================
Run a validator node on Windows
===============================

This guide describes how to set up the node to run as a :ref:`validator <baker-concept>` node on a Windows node that participates in the Concordium network. A node receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network. In addition, a validator node also participates in the lottery and produces its own blocks. The validator node will start producing blocks two epochs after the transaction has been approved.

Prerequisites
=============

-  Run Windows 10 or later or Windows Server 2019 or later.
-  :ref:`Run a node on Windows<run-node-windows>`
- If you want to run the node as a validator, you must have generated validator keys. How you generate validator keys depends on which wallet you are using. For an overview of the process, see :ref:`baker-concept`.

.. _configure-baker-windows:

Configure a validator node on Windows
=====================================

#. Create validator keys in |bw|, |mw-gen2|, |mw-gen1|, Desktop Wallet or Concordium Client and associate them with an account either on mainnet or testnet.

   .. Note::

      The validator credentials file must be accessible by the SYSTEM user and can’t be encrypted.


   .. Warning::
     Do not edit the name or contents of the validator-credentials.json file.

#. Once you've added validation to an account and exported the validator keys, you have to change the configuration file for the Concordium Node Service. Open **Configure Concordium Node Service** from the **Start** menu, and select **Yes** when you see the message *Do you want to allow this app to make changes to your device?*. The configuration file opens.

#. Add the following in the ``[node.mainnet]`` section if the credentials are for mainnet, or the ``[node.testnet]`` section if they are for testnet. Make sure that you add the credentials to the network the account was created on.

   .. code-block:: console

     baker_credentials = 'C:\path\to\validator-credentials.json'

   where you replace ``C:\path\to\validator-credentials.json`` with the full path to the validator credentials file.

#. Save the file.

#. Stop and restart the node runner service using the **Stop Concordium Service Node** and the **Start Concordium Service Node** shortcuts. Don’t use *End task* in the Task Manager as it might cause errors.

View the node log
=================

You can find the node logs here:

   - Mainnet: ``C:\ProgramData\Concordium\Node Runner\mainnet\logs``
   - Testnet: ``C:\ProgramData\Concordium\Node Runner\testnet\logs``

Troubleshooting
---------------

If a node fails to start, for example because of a configuration issue, or stops unexpectedly, there will be an Error-level event in the **Event Viewer** that explains why. The following are common error scenarios and possible solutions.

- The node doesn't restart after you've set the credentials in the configuration file. This error can occur when the specified location of the credentials file is incorrect. In the **Event Viewer** an error such as the following might appear. When this happens, change the path in the configuration file.

   .. image:: ./images/Node-setup-win-10.png
         :width: 60%

- The node doesn't start validation, and in the log file you see the message *Validator keys are incorrect* repeatedly. It takes 1-2 hours after validator keys have been added to an account for the keys to be eligible to produce blocks. If this problem persists beyond two hours, then likely the keys are incorrect. Double check that you are not using keys from testnet on mainnet, or vice-versa.

For more information on the logs, see :ref:`Run a node on Windows<view-windows-node-log>`.

Other options for running a validator node
==========================================

If you're not using Windows, you can run a node by using :ref:`Docker <run-a-node>`, :ref:`Ubuntu <run-node-ubuntu>`, or :ref:`macOS <run-node-macos>`.
