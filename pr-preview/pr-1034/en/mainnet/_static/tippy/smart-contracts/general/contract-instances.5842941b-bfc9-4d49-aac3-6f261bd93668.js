selector_to_html = {"a[href=\"../../net/resources/glossary.html#term-Instance\"]": "<dt id=\"term-Instance\">Instance</dt><dd><p>A smart contract module together with a specific state and an amount of CCD tokens. Multiple smart contract instances can be created from the same module. Smart contract instances can be created from a deployed <a class=\"reference internal\" href=\"../../smart-contracts/general/contract-module.html#contract-module\"><span class=\"std std-ref\">smart contract module</span></a> via the <code class=\"docutils literal notranslate\"><span class=\"pre\">init</span></code> transaction which invokes the requested function in the smart contract module. This function can take a parameter. Its end result is the state of the smart contract instance.</p></dd>"}
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
