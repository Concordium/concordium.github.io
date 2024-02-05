selector_to_html = {"a[href=\"../resources/glossary.html#term-Issuer\"]": "<dt id=\"term-Issuer\">Issuer</dt><dd><p>Party that issues Web3 ID credentials to users. May also revoke Web3 ID credentials.</p></dd>", "a[href=\"#how-to-become-an-issuer\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">How to become an issuer<a class=\"headerlink\" href=\"#how-to-become-an-issuer\" title=\"Link to this heading\">#</a></h2><p>An issuer needs to have the following components.</p>", "a[href=\"#concordium-issuer-tool\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Issuer tool<a class=\"headerlink\" href=\"#concordium-issuer-tool\" title=\"Link to this heading\">#</a></h3><p>Concordium also provides a generic issuer for Web3ID credentials. It exposes a REST API for registering credentials, and handles the correct formatting of credentials to submit to the chain, and communication with the node.</p><p>Concordium provides Docker images to make it simple to run the issuer tool, but the issuer themselves have to run it since issuing credentials requires access to private keys of the issuer, and payment of transaction fees.</p>", "a[href=\"#web3-id-issuers\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Web3 ID issuers<a class=\"headerlink\" href=\"#web3-id-issuers\" title=\"Link to this heading\">#</a></h1><p>Web3 ID includes many types of credentials that are not identity credentials. This might be employment history, certifications from educational courses or diplomas, membership in loyalty clubs or rewards programs, and more. Because of this anyone can become an <a class=\"reference internal\" href=\"../resources/glossary.html#term-Issuer\"><span class=\"xref std std-term\">issuer</span></a>!</p>"}
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
