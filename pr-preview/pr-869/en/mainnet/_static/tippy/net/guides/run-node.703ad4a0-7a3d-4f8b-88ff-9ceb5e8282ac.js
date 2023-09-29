selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/Security-Enhanced_Linux\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/SELinux_logo.svg/320px-SELinux_logo.svg.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p><b>Security-Enhanced Linux</b> (<b>SELinux</b>) is a Linux kernel security module that provides a mechanism for supporting access control security policies, including mandatory access controls (MAC).</p>", "a[href^=\"https://en.wikipedia.org/wiki/Security-Enhanced_Linux#\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/SELinux_logo.svg/320px-SELinux_logo.svg.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p><b>Security-Enhanced Linux</b> (<b>SELinux</b>) is a Linux kernel security module that provides a mechanism for supporting access control security policies, including mandatory access controls (MAC).</p>"}
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
