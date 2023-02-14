.. _sc-costs-best-practices:

=============================
Cost reduction best practices
=============================

There are several ways that you can reduce transaction costs when developing your smart contracts.

Use an allocator
================

To compile your smart contracts, a memory `allocator <https://docs.rs/concordium-std/6.0.0/concordium_std/#use-a-custom-allocator>`_ is used. ``concordium-std`` version ``<6.0.0`` hard-coded the use of the `wee_alloc <https://docs.rs/wee_alloc/>`_ allocator. In ``concordium-std`` version ``>=6.0.0``, ``wee_alloc`` is a feature and needs to be explicitly enabled. When ``std`` feature is enabled the allocator provided by the Rust standard library is used by default but when the ``wee_alloc`` feature is enabled in addition, ``wee_alloc`` is used instead.

You can enable the ``wee_alloc`` feature in ``concordium-std`` version ``>=6.0.0`` by using:

.. code-block:: rust

    [dependencies]
    concordium-std = {version = "6.0", features = ["wee_alloc"]}

Alternatively, if you want to test with and without ``wee_alloc`` enabled, add a ``wee_alloc`` feature to the smart contract crate as follows:

.. code-block:: rust

    [features]
    default = ["std", "wee_alloc"]
    std = ["concordium-std/std"]
    wee_alloc = ["concordium-std/wee_alloc"]

The main reason for using ``wee_alloc`` instead of the default allocator is that ``wee_alloc`` has a smaller code footprint, i.e, the resulting smart contracts modules are going to be smaller. Smaller modules will be cheaper to deploy and run. Concordium nodes will load the smart contract module code into memory when executing a smart contract function on-chain. Hence, the smart contract module size has an impact on the execution cost.

There are other allocators available, for example ``dlmalloc``, that can be used instead.
