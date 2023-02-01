.. highlight:: toml

.. _setup-contract:

===================================
Setting up a smart contract project
===================================

This guide documents two different options (*from a template* or *from scratch*) to create a new Concordium smart contract project.
The *from a template* option is available for ``cargo-concordium`` version 2.2.0 or greater. It provides you with some
smart contract templates. Choose the template that best fits your project scope.
The *from scratch* option guides you through the process when you want to start a new project without any boilerplate code.

.. note::

   Concordium recommends that newcomers choose the *from a template* option.

From a template
===============

Concordium maintains several smart contract
`templates <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/templates>`_ (currently a ``default`` template and a ``cis2-nft`` template).
For generating the smart contracts from the above templates, the ``cargo-generate`` crate is required.
``cargo-generate`` can be installed by running the following command:

.. code-block:: console

   $cargo install --locked cargo-generate

To start a new Concordium smart contract project from a template, run the command:

.. code-block:: console

   $cargo concordium init

The path where the project should be created can be provided with the ``--path`` option.

You can find additional information on the available templates in the
`README file <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/templates/README.md>`_.

From scratch
============

A smart contract in Rust is written as an ordinary Rust library crate.
The library is then compiled to Wasm using the Rust target
``wasm32-unknown-unknown`` and, since it is just a Rust library, you can use
Cargo_ for dependency management.

To set up a new smart contract project, first create a project directory. Inside
the project directory run the following in a terminal:

.. code-block:: console

   $cargo init --lib

This will set up a default Rust library project by creating a few files and
directories.
Your directory should now contain a ``Cargo.toml`` file and a ``src``
directory and some hidden files.

To be able to build Wasm you need to tell cargo the right ``crate-type``.
This is done by adding the following in the ``Cargo.toml`` file ::

   [lib]
   crate-type = ["cdylib", "rlib"]

Adding the smart contract standard library
==========================================

The next step is to add ``concordium-std`` as a dependency.
It is a library for Rust containing procedural macros and functions for
writing small and efficient smart contracts.

To add the library, open ``Cargo.toml`` and add the line
``concordium-std = "*"`` (preferably, replace the `*` with the latest version of `concordium-std`_) in
the ``[dependencies]`` section::

   [dependencies]
   concordium-std = "3.0"

The crate documentation is on docs.rs_.

.. note::

   If you wish to use a modified version of this crate, you will have to clone
   the repository with ``concordium-std`` and have the dependency point at the
   directory instead, by adding the following to ``Cargo.toml``::

      [dependencies]
      concordium-std = { path = "./path/to/concordium-std" }

.. seealso::

   It is possible to build smart contracts without using Rust's ``std``.
   For more information, see :ref:`no-std`.

.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _rustup: https://rustup.rs/
.. _repository: https://gitlab.com/Concordium/concordium-std
.. _docs.rs: https://docs.rs/crate/concordium-std/
.. _`concordium-std`: https://docs.rs/crate/concordium-std/

That is it! You are now ready to develop your own smart contract.
