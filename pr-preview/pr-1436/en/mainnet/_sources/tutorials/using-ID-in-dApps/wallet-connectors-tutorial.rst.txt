.. _wallet-connectors-tutorial:
.. include:: ../../variables.rst

==============================
Implementing Wallet Connectors
==============================

For this tutorial, we'll be focusing on two key Concordium features:

#. Wallet connection (Browser and Mobile)
#. Zero-knowledge proof generation

Connecting to wallets allows users to interact with your dApp using their Concordium accounts, while zero-knowledge proofs enable privacy-preserving identity verification - a fundamental feature of compliance-focused applications on Concordium.

.. Attention::

  This tutorial presents selected code snippets to help you understand the key concepts and implementation patterns of a dApp on Concordium.
  The snippets are intentionally simplified and focus on illustrating specific concepts rather than providing complete implementations.
  Explanatory comments have been added to the code snippets to highlight important concepts and implementation details.
  For the full working code and context, please refer to the `GitHub repository <https://github.com/DOBEN/ZK_Proof_Demo>`_.
  Exploring the complete codebase alongside this tutorial is recommended for a comprehensive understanding.

Setting up the project
----------------------

Before diving into the code details, you are encouraged to clone the project repository and explore it firsthand:

.. code-block:: console

  $ git clone https://github.com/DOBEN/ZK_Proof_Demo
  $ cd zk-proof-demo

At this point, open your preferred code editor in the zk-proof-demo directory to explore the full codebase.

.. code-block:: console

  $ cd frontend
  $ yarn install
  $ yarn dev

Running the application and interacting with it will give you a better understanding of the concepts we'll be discussing.
Feel free to explore the codebase, particularly focusing on the wallet connection components and ZK proof implementation.

Before running the application, ensure you have:

* A :ref:`Concordium wallet <setup-wallets-lp>` (either the |bw| extension or |cryptox|)
* At least one :ref:`identity <reference-identity>` and :ref:`account <managing_accounts>` created in your wallet

If you'd like to build this project from scratch or follow along step-by-step, you'll need to set up your development environment:

1. Install NodeJS and yarn (or npm)
2. Set up your frontend directories
3. Add core dependencies:

.. code-block:: console

  $ yarn add @concordium/web-sdk @concordium/browser-wallet-api-helpers @walletconnect/sign-client @walletconnect/qrcode-modal
  $ yarn add buffer json-bigint sha256 qrcode lucide-react

Creating wallet provider abstraction
------------------------------------

First, let's create an abstract class that serves as the foundation for different wallet providers. We'll start by defining the basic structure and extending the ``EventEmitter`` class:

.. code-block:: javascript

  // wallet-connection.tsx, other imports ommited for brevity
  import EventEmitter from "events";

  export abstract class WalletProvider extends EventEmitter {
    connectedAccount: string | undefined;

    // Abstract methods will be defined below
  }

The ``EventEmitter`` extension enables our class to use a **publish-subscribe pattern** for wallet events.
This allows React components to listen for account changes without tight coupling. We also define a ``connectedAccount`` property to track the currently connected account address.

Next, let's add the connection-related methods:

.. code-block:: javascript

  export abstract class WalletProvider extends EventEmitter {
    connectedAccount: string | undefined;

    // Connect to the wallet and return the selected account
    abstract connect(): Promise<string | undefined>;

    // Optional method to disconnect from the wallet
    disconnect?(): Promise<void>;

    // Update state and emit event when account changes
    protected onAccountChanged(new_account: string | undefined) {
      this.connectedAccount = new_account;
      this.emit("accountChanged", new_account);
    }
  }

These methods handle the connection lifecycle:

* ``connect()``: An abstract method that concrete implementations must provide. It establishes a connection with the wallet and prompts the user to select an account.
* ``disconnect()``: An optional method (note the ``?``) that concrete implementations can provide to properly end the wallet connection.
* ``onAccountChanged()``: A helper method that updates the internal state and emits an event when the account changes, allowing UI components to react.

Now, let's add the zero-knowledge proof related method:

.. code-block:: javascript

   // Request a ZK proof from the wallet
   abstract requestVerifiablePresentation(
     challenge: HexString,
     statement: CredentialStatements,
   ): Promise<VerifiablePresentation>;

This method is the core of our ZK functionality:

* It accepts a :term:`Challenge` (a hex-encoded string) that ensures the proof is generated for this specific request
* It takes :term:`Statement` parameters that define what should be proved about the user's identity
* It returns a `VerifiablePresentation <https://docs.concordium.com/concordium-node-sdk-js/classes/types.VerifiablePresentation.html>`_ containing the generated proof

