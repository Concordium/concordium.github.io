selector_to_html = {"a[href=\"../guides/run-node-macos.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Run and manage a node on macOS<a class=\"headerlink\" href=\"#run-and-manage-a-node-on-macos\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how to run and manage a node on macOS. You can also run a node using <a class=\"reference internal\" href=\"../guides/run-node.html#run-a-node\"><span class=\"std std-ref\">Docker</span></a>, <a class=\"reference internal\" href=\"../guides/run-node-ubuntu.html#run-node-ubuntu\"><span class=\"std std-ref\">Ubuntu</span></a>, or <a class=\"reference internal\" href=\"../guides/run-node-windows.html#run-node-windows\"><span class=\"std std-ref\">Windows</span></a>.</p>", "a[href=\"troubleshoot-macos.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Troubleshoot a node on MacOS<a class=\"headerlink\" href=\"#troubleshoot-a-node-on-macos\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how to troubleshoot a node running on MacOS on the Concordium network.</p>"}
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
