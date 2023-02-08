.. _no-std:

======================
Build using ``no_std``
======================

This guide shows how to enable ``no_std`` for your rust smart contract,
potentially reducing the size of the resulting Wasm module by several kilobytes.

Preparation
===========

Compiling ``concordium-std`` without the ``std`` feature requires using the rust
nightly toolchain, which can be installed using ``rustup``:

.. code-block:: console

   $rustup toolchain install nightly

Then add the wasm32 target by using

.. code-block:: console

   $rustup +nightly target add wasm32-unknown-unknown

Setting up the module for ``no_std``
====================================

The ``concordium-std`` library exposes a ``std`` feature, which enables the use
of the rust standard library.
This feature is enabled by default.

To disable it, one must simply disable default features for the
``concordium-std`` in the dependencies of your module.
You can update your `Cargo.toml` file by using:

.. code-block:: rust

   [dependencies]
   concordium-std = { version: "=0.2", default-features = false }

.. note::

   To compile your smart contracts, a memory `allocator <https://docs.rs/concordium-std/6.0.0/concordium_std/#use-a-custom-allocator>`_ is used.
   ``concordium-std`` version ``<6.0.0`` hard-coded the use of the `wee_alloc <https://docs.rs/wee_alloc/>`_ allocator.
   In ``concordium-std`` version ``>=6.0.0``, ``wee_alloc`` is a feature and needs to be explicitly enabled.
   When ``std`` feature is enabled, the allocator provided by the Rust standard library is used
   by default but when the ``wee_alloc`` feature is enabled in addition, ``wee_alloc`` is used instead.
   When ``no_std`` is used either ``wee_alloc`` must be enabled, or another global allocator
   must be set in the smart contract. You can add the ``wee_alloc`` feature by using:

   .. code-block:: rust

      [features]
      wee_alloc = ["concordium-std/wee_alloc"]

To be able to toggle between with and without std, also add a ``std`` to your
own module, which enables the ``std`` feature of ``concordium-std``:

.. code-block:: rust

   [features]
   std = ["concordium-std/std"]

This is the setup of the smart contract examples, where ``std`` for each
smart contract module is enabled by default.

Building the module
===================

In order to use the nightly toolchain, add ``+nightly`` right after
``cargo``:

.. code-block:: console

   $cargo +nightly concordium build

If you want to disable the default features of your own smart contract module,
you can pass extra arguments for ``cargo``:

.. code-block:: console

   $cargo +nightly concordium build -- --no-default-features --features wee_alloc

.. note::

   The above command works with ``concordium-std`` version ``>=6.0.0``, because the
   ``wee_alloc`` feature needs to be explicitly enabled.
   If you use ``concordium-std`` version ``<6.0.0`` use the following instead:

   .. code-block:: console

      $cargo +nightly concordium build -- --no-default-features
