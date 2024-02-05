selector_to_html = {"a[href=\"gallery-setup.html#gallery-setup\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Running the example<a class=\"headerlink\" href=\"#running-the-example\" title=\"Link to this heading\">#</a></h1><p>The front end needs the Concordium Wallet for Web for interaction. Install the extension for your browser as described <a class=\"reference internal\" href=\"../../browser-wallet/setup-browser-wallet.html#setup-browser-wallet\"><span class=\"std std-ref\">here</span></a>.</p><p>Clone this <a class=\"reference external\" href=\"https://github.com/Concordium/concordium-dapp-examples\">repository</a>.</p>", "a[href=\"#create-the-public-front-end\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Create the public front end<a class=\"headerlink\" href=\"#create-the-public-front-end\" title=\"Link to this heading\">#</a></h1><p>The front end is a simple webpage in React that can display the images of the gallery and let the user authenticate.</p><p>When the page is initially opened, it displays the items of the gallery but without the actual images.</p>"}
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
