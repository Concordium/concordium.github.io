selector_to_html = {"a[href=\"#framer-motion\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">framer-motion<a class=\"headerlink\" href=\"#framer-motion\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#react-window\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">react-window<a class=\"headerlink\" href=\"#react-window\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#check-password-strength\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">check-password-strength<a class=\"headerlink\" href=\"#check-password-strength\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#uuid\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">uuid<a class=\"headerlink\" href=\"#uuid\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#jotai\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">jotai<a class=\"headerlink\" href=\"#jotai\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#axios\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">axios<a class=\"headerlink\" href=\"#axios\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#react-router-dom\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">react-router-dom<a class=\"headerlink\" href=\"#react-router-dom\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#scure-bip39\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">@scure/bip39<a class=\"headerlink\" href=\"#scure-bip39\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#i18next-browser-languagedetector-react-i18next\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">i18next-browser-languagedetector, react-i18next<a class=\"headerlink\" href=\"#i18next-browser-languagedetector-react-i18next\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#bw-third-party-licenses\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Concordium Wallet for Web Third Party Licenses<a class=\"headerlink\" href=\"#bw-third-party-licenses\" title=\"Link to this heading\">#</a></h1><p>The following sets forth attribution notices for third party software that may be contained in portions of the Concordium Browser Wallet product.</p>", "a[href=\"#json-bigint\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">json-bigint<a class=\"headerlink\" href=\"#json-bigint\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#react-window-infinite-loader\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">react-window-infinite-loader<a class=\"headerlink\" href=\"#react-window-infinite-loader\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#i18next\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">i18next<a class=\"headerlink\" href=\"#i18next\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#clsx\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">clsx<a class=\"headerlink\" href=\"#clsx\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#react-react-dom\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">react, react-dom<a class=\"headerlink\" href=\"#react-react-dom\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#lodash-groupby\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">lodash.groupby<a class=\"headerlink\" href=\"#lodash-groupby\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#react-hook-form\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">react-hook-form<a class=\"headerlink\" href=\"#react-hook-form\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#buffer\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">buffer<a class=\"headerlink\" href=\"#buffer\" title=\"Link to this heading\">#</a></h2>"}
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
