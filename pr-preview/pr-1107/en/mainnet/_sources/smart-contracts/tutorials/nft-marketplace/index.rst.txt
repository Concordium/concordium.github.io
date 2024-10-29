.. _nft-marketplace-index:

=======================================
NFT marketplace smart contract tutorial
=======================================

In this tutorial you will create an NFT Marketplace. The `contract <https://github.com/chainorders/concordium-nft-tutorials>`_ provides some functionalities, such as minting semi-fungible, and non-fungible tokens, buying and selling NFTs with fixed prices, setting commissions for your marketplace, and setting royalties for your NFTs to get some fees from secondary sales in this marketplace. Before you start, it is important to note that this is not a beginner-level tutorial; it does not cover the basics like downloads, node configurations, wallet setup and export, and so on.

This tutorial will be the first part of the Marketplace. There will be no UI interaction, so you will have to invoke the functions with ``concordium-client``. In the end, while implementing a dApp, what you have to do is implement a client that connects your backend with the blockchain. ``concordium-client`` is that client and does that.

You can download the contract from `this link <https://github.com/chainorders/concordium-nft-tutorials>`_. The contract is in the ``cis2-market`` folder. Be sure to examine the functions of both the contract file ``lib.rs`` and its helpers. The ``errors.rs`` file contains the custom errors. The ``state.rs`` file includes the state structs of the marketplace and tokens. The ``params.rs`` file includes the parameter structs. Finally, the ``cis2_client.rs`` file contains the marketplace’s client in order to talk with a CIS-2 token contract. In order to call another contract’s function (because the marketplace will need to invoke the transfer() function of the NFT contract to be able to transfer tokens), your marketplace smart contract needs a client.

This client is a sort of intermediary layer between those two contracts. It allows the parent contract to abstract away the logic of calling the child contract for the methods. Check the client code and see the ``invoke_contract_read_only()`` to understand how contract invocation works from another contract. It needs to implement the functions that you will invoke and requires some parameters, such as the address of the contract, entrypoint, and so on. Basically, the parent has to implement the child's function and provide all necessary inputs. That function connects with the child contract, gets the response, and conveys it to the master contract after deserializing it.

.. Attention::

   Before starting the next steps, make sure that you have :ref:`setup the developer environment<setup-env>` with the tools needed.

To continue with the tutorial, click :ref:`here<nft-mp-sc>`.

.. toctree::
   :maxdepth: 1
   :hidden:

   smart-contract
