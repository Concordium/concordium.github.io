selector_to_html = {"a[href=\"../resources/glossary.html#term-Credential\"]": "<dt id=\"term-Credential\">Credential</dt><dd><p>See <a class=\"reference internal\" href=\"#term-Account-credential\"><span class=\"xref std std-term\">account credential</span></a>.</p></dd>"}
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
