# Concordium Documentation

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](https://github.com/Concordium/.github/blob/main/.github/CODE_OF_CONDUCT.md)

Before contributing please read and follow the principles outlined in
- the [Divio documentation guide](https://documentation.divio.com/)
- our [style guide](#style-guide).

The documentation is written in reStructuredText ([Link to the
basics](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html)).

For building the documentation we use
[Sphinx](https://www.sphinx-doc.org/en/master/index.html) and the [theme from
ReadTheDocs](https://sphinx-rtd-theme.readthedocs.io/en/stable/) with minor
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
following line in `/source/conf.py`:

```
# todo_emit_warnings = True
```

NB: This will only show TODOs for the files being built; as opposed to TODOs
from all files.

To generate SVG graphics, we use the [Graphviz
extension](https://www.sphinx-doc.org/en/master/usage/extensions/graphviz.html).

## Development

Currently the documentation is released only from the `testnet4` branch, and development of documentation for upcoming releases can be merged into the `main` branch without it being released.
This also means pull requests fixing typos should be merged into both `testnet4` and `main`.

## Installation


### Linux

Install `python3` and the python package manager `pip3`.

To install the python dependencies run:
```
pip3 install -r requirements.txt
```

Install `graphviz`:

- Ubuntu: `sudo apt install graphviz`

### macOS

On macOS
```
brew install python3 graphviz
pip3 install -r requirements.txt
```

### Windows

Install [python3](https://www.python.org/downloads/windows/)
and select a python installer, e.g. [this one](https://www.python.org/ftp/python/3.9.1/python-3.9.1-amd64.exe).
Download and run the launcher. Make sure to select "Add Python to PATH" at the bottom before proceeding with the install.

After that from a terminal run
```
pip3 install -r requirements.txt
```
from the root of this repository.

If you want the graphs to render properly you also need to install the `dot` tool, which is part of the [graphviz package](https://graphviz.org/download/).

## Development

To watch the doc files and automate the build run:

### macOS and Linux
```
make dev
```
and navigate to [localhost:8000](http://localhost:8000).

Before committing, make sure to run the linter and fix all the errors reported:
```
make lint
```

### Windows

```
./make.bat dev
```
and navigate to [localhost:8000](http://localhost:8000).

Before committing, make sure to try to build and fix any warnings that are reported.

```
./make.bat html
```


> **Note**:
> When working on changes to the design it can be benefitial to disable
> caching, as it can cause UI problems. To disable it, add the `-E` flag to the
> `dev` command in the appropriate make file.

## Building the docs
Run the following command:

```
make html
```

To check for dead links (also done by the CI), run:
```
make linkcheck
```

# Contributing (After release of Mainnet)

The `main` branch is used for documentation for future releases, and documentation for new features should be done in branches starting from `main`.

The `mainnet` branch contains documentation for the current Mainnet, and should always be compatible with the current Mainnet.
Contributions such as improvements for the Mainnet documentation, should be branched of `mainnet` and then merged into both `mainnet` and `main` if still relevant.

## Style guide

### Language

* For a user guide, prefer **second person** and **imperative** ("click on X").
* Keep sentences **short**.
* Prefer **present** continuous ("is") over future ("will be").
* Prefer **active voice** ("the baker adds a block") over passive voice ("a block is added").

### Formatting

#### Headers
Use *sentence-style capitalization*, i.e., only capitalize the first letter of a
header.

Be consistent in the use of characters for creating headers; use the following
for each level of header:

``` restructuredtext
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
```

#### Terminal commands

Use `code-block:: console` to show content from a terminal and prepend commands
with `$` without a space in between.

A space is added between `$` and the command through CSS.
This solution makes only the command itself copyable, thereby improving the user-experience.

Example:

``` restructuredtext
.. code-block:: console

   $echo Hello, world!
   Hello, world!
```

#### Buttons and clickable elements

Use **bold** to highlight keyboard buttons and clickable elements (e.g., "Press **Enter**", "Select **Next**").

#### Emphasis

- Use *italics* for text emphasis (e.g., when introducing a new term: "Obtain an identity from an *identity provider*.").
- After the term is introduced avoid emphasising it again in the same text.

### Code formatting for this repository

#### Indentation
Use three spaces for indentation.
This aligns the directive name (`note::`) with the content of the directive (`This line...`).

Add an empty line between a directive and its content.

Example that follows both rules:

``` restructuredtext
.. note::

   This line has three spaces in front of it and it has an empty line above it.
```


## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
