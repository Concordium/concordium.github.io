.. _nft-w-id-frontend:
.. include:: ../../../mainnet/variables.rst

=====================
Front-end development
=====================

The user interface will be a simple React application implemented from the template and material-ui, similar to this tutorial.

.. code-block:: console

    npx create-react-app mint-ui --template typescript

It will take some time to fetch and install all packages and dependencies, and when it’s all done you will have something similar to the below.

.. image:: ../../images/adv-frontend1.png
    :alt: visual studio code window in dark mode with terminal window open showing result of above command

And when you run it you will see the template application interface.

.. image:: ../../images/adv-frontend2.png
    :alt: browser tab showing result of running the locally built front end

Then you will add the dependencies for some React components from material-ui, and necessary libraries from concordium-web-sdk and concordium-web-wallet-helper. To do that, run the command below and ``yarn`` will install all specified packages.

.. code-block:: console

    yarn add @mui/material @emotion/react @mui/icons-material @emotion/styled @concordium/web-sdk @concordium/browser-wallet-api-helpers

Once you complete that, it will create a **package.json** file that includes all dependencies in it.

.. image:: ../../images/adv-frontend3.png
    :alt: visual studio code window in dark mode with package.json file open

Header.tsx
==========

Nice. Create a folder for the **components** and add a file for the **Header.tsx**. This component will be your wallet connection handler button.

.. code-block:: console

    import { Button } from "@mui/material";

    export default function HeaderButton(props: {
    name: string;
    isSelected: boolean;
    onClick: () => void;
    }) {
    return (
    <Button
    variant={props.isSelected ? "outlined" : "contained"}
    key={props.name}
    onClick={() => props.onClick()}
    sx={{
        my: 2,
        color: "white",
        display: "block",
        borderColor: "white",
        borderRadius: "4px",
        ":hover": {
        my: 2,
        color: "white",
        display: "block",
        borderColor: "white",
        borderRadius: "4px",
        },
    }}
    >
    {props.name}
    </Button>
    );
    }

Open the **App.tsx** file and remove everything inside the ``App()``. First, add the helpers from the concordium-browser-wallet-api-helpers and then add the ``connect()`` function. When you do that, you will be able to connect your wallet. It looks terrible but you will fix that later.

.. code-block:: console

    import React from 'react';
    import logo from './logo.svg';
    import './App.css';
    import { useEffect, useState } from "react";
    import {
    detectConcordiumProvider,
    WalletApi,
    } from "@concordium/browser-wallet-api-helpers";


    import HeaderButton from "./components/Header";
    import { AppBar } from '@mui/material';

    function App() {
    const [state, setState] = useState<{
    provider?: WalletApi;
    account?: string;
    }>({});

    function connect() {
    detectConcordiumProvider()
    .then((provider) => {
        provider
        .getMostRecentlySelectedAccount()
        .then((account) =>
        !!account ? Promise.resolve(account) : provider.connect()
        )
        .then((account) => {
        setState({ ...state, provider, account });
        })
        .catch((_) => {
        alert("Please allow wallet connection");
        });
        provider.on("accountDisconnected", () => {
        setState({ ...state, account: undefined });
        });
        provider.on("accountChanged", (account) => {
        setState({ ...state, account });
        });
        provider.on("chainChanged", () => {
        setState({ ...state, account: undefined, provider: undefined });
        });
    })
    .catch((_) => {
        console.error(`could not find provider`);
        alert("Please download Concordium Wallet");
    });
    }


    useEffect(() => {
    if (!state.provider || !state.account) {
    connect();
    }

    return () => {
    state.provider?.removeAllListeners();
    };
    }, [state.account]);

    function isConnected() {
    return !!state.provider && !!state.account;
    }

    const isConnectedVar = isConnected();

    return (
    <AppBar>
    <HeaderButton
            name={isConnectedVar ? "Connected" : "Connect"}
            isSelected={isConnectedVar}
            onClick={connect}
        />
    </AppBar>);

    }

    export default App;

.. image:: ../../images/adv-frontend4.png
    :alt: browser tab showing result of running the locally built front end

Now, add some material-ui components to beautify it and change the return function with the one below.

