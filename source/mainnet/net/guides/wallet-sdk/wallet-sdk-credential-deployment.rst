
.. _wallet-sdk-credential-deployment

===================
Creating an account
===================

Having created an identity the next step is to create an account. On Concordium an account is an entity that can hold multiple credentials, but for the sake of keeping the example simple, the following
guide will describe how to create an account with a single credential.

++++++++++++++++++++++++++++++++++++++++++
Create a credential deployment transaction
++++++++++++++++++++++++++++++++++++++++++

The following example demonstrates how a credential deployment transaction is created. Note that you must have saved the identity object and the identity provider that was used to create that identity, as they are required
input for this transaction type.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: typescript

            import {
                ConcordiumHdWallet,
                IdentityProvider,
            } from '@concordium/web-sdk';

            // The identity object created previously. See the identity creation section.
            const identity: IdentityObjectV1 = ...;

            // The identity provider that was used when creating the identity.
            const identityProvider: IdentityProvider = ...;

            // Set up the wallet.
            const seedPhrase = 'fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position';
            const network = 'Testnet'; // Or mainnet, if working on mainnet.
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
            const credentialTransaction = createCredentialTransactionNoSeed(
                credentialInput,
                expiry
            );

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.

++++++++++++++++++++++++++++++++++++++++
Sign a credential deployment transaction
++++++++++++++++++++++++++++++++++++++++

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: typescript

            const credentialDeploymentTransaction = e.data;
            const signingKey = getAccountSigningKey(
                seedPhrase,
                credentialDeploymentTransaction.unsignedCdi.ipIdentity
            );
            const signature = await signCredentialTransaction(
                credentialDeploymentTransaction,
                signingKey
            );

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.

++++++++++++++++++++++++++++++++++++++++
Send a credential deployment transaction
++++++++++++++++++++++++++++++++++++++++

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: typescript

            await sendCredentialDeploymentTransaction(
                credentialDeploymentTransaction,
                signature
            );
            const accountAddress = getAccountAddress(
                credentialDeploymentTransaction.unsignedCdi.credId
            );

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.
