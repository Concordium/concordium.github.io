selector_to_html = {"a[href=\"#walletconnect\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">WalletConnect<a class=\"headerlink\" href=\"#walletconnect\" title=\"Link to this heading\">#</a></h1><p>The Concordium Wallet for Mobile are in the process of being updated to support signing byte messages with the <code class=\"docutils literal notranslate\"><span class=\"pre\">signMessage</span></code> request.\nThis tutorial page will be available when the relevant version of Concordium Wallet for Mobile is released.</p>"}
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
