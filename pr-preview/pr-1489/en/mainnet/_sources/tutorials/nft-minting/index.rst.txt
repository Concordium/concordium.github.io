.. _nft-index:

===========
Mint an NFT
===========

In this tutorial, you are going to mint an NFT on Concordium blockchain. First you will learn the basics to set up your development environment. Note that in this tutorial most of the commands are for UNIX-like systems and will not work on Windows (though you could use `Windows Subsystem for Linux <https://aka.ms/wsl/>`_).

All development is completed using ``concordium-client`` and includes the following examples:

- :ref:`Deploying the minting contract<deploy-nft-sc>`
- :ref:`Minting an NFT<mint-transfer>`
- :ref:`Checking token owner<nft-view-fn>`
- :ref:`Transfering the NFT and checking the new owner<transfer-nft>`

This tutorial uses a photograph stored on the `InterPlanetary File System (IPFS) <https://docs.ipfs.tech/concepts/what-is-ipfs/>`_. In order to store the photograph on IPFS, you will need to install and run a `IPFS node <https://docs.ipfs.tech/concepts/nodes/>`_ on your computer. There are other options like pinning services, but they are not in the scope of this tutorial. You will also create a metadata file that will be stored on IPFS. By doing this, you eliminate the risk of deletion of the photo on a centralized photo album and protect your asset. You will store this metadata’s URL on-chain and be able to read it.

.. Attention::

   Before starting the next steps, make sure that you have :ref:`setup the developer environment<setup-env>` with the tools needed.

.. toctree::
   :maxdepth: 1
   :caption: NFT Minting

   upload-nft
   build-smart-contract
   mint-xfer
