selector_to_html = {"a[href=\"../resources/glossary.html#term-Account-credential\"]": "<dt id=\"term-Account-credential\">Account credential</dt><dd><p>A certificate derived from the <a class=\"reference internal\" href=\"#term-Identity-Object\"><span class=\"xref std std-term\">identity object</span></a> that proves that the owner has been verified by an identity provider. The key feature of the credential is that it <strong>does not</strong> identify the owner to the identity provider, nor to any other single entity, however it contains enough information to allow anonymity revokers in concert with the identity provider to find the owner.</p></dd>", "a[href=\"../resources/glossary.html#term-Verifiable-presentation\"]": "<dt id=\"term-Verifiable-presentation\">Verifiable presentation</dt><dd><p>Data derived from one or more verifiable credentials and/or account credentials, issued by one or more issuers or identity providers, that is shared with a specific verifier. A verifiable presentation is tamper-evident and encoded in such a way that authorship of the data can be trusted after a process of cryptographic verification. It contains a link that points to the contract and holder ID. A presentation that contains a <strong>zero-knowledge proof</strong> might contain data that confirms the truth of a statement from verifiable credentials or account credentials, but the presentation does not reveal the actual attributes of verifiable credentials.</p></dd>", "a[href=\"../resources/glossary.html#term-Verifiable-credential\"]": "<dt id=\"term-Verifiable-credential\">Verifiable credential</dt><dd><p>Issued to the individual by an <a class=\"reference internal\" href=\"#term-Issuer\"><span class=\"xref std std-term\">issuer</span></a> who has authority for the credential to be issued. A verifiable credential contains some information about the individual that does not necessitate <a class=\"reference internal\" href=\"#term-Anonymity-revoker\"><span class=\"xref std std-term\">anonymity revocation</span></a>, such as membership in a club or loyalty program, education, and more. Verifiable credentials can be checked by a <a class=\"reference internal\" href=\"#term-Verifier\"><span class=\"xref std std-term\">verifier</span></a> using <a class=\"reference internal\" href=\"#term-Zero-knowledge-proof\"><span class=\"xref std std-term\">zero-knowledge proofs</span></a>. The issuer can choose to have the verifiable credential expire, or revoke it, if necessary. The issuer manages the verifiable credentials with a smart contract, a credential registry contract.</p></dd>"}
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
