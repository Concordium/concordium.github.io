.. include:: ../variables.rst
.. _tutorials:
.. _sc-tutorials:

==========
Tutorials
==========

Welcome to Concordium's tutorials section where you can sharpen your skills as a dApp (decentralized application) developer.

Getting Started
---------------

.. container:: tutorial-section tutorial-section-blue

   Begin your journey by setting up your development environment and learning the fundamentals through hands-on tutorials.

   :ref:`Setup Guide → <setup-env>`

Basic Smart Contracts
---------------------

.. container:: tutorial-section tutorial-section-green

   Build simple, fundamental contracts.

   * :ref:`Counter <counter-sc>` - Build a simple smart contract with an owner-controlled counter

Token Development
-----------------

.. container:: tutorial-section tutorial-section-yellow

   Build with various token standards.

   * :ref:`Fungible Tokens <ft-index>` - Mint, transfer, and burn fungible tokens
   * :ref:`NFT Minting <nft-index>` - Create and transfer non-fungible tokens
   * :ref:`wCCD Token <wCCD>` - Interact with wrapped CCD tokens on testnet
   * :ref:`Using the onReceivingCIS2 hook <cis2-receiving>` - Learn how to handle tokens received by a smart contract

Advanced Applications
---------------------

.. container:: tutorial-section tutorial-section-blue

   Learn how to create decentralized solutions for voting and NFT trading.

   * :ref:`PiggyBank <piggy-bank>` - Create a contract that accepts CCD deposits and implements owner-only withdrawal
   * :ref:`Voting dApp <voting-dapp>` - Build a complete voting system
   * :ref:`Low Code NFT Marketplace <low-code-nft-mp-intro>` - Create a marketplace for trading NFTs
   * :ref:`eSealing <eSealing>` - Implement document sealing with the |bw| and timestamp verification

ID Tutorials
------------

.. container:: tutorial-section tutorial-section-yellow

   Learn how to use the ID layer in dApps.

   * :ref:`Using ID in dApps <zk-proof-index>` - Use the ID Layer

Advanced Concordium Features
----------------------------

.. container:: tutorial-section tutorial-section-yellow

   * :ref:`Sponsored Transactions <sponsoredTransactions>` - Handle wallet signatures and backend processing
   * :ref:`Smart Contract Upgrade <intro-smart-contract-upgrade>` - Deploy and upgrade contract logic with state migration

Additional Resources
--------------------

.. container:: tutorial-section tutorial-section-blue

   * :doc:`dApp Examples <daap-examples/dapp-examples>` - Real-world examples of decentralized applications
   * :doc:`Company Identity Guide <company-identity/company-identities>` - Learn how to create and manage company identities
   * :ref:`Smart Contract Best Practices <best-practices>` - Recommended practices for production-ready development

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Tutorials

   setup-env
   Hello World <./hello-world/hello-world>
   Counter <./counter/counter-contract>
   PiggyBank <./piggy-bank/index>
   Using ID in dApps <./using-ID-in-dApps/index>
   Using the onReceivingCIS2 hook <./onReceivingCIS2/on-receivingCIS2>
   wCCD <./wCCD/index>
   voting/index
   nft-minting/index
   sft-minting/index
   fungible-tokens/index
   Concordium low-code NFT framework <./low-code-nft-marketplace/introduction.rst>
   eSealing <./eSealing/index>
   Sponsored Transactions <./sponsoredTransactions/index>
   Smart Contract Upgrade <./smartContractUpgrade/index>

.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: Additional Ressources

    dApp examples<daap-examples/dapp-examples>
    How to create a company identity<company-identity/company-identities>
