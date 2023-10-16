selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/The_DAO_(organization)\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Christoph_Jentzsch.jpg/320px-Christoph_Jentzsch.jpg\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p><b>The DAO</b> was a digital decentralized autonomous organization and a form of investor-directed venture capital fund. After launching in April 2016 via a token sale, it became one of the largest crowdfunding campaigns in history.</p>", "a[href^=\"https://en.wikipedia.org/wiki/The_DAO_(organization)#\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Christoph_Jentzsch.jpg/320px-Christoph_Jentzsch.jpg\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p><b>The DAO</b> was a digital decentralized autonomous organization and a form of investor-directed venture capital fund. After launching in April 2016 via a token sale, it became one of the largest crowdfunding campaigns in history.</p>"}
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
