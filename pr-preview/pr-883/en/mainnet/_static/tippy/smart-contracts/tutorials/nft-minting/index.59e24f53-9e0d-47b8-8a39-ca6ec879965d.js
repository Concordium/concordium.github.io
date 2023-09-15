selector_to_html = {"a[href=\"build-smart-contract.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Intialize, build, and deploy the smart contract<a class=\"headerlink\" href=\"#intialize-build-and-deploy-the-smart-contract\" title=\"Permalink to this headline\">#</a></h1><p>Now you are ready to build your smart contract. You\u2019ll be using the <code class=\"docutils literal notranslate\"><span class=\"pre\">cis2-nft</span></code> contract template provided by Concordium.</p>", "a[href=\"upload-nft.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Upload the NFT<a class=\"headerlink\" href=\"#upload-the-nft\" title=\"Permalink to this headline\">#</a></h1><p>Now you need to upload your asset and give it metadata. For this tutorial you will use the InterPlanetary File System (IPFS).</p>", "a[href=\"mint-xfer.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Mint and transfer the NFT<a class=\"headerlink\" href=\"#mint-and-transfer-the-nft\" title=\"Permalink to this headline\">#</a></h1><p>Now, you are ready to call the mint function. In order to invoke mint function, you need the contract instance and you must set the owner/minter address, the metadata URL, and the token ID. Because you can mint more than one token with this instance address you need to specify the token ID. You can use either your terminal to give these parameters as inputs or you can create a JSON file and give that file as a parameter to <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code>. To make it more user-friendly, a JSON file is created in this tutorial. In your project file create a folder with any name you want. In this tutorial it is called \u201cnft-artifacts\u201d and the JSON file is called <code class=\"docutils literal notranslate\"><span class=\"pre\">nft-params.json</span></code>. You can either do it manually or with following commands.</p>"}
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