By using this abstract class as a foundation, we can implement concrete wallet providers for different environments (browser extension, mobile app)
while maintaining a consistent interface throughout our application. This approach makes it easy to add support for new wallet types in the future without changing the rest of the codebase.

The next sections will show how to implement concrete providers for both browser and mobile wallets.

Browser wallet implementation
-----------------------------

Now let's implement the Browser Wallet provider by extending our abstract class. Let's start with the constructor and event management:

.. code-block:: javascript

  // From wallet-connection.tsx
  import { detectConcordiumProvider, WalletApi } from "@concordium/browser-wallet-api-helpers";
  import { serializeTypeValue, toBuffer } from "@concordium/web-sdk";

  let browserWalletInstance: BrowserWalletProvider | undefined;

  export class BrowserWalletProvider extends WalletProvider {
    // Private reference to the wallet API
    constructor(private provider: WalletApi) {
      super();
      // Set up event listeners for account changes
      provider.on("accountChanged", (account) => super.onAccountChanged(account));
      provider.on("accountDisconnected", async () => {
        // When disconnected, check if there's another selected account
        super.onAccountChanged(
          (await provider.getMostRecentlySelectedAccount()) ?? undefined
        );
      });
    }
  }

The constructor takes a ``WalletApi`` instance from the browser wallet extension. We set up event listeners to forward wallet events to our abstract class's event system:

* When the account changes in the wallet, we call ``onAccountChanged`` to update our state and emit an event
* When the wallet is disconnected, we check if there's another selected account before clearing our state

Next, let's implement the singleton pattern to ensure only one provider instance exists:

.. code-block:: javascript

  // Singleton pattern - ensure only one instance exists, allowing existing session to be restored
  static async getInstance() {
    if (browserWalletInstance === undefined) {
      const provider = await detectConcordiumProvider();
      browserWalletInstance = new BrowserWalletProvider(provider);
    }
    return browserWalletInstance;
  }

The ``getInstance()`` static method:

* Checks if we already have a provider instance
* If not, it uses `detectConcordiumProvider() <https://www.npmjs.com/package/@concordium/browser-wallet-api-helpers#using-the-api>`_ to get a reference to the wallet extension
* Creates a new provider instance and caches it
* Returns the instance (either new or existing)

This pattern prevents potential conflicts from multiple simultaneous connections to the wallet extension.

Now let's implement the ``connect`` method to initiate the wallet connection:

.. code-block:: javascript

  // Connect to the browser wallet
  async connect(): Promise<string | undefined> {
    // Request accounts and update state
    const new_connected_account = (await this.provider.requestAccounts())[0];
    super.onAccountChanged(new_connected_account ?? undefined);
    return new_connected_account;
  }

The ``connect()`` method:

* Calls ``requestAccounts()`` on the wallet provider, which prompts the user to select an account
* Takes the first account from the returned array
* Updates our internal state by calling ``onAccountChanged``
* Returns the selected account address

For requesting zero-knowledge proofs, we implement a simple pass-through method:

.. code-block:: javascript

  // Request ZK proof directly from browser wallet
  async requestVerifiablePresentation(
    challenge: HexString,
    statement: CredentialStatements,
  ): Promise<VerifiablePresentation> {
    return this.provider.requestVerifiablePresentation(challenge, statement);
  }

The `requestVerifiablePresentation() <https://www.npmjs.com/package/@concordium/browser-wallet-api-helpers#request-verifiable-presentation-for-web3id-statements>`_ method directly calls the browser wallet's implementation:

* It passes through the challenge and statements without modification
* The wallet extension shows a UI to the user for approving the ZK proof generation
* The wallet handles all the complex cryptography required
* The method returns the verifiable presentation containing the proof

This implementation demonstrates how the Concordium Browser Wallet extension simplifies dApp development by handling the complex cryptographic operations
while exposing a straightforward API for wallet interactions, account management, and ZK proof generation.

Mobile wallet implementation
----------------------------

For mobile wallets, we implement the connection using `WalletConnect <https://specs.walletconnect.com/2.0/>`_. Let's start with the basic class structure and constructor:

.. code-block:: javascript

  // From wallet-connection.tsx

  let walletConnectInstance: WalletConnectProvider | undefined;

  export class WalletConnectProvider extends WalletProvider {
    // Track the WalletConnect session topic
    private topic: string | undefined;

    constructor(private client: SignClient) {
      super();
      // Set up event handlers for session changes
      this.client.on("session_update", ({ params }) => {
        // Update connected account when session changes
        this.connectedAccount = this.getAccount(params.namespaces);
        super.onAccountChanged(this.connectedAccount);
      });

      this.client.on("session_delete", () => {
        // Clear state when session is deleted
        this.connectedAccount = undefined;
        this.topic = undefined;
        super.onAccountChanged(this.connectedAccount);
      });
    }
  }

