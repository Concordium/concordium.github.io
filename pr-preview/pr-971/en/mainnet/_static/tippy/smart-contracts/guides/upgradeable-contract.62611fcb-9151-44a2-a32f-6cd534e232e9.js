selector_to_html = {"a[href=\"#owner-can-upgrade\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Owner can upgrade<a class=\"headerlink\" href=\"#owner-can-upgrade\" title=\"Link to this heading\">#</a></h2><p>The code below will add an <code class=\"docutils literal notranslate\"><span class=\"pre\">upgrade</span></code> endpoint to a smart contract, which allows the smart contract owner to trigger a smart contract upgrade.\nThe parameter for this endpoint takes the new module reference and optionally a name of an entrypoint with parameter to invoke in the upgraded smart contract instance.</p><p>Providing the optional entrypoint can be used for triggering a migration function in the new module.\nThis has the benefit of being in the same transaction as the upgrade itself, making the transaction revert the upgrade if the migration fails.</p>", "a[href=\"../general/contract-instances.html#contract-instance-upgradeability\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Upgradeability<a class=\"headerlink\" href=\"#upgradeability\" title=\"Link to this heading\">#</a></h2><p>A V1 smart contract instance can choose to upgrade its module to a new V1 smart contract\nmodule using the <strong>upgrade</strong> host function.\nThe host function takes a reference to a deployed smart contract module to use for\nthe upgraded instance and can only be called from a receive function.\nThe host function returns whether the upgrade succeeded, allowing the instance\nto decide the next step. If the upgrade is successful any new invocations of the\nupgraded instance uses the smart contract code in the new module.</p>", "a[href=\"interact-instance.html#interact-instance-json-parameters\"]": "<h3 class=\"tippy-header\" style=\"margin-top: 0;\">Passing parameters in JSON format<a class=\"headerlink\" href=\"#passing-parameters-in-json-format\" title=\"Link to this heading\">#</a></h3><p>A parameter in JSON format can be passed if a <a class=\"reference internal\" href=\"../general/contract-schema.html#contract-schema\"><span class=\"std std-ref\">smart contract schema</span></a> is supplied, either as a file or embedded in the module.\nThe schema is used to serialize the JSON into binary.</p>", "a[href=\"#make-a-contract-upgradeable\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Make a contract upgradeable<a class=\"headerlink\" href=\"#make-a-contract-upgradeable\" title=\"Link to this heading\">#</a></h1><p>This guide shows how to make a Rust smart contract upgradeable.</p><p>Immutable smart contracts come with the drawback that bugs cannot be fixed, new features and cost optimizations cannot be implemented.\nFor some decentralized applications this is a problem and these need some way to upgrade the smart contract code.</p>"}
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
