selector_to_html = {"a[href=\"#make-a-shielded-transfer-on-an-account\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Make a shielded transfer on an account<a class=\"headerlink\" href=\"#make-a-shielded-transfer-on-an-account\" title=\"Link to this heading\">#</a></h1><p>A shielded transfer is a transfer between two accounts where the <strong>amount</strong> of the transfer is encrypted. When you make a shielded transfer, the amount you transfer is only known to you and the recipient. However, the sender, receiver, and potential memo will be publicly visible on the blockchain.</p>", "a[href=\"#prerequisites\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Prerequisites<a class=\"headerlink\" href=\"#prerequisites\" title=\"Link to this heading\">#</a></h2><p>Your transaction is now submitted to the chain. It might take a little while for it to finalize on the chain, and you can follow the status of the transaction in the log.</p>", "a[href=\"shield-ccd-wallets.html#shield-ccd-wallets\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Shield and unshield CCD on an account<a class=\"headerlink\" href=\"#shield-and-unshield-ccd-on-an-account\" title=\"Link to this heading\">#</a></h1><p>Accounts on the Concordium blockchain have two balances, the <strong>Balance</strong> and the <a class=\"reference internal\" href=\"../resources/glossary.html#term-Shielded-balance\"><span class=\"xref std std-term\">shielded balance</span></a>. You can move funds between these\ntwo balances using either a <a class=\"reference internal\" href=\"../resources/glossary.html#term-Shielding\"><span class=\"xref std std-term\">shield CCD transaction</span></a> or an <a class=\"reference internal\" href=\"../resources/glossary.html#term-Unshielding\"><span class=\"xref std std-term\">unshield CCD transaction</span></a>.</p><p>When you shield an amount on an account, only the account\u2019s credential holder can see the shielded amounts. Other participants in the network will be able to see the shielding transaction, but can\u2019t see the shielded balance or any shielded transfers going in or out of the account. You can\u2019t make shielded transfers on multi-signature accounts, only on accounts with a single credential.</p>"}
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
