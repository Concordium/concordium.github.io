selector_to_html = {"a[href=\"../resources/glossary.html#term-Quorum-certificate\"]": "<dt id=\"term-Quorum-certificate\">Quorum certificate</dt><dd><p>When the members of the finalization committee finalize the block, their collective signatures are aggregated to form a quorum certificate. This quorum certificate is then included in the next block. If the leader fails to produce a block in the <a class=\"reference internal\" href=\"#term-Round\"><span class=\"xref std std-term\">round</span></a>, or not enough signatures were gathered for a quorum certificate, then the finalizers will instead send timeout messages, which are aggregated to form a <a class=\"reference internal\" href=\"#term-Timeout-certificate\"><span class=\"xref std std-term\">timeout certificate</span></a>. Each block either contains a quorum certificate or a timeout certificate for the previous round. A block always contains a quorum certificate as it serves as a reference to the parent block. The block might contain a timeout certificate if the previous round timed out. A quorum certificate or a timeout certificate ensures that the protocol progresses. When a node sees a valid quorum certificate or timeout certificate it progresses to the next round.</p></dd>", "a[href=\"../resources/glossary.html#term-Pay-day\"]": "<dt id=\"term-Pay-day\">Pay day</dt><dd><p>A pay day is the point at which new CCDs are minted and rewards to bakers and delegators are distributed. The stakes of bakers and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when new bakers begin baking and updates to delegation and baking take effect, such as increasing stake, restaking preferences, adding delegation. In the case of decreasing stake or removing delegation or baking, there is a longer cool-down period, after which the change is executed at the <strong>next pay day after the cool-down period ends</strong>. The cool-down period is 2 weeks for delegators and 3 weeks for bakers. Pay day is every 24 hours (i.e., 24 epochs) at approximately 09:00 UTC on Mainnet and approximately 12:00 UTC on Testnet. Bakers are finalized at the end of the epoch before that next epoch where they are eligible to bake.</p></dd>"}
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
