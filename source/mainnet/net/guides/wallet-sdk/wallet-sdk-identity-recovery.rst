
.. _wallet-sdk-identity-recovery:

======================
Recovering an identity
======================

The following sections document how to create a request for recovering a lost identity from an identity provider. While accounts live on the Concordium blockchain, identities are stored at the identity provider that was chosen when creating it, and recovery happens by sending a request to that identity provider.

* `Generating an identity recovery request`_
* `Sending an identity recovery request`_

+++++++++++++++++++++++++++++++++++++++
Generating an identity recovery request
+++++++++++++++++++++++++++++++++++++++

The following example demonstrates how to generate an identity recovery request. Part of the input to the request is a secret value derived from the seed phrase, and this value should be kept secret in a similar manner as the seed phrase and account signing keys are.

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

            // The identity provider to attempt to recover an identity from.
            const selectedIdentityProvider: IdentityProvider = ...;

            const seedPhrase = 'fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position';
            const network = 'Testnet'; // Or mainnet, if working on mainnet.
            const wallet = ConcordiumHdWallet.fromSeedPhrase(seedPhrase, network);

            const idCredSec = wallet.getIdCredSec(selectedIdentityProvider.ipInfo.ipIdentity, identityIndex).toString('hex');

            const client = new ConcordiumGRPCWebClient(nodeAddress, nodePort);
            const cryptographicParameters = await client.getCryptographicParameters();

            const recoveryRequestInput: IdentityRecoveryRequestWithKeysInput = {
                idCredSec,
                ipInfo: selectedIdentityProvider.ipInfo,
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

When the identity recovery request has been generated the next step is to send it to the associated identity provider. If successful the identity provider will return with a redirect to the location where the identity can be fetched from.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: javascript

            import {
                IdentityObjectV1,
                IdRecoveryRequest,
                Versioned
            } from '@concordium/web-sdk';

            // TODO What about this?
            const selectedIdentityProvider: IdentityProviderWithMetadata = ...;

            // See how to generate in the previous section.
            const recoveryRequest: IdRecoveryRequest = ...;

            const searchParams = new URLSearchParams({
                state: JSON.stringify({ idRecoveryRequest: recoveryRequest }),
            });
            const url = `${selectedIdentityProvider.metadata.recoveryStart}?${searchParams.toString()}`;
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