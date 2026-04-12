.. Should answer:
..
.. - Why should I use a schema?
.. - What is a schema?
.. - Where to use a schema?
.. - How is a schema embedded?
.. - Should I embed or write to file?
..

.. _`custom section`: https://webassembly.github.io/spec/core/appendix/custom.html
.. _`implementation in Rust`: https://github.com/Concordium/concordium-base/blob/main/smart-contracts/contracts-common/concordium-contracts-common/src/schema.rs

.. _contract-schema:

================
Contract schemas
================

A smart contract schema is a description of how to represent bytes in a more
structured representation. It can be used by external tools when displaying the
return value of a receive function and for specifying parameters using a
structured representation, such as JSON.

.. seealso::

   For instructions on how to build the schema for a smart contract module in
   Rust, see :ref:`build-schema`.

Why use a contract schema
=========================

Data on the blockchain, such as the state of an instance and parameters passed
to init and receive functions, is serialized as a sequence of bytes.
The serialization is optimized for efficiency, rather than human readability.

.. todo::

   Consider rewriting this subsection as it can be somewhat difficult to
   understand; in particular, possibly just say that for convenience, the user
   can pass unserialized data into a function as long as they also provide a
   schema that spells out how to (de)serialize the data.

Usually these bytes have structure and this structure is known to the smart
contract as part of the contract functions, but outside of these functions it
can be difficult to make sense of the bytes. This is especially the case when
inspecting a complex return value from or passing a complex parameters to a
smart contract function.
In the latter case, the byte array should either be serialized from structured data
or written manually.

The solution for avoiding manual parsing of bytes is to capture this information
in a *smart contract schema*, which describes how to make structure from the
bytes, and can be used by external tools.

.. note::

   The ``concordium-client`` tool can use a schema to
   :ref:`serialize JSON parameters<init-passing-parameter-json>`
   and to deserialize the return values of smart contract functions when using
   the ``contract invoke`` functionality.

The schema is then either embedded into a smart contract module that is deployed
to the chain, or is written to a file and passed around off-chain.

Should you embed or write to a file?
====================================

Whether a contract schema should be embedded or written to a file depends on
your situation.

Embedding the schema into the smart contract module distributes the schema
together with the contract ensuring the correct schema is being used and also
allows anyone to use it directly. The downside is that the smart contract module
becomes bigger in size and therefore more expensive to deploy.
But unless the smart contract uses very complex types for the parameters and
return values, the size of the schema is likely to be negligible compared to the
size of the smart contract itself.

Having the schema in a separate file allows you to have the schema without
paying for the extra bytes when deploying.
The downside is that you instead have to distribute the schema file through some
other channel and ensure that contract users are using the correct file with your
smart contract.

The schema format
=================

.. todo::

   Clarify whether we talk about *any* abstract schema that a user could implement,
   or a specific schema supplied by Concordium. Then only talk about one or the other,
   or at least clearly separate the discussion of those.

A schema can contain

- structure information for a smart contract module
- parameters and return values for init and receive functions of a smart contract.

Each of these descriptions is referred to as a *schema type*. Schema types are always
optional to include in a schema.

Currently, the supported schema types are inspired by what is commonly used in
the Rust programming language:

.. code-block:: rust

   enum Type {
       Unit,
       Bool,
       U8,
       U16,
       U32,
       U64,
       U128,
       I8,
       I16,
       I32,
       I64,
       I128,
       Amount,
       AccountAddress,
       ContractAddress,
       Timestamp,
       Duration,
       Pair(Type, Type),
       List(SizeLength, Type),
       Set(SizeLength, Type),
       Map(SizeLength, Type, Type),
       Array(u32, Type),
       Struct(Fields),
       Enum(List (String, Fields)),
       String(SizeLength),
       ContractName(SizeLength),
       ReceiveName(SizeLength),
   }

   enum Fields {
       Named(List (String, Type)),
       Unnamed(List Type),
       Empty,
   }


Here, ``SizeLength`` describes the number of bytes used to describe the length
of a variable length type, such as ``List``.

.. code-block:: rust

   enum SizeLength {
       One,
       Two,
       Four,
       Eight,
   }

For a reference on how a schema type is serialized into bytes, refer to the `implementation in Rust`_.

.. _contract-schema-which-to-choose:

Embed schemas on-chain
======================

Schemas are embedded into smart contract modules using the `custom
section`_ feature of Wasm modules.
This allows Wasm modules to include a named section of bytes, which does not
affect the semantics of running the Wasm module.

The module can contain a schema in one of two different custom sections. This collection is a list of pairs, containing the name of the contract encoded
in UTF-8 and the contract schema bytes. The section ``concordium-schema`` is the most common and is what the current tooling produces.

'V1', 'V2', or 'V3' schemas are available for on smart contracts. The supported sections depend on the module version. The schema version can be either defined by the section name or embedded into the actual schema:

- Both 'V0' and 'V1' modules support the section ``concordium-schema`` where the schema includes the version.

- 'V1' modules additionally support section ``concordium-schema-v2`` which always contain a 'V1' schema.
