.. _upload-nft:

==============
Upload the NFT
==============

In this part of the tutorial, we will upload your asset and give it metadata. For this, we will use the `InterPlanetary File System (IPFS) <https://docs.ipfs.tech/concepts/what-is-ipfs/>`_.

Using InterPlanetary File System (IPFS)
=======================================

There are multiple ways of storing data in IPFS. You can do it from a user interface by running a node or you can use a pinning service. For this tutorial, you will download and run the IPFS and store the both NFT metadata and image itself. `Click here to download and install IPFS <https://docs.ipfs.tech/install/>`__.

.. image:: images/ipfs.png
    :width: 100%

After that, you need to import your NFT. Using the IPFS app click **Import** and select the image to upload.

.. image:: images/ipfs-upload.png
    :width: 100%

Now you should be able to see its CID or URL from the user interface. This is the important part because when you buy an NFT, it will be a hyperlink that refers to the exact location of your digital asset. So you basically are buying a link that points to a location, and you want to make sure that no one can change it. The Content Identifier (CID) value guarantees that by creating unique hash values. When you import something to IPFS it generates a Content Identifier (CID) hash value to represent the asset with strings. A hash value is an output of a one-way cryptic function that takes literally anything as an input like a word, text, image, movie, book, etc. but produces only a string of fixed size to refer to that asset. You can read more about this hash from `this link <https://en.wikipedia.org/wiki/InterPlanetary_File_System>`__.

.. _nft-metadata:

Assign NFT Metadata
===================

The CID of your asset is unique in the IPFS storage, and when you put that value in your metadata file, the buyer will always be able to check it using the URL and compare it to what you have and what IPFS shows.

The Concordium CIS-2 standard allows the creation of your NFT metadata in the following format, and you can find more details in the `Concordium CIS-2 token standard <https://proposals.concordium.software/CIS/cis-2.html#example-token-metadata-non-fungible>`_. For the sake of the minting process, you have to follow the same formatted .json file, but as you can see, you are also allowed to add additional attributes to the metadata file, or remove them.

.. code-block:: json

    {
        "name": "your picture name, e.g. Moon Landing",
        "description": "my picture description, e.g. Commemorating the moon landing",
        "display": {
            "url": "https://ipfs.io/ipfs....paste your url here"
        },
        "attributes": [
            {
                "name": "Event Date",
                "type": "date",
                "value": "1969-07-20"
            }
            {
                "name": "Achievement Level",
                "type": "string",
                "value": "Unprecedented"
            }
            {
                "name": "third attribute",
                "type": "string",
                "value": "7.2"
            }
        ]
    }

So far you have installed the required libraries, prepared a setup for our development environment, installed IPFS, and imported your first image to IPFS.

Continue to the :ref:`next part<build-smart-contract>` of the tutorial to build your smart contract and initialize it.
