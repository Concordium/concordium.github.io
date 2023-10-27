selector_to_html = {"a[href=\"../resources/glossary.html#term-Finalization\"]": "<dt id=\"term-Finalization\">Finalization</dt><dd><p>The process by which a block is marked to be \u201cfinalized\u201d, i.e. part of the authoritative <a class=\"reference internal\" href=\"#term-Chain\"><span class=\"xref std std-term\">chain</span></a>. Transactions that are part of finalized blocks are considered authoritative. New blocks can be only added following the last finalized block. The finalization process is conducted by the bakers with a staked amount of at least 0.1% of the <a class=\"reference internal\" href=\"#term-Total-effective-stake\"><span class=\"xref std std-term\">total effective stake</span></a> in baker pools, known as the Finalization committee. Total effective stake in baker pools does not include passive delegation and any amount that exceeds the <a class=\"reference internal\" href=\"../concepts/concepts-delegation.html#delegation-caps\"><span class=\"std std-ref\">baker pool bounding caps</span></a>. Finalization has to happen for each round otherwise the blockchain cannot proceed to the next round.</p></dd>"}
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
