selector_to_html = {"a[href=\"#update-your-passcode-and-biometric-settings\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Update your passcode and biometric settings<a class=\"headerlink\" href=\"#update-your-passcode-and-biometric-settings\" title=\"Link to this heading\">#</a></h1><p>If you want to change your passcode or enable/disable your biometrics (on a mobile device), following the directions below for your wallet.</p>"}
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
