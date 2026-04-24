# Add a new documentation page

You are helping a maintainer add a new page to the Concordium developer documentation. Guide them through the process step by step. Do not do everything at once — ask one question at a time and wait for the answer before proceeding.

## Step 1: Understand what the page is about

Ask the maintainer: "What is the new page about? Please describe it in a few sentences — what does it cover and who is it for?"

## Step 2: Recommend the right documentation type

Based on their description, recommend one of the four documentation types. Use these rules:

- **Explore** — The page explains a concept or provides background understanding. The reader is not trying to do anything yet, just learn. Example: "How does identity work on Concordium?"
- **Tutorial** — The page teaches by doing. The reader follows steps to build or complete something real, learning along the way. Example: "Build your first smart contract."
- **How-to** — The page helps the reader accomplish a specific task they already know they want to do. Example: "Deploy a smart contract module."
- **Reference** — The page is technical look-up material: API specs, command references, release notes, glossary entries. Example: "Concordium Client command reference."

Explain your recommendation briefly and ask: "Does this sound right, or would you like a different type?"

## Step 3: Determine placement

Based on the confirmed type, ask about placement:

**If Explore**: Ask which section it fits under. Current sections in `source/mainnet/learn/index.rst`: What is the Concordium Protocol, Identity, Accounts, Transactions, Smart Contracts, Consensus, Tokenomics, Validation and Staking, Governance. Ask if it belongs to one of these or needs a new section.

**If Tutorial**: Ask which section it fits under. Current sections in `source/mainnet/tutorials/index.rst`: dApp Development, Smart Contract Development, Tokens, Wallets and Connectors, Infrastructure, Protocol-Level Tokens. Ask if it belongs to one of these or needs a new section.

**If How-to**: Ask which section it fits under. Current sections in `source/mainnet/how-to/index.rst`: About this documentation, Concordium ID, Integrations, Validation, Nodes, Smart Contracts, Governance. Ask if it belongs to one of these or needs a new section.

**If Reference**: Ask which section it fits under. Current sections in `source/mainnet/technical-reference/index.rst`: Release Notes, Concordium SDKs, API, Concordium Client, CCDScan, Wallets, Smart Contract References, ID Layer References, Tools, Consensus. Ask if it belongs to one of these or needs a new section.

If a **new section** is needed, ask: "What should the new section be called?" Then create the section folder, add a new toctree with that caption to the relevant `index.rst`, and add a new bold heading block to the landing page document map. Ask the maintainer which column (left or right) the new section should appear in.

## Step 4: Get the nav label and filename

Ask: "What should the page be called in the sidebar navigation? This is the short label readers will see." 

Then suggest a filename based on the label (lowercase, hyphens instead of spaces, `.rst` extension) and confirm with the maintainer.

## Step 5: Generate the page

Create the RST file in the correct folder. Use this structure:

**For How-to pages:**
```rst
.. _<label>:
.. include:: <relative path to variables.rst>

<Title matching the nav label>
<underline of equal length>

.. admonition:: At a glance

   <2-3 sentences: what this guide covers, what the reader needs, what they will achieve>

<Page content here>
```

**For Tutorial pages:**
```rst
.. _<label>:
.. include:: <relative path to variables.rst>

<Title matching the nav label>
<underline of equal length>

.. admonition:: At a glance

   <2-3 sentences: what this tutorial covers, what the reader needs, what they will have built>

<Page content here>
```

**For Explore pages:**
```rst
.. _<label>:
.. include:: <relative path to variables.rst>

<Title>
<underline of equal length>

<Page content here>
```

**For Reference pages:**
```rst
.. _<label>:
.. include:: <relative path to variables.rst>

<Title>
<underline of equal length>

<Page content here>
```

Follow the style guide in `source/contributing/style-guide.rst`: sentence-style capitalisation for headings, second person, active voice, present tense.

## Step 6: Update the toctree

Add the new page to the correct toctree in the section's `index.rst`. Use the nav label as the explicit toctree label:

```rst
Nav label <path/to/filename>
```

## Step 7: Update the landing page document map

Add a `:doc:` entry for the new page under the correct section heading in the two-column grid on the landing page. Use the nav label — not the page title — as the link text. If the page has sub-pages listed in a child toctree, list those indented below it.

The rules for map labels are in `CLAUDE.md` under *Documentation Maintenance*.

## Step 8: Confirm

Show the maintainer a summary of everything that was created or changed and ask them to review.
