selector_to_html = {"a[href=\"../../resources/glossary.html#term-Chain-governance-operation\"]": "<dt id=\"term-Chain-governance-operation\">Chain-governance operation</dt><dd><p>An operation that can affect the entire chain, and is authorized by the chain governance keys. Chain-governance operations include updating chain parameters, protocol updates, and creating new <a class=\"reference internal\" href=\"#term-Protocol-level-token-PLT\"><span class=\"xref std std-term\">PLTs</span></a>.</p></dd>", "a[href=\"../../resources/glossary.html#term-Identity-Provider\"]": "<dt id=\"term-Identity-Provider\">Identity Provider</dt><dd><p>A person or organization that performs off-chain identification of users. Users are required to obtain an identity object from an identity provider in order to open an account on the Concordium platform.</p></dd>", "a[href=\"../../resources/glossary.html#term-Initial-supply\"]": "<dt id=\"term-Initial-supply\">Initial supply</dt><dd><p>An optional amount of tokens that can be minted to the nominated <a class=\"reference internal\" href=\"#term-Token-governance-account\"><span class=\"xref std std-term\">token-governance account</span></a> when a new <a class=\"reference internal\" href=\"#term-Protocol-level-token-PLT\"><span class=\"xref std std-term\">Protocol-Level Token (PLT)</span></a> is initially created as part of a <a class=\"reference internal\" href=\"#term-Chain-governance-operation\"><span class=\"xref std std-term\">chain-governance operation</span></a>.</p></dd>"}
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
