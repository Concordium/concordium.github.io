selector_to_html = {"a[href=\"#mint-fungible-tokens\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Mint fungible tokens<a class=\"headerlink\" href=\"#mint-fungible-tokens\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you are going to mint and burn fungible tokens on the Concordium blockchain, send them to multiple accounts, and test the balances. Before starting, you need to understand the <a class=\"reference external\" href=\"https://proposals.concordium.software/CIS/cis-2.html\">CIS-2</a> standard.</p>", "a[href=\"../setup-env.html#setup-env\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Setup the development environment<a class=\"headerlink\" href=\"#setup-the-development-environment\" title=\"Link to this heading\">#</a></h1><p>Before starting the smart contract tutorials, you must prepare your development environment by installing a number of tools.</p>", "a[href=\"#concordium-interoperability-standard-cis-2\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Interoperability Standard (CIS-2)<a class=\"headerlink\" href=\"#concordium-interoperability-standard-cis-2\" title=\"Link to this heading\">#</a></h2><p>Unlike some other Layer-1 token standards, <a class=\"reference external\" href=\"https://proposals.concordium.software/CIS/cis-2.html\">CIS-2</a> represents more than one type of token with one standard including fungible tokens, non-fungible tokens, semi-fungible tokens, and soulbound tokens. You can read more information about the <a class=\"reference external\" href=\"https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/concordium-cis2/src/lib.rs\">implementation of the CIS-2 standard library at this link</a>.</p><p>A standard interface for both fungible and non-fungible tokens is implemented in a smart contract. The interface provides functions for transferring token ownership; allowing other addresses to transfer tokens; and querying token balances, operators and token metadata. It allows off-chain applications to track token balances and the location of token metadata using logged events.</p>"}
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
