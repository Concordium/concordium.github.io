selector_to_html = {"a[href=\"../resources/glossary.html#term-Gas\"]": "<dt id=\"term-Gas\">Gas</dt><dd><p>A transaction fee paid in CCD for executing operations on the Concordium blockchain. Gas is calculated based on ENERGY (NRG) consumption, which measures computational resources required, converted to CCD using a stable EUR-pegged pricing mechanism. This ensures transaction costs remain predictable in EUR terms despite CCD price fluctuations.</p></dd>"}
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
