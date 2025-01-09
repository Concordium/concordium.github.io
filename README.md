# Concordium Documentation

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](https://github.com/Concordium/.github/blob/main/.github/CODE_OF_CONDUCT.md)

Before contributing please read and follow the principles outlined in
- the [Divio documentation guide](https://documentation.divio.com/)
- our [style guide](#style-guide).

Other good documentation references include:
- the [Microsoft Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/)
- the [Google developer documentation style guide](https://developers.google.com/style)
The documentation is written in reStructuredText ([Link to the
basics](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html)).

For building the documentation we use
[Sphinx](https://www.sphinx-doc.org/en/master/index.html) and the [theme from
pydata-sphinx-theme](https://pydata-sphinx-theme.readthedocs.io/en/stable/) with minor
design tweaks.

Sphinx supplies a number of useful
["directives"](https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html)
(The sphinx equivalent of LaTeX commands) for stuff like code highlighting,
remarks, warnings and so on.

Additionally, we have enabled the [extension for
todo](https://www.sphinx-doc.org/en/master/usage/extensions/todo.html)
directives
```
.. todo::

   Write a todo here
```

To show TODOs as warnings when building the docs you need to uncomment the
following line in `/source/mainnet/conf.py`:

```
# todo_emit_warnings = True
```

NB: This will only show TODOs for the files being built; as opposed to TODOs
from all files.

To generate SVG graphics, we use the [Graphviz
extension](https://www.sphinx-doc.org/en/master/usage/extensions/graphviz.html).

## Development

All of the documentation lives in the `source` directory; here there is a subdirectory `mainnet` for the developer document and a subdirectory `academy` for Concordium Academy.
General content such as site images, stylesheets, and other templates are in the `source` directory.

## Installation


### Linux

Install `python3` and the python package manager `pip3`.

The project uses `pipenv` and Pipfile to manage dependencies, so make sure to have this installed:

```
pip3 install pipenv
```

To install the python dependencies run:
```
pipenv sync --dev
```

Install `graphviz`:

- Ubuntu: `sudo apt install graphviz`

### macOS

On macOS
```
brew install python3 graphviz
pip3 install pipenv
pipenv sync --dev
```

### Windows

Install [python3](https://www.python.org/downloads/windows/)
and select a python installer, e.g. [this one](https://www.python.org/ftp/python/3.9.1/python-3.9.1-amd64.exe).
Download and run the launcher. Make sure to select "Add Python to PATH" at the bottom before proceeding with the install.

After that from a terminal run
```
pip3 install pipenv
pipenv sync --dev
```
from the root of this repository.

If you want the graphs to render properly you also need to install the `dot` tool, which is part of the [graphviz package](https://graphviz.org/download/).

## Development

To watch the doc files and automate the build run:

### Windows

**Note:**
The exact command depends on which terminal type you are using. For example, in Powershell, you write .\make.bat dev-XXX where XXX is your target to build.

**Mainnet**

```
pipenv run make.bat dev-mainnet
```
and navigate to [localhost:8000/mainnet](http://localhost:8000/net).

Before committing, make sure to try to build and fix any warnings that are reported.

> **Note**:
> When working on changes to the design it can be beneficial to disable
> caching, as it can cause UI problems. To disable it, add the `-E` flag to the
> `dev` command in the appropriate make file.

### macOS and Linux
**Mainnet**

```
pipenv run make dev-mainnet
```
and navigate to [localhost:8000/mainnet](http://localhost:8000/net).

Before committing, make sure to run the linter and fix all the errors reported:
```
pipenv run make lint
```

## Building the docs
Run the build script from project root:

```
pipenv run ./script/build.sh
```

To check for dead links (can also be done by the CI), run:
```
pipenv run make linkcheck-mainnet
```

### Building the gRPC JSON schemas

The folder `./source/mainnet/net/references/grpc-json-schemas/` contains the JSON
schemas used in the gRPC documentation.

To generate the schemas:

1. Check out the [`derive-schema`
branch of Concordium Rust
SDK](https://github.com/Concordium/concordium-rust-sdk/tree/derive-schema).
2. Run `cargo run generate --output_folder <path-to-grpc-json-schema-folder>`.

# Deployment

The developer documentation is hosted by GitHub Pages and the released files can be viewed on the branch [`gh-pages`](https://github.com/Concordium/concordium.github.io/tree/gh-pages).
Likewise for the Concordium Academy site, the released files can be viewed on the [`gh-pages`](https://github.com/Concordium/concordium-academy/tree/gh-pages) branch of the [Concordium/concordium-academy repository](https://github.com/Concordium/concordium-academy).

Deployment is triggered manually using the [Deploy workflow](https://github.com/Concordium/concordium.github.io/actions/workflows/deploy.yml) in GitHub Actions of this repository.
This will build both the developer documentation and the Concordium Academy site, to ensure that links used by Academy are still valid. But only deploy the the developer documentation.

To deploy the Concordium Academy site trigger the [Deploy workflow](https://github.com/Concordium/concordium-academy/actions/workflows/deploy.yml) in GitHub Actions of [`Concordium/concordium-academy`](https://github.com/Concordium/concordium-academy).
This workflow will clone this repository, build and only deploy the Academy site.

# Contributing

The `source/mainnet` directory contains documentation for the current Mainnet, and should always be compatible with the current Mainnet.

With only a couple of exceptions (Downloads and Ubuntu node), Testnet documentation is handled either via a note at the beginning of the topic (where the feature is not yet released on mainnet) or in a dropdown if it is an update to an existing feature where mainnet and testnet differ. Very small differences are handled inline in the text.

## Style guide

Before contributing, please read and follow the principles outlined in: :ref:`style-guide`

## Preview

For non-technical users that might not want to install the tools above, you can request a preview in the GitHub pull request. The preview is added as a comment in the pull request and opens as a web page.

Another alternative if you do not want to build the documentation to preview, is to install install Esbonio https://marketplace.visualstudio.com/items?itemName=swyddfa.esbonio into VSCode. Then you can use the command palette to run >Esbonio:OpenPreview. This builds a preview file. This solution still requires that you have VSCode installed and the repository locally on your computer.

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
