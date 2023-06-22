# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SOURCEDIR     = source
BUILDDIR      = build



linkcheck-mainnet:
	@$(SPHINXBUILD) -b linkcheck "$(SOURCEDIR)/mainnet" "$(BUILDDIR)/mainnet"

linkcheck-academy:
	@$(SPHINXBUILD) -b linkcheck "$(SOURCEDIR)/academy" "$(BUILDDIR)/academy"

dev-mainnet:
	sphinx-autobuild "$(SOURCEDIR)/mainnet" "$(BUILDDIR)/mainnet"

dev-academy:
	sphinx-autobuild "$(SOURCEDIR)/academy" "$(BUILDDIR)/academy"

lint:
	doc8 "$(SOURCEDIR)"

clean:
	rm -rf "$(BUILDDIR)"
