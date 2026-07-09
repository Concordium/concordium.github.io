.. include:: ../../variables.rst
.. _agent-registry-reference:

==============
Agent Registry
==============

Reference documentation for the Concordium Agent Registry — a suite of on-chain contracts, standards, and supporting services that give AI agents a verified on-chain identity.

.. grid:: 1 1 2 2
   :gutter: 3

   .. grid-item::

      **Standards**

      - :doc:`CIS-8: External Key Registry <cis-8>`
      - :doc:`CIS-8004: Agent Registry <cis-8004>`

      **Data formats**

      - :doc:`Agent Card <agent-card>`
      - :doc:`Concordium Badge <concordium-badge>`

   .. grid-item::

      **Services**

      - :doc:`MCP service <mcp-service>`
      - :doc:`Indexer <indexer>`

.. toctree::
   :hidden:

   CIS-8: External Key Registry <cis-8>
   CIS-8004: Agent Registry <cis-8004>
   Agent Card <agent-card>
   Concordium Badge <concordium-badge>
   MCP service <mcp-service>
   Indexer <indexer>

Overview
========

The Agent Registry gives every AI agent an on-chain identity anchor: discoverable, transferable, and — when combined with Concordium's ID layer — linked to a verified human owner.

It is built from two complementary smart-contract standards:

- **CIS-8004** is the core agent registry. Each registered agent is minted as a non-fungible CIS-2 token. The token stores a pointer to an off-chain :doc:`Agent Card <agent-card>` whose integrity is protected by an on-chain SHA-256 hash, plus an extensible key-value metadata store for on-chain properties such as the agent's payment wallet.

- **CIS-8** is the cross-chain key registry. It records a cryptographically-proven binding between a Concordium native account and an external public key — an Ethereum address, a Solana key, or a key from any other supported chain. CIS-8 entries can be attached to CIS-8004 agents as an ``external_reference``, making agents equally accessible from within and outside the Concordium ecosystem.

The :doc:`MCP service <mcp-service>` wraps these contracts in a Model Context Protocol server, exposing every registry operation as an AI-callable tool. The :doc:`Indexer <indexer>` processes on-chain events into a queryable REST API that powers agent discovery and search.

Mainnet contract addresses
==========================

.. list-table::
   :header-rows: 1
   :widths: 30 20 20 30

   * - Contract
     - Index
     - Subindex
     - Module reference
   * - CIS-8004 Agent Registry
     - 10082
     - 0
     - ``ba03e95330de2ad70cb8551d132bc7afe291b22068172a44e3a00dc09b63855f``
   * - CIS-8 External Key Registry
     - 10081
     - 0
     - ``08f71acbd16cdaca1e4184dbbc59b773ffc8f93c76fe2e56bfbd50bfcbee9d1d``

Both contracts are visible on `CCDScan <https://ccdscan.io>`__.
