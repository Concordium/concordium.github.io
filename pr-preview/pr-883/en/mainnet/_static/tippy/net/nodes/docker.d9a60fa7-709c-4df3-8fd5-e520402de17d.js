selector_to_html = {"a[href=\"troubleshoot-docker.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Troubleshoot a node on a server with Docker<a class=\"headerlink\" href=\"#troubleshoot-a-node-on-a-server-with-docker\" title=\"Permalink to this headline\">#</a></h1><p>This guide describes how to troubleshoot a node on the Concordium network running in Docker.</p>", "a[href=\"../guides/run-node.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Run a node with Docker<a class=\"headerlink\" href=\"#run-a-node-with-docker\" title=\"Permalink to this headline\">#</a></h1><p>In this guide, you learn how to run a node on your Linux computer that\nparticipates in the Concordium network. This means that you receive\nblocks and transactions from other nodes, as well as propagate\ninformation about blocks and transactions to the nodes in the Concordium\nnetwork. After following this guide, you will be able to</p>"}
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
