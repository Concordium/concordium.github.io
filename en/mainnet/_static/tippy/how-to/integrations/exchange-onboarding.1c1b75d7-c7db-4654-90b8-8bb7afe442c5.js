selector_to_html = {"a[href=\"../../technical-reference/glossary.html#term-Identity\"]": "<dt id=\"term-Identity\">Identity</dt><dd><p>Before opening an account on the Concordium platform, one\u2019s real-world identity must be verified and recorded by an <a class=\"reference internal\" href=\"#term-Identity-Provider\"><span class=\"xref std std-term\">identity provider</span></a>. A user\u2019s identity is encrypted on-chain, however their real-world identity can be disclosed in response to a valid request from a government authority.</p></dd>", "a[href=\"../../technical-reference/glossary.html#term-Allow-list\"]": "<dt id=\"term-Allow-list\">Allow list</dt><dd><p>A configurable list for a <a class=\"reference internal\" href=\"#term-Protocol-level-token-PLT\"><span class=\"xref std std-term\">Protocol-Level Token (PLT)</span></a> that, if enabled, specifies which accounts are permitted to perform token transfers. If an allow list is supported, both the sender and recipient accounts must be on the list for a token transfer to succeed. This list is administered by the nominated <a class=\"reference internal\" href=\"#term-Token-governance-account\"><span class=\"xref std std-term\">token-governance account</span></a>.</p></dd>", "a[href=\"../../technical-reference/glossary.html#term-Alias\"]": "<dt id=\"term-Alias\">Alias</dt><dd><p>A kind of sub-account structure that can be created. An account owner can create different aliases for different uses to keep track of transfers and assign them meaning. Each account has 16777216 addresses, namely a so-called canonical account address together with matching account aliases. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial 29 bytes are referred to as account aliases for the same account. Thus, accounts can be referred to by any address whose initial 29 bytes match.</p></dd>", "a[href=\"../../technical-reference/glossary.html#term-Deny-list\"]": "<dt id=\"term-Deny-list\">Deny list</dt><dd><p>A configurable list for a <a class=\"reference internal\" href=\"#term-Protocol-level-token-PLT\"><span class=\"xref std std-term\">Protocol-Level Token (PLT)</span></a> that, if enabled, specifies which accounts are not permitted to perform token transfers. If a deny list is supported, neither the sender nor the recipient account may be on the list for a token transfer to succeed. This list is administered by the nominated <a class=\"reference internal\" href=\"#term-Token-governance-account\"><span class=\"xref std std-term\">token-governance account</span></a>.</p></dd>"}
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
