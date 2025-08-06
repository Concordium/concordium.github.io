.. include:: ../../../variables.rst
.. _list of types implementing the SchemaType: https://docs.rs/concordium-contracts-common/latest/concordium_contracts_common/schema/trait.SchemaType.html#foreign-impls
.. _build-schema:

=======================
Build a contract schema
=======================

This guide will show you how to build a smart contract schema, how to export it
to a file, and/or embed the schema into the smart contract module, all using
|cargo-concordium|_.

.. note ::

   Schemas are used by off-chain tools to represent byte data in a more human-readable manner.

Preparation
===========

First, ensure you have ``cargo-concordium`` installed and if not the guide
:ref:`setup-env` will help you.

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
   fn contract_init(...) -> <..., InitError> { ... }

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
   fn contract_receive_just_param(...) -> ReceiveResult<String> { ... }

   #[receive(contract = "my_contract", name = "just_return", return_value = "Vec<u64>")]
   fn contract_receive_just_return(...) -> ReceiveResult<Vec<u64>> { ... }

   #[receive(contract = "my_contract", name = "just_error", error = "ReceiveError")]
   fn contract_receive_just_error(...) -> Result<Vec<u64>, ReceiveError> { ... }

   #[receive(
       contract = "my_contract",
       name = "param_and_return_and_error",
       parameter = "ReceiveParameter",
       return_value = "ReceiveReturnValue",
       error = "ReceiveError"
   )]
   fn contract_receive(...) -> Result<ReceiveReturnValue, ReceiveError> { ... }

Building the schema
===================

Now, you are ready to build the actual schema using ``cargo-concordium``, and you
have the options to embed the schema and/or write the schema to a file and/or print the schema to the console.

.. seealso::

   For more on which to choose see
   :ref:`here<contract-schema-which-to-choose>`.

Embedding the schema
--------------------

The schema is embedded by default when building the smart contract module:

.. code-block:: console

   $cargo concordium build

If successful the output of the command will tell you the total sie of the schema in bytes.

You can disable the default behavior (not recommended) with:

.. code-block:: console

   $cargo concordium build --no-schema-embed

Outputting a schema file
------------------------

To output the schema into a file, use the ``--schema-out FILE``
where ``FILE`` is a path and filename. The path
must exist and the file will be created in following command

.. code-block:: console

   $cargo concordium build --schema-out "/some/path/schema.bin"

If using ``cargo concordium`` version 2.6.0 or newer then the schema can be
output in JSON format that can be more suitable for use in dApps. When building
the contract use ``--schema-json-out DIR`` to output the schema for each
contract in the module to a JSON file inside the directory ``DIR``. The
directory must exist. The files created will be named after the smart contract
names that exist in the module or a counter in case of special characters in the smart contract names:

.. code-block:: console

   $cargo concordium build --schema-json-out "/some/path/"

If using ``cargo concordium`` version 2.7.0 or newer then the schema can be
output in base64 format that is currently supported in the |bw|. When building
the contract use ``--schema-base64-out FILE``, where ``FILE`` is a path and filename. The path
must exist and the file will be created in following command

.. code-block:: console

   $cargo concordium build --schema-base64-out "/some/path/base64_schema.b64"

Instead of writing the base64 representation of the schema to the file provided with the ``--schema-base64-out`` flag, you can print it to the console by using a dash character (-) in following command

.. code-block:: console

   $cargo concordium build --schema-base64-out -

The ``--schema-out``, ``--schema-json-out`` and ``--schema-base64-out`` can be used at the same time and
schemas in all the formats will be output

.. code-block:: console

   $cargo concordium build --schema-out "/some/path/schema.bin" --schema-json-out "/some/path/" --schema-base64-out "/some/path/base64_schema.b64"

.. note ::

   Why are there so many different schema formats?

   - The flags ``--schema-out`` convert the schema into bytes. This was the first schema representation used by Concordium and it is how we embed the schema into a module. This byte format is not human-readable but it is a very compact format and suitable to be used for the smart contract on-chain.

   - The command ``schema-base64`` and the flag ``--schema-base64-out`` convert the schema into base64 format. This is the format that is currently used by the |bw| and most of our frontend examples.

   - The command ``schema-json`` and the flag ``--schema-json-out`` convert the schema into JSON format. This is a human-readable format and will make it easier for developers to develop on the Concordium blockchain. Concordium is in the process of updating its tooling and implementing support for this format.

Converting a binary schema to JSON
----------------------------------

These commands are available in ``cargo concordium`` version 2.6.0 or newer.

To convert an existing binary schema (obtained via ``--schema-out``) use the
``cargo concordium schema-json`` subcommand, e.g.,

.. code-block:: console

   $cargo concordium schema-json --schema "/some/path/schema.bin" --out "/some/path/"

Alternatively, a schema in JSON can be extracted from an embedded schema in a
module (obtained via ``cargo concordium build``) by using

.. code-block:: console

   $cargo concordium schema-json --module "module.wasm.v1" --out "/some/path/"

Converting a binary schema to base64
------------------------------------

These commands are available in ``cargo concordium`` version 2.7.0 or newer.

To convert an existing binary schema (obtained via ``--schema-out``) use the
``cargo concordium schema-base64`` subcommand, e.g.,

.. code-block:: console

   $cargo concordium schema-base64 --schema "/some/path/schema.bin" --out "/some/path/base64_schema.b64"

Alternatively, a schema in base64 format can be extracted from an embedded schema in a
module (obtained via ``cargo concordium build``) by using

.. code-block:: console

   $cargo concordium schema-base64 --module "module.wasm.v1" --out "/some/path/base64_schema.b64"

Instead of writing the base64 representation of the schema to the file provided with the ``--out`` flag,
you can print it to the console by using a dash character (-) or by omitting the ``--out`` flag. The following four
commands print the base64 representation of the schema to the console:

.. code-block:: console

   $cargo concordium schema-base64 --schema "schema.bin"

   $cargo concordium schema-base64 --schema "schema.bin" --out -

   $cargo concordium schema-base64 --module "/some/path/module.wasm.v1"

   $cargo concordium schema-base64 --module "/some/path/module.wasm.v1" --out -

.. _cargo-concordium: https://crates.io/crates/cargo-concordium
.. |cargo-concordium| replace:: ``cargo-concordium``
