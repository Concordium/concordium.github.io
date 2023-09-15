selector_to_html = {"a[href=\"../mobile-wallet-gen2/faq.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Wallet for Mobile FAQ<a class=\"headerlink\" href=\"#mw-gen2-faq\" title=\"Permalink to this headline\">#</a></h1>", "a[href=\"../browser-wallet/browser-wallet-faq.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Wallet for Web FAQ<a class=\"headerlink\" href=\"#bw-faq\" title=\"Permalink to this headline\">#</a></h1>"}
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
