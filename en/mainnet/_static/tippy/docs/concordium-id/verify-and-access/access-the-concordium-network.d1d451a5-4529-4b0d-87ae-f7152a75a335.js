selector_to_html = {"a[href=\"../../resources/glossary.html#term-Verification-Audit-Anchor\"]": "<dt id=\"term-Verification-Audit-Anchor\">Verification Audit Anchor</dt><dd><p>A transaction initiated by the merchant after verifying of the presentation, and generating the verification audit record. The anchor makes the audit record tamper-evident and timestamps it.</p></dd>", "a[href=\"../../resources/glossary.html#term-Verification-Request-Anchor\"]": "<dt id=\"term-Verification-Request-Anchor\">Verification Request Anchor</dt><dd><p>A transaction initiated by the merchant immediately after generating a presentation request, but prior to sending it to the ID app. Its purpose is to allow the ID app to confirm that the presentation request is both authentic and recent.</p></dd>"}
skip_classes = ["headerlink", "sd-stretched-link"]

window.onload = function () {
    for (const [select, tip_html] of Object.entries(selector_to_html)) {
        const links = document.querySelectorAll(`article.bd-article ${select}`);
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
