selector_to_html = {"a[href=\"../resources/glossary.html#term-Unshielding\"]": "<dt id=\"term-Unshielding\">Unshielding</dt><dd><p>The action of transferring a part of the <a class=\"reference internal\" href=\"#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a> to the public balance.</p></dd>", "a[href=\"shielded-transfer.html#shielded-transfer\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Make a shielded transfer on an account<a class=\"headerlink\" href=\"#make-a-shielded-transfer-on-an-account\" title=\"Link to this heading\">#</a></h1><p>A shielded transfer is a transfer between two accounts where the <strong>amount</strong> of the transfer is encrypted. When you make a shielded transfer, the amount you transfer is only known to you and the recipient. However, the sender, receiver, and potential memo will be publicly visible on the blockchain.</p>", "a[href=\"#shield-and-unshield-ccd-on-an-account\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Shield and unshield CCD on an account<a class=\"headerlink\" href=\"#shield-and-unshield-ccd-on-an-account\" title=\"Link to this heading\">#</a></h1><p>Accounts on the Concordium blockchain have two balances, the <strong>Balance</strong> and the <a class=\"reference internal\" href=\"../resources/glossary.html#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a>. You can move funds between these\ntwo balances using either a <a class=\"reference internal\" href=\"../resources/glossary.html#term-Shielding\"><span class=\"xref std std-term\">shield CCD transaction</span></a> or an <a class=\"reference internal\" href=\"../resources/glossary.html#term-Unshielding\"><span class=\"xref std std-term\">unshield CCD transaction</span></a>.</p><p>When you shield an amount on an account, only the account\u2019s credential holder can see the shielded amounts. Other participants in the network will be able to see the shielding transaction, but can\u2019t see the shielded balance or any shielded transfers going in or out of the account. You can\u2019t make shielded transfers on multi-signature accounts, only on accounts with a single credential.</p>", "a[href=\"../resources/glossary.html#term-Shielding\"]": "<dt id=\"term-Shielding\">Shielding</dt><dd><p>The action of transferring a part of the public balance to the <a class=\"reference internal\" href=\"#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a>.</p></dd>", "a[href=\"../resources/glossary.html#term-Shielded-balance\"]": "<dt id=\"term-Shielded-balance\">Shielded balance</dt><dd><p>The part of the balance of an <a class=\"reference internal\" href=\"#term-Account\"><span class=\"xref std std-term\">account</span></a> that only the owner of the account can see. This is achieved by encrypting transfers to an account with the account\u2019s <a class=\"reference internal\" href=\"#term-Encryption-key\"><span class=\"xref std std-term\">encryption key</span></a>. Every participant of the Concordium network can see the <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/Ciphertext\">ciphertexts</a> of all the transfers, however they provide no information on how many CCDs were transferred. The receiver of the transfer can use their secret key to decrypt the ciphertexts, and seeing how many CCDs they have received.</p><p>For technical reasons the shielded balance of the account consists of two parts, the \u201cself balance\u201d and the \u201cincoming shielded amounts\u201d.</p></dd>"}
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
