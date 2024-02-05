selector_to_html = {"a[href=\"../references/grpc2.html#grpc2-documentation\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">gRPC V2 documentation<a class=\"headerlink\" href=\"#grpc-v2-documentation\" title=\"Link to this heading\">#</a></h1><p>The gRPC v2 API has a much more detailed schema definition, and does not rely on JSON responses as the now deprecated gRPC v1 API did. It also supports streaming responses in cases where there is a lot of data, and supports subscribing to new blocks.</p><p>The V2 interface enables access to the same data as the now deprecated V1 interface, but in addition supports new endpoints, such as the ability to retrieve the entire smart contract state.</p>", "a[href=\"#sdks-and-apis\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">SDKs and APIs<a class=\"headerlink\" href=\"#sdks-and-apis\" title=\"Link to this heading\">#</a></h1><p>The following SDKs and APIs exist for developing on the Concordium network.</p>"}
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
