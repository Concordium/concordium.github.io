selector_to_html = {"a[href=\"#node-crash-or-database-corruption\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Node crash or database corruption<a class=\"headerlink\" href=\"#node-crash-or-database-corruption\" title=\"Link to this heading\">#</a></h2><p>A node crash or database corruption is the problem if:</p>", "a[href=\"#database-invariant-violation-error\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Database invariant violation error<a class=\"headerlink\" href=\"#database-invariant-violation-error\" title=\"Link to this heading\">#</a></h2><p>This error occurs due to the node running out of memory during the protocol update, which is more memory intensive than normal operation.</p><p>Your node state directory should look something like this:</p>", "a[href=\"#troubleshoot-a-node-on-a-server-with-docker\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Troubleshoot a node on a server with Docker<a class=\"headerlink\" href=\"#troubleshoot-a-node-on-a-server-with-docker\" title=\"Link to this heading\">#</a></h1><p>This guide describes how to troubleshoot a node on the Concordium network running in Docker.</p>"}
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
