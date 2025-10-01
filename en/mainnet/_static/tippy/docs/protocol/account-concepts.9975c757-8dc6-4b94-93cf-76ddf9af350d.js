selector_to_html = {"a[href=\"../resources/glossary.html#term-Off-chain\"]": "<dt id=\"term-Off-chain\">Off-chain</dt><dd><p>Refers to activities outside of the Concordium blockchain. Some on-chain actions need preliminary actions off-chain, for example to create an account on the Concordium blockchain the user must first work with an identity provider, e.g., via their website or mobile application, to obtain a specific digital certificate. Concordium refers to this certificate as the <strong>identity</strong>.</p></dd>", "a[href=\"../resources/glossary.html#term-Identity-Provider\"]": "<dt id=\"term-Identity-Provider\">Identity Provider</dt><dd><p>A person or organization that performs off-chain identification of users. Users are required to obtain an identity object from an identity provider in order to open an account on the Concordium platform.</p></dd>", "a[href=\"../resources/glossary.html#term-Privacy-guardian-PG\"]": "<dt id=\"term-Privacy-guardian-PG\">Privacy guardian (PG)</dt><dd><p>Authorized entity participating in Concordium\u2019s identity disclosure process when legally required. PGs hold cryptographic keys that enable them to decrypt partial shares of encrypted identity information. Multiple PGs must collaborate to reconstruct complete identity data - a minimum threshold (minimum two out of three) of PGs must provide their decryption shares before the Authority can access the full information needed to connect accounts to identities.</p></dd>", "a[href=\"../resources/glossary.html#term-Transaction-Sequence-Number\"]": "<dt id=\"term-Transaction-Sequence-Number\">Transaction Sequence Number</dt><dd><p>A sequence number that orders <a class=\"reference internal\" href=\"#term-Transaction\"><span class=\"xref std std-term\">transaction</span></a> on a given <a class=\"reference internal\" href=\"#term-Account\"><span class=\"xref std std-term\">account</span></a>. In a ledger, all transactions for an account must be ordered with consecutive transaction sequence numbers, starting from 1. Transaction sequence numbers ensure that a transaction cannot be repeated in the ledger, and that the transactions occur in the order intended by the sender account holder.</p></dd>", "a[href=\"../resources/glossary.html#term-Transfer-with-schedule\"]": "<dt id=\"term-Transfer-with-schedule\">Transfer with schedule</dt><dd><p>A special kind of transfer of CCD that makes the CCD amount available to the receiver only in a limited way until a specified point in time. The point in time is specified as part of a transfer. The CCD are immediately owned by the receiver account, and the transfer cannot be revoked, but the receiver cannot spend the CCD until the specified time.</p></dd>"}
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
