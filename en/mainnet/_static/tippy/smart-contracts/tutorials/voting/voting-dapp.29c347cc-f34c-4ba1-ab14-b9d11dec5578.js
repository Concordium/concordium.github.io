selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/HTTPS\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/320px-HTTP_logo.svg.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p><b>Hypertext Transfer Protocol Secure</b> (<b>HTTPS</b>) is an extension of the Hypertext Transfer Protocol (HTTP). It uses encryption for secure communication over a computer network, and is widely used on the Internet. In HTTPS, the communication protocol is encrypted using Transport Layer Security (TLS) or, formerly, Secure Sockets Layer (SSL). The protocol is therefore also referred to as <b>HTTP over TLS</b>, or <b>HTTP over SSL</b>.</p>", "a[href^=\"https://en.wikipedia.org/wiki/HTTPS#\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/HTTP_logo.svg/320px-HTTP_logo.svg.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p><b>Hypertext Transfer Protocol Secure</b> (<b>HTTPS</b>) is an extension of the Hypertext Transfer Protocol (HTTP). It uses encryption for secure communication over a computer network, and is widely used on the Internet. In HTTPS, the communication protocol is encrypted using Transport Layer Security (TLS) or, formerly, Secure Sockets Layer (SSL). The protocol is therefore also referred to as <b>HTTP over TLS</b>, or <b>HTTP over SSL</b>.</p>"}
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