The constructor takes a ``SignClient`` instance from WalletConnect and sets up event listeners:

* ``session_update``: Called when the session information changes, allowing us to update the connected account
* ``session_delete``: Called when the session is deleted by the wallet, allowing us to clear our state

We also define a private ``topic`` property to track the active WalletConnect session ID.

Next, let's implement the singleton pattern:

.. code-block:: javascript

  // Singleton pattern - ensure only one instance exists, allowing existing session to be restored
  static async getInstance() {
    if (walletConnectInstance === undefined) {
      const client = await SignClient.init(walletConnectOpts);
      walletConnectInstance = new WalletConnectProvider(client);
    }
    return walletConnectInstance;
  }

The ``getInstance()`` method ensures that only one WalletConnect provider exists throughout the application:

* It initializes a new WalletConnect client with our configuration options if one doesn't exist
* It caches the provider instance for future use
* This prevents potential issues with multiple concurrent connections

Now let's implement the connection method:

.. code-block:: javascript

  // from wallet-connection.tsx, connect to a mobile wallet via WalletConnect
  async connect(): Promise<string | undefined> {
    // Request connection with required methods and chains
    const { uri, approval } = await this.client.connect({
      requiredNamespaces: {
        ["ccd"]: { // Concordium's identifier in WalletConnect
          methods: ["request_verifiable_presentation"], // Methods supported by Concordium wallets
          chains: ["ccd:testnet"], // For testnet use "ccd:testnet", for mainnet use "ccd:mainnet"
          events: ["accounts_changed"],
        },
      },
    });

    // Connecting to an existing pairing; it can be assumed that the account is already available.
    if (!uri) {
      return this.connectedAccount;
    }

    // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
    QRCodeModal.open(uri, undefined);

    // Await session approval from the wallet and store session information
    const session = await approval();
    this.connectedAccount = this.getAccount(session.namespaces);
    this.topic = session.topic;
    QRCodeModal.close();

    return this.connectedAccount;
  }

The ``connect()`` method establishes a connection with a mobile wallet:

