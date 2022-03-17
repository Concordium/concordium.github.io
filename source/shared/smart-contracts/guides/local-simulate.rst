.. _local-simulate:

===================================
Locally simulate contract functions
===================================

This guide is about how to locally simulate an invocation of some init or
receive function from a Wasm smart contract module in a given context and
state.
This simulation is useful for inspecting a smart contract and the outcome in
specific scenarios.

.. seealso::

   For a guide on automated unit tests, see :ref:`unit-test-contract`.

Preparation
===========

Make sure you have ``cargo-concordium`` installed, if not follow the guide
:ref:`setup-tools`.
You will also need a smart contract module in Wasm to simulate.

.. todo::

   Write the rest, when the schema stuff is in place.

Simulating instantiation
========================

To simulate the instantiation of a smart contract instance using
``cargo-concordium``, run the following command:

.. code-block:: console

   $cargo concordium run init --module contract.wasm.v1 \
                               --contract "my_contract" \
                               --context init-context.json \
                               --amount 123456.789 \
                               --parameter-bin parameter.bin \
                               --out-bin state.bin

.. note::

   If using :ref:`contract schemas<build-schema>`, it is possible to pass
   the parameter as JSON instead of binary by using the ``--parameter-json`` flag.

``init-context.json`` (used with the ``--context`` parameter) is a file that
contains context information such as the current state of the chain, the
sender of the transaction, and which account invoked this function.
It is only necessary to specify the fields that your contract function actually
uses.
``cargo-concordium`` returns an error if the function tries to access an
unspecified context field.
An example of a fully specified init context could be:

.. todo::

   TODO: senderPolicies is not optional at the moment.

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

.. seealso::

   For a reference of the context see :ref:`simulate-context`.


Simulating updates
==================

To simulate an update to a contract smart contract instance using
``cargo-concordium``, run:

.. code-block:: console

   $cargo concordium run update --module contract.wasm.v1 \
                                 --contract "my_contract" \
                                 --entrypoint "some_receive" \
                                 --context receive-context.json \
                                 --amount 123456.789 \
                                 --parameter-bin parameter.bin \
                                 --state-bin state-in.bin \
                                 --out-bin state-out.bin
.. note::

   If using :ref:`contract schemas<build-schema>`, it is possible to pass
   the parameter as JSON instead of binary by using the ``--parameter-json`` flag.

``receive-context.json`` (used with the ``--context`` parameter) is a file that
contains context information such as the current state of the chain, the
sender of the transaction, which account invoked this function, and which
account or address that sent the current message.
It is only necessary to specify the fields that your contract function actually
uses.
``cargo-concordium`` returns an error if the function tries to access an
unspecified context field.
An example of a fully specified receive context could be:

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

.. seealso::

   For a reference of the context see :ref:`simulate-context`.
