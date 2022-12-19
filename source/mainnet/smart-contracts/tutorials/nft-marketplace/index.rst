.. _nft-marketplace-index:

========================
NFT marketplace tutorial
========================

In this tutorial you will create an NFT Marketplace. The `contract <https://github.com/chainorders/concordium-nft-tutorials/tree/minor-fixes/marketplace-contract>` provides some functionalities, such as minting semi-fungible, and non-fungible tokens, buying and selling NFTs with fixed prices, setting commissions for your marketplace, and setting royalties for your NFTs to get some fees from secondary sales in this marketplace. Before you start, it is important to note that this is not a beginner-level tutorial; it does not cover the basics like downloads, node configurations, wallet setup and export, and so on.

This tutorial will be the first part of the Marketplace. There will be no UI interaction. You will invoke the functions with ``concordium-client``. In the end, while implementing a dApp, what you have to do is implement a client that channels your backend with the blockchain. ``concordium-client`` is basically that client and does that. In the second part, you will implement this marketplace from scratch with an empty react template.

You can download the contract from `this link <https://github.com/chainorders/concordium-nft-tutorials/tree/minor-fixes/marketplace-contract>`. Go over the functions of both the contract file lib.rs and its helpers. Basically, errors.rs contains the custom error files (check this link to see how you can implement them), the state.rs includes the state structs of the marketplace and tokens, the params.rs includes the parameter structs and cli_client.rs is the marketplace’s client in order to talk with a CIS2 token contract. In order to call another contract’s function (because the marketplace will need to invoke the transfer() function of the NFT contract to be able to transfer tokens), your marketplace smart contract needs a client.

This client is a sort of intermediary layer between those two contracts. Check the client code and see the invoke_contract_read_only() to understand how contract invocation works from another contract. It needs to implement the functions that you will invoke and requires some parameters like the address of the contract, entrypoint, etc. Basically that function connects with the child contract and deserializes the response as a read-only format and returns it.

To continue with the tutorial, click :ref:`here<nft-mp-sc>`.

.. toctree::
   :maxdepth: 1
   :hidden:

    smart-contract
