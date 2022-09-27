.. highlight:: toml

.. _setup-contract:

===================================
Setting up a smart contract project
===================================

A smart contract in Rust is written as an ordinary Rust library crate.
The library is then compiled to Wasm using the Rust target
``wasm32-unknown-unknown`` and, since it is just a Rust library, we can use
Cargo_ for dependency management.

To set up a new smart contract project, first create a project directory. Inside
the project directory run the following in a terminal:

.. code-block:: console

   $cargo init --lib

This will set up a default Rust library project by creating a few files and
directories.
Your directory should now contain a ``Cargo.toml`` file and a ``src``
directory and some hidden files.

To be able to build Wasm we need to tell cargo the right ``crate-type``.
This is done by adding the following in the ``Cargo.toml`` file ::

   [lib]
   crate-type = ["cdylib", "rlib"]


Starting a smart contract project from a template
=================================================

Concordium maintains several smart contract templates (currently a ``default`` template and a ``cis2-nft`` template).
To start a new Concordium smart contract project from a template, run the command:

.. code-block:: console

   $cargo concordium init

This command generates a new project from the templates in the
`template folder <https://github.com/Concordium/concordium-rust-smart-contracts>`_.
The path where the project should be created can be provided with the ``--path`` option.
The ``cargo-generate`` crate is required for running the above command. ``cargo-generate`` can
be installed by running the following command:

.. code-block:: console

   $cargo install --locked cargo-generate

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
