selector_to_html = {"a[href=\"#running-the-example\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Running the example<a class=\"headerlink\" href=\"#running-the-example\" title=\"Link to this heading\">#</a></h1><p>The front end needs the Concordium Wallet for Web for interaction. Install the extension for your browser as described <a class=\"reference internal\" href=\"../../browser-wallet/setup-browser-wallet.html#setup-browser-wallet\"><span class=\"std std-ref\">here</span></a>.</p><p>Clone this <a class=\"reference external\" href=\"https://github.com/Concordium/concordium-dapp-examples\">repository</a>.</p>", "a[href=\"../../browser-wallet/setup-browser-wallet.html#setup-browser-wallet\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Set up the Concordium Wallet for Web<a class=\"headerlink\" href=\"#set-up-the-bw\" title=\"Link to this heading\">#</a></h1><p>The Concordium Wallet for Web is a digital wallet that enables you to create and manage your Concordium\n<a class=\"reference internal\" href=\"../../resources/glossary.html#term-Identity\"><span class=\"xref std std-term\">identities</span></a> and <a class=\"reference internal\" href=\"../../resources/glossary.html#term-Account\"><span class=\"xref std std-term\">accounts</span></a> and to create transactions, such as sending CCD.</p><p>To learn more about identities and accounts, see <a class=\"reference internal\" href=\"../../concepts/id-accounts.html#reference-id-accounts\"><span class=\"std std-ref\">identities</span></a> and <a class=\"reference internal\" href=\"../../references/manage-accounts.html#managing-accounts\"><span class=\"std std-ref\">accounts</span></a>.</p>"}
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
