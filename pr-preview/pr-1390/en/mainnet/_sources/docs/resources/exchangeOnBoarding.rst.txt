.. _exchangeOnBoarding:

=========================
Exchange Onboarding Guide
=========================

This guide will help you add Concordium's native token (CCD) to your cryptocurrency exchange.

Before you start, it is a good idea to read about the core concepts of the Concordium blockchain,
particularly :ref:`identities <reference-identity>` and :ref:`accounts <managing_accounts>`. The `Concordium Whitepaper <https://docs.concordium.com/governance/whitepaper/Concordium%20White%20Paper.pdf>`_ provides a comprehensive overview of these concepts.

Identity creation
=================

Concordium requires identity verification before account creation, which is a fundamental part of its regulatory compliance framework.

Mainnet identity creation
-------------------------

**For Individual Identities:**

* You can use any of the Concordium wallets by following the documentation at :ref:`Create an identity <create-initial-account>`

**For Company Identities:**

- Follow the documentation at :ref:`Company Identity Creation <company-identities>`
- This process involves identity verification through Concordium's approved identity providers

Testnet identity creation
-------------------------

**For Both Individual and Company Identities:**

* No formal verification is required
* For individual identities, use :ref:`any of the Concordium wallets <create-initial-account>`
* For company identities, follow the documentation at :ref:`Company Identity Creation <company-identities>`

Account creation
================

Once you have a verified identity, you can create multiple accounts from it.

* Up to 25 initial accounts can be created from a single identity
* Accounts can be created using any Concordium wallet, follow the documentation at :ref:`create an account <create-account>` for more information

Node setup
==========

Running your own node is essential for exchange integration.

Hardware requirements
---------------------

Before setting up a node, ensure your hardware meets the :ref:`requirements for running a node <system-requirements-node-mainnet>`.

Node distributions
------------------

Node distributions for different platforms are available at the :ref:`Downloads page <node-downloads>`.

Platform-specific setup instructions
------------------------------------

* :ref:`Ubuntu Node <run-node-ubuntu>`
* :ref:`Docker Node <run-a-node>`
* :ref:`Windows Node <run-node-windows>`
* :ref:`macOS Node <run-node-macos>`
* :ref:`AWS Node <run-a-node-aws>`

For custom node setups, contact `Concordium Support <mailto:support@concordium.software>`_.

Integration methods
===================

Concordium offers several methods for integrating with the blockchain:

SDKs
----

You can use one of the official Concordium :ref:`SDKs <sdks-apis>`:

* `Node.js SDK <https://github.com/Concordium/concordium-node-sdk-js>`_
* `Rust SDK <https://github.com/Concordium/concordium-rust-sdk>`_
* `.NET (C#) SDK <https://github.com/Concordium/concordium-net-sdk>`_
* `Java SDK <https://github.com/Concordium/concordium-java-sdk>`_
* `Go SDK <https://github.com/Concordium/concordium-go-sdk>`_

Rosetta API
-----------

Concordium provides an adapter to expose the `Rosetta API <https://github.com/Concordium/concordium-rosetta>`_, which is useful for exchanges already supporting this standard.

gRPC V2 interface
-----------------

Concordium provides a gRPC V2 interface as well, details can be found in this :ref:`documentation article <grpc2-documentation>`.

Transactions
============

Checking for incoming transactions
----------------------------------

**Node Query Method**

* The most reliable method is to :ref:`query your node <testnet-query-node>` directly

**Transaction Logger**

- Alternatively, you can run a `transaction logging service <https://github.com/Concordium/concordium-transaction-logger>`_
- This service logs transactions to a database where you can efficiently lookup the transaction for a specific account

Transfer CCD on withdrawal request
----------------------------------

- Use the :ref:`SDK <sdks-apis>` of your choice to implement CCD transfers.
- Transfer of CCD is also possible with :ref:`gRPC <grpc2-documentation>`.

FAQ
===

Account aliases
---------------

**Q: Do we have to create a company identity for each account?**

  * No, one identity can have multiple accounts. Once you have a verified identity object, you can generate as many accounts as you need from it. It should not be necessary for you to have several identities, one will suffice.
    For your users, the recommended setup is to use :ref:`account aliases <account-aliasses>`:

    * This means that you create one or more omnibus accounts and generate aliases/subaccounts for individual user transfers
    * Subaccounts share the same private key but have different addresses, making it easy to organize user deposits and withdrawals
    * Each account can have up to 2^24 aliases (approximately 16 million)

Transfer with MEMO
------------------

**Q: How can we include additional data with transactions?**

  * Concordium supports memo transfers, which allow you to attach additional data to a transaction. This is useful for exchange integrations to track user deposits:

    * Memo transfers can be implemented through any of the Concordium :ref:`SDKs <sdks-apis>` or through :ref:`gRPC <grpc2-documentation>`

Transaction confirmation
------------------------

**Q: When is a transaction considered confirmed?**

  * Concordium has explicit finalization:

    * Once a block is created, it usually takes 1-2 seconds to be finalized
    * Average block time is about 2 seconds
    * The node will report a transaction as finalized once it's in a finalized block
    * Finalization is not based on the number of successor blocks

Getting testnet CCDs
--------------------

**Q: How do I get CCDs for testing on testnet?**

  * For individual accounts:

    * Request a CCD drop directly through the :ref:`Concordium wallets <setup-wallets-lp>`

  * For company accounts:

    .. code-block:: console

      $ curl -X PUT https://wallet-proxy.testnet.concordium.com/v0/testnetGTUDrop/YOUR_ACCOUNT_ADDRESS

    * Replace ``YOUR_ACCOUNT_ADDRESS`` with your account address. You can only request one CCD drop per account.

Additional support
==================

For specific help to integrate your exchange with the Concordium blockchain, contact support@concordium.software.

Please start your subject line with "Approved Exchange" to prioritize your support request.
