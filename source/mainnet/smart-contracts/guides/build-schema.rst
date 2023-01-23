.. _list of types implementing the SchemaType: https://docs.rs/concordium-contracts-common/latest/concordium_contracts_common/schema/trait.SchemaType.html#foreign-impls
.. _build-schema:

=======================
Build a contract schema
=======================

This guide will show you how to build a smart contract schema, how to export it
to a file, and/or embed the schema into the smart contract module, all using
``cargo-concordium``.

.. note ::

   Schemas are used by off-chain tools to represent byte data in a more human-readable manner.

Preparation
===========

First, ensure you have ``cargo-concordium`` installed and if not the guide
:ref:`setup-tools` will help you.

You also need the Rust source code of the smart contract you wish to build a
schema for.

Setup the contract for a schema
===============================

In order to build a contract schema, you first have to prepare our smart
contract for building the schema.

You can choose which parts of the smart contract to include in the schema.
For each init function, you can choose to include a schema for the parameter, the errors, and/or the events.
And for each receive function, you can choose to include a schema for the parameter,
the return value, and/or the errors.

Every type you want to include in the schema must implement the ``SchemaType``
trait. This is already done for all base types and some other types (see `list of types implementing the SchemaType`_).
For most other cases, it can also be derived automatically, using
``#[derive(SchemaType)]``::

   #[derive(SchemaType)]
   struct SomeType {
       ...
   }

Implementing the ``SchemaType`` trait manually only requires specifying one
function (``get_type()``), which is a getter for a ``schema::Type``, which essentially describes
how this type is represented as bytes and how to represent it as JSON.

For example, the `Cis2 library <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/concordium-cis2/src/lib.rs>`_
implements the ``SchemaType`` trait manually for a few types that can not derive their ``SchemaType`` from base types.
The example below explores the manual ``SchemaType`` trait implementation of the
``Cis2Event<T, A>``:

.. _build-event-schema:

.. code-block:: rust

   impl<T: IsTokenId, A: IsTokenAmount> schema::SchemaType for Cis2Event<T, A> {
      fn get_type() -> schema::Type {
         let mut event_map = BTreeMap::new();
         event_map.insert(
            TRANSFER_EVENT_TAG,
            (
               "Transfer".to_string(),
               schema::Fields::Named(vec![
                  (String::from("token_id"), T::get_type()),
                  (String::from("amount"), A::get_type()),
                  (String::from("from"), Address::get_type()),
                  (String::from("to"), Address::get_type()),
               ]),
            ),
         );

         ...

         schema::Type::TaggedEnum(event_map)
      }
   }

.. note ::

   Event schemas can be represented by the ``TaggedEnum Type`` (`see list of types available to implement a schema <https://docs.rs/concordium-contracts-common/latest/concordium_contracts_common/schema/enum.Type.html>`_).
   The first byte of the event data logged includes
   a tag to distinguish the different events on-chain. For example, the TRANSFER_EVENT_TAG is 255 (u8::MAX)
   which is the key used in the above ``BTreeMap`` to store the ``Transfer`` event schema. The value of the ``Transfer`` event
   in the above ``BTreeMap`` is a tuple consisting of a ``String`` (named ``Transfer``) and named ``Fields`` (``token_id``, ``amount``, ``from``, and ``to``).
   Off-chain tools use this tuple to represent the ``Transfer`` event in a more human-readable manner. In detail, the
   ``String`` is used as the key in the JSON representation, and the ``Fields`` are used as the values in the JSON representation by off-chain tools.

Including schemas for init
--------------------------

To generate and include the schema for the parameter, the errors, and/or the events for the init function, set the
optional ``parameter``, ``error``, and ``event`` attributes for the
``#[init(..)]``-macro::

   #[derive(SchemaType)]
   enum InitParameter { ... }

   #[derive(Serial, Reject, SchemaType)]
   enum InitError { ... }

   #[derive(SchemaType)]
   enum InitEvent { ... }

   #[init(contract = "my_contract", parameter = "InitParameter",
   error = "InitError", event = "InitEvent")]
   fn contract_init<...>(...) -> <..., InitError> { ... }

.. note ::

   The event schema attached to the ``init`` function is globally available. Any event logged by ``init`` or ``receive`` functions
   is represented by off-chain tools using this event schema.

Including schemas for receive
-----------------------------

To generate and include the schema for the parameter, the return value, and/or the errors for receive
functions, set the optional ``parameter``, ``return_value``, and ``error`` attributes for the
``#[receive(..)]``-macro::

   #[derive(SchemaType)]
   enum ReceiveParameter { ... }

   #[derive(SchemaType)]
   enum ReceiveReturnValue { ... }

   #[derive(Serial, Reject, SchemaType)]
   enum ReceiveError { ... }

   #[receive(contract = "my_contract", name = "just_param", parameter = "String")]
   fn contract_receive_just_param<...> (...) -> ReceiveResult<String> { ... }

   #[receive(contract = "my_contract", name = "just_return", return_value = "Vec<u64>")]
   fn contract_receive_just_return<...> (...) -> ReceiveResult<Vec<u64>> { ... }

   #[receive(contract = "my_contract", name = "just_error", error = "ReceiveError")]
   fn contract_receive_just_error<...> (...) -> Result<Vec<u64>, ReceiveError> { ... }

   #[receive(
       contract = "my_contract",
       name = "param_and_return_and_error",
       parameter = "ReceiveParameter",
       return_value = "ReceiveReturnValue",
       error = "ReceiveError"
   )]
   fn contract_receive<...> (...) -> Result<ReceiveReturnValue, ReceiveError> { ... }

Building the schema
===================

Now, you are ready to build the actual schema using ``cargo-concordium``, and you
have the options to embed the schema and/or write the schema to a file.

.. seealso::

   For more on which to choose see
   :ref:`here<contract-schema-which-to-choose>`.

Embedding the schema
--------------------

In order to embed the schema into the smart contract module, add
``--schema-embed`` to the build command

.. code-block:: console

   $cargo concordium build --schema-embed

If successful the output of the command will tell you the total size of the
schema in bytes.

Outputting a schema file
------------------------

To output the schema into a file, use the ``--schema-out=FILE``
where ``FILE`` is a path of the file to create:

.. code-block:: console

   $cargo concordium build --schema-out "/some/path/schema.bin"

If using ``cargo concordium`` version 2.6.0 or newer then the schema can be
output in JSON format that can be more suitable for use in dApps. When building
the contract use ``--schema-json-out DIR`` to output the schema for each
contract in the module to a JSON file inside the directory ``DIR``. The
directory must exist.

.. code-block:: console

   $cargo concordium build --schema-json-out "/some/path"

Both ``--schema-out`` and ``--schema-json-out`` can be used at the same time and
schemas in both formats will be output.

.. code-block:: console

   $cargo concordium build --schema-out "/some/path/schema.bin" --schema-json-out "/some/path"

Converting a binary schema to JSON
----------------------------------

To convert an existing binary schema (obtained via ``--schema-out``) use the
``cargo concordium schema-json`` subcommand, e.g.,

.. code-block:: console

   $cargo concordium schema-json --schema "schema/schema.bin" --out "/some/path"

Alternatively, a schema in JSON can be extracted from an embedded schema in a
module by using

.. code-block:: console

   $cargo concordium schema-json --module "module.wasm.v1" --out "/some/path"
