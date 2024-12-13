.. include:: ../../../variables.rst
.. _deploy-module:

==============================
Deploy a smart contract module
==============================

This guide will show you how to deploy a smart contract module *on-chain* and
how to name it.

Preparation
===========

Make sure that you are :ref:`running a node<node-requirements>` using the latest :ref:`Concordium software<downloads>` and
that you have a :ref:`smart-contract module<build-contract>` ready to be deployed.

Since deploying a smart contract module is done in the form of a transaction,
you will also need to have ``concordium-client`` setup with an account with
enough CCD to pay for the transaction.

.. note::

   The cost of the transaction is dependent on the size of the smart contract
   module. ``concordium-client`` shows the cost and asks for confirmation
   before it executes any transaction.

To ease deployment and initialization, you can use the `Smart contract deploy and initialize tool <https://sctools.mainnet.concordium.software/>`__ instead of the process below. It works with the |bw| to deploy and initialize smart contracts to Mainnet and Testnet.

Deployment
==========

To deploy a smart contract module ``my_module.wasm.v1`` using the account
with name account-name, run the following command:

.. code-block:: console

   $concordium-client module deploy my_module.wasm.v1 --sender account_name

.. note::

   The ``--sender`` option can be omitted if the account "default" is to be used. For brevity, you will do so in the following.

   Modules built with ``cargo-concordium`` (version 2+) get a suffix corresponding to
   the smart contract version, i.e. ``my_module.wasm.v0`` for V0 contracts and
   ``my_module.wasm.v1`` for V1 contracts.

   When deploying a smart contract module built using ``cargo-concordium``
   version < 2, or built directly with ``cargo``, it is necessary to
   specify the smart contract version with the ``--contract-version [v0, v1]``
   option. These module files will not have the version suffix, e.g.
   ``.v0``, or ``.v1``, but just be called ``<module_name>.wasm``.

If successful, the output should be similar to the following:

.. code-block:: console

   Module successfully deployed with reference: 'd121f262f3d34b9737faa5ded2135cf0b994c9c32fe90d7f11fae7cd31441e86'.

Make note of the module reference as it is used when creating smart contract
instances.

.. seealso::

   For a guide on how to initialize smart contracts from a deployed module see
   :ref:`initialize-contract`.

   For more information about module references, see :ref:`references-on-chain`.

.. _naming-a-module:

Naming a module
===============

A module can be given a local alias, or *name*, which makes referencing it
easier.
The name is only stored locally by ``concordium-client``, and is not
visible on-chain.

.. seealso::

   For an explanation of how and where the names and other local settings are
   stored, see :ref:`local-settings`.

To add a name during deployment, the ``--name`` parameter is used.
Here, you are naming the module ``my_deployed_module``:

.. code-block:: console

   $concordium-client module deploy my_module.wasm.v1 --name my_deployed_module

If successful, the output should be similar to the following:

.. code-block:: console

   Module successfully deployed with reference: '9eb82a01d96453dbf793acebca0ce25c617f6176bf7a564846240c9a68b15fd2' (my_deployed_module).

Modules can also be named using the ``name`` command.
To name a deployed module with reference
``9eb82a01d96453dbf793acebca0ce25c617f6176bf7a564846240c9a68b15fd2`` as
``some_deployed_module``, run the following command:

.. code-block:: console

   $concordium-client module name \
             9eb82a01d96453dbf793acebca0ce25c617f6176bf7a564846240c9a68b15fd2 \
             --name some_deployed_module

The output should be similar to the following:

.. code-block:: console

   Module reference 9eb82a01d96453dbf793acebca0ce25c617f6176bf7a564846240c9a68b15fd2 was successfully named 'some_deployed_module'.

.. toctree::
   :hidden:
   :maxdepth: 1

   initialize-contract
   interact-instance
   inspect-instance
   invoke-instance
