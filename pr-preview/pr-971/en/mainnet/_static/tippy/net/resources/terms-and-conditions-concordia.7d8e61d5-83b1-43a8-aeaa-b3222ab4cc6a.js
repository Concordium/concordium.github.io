selector_to_html = {"a[href=\"#privacy-policy\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Privacy policy<a class=\"headerlink\" href=\"#privacy-policy\" title=\"Link to this heading\">#</a></h2><p>When using this service you agree and accept that certain data will be made public and at the same time this data will be collected by Concordium Software ApS in order to deliver the service.</p><p>When you instruct the service to verify you are the owner of a Telegram or Discord profile, the service will register and store your Telegram or Discord handle as well as your user ID.</p>", "a[href=\"#right-to-deletion\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Right to deletion<a class=\"headerlink\" href=\"#right-to-deletion\" title=\"Link to this heading\">#</a></h2><p>Should you wish to be removed from the service you can invalidate your proof by clicking the \u201cRemove Verification?\u201d link on the Site. This will allow you to authenticate with your original Telegram and Discord verified credentials stored in your Concordium Wallet and complete your deletion.</p>", "a[href=\"#about-concordia\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">About Concordia<a class=\"headerlink\" href=\"#about-concordia\" title=\"Link to this heading\">#</a></h1><p>Concordia is a chat bot, currently available for Discord and Telegram, with extensions for other platforms in the future.</p><p>Concordia is able to talk to an issuer service that is able to issue proof of ownerships of your Telegram and Discord profiles. These proofs are then sent to your Con\u00f1cordium Wallet as Verified Credentials.</p>", "a[href=\"#revision-of-policy\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Revision of Policy<a class=\"headerlink\" href=\"#revision-of-policy\" title=\"Link to this heading\">#</a></h2><p>This privacy policy may be revised and reissued at any time. Any changes will be effective immediately upon our posting of the revised Privacy Policy. For the avoidance of doubt, your continued use of the Site indicates your consent to the revised Privacy Policy.</p><p>If you have any question in regards to this Privacy Policy please contact: <a class=\"reference external\" href=\"mailto:support%40concordium.software\">support<span>@</span>concordium<span>.</span>software</a>.</p>", "a[href=\"#terms-of-service\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Terms of service<a class=\"headerlink\" href=\"#terms-of-service\" title=\"Link to this heading\">#</a></h2><p>The Concordia bot and the services issuing verified credentials and verifying Telegram and Discord users are provided by Concordium Software ApS free of charge on an AS-IS basis. The services are designed to showcase in a simple way how the Web3 ID infrastructure may be utilized.</p><p>Any new features or references to tools and functionality that are added to the Site shall also be subject to these Terms. Any part of these terms may be updated, changed, or replaced by posting updates and/or changes to the Site, <a class=\"reference external\" href=\"https://concordia.mainnet.concordium.software/\">https://concordia.mainnet.concordium.software/</a>. You can review the most current version of the Terms at any time on this page. Your continued use of or access to the Site following the posting of any changes constitutes acceptance of those changes.</p>"}
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
