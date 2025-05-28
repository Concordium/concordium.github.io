selector_to_html = {"a[href=\"../resources/glossary.html#term-Identity-Provider\"]": "<dt id=\"term-Identity-Provider\">Identity Provider</dt><dd><p>A person or organization that performs off-chain identification of users. Users are required to obtain an identity object from an identity provider in order to open an account on the Concordium Platform.</p></dd>", "a[href=\"../resources/glossary.html#term-Privacy-Guardian-PG\"]": "<dt id=\"term-Privacy-Guardian-PG\">Privacy Guardian (PG)</dt><dd><p>Authorized legal entities, typically law firms, that participate in Concordium\u2019s identity disclosure process when legally required. PGs hold cryptographic keys that enable them to decrypt partial shares of encrypted identity information. Multiple PGs must collaborate to reconstruct complete identity data - a minimum threshold (minimum two out of three) of PGs must provide their decryption shares before the Authority can access the full information needed to connect accounts to identities.</p></dd>"}
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