.. code-block:: console

    import {
    AppBar,
    Box,
    Container,
    Link,
    Paper,
    Toolbar,
    Typography,
    } from "@mui/material";

    /// .....
    ///
    /// .....

    return (
    <AppBar position="static">
        <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Toolbar disableGutters>
            <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
            }}
            >
            Concordium
            </Typography>
            <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "row-reverse",
            }}
            >
            <HeaderButton
                name={isConnectedVar ? "Connected" : "Connect"}
                isSelected={isConnectedVar}
                onClick={connect}
            />
            </Box>
        </Toolbar>
        </Container>
    </AppBar>
    );

.. image:: ../../images/adv-frontend5.png
    :alt: browser tab showing result of running the locally built front end

Well, it's not bad.

Contract Client
===============

In order to interact with a smart contract deployed on-chain you have to use SDKs and the best way is to implement a client using it. Since our project is a React application, the Concordium web-SDK is the one you need. Almost all of the code is reusable for any project (but it might need some changes depending on SDK updates).

Create another folder called **modules** and add a file for the client’s helper functions implementation (**CIS2ContractHelper.ts**).

.. code-block:: console

    import { WalletApi } from "@concordium/browser-wallet-api-helpers";
    import { Buffer } from "buffer/";

    import {
        ContractAddress,
        AccountTransactionType,
        UpdateContractPayload,
        serializeUpdateContractParameters,
        ModuleReference,
        InitContractPayload,
        TransactionStatusEnum,
        TransactionSummary,
        CcdAmount,
    } from "@concordium/web-sdk";


    /**
    * Waits for the input transaction to Finalize.
    * @param provider Wallet Provider.
    * @param txnHash Hash of Transaction.
    * @returns Transaction outcomes.
    */
    export function waitForTransaction(
        provider: WalletApi,
        txnHash: string
    ): Promise<Record<string, TransactionSummary> | undefined> {
        return new Promise((res, rej) => {
            _wait(provider, txnHash, res, rej);
        });
    }

    export function ensureValidOutcome(
        outcomes?: Record<string, TransactionSummary>
    ): Record<string, TransactionSummary> {
        if (!outcomes) {
            throw Error("Null Outcome");
        }

        let successTxnSummary = Object.keys(outcomes)
            .map((k) => outcomes[k])
            .find((s) => s.result.outcome === "success");

        if (!successTxnSummary) {
            let failures = Object.keys(outcomes)
                .map((k) => outcomes[k])
                .filter((s) => s.result.outcome === "reject")
                .map((s) => (s.result as any).rejectReason.tag)
                .join(",");
            throw Error(`Transaction failed, reasons: ${failures}`);
        }

        return outcomes;
    }


    /**
    * Uses Contract Schema to serialize the contract parameters.
    * @param contractName Name of the Contract.
    * @param schema  Buffer of Contract Schema.
    * @param methodName Contract method name.
    * @param params Contract Method params in JSON.
    * @returns Serialize buffer of the input params.
    */
    export function serializeParams<T>(
        contractName: string,
        schema: Buffer,
        methodName: string,
        params: T
    ): Buffer {
        return serializeUpdateContractParameters(
            contractName,
            methodName,
            params,
            schema
        );
    }


    export function _wait(
        provider: WalletApi,
        txnHash: string,
        res: (p: Record<string, TransactionSummary> | undefined) => void,
        rej: (reason: any) => void
    ) {
        setTimeout(() => {
            provider
                .getJsonRpcClient()
                .getTransactionStatus(txnHash)
                .then((txnStatus) => {
                    if (!txnStatus) {
                        return rej("Transaction Status is null");
                    }

                    console.info(`txn : ${txnHash}, status: ${txnStatus?.status}`);
                    if (txnStatus?.status === TransactionStatusEnum.Finalized) {
                        return res(txnStatus.outcomes);
                    }

                    _wait(provider, txnHash, res, rej);
                })
                .catch((err) => rej(err));
        }, 1000);
    }

    export function parseContractAddress(
        outcomes: Record<string, TransactionSummary>
    ): ContractAddress {
        for (const blockHash in outcomes) {
            const res = outcomes[blockHash];

            if (res.result.outcome === "success") {
                for (const event of res.result.events) {
                    if (event.tag === "ContractInitialized") {
                        return {
                            index: toBigInt((event as any).address.index),
                            subindex: toBigInt((event as any).address.subindex),
                        };
                    }
                }
            }
        }

        throw Error(`unable to parse Contract Address from input outcomes`);
    }

    export function toBigInt(num: BigInt | number): bigint {
        return BigInt(num.toString(10));
    }

    const MICRO_CCD_IN_CCD = 1000000;
    export function toCcd(ccdAmount: bigint): CcdAmount {
        return new CcdAmount(ccdAmount * BigInt(MICRO_CCD_IN_CCD));
    }

