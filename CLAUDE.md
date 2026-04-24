# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Setup

```bash
pipenv sync --dev
```

Graphviz is required for diagram rendering (`brew install graphviz` on macOS, `sudo apt install graphviz` on Ubuntu, or the [graphviz installer](https://graphviz.org/download/) on Windows).

## Common Commands

| Command | Purpose |
|---------|---------|
| `pipenv run make.bat dev-mainnet` | Dev server with auto-rebuild (Windows) → http://localhost:8000/mainnet |
| `pipenv run make dev-mainnet` | Dev server with auto-rebuild (Linux/macOS) |
| `pipenv run make lint` | Lint all RST files with doc8 |
| `pipenv run ./scripts/build.sh` | Full production build (mainnet + academy) |
| `pipenv run make linkcheck-mainnet` | Check for dead links |
| `pipenv run make clean` | Remove build output |

When working on design/theme changes, add the `-E` flag to the dev command to disable caching.

## Architecture

This is a **Sphinx documentation site** with two independent builds:

- `source/mainnet/` — primary developer documentation, output to `build/en/mainnet/`
- `source/academy/` — Concordium Academy educational content; cross-references mainnet via intersphinx

Shared site assets (images, stylesheets, templates) live in:
- `source/_static/` — CSS, images, logos
- `source/_templates/` — Jinja2 HTML templates (layout, footer, breadcrumbs, etc.)
- `source/shared/` — RST content included in both builds

Each build has its own `conf.py` (`source/mainnet/conf.py`, `source/academy/conf.py`). Navigation is driven entirely by `toctree` directives in `.rst` files — there is no separate sidebar config.

Build output: `build/en/mainnet/` (mainnet), `build-academy/` (academy). The `public/` directory is copied into `build/` before building, providing pre-built static files.

Deployment is manual via the [Deploy GitHub Actions workflow](https://github.com/Concordium/concordium.github.io/actions/workflows/deploy.yml) to the `gh-pages` branch.

## Content Authoring

All documentation is written in **reStructuredText** (`.rst`). The default syntax highlight language is Rust.

**Style guide**: When creating or editing documentation, consult `source/contributing/style-guide.rst` for tone, terminology, formatting conventions, and Concordium-specific writing standards.

**Testnet differences** are handled inline within mainnet docs using notes or collapsible dropdowns — not a separate branch or directory.

**`.. todo::` directives** are supported. To surface them as build warnings, uncomment `todo_emit_warnings = True` in `source/mainnet/conf.py`.

The build runs with `-W` (warnings as errors). Fix all warnings before committing.

**gRPC JSON schemas** in `source/mainnet/net/references/grpc-json-schemas/` are generated from the `derive-schema` branch of the Concordium Rust SDK:
```bash
cargo run generate --output_folder <path-to-grpc-json-schema-folder>
```

## Git

When staging files, never add the entire `.claude/` folder. Only commit files inside `.claude/commands/` — the rest of `.claude/` contains local session data and personal settings that should not be shared.

## Documentation Maintenance

### Landing page document maps

The four section landing pages each contain a **manually maintained document map** — a two-column grid listing all pages and sub-pages in that section:

- `source/mainnet/learn/index.rst` — Explore
- `source/mainnet/tutorials/index.rst` — Tutorials
- `source/mainnet/how-to/index.rst` — How-to guides
- `source/mainnet/technical-reference/index.rst` — Reference

**These maps do not update automatically.** Whenever you add, remove, or rename a page, you must also update the map on the relevant landing page.

**Rules for keeping maps in sync:**

1. **Adding a page**: Add a `:doc:` entry under the correct section heading in the landing page grid. If it has sub-pages, list those indented below it.
2. **Removing a page**: Remove the `:doc:` entry (and any sub-page entries) from the landing page grid.
3. **Renaming a page or changing its title**: Update both the `toctree` entry and the map entry. The label used in the map must match the **explicit label in the toctree** (not the page's H1 title, unless they are the same). Check the relevant toctree carefully.
4. **Adding a new section** (new toctree with a caption): Add a corresponding bold heading and entry block to the landing page grid, in the same column position that makes visual sense.
5. **Never use page H1 titles as map labels if the toctree overrides them** — always use the toctree's explicit label.

### Why manual maps?

An automatic approach (visible toctrees with `maxdepth: 2`) was considered but rejected because it renders plain indented lists instead of the current two-column grid layout. The manual maps look significantly better and the maintenance overhead is low when AI handles the updates as part of every structural change.
