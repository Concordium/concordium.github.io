
.. _wallet-sdk-identity-provider:

======================================
Getting the list of identity providers
======================================

The list of identity providers can be retrieved from a Concordium node, however, the list provided there is lacking the metadata that is required when creating or recovering an identity from an identity provider. Therefore Concordium hosts a service called the wallet-proxy that serves this information to wallets.

.. _RST Overview:

+++++++++++++++++++++++++++++++++++++++++++++++++
Get list of identity providers and their metadata
+++++++++++++++++++++++++++++++++++++++++++++++++

The following is an example of how the list of identity providers can be retrieved from the wallet-proxy service. The libraries used here to perform the requests are just examples, but you can use whatever library your project is already using.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: javascript

            import {
                IdentityProvider,
            } from '@concordium/web-sdk';

            interface IdentityProviderMetaData {
                issuanceStart: string;
                recoveryStart: string;
                icon: string;
                support: string;
            }

            type IdentityProviderWithMetadata = IdentityProvider & {
                metadata: IdentityProviderMetaData;
            };

            type IdentityProviderWithMetadataArray = IdentityProviderWithMetadata[];

            const walletProxyTestnetBaseUrl = 'https://wallet-proxy.testnet.concordium.com';
            const walletProxyMainnetBaseUrl = 'https://wallet-proxy.mainnet.concordium.software';

            async function getIdentityProviders(walletProxyBaseUrl: string): Promise<IdentityProviderWithMetadataArray> {
                const response = await fetch(walletProxyBaseUrl + '/v1/ip_info');
                return response.json();
            }

            const testnetIdentityProviders = getIdentityProviders(walletProxyTestnetBaseUrl);
            const mainnetIdentityProviders = getIdentityProviders(walletProxyMainnetBaseUrl);

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.
