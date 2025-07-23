.. _plts:

============================
Protocol-Level Tokens (PLTs)
============================

Protocol-Level Tokens (PLTs) are tokens issued and managed directly on the Concordium blockchain without a need for :term:`smart contracts<smart contract>`. PLTs provide enhanced security by reducing attack vectors, improved efficiency in execution, and direct governance controls for token issuers.

PLTs are implemented on protocol level. All account (balances, transfers etc.) and management operations are handled natively by the chain itself through transactions from regular Concordium accounts.


Token governance
================

A PLT is instantiated through a governance transaction after an off-chain application process by the issuer, and thereafter managed through on-chain transactions. The issuer can create the PLT either with or without an initial supply.

Each token has a unique string based symbol (e.g. USDQ), which is used in all transactions and events related to that token, and because the uniqueness is enforced by the chain, imitation of a PLT by creating another token with the same symbol is not possible.

PLTs can optionally support allow and deny lists to control the ability of Concordium :term:`accounts<account>` to hold/transfer that PLT. Furthermore, they can optionally support mint and burn operations to manage total supply of the PLT, with these being specified at instantiation.

PLT supports the pause and unpause operations, which allow temporarily disabling or re-enabling all balance-affecting actions, such as transfers, minting, and burning. When a token is paused, any attempt to perform these operations will fail. These actions can only be executed by the token-governance account.

Available operations
====================

The following operations are available:

* **Creation**: A PLT is created through a chain-governance operation
* **Token-governance operations**:
    * Minting tokens
    * Burning tokens
    * Administering allow- and deny-lists
    * Pausing and unpausing
* **Token-holder operations**: Transferring PLTs
* **State queries**: Retrieving information about PLTs, balances, and accounts

Node APIs support retrieving information about PLTs at three levels: individual token details (capabilities, supply, etc.), a complete listing of all existing PLTs, and account-specific information (balances and allow/deny list status).

For detailed instructions on the setup, available operations and examples, see the dedicated guides in the subsections below.
