.. include:: ../../../variables.rst
.. _supporting-zero-knowledge-proofs:

================================
Supporting zero-knowledge proofs
================================

Concordium's identity layer uses :term:`zero-knowledge proofs (ZKPs)<zero-knowledge proof>` to ensure user privacy. These cryptographic proofs are a core component of the :term:`identity object`. They enable a user to confirm their verified status on-chain without disclosing personal data. This system also allows for selective disclosure; for instance, a user could generate a proof to confirm a specific attribute (e.g., "is over 18"). A third party can then verify the proof against the user's public commitment on the blockchain, confirming the attribute without revealing other personal data.

Your wallet's responsibility for handling these proofs depends on your chosen integration path:

If you selected :ref:`option 1 (direct IDP integration) <option-1-direct-idp>`, your wallet is responsible for generating the cryptographic requests that produce the final ZKP within the identity object. The Concordium SDK is designed to handle this complex process.

If you selected :ref:`option 2 (ID App integration) <option-2-id-app>`, this responsibility is offloaded entirely to the Concordium ID App.


**Advantages:**

* **User privacy** - Users' identity is verified on-chain without exposing personal data.
* **Regulatory compliance** - Enables access to regulated digital assets and enterprise dApps that require verified identity.
* **Reduced security liability** - The protocol handles identity proofs, eliminating the need to store sensitive user PII.

**Developer tools:**

* The `Concordium Proof Explorer <https://web3id-proof-explorer.testnet.concordium.com/>`_ is an interactive tool for creating and testing proofs with account credentials and verifiable credentials
* View the `source code on GitHub <https://github.com/Concordium/concordium-web3id/tree/main/test-tools/proof-explorer>`_
* For detailed guidance on writing statements that interact with Concordium wallets and creating proofs for dApps and services, refer to :ref:`the Create proofs documentation<create-proofs>`

