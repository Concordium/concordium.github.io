.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _rust-analyzer: https://github.com/rust-analyzer/rust-analyzer

.. _compile-module:

====================================
Compile a Rust smart contract module
====================================

This guide will show you how to compile smart contract module written in Rust to
a Wasm module.

Preparation
===========

Make sure to have Rust and Cargo installed and the ``wasm32-unknown-unknown``
target, together with ``cargo-concordium`` and the Rust source code for a smart
contract module, you wish to compile.

.. seealso::

   For instructions on how to install the developer tools see
   :ref:`setup-tools`.

Compiling to Wasm
=================

To help building smart contract modules and to take advantage of features
such as :ref:`contract schemas <contract-schema>`, we recommend using the
``cargo-concordium`` tool for building Rust_ smart contracts.

In order to build a smart contract, run:

.. code-block:: console

   $cargo concordium build

This uses Cargo_ for building, but runs further optimizations on the result.

.. seealso::

   For building the schema for a smart contract module, some :ref:`further
   preparation is required <build-schema>`.

.. note::

   It is also possible to compile using Cargo_ directly by running:

   .. code-block:: console

      $cargo build --target=wasm32-unknown-unknown [--release]

   Note that even with ``--release`` set, the produced Wasm module includes
   debug information.

Running the ``cargo concordium build`` command will produce a smart contract module which can be found
relative to your project root folder in ``./target/concordium/wasm32-unknown-unknown/release/my_module.wasm.v1``.
Alternatively, you can supply the location where to store the smart contract module using
the ``--out`` option. For example running the following command will output your smart contract module
into the root folder of your project in a file name ``my_module.wasm.v1``.

.. code-block:: console

   $cargo concordium build --out ./my_module.wasm.v1

.. note::

   ``cargo-concordium`` produces several smart contract modules with different suffixes. The suffix corresponds
   to the smart contract version, i.e. ``my_module.wasm/my_module.wasm.v0`` for V0 contracts and ``my_module.wasm.v1``
   for V1 contracts. We recommend using the wasm module with the ``.v1`` extension
   (the most-up-to date smart contract version).
   The file ``my_module.wasm.v1`` will be used when :ref:`deploying <deploy-module>` a smart contract on-chain.
