selector_to_html = {"a[href=\"#import-and-sign-a-proposal\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Import and sign a proposal<a class=\"headerlink\" href=\"#import-and-sign-a-proposal\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#sign-a-transaction-proposal\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Sign a transaction proposal<a class=\"headerlink\" href=\"#sign-a-transaction-proposal\" title=\"Link to this heading\">#</a></h1><p>As a co-signer on an account, you\u2019ll receive transaction proposals that you have to sign. You\u2019ll receive the proposals as files with the extension .json. Sometimes, you\u2019ll also receive a PDF file with the transaction information. You import the .json file into the Desktop Wallet and then you compare the transaction details with the contents of the PDF file. Some proposers also send a separate file with a copy of the identicon as an extra security measure.</p>"}
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
