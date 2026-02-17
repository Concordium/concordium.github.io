.. _sc-costs-best-practices:

==============
Cost reduction
==============

There are several ways that you can reduce transaction costs when developing your smart contracts.

.. _sc-costs-custom-allocator:

Use a custom allocator
======================

Smart contracts sometimes need to dynamically allocate memory.
A "memory allocator" program performs this job.
Rust programs compiled with default compiler settings use the
`standard allocator <https://doc.rust-lang.org/std/alloc/struct.System.html>`_
implemented in the Rust standard library.
However, you can also specify a custom allocator.
The recommended option is ``bump_alloc`` which ships with ``concordium-std >= 10.0.0``.
To enable it, you must enable the feature ``bump_alloc``:

.. code-block:: rust

    [dependencies]
    concordium-std = {version = "10.0", features = ["bump_alloc"]}

Alternatively, if you want to test with and without ``bump_alloc`` enabled, add a ``bump_alloc`` feature to the smart contract crate as follows:

.. code-block:: rust

    [features]
    default = ["std", "bump_alloc"]
    std = ["concordium-std/std"]
    bump_alloc = ["concordium-std/bump_alloc"]

While enabling a custom allocator is optional by default, it is required if you are using the ``no-std`` feature in your smart contract, as that disables the default allocator.

The main reason for using ``bump_alloc`` instead of the default allocator,
even in ``std`` builds, is that ``bump_alloc`` has a smaller code footprint,
i.e, the resulting smart contracts are going to be smaller by about 6-10kB,
which means they are cheaper to deploy and run. ``bump_alloc`` is designed to
be simple and fast, but it does not use the memory very efficiently. For
short-lived programs, such as smart contracts, this is usually the right
tradeoff. Especially for contracts such as those dealing with tokens.
For very complex contracts it may be beneficial to run benchmarks to see
whether ``bump_alloc`` is the best option. See the Rust `allocator <https://doc.rust-lang.org/std/alloc/index.html#the-global_allocator-attribute>`_
documentation for more context and details on using custom allocators.

.. note::

   One interesting thing to know is that you need to be careful to not enable ``bump_alloc``
   when using the smart contract types in other programs (e.g. `a long-lived indexer <https://github.com/Concordium/concordium-dapp-examples/blob/main/trackAndTrace/indexer/Cargo.toml#L27>`_)

There are other allocators available, for example ``dlmalloc``, that can be used instead.

.. _sc-costs-use-state:

Use State-* types for maps, sets, and boxes
===========================================

If your contract uses and stores maps, sets, or boxes, then *strongly* consider using the alternatives prefixed with ``State`` from ``concordium-std``. For example |StateMap|_, |StateBTreeMap|_, |StateSet|_, |StateBTreeSet|_, or |StateBox|_.
The ``State`` versions efficiently utilize the underlying smart contract state for a vastly improved performance.
The underlying smart contract state is a tree of byte arrays.
With the regular |BTreeMap|_, the full map is stored in a single node in the state tree. When reading a value from the map, it is necessary to load and deserialize the whole map. And when updating a single entry in the map, the whole map is serialized and overwritten.
With the |StateMap|_, each entry is stored in a single node in the state tree, which means that if you read a single entry, then you only load and deserialzie a single entry.
Updating an entry also only affects a single node in the state tree.

With the |StateBox|_ it is possible to defer loading parts of your state until needed.
This is beneficial if certain parts of your state is only needed for a small subset of your entrypoints.
Especially if the infrequently used parts are large.

.. _StateMap: https://docs.rs/concordium-std/latest/concordium_std/struct.StateMap.html
.. |StateMap| replace:: ``StateMap``
.. _StateBTreeMap: https://docs.rs/concordium-std/latest/concordium_std/struct.StateBTreeMap.html
.. |StateBTreeMap| replace:: ``StateBTreeMap``
.. _StateSet: https://docs.rs/concordium-std/latest/concordium_std/struct.StateSet.html
.. |StateSet| replace:: ``StateSet``
.. _StateBTreeSet: https://docs.rs/concordium-std/latest/concordium_std/struct.StateBTreeSet.html
.. |StateBTreeSet| replace:: ``StateBTreeSet``
.. _StateBox: https://docs.rs/concordium-std/latest/concordium_std/struct.StateBox.html
.. |StateBox| replace:: ``StateBox``
.. _BTreeMap: https://doc.rust-lang.org/std/collections/struct.BTreeMap.html
.. |BTreeMap| replace:: ``BTreeMap``
