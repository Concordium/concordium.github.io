.. _plt-setup-guide:

=====================
Get started with PLTs
=====================

This section covers everything you need to get started with Protocol-Level Tokens (PLTs) on Concordium's testnet. Read the following overview to understand the PLT issuance process before proceeding to the setup guides.

PLT issuance process overview
==============================

To issue and work with PLTs on the Concordium network, the following steps are required:

1. **Create a Concordium blockchain account**. If you do not already have a Concordium account, you'll need to create one that can manage PLTs. This account will be nominated to manage the issued PLTs. Creation requires completing an identity check with an :term:`Identity Provider`, which is a prerequisite for obtaining a :ref:`ConcordiumID <concordium-id>`.

2. **Create PLT metadata and prepare the MetadataUrl**. You'll need to create and host (offchain) a PLT metadata JSON file. The metadata URL will be part of the PLT token definition.

3. **Submit the PLT definition to Concordium**. In v1.0, this information is sent directly to the Concordium team.

4. **Concordium creates the new PLT**. Creating a new PLT is a :term:`chain-governance operation`. The Concordium team will convene to perform a chain update to issue the PLT token. After the chain update, the PLT is created with the :term:`initial supply` (if any) available on the nominated account.

5. **Perform Token-Holder and Query Transactions**. Once your PLT is created, you can perform the following operations: transferring PLTs, querying token lists, getting token information, and checking account balances using the available tools and SDKs.

The PLT documentation guides will walk you through this entire process. We'll start with setting up your testnet environment, guide you through the PLT issuance process, and show you how to perform operations with your PLTs once they're created. Beyond the initial setup, you'll find detailed information on token transfers, querying token information, integrating with SDKs, and working with the Concordium Client CLI Tool to manage your PLTs.

Testnet PLT setup guide
=======================
Before you can issue or interact with PLTs on testnet, you need to set up your environment by following these steps:

1. :ref:`Download Browser Wallet <downloads-browser-wallet-testnet>` - Download and install the Browser Wallet extension
2. :ref:`Connect Browser Wallet to testnet <switch-network>` - Follow the guide to connect to testnet
3. :ref:`Create a testnet identity <create-testnet-identity-bw>` - Create a new identity on testnet, which is required for account creation; Use "Concordium testnet IP" as the Identity Provider
4. :ref:`Create a testnet account <create-account>` - Create a new account on testnet using your identity
5. :doc:`Request test CCD on testnet <request-ccd>` - Request test CCD tokens needed for transactions
6. :doc:`Request PLT issuance <request-plt>` - Submit a request to have your PLT issued on testnet

These guides will walk you through the complete setup process to prepare you for working with PLTs on Concordium's testnet environment.

CCDScan for testnet
===================

You can explore transactions, accounts, and PLT activity on testnet using the dedicated version of CCDScan, specifically configured for the testnet environment.
This version reflects only testnet data and is isolated from DevNet and Mainnet. You can access it `here <https://testnet.ccdscan.io>`_


.. toctree::
   :maxdepth: 1
   :hidden:

   request-ccd
   request-plt
