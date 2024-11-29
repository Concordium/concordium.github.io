=======================
Developer Documentation
=======================

Concordium is a public blockchain platform designed for security, privacy, and scalability. It offers a unique identity layer for verified and private user interactions. Developers can leverage Concordium's fast and affordable transactions, along with its robust smart contract capabilities, to build innovative decentralized applications.

Explore our developer resources, including detailed documentation, tutorials, and a suite of tools to support your development journey.

.. image:: ./images/frontpage.png
   :width: 400px
   :alt: frontpage image
   :align: center


.. container:: three-columns

   .. container:: column1

      .. raw:: html

           <a href="./index.html" class="heading-link"><strong>Docs</strong></a>

      Explore Concordium's architecture, unique ID layer, transaction structure, and tokens.
      Understand the fundamentals of building on Concordium, and join our developer community.


   .. container:: column2

      .. raw:: html

           <a href="../tutorials/index.html" class="heading-link"><strong>Tutorials</strong></a>


      Develop on Concordium: Learn to build smart contracts and dApps, and set up your development environment. Find tutorials, code examples, and guides to help you get started today.

   .. container:: column3

      .. raw:: html

           <a href="../tools/index.html" class="heading-link"><strong>Tools</strong></a>


      Access a comprehensive set of tools to build your dApps.
      Find SDKs, APIs, smart contract libraries, CLI, CCDScan, Testnet Faucet, and IDE plugins.

.. raw:: html

   <style>
   .three-columns {
       display: flex;
       justify-content: space-between;
       gap: 2em; /* Tilføjer mellemrum mellem spalterne */
   }
   .column1, .column2, .column3 {
       width: 30%;
       padding: 1em; /* Tilføjer indvendig polstring */

   }
   </style>

.. toctree::
   :caption: Concordium Protocol
   :hidden:

   What is the Concordium Protocol? <protocol/introduction>
   Identities <protocol/id-accounts>
   Accounts <protocol/manage-accounts>
   Transactions <protocol/transactions>
   Network <protocol/network>

.. toctree::
   :caption: Smart Contracts
   :hidden:

   What is a smart contract? <smart-contracts/introduction>
   QuickStart to smart contract deployment <smart-contracts/guides/quick-start>
   Build a smart contract <smart-contracts/guides/build-contract>
   Deploy a smart contract <smart-contracts/guides/deploy-module>
   Development best practices <smart-contracts/guides/development>
   Cost reduction best practices <smart-contracts/guides/costs>
   References <smart-contracts/references/index>

.. toctree::
   :caption: Network
   :hidden:

   What is the Concordium Network? <network/introduction-network>
   Validator Management <network/baker-pool>
   Run a node on Concordium <network/nodes/node-requirements>
   Use Concordium's ID layer <network/web3-id/index.rst>
   Run a local chain <network/guides/run-local-chain.rst>
   Indexers <network/indexers/intro.rst>


.. toctree::
   :caption: Help & FAQ
   :hidden:

   Downloads <installation/downloads>
   Release notes <release-notes/release-notes-lp>
   Concordium wallets<./guides/wallets-lp>
   FAQs <help-and-faq/faqs>
   Concordium Standards <https://proposals.concordium.software/index.html>
   Glossary of Concordium terms <resources/glossary>


.. toctree::
   :caption: Governance Committee Voting
   :hidden:

   Concordium Governance Committee Elections <voting/gc-voting>
   Election coordinator tool <voting/coordinator>
   How to vote <voting/voting>
   Guardians <voting/guardians>
   Verify election result <voting/verify-election-result>

