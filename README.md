# Concordium Documentation

The documentation is structured according to this
[guide](https://documentation.divio.com/).

It is written in reStructuredText ([Link to the
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
Todos are shown as warnings when building the docs.

To generate SVG graphics, we use the [Graphviz
extension](https://www.sphinx-doc.org/en/master/usage/extensions/graphviz.html).

## Installation


### Linux

Install `python3` and the python package manager `pip`.

To install the python dependencies run:
```
pip install -r requirements.txt
```

Install `graphviz`:

- Ubuntu: `sudo apt install graphviz`

### macOS

On macOS
```
brew install python3 graphviz
pip3 install -r requirements.txt
```

## Development

To watch the doc files and automate the build run:

```
make dev
```
and navigate to [localhost:8000](http://localhost:8000).

Before committing, make sure to run the linter and fix all the errors reported:
```
make lint
```

> **Note**: In `make dev` we disable the cache on build as this tends to cause
> inconsistencies. If the build time becomes too slow, it might be worth
> enabling again by removing `-E`.


## Building the docs
Run the following command:

```
make html
```


To check for dead links (also done by the CI), run:
```
make linkcheck
```


## Deployment

Merges to `main` are auto-deployed to Heroku.


## Style guide

### Headers
In reST the various levels of headers can be written in multiple ways, but they
need to be used consistently in our documentation because the theme we use
interprets them in a specific way, namely:

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

### Terminal commands
Code snippets with terminal commands should use `.. code-block:: console`
and any command should be prefixed with `$` without extra whitespace.
A space will be added through CSS and only the command itself will be
copyable, which improves the user-experience.

Example:

``` restructuredtext
.. code-block:: console
   $echo Hello, world!
   Hello, world!
```

### Indentation
In reST it is common to indent block by three spaces because it aligns the
content of directives to the directive name itself.
See the example below.

``` restructuredtext
.. note::
   This line has three spaces in front and aligns with the note directive.
```
