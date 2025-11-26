selector_to_html = {"a[href=\"../../resources/glossary.html#term-Delegation\"]": "<dt id=\"term-Delegation\">Delegation</dt><dd><p>The act of contributing part of one\u2019s stake to a staking pool or to passive delegation.</p></dd>", "a[href=\"../../resources/glossary.html#term-Delegator\"]": "<dt id=\"term-Delegator\">Delegator</dt><dd><p>An account that contributes to a staking pool, or to passive delegation. When an account becomes a delegator, the delegated amount of CCD is locked so that it cannot be spent or transferred while it is delegated. Delegators earn rewards, minus a commission to the validator, in proportion to their delegated stake.</p><p>For delegation in an election, see <a class=\"reference internal\" href=\"#term-Vote-delegation\"><span class=\"xref std std-term\">Vote delegation</span></a>.</p></dd>", "a[href=\"../../resources/glossary.html#term-Passive-delegation\"]": "<dt id=\"term-Passive-delegation\">Passive delegation</dt><dd><p>A form of delegation where a delegator\u2019s stake is effectively distributed among all staking pools. It is not associated with a specific validator. Delegators earn lower rewards when delegating to passive delegation than when delegating to a specific staking pool. However, passive delegation is not affected by poor performance of a single validator.</p></dd>", "a[href=\"../../resources/glossary.html#term-Cool-down-period\"]": "<dt id=\"term-Cool-down-period\">Cool-down period</dt><dd><p>A period of time during which a transaction is frozen. Examples of when cool-down periods apply include removing a validator and updating stake. The length of a cool-down period varies between transactions.</p></dd>", "a[href=\"../../resources/glossary.html#term-Pay-day\"]": "<dt id=\"term-Pay-day\">Pay day</dt><dd><p>A pay day is the point at which new CCDs are minted and rewards to validators and delegators are distributed. The stakes of validators and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when new validators begin validation and updates to delegation and validation take effect, such as increasing stake, restaking preferences, and adding delegation. In the case of decreasing stake or removing delegation or validation, there is a longer cool-down period, after which the change is executed at the <strong>next pay day after the cool-down period ends</strong>. The cool-down period is 3 weeks. Pay day is every 24 hours (i.e., 24 epochs) at approximately 09:00 UTC on Mainnet and approximately 12:00 UTC on Testnet. The list of lottery winners that are elected to be the leader for every round in that epoch is established at the beginning of the epoch.</p></dd>", "a[href=\"../../resources/glossary.html#term-Proof-of-stake\"]": "<dt id=\"term-Proof-of-stake\">Proof-of-stake</dt><dd><p>A consensus mechanism where validators must stake (lock) CCD tokens to participate in block production. The chance of being selected to produce a block is proportional to the amount staked.</p></dd>", "a[href=\"../../resources/glossary.html#term-Validator\"]": "<dt id=\"term-Validator\">Validator</dt><dd><p>A node that participates in the production of <a class=\"reference internal\" href=\"#term-Block\"><span class=\"xref std std-term\">blocks</span></a>, referred to as <em>validation</em>.</p></dd>"}
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
