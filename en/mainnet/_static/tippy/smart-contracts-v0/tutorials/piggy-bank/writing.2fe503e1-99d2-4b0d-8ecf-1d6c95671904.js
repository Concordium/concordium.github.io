selector_to_html = {"a[href=\"#valid-name\"]": "<dt class=\"label\" id=\"valid-name\"><span class=\"brackets\"><a class=\"fn-backref\" href=\"#id3\">1</a></span></dt><dd><p>The <strong>contract name</strong> is only allowed to consist of ASCII alphanumeric or\npunctuation characters, and is not allowed to contain the <code class=\"docutils literal notranslate\"><span class=\"pre\">.</span></code> symbol. The <strong>function name</strong> is only allowed to consist of ASCII alphanumeric or punctuation characters. The <strong>function name</strong> together with <strong>contract name</strong> must not exceed 99 characters.</p></dd>"}
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
