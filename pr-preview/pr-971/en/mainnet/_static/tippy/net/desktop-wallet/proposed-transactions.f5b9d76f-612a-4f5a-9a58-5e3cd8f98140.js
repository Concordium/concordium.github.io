selector_to_html = {"a[href=\"#view-transaction-proposals\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">View transaction proposals<a class=\"headerlink\" href=\"#view-transaction-proposals\" title=\"Link to this heading\">#</a></h1><h2>View a list of multi-signature proposals<a class=\"headerlink\" href=\"#view-a-list-of-multi-signature-proposals\" title=\"Link to this heading\">#</a></h2><p>The list of proposals gives you an overview of all the multi-signature proposals you\u2019ve created and their status. The proposals are shown in chronological order. By default, you can view the latest 50 transactions, but you have the possibility of viewing more if needed.</p>", "a[href=\"#view-a-list-of-multi-signature-proposals\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">View a list of multi-signature proposals<a class=\"headerlink\" href=\"#view-a-list-of-multi-signature-proposals\" title=\"Link to this heading\">#</a></h2><p>The list of proposals gives you an overview of all the multi-signature proposals you\u2019ve created and their status. The proposals are shown in chronological order. By default, you can view the latest 50 transactions, but you have the possibility of viewing more if needed.</p>"}
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
