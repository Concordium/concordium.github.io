selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/InterPlanetary_File_System\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ipfs-logo-1024-ice-text.png/320px-Ipfs-logo-1024-ice-text.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p>The <b>InterPlanetary File System</b> (<b>IPFS</b>) is a protocol, hypermedia and file sharing peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting IPFS hosts.</p>", "a[href^=\"https://en.wikipedia.org/wiki/InterPlanetary_File_System#\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ipfs-logo-1024-ice-text.png/320px-Ipfs-logo-1024-ice-text.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p>The <b>InterPlanetary File System</b> (<b>IPFS</b>) is a protocol, hypermedia and file sharing peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting IPFS hosts.</p>"}
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
