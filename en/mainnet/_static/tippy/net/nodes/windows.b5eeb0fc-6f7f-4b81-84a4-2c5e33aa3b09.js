selector_to_html = {"a[href=\"troubleshoot-windows.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Troubleshoot a node running on Windows<a class=\"headerlink\" href=\"#troubleshoot-a-node-running-on-windows\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how to troubleshoot a node running on Windows on the Concordium network.</p>", "a[href=\"../guides/run-node-windows.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Run and manage a node on Windows<a class=\"headerlink\" href=\"#run-and-manage-a-node-on-windows\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how you can run and manage a node on the Concordium network from a Windows computer. You can also run a node using <a class=\"reference internal\" href=\"../guides/run-node.html#run-a-node\"><span class=\"std std-ref\">Docker</span></a>, <a class=\"reference internal\" href=\"../guides/run-node-ubuntu.html#run-node-ubuntu\"><span class=\"std std-ref\">Ubuntu</span></a>, or <a class=\"reference internal\" href=\"../guides/run-node-macos.html#run-node-macos\"><span class=\"std std-ref\">macOS</span></a>.</p><p>If you want to run a baker node on Windows, see <a class=\"reference internal\" href=\"../guides/baker-windows.html#baker-windows\"><span class=\"std std-ref\">Configure a node on Windows as baker</span></a>.</p>", "a[href=\"node-runner-service-configuration.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Windows node runner service configuration<a class=\"headerlink\" href=\"#concordium-windows-node-runner-service-configuration\" title=\"Permalink to this headline\">#</a></h1><p>You can change the mainnet or testnet node configuration with the Configure Concordium Node Service. The Concordium Node Runner Service (\u201cservice\u201d for short) is configured using a TOML file. This file is typically located at <code class=\"docutils literal notranslate\"><span class=\"pre\">C:\\ProgramData\\Concordium\\Node</span> <span class=\"pre\">Runner\\nodes.toml.</span></code> (The path on your system is determined by the <code class=\"docutils literal notranslate\"><span class=\"pre\">Config</span></code> value in the registry key <code class=\"docutils literal notranslate\"><span class=\"pre\">HKEY_LOCAL_MACHINE\\SOFTWARE\\Concordium\\Node</span> <span class=\"pre\">Runner</span></code>.)</p><p>To run the app, search for <em>configure concordium node</em> in the <strong>Search</strong> bar, and then select <strong>Configure Concordium Node Service</strong>. If you see a message saying <em>Do you want to allow this app to make changes to your device?</em>, select <strong>Yes</strong>. The configuration file opens in Notepad or your default editor.</p>"}
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
