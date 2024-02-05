selector_to_html = {"a[href=\"#status-pages\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Status Pages<a class=\"headerlink\" href=\"#status-pages\" title=\"Link to this heading\">#</a></h1><p>The Concordium dashboards have been removed and now redirect to <a class=\"reference external\" href=\"https://ccdscan.io/\">CCDScan</a>.</p>", "a[href=\"#id1\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Status pages<a class=\"headerlink\" href=\"#id1\" title=\"Link to this heading\">#</a></h2><p>Both Mainnet and Testnet have a status page. The status page shows incidents and planned outages. To open the status page, click the link for the <a class=\"reference external\" href=\"https://status.mainnet.concordium.software/\">Mainnet status page</a> or <a class=\"reference external\" href=\"https://status.testnet.concordium.software/\">Testnet status page</a>.</p>"}
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
