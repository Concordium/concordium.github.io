selector_to_html = {"a[href=\"../resources/glossary.html#term-Identity-Provider\"]": "<dt id=\"term-Identity-Provider\">Identity Provider</dt><dd><p>A person or organization that performs off-chain identification of users. Users are required to obtain an identity object from an identity provider in order to open an account on the Concordium platform.</p></dd>", "a[href=\"../resources/glossary.html#term-Identity-credential\"]": "<dt id=\"term-Identity-credential\">Identity credential</dt><dd><p>An Identity credential contains attributes on a user\u2019s identity and is used to open accounts on-chain. It is issued by IDPs during user onboarding based on identity documents (e.g. passports). It is stored in both the user\u2019s wallet and IDP\u2019s database, but never accessible to Concordium. Users can share verified attributes using zero-knowledge proofs without revealing the underlying data.</p></dd>", "a[href=\"../resources/glossary.html#term-KYC\"]": "<dt id=\"term-KYC\">KYC</dt><dd><p>Know Your Customer - regulatory processes used by financial institutions and other businesses to verify the identity of their customers, helping prevent money laundering, fraud, and other financial crimes.</p></dd>", "a[href=\"../resources/glossary.html#term-KYB\"]": "<dt id=\"term-KYB\">KYB</dt><dd><p>Know Your Business - regulatory processes used to verify the identity and legitimacy of business entities, including their ownership structure, business activities, and compliance status.</p></dd>"}
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
