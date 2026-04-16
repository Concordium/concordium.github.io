.. include:: variables.rst

=======================
Developer Documentation
=======================

Concordium is a public, permissionless Layer 1 blockchain with a built-in identity layer. It provides fast, affordable transactions with smart contract support, and a unique approach to regulatory compliance through verified identities.

Whether you are evaluating the technology, building your first integration, or looking for specific technical details, find what you need below.

.. grid:: 1 1 3 3
   :gutter: 3

   .. grid-item-card:: Evaluating Concordium?
      :class-card: landing-card

      Get a clear picture of what Concordium does, how it works, and whether it fits your use case.

      - :doc:`What is the Concordium Protocol <learn/concordium-protocol>`
      - :doc:`Identity framework <learn/identity/index>`
      - :doc:`Tokenomics <learn/tokenomics>`
      - :doc:`Smart contracts <learn/smart-contracts/index>`

   .. grid-item-card:: Ready to build?
      :class-card: landing-card

      Set up your environment and follow step-by-step guides from your first transaction to a complete integration.

      - :doc:`Quick start guide <tutorials/quick-start>`
      - :doc:`Set up development tools <how-to/smart-contracts/build-contract>`
      - :doc:`Get started with Protocol-Level Tokens <tutorials/plt/index>`
      - :doc:`Onboard as an exchange <how-to/integrations/exchange-onboarding>`

   .. grid-item-card:: Looking for something specific?
      :class-card: landing-card

      Find detailed reference documentation, API specs, and targeted guides for specific tasks.

      - :doc:`gRPC API reference <technical-reference/api>`
      - :doc:`Concordium Client <technical-reference/concordium-client/concordium-client>`
      - :doc:`How-to guides <how-to/index>`
      - :doc:`Downloads <downloads>`

.. Note::

   Currently, Rust toolchain versions up to ``1.81`` and newer are not supported by older ``cargo-concordium`` versions ( <= ``4.0.0``). Update ``cargo-concordium`` if you see the error ``Unexpected byte 0x80. Expected 0x00`` as follows:

   .. code-block:: console

      $ cargo install cargo-concordium
      $ cargo concordium --version
      $ cargo-concordium 4.1.1

   The minimum supported rust version is currently version ``1.73``

.. toctree::
   :maxdepth: 2
   :hidden:

   Learn <learn/index>
   tutorials/index
   How-to <how-to/index>
   Reference <technical-reference/index>
   Downloads <downloads>
