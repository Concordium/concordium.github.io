selector_to_html = {"a[href=\"#create-and-export-a-file-with-credentials\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Create and export a file with credentials<a class=\"headerlink\" href=\"#create-and-export-a-file-with-credentials\" title=\"Link to this heading\">#</a></h2><p>The creator of the account now has to import the file and add the credentials to the account. See <a class=\"reference internal\" href=\"../guides/multi-credentials.html#multi-credentials\"><span class=\"std std-ref\">Add credentials to an account</span></a>.</p>", "a[href=\"../resources/glossary.html#term-Credential\"]": "<dt id=\"term-Credential\">Credential</dt><dd><p>See <a class=\"reference internal\" href=\"#term-Account-credential\"><span class=\"xref std std-term\">account credential</span></a>.</p></dd>", "a[href=\"../guides/multi-credentials.html#multi-credentials\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Add credentials to an account<a class=\"headerlink\" href=\"#add-credentials-to-an-account\" title=\"Link to this heading\">#</a></h1><h2>Add more credentials on an account<a class=\"headerlink\" href=\"#add-more-credentials-on-an-account\" title=\"Link to this heading\">#</a></h2><p>This guide describes how you add more credentials to an account, and how you <a class=\"reference internal\" href=\"#guide-change-signature\"><span class=\"std std-ref\">change the signature threshold for transactions</span></a> on the account. For more information about the process of sharing an account, see <a class=\"reference internal\" href=\"../guides/overview-shared-accounts.html#overview-shared-accounts\"><span class=\"std std-ref\">Overview of shared accounts with multiple credentials</span></a>.</p>", "a[href=\"#create-a-credentials-file\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Create a credentials file<a class=\"headerlink\" href=\"#create-a-credentials-file\" title=\"Link to this heading\">#</a></h1><p>This topic describes how you create and export a file with <a class=\"reference internal\" href=\"../resources/glossary.html#term-Credential\"><span class=\"xref std std-term\">credentials</span></a>. For information about adding more credentials to an account, see <a class=\"reference internal\" href=\"../guides/multi-credentials.html#multi-credentials\"><span class=\"std std-ref\">Add credentials to an account</span></a>.</p>"}
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
