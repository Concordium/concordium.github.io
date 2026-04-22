.. _style-guide:

====================================
Concordium documentation style guide
====================================

Introduction
============

This guide helps you create consistent, high-quality documentation for Concordium. It is divided into four main sections:

#. **Documentation types** - An overview of the different types of documentation following the `Diátaxis framework <https://diataxis.fr/>`_.

#. **Tone of voice and language** - Principles for clear and consistent communication, defining our documentation's voice and language style.

#. **Formatting** - The technical aspects of documentation formatting, including how to structure documents, format code examples, and present visual elements.

#. **Review checklist** -  A verification list to help maintain documentation quality and reduce the risk of common issues.

Find information on how to set up the documentation environment in :doc:`set-up-doc-env`.

Documentation Types
===================
Our documentation follows the `Diátaxis framework <https://diataxis.fr/>`_, organizing content into four distinct types that map directly to the four sections of the documentation:

* **Explore**: Understanding-oriented content that explains concepts and provides background. Helps readers build a mental model of how Concordium works before they start building. Example: "Identity and privacy on Concordium".
* **Tutorials**: Learning-oriented content that guides readers through a series of steps to complete a project. Designed to be followed in order, teaching through doing. Example: "Build your first smart contract".
* **How-to**: Problem-oriented content showing how to accomplish a specific task. Assumes the reader knows what they want to do and needs the steps to do it. Example: "Deploy a smart contract module".
* **Reference**: Information-oriented technical descriptions of systems, tools, APIs, and commands. Designed for look-up, not linear reading. Example: "Concordium Client command reference".

When writing, be clear about which type of documentation you are creating and place it in the correct section. While a document can touch on multiple types, each page should have a clear primary purpose.

Tone of voice and language
==========================

Our voice characteristics
-------------------------
* **Clear and direct**: Focus on essential information without unnecessary words. Break down complex topics into digestible pieces. Be specific, avoid ambiguous language.

* **Professional but approachable**: Assume general technical proficiency, but explain Concordium-specific concepts. Use industry-standard terminology.

* **Supportive**: Anticipate common questions and provide helpful context. Guide readers step-by-step through complex procedures.

* **Global**: Remember that you are generally writing for non-native English speakers. Use clear sentence structures and common technical terms. Avoid idioms, slang, and culturally specific references.

Language choices
----------------
* Use second person ("you") in user guides
* Avoid first person (we, I, me, our)
* Use present continuous tense ("is") over future ("will be") or conditional ("should")
* Use active voice ("the baker adds a block") over passive voice ("a block is added")
* Keep sentences short and focused
* Structure procedures with clear, imperative verbs. For example:

  * "Deploy the smart contract module"
  * "Initialize the contract state"

Interaction verbs
-----------------
* **Click**: Use for mouse actions on computers
* **Press**: Use for keyboard actions
* **Tap**: Use for touchscreen interactions
* **Select**: Universal term for choosing options
* Never use "hit"

Formatting
==========

Headers
-------
Use *sentence-style capitalization*, i.e., only capitalize the first letter of a header.

Be consistent in the use of characters for creating headers; use the following for each header level::

   ========
   Header 1
   ========

   Header 2
   ========

   Header 3
   --------

   Header 4
   ^^^^^^^^

   Header 5
   ~~~~~~~~

Aim to limit the use of subheading levels to three or four at most. Excessive nesting can make content harder to follow.

Emphasis
--------
* Use ``*italics*`` for text emphasis, e.g. when introducing new terms (e.g., obtain an *identity provider*). After the term is introduced avoid emphasising it again in the same text.
* Never use quotes or underlining for emphasis.

Clickable elements
------------------
* Use ``**bold**`` for keyboard buttons and clickable elements (e.g., press **Enter**, select **Next**).

Terminal commands and code examples
-----------------------------------
Use ``code-block:: console`` to show content from a terminal and prepend commands with ``$`` without a space in between.

A space is added between ``$`` and the command through CSS. This solution makes only the command itself copyable, thereby improving the user experience.

Example::

   .. code-block:: console

      $echo Hello, world!
      Hello, world!

Use ``code-block:: rust`` for Rust content

Use ``code-block:: toml`` for TOML content

Use ``code-block:: json`` for JSON content

