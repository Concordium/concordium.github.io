selector_to_html = {"a[href=\"#third-party-software-and-hardware-notices\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Third-party Software and Hardware Notices<a class=\"headerlink\" href=\"#third-party-software-and-hardware-notices\" title=\"Link to this heading\">#</a></h1><p>Required notices for open source or other separately licensed software and hardware products or components referenced by or distributed in this product are identified in the non-exhaustive list below.</p>"}
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
