selector_to_html = {"a[href=\"gallery/index.html#gallery\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">The gallery with ID authentication<a class=\"headerlink\" href=\"#the-gallery-with-id-authentication\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you will learn how to write a gallery which requires the user to prove something using their identity to access the images on the site.\nThe gallery consists of a basic React web front end example that displays the images and communicates with a wallet and a Rust backend that can verify the proofs given by the wallet.</p><p>In the <a class=\"reference internal\" href=\"gallery/gallery-backend.html#gallery-backend\"><span class=\"std std-ref\">first part</span></a>, you will learn how the backend works.</p>", "a[href=\"../../smart-contracts/tutorials/piggy-bank/index.html#piggy-bank\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">The piggy bank smart contract<a class=\"headerlink\" href=\"#the-piggy-bank-smart-contract\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you are going to build a simple smart contract modelling a\npiggy bank.\nIt should allow any account to insert CCD and only the owner to smash it,\ntaking all of the CCD inside.</p><p>In the <a class=\"reference internal\" href=\"../../smart-contracts/tutorials/piggy-bank/writing.html#piggy-bank-writing\"><span class=\"std std-ref\">first part</span></a>, you will learn how to write the very basic piggy bank smart\ncontract using the <a class=\"reference external\" href=\"https://www.rust-lang.org/\">Rust</a> programming language.</p>", "a[href=\"../../smart-contracts/tutorials/voting/index.html#voting-dapp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">The Voting dApp<a class=\"headerlink\" href=\"#the-voting-dapp\" title=\"Link to this heading\">#</a></h1><p>In this tutorial, you are going to get familiar with the deployed voting dApp on testnet. The voting dApp example is intended to show how you can use Concordium to conduct an election using the Concordium Wallet for Web to enable users to cast their vote in your election.\nYou are going to write a basic web front-end example that can read from and write to the deployed smart contract on testnet.</p><p>If you want to try this example before starting the tutorial:</p>", "a[href=\"create-proofs.html#create-proofs\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Create proofs<a class=\"headerlink\" href=\"#create-proofs\" title=\"Link to this heading\">#</a></h1><p>A <a class=\"reference internal\" href=\"../resources/glossary.html#term-Verifier\"><span class=\"xref std std-term\">verifier</span></a> is a business or use-case that provides a service contingent on the holder providing information about themselves using <a class=\"reference internal\" href=\"../resources/glossary.html#term-Verifiable-credential\"><span class=\"xref std std-term\">verifiable credentials</span></a> or <a class=\"reference internal\" href=\"../resources/glossary.html#term-Account-credential\"><span class=\"xref std std-term\">account credentials</span></a> they have. A verifier will typically consist of two components:</p>", "a[href=\"#dapp-examples\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">dApp examples<a class=\"headerlink\" href=\"#dapp-examples\" title=\"Link to this heading\">#</a></h1><p>Select an example to see more information about it, such as a hosted dApp for you to try, links to tutorials, repositories, and more.</p><p>Starting a new project on the Concordium blockchain? Have a look at the <a class=\"reference external\" href=\"https://github.com/Concordium/concordium-dapp-starter\">dApp starter template</a>!</p>"}
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
