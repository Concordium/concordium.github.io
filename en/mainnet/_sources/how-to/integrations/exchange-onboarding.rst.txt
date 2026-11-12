.. include:: ../../variables.rst
.. _exchangeOnBoarding:

======================
Onboard as an exchange
======================

.. admonition:: At a glance

   This guide shows you how to add CCD, the native token of Concordium, and Protocol-Level Tokens (PLTs), the other tokens issued natively on Concordium, to your exchange. You need a Concordium node, one of the Concordium SDKs or the gRPC API, and, before you go live on mainnet, one verified company identity. After following this guide, you can handle deposits and withdrawals of CCD and PLTs, which use the same accounts, addresses, and APIs.

Integration path
================

If you have integrated an account-based chain before, most of this integration is familiar. It has six steps:

#. :ref:`Start on testnet <exchange-testnet>`. No identity verification is needed.
#. :ref:`Choose an integration method <exchange-integration-method>`.
#. :ref:`Detect deposits <exchange-deposits>`.
#. :ref:`Process withdrawals <exchange-withdrawals>`.
#. :ref:`Get a company identity and create mainnet accounts <exchange-mainnet-accounts>`. Start this step early and run it in parallel with steps 1 to 4. It involves document review by the identity provider, not engineering work.
#. :ref:`Set up your mainnet node <exchange-node>`.

.. _exchange-testnet:

Start on testnet
================

Testnet works like mainnet, but identities are issued without verification. You can start development immediately and use the public testnet node for steps 1 to 4.

#. Create an identity and an account in any Concordium wallet. See :ref:`Create an identity <create-initial-account>` and :ref:`Create an account <create-account>`. To test with a company identity, follow :ref:`Company identity creation <company-identities>`.

#. Request testnet CCD for the account in the wallet. You can also call the same faucet directly. Replace ``YOUR_ACCOUNT_ADDRESS`` with your account address:

   .. code-block:: console

      $ curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/YOUR_ACCOUNT_ADDRESS

   You can request one CCD drop per account.

#. Connect your integration to the public testnet node at ``grpc.testnet.concordium.com``, port ``20000``, with TLS enabled. You set up your own node for mainnet in step 6.

.. _exchange-integration-method:

Choose an integration method
============================

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - If you
     - Use
   * - Already use the Rosetta API for other chains
     - The `Concordium Rosetta adapter <https://github.com/Concordium/concordium-rosetta>`_.
   * - Build a new integration
     - One of the Concordium :ref:`SDKs <sdks-apis>`: `Node.js <https://github.com/Concordium/concordium-node-sdk-js>`_, `Rust <https://github.com/Concordium/concordium-rust-sdk>`_, `.NET (C#) <https://github.com/Concordium/concordium-net-sdk>`_, `Java <https://github.com/Concordium/concordium-java-sdk>`_, or `Go <https://github.com/Concordium/concordium-go-sdk>`_.
   * - Work in a language without an SDK
     - The :ref:`gRPC v2 API <grpc2-documentation>` directly.

.. _exchange-deposits:

Detect deposits
===============

The recommended setup gives each user a unique :term:`alias` of one deposit account. All aliases share the balance of that account.

Assign deposit addresses
------------------------

#. Create one deposit account. See :ref:`exchange-mainnet-accounts`.
#. Derive one alias per user with the SDK, for example with ``get_alias`` in the Rust SDK or ``AccountAddress.getAlias`` in the Node.js SDK. Aliases exist from the moment the account exists and need no on-chain transaction.
#. Store the mapping between each alias and the user it belongs to.

Watch for incoming transfers
----------------------------

#. Subscribe to finalized blocks from your node with ``GetFinalizedBlocks``.
#. Process blocks in height order, and store the height of each block once you have processed it. If a block arrives more than one height above the last block you processed, first get the missing blocks with ``GetBlocksAtHeight``. This also covers restarts and dropped connections: subscribe again, and fill the gap before you continue. In the Rust SDK, ``get_finalized_blocks_from`` does this for you from a given height.
#. For each block, get the transaction outcomes with ``GetBlockTransactionEvents``.
#. Select the successful plain transfers, with or without a memo, of CCD or a PLT, where the first 29 bytes of the receiver address match your deposit account. The last 3 bytes identify the alias, and therefore the user.
#. Credit the user. Blocks from ``GetFinalizedBlocks`` are already final, so no further confirmations are needed.

