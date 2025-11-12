.. include:: ../../../variables.rst
.. _supporting-transactions:

=======================
Supporting transactions
=======================

A wallet's fundamental purpose is to construct, sign, and broadcast :term:`transactions<transaction>`. Each user-facing feature you implement will require your wallet to generate a specific type of transaction payload.

The following section lists the core transaction types you can support.

Transaction types
=================

**1. Simple transfer**

This is the most fundamental transaction type, used for sending the native CCD token from one account to another. It is a straightforward value transfer, equivalent to a standard payment on other blockchains.

**2. Smart contract transactions**

This category covers all interactions with :term:`smart contracts<smart contract>`. It enables users to interact with dApps and manage tokens built on the CIS-2 standard (Concordium's universal token standard for Fungible, Non-Fungible, and Semi-Fungible tokens). Common actions include:

* Deploying and initializing contracts
* Updating contracts (e.g., calling a transfer function on a CIS-2 token)

**3. Staking and delegation transactions**

These transactions are essential for participating in Concordium's :term:`proof-of-stake` network. Key transactions for delegators include:

* Add delegation: Staking CCD with a validator pool
* Update delegation: Changing the staked amount
* Remove delegation: Unstaking CCD

**4. Account and identity transactions**

Unique to Concordium's architecture, this category includes the crucial create account transaction. This must be submitted with the cryptographic credential from a user's verified :term:`identity object`, linking the new account to that identity.

Protocol-level tokens
=====================

Beyond the standard transaction types, Concordium features :term:`protocol-level tokens (PLTs)<protocol-level token (PLT)>`, a unique class of tokens created directly at protocol level.

These tokens are distinct from user-created CIS-2 smart contract tokens. They are typically reserved for foundational assets, such as bridged tokens (e.g., wETH), that require native protocol integration.

Key advantages of PLTs
----------------------

* **Higher Efficiency** - Because they are native to the protocol, PLT transactions consume significantly less energy, making them cheaper and faster to transfer.
* **Enhanced Security** - PLT logic is part of the blockchain's core code, subject to the highest levels of scrutiny, which reduces smart contract risks.
* **Standardized Governance** - Upgrades are managed through Concordium's established on-chain governance process, ensuring stability.

For a wallet, supporting a PLT transfer means constructing a dedicated, protocol-level transaction, which is different from the general-purpose update function used for smart contracts.

For further details on PLTs, refer to our :ref:`PLT<plts>` documentation.

