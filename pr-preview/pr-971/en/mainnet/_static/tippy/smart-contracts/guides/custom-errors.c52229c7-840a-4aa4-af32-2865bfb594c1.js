selector_to_html = {"a[href=\"#return-custom-errors\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Return custom errors<a class=\"headerlink\" href=\"#return-custom-errors\" title=\"Link to this heading\">#</a></h1><p>This guide shows how to return custom errors from your Rust smart contract.</p>", "a[href=\"#using-custom-errors\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Using custom errors<a class=\"headerlink\" href=\"#using-custom-errors\" title=\"Link to this heading\">#</a></h2><p>Return custom errors, as you would with any other error type:</p>", "a[href=\"#defining-and-deriving\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Defining and deriving<a class=\"headerlink\" href=\"#defining-and-deriving\" title=\"Link to this heading\">#</a></h2><p>Custom error codes help communicate why a contract rejects and can be returned\nboth during initialization and during updates.</p><p>On-chain, smart contracts return <a class=\"reference external\" href=\"https://docs.rs/concordium-std/latest/concordium_std/#signalling-errors\">a numeric error code and an optional serialized\nreturn value when rejecting</a>. This is also the case when using a custom error type.\nTherefore, a mapping from the custom error type to <code class=\"docutils literal notranslate\"><span class=\"pre\">Reject</span></code>, in the\nform of an implementation of <code class=\"docutils literal notranslate\"><span class=\"pre\">From&lt;MyError&gt;</span> <span class=\"pre\">for</span> <span class=\"pre\">Reject</span></code>, is needed.\nYou can derive the implementation automatically with <a class=\"reference external\" href=\"https://docs.rs/concordium-std/latest/concordium_std/derive.Reject.html\">#[derive(Reject)]</a> if\nthe type also implements <code class=\"docutils literal notranslate\"><span class=\"pre\">Serial</span></code> (also derivable). The <code class=\"docutils literal notranslate\"><span class=\"pre\">Serial</span></code> instance is\nneeded because the whole data type is serialized and included as the optional\nreturn value.\nHere is a typical example:</p>", "a[href=\"build-schema.html#build-schema\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Build a contract schema<a class=\"headerlink\" href=\"#build-a-contract-schema\" title=\"Link to this heading\">#</a></h1><p>This guide will show you how to build a smart contract schema, how to export it\nto a file, and/or embed the schema into the smart contract module, all using\n<code class=\"docutils literal notranslate\"><span class=\"pre\">cargo-concordium</span></code>.</p>"}
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
