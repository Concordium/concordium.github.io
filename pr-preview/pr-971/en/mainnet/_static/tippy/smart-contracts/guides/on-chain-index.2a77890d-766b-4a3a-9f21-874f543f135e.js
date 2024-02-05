selector_to_html = {"a[href=\"../best-practices/development.html#sc-development-best-practices\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Development best practices<a class=\"headerlink\" href=\"#development-best-practices\" title=\"Link to this heading\">#</a></h1><p>This document provides guidelines for developing smart contracts, including best practices for smart contract development, audit, information about common pitfalls and security vulnerabilities, and how to avoid them.</p><p>It starts with some general thoughts about smart contract development and then gives more details about writing smart contracts in Rust for Concordium.</p>", "a[href=\"#on-chain-guides\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">On-chain guides<a class=\"headerlink\" href=\"#on-chain-guides\" title=\"Link to this heading\">#</a></h1><p>There are several on-chain guides to help you with smart contract actions.</p><p>Once you are familiar with smart contracts, it is a good idea to read the <a class=\"reference internal\" href=\"../best-practices/development.html#sc-development-best-practices\"><span class=\"std std-ref\">Smart contracts best practices</span></a>.</p>"}
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
