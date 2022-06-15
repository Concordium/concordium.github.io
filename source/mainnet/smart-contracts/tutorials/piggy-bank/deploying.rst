.. _Rust: https://www.rust-lang.org/

.. _piggy-bank-deploying:

=======================================
Deploying the piggy bank smart contract
=======================================

This is the fourth :ref:`part of a tutorial<piggy-bank>` on smart contract
development.
So far you have written and tested a piggy bank smart contract in the Rust_ programming language.

Furthermore, you set up your testnet node on a server, created an account that is funded with some CCD, and  imported your account key into the ``concordium-client`` configuration.

This part will focus on how you can deploy your developed piggy bank smart contract to the Concordium testnet and interact with it.


.. warning::

   The reader is assumed to have basic knowledge of what a blockchain and smart
   contract is, and some experience with Rust_.


Preparation
===========

Before you start, make sure you completed the previous parts of the tutorial and have a running testnet node that has caught up to the head of the blockchain and an account with some CCD setup.

Building a wasm module
======================

You have already built a wasm module from your piggy bank smart contract in a :ref:`previous part<cargo-concordium-build>` of this tutorial.

Let's repeat this step since you might have done some changes to the smart contract code in :ref:`part 2<piggy-bank-testing>` of this tutorial. Move to the folder where you saved your piggy bank smart contract and use ``cargo concordium build`` to create a wasm module.

.. code-block:: console

   $cargo concordium build

.. Note::
   This command creates a module ``piggy_bank_part2.wasm.v1`` in the folder ``./target/concordium/wasm32-unknown-unknown/release/``.
   Please use the wasm module file suffixed with ``v1`` when deploying to the chain. The ``piggy_bank_part2.wasm`` file (without the ``v1`` suffix) is not the ``v0`` module, but rather the raw wasm module produced by cargo.
   The ``v1`` suffixed module has been stripped for debugging information, which makes it significantly smaller. Modules already include the smart contract version (and the size of the module).


The ``piggy_bank_part2.wasm.v1`` file can be deployed to the Concordium chain. Let’s transfer the ``piggy_bank_part2.wasm.v1`` file to the place where you are running your concordium-client tool. Move to the folder as well.

Deploying a module
==================
You are now set up to deploy the piggy bank module to the testnet chain. Let's give the module the name ``piggy_bank_part2_module`` so it can be referenced in this tutorial.

.. Note::
   Please remember to adjust the following commands when you are running your ``concordium-client`` tool locally and want to connect to your node on the server. You can look up the different options on how to connect the ``concordium-client`` tool to your testnet node :ref:`here<interacting-with-your-testnet-node>`.

.. code-block:: console

   $./concordium-client module deploy piggy_bank_part2.wasm.v1 --sender <account-name> --name piggy_bank_part2_module --grpc-port 10001


.. Note::
   This tutorial uses ``Concordium`` for the <account-name>.

.. Note::
   You will be asked to input a password. Use the ``export password`` that you used for creating the key backup file.

If everything works correctly the output has a green line with your module reference. You can find additional information about deploying a module in this :ref:`guide<deploy-module>`.

.. code-block:: console

   Module successfully deployed with reference: <module-reference>.
   Module reference <module-reference> was successfully named 'piggy_bank_part2_module'.


Initializing a module
=====================

You can initialize your smart contract now to create a smart contract instance. Let's give the instance the name ``piggy_bank_part2_instance`` so it can be referenced in this tutorial.

.. code-block:: console

   $./concordium-client contract init piggy_bank_part2_module --sender <account-name> --contract PiggyBank --name piggy_bank_part2_instance --energy 1000 --grpc-port 10001

.. Note::
   1000 is enough energy to initialize the piggy bank smart contract but you might need more energy for larger smart contracts.


If everything works correctly the output has a green line with your smart contract instance index.

.. code-block:: console

   Contract successfully initialized with address: {"index":<smart-contract-instance-index>,"subindex":0}
   Contract address {"index":<smart-contract-instance-index>,"subindex":0} was successfully named 'piggy_bank_part2_instance'.


You can find additional information about initializing a smart contract instance in this :ref:`guide<initialize-contract>`.


Updating the piggy bank smart contract (sending CCD)
====================================================

Let's deposit 1 CCD into the piggy bank to test if you can update the smart contract instance.

.. code-block:: console

   $./concordium-client contract update piggy_bank_part2_instance --entrypoint insert --energy 1000 --sender <account-name> --amount 1 --grpc-port 10001

If everything works correctly the output has a green line as follows:

.. code-block:: console

   Successfully updated contract instance {"index":<smart-contract-instance-index>,"subindex":0} ('piggy_bank_part2_instance') using the function 'insert'.

You can find additional information about updating a smart contract instance in this :ref:`guide<interact-instance>`.


Viewing the piggy bank state
============================

You can display the raw return value of your piggy bank smart contract with the following command.

.. code-block:: console

   $./concordium-client contract invoke piggy_bank_part2_instance --entrypoint view --energy 1000 --grpc-port 10001

If everything works correctly the output has a green line as follows:

.. code-block:: console

   Invocation resulted in success:
   - Energy used: 510 NRG
   - Return value (raw):
   [0,64,66,15,0,0,0,0,0]
   .


You can find additional information about invoking in this :ref:`guide<invoke-instance>`.


Updating the piggy bank smart contract (sending no CCD)
=======================================================

Let's smash the piggy bank contract to test that you can update the smart contract instance without sending CCD.

.. code-block:: console

   $./concordium-client contract update piggy_bank_part2_instance --entrypoint smash --sender <account-name> --energy 2000 --grpc-port 10001

.. Note::
   Ensure that you don't send any CCD to the smart contract instance and that the <account-name> is the same as the <account-name> that initialized the piggy bank smart contract instance.


If everything works correctly the output has a green line as follows:

.. code-block:: console

   Successfully updated contract instance {"index":<smart-contract-instance-index>,"subindex":0} ('piggy_bank_part2_instance') using the function 'smash'.

You can find additional information about updating a smart contract instance in this :ref:`guide<interact-instance>`.

Congratulation. You went through the whole piggy bank tutorial.
