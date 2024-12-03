.. _schema-json:

==========================
Schema JSON representation
==========================

This is a reference of how bytes, such as the contract state and parameters can
be represented as JSON together with a ``SchemaType``.

.. seealso::

   See :ref:`contract-schema` for more information on this topic.


JSON for schema type
====================

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
       Map(SizeLength, Type>, Type),
       Array(u32, Type),
       Struct(Fields),
       Enum(List (String, Fields)),
       String(SizeLength),
       ContractName(SizeLength),
       ReceiveName(SizeLength),
       ULeb128(u32),
       ILeb128(u32),
       ByteList(SizeLength),
       ByteArray(u32)
   }

``Unit``
--------

No bytes are produced no matter the value given here.

``U8``, ``U16``, ``U32``, ``U64``, ``I8``, ``I16``, ``I32``, ``I64``
--------------------------------------------------------------------

Give a JSON number within the size of the schema type.

``U128``, ``I128``
------------------

Supplied as a JSON string. The value must be within the bounds of the type.
Example:

.. code-block:: json

   "123456789"

``Amount``
----------

Supplied as a JSON string in micro CCD. Example of 42 CCD:

.. code-block:: json

   "42000000"

``AccountAddress``
------------------

Supplied as a JSON string. Example:

.. code-block:: json

   "2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3"

``ContractAddress``
-------------------

Supplied as a JSON object with ``index`` field and
optionally ``subindex`` field, both JSON numbers. Example:

.. code-block:: json

   { "index": 10, "subindex": 10 }

``Timestamp``
------------------

Supplied as a JSON string using the RFC3339_ format with the precision of
milliseconds. Example:

.. code-block:: json

   "2020-12-11T11:38:37Z"

.. _RFC3339: https://tools.ietf.org/html/rfc3339

``Duration``
------------------

Supplied as a JSON string as a list of time measures separated by whitespace.
A measure is a number followed by the unit and no whitespace between is allowed.
Every measure is accumulated into the total duration. The string is allowed to
contain any number of measures with the same unit in no particular order.

The supported units are:
 - ``ms`` for milliseconds
 - ``s`` for seconds
 - ``m`` for minutes
 - ``h`` for hours
 - ``d`` for days

Example of 10 days, 2 hours and 42 seconds:

.. code-block:: json

   "10d 1h 42s 1h"

``Pair``
--------

Supplied as a JSON array with two items, depending on the
nested types. Example of ``Pair(U8, ContractAddress)``:

.. code-block:: json

   [200, { "index": 0, "subindex": 0}]

``List``
--------

Supplied as a JSON array with items, depending on the
nested type. Example of ``List(U16)``:

.. code-block:: json

   [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

``Set``
-------

Supplied as a JSON array with *unique* items, depending on the
nested type.
Example of ``List(U16)``:

.. code-block:: json

   [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

``Map``
-------

Supplied as a JSON array with key-value pairs, depending on the type of
the key and the type of value. Example of ``Map(AccountAddress, U64)``:

.. code-block:: json

   [
     ["2wkBET2rRgE8pahuaczxKbmv7ciehqsne57F9gtzf1PVdr2VP3", 0],
     ["2xBimKCq2tcciegw9NsFXgScCQAsK7vhqKQ2yJPyJ5vPsWLGi5", 15000000]
     ["2xdGJBNoe716cifxi8jYjm7JHBd5vPyd2ZgpnutwwATJ5vDsiw", 12400]
   ]

``Array``
---------

Supplied as a JSON array with the length specified in the
schema and items depending on the nested type. Example of ``Array(12, U8)``:

.. code-block:: json

   [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 9]


``Struct``
----------

Supplied as the fields directly, see below.

.. _enum:

``Enum``
--------

An enum variant is supplied as an JSON object containing a single
property, where the name of the variant as the property and the fields as the
value. More about the fields below.

Example of JSON for an enum ``Option``:

.. code-block:: rust

   enum Option {
       None,
       Some(U32)
   }

In JSON the variant ``Some(9)`` is then:

.. code-block:: json

   { "Some": [9] }

And a ``None`` variant is written as:

.. code-block:: json

   { "None": [] }


``String``
----------------

Supplied as a JSON string.

``ContractName``
----------------

Supplied as a JSON object with a ``contract`` field of type JSON string.
Example:

.. code-block:: json

   { "contract": "my_contract" }

``ReceiveName``
----------------

Supplied as a JSON object with the fields ``contract`` and ``func``, both of
type JSON string. Example:

.. code-block:: json

   { "contract": "my_contract", "func": "my_receive" }

``ULeb128``
-----------

Supplied as a JSON string containing an unsigned integer.
The number of bytes for the encoding of the integer is bound to a constraint (``u32``) in the schema.
As each byte of the encoding contains 7 bits of information, a constraint of ``n`` puts an upper bound of ``2^(n * 7) - 1`` for the unsigned integer.

Example of ``ILeb128(4)``:

.. code-block:: json

   "1234567890"

``ILeb128``
-----------

Supplied as a JSON string containing a signed integer.
The number of bytes for the encoding of the integer is bound to a constraint (``u32``) in the schema.
As each byte of the encoding contains 7 bits of information, a constraint of ``n`` puts an upper bound of ``2^(n * 7 - 1) - 1`` and a lower bound of ``-2^(n * 7 - 1)`` for the signed integer.

Example of ``ILeb128(5)``:

.. code-block:: json

   "1234567890"

or

.. code-block:: json

   "-1234567890"

``ByteList``
------------

Supplied as a JSON string containing a variable-sized list of bytes encoded in lowercase hex.
Notice each byte is encoded using two charactors in hex.

Example:

.. code-block:: json

   "1234567890abcdef"


``ByteArray``
-------------

Supplied as a JSON string containing a fixed-sized list of bytes encoded in lowercase hex.
Notice the length of the list is specified as the number of bytes, and each byte is encoded using two charactors in hex.

Example of a fixed list of 8 bytes (``ByteArray(8)``):

.. code-block:: json

   "1234567890abcdef"


JSON for schema type fields
===========================

Structs and the different variants in an enum can have fields, and such fields
can either be named or unnamed. Unnamed fields are referenced by position.

.. code-block:: rust

   enum Fields {
       Named(List (String, Type)),
       Unnamed(List Type),
       Empty,
   }

``Named``
---------

Supplied as a JSON object, with the field names as properties and corresponding
values as property values.
The ordering of the fields in JSON is rearranged according to the order in the
schema field type.

Example of named fields in the Rust struct:

.. code-block:: rust

   struct Person {
       id: u32,
       age: u8
   }

In JSON a ``Person`` with an id of 500 and age 35 is written as:

.. code-block:: json

   {
       "id": 500,
       "age": 35
   }


``Unnamed``
-----------

Supplied as a JSON array, with the fields as items corresponding to the types in
the field schema.

Example of unnamed fields in the Rust struct:

.. code-block:: rust

   struct Person(u32, u8)

In JSON a ``Person`` with an id of 500 and age 35 is written as:

.. code-block:: json

   [500, 35]

``Empty``
---------

``Empty`` is supplied as an empty JSON array.

See :ref:`enum<enum>` for an example.
