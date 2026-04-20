.. include:: ../variables.rst
.. _how-to:

======
How-to
======

Step-by-step guides for completing specific tasks on Concordium. Browse all guides below, grouped by topic, or use the sidebar to navigate directly to a section.

.. grid:: 1 1 2 2
   :gutter: 3

   .. grid-item::

      **Concordium ID**

      - :doc:`Implement Verify and Access <concordium-id/verify-and-access/index>`

        - :doc:`How it works <concordium-id/verify-and-access/how-it-works>`
        - :doc:`Select verification method <concordium-id/verify-and-access/select-verification-method>`
        - :doc:`Select Identity Provider <concordium-id/verify-and-access/select-identity-provider>`
        - :doc:`Manage transaction costs <concordium-id/verify-and-access/manage-transaction-costs>`
        - :doc:`Integrate verification flow <concordium-id/verify-and-access/integrate-verification-flow>`
        - :doc:`Access the Concordium network <concordium-id/verify-and-access/access-the-concordium-network>`

      **Integrations**

      - :doc:`Onboard as an exchange <integrations/exchange-onboarding>`
      - :doc:`Build a wallet with the Wallet SDK <integrations/wallet-sdk/wallet-sdk>`

        - :doc:`Create an identity <integrations/wallet-sdk/wallet-sdk-identity-creation>`
        - :doc:`Recover an identity <integrations/wallet-sdk/wallet-sdk-identity-recovery>`
        - :doc:`Create an account <integrations/wallet-sdk/wallet-sdk-credential-deployment>`
        - :doc:`Submit a transaction to a Concordium node <integrations/wallet-sdk/wallet-sdk-account-transaction>`
        - :doc:`Get the list of identity providers <integrations/wallet-sdk/wallet-sdk-identity-provider>`

      - :doc:`Integrate Concordium in a crypto wallet <integrations/wallet-integration/wallet-integration>`

        - :doc:`Integrating Concordium's ID layer <integrations/wallet-integration/integrating-identity-layer>`
        - :doc:`Supporting zero-knowledge proofs <integrations/wallet-integration/supporting-zero-knowledge-proofs>`
        - :doc:`Supporting transactions <integrations/wallet-integration/supporting-transactions>`
        - :doc:`Supporting staking <integrations/wallet-integration/supporting-staking>`
        - :doc:`Connecting your wallet to the network <integrations/wallet-integration/connecting-wallet-to-network>`

      - :doc:`Implement Web3 ID <web3-id/index>`

        - :doc:`Web3 ID issuers <web3-id/issuer>`
        - :doc:`Create proofs <web3-id/create-proofs>`

      - :doc:`Implement X402 payments <integrations/x402-integration>`

      **Validation**

      - :doc:`Validate with Concordium wallets <infrastructure/validation-with-wallets>`
      - :doc:`Validate with the Concordium Client <infrastructure/become-validator>`
      - :doc:`Add a validator <infrastructure/add-baker-mw>`
      - :doc:`Import validator keys <infrastructure/import-validator-keys>`
      - :doc:`Change validator options <infrastructure/update-baker-mw>`
      - :doc:`Suspend or unsuspend a validator <infrastructure/suspend-unsuspend-validator>`
      - :doc:`Stop validating <infrastructure/stop-validator>`
      - :doc:`Delegation and validation FAQ <infrastructure/delegation-faq>`

   .. grid-item::

      **Nodes**

      - :doc:`Run a Concordium node <nodes/node-requirements>`

        - :doc:`Run a node on Ubuntu <nodes/run-node-ubuntu/index>`
        - :doc:`Run a node on macOS <nodes/run-node-macos/index>`
        - :doc:`Run a node on Windows <nodes/run-node-windows/index>`
        - :doc:`Run a node using Docker <nodes/run-node-docker/index>`
        - :doc:`Run a node on AWS <nodes/run-node-aws/index>`

      - :doc:`Run a local chain <nodes/run-local-chain/index>`

        - :doc:`Using Docker (recommended) <nodes/run-local-chain/run-local-chain-docker>`
        - :doc:`Building from source <nodes/run-local-chain/run-local-chain-source>`

      **Smart Contracts**

      - :doc:`Set up smart contract development tools <smart-contracts/build-contract>`
      - :doc:`Set up a project <smart-contracts/setup-contract>`
      - :doc:`Compile a module <smart-contracts/compile-module>`
      - :doc:`Build a contract schema <smart-contracts/build-schema>`
      - :doc:`Use custom errors <smart-contracts/custom-errors>`
      - :doc:`Pass JSON parameters <smart-contracts/json-params>`
      - :doc:`Use no_std <smart-contracts/no-std>`
      - :doc:`Use fallback entrypoints <smart-contracts/fallback-entrypoints>`
      - :doc:`Write an upgradeable contract <smart-contracts/upgradeable-contract>`
      - :doc:`Implement the factory pattern <smart-contracts/factory-pattern>`
      - :doc:`Unit test a contract <smart-contracts/unit-test-contract>`
      - :doc:`Integration test a contract <smart-contracts/integration-test-contract>`
      - :doc:`Deploy a smart contract module <smart-contracts/deploy-module>`

        - :doc:`Initialize <smart-contracts/initialize-contract>`
        - :doc:`Interact <smart-contracts/interact-instance>`
        - :doc:`Inspect <smart-contracts/inspect-instance>`
        - :doc:`Invoke <smart-contracts/invoke-instance>`

      - :doc:`Migrate contracts <smart-contracts/migrate-contracts>`
      - :doc:`Best practices <smart-contracts/best-practices/index>`

        - :doc:`Development <smart-contracts/best-practices/development>`
        - :doc:`Cost reduction <smart-contracts/best-practices/costs>`

      **Governance**

      - :doc:`Cast a vote <governance/voting>`
      - :doc:`Participate as an election guardian <governance/guardians>`
      - :doc:`Verify election result <governance/verify-election-result>`
      - :doc:`Install the Concordium Governance Ledger app <governance/install-ledger-app>`

