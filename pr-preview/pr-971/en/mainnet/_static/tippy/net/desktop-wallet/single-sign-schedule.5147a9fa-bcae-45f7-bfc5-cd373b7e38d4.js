selector_to_html = {"a[href=\"#transfer-ccd-with-a-schedule-in-desktop-wallet\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Transfer CCD with a schedule in Desktop Wallet<a class=\"headerlink\" href=\"#transfer-ccd-with-a-schedule-in-desktop-wallet\" title=\"Link to this heading\">#</a></h1><p>This topic describes how you can send CCD from an account with only one signer with a schedule. If you want to learn about sending CCD with a schedule when more co-signers are required, see <a class=\"reference internal\" href=\"../guides/multisig-transfer.html#create-multisig-scheduled\"><span class=\"std std-ref\">Create a scheduled multi-signature CCD transfer in the Desktop Wallet</span></a>.</p><p>You can create two types of release schedules: a regular interval\nschedule and an explicit schedule.</p>", "a[href=\"#option-2-create-an-explicit-schedule\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Option 2: Create an explicit schedule<a class=\"headerlink\" href=\"#option-2-create-an-explicit-schedule\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#option-1-create-a-regular-interval-schedule\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Option 1: Create a regular interval schedule<a class=\"headerlink\" href=\"#option-1-create-a-regular-interval-schedule\" title=\"Link to this heading\">#</a></h2>", "a[href=\"../guides/multisig-transfer.html#create-multisig-scheduled\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Create a scheduled transfer in the Desktop Wallet<a class=\"headerlink\" href=\"#create-a-scheduled-transfer-in-the-desktop-wallet\" title=\"Link to this heading\">#</a></h1><h2>Send CCD with a schedule<a class=\"headerlink\" href=\"#send-ccd-with-a-schedule\" title=\"Link to this heading\">#</a></h2><p>This guide describes how you create a multi-signature transfer with a schedule. For information about multi-signature transfer without a schedule, see <a class=\"reference internal\" href=\"../desktop-wallet/multisig-simple-transfer.html#create-multisig\"><span class=\"std std-ref\">Create a multi-signature CCD transfer in the Desktop Wallet</span></a>.</p>"}
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
