selector_to_html = {"a[href=\"../../resources/glossary.html#term-Node\"]": "<dt id=\"term-Node\">Node</dt><dd><p>A participant in the Concordium network. Nodes receive blocks and transactions, and track the current state of the blockchain. A validator node has cryptographic keys that enable it to take part in validation. A node without these keys is referred to as a <em>passive node</em>.</p></dd>", "a[href=\"../../resources/glossary.html#term-Account\"]": "<dt id=\"term-Account\">Account</dt><dd><p>An addressable store of funds on the blockchain. An account is associated with one or more <em>account keys</em> that can be used to authorize transactions originating from the account, as well as with an <a class=\"reference internal\" href=\"#term-Encryption-key\"><span class=\"xref std std-term\">encryption key</span></a>. An account is also associated with the account holder\u2019s <a class=\"reference internal\" href=\"#term-Identity\"><span class=\"xref std std-term\">identity</span></a>, although this association is encrypted. This identity can only be disclosed by <a class=\"reference internal\" href=\"#term-Privacy-guardian-PG\"><span class=\"xref std std-term\">privacy guardians</span></a>, in cooperation with the account\u2019s <a class=\"reference internal\" href=\"#term-Identity-Provider\"><span class=\"xref std std-term\">identity provider</span></a>.</p></dd>", "a[href=\"../../resources/glossary.html#term-Smart-contract\"]": "<dt id=\"term-Smart-contract\">Smart contract</dt><dd><p>A computer program or a transaction protocol that is intended to automatically execute, control or document events and actions according to the terms of a contract or an agreement. An example is a smart contract for selling NFTs on a marketplace; it may contain information about royalties, selling the NFT on to others, and so on.</p></dd>", "a[href=\"../../resources/glossary.html#term-On-chain\"]": "<dt id=\"term-On-chain\">On-chain</dt><dd><p>Refers to an an event or activity that is propagated through the Concordium network and recorded on the Concordium blockchain. The recording can be explicit or implicit as part of the consensus protocol. An example of the former is a transaction such as a CCD transfer, an example of the latter are the rewards given out to, e.g., validators.</p></dd>"}
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
