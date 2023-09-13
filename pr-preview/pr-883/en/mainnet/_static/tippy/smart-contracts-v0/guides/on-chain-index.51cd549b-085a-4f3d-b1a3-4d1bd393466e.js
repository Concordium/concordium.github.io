selector_to_html = {"a[href=\"interact-instance.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Interact with a smart contract instance<a class=\"headerlink\" href=\"#interact-with-a-smart-contract-instance\" title=\"Permalink to this headline\">#</a></h1><p>This guide will show you, how to interact with a smart contract instance, which\nmeans triggering a receive function that, possibly, updates the state of the\ninstance.</p>", "a[href=\"deploy-module.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Deploy a smart contract module<a class=\"headerlink\" href=\"#deploy-a-smart-contract-module\" title=\"Permalink to this headline\">#</a></h1><p>This guide will show you how to deploy a smart contract module <em>on-chain</em> and\nhow to name it.</p>", "a[href=\"initialize-contract.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Initialize a smart contract instance<a class=\"headerlink\" href=\"#initialize-a-smart-contract-instance\" title=\"Permalink to this headline\">#</a></h1><p>This guide will show you how to initialize a smart contract from a deployed\nsmart contract module with parameters in JSON or binary format.\nAdditionally, it will show how to name an instance.</p>", "a[href=\"inspect-instance.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Inspect a smart contract instance<a class=\"headerlink\" href=\"#inspect-a-smart-contract-instance\" title=\"Permalink to this headline\">#</a></h1><p>This guide will show you how to inspect a smart contract instance.\nInspecting an instance will show you its name, owner, module reference, balance,\nstate and receive-functions:</p>"}
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
