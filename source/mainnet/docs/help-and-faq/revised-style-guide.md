# Concordium documentation style and voice guide

## Introduction

This guide helps you create consistent, high-quality documentation for Concordium. It is divided into three main sections:

1. **Tone of voice and language** - How we communicate with our readers, including our voice characteristics and language choices that shape how our documentation "sounds" and feels to readers.

2. **Formatting** - The technical aspects of documentation formatting, including how to structure documents, format code examples, and present visual elements.

3. **Quality guidelines and best practices** - Standards and practices for ensuring documentation quality, accessibility, and usefulness.

## Part 1: Tone of voice and language

### Our voice characteristics
- **Clear and direct**: Focus on essential information without unnecessary words. Break down complex topics into digestible pieces. Be specific, avoid ambiguous language.

- **Professional but approachable**: Assume general technical proficiency, but explain Concordium-specific concepts. Use industry-standard terminology.

- **Supportive**: Anticipate common questions and provide helpful context. Guide readers step-by-step through complex procedures.

- **Global**: Remember that you are generally writing for non-native English speakers. Use clear sentence structures and common technical terms. Avoid idioms, slang, and culturally specific references.

### Language choices
- use second person ("you") in user guides
- avoid first person (we, I, me, our)
- use present continuous tense ("is") over future ("will be") or conditional ("should")
- use active voice ("the baker adds a block") over passive voice ("a block is added")
- keep sentences short and focused
- structure procedures with clear, imperative verbs. For example:
  - "Deploy the smart contract module"
  - "Initialize the contract state"

### Interaction verbs
- **Click**: Use for mouse actions on computers
- **Press**: Use for keyboard actions
- **Tap**: Use for touchscreen interactions
- **Select**: Universal term for choosing options
- Never use "hit"

## Part 2: Formatting

### Text formatting
- Use `**bold**` for keyboard buttons and clickable elements (e.g., press **Enter**, select **Next**)
- Use `*italics*` for text emphasis when introducing new terms (e.g., obtain an *identity provider*). After the term is introduced avoid emphasising it again in the same text
- Use ``` `code` ``` for inline code and commands
- Never use quotes for emphasis

### Header formatting 
Use *sentence-style capitalization*, i.e., only capitalize the first letter of a header.
Be consistent in the use of characters for creating headers; use the following for each level of header:

```
===============
Getting started
===============

Installation guide
=================

Running your first node
----------------------

Configure your settings
^^^^^^^^^^^^^^^^^^^^^^

Troubleshooting steps
~~~~~~~~~~~~~~~~~~~~
```

### Terminal commands and code examples
Use `code-block:: console` to show content from a terminal and prepend commands with $ without a space in between. A space is added between $ and the command through CSS. This solution makes only the command itself copyable, thereby improving the user experience.

Example:

.. code-block:: console

   $echo Hello, world!
   Hello, world!

Use `code-block:: rust` for Rust content.

Use `code-block:: toml` for TOML content.

Use `code-block:: json` for JSON content.

Use `code-block:: jsx` for JSX content.

A particular line number may be emphasized with :emphasize-lines:line_number option. Multiple lines are comma-separated and consecutive lines can be written with a dash (e.g. :emphasize-lines:10,12,15-17).

Use ``code`` to insert commands or output from a terminal screen into a line of text. For example:

To use this error type, the function ``piggy_smash`` should return ``Result<A, SmashError>`` instead of ``ReceiveResult<A>``

Do not confuse ``code`` with `code`. Text wrapped in single backticks (`) is default role interpreted text. And do not use regular quotes, e.g. "code", for code examples.

### Hyperlinks
Unless it is necessary to show the address, use the inline method for hyperlinks, e.g. `Concordium <https://www.concordium.com>`_.

If you have a hyperlink that will be used often in the same topic, you can insert the directive at the top or bottom of the file, e.g. .. _Rust: https://www.rust-lang.org/, and then reference it in the text, e.g. using the Rust_ programming language.

### Buttons and clickable elements
Use **bold** to highlight keyboard buttons and clickable elements (e.g., Press **Enter**, Select **Next**). Do not use quotes for clickable elements or keyboard buttons.

### Emphasis
Use *italics* for text emphasis (e.g., when introducing a new term: Obtain an identity from an *identity provider*.).
After the term is introduced avoid emphasising it again in the same text.
Do not use quotes for emphasis.

### Indentation
Use three spaces for indentation. This aligns the directive name (note::) with the content of the directive.

Add an empty line between a directive and its content.

Example that follows both rules:

.. note::

   This line has three spaces in front of it and it has an empty line above it.

### Variables
Use variables when it makes sense. Variables exist for most of the wallets and some other product names. It is preferred to use the variable instead of, e.g., browser wallet.

Add new variables in the file source/variables.rst.

Use the variables by:
Including a relative path to variables.rst, for example ../../variables.rst, at the top of the file.
Then using the variable bw, for example |bw|, in the text.

### Dropdowns
Use dropdowns to consolidate information and give a cleaner, more user-friendly experience to the reader. Dropdowns are generally used when describing a procedure across the different wallets. You can nest dropdowns in dropdowns as in the export-import topic. Dropdowns are also used for FAQs. It is important to add an empty line between the dropdown directive and the content.

Example:

.. dropdown:: The text the reader sees on the clickable dropdown

   This text appears when the reader clicks on the dropdown element.

### Glossary terms
Enter glossary terms in the glossary.rst if they are not already in the glossary. Pay close attention to the indentation in the glossary.

In the topic where the term is referenced, use the :term:`my term` directive when writing a glossary term in the text. If you want to use different text than how the term appears in the glossary, use the following format: :term:`My terms<my term>`.

### Images
Save any images that you add in the Images folder. Create sub-folders as needed to store images.

Captions are not used. Instead the image context should be described in the text above it with a reference, such as "...in the image below...".

Images must have :alt: text for accessibility. Generally, image width is 100%. For mobile wallets, browser wallet image width is 25%. For buttons, image width varies depending on whether the button has text and the graphic. Width ranges between 25 and 50 px.

GIFs can be inserted but should only be used when it gives clarity to more complex actions. When using GIFs, the :alt: text is StreamPlayer and :align: is center.

### Videos
To embed a video in a topic, use the raw directive.

   .. raw:: html

      <iframe src="https://www.youtube.com/embed/0UIyAlZjvLg?si=D0lguDkUjiHCKLcu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Remove any fixed dimensions from the embed link information you copied from the video source. The sizing is handled in the stylesheet.