selector_to_html = {"a[href=\"../../docs/resources/glossary.html#term-Statement\"]": "<dt id=\"term-Statement\">Statement</dt><dd><p>A list presented to a wallet by a dApp or service whose items are either attributes to reveal, or properties of attributes to prove.</p></dd>", "a[href=\"../../docs/resources/glossary.html#term-Challenge\"]": "<dt id=\"term-Challenge\">Challenge</dt><dd><p>To make sure that <a class=\"reference internal\" href=\"#term-Zero-knowledge-proof\"><span class=\"xref std std-term\">zero-knowledge proofs</span></a> cannot be reused (e.g., if they are stolen), the verifier can and should specify a challenge string. This can be an arbitrary byte array which is used by the prover (wallet) when producing the proof. The proof will only validate with respect to the challenge that was used to produce it. The verifier server can thus use the challenge to make sure the proofs it is receiving are not reused, and to handle their lifetime (e.g., it can set the challenge it supplied to expire in 5 minutes).</p></dd>"}
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
