selector_to_html = {"a[href=\"smart-contract.html#nft-mp-sc\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Build and deploy the smart contract<a class=\"headerlink\" href=\"#build-and-deploy-the-smart-contract\" title=\"Link to this heading\">#</a></h1><p>The flow will be the same as the previous tutorials. You will build the contract, deploy it, and then create an instance of it. While selling your NFTs there will be some additional steps.</p><p>Now, you have the smart contract and helpers in your project\u2019s folder. In that folder, create another one called <code class=\"docutils literal notranslate\"><span class=\"pre\">dist/marketplace-contract</span></code> for your output files. Then run the command below to build the contract and save the schema and Wasm file.</p>", "a[href=\"#nft-marketplace-smart-contract-tutorial\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">NFT marketplace smart contract tutorial<a class=\"headerlink\" href=\"#nft-marketplace-smart-contract-tutorial\" title=\"Link to this heading\">#</a></h1><p>In this tutorial you will create an NFT Marketplace. The <a class=\"reference external\" href=\"https://github.com/chainorders/concordium-nft-tutorials\">contract</a> provides some functionalities, such as minting semi-fungible, and non-fungible tokens, buying and selling NFTs with fixed prices, setting commissions for your marketplace, and setting royalties for your NFTs to get some fees from secondary sales in this marketplace. Before you start, it is important to note that this is not a beginner-level tutorial; it does not cover the basics like downloads, node configurations, wallet setup and export, and so on.</p><p>This tutorial will be the first part of the Marketplace. There will be no UI interaction. You will invoke the functions with <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code>. In the end, while implementing a dApp, what you have to do is implement a client that connects your backend with the blockchain. <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code> is that client and does that. In the second part which will be released soon, you will implement this marketplace from scratch with an empty React template.</p>", "a[href=\"../setup-env.html#setup-env\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Setup the development environment<a class=\"headerlink\" href=\"#setup-the-development-environment\" title=\"Link to this heading\">#</a></h1><p>Before starting the smart contract tutorials, you must prepare your development environment by installing a number of tools.</p>"}
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
