selector_to_html = {"a[href=\"../resources/glossary.html#term-Account\"]": "<dt id=\"term-Account\">Account</dt><dd><p>An addressable store of funds on the blockchain. An account is associated with one or more <em>account keys</em> that can be used to authorize transactions originating from the account, as well as with an <a class=\"reference internal\" href=\"#term-Encryption-key\"><span class=\"xref std std-term\">encryption key</span></a> that can be used to send shielded transfers to the account. An account is also associated with the account holder\u2019s <a class=\"reference internal\" href=\"#term-Identity\"><span class=\"xref std std-term\">identity</span></a>, although this association is encrypted for anonymity. This anonymity can only be revoked by <a class=\"reference internal\" href=\"#term-Anonymity-revoker\"><span class=\"xref std std-term\">anonymity revokers</span></a>, in cooperation with the account\u2019s <a class=\"reference internal\" href=\"#term-Identity-Provider\"><span class=\"xref std std-term\">identity provider</span></a>.</p></dd>", "a[href=\"../resources/glossary.html#term-Unshielding\"]": "<dt id=\"term-Unshielding\">Unshielding</dt><dd><p>The action of transferring a part of the <a class=\"reference internal\" href=\"#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a> to the public balance.</p></dd>", "a[href=\"../resources/glossary.html#term-Wallet\"]": "<dt id=\"term-Wallet\">Wallet</dt><dd><p>A wallet is an app that allows cryptocurrency users to store and retrieve their digital assets, and manage identities and accounts. Concordium has four wallet types.</p></dd>", "a[href=\"../resources/glossary.html#term-Shielded-transfer\"]": "<dt id=\"term-Shielded-transfer\">Shielded transfer</dt><dd><p>Transfer from <a class=\"reference internal\" href=\"#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a> of an account to a shielded balance of another account. The amount that is transferred is only visible to the sender and the receiver.</p></dd>", "a[href=\"../resources/glossary.html#term-Shielding\"]": "<dt id=\"term-Shielding\">Shielding</dt><dd><p>The action of transferring a part of the public balance to the <a class=\"reference internal\" href=\"#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a>.</p></dd>", "a[href=\"../resources/glossary.html#term-Identity\"]": "<dt id=\"term-Identity\">Identity</dt><dd><p>Before opening an account on the Concordium Platform, one\u2019s real-world identity must be verified and recorded by an <a class=\"reference internal\" href=\"#term-Identity-Provider\"><span class=\"xref std std-term\">identity provider</span></a>. A user\u2019s identity is anonymous on-chain, however this anonymity can be revoked and their real-world identity revealed in response to a valid request from a government authority.</p></dd>"}
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
