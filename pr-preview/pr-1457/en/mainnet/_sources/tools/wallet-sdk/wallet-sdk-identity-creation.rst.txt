.. _wallet-sdk-identity-creation:

==================
Create an identity
==================

To create an account on the Concordium blockchain, a user must first acquire an identity. Therefore, as an initial step, a wallet user will always have to create an identity before being able to send account transactions.

An identity is acquired by generating an identity request and sending it to an identity provider. The user will then be taken through the identity verification
process that is specific for that chosen identity provider. This happens outside of the wallet application.

* `Create an identity request`_
* `Send an identity request`_
* `Retrieve the identity after creation`_

++++++++++++++++++++++++++
Create an identity request
++++++++++++++++++++++++++

The first step is to create the actual identity request. To do this, you need the list of identity providers. Refer to :ref:`Identity Provider List` to understand how to retrieve it.

.. tab-set::

    .. tab-item:: TypeScript (Web)

        .. code-block:: javascript

            import {
                ConcordiumGRPCWebClient,
                ConcordiumHdWallet,
                createIdentityRequestWithKeys,
                IdentityRequestWithKeysInput,
                IdObjectRequestV1,
                Versioned,
            } from '@concordium/web-sdk';

            // Select the identity provider that is to be used for creating the identity. Here we
            // choose the first one in the list available from the Concordium wallet-proxy.
            const identityProvider: IdentityProviderWithMetadata = getIdentityProviders()[0];

            // The index of the identity to create. The index is incremented per identity created
            // for a specific identity provider. For the first identity created it should be 0,
            // for the second it should be 1, and so forth.
            const identityIndex = 0;

            // Some global cryptographic properties are required as input. They can be retrieved from
            // a Concordium node using the gRPC interface. Note that these are not specific for this
            // identity and therefore can be re-used.
            const client = new ConcordiumGRPCWebClient(nodeAddress, nodePort);
            const cryptographicParameters = await client.getCryptographicParameters();

            // Derive the secret key material and randomness from the Concordium wallet.
            const seedPhrase = 'fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position';
            const network = 'Testnet'; // Or Mainnet, if working on mainnet.
            const wallet = ConcordiumHdWallet.fromSeedPhrase(seedPhrase, network);

            const identityProviderIndex = identityProvider.ipInfo.ipIdentity;

            const idCredSec = wallet.getIdCredSec(identityProviderIndex, identityIndex).toString('hex');
            const prfKey = wallet.getPrfKey(identityProviderIndex, identityIndex).toString('hex');
            const blindingRandomness = wallet.getSignatureBlindingRandomness(identityProviderIndex, identityIndex).toString('hex');

            // The identity disclosure threshold. Here we select the highest possible threshold for
            // the chosen identity provider.
            const arThreshold = Math.min(Object.keys(identityProvider.arsInfos).length - 1, 255);

            // Construct the input for creating the identity request.
            const input: IdentityRequestWithKeysInput = {
                arsInfos: identityProvider.arsInfos,
                arThreshold,
                ipInfo: identityProvider.ipInfo,
                globalContext: cryptographicParameters,
                idCredSec,
                prfKey,
                blindingRandomness,
            };

            const identityRequest: Versioned<IdObjectRequestV1> = createIdentityRequestWithKeys(input);

    .. tab-item:: Kotlin (Android)

        .. code-block:: Kotlin

            import cash.z.ecc.android.bip39.Mnemonics
            import cash.z.ecc.android.bip39.toSeed
            import com.concordium.sdk.ClientV2
            import com.concordium.sdk.Connection
            import com.concordium.sdk.TLSConfig
            import com.concordium.sdk.crypto.wallet.ConcordiumHdWallet
            import com.concordium.sdk.crypto.wallet.Identity
            import com.concordium.sdk.crypto.wallet.IdentityRequestInput
            import com.concordium.sdk.crypto.wallet.Network
            import com.concordium.sdk.requests.BlockQuery

            fun createIdentityRequest(): String {
                // Select the identity provider that is to be used for creating the identity. Here we
                // choose the first one in the list available from the Concordium wallet-proxy.
                val identityProvider = getIdentityProviders(walletProxyTestnetBaseUrl)[0]

                // The index of the identity to create. The index is incremented per identity created
                // for a specific identity provider. For the first identity created it should be 0,
                // for the second it should be 1, and so forth.
                val identityIndex = 0

                val connection = Connection.newBuilder()
                    .host(nodeAddress)
                    .port(nodePort)
                    .useTLS(TLSConfig.auto())
                    .build()
                val client = ClientV2.from(connection)
                val cryptographicParameters = client.getCryptographicParameters(BlockQuery.BEST)

                val seedPhrase = "fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position"
                @OptIn(ExperimentalStdlibApi::class)
                val seedAsHex = Mnemonics.MnemonicCode(seedPhrase.toCharArray()).toSeed().toHexString()
                val wallet = ConcordiumHdWallet.fromHex(seedAsHex, Network.TESTNET) // Or Network.MAINNET, if working on mainnet.

                val identityProviderIndex = identityProvider.ipInfo.ipIdentity.value
                val idCredSec = wallet.getIdCredSec(identityProviderIndex, identityIndex)
                val prfKey = wallet.getPrfKey(identityProviderIndex, identityIndex)
                val blindingRandomness = wallet.getSignatureBlindingRandomness(identityProviderIndex, identityIndex)
                val arThreshold = (identityProvider.arsInfos.size - 1).coerceAtMost(255)

                val input: IdentityRequestInput = IdentityRequestInput.builder()
                    .globalContext(cryptographicParameters)
                    .ipInfo(identityProvider.ipInfo)
                    .arsInfos(identityProvider.arsInfos)
                    .arThreshold(arThreshold.toLong())
                    .idCredSec(idCredSec)
                    .prfKey(prfKey)
                    .blindingRandomness(blindingRandomness)
                    .build()

                return Identity.createIdentityRequest(input)
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
            let walletProxyBaseURL = URL(string: "https://wallet-proxy.testnet.concordium.com")!
            let identityProviderID = IdentityProviderID(3)
            let identityIndex = IdentityIndex(7)
            let identityDisclosureThreshold = RevocationThreshold(2)

            // Configure seed and Wallet Proxy instance.
            let seedHex = try Mnemonic.deterministicSeedString(from: seedPhrase)
            let seed = WalletSeed(seedHex: seedHex, network: network)
            let walletProxy = WalletProxy(baseURL: walletProxyBaseURL)
            let identityProvider = try await findIdentityProvider(walletProxy, identityProviderID)!

            // Construct identity creation request.
            let cryptoParams = try await client.cryptographicParameters(block: .lastFinal)
            let identityRequestBuilder = SeedBasedIdentityRequestBuilder(
                seed: seed,
                cryptoParams: cryptoParams
            )
            let reqJSON = try identityRequestBuilder.issuanceRequestJSON(
                provider: identityProvider,
                index: identityIndex,
                anonymityRevocationThreshold: identityDisclosureThreshold
            )

++++++++++++++++++++++++
Send an identity request
++++++++++++++++++++++++

Once the identity request has been created, the next step is to send it to the corresponding identity provider. There are multiple ways to accomplish this, and it will depend on the technologies you choose. Below is an example of how it can be done.

A part of the request is a `redirectUri`, which tells the identity provider where to redirect the user when the identity verification flow has been completed. A wallet application has to choose this in such a way that the user is sent back into the wallet application, where the actual identity object can then be retrieved from the information provided in the hash property of the redirect URL.

.. tab-set::

    .. tab-item:: TypeScript (Web)

        .. code-block:: javascript

            import {
                IdObjectRequestV1,
                Versioned,
            } from '@concordium/web-sdk';

            // The identity provider that the request was created for.
            const identityProvider: IdentityProviderWithMetadata = ...;
            const identityIssuanceStartUrl = identityProvider.metadata.issuanceStart;

            // The identity request created in the previous step.
            const identityRequest: Versioned<IdObjectRequestV1> = ...;

            // This value determines where the identity provider will redirect the user
            // at the end of the identity verification process. This can e.g. be to a deep link
            // that your application listens for, so that your application is automatically activated
            // again.
            const redirectUri = 'some-custom-value';

            const params = {
                scope: 'identity',
                response_type: 'code',
                redirect_uri: redirectUri,
                state: JSON.stringify({ identityRequest }),
            };

            const searchParams = new URLSearchParams(params);
            const url = `${identityIssuanceStartUrl}?${searchParams.toString()}`;
            const response = await fetch(url);

            // The identity creation protocol dictates that we will receive a redirect.
            // If we don't receive a redirect, then something went wrong at the identity
            // provider's side.
            if (!response.redirected) {
                throw new Error('The identity provider did not redirect as expected.');
            } else {
                // The response URL contains the location that the user should be redirected to,
                // e.g. by opening it in a browser. This will start the identity verification at
                // the identity provider.
                return response.url;
            }

    .. tab-item:: Kotlin (Android)

        .. code-block:: Kotlin

            import android.content.Context
            import android.net.Uri
            import androidx.browser.customtab-set.Customtab-setIntent
            import okhttp3.OkHttpClient
            import okhttp3.Request

            fun sendIdentityRequest(context: Context, identityProvider: IdentityProvider, identityRequest: String) {
                // This value determines where the identity provider will redirect the user
                // at the end of the identity verification process. This can e.g. be to a deep link
                // that your application listens for, so that your application is automatically activated
                // again.
                val redirectUri = "yourwallet-scheme://identity-issuer/callback"

                val baseUrl = identityProvider.metadata.issuanceStart
                val delimiter = if (baseUrl.contains('?')) "&" else "?"
                val url = "${baseUrl}${delimiter}response_type=code&redirect_uri=${redirectUri}&scope=identity&state=$identityRequest"

                val okHttpClientBuilder = OkHttpClient().newBuilder().followRedirects(false).followSslRedirects(false)
                val client = okHttpClientBuilder.build()
                val request = Request.Builder().url(url).build()

                client.newCall(request).execute().use { response ->
                    // The identity creation protocol dictates that we will receive a redirect.
                    // If we don't receive a redirect, then something went wrong at the identity
                    // provider's side.
                    // The redirected URL contains the location that the user should be redirected to,
                    // e.g. by opening it in a browser. This will start the identity verification at
                    // the identity provider.
                    val redirectedUrl = response.header("Location")
                        ?: throw Exception("The identity provider did not redirect as expected.")

                    // Open the URL in a browser. This is just an example of how that could be done.
                    val customtab-setIntent = Customtab-setIntent.Builder().build()
                    customtab-setIntent.launchUrl(context, Uri.parse(redirectedUrl))
                }
            }

    .. tab-item:: Swift (macOS, iOS)

        .. code-block:: Swift

            import Concordium

            let reqJSON: String // from previous section

            // The URL to be invoked when once the ID verification process has started (i.e. once the data has been filled in).
            let callbackURL = URL(string: "concordiumwallet-example://identity-issuer/callback")!

            let urlBuilder = IdentityRequestURLBuilder(callbackURL: callbackURL)
            let url = try urlBuilder.issuanceURLToOpen(baseURL: issuanceStartURL, requestJSON: requestJSON)


++++++++++++++++++++++++++++++++++++
Retrieve the identity after creation
++++++++++++++++++++++++++++++++++++

Upon completing identity verification with the identity provider, the identity provider does a redirect of the user back to the `redirectUri` that was provided when sending the identity request to the identity provider. The hash property of the URL that the identity provider redirects the user to contains the URL where the identity object can be retrieved from in the format `redirectUri#code_uri=`, where the URL will be after the equals sign.

.. tab-set::

    .. tab-item:: TypeScript (Web)

        .. code-block:: javascript

            enum IdentityProviderIdentityStatus {
                /** Pending identity verification. */
                Pending = 'pending',
                /** The identity creation failed or was rejected. */
                Error = 'error',
                /** The identity is ready. */
                Done = 'done',
            }

            interface PendingIdentityTokenContainer {
                status: IdentityProviderIdentityStatus.Pending;
                detail: string;
            }

            interface DoneIdentityTokenContainer {
                status: IdentityProviderIdentityStatus.Done;
                token: { identityObject: Versioned<IdentityObjectV1> };
                detail: string;
            }
            interface ErrorIdentityTokenContainer {
                status: IdentityProviderIdentityStatus.Error;
                detail: string;
            }

            type IdentityTokenContainer =
                | PendingIdentityTokenContainer
                | DoneIdentityTokenContainer
                | ErrorIdentityTokenContainer;

            // The URL that the identity provider redirected to when the user completed
            // identity verification.
            const identityProviderRedirectUrl: string = ...;

            // Extract the location where the identity can be retrieved from.
            const identityUrl = identityProviderRedirectUrl.split('#code_uri=')[1];

            try {
                const response = (await (await fetch(identityUrl)).json as IdentityTokenContainer;

                if (IdentityProviderIdentityStatus.Done === response.status) {
                    // The identity is ready and can be extracted and stored locally
                    // in the user's wallet.
                    const identity: IdentityObjectV1 = response.token.identityObject.value;
                } else if (IdentityProviderIdentityStatus.Error === response.status) {
                    // Something went wrong and the details about the error are available.
                    const errorDetails: string = response.detail;
                } else {
                    // In this case the identity is still pending, and the identity
                    // should be queried again after some time to check the status again.
                    // An identity will always resolve to either the done status or the
                    // error status.
                }
            } catch {
                // Something went wrong while querying the identity provider for the identity.
                // The wallet should retry after some time if this happens.
            }

    .. tab-item:: Kotlin (Android)

        .. code-block:: Kotlin

            import com.concordium.sdk.crypto.wallet.identityobject.IdentityObject
            import com.fasterxml.jackson.annotation.JsonAutoDetect
            import com.fasterxml.jackson.annotation.JsonProperty
            import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
            import okhttp3.OkHttpClient
            import okhttp3.Request

            @JsonAutoDetect
            private data class VersionedIdentity(
                val v: Number,
                val value: IdentityObject
            )

            private data class IdentityWrapper(val identityObject: VersionedIdentity)

            private data class IdentityResponse(
                val status: Status,
                val token: IdentityWrapper?,
                val detail: String?,
            ) {
                enum class Status {
                    @JsonProperty("done")
                    DONE,

                    @JsonProperty("pending")
                    PENDING,

                    @JsonProperty("error")
                    ERROR,
                }
            }

            fun fetchIdentity() {
                // The URL that the identity provider redirected to when the user completed
                // identity verification.
                val uri = ...

                val identityUri = uri.split("#code_uri=").last()
                val request = Request.Builder().url(identityUri).build()
                val httpClient = OkHttpClient().newBuilder().build()

                httpClient.newCall(request).execute().use { response ->
                    response.body()?.use { body ->
                        val mapper = jacksonObjectMapper()
                        val identityResponse = mapper.readValue(body.string(), IdentityResponse::class.java)

                        if (IdentityResponse.Status.DONE == identityResponse.status) {
                            // The identity is ready and can be extracted and stored locally
                            // in the user's wallet.
                            val identity: IdentityObject = identityResponse.token!!.identityObject.value
                        } else if (IdentityResponse.Status.ERROR == identityResponse.status) {
                            // Something went wrong and the details about the error are available.
                            val errorDetails = identityResponse.detail
                        } else {
                            // In this case the identity is still pending, and the identity
                            // should be queried again after some time to check the status again.
                            // An identity will always resolve to either the done status or the
                            // error status.
                        }
                    }
                }
            }


    .. tab-item:: Swift (macOS, iOS)

        .. code-block:: Swift

            import Concordium

            let statusURL = todoAwaitCallbackWithVerificationPollingURL()
            let res = try await todoAwaitVerification(statusURL)
            if case let .success(identity) = res {
                print("Identity issued successfully: \(identity))")
            } else {
                // Verification failed...
            }

            func todoAwaitCallbackWithVerificationPollingURL() -> URL {
                // Wait for the callback URL to be invoked (and somehow capture that event).
                // In mobile wallets, the callback URL is probably a deep link that we listen or react to.
                // Regardless of the strategy, the callback is how the IP hands over the URL for polling the verification status -
                // and for some reason it does so in the *fragment* part of the URL!
                // See 'server.swift' of the example CLI for a server-based solution that works in a synchronous context.
                // Warning: It ain't pretty.
                fatalError("'awaitCallbackWithVerificationPollingURL' not implemented")
            }

            func todoAwaitVerification(_ request: IdentityIssuanceRequest) async throws -> IdentityVerificationResult {
                // Block the thread, periodically polling for the verification status.
                // Return the result once it's no longer "pending" (i.e. the result is non-nil).
                while true {
                    let status = try await request.send(session: URLSession.shared)
                    if let r = status.result {
                        return r
                    }
                    try await Task.sleep(nanoseconds: 10 * 1_000_000_000) // check once every 10s
                }
            }
