selector_to_html = {"a[href=\"#update-delegation-to-a-staking-pool-or-passive-delegation\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Update delegation to a staking pool or passive delegation<a class=\"headerlink\" href=\"#update-delegation-to-a-staking-pool-or-passive-delegation\" title=\"Link to this heading\">#</a></h1><p>You can change the delegation amount, target, and preferences on an account. You do not have to change all selections. For example, you might only want to change if rewards are restaked or not.</p><p>If you increase the delegation, the new amount will be applied at the start of the next <a class=\"reference internal\" href=\"../resources/glossary.html#term-Pay-day\"><span class=\"xref std std-term\">pay day</span></a>. There is one pay day approximately every 24 hours. However, if you decrease the delegation, there is a <a class=\"reference internal\" href=\"../resources/glossary.html#term-Cool-down-period\"><span class=\"xref std std-term\">cool-down period</span></a> before the new stake is applied. During this period, you cannot stop delegation or change the amount, but you can change other delegation settings. After the cool-down period, the amount you\u2019ve decreased the delegation by is returned to your disposable balance at the next pay day after the end of the cool-down period.</p>", "a[href=\"../resources/glossary.html#term-Cool-down-period\"]": "<dt id=\"term-Cool-down-period\">Cool-down period</dt><dd><p>A period of time during which a transaction is frozen. Examples of when cool-down periods apply include removing a validator and updating stake. The length of a cool-down period varies between transactions.</p></dd>", "a[href=\"../resources/glossary.html#term-Pay-day\"]": "<dt id=\"term-Pay-day\">Pay day</dt><dd><p>A pay day is the point at which new CCDs are minted and rewards to validators and delegators are distributed. The stakes of validators and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when new validators begin validation and updates to delegation and validation take effect, such as increasing stake, restaking preferences, adding delegation. In the case of decreasing stake or removing delegation or validation, there is a longer cool-down period, after which the change is executed at the <strong>next pay day after the cool-down period ends</strong>. The cool-down period is 3 weeks. Pay day is every 24 hours (i.e., 24 epochs) at approximately 09:00 UTC on Mainnet and approximately 12:00 UTC on Testnet. The list of lottery winners that are elected to be the leader for every round in that epoch is established at the beginning of the epoch.</p></dd>", "a[href=\"../resources/ccd-scan.html#ccd-scan\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">CCDScan<a class=\"headerlink\" href=\"#ccdscan\" title=\"Link to this heading\">#</a></h1><p><a class=\"reference external\" href=\"https://ccdscan.io\">CCDScan</a> is a Concordium blockchain explorer. CCDScan effectively serves as a search engine for data on the Concordium blockchain and enables users to search for, explore, and analyze relevant on-chain data. CCDScan includes functionality to scan and gain insights into Concordium blockchain data, such as:</p>"}
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
