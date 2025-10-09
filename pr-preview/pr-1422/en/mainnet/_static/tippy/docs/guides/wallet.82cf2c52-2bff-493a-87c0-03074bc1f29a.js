selector_to_html = {"a[href=\"../resources/glossary.html#term-Account-credential\"]": "<dt id=\"term-Account-credential\">Account credential</dt><dd><p>A certificate derived from the <a class=\"reference internal\" href=\"#term-Identity-Object\"><span class=\"xref std std-term\">identity object</span></a> that proves that the owner has been verified by an identity provider. The key feature of the credential is that it <strong>does not</strong> identify the owner to the identity provider, nor to any other single entity, however it contains enough information to allow disclosing an identity in concert with the identity provider to find the owner.</p></dd>", "a[href=\"../resources/glossary.html#term-Verifiable-presentation\"]": "<dt id=\"term-Verifiable-presentation\">Verifiable presentation</dt><dd><p>Data derived from one or more verifiable credentials, issued by one or more issuers, that is shared with a specific verifier. A verifiable presentation is a tamper-evident presentation encoded in such a way that authorship of the data can be trusted after a process of cryptographic verification. Certain types of verifiable presentations might contain data that is synthesized from, but do not contain, the original verifiable credentials (for example, zero-knowledge proofs).</p></dd>", "a[href=\"../resources/glossary.html#term-Verifiable-credential\"]": "<dt id=\"term-Verifiable-credential\">Verifiable credential</dt><dd><p>Verifiable credentials are Web3 credentials. They have attributes that don\u2019t have to have stringent requirements on anonymity revocation, but can also witness a number of other attributes of the holder. Examples of this would be club membership credentials, reward programs, etc. There are no requirements imposed on who can be an issuer of these credentials, and in contrast to protocol level identities, the Web3 ID credentials can be revoked according to the logic imposed by the issuer. This could be that the credential holder can revoke it, the credential expires, or the issuer or some other third party has rights to revoke it. Verifiable credentials are not associated with accounts. Verifiable credentials can be used to build verifiable presentations, which can also be cryptographically verified.</p></dd>"}
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
