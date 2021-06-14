# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SOURCEDIR     = source
BUILDDIR      = build



linkcheck-mainnet:
	@$(SPHINXBUILD) -b linkcheck "$(SOURCEDIR)" "$(BUILDDIR)/mainnet" 

linkcheck-testnet:
	@$(SPHINXBUILD) -b linkcheck "$(SOURCEDIR)" "$(BUILDDIR)/testnet" -c "$(SOURCEDIR)/testnet"

dev-mainnet:
	sphinx-autobuild "$(SOURCEDIR)" "$(BUILDDIR)/mainnet" -c "$(SOURCEDIR)/mainnet"

dev-testnet:
	sphinx-autobuild "$(SOURCEDIR)" "$(BUILDDIR)/testnet" -c "$(SOURCEDIR)/testnet"

lint:
	doc8 "$(SOURCEDIR)"

clean:
	rm -rf "$(BUILDDIR)"
