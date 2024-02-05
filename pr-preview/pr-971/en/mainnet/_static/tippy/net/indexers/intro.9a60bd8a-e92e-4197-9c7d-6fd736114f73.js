selector_to_html = {"a[href=\"#what-are-indexers\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">What are indexers<a class=\"headerlink\" href=\"#what-are-indexers\" title=\"Link to this heading\">#</a></h1><p>Indexers, in a broad context, play a fundamental role in organizing and optimizing data retrieval within various systems. These tools act as navigational aids, allowing efficient access to specific information by creating structured indexes. In the realm of databases and information management, indexers enhance query performance by creating a roadmap to swiftly locate data entries.</p><p>In the context of blockchain and dApps, indexers go beyond traditional databases, facilitating streamlined access to on-chain data. This includes transaction histories, smart contract states, and event logs. In the dynamic and decentralized world of blockchain, indexers contribute to the efficiency of data queries, supporting real-time updates and ensuring the seamless functionality of diverse applications and platforms.</p>"}
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
