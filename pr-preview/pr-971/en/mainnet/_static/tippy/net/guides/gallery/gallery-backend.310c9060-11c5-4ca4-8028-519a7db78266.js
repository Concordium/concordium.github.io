selector_to_html = {"a[href=\"#verify-proof\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Verify Proof<a class=\"headerlink\" href=\"#verify-proof\" title=\"Link to this heading\">#</a></h2><p>When the user wants to obtain a token they must send in a proof that can be verified. This endpoint expects a POST request with a body containing:</p>", "a[href=\"#serve-images\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Serve Images<a class=\"headerlink\" href=\"#serve-images\" title=\"Link to this heading\">#</a></h2><p>When receiving requests for an image, the provided token is verified to have been issued and that it has not expired yet. If the token is valid, the image of the item is returned.\nFor simplicity in this example, the response is a redirect to an image hosting that returns a random image, instead of having specific images for each item.</p><p>This is done by the <em>handle_image_access</em> function in the <a class=\"reference external\" href=\"https://github.com/Concordium/concordium-dapp-examples/blob/main/gallery/verifier/src/handlers.rs\">handlers file</a>.</p>", "a[href=\"#serve-challenge\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Serve challenge<a class=\"headerlink\" href=\"#serve-challenge\" title=\"Link to this heading\">#</a></h2><p>A new challenge must be generated each time the backend gets a request. The challenge is 32 bytes. Challenges are randomly generated and saved in the state together with the given account address and a timestamp.</p><p>The address will be used when verifying a proof with this challenge, so that only the account that requested the challenge can use it. The timestamp will be used to put a time limit on the challenge after which it will expire, and eventually be cleaned from the state.</p>", "a[href=\"#serve-statement-and-names\"]": "<h2 class=\"tippy-header\" style=\"margin-top: 0;\">Serve statement and names<a class=\"headerlink\" href=\"#serve-statement-and-names\" title=\"Link to this heading\">#</a></h2><p>The statement and the list of names are static, so they can easily be returned as responses to the corresponding requests.</p>", "a[href=\"gallery-frontend.html#gallery-frontend\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Create the public front end<a class=\"headerlink\" href=\"#create-the-public-front-end\" title=\"Link to this heading\">#</a></h1><p>The front end is a simple webpage in React that can display the images of the gallery and let the user authenticate.</p><p>When the page is initially opened, it displays the items of the gallery but without the actual images.</p>", "a[href=\"#writing-the-verifying-backend\"]": "<h1 class=\"tippy-header\" style=\"margin-top: 0;\">Writing the verifying backend<a class=\"headerlink\" href=\"#writing-the-verifying-backend\" title=\"Link to this heading\">#</a></h1><p>The backend does the following:</p>"}
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
