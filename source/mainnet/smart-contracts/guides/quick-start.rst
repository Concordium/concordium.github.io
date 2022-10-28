.. include:: ../../variables.rst
.. _sc-quick-start:

============================================
Concordium smart contracts quick start guide
============================================

This guide is intended to be used by experienced developers who want to get up and running quickly with a smart contract deployed on chain with which they can interact.

.. dropdown:: Step 1 - Set up developer environment

    Download and install the following tools in this order:

    #. `rustup`_
    #. :ref:`cargo-concordium<cargo-concordium-testnet>`
    #. :ref:`concordium-client<concordium-node-and-client-download-testnet>`
    #. :ref:`a node<concordium-node-and-client-download-testnet>` for deploying and interacting

    For more detailed information, see :ref:`Install tools for development<setup-tools>`.

.. dropdown:: Step 2 - Set up smart contract project

    You can choose to start a smart contract project from a `template <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/templates>`_ or from scratch.

    **From a template**

    To generate smart contracts from the templates, the ``cargo-generate`` crate is required. To install ``cargo-generate`` run the following command:

    .. code-block:: console

        $cargo install --locked cargo-generate

    To start a new Concordium smart contract project from a template, run the command:

    .. code-block:: console

        $cargo concordium init

    The path where the project should be created can be provided with the ``--path`` option.

    You can use the `concordium-std`_ library to help you build smart contracts or build without Rust's ``std``. To add the library, open ``Cargo.toml`` and add the line
    ``concordium-std = "*"`` (preferably, replace the `*` with the latest version of `concordium-std`_) in the ``[dependencies]`` section:

        [dependencies]
        concordium-std = "3.0"

    The crate documentation is on docs.rs_.

    For information about building contracts from scratch, see :ref:`Setting up a smart contract project<setup-contract>`.

.. dropdown:: Step 3 - Set up a Concordium Wallet

    You need to set up a Concordium wallet and export the keys to import them to `concordium client`. You can only import keys from |bw|, |mw-gen2|, or |mw-gen1| into `concordium-client`, so you must choose one of those wallets to set up.

    - :ref:`|bw| setup<setup-browser-wallet>`
        - :ref:`Key export<use-browser-wallet>`
    - :ref:`|mw-gen2| setup<setup-g2-mobile-wallet>`
        - Key export
    - :ref:`|mw-gen1| setup<setup-mobile-wallet>`
        - :ref:`Key export<export-import>
    - :ref:`Import keys to concordium-client<concordium-client-import-accounts-keys>`

    Use the testnet faucet in your wallet to get some CCDs for testing. The testnet faucet is available once you create an account.

.. dropdown:: Step 4 - Build your smart contract



.. dropdown:: Step 5 - Deploy your smart contract

.. dropdown:: Step 6 - Interact with your smart contract

.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _rustup: https://rustup.rs/
.. _repository: https://gitlab.com/Concordium/concordium-std
.. _docs.rs: https://docs.rs/crate/concordium-std/
.. _`concordium-std`: https://docs.rs/crate/concordium-std/