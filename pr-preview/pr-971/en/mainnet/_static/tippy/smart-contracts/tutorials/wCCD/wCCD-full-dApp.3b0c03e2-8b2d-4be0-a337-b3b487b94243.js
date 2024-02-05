selector_to_html = {"a[href=\"../../../net/browser-wallet/setup-browser-wallet.html#setup-browser-wallet\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Set up the Concordium Wallet for Web<a class=\"headerlink\" href=\"#set-up-the-bw\" title=\"Link to this heading\">#</a></h1><p>The Concordium Wallet for Web is a digital wallet that enables you to create and manage your Concordium\n<a class=\"reference internal\" href=\"../../../net/resources/glossary.html#term-Identity\"><span class=\"xref std std-term\">identities</span></a> and <a class=\"reference internal\" href=\"../../../net/resources/glossary.html#term-Account\"><span class=\"xref std std-term\">accounts</span></a> and to create transactions, such as sending CCD.</p><p>To learn more about identities and accounts, see <a class=\"reference internal\" href=\"../../../net/concepts/id-accounts.html#reference-id-accounts\"><span class=\"std std-ref\">identities</span></a> and <a class=\"reference internal\" href=\"../../../net/references/manage-accounts.html#managing-accounts\"><span class=\"std std-ref\">accounts</span></a>.</p>", "a[href=\"wCCD-front-end-set-up.html#wccd-front-end-set-up\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Setting up the front end<a class=\"headerlink\" href=\"#setting-up-the-front-end\" title=\"Link to this heading\">#</a></h1><p>In this part, you will create a web front end. Users can interact with the smart contract easier\nby using your front end compared to interacting with the node directly.\nNon-tech users might find it inconvenient to interact with smart contracts via the Concordium node\nand some users may choose not to host their own Concordium node locally. This tutorial part will show you\na setup that alleviates the need for the user to host their own Concordium node.</p><p>You can lower the bar for entry by coding an appealing front end that provides additional information\nto your potential customers. Web front ends are a familiar sight nowadays, but to use\nthe front end, users will also need to download a browser wallet as a browser extension.\nThe installation and safe usage of the browser wallet might be new for people using your front end.\nProviding comprehensive explanations and step-by-step guides on your website on topics\nrelated to the browser wallet is important for a good user experience. The browser wallet\nconnects via <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/HTTPS\">HTTPS</a> to a server that is connected to a Concordium node. This setup alleviates the\nneed for the user to host their own Concordium node.</p>", "a[href=\"#running-your-first-full-dapp\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Running your first full dApp<a class=\"headerlink\" href=\"#running-your-first-full-dapp\" title=\"Link to this heading\">#</a></h1><p>You are running your own local dApp now. If you want, you can compare it with our\n<a class=\"reference external\" href=\"https://wccd.testnet.concordium.com/\">testnet wCCD dApp</a> hosted on testnet or <a class=\"reference external\" href=\"https://wccd.mainnet.concordium.software/\">mainnet wCCD dApp</a> hosted on mainnet. You can use your Concordium Wallet for Web\nto connect to the dApp.</p>"}
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
