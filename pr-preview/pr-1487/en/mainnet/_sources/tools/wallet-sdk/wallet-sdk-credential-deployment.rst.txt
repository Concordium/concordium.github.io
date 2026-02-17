.. _wallet-sdk-credential-deployment:

=================
Create an account
=================

Having created an identity, the next step is to create an account. On Concordium, an account is an entity that can hold multiple credentials, but for the sake of keeping the example simple, the following guide will describe how to create an account with a single credential.

* `Create a credential deployment transaction`_
* `Sign a credential deployment transaction`_
* `Send a credential deployment transaction`_

++++++++++++++++++++++++++++++++++++++++++
Create a credential deployment transaction
++++++++++++++++++++++++++++++++++++++++++

The following example demonstrates how a credential deployment transaction is created. Note that you must have saved the identity object and the identity provider that was used to create that identity, as they are required input for this transaction type.

.. tab-set::

    .. tab-item:: TypeScript (Web)

        .. code-block:: typescript

            import {
                ConcordiumHdWallet,
                IdentityProvider,
            } from '@concordium/web-sdk';

            // The identity object created previously. See the identity creation section.
            const identity: IdentityObjectV1 = ...;

            // The identity provider that was used when creating the identity.
            const identity: IdentityProvider = ...;
            const identityProviderIndex = identityProvider.ipInfo.ipIdentity;

            // Set up the wallet.
            const seedPhrase = 'fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position';
            const network = 'Testnet'; // Or Mainnet, if working on mainnet.
            const wallet = ConcordiumHdWallet.fromSeedPhrase(seedPhrase, net);

            const prfKey = wallet.getPrfKey(identityProviderIndex, identityIndex).toString('hex');
            const idCredSec = wallet.getIdCredSec(identityProviderIndex, identityIndex).toString('hex');
            const blindingRandomness = wallet.getSignatureBlindingRandomness(identityProviderIndex, identityIndex).toString('hex');

            // The index of the credential to be created. The first should be 0, and then incremented by 1 for
            // each credential created.
            const credNumber = 0;
            const publicKey = wallet.getAccountPublicKey(identityProviderIndex, identityIndex, credNumber).toString('hex');
            const verifyKey = {
                schemeId: 'Ed25519',
                verifyKey: publicKey,
            };

            const credentialPublicKeys = {
                keys: { 0: verifyKey },
                threshold: 1,
            };

            let attributeRandomness: any = {};
            const attributeKeys = Object.keys(AttributesKeys).filter((v) => isNaN(Number(v)));
            attributeKeys.forEach((v) => attributeRandomness[v] = wallet.getAttributeCommitmentRandomness(identityProviderIndex, identityIndex, credNumber, AttributesKeys[v as AttributeKeyString]).toString('hex'));

            const client = new ConcordiumGRPCWebClient(nodeAddress, nodePort);
            const cryptographicParameters = await client.getCryptographicParameters();

            const credentialInput: CredentialInputNoSeed = {
                revealedAttributes: [],
                idObject: identity,
                globalContext: cryptographicParameters,
                credNumber,
                ipInfo: identityProvider.ipInfo,
                arsInfos: identityProvider.arsInfos,
                attributeRandomness,
                credentialPublicKeys,
                idCredSec,
                prfKey,
                sigRetrievelRandomness: blindingRandomness,
            };

            const expiry = TransactionExpiry.fromDate(new Date(Date.now() + 360000));
            const credentialDeploymentTransaction = createCredentialTransactionNoSeed(
                credentialInput,
                expiry
            );

    .. tab-item:: Kotlin (Android)

        .. code-block:: Kotlin

            import cash.z.ecc.android.bip39.Mnemonics
            import cash.z.ecc.android.bip39.toSeed
            import com.concordium.example.wallet.services.ConcordiumClientService
            import com.concordium.example.wallet.services.ConcordiumWalletProxyService
            import com.concordium.sdk.crypto.wallet.ConcordiumHdWallet
            import com.concordium.sdk.crypto.wallet.Credential
            import com.concordium.sdk.crypto.wallet.Network
            import com.concordium.sdk.crypto.wallet.UnsignedCredentialInput
            import com.concordium.sdk.crypto.wallet.credential.CredentialDeploymentDetails
            import com.concordium.sdk.crypto.wallet.credential.UnsignedCredentialDeploymentInfoWithRandomness
            import com.concordium.sdk.requests.BlockQuery
            import com.concordium.sdk.responses.accountinfo.credential.AttributeType
            import com.concordium.sdk.transactions.CredentialPublicKeys
            import com.concordium.sdk.transactions.Expiry
            import com.concordium.sdk.transactions.Index
            import java.util.Collections
            import java.util.EnumMap

            fun createCredentialDeploymentTransaction(identityIndex: Int, credentialCounter: Int): CredentialDeploymentDetails {
                // The identity object created previously. See the identity creation section.
                val identity: IdentityObject = ...

                // The index of the identity provider that was used for creating the identity.
                val identityProviderIndex = ...

                val connection = Connection.newBuilder()
                    .host(nodeAddress)
                    .port(nodePort)
                    .useTLS(TLSConfig.auto())
                    .build()
                val client = ClientV2.from(connection)

                val identityDisclosureAuthorities = Iterable { client.getAnonymityRevokers(BlockQuery.BEST) }.associateBy { it.arIdentity.toString() }
                val providers = client.getIdentityProviders(BlockQuery.BEST)
                val provider = Iterable { providers }.find { it.ipIdentity.value == identityProviderIndex }!!
                val global = client.getCryptographicParameters(BlockQuery.BEST)

                val seedPhrase = "fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position"
                @OptIn(ExperimentalStdlibApi::class)
                val seedAsHex = Mnemonics.MnemonicCode(seedPhrase.toCharArray()).toSeed().toHexString()
                val wallet = ConcordiumHdWallet.fromHex(seedAsHex, Network.TESTNET)

                val attributeRandomness: MutableMap<AttributeType, String> = EnumMap(AttributeType::class.java)
                for (attrType in identity.attributeList.chosenAttributes.keys) {
                    attributeRandomness[attrType] = wallet.getAttributeCommitmentRandomness(
                        identityProviderIndex,
                        identityIndex,
                        credentialCounter,
                        attrType.ordinal
                    )
                }

                val blindingRandomness = wallet.getSignatureBlindingRandomness(identityProviderIndex, identityIndex)
                val idCredSec = wallet.getIdCredSec(identityProviderIndex, identityIndex)
                val prfKey = wallet.getPrfKey(identityProviderIndex, identityIndex)

                val publicKeys = CredentialPublicKeys.from(
                    Collections.singletonMap(
                        Index.from(0),
                        wallet.getAccountPublicKey(
                            identityProviderIndex,
                            identityIndex,
                            credentialCounter
                        )
                    ), 1
                )

                val input: UnsignedCredentialInput = UnsignedCredentialInput.builder()
                    .ipInfo(provider)
                    .globalContext(global)
                    .arsInfos(identityDisclosureAuthorities)
                    .idObject(identity)
                    .credNumber(credentialCounter)
                    .attributeRandomness(attributeRandomness)
                    .blindingRandomness(blindingRandomness)
                    .credentialPublicKeys(publicKeys)
                    .idCredSec(idCredSec)
                    .prfKey(prfKey)
                    .revealedAttributes(emptyList())
                    .build()

                val expiry = Expiry.createNew().addMinutes(5)

                return CredentialDeploymentDetails(Credential.createUnsignedCredential(input).unsignedCdi, expiry)
            }

    .. tab-item:: Swift (macOS, iOS)

        .. code-block:: Swift

            import Concordium
            import MnemonicSwift // external package for converting seed phrase to bytes

            // Inputs.
            let seedPhrase = "fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position"
            let network = Network.testnet
            let identityProviderID = IdentityProviderID(3)
            let identityIndex = IdentityIndex(7)
            let credentialCounter = CredentialCounter(21)
            let walletProxyBaseURL = URL(string: "https://wallet-proxy.testnet.concordium.com")!
            let identityDisclosureThreshold = RevocationThreshold(2)

            // Configure seed and Wallet Proxy instance.
            let seedHex = try Mnemonic.deterministicSeedString(from: seedPhrase)
            let seed = WalletSeed(seedHex: seedHex, network: network)

            let identity: IdentityObject = ... // retrieved from storage or identity recovery

            // Derive seed based credential.
            let accountDerivation = SeedBasedAccountDerivation(seed: seed, cryptoParams: cryptoParams)
            let seedIndexes = AccountCredentialSeedIndexes(
                identity: .init(providerID: identityProviderID, index: identityIndex),
                counter: credentialCounter
            )
            // Credential to deploy.
            let credential = try accountDerivation.deriveCredential(
                seedIndexes: seedIndexes,
                identity: identity,
                provider: identityProvider,
                threshold: 1
            )
            // Account used to sign the deployment.
            // The account is composed from just the credential derived above.
            // From this call the credential's signing key will be derived;
            // in the previous only the public key was.
            let account = try accountDerivation.deriveAccount(credentials: [seedIndexes])

