selector_to_html = {"a[href=\"#view-function\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">View function<a class=\"headerlink\" href=\"#view-function\" title=\"Link to this heading\">#</a></h2><p>Now check the current state of the cis2-nft token contract by invoking view function. The schema file you created in the build step is important here, because <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code> uses it to deserialize the output while printing it.</p>", "a[href=\"#transfer-function\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Transfer function<a class=\"headerlink\" href=\"#transfer-function\" title=\"Link to this heading\">#</a></h2><p>Now you will transfer the token and check the balance of your account and the other wallet in the following steps.</p><p>Before you transfer the NFT, you should change the sender account and receiver account in the  <code class=\"docutils literal notranslate\"><span class=\"pre\">../nft-artifacts/transfer-params.json</span></code> file. Make sure you make the adjustments of addresses accordingly as shown below. You can create another account on your wallet to transfer this token to that.</p>", "a[href=\"#nft-view-fn\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">View function<a class=\"headerlink\" href=\"#view-function\" title=\"Link to this heading\">#</a></h2><p>Now check the current state of the cis2-nft token contract by invoking view function. The schema file you created in the build step is important here, because <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code> uses it to deserialize the output while printing it.</p>", "a[href=\"#mint-and-transfer-the-nft\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Mint and transfer the NFT<a class=\"headerlink\" href=\"#mint-and-transfer-the-nft\" title=\"Link to this heading\">#</a></h1><p>Now, you are ready to call the mint function. In order to invoke mint function, you need the contract instance and you must set the owner/minter address, the metadata URL, and the token ID. Because you can mint more than one token with this instance address you need to specify the token ID. You can use either your terminal to give these parameters as inputs or you can create a JSON file and give that file as a parameter to <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code>. To make it more user-friendly, a JSON file is created in this tutorial. In your project file create a folder with any name you want. In this tutorial it is called \u201cnft-artifacts\u201d and the JSON file is called <code class=\"docutils literal notranslate\"><span class=\"pre\">nft-params.json</span></code>. You can either do it manually or with following commands.</p>"}
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
