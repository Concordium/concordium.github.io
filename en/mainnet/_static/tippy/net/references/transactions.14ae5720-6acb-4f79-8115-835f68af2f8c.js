selector_to_html = {"a[href=\"../resources/glossary.html#term-Shielded-transfer\"]": "<dt id=\"term-Shielded-transfer\">Shielded transfer</dt><dd><p>Transfer from <a class=\"reference internal\" href=\"#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a> of an account to a shielded balance of another account. The amount that is transferred is only visible to the sender and the receiver.</p></dd>", "a[href=\"../resources/glossary.html#term-Alias\"]": "<dt id=\"term-Alias\">Alias</dt><dd><p>A kind of sub-account structure that can be created. An account owner can create different aliases for different uses to keep track of transfers and assign them meaning. Each account has 16777216 addresses, namely a so-called canonical account address together with matching account aliases. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial 29 bytes are referred to as account aliases for the same account. Thus, accounts can be referred to by any address whose initial 29 bytes match.</p></dd>", "a[href=\"../resources/glossary.html#term-Transaction-Sequence-Number\"]": "<dt id=\"term-Transaction-Sequence-Number\">Transaction Sequence Number</dt><dd><p>A sequence number that orders <a class=\"reference internal\" href=\"#term-Transaction\"><span class=\"xref std std-term\">transaction</span></a> on a given <a class=\"reference internal\" href=\"#term-Account\"><span class=\"xref std std-term\">account</span></a>. In a ledger, all transactions for an account must be ordered with consecutive transaction sequence numbers, starting from 1. Transaction sequence numbers ensure that a transaction cannot be repeated in the ledger, and that the transactions occur in the order intended by the sender account holder.</p></dd>", "a[href=\"../resources/glossary.html#term-Shielded-balance\"]": "<dt id=\"term-Shielded-balance\">Shielded balance</dt><dd><p>The part of the balance of an <a class=\"reference internal\" href=\"#term-Account\"><span class=\"xref std std-term\">account</span></a> that only the owner of the account can see. This is achieved by encrypting transfers to an account with the account\u2019s <a class=\"reference internal\" href=\"#term-Encryption-key\"><span class=\"xref std std-term\">encryption key</span></a>. Every participant of the Concordium network can see the <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/Ciphertext\">ciphertexts</a> of all the transfers, however they provide no information on how many CCDs were transferred. The receiver of the transfer can use their secret key to decrypt the ciphertexts, and seeing how many CCDs they have received.</p><p>For technical reasons the shielded balance of the account consists of two parts, the \u201cself balance\u201d and the \u201cincoming shielded amounts\u201d.</p></dd>", "a[href=\"../resources/glossary.html#term-Shielded-amount\"]": "<dt id=\"term-Shielded-amount\">Shielded amount</dt><dd><p>An amount of <a class=\"reference internal\" href=\"#term-CCD\"><span class=\"xref std std-term\">CCD</span></a> that is encrypted with the public key of an account. Only the owner of the secret key can determine how many CCDs are contained in the encryption.</p></dd>", "a[href=\"../resources/glossary.html#term-Transfer-Memo\"]": "<dt id=\"term-Transfer-Memo\">Transfer Memo</dt><dd><p>Additional data that a user can provide when making a transfer, a shielded transfer or a transfer with schedule. The data will appear on chain as a bytestring. It is expected to be CBOR encoded and can therefore represent strings, numbers and JSON values, but this is not enforced.</p></dd>"}
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
