selector_to_html = {"a[href=\"#troubleshoot-a-node-on-macos\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Troubleshoot a node on MacOS<a class=\"headerlink\" href=\"#troubleshoot-a-node-on-macos\" title=\"Link to this heading\">#</a></h1><p>This guide describes how to troubleshoot a node running on MacOS on the Concordium network.</p>", "a[href=\"#node-crash-or-database-corruption\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Node crash or database corruption<a class=\"headerlink\" href=\"#node-crash-or-database-corruption\" title=\"Link to this heading\">#</a></h2><p>A node crash or database corruption is the problem if:</p>", "a[href=\"#service-cannot-run-after-editing-service-config-file\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Service cannot run after editing service (config) file<a class=\"headerlink\" href=\"#service-cannot-run-after-editing-service-config-file\" title=\"Link to this heading\">#</a></h2><p>When configuring your node to be a validator on Mac, you need to edit the service file (which is owned by root). One way to edit it is to change the ownership to your user and then edit it. But then you cannot run the service.</p><p>To see if this is your problem, try to load the service manually:</p>"}
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
