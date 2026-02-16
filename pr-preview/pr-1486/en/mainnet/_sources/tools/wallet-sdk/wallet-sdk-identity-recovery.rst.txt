.. _wallet-sdk-identity-recovery:

===================
Recover an identity
===================

The following sections demonstrate the process of creating a request to recover an identity from an identity provider. While accounts are stored on the Concordium blockchain, identities are stored by the selected identity provider during the creation process, and recovery is initiated by sending a request to that specific identity provider.

* `Generate an identity recovery request`_
* `Send an identity recovery request`_

+++++++++++++++++++++++++++++++++++++
Generate an identity recovery request
+++++++++++++++++++++++++++++++++++++

The following example demonstrates the process of generating an identity recovery request. Part of the input to the request is a secret value derived from the seed phrase, and this value should be kept secret in a similar manner as the seed phrase and account signing keys.

In the example below, functionality for retrieving the list of identity providers is present. To see an example of how to implement this function, see :ref:`Identity Provider List`.

.. tab-set::

    .. tab-item:: TypeScript (Web)

        .. code-block:: javascript

            import {
                ConcordiumGRPCWebClient,
                ConcordiumHdWallet,
                createIdentityRecoveryRequestWithKeys,
                IdentityProvider,
                IdentityRecoveryRequestWithKeysInput,
            } from '@concordium/web-sdk';

            // The identity provider to attempt to recover an identity from. Here we simply select the first available, but
            // in a recovery process a wallet would usually loop through all possible options.
            const identityProvider: IdentityProvider = getIdentityProviders(walletProxyTestnetBaseUrl)[0];

            const seedPhrase = 'fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position';
            const network = 'Testnet'; // Or Mainnet, if working on mainnet.
            const wallet = ConcordiumHdWallet.fromSeedPhrase(seedPhrase, network);

            const idCredSec = wallet.getIdCredSec(identityProvider.ipInfo.ipIdentity, identityIndex).toString('hex');

            const client = new ConcordiumGRPCWebClient(nodeAddress, nodePort);
            const cryptographicParameters = await client.getCryptographicParameters();

            const recoveryRequestInput: IdentityRecoveryRequestWithKeysInput = {
                idCredSec,
                ipInfo: identityProvider.ipInfo,
                globalContext: cryptographicParameters,
                timestamp: Math.floor(Date.now() / 1000),
            };

            const recoveryRequest: IdRecoveryRequest = createIdentityRecoveryRequestWithKeys(recoveryRequestInput);

    .. tab-item:: Kotlin (Android)

        .. code-block:: Kotlin

            import cash.z.ecc.android.bip39.Mnemonics
            import com.concordium.sdk.ClientV2
            import com.concordium.sdk.Connection
            import com.concordium.sdk.TLSConfig
            import com.concordium.sdk.crypto.wallet.ConcordiumHdWallet
            import com.concordium.sdk.crypto.wallet.Identity
            import com.concordium.sdk.crypto.wallet.IdentityRecoveryRequestInput
            import com.concordium.sdk.crypto.wallet.Network
            import com.concordium.sdk.requests.BlockQuery

            fun createRecoveryRequest(): String {
                // The identity provider to attempt to recover an identity from. Here we simply select the first available, but
                // in a recovery process a wallet would usually loop through all possible options.
                val identityProvider = getIdentityProviders(walletProxyTestnetBaseUrl)[0]

                val seedPhrase = "fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position"
                @OptIn(ExperimentalStdlibApi::class)
                val seedAsHex = Mnemonics.MnemonicCode(seedPhrase!!.toCharArray()).toSeed().toHexString()
                val wallet = ConcordiumHdWallet.fromHex(seedAsHex, Network.TESTNET)

                val idCredSec = wallet.getIdCredSec(identityProvider.ipInfo.ipIdentity.value, identityIndex)

                val connection = Connection.newBuilder()
                    .host(nodeAddress)
                    .port(nodePort)
                    .useTLS(TLSConfig.auto())
                    .build()
                val client = ClientV2.from(connection)
                val cryptographicParameters = client.getCryptographicParameters(BlockQuery.BEST)

                val input = IdentityRecoveryRequestInput.builder()
                    .globalContext(cryptographicParameters)
                    .ipInfo(identityProvider.ipInfo)
                    .idCredSec(idCredSec)
                    .timestamp(java.time.Instant.now().epochSecond)
                    .build()

                return Identity.createIdentityRecoveryRequest(input)
            }

    .. tab-item:: Swift (macOS, iOS)

        .. code-block:: Swift

            import Concordium
            import MnemonicSwift // external package for converting seed phrase to bytes
            import GRPC // external dependency for gRPC client

            let grpcChannel: GRPCChannel // see docs for package GRPC or examples in SDK repo
            let client: NodeClient = GRPCNodeClient(channel: grpcChannel)

            /// Fetch all identity providers.
            public func identityProviders(_ walletProxy: WalletProxy) async throws -> [IdentityProvider] {
                let res = try await walletProxy.getIdentityProviders.send(session: URLSession.shared)
                return res.map { $0.toSDKType() }
            }

            /// Fetch an identity provider with a specific ID.
            public func findIdentityProvider(_ walletProxy: WalletProxy, _ id: IdentityProviderID) async throws -> IdentityProvider? {
                let res = try await identityProviders(walletProxy)
                return res.first { $0.info.identity == id }
            }

            // Inputs.
            let seedPhrase = "fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position"
            let network = Network.testnet
            let identityProviderID = IdentityProviderID(3)
            let identityIndex = IdentityIndex(7)
            let walletProxyBaseURL = URL(string: "https://wallet-proxy.testnet.concordium.com")!
            let identityDisclosureThreshold = RevocationThreshold(2)

            // Configure seed and Wallet Proxy instance.
            let seedHex = try Mnemonic.deterministicSeedString(from: seedPhrase)
            let seed = WalletSeed(seedHex: seedHex, network: network)
            let walletProxy = WalletProxy(baseURL: walletProxyBaseURL)
            let identityProvider = try await findIdentityProvider(walletProxy, identityProviderID)!

            // Construct recovery request.
            let cryptoParams = try await client.cryptographicParameters(block: .lastFinal)

            let identityRequestBuilder = SeedBasedIdentityRequestBuilder(
                seed: seed,
                cryptoParams: cryptoParams
            )
            let reqJSON = try identityRequestBuilder.recoveryRequestJSON(
                provider: identityProvider.info,
                index: identityIndex,
                time: Date.now
            )

            func makeIdentityRecoveryRequest(
                _ seed: WalletSeed,
                _ cryptoParams: CryptographicParameters,
                _ identityProvider: IdentityProvider,
                _ identityIndex: IdentityIndex
            ) throws -> IdentityRecoverRequest {
                let identityRequestBuilder = SeedBasedIdentityRequestBuilder(
                    seed: seed,
                    cryptoParams: cryptoParams
                )
                let reqJSON = try identityRequestBuilder.recoveryRequestJSON(
                    provider: identityProvider.info,
                    index: identityIndex,
                    time: Date.now
                )
            }

