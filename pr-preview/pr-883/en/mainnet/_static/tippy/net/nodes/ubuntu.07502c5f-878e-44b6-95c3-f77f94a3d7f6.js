selector_to_html = {"a[href=\"../guides/run-node-ubuntu.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Run a node on a server with Ubuntu on Mainnet<a class=\"headerlink\" href=\"#run-a-node-on-a-server-with-ubuntu-on-mainnet\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how organizations can run a node on the Concordium network from a server and how to set up the node to run as a <a class=\"reference internal\" href=\"#baker-node-ubuntu\"><span class=\"std std-ref\">baker node</span></a>.</p><p>You can also watch the video to learn how to run a node with Ubuntu.</p>", "a[href=\"run-node-ubuntu.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Run a node on a server with Ubuntu on Testnet<a class=\"headerlink\" href=\"#run-a-node-on-a-server-with-ubuntu-on-testnet\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how organizations can run a node on the Concordium network from a server and how to set up the node to run as a <a class=\"reference internal\" href=\"../guides/run-node-ubuntu.html#baker-node-ubuntu\"><span class=\"std std-ref\">baker node</span></a>.</p><p>You can also watch the video to learn how to run a node with Ubuntu.</p>", "a[href=\"troubleshoot-ubuntu.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Troubleshoot a node on a server with Ubuntu<a class=\"headerlink\" href=\"#troubleshoot-a-node-on-a-server-with-ubuntu\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how to troubleshoot a node on the Concordium network from a server with Ubuntu.</p>"}
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
