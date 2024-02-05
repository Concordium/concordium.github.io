selector_to_html = {"a[href=\"#module-names\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Module Names<a class=\"headerlink\" href=\"#module-names\" title=\"Link to this heading\">#</a></h3><p>Module names are stored in the file <code class=\"docutils literal notranslate\"><span class=\"pre\">contracts/moduleNames.map</span></code> as JSON, and\nshould look similar to the following:</p>", "a[href=\"#contract-instance-names\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Contract Instance Names<a class=\"headerlink\" href=\"#contract-instance-names\" title=\"Link to this heading\">#</a></h3><p>Contract instance names are stored in the file <code class=\"docutils literal notranslate\"><span class=\"pre\">contracts/contractNames.map</span></code>\nas JSON, and should look similar to the following:</p>", "a[href=\"#local-settings\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Local settings<a class=\"headerlink\" href=\"#local-settings\" title=\"Link to this heading\">#</a></h1><p>Local settings for <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code> are stored in a single folder, the\nlocation of which depends on the specific operating system used:</p>", "a[href=\"#local-names\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Local Names<a class=\"headerlink\" href=\"#local-names\" title=\"Link to this heading\">#</a></h2><p><code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code> allows the user to add local aliases, or <em>names</em>, to\naccounts, contract instances, and modules in order to make referencing them\neasier.</p>", "a[href=\"#account-names\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Account Names<a class=\"headerlink\" href=\"#account-names\" title=\"Link to this heading\">#</a></h3><p>Account names are stored in the file <code class=\"docutils literal notranslate\"><span class=\"pre\">accounts/names.map</span></code> using a <em>custom</em>\nformat, and should look similar to the following:</p>"}
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
