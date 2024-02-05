selector_to_html = {"a[href=\"../references/concordium-client.html#concordium-client-import-accounts-keys\"]": "<h4 class=\"tippy-header\" style=\"margin-top: 0;\">Import accounts and keys from the Wallet apps<a class=\"headerlink\" href=\"#import-accounts-and-keys-from-the-wallet-apps\" title=\"Link to this heading\">#</a></h4><p>Import the keys of one or more accounts from a JSON file exported from the\nConcordium Legacy Wallet.</p><p>The <code class=\"docutils literal notranslate\"><span class=\"pre\">--name</span></code> option selects which account to import and imports it with this\nname. If it\u2019s omitted, all accounts in the file are imported under their\nexisting names.</p>", "a[href=\"#export-a-private-key\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Export a private key<a class=\"headerlink\" href=\"#export-a-private-key\" title=\"Link to this heading\">#</a></h1><p>In certain situations, such as testing interaction with smart contracts, you may need to export your private key for an account in your wallet. The file format of the key export is specifically for <a class=\"reference internal\" href=\"../references/concordium-client.html#concordium-client-import-accounts-keys\"><span class=\"std std-ref\">import</span></a> to <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code>. If you just copy the key to the clipboard, it\u2019s just the key itself and can be used for other purposes.</p>"}
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
