.. _invoke-instance:

======
Invoke
======

This guide explains how to invoke a smart contract instance, which
means triggering a receive function and viewing its return value. Invoking an
instance is *not a transaction* and it *does not change the state of a contract*.
Invoking can be useful to either view information about the instance or to test
a receive method before running an update. Because invoking is not a transaction, there is no fee to run ``invoke``.
The view functions are regular receive functions that return information about
the contract, ideally with schemas on the return values.

There is no limit to the number of logs per invocation (apart from energy).

Preparation
===========

Make sure that you are :ref:`running a node<node-requirements>` using the latest :ref:`Concordium software<downloads>` and that you have a
smart-contract instance on-chain to inspect.

.. seealso::
   For how to deploy a smart contract module see :ref:`deploy-module` and for
   how to create an instance :ref:`initialize-contract`.


Invocation
==========

To invoke an instance with address index ``0`` (the subindex defaults to ``0``) using the parameterless
entrypoint ``my_receive``, run the following command:

.. code-block:: console

   $concordium-client contract invoke 0 --entrypoint my_receive

If successful, the output should be similar to the following:

.. code-block:: console

   Invocation resulted in success:
   - Energy used: 595 NRG
   - Return value:
       <some-return-value>

The contract state is updated, but the changes are not persisted to the chain and are discarded.
The energy used value represents a simulation of how much NRG is needed when making the smart contract call.

.. note::

   By default, the invocation is sent by a fictional account with address
   ``2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3`` (the byte
   representation is ``[0u8; 32]``).
   This account has unbounded funds.
   However, when specifying a custom sender account or contract, both of which must
   exist on the chain, these must have
   sufficient funds to cover the transfer that will be made to the contract.
   Please note that no funds will be withdrawn on the account or contract as
   it is not a transaction.
   This design allows you to try invoking an entrypoint with your own account or
   contract for free to ensure that the result is as expected before pay for the
   transaction on chain.

Use the ``invoker-account`` parameter to invoke an entrypoint with a specific
sender account:

.. code-block:: console

   $concordium-client contract invoke 0 --entrypoint my_receive --invoker-account <account-address>

Use the ``invoker-contract`` parameter to invoke an entrypoint with a sender contract:

.. code-block:: console

   $concordium-client contract invoke 0 --entrypoint my_receive --invoker-contract <contract-index>

Use the ``amount`` parameter to invoke an entrypoint with the specified amount
of CCD.

.. code-block:: console

   $concordium-client contract invoke 0 --entrypoint my_receive --amount <CCD>

.. note::

   By default, an invoked entrypoint will have the same state and balance as if it
   was an update transaction at the very end of the current best block on the chain.

Use the ``block`` parameter to specify a different block to run the invocation
in:

.. code-block:: console

   $concordium-client contract invoke 0 --entrypoint my_receive --block <block-hash>

Passing parameters in JSON format
---------------------------------

A parameter in JSON format can be passed if a :ref:`smart contract schema
<contract-schema>` is supplied, either as a file or embedded in the module.
The schema is used to serialize the JSON into binary. You can read more about JSON parameters :ref:`here<json-params>`

.. seealso::

   :ref:`Read more about why and how to use smart contract schemas
   <contract-schema>`.

To invoke an instance with address index ``0`` using the receive function
``my_parameter_receive`` with a parameter file ``my_parameter.json`` in JSON
format, run the following command:

.. code-block:: console

   $concordium-client contract invoke 0 --entrypoint my_parameter_receive \
            --parameter-json my_parameter.json

If successful, the output should be similar to the following:

.. code-block:: console

   Invocation resulted in success:
    - Energy used: 595 NRG
    - Return value:
         <some-return-value>

Otherwise, an error describing the problem is displayed.

.. seealso::

   For more information about contract instance addresses, see
   :ref:`references-on-chain`.

.. note::

   If the parameter provided in JSON format does not conform to the type
   specified in the schema, an error message will be displayed. For example:

    .. code-block:: console

       Error: Could not decode parameters from file 'my_parameter.json' as JSON:
       Expected value of type "UInt64", but got: "hello".
       In field 'first_field'.
       In {
           "first_field": "hello",
           "second_field": 42
       }.

.. note::

   If a given module does not contain an embedded schema, it can be supplied
   using the ``--schema /path/to/schema.bin`` parameter.

Passing parameters in binary format
-----------------------------------

When passing parameters in binary format, a
:ref:`contract schema <contract-schema>` is not needed.

To invoke an instance with address index ``0`` using the receive function
``my_parameter_receive`` with a parameter file ``my_parameter.bin`` in binary
format, run the following command:

.. code-block:: console

   $concordium-client contract invoke 0 --entrypoint my_parameter_receive \
            --parameter-bin my_parameter.bin

If successful, the output should be similar to the following:

.. code-block:: console

   Invocation resulted in success:
    - Energy used: 595 NRG
    - Return value:
         <some-return-value>

.. seealso::

   For information on how to work with parameters in smart contracts, see
   :ref:`working-with-parameters`.