.. toctree::
   :caption: Concordium ID
   :hidden:

   Implement Verify and Access <concordium-id/verify-and-access/index>

.. toctree::
   :caption: Integrations
   :hidden:

   Onboard as an exchange <integrations/exchange-onboarding>
   Build a wallet with the Wallet SDK <integrations/wallet-sdk/wallet-sdk>
   Integrate Concordium in a crypto wallet <integrations/wallet-integration/wallet-integration>
   Implement Web3 ID <web3-id/index>
   Implement X402 payments <integrations/x402-integration>

.. toctree::
   :caption: Validation
   :hidden:

   Validate with Concordium wallets <infrastructure/validation-with-wallets>
   Validate with the Concordium Client <infrastructure/become-validator>
   Add a validator <infrastructure/add-baker-mw>
   Import validator keys <infrastructure/import-validator-keys>
   Change validator options <infrastructure/update-baker-mw>
   Suspend or unsuspend a validator <infrastructure/suspend-unsuspend-validator>
   Stop validating <infrastructure/stop-validator>
   Delegation and validation FAQ <infrastructure/delegation-faq>

.. toctree::
   :caption: Nodes
   :hidden:

   Run a Concordium node <nodes/node-requirements>
   Run a local chain <nodes/run-local-chain/index>

.. toctree::
   :caption: Smart Contracts
   :hidden:

   Set up smart contract development tools <smart-contracts/build-contract>
   Set up a project <smart-contracts/setup-contract>
   Compile a module <smart-contracts/compile-module>
   Build a contract schema <smart-contracts/build-schema>
   Use custom errors <smart-contracts/custom-errors>
   Pass JSON parameters <smart-contracts/json-params>
   Use no_std <smart-contracts/no-std>
   Use fallback entrypoints <smart-contracts/fallback-entrypoints>
   Write an upgradeable contract <smart-contracts/upgradeable-contract>
   Implement the factory pattern <smart-contracts/factory-pattern>
   Unit test a contract <smart-contracts/unit-test-contract>
   Integration test a contract <smart-contracts/integration-test-contract>
   Deploy a smart contract module <smart-contracts/deploy-module>
   Migrate contracts <smart-contracts/migrate-contracts>
   Best practices <smart-contracts/best-practices/index>

.. toctree::
   :caption: Governance
   :hidden:

   Cast a vote <governance/voting>
   Participate as an election guardian <governance/guardians>
   Verify election result <governance/verify-election-result>
   Install the Concordium Governance Ledger app <governance/install-ledger-app>
