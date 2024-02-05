selector_to_html = {"a[href=\"#burn-tokens\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Burn tokens<a class=\"headerlink\" href=\"#burn-tokens\" title=\"Link to this heading\">#</a></h2><p>Finally, burn some tokens. The amount will be deducted from the owner\u2019s account when the tokens are burned.</p><p>Before burning, check the state to see who owns what amount.</p>", "a[href=\"#transfer-tokens\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Transfer tokens<a class=\"headerlink\" href=\"#transfer-tokens\" title=\"Link to this heading\">#</a></h2><p>Now you will test transferring some tokens to another account and checking the balances and the max/circulating supplies. Create a JSON file like the one below to set the transfer parameters. Transfer <strong>11</strong> tokens with the ID <strong>01</strong> to an account.</p>", "a[href=\"#mint-transfer-and-burn-fungible-tokens\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Mint, transfer, and burn fungible tokens<a class=\"headerlink\" href=\"#mint-transfer-and-burn-fungible-tokens\" title=\"Link to this heading\">#</a></h1><p>Now you are ready to mint your new tokens. Before minting, look at the minting parameters in the JSON file below. You need to specify the owner, then the token data following with its tokenID, metadata location on IPFS with the URL that you got when you uploaded the metadata file, hash value of it, amount to be minted, and maximum supply number. In this case, it uses tokenID <code class=\"docutils literal notranslate\"><span class=\"pre\">01</span></code>, and mint <code class=\"docutils literal notranslate\"><span class=\"pre\">110</span></code> tokens initially with a maximum supply of 1000.</p>"}
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
