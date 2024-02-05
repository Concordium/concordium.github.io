selector_to_html = {"a[href=\"tokens.html#tokens\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Tokens in the wallet<a class=\"headerlink\" href=\"#tokens-in-the-wallet\" title=\"Link to this heading\">#</a></h1><p>You can add, inspect, and send tokens in the Concordium Wallet for Web and Concordium Wallet for Mobile.</p>", "a[href=\"export-import.html#export-import\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Make a backup of identities, accounts, and addresses<a class=\"headerlink\" href=\"#make-a-backup-of-identities-accounts-and-addresses\" title=\"Link to this heading\">#</a></h1><p>To make sure that you have a backup of your accounts, identities, and addresses, Concordium strongly recommends that if you are using Concordium Legacy Wallet or Desktop Wallet, you export the data to a file you can store in a safe location. The backup will ensure that you can recover your accounts, identities, and addresses if your Wallet database becomes damaged or if, for some reason, you can\u2019t access the Wallet.</p>", "a[href=\"change-account-name.html#change-mw-acct-name\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Change account name<a class=\"headerlink\" href=\"#change-account-name\" title=\"Link to this heading\">#</a></h1>", "a[href=\"../browser-wallet/setup-browser-wallet.html#switch-network\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Change network<a class=\"headerlink\" href=\"#change-network\" title=\"Link to this heading\">#</a></h3><p>You can use the wallet on both Mainnet and Testnet without the need for a separate application. Use the <strong>Network Settings</strong> to switch between Mainnet and Testnet.</p>", "a[href=\"../browser-wallet/setup-browser-wallet.html#setup-browser-wallet\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Set up the Concordium Wallet for Web<a class=\"headerlink\" href=\"#set-up-the-bw\" title=\"Link to this heading\">#</a></h1><p>The Concordium Wallet for Web is a digital wallet that enables you to create and manage your Concordium\n<a class=\"reference internal\" href=\"../resources/glossary.html#term-Identity\"><span class=\"xref std std-term\">identities</span></a> and <a class=\"reference internal\" href=\"../resources/glossary.html#term-Account\"><span class=\"xref std std-term\">accounts</span></a> and to create transactions, such as sending CCD.</p><p>To learn more about identities and accounts, see <a class=\"reference internal\" href=\"../concepts/id-accounts.html#reference-id-accounts\"><span class=\"std std-ref\">identities</span></a> and <a class=\"reference internal\" href=\"../references/manage-accounts.html#managing-accounts\"><span class=\"std std-ref\">accounts</span></a>.</p>", "a[href=\"../browser-wallet/setup-browser-wallet.html#setup-bw\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Get started<a class=\"headerlink\" href=\"#get-started\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#recover-your-wallet\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Recover your Wallet<a class=\"headerlink\" href=\"#recover-your-wallet\" title=\"Link to this heading\">#</a></h1><p>In case you get a new device or need to restore your existing device, you can recover your identities, accounts, and keys with the secret recovery phrase you wrote down during wallet setup.</p>"}
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
