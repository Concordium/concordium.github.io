selector_to_html = {"a[href=\"#return-custom-errors\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Return custom errors<a class=\"headerlink\" href=\"#return-custom-errors\" title=\"Link to this heading\">#</a></h1><p>This guide shows how to return custom errors from your Rust smart contract.</p>", "a[href=\"#using-custom-errors\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Using custom errors<a class=\"headerlink\" href=\"#using-custom-errors\" title=\"Link to this heading\">#</a></h2><p>Return custom errors, as you would with any other error type:</p>", "a[href=\"#defining-and-deriving\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Defining and deriving<a class=\"headerlink\" href=\"#defining-and-deriving\" title=\"Link to this heading\">#</a></h2><p>Custom error codes help communicate why a contract rejects and can be returned\nboth during initialization and during updates.</p><p>On-chain, smart contracts return a numeric error code when rejecting. This is\nalso the case when using a custom error type. Therefore, a mapping from the\ncustom error type to <code class=\"docutils literal notranslate\"><span class=\"pre\">Reject</span></code>, in the form of an implementation of\n<code class=\"docutils literal notranslate\"><span class=\"pre\">From&lt;MyError&gt;</span> <span class=\"pre\">for</span> <span class=\"pre\">Reject</span></code>, is needed. You can also derive it\nautomatically using <code class=\"docutils literal notranslate\"><span class=\"pre\">#[derive(Reject)]</span></code>:</p>"}
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
