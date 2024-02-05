selector_to_html = {"a[href=\"#anonymity-revokers\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Anonymity Revokers<a class=\"headerlink\" href=\"#anonymity-revokers\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#identity-providers\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Identity Providers<a class=\"headerlink\" href=\"#identity-providers\" title=\"Link to this heading\">#</a></h2><p><strong>Notabene</strong></p>", "a[href=\"#contact-anonymity-revokers-and-identity-providers\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Contact Anonymity Revokers and Identity Providers<a class=\"headerlink\" href=\"#contact-anonymity-revokers-and-identity-providers\" title=\"Link to this heading\">#</a></h1><p>To begin the process of anonymity revocation, you must contact the anonymity revoker and identity provider associated with the account with appropriate documentation. To learn about this process, see <a class=\"reference internal\" href=\"../concepts/id-accounts.html#revoke-anomity\"><span class=\"std std-ref\">anonymity revocation</span></a>.</p>", "a[href=\"../concepts/id-accounts.html#revoke-anomity\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Revoking anonymity<a class=\"headerlink\" href=\"#revoking-anonymity\" title=\"Link to this heading\">#</a></h2><p>The identity of a user can only be revealed to a qualified authority as part of a valid legal process. A qualified authority is a governmental body that has authority to act in a relevant jurisdiction. For example, a local police force, a local court or an investigatory division of a local authority that regulates financial conduct will all have authority to act in their jurisdictions. These authorities are qualified to begin the process of revoking the anonymity of a user when they proceed through established legal channels and make a formal request. The outcome of such a request is likely to be that a qualified authority obtains an official order, which may be in the form of a warrant, court order, or similar instrument. Only after a qualified authority validly serves an official order upon the relevant <a class=\"reference internal\" href=\"../resources/ar-idp-contact.html#ar-idp-contact\"><span class=\"std std-ref\">anonymity revokers</span></a> and <a class=\"reference internal\" href=\"../resources/glossary.html#term-Identity-Provider\"><span class=\"xref std std-term\">identity provider</span></a> can the real-world identity of a user be revealed and only to the extent set out in the order.</p><p>When legally obliged, the anonymity revokers and identity provider work together to determine the owner of an account and determine which accounts belong to the same owner. Anonymity revocation is a multi-stage process requiring cooperation of multiple parties.</p>"}
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
