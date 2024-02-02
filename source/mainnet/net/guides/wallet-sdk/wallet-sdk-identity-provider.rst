.. _wallet-sdk-identity-provider:

======================================
Getting the list of identity providers
======================================

The list of identity providers can be retrieved from a Concordium node; however, the provided list lacks the necessary metadata for creating or recovering an identity from an identity provider. Therefore, Concordium hosts a service called the wallet-proxy that serves this information to wallets.

.. _Identity Provider List:

+++++++++++++++++++++++++++++++++++++++++++++++++
Get list of identity providers and their metadata
+++++++++++++++++++++++++++++++++++++++++++++++++

Here is an example of how the list of identity providers can be retrieved from the wallet-proxy service. The libraries used here to perform the requests are merely examples, so feel free to use the libraries already utilized in your project.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: typescript

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

            const walletProxyTestnetBaseUrl = 'https://wallet-proxy.testnet.concordium.com';
            const walletProxyMainnetBaseUrl = 'https://wallet-proxy.mainnet.concordium.software';

            async function getIdentityProviders(walletProxyBaseUrl: string): Promise< IdentityProviderWithMetadata[]> {
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
