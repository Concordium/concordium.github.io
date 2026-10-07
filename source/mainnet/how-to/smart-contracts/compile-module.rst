.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _rust-analyzer: https://github.com/rust-analyzer/rust-analyzer

.. _compile-module:

==================
Module Compilation
==================

.. admonition:: At a glance

   This guide shows you how to compile a Concordium smart contract written in Rust into a Wasm module. You will need Rust, Cargo, the wasm32 target, and cargo-concordium installed. After following this guide, you will have a compiled `.wasm` module ready to deploy on-chain.

This guide will show you how to compile smart contract module written in Rust to
a Wasm module.

Preparation
===========

Make sure to have Rust and Cargo installed and the ``wasm32v1-none``
target, together with |cargo-concordium|_ and the Rust source code for a smart
contract module, you wish to compile.

.. seealso::

   For instructions on how to install the developer tools see
   :ref:`build-contract`.


Compiling to Wasm
=================

Running the ``cargo concordium build`` command will produce a smart contract module placed at the location
given by the ``--out`` option (otherwise the default location is in the directory ``concordium-out``).
For example, running the following command will output your smart contract module into the root folder of your project in a file called ``my_module.wasm.v1``.

.. code-block:: console

   $ cargo concordium build --out ./my_module.wasm.v1

.. note::

   It is possible to compile using Cargo_ directly without doing a full build of the smart contract. If you just want to "check" our sources, you can run:

   .. code-block:: console

      $ cargo check --target=wasm32v1-none

   Notice that building with

   .. code-block:: console

      $ cargo check --target=wasm32v1-none --release

   produces a pure Wasm module as output. But Cargo concordium will embed schema and version information that is needed in addition.

.. _cargo-concordium: https://crates.io/crates/cargo-concordium
.. |cargo-concordium| replace:: ``cargo-concordium``


.. note::

   The suffix ``v1`` refers to smart contract version 1. Version 0 smart contracts are no longer supported by the tooling.


Verifiable builds
=================

Compiling the smart contract above is fine for development. But once you want to deploy a contract on chain, it is
recommended to do a verifiable build. A verifiable build links the smart contract module with the source code it is build
from in a verifiable way. 
In order to build a verifiable smart contract, run:

.. code-block:: console

   $ cargo concordium build --verifiable --out contract.wasm.v1

This uses Cargo_ for building, but runs further optimizations on the result.

A verifiable build will cause ``cargo-concordium`` to build the sources
in a container to make the build reproducible. It will additionally produce
a ``tar`` file with packaged sources that were used for the build. 

The ``tar`` archive should be uploaded and made publicly available, and its
link should be embedded into the deployed module using the ``cargo concordium edit-build-info``
command. For example

.. code-block:: console

   $ cargo concordium edit-build-info --module module.wasm.v1 --source-link https://link.to/module.wasm.v1.tar --verify


Verifiable builds require a container runtime such as `Docker <https://www.docker.com/>`_ to be installed.

Additional information about verifiable builds can be found in Cargo concordium `README.md <https://github.com/Concordium/concordium-smart-contract-tools/blob/main/cargo-concordium/README.md#reproducible-and-verifiable-builds>`_.

To further optmize the build, you may consider using the ``bump_alloc`` allocator for your smart contract. See `concordium_std features`_.

.. _concordium_std features: https://docs.rs/concordium-std/latest/concordium_std/#features