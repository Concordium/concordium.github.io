.. _wallet-sdk:

==========
Wallet SDK
==========

This integration guide is directed towards developers who want to implement their own wallet for the Concordium blockchain.
This typically means either a mobile wallet (iOS or Android), or a solution building on TypeScript or JavaScript.

The SDK provides the necessary functions to derive the correct Concordium keys from a secret recovery phrase, to
generate the Concordium specific requests to create and recover identities, to create and deploy a credential, and
to create and send transactions to a Concordium node.

Below, you can find a link to the SDK package for your chosen technology, and an example wallet that demonstrates its usage.

.. tab-set::

    .. tab-item:: TypeScript (Web)

        | NPM package
        | `@concordium/web-sdk <https://www.npmjs.com/package/@concordium/web-sdk>`_

        | Working example implementation of a Concordium wallet for web
        | https://github.com/Concordium/concordium-node-sdk-js/tree/main/examples/wallet

    .. tab-item:: Kotlin (Android)

        | Maven Central package
        | `concordium-android-sdk <https://central.sonatype.com/artifact/com.concordium.sdk/concordium-android-sdk>`_

        | Working example implementation of a Concordium wallet for Android
        | https://github.com/Concordium/concordium-java-sdk/tree/main/concordium-android-wallet-example

    .. tab-item:: Swift (macOS, iOS)

        | Swift Package
        | `concordium-swift-sdk <https://github.com/Concordium/concordium-swift-sdk>`

        | Working example implementation of a CLI tool for macOS
        | https://github.com/Concordium/concordium-swift-sdk/tree/main/examples/CLI

        | Code snippets used in this documentation
        | https://github.com/Concordium/concordium-swift-sdk/tree/main/examples/DocSnippets
        | *Note: The snippets are self contained and don't align exactly with the structure of these docs.*

.. toctree::
    :hidden:
    :maxdepth: 2

    wallet-sdk-identity-creation
    wallet-sdk-identity-recovery
    wallet-sdk-credential-deployment
    wallet-sdk-account-transaction
    wallet-sdk-identity-provider
