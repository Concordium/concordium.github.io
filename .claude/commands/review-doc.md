# Review a documentation page

You are helping a maintainer check a documentation page against the Concordium style guide and review checklist before committing. Work through the checklist systematically and report all issues found.

## Step 1: Identify the page

Ask the maintainer: "Which page would you like to review? You can give me the page title or the path to the file."

Read the full content of the file.

## Step 2: Determine the documentation type

Identify whether the page is a How-to, Tutorial, Explore, or Reference page based on its location and content.

## Step 3: Run the checklist

Check each item and note any issues:

**Structure**
- [ ] The page has a RST label (e.g. `.. _my-label:`) before the title
- [ ] The page includes `variables.rst` at the top
- [ ] The title underline is exactly the same length as the title
- [ ] If How-to or Tutorial: an At a glance box is present immediately after the title
- [ ] The At a glance box covers what the page is about, what the reader needs, and what they will achieve — in 2-3 sentences, no bullet points

**Language and tone**
- [ ] Second person ("you") is used throughout — not "we", "I", or "the user"
- [ ] Active voice is used ("deploy the module", not "the module is deployed")
- [ ] Present tense is used ("the function returns", not "the function will return")
- [ ] Sentences are short and focused
- [ ] No idioms, slang, or culturally specific references
- [ ] Headings use sentence-style capitalisation (only first word and proper nouns capitalised)

**Formatting**
- [ ] Code blocks use the correct directive: `code-block:: console` for terminal commands, `code-block:: rust` for Rust, etc.
- [ ] Terminal commands are prepended with `$` (no space between `$` and command)
- [ ] Inline code uses double backticks (````code````)
- [ ] Bold is used only for clickable UI elements and keyboard buttons
- [ ] Italics are used only when introducing a new term for the first time
- [ ] Links use the inline format (`` `text <url>`_ ``) unless the link is reused multiple times
- [ ] Glossary terms use the `:term:` directive

**Completeness**
- [ ] All links work and point to the correct destinations
- [ ] Code examples are complete
- [ ] Images have `:alt:` text
- [ ] Procedures have all necessary steps

## Step 4: Report findings

List all issues found, grouped by category. For each issue, give the specific location in the file and a suggested fix.

If no issues are found, confirm that the page passes the review checklist.