++++++++++++++++++++++++++++++++++++++++
Sign a credential deployment transaction
++++++++++++++++++++++++++++++++++++++++

With the credential deployment transaction created, the next step is to sign the transaction. It is important that the key used for signing the transaction
is the signing key that corresponds to the public key used when creating the transaction. If they do not match, then the transaction will be rejected.

.. tab-set::

    .. tab-item:: TypeScript (Web)

        .. code-block:: javascript

            import {
                ConcordiumHdWallet,
                CredentialDeploymentDetails,
                CredentialDeploymentTransaction,
                signCredentialTransaction
            } from '@concordium/web-sdk';

            // The credential deployment transaction created in the previous section.
            const credentialDeploymentTransaction: CredentialDeploymentTransaction = ...;

            // The key used to sign the credential deployment transaction must be the corresponding
            // secret key for the public key that was used to construct the transaction.
            const seedPhrase = 'fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position';
            const network = 'Testnet'; // Or Mainnet, if working on mainnet.
            const wallet = ConcordiumHdWallet.fromSeedPhrase(seedPhrase, network);

            // The credNumber and the identityIndex must identical to what was used when deriving
            // the keys to create the credential deployment transaction.
            const credNumber = 0;
            const identityIndex = 0;
            const signingKey = wallet.getAccountSigningKey(credentialDeploymentTransaction.unsignedCdi.ipIdentity, identityIndex, credNumber);

            const signature = await signCredentialTransaction(credentialDeploymentTransaction, signingKey);

    .. tab-item:: Kotlin (Android)

        .. code-block:: Kotlin

            import cash.z.ecc.android.bip39.Mnemonics
            import cash.z.ecc.android.bip39.toSeed
            import com.concordium.sdk.crypto.wallet.ConcordiumHdWallet
            import com.concordium.sdk.crypto.wallet.Credential
            import com.concordium.sdk.crypto.wallet.Network
            import com.concordium.sdk.crypto.wallet.credential.CredentialDeploymentDetails

            fun signCredentialDeployment(credentialDeployment: CredentialDeploymentDetails): ByteArray {
                val seedPhrase = "fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position"
                @OptIn(ExperimentalStdlibApi::class)
                val seedAsHex = Mnemonics.MnemonicCode(seedPhrase.toCharArray()).toSeed().toHexString()
                val wallet = ConcordiumHdWallet.fromHex(seedAsHex, Network.TESTNET)

                // The credentialCounter and the identityIndex must identical to what was used when deriving
                // the keys to create the credential deployment transaction.
                val credentialCounter = 0
                val identityIndex = 0

                // The indentityProvider index must be indentical to the index of the identity provider
                // that was used to create the identity that the credential is for.
                val identityProviderIndex = 0

                val credentialDeploymentSignDigest = Credential.getCredentialDeploymentSignDigest(credentialDeployment)
                val signingKey = wallet.getAccountSigningKey(
                    identityProviderIndex,
                    identityIndex,
                    credentialCounter
                )

                return signingKey.sign(credentialDeploymentSignDigest)
            }

    .. tab-item:: Swift (iOS)

        .. code-block:: Swift

            import Concordium

            // Inputs.
            let expiry = TransactionTime(9_999_999_999)

            let credential: AccountCredential // from previous section
            let signingAccount: Account // from previous section

            // Sign deployment transaction.
            let signedTx = try signingAccount.keys.sign(deployment: credential, expiry: expiry)

