.. _plt-request-plt:

=====================
Request PLT issuance
=====================

This guide explains how to request the issuance of a custom Protocol-Level Token (PLT) on DevNet for testing and development purposes.

.. warning::
   All issued tokens will be cleared with the restart of the DevNet.

.. _plt-overview:

Overview
========

Creating a new PLT is a chain-governance operation performed by the Concordium governance committee through a chain creation update. The process involves defining token parameters, creating metadata, and having the governance committee perform a signing ceremony to create the PLT on the network.

Once created, the PLT information is stored on-chain, including any initial supply that gets minted. After creation, token-governance operations and token-holder operations can be invoked for the new token type.

.. _plt-metadata:

PLT metadata
============


To provide visual assets like token thumbnails and images, you should create a metadata JSON file and host it off-chain. Ideally, this should be uploaded to IPFS or another public storage online.
For a tutorial on how to use IPFS by running a node, read :ref:`this article <upload-nft>`. Or you can use a pinning solution, i.e https://pinata.cloud/ or any other decentralized storage systems. The URL of the metadata file will be added to the PLT definition.

Metadata properties
-------------------

**Thumbnail**: URL - An image URL to a small image for displaying the asset

**Display**: URL - An image URL to a large image for displaying the asset

Example metadata file
---------------------

.. code-block:: json

   {
      "name": "PLT Name",
      "symbol": "PLT Symbol",
      "decimals": 6,
      "description": "A protocol level stablecoin issued on Concordium.",
      "thumbnail": "https://location.of/the/thumbnail.png" },
      "display": "https://location.of/the/display.png" }
   }


.. _plt-request-process:

Request process
===============

Follow these steps to request PLT issuance on DevNet:

1. **Prepare your token metadata**

   Create and host your metadata JSON file following the format above.

2. **Fill out the form below**

.. raw:: html

    <iframe data-tally-src="https://tally.so/r/mK4ZdK" loading="lazy" width="100%" height="500" frameborder="0" marginheight="0" marginwidth="0" title="PLT issuance request form"></iframe>
    <script>
      var d = document, w = "https://tally.so/widgets/embed.js", v = function () {
        "undefined" != typeof Tally && Tally.loadEmbeds();
      };
      if ("undefined" != typeof Tally) v();
      else if (d.querySelector('script[src="' + w + '"]') == null) {
        var s = d.createElement("script");
        s.src = w;
        s.onload = v;
        s.type = "text/javascript";
        d.body.appendChild(s);
      }
    </script>

3. **Submit your request**

   Click Submit to send your PLT issuance request with all the token parameters to the Concordium team.


.. _token-definition-properties:

Token definition properties
===========================

Your PLT will be created with the following parameters:

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
* You'll receive confirmation in Discord when your PLT has been issued
* The tokens will be issued directly to your nominated account address


You are now ready to start using your custom PLT for testing on DevNet. Learn about the available operations in :ref:`PLT Operations <plt-operations>`.
