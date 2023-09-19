selector_to_html = {"a[href=\"../resources/glossary.html#term-Pay-day\"]": "<dt id=\"term-Pay-day\">Pay day</dt><dd><p>A pay day is the point at which new CCDs are minted and rewards to bakers and delegators are distributed. The stakes of bakers and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when new bakers begin baking and updates to delegation and baking take effect, such as increasing stake, restaking preferences, adding delegation. In the case of decreasing stake or removing delegation or baking, there is a longer cool-down period, after which the change is executed at the <strong>next pay day after the cool-down period ends</strong>. The cool-down period is 2 weeks for delegators and 3 weeks for bakers. Pay day is every 24 hours (i.e., 24 epochs) at approximately 08:05 UTC on Mainnet and approximately 12:00 UTC on Testnet. Bakers are finalized at the end of the epoch before that next epoch where they are eligible to bake.</p></dd>", "a[href=\"../resources/glossary.html#term-Winning-probability\"]": "<dt id=\"term-Winning-probability\">Winning probability</dt><dd><p>The winning probability is the probability that a baker wins in a given round. The probability is <span class=\"math notranslate nohighlight\">\\(\\alpha\\)</span>, which equals the baker\u2019s relative stake.</p></dd>", "a[href=\"../resources/glossary.html#term-Private-keys\"]": "<dt id=\"term-Private-keys\">Private keys</dt><dd><p>A random, secret string that is used in cryptography and cryptocurrency to prove ownership of an account and sign transactions to send, spend, delegate, and stake CCDs. A wallet consists of a set of public addresses and private keys. Anyone can deposit cryptocurrency in a public address, but funds cannot be removed from an address without the corresponding private key.</p></dd>", "a[href=\"../resources/glossary.html#term-Cool-down-period\"]": "<dt id=\"term-Cool-down-period\">Cool-down period</dt><dd><p>A period of time during which a transaction is frozen. Examples of when cool-down periods apply include removing a baker and updating stake. The length of a cool-down period varies between transactions.</p></dd>", "a[href=\"../resources/glossary.html#term-Finalization\"]": "<dt id=\"term-Finalization\">Finalization</dt><dd><p>The process by which a block is marked to be \u201cfinalized\u201d, i.e. part of the authoritative <a class=\"reference internal\" href=\"#term-Chain\"><span class=\"xref std std-term\">chain</span></a>. Transactions that are part of finalized blocks are considered authoritative. New blocks can be only added following the last finalized block. The finalization process is conducted by the bakers with a staked amount of at least 0.1% of the <a class=\"reference internal\" href=\"#term-Total-effective-stake\"><span class=\"xref std std-term\">total effective stake</span></a> in baker pools, known as the Finalization committee. Total effective stake in baker pools does not include passive delegation and any amount that exceeds the <a class=\"reference internal\" href=\"../concepts/concepts-delegation.html#delegation-caps\"><span class=\"std std-ref\">baker pool bounding caps</span></a>. Finalization has to happen for each round otherwise the blockchain cannot proceed to the next round.</p></dd>"}
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
