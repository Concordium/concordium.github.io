selector_to_html = {"a[href=\"#concordium-s-bots\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium\u2019s bots<a class=\"headerlink\" href=\"#concordium-s-bots\" title=\"Link to this heading\">#</a></h2><p>To verify that you are using the real Concordium bots configured in our channels, use this reference:</p><p>Telegram - Mainnet - @ConcordiaWeb3IDBot</p>", "a[href=\"#id1\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordia<a class=\"headerlink\" href=\"#id1\" title=\"Link to this heading\">#</a></h1><p>Concordia is an example solution built on Web3 ID. It allows you to transfer trust between Telegram and Discord. Using verifiable credentials in the Concordium Wallet for Web, you can prove ownership of accounts on Telegram and Discord. This is done by allowing users to link their accounts and, optionally, real name. You can also <code class=\"docutils literal notranslate\"><span class=\"pre\">/check</span></code> and <code class=\"docutils literal notranslate\"><span class=\"pre\">/verify</span></code> other users in Telegram and Discord. In other words, if you know John Doe in one platform, you can also trust him in the other platform using his verifiable credentials.</p><p>To issue credentials and perform verification that these are your credentials, you can use the Concordia Social media verifier. The Concordia Social media verifier performs all the steps needed for you to allow transfer of trust of your user between platforms.</p>"}
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
