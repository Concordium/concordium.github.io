=======================
Developer Documentation
=======================

Concordium is a public blockchain platform designed for security, privacy, and scalability. It offers a unique identity layer for verified and private user interactions. Developers can leverage Concordium's fast and affordable transactions, along with its robust smart contract capabilities, to build innovative decentralized applications.

Explore our developer resources, including detailed documentation, tutorials, and a suite of tools to support your development journey.

.. image:: ./images/frontpage.png
   :width: 400px
   :alt: frontpage image
   :align: center


.. container:: four-columns

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

   .. container:: column4

      .. raw:: html

           <a href="../community/index.html" class="heading-link"><strong>Community</strong></a>


      Developer Community.
      Find out about latest initiatives, projects and events for Concordium Developers.

.. raw:: html


    <style>
   .. .three-columns {
   ..     display: flex;
   ..     justify-content: space-between;
   ..     gap: 2em; /* Tilføjer mellemrum mellem spalterne */
   .. }
   .. .column1, .column2, .column3 {
   ..     width: 30%;
   ..     padding: 1em; /* Tilføjer indvendig polstring */

   .. }
    </style>

.. Note::

   Currently, Rust toolchain versions up to ``1.81`` are and newer are not supported by older ``cargo-concordium`` versions ( <= ``4.0.0``). Update ``cargo-concordium`` if you see the error ``Unexpected byte 0x80. Expected 0x00`` as follows:

   .. code-block:: console

      $ cargo install cargo-concordium
      $ cargo concordium --version
      $ cargo-concordium 4.1.1

   The minimum supported rust version is currently version ``1.73``

.. toctree::
   :caption: Concordium Protocol
   :hidden:

   What is the Concordium Protocol <protocol/concordium-protocol>
   Identity <protocol/identity>
   Accounts <protocol/manage-accounts>
   Transactions <protocol/transactions>
   Consensus mechanisms <protocol/consensus-mechanisms>
   Tokenomics <protocol/tokenomics>
   Staking <protocol/staking>

.. toctree::
   :caption: Protocol Level Tokens
   :hidden:

   What are Protocol-Level Tokens (PLTs)? <plt/index>
   Get started with PLTs <plt/setup-guide/index>
   Operations <plt/operations/index>
   Examples <plt/examples/index>

.. toctree::
   :caption: Smart Contracts
   :hidden:

   QuickStart <smart-contracts/guides/quick-start>
   What is a smart contract? <smart-contracts/introduction>
   Build <smart-contracts/guides/build-contract>
   Deploy <smart-contracts/guides/deploy-module>
   Best practices <smart-contracts/best-practices/index>
   References <smart-contracts/references/index>

.. toctree::
   :caption: Network
   :hidden:

   Validator Management <network/baker-pool>
   Run a Concordium Node <network/nodes/node-requirements>
   Use Concordium's ID layer <network/web3-id/index.rst>
   Run a local chain <network/guides/run-local-chain.rst>
   Indexers <network/indexers/intro.rst>

.. toctree::
   :caption: Integration
   :hidden:

   Wallet integration <integration/wallet integration/wallet-integration>
   X402 Integration <integration/x402 integration/x402-integration>

.. toctree::
   :caption: Help & FAQ
   :hidden:

   Downloads <installation/downloads>
   Release notes <release-notes/release-notes-lp>
   Concordium wallets<./guides/wallets-lp>
   FAQs <help-and-faq/faqs>
   Concordium Standards <https://proposals.concordium.software/index.html>
   Glossary of Concordium terms <resources/glossary>
   Exchange Onboarding Guide <resources/exchangeOnBoarding>

.. toctree::
   :caption: Governance Committee Voting
   :hidden:

   Concordium Governance Committee elections <voting/gc-voting>
   Election coordinator tool <voting/coordinator>
   How to vote <voting/voting>
   Guardians <voting/guardians>
   Verify election result <voting/verify-election-result>

