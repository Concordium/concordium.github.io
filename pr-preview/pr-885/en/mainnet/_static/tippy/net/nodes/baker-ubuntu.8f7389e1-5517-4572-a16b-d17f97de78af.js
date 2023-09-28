selector_to_html = {"a[href=\"../resources/glossary.html#term-Epoch\"]": "<dt id=\"term-Epoch\">Epoch</dt><dd><p>A time period that is approximately one hour on testnet and mainnet. At the start of each epoch, a <a class=\"reference internal\" href=\"#term-Leader-Election\"><span class=\"xref std std-term\">leadership election nonce</span></a> is computed based on the block nonces of the previous epoch. The leadership election nonce is valid for the duration of the epoch. Each epoch has a nominal ending, and when a block is finalized after this nominal ending then epoch transition occurs.</p></dd>"}
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
