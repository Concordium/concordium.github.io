selector_to_html = {"a[href=\"../mobile-wallet-gen2/faq.html#mw-gen2-faq\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Wallet for Mobile FAQ<a class=\"headerlink\" href=\"#mw-gen2-faq\" title=\"Link to this heading\">#</a></h1>", "a[href=\"../browser-wallet/browser-wallet-faq.html#browser-wallet-faq\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Wallet for Web FAQ<a class=\"headerlink\" href=\"#bw-faq\" title=\"Link to this heading\">#</a></h1>", "a[href=\"deciding-wallet.html#choosing-wallet\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Deciding between the wallets<a class=\"headerlink\" href=\"#deciding-between-the-wallets\" title=\"Link to this heading\">#</a></h1><h2>Why you need a wallet<a class=\"headerlink\" href=\"#why-you-need-a-wallet\" title=\"Link to this heading\">#</a></h2><p>You need a <a class=\"reference internal\" href=\"../resources/glossary.html#term-Wallet\"><span class=\"xref std std-term\">wallet</span></a> to interact with the Concordium blockchain and to manage your CCD. Currently, there are four first party wallets available: the Concordium Desktop Wallet, the Concordium Wallet for Mobile, Concordium Legacy Wallet, and the Concordium Wallet for Web. This topic outlines the major differences that you should be aware of when you decide which wallet to use.</p><p>The wallets are developed by Concordium Software and can only be used to hold <a class=\"reference internal\" href=\"../resources/glossary.html#term-CCD\"><span class=\"xref std std-term\">CCD</span></a>, the native token of the Concordium blockchain. You can\u2019t use these wallets for any other cryptocurrencies.</p>", "a[href=\"#wallet-faqs\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Wallet FAQs<a class=\"headerlink\" href=\"#wallet-faqs\" title=\"Link to this heading\">#</a></h1><p>The wallet FAQs can help you decide which wallet is best for you.</p><p>Need help deciding which wallet to choose? Read <a class=\"reference internal\" href=\"deciding-wallet.html#choosing-wallet\"><span class=\"std std-ref\">Deciding between the wallets</span></a>.</p>"}
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
