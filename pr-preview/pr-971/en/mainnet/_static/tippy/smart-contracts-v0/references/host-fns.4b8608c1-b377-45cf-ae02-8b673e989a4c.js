selector_to_html = {"a[href=\"#contract-host-functions\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Contract host functions<a class=\"headerlink\" href=\"#contract-host-functions\" title=\"Link to this heading\">#</a></h1><p>This is a reference of the functions in the <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium</span></code> module supplied by a\nhost running smart contract Wasm module.</p>", "a[href=\"#only-in-init-function\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Only in init function<a class=\"headerlink\" href=\"#only-in-init-function\" title=\"Link to this heading\">#</a></h2><p>Functions only accessible for smart contract init functions. If called from\na receive function execution will abort.</p>", "a[href=\"#only-in-receive-function\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Only in receive function<a class=\"headerlink\" href=\"#only-in-receive-function\" title=\"Link to this heading\">#</a></h2><p>Functions only accessible for smart contract receive functions.</p>", "a[href=\"#function-parameter\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Function parameter<a class=\"headerlink\" href=\"#function-parameter\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#identity-data\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Identity data<a class=\"headerlink\" href=\"#identity-data\" title=\"Link to this heading\">#</a></h2><p>Functions for reading identity information.</p>", "a[href=\"#action-description\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Action description<a class=\"headerlink\" href=\"#action-description\" title=\"Link to this heading\">#</a></h3><p>The description of actions to execute on the chain, returned by smart contract\nreceive function.</p>", "a[href=\"#logging-events\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Logging events<a class=\"headerlink\" href=\"#logging-events\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#smart-contract-instance-state\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Smart contract instance state<a class=\"headerlink\" href=\"#smart-contract-instance-state\" title=\"Link to this heading\">#</a></h2>", "a[href=\"#chain-data\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Chain data<a class=\"headerlink\" href=\"#chain-data\" title=\"Link to this heading\">#</a></h2><p>Functions for reading information about the chain.</p>"}
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
