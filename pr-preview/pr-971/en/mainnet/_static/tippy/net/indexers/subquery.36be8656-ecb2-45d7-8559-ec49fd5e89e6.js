selector_to_html = {"a[href=\"#getting-started\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Getting Started<a class=\"headerlink\" href=\"#getting-started\" title=\"Link to this heading\">#</a></h2><p>Take a look at this SubQuery Starter Project that introduces SubQuery\u2019s Concordium support by indexing <a class=\"reference external\" href=\"https://github.com/subquery/concordium-subql-starter/tree/main/Concordium/concordium-testnet-starter\">Concordium</a>.</p><p>You can also follow this <a class=\"reference external\" href=\"https://academy.subquery.network/quickstart/quickstart.html\">step-by-step guide</a> to get familiar with SubQuery.</p>", "a[href=\"#subquery\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">SubQuery<a class=\"headerlink\" href=\"#subquery\" title=\"Link to this heading\">#</a></h1><p>SubQuery is a leading blockchain data indexer that provides developers with fast, flexible, universal, open-source, and decentralized APIs for web3 projects. SubQuery SDK allows developers to get rich indexed data and build intuitive and immersive decentralized applications in a faster and more efficient way. SubQuery supports 100+ ecosystems including Concordium, Ethereum, Polygon, Polkadot, Algorand, NEAR, and Avalanche.</p><p>Another of SubQuery\u2019s competitive advantages is the ability to aggregate data not only within a chain but across multiple blockchains all within a single project. This allows the creation of feature-rich dashboard analytics and multi-chain block scanners.</p>", "a[href=\"#running-and-hosting-your-concordium-subquery-apis\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Running and Hosting your Concordium SubQuery APIs<a class=\"headerlink\" href=\"#running-and-hosting-your-concordium-subquery-apis\" title=\"Link to this heading\">#</a></h2><p>SubQuery is open-source, meaning you have the freedom to run it in the following three ways:</p>"}
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
