selector_to_html = {"a[href=\"../tutorials/nft-minting/index.html#nft-index\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Mint an NFT<a class=\"headerlink\" href=\"#mint-an-nft\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you are going to mint an NFT on Concordium blockchain. First you will learn the basics to set up your development environment. Note that in this tutorial most of the commands are for UNIX-like systems and will not work on Windows.</p><p>All development is completed using <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code> and includes the following examples:</p>", "a[href=\"../tutorials/sft-minting/index.html#sft-index\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Mint a semi-fungible token<a class=\"headerlink\" href=\"#mint-a-semi-fungible-token\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you will learn how to mint semi-fungible tokens on Concordium testnet with <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code>, the Concordium command line interface tool.  In the <a class=\"reference internal\" href=\"../tutorials/nft-minting/index.html#nft-index\"><span class=\"std std-ref\">NFT minting tutorial</span></a>, you learned many things, including how you can mint an NFT on Concordium and set up your development environment with node configurations, wallet and key exports, build, deploy, initialize, mint and transfer. The process in this tutorial will be the same as the first tutorial: first is the wallet setup and key exports, then the storage solutions and preparation of metadata, and finally the development part including minting, transferring and querying balances.</p><p>Before you start this tutorial, if you have not completed your development environment setup, see <a class=\"reference internal\" href=\"../tutorials/setup-env.html#setup-env\"><span class=\"std std-ref\">Setup the development environment</span></a>. This tutorial assumes you\u2019ve already configured your environment, have a node running, and installed your web wallet and exported its key.</p>", "a[href=\"../tutorials/nft-marketplace/index.html#nft-marketplace-index\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">NFT marketplace smart contract tutorial<a class=\"headerlink\" href=\"#nft-marketplace-smart-contract-tutorial\" title=\"Link to this heading\">#</a></h1><p>In this tutorial you will create an NFT Marketplace. The <a class=\"reference external\" href=\"https://github.com/chainorders/concordium-nft-tutorials\">contract</a> provides some functionalities, such as minting semi-fungible, and non-fungible tokens, buying and selling NFTs with fixed prices, setting commissions for your marketplace, and setting royalties for your NFTs to get some fees from secondary sales in this marketplace. Before you start, it is important to note that this is not a beginner-level tutorial; it does not cover the basics like downloads, node configurations, wallet setup and export, and so on.</p><p>This tutorial will be the first part of the Marketplace. There will be no UI interaction. You will invoke the functions with <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code>. In the end, while implementing a dApp, what you have to do is implement a client that connects your backend with the blockchain. <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code> is that client and does that. In the second part which will be released soon, you will implement this marketplace from scratch with an empty React template.</p>"}
skip_classes = ["headerlink", "sd-stretched-link"]

window.onload = function () {
    for (const [select, tip_html] of Object.entries(selector_to_html)) {
        const links = document.querySelectorAll(` ${select}`);
        for (const link of links) {
            if (skip_classes.some(c => link.classList.contains(c))) {
                continue;
            }

            tippy(link, {
                content: tip_html,
                allowHTML: true,
                arrow: true,
                placement: 'auto-start', maxWidth: 500, interactive: false,

            });
        };
    };
    console.log("tippy tips loaded!");
};
