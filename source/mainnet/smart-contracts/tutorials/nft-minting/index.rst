.. _nft-index:

===========
Mint an NFT
===========

In this tutorial, you are going to mint an NFT on Concordium blockchain. First you learn the basics to set up your development environment. Potentially, there will be some updates in the future based on the improvements such as the expected release of the web extension wallet.

All development is completed using :ref:`Node/Web-SDK<sdks-apis>` and node-cli and includes the following examples: deploy the minting contract, mint an NFT, get details from Concordium, check token owner, transfer that NFT, check the new owner, and  attempting to send the token with the previous owner (which will fail of course).

This tutorial uses a photograph stored on the InterPlanetary File System (IPFS). In order to do that, you will need to install and run a node on your computer. There are other options like pinning services, but they are not in the scope of this tutorial. You will also create a metadata file that will be stored on IPFS. By doing this, you eliminate the risk of deletion of the photo on a centralized photo album and definitely protect your asset. You will store this metadata’s URL on-chain and be able to read it.

.. toctree::
   :maxdepth: 1
   :caption: NFT Minting

   setup-dev-env
   upload-nft
   build-smart-contract
   mint-xfer
