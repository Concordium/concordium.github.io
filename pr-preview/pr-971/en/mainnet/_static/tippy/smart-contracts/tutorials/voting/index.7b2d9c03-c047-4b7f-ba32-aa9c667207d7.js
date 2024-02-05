selector_to_html = {"a[href=\"#the-voting-dapp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">The Voting dApp<a class=\"headerlink\" href=\"#the-voting-dapp\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you are going to get familiar with the deployed voting dApp on testnet. The voting dApp example is intended to show how you can use Concordium to conduct an election using the Concordium Wallet for Web to enable users to cast their vote in your election.\nYou are going to write a basic web front-end example that can read from and write to the deployed smart contract on testnet.</p><p>If you want to try this example before starting the tutorial:</p>", "a[href=\"voting-dapp.html#voting-frontend\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Setting up the front end<a class=\"headerlink\" href=\"#setting-up-the-front-end\" title=\"Link to this heading\">#</a></h1><p>In this part, you will create a web front end. Users can interact with the smart contract more easily\nusing a front end compared to interacting with the node directly.\nNon-tech users might find it inconvenient to interact with smart contracts via the Concordium node\nand some users may choose not to host their own Concordium node locally. This tutorial part shows you\na setup that eliminates the need for the user to host their own Concordium node.</p><p>You can lower the bar for entry by coding an appealing front end that provides additional information\nto your potential customers. Web front ends are a familiar sight nowadays, but to use\nthe front end, users will also need to download a web wallet as a browser extension.\nThe installation and safe usage of the Concordium Wallet for Web might be new for people using your front end.\nProviding comprehensive explanations and step-by-step guides on your website on topics\nrelated to the Concordium Wallet for Web is important for a good user experience. The Concordium Wallet for Web\nconnects via <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/HTTPS\">HTTPS</a> to a server that is connected to a Concordium node. This setup alleviates the\nneed for the user to host their own Concordium node.</p>", "a[href=\"voting-sc.html#voting-sc\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">The voting smart contract<a class=\"headerlink\" href=\"#the-voting-smart-contract\" title=\"Link to this heading\">#</a></h1><p>This is the first <a class=\"reference internal\" href=\"index.html#voting-dapp\"><span class=\"std std-ref\">part of a tutorial</span></a> on smart contract development. In this part you will focus on how to write a smart contract in the <a class=\"reference external\" href=\"https://www.rust-lang.org/\">Rust</a> programming language using the <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-std</span></code> library.</p><p>The <a class=\"reference external\" href=\"https://github.com/Concordium/concordium-rust-smart-contracts/tree/main/examples/voting\">voting smart contract</a> allows for conducting an election with several voting options. An <cite>end_time</cite> is set when the election is initialized. Only accounts are eligible to vote. Each account can change its selected voting option as often as it desires until the <cite>end_time</cite> is reached. No voting is possible after the <cite>end_time</cite>.</p>"}
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
