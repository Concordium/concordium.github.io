
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
            const credentialDeploymentTransaction = createCredentialTransactionNoSeed(
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

With the credential deployment transaction created, the next step is to sign the transaction. It is important that the key used for signing the transaction
is the signing key that corresponds to the public key used when creating the transaction. If they do not match, then the transaction will be rejected.

.. tabs::

    .. tab::

        TypeScript (Web)

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
            const network = 'Testnet'; // Or mainnet, if working on mainnet.
            const wallet = ConcordiumHdWallet.fromSeedPhrase(seedPhrase, network);

            // The credNumber and the identityIndex must identical to what was used when deriving
            // the keys to create the credential deployment transaction.
            const credNumber = 0;
            const identityIndex = 0;
            const signingKey = wallet.getAccountSigningKey(credentialDeploymentTransaction.unsignedCdi.ipIdentity, identityIndex, credNumber);

            const signature = await signCredentialTransaction(credentialDeploymentTransaction, signingKey);

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.

++++++++++++++++++++++++++++++++++++++++
Send a credential deployment transaction
++++++++++++++++++++++++++++++++++++++++

Having created and signed the credential deployment transaction, the final step is to send it to a Concordium node. The SDKs provide a
utility function that does this by simply providing it the credential deployment transaction and the signature on the transaction. The result
of the call is a transaction hash that can then be used to monitor the status of the transaction. 

If successful, the credential will have been deployed, and it is now possible to start creating account transactions. Go to
:ref:`wallet-sdk-account-transaction` for a guide on how that is done.

.. tabs::

    .. tab::

        TypeScript (Web)

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

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.
