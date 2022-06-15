.. _Rust: https://www.rust-lang.org/

.. _piggy-bank-preparing:

====================================
Preparing a testnet node on a server
====================================

This is the third :ref:`part of a tutorial<piggy-bank>` on smart contract
development.

So far you have written and tested a piggy bank smart contract in the Rust_ programming
language.

This part will focus on how you can set up your own testnet node on a server and create a testnet account.
In more detail, you will create an instance on a server that will host your own testnet node. Secondly, you will create your own testnet account and prepare it so you can use it in the fourth :ref:`part of this tutorial<piggy-bank-deploying>` for deploying and interacting with your piggy bank smart contract.

.. warning::

   The reader is assumed to have basic knowledge of what a blockchain and smart
   contract is, and some experience with Rust_.


Preparation
===========

Before you start, make sure you create an account on your favourite cloud provider to set up your instance.

You are now ready to select an instance on the cloud provider that matches the following requirements to run a testnet node:

.. list-table::
   :widths: 25 25
   :header-rows: 1

   * - Hardware (Testnet node)
     - Recommended
   * - CPU (Core)
     - ?
   * - RAM (Memory)
     - 8 GB
   * - Storage
     - 50 GB
   * - Operating system
     - Ubuntu 20.04 x64

.. Note::
   The above requirements are simple and meant for a testnet node only. Please have a look at the :ref:`requirements <system-requirements-node-mainnet>` for mainnet nodes.

Syncing a testnet node
======================

The :ref:`run a node <node-requirements>` guide will help you set up your instance correctly. It is recommended to use an ubuntu instance on a server in the cloud for this tutorial.

.. Note::
   It is technically fine to run your testnet node locally on your machine instead of on a server in the cloud. Since blockchain nodes have to run 24/7 to be up-to-date with the blockchain, you have to run your local machine 24/7. Alternatively, if you don't want to run your local machine 24/7, you can let your node catch up whenever you start your machine. Because this takes some time, this tutorial recommends a cloud provider setup for convenience.

Start the syncing process of the testnet node by following the guide for your platform :ref:`Ubuntu<ubuntu-node>`, :ref:`Docker<docker-node>`, :ref:`Windows<windows-node>`, or :ref:`MacOS<macos-node>`.

You should find your node name on the `Concordium testnet dashboard <https://dashboard.testnet.concordium.com/>`__. It will take less than a day until your testnet node is fully synced. You can observe the syncing process by watching the finalization length of your node. Wait until the ``Fin Length`` (finalization length) of your node is the same as the highest value used by the majority of nodes.

.. Note::
   To allow the network dashboard to display nodes in the network and their current status, a node must run a collector. The collector is enabled by the default start-up script but can be disabled.

.. image:: ./images/pb_tutorial_13.png
   :width: 100 %

Alternatively, you can query the syncing state of your node with the ``concordium-client`` tool. You will learn how to set up the ``concordium-client`` tool in the next section. Feel free to come back to this command after reading the next section.

.. code-block:: console

   ./concordium-client consensus status --grpc-port 10001


.. Note::
   It is a good practice to enable inbound connections on port 8889 (testnet) in your instance. You can allow inbound connections from any IPv4 and IPv6 address, by selecting ``0.0.0.0/0`` and ``::/0`` on the port 8889. This is not mandatory for the node to sync but it will make your node a good network participant. Feel free to skip this step if you are not feeling confident editing the inbound connection rules of your instance.

.. image:: ./images/pb_tutorial_12.png
   :width: 100 %

.. _interacting-with-your-testnet-node:

Interacting with your testnet node
==================================

You are now ready to download the :ref:`concordium-client<concordium-node-and-client-download-testnet>` package. Please rename the package to just ``concordium-client`` in case it has some version annotation so you can follow the commands in this guide easily.

.. Note::
   If you are not using ubuntu/linux as your operating system the following screenshots look differently. Please remember to adjust the following commands based on your operating system if you are not using ubuntu/linux.

Move to the folder that you downloaded the ``concordium-client`` to. You can check if you are in the correct folder when you see the output ``concordium-client`` from the command:

.. code-block:: console

   $ls | grep 'concordium-client'

.. image:: ./images/pb_tutorial_10.png
   :width: 70 %

.. Note::
   Alternatively, if you don't want to move around in the folders, you can add the folder, where the ``concordium-client`` tool is located, to your PATH variable with the command
   ``export PATH="$HOME/path/to/your/concordium-client:$PATH"``.
   This allows you to use the following commands (such as ``concordium-client --help``)
   without prepending them with ``./``. Effectively,  prepending with ``./``
   searches for the executable package in the current directory while
   omitting ``./`` searches for the executable package in the PATH variable.

The package is not yet executable. You change this with the command:


.. code-block:: console

   $chmod +x concordium-client

.. image::
   ./images/pb_tutorial_8.png
   :width: 50 %


Let's check if you can execute the ``concordium-client`` tool.


