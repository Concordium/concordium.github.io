selector_to_html = {"a[href=\"../resources/glossary.html#glossary\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Glossary of Concordium Terms<a class=\"headerlink\" href=\"#glossary-of-concordium-terms\" title=\"Link to this heading\">#</a></h1><p>Also see the Concordium <a class=\"reference external\" href=\"https://developer.concordium.software/governance/whitepaper/Concordium%20White%20Paper.pdf\">Whitepaper</a> for more details on the terms described below.</p>"}
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