Use ``code-block:: jsx`` for JSX content

You can emphasize specific lines using the ``:emphasize-lines:`` option followed by line numbers. Multiple lines are specified with commas, and consecutive lines can be written with a dash (e.g., ``1,3,5-7``).

Use ````code```` to insert commands or output from a terminal screen into a line of text. For example:

To use this error type, the function ``piggy_smash`` should return ``Result<A, SmashError>`` instead of ``ReceiveResult<A>``

Do not confuse ````code```` with `code`. Text wrapped in single backticks is so-called default role interpreted text. And do not use regular quotes, e.g., ``"code"``, for code examples.

Hyperlinks
----------
Unless it is necessary to show the address, use the inline method for hyperlinks, e.g. ``` `Concordium <https://www.concordium.com>`_ ```.

If you have a hyperlink that will be used often in the same topic, you can insert the directive at the top or bottom of the file, e.g.::

   .. _Rust: https://www.rust-lang.org/

and then reference it in the text using ``Rust_``.

Indentation
-----------
Use three spaces for indentation. This aligns the directive name ``note::`` with the content of the directive.

Add an empty line between a directive and its content.

Example that follows both rules::

   .. note::

      This line has three spaces in front of it and it has an empty line above it.

Variables
---------
Use variables when it makes sense. Variables exist for most of the wallets and some other product names. It is preferred to use the variable instead of, e.g., browser wallet.

Add new variables in the file ``source/variables.rst``.

Use the variables by:

* Including a relative path to ``variables.rst``, for example ``../../variables.rst``, at the top of the file.
* Then using the variable bw, for example ``|bw|``, in the text.

Dropdowns
---------
Use dropdowns to consolidate information and give a cleaner, more user-friendly experience to the reader. Dropdowns are generally used when describing a procedure across the different wallets and in FAQs. It is important to add an empty line between the dropdown directive and the content. Note that you can nest dropdowns in dropdowns.

Example::

   .. dropdown:: The text the reader sees on the clickable dropdown

      This text appears when the reader clicks on the dropdown element.

At a glance boxes
-----------------
All Tutorials and How-to pages must begin with an **At a glance** box. This gives readers a quick summary of the page before they commit to reading it.

Use the ``admonition`` directive with the title ``At a glance``::

   .. admonition:: At a glance

      This guide explains how to deploy a smart contract module. You will need
      the Concordium Client and a compiled module. After following this guide,
      your module will be deployed on the network and ready to initialize.

The At a glance box should cover:

* What the page is about
* What the reader will need (tools, prerequisites)
* What they will have achieved by the end

Keep it to two or three sentences. Do not use bullet points inside the box.

Glossary terms
--------------
Enter glossary terms in the glossary.rst if they are not already in the glossary. Pay close attention to the indentation in the glossary.

In the topic where the term is referenced, use the ``:term:`my term``` directive when writing a glossary term in the text. If you want to use different text than how the term appears in the glossary, use the following format: ``:term:`my text<my term>```.

Images
------
Store images in an ``images`` folder within the specific content area where they are used.
Create sub-folders as needed to store images.

Captions are not used. Instead the image context should be described in the text above it with a reference, such as "...in the image below...".

Images must have :alt: text for accessibility. Generally, image width is 100%. For mobile wallets, browser wallet image width is 25%. For buttons, image width varies depending on whether the button has text and the graphic. Width ranges between 25 and 50 px.

GIFs can be inserted but should only be used when it gives clarity to more complex actions. When using GIFs, the :alt: text is StreamPlayer and :align: is center.

Videos
------
To embed a video in a topic, use the raw directive::

   .. raw:: html

      <iframe src="https://www.youtube.com/embed/0UIyAlZjvLg?si=D0lguDkUjiHCKLcu"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
      </iframe>

Remove any fixed dimensions from the embed link information you copied from the video source. The sizing is handled in the stylesheet.

Review checklist
================

Before submitting documentation, verify that:

* All links work and point to the correct destinations
* Code examples are complete and tested
* Images have proper alt text and descriptions
* Procedures are complete with all necessary steps
* Technical terms are properly defined or linked to the glossary
* Headers follow the correct hierarchy
* Formatting is consistent throughout the document
* Spelling and grammar are correct throughout the document
* Language is clear, professional, and approachable

