.. _invoke-instance:

================================
Invoke a smart contract instance
================================

This guide will show you, how to invoke with a smart contract instance, which
means triggering a receive function and viewing its return value. Invoking an
instance is *not a transaction* and it *does not change the state of a contract*.
Invoking can useful to either view information about the instance or to test
a receive method before running an update.

Preparation
===========

Make sure that you are :ref:`running a node<run-a-node>` using the latest :ref:`Concordium software<downloads>` and that you have a
smart-contract instance on-chain to inspect.

.. seealso::
   For how to deploy a smart contract module see :ref:`deploy-module` and for
   how to create an instance :ref:`initialize-contract`.


Invocation
==========

To invoke an instance with address index ``0`` using the parameterless
entrypoint ``my_receive`` run the following command:

.. code-block:: console

   $concordium-client contract invoke 0 --entrypoint my_receive

If successful, the output should be similar to the following.
As you can see, the subindex defaults to ``0``:

.. code-block:: console

   Successfully updated contract instance {"index":0,"subindex":0} using the entrypoint 'my_receive'.
   Invocation resulted in success:
   - Energy used: 595 NRG
   - Return value:
       <some-return-value>

.. note::

   By default the invocation is sent by a fictional account with address ``0``.
   This account has sufficient funds to "pay" for the invocation, but no funds will
   be withdrawn when invoking, no matter the sender used, as it is not a transaction.
   However, when specifying a custom sender account or contract, these must have
   sufficient funds to "pay" for the invocation. This design allows you to try
   invoking an entrypoint with your own account or contract for free to ensure that the
   result is as expected before pay for the transaction on chain.

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
The schema is used to serialize the JSON into binary.

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
