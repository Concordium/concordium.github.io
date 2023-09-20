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
**Mainnet**

```
make dev-mainnet
```
and navigate to [localhost:8000/mainnet](http://localhost:8000/net).

Before committing, make sure to run the linter and fix all the errors reported:
```
make lint
```

### Windows

**Note:**
The exact command depends on which terminal type you are using. For example, in Powershell, you write .\make.bat dev-XXX where XXX is your target to build.

**Mainnet**

```
make.bat dev-mainnet
```
and navigate to [localhost:8000/mainnet](http://localhost:8000/net).

Before committing, make sure to try to build and fix any warnings that are reported.

```
./make.bat html
```


> **Note**:
> When working on changes to the design it can be beneficial to disable
> caching, as it can cause UI problems. To disable it, add the `-E` flag to the
> `dev` command in the appropriate make file.

## Building the docs
Run the build script from project root:

```
./script/build.sh
```

To check for dead links (can also be done by the CI), run:
```
make linkcheck-mainnet
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
This will build and deploy both the developer documentation and Concordium Academy.

# Contributing

The `source/mainnet` directory contains documentation for the current Mainnet, and should always be compatible with the current Mainnet.

With only a couple of exceptions (Downloads and Ubuntu node), Testnet documentation is handled either via a note at the beginning of the topic (where the feature is not yet released on mainnet) or in a dropdown if it is an update to an existing feature where mainnet and testnet differ. Very small differences are handled inline in the text.

## Style guide

### Language

* For a user guide, use **second person** ("you"). Avoid use of first person (we, I, me, our, etc).
* Structure sentences, especially numbered procedures, using the **imperative** ("click on X") and with as few actions as possible per step.
* Keep sentences **short**.
* Prefer **present** continuous ("is") over future ("will be"), conditional ("should"), or past ("was").
* Prefer **active voice** ("the baker adds a block") over passive voice ("a block is added").
* Use the correct action depending on the device: "click" on a computer (when using a mouse), "press" a button on the keyboard, "tap" a button on a touchscreen device. "Select" can also be used. Nothing should be "hit".
* Remember that you are generally writing for non-native English speakers so keep it simple.

For a list of approved Concordium terminology, see `Terminology and definitions <https://docs.google.com/spreadsheets/d/18rDRELpEzUgD8770xk_KEF3ZXIUsev2pfkNYdJD1AqU/edit?usp=sharing>`__. This document also contains brand guidelines for third parties.

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

#### Terminal commands and code examples

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
Use `code-block:: rust` to show Rust content with correct formatting.

Use `code-block:: toml` to show TOML content with correct formatting.

Use `code-block:: json` to show JSON content with correct formatting.

Use `code-block:: jsx` to show JSX content with correct formatting.

A particular line number may be emphasized with `:emphasize-lines:line_number` option. Multiple lines are comma-separated and consecutive lines can be written with a dash (e.g. `:emphasize-lines:10,12,15-17`).

Use ` ``code`` ` to insert commands or output from a terminal screen into a line of text. For example:

```
To use this error type, the function ``piggy_smash`` should return ``Result<A, SmashError>`` instead of ``ReceiveResult<A>``
``` 

Do not confuse ` ``code`` ` with ``` `code` ```. Text wrapped in single ``` ` ``` is so-called default role interpreted text. And do not use regular quotes, e.g. `"code"`, for code examples.

#### Hyperlinks

Unless it is necessary to show the address, use the inline method for hyperlinks, e.g. ``` `Concordium <https://www.concordium.com>`_ ```.

If you have a hyperlink that will be used often in the same topic, you can insert the directive at the top or bottom of the file, e.g. `.. _Rust: https://www.rust-lang.org/`, and then reference it in the text, e.g. using the `Rust_` programming language.

#### Buttons and clickable elements

Use `**bold**` to highlight keyboard buttons and clickable elements (e.g., `Press **Enter**`, `Select **Next**`). Do not use quotes for clickable elements or keyboard buttons.

#### Emphasis

- Use `*italics*` for text emphasis (e.g., when introducing a new term: `Obtain an identity from an *identity provider*.`).
- After the term is introduced avoid emphasising it again in the same text.
- Do not use quotes for emphasis.

#### Indentation
Use three spaces for indentation.
This aligns the directive name (`note::`) with the content of the directive (`This line...`).

Add an empty line between a directive and its content.

Example that follows both rules:

``` restructuredtext
.. note::

   This line has three spaces in front of it and it has an empty line above it.
```

#### Variables

Use variables when it makes sense. Variables exist for most of the wallets and some other product names. It is preferred to use the variable instead of, e.g., browser wallet.

Add new variables in the file `source/variables.rst`.

Use the variables by:

- Including a relative path to `variables.rst`, for example
  `../../variables.rst`, at the top of the file.
- Then using the variable bw, for example `|bw|`, in the text.

#### Dropdowns

Use dropdowns to consolidate information and give a cleaner, more user-friendly experience to the reader. Dropdowns are generally used when describing a procedure across the different wallets. You can nest dropdowns in dropdowns as in the export-import topic. Dropdowns are also used for FAQs. It is important to add an empty line between the dropdown directive and the content.

Example:

``` restructuredtext
.. dropdown:: The text the reader sees on the clickable dropdown

   This text appears when the reader clicks on the dropdown element.
```
#### Glossary terms

Enter glossary terms in the glossary.rst if they are not already in the glossary. Pay close attention to the indentation in the glossary.

In the topic where the term is referenced, use the `:term:<my term>` directive when writing a glossary term in the text. If you want to use different text than how the term appears in the glossary, use the following format: `:term:My terms<my term>`.

### Images

Save any images that you add in the `Images` folder. Create sub-folders as needed to store images.

Captions are not used. Instead the image context should be described in the text above it with a reference, such as "...in the image below...".

Images must have :alt: text for accessibility. Generally, image width is 100%. For mobile wallets, browser wallet image width is 25%. For buttons, image width varies depending on whether the button has text and the graphic. Width ranges between 25 and 50 px.

GIFs can be inserted but should only be used when it gives clarity to more complex actions. When using GIFs, the :alt: text is StreamPlayer and :align: is center.

## Preview

For non-technical users that might not want to install the tools above, you can request a preview in the GitHub pull request. The preview is added as a comment in the pull request and opens as a web page.

Another alternative if you do not want to build the documentation to preview, is to install install Esbonio https://marketplace.visualstudio.com/items?itemName=swyddfa.esbonio into VSCode. Then you can use the command palette to run >Esbonio:OpenPreview. This builds a preview file. This solution still requires that you have VSCode installed and the repository locally on your computer.

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
