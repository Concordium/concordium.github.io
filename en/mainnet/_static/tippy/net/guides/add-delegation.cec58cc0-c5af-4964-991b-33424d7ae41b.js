selector_to_html = {"a[href=\"../resources/glossary.html#term-Passive-delegation\"]": "<dt id=\"term-Passive-delegation\">Passive delegation</dt><dd><p>A form of delegation where a delegator\u2019s stake is effectively distributed among all baker pools. It is not associated with a specific baker. Delegators earn lower rewards when delegating to passive delegation than when delegating to a specific baker pool. However, passive delegation is not affected by poor performance of a single baker.</p></dd>", "a[href=\"../resources/glossary.html#term-Baker-pool\"]": "<dt id=\"term-Baker-pool\">Baker pool</dt><dd><p>A baker and delegators that collectively pool their stake to participate in the consensus protocol and earn rewards. The baker runs a baker node on behalf of the baker pool to bake (and possibly finalize) blocks using the collective stake of the pool to determine its lottery power. Rewards are accrued to the pool each time the baker produces a block. Each pay day, the accrued rewards are distributed to the pool\u2019s participants in proportion to their relative stakes in the pool, with the baker (the pool owner) receiving an additional commission from the delegators\u2019 rewards.</p></dd>"}
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