Now, you are ready to implement your contract interaction functions including the ``initContract`` and the ``updateContract``. Create a file for **CIS2ContractClient.ts**.

In the first function, ``initContract()``, you invoke the initialize function in the contract using the ``schema``, ``moduleRef``, and the ``contractName``. In order to make the transaction, you need the ``AccountTransactionType`` and will use the ``WalletApi`` from the browser-wallet-api-helpers. Using the wallet ``provider``, you can send a transaction by providing the parameters. Then you will wait for the transaction to be finalized and parse the return output.

The second function is the ``updateContract()``. Use this function for all operations where you want to make a state change. This could be transferring of an asset, minting a token, or burning it. It uses the ``schema``, ``moduleRef``, the ``contractName``, and the ``methodName`` (entrypoint) and calls ``AccountTransaction``’s ``Update`` enum which specifies the type of the transaction that is going to be signed.

.. code-block:: console

    import { WalletApi } from "@concordium/browser-wallet-api-helpers";
    import { Buffer } from "buffer/";
    import {
        waitForTransaction,
        ensureValidOutcome,
        serializeParams,
        _wait,
        parseContractAddress,
        toBigInt,
        toCcd
    } from "./CIS2ContractHelpers";

    import {
        ContractAddress,
        AccountTransactionType,
        UpdateContractPayload,
        serializeUpdateContractParameters,
        ModuleReference,
        InitContractPayload,
        TransactionStatusEnum,
        TransactionSummary,
        CcdAmount,
    } from "@concordium/web-sdk";

    export interface Cis2ContractInfo {
        schemaBuffer: Buffer;
        contractName: string;
        moduleRef: ModuleReference;
        tokenIdByteSize: number;
    }

    /**
    * Initializes a Smart Contract.
    * @param provider Wallet Provider.
    * @param moduleRef Contract Module Reference. Hash of the Deployed Contract Module.
    * @param schemaBuffer Buffer of Contract Schema.
    * @param contractName Name of the Contract.
    * @param account Account to Initialize the contract with.
    * @param maxContractExecutionEnergy Maximum energy allowed to execute.
    * @param ccdAmount CCD Amount to initialize the contract with.
    * @returns Contract Address.
    */

    export async function initContract<T>(provider: WalletApi,
        contractInfo: Cis2ContractInfo,
        account: string,
        params?: T,
        serializedParams?: Buffer,
        maxContractExecutionEnergy = BigInt(999),
        ccdAmount = BigInt(0)): Promise<ContractAddress> {

        const { moduleRef, schemaBuffer, contractName } = contractInfo;
        let txnHash = await provider.sendTransaction(
            account,
            AccountTransactionType.InitContract,
            {
                amount: toCcd(ccdAmount),
                moduleRef,
                initName: contractName,
                param: serializedParams || Buffer.from([]),
                maxContractExecutionEnergy,
            } as InitContractPayload,
            params || {},
            schemaBuffer.toString("base64"),
            2 //schema version
        );
        let outcomes = await waitForTransaction(provider, txnHash);
        outcomes = ensureValidOutcome(outcomes);
        return parseContractAddress(outcomes);
    }

    /**
    * Updates a Smart Contract.
    * @param provider Wallet Provider.
    * @param contractName Name of the Contract.
    * @param schema Buffer of Contract Schema.
    * @param paramJson Parameters to call the Contract Method with.
    * @param account  Account to Update the contract with.
    * @param contractAddress Contract Address.
    * @param methodName Contract Method name to Call.
    * @param maxContractExecutionEnergy Maximum energy allowed to execute.
    * @param amount CCD Amount to update the contract with.
    * @returns Update contract Outcomes.
    */

    export async function updateContract<T>(
        provider: WalletApi,
        contractInfo: Cis2ContractInfo,
        paramJson: T,
        account: string,
        contractAddress: { index: number; subindex: number },
        methodName: string,
        maxContractExecutionEnergy: bigint = BigInt(9999),
        amount: bigint = BigInt(0)
    ): Promise<Record<string, TransactionSummary>> {
        const { schemaBuffer, contractName } = contractInfo;
        const parameter = serializeParams(
            contractName,
            schemaBuffer,
            methodName,
            paramJson
        );
        let txnHash = await provider.sendTransaction(
            account,
            AccountTransactionType.Update,
            {
                maxContractExecutionEnergy,
                address: {
                    index: BigInt(contractAddress.index),
                    subindex: BigInt(contractAddress.subindex),
                },
                message: parameter,
                amount: toCcd(amount),
                receiveName: `${contractName}.${methodName}`,
            } as UpdateContractPayload,
            paramJson as any,
            schemaBuffer.toString("base64"),
            2 //Schema Version
        );

        let outcomes = await waitForTransaction(provider, txnHash);

        return ensureValidOutcome(outcomes);
    }

