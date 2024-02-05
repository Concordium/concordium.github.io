selector_to_html = {"a[href=\"../installation/downloads.html#downloads\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Downloads<a class=\"headerlink\" href=\"#downloads\" title=\"Link to this heading\">#</a></h1><p>This topic contains information about where you can download the Concordium Wallets and tools for Mainnet and Testnet.</p>", "a[href=\"#auxiliary-tools\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Auxiliary Tools<a class=\"headerlink\" href=\"#auxiliary-tools\" title=\"Link to this heading\">#</a></h1><h2>Decrypt encrypted output<a class=\"headerlink\" href=\"#decrypt-encrypted-output\" title=\"Link to this heading\">#</a></h2><p>Some Concordium tools, such as the Concordium Legacy Wallet, sometimes produce encrypted output. These files can be decrypted and inspected using the <strong>utils</strong> tool . You can download the tool from <a class=\"reference internal\" href=\"../installation/downloads.html#downloads\"><span class=\"std std-ref\">Installation downloads</span></a>.</p><p>To encrypt, enter:</p>", "a[href=\"#getting-your-private-key-from-an-account-already-imported-to-the-concordium-client\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Getting your private key from an account already imported to the <cite>concordium-client</cite><a class=\"headerlink\" href=\"#getting-your-private-key-from-an-account-already-imported-to-the-concordium-client\" title=\"Link to this heading\">#</a></h2><p>Display your keys with the following command:</p>", "a[href=\"#decrypt-encrypted-output\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Decrypt encrypted output<a class=\"headerlink\" href=\"#decrypt-encrypted-output\" title=\"Link to this heading\">#</a></h2><p>Some Concordium tools, such as the Concordium Legacy Wallet, sometimes produce encrypted output. These files can be decrypted and inspected using the <strong>utils</strong> tool . You can download the tool from <a class=\"reference internal\" href=\"../installation/downloads.html#downloads\"><span class=\"std std-ref\">Installation downloads</span></a>.</p><p>To encrypt, enter:</p>"}
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
