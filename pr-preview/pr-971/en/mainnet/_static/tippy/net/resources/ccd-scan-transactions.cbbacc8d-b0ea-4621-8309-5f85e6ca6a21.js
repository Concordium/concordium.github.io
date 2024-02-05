selector_to_html = {"a[href=\"ccd-scan-blocks.html#blocks-view\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CCDScan Blocks overview<a class=\"headerlink\" href=\"#ccdscan-blocks-overview\" title=\"Link to this heading\">#</a></h1><p>The Blocks overview shows information about the blocks created during the selected time range in the filter.</p>", "a[href=\"ccd-scan-accounts.html#accounts-view\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CCDScan Accounts overview<a class=\"headerlink\" href=\"#ccdscan-accounts-overview\" title=\"Link to this heading\">#</a></h1><p>The Accounts overview shows information about accounts during the selected time range in the filter.</p>", "a[href=\"#transaction-details\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Transaction details<a class=\"headerlink\" href=\"#transaction-details\" title=\"Link to this heading\">#</a></h2><p>When you click a transaction hash, transaction information appears. The information is different depending upon whether the transaction was successful or rejected.</p>", "a[href=\"#home-screen-transaction\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Transaction details<a class=\"headerlink\" href=\"#transaction-details\" title=\"Link to this heading\">#</a></h2><p>When you click a transaction hash, transaction information appears. The information is different depending upon whether the transaction was successful or rejected.</p>", "a[href=\"#ccdscan-transactions-overview\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CCDScan Transactions overview<a class=\"headerlink\" href=\"#ccdscan-transactions-overview\" title=\"Link to this heading\">#</a></h1><p>The Transactions overview shows information about the transactions during the selected time range in the filter.</p>"}
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
