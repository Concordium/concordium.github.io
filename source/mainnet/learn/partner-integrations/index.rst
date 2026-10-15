.. include:: ../../variables.rst
.. _partner-integrations:

====================
Partner integrations
====================

How partners have built on Concordium, written so that you can reuse what they did. Each page names the partner, what they built, which Concordium capabilities they use, and the design decisions behind the integration. Each page ends with the how-to and reference pages you need to build the same thing yourself.

These pages are explanations, not step-by-step guides. They describe the architecture and the reasoning at component level, and they leave out partner-internal details such as endpoints, key management, and infrastructure.

Integrations
============

.. list-table::
   :header-rows: 1
   :widths: 22 38 40

   * - Partner
     - What they built
     - Concordium capabilities used
   * - :doc:`XDC AI <xdc-ai-verified-agent-wallets>`
     - Identity-verified wallets for AI agents that pay for APIs by the call
     - Concordium ID, CIS-8, CIS-8004, Verified by Concordium badge, sponsored transactions

Integration archetypes
======================

Most integrations with Concordium follow one of these shapes. The partner pages above show the shapes in production. The links below take you to the guides for building each one.

- **Exchange or custodian.** List CCD, create and manage accounts at scale, and track deposits and withdrawals. See :doc:`Onboard as an exchange <../../how-to/integrations/exchange-onboarding>`.
- **Wallet.** Add Concordium identities, accounts, and transactions to a new or existing wallet. See :doc:`Build a wallet with the Wallet SDK <../../how-to/integrations/wallet-sdk/wallet-sdk>` and :doc:`Integrate Concordium in a crypto wallet <../../how-to/integrations/wallet-integration/wallet-integration>`.
- **Application using the ID layer.** Gate access or prove attributes such as age or residency with zero-knowledge proofs, without collecting personal data. See :doc:`Implement Verify and Access <../../how-to/concordium-id/verify-and-access/index>` and :doc:`Implement Web3 ID <../../how-to/web3-id/index>`.
- **Token issuer.** Issue and manage tokens at the protocol level or through CIS-2 smart contracts. See :doc:`Protocol-Level Tokens <../../tutorials/plt/index>`, :doc:`Fungible tokens <../../tutorials/fungible-tokens/index>`, and :doc:`NFT minting <../../tutorials/nft-minting/index>`.
- **AI agent with a verified identity.** Register an agent on chain, link it to keys on other chains, and publish a verifiable Agent Card. See :doc:`Use the Agent Registry <../../how-to/integrations/agent-registry>`.
- **Agent payments.** Let agents pay for services by the call over HTTP. See :doc:`Implement X402 payments <../../how-to/integrations/x402-integration>`.

Contribute an integration
=========================

If you have built on Concordium and want your integration documented here, contact Concordium through the **Support** link in the navigation bar. A partner page must:

- Describe the architecture at component level and explain the design decisions.
- Link to the how-to and reference pages that cover each step, rather than repeating them.
- State what the integration proves and what it does not.
- Leave out internal hostnames and endpoints, key management details, account and contract addresses that are not already public, software versions, and internal API schemas.

Concordium writes the page together with the partner. The partner approves the final text and diagrams in writing, and agrees to publication under the site licence, Creative Commons Attribution-ShareAlike 4.0 International.

.. toctree::
   :hidden:

   XDC AI: verified agent wallets <xdc-ai-verified-agent-wallets>