Since you have the helpers and the client code ready, you can move on to the next section which is implementing contract interactions.

Init component
==============

In this component, you will handle the smart contract instance creation. It will extract and give the ``verify_key`` as a parameter to the cis2-multi smart contract. In the **components** folder create a file called **Init.tsx** which will invoke the ``init`` method in the contract using the client you implemented in the previous section. It will return a button for creating a new instance, and get inputs from the user including the ``account``, ``schema``, ``moduleRef``, ``contractName``, and the ``verify_key``.

.. code-block:: console

    import { FormEvent, useState } from "react";
    import { WalletApi } from '@concordium/browser-wallet-api-helpers';
    // import { ContractAddress } from "@concordium/common-sdk";

    import { Cis2ContractInfo } from "../models/CIS2ContractClient";
    import { ContractAddress, serializeInitContractParameters } from '@concordium/web-sdk';
    import * as connClient from '../models/CIS2ContractClient';

    import { Typography, Button, Stack, Container } from '@mui/material';

    export default function Cis2Init(props: {
        provider: WalletApi;
        account: string;
        contractInfo: Cis2ContractInfo;
        verifyKey: string;
        onDone: (address: ContractAddress, contractInfo: Cis2ContractInfo) => void;
    }) {
        const [state, setState] = useState({
            error: '',
            processing: false,
        });

        function submit(event: FormEvent<HTMLFormElement>) {
            event.preventDefault();
            const initParams = {
                verify_key: props.verifyKey
            };
            const serializedParams = serializeInitContractParameters(props.contractInfo.contractName, initParams, props.contractInfo.schemaBuffer);
            setState({ ...state, processing: true });
            connClient
                .initContract(props.provider, props.contractInfo, props.account, initParams, serializedParams)
                .then((address) => {
                    setState({ ...state, processing: false });
                    props.onDone(address, props.contractInfo);
                })
                .catch((err: Error) => {
                    setState({ ...state, processing: false, error: err.message });
                });
        }

        return (
            <Container sx={{ maxWidth: 'xl', pt: '10px' }}>
                <Stack component={'form'} spacing={2} onSubmit={submit}>
                    {state.error && (
                        <Typography component="div" color="error" variant="body1">
                            {state.error}
                        </Typography>
                    )}
                    {state.processing && (
                        <Typography component="div" variant="body1">
                            Deploying..
                        </Typography>
                    )}
                    <Button variant="contained" disabled={state.processing} type="submit">
                        Deploy New
                    </Button>
                </Stack>
            </Container>
        );
    }

Getting the Signature
=====================

In the next section you will mint the token, but in order to do that you will need a signature because this solution depends on it. By looking at the signature, the contract will understand that the user are verified and older than 18. So you need to communicate with the verifier. Meaning, you will complete all the steps that are required, such as asking for the ``statement`` and ``challenge`` from the verifier. When you have these from the server (remember you are going to send HTTP/2 GET requests to the endpoints), you will use the provider again (**WalletApi**) to request proof from the user for a given ``statement`` using the specific ``challenge``. Then you will POST the proof in order to verify it and receive the signature.

Divide the logic into two parts. First, implement a client that handles all the API requests. Create a file in the **modules** folder for your **VerifierBackendClient.ts**. You will need the ``IdStatement`` and ``IdProofOutput`` from the web-SDK, and add the following, including ``getChallenge()``, ``getStatement()``, and ``getSignature()``.

.. code-block:: console

    import { IdStatement, IdProofOutput } from '@concordium/web-sdk';

    /**
    * Fetch a challenge from the backend
    */
    export async function getChallenge(verifier: string, accountAddress: string) {
        const response = await fetch(`${verifier}/challenge?address=` + accountAddress, { method: 'get' });
        const body = await response.json();
        return body.challenge;
    }

    /**
    * Fetch the statement to prove from the backend
    */
    export async function getStatement(verifier: string): Promise<IdStatement> {
        const response = await fetch(`${verifier}/statement`, { method: 'get' });
        const body = await response.json();
        return JSON.parse(body);
    }

    /**
    *  Authorize with the backend, and get a auth token.
    */
    export async function getSignature(verifier: string, challenge: string, proof: IdProofOutput) {
        const response = await fetch(`${verifier}/prove`, {
            method: 'post',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify({ challenge, proof }),
        });
        if (!response.ok) {
            throw new Error('Unable to authorize');
        }
        const body = await response.text();
        if (body) {
            return body;
        }
        throw new Error('Unable to authorize');
    }

Nice, now you can invoke the verifier using these endpoints. Create a button that calls those endpoints to get the ``statement``, ``challenge``, and return the proof. Create another component for the **Get Signature** button and add the code below.

.. code-block:: console

    import { WalletApi } from '@concordium/browser-wallet-api-helpers';
    import { Button } from '@mui/material';
    import { getChallenge, getSignature, getStatement } from '../models/VerifierBackendClient';

    export default function VerifierGetSignature(props: {
        provider: WalletApi;
        account: string;
        verifierUrl: string;
        disabled: boolean;
        onSign: (signature: string) => void;
    }) {
        async function sign(e: React.MouseEvent) {
            e.preventDefault();
            var challenge = await getChallenge(props.verifierUrl, props.account);
            const statement = await getStatement(props.verifierUrl);
            const proof = await props.provider.requestIdProof(props.account, statement, challenge);
            const signature = await getSignature(props.verifierUrl, challenge, proof);
            props.onSign(signature.replaceAll('"', ''));
        }

        return (
            <Button type="button" variant="contained" disabled={props.disabled} fullWidth size="large" onClick={sign}>
                Get Signature
            </Button>
        );
    }

Mint component
==============

Create a file for the **Mint.tsx** component. You will use this to invoke your ``mint()`` function implemented in the smart contract. In order to do that, you will need to use the client you implemented in the previous section that calls ``Update`` type. Look at the ``MintParams`` struct in the contract. It expects an address, an object/map that holds the tokens in a form of [``tokenId`` as a key, and <``TokenMetadata`` (which is URL & hash), ``Amount``>] as the value. So you have to create this object and send it as a parameter. Then you will just call the client with the ``provider(Wallet)``, ``account``, ``parameters``, ``contractInfo`` (including ``schema``, ``moduleRef``, ``contractName``), NFT contract’s ``index``, method name (``mint``), and ``maxEnergy``.

.. code-block:: console

    import { Buffer } from 'buffer/';
    import { FormEvent, useState } from 'react';
    import { WalletApi } from '@concordium/browser-wallet-api-helpers';
    import { Typography, Button, Stack, TextField } from '@mui/material';
    import { Container } from '@mui/system';
    import { TransactionSummary, ContractAddress } from '@concordium/web-sdk';

    import * as connClient from '../models/CIS2ContractClient';
    import { Cis2ContractInfo } from '../models/CIS2ContractClient';

    async function mint(
        provider: WalletApi,
        account: string,
        tokens: { [tokenId: string]: [{ url: string; hash: string }, string] },
        signature: string,
        nftContractAddress: { index: number; subindex: number },
        contractInfo: Cis2ContractInfo,
        maxContractExecutionEnergy = BigInt(9999)
    ): Promise<Record<string, TransactionSummary>> {
        const paramJson = {
            owner: {
                Account: [account],
            },
            tokens: Object.keys(tokens).map((tokenId) => [tokenId, tokens[tokenId]]),
            signature,
        };

        return connClient.updateContract(
            provider,
            contractInfo,
            paramJson,
            account,
            nftContractAddress,
            'mint',
            maxContractExecutionEnergy,
            BigInt(0)
        );
    }

Create a form to collect required information for minting a token. What do you need? A metadata URL, amount of tokens, a signature that verifies the minter is older than 18, and the contract index, right? Add the following to the **Mint.tsx** file. It is a bit long but the form takes all required values from the user and checks whether are they valid or not. If they are, it calls the ``mint()`` function with the proper parameters.

