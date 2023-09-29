selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/Trie\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Trie_example.svg/320px-Trie_example.svg.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p>In computer science, a <b>trie</b>, also called <b>digital tree</b> or <b>prefix tree</b>, is a type of <span><i>k</i>-ary</span> search tree, a tree data structure used for locating specific keys from within a set. These keys are most often strings, with links between nodes defined not by the entire key, but by individual characters. In order to access a key, the trie is traversed depth-first, following the links between nodes, which represent each character in the key.</p>", "a[href^=\"https://en.wikipedia.org/wiki/Trie#\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Trie_example.svg/320px-Trie_example.svg.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p>In computer science, a <b>trie</b>, also called <b>digital tree</b> or <b>prefix tree</b>, is a type of <span><i>k</i>-ary</span> search tree, a tree data structure used for locating specific keys from within a set. These keys are most often strings, with links between nodes defined not by the entire key, but by individual characters. In order to access a key, the trie is traversed depth-first, following the links between nodes, which represent each character in the key.</p>", "a[href=\"#serialize\"]": "<dt class=\"label\" id=\"serialize\"><span class=\"brackets\">1</span><span class=\"fn-backref\">(<a href=\"#id2\">1</a>,<a href=\"#id4\">2</a>)</span></dt><dd><p>If the state contains one or more of the types <a class=\"reference external\" href=\"https://docs.rs/concordium-std/latest/concordium_std/struct.StateBox.html\"><code class=\"docutils literal notranslate\"><span class=\"pre\">StateBox</span></code></a>,\n<a class=\"reference external\" href=\"https://docs.rs/concordium-std/latest/concordium_std/struct.StateMap.html\"><code class=\"docutils literal notranslate\"><span class=\"pre\">StateMap</span></code></a>, or <a class=\"reference external\" href=\"https://docs.rs/concordium-std/latest/concordium_std/struct.StateSet.html\"><code class=\"docutils literal notranslate\"><span class=\"pre\">StateSet</span></code></a>, it should implement <code class=\"docutils literal notranslate\"><span class=\"pre\">Serial</span></code>\nand <code class=\"docutils literal notranslate\"><span class=\"pre\">DeserialWithState</span></code> instead. The difference is the\ndeserialization, where <code class=\"docutils literal notranslate\"><span class=\"pre\">Serialize</span></code> is a combination of the\ntraits <code class=\"docutils literal notranslate\"><span class=\"pre\">Serial</span></code> and <code class=\"docutils literal notranslate\"><span class=\"pre\">Deserial</span></code>.\n<code class=\"docutils literal notranslate\"><span class=\"pre\">State*</span></code> types are essentially pointers to data stored in\nstate, and when serialized, only the pointer is written, while\nthe values are stored in the state. To load\nthe values again, the state context is needed, hence the <code class=\"docutils literal notranslate\"><span class=\"pre\">DeserialWithState</span></code>.</p></dd>"}
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
