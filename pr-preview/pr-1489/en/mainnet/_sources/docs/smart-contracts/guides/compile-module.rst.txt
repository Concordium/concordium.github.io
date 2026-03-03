.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _rust-analyzer: https://github.com/rust-analyzer/rust-analyzer

.. _compile-module:

==================
Module Compilation
==================

This guide will show you how to compile smart contract module written in Rust to
a Wasm module.

Preparation
===========

Make sure to have Rust and Cargo installed and the ``wasm32-unknown-unknown``
target, together with |cargo-concordium|_ and the Rust source code for a smart
contract module, you wish to compile.

.. seealso::

   For instructions on how to install the developer tools see
   :ref:`build-contract`.

Compiling to Wasm
=================

To help building smart contract modules and to take advantage of features
such as :ref:`contract schemas <contract-schema>`, Concordium recommends using the
``cargo-concordium`` tool for building Rust_ smart contracts.

In order to build a smart contract for deployment, run:

.. code-block:: console

   $cargo concordium build --verifiable docker.io/concordium/verifiable-sc:1.70.0 --out contract.wasm.v1

This uses Cargo_ for building, but runs further optimizations on the result.

The ``--verifiable`` option  is available on ``cargo-concordium`` version 3.1 or newer. It will cause ``cargo-concordium`` to build the sources
in a fixed container to make the build reproducible. It will additionally produce
a ``tar`` file with packaged sources that were used for the build. The list of
available docker images can be found on `DockerHub. <https://hub.docker.com/r/concordium/verifiable-sc>`_

The ``tar`` archive should be uploaded and made publicly available, and its
link should be embedded into the deployed module using the ``cargo concordium edit-build-info``
command. For example

.. code-block:: console

   $cargo concordium edit-build-info --module module.wasm.v1 --source-link https://link.to/module.wasm.v1.tar --verify


The ``--out`` option is required for verifiable builds, and instructs ``cargo-concordium`` to output the build artifact at the specified location.

Verifiable builds require a container runtime such as `Docker <https://www.docker.com/>`_ to be installed.

Additional information about verifiable builds can be found on `Github <https://github.com/Concordium/concordium-smart-contract-tools/blob/main/cargo-concordium/README.md#reproducible-and-verifiable-builds>`_.

.. Note::

   If you receive an error similiar to the one below, you need to update your ``cargo-concordium`` to version 3.0 or later.

   .. code-block:: console

      Error: Could not build smart contract.

      Caused by:
         0: Could not build module schema.
         1: Could not generate module schema from Wasm module.
         2: Unsupported instruction 0xc0

If you want a smaller code footprint, enable the :ref:`wee_alloc feature <setup-wee-alloc-feature>` by using:

.. code-block:: console

   $cargo concordium build --verifiable docker.io/concordium/verifiable-sc:1.70.0 --out contract.wasm.v1 -- --features wee_alloc

.. seealso::

   For building the schema for a smart contract module, some :ref:`further
   preparation is required <build-schema>`.
   Building and embedding the schema can and should be combined with a verifiable build using the ``--verifiable`` option.

.. note::

   It is also possible to compile using Cargo_ directly by running:

   .. code-block:: console

      $cargo build --target=wasm32-unknown-unknown [--release]

   Note that even with ``--release`` set, the produced Wasm module includes
   debug information.

Non-verifiable builds
---------------------

Omitting the ``--verifiable`` option from the build command will make a build on the host machine.
This is typically not verifiable since the Rust toolchain is affected by the build environment.
However, for local development, non-verifiable builds can be useful.

By default, running the ``cargo concordium build`` command will produce a smart contract module which can be found
relative to your project root folder in ``./target/concordium/wasm32-unknown-unknown/release/my_module.wasm.v1``.
The ``--out`` option can be supplied also for non-verifiable builds.
For example, running the following command will output your smart contract module into the root folder of your project in a file called ``my_module.wasm.v1``.

.. code-block:: console

   $cargo concordium build --out ./my_module.wasm.v1

.. note::

   ``cargo-concordium`` produces several smart contract modules with different suffixes. The suffix corresponds
   to the smart contract version, i.e. ``my_module.wasm/my_module.wasm.v0`` for V0 contracts and ``my_module.wasm.v1``
   for V1 contracts. Concordium recommends using the wasm module with the ``.v1`` extension
   (the most-up-to date smart contract version).
   The file ``my_module.wasm.v1`` will be used when :ref:`deploying <deploy-module>` a smart contract on-chain.

.. _cargo-concordium: https://crates.io/crates/cargo-concordium
.. |cargo-concordium| replace:: ``cargo-concordium``