.. code-block:: console

    function MintPage(props: {
        verifierUrl: string;
        provider: WalletApi;
        account: string;
        contractInfo: Cis2ContractInfo;
        contract?: ContractAddress;
    }) {
        let [state, setState] = useState({
            checking: false,
            error: '',
        });
        const [signature, setSignature] = useState('');

        function submit(event: FormEvent<HTMLFormElement>) {
            event.preventDefault();
            setState({ ...state, error: '', checking: true });
            const formData = new FormData(event.currentTarget);

            var formValues = {
                index: parseInt(formData.get('contractIndex')?.toString() || '-1'),
                subindex: parseInt(formData.get('contractSubindex')?.toString() || '-1'),
                metadataUrl: formData.get('metadataUrl')?.toString() || '',
                tokenId: formData.get('tokenId')?.toString() || '',
                quantity: parseInt(formData.get('quantity')?.toString() || '-1'),
            };

            if (!(formValues.index >= 0)) {
                setState({ ...state, error: 'Invalid Contract Index' });
                return;
            }

            if (!(formValues.subindex >= 0)) {
                setState({ ...state, error: 'Invalid Contract Subindex' });
                return;
            }

            if (!(formValues.quantity >= 0)) {
                setState({ ...state, error: 'Invalid Quantity' });
                return;
            }

            if (!formValues.metadataUrl) {
                setState({ ...state, error: 'Invalid Metadata Url' });
                return;
            }

            if (!isValidTokenId(formValues.tokenId, props.contractInfo)) {
                setState({ ...state, error: 'Invalid Token Id' });
                return;
            }

            if (!signature) {
                setState({ ...state, error: 'Invalid Signature' });
                return;
            }

            const address = { index: formValues.index, subindex: formValues.subindex };
            mint(
                props.provider,
                props.account,
                {
                    [formValues.tokenId]: [{ url: formValues.metadataUrl, hash: '' }, formValues.quantity.toString()],
                },
                signature,
                address,
                props.contractInfo
            )
                .then((_) => {
                    setState({ ...state, error: '', checking: false });
                    alert('Minted');
                })
                .catch((err: Error) => setState({ ...state, error: err.message, checking: false }));
        }

        return (
            <Container sx={{ maxWidth: 'xl', pt: '10px' }}>
                <Stack component={'form'} spacing={2} onSubmit={submit} autoComplete={'true'}>
                    <TextField
                        id="contract-index"
                        name="contractIndex"
                        label="Contract Index"
                        variant="standard"
                        type={'number'}
                        disabled={state.checking}
                    />
                    <TextField
                        id="contract-subindex"
                        name="contractSubindex"
                        label="Contract Sub Index"
                        variant="standard"
                        type={'number'}
                        disabled={state.checking}
                        value={0}
                    />
                    <TextField
                        id="metadata-url"
                        name="metadataUrl"
                        label="Metadata Url"
                        variant="standard"
                        disabled={state.checking}
                    />
                    <TextField
                        id="token-id"
                        name="tokenId"
                        label="Token Id"
                        variant="standard"
                        disabled={state.checking}
                        defaultValue="01"
                    />
                    <TextField
                        id="quantity"
                        name="quantity"
                        label="Token Quantity"
                        variant="standard"
                        type="number"
                        disabled={state.checking}
                        defaultValue="1"
                    />
                    <TextField
                        id="signature"
                        name="signature"
                        label="Signature"
                        variant="standard"
                        disabled
                        defaultValue=""
                        value={signature}
                    />
                    <VerifierGetSignature
                        provider={props.provider}
                        account={props.account}
                        verifierUrl={props.verifierUrl}
                        disabled={state.checking}
                        onSign={setSignature}
                    />
                    {state.error && (
                        <Typography component="div" color="error">
                            {state.error}
                        </Typography>
                    )}
                    {state.checking && <Typography component="div">Checking..</Typography>}
                    <Button type="submit" variant="contained" disabled={state.checking} fullWidth size="large">
                        Mint
                    </Button>
                </Stack>
            </Container>
        );
    }

    export default MintPage;

    function isValidTokenId(tokenIdHex: string, contractInfo: Cis2ContractInfo): boolean {
        try {
            let buff = Buffer.from(tokenIdHex, 'hex');
            let parsedTokenIdHex = Buffer.from(buff.subarray(0, contractInfo.tokenIdByteSize)).toString('hex');
            console.log(tokenIdHex, parsedTokenIdHex);
            return parsedTokenIdHex === tokenIdHex;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

Constants.ts
------------

You need a **constants** file to store the ``schema``, ``moduleRef``, ``contractInfo``, and the ``verify_key`` and the ``verifier_url``. Create a file to keep these.

.. code-block:: console

    import { Buffer } from "buffer/";
    import { ModuleReference } from "@concordium/web-sdk";
    import {
        Cis2ContractInfo,
    } from "./models/CIS2ContractClient";

    const MULTI_CONTRACT_MODULE_REF =
        "27b813fa34babde7a7e337f05a9cc031f81db60f8b88b0200c234e8b48cb7fa3";
    const MULTI_CONTRACT_SCHEMA =
        "FFFF02010000000A000000434953322D4D756C746901001400010000000A0000007665726966795F6B65791E200000000A0000000900000062616C616E63654F6606100114000200000008000000746F6B656E5F69641D0007000000616464726573731502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C10011B2500000015040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015080000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C79020B0000004163636F756E744F6E6C790213000000496E766F6B65436F6E74726163744572726F720212000000546F6B656E416C72656164794D696E74656402040000006D696E7404140003000000050000006F776E65721502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C06000000746F6B656E7312021D000F1400020000000300000075726C1601040000006861736816011B25000000090000007369676E61747572651E4000000015040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015080000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C79020B0000004163636F756E744F6E6C790213000000496E766F6B65436F6E74726163744572726F720212000000546F6B656E416C72656164794D696E746564020F0000006F6E526563656976696E67434953320315040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015080000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C79020B0000004163636F756E744F6E6C790213000000496E766F6B65436F6E74726163744572726F720212000000546F6B656E416C72656164794D696E746564020A0000006F70657261746F724F66061001140002000000050000006F776E65721502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C07000000616464726573731502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C10010115040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015080000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C79020B0000004163636F756E744F6E6C790213000000496E766F6B65436F6E74726163744572726F720212000000546F6B656E416C72656164794D696E746564020F000000736574496D706C656D656E746F72730414000200000002000000696416000C000000696D706C656D656E746F727310020C15040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015080000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C79020B0000004163636F756E744F6E6C790213000000496E766F6B65436F6E74726163744572726F720212000000546F6B656E416C72656164794D696E7465640208000000737570706F727473061001160010011503000000090000004E6F537570706F72740207000000537570706F72740209000000537570706F72744279010100000010000C15040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015080000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C79020B0000004163636F756E744F6E6C790213000000496E766F6B65436F6E74726163744572726F720212000000546F6B656E416C72656164794D696E746564020D000000746F6B656E4D657461646174610610011D0010011400020000000300000075726C160104000000686173681502000000040000004E6F6E650204000000536F6D65010100000013200000000215040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015080000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C79020B0000004163636F756E744F6E6C790213000000496E766F6B65436F6E74726163744572726F720212000000546F6B656E416C72656164794D696E74656402080000007472616E7366657204100114000500000008000000746F6B656E5F69641D0006000000616D6F756E741B250000000400000066726F6D1502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C02000000746F1502000000070000004163636F756E7401010000000B08000000436F6E747261637401020000000C160104000000646174611D0115040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015080000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C79020B0000004163636F756E744F6E6C790213000000496E766F6B65436F6E74726163744572726F720212000000546F6B656E416C72656164794D696E746564020E0000007570646174654F70657261746F720410011400020000000600000075706461746515020000000600000052656D6F7665020300000041646402080000006F70657261746F721502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C15040000000E000000496E76616C6964546F6B656E49640211000000496E73756666696369656E7446756E6473020C000000556E617574686F72697A65640206000000437573746F6D010100000015080000000B0000005061727365506172616D7302070000004C6F6746756C6C020C0000004C6F674D616C666F726D65640213000000496E76616C6964436F6E74726163744E616D65020C000000436F6E74726163744F6E6C79020B0000004163636F756E744F6E6C790213000000496E766F6B65436F6E74726163744572726F720212000000546F6B656E416C72656164794D696E7465640204000000766965770114000200000005000000737461746510020F1502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C1400020000000800000062616C616E63657310020F1D001B25000000090000006F70657261746F727310021502000000070000004163636F756E7401010000000B08000000436F6E747261637401010000000C06000000746F6B656E7310021D00";
    export const CIS2_MULTI_CONTRACT_INFO: Cis2ContractInfo = {
        contractName: "CIS2-Multi",
        moduleRef: new ModuleReference(MULTI_CONTRACT_MODULE_REF),
        schemaBuffer: Buffer.from(MULTI_CONTRACT_SCHEMA, "hex"),
        tokenIdByteSize: 1,
    };
    export const VERIFY_KEY = "ccc7b73e381125ccc7dbd82f2ccef80c2877ae2eacbd57c536a67a767e94395c"
    export const VERIFIER_URL = 'http://localhost:8100/api';

App.tsx
-------

Finally, call these from the **App.tsx** file. Change it with the following:

.. code-block:: console

    import React from 'react';
    import logo from './logo.svg';
    import './App.css';
    import { useEffect, useState } from "react";
    import {
    detectConcordiumProvider,
    WalletApi,
    } from "@concordium/browser-wallet-api-helpers";

    import {
    AppBar,
    Box,
    Container,
    Link,
    Paper,
    Toolbar,
    Typography,
    } from "@mui/material";

    import MintPage from "./components/Mint";
    import { CIS2_MULTI_CONTRACT_INFO, VERIFIER_URL, VERIFY_KEY } from "./Constants";
    import HeaderButton from "./components/Header";
    import Cis2Init from "./components/Init";

    function App() {
    const [state, setState] = useState<{
    provider?: WalletApi;
    account?: string;
    }>({});

    function connect() {
    detectConcordiumProvider()
    .then((provider) => {
        provider
        .getMostRecentlySelectedAccount()
        .then((account) =>
        !!account ? Promise.resolve(account) : provider.connect()
        )
        .then((account) => {
        setState({ ...state, provider, account });
        })
        .catch((_) => {
        alert("Please allow wallet connection");
        });
        provider.on("accountDisconnected", () => {
        setState({ ...state, account: undefined });
        });
        provider.on("accountChanged", (account) => {
        setState({ ...state, account });
        });
        provider.on("chainChanged", () => {
        setState({ ...state, account: undefined, provider: undefined });
        });
    })
    .catch((_) => {
        console.error(`could not find provider`);
        alert("Please download Concordium Wallet");
    });
    }

    useEffect(() => {
    if (!state.provider || !state.account) {
    connect();
    }

    return () => {
    state.provider?.removeAllListeners();
    };
    }, [state.account]);

    function isConnected() {
    return !!state.provider && !!state.account;
    }

    const isConnectedVar = isConnected();

    return (
    <>
    <AppBar position="static">
        <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Toolbar disableGutters>
        <Typography
        variant="h6"
        noWrap
        component="a"
        sx={{
            mr: 2,
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
        }}
        >
        Concordium
        </Typography>
        <Box
        sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row-reverse",
        }}
        >
        <HeaderButton
            name={isConnectedVar ? "Connected" : "Connect"}
            isSelected={isConnectedVar}
            onClick={connect}
        />
        </Box>
        </Toolbar>
        </Container>
    </AppBar>
    <Box className="App">
        <Paper>
        <MintPage
        key={CIS2_MULTI_CONTRACT_INFO.contractName}
        contractInfo={CIS2_MULTI_CONTRACT_INFO}
        provider={state.provider!}
        account={state.account!}
        verifierUrl={VERIFIER_URL}
        />
        </Paper>
        <Paper>
        <Cis2Init
        account={state.account!}
        provider={state.provider!}
        contractInfo={CIS2_MULTI_CONTRACT_INFO}
        verifyKey={VERIFY_KEY}
        onDone={(contract) =>
        alert(
            `Contract Initialized index: ${contract.index}, subindex: ${contract.subindex}`
        )
        }
        />
        </Paper>
    </Box>
    <footer className="footer">
        <Typography textAlign={"center"} sx={{ color: "white" }}>
        <Link
        sx={{ color: "white" }}
        href="https://developer.concordium.software/en/mainnet/index.html"
        target={"_blank"}
        >
        Concordium Developer Documentation
        </Link>
        </Typography>
    </footer>
    </>
    );
    }

    export default App;

And now try it in :ref:`the next part<nft-w-id-demo>`.
