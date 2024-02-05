selector_to_html = {"a[href=\"#simulating-updates\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Simulating updates<a class=\"headerlink\" href=\"#simulating-updates\" title=\"Link to this heading\">#</a></h2><p>To simulate an update to a contract smart contract instance using\n<code class=\"docutils literal notranslate\"><span class=\"pre\">cargo-concordium</span></code>, run:</p>", "a[href=\"unit-test-contract.html#unit-test-contract-v0\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Unit test a contract in Rust<a class=\"headerlink\" href=\"#unit-test-a-contract-in-rust\" title=\"Link to this heading\">#</a></h1><p>This guide will show you how to write unit tests for a smart contract written in\nRust.\nFor testing a smart contract Wasm module, see <a class=\"reference internal\" href=\"local-simulate.html#local-simulate-v0\"><span class=\"std std-ref\">Locally simulate contract functions</span></a>.</p><p>A smart contract in Rust is written as a library and you can unit test it like a\nlibrary by annotating functions with a <code class=\"docutils literal notranslate\"><span class=\"pre\">#[test]</span></code> attribute.</p>", "a[href=\"#preparation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Preparation<a class=\"headerlink\" href=\"#preparation\" title=\"Link to this heading\">#</a></h2><p>Make sure you have <code class=\"docutils literal notranslate\"><span class=\"pre\">cargo-concordium</span></code> installed, if not follow the guide\n<a class=\"reference internal\" href=\"setup-tools.html#setup-tools-v0\"><span class=\"std std-ref\">Install tools for development</span></a>.\nYou will also need a smart contract module in Wasm to simulate.</p>", "a[href=\"#locally-simulate-contract-functions\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Locally simulate contract functions<a class=\"headerlink\" href=\"#locally-simulate-contract-functions\" title=\"Link to this heading\">#</a></h1><p>This guide is about how to locally simulate an invocation of some init or\nreceive function from a Wasm smart contract module in a given context and\nstate.\nThis simulation is useful for inspecting a smart contract and the outcome in\nspecific scenarios.</p>", "a[href=\"setup-tools.html#setup-tools-v0\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Install tools for development<a class=\"headerlink\" href=\"#install-tools-for-development\" title=\"Link to this heading\">#</a></h1><p>Before you can start developing smart contracts, you need to setup the\nenvironment.</p>", "a[href=\"#simulating-instantiation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Simulating instantiation<a class=\"headerlink\" href=\"#simulating-instantiation\" title=\"Link to this heading\">#</a></h2><p>To simulate the instantiation of a smart contract instance using\n<code class=\"docutils literal notranslate\"><span class=\"pre\">cargo-concordium</span></code>, run the following command:</p>", "a[href=\"../references/simulate-context.html#simulate-context-v0\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Simulation contexts<a class=\"headerlink\" href=\"#simulation-contexts\" title=\"Link to this heading\">#</a></h1><p>This is a reference of how the init- and receive-context is specified as JSON,\nwhen <a class=\"reference internal\" href=\"../guides/local-simulate.html#local-simulate-v0\"><span class=\"std std-ref\">simulating contract functions locally</span></a>.</p>"}
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
