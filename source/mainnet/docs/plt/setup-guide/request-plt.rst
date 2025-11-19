.. _plt-request-plt:

=====================
Request PLT issuance
=====================

This guide explains how to request the issuance of a custom Protocol-Level Token (PLT) on testnet for testing and development purposes. Please read the `CIS-7 standard <https://proposals.concordium.com/CIS/cis-7.html#cis-7-protocol-level-tokens-plts>`_ for PLTs to understand the token parameters and metadata requirements before submitting your request.

.. _plt-overview:

Overview
========

Creating a new PLT is a chain-governance operation performed by the Concordium team through a chain creation update. The process involves defining token parameters and creating metadata to create the PLT on the network.

Once created, the PLT information is stored on-chain, including any initial supply that gets minted. After creation, token-governance operations and token-holder operations can be invoked for the new token type.

.. _plt-metadata:

PLT metadata
============


To provide visual assets like token thumbnails and images, create a metadata JSON file and host it off-chain. You can read more about the **metadata URL** parameter in `this section <https://proposals.concordium.com/CIS/cis-7.html#metadata-url>`_ of the CIS-7 standard, and about the metadata format in `this chapter <https://proposals.concordium.com/CIS/cis-7.html#token-metadata-format>`_ of the standard.

An option is to upload it to IPFS or another public storage online. For a tutorial on how to use IPFS by running a node, read :ref:`this article <upload-nft>`. Alternatively, you can use a pinning solution such as https://pinata.cloud/ or any other decentralized storage systems. The URL of the metadata file will be added to the PLT definition.

.. _plt-request-process:

Request process
===============

Follow these steps to request PLT issuance:

1. **Prepare your token metadata**

   Create and host your metadata JSON file following the format above.

2. **Fill out the form below** (or use `this link <https://docs.google.com/forms/d/e/1FAIpQLScjTvpdAYeWO9VEYitaXR46Fb5flT70zi5U88dVsjLIKWAKXA/viewform?usp=dialog>`_ to fill out the PLT initialization application form)

.. raw:: html

   <iframe
     id="plt-form"
     src="https://docs.google.com/forms/d/e/1FAIpQLScjTvpdAYeWO9VEYitaXR46Fb5flT70zi5U88dVsjLIKWAKXA/viewform?embedded=true"
     width="100%"
     height="1500"
     frameborder="0"
     marginheight="0"
     marginwidth="0"
     title="PLT issuance request form">
   </iframe>

   <script>
     const iframe = document.getElementById('plt-form');
     iframe.onload = () => {
       setTimeout(() => {
         iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
       }, 1000);
     };
   </script>

3. **Submit your request**

   Click Submit to send your PLT issuance request with all the token parameters to the Concordium team.


.. _token-definition-properties:

Token definition properties
===========================

For a detailed explanation of the parameters, please read the `CIS-7: Protocol-level Tokens (PLTs) Standard <https://proposals.concordium.com/CIS/cis-7.html#common-types>`_. Your PLT will be created with the following parameters:

.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - Property
     - Description
   * - Symbol
     - Ticker symbol for unique identification on-chain
   * - Token name
     - Full name of the token (should be unique)
   * - Decimals
     - Number of decimals in token representation
   * - MetadataUrl
     - URL for token metadata with additional information
   * - Nominated Account
     - Address that can perform token-governance operations
   * - Allowlist
     - Whether token supports an allow list
   * - Denylist
     - Whether token supports a deny list
   * - Initial supply
     - Initial tokens minted to the token-governance account
   * - Burnable
     - Whether tokens can be burnt
   * - Mintable
     - Whether additional tokens can be minted

.. _what-happens-next:

What happens next
=================

* Tokens will be issued manually by the Concordium team
* The tokens will be issued directly to your nominated account address


You are now ready to start using your custom PLT for testing on testnet. Learn about the available operations in :ref:`PLT Operations <plt-operations>`.