1. It initiates a connection request with specific Concordium requirements:

   * Namespace: ``ccd`` (Concordium's identifier in WalletConnect)
   * Methods: Includes ``request_verifiable_presentation`` for requesting ZK proofs
   * Chains: The appropriate Concordium network (`"ccd:testnet"` for **testnet** or `"ccd:mainnet"` for **mainnet**)
   * Events: To listen for account changes

2. For new connections, it:

   * Displays a QR code for the user to scan with their mobile wallet
   * Waits asynchronously for the user to approve the connection
   * Extracts the connected account and stores the session information
   * Closes the QR code modal once connected

3. For existing connections, it simply returns the current account

Now let's implement the ZK proof request method:

.. code-block:: javascript

  // Request ZK proof via WalletConnect
  async requestVerifiablePresentation(
    challenge: HexString,
    statement: CredentialStatements,
  ): Promise<VerifiablePresentation> {
    if (!this.topic) {
      throw new Error("No connection");
    }
    // Prepare parameters for the request
    const params = {
      challenge,
      credentialStatements: statement,
    };
    // Use JSONBigInt for proper handling of large numbers
    const serializedParams = JSONBigInt.stringify(params);

  // will continue in next code block

  }

First, we check if we have an active connection by verifying the existence of a session topic. If no connection exists, we throw an error to prevent attempting to request a proof without a connected wallet.

The parameters for the ZK proof request include:

* ``challenge``: A unique challenge string to prevent `replay attacks <https://csrc.nist.gov/glossary/term/replay_attack>`_
* `CredentialStatements <https://docs.concordium.com/concordium-node-sdk-js/types/web3_id.CredentialStatement.html>`_: The statements defining what should be proven

The ZK proof verification process involves two parties:

* **Prover**: The wallet user who wants to prove something about their identity (in our case, the user with the Concordium account)
* **Verifier**: The application or service that needs to validate the proof (our dApp or its backend)

It's important to understand that the **challenge** must be generated by the **verifier** (not the prover) to prevent replay attacks.
Here's how the process works:

1. The **verifier** generates a unique challenge (in our implementation, we use a recent block hash combined with a context string)
2. The **prover** (wallet) creates a proof using this challenge
3. The **verifier** checks that:

  * The proof is cryptographically valid
  * The proof was created using the specific challenge it provided
  * The **challenge** has not been used in a previous proof

Note that protection against replay attacks isn't automatic - the **verifier** must implement proper challenge validation, typically by:

  * Checking that the **challenge** includes a recent block hash (time-limiting the proof)
  * Tracking which **challenges** have been used in a database
  * Rejecting proofs with previously-used challenges

As an example, in the `compliant-reward-distribution dApp <https://github.com/Concordium/concordium-dapp-examples/blob/main/compliant-reward-distribution/indexer-and-server/src/bin/server.rs#L462>`_,
the verifier checks that the proof hasn't expired by verifying that the block height is recent enough, but it doesn't track which challenges have been used before.
For complete security in a production environment, a backend would need to maintain a record of used challenges to fully protect against replay attacks.

We serialize these parameters using ``JSONBigInt`` instead of standard JSON. This is important because ZK proofs often involve large numbers that standard JSON can't handle correctly.

Now, let's implement the actual request to the mobile wallet:

.. code-block:: javascript

  // Request ZK proof via WalletConnect
  async requestVerifiablePresentation(
    challenge: HexString,
    statement: CredentialStatements,
  ): Promise<VerifiablePresentation> {

  // code omitted from previous code block

  try {
    // Send request to the mobile wallet
    const result = await this.client.request<{
      verifiablePresentationJson: string;
    }>({
      topic: this.topic,
      request: {
        method: "request_verifiable_presentation",
        params: { paramsJson: serializedParams },
      },
      chainId: "ccd:testnet", // Use "ccd:testnet" for testnet or "ccd:mainnet" for mainnet
    });
    // Parse the result into a VerifiablePresentation
    return VerifiablePresentation.fromString(
      result.verifiablePresentationJson,
    );
  }

The request is sent to the mobile wallet using the WalletConnect protocol. We specify:

* ``topic``: The current session identifier
* ``method``: The Concordium-specific ``request_verifiable_presentation`` method.
* ``params``: The serialized parameters wrapped in a ``paramsJson`` field
* ``chainId``: The Concordium chain identifier (**testnet** or **mainnet**)

When the wallet responds with the generated proof, we parse the JSON string into a structured ``VerifiablePresentation`` object using the ``fromString`` method provided by `Concordium's SDK <https://docs.concordium.com/concordium-node-sdk-js/index.html>`_.

Finally, let's handle potential errors:

.. code-block:: javascript

  catch (e) {
    if (isWalletConnectError(e)) {
      throw new Error(
        "Generating proof request rejected in wallet: " + JSON.stringify(e),
      );
    }
    throw e;
  }

The error handling section checks for WalletConnect-specific errors using the ``isWalletConnectError`` helper function. This allows us to provide more specific error messages when the proof request is rejected by the wallet.
For example, the user might deny the proof request in their mobile wallet, which would result in a WalletConnect error with a specific error code. We capture this and throw a more descriptive error message to improve the user experience.

Next, let's add helper methods for session management. First, the ``disconnect`` method:

.. code-block:: typescript

  // Disconnect from the wallet
  async disconnect(): Promise<void> {
    if (this.topic === undefined) {
      return;
    }

    await this.client.disconnect({
      topic: this.topic,
      reason: {
        code: 1,
        message: "user disconnecting",
      },
    });
  }

The ``disconnect()`` method properly terminates the WalletConnect session:

* It first checks if there's an active session (topic)
* If no session exists, it returns early without doing anything
* Otherwise, it sends a disconnect request to the wallet using the WalletConnect client
* The request includes the session topic and a reason with a standard error code (1) for user-initiated disconnection

After terminating the session with the wallet, we need to update our local state:

.. code-block:: typescript

  // Continuation of disconnect method
  this.connectedAccount = undefined;
  this.topic = undefined;
  super.onAccountChanged(this.connectedAccount);

Once the wallet session is terminated:

* We clear the ``connectedAccount`` property since no account is connected anymore
* We clear the ``topic`` property since there's no active session
* We call ``onAccountChanged()`` from our parent class to emit an event notifying the application that the account has changed
* This ensures that UI components can update to reflect the disconnected state

Now, let's implement the helper for extracting the account address:

.. code-block:: typescript

  // Helper to extract Concordium account from WalletConnect namespaces
  private getAccount(ns: SessionTypes.Namespaces): string | undefined {
    const [, , account] =
      ns["ccd"].accounts[0].split(":"); // "ccd" is the Concordium namespace in WalletConnect
    return account;
  }

The ``getAccount()`` method handles parsing Concordium account addresses from WalletConnect's namespace format:

* WalletConnect represents accounts in a standardized format: ``namespace:chainId:address``
* For Concordium, this looks like ``ccd:testnet:3XSLuJcXg6xEua6iBPnWacc3iWh93yEDMCqX8FbE3RDSbEnT9P``
* The method splits this string by colons and extracts the third element (the account address)
* It uses array destructuring with empty positions to skip the namespace and chainId elements
* This helper is used when processing session updates and initial connections

This implementation demonstrates the integration of ``WalletConnect``, providing a seamless connection to mobile wallets with support for Concordium's unique zero-knowledge proof capabilities.

Connecting to a wallet in React
-------------------------------

Now let's look at how to use these wallet providers in a React component. Let's start with the basic component structure and hooks:

First, we import the necessary dependencies and set up our component. The key elements here are:

  * ``useWallet`` hook: A custom hook that provides access to our wallet context, containing:
  * ``provider``: The current wallet provider instance
  * ``setProvider``: Function to update the provider
  * ``setConnectedAccount``: Function to update the connected account
  * ``useNavigate``: React Router's hook for programmatic navigation

Next, let's implement the connection function:

.. code-block:: javascript

  // Connect to selected wallet provider
  const connectProvider = async (provider: WalletProvider) => {
    const account = await provider.connect();
    console.log("account", account);
    if (account) {
      setConnectedAccount(account);
    }
    setProvider(provider);
  };

The ``connectProvider`` function handles the wallet connection process:

1. It takes a wallet provider instance (Browser or Mobile)
2. It calls the provider's ``connect()`` method, which prompts the user to select an account
3. If an account is successfully connected, it updates the app's state

Now, let's add cleanup on component unmount:

.. code-block:: javascript

  // Clean up on unmount
  useEffect(() => {
    try {
      if (provider) {
        return () => {
          provider?.disconnect?.().then(() => provider.removeAllListeners());
        };
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [provider]);

This first ``useEffect`` hook:

* Runs when the component mounts or when the provider changes
* Returns a cleanup function that:

  * Disconnects from the wallet
  * Removes all event listeners to prevent memory leaks

* The dependency array ``[provider]`` ensures this effect runs whenever the provider changes

Next, let's look at the second ``useEffect`` that listens for account changes:

.. code-block:: javascript

  // Listen for account changes
  useEffect(() => {
    try {
      const handleAccountChange = (newAccount: any) => {
        setConnectedAccount(newAccount);
      };

      provider?.on("accountChanged", handleAccountChange);

      return () => {
        provider?.off("accountChanged", handleAccountChange);
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }, [provider]);

This second ``useEffect`` hook:

* Sets up an event listener for the provider's ``accountChanged`` event
* When the account changes in the wallet, it updates our app's state
* Also depends on the provider, so it runs whenever the provider changes

Finally, let's render the wallet options:

.. code-block:: jsx

  return (
    <Container className="connect-wallet-container text-center pt-2">
      <h1 className="connect-wallet-title">Connect your wallet</h1>
      {/* Browser Wallet Option */}
      <Container
        onClick={async (e) => {
          connectProvider(await BrowserWalletProvider.getInstance());
        }}
        className="wallet-option p-4 cursor-pointer rounded-lg"
      >
        {/* UI elements for Browser Wallet */}
      </Container>

      {/* Mobile Wallet Option */}
      <Container
        onClick={async () => {
          connectProvider(await WalletConnectProvider.getInstance());
        }}
        className="wallet-option p-4 rounded-lg cursor-pointer mt-2"
      >
        {/* UI elements for Mobile Wallet */}
      </Container>
    </Container>
  );

The render function creates a simple UI with:

* A heading that prompts the user to connect a wallet
* Two clickable containers representing the wallet options:

  * Browser Wallet: Uses ``BrowserWalletProvider.getInstance()`` to get a provider instance
  * Mobile Wallet: Uses ``WalletConnectProvider.getInstance()`` to get a provider instance

* When clicked, each option calls the ``connectProvider`` function with the appropriate provider

This component demonstrates a clean implementation pattern for wallet connections in React:

1. It uses React Context from ``frontend/src/context/WalletContext.tsx`` to manage global wallet state.
2. It properly handles component lifecycle with ``useEffect``.
3. It sets up and cleans up event listeners to prevent memory leaks.
4. It provides a user-friendly interface for selecting a wallet type.
5. It encapsulates all the complexity of wallet connection behind a simple abstraction.

By using this approach, we can maintain a consistent wallet connection experience throughout our application regardless of which wallet provider the user chooses.
