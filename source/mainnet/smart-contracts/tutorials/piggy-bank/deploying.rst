.. _Rust: https://www.rust-lang.org/

.. _piggy-bank-deploying:

=======================================
Deploying the piggy bank smart contract
=======================================

This is the fourth :ref:`part of a tutorial<piggy-bank>` on smart contract
development.
So far you have written and tested a piggy bank smart contract in the Rust_ programming language. Furthermore, you set up your testnet node on a server, created an account that is funded with some CCD, and  imported your account key into the ``concordium-client`` configuration.
This part will focus on how you can deploy your developed piggy bank smart contract to the Concordium testnet and interact with it.


.. warning::

   The reader is assumed to have basic knowledge of what a blockchain and smart
   contract is, and some experience with Rust_.


Preparation
===========

Before you start, make sure you completed the previous parts of the tutorial and have a running testnet node and an account with some CCD setup.

Building a wasm module
======================

You have already built a wasm module from your piggy bank smart contract in a :ref:`previous part<cargo_concordium_build>` of this tutorial.

Let's repeat this step since you might have done some changes to the smart contract code in :ref:`part 2<piggy-bank-testing>` of this tutorial. Move to the folder where you saved your piggy bank smart contract and use ``cargo concordium build`` to create a wasm module.

.. code-block:: console

   $cargo concordium build

.. Note::
   This command creates a module ``piggy_bank_part2.wasm.v1`` in the folder ``./target/concordium/wasm32-unknown-unknown/release/``. Please use the wasm module file suffixed with `v1` which is the newest smart contract version supported by the Concordium chain.

The ``piggy_bank_part2.wasm.v1`` file can be deployed to the Concordium chain. Let’s transfer the ``piggy_bank_part2.wasm.v1`` file to the place where you are running your concordium-client tool. Move to the folder as well.

Deploying a module
==================
You are now set up to deploy the piggy bank module to the testnet chain.

.. Note::
   Please remember to adjust the following commands when you are running your ``concordium-client`` tool locally and want to connect to your node on the server. You can look up the different options on how to connect the ``concordium-client`` tool to your testnet node :ref:`here<interacting_with_your_testnet_node>`.

.. code-block:: console

   $./concordium-client module deploy piggy_bank_part2.wasm.v1 --sender <Account name> --grpc-port 10001


.. Note::
   This tutorial uses ``Concordium`` for the <Account name>.

.. Note::
   You will be asked to input a password. It is the password that you use for your mobile app wallet log-in.

If everything works correctly the output has a green line with your module reference. Remember this module reference since it will be used in the next step. You can find additional information about deploying a module in this :ref:`guide<deploy-module>`.

Initializing a module
=====================

You can initialize your smart contract now to create a smart contract instance.

.. code-block:: console

   $./concordium-client contract init <module reference> --sender <Account name> --contract PiggyBank --energy 1000 --grpc-port 10001

.. Note::
   Use enough energy to initialize the piggy bank smart contract.


If everything works correctly the output has a green line with your smart contract instance index. Remember this index since it will be used in the next step.

.. code-block:: console

   Contract successfully initialized with address: {"index":<Smart contract instance index>,"subindex":0}

You can find additional information about initializing a smart contract instance in this :ref:`guide<initialize-contract>`.


Updating the piggy bank smart contract
======================================

Let's deposit 1 CCD into the piggy bank to test if we can update the smart contract instance.

.. code-block:: console

   $./concordium-client contract update <Smart contract instance index> --entrypoint insert --energy 1000 --sender <Account name> --amount 1 --grpc-port 10001

If everything works correctly the output has a green line as follows:

.. code-block:: console

   Successfully updated contract instance {"index":<Smart contract instance index>,"subindex":0} using the function 'insert'.

You can find additional information about updating a smart contract instance in this :ref:`guide<interact-instance>`.


Viewing the piggy bank state
============================

You can display the raw state of your piggy bank smart contract with the following command.

.. code-block:: console

   $./concordium-client contract invoke <Smart contract instance index> --entrypoint view --energy 1000 --grpc-port 10001

You can find additional information about invoking in this :ref:`guide<invoke-instance>`.


Congratulation. You went through the whole piggy bank tutorial.
