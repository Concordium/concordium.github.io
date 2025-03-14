.. _RFC3339: https://tools.ietf.org/html/rfc3339


.. _simulate-context:

===================
Simulation contexts
===================

This is a reference of how the init and receive context is specified as JSON,
when simulating contract functions locally.

Init context
============

The context accessible in an init function.

Example of context

.. code-block:: json

    {
        "metadata": {
            "slotTime": "2021-01-01T00:00:01Z"
        },
        "initOrigin": "3uxeCZwa3SxbksPWHwXWxCsaPucZdzNaXsRbkztqUUYRo1MnvF",
        "senderPolicies": [{
            "identityProvider": 1,
            "createdAt": "202012",
            "validTo": "202109"
        }]
    }

``metadata``
------------

JSON Object containing the chain meta data, see :ref:`context-metadata` for a
reference of the fields.

``initOrigin``
--------------

The account address which triggered the invocation of the init function, by
instantiating the smart contract.

Example:

.. code-block:: json

   "3uxeCZwa3SxbksPWHwXWxCsaPucZdzNaXsRbkztqUUYRo1MnvF"

``senderPolicies``
------------------

JSON array of the policies of the sender, see :ref:`context-sender-policy` for a
reference a policy.

Receive context
===============

The context accessible in a receive function.

Example of context:

.. code-block:: json

    {
        "metadata": {
            "slotTime": "2021-01-01T00:00:01Z"
        },
        "invoker": "3uxeCZwa3SxbksPWHwXWxCsaPucZdzNaXsRbkztqUUYRo1MnvF",
        "selfAddress": {"index": 0, "subindex": 0},
        "selfBalance": "0",
        "sender": {
            "type": "account",
            "address": "3uxeCZwa3SxbksPWHwXWxCsaPucZdzNaXsRbkztqUUYRo1MnvF"
        },
        "senderPolicies": [{
            "identityProvider": 1,
            "createdAt": "202012",
            "validTo": "202109"
        }],
        "owner": "3uxeCZwa3SxbksPWHwXWxCsaPucZdzNaXsRbkztqUUYRo1MnvF"
    }

``metadata``
------------

JSON Object containing the chain meta data, see :ref:`context-metadata` for a
reference of the fields.

``invoker``
-----------

The account address which made the transaction triggering the invocation of the
receive function, by updating a smart contract instance.

Example:

.. code-block:: json

   "3uxeCZwa3SxbksPWHwXWxCsaPucZdzNaXsRbkztqUUYRo1MnvF"

``sender``
----------

The address of the sender of the message triggering the receive function.
Can be either a smart contract instance or an account address, given as a JSON
object.

Example of account address:

.. code-block:: json

   { "type": "account", "address": "3uxeCZwa3SxbksPWHwXWxCsaPucZdzNaXsRbkztqUUYRo1MnvF" }

Example of contract address:

.. code-block:: json

   { "type": "contract", "address": { "index": 0, "subindex": 0 } }

``senderPolicies``
------------------

JSON array of the policies of the sender, see :ref:`context-sender-policy` for a
reference a policy.

``owner``
---------

JSON string containing the account address of the owner of the smart contract
instance.

Example:

.. code-block:: json

   "3uxeCZwa3SxbksPWHwXWxCsaPucZdzNaXsRbkztqUUYRo1MnvF"

``selfAddress``
---------------

JSON object describing the contract address of the current smart contract
instance.
Must contain the ``index`` and ``subindex`` fields with JSON numbers.

Example:

.. code-block:: json

   { "index": 0, "subindex": 0 }

``selfBalance``
---------------

A JSON string with the balance of the smart contract instance in micro CCD.

Example:

.. code-block:: json

   "100"

.. _context-metadata:

Chain meta data
===============

Both the init- and receive-context contains a ``metadata`` section containing
information of the blockchain at the block the smart contract is executed in.
This block is referred to as the *current block* below.

Example:

.. code-block:: json

   {
         "slotTime": "2021-01-01T00:00:01Z"
   }


``slotTime``
------------

The slot time at the beginning of the current block as a JSON string in the
format of RFC3339_ with precision up to milliseconds.

.. _context-sender-policy:

Policy
======

Both the init- and receive-context contain a list of policies of the sender.
Such a policy is represented as a JSON Object.

Example:

.. code-block:: json

   {
       "identityProvider": 1,
       "createdAt": "202012",
       "validTo": "202109"
   }

``identityProvider``
--------------------

The id of the identity provider as a JSON number.

``createdAt``
-------------

The year and month of the date this policy was created at, given as a JSON
string in the format *YYYYMM*.

``validTo``
-------------

The year and month of the date this policy is valid to, given as a JSON string
in the format *YYYYMM*.
