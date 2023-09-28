selector_to_html = {"a[href=\"../resources/glossary.html#term-Attributes\"]": "<dt id=\"term-Attributes\">Attributes</dt><dd><p>User data, such as date of birth or country of residence, that is associated with a user <a class=\"reference internal\" href=\"#term-Identity\"><span class=\"xref std std-term\">identity</span></a>. Users can choose which attributes should be revealed in each of their accounts.</p></dd>", "a[href=\"../resources/glossary.html#term-Anonymity-revoker\"]": "<dt id=\"term-Anonymity-revoker\">Anonymity revoker</dt><dd><p>An authority who has power to know the identity of a participant. The anonymity revokers and <a class=\"reference internal\" href=\"#term-Identity-Provider\"><span class=\"xref std std-term\">identity provider</span></a> can work together to determine the owner of an account and determine which accounts belong to the same owner. (They should only do so when legally obliged to, such as by a court order.) Anonymity revocation is a two-stage process, requiring cooperation of multiple parties.</p></dd>", "a[href=\"../resources/glossary.html#term-Credential\"]": "<dt id=\"term-Credential\">Credential</dt><dd><p>See <a class=\"reference internal\" href=\"#term-Account-credential\"><span class=\"xref std std-term\">account credential</span></a>.</p></dd>", "a[href=\"../resources/glossary.html#term-Identity-Provider\"]": "<dt id=\"term-Identity-Provider\">Identity Provider</dt><dd><p>A person or organization that performs off-chain identification of users. Users are required to obtain an identity object from an identity provider in order to open an account on the Concordium Platform.</p></dd>"}
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
