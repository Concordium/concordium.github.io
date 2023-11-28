selector_to_html = {"a[href=\"../resources/glossary.html#term-Initial-Account\"]": "<dt id=\"term-Initial-Account\">Initial Account</dt><dd><p>An intial account is an account submitted to the chain by the identity provider during the process of requesting a new identity. The initial account can perform all of the same actions as a regular account, however the real-life identity of the initial-account owner is known by the identity provider who submitted it to the chain. In contrast, the real-life identity of the owner of a regular account can only be ascertained by anonymity revokers working in concert with the identity provider.</p><p>Initial accounts are only relevant for Desktop Wallet and Concordium Legacy Wallet.</p></dd>", "a[href=\"../resources/glossary.html#term-Identity\"]": "<dt id=\"term-Identity\">Identity</dt><dd><p>Before opening an account on the Concordium Platform, one\u2019s real-world identity must be verified and recorded by an <a class=\"reference internal\" href=\"#term-Identity-Provider\"><span class=\"xref std std-term\">identity provider</span></a>. A user\u2019s identity is anonymous on-chain, however this anonymity can be revoked and their real-world identity revealed in response to a valid request from a government authority.</p></dd>"}
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
