selector_to_html = {"a[href=\"#ubuntu-testnet\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Ubuntu - Testnet<a class=\"headerlink\" href=\"#ubuntu-testnet\" title=\"Link to this heading\">#</a></h2><p>Default GRPC port is set to 20001\nDefault listen port is set to 8889</p><p><a class=\"reference external\" href=\"https://distribution.testnet.concordium.com/deb/concordium-testnet-node_6.1.7-0_amd64.deb\">6.1.7</a></p>", "a[href=\"#ubuntu-mainnet\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Ubuntu - Mainnet<a class=\"headerlink\" href=\"#ubuntu-mainnet\" title=\"Link to this heading\">#</a></h2><p>Default GRPC port is set to 20000\nDefault listen port is set to 8888</p><p><a class=\"reference external\" href=\"https://distribution.mainnet.concordium.software/deb/concordium-mainnet-node_6.1.7-0_amd64.deb\">6.1.7</a></p>", "a[href=\"#previous-node-downloads\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Previous node downloads<a class=\"headerlink\" href=\"#previous-node-downloads\" title=\"Link to this heading\">#</a></h1><p>This topic contains downloads for previous node versions if you need to upgrade a node over multiple versions.</p>", "a[href=\"#windows-mainnet-and-testnet\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Windows - Mainnet and Testnet<a class=\"headerlink\" href=\"#windows-mainnet-and-testnet\" title=\"Link to this heading\">#</a></h2><p><strong>Please be aware that you should backup your configuration, as the installer will overwrite the current configuration with a standard configuration.</strong></p><p><a class=\"reference external\" href=\"https://distribution.concordium.software/windows/Signed/Node-6.1.7-0.msi\">Windows 6.1.7</a></p>", "a[href=\"#macos-mainnet-and-testnet\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">macOS - Mainnet and Testnet<a class=\"headerlink\" href=\"#macos-mainnet-and-testnet\" title=\"Link to this heading\">#</a></h2><p><a class=\"reference external\" href=\"https://distribution.concordium.software/macos/signed/concordium-node-6.1.7-1.pkg\">macOS 6.1.7</a></p><p><a class=\"reference external\" href=\"https://distribution.concordium.software/macos/signed/concordium-node-6.1.6-0.pkg\">macOS 6.1.6</a> (Testnet only)</p>"}
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
