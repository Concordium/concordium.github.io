.. _web3id-idp-interfaces:

==================================================
Wallet identity provider interfaces (data formats)
==================================================

A :ref:`Concordium wallet <wallets-lp>` interacts with identity providers when issuing or recovering identities. This document describes the data formats and interfaces used in these interactions.

Recovery
========

The **goal** is to recover a particular existing :ref:`identity <reference-identity>` (identity object) when recovering a wallet from the secret :term:`seed phrase`.

Prerequisites
-------------

* Identity providers info fetched from the wallet-proxy `v2/ip_info endpoint <https://github.com/Concordium/concordium-wallet-proxy/blob/main/README.md#identity-provider-information>`_
* Identity recovery request (also known as recovery request) created by an :ref:`SDK <sdks-apis>`

    * follow `this link <https://github.com/Concordium/concordium-java-sdk/blob/5f5214cb3b80c1ae028457b2149a020038e3f2c3/concordium-android-wallet-example/app/src/main/java/com/concordium/example/wallet/Requests.kt#L24-L47>`_ to see more request examples in Kotlin, using the Java SDK

.. code-block:: Kotlin

    /**
     * Creates the serialized input for requesting an identity recovery.
     * @param wallet the wallet for the seed phrase that the identity should be created with
     * @param provider the chosen identity provider
     * @param global the global cryptographic parameters of the current chain
     * @return returns the recovery request as a JSON string
     */
    fun createRecoveryRequest(
        wallet: ConcordiumHdWallet,
        provider: IdentityProvider,
        global: CryptographicParameters
    ): String {
        val providerIndex = provider.ipInfo.ipIdentity
        val idCredSec = wallet.getIdCredSec(providerIndex.value, Constants.IDENTITY_INDEX)

        val input = IdentityRecoveryRequestInput.builder()
            .globalContext(global)
            .ipInfo(provider.ipInfo)
            .idCredSec(idCredSec)
            .timestamp(java.time.Instant.now().epochSecond)
            .build()

        return createIdentityRecoveryRequest(input)
    }

Recovery request
----------------

**URL**: Identity provider's ``recoveryStart`` URL from the provider info metadata

**Method**: ``GET``

**Query parameters**:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Name
     - Value
   * - state
     - Identity recovery request, a stringified ``JSON`` just as returned from the corresponding SDK method

Response
^^^^^^^^

If the **queried identity exists**:

* A ``200 OK`` with a ``JSON`` object body having the following structure:

    * ``v`` – integer, a container version
    * ``value`` – ``JSON`` object, the identity object you are looking for

If the **queried identity doesn't exist**:

* A ``404 Not found``

Issuance
========

The **goal** is to create a new :ref:`identity <reference-identity>` for the user so they can then create :ref:`accounts <managing_accounts>`.

Sequence
--------

1. **Initiate** issuance
2. **Open** a browser for the user to complete the verification process (capture documents, fill in forms, etc.)
3. Upon the verification process completion, **periodically check** for the identity readiness
4. Let the user **use** the successfully created identity or **present** the error and allow trying again

Prerequisites
-------------

* **Identity providers info** fetched from the wallet-proxy `v2/ip_info endpoint <https://github.com/Concordium/concordium-wallet-proxy/blob/main/README.md#identity-provider-information>`_
* User's choice of a **particular identity provider**
* **Identity request** (also known as **ID request**, **identity issuance request**) created by an SDK

    * follow `this link <https://github.com/Concordium/concordium-java-sdk/blob/5f5214cb3b80c1ae028457b2149a020038e3f2c3/concordium-android-wallet-example/app/src/main/java/com/concordium/example/wallet/Requests.kt#L24-L47>`_ to see more request examples in Kotlin, using the Java SDK

