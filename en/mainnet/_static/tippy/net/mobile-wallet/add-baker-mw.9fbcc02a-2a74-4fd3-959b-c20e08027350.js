selector_to_html = {"a[href=\"../resources/glossary.html#term-Pay-day\"]": "<dt id=\"term-Pay-day\">Pay day</dt><dd><p>A pay day is the point at which new CCDs are minted and rewards to bakers and delegators are distributed. The stakes of bakers and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when new bakers begin baking and updates to delegation and baking take effect, such as increasing stake, restaking preferences, adding delegation. In the case of decreasing stake or removing delegation or baking, there is a longer cool-down period, after which the change is executed at the <strong>next pay day after the cool-down period ends</strong>. The cool-down period is 2 weeks for delegators and 3 weeks for bakers. Pay day is every 24 hours (i.e., 24 epochs) at approximately 09:00 UTC on Mainnet and approximately 12:00 UTC on Testnet. Bakers are finalized at the end of the epoch before that next epoch where they are eligible to bake.</p></dd>", "a[href=\"../resources/glossary.html#term-Baker-pool\"]": "<dt id=\"term-Baker-pool\">Baker pool</dt><dd><p>A baker and delegators that collectively pool their stake to participate in the consensus protocol and earn rewards. The baker runs a baker node on behalf of the baker pool to bake (and possibly finalize) blocks using the collective stake of the pool to determine its lottery power. Rewards are accrued to the pool each time the baker produces a block. Each pay day, the accrued rewards are distributed to the pool\u2019s participants in proportion to their relative stakes in the pool, with the baker (the pool owner) receiving an additional commission from the delegators\u2019 rewards.</p></dd>"}
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
