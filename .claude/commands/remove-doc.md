# Remove a documentation page

You are helping a maintainer remove a page from the Concordium developer documentation. This involves three steps that must all be completed to avoid build errors.

## Step 1: Identify the page

Ask the maintainer: "Which page do you want to remove? You can give me the page title, the path to the file, or describe what the page is about."

Find the file if a path was not given directly. Confirm with the maintainer: "Is this the right page: `<path>`? This will permanently remove the file and all references to it."

## Step 2: Check for dependencies

Before removing, check:
- Are there other pages that link to this page using `:doc:` or `:ref:`? If so, list them and warn the maintainer that those links will break. Ask how they want to handle it — remove the links, replace them with links to another page, or cancel the removal.
- Does this page have sub-pages in a child toctree? If so, warn the maintainer that those pages will also need to be removed or moved.

## Step 3: Remove the file

Delete the RST file.

## Step 4: Remove the toctree entry

Find the toctree in the parent `index.rst` that references this page and remove the entry. If removing the entry leaves a toctree completely empty, remove the entire toctree block including its caption.

## Step 5: Remove the landing page map entry

Find the `:doc:` entry for this page in the relevant section landing page map and remove it. If the page had sub-page entries listed below it, remove those too. If removing the entry leaves a section heading with no entries, remove the heading as well.

## Step 6: Update llms.txt

Check whether the removed page is listed in `public/llms.txt`. If it is, remove the entry. If the removal leaves a section with no entries, remove the section heading as well.

## Step 7: Confirm

Show the maintainer a summary of everything that was removed or changed and ask them to review.
