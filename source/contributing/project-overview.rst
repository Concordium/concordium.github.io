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

These maps do **not** update automatically. Whenever a page is added,
removed, or renamed, the relevant landing page map must also be updated.
The rules for doing this are documented in ``CLAUDE.md`` under
*Documentation Maintenance*. When using AI for maintenance, this update
is included automatically as part of the task.

AI prompts, skills, and templates
===================================

.. note::

   This section describes planned resources that have not yet been created.
   Update this section as they are added.

The plan is to create a set of reusable prompts, skills, and templates to
support common documentation maintenance tasks with AI. These will cover:

* **Adding a new page** — prompt that creates the RST file with the correct
  structure (title, At a glance box, headings), adds it to the relevant
  toctree, and updates the landing page document map.
* **Removing a page** — prompt that removes the file, the toctree entry,
  and the landing page map entry.
* **Renaming a page** — prompt that updates the file, toctree label, map
  entry, and any cross-references.
* **Writing or editing content** — template that applies the style guide
  rules: tone of voice, formatting, At a glance box, correct documentation
  type for the section.
* **Review checklist** — prompt that checks a page or set of changes against
  the style guide review checklist before committing.

When these resources are created, store them in a dedicated folder (e.g.
``source/contributing/prompts/``) and update this section with the location
and a short description of each.

Build and local preview
=======================

See ``CLAUDE.md`` for the full list of build commands. The most common ones are:

* ``pipenv run make.bat dev-mainnet`` — Local dev server with auto-rebuild (Windows)
* ``pipenv run make dev-mainnet`` — Local dev server with auto-rebuild (Linux/macOS)
* ``pipenv run make lint`` — Lint RST files

The local dev server runs at ``http://localhost:8000/mainnet``.

The build runs with ``-W`` (warnings as errors). All warnings must be fixed
before committing.
