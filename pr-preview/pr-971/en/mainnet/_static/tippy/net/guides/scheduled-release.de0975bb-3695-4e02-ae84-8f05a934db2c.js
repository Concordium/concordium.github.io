selector_to_html = {"a[href=\"../mobile-wallet/inspect-release-schedule-mw.html#inspect-release-schedule-mw\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Inspect a release schedule<a class=\"headerlink\" href=\"#inspect-a-release-schedule\" title=\"Link to this heading\">#</a></h1><p>By inspecting the release schedule, you can see when the releases are unlocked.</p>", "a[href=\"../desktop-wallet/single-sign-schedule.html#ccd-single-schedule-desktop\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Transfer CCD with a schedule in Desktop Wallet<a class=\"headerlink\" href=\"#transfer-ccd-with-a-schedule-in-desktop-wallet\" title=\"Link to this heading\">#</a></h1><p>This topic describes how you can send CCD from an account with only one signer with a schedule. If you want to learn about sending CCD with a schedule when more co-signers are required, see <a class=\"reference internal\" href=\"../guides/multisig-transfer.html#create-multisig-scheduled\"><span class=\"std std-ref\">Create a scheduled multi-signature CCD transfer in the Desktop Wallet</span></a>.</p><p>You can create two types of release schedules: a regular interval\nschedule and an explicit schedule.</p>", "a[href=\"#scheduled-releases\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Scheduled releases<a class=\"headerlink\" href=\"#scheduled-releases\" title=\"Link to this heading\">#</a></h1><p>Some transfers contain a release schedule. This means that the CCD in the transfer can be seen on the account, but they are locked until one or more specific points in time. While the funds are locked, they cannot be transferred, but they will be part of the total amount on the account. Scheduled releases <a class=\"reference internal\" href=\"../desktop-wallet/single-sign-schedule.html#ccd-single-schedule-desktop\"><span class=\"std std-ref\">can only be created in the Desktop Wallet</span></a>. You can inspect when funds will be released in Desktop Wallet, Concordium Wallet for Mobile, and Concordium Legacy Wallet. For information about how to do this, see <a class=\"reference internal\" href=\"../mobile-wallet/inspect-release-schedule-mw.html#inspect-release-schedule-mw\"><span class=\"std std-ref\">Inspect a release schedule</span></a>.</p>"}
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
