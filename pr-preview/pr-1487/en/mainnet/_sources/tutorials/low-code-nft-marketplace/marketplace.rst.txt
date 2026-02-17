.. include:: ../../variables.rst

.. _low-code-nft-mp:

========================
Low code NFT marketplace
========================

To make it quicker and easier to develop and run an NFT marketplace, the Low-Code NFT Minting tool and marketplace have been created. It includes built-in smart contracts, a template user interface, and various functionalities, including the following:

- Connect with |bw|

- Buy/Sell NFTs with a fixed price

- Mint NFTs with providing metadata

- Mint NFTs without metadata / with Pinata API key + IPFS Integration

- Mint NFT collections with/without metadata (Pinata API key)

- Mint Semi-Fungible tokens by specifying the token amount from a basic user interface

- Set royalties of NFTs

- Set a commission (for the marketplace owner)

.. dropdown:: Create a marketplace

    Before starting, make sure that you have the following installed:

    - |bw| - :ref:`setup instructions<setup-browser-wallet>`

    - `node.js <https://nodejs.org/en/download/>`_ verion 14.17.0 or above. If you already have node.js run ``node -v`` to check the version. You can use `nvm <https://github.com/nvm-sh/nvm>`_ to manage multiple Node versions installed on a single machine.

    - `Yarn <https://classic.yarnpkg.com/en/>`_ - a package manager for JavaScript; replaces the ``npm`` client.

    - A code editor of your choice, such as Visual Studio Code.

    Once you have the above installed, do the following:

    #. Clone the repository with the following command:

        .. code-block:: console

            git clone https://github.com/Concordium/concordium-dapp-examples/tree/main/low-code-nft-marketplace

    #. Install the repository's dependencies with the following command:

        .. code-block:: console

            cd Low-Code-NFT-Framework/market-ui && yarn install

    #. Run the application with the following command. It starts the marketplace example dApp automatically in ``localhost:3000`` starting with the example page.

        .. code-block:: console

            yarn start

    **Initialize the marketplace**

    In this step, you will create an instance of the deployed marketplace with the connected wallet address. You can specify the commission and run your own marketplace.

    .. Note::

        You can also build and deploy a new marketplace contract by following these steps.

    #. Connect to the application with your |bw|.

        .. image:: images/mp-connect-wallet.png
            :width: 100%
            :alt: marketplace web page with wallet popup

        .. Note::

            Before continue, make sure that you have some CCDs in your wallet to be able to initialize the Marketplace. Since this is testnet you can ask for testnet CCDs when you set up your account.

    #. Click **Create My Marketplace**.

        .. image:: images/mp-create-mp.png
            :width: 100%
            :alt: marketplace web page with create marketplace highlighted

    #. A form appears that allows you to create a marketplace instance with two options. First, you can either create a marketplace instance from the one which is already deployed by you. Second, you can create your marketplace contract instance from the smart contract deployed by Concordium. Specify the commission and click **Deploy New**. This calls the initialize function of the marketplace contract and that instance will be your account's.

        .. image:: images/mp-deploy-new.png
            :width: 100%
            :alt: marketplace web page with deploy new highlighted

    #. The |bw| presents a pop up and asks for your approval. To approve the traansaction click **Sign & submit**.

        .. image:: images/mp-new-mp-wallet.png
            :width: 100%
            :alt: marketplace web page with wallet popup shown

    When the transaction is finalized, you have your own, empty marketplace. You see the contract instance address in the address bar of the browser or you can check it from your |bw| as described in the following.

    .. image:: images/mp-new-mp-contract-index.png
        :width: 100%
        :alt: empty marketplace with contract address highlighted in address bar

    To check the contract instance and find the address in the |bw|:

    #. Click on an account so that you see the account details and transaction log.

        .. image:: images/mp-bw-account-details.png
            :width: 50%
            :alt: concordium wallet for web showing account details

        .. image:: images/mp-bw-transaction-details.png
            :width: 50%
            :alt: concordium wallet for web showing transaction details

        As you can see there is a contract initialization transaction in the log, and when you click it, the **Events** section tells you that you have initialized smart contract Market-NFT at address 2258,0. In your case this number will be different and you will need it in the next section.

    **Configure the application**

    The following describes the necessary steps to run your own marketplace that is generated from the deployed marketplace contract.

    Now you have to configure your code base accordingly. Go to your project's folder/market-ui and open the **Constants.ts** file in a code editor. Update the ``MARKETPLACE_CONTRACT_ADDRESS`` with your contract instance address value generated in the previous section. In this file in general you will find all constant files, such as address, schema, and module references. You can find more details about these constant variables in this section.

    .. image:: images/mp-configure-index.png
        :width: 100%
        :alt: constants.ts file open in code editor with address highlighted

    When you specify the contract instance address value, the template will be interacting with your instance, meaning it will have a clean marketplace like below to remove new instance creation from your marketplace and change the ``CREATE_NEW__MARKETPLACE`` flag to false.

    .. image:: images/mp-configure-mp-flag.png
        :width: 100%
        :alt: constants.ts file open in code editor with create new marketplace flag highlighted

    You now have your own marketplace with the commission rate you specified.

    .. image:: images/mp-home-page.png
        :width: 100%
        :alt: marketplace home page

