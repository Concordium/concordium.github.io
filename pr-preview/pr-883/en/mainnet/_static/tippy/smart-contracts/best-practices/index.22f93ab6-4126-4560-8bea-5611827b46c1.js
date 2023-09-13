selector_to_html = {"a[href=\"development.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Development best practices<a class=\"headerlink\" href=\"#development-best-practices\" title=\"Permalink to this headline\">#</a></h1><p>This document provides guidelines for developing smart contracts.\nIt starts with some general thoughts about smart contract development and then gives more details about writing smart contracts in Rust for Concordium.</p>"}
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
