selector_to_html = {"a[href=\"#automatic-updates\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Automatic updates<a class=\"headerlink\" href=\"#automatic-updates\" title=\"Link to this heading\">#</a></h2><p>The Desktop Wallet notifies you when an update is available, and you then have the following options:</p>", "a[href=\"#manually-updating\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Manually updating<a class=\"headerlink\" href=\"#manually-updating\" title=\"Link to this heading\">#</a></h2><p>To manually update the desktop wallet, go to the <a class=\"reference internal\" href=\"../installation/downloads.html#downloads-desktop-wallet\"><span class=\"std std-ref\">downloads page</span></a> and download the latest version.</p>", "a[href=\"../installation/downloads.html#downloads-desktop-wallet\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Desktop Wallet<a class=\"headerlink\" href=\"#concordium-desktop-wallet\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#update-the-desktop-wallet\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Update the Desktop Wallet<a class=\"headerlink\" href=\"#update-the-desktop-wallet\" title=\"Link to this heading\">#</a></h1><p>The Desktop Wallet installs updates automatically on <strong>MacOS</strong>, <strong>Windows</strong>, and <strong>Linux</strong> (though only for the AppImage distribution).</p>"}
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
