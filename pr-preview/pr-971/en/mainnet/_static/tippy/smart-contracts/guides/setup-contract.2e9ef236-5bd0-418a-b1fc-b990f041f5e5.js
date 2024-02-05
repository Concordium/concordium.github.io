selector_to_html = {"a[href=\"#set-up-a-smart-contract-project\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Set up a smart contract project<a class=\"headerlink\" href=\"#set-up-a-smart-contract-project\" title=\"Link to this heading\">#</a></h1><p>This guide documents two different options (<em>from a template</em> or <em>from scratch</em>) to create a new Concordium smart contract project.\nThe <em>from a template</em> option is available for <code class=\"docutils literal notranslate\"><span class=\"pre\">cargo-concordium</span></code> version 2.2.0 or greater. It provides you with some\nsmart contract templates. Choose the template that best fits your project scope.\nThe <em>from scratch</em> option guides you through the process when you want to start a new project without any boilerplate code.</p>", "a[href=\"no-std.html#no-std\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Build using <code class=\"docutils literal notranslate\"><span class=\"pre\">no_std</span></code><a class=\"headerlink\" href=\"#build-using-no-std\" title=\"Link to this heading\">#</a></h1><p>This guide shows how to enable <code class=\"docutils literal notranslate\"><span class=\"pre\">no_std</span></code> for your rust smart contract,\npotentially reducing the size of the resulting Wasm module by several kilobytes.</p>"}
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
