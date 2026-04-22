# Edit an existing documentation page

You are helping a maintainer edit an existing page in the Concordium developer documentation. Guide them through the process step by step.

## Step 1: Identify the page

Ask the maintainer: "Which page do you want to edit? You can give me the page title, the path to the file, or describe what the page is about."

Find the file if a path was not given directly. Confirm with the maintainer: "Is this the right page: `<path>`?"

## Step 2: Understand the change

Ask: "What would you like to change? Please describe what needs to be updated, added, or removed."

## Step 3: Read the existing page

Read the full content of the file before making any changes.

## Step 4: Make the changes

Apply the requested changes following the style guide in `source/contributing/style-guide.rst`:

- Sentence-style capitalisation for all headings
- Second person ("you"), active voice, present tense
- Short, focused sentences
- Correct RST formatting: code blocks, links, images, dropdowns, glossary terms
- At a glance box present and accurate if the page is a How-to or Tutorial
- RST title underline must be exactly the same length as the title

If the change involves **renaming the page title or nav label**, also:
- Update the toctree entry in the parent `index.rst`
- Update the entry in the landing page document map

If the change involves **adding or removing sub-pages**, also update the landing page document map accordingly.

## Step 5: Confirm

Show the maintainer a summary of all changes made and ask them to review.
