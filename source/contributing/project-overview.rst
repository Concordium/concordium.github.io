.. _project-overview:

==========================================
Concordium documentation project overview
==========================================

This document is for internal use. It describes where to find key files and
information about the documentation project, and is intended to help anyone
taking over or contributing to the project get oriented quickly.

Repository
==========

The documentation lives in the GitHub repository
`concordium/concordium.github.io <https://github.com/Concordium/concordium.github.io>`_.

The published site is deployed to the ``gh-pages`` branch via the
`Deploy GitHub Actions workflow <https://github.com/Concordium/concordium.github.io/actions/workflows/deploy.yml>`_.
Deployment is manual — it is not triggered automatically on merge.

Repository structure
====================

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Path
     - Purpose
   * - ``source/mainnet/``
     - Primary developer documentation (the main published site)
   * - ``source/academy/``
     - Concordium Academy educational content (separate build)
   * - ``source/_static/``
     - Shared CSS, images, and logos
   * - ``source/_templates/``
     - Jinja2 HTML templates (layout, footer, breadcrumbs, etc.)
   * - ``source/shared/``
     - RST content included in both the mainnet and academy builds
   * - ``source/contributing/``
     - Internal project documentation — not published to the website
   * - ``source/mainnet/conf.py``
     - Sphinx configuration for the mainnet build
   * - ``source/academy/conf.py``
     - Sphinx configuration for the academy build
   * - ``CLAUDE.md``
     - Instructions for AI working in this repository (see below)

Internal documentation (this folder)
=====================================

The ``source/contributing/`` folder contains internal documents that are
not published to the website. They are intended for contributors and AI
working in the repository.

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - File
     - Purpose
   * - ``project-overview.rst`` (this file)
     - Overview of the project, where to find things, and how it is maintained
   * - ``style-guide.rst``
     - Writing style, tone, formatting conventions, and documentation type definitions
   * - ``set-up-doc-env.rst``
     - How to set up the local development environment

Documentation structure
=======================

The documentation follows the `Diátaxis framework <https://diataxis.fr/>`_,
organized into four sections:

* **Explore** (``source/mainnet/learn/``) — Conceptual background and explanations
* **Tutorials** (``source/mainnet/tutorials/``) — Step-by-step learning by doing
* **How-to** (``source/mainnet/how-to/``) — Task-focused guides for specific goals
* **Reference** (``source/mainnet/technical-reference/``) — Technical look-up material

The main landing page is ``source/mainnet/index.rst``.

Each section has a landing page (``index.rst``) that contains a manually
maintained two-column document map listing all pages and sub-pages in that
section. See *Maintaining the document maps* below.

AI maintenance setup
====================

This project is set up for AI-assisted documentation maintenance using
Claude Code. Two files drive this:

* **``CLAUDE.md``** (root of the repository) — Read automatically by Claude
  Code at the start of every session. Contains build commands, architecture
  notes, content authoring rules, and the rules for maintaining landing page
  document maps. This is the primary place to record instructions for AI.

* **``source/contributing/style-guide.rst``** — Referenced from ``CLAUDE.md``.
  Contains tone of voice, formatting rules, documentation type definitions,
  and the At a glance box convention. AI is directed to consult this when
  creating or editing documentation.

To give AI new standing instructions (e.g. a new formatting rule or a
process change), add them to ``CLAUDE.md`` or the style guide.

Maintaining the document maps
=============================

The four section landing pages each contain a manually maintained document
map — a two-column grid listing all pages and sub-pages:

* ``source/mainnet/learn/index.rst`` — Explore
* ``source/mainnet/tutorials/index.rst`` — Tutorials
* ``source/mainnet/how-to/index.rst`` — How-to
* ``source/mainnet/technical-reference/index.rst`` — Reference

These maps do **not** update automatically when manually updating the docs.
In this case, whenever a page is added, removed, or renamed, the relevant
landing page map must also be updated. The rules for doing this are
documented in ``CLAUDE.md`` under *Documentation Maintenance*.

If you use the maintenance commands described below (``/add-doc``,
``/edit-doc``, ``/remove-doc``), the map update is handled automatically
as part of the command.

Documentation maintenance commands
====================================

All routine documentation maintenance tasks are supported by custom Claude
Code commands. These guide the maintainer step by step and handle all the
technical details — file creation, toctree updates, and landing page map
updates — automatically.

**How to use the commands**

1. Open the repository in Claude Code
2. Type ``/`` in the chat to see the available commands
3. Select the relevant command and follow the prompts
4. Review the result and commit when satisfied

No knowledge of RST, Sphinx, or the toctree structure is needed.

**Available commands**

The command files live in ``.claude/commands/`` at the root of the
repository. Open any of them in a text editor to read the full instructions.

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Command
     - Purpose
   * - ``/add-doc``
     - Add a new documentation page. Guides the maintainer through choosing
       the right documentation type (Explore, Tutorial, How-to, or
       Reference), the correct section, nav label, and filename. Generates
       the RST file, updates the toctree, and updates the landing page
       document map. Also handles creating a new section if needed.
   * - ``/edit-doc``
     - Edit an existing page. Applies style guide rules and handles any
       knock-on updates to toctrees and landing page maps if the page is
       renamed or sub-pages change.
   * - ``/remove-doc``
     - Remove an existing page. Deletes the RST file, removes the toctree
       entry, and removes the landing page map entry. Also checks for
       links to the page from other pages and warns if any will break.
   * - ``/review-doc``
     - Review a page against the style guide checklist before committing.
       Reports all issues found with suggested fixes.

Build and local preview
=======================

See ``CLAUDE.md`` for the full list of build commands. The most common ones are:

* ``pipenv run make.bat dev-mainnet`` — Local dev server with auto-rebuild (Windows)
* ``pipenv run make dev-mainnet`` — Local dev server with auto-rebuild (Linux/macOS)
* ``pipenv run make lint`` — Lint RST files

The local dev server runs at ``http://localhost:8000/mainnet``.

The build runs with ``-W`` (warnings as errors). All warnings must be fixed
before committing.
