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
	sphinx-autobuild "$(SOURCEDIR)/mainnet" "$(BUILDDIR)/mainnet" --watch "$(SOURCEDIR)/shared"

dev-testnet:
	sphinx-autobuild "$(SOURCEDIR)/testnet" "$(BUILDDIR)/testnet" --watch "$(SOURCEDIR)/shared"

dev-smart-contracts-v0:
	sphinx-autobuild "$(SOURCEDIR)/smart-contracts-v0" "$(BUILDDIR)/smart-contracts-v0"

lint:
	doc8 "$(SOURCEDIR)"

clean:
	rm -rf "$(BUILDDIR)"
