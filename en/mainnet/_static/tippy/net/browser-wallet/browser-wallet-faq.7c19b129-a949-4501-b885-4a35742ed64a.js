selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/Decentralized_application\"]": "<p>A <b>decentralised application</b> is an application that can operate autonomously, typically through the use of smart contracts, that run on a decentralized computing, blockchain or other distributed ledger system. Like traditional applications, DApps provide some function or utility to its users. However, unlike traditional applications, DApps operate without human intervention and are not owned by any one entity, rather DApps distribute tokens that represent ownership. These tokens are distributed according to a programmed algorithm to the users of the system, diluting ownership and control of the DApp. Without any one entity controlling the system, the application is therefore decentralised.</p>", "a[href^=\"https://en.wikipedia.org/wiki/Decentralized_application#\"]": "<p>A <b>decentralised application</b> is an application that can operate autonomously, typically through the use of smart contracts, that run on a decentralized computing, blockchain or other distributed ledger system. Like traditional applications, DApps provide some function or utility to its users. However, unlike traditional applications, DApps operate without human intervention and are not owned by any one entity, rather DApps distribute tokens that represent ownership. These tokens are distributed according to a programmed algorithm to the users of the system, diluting ownership and control of the DApp. Without any one entity controlling the system, the application is therefore decentralised.</p>", "a[href=\"../resources/glossary.html#term-Identity-Provider\"]": "<dt id=\"term-Identity-Provider\">Identity Provider</dt><dd><p>A person or organization that performs off-chain identification of users. Users are required to obtain an identity object from an identity provider in order to open an account on the Concordium Platform.</p></dd>", "a[href=\"../resources/glossary.html#term-CCD\"]": "<dt id=\"term-CCD\">CCD</dt><dd><p>CCD is the currency of the Concordium blockchain. CCD can be used for multiple purposes:</p><p>The smallest subdivision of CCD is the \u00b5CCD (micro CCD), with 1 CCD = 1,000,000 \u00b5CCD. This means that CCD amounts are given with up to six decimal places of precision.</p></dd>", "a[href=\"../resources/glossary.html#term-Secret-recovery-phrase\"]": "<dt id=\"term-Secret-recovery-phrase\">Secret recovery phrase</dt><dd><p>Also known as a seed phrase, recovery phrase, mnemonic phrase, mnemonic seed, or backup phrase. A group of random words generated by the wallet that allows you to access the CCDs stored in it across devices or in case of non-functioning devices. Secret recovery phrase is supported by Concordium Wallet for Mobile.</p></dd>", "a[href=\"../resources/glossary.html#term-Private-keys\"]": "<dt id=\"term-Private-keys\">Private keys</dt><dd><p>A random, secret string that is used in cryptography and cryptocurrency to prove ownership of an account and sign transactions to send, spend, delegate, and stake CCDs. A wallet consists of a set of public addresses and private keys. Anyone can deposit cryptocurrency in a public address, but funds cannot be removed from an address without the corresponding private key.</p></dd>"}
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