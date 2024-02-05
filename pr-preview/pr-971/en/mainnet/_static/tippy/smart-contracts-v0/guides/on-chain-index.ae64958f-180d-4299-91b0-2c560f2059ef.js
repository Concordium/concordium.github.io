selector_to_html = {"a[href=\"#on-chain-guides\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">On-chain guides<a class=\"headerlink\" href=\"#on-chain-guides\" title=\"Link to this heading\">#</a></h1><p>There are several on-chain guides to help you with smart contract actions.</p>"}
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
