selector_to_html = {"a[href=\"wCCD-interacting.html#wccd-interacting\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Interacting with the wCCD token protocol<a class=\"headerlink\" href=\"#interacting-with-the-wccd-token-protocol\" title=\"Link to this heading\">#</a></h1><h2>Query (non-state-mutative) functions<a class=\"headerlink\" href=\"#query-non-state-mutative-functions\" title=\"Link to this heading\">#</a></h2><p>The protocol has four query functions (<code class=\"docutils literal notranslate\"><span class=\"pre\">balanceOf</span></code>, <code class=\"docutils literal notranslate\"><span class=\"pre\">operatorOf</span></code>, <code class=\"docutils literal notranslate\"><span class=\"pre\">tokenMetadata</span></code>, and <code class=\"docutils literal notranslate\"><span class=\"pre\">supports</span></code>)\nthat you can invoke on the wCCD contract. Because the <code class=\"docutils literal notranslate\"><span class=\"pre\">schema</span></code> is already embedded,\nthe input parameters can be provided with the <code class=\"docutils literal notranslate\"><span class=\"pre\">--parameter-json</span></code> flag.</p>", "a[href=\"#contract-addresses\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Contract addresses<a class=\"headerlink\" href=\"#contract-addresses\" title=\"Link to this heading\">#</a></h2><p>The Concordium foundation maintains the canonical wCCD smart contract and promotes its\nusage to create a coherent overall smart contract ecosystem on the Concordium blockchain. The wCCD\nsmart contract deployed can be upgraded to add additional features and to improve the smart contract based on the\nnewest science and research done at Concordium. The protocol is free of charge and no commissions are collected by Concordium.</p>", "a[href=\"#understanding-the-wccd-smart-contract\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Understanding the wCCD smart contract<a class=\"headerlink\" href=\"#understanding-the-wccd-smart-contract\" title=\"Link to this heading\">#</a></h1><p>The native currency on the Concordium blockchain is CCD. When other tokens are\nbuilt on the Concordium blockchain, they often use the recommended <code class=\"docutils literal notranslate\"><span class=\"pre\">CIS-2</span></code>\ntoken standard. This has the advantage that other dApps (decentralized apps)\ncan rely on some basic rules for how to interact with the <code class=\"docutils literal notranslate\"><span class=\"pre\">CIS-2</span></code>\ntokens and on some basic rules for how the apps can retrieve events and data from the <code class=\"docutils literal notranslate\"><span class=\"pre\">CIS-2</span></code> tokens.\nThe native currency CCD has a special purpose in the Concordium\nblockchain network and does not comply with the <code class=\"docutils literal notranslate\"><span class=\"pre\">CIS-2</span></code> token standard.</p>"}
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
