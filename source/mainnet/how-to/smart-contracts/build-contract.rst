.. include:: ../../variables.rst
.. _build-contract:

==========================================
Set up smart contract development tools
==========================================

.. admonition:: At a glance

   This guide explains how to install the tools needed to develop, build, and deploy smart contracts on Concordium. No prior Concordium experience is needed, but you should be familiar with Rust. After following this guide, you will have Rust, cargo-concordium, and the wasm32 target installed and ready for smart contract development.

This guide covers how to install the tools needed to develop, build, and deploy
smart contracts on Concordium.

Once you are familiar with smart contracts, it is a good idea to read the :ref:`Smart contracts best practices<sc-development-best-practices>`.

Rust and Cargo
==============

First, `install rustup`_, which installs both Rust_ and Cargo_ on your
machine.

Then use ``rustup`` to install the Wasm target, which is used for compilation:

.. code-block:: console

   $ rustup target add wasm32v1-none

cargo-concordium
====================

``cargo-concordium`` is the tool for developing smart contracts for the Concordium
blockchain.
It can be used for :ref:`compiling<compile-module>` and
:ref:`testing<integration-test-contract>` smart contracts, and enables features such as
:ref:`building contract schemas<build-schema>`.

To install ``cargo-concordium`` run:

.. code-block:: console

   $ cargo install --locked cargo-concordium

For a description of how to use the ``cargo-concordium`` run:

.. code-block:: console

   $ cargo concordium --help

To use verifiable builds with cargo-concordium a container runtime such as `Docker <https://www.docker.com/>`_ is required.

Typescript smart contract client generator
==========================================

The `Typescript smart contract client generator <https://www.npmjs.com/package/@concordium/ccd-js-gen>`_ helps you generate JavaScript/TypeScript clients for smart contracts on the Concordium blockchain, providing a lower development time and better type-safety.

Concordium client
=================

The tool to deploy and interact with smart contracts is
:ref:`concordium-client<concordium-client>`. It is distributed as part of the
:ref:`Concordium software<downloads>` package.

To ease deployment and initialization, you can use the `Smart contract deploy and initialize tool <https://sctools.mainnet.concordium.software/>`__. It works with the |bw| to deploy and initialize smart contracts to Mainnet and Testnet.

.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _install rustup: https://rustup.rs/
.. _crates.io: https://crates.io/
