selector_to_html = {"a[href=\"https://en.wikipedia.org/wiki/InterPlanetary_File_System\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ipfs-logo-1024-ice-text.png/320px-Ipfs-logo-1024-ice-text.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p>The <b>InterPlanetary File System</b> (<b>IPFS</b>) is a protocol, hypermedia and file sharing peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting IPFS hosts.</p>", "a[href^=\"https://en.wikipedia.org/wiki/InterPlanetary_File_System#\"]": "<img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Ipfs-logo-1024-ice-text.png/320px-Ipfs-logo-1024-ice-text.png\" alt=\"Wikipedia thumbnail\" style=\"float:left; margin-right:10px;\"><p>The <b>InterPlanetary File System</b> (<b>IPFS</b>) is a protocol, hypermedia and file sharing peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting IPFS hosts.</p>", "a[href=\"#upload-the-nft\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Upload the NFT<a class=\"headerlink\" href=\"#upload-the-nft\" title=\"Link to this heading\">#</a></h1><p>Now you need to upload your asset and give it metadata. For this tutorial you will use the InterPlanetary File System (IPFS).</p>", "a[href=\"#assign-nft-metadata\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Assign NFT Metadata<a class=\"headerlink\" href=\"#assign-nft-metadata\" title=\"Link to this heading\">#</a></h2><p>The CID of your asset is unique in the IPFS storage, and when you put that value in your metadata file, the buyer will always be able to check it using the URL and compare it to what you have and what IPFS shows.</p><p>The Concordium CIS-2 standard allows the creation of your NFT metadata in the following format, and you can find more details in the <a class=\"reference external\" href=\"https://proposals.concordium.software/CIS/cis-2.html#example-token-metadata-non-fungible\">Concordium CIS-2 token standard</a>. For the sake of the minting process, you have to follow the same formatted .json file, but as you can see, you are also allowed to add additional attributes to the metadata file, or remove them.</p>", "a[href=\"#using-interplanetary-file-system-ipfs\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Using InterPlanetary File System (IPFS)<a class=\"headerlink\" href=\"#using-interplanetary-file-system-ipfs\" title=\"Link to this heading\">#</a></h2><p>There are multiple ways of storing data in IPFS. You can do it from a user interface by running a node or you can use a pinning service. For this tutorial, you will download and run the IPFS and store the both NFT metadata and image itself. <a class=\"reference external\" href=\"https://docs.ipfs.tech/install/\">Click here to download and install IPFS</a>.</p>", "a[href=\"build-smart-contract.html#build-smart-contract\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Initialize, build, and deploy the smart contract<a class=\"headerlink\" href=\"#initialize-build-and-deploy-the-smart-contract\" title=\"Link to this heading\">#</a></h1><p>Now you are ready to build your smart contract. You\u2019ll be using the <code class=\"docutils literal notranslate\"><span class=\"pre\">cis2-nft</span></code> contract template provided by Concordium.</p>"}
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
