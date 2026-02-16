selector_to_html = {"a[href=\"../../resources/glossary.html#term-Proof-of-stake\"]": "<dt id=\"term-Proof-of-stake\">Proof-of-stake</dt><dd><p>A consensus mechanism where validators must stake (lock) CCD tokens to participate in block production. The chance of being selected to produce a block is proportional to the amount staked.</p></dd>", "a[href=\"../../resources/glossary.html#term-Delegation\"]": "<dt id=\"term-Delegation\">Delegation</dt><dd><p>The act of contributing part of one\u2019s stake to a staking pool or to passive delegation.</p></dd>"}
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
