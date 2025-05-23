.. _plt-setup-guide:

Get started with PLT DevNet
===========================

This section covers everything you need to get started with Protocol Layer Tokens (PLTs) on Concordium's DevNet. Read the following overview to understand the PLT issuance process before proceeding to the setup guides.

PLT issuance process overview
-----------------------------

To issue and work with PLTs on the Concordium network, the following steps are required:

1. **Create a Concordium blockchain account**. If you do not already have a Concordium account, you'll need to create one that can manage PLTs. This account will be nominated to manage the issued PLTs. Creation requires completing an identity check with an Identity Provider, which is a prerequisite for obtaining a ConcordiumID.

2. **Create PLT metadata and prepare the MetadataUrl**. You'll need to create and host (offchain) a PLT metadata JSON file. The metadata URL will be part of the PLT token definition.

3. **Submit the PLT definition to the governance committee**. In v1.0, this information is sent directly to the governance committee members.

4. **Governance Committee creates the new PLT**. Creating a new PLT is a chain-governance operation. The Concordium governance committee will convene to perform a chain update to issue the PLT token. After the chain update, the PLT is created with the initial supply (if any) available on the nominated account.

5. **Perform Token-Holder and Query Transactions**. Once your PLT is created, you can perform the following operations: transferring PLTs, querying token lists, getting token information, and checking account balances using the available tools and SDKs.

The PLT documentation guides will walk you through this entire process. We'll start with setting up your DevNet environment, guide you through the PLT issuance process, and show you how to perform operations with your PLTs once they're created. Beyond the initial setup, you'll find detailed information on token transfers, querying token information, integrating with SDKs, and working with the Concordium CLI to manage your PLTs.

DevNet setup guide
------------------
Before you can issue or interact with PLTs on DevNet, you need to set up your environment by following these steps:

1. :doc:`Browser Wallet Setup for DevNet <browser-wallet>` - Install the custom DevNet Browser Wallet
2. :doc:`Connecting to DevNet <devnet-connection>` - Configure your wallet to connect to the DevNet environment
3. :doc:`Getting Test CCD on DevNet <request-ccd>` - Request test CCD tokens needed for transactions
4. :doc:`Requesting PLT Issuance <request-plt>` - Submit a request to have your PLT issued on DevNet

These guides will walk you through the complete setup process to prepare you for working with PLTs on Concordium's DevNet environment.


.. toctree::
   :maxdepth: 1
   :hidden:

   browser-wallet
   devnet-connection
   request-ccd
   request-plt
