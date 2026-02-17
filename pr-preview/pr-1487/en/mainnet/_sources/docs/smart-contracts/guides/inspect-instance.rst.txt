.. _inspect-instance:

=======
Inspect
=======

This guide explains how to inspect a smart contract instance.
Inspecting an instance shows you its name, owner, module reference, balance,
and receive-functions:

Preparation
===========

Make sure that you are :ref:`running a node<node-requirements>` using the latest :ref:`Concordium software<downloads>` and that you have a
smart-contract instance on-chain to inspect.

.. seealso::
   For how to deploy a smart contract module see :ref:`deploy-module` and for
   how to create an instance :ref:`initialize-contract`.

Inspection
==========

To inspect, or show, information about a smart contract instance with the
address index ``0``, run the following command:

.. code-block:: console

   $concordium-client contract show 0

The output should be similar to the following:

.. code-block:: console

   Contract:        my_contract
   Owner:           '4Lh8CPhbL2XEn55RMjKii2XCXngdAC7wRLL2CNjq33EG9TiWxj' (default)
   ModuleReference: 'd121f262f3d34b9737faa5ded2135cf0b994c9c32fe90d7f11fae7cd31441e86'
   Balance:         0.000000 CCD
   Methods:
    - receive_one
        Parameter:
            "<String>"
        Return value:
            "<UInt64>"
    - receive_two
        Return value:
            "<Bool>"

.. seealso::

   For more information about contract instance addresses, see
   :ref:`references-on-chain`.

The parameter and return values for a method is only shown if the ``show`` command has
access to a :ref:`contract schema <contract-schema>` that contains that
information for the method.
If the schema is embedded, it will be used implicitly.
Otherwise, a schema can be provided using ``--schema /path/to/schema.bin``
parameter.

.. note::

   A schema file provided using the ``--schema`` parameter will take precedence
   over an embedded schema.

.. seealso::

   :ref:`Read more about why and how to use smart contract schemas <contract-schema>`.
