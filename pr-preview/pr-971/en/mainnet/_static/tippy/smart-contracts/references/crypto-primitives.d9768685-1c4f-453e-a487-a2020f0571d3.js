selector_to_html = {"a[href=\"#references\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">References<a class=\"headerlink\" href=\"#references\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#cryptographic-primitives\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Cryptographic primitives<a class=\"headerlink\" href=\"#cryptographic-primitives\" title=\"Link to this heading\">#</a></h1><p>V1 smart contracts natively support a number of common cryptographic primitives.\nCompared to implementing the same functionality in the smart contract, using primitives is substantially cheaper.\nAt the same time, smart contract developers benefit from using a single, high-quality implementation of the primitives provided by the chain.</p><p>Since all contract inputs, as well as the contract state, on the Concordium blockchain are public, it is only reasonable to have primitives that take public inputs.\nThe currently supported primitives are:</p>", "a[href=\"host-fns.html#host-function-crypto-primitives\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Cryptographic primitives<a class=\"headerlink\" href=\"#cryptographic-primitives\" title=\"Link to this heading\">#</a></h2>"}
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