.. dropdown:: Mint NFT

    Within your custom marketplace you can mint your NFTs. After creating your marketplace, you have an empty NFT Marketplace as shown below. In this section you will learn how to create an NFT using your own marketplace.

    Click **MINT** in the top navigation bar. You have two options in this step. First, if you already know an NFT contract instance's address and you are the owner, you can specify it in the **Find** section or click to deploy a new button to create a new instance of an already deployed NFT contract.

    .. image:: images/mp-mint-nft.png
        :width: 100%
        :alt: marketplace home page

    This opens the |bw| where you click **Sign & submit** to approve the request. After the transaction is finalized you can check your wallet to find out what your token contract instance address is. It is under the **Transaction Log** section and see the details by clicking it.

        .. image:: images/mp-bw-account-details.png
            :width: 50%
            :alt: concordium wallet for web showing account details

        .. image:: images/mp-bw-transaction-details.png
            :width: 50%
            :alt: concordium wallet for web showing transaction details

    In the image above the you can see in the **Events** section that the CIS2-Multi smart contract instance is initialized at address <2258,0>.

    When you have your NFT contract instance, the application redirects you to the storage options. With this template you have two different options while minting an NFT: mint NFTs providing metadata or mint NFTs with Pinata.

    You are going to store all digital assets on Interplanetary File System (IPFS) which is the world's leading decentralized storage solution.

