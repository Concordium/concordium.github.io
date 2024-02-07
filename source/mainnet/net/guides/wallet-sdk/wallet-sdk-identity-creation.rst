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

.. tabs::

    .. tab::

        TypeScript (Web)

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

            const idCredSec = wallet.getIdCredSec(identityProvider, identityIndex).toString('hex');
            const prfKey = wallet.getPrfKey(identityProviderIndex, identityIndex).toString('hex');
            const blindingRandomness = wallet.getSignatureBlindingRandomness(identityProviderIndex, identityIndex).toString('hex');

            // The anonymity revocation threshold. Here we select the highest possible threshold for
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

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.

++++++++++++++++++++++++
Send an identity request
++++++++++++++++++++++++

Once the identity request has been created, the next step is to send it to the corresponding identity provider. There are multiple ways to accomplish this, and it will depend on the technologies you choose. Below is an example of how it can be done.

A part of the request is a `redirectUri`, which tells the identity provider where to redirect the user when the identity verification flow has been completed. A wallet application has to choose this in such a way that the user is sent back into the wallet application, where the actual identity object can then be retrieved from the information provided in the hash property of the redirect URL.

.. tabs::

    .. tab::

        TypeScript (Web)

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

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.

++++++++++++++++++++++++++++++++++++
Retrieve the identity after creation
++++++++++++++++++++++++++++++++++++

Upon completing identity verification with the identity provider, the identity provider does a redirect of the user back to the `redirectUri` that was provided when sending the identity request to the identity provider. The hash property of the URL that the identity provider redirects the user to contains the URL where the identity object can be retrieved from in the format `redirectUri#code_uri=`, where the URL will be after the equals sign.

.. tabs::

    .. tab::

        TypeScript (Web)

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

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.
