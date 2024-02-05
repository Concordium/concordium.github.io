selector_to_html = {"a[href=\"#configure-a-node-as-a-validator\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Configure a node as a validator<a class=\"headerlink\" href=\"#configure-a-node-as-a-validator\" title=\"Link to this heading\">#</a></h2><p>Once you have generated validator keys, you then need to move the generated validator keys file to a location accessible by the node, and finally specify this location in the service file for the Concordium Node.</p>", "a[href=\"../concepts/concepts-baker.html#baker-concept\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Validators<a class=\"headerlink\" href=\"#validators\" title=\"Link to this heading\">#</a></h1><p>Validation is key to the Concordium blockchain. A <a class=\"reference internal\" href=\"../resources/glossary.html#term-Node\"><span class=\"xref std std-term\">node</span></a> is a validator node when it participates actively in the network by creating new <a class=\"reference internal\" href=\"../resources/glossary.html#term-Block\"><span class=\"xref std std-term\">blocks</span></a> that are added to the chain. The blockchain consists of multiple <a class=\"reference internal\" href=\"../resources/glossary.html#term-Validator\"><span class=\"xref std std-term\">validator</span></a> nodes. A <a class=\"reference internal\" href=\"../resources/glossary.html#term-Validator\"><span class=\"xref std std-term\">validator</span></a> collects, orders, and validates the <a class=\"reference internal\" href=\"../resources/glossary.html#term-Transaction\"><span class=\"xref std std-term\">transactions</span></a> that are included in a block to maintain the integrity of the blockchain. The validators sign each block that they produce so that the block can be verified and executed by the other validators in the network.</p>", "a[href=\"#run-a-validator-node-on-macos\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Run a validator node on macOS<a class=\"headerlink\" href=\"#run-a-validator-node-on-macos\" title=\"Link to this heading\">#</a></h1><p>This guide describes how to set up the node to run as a <a class=\"reference internal\" href=\"../concepts/concepts-baker.html#baker-concept\"><span class=\"std std-ref\">validator</span></a> node on a macOS node that participates in the Concordium network. A node receives blocks and transactions from other nodes and propagates information about blocks and transactions to the nodes in the Concordium network. In addition, a validator node also participates in the lottery and produces its own blocks.</p>", "a[href=\"#prerequisites\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Prerequisites<a class=\"headerlink\" href=\"#prerequisites\" title=\"Link to this heading\">#</a></h2>", "a[href=\"../guides/run-node-macos.html#run-node-macos\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Run and manage a node on macOS<a class=\"headerlink\" href=\"#run-and-manage-a-node-on-macos\" title=\"Link to this heading\">#</a></h1><p>This guide describes how to run and manage a node on macOS. You can also run a node using <a class=\"reference internal\" href=\"../guides/run-node.html#run-a-node\"><span class=\"std std-ref\">Docker</span></a>, <a class=\"reference internal\" href=\"../guides/run-node-ubuntu.html#run-node-ubuntu\"><span class=\"std std-ref\">Ubuntu</span></a>, or <a class=\"reference internal\" href=\"../guides/run-node-windows.html#run-node-windows\"><span class=\"std std-ref\">Windows</span></a>.</p>"}
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
