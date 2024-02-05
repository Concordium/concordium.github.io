selector_to_html = {"a[href=\"#setting-up-a-smart-contract-project\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Setting up a smart contract project<a class=\"headerlink\" href=\"#setting-up-a-smart-contract-project\" title=\"Link to this heading\">#</a></h1><p>A smart contract in Rust is written as an ordinary Rust library crate.\nThe library is then compiled to Wasm using the Rust target\n<code class=\"docutils literal notranslate\"><span class=\"pre\">wasm32-unknown-unknown</span></code> and, since it is just a Rust library, you can use\n<a class=\"reference external\" href=\"https://doc.rust-lang.org/cargo/\">Cargo</a> for dependency management.</p><p>To set up a new smart contract project, first create a project directory. Inside\nthe project directory run the following in a terminal:</p>", "a[href=\"#adding-the-smart-contract-standard-library\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Adding the smart contract standard library<a class=\"headerlink\" href=\"#adding-the-smart-contract-standard-library\" title=\"Link to this heading\">#</a></h2><p>The next step is to add <code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-std</span></code> as a dependency.\nIt is a library for Rust containing procedural macros and functions for\nwriting small and efficient smart contracts.</p><p>The library is added by opening <code class=\"docutils literal notranslate\"><span class=\"pre\">Cargo.toml</span></code> and adding the line\n<code class=\"docutils literal notranslate\"><span class=\"pre\">concordium-std</span> <span class=\"pre\">=</span> <span class=\"pre\">\"*\"</span></code> (preferably, replace the <cite>*</cite> with the latest version of <a class=\"reference external\" href=\"https://docs.rs/crate/concordium-std/\">concordium-std</a>) in\nthe <code class=\"docutils literal notranslate\"><span class=\"pre\">[dependencies]</span></code> section:</p>"}
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
