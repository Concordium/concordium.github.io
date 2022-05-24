.. _setup-tools-v0:

=============================
Install tools for development
=============================

Before you can start developing smart contracts, you need to setup the
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
It can be used for :ref:`compiling<compile-module-v0>` and
:ref:`testing<unit-test-contract-v0>` smart contracts, and enables features such as
:ref:`building contract schemas<build-schema-v0>`.

.. todo::

   Add links for testing and schemas.

Cargo Concordium is distributed as part of the :ref:`Concordium software<downloads>` package. Rename the downloaded file to ``cargo-concordium`` for MacOS/Linux, and ``cargo-concordium.exe`` for Windows.

The tool should be placed in your PATH. This can be achieved by either:

* Moving the executable to a folder that is already on your PATH, for example ``%HOMEPATH%\.cargo\bin\`` for Windows, and ``$HOME/.cargo/bin`` for MacOS/Linux.
* Or, by adding its current location to your PATH environment.

If you are running MacOS, you need to make the tool executable by running ``chmod +x path/to/cargo-concordium`` in a terminal. Make sure to provide the correct path to the downloaded tool. You also need to grant it permission to run in your  `Security & Privacy settings <https://support.apple.com/en-gb/guide/mac-help/mh40616/mac>`_ .

Once cargo-concordium.exe is on your path, you can invoke it with ``cargo concordium`` in the terminal.

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
