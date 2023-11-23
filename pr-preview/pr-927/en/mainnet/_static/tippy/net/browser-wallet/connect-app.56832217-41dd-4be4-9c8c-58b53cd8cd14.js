selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/Decentralized_application\"]": "<p>A <b>decentralised application</b> is an application that can operate autonomously, typically through the use of smart contracts, that run on a decentralized computing, blockchain or other distributed ledger system. Like traditional applications, DApps provide some function or utility to its users. However, unlike traditional applications, DApps operate without human intervention and are not owned by any one entity, rather DApps distribute tokens that represent ownership. These tokens are distributed according to a programmed algorithm to the users of the system, diluting ownership and control of the DApp. Without any one entity controlling the system, the application is therefore decentralised.</p>", "a[href^=\"https://en.wikipedia.org/wiki/Decentralized_application#\"]": "<p>A <b>decentralised application</b> is an application that can operate autonomously, typically through the use of smart contracts, that run on a decentralized computing, blockchain or other distributed ledger system. Like traditional applications, DApps provide some function or utility to its users. However, unlike traditional applications, DApps operate without human intervention and are not owned by any one entity, rather DApps distribute tokens that represent ownership. These tokens are distributed according to a programmed algorithm to the users of the system, diluting ownership and control of the DApp. Without any one entity controlling the system, the application is therefore decentralised.</p>"}
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
