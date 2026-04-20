.. include:: ../variables.rst
.. _tutorials:
.. _sc-tutorials:

=========
Tutorials
=========

Welcome to Concordium's tutorials. Each tutorial guides you through building something complete from start to finish. Browse all tutorials below, grouped by topic, or use the sidebar to navigate directly to a section.

.. grid:: 1 1 2 2
   :gutter: 3

   .. grid-item::

      **Integrating Concordium ID**

      - :doc:`Verifying account ownership <verify-account-ownership-signature-proofs/signature-proofs>`
      - :doc:`Building a Zero-Knowledge Proof dApp on Concordium <using-ID-in-dApps/index>`

        - :doc:`ZK proof generation <using-ID-in-dApps/zk-proofs-tutorial>`
        - :doc:`Implementing Wallet Connectors <using-ID-in-dApps/wallet-connectors-tutorial>`

      - :doc:`Concordium Age Verification Tutorial <verify-access/index>`

        - :doc:`Introduction <verify-access/introduction>`
        - :doc:`Scaffolding the Project <verify-access/scaffolding>`
        - :doc:`UI Integration <verify-access/ui-integration>`
        - :doc:`Additional Steps <verify-access/additional-steps>`

      - :doc:`Company identity creation <company-identity/company-identities>`

      **Transaction Workflows**

      - :doc:`Sponsored transactions <protocol-level-sponsored-transactions/index>`

        - :doc:`Set up a sponsor service <protocol-level-sponsored-transactions/set-up-a-sponsor-service>`
        - :doc:`Create a sponsored transaction <protocol-level-sponsored-transactions/create-a-sponsored-transaction>`

      - :doc:`A Sponsored Transactions dApp <sponsoredTransactions/index>`

        - :doc:`Sponsored Transactions Frontend and Backend <sponsoredTransactions/sponsoredTransactionsFrontendAndBackend>`
        - :doc:`Sponsored Transactions Smart Contract <sponsoredTransactions/sponsoredTransactionsSmartContract>`

      **Protocol-Level Tokens**

      - :doc:`Protocol-Level Tokens (PLTs) <plt/index>`

        - :doc:`Get started with PLTs <plt/setup-guide>`
        - :doc:`Request test CCD <plt/request-ccd>`
        - :doc:`Request PLT issuance <plt/request-plt>`
        - :doc:`PLT operations <plt/operations>`
        - :doc:`PLT examples <plt/examples>`
        - :doc:`Web SDK <plt/web-sdk>`
        - :doc:`Rust SDK <plt/rust-sdk>`
        - :doc:`Concordium Client CLI Tool <plt/concordium-client>`

   .. grid-item::

      **Tokens and Assets**

      - :doc:`Mint fungible tokens <fungible-tokens/index>`

        - :doc:`Smart contract implementation for fungible tokens <fungible-tokens/smart-contract>`
        - :doc:`Mint, transfer, and burn fungible tokens <fungible-tokens/mint-xfer>`

      - :doc:`Mint an NFT <nft-minting/index>`

        - :doc:`Upload the NFT <nft-minting/upload-nft>`
        - :doc:`Initialize, build, and deploy the smart contract <nft-minting/build-smart-contract>`
        - :doc:`Mint and transfer the NFT <nft-minting/mint-xfer>`

      - :doc:`Mint a semi-fungible token <sft-minting/index>`

        - :doc:`Smart contract modifications <sft-minting/build-smart-contract>`
        - :doc:`Mint and transfer semi-fungible token <sft-minting/mint-xfer>`

      - :doc:`The wCCD smart contract <wCCD/index>`

        - :doc:`Understanding the wCCD smart contract <wCCD/wCCD-introduction>`
        - :doc:`Interacting with the wCCD token protocol <wCCD/wCCD-interacting>`
        - :doc:`Setting up the frontend <wCCD/wCCD-frontend-set-up>`

      - :doc:`Implementing CIS-2 token receiving hooks <onReceivingCIS2/on-receivingCIS2>`

      **Building Smart Contracts**

      - :doc:`Set up the development environment <setup-env>`
      - :doc:`Concordium smart contracts quick start guide <quick-start>`
      - :doc:`Creating your first Concordium dApp <hello-world/hello-world>`
      - :doc:`Concordium counter smart contract <counter/counter-contract>`
      - :doc:`The piggy bank smart contract <piggy-bank/index>`

        - :doc:`Writing the piggy bank smart contract <piggy-bank/writing>`
        - :doc:`Testing the piggy bank smart contract <piggy-bank/testing>`
        - :doc:`Deploying the piggy bank smart contract <piggy-bank/deploying>`
        - :doc:`Setting up a frontend <piggy-bank/frontend>`

      - :doc:`Upgrading smart contracts on Concordium <smartContractUpgrade/index>`

        - :doc:`Native upgradability <smartContractUpgrade/smartContractUpgrade>`

      **dApp Development**

      - :doc:`The Voting dApp <voting/index>`

        - :doc:`The Voting Smart Contract <voting/voting-sc>`
        - :doc:`Setting up the frontend <voting/voting-dapp>`

      - :doc:`Concordium low-code NFT framework <low-code-nft-marketplace/introduction>`

        - :doc:`Low code NFT marketplace <low-code-nft-marketplace/marketplace>`
        - :doc:`Low-code NFT minting tool <low-code-nft-marketplace/minting-tool>`

      - :doc:`An eSealing dApp <eSealing/index>`

        - :doc:`eSealing dApp <eSealing/eSealing_dapp>`

      - :doc:`dApp examples <daap-examples/dapp-examples>`

.. toctree::
   :caption: Integrating Concordium ID
   :hidden:
   :maxdepth: 2

   Verify account ownership, signature proofs <./verify-account-ownership-signature-proofs/signature-proofs>
   Using ID in dApps <./using-ID-in-dApps/index>
   Verify & Access <verify-access/index>
   Company Identity Guide <company-identity/company-identities>

.. toctree::
   :caption: Transactions Workflows
   :hidden:
   :maxdepth: 2

   Sponsored transactions <./protocol-level-sponsored-transactions/index>
   Smart contract sponsored transactions <./sponsoredTransactions/index>

.. toctree::
   :caption: Protocol-Level Tokens
   :hidden:
   :maxdepth: 2

   Get started with Protocol-Level Tokens <plt/index>

.. toctree::
   :caption: Tokens and Assets
   :hidden:
   :maxdepth: 2

   Fungible tokens <fungible-tokens/index>
   NFT minting <nft-minting/index>
   SFT minting <sft-minting/index>
   wCCD <./wCCD/index>
   Using the onReceivingCIS2 hook <./onReceivingCIS2/on-receivingCIS2>


.. toctree::
   :caption: Building Smart Contracts
   :hidden:
   :maxdepth: 2

   setup-env
   Quick start guide <quick-start>
   Hello World <./hello-world/hello-world>
   Counter <./counter/counter-contract>
   PiggyBank <./piggy-bank/index>
   Smart Contract Upgrade <./smartContractUpgrade/index>

.. toctree::
   :caption: dApp Development
   :hidden:
   :maxdepth: 2

   voting/index
   Low Code NFT Marketplace <./low-code-nft-marketplace/introduction.rst>
   eSealing <./eSealing/index>
   dApp examples <daap-examples/dapp-examples>
