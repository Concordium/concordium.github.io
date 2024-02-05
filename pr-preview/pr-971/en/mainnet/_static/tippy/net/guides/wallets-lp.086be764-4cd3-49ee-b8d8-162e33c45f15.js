selector_to_html = {"a[href=\"#concordium-wallets\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium wallets<a class=\"headerlink\" href=\"#concordium-wallets\" title=\"Link to this heading\">#</a></h1><p>Concordium offers its wallets for several different platforms, enabling you to manage CCDs, develop dApps, and more in the way that suits you best.</p>"}
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
