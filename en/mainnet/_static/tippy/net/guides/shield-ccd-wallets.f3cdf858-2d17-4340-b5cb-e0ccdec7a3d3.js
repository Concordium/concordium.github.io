selector_to_html = {"a[href=\"../resources/glossary.html#term-Unshielding\"]": "<dt id=\"term-Unshielding\">Unshielding</dt><dd><p>The action of transferring a part of the <a class=\"reference internal\" href=\"#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a> to the public balance.</p></dd>", "a[href=\"../resources/glossary.html#term-Shielded-balance\"]": "<dt id=\"term-Shielded-balance\">Shielded balance</dt><dd><p>The part of the balance of an <a class=\"reference internal\" href=\"#term-Account\"><span class=\"xref std std-term\">account</span></a> that only the owner of the account can see. This is achieved by encrypting transfers to an account with the account\u2019s <a class=\"reference internal\" href=\"#term-Encryption-key\"><span class=\"xref std std-term\">encryption key</span></a>. Every participant of the Concordium network can see the <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/Ciphertext\">ciphertexts</a> of all the transfers, however they provide no information on how many CCDs were transferred. The receiver of the transfer can use their secret key to decrypt the ciphertexts, and seeing how many CCDs they have received.</p><p>For technical reasons the shielded balance of the account consists of two parts, the \u201cself balance\u201d and the \u201cincoming shielded amounts\u201d.</p></dd>", "a[href=\"../resources/glossary.html#term-Shielding\"]": "<dt id=\"term-Shielding\">Shielding</dt><dd><p>The action of transferring a part of the public balance to the <a class=\"reference internal\" href=\"#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a>.</p></dd>"}
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
