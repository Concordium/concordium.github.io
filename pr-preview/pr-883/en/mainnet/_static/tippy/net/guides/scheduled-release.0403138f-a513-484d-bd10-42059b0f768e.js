selector_to_html = {"a[href=\"../desktop-wallet/single-sign-schedule.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Transfer CCD with a schedule in Desktop Wallet<a class=\"headerlink\" href=\"#transfer-ccd-with-a-schedule-in-desktop-wallet\" title=\"Permalink to this headline\">#</a></h1><p>This topic describes how you can send CCD from an account with only one signer with a schedule. If you want to learn about sending CCD with a schedule when more co-signers are required, see <a class=\"reference internal\" href=\"../guides/multisig-transfer.html#create-multisig-scheduled\"><span class=\"std std-ref\">Create a scheduled multi-signature CCD transfer in the Desktop Wallet</span></a>.</p><p>You can create two types of release schedules: a regular interval\nschedule and an explicit schedule.</p>", "a[href=\"../mobile-wallet/inspect-release-schedule-mw.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Inspect a release schedule<a class=\"headerlink\" href=\"#inspect-a-release-schedule\" title=\"Permalink to this headline\">#</a></h1><p>By inspecting the release schedule, you can see when the releases are unlocked.</p>"}
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
