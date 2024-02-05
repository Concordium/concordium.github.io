selector_to_html = {"a[href=\"#tokens-in-the-wallet\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Tokens in the wallet<a class=\"headerlink\" href=\"#tokens-in-the-wallet\" title=\"Link to this heading\">#</a></h1><p>You can add, inspect, and send tokens in the Concordium Wallet for Web and Concordium Wallet for Mobile.</p>"}
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
