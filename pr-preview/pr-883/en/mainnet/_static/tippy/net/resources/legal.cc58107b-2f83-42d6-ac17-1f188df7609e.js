selector_to_html = {"a[href=\"terms-and-conditions-mw.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Terms and Conditions for Concordium Legacy Wallet (previously Concordium Mobile Wallet)<a class=\"headerlink\" href=\"#terms-and-conditions-for-mw-gen1-previously-concordium-mobile-wallet\" title=\"Permalink to this headline\">#</a></h1><p>Effective from September 2, 2022</p>", "a[href=\"third-party-notices.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Third-party Software and Hardware Notices<a class=\"headerlink\" href=\"#third-party-software-and-hardware-notices\" title=\"Permalink to this headline\">#</a></h1><p>Required notices for open source or other separately licensed software and hardware products or components referenced by or distributed in this product are identified in the non-exhaustive list below.</p>", "a[href=\"third-party-licenses.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Third Party Licenses<a class=\"headerlink\" href=\"#third-party-licenses\" title=\"Permalink to this headline\">#</a></h1><p>The Concordium software includes third-party components that are distributed in accordance with their licenses, set out below.</p>", "a[href=\"bw-licenses.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Wallet for Web Third Party Licenses<a class=\"headerlink\" href=\"#bw-third-party-licenses\" title=\"Permalink to this headline\">#</a></h1><p>The following sets forth attribution notices for third party software that may be contained in portions of the Concordium Browser Wallet product.</p>", "a[href=\"terms-and-conditions.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Terms and conditions<a class=\"headerlink\" href=\"#id2\" title=\"Permalink to this headline\">#</a></h1>", "a[href=\"terms-and-conditions-dw.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Terms and Conditions for Concordium Desktop Wallet<a class=\"headerlink\" href=\"#terms-and-conditions-for-concordium-desktop-wallet\" title=\"Permalink to this headline\">#</a></h1><p>Effective from August 4, 2022</p>", "a[href=\"terms-and-conditions-concordia.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">About Concordia<a class=\"headerlink\" href=\"#about-concordia\" title=\"Permalink to this headline\">#</a></h1><p>Concordia is a chat bot, currently available for Discord and Telegram, with extensions for other platforms in the future.</p><p>Concordia is able to talk to an issuer service that is able to issue proof of ownerships of your Telegram and Discord profiles. These proofs are then sent to your Con\u00f1cordium Wallet as Verified Credentials.</p>", "a[href=\"dw-licenses.html\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Desktop Wallet Third Party Licenses<a class=\"headerlink\" href=\"#concordium-desktop-wallet-third-party-licenses\" title=\"Permalink to this headline\">#</a></h1><p>The following sets forth attribution notices for third party software that may be contained in portions of the Concordium Desktop Wallet product.</p>"}
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
