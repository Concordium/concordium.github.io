selector_to_html = {"a[href=\"#an-esealing-dapp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">An eSealing dApp<a class=\"headerlink\" href=\"#an-esealing-dapp\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you are going to get familiar with the deployed eSealing smart contract on testnet and explore the associated website.</p>", "a[href=\"#what-is-file-sealing-what-is-timestamping\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">What is file sealing? What is timestamping?<a class=\"headerlink\" href=\"#what-is-file-sealing-what-is-timestamping\" title=\"Link to this heading\">#</a></h2><p>Seals are used to protect items that should not be tampered with.\nYou can prove an item\u2019s origin and integrity after it has been timestamped\non the blockchain. Timestamping is a blockchain-based verification and\nfraud protection process that assures the authenticity of a document.\nIf you seal and timestamp a file, you can prove that it was in your possession\nat the sealing time and the file has not been changed since then.</p>"}
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
