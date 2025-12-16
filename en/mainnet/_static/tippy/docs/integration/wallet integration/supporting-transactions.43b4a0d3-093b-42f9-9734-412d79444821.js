selector_to_html = {"a[href=\"../../resources/glossary.html#term-Identity-Object\"]": "<dt id=\"term-Identity-Object\">Identity Object</dt><dd><p>An object issued by the <a class=\"reference internal\" href=\"#term-Identity-Provider\"><span class=\"xref std std-term\">identity provider</span></a> to the user which allows the user to prove to third parties that their real life identity has been verified by a trusted third party.</p></dd>", "a[href=\"../../resources/glossary.html#term-Proof-of-stake\"]": "<dt id=\"term-Proof-of-stake\">Proof-of-stake</dt><dd><p>A consensus mechanism where validators must stake (lock) CCD tokens to participate in block production. The chance of being selected to produce a block is proportional to the amount staked.</p></dd>", "a[href=\"../../resources/glossary.html#term-Smart-contract\"]": "<dt id=\"term-Smart-contract\">Smart contract</dt><dd><p>A computer program or a transaction protocol that is intended to automatically execute, control or document events and actions according to the terms of a contract or an agreement. An example is a smart contract for selling NFTs on a marketplace; it may contain information about royalties, selling the NFT on to others, and so on.</p></dd>", "a[href=\"../../resources/glossary.html#term-Transaction\"]": "<dt id=\"term-Transaction\">Transaction</dt><dd><p>An atomic operation that defines a change of state in the ledger, such as transferring funds from one account to another. A transaction typically has a sender account and a <a class=\"reference internal\" href=\"#term-Transaction-Sequence-Number\"><span class=\"xref std std-term\">transaction sequence number</span></a>, and incurs a fee. The sender account must sign the transaction to authorize it. (The exception to this is a credential deployment transaction that creates a new account, which does not have a sender account.)</p></dd>", "a[href=\"../../resources/glossary.html#term-Protocol-level-token-PLT\"]": "<dt id=\"term-Protocol-level-token-PLT\">Protocol-level token (PLT)</dt><dd><p>A feature that provides chain-native support for tokens other than CCD, implemented directly within the Concordium protocol without depending on smart contracts for their functionality. PLTs aim to enhance security, efficiency, and flexibility in token management by embedding core functionalities like creation, governance, and user operations directly at the protocol level. Each PLT is assigned a unique <a class=\"reference internal\" href=\"#term-Token-ID\"><span class=\"xref std std-term\">Token ID</span></a> upon creation.</p></dd>"}
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
