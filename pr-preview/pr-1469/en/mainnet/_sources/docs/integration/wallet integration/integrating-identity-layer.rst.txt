.. include:: ../../../variables.rst
.. _integrating-identity-layer:

=================================
Integrating Concordium's ID layer
=================================

Every account on Concordium is backed by a verified identity, requiring a balance between compliance and on-chain privacy. The process begins with an off-chain :term:`Identity Provider (IDP)<Identity Provider>` who issues a sensitive :term:`identity object` to the user. This object is the cryptographic root of the user's on-chain presence.

Your wallet's role is to facilitate the use of this identity object to create public on-chain accounts, ensuring privacy by anchoring the user's identity without exposing personal data. This guide outlines the two primary integration paths for managing the identity creation process and its associated data.


.. _option-1-direct-idp:

Option 1: direct ID provider integration
========================================

In this model, your wallet integrates directly with an IDP's API. You can select from a list of :ref:`pre-approved IDPs<key-participants>` already integrated with the network, or you can bring your own preferred provider. If you bring your own, the IDP must work with the Concordium team to complete an onboarding process and become a recognized issuer on the network. Once an IDP is chosen, your application manages the entire verification flow, from generating cryptographic requests to receiving the final identity object.

**Advantage:** You maintain complete control over the entire user journey, allowing for a seamless and fully branded in-app experience.

**Consideration:** This approach requires more development overhead and means your wallet assumes full responsibility for the secure storage and lifecycle management of the user's sensitive identity object.

**Developer Tools:** The :ref:`Concordium SDK<wallet-sdk>` is designed for this path. It provides all the necessary functions to generate keys, create identity requests, and construct on-chain transactions. Alternatively, you can use the the :ref:`Concordium Client CLI<concordium-client>` or interact with the node directly.


.. _option-2-id-app:

Option 2: integration via the Concordium ID App
===============================================

This approach offloads the entire identity lifecycle to the dedicated Concordium ID App. Your wallet uses the WalletConnect protocol to securely connect with the ID App, which manages and stores the identity object. Your wallet simply requests the necessary commitments for account creation, without ever taking custody of the private credential itself.

**Advantage:** This method simplifies integration and removes the significant security burden of storing and managing the user's private identity object.

**Consideration:** The user is temporarily directed outside of your wallet's UI to the Concordium ID App to complete the process.

**Developer Tools:** A dedicated, TypeScript-based SDK is available to easily manage the communication and secure data transfer between your wallet and the Concordium ID App.

Making your decision
====================

Choosing between these two options is a key architectural decision. The choice involves balancing the level of control you want over the user experience against the development and maintenance resources required.

To help you make an informed choice, we recommend reviewing our :ref:`detailed guide on Concordium's identity layer<reference-identity>`. For a practical example, you can explore the source code of `Concordium Wallet <https://github.com/Concordium/cryptox-android>`_, an open-source reference wallet, which provides a complete implementation of :ref:`option 1<option-1-direct-idp>`.



