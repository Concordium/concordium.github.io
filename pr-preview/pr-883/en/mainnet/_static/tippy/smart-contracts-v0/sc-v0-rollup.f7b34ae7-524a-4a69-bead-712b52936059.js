selector_to_html = {"a[href=\"tutorials/piggy-bank/index.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">The piggy bank smart contract<a class=\"headerlink\" href=\"#the-piggy-bank-smart-contract\" title=\"Permalink to this headline\">#</a></h1><p>In this tutorial, you are going to build a simple smart contract modelling a\npiggy bank.\nIt should allow any account to insert CCD and only the owner to smash it,\ntaking all of the CCD inside.</p><p>In the <a class=\"reference internal\" href=\"../smart-contracts/tutorials/piggy-bank/writing.html#piggy-bank-writing\"><span class=\"std std-ref\">first part</span></a>, you will learn how to write the very basic piggy bank smart\ncontract using the <a class=\"reference external\" href=\"https://www.rust-lang.org/\">Rust</a> programming language.</p>", "a[href=\"references/index.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">References<a class=\"headerlink\" href=\"#references\" title=\"Permalink to this headline\">#</a></h1><p>A number of references exist to help you when creating and testing smart contracts.</p>", "a[href=\"guides/contract-dev-guides.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Contract development guides<a class=\"headerlink\" href=\"#contract-development-guides\" title=\"Permalink to this headline\">#</a></h1><p>The contract development guides help you get started writing smart contracts. Here you have guides to help you set up your tools, test your contract, and more.</p>", "a[href=\"guides/on-chain-index.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">On-chain guides<a class=\"headerlink\" href=\"#on-chain-guides\" title=\"Permalink to this headline\">#</a></h1><p>There are several on-chain guides to help you with smart contract actions.</p>", "a[href=\"general/introduction.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Introduction to smart contracts<a class=\"headerlink\" href=\"#introduction-to-smart-contracts\" title=\"Permalink to this headline\">#</a></h1><p>A smart contract is a user-supplied piece of code submitted to the Concordium\nblockchain, used to define behavior that is not directly part of the core\nprotocol. Smart contracts are executed by nodes in the Concordium network\naccording to predefined rules. Their execution is fully transparent, and all\nnodes must agree on what the outcome of execution is based on only publicly\navailable information.</p><p>A smart contract can receive, hold and send CCD, it is able to observe some\naspects of the chain, and maintain its own state. Smart contracts are always\nexecuted as a response to <strong>external</strong> actions, e.g., an account sending a\nmessage. In practice smart contracts will often be a small part of a larger\nsystem, combining on and off-chain functionality. An example of off-chain\nfunctionality could be a server that invokes the smart contract based on\ndata from the real-world, such as prices of stocks, or weather information.</p>"}
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
