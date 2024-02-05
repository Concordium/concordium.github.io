selector_to_html = {"a[href=\"#upgrading-smart-contracts-on-concordium\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Upgrading smart contracts on Concordium<a class=\"headerlink\" href=\"#upgrading-smart-contracts-on-concordium\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you are going to get familiar with how to upgrade a smart contract natively. You will explore how to\nmigrate the smart contract state from your old contract to the upgraded contract.</p><p>An important desired feature of blockchains is that smart contracts, once deployed, are immutable by default.\nHistory has shown that development teams are looking for mutable smart contract options as well if they want to have\nthe capabilities to fix bugs, or to have the option to add additional\nfeatures to their smart contract protocol in the future.\nOther blockchain require complex <code class=\"docutils literal notranslate\"><span class=\"pre\">proxy-implementation</span></code> patterns to achieve upgradability on the by default immutable smart contracts.\nConcordium makes this process easier by exposing an upgrade mechanism to natively upgrade the smart contract.\nUpgradability is an opt-in on Concordium, meaning you can continue to write immutable contracts on Concordium if you prefer to do so.</p>", "a[href=\"../../guides/upgradeable-contract.html#guide-upgradable-contract\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Make a contract upgradeable<a class=\"headerlink\" href=\"#make-a-contract-upgradeable\" title=\"Link to this heading\">#</a></h1><p>This guide shows how to make a Rust smart contract upgradeable.</p><p>Immutable smart contracts come with the drawback that bugs cannot be fixed, new features and cost optimizations cannot be implemented.\nFor some decentralized applications this is a problem and these need some way to upgrade the smart contract code.</p>"}
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