.. code-block:: console

   $./concordium-client --help

You should see some output that will help you in getting familiar with the ``concordium-client`` tool.

.. image:: ./images/pb_tutorial_9.png
   :width: 100 %

The ``concordium-client`` tool will allow you to interact with your testnet node. You find important commands that the ``concordium-client`` tool provides :ref:`here<concordium-client>`.

Your next task enables the ``concordium-client`` tool to talk to your testnet node. There are two options to achieve this:

1. Option (beginners)

This option explains how to transfer the ``concordium-client`` tool to your instance and execute commands from within the instance.

**Advantage**: You can execute the commands within your instance.

**Disadvantage**: You have to transfer files between your local machine and your instance later in the tutorial.

Transfer the ``concordium-client`` package from your machine via a file-sharing tool (such as `FileZilla <https://filezilla-project.org/>`__ or the ``sftp`` command) to your instance.

Connect to your instance and make your package executable again as you have done previously already:

.. code-block:: console

   $chmod +x concordium-client

Let's check if everything is connected correctly by displaying the best/latest block.

.. code-block:: console

   $./concordium-client block show --grpc-port 10001

You should see some block data output.

.. image:: ./images/pb_tutorial_18.png
   :width: 100 %

.. Note::
   Port 10001 is open by default on your testnet node to interact with it.

2. Option (advanced users)

This option explains how you can use the ``concordium-client`` tool locally on your machine and connect remotely to your node running on the server.

**Advantage**: You don't have to transfer files between your local machine and your instance later in the tutorial.

**Disadvantage**: You have to use ssh with port forwarding when you run a command locally.

Since you have a remote server your cloud provider usually gives you an option to ssh into it. Add the following port forwarding rule to your method to ssh into your instance. The port 10001 on your localhost is forwarded to the port 10001 on your instance.

.. code-block:: console

   $ssh -L localhost:10001:<IP-address-of-your-instance>:10001 <username>@<host>

.. Note::
   Port 10001 is open by default on your testnet node to interact with it. Cloud providers often use ``ubuntu`` as the default <username> and the <IP-address-of-your-instance> as the default <host>.

Move to the folder that you downloaded the ``concordium-client`` to. Let's check if everything is connected correctly by displaying the best/latest block.

.. code-block:: console

   $ssh <method-to-ssh-into-your-instance-given-by-your-cloud-provider> ./concordium-client block show --grpc-ip <IP-address-of-your-instance> --grpc-port 10001

You should see some block data output.

.. image:: ./images/pb_tutorial_17.png
   :width: 100 %


Creating a mobile wallet account on testnet
===========================================
You are ready to create a mobile wallet account now.

.. Note::
   Only the Concordium mobile wallet currently supports exporting of keys. Please do not use the Concordium desktop wallet for this tutorial.

You can download the mobile wallet package from the :ref:`installation page<downloads-mobile-wallet-testnet>`.
If you follow the instruction in the mobile app you are asked to name your account and to name your initial identity card. This tutorial uses ``Concordium`` for the account name and ``Account1`` for the identity card name but feel free to choose your own naming.


.. image:: ./images/pb_tutorial_1.png
   :width: 20 %

.. image:: ./images/pb_tutorial_2.png
   :width: 20 %

.. image:: ./images/pb_tutorial_3.png
   :width: 20 %



You don't have to provide an ID to create an account on testnet when selecting ``Concordium testnet IP``. This gives you an example of a dummy identity that you can customise or use as it is. Dummy identities are meant for testnet/stagenet testing only.

.. image:: ./images/pb_tutorial_4.png
   :width: 20 %

.. Note::
   On mainnet you will have to provide your personal ID to an identity provider to get a mainnet account.

You also have to request some testnet CCD. The mobile app wallet has a button that you can use to request 2000 testnet CCD.

.. image:: ./images/pb_tutorial_5.png
   :width: 20 %
.. image:: ./images/pb_tutorial_6.png
   :width: 20 %

.. Note::
   Some CCD on your testnet account is needed later when sending transactions from your account to the testnet blockchain.

Create a backup of your wallet by clicking the ``Backup`` button in the mobile app. Save the file ``concordium-backup.concordiumwallet`` for now because it will be used in the next section.

.. image:: ./images/pb_tutorial_7.png
   :width: 20 %

.. Note::
   Please remember the ``export password`` that you used for creating the backup file. The password is needed later when importing your account key into the ``concordium-client`` configuration.


Importing your mobile wallet account key
========================================

You are ready now to import your key into the ``concordium-client`` configuration. Let's transfer your wallet backup file (meaning the file ``concordium-backup.concordiumwallet``) to the place where you are running your ``concordium-client`` tool. Move to the folder as well.

You are set for importing your key into the ``concordium-client`` configuration:

.. code-block:: console

   $./concordium-client config account import ./concordium-backup.concordiumwallet

.. Note::
   You will be asked to input a password. Use the ``export password`` that you used for creating the key backup file.

