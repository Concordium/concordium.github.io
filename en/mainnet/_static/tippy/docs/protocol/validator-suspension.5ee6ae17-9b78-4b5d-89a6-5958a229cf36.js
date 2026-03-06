selector_to_html = {"a[href=\"../resources/glossary.html#term-Quorum-certificate\"]": "<dt id=\"term-Quorum-certificate\">Quorum certificate</dt><dd><p>Aggregated signatures of the members of the finalization committee who signed this block forms a quorum certificate. The quorum certificate is included in the next block.  Each block either contains a quorum certificate or a timeout certificate for the previous round.</p></dd>"}
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
