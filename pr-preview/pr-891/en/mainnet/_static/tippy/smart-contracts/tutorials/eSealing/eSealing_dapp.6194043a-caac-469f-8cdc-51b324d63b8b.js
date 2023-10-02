selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/SHA-2\"]": "<p><b>SHA-2</b> is a set of cryptographic hash functions designed by the United States National Security Agency (NSA) and first published in 2001. They are built using the Merkle\u2013Damg\u00e5rd construction, from a one-way compression function itself built using the Davies\u2013Meyer structure from a specialized block cipher.</p>", "a[href^=\"https://en.wikipedia.org/wiki/SHA-2#\"]": "<p><b>SHA-2</b> is a set of cryptographic hash functions designed by the United States National Security Agency (NSA) and first published in 2001. They are built using the Merkle\u2013Damg\u00e5rd construction, from a one-way compression function itself built using the Davies\u2013Meyer structure from a specialized block cipher.</p>"}
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
