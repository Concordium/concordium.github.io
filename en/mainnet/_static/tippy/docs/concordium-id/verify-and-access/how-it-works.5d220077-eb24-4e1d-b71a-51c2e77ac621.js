selector_to_html = {"a[href=\"../../resources/glossary.html#term-Concordium-ID\"]": "<dt id=\"term-Concordium-ID\">Concordium ID</dt><dd><p>The protocol-level identity system on Concordium. All users must obtain a Concordium ID through identity verification with an approved identity provider before they can create and use accounts on the blockchain.</p></dd>", "a[href=\"../../resources/glossary.html#term-Verification-Audit-Anchor\"]": "<dt id=\"term-Verification-Audit-Anchor\">Verification Audit Anchor</dt><dd><p>A transaction initiated by the merchant after verifying of the presentation, and generating the verification audit record. The anchor makes the audit record tamper-evident and timestamps it.</p></dd>", "a[href=\"../../resources/glossary.html#term-Verification-Request-Anchor\"]": "<dt id=\"term-Verification-Request-Anchor\">Verification Request Anchor</dt><dd><p>A transaction initiated by the merchant immediately after generating a presentation request, but prior to sending it to the ID app. Its purpose is to allow the ID app to confirm that the presentation request is both authentic and recent.</p></dd>", "a[href=\"../../resources/glossary.html#term-Identity-Provider\"]": "<dt id=\"term-Identity-Provider\">Identity Provider</dt><dd><p>A person or organization that performs off-chain identification of users. Users are required to obtain an identity object from an identity provider in order to open an account on the Concordium platform.</p></dd>", "a[href=\"../../resources/glossary.html#term-Verification-Audit-Record\"]": "<dt id=\"term-Verification-Audit-Record\">Verification Audit Record</dt><dd><p>A private record stored by the merchant as a result of verifying a presentation (and shown to an auditor as needed).</p></dd>"}
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
