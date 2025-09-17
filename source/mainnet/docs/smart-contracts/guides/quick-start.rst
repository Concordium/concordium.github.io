.. include:: ../../../variables.rst
.. _sc-quick-start:

============================================
Concordium smart contracts quick start guide
============================================

This guide is intended to be used by experienced developers who want to get up and running quickly with a smart contract deployed on chain with which they can interact.

Before starting, it is a good idea to read the :ref:`Smart contracts best practices<sc-development-best-practices>`.

.. dropdown:: Step 1 - Set up developer environment

    Download and install the following tools in this order:

    #. `rustup`_
    #. :ref:`cargo-concordium<concordium-node-and-client-download>`
    #. :ref:`concordium-client<concordium-node-and-client-download>`

    For more detailed information, see :ref:`Install tools for development<build-contract>`.

.. dropdown:: Step 2 - Set up smart contract project

    You can choose to start a smart contract project from a `template <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/templates>`_ or from scratch.

    .. tip::

       Building a DApp as well? Have a look at the `DApp starter template <https://github.com/Concordium/concordium-dapp-starter>`__!


    **From a template**

    To generate smart contracts from the templates, the ``cargo-generate`` library is required. To install ``cargo-generate`` run the following command:

    .. code-block:: console

        $cargo install --locked cargo-generate

    To start a new Concordium smart contract project from a template, run the command:

    .. code-block:: console

        $cargo concordium init

    The path where the project should be created can be provided with the ``--path`` option.

    You can use the `concordium-std`_ library to help you build smart contracts or build without Rust's ``std``. To add the library, open ``Cargo.toml`` and add the line
    ``concordium-std = "*"`` (preferably, replace the `*` with the latest version of `concordium-std`_) in the ``[dependencies]`` section:

        [dependencies]
        concordium-std = "5.1"

    The library documentation is on `docs.rs`_.

    For information about building contracts from scratch, see :ref:`Setting up a smart contract project<setup-contract>`.

    If you're using the ``concordium-std`` library bring everything from the `concordium-std`_ library into scope by adding the line:

    .. code-block:: rust

        use concordium_std::*;

    For information about developing and editing your smart contracts, see :ref:`Developing smart contracts<writing-smart-contracts>`.

.. dropdown:: Step 3 - Set up a Concordium Wallet

    You need to set up a Concordium wallet and export the keys to import them to `concordium client`. You can only import keys from |bw| or |cryptox| into `concordium-client`, so you must choose to set up one of those wallets.

    - |bw| :ref:`setup<setup-browser-wallet>`
        - :ref:`Key export<export-key>`
    - |cryptox| :ref:`setup<setup-concordium-wallet>`
        - :ref:`Key export<export-key>`
    - :ref:`Import keys to concordium-client<concordium-client-import-accounts-keys>`

    Use the testnet faucet in your wallet to get some CCDs for testing. The testnet faucet is available once you create an account.

.. dropdown:: Step 4 - Build your smart contract

    In order to build a smart contract, run:

    .. code-block:: console

        $cargo concordium build

    This uses Cargo_ for building, but runs further optimizations on the result. Running the ``cargo concordium build`` command will produce a smart contract module which can be found relative to your project root folder in ``./target/concordium/wasm32-unknown-unknown/release/my_module.wasm.v1``. Alternatively, you can supply the location where to store the smart contract module using the ``--out`` option. For example running the following command will output your smart contract module into the root folder of your project in a file name ``my_module.wasm.v1``.

    .. code-block:: console

        $cargo concordium build --out ./my_module.wasm.v1

    .. Note::

        For building the schema for a smart contract module, some :ref:`further preparation is required <build-schema>`.

   It is also possible to compile using Cargo_ directly by running:

   .. code-block:: console

      $cargo build --target=wasm32-unknown-unknown [--release]

   Note that even with ``--release`` set, the produced Wasm module includes
   debug information.

.. dropdown:: Step 5 - Deploy your smart contract

    .. note::

        To ease deployment and initialization, you can use the `Smart contract deploy and initialize tool <https://sctools.mainnet.concordium.software/>`__ instead of the process below. It works with the |bw| to deploy and initialize smart contracts to Mainnet and Testnet.

    To deploy a smart contract module ``my_module.wasm.v1`` using the account with name account-name, run the following command:

    .. code-block:: console

       $concordium-client module deploy my_module.wasm.v1 --sender account_name

   The ``--sender`` option can be omitted if the account "default" is to be used.

   Modules built with ``cargo-concordium`` get a suffix corresponding to
   the smart contract version, i.e. ``my_module.wasm.v0`` for V0 contracts and
   ``my_module.wasm.v1`` for V1 contracts.

   When deploying a smart contract module built directly with ``cargo``, it is necessary to
   specify the smart contract version with the ``--contract-version [v0, v1]``
   option. These module files will not have the version suffix, e.g.
   ``.v0``, or ``.v1``, but just be called ``<module_name>.wasm``.

    If successful, the output should be similar to the following:

    .. code-block:: console

       Module successfully deployed with reference: 'd121f262f3d34b9737faa5ded2135cf0b994c9c32fe90d7f11fae7cd31441e86'.

    Make note of the module reference as it is used when creating smart contract instances.

    A module can be given a local alias, or *name*, which makes referencing it easier. The name is only stored locally by ``concordium-client``, and is not visible on-chain. To add a name during deployment, the ``--name`` parameter is used.

    .. code-block:: console

       $concordium-client module deploy my_module.wasm.v1 --name my_deployed_module

    If successful, the output will be similar to the following:

    .. code-block:: console

       Module successfully deployed with reference: '9eb82a01d96453dbf793acebca0ce25c617f6176bf7a564846240c9a68b15fd2' (my_deployed_module).

    For more detailed information about how to deploy a smart contract module, see :ref:`deploy-module`, and for information about how to create an instance, see :ref:`initialize-contract`.

.. dropdown:: Step 6 - Interact with your smart contract

    Since interactions with a smart contract are transactions, make sure to have ``concordium-client`` set up with an account with enough CCD to pay for the transactions. The cost of the transaction depends on the size of the parameters sent to the receive function and the complexity of the function itself.

    As an example, to update an instance with address index ``0`` using the parameterless receive function ``my_receive`` while allowing up to 10000 energy to be used, run the following command:

    .. code-block:: console

       $concordium-client contract update 0 --entrypoint my_receive --energy 10000 --sender MyAccount

    If successful, the output will be similar to the following:

    .. code-block:: console

       Successfully updated contract instance {"index":0,"subindex":0} using the entrypoint 'my_receive'.

    As you can see, the subindex defaults to ``0``.

    You can also pass parameters, either in JSON or binary format. For more information, see :ref:`Interact with a smart contract instance<interact-instance>`.

    For information on how to work with parameters in smart contracts, see :ref:`working-with-parameters`.

.. _Rust: https://www.rust-lang.org/
.. _Cargo: https://doc.rust-lang.org/cargo/
.. _rustup: https://rustup.rs/
.. _repository: https://gitlab.com/Concordium/concordium-std
.. _docs.rs: https://docs.rs/concordium-std/latest/concordium_std/
.. _`concordium-std`: https://docs.rs/crate/concordium-std/
