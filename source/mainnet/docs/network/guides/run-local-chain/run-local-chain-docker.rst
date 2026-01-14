.. _run-local-chain-docker:

==========================
Using Docker (recommended)
==========================

The easiest way to run a local Concordium chain is using the `Concordium Local Stack <https://github.com/Concordium/concordium-local-stack>`_ — a pre-configured Docker setup that provides a complete development environment.

What's included
===============

- **P9 Node** with GRPC on port 20100
- **Test Identity Provider** for wallet ID issuance
- **Wallet Proxy** on port 7013
- **CCDScan Explorer** on port 7016
- **PostgreSQL Database** supporting wallet proxy and CCDScan
- **pgAdmin** on port 8432 for database management
- **Web Server** on port 7020 for PLT token metadata
- **ZK Verifier Backend** on port 7017
- **ZK Proof Explorer Frontend** on port 7018

Getting started
===============

See the full setup instructions, prerequisites, and usage guide:

👉 `Concordium Local Stack on GitHub <https://github.com/Concordium/concordium-local-stack>`_

The repository includes everything you need: wallet configuration, identity provisioning, test CCD distribution, and PLT token creation.

If you need to run a node connected to mainnet or testnet (rather than a local chain), see:

- :ref:`Run a Concordium node <node-requirements>`
