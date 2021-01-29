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
This is done by adding the following in the file ``Cargo.toml``::

   [lib]
   crate-type = ["cdylib", "rlib"]

Adding the smart contract standard library
==========================================

The next step is to add ``concordium-std`` as a dependency.
It is a library for Rust containing procedural macros and functions for
writing small and efficient smart contracts.

The library is added by opening ``Cargo.toml`` and adding the line
``concordium-std = "*"`` (preferably, replace the `*` with the latest version of `concordium-std`_) in
the ``[dependencies]`` section::

   [dependencies]
   concordium-std = "0.4"

The crate documentation can be found on docs.rs_.

.. note::

   If you wish to use a modified version of this crate, you will have to clone
   the repository with ``concordium-std`` and have the dependency point at the
   directory instead, by adding the following to ``Cargo.toml``::

      [dependencies]
      concordium-std = { path = "./path/to/concordium-std" }

.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _rustup: https://rustup.rs/
.. _repository: https://gitlab.com/Concordium/concordium-std
.. _docs.rs: https://docs.rs/crate/concordium-std/
.. _`concordium-std`: https://docs.rs/crate/concordium-std/

That is it! You are now ready to develop your own smart contract.
