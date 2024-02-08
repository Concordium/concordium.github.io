.. _wallet-sdk-account-transaction:

=========================================
Submit a transaction to a Concordium node
=========================================

The following sections document the requirements for creating an account transaction, signing it, and
sending it to a Concordium node.

* `Construct and sign an account transaction`_
* `Send an account transaction to a Concordium node`_

+++++++++++++++++++++++++++++++++++++++++
Construct and sign an account transaction
+++++++++++++++++++++++++++++++++++++++++

This example constructs and signs a simple transfer, which is an account transaction that moves an amount of CCD from one account to another. For other transaction types, the steps are similar, but the exact fields that must be provided for the payload will be different. Note that Concordium as a whole supports multi-signature transactions, but for the purpose of this example it will demonstrate how to sign for an account with a single credential that has a single key.

Note that when the transaction has been signed anyone with the signature and the transaction will be able to send it to a Concordium node. Therefore it is very important that a wallet requests user approval before utilizing their signing keys.

.. tabs::

    .. tab::

        TypeScript (Web)

        .. code-block:: javascript

            import {
                AccountAddress,
                AccountTransaction,
                AccountTransactionHeader,
                buildBasicAccountSigner,
                CcdAmount,
                ConcordiumGRPCWebClient,
                ConcordiumHdWallet,
                getAccountAddress,
                signTransaction,
                SimpleTransferPayload,
                TransactionExpiry,
            } from '@concordium/web-sdk';

            const seedPhrase = 'fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position';
            const network = 'Testnet'; // Or Mainnet, if working on mainnet.
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

            const signingKey = wallet.getAccountSigningKey(identityProviderIndex, identityIndex, credNumber);
            const signer = buildBasicAccountSigner(signingKey.toString('hex'));

            const signature = await signTransaction(accountTransaction, signer);

    .. tab::

        Kotlin (Android)

        .. code-block:: Kotlin

            import cash.z.ecc.android.bip39.Mnemonics
            import cash.z.ecc.android.bip39.toSeed
            import com.concordium.sdk.ClientV2
            import com.concordium.sdk.Connection
            import com.concordium.sdk.TLSConfig
            import com.concordium.sdk.crypto.wallet.ConcordiumHdWallet
            import com.concordium.sdk.crypto.wallet.Network
            import com.concordium.sdk.requests.BlockQuery
            import com.concordium.sdk.transactions.CCDAmount
            import com.concordium.sdk.transactions.CredentialRegistrationId
            import com.concordium.sdk.transactions.Expiry
            import com.concordium.sdk.transactions.Index
            import com.concordium.sdk.transactions.SignerEntry
            import com.concordium.sdk.transactions.TransactionFactory
            import com.concordium.sdk.transactions.TransactionSigner
            import com.concordium.sdk.types.AccountAddress

            fun createTransferTransaction(): TransferTransaction {
                val seedPhrase = "fence tongue sell large master side flock bronze ice accident what humble bring heart swear record valley party jar caution horn cushion endorse position"

                @OptIn(ExperimentalStdlibApi::class)
                val seedAsHex = Mnemonics.MnemonicCode(seedPhrase!!.toCharArray()).toSeed().toHexString()
                val network = Network.TESTNET // Or Network.MAINNET, if working on mainnet.
                val wallet = ConcordiumHdWallet.fromHex(seedAsHex, Network.TESTNET)

                val connection = Connection.newBuilder()
                    .host(nodeAddress)
                    .port(nodePort)
                    .useTLS(TLSConfig.auto())
                    .build()
                val client = ClientV2.from(connection)

                val cryptographicParameters = client.getCryptographicParameters(BlockQuery.BEST)

                val credId = wallet.getCredentialId(identityProviderIndex, identityIndex, credNumber, cryptographicParameters.onChainCommitmentKey.toHex())
                val sender = AccountAddress.from(CredentialRegistrationId.from(credId))

                val toAddress = AccountAddress.from("4QkqdUnrjShrUrHpE96odLM6J77nWzEryifzqNnwNk4FYNge8a")
                val amount = CCDAmount.from(5000000)

                val nonce = client.getNextAccountSequenceNumber(sender)
                val expiry = Expiry.createNew().addMinutes(5)

                val signingKey = wallet.getAccountSigningKey(identityProviderIndex, identityIndex, credNumber)

                val signer = TransactionSigner.from(
                    SignerEntry.from(
                        Index.from(0), Index.from(0),
                        signingKey
                    )
                )
                return TransactionFactory.newTransfer().sender(sender).receiver(toAddress).amount(amount)
                    .nonce(nonce).expiry(expiry).signer(signer).build()
            }

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

        .. code-block:: Kotlin

            import com.concordium.sdk.ClientV2
            import com.concordium.sdk.Connection
            import com.concordium.sdk.TLSConfig

            fun main() {
                val connection = Connection.newBuilder()
                    .host(nodeAddress)
                    .port(nodePort)
                    .useTLS(TLSConfig.auto())
                    .build()
                val client = ClientV2.from(connection)
                val transactionHash = client.sendTransaction(transaction)
            }

    .. tab::

        Swift (iOS)

        The Swift SDK for iOS is still in development.
