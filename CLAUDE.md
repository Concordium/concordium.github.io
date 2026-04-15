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