.. _mint-w-metadata:

    .. dropdown:: Mint NFTs providing metadata

        While you are minting an NFT, in most of the cases you will be storing a URL value that redirects people to a JSON-formatted file. That file should contain a link to the digital asset itself, its name, and description and could potentially include lots of additional attributes to suffice Concordium Interoperability Standard 2(CIS-2). You can host these files and assets anywhere but using a decentralized solution will be our approach.

        .. Note::

            A CIS-2 token metadata example and details can be found `at this link <https://proposals.concordium.software/CIS/cis-2.html#example-token-metadata-non-fungible>`_.

        To prepare the metadata, you should have a link to your digital asset preferably from IPFS. You can check this tutorial to learn about how you can store data on IPFS with running a node.

        When you have an IPFS link to the asset create a JSON file on a text editor, fill it like below and save it.

        .. code-block:: JSON

            {
                "name": "YOUR NFT NAME",
                "description": "YOUR NFT DESCRIPTION",
                "display": {
                    "url": "https://ipfs.io/ipfs....paste your url here"
                },
                "attributes": [
                    {
                        "name": "some attribute",
                        "type": "string",
                        "value": "999"
                    }
                    {
                        "name": "another attribute",
                        "type": "string",
                        "value": "1"
                    }
                    {
                        "name": "third attribute",
                        "type": "string",
                        "value": "7.2"
                    }
                ]
            }

        Now, you need to store this page on the IPFS as well. It will generate a URL and you are going to store it on-chain.

        #. At the Connect Pinana screen click **SKIP**.  Pinata is described in the next section.

            .. image:: images/connect-pinata-skip.png
                :width: 100%
                :alt: marketplace with connect pinata screen

        #. In the **Set metadata Url** text box, provide the URL that redirects you to the JSON formatted metadata. If you also want to store the hash value of the file check **Include Hash?** but remember this storing extra data on-chain comes with an extra cost.

            .. image:: images/set-metadata-url.png
                :width: 100%
                :alt: marketplace with metadata url screen

        #. Set the tokenID and the token quantity which has to be 1 to create a unique Non-Fungible Token. Click **DONE**.

            .. image:: images/set-token-id-qty.png
                :width: 100%
                :alt: marketplace with screen to set token id and quantity

        #. You see a final screen to review before minting your token. When you click **MINT** your |bw| prompts you for your signature. Click **Sign & submit** to start the transaction. Once it's finalized you will see another pop-up that says **All Minted**.

            .. image:: images/mint-w-metadata.png
                :width: 100%
                :alt: marketplace with token ready to mint

    .. dropdown:: Mint NFTs with Pinata

        Pinata is a commercial pinning solution that pins your data stored on Interplanetary File System (IPFS). You can find more information about it in this link. Concordium NFT Marketplace Template has built-in integration with Pinata and IPFS that allows artists to mint their collection with a few steps.

        When you upload data on IPFS the most important thing that you need to be careful about it is making sure that data is stored/hosted on at least one device and this can be achievable by running a node all the time somewhere. But that may not be an option for everybody who wants to mint NFTs for various reasons like cost, time, and some technical skills. At that moment, Pinata comes in to solve that issue. They run a node on behalf of you and give you an API key. You can access your IPFS node via that API key through their gateway.

        Since IPFS and Pinata are widely used in the space, Concordium NFT Marketplace Template has built-in integration with them. To use this functionality create an API key on the platform and copy the JWT (JSON Web Token) to use in the marketplace while minting.

        .. image:: images/pinata.png
            :width: 100%
            :alt: pinata key screen

        Now paste the API key in the textbox as shown below.

        .. image:: images/connect-pinata.png
            :width: 100%
            :alt: marketplace web page with connect to pinata screen shown

        Click **CONNECT**. When the connection is established, you will be able to upload images either by selecting them from a folder or just dragging and dropping them. You are not limited to uploading 1-2 images, and thanks to the template, the metadata generator is easier than creating one for every item.

        .. image:: images/upload-images.png
            :width: 100%
            :alt: marketplace web page with upload screen shown

        Set your token IDs and click **Upload** for each.

        .. image:: images/upload-set-token-id.png
            :width: 100%
            :alt: marketplace web page with selected images to set token id

        The template's backend will use your API key to upload the data, and retrieves the IPFS link of it and then you will just complete the details about your tokens as described below.

        .. image:: images/edit-metadata-create.png
            :width: 100%
            :alt: editing metadata and create option for each image

        Fill out them and the marketplace will create metadata for you when you click **CREATE** for each of the tokens. Specify the quantity as **1** and click **DONE**.

        .. image:: images/fetch-pinata-metadata.png
            :width: 100%
            :alt: marketplace web page with images and metadata

        Click **MINT**. Your |bw| prompts you to click **Sign and Submit** to approve the transaction and mint your NFTs.

        .. image:: images/mint-w-wallet-popup.png
            :width: 100%
            :alt: mint option shown in background dimmed with wallet popup visible