++++++++++++++++++++++++++++++++++++++++
Send a credential deployment transaction
++++++++++++++++++++++++++++++++++++++++

Having created and signed the credential deployment transaction, the final step is to send it to a Concordium node. The SDKs provide a
utility function that does this by simply providing it the credential deployment transaction and the signature on the transaction. The result
of the call is a transaction hash that can then be used to monitor the status of the transaction.

If successful, the credential will be deployed, and it is now possible to start creating account transactions. Go to
:ref:`wallet-sdk-account-transaction` for a guide about creating account transactions.

.. tab-set::

    .. tab-item:: TypeScript (Web)

        .. code-block:: javascript

            import {
                sendCredentialDeploymentTransaction,
            } from '@concordium/web-sdk';

            // The credential deployment transaction created in the first section.
            const credentialDeploymentTransaction: CredentialDeploymentTransaction = ...;

            // The signature on the credential deployment transaction from the previous section.
            const signature: string = ...;

            const transactionHash = await sendCredentialDeploymentTransaction(
                credentialDeploymentTransaction,
                signature
            );

    .. tab-item:: Kotlin (Android)

        .. code-block:: Kotlin

            import com.concordium.sdk.crypto.wallet.Credential
            import com.concordium.sdk.crypto.wallet.credential.CredentialDeploymentDetails
            import com.concordium.sdk.crypto.wallet.credential.CredentialDeploymentSerializationContext
            import com.concordium.sdk.transactions.CredentialDeploymentTransaction
            import com.concordium.sdk.transactions.Index
            import org.apache.commons.codec.binary.Hex

            fun sendCredentialDeploymentTransaction(): Hash {
                // The credential deployment details created in the first section.
                val credentialDeploymentDetails: CredentialDeploymentDetails = ...

                // The signature on the credential deployment transaction from the previous section
                val signature: String = ...

                val context = CredentialDeploymentSerializationContext(
                    credentialDeployment.unsignedCdi,
                    mapOf(Pair(Index.from(0), Hex.encodeHexString(signature)))
                )
                val credentialPayload = Credential.serializeCredentialDeploymentPayload(context)
                val credentialDeploymentTransaction = CredentialDeploymentTransaction.from(credentialDeploymentDetails.expiry, credentialPayload)

                val connection = Connection.newBuilder()
                    .host(nodeAddress)
                    .port(nodePort)
                    .useTLS(TLSConfig.auto())
                    .build()
                val client = ClientV2.from(connection)

                return client.sendCredentialDeploymentTransaction(credentialDeploymentTransaction)
            }

    .. tab-item:: Swift (macOS, iOS)

        .. code-block:: Swift

            import Concordium
            import GRPC // external dependency for gRPC client

            let grpcChannel: GRPCChannel // see docs for package GRPC or examples in SDK repo
            let client: NodeClient = GRPCNodeClient(channel: grpcChannel)

            let signedTx: SignedAccountCredentialDeployment // from previous section

            let serializedTx = try signedTx.serialize()
            let hash = try await client.send(deployment: serializedTx)
            print("Transaction with hash '\(hash.hex)' successfully submitted.")
