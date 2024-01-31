.. _wallet-sdk-identity-creation

====================
Creating an identity
====================

A prerequisite for creating an account on the Concordium blockchain is to have an identity. Therefore, a user of a wallet will always have 
to create an identity as an initial step, before being able to send account transactions.

An identity is acquired by generating an identity request and sending that to an identity provider. The user will then be taken through the identity verification
process that is specific for that chosen identity provider. This happens outside of the wallet application.


++++++++++++++++++++++++++++
Creating an identity request
++++++++++++++++++++++++++++

The first step is to create the actual identity request. Doing this requires the list of 
identity providers, see :ref:`RST Overview` for how to retrieve that.

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
            const network = 'Testnet'; // Or mainnet, if working on mainnet.
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

+++++++++++++++++++++++++++
Sending an identity request
+++++++++++++++++++++++++++

When the identity request has been created, the next step is to send the request to the identity
provider that it was created for. There are multiple ways of doing this and it depends on your
choice of technologies. Below is an example of how it can be done.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: javascript

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