.. dropdown:: Mint Semi-fungible tokens

    The process to mint semi-fungible tokens is more or less the same as regular minting; you are expected to provide metadata for your token. Follow the exact instructions with minting, such as clicking the "MINT" button on the top navigation bar.

    .. Note::

           Remember CIS-2 covers all tokens with one standard.

    The app asks you either to create your own NFT contract instance or provide the contract instance address that you own. Specify your contract address, such as 2319,0.

    .. image:: images/mint-sft-sc.png
        :width: 100%
        :alt: contract lookup screen in marketplace

    .. Note::

        As an example, the metadata providing option is selected. You can mint your tokens with Pinata or any other URL that contains metadata that has CIS-2 standard configuration.

    Click **Find**. When prompted to ontinue with Pinata or metadata option, click **SKIP** and then click **ADD USING METADATA URL**. Paste your metadata JSON file URL in the text box and specify a token ID for your token. Specify the **QUANTITY** of your token which is the amount of this semi-fungible token you will be minting.

    .. image:: images/prepare-sft-metadata-qty.png
        :width: 100%
        :alt: enter quantity to mint screen

    Click **Metadata URL** in the preview tocheck the created metadata. Click **DONE**.

    .. image:: images/add-sft-metadata-url.png
        :width: 100%
        :alt: add metadata url to sft screen

    Click **MINT**. Your |bw| prompts you for your signature. Click **Sign & submit** to start the transaction. You can control the information you've provided until this step such as tokenID, owner account, quantity, and URL before minting them.

    .. image:: images/mint-sft-wallet-conf.png
        :width: 100%
        :alt: sft minting in marketplace in background with wallet confirmation popup visible

    When the transaction is finalized a pop-up notifies you that minting is done.

.. dropdown:: Buy NFT

    #. Navigate to the **BUY** page and you will see the listed NFTs for sale.

        .. image:: images/mp-buy-nft.png
            :width: 100%
            :alt: marketplace with buy page open

    #. Click the shopping basket on the NFT you wish to buy. If you are the owner of this asset, instead of a basket you will see a checkmark. It will show you how many available amounts are on sale in this marketplace. Since this is a semi-fungible token you can see below that there are 999 available items with a cost of 10000 CCDs. Specify the amount that you'd like to buy and click **BUY**.

        .. image:: images/mp-buy-nft-quantity.png
            :width: 100%
            :alt: marketplace with buy page open and specify quantity popup visible

    #. In the |bw| pop-up it shows the amount of CCDs required to pay. Click **Sign & submit** to approve the transaction.

        .. image:: images/mp-buy-nft-wallet.png
            :width: 100%
            :alt: marketplace with buy page open and concordium wallet for web popup shown

    When the transfer is completed a pop-up appears to inform you that the process is complete.

.. dropdown:: Sell NFT

    With Concordium Low-Code NFT Marketplace you are able to sell your tokens with fixed prices in terms of CCDs! As an owner of a digital asset, you should specify the amount of CCDs that you'd like to sell and the buyer will have to pay that amount + fees. If the commission was set as greater than 0 percent by the marketplace owner then the seller also has to pay a commission.

    #. Click **SELL** on the top navigation bar.

    #. Specify the token contract instance address. The token smart contract will have all the tokens minted with their owners and other relevant data. After you specify the token contract instance address click **FIND**.

        .. image:: images/mp-sell-nft.png
            :width: 100%
            :alt: marketplace with sell page open and fields to enter contract instance address

    #. When the |bw| pop-up prompts you, click **Sign & submit**. It will check if there is an asset on that particular contract, and then you will give permission to the marketplace contract to act on your behalf when someone wants to buy your asset. The tokens will still be owned by your account.

        .. image:: images/mp-sell-nft-wallet.png
            :width: 100%
            :alt: marketplace with sell page open and wallet popup shown

    #. Enter the token ID to verify that you have some amount of that asset. Click **OK**.

        .. image:: images/mp-sell-nft-verify.png
            :width: 100%
            :alt: marketplace with sell page open and verification dialog shown

    #. If you have a balance then the **Add Token** window appears. In this screen, you can specify the CCD amount, royalty percentage (creator commission from all secondary sales on this marketplace), and how many of your assets will be put on sale. For example, if you have minted 10000 Semi-Fungible tokens with this ID you might only have 999 be available to sell. Click **ADD**.

        .. image:: images/mp-sell-nft-details.png
            :width: 100%
            :alt: marketplace with sell page open and token details for the sale

    #. In the |bw| pop-up click **Sign & submit** to allow the marketplace to sell your assets on your behalf.

        .. image:: images/mp-sell-nft-wallet-confirm.png
            :width: 100%
            :alt: marketplace with sell page open and concordium wallet for web confirmation popup

    Once finalized, if everything is configured correctly, then you see the digital asset listed in the **Buy** section.

    .. image:: images/mp-sell-nft-success.png
        :width: 100%
        :alt: marketplace with buy page open and nft shown
