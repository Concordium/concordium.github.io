.. highlight:: toml

.. _setup-contract:

================
Set up a project
================

.. admonition:: At a glance

   This guide shows you how to create a new Concordium smart contract project, either from a template or from scratch. You will need cargo-concordium installed. After following this guide, you will have a new Rust project set up with the correct structure and dependencies for Concordium smart contract development.

This guide documents two different options (*from a template* or *from scratch*) to create a new Concordium smart contract project.
It provides you with some smart contract templates. Choose the template that best fits your project scope.
The *from scratch* option guides you through the process when you want to start a new project without any boilerplate code.

From a template (recommended)
=============================

Concordium maintains several smart contract
`templates <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/templates>`_.
For generating the smart contracts from the above templates, the ``cargo-generate`` crate is required.
``cargo-generate`` can be installed by running the following command:

.. code-block:: console

   $ cargo install --locked cargo-generate

To start a new Concordium smart contract project from a template, run the command:

.. code-block:: console

   $ cargo concordium init

Select the `default` template unless you have other preferences.


You can find additional information on the available templates in the
`README file <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/templates/README.md>`_.

From scratch
============

A smart contract in Rust is written as an ordinary Rust library crate.
The library is then compiled to Wasm using the Rust target
``wasm32v1-none`` and, since it is just a Rust library, you can use
Cargo_ for dependency management.

To set up a new smart contract project, first create a project directory. Inside
the project directory run the following in a terminal:

.. code-block:: console

   $ cargo init --lib

This will set up a default Rust library project by creating a few files and
directories.
Your directory should now contain a ``Cargo.toml`` file and a ``src``
directory and some hidden files.

To be able to build Wasm you need to tell cargo the right ``crate-type``.
This is done by adding the following in the ``Cargo.toml`` file ::

   [lib]
   crate-type = ["cdylib", "rlib"]

And you need to declare you library as ``no_std`` in ``lib.rs``:

.. code-block:: rust

   #![no_std]

**Add the smart contract standard library**

The next step is to add ``concordium-std`` as a dependency. The crate documentation is on docs.rs_.
It is a library for Rust containing procedural macros and functions for
writing small and efficient smart contracts.

To add the library, open ``Cargo.toml`` and add ``concordium-std`` in
the ``[dependencies]`` section::

   [dependencies]
   concordium-std = "11.0"



.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _rustup: https://rustup.rs/
.. _repository: https://gitlab.com/Concordium/concordium-std
.. _docs.rs: https://docs.rs/concordium-std/latest/concordium_std/

That is it! You are now ready to develop your own smart contract.
