selector_to_html = {"a[href=\"../../net/resources/glossary.html#term-Smart-contract\"]": "<dt id=\"term-Smart-contract\">Smart contract</dt><dd><p>A computer program or a transaction protocol that is intended to automatically execute, control or document events and actions according to the terms of a contract or an agreement. An example is a smart contract for selling NFTs on a marketplace; it may contain information about royalties, selling the NFT on to others, and so on.</p></dd>"}
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
