selector_to_html = {"a[href=\"gallery-setup.html#gallery-setup\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Running the example<a class=\"headerlink\" href=\"#running-the-example\" title=\"Link to this heading\">#</a></h1><p>The front end needs the Concordium Wallet for Web for interaction. Install the extension for your browser as described <a class=\"reference internal\" href=\"../../browser-wallet/setup-browser-wallet.html#setup-browser-wallet\"><span class=\"std std-ref\">here</span></a>.</p><p>Clone this <a class=\"reference external\" href=\"https://github.com/Concordium/concordium-dapp-examples\">repository</a>.</p>", "a[href=\"#the-gallery-with-id-authentication\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">The gallery with ID authentication<a class=\"headerlink\" href=\"#the-gallery-with-id-authentication\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you will learn how to write a gallery which requires the user to prove something using their identity to access the images on the site.\nThe gallery consists of a basic React web front end example that displays the images and communicates with a wallet and a Rust backend that can verify the proofs given by the wallet.</p><p>In the <a class=\"reference internal\" href=\"gallery-backend.html#gallery-backend\"><span class=\"std std-ref\">first part</span></a>, you will learn how the backend works.</p>", "a[href=\"gallery-backend.html#gallery-backend\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Writing the verifying backend<a class=\"headerlink\" href=\"#writing-the-verifying-backend\" title=\"Link to this heading\">#</a></h1><p>The backend does the following:</p>", "a[href=\"../create-proofs.html#create-proofs\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Create proofs<a class=\"headerlink\" href=\"#create-proofs\" title=\"Link to this heading\">#</a></h1><p>A <a class=\"reference internal\" href=\"../../resources/glossary.html#term-Verifier\"><span class=\"xref std std-term\">verifier</span></a> is a business or use-case that provides a service contingent on the holder providing information about themselves using <a class=\"reference internal\" href=\"../../resources/glossary.html#term-Verifiable-credential\"><span class=\"xref std std-term\">verifiable credentials</span></a> or <a class=\"reference internal\" href=\"../../resources/glossary.html#term-Account-credential\"><span class=\"xref std std-term\">account credentials</span></a> they have. A verifier will typically consist of two components:</p>", "a[href=\"gallery-frontend.html#gallery-frontend\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Create the public front end<a class=\"headerlink\" href=\"#create-the-public-front-end\" title=\"Link to this heading\">#</a></h1><p>The front end is a simple webpage in React that can display the images of the gallery and let the user authenticate.</p><p>When the page is initially opened, it displays the items of the gallery but without the actual images.</p>"}
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
