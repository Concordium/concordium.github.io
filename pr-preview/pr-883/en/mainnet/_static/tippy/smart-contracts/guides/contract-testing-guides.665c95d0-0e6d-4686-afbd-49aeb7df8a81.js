selector_to_html = {"a[href=\"integration-test-contract.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Integration test a contract in Rust<a class=\"headerlink\" href=\"#integration-test-a-contract-in-rust\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how to write <em>integration tests</em> in Rust for your smart contracts using the <a class=\"reference external\" href=\"https://docs.rs/concordium-smart-contract-testing/latest/concordium_smart_contract_testing/\">Concordium smart contract testing library</a>.\nThe library allows you to test individual contracts in isolation, but, notably, also interactions between multiple contracts.\nWhen running the tests, they are executed locally on the exact contract code that is deployed on the chain, and using the same execution engine that the nodes use.\nV0 smart contracts are not supported, but all V1 smart contract features are, including upgrades, and it is also possible to see the energy usage of your contracts.\nThis allows you to refactor and optimize your contracts for speed and efficiency with greater ease and confidence.</p><p>The high-level process of adding integration tests to your existing smart contract project is as follows:</p>", "a[href=\"unit-test-contract.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Unit test a contract in Rust<a class=\"headerlink\" href=\"#unit-test-a-contract-in-rust\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how to write unit tests for a smart contract written in\nRust.\nFor information about how to test a smart contract Wasm module, see <a class=\"reference internal\" href=\"local-simulate.html#local-simulate\"><span class=\"std std-ref\">Locally simulate contract functions</span></a>.</p><p>A smart contract in Rust is written as a library and you can unit test it like a\nlibrary by annotating functions with a <code class=\"docutils literal notranslate\"><span class=\"pre\">#[test]</span></code> attribute.</p>"}
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
