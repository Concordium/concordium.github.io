selector_to_html = {"a[href=\"local-settings.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Local settings<a class=\"headerlink\" href=\"#local-settings\" title=\"Permalink to this headline\">#</a></h1><p>Local settings for <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code> are stored in a single folder, the\nlocation of which depends on the specific operating system used:</p>", "a[href=\"simulate-context.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Simulation contexts<a class=\"headerlink\" href=\"#simulation-contexts\" title=\"Permalink to this headline\">#</a></h1><p>This is a reference of how the init- and receive-context is specified as JSON,\nwhen <a class=\"reference internal\" href=\"../guides/local-simulate.html#local-simulate-v0\"><span class=\"std std-ref\">simulating contract functions locally</span></a>.</p>", "a[href=\"host-fns.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Contract host functions<a class=\"headerlink\" href=\"#contract-host-functions\" title=\"Permalink to this headline\">#</a></h1><p>This is a reference of the functions in the <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium</span></code> module supplied by a\nhost running smart contract Wasm module.</p>", "a[href=\"references-on-chain.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">References on-chain<a class=\"headerlink\" href=\"#references-on-chain\" title=\"Permalink to this headline\">#</a></h1><p>This is a reference of how modules and contract instances are referenced\n<em>on-chain</em>.</p>", "a[href=\"schema-json.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Schema JSON representation<a class=\"headerlink\" href=\"#schema-json-representation\" title=\"Permalink to this headline\">#</a></h1><p>This is a reference of how bytes, such as the contract state and parameters can\nbe represented as JSON together with a <code class=\"docutils literal notranslate\"><span class=\"pre\">SchemaType</span></code>.</p>"}
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
