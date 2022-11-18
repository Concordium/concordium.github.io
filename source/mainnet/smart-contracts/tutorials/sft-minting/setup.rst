.. include:: ../../../variables.rst
.. _setup-sft-env:

=================================
Setup the development environment
=================================

You can start by cloning `this repository <https://github.com/chainorders/concordium-nft-tutorials>`_ which includes some essential binaries, docker files, and configurations that are provided by Concordium. You will use `this smart contract <https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/cis2-multi>`_ that is provided by Concordium team.

If you have done the NFT minting tutorial, you will already have most of the necessary setup, including the |bw| and necessary tools for authoring smart contracts. Otherwise, see :ref:`Set up the development environment in the Mint an NFT tutorial<setup-nft-env>`. Besides the repository above, you need the following tools:

- rustup, including wasm
- ``cargo concordium``
- Concordium Client
- |bw|
- a Concordium node

Once you have completed setup, :ref:`click here to continue to part 2 of this tutorial<upload-sft>`.