.. code-block:: Kotlin

   /**
     * Creates the serialized input for requesting an identity issuance.
     * @param wallet the wallet for the seed phrase that the identity should be created with
     * @param provider the chosen identity provider
     * @param global the global cryptographic parameters of the current chain
     * @return returns the identity issuance request as a JSON string
     */
    fun createIssuanceRequest(
        wallet: ConcordiumHdWallet,
        provider: IdentityProvider,
        global: CryptographicParameters
    ): String {
        val providerIndex = provider.ipInfo.ipIdentity.value

        val idCredSec = wallet.getIdCredSec(providerIndex, Constants.IDENTITY_INDEX)
        val prfKey = wallet.getPrfKey(providerIndex, Constants.IDENTITY_INDEX)
        val blindingRandomness: String =
            wallet.getSignatureBlindingRandomness(providerIndex, Constants.IDENTITY_INDEX)

        val input: IdentityRequestInput = IdentityRequestInput.builder()
            .globalContext(global)
            .ipInfo(provider.ipInfo)
            .arsInfos(provider.arsInfos)
            .arThreshold(Constants.AR_THRESHOLD)
            .idCredSec(idCredSec)
            .prfKey(prfKey)
            .blindingRandomness(blindingRandomness)
            .build()

        return Identity.createIdentityRequest(input)
    }

* Ability to **open a URL in a browser** for the user to complete the verification process
* Ability to **receive a redirect** from a browser – the wallet must have a **unique URI** accessible from a browser in order to receive a callback after the verification process completion

Issuance start request
----------------------

**URL**: Identity provider's ``issuanceStart`` URL from the provider info metadata

**Method**: ``GET``

**Query parameters**:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Name
     - Value
   * - state
     - Identity request, a stringified ``JSON`` just as returned from the corresponding SDK method
   * - response_type
     - Just "code", without quotes
   * - scope
     - Just "identity", without quotes
   * - redirect_uri
     - The unique URI of the wallet to receive a callback after the verification process completion

Response
^^^^^^^^

A redirect (``300``, ``301``, ``302``, ``303``, ``307``, ``308``) with the ``Location`` header pointing to the URI to proceed with.

* If the ``URI`` is the **wallet redirect URI**, and it contains a fragment (``#`` and after) with the ``error`` query parameter, then the verification process can't be started. The wallet must present the error and allow trying again. Unfortunately, the value is arbitrary – some providers return a ``JSON`` while others just an error description in English.
* If the ``URI`` is an ``HTTP(S)`` URL, then it must be opened in a **browser**.

Verification process completion callback
----------------------------------------

**URL**: The **wallet redirect URI**

**Method**: ``GET``

**Query parameters** in the fragment (after ``#``):

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Name
     - Value
   * - error
     - Optional, if present, means the verification process has been failed/cancelled. The wallet must present the error and allow trying again. Unfortunately, the value is arbitrary – some providers return a ``JSON`` while others just an error description in English.
   * - code_uri
     - Optional. A URL to fetch the identity (identity object) status at. If present, it means the verification process has been completed and the identity provider is now checking the collected data. The wallet must save this URL and perform periodic checks on it.

Identity status request
-----------------------

**URL**: A particular ``code_uri`` received in the verification process completion callback

**Method**: ``GET``

Response
^^^^^^^^

A ``200 OK`` with a ``JSON`` object body having the following structure:

.. code-block:: json

   {
     "status": "pending",
     "token": {
       "identityObject": {}
     },
     "detail": "Error details"
   }

* ``status`` – **string**, status of the issuance: ``done``, ``pending`` or ``error``

  * ``pending`` – the identity provider is still checking the data collected during the verification process. The wallet must **continue the periodic check**
  * ``done`` – the identity provider has verified the data and issued the identity, the response contains the identity object. The wallet must **save the identity object** so it can then be used to create accounts
  * ``error`` – the identity provider hasn't been able to verify the data, therefore rejected the issuance of the identity. The wallet must **present the error** and allow trying again

* ``token`` – **JSON object**, **optional**, only present when the status is ``done``. It has the following structure:

  * ``identityObject`` – the issued **identity object**

* ``detail`` – **optional**, only present when the status is ``error``. Unfortunately, the value is arbitrary, some providers return a ``JSON`` while others just an error description in English
