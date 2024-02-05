selector_to_html = {"a[href=\"#node-crash-or-database-corruption\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Node crash or database corruption<a class=\"headerlink\" href=\"#node-crash-or-database-corruption\" title=\"Link to this heading\">#</a></h2><p>A node crash or database corruption is the problem if:</p>", "a[href=\"#troubleshoot-a-node-running-on-windows\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Troubleshoot a node running on Windows<a class=\"headerlink\" href=\"#troubleshoot-a-node-running-on-windows\" title=\"Link to this heading\">#</a></h1><p>This guide describes how to troubleshoot a node running on Windows on the Concordium network.</p>", "a[href=\"#event-viewer\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Event viewer<a class=\"headerlink\" href=\"#event-viewer\" title=\"Link to this heading\">#</a></h2><p>Use the Event viewer to get more information about the problem. In the <strong>Search</strong> bar, search for <strong>Event viewer</strong>. In the <strong>Windows Logs</strong> click <strong>Application</strong>. Use the warnings and errors to diagnose the issue.</p>"}
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
