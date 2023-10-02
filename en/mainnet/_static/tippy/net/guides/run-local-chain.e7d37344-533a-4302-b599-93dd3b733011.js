selector_to_html = {"a[href=\"../resources/glossary.html#term-Genesis-Block\"]": "<dt id=\"term-Genesis-Block\">Genesis Block</dt><dd><p>The first <a class=\"reference internal\" href=\"#term-Block\"><span class=\"xref std std-term\">block</span></a> in a <a class=\"reference internal\" href=\"#term-Chain\"><span class=\"xref std std-term\">chain</span></a>. The genesis block establishes the starting state of the chain, before any transactions have occurred.</p></dd>", "a[href=\"../resources/glossary.html#term-Testnet\"]": "<dt id=\"term-Testnet\">Testnet</dt><dd><p>A test network run by Concordium to test its protocols and software. There can be several test networks in existence at the same time. All the features are tested on the testnet before they are released on the <a class=\"reference internal\" href=\"#term-Mainnet\"><span class=\"xref std std-term\">mainnet</span></a>.</p></dd>", "a[href=\"../resources/glossary.html#term-Mainnet\"]": "<dt id=\"term-Mainnet\">Mainnet</dt><dd><p>The main Concordium network which is expected to launch in early 2021. The mainnet will receive periodic upgrades, but in contrast to the <a class=\"reference internal\" href=\"#term-Testnet\"><span class=\"xref std std-term\">testnet</span></a>, it will never be reset, and accounts created on the mainnet will remain indefinitely.</p></dd>"}
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
