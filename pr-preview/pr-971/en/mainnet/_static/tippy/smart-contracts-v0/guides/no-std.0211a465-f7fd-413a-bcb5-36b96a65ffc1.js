selector_to_html = {"a[href=\"#build-using-no-std\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Build using <code class=\"docutils literal notranslate\"><span class=\"pre\">no_std</span></code><a class=\"headerlink\" href=\"#build-using-no-std\" title=\"Link to this heading\">#</a></h1><p>This guide shows how to enable <code class=\"docutils literal notranslate\"><span class=\"pre\">no_std</span></code> for your rust smart contract,\npotentially reducing the size of the resulting Wasm module by several kilobytes.</p>", "a[href=\"#setting-up-the-module-for-no-std\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Setting up the module for <code class=\"docutils literal notranslate\"><span class=\"pre\">no_std</span></code><a class=\"headerlink\" href=\"#setting-up-the-module-for-no-std\" title=\"Link to this heading\">#</a></h2><p>The <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-std</span></code> library exposes a <code class=\"docutils literal notranslate\"><span class=\"pre\">std</span></code> feature, which enables the use\nof the rust standard library.\nThis feature is enabled by default.</p><p>To disable it, one must simply disable default features for the\n<code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-std</span></code> in the dependencies of your module.</p>", "a[href=\"#building-the-module\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Building the module<a class=\"headerlink\" href=\"#building-the-module\" title=\"Link to this heading\">#</a></h2><p>In order to use the nightly toolchain, add <code class=\"docutils literal notranslate\"><span class=\"pre\">+nightly</span></code> right after\n<code class=\"docutils literal notranslate\"><span class=\"pre\">cargo</span></code>:</p>", "a[href=\"#preparation\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Preparation<a class=\"headerlink\" href=\"#preparation\" title=\"Link to this heading\">#</a></h2><p>Compiling <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-std</span></code> without the <code class=\"docutils literal notranslate\"><span class=\"pre\">std</span></code> feature requires using the rust\nnightly toolchain, which can be installed using <code class=\"docutils literal notranslate\"><span class=\"pre\">rustup</span></code>:</p>"}
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
