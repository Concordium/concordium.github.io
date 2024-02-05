selector_to_html = {"a[href=\"marketplace.html#low-code-nft-mp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Low code NFT marketplace<a class=\"headerlink\" href=\"#low-code-nft-marketplace\" title=\"Link to this heading\">#</a></h1><p>To make it quicker and easier to develop and run an NFT marketplace, the Low-Code NFT Minting tool and marketplace have been created. It includes built-in smart contracts, a template user interface, and various functionalities, including the following:</p>", "a[href=\"minting-tool.html#minting-tool\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Low-code NFT minting tool<a class=\"headerlink\" href=\"#low-code-nft-minting-tool\" title=\"Link to this heading\">#</a></h1><p>For non-developers, Concordium has developed a minting tool to mint your NFT collections without minimal development effort. With this super simple dApp you will be able to:</p>", "a[href=\"#concordium-low-code-nft-framework\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium low-code NFT framework<a class=\"headerlink\" href=\"#concordium-low-code-nft-framework\" title=\"Link to this heading\">#</a></h1><p>Concordium provides developer tools to its community for developing high-level dApps. In order to help our community, Concordium has implemented this Low-Code Minting Tool and Marketplace to lower the bar for getting started on Concordium.</p><p>Concordium has collected feedback and done lots of market research and product experiments to understand the real pains when developing on Concordium. One outcome of those findings is the low-code NFT framework. The Low-Code NFT Minting tool provides a public resource to follow as an example and a white labeling solution for NFT project owners.</p>"}
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
