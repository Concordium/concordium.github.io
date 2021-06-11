.. _setup-tools:

=============================
Install tools for development
=============================

Before we can start developing smart contracts, we need to setup the
environment.

Rust and Cargo
==============

First, `install rustup`_, which will install both Rust_ and Cargo_ on your
machine.
Then use ``rustup`` to install the Wasm target, which is used for compilation:

.. code-block:: console

   $rustup target add wasm32-unknown-unknown

Cargo Concordium
================

Cargo Concordium is the tool for developing smart contracts for the Concordium
blockchain.
It can be used for :ref:`compiling<compile-module>` and
:ref:`testing<unit-test-contract>` smart contracts, and enables features such as
:ref:`building contract schemas<build-schema>`.

.. todo::

   Add links for testing and schemas.

Cargo Concordium is distributed as part of the :ref:`Concordium software<downloads>` package.
The tool should be placed in your PATH.

For a description of how to use the Cargo Concordium run:

.. code-block:: console

   $cargo concordium --help

Concordium software
===================

The tool to deploy and interact with smart contracts is
:ref:`concordium-client<concordium_client>`. It is distributed as part of the
:ref:`Concordium software<downloads>` package.

.. note::

   To deploy smart contract modules and interact with the chain, make sure
   that you are :ref:`running a node<run-a-node>`.

.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _install rustup: https://rustup.rs/
.. _crates.io: https://crates.io/
