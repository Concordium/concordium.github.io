selector_to_html = {"a[href=\"../resources/glossary.html#term-Validator\"]": "<dt id=\"term-Validator\">Validator</dt><dd><p>A node that participates in the production of <a class=\"reference internal\" href=\"#term-Block\"><span class=\"xref std std-term\">blocks</span></a>, referred to as <em>validation</em>.</p></dd>", "a[href=\"../resources/glossary.html#term-Staking-pool\"]": "<dt id=\"term-Staking-pool\">Staking pool</dt><dd><p>A validator and delegators that collectively pool their stake to participate in the consensus protocol and earn rewards. The validator runs a validator node on behalf of the staking pool to produce blocks using the collective stake of the pool to determine its lottery power. Rewards are accrued to the pool each time the validator produces a block. Each pay day, the accrued rewards are distributed to the pool\u2019s participants in proportion to their relative stakes in the pool, with the validator (the pool owner) receiving an additional commission from the delegators\u2019 rewards.</p></dd>", "a[href=\"../resources/glossary.html#term-Passive-delegation\"]": "<dt id=\"term-Passive-delegation\">Passive delegation</dt><dd><p>A form of delegation where a delegator\u2019s stake is effectively distributed among all staking pools. It is not associated with a specific validator. Delegators earn lower rewards when delegating to passive delegation than when delegating to a specific staking pool. However, passive delegation is not affected by poor performance of a single validator.</p></dd>", "a[href=\"../resources/glossary.html#term-Block\"]": "<dt id=\"term-Block\">Block</dt><dd><p>The basic unit of the blockchain, which is produced by a <a class=\"reference internal\" href=\"#term-Validator\"><span class=\"xref std std-term\">validator</span></a>. A block contains a (possibly empty) list of <a class=\"reference internal\" href=\"#term-Transaction\"><span class=\"xref std std-term\">transactions</span></a>, and has a pointer to a previous block (with the exception of the <a class=\"reference internal\" href=\"#term-Genesis-Block\"><span class=\"xref std std-term\">genesis block</span></a>). A block and its predecessors form a chain, and the sequence of transactions they contain form a ledger. Each block records when it was produced. A block also contains information relating to consensus, for instance establishing which validator created the block, and that the validator was entitled to do so.</p></dd>", "a[href=\"../resources/glossary.html#term-Proof-of-stake\"]": "<dt id=\"term-Proof-of-stake\">Proof-of-stake</dt><dd><p>A consensus mechanism where validators must stake (lock) CCD tokens to participate in block production. The chance of being selected to produce a block is proportional to the amount staked.</p></dd>", "a[href=\"../resources/glossary.html#term-proof-of-work\"]": "<dt id=\"term-proof-of-work\">proof-of-work</dt><dd><p>A consensus mechanism where validators (miners) compete to solve complex cryptographic puzzles that require significant computational power. The first to solve the puzzle earns the right to produce the next block and receive the associated rewards.</p></dd>", "a[href=\"../resources/glossary.html#term-Node\"]": "<dt id=\"term-Node\">Node</dt><dd><p>A participant in the Concordium network. Nodes receive blocks and transactions, and track the current state of the blockchain. A validator node has cryptographic keys that enable it to take part in validation. A node without these keys is referred to as a <em>passive node</em>.</p></dd>"}
skip_classes = ["headerlink", "sd-stretched-link"]

window.onload = function () {
    for (const [select, tip_html] of Object.entries(selector_to_html)) {
        const links = document.querySelectorAll(`article.bd-article ${select}`);
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
