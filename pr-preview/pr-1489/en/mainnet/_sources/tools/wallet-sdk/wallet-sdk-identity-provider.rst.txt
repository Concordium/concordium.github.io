.. _wallet-sdk-identity-provider:

==================================
Get the list of identity providers
==================================

The list of identity providers can be retrieved from a Concordium node; however, the provided list lacks the necessary metadata for creating or recovering an identity from an identity provider. Therefore, Concordium hosts a service called the wallet-proxy that serves this information to wallets.

.. _Identity Provider List:

+++++++++++++++++++++++++++++++++++++++++++++++++
Get list of identity providers and their metadata
+++++++++++++++++++++++++++++++++++++++++++++++++

Here is an example of how the list of identity providers can be retrieved from the wallet-proxy service. The libraries used here to perform the requests are merely examples, so feel free to use the libraries already utilized in your project.

.. tab-set::

    .. tab-item:: TypeScript (Web)

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

    .. tab-item:: Kotlin (Android)

        .. code-block:: Kotlin

            import com.concordium.sdk.responses.blocksummary.updates.queues.AnonymityRevokerInfo
            import com.concordium.sdk.responses.blocksummary.updates.queues.IdentityProviderInfo
            import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
            import java.io.Serializable
            import okhttp3.OkHttpClient
            import okhttp3.Request

            data class IdentityProvider(
                val ipInfo: IdentityProviderInfo,
                val arsInfos: Map<String, AnonymityRevokerInfo>,
                val metadata: IdentityProviderMetaData
            ) : Serializable

            data class IdentityProviderMetaData(
                val icon: String,
                val issuanceStart: String,
                val support: String?,
                val recoveryStart: String?
            ) : Serializable

            fun getIdentityProviders(walletProxyBaseUrl: String): ArrayList<IdentityProvider> {
                val request = Request.Builder().url("$walletProxyBaseUrl/v1/ip_info").build()
                val client = OkHttpClient().newBuilder().build()

                client.newCall(request).execute().use { response ->
                    response.body()?.use { body ->
                        val mapper = jacksonObjectMapper()
                        return mapper.readValue(body.string(), mapper.typeFactory.constructCollectionType(ArrayList::class.java, IdentityProvider::class.java))
                    }
                }
                throw Exception("Something went wrong")
            }

            fun main() {
                val walletProxyTestnetBaseUrl = "https://wallet-proxy.testnet.concordium.com"
                val walletProxyMainnetBaseUrl = "https://wallet-proxy.mainnet.concordium.software"

                val testnetIdentityProviders = getIdentityProviders(walletProxyTestnetBaseUrl)
                val mainnetIdentityProviders = getIdentityProviders(walletProxyMainnetBaseUrl)
            }

    .. tab-item:: Swift (macOS, iOS)

        .. code-block:: Swift

            import Concordium
            import Foundation

            // Inputs.
            let walletProxyBaseURL = URL(string: "https://wallet-proxy.testnet.concordium.com")!

            let walletProxy = WalletProxy(baseURL: walletProxyBaseURL)
            print("Identity providers:")
            for ip in try await identityProviders(walletProxy) {
                print("- \(ip.info.description.name)")
            }
