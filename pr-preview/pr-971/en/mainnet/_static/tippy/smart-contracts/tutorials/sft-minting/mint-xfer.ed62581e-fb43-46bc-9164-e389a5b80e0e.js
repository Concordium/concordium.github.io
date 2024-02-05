selector_to_html = {"a[href=\"#mint-and-transfer-semi-fungible-token\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Mint and transfer semi-fungible token<a class=\"headerlink\" href=\"#mint-and-transfer-semi-fungible-token\" title=\"Link to this heading\">#</a></h1><p>You have a contract instance which means you have an empty state and are ready to mint some tokens! You will be using <a class=\"reference external\" href=\"https://gateway.pinata.cloud/ipfs/QmZ3939dLLFzvYZjFnkdqACe2n9TQA8Rx4efbjaYTXteeu\">this metadata</a> and minting 100 of <a class=\"reference external\" href=\"https://ipfs.io/ipfs/QmNqv1QnZw6j6N3ueqCA6VotciHUopRAvZqY8JBnheoLk6\">this cool image</a>.</p><p>Create a folder called <code class=\"docutils literal notranslate\"><span class=\"pre\">nft-artifacts</span></code> and create a JSON file called <code class=\"docutils literal notranslate\"><span class=\"pre\">mint-params.json</span></code> in the folder to execute these steps properly. In the JSON file, you are going to give the minting parameters to the MintParams which you worked on a little in the beginning.</p>", "a[href=\"#transfer-the-token\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Transfer the token<a class=\"headerlink\" href=\"#transfer-the-token\" title=\"Link to this heading\">#</a></h2><p>The final step is to send the token this account has to someone else. To do that, create another JSON file called <code class=\"docutils literal notranslate\"><span class=\"pre\">transfer.json</span></code> to give the parameters as input.</p>", "a[href=\"#view-contract-state-and-metadata\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">View contract state and metadata<a class=\"headerlink\" href=\"#view-contract-state-and-metadata\" title=\"Link to this heading\">#</a></h2><p>Now check the state of your contract. Remember this is a state-keeping machine. You will use the extracted schema file to view what is going on with your smart contract. Run the following command; you will need to know your contract index and have the schema file.</p>"}
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
