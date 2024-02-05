selector_to_html = {"a[href=\"#reset-desktop-wallet-data\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Reset desktop wallet data<a class=\"headerlink\" href=\"#reset-desktop-wallet-data\" title=\"Link to this heading\">#</a></h1><p>All the local data of the desktop wallet is stored in a database in the user\u2019s applications data folder.</p><p>The desktop wallet does not remove your user data when it is uninstalled; this avoids users losing their data, and simplifies the update process for the application.</p>", "a[href=\"../guides/export-import.html#export-import\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Make a backup of identities, accounts, and addresses<a class=\"headerlink\" href=\"#make-a-backup-of-identities-accounts-and-addresses\" title=\"Link to this heading\">#</a></h1><p>To make sure that you have a backup of your accounts, identities, and addresses, Concordium strongly recommends that if you are using Concordium Legacy Wallet or Desktop Wallet, you export the data to a file you can store in a safe location. The backup will ensure that you can recover your accounts, identities, and addresses if your Wallet database becomes damaged or if, for some reason, you can\u2019t access the Wallet.</p>", "a[href=\"#delete-the-user-data\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Delete the user data<a class=\"headerlink\" href=\"#delete-the-user-data\" title=\"Link to this heading\">#</a></h2><p>Delete the following folder containing all the user data of the wallet:</p>"}
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
