selector_to_html = {"a[href=\"#backup-and-recovery\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Backup and recovery<a class=\"headerlink\" href=\"#backup-and-recovery\" title=\"Link to this heading\">#</a></h1><p>It can be necessary to recover your wallet, for example if you get a new computer or mobile device. It is important to know how you can recover your wallet on a device if necessary. There are differences between what the wallets require for recovery.</p>"}
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
