selector_to_html = {"a[href=\"faq.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">FAQs<a class=\"headerlink\" href=\"#faqs\" title=\"Permalink to this headline\">#</a></h1><p>The following Frequently Asked Questions about Concordium\nfocuses on helping developers with an Ethereum/solidity\nbackground to understand the Concordium blockchain and its smart contract ecosystem.</p><p>Feel free to participate and add your questions to the <a class=\"reference external\" href=\"https://support.concordium.software/\">Concordium software support channels</a>.</p>"}
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
