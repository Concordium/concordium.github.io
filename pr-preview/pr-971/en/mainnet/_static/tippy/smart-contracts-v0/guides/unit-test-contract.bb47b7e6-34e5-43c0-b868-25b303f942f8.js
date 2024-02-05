selector_to_html = {"a[href=\"#unit-test-a-contract-in-rust\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Unit test a contract in Rust<a class=\"headerlink\" href=\"#unit-test-a-contract-in-rust\" title=\"Link to this heading\">#</a></h1><p>This guide will show you how to write unit tests for a smart contract written in\nRust.\nFor testing a smart contract Wasm module, see <a class=\"reference internal\" href=\"local-simulate.html#local-simulate-v0\"><span class=\"std std-ref\">Locally simulate contract functions</span></a>.</p><p>A smart contract in Rust is written as a library and you can unit test it like a\nlibrary by annotating functions with a <code class=\"docutils literal notranslate\"><span class=\"pre\">#[test]</span></code> attribute.</p>", "a[href=\"#writing-unit-tests\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Writing unit tests<a class=\"headerlink\" href=\"#writing-unit-tests\" title=\"Link to this heading\">#</a></h2><p>Unit tests typically follow a three-part structure in which you: set up some\nstate, run some unit of code, and make assertions about the state and output of\nthe code.</p><p>If the contract functions are written using <code class=\"docutils literal notranslate\"><span class=\"pre\">#[init(..)]</span></code> or\n<code class=\"docutils literal notranslate\"><span class=\"pre\">#[receive(..)]</span></code>, you can test these functions directly in the unit test.</p>", "a[href=\"../../smart-contracts/guides/setup-tools.html#setup-tools\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Install tools for development<a class=\"headerlink\" href=\"#install-tools-for-development\" title=\"Link to this heading\">#</a></h1><p>Before you can start developing smart contracts, you need to setup the\nenvironment.</p><p>You can also watch a video about installing the smart contract tools.</p>", "a[href=\"local-simulate.html#local-simulate-v0\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Locally simulate contract functions<a class=\"headerlink\" href=\"#locally-simulate-contract-functions\" title=\"Link to this heading\">#</a></h1><p>This guide is about how to locally simulate an invocation of some init or\nreceive function from a Wasm smart contract module in a given context and\nstate.\nThis simulation is useful for inspecting a smart contract and the outcome in\nspecific scenarios.</p>", "a[href=\"#running-tests-in-wasm\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Running tests in Wasm<a class=\"headerlink\" href=\"#running-tests-in-wasm\" title=\"Link to this heading\">#</a></h2><p>Compiling the tests to native machine code is sufficient for most cases, but it\nis also possible to compile the tests to Wasm and run them using the exact\ninterpreter that is used by the nodes.\nThis makes the test environment closer to the run environment on-chain and could\nin some cases catch more bugs.</p><p>The development tool <code class=\"docutils literal notranslate\"><span class=\"pre\">cargo-concordium</span></code> includes a test runner for Wasm, which\nuses the same Wasm-interpreter as the one shipped in the Concordium nodes.</p>"}
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
