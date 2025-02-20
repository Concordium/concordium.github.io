selector_to_html = {"a[href=\"../resources/glossary.html#term-Decryption-share\"]": "<dt id=\"term-Decryption-share\">Decryption share</dt><dd><p>A guardian\u2019s partial share of a ballot decryption or tally decryption for an election.</p></dd>", "a[href=\"../resources/glossary.html#term-Tally-phase\"]": "<dt id=\"term-Tally-phase\">Tally phase</dt><dd><p>Time period after the election where voting is closed and guardians decrypt their share of the tally (tally ceremony is held) and the final election result is produced and registered.</p></dd>", "a[href=\"../resources/glossary.html#term-Election-phase\"]": "<dt id=\"term-Election-phase\">Election phase</dt><dd><p>Time period during the election when voting is open, either directly or via delegation.</p></dd>", "a[href=\"../resources/glossary.html#term-Guardian\"]": "<dt id=\"term-Guardian\">Guardian</dt><dd><p>One of a number of independent, trustworthy individuals who serve guardians in the election. All guardians must participate in a key ceremony to create a key to encrypt the election and may participate in the accompanying tally ceremony(s) to decrypt the tally(s). A guardian is available if they are available for the tally ceremony. A guardian is missing if they cannot attend the tally ceremony.</p></dd>", "a[href=\"../resources/glossary.html#term-Tally\"]": "<dt id=\"term-Tally\">Tally</dt><dd><p>Tally (noun) is the number of votes obtained by every candidate computed by summing all weighted votes for every candidate. Also, tally (verb) is the process of calculating the number of votes.</p></dd>", "a[href=\"../resources/glossary.html#term-Setup-phase\"]": "<dt id=\"term-Setup-phase\">Setup phase</dt><dd><p>Time period prior to election start where setup of necessary election components occurs, candidates are nominated, guardians are selected, etc.</p></dd>"}
skip_classes = ["headerlink", "sd-stretched-link"]

window.onload = function () {
    for (const [select, tip_html] of Object.entries(selector_to_html)) {
        const links = document.querySelectorAll(`article.bd-article ${select}`);
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
