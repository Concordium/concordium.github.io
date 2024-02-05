selector_to_html = {"a[href=\"#references-on-chain\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">References on-chain<a class=\"headerlink\" href=\"#references-on-chain\" title=\"Link to this heading\">#</a></h1><p>This is a reference of how modules and contract instances are referenced\n<em>on-chain</em>.</p>", "a[href=\"#modules\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Modules<a class=\"headerlink\" href=\"#modules\" title=\"Link to this heading\">#</a></h2><p>Modules are referenced via their <em>module reference</em>.\nA reference for a module is simply its SHA256 hash.</p><p>Example of a module reference:</p>", "a[href=\"#contract-instances\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Contract instances<a class=\"headerlink\" href=\"#contract-instances\" title=\"Link to this heading\">#</a></h2><p>Contract instances are referenced via their <em>address</em>.\nAn address consists of an <em>index</em> and a <em>subindex</em>, both of which are\nnon-negative integers.</p><p>Example of a contract instance address:</p>"}
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