+++++++++++++++++++++++++++++++++
Send an identity recovery request
+++++++++++++++++++++++++++++++++

The next step is to send the generated identity recovery request to the associated identity provider. If successful, the identity provider will return a redirect to the location from which the identity can be fetched.

.. tab-set::

    .. tab-item:: TypeScript (Web)

        .. code-block:: javascript

            import {
                IdentityObjectV1,
                IdRecoveryRequest,
                Versioned
            } from '@concordium/web-sdk';

            // This identity provider must be identical to the one used to generate the identity
            // recovery request, otherwise the request will fail.
            const identityProvider: IdentityProviderWithMetadata = ...;

            // See how to generate in the previous section.
            const recoveryRequest: IdRecoveryRequest = ...;

            const searchParams = new URLSearchParams({
                state: JSON.stringify({ idRecoveryRequest: recoveryRequest }),
            });
            const url = `${identityProvider.metadata.recoveryStart}?${searchParams.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error((await response.json()).message);
            }

            const identityResponse = await fetch(url);
            if (identityResponse.ok) {
                const versionedIdentity: Versioned<IdentityObjectV1> = await response.json();

                // The identity object has been successfully recovered.
                const identity: IdentityObjectV1 = versionedIdentity.value;
            }

    .. tab-item:: Kotlin (Android)

        .. code-block:: Kotlin

            import com.concordium.sdk.crypto.wallet.identityobject.IdentityObject
            import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
            import okhttp3.OkHttpClient
            import okhttp3.Request

            @JsonAutoDetect
            private data class VersionedIdentity(
                val v: Number,
                val value: IdentityObject
            )

            fun recoverIdentity(): IdentityObject {
                // This identity provider must be identical to the one used to generate the identity
                // recovery request, otherwise the request will fail.
                const identityProvider: IdentityProvider = ...

                // See how to generate in the previous section.
                val recoveryRequest: String = ...

                val baseUrl = identityProvider.metadata.recoveryStart
                val recoveryUrl = Uri.parse(baseUrl!!).buildUpon().appendQueryParameter("state", recoveryRequest).build().toString()
                val request = Request.Builder().url(recoveryUrl).build()
                val httpClient = OkHttpClient().newBuilder().build()

                httpClient.newCall(request).execute().use { response ->
                    response.body()?.use { body ->

                        // The identity object has been successfully recovered.
                        return jacksonObjectMapper().readValue(
                            body.string(),
                            VersionedIdentity::class.java
                        ).value
                    }
                }
                throw Exception("Failed to recover identity");
            }

    .. tab-item:: Swift (macOS, iOS)

        .. code-block:: Swift

            let reqJSON = ... // computed in previous section

            // Wrap recovery request into HTTP request and execute.
            let urlBuilder = IdentityRequestURLBuilder(callbackURL: nil) // without 'callbackURL' the builder only supports recovery
            let identityReq = try urlBuilder.recoveryRequest(
                baseURL: identityProvider.metadata.recoveryStart,
                requestJSON: reqJSON
            )
            let identity = try await identityReq.send(session: URLSession.shared)
            print("Successfully recovered identity: \(identity)")
