# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SOURCEDIR     = source
BUILDDIR      = build



linkcheck-mainnet:
	@$(SPHINXBUILD) -b linkcheck "$(SOURCEDIR)/mainnet" "$(BUILDDIR)/mainnet"

dev-mainnet:
	sphinx-autobuild "$(SOURCEDIR)/mainnet" "$(BUILDDIR)/mainnet"

lint:
	doc8 "$(SOURCEDIR)"

clean:
	rm -rf "$(BUILDDIR)"
