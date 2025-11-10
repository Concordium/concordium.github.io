selector_to_html = {"a[href=\"../resources/glossary.html#term-Accumulated-weight\"]": "<dt id=\"term-Accumulated-weight\">Accumulated weight</dt><dd><p>The weight of a vote is the weight assigned to that vote when tallying, i.e., the sum of all account weights that delegated to the account that cast the vote + the weight of the account that cast the vote (unless that account delegated its own weight to another account, but voted anyway).</p></dd>", "a[href=\"../resources/glossary.html#term-Guardian\"]": "<dt id=\"term-Guardian\">Guardian</dt><dd><p>One of a number of independent, trustworthy individuals who serve guardians in the election. All guardians must participate in a key ceremony to create a key to encrypt the election and may participate in the accompanying tally ceremony(s) to decrypt the tally(s). A guardian is available if they are available for the tally ceremony. A guardian is missing if they cannot attend the tally ceremony.</p></dd>", "a[href=\"../resources/glossary.html#term-Decryption-share\"]": "<dt id=\"term-Decryption-share\">Decryption share</dt><dd><p>A partial decryption by a single guardian that will contribute to the full decryption.</p></dd>", "a[href=\"../resources/glossary.html#term-Account-weight\"]": "<dt id=\"term-Account-weight\">Account weight</dt><dd><p>The account weight of an account in an election is computed as the average amount of CCD on the account during the designated calculation period.</p></dd>", "a[href=\"../resources/glossary.html#term-Election-phase\"]": "<dt id=\"term-Election-phase\">Election phase</dt><dd><p>Time period during the election when voting is open, either directly or via delegation.</p></dd>", "a[href=\"../resources/glossary.html#term-Candidate\"]": "<dt id=\"term-Candidate\">Candidate</dt><dd><p>Option on the official list of candidates for the election.</p></dd>", "a[href=\"../resources/glossary.html#term-Approval-voting\"]": "<dt id=\"term-Approval-voting\">Approval voting</dt><dd><p>Approval voting is a single-winner electoral system in which the voter can choose or approve any number of candidates, effectively assigning a 0 or a 1 to every candidate. The winner is the single candidate approved by the largest number of voters. Approval voting can be achieved by setting the selection limit to the total number of options in a contest.</p></dd>", "a[href=\"../resources/glossary.html#term-Tally-phase\"]": "<dt id=\"term-Tally-phase\">Tally phase</dt><dd><p>Time period after the election where voting is closed and guardians decrypt their share of the tally (tally ceremony is held) and the final election result is produced and registered.</p></dd>"}
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
