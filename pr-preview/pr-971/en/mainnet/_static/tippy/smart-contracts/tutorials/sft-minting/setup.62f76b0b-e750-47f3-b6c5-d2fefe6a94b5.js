selector_to_html = {"a[href=\"#setup-the-development-environment\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Setup the development environment<a class=\"headerlink\" href=\"#setup-the-development-environment\" title=\"Link to this heading\">#</a></h1><p>If you have done the NFT minting tutorial, you will already have most of the necessary setup, including the Concordium Wallet for Web and necessary tools for authoring smart contracts. Otherwise, see <a class=\"reference internal\" href=\"../setup-env.html#setup-env\"><span class=\"std std-ref\">Set up the development environment</span></a>. You need the following tools:</p>", "a[href=\"build-smart-contract.html#build-sft-sc\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Smart contract modifications<a class=\"headerlink\" href=\"#smart-contract-modifications\" title=\"Link to this heading\">#</a></h1><p>You are using the example contract from Concordium\u2019s examples and it\u2019s ready to use. If you want to use it as is you can do it for your project. But in this tutorial you will add a couple of things and update some functions to give more flexibility.</p><p>First, you will add a new struct called <code class=\"docutils literal notranslate\"><span class=\"pre\">TokenMetadata</span></code>. It needs to implement the <code class=\"docutils literal notranslate\"><span class=\"pre\">Serialize</span></code> and <code class=\"docutils literal notranslate\"><span class=\"pre\">SchemaType</span></code> traits for the sake of deserialization of the contract you need it. For those who are familiar with the Ethereum ecosystem it\u2019s like the ABI.</p>", "a[href=\"../setup-env.html#setup-env\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Setup the development environment<a class=\"headerlink\" href=\"#setup-the-development-environment\" title=\"Link to this heading\">#</a></h1><p>Before starting the smart contract tutorials, you must prepare your development environment by installing a number of tools.</p>"}
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
