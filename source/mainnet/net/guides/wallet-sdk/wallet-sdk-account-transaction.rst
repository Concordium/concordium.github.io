.. _wallet-sdk-account-transaction:

=============================================
Submitting a transaction to a Concordium node
=============================================

The following sections document the requirements for creating an account transaction, signing it and
finally sending it to a Concordium node.

* `Construct an account transaction`_,
* `Sign an account transaction`_,
* `Send an account transaction to a Concordium node`_.

++++++++++++++++++++++++++++++++
Construct an account transaction
++++++++++++++++++++++++++++++++

For the sake of this example we will be constructing a simple transfer, which is an account transaction that moves an amount of CCD from one account to another. For other transaction types the steps are similar,
but the exact fields that must be provided as the payload will be different.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: javascript

            import {
                AccountAddress,
                AccountTransaction,
                AccountTransactionHeader,
                CcdAmount,
                ConcordiumGRPCWebClient,
                ConcordiumHdWallet,
                getAccountAddress,
                signTransaction,
                SimpleTransferPayload,
                TransactionExpiry,
            } from '@concordium/web-sdk';

            const seedPhrase = 'fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position';
            const network = 'Testnet'; // Or mainnet, if working on mainnet.
            const wallet = ConcordiumHdWallet.fromSeedPhrase(seedPhrase, network);

            const client = new ConcordiumGRPCWebClient(nodeAddress, nodePort);
            const cryptographicParameters = await client.getCryptographicParameters();

            const credId = wallet.getCredentialId(identityProviderIndex, identityIndex, credNumber, cryptographicParameters);
            const sender = getAccountAddress(credId);

            const toAddress = AccountAddress.fromBase58('4QkqdUnrjShrUrHpE96odLM6J77nWzEryifzqNnwNk4FYNge8a');

            const amount = CcdAmount.fromMicroCcd(5000000);

            const payload: SimpleTransferPayload = {
                amount,
                toAddress
            };

            const expiry = TransactionExpiry.fromDate(new Date(Date.now() + 360000));

            const nonce = (await client.getNextAccountNonce(sender)).nonce;

            const header: AccountTransactionHeader = {
                expiry:
                nonce,
                sender,
            };

            const transaction: AccountTransaction = {
                type: AccountTransactionType.Transfer,
                payload,
                header,
            };

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.

+++++++++++++++++++++++++++
Sign an account transaction
+++++++++++++++++++++++++++

Having constructed an account transaction the next step is to sign it. It is important that the key used to sign an account transaction matches the sender address provided in the account transaction header. We note here that Concordium as a whole support multisignature transactions, but for the purpose of this example we will demonstrate how to do it for an account with a single credential that has a single key.

Please note that when the transaction has been signed anyone with the signature and the transaction will be able to send it to a Concordium node. Therefore it is very important that a wallet requests user approval before utilizing their signing keys.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: javascript

            import {
                buildBasicAccountSigner,
                ConcordiumHdWallet,
                signTransaction,
            } from '@concordium/web-sdk';

            const seedPhrase = 'fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position';
            const network = 'Testnet'; // Or mainnet, if working on mainnet.
            const wallet = ConcordiumHdWallet.fromSeedPhrase(seedPhrase, network);

            const signingKey = wallet.getAccountSigningKey(identityProviderIndex, identityIndex, credNumber);
            const signer = buildBasicAccountSigner(signingKey.toString('hex'));

            const signature = await signTransaction(accountTransaction, signer);

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.

++++++++++++++++++++++++++++++++++++++++++++++++
Send an account transaction to a Concordium node
++++++++++++++++++++++++++++++++++++++++++++++++

Finally, when the transaction has been constructed and signed, it is ready to be sent to a Concordium node. The output of the function sending a transaction to a Concordium node is the transaction hash. The transaction hash can then be used to monitor the status of the submitted transaction.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: javascript

            import {
                ConcordiumGRPCWebClient,
            } from '@concordium/web-sdk';

            const client = new ConcordiumGRPCWebClient(nodeAddress, nodePort);
            const transactionHash = await client.sendAccountTransaction(accountTransaction, signature);

    .. tab::

        Kotlin (Android)

        TODO Write the Kotlin example.

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.
