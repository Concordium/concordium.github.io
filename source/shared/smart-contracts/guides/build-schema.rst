.. _list of types implementing the SchemaType: https://docs.rs/concordium-contracts-common/latest/concordium_contracts_common/schema/trait.SchemaType.html#foreign-impls
.. _build-schema:

=======================
Build a contract schema
=======================

This guide will show you how to build a smart contract schema, how to export it
to a file, and/or embed the schema into the smart contract module, all using
``cargo-concordium``.

Preparation
===========

First, ensure you have ``cargo-concordium`` installed and if not the guide
:ref:`setup-tools` will help you.

We also need the Rust source code of the smart contract you wish to build a
schema for.

Setup the contract for a schema
===============================

In order to build a contract schema, we first have to prepare our smart
contract for building the schema.

You can choose which parts of the smart contract to include in the schema.
For each init function, you can choose to include a schema for the parameter.
And for each receive function, you can choose to include a schema for the parameter,
the return value, or both.

Every type we want to include in the schema must implement the ``SchemaType``
trait. This is already done for all base types and some other types (see `list of types implementing the SchemaType`_).
For most other cases, it can also be derived automatically, using
``#[derive(SchemaType)]``::

   #[derive(SchemaType)]
   struct SomeType {
       ...
   }

Implementing the ``SchemaType`` trait manually only requires specifying one
function, which is a getter for a ``schema::Type``, which essentially describes
how this type is represented as bytes and how to represent it.

.. todo::

   Create an example showing how to manually implement ``SchemaType`` and link
   to it from here.

Including schemas for init
--------------------------

To generate and include the schema for parameters for init functions, set the optional ``parameter`` attribute for the
``#[init(..)]``-macro::

   #[derive(SchemaType)]
   enum InitParameter { ... }

   #[init(contract = "my_contract", parameter = "InitParameter")]
   fn contract_init<...> (...){ ... }

Including schemas for receive
-----------------------------

To generate and include the schema for parameters or return values for receive
functions, set the optional ``parameter`` or ``return_value`` attribute for the
``#[receive(..)]``-macro::

   #[derive(SchemaType)]
   enum ReceiveParameter { ... }

   #[derive(SchemaType)]
   enum ReceiveReturnValue { ... }

   #[receive(contract = "my_contract", name = "just_param", parameter = "String")]
   fn contract_receive_just_param<...> (...) -> ReceiveResult<String> { ... }

   #[receive(contract = "my_contract", name = "just_return", return_value = "Vec<u64>")]
   fn contract_receive_just_return<...> (...) -> ReceiveResult<Vec<u64>> { ... }

   #[receive(
       contract = "my_contract",
       name = "param_and_return",
       parameter = "ReceiveParameter",
       return_value = "ReceiveReturnValue"
   )]
   fn contract_receive_param_and_return<...> (...) -> ReceiveResult<ReceiveReturnValue> { ... }

Building the schema
===================

Now, we are ready to build the actual schema using ``cargo-concordium``, and we
have the options to embed the schema and/or write the schema to a file.

.. seealso::

   For more on which to choose see
   :ref:`here<contract-schema-which-to-choose>`.

Embedding the schema
--------------------

In order to embed the schema into the smart contract module, we add
``--schema-embed`` to the build command

.. code-block:: console

   $cargo concordium build --schema-embed

If successful the output of the command will tell you the total size of the
schema in bytes.

Outputting a schema file
------------------------

To output the schema into a file, we can use the ``--schema-out=FILE``
where ``FILE`` is a path of the file to create:

.. code-block:: console

   $cargo concordium build --schema-out="/some/path/schema.bin"
