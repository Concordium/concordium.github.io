.. include:: ../../../variables.rst
.. _setup-sft-env:

=================================
Setup the development environment
=================================

If you have done the NFT minting tutorial, you will already have most of the necessary setup, including the |bw| and necessary tools for authoring smart contracts. Otherwise, see :ref:`Set up the development environment<setup-env>`. You need the following tools:

- ``rustup``, including Wasm
- ``cargo concordium``
- ``concordium client``
- |bw|
- a Concordium node

You will use `this smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis2-multi>`_ that is provided by Concordium team.

You need to import the key export from |bw| in ``concordium client``. It will ask you to create a password for the output file.

.. code-block:: console

    concordium-client config account import <Wallet.export> --name <Your-Wallet-Name>.json

Once you have completed setup, :ref:`click here to continue to part 2 of this tutorial<build-sft-sc>`.