Two other kinds of transfer can reach your deposit account. Do not credit them like a normal deposit:

- Transfers with schedule. The amount arrives locked and is released in steps over time. Credit each part only when it is released, or do not accept transfers with schedule.
- Transfers from smart contracts. These appear as a transfer event inside a contract update, not as an account transfer. Handle them separately, for example through manual review.

Alternatively, run the `transaction logging service <https://github.com/Concordium/concordium-transaction-logger>`_. It logs transactions to a database where you can look up the transactions for your deposit account. The same rules for what to credit apply.

.. note::

   - If your platform uses memos instead of aliases, read the memo from the transfer event. Memo transfers are available in all Concordium SDKs and through gRPC.
   - Some PLTs have an :term:`allow list` or a :term:`deny list`. With an allow list, both the sender and the recipient must be on it for a transfer to succeed. With a deny list, neither may be on it. Before you list a token with an allow list, ask the token issuer to add your deposit account, or deposits and withdrawals of that token are rejected.

.. _exchange-withdrawals:

Process withdrawals
===================

#. Get the next sequence number of your account with ``GetNextAccountSequenceNumber``. All aliases of an account share one sequence number. If several workers send withdrawals from the same account, they must coordinate and use consecutive numbers.
#. Create a CCD or PLT transfer, with or without a memo. Set an expiry time, which every transaction needs, and sign the transaction with the account key. Fees are paid in CCD, also for PLT transfers.
#. Submit the transaction with ``SendBlockItem``.
#. Query ``GetBlockItemStatus`` until the transaction is finalized, then check its outcome.

.. _exchange-mainnet-accounts:

Get a company identity and create mainnet accounts
==================================================

Get a company identity
----------------------

A company identity belongs to your company, not to an individual employee. Global FinReg issues it, and you request it from |bw| or |cryptox|. The Desktop Wallet does not support company identities. You need only one company identity.

Before you start, prepare the following:

- Your company's Legal Entity Identifier (LEI), or the company's entity details.
- Business registry documents or documents from a financial supervisory authority, from a primary source and no older than three months.
- Details of an Ultimate Beneficial Owner (UBO) or an authorized signatory, who verifies their identity with a passport or driver's license.

Then follow :ref:`Company identity creation <company-identities>`.

Create accounts
---------------

One identity can have up to 26 accounts. Because of aliases, an exchange rarely needs more than a few. Create the accounts from your company identity. See :ref:`Create an account <create-account>`.

To sign transactions from your own systems, export the account keys from the wallet. See :ref:`Export account private key <export-key>`. Treat the exported key as a hot-wallet secret, and store it in a hardware security module (HSM) or a secrets manager.

.. _exchange-node:

Set up your mainnet node
========================

Running your own node is essential for exchange integration.

- Check the :ref:`hardware requirements <system-requirements-node-mainnet>`.
- Use the supported ``concordium/node`` Docker image on Linux, macOS, or Windows. Follow :ref:`install-node-docker-image` for a new installation or :ref:`migrate-to-docker` for an existing node. Native packages, network-specific Docker images, and AWS Marketplace products are deprecated.

For custom node setups, contact `Concordium Support <mailto:support@concordium.software>`_.

.. _exchange-compare:

How Concordium compares to other chains
=======================================

If you have integrated other chains, the table below summarizes what is specific to Concordium.

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Topic
     - On Concordium
   * - Accounts
     - Account-based, similar to Ethereum. Every account is created from a verified :term:`identity`, and one company identity can have up to 26 accounts.
   * - Finality
     - Explicit. A transaction is final when the node reports it in a finalized block, usually within a few seconds. There is no number of confirmations to choose.
   * - Deposit addresses
     - Every account has 16,777,216 addresses, called :ref:`account aliases <account-aliases-details>`. They share one key and one balance, so you can give each user a unique deposit address without creating new accounts.
   * - Memos
     - Supported through transfers with memo. Optional if you use account aliases.
   * - Tokens
     - CCD and :ref:`Protocol-Level Tokens (PLTs) <plts>`. PLTs use the same accounts, aliases, and node APIs as CCD.

Get help
========

For help with your integration, contact support@concordium.software. Start the subject line with ``Approved Exchange`` to prioritize your request.
