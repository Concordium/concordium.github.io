.. include:: ../../../variables.rst
.. _build-contract:

=======================
Build a smart contract
=======================

The contract development guides help you get started writing smart contracts. Here you have guides to help you set up your tools, test your contract, and more.

Once you are familiar with smart contracts, it is a good idea to read the :ref:`Smart contracts best practices<sc-development-best-practices>`.

.. Note::

   To request CCDs for testing, use the buttons in the Concordium Wallets when running Testnet.


Before you can start developing smart contracts, you need to :ref:`setup the development environment <setup-env>`.

You can also watch a video about installing the smart contract tools.

.. raw:: html

   <iframe src="https://www.youtube.com/embed/0UIyAlZjvLg?si=D0lguDkUjiHCKLcu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Rust and Cargo
==============

First, `install rustup`_, which installs both Rust_ and Cargo_ on your
machine.

.. Note::

   Currently, Rust toolchain versions up to ``1.81`` are and newer are not supported by older ``cargo-concordium`` versions ( <= ``4.0.0``). Update ``cargo-concordium`` if you see the error ``Unexpected byte 0x80. Expected 0x00`` as follows:

   .. code-block:: console

      $ cargo install cargo-concordium
      $ cargo concordium --version
      $ cargo-concordium 4.1.1

   The minimum supported rust version is currently version ``1.73``

Then use ``rustup`` to install the Wasm target, which is used for compilation:

.. code-block:: console

   $rustup target add wasm32-unknown-unknown

``cargo-concordium``
====================

``cargo-concordium`` is the tool for developing smart contracts for the Concordium
blockchain.
It can be used for :ref:`compiling<compile-module>` and
:ref:`testing<integration-test-contract>` smart contracts, and enables features such as
:ref:`building contract schemas<build-schema>`.

To install ``cargo-concordium`` run:

.. code-block:: console

   $cargo install --locked cargo-concordium

For a description of how to use the ``cargo-concordium`` run:

.. code-block:: console

   $cargo concordium --help

To use verifiable builds with cargo-concordium a container runtime such as `Docker <https://www.docker.com/>`_ is required.

VSCode extension
----------------

The `VSCode extension <https://marketplace.visualstudio.com/items?itemName=Concordium.concordium-smart-contracts>`__ can help you develop Concordium smart contracts. The extension sets up the editor for development, installs the ``cargo-concordium`` smart contract development tool for all supported platforms, and provides commands in the editor for the essential workflows, such as building and testing smart contracts.

You can watch a video about how to use the VSCode extension.

.. raw:: html

   <iframe src="https://www.youtube.com/embed/9qjcsGDeveg?si=zGDkjMAdP5JjRMd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Typescript smart contract client generator
------------------------------------------

The `Typescript smart contract client generator <https://www.npmjs.com/package/@concordium/ccd-js-gen>`_ helps you generate JavaScript/TypeScript clients for smart contracts on the Concordium blockchain, providing a lower development time and better type-safety.

Concordium software
===================

The tool to deploy and interact with smart contracts is
:ref:`concordium-client<concordium-client>`. It is distributed as part of the
:ref:`Concordium software<downloads>` package.

To ease deployment and initialization, you can use the `Smart contract deploy and initialize tool <https://sctools.mainnet.concordium.software/>`__. It works with the |bw| to deploy and initialize smart contracts to Mainnet and Testnet.

.. note::

   To deploy smart contract modules and interact with the chain, make sure
   that you are :ref:`running a node<run-a-node>`.

.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _install rustup: https://rustup.rs/
.. _crates.io: https://crates.io/

.. toctree::
   :maxdepth: 1
   :hidden:

   setup-contract
   compile-module
   custom-errors
   build-schema
   no-std
   fallback-entrypoints
   upgradeable-contract
   json-params
   migrate-contracts
   factory-pattern
   unit-test-contract
   integration-test-contract

