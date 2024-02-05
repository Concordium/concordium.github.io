selector_to_html = {"a[href=\"#fallback-entrypoints\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Fallback entrypoints<a class=\"headerlink\" href=\"#fallback-entrypoints\" title=\"Link to this heading\">#</a></h1><p>This guide explains how to use fallback entrypoints, which can be useful\nwhen creating a proxy for your smart contract.</p>", "a[href=\"#using-fallback-entrypoints\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Using fallback entrypoints<a class=\"headerlink\" href=\"#using-fallback-entrypoints\" title=\"Link to this heading\">#</a></h2><p>You can create fallback entrypoints by making a new entrypoint and adding\nthe <code class=\"docutils literal notranslate\"><span class=\"pre\">fallback</span></code> attribute to it:</p>", "a[href=\"#preparation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Preparation<a class=\"headerlink\" href=\"#preparation\" title=\"Link to this heading\">#</a></h2><p>Make sure you have the Rust source code for a smart contract module you wish to\nadd a fallback entrypoint to.\nYou also need to have the following installed:</p>", "a[href=\"setup-tools.html#setup-tools\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Install tools for development<a class=\"headerlink\" href=\"#install-tools-for-development\" title=\"Link to this heading\">#</a></h1><p>Before you can start developing smart contracts, you need to setup the\nenvironment.</p><p>You can also watch a video about installing the smart contract tools.</p>", "a[href=\"#what-are-fallback-entrypoints\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">What are fallback entrypoints<a class=\"headerlink\" href=\"#what-are-fallback-entrypoints\" title=\"Link to this heading\">#</a></h2><p>A fallback entrypoint is a special kind of entrypoint for a contract.\nIf defined for a given contract, it acts as a catchall for handling invocations\nof entrypoints that do not exist in the contract.</p><p>Consider the contract <code class=\"docutils literal notranslate\"><span class=\"pre\">A</span></code>, which has two entrypoints, <code class=\"docutils literal notranslate\"><span class=\"pre\">foo</span></code> and a fallback\nentrypoint.\nIf you invoke <code class=\"docutils literal notranslate\"><span class=\"pre\">foo</span></code> on <code class=\"docutils literal notranslate\"><span class=\"pre\">A</span></code>, <code class=\"docutils literal notranslate\"><span class=\"pre\">foo</span></code> is simply invoked.\nBut if you invoke <em>any other</em> entrypoint, for example <code class=\"docutils literal notranslate\"><span class=\"pre\">bar</span></code>, then the fallback\nentrypoint is invoked.\nThe fallback entrypoint will then have access to the parameter, amount, and,\nnotably, the name of the entrypoint you attempted to invoke (<code class=\"docutils literal notranslate\"><span class=\"pre\">bar</span></code>).</p>"}
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
