selector_to_html = {"a[href=\"#create-a-transaction-report\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Create a transaction report<a class=\"headerlink\" href=\"#create-a-transaction-report\" title=\"Link to this heading\">#</a></h1><p>A transaction report can be useful when you need to know transaction details, such as for tax reporting purposes.</p>", "a[href=\"../resources/ccd-scan-accounts.html#home-screen-sender\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Sender/Account details<a class=\"headerlink\" href=\"#sender-account-details\" title=\"Link to this heading\">#</a></h2><p>When you select a sender or account, the following appears.</p>"}
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
