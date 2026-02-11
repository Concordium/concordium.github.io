selector_to_html = {"a[href=\"../../resources/glossary.html#term-Gas\"]": "<dt id=\"term-Gas\">Gas</dt><dd><p>A transaction fee paid in CCD for executing operations on the Concordium blockchain. Gas is calculated based on ENERGY (NRG) consumption, which measures computational resources required, converted to CCD using a stable EUR-pegged pricing mechanism. This ensures transaction costs remain predictable in EUR terms despite CCD price fluctuations.</p></dd>", "a[href=\"../../resources/glossary.html#term-Mainnet\"]": "<dt id=\"term-Mainnet\">Mainnet</dt><dd><p>The main Concordium network which launched in June 2021. The mainnet will receive periodic upgrades, but in contrast to the <a class=\"reference internal\" href=\"#term-Testnet\"><span class=\"xref std std-term\">testnet</span></a>, it will never be reset, and accounts created on the mainnet will remain indefinitely.</p></dd>", "a[href=\"../../resources/glossary.html#term-Verification-Audit-Anchor\"]": "<dt id=\"term-Verification-Audit-Anchor\">Verification Audit Anchor</dt><dd><p>A transaction initiated by the merchant after verifying of the presentation, and generating the verification audit record. The anchor makes the audit record tamper-evident and timestamps it.</p></dd>", "a[href=\"../../resources/glossary.html#term-Verification-Request-Anchor\"]": "<dt id=\"term-Verification-Request-Anchor\">Verification Request Anchor</dt><dd><p>A transaction initiated by the merchant immediately after generating a presentation request, but prior to sending it to the ID app. Its purpose is to allow the ID app to confirm that the presentation request is both authentic and recent.</p></dd>", "a[href=\"../../resources/glossary.html#term-Testnet\"]": "<dt id=\"term-Testnet\">Testnet</dt><dd><p>A test network run by Concordium to test its protocols and software. There can be several test networks in existence at the same time. All the features are tested on the testnet before they are released on the <a class=\"reference internal\" href=\"#term-Mainnet\"><span class=\"xref std std-term\">mainnet</span></a>.</p></dd>", "a[href=\"../../resources/glossary.html#term-CCD\"]": "<dt id=\"term-CCD\">CCD</dt><dd><p>CCD is the currency of the Concordium blockchain. CCD can be used for multiple purposes:</p><p>The smallest subdivision of CCD is the \u00b5CCD (micro CCD), with 1 CCD = 1,000,000 \u00b5CCD. This means that CCD amounts are given with up to six decimal places of precision.</p></dd>", "a[href=\"../../resources/glossary.html#term-Verification-Audit-Record\"]": "<dt id=\"term-Verification-Audit-Record\">Verification Audit Record</dt><dd><p>A private record stored by the merchant as a result of verifying a presentation (and shown to an auditor as needed).</p></dd>"}
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
