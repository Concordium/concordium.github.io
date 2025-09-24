.. _plt-operations:

==============
PLT operations
==============

This page covers the core operations available with Protocol-Level Tokens (PLTs) on Concordium's testnet.

Available SDKs and tools
========================

You can interact with PLTs using multiple development approaches:

- **Concordium Web SDK** (v10.0.0) - TypeScript/JavaScript examples for web applications

  `Web SDK released versions <https://www.npmjs.com/package/@concordium/web-sdk>`_

- **Concordium Rust SDK** (v7.0.0) - Rust examples for native applications

  `Rust SDK released versions <https://crates.io/crates/concordium-rust-sdk>`_

- **Concordium Client CLI Tool** (v9.1.4) - Command-line interface for direct operations

  :ref:`Download concordium-client <concordium-node-and-client-download>`


Operation Categories
====================

PLT operations are organized into three main categories:

Create and manage PLTs
----------------------
This category covers token governance operations:

* **Mint tokens:** Mint new tokens (issuer only)

* **Burn tokens:** Burn existing tokens (issuer only)

* **Add account to allow list:** Add an account to the allow list for a PLT (issuer only)

* **Remove account from allow list:** Remove an account from the allow list for a PLT (issuer only)

* **Add account to deny list:** Add an account to the deny list for a PLT (issuer only)

* **Remove account from deny list:** Remove an account from the deny list for a PLT (issuer only)

* **Pause:** Suspends balance transfer operations for a PLT (issuer only)

* **Unpause:** Resumes balance transfer operations for a PLT (issuer only)

Transfer PLTs
-------------
This category covers the operation of transferring PLTs to another account on testnet.

The transfer operation is the only token-holder operation implemented in the MVP. (In the future, other operations may include scheduled send and creating locks, for instance.) As with token-governance, there will be a single token-holder account transaction that supports cases for each token-holder operation. All token-holder operations will identify the token by its ticker symbol.

The token transfer transaction specifies the destination (currently limited to an account), the amount, and an optional memo. The originating account must have a sufficient balance in the PLT to cover the transfer. The receiving account must exist. If there is an allow list for the PLT, both accounts must be on the allow list. If there is a deny list, neither account may be on the deny list.

Query PLT information
---------------------
This category covers operations for querying information about PLTs and account balances on testnet.

* **Get token list:** Retrieve all PLTs available on the network.
* **Get token information:** Retrieve detailed information about a specific PLT.
* **Get account information:** Retrieve account details including PLT balances.

Examples
========
Depending on your development approach, you can find examples for each operation category:

* :ref:`Using Concordium Client CLI Tool<plt-concordium-client>`

* :ref:`Using Web SDK<plt-web-sdk>`

* :ref:`Using Rust SDK<plt-rust-sdk>`

