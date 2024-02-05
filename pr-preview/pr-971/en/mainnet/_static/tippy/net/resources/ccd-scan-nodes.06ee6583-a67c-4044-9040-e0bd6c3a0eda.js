selector_to_html = {"a[href=\"#node-details\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Node details<a class=\"headerlink\" href=\"#node-details\" title=\"Link to this heading\">#</a></h2><p>When you click a node name on the Nodes page, the following appears:</p><p>The following information is shown in the node details:</p>", "a[href=\"ccd-scan-staking.html#home-screen-baker\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Validator details<a class=\"headerlink\" href=\"#validator-details\" title=\"Link to this heading\">#</a></h2><p>When you click a validator ID, the following appears:</p>", "a[href=\"#ccdscan-nodes-overview\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CCDScan Nodes overview<a class=\"headerlink\" href=\"#ccdscan-nodes-overview\" title=\"Link to this heading\">#</a></h1><p>Nodes shows information about the nodes on Mainnet/Testnet in alphabetical order. The list contains the following information:</p>", "a[href=\"ccd-scan-blocks.html#home-screen-block\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Block details<a class=\"headerlink\" href=\"#block-details\" title=\"Link to this heading\">#</a></h2><p>When you click a block hash, the following appears:</p>"}
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
