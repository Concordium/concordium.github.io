selector_to_html = {"a[href=\"#account-activities\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Account activities<a class=\"headerlink\" href=\"#account-activities\" title=\"Link to this heading\">#</a></h1><p>If you need to know how to send CCDs, connect dApps, manage fungible and non-fungible tokens, or more, all the information you need is right here.</p>"}
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
