selector_to_html = {"a[href=\"#ccdscan-accounts-overview\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CCDScan Accounts overview<a class=\"headerlink\" href=\"#ccdscan-accounts-overview\" title=\"Link to this heading\">#</a></h1><p>The Accounts overview shows information about accounts during the selected time range in the filter.</p>", "a[href=\"ccd-scan-transactions.html#home-screen-transaction\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Transaction details<a class=\"headerlink\" href=\"#transaction-details\" title=\"Link to this heading\">#</a></h2><p>When you click a transaction hash, transaction information appears. The information is different depending upon whether the transaction was successful or rejected.</p>", "a[href=\"#sender-account-details\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Sender/Account details<a class=\"headerlink\" href=\"#sender-account-details\" title=\"Link to this heading\">#</a></h2><p>When you select a sender or account, the following appears.</p>", "a[href=\"ccd-scan-blocks.html#home-screen-block\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Block details<a class=\"headerlink\" href=\"#block-details\" title=\"Link to this heading\">#</a></h2><p>When you click a block hash, the following appears:</p>", "a[href=\"ccd-scan-staking.html#home-screen-baker\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Validator details<a class=\"headerlink\" href=\"#validator-details\" title=\"Link to this heading\">#</a></h2><p>When you click a validator ID, the following appears:</p>", "a[href=\"#accounts-view\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CCDScan Accounts overview<a class=\"headerlink\" href=\"#ccdscan-accounts-overview\" title=\"Link to this heading\">#</a></h1><p>The Accounts overview shows information about accounts during the selected time range in the filter.</p>"}
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
