selector_to_html = {"a[href=\"#send-ccd\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Send CCD<a class=\"headerlink\" href=\"#send-ccd\" title=\"Link to this heading\">#</a></h1><p>This topic describes how you can send CCD from an account when only one participant is required to sign the transfer.</p>"}
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
