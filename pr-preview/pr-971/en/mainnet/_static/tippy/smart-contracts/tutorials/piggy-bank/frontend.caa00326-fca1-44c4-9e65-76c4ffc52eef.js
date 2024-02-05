selector_to_html = {"a[href=\"../../../net/browser-wallet/connect-app.html#connect-app-bw\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Connect dApps to wallets<a class=\"headerlink\" href=\"#connect-dapps-to-wallets\" title=\"Link to this heading\">#</a></h1><p>You can connect the Concordium Wallet for Web and Concordium Wallet for Mobile to a <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/Decentralized_application\">dApp</a> that has a front end interface so that you can pay for services. You can initiate the request from within the Concordium Wallet for Web or Concordium Wallet for Mobile, or the dApp can initiate a connection request that you must confirm. Connection can be made by either scanning a QR code or from a link to the dApp service.</p>", "a[href=\"#setting-up-a-front-end\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Setting up a front end<a class=\"headerlink\" href=\"#setting-up-a-front-end\" title=\"Link to this heading\">#</a></h1><p>As an alternative to interacting with smart contracts directly,\nusers might have a better experience using a web-based application.</p><p>For the Piggybank example, such an application is available in <a class=\"reference external\" href=\"https://github.com/Concordium/concordium-dapp-piggybank/\">this repository</a>.\nThe application is able to perform contract updates on behalf of the user,\neither using the Concordium Wallet for Web or Concordium Wallet for Mobile via\n<a class=\"reference external\" href=\"https://docs.walletconnect.com/2.0/\">Wallet Connect (v2)</a>.</p>", "a[href=\"../wCCD/wCCD-front-end-set-up.html#wccd-front-end-set-up\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Setting up the front end<a class=\"headerlink\" href=\"#setting-up-the-front-end\" title=\"Link to this heading\">#</a></h1><p>In this part, you will create a web front end. Users can interact with the smart contract easier\nby using your front end compared to interacting with the node directly.\nNon-tech users might find it inconvenient to interact with smart contracts via the Concordium node\nand some users may choose not to host their own Concordium node locally. This tutorial part will show you\na setup that alleviates the need for the user to host their own Concordium node.</p><p>You can lower the bar for entry by coding an appealing front end that provides additional information\nto your potential customers. Web front ends are a familiar sight nowadays, but to use\nthe front end, users will also need to download a browser wallet as a browser extension.\nThe installation and safe usage of the browser wallet might be new for people using your front end.\nProviding comprehensive explanations and step-by-step guides on your website on topics\nrelated to the browser wallet is important for a good user experience. The browser wallet\nconnects via <a class=\"reference external\" href=\"https://en.wikipedia.org/wiki/HTTPS\">HTTPS</a> to a server that is connected to a Concordium node. This setup alleviates the\nneed for the user to host their own Concordium node.</p>"}
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
