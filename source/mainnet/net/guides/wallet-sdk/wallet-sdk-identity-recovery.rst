.. _wallet-sdk-identity-recovery:

======================
Recovering an identity
======================

The following sections demonstrate the process of creating a request to recover an identity from an identity provider. While accounts are stored on the Concordium blockchain, identities are stored by the selected identity provider during the creation process, and recovery is initiated by sending a request to that specific identity provider.

* `Generating an identity recovery request`_
* `Sending an identity recovery request`_

+++++++++++++++++++++++++++++++++++++++
Generating an identity recovery request
+++++++++++++++++++++++++++++++++++++++

The following example demonstrates the process of generating an identity recovery request. Part of the input to the request is a secret value derived from the seed phrase, and this value should be kept secret in a similar manner as the seed phrase and account signing keys.

In the example below functionality for retrieving the list of identity providers is present. To see an example of how to implement this function, please check out :ref:`Identity Provider List`.

.. tabs::

    .. tab::

        TypeScript (Web)

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
            const network = 'Testnet'; // Or mainnet, if working on mainnet.
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

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.

++++++++++++++++++++++++++++++++++++
Sending an identity recovery request
++++++++++++++++++++++++++++++++++++

The next step is to send the generated identity recovery request to the associated identity provider. If successful, the identity provider will return a redirect to the location from which the identity can be fetched.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: javascript

            import {
                IdentityObjectV1,
                IdRecoveryRequest,
                Versioned
            } from '@concordium/web-sdk';

            // This identity provider must be identical to the one used to generate the identity
            // receovery request, otherwise the request will fail.
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

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.
