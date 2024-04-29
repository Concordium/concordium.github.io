selector_to_html = {"a[href=\"../resources/glossary.html#term-Private-keys\"]": "<dt id=\"term-Private-keys\">Private keys</dt><dd><p>A random, secret string that is used in cryptography and cryptocurrency to prove ownership of an account and sign transactions to send, spend, delegate, and stake CCDs. A wallet consists of a set of public addresses and private keys. Anyone can deposit cryptocurrency in a public address, but funds cannot be removed from an address without the corresponding private key.</p></dd>", "a[href=\"../resources/glossary.html#term-Transaction-Sequence-Number\"]": "<dt id=\"term-Transaction-Sequence-Number\">Transaction Sequence Number</dt><dd><p>A sequence number that orders <a class=\"reference internal\" href=\"#term-Transaction\"><span class=\"xref std std-term\">transaction</span></a> on a given <a class=\"reference internal\" href=\"#term-Account\"><span class=\"xref std std-term\">account</span></a>. In a ledger, all transactions for an account must be ordered with consecutive transaction sequence numbers, starting from 1. Transaction sequence numbers ensure that a transaction cannot be repeated in the ledger, and that the transactions occur in the order intended by the sender account holder.</p></dd>", "a[href=\"../resources/glossary.html#term-Block\"]": "<dt id=\"term-Block\">Block</dt><dd><p>The basic unit of the blockchain, which is produced by a <a class=\"reference internal\" href=\"#term-Validator\"><span class=\"xref std std-term\">validator</span></a>. A block contains a (possibly empty) list of <a class=\"reference internal\" href=\"#term-Transaction\"><span class=\"xref std std-term\">transactions</span></a>, and has a pointer to a previous block (with the exception of the <a class=\"reference internal\" href=\"#term-Genesis-Block\"><span class=\"xref std std-term\">genesis block</span></a>). A block and its predecessors form a chain, and the sequence of transactions they contain form a ledger. Each block has a <a class=\"reference internal\" href=\"#term-Slot\"><span class=\"xref std std-term\">slot time</span></a> that records when it was produced. A block also contains information relating to consensus, for instance establishing which validator created the block, and that the validator was entitled to do so.</p></dd>", "a[href=\"../resources/glossary.html#term-Account\"]": "<dt id=\"term-Account\">Account</dt><dd><p>An addressable store of funds on the blockchain. An account is associated with one or more <em>account keys</em> that can be used to authorize transactions originating from the account, as well as with an <a class=\"reference internal\" href=\"#term-Encryption-key\"><span class=\"xref std std-term\">encryption key</span></a> that can be used to send shielded transfers to the account. An account is also associated with the account holder\u2019s <a class=\"reference internal\" href=\"#term-Identity\"><span class=\"xref std std-term\">identity</span></a>, although this association is encrypted for anonymity. This anonymity can only be revoked by <a class=\"reference internal\" href=\"#term-Anonymity-revoker\"><span class=\"xref std std-term\">anonymity revokers</span></a>, in cooperation with the account\u2019s <a class=\"reference internal\" href=\"#term-Identity-Provider\"><span class=\"xref std std-term\">identity provider</span></a>.</p></dd>"}
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
