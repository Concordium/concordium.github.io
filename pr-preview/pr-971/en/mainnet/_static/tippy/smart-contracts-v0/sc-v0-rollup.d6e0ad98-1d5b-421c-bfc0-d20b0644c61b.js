selector_to_html = {"a[href=\"#v0-smart-contracts\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">V0 Smart Contracts<a class=\"headerlink\" href=\"#v0-smart-contracts\" title=\"Link to this heading\">#</a></h1><p>V0 smart contracts can still be used on the Concordium blockchain, however, there is no development on tooling for v0 smart contracts and the smart contract libraries Concordium provides do not support v0 smart contracts.</p>"}
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
