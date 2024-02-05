selector_to_html = {"a[href=\"#deploy-the-smart-contract\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Deploy the smart contract<a class=\"headerlink\" href=\"#deploy-the-smart-contract\" title=\"Link to this heading\">#</a></h2><p>Now, deploy your contract with the following command.</p>", "a[href=\"#initialize-the-smart-contract\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Initialize the smart contract<a class=\"headerlink\" href=\"#initialize-the-smart-contract\" title=\"Link to this heading\">#</a></h2><p>Maybe you\u2019re wondering why you need to create an instance of the contract. When you create a new instance of a new contract, as mentioned earlier, you simply create a new one with a refreshed state. The account that creates the instance is the owner. There might be cases when you want to call some functions with only the owner of the contract, and some publicly open for everyone.</p><p>Run the following command to initialize your smart contract.</p>", "a[href=\"#smart-contract-modifications\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Smart contract modifications<a class=\"headerlink\" href=\"#smart-contract-modifications\" title=\"Link to this heading\">#</a></h1><p>You are using the example contract from Concordium\u2019s examples and it\u2019s ready to use. If you want to use it as is you can do it for your project. But in this tutorial you will add a couple of things and update some functions to give more flexibility.</p><p>First, you will add a new struct called <code class=\"docutils literal notranslate\"><span class=\"pre\">TokenMetadata</span></code>. It needs to implement the <code class=\"docutils literal notranslate\"><span class=\"pre\">Serialize</span></code> and <code class=\"docutils literal notranslate\"><span class=\"pre\">SchemaType</span></code> traits for the sake of deserialization of the contract you need it. For those who are familiar with the Ethereum ecosystem it\u2019s like the ABI.</p>", "a[href=\"../nft-minting/mint-xfer.html#nft-view-fn\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">View function<a class=\"headerlink\" href=\"#view-function\" title=\"Link to this heading\">#</a></h2><p>Now check the current state of the cis2-nft token contract by invoking view function. The schema file you created in the build step is important here, because <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-client</span></code> uses it to deserialize the output while printing it.</p>", "a[href=\"#build-the-contract-module\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Build the contract module<a class=\"headerlink\" href=\"#build-the-contract-module\" title=\"Link to this heading\">#</a></h2><p>Make sure you are working in the correct directory, and create a <code class=\"docutils literal notranslate\"><span class=\"pre\">dist</span></code> folder for your files: schema and smart contract compiled into Wasm. One small reminder here, remember CIS-2 is a standard that allows you to mint fungible, non-fungible and semi-fungible tokens. Concordium\u2019s token standard is applicable to all types of tokens. Once you have created the folder, run the following command.</p>"}
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
