.. _run-local-chain:

=================
Run a local chain
=================

A local chain is your own private instance of the Concordium blockchain, running entirely on your machine or local network. Unlike testnet or mainnet, you have full control over the chain's configuration, accounts, and progression — making it ideal for development workflows where you need fast iteration and complete isolation.

Why run a local chain?
======================

**Rapid development**
  - Deploy and test smart contracts instantly. Reset the chain state anytime to start fresh.

**Cost-free testing**
   - No need to acquire testnet CCD. Your local chain comes pre-funded with test accounts.

**Full environment control**
   - Configure genesis parameters, run multiple validators, test edge cases, and simulate network conditions that would be hard to replicate on shared networks.

**Protocol experimentation**
   - For contributors: test consensus changes, new features, or custom node modifications before proposing them upstream.

Choose your approach
====================

There are two approaches available, each suited to different needs:

- :ref:`Using Docker <run-local-chain-docker>` — Recommended for most developers. A pre-configured stack with node, wallet proxy, explorer, and identity provider. Setup takes around 5 minutes.

- :ref:`Building from source <run-local-chain-source>` — Compile the node from source code. Required if you need to modify the node implementation or run a custom version. Requires Haskell and Rust toolchains. Setup is more complex.


.. list-table::
   :widths: 20 40 40
   :header-rows: 1

   * -
     - Docker images
     - Building from source
   * - **Best for**
     - Most developers
     - Node contributors, custom builds
   * - **Setup time**
     - ~5 minutes
     - 30+ minutes
   * - **Includes**
     - Node, wallet proxy, explorer, identity provider, database
     - Node only
   * - **Prerequisites**
     - Docker
     - Haskell + Rust toolchains

.. toctree::
   :hidden:
   :maxdepth: 1

   run-local-chain-docker
   run-local-chain-source
