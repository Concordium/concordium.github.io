.. _setup-tools:

=============================
Install tools for development
=============================

Before you can start developing smart contracts, you need to setup the
environment.

Rust and Cargo
==============

First, `install rustup`_, which installs both Rust_ and Cargo_ on your
machine.
Then use ``rustup`` to install the Wasm target, which is used for compilation:

.. code-block:: console

   $rustup target add wasm32-unknown-unknown

``cargo-concordium``
====================

``cargo-concordium`` is the tool for developing smart contracts for the Concordium
blockchain.
It can be used for :ref:`compiling<compile-module>` and
:ref:`testing<unit-test-contract>` smart contracts, and enables features such as
:ref:`building contract schemas<build-schema>`.

To install ``cargo-concordium`` run:

.. code-block:: console

   $cargo install --locked cargo-concordium

For a description of how to use the ``cargo-concordium`` run:

.. code-block:: console

   $cargo concordium --help

VSCode extension
----------------

The `VSCode extension <https://marketplace.visualstudio.com/items?itemName=Concordium.concordium-smart-contracts>`__ can help you develop Concordium smart contracts. The extension sets up the editor for development, installs the ``cargo-concordium`` smart contract development tool for all supported platforms, and provides commands in the editor for the essential workflows, such as building and testing smart contracts.

Concordium software
===================

The tool to deploy and interact with smart contracts is
:ref:`concordium-client<concordium-client>`. It is distributed as part of the
:ref:`Concordium software<downloads>` package.

.. note::

   To deploy smart contract modules and interact with the chain, make sure
   that you are :ref:`running a node<run-a-node>`.

.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _install rustup: https://rustup.rs/
.. _crates.io: https://crates.io/
