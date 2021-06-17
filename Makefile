# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SOURCEDIR     = source
BUILDDIR      = build



linkcheck-mainnet:
	@$(SPHINXBUILD) -b linkcheck "$(SOURCEDIR)/mainnet" "$(BUILDDIR)/mainnet"

linkcheck-testnet:
	@$(SPHINXBUILD) -b linkcheck "$(SOURCEDIR)/testnet" "$(BUILDDIR)/testnet"

dev-mainnet:
	sphinx-autobuild "$(SOURCEDIR)/mainnet" "$(BUILDDIR)/mainnet"

dev-testnet:
	sphinx-autobuild "$(SOURCEDIR)/testnet" "$(BUILDDIR)/testnet"

lint:
	doc8 "$(SOURCEDIR)"

clean:
	rm -rf "$(BUILDDIR)"
