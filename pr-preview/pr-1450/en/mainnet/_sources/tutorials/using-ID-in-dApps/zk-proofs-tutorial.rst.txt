.. _zk-proofs-tutorial:

===================
ZK proof generation
===================

Now we'll explore how to generate zero-knowledge proofs using the ID Layer, focusing on how ZK statements are structured.

Defining ZK statements
----------------------

First, let's look at the ZK statements defined in the ``constants`` file:

.. code-block:: javascript

  // From constants.ts

  import { AtomicStatementV2 } from "@concordium/web-sdk";

  // Context string for and generating ZK proofs
  export const CONTEXT_STRING = "CONCORDIUM_COMPLIANT_REWARD_DISTRIBUTION_DAPP";

  // ZK statements for the verifiable presentation
  export const ZK_STATEMENTS = [
      {
      type: "RevealAttribute",
      attributeTag: "nationalIdNo",
      },
      {
      type: "RevealAttribute",
      attributeTag: "nationality",
      },
      {
      type: "AttributeInRange",
      attributeTag: "dob",
      lower: "18000101",
      upper: "20060802",  // Ensures user is over 18 years old
      },
      {
      type: "AttributeNotInSet",
      attributeTag: "countryOfResidence",
      set: ["US", "KP", "RU"],  // Not from USA, North Korea, or Russia
      },
  ] as AtomicStatementV2[];

  // The number of blocks after the `best block` (top of chain), where the `recent block` is located.
  // The `recent block hash` is included in ZK proofs to ensure they expire.
  // Note: It is the verifier's responsibility to check that this recent block hash
  // was actually used in the proof for the time-limitation to be effective.
  export const RECENT_BLOCK_DURATION = 10n;

The ZK statements use Concordium's `AtomicStatementV2 <https://docs.concordium.com/concordium-node-sdk-js/types/web3_id.AtomicStatementV2.html>`_ type to define:

* **CONTEXT_STRING**: A domain separator that ensures ZK proofs are specific to this application.

* **RECENT_BLOCK_DURATION**: The number of blocks behind the best block to use for challenge generation (10 blocks in this case). This creates time-limited proofs.

* **ZK statements types**:

  1. **RevealAttribute**: The simplest statement type that reveals a specific attribute's value.

  * We request the user's ``nationalIdNo`` and ``nationality`` attributes.
  * These values will be directly visible to the application.

  2. **AttributeInRange**: A statement that proves an attribute falls within a specified range, without revealing the actual value.

  * We verify the ``dob`` (date of birth) falls between Jan 1, 1800, and Aug 2, 2006.
  * This effectively proves the user is over 18 years old on Aug 2, 2024.
  * The actual date of birth remains private.

  3. **AttributeNotInSet**: A statement that proves an attribute is not in a specified set of values.

  * We verify the ``countryOfResidence`` is not in the set ["US", "KP", "RU"].
  * This proves the user is not from the United States, North Korea, or Russia.
  * The actual country of residence remains private.

.. Note::

  Country codes to use for residence and nationality proofs are the `ISO-3166-1 alpha-2 <https://www.iso.org/iso-3166-country-codes.html>`_ codes.

These statements demonstrate Concordium's flexible identity verification system, allowing applications to get exactly the information they need while preserving user privacy.

Getting recent block for challenge
----------------------------------

For security, ZK proofs need to be time-limited. We achieve this by including a recent block hash in the challenge:

.. code-block:: javascript

  // From utils.ts, imports ommited for brevity
  export async function getRecentBlock(
    grpcClient: ConcordiumGRPCClient | undefined,
  ): Promise<RecentBlock> {
    if (!grpcClient) {
      throw Error(`'grpcClient' is undefined`);
    }
    // Get the best block height (top of chain)
    const bestBlockHeight = (await grpcClient.client.getConsensusInfo(""))
      ?.response.bestBlockHeight;

    if (!bestBlockHeight) {
      throw Error(`Couldn't get 'bestBlockHeight' from chain`);
    }
    // Calculate recent block height (e.g., 10 blocks behind)
    const recentBlockHeight = bestBlockHeight.value - RECENT_BLOCK_DURATION;
    // Get the hash of the block at that height
    const recentBlockHash = (
      await grpcClient.getBlocksAtHeight(recentBlockHeight)
    )[0];

    if (!recentBlockHash) {
      throw Error(`Couldn't get 'recentBlockHash' from chain`);
    }

    return { blockHash: recentBlockHash, blockHeight: recentBlockHeight };
  }

This function retrieves a recent block to use in challenge generation:

* **Security purpose**: Including a recent block hash in the challenge creates time-limited ZK proofs. After the chain progresses further, the proofs will no longer be valid, preventing `replay attacks <https://csrc.nist.gov/glossary/term/replay_attack>`_.
* **Important**: It is the verifier's responsibility to validate that the block hash included in the proof is indeed recent. The proofs themselves don't automatically become valid or invalid - they remain cryptographically correct. The verifier must implement proper checks to enforce time limitation and reject proofs that use outdated block hashes.
* **Blockchain interaction**: The function uses `ConcordiumGRPCClient <https://docs.concordium.com/concordium-node-sdk-js/classes/grpc.ConcordiumGRPCClient.html>`_ to communicate with a Concordium node:

  1. First, it retrieves the current best block height using ``getConsensusInfo()``
  2. It calculates a "recent" block by subtracting ``RECENT_BLOCK_DURATION`` (10 blocks)
  3. It fetches the hash of that block using ``getBlocksAtHeight()``

* **Error handling**: The function includes checks to ensure valid data at each step:

  * Verifies the GRPC client is available
  * Checks that the best block height was successfully retrieved
  * Confirms a block hash was found at the calculated height

* **Return value**: The function returns both the block hash and height.

Generating and verifying ZK proofs
----------------------------------

Now let's implement the ZK proof generation and verification. First, we'll set up the component structure and initial state:

.. code-block:: typescript

  // From components/proof/Proof.tsx, imports ommited for brevity

  const Proof = () => {
    // Access wallet state and set up GRPC client
    const { provider, connectedAccount } = useWallet();
    const grpcClient = useRef(
      new ConcordiumGRPCClient(
        new GrpcWebFetchTransport({ baseUrl: CONFIG.node }),
      )
    ).current;

    // State for managing the proof process
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [validZKProof, setValidZKProof] = useState<boolean | undefined>(
      undefined,
    );
    const [IdNumber, setIdNumber] = useState<string | undefined>(undefined);
    const [nationality, setNationality] = useState<string | undefined>(undefined);
    const walletProvider = provider;
    // handleVerify function and render section will follow
  };

The component starts by setting up:

* A connection to the Concordium node using `ConcordiumGRPCClient <https://docs.concordium.com/concordium-node-sdk-js/classes/grpc.ConcordiumGRPCClient.html>`_ with ``GrpcWebFetchTransport``
* State variables to track:

  * ``isLoading``: Whether a proof request is in progress
  * ``error``: Any error that occurs during verification
  * ``validZKProof``: Whether a valid proof has been received
  * ``IdNumber`` and ``nationality``: Revealed attributes from the proof

Next, let's implement the verification function that handles the ZK proof request:

.. code-block:: typescript

  // Handle the verification process
  const handleVerify = async () => {
    setIsLoading(true);
    setError(undefined);
    setValidZKProof(undefined);

    try {
      // Make sure we have a provider and account
      if (!provider || !connectedAccount) {
        throw Error(
          `'provider' or 'prover' are undefined. Connect your wallet. Have an account in your wallet.`,
        );
      }

      // 1. Get recent block for the challenge
      const { blockHash: recentBlockHash, blockHeight: _ } = await getRecentBlock(grpcClient);
      // Further steps will follow
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

The first part of ``handleVerify``:

1. Sets the component to a loading state and clears previous errors/results
2. Checks that we have a connected wallet provider and account
3. Gets a recent block from the blockchain to use in the challenge generation

The recent block is important for security - it ensures the proof will expire after the chain progresses further, preventing `replay attacks <https://csrc.nist.gov/glossary/term/replay_attack>`_.

Now let's continue with challenge generation:

.. code-block:: typescript

  // 2. Create challenge by combining block hash and context string
  const digest = [recentBlockHash.buffer, Buffer.from(CONTEXT_STRING)];
  // The zk proof request here is non-interactive (we don't request the challenge from the backend).
  // Instead the challenge consists of a recent block hash (so that the proof expires)
  // and a context string (to ensure the ZK proof cannot be replayed on different Concordium services).
  const challenge = sha256(digest.flatMap((item) => Array.from(item)));

  // 3. Generate the ZK proof by defining the credential statement with our ZK statements
  const credentialStatement: CredentialStatement = {
    idQualifier: {
      type: "cred",
      // Accept all identity providers (0-7), list is longer than necessary to include all current/future IDPs
      issuers: [0, 1, 2, 3, 4, 5, 6, 7],
    },
    statement: ZK_STATEMENTS,
  };

This section creates a secure challenge for the ZK proof:

1. It combines the recent block hash with a context string (domain separator) into a buffer array
2. It uses SHA-256 to hash this combination, creating a unique, time-limited challenge
3. It defines a credential statement that specifies:

  * The acceptable identity providers (issuers 0-7)
  * The ZK statements defining what should be proved (imported from constants)

The context string ensures that proofs generated for one application cannot be reused in another application, improving security.

Now let's request the ZK proof from the wallet:

.. code-block:: typescript

  // 4. Request ZK proof from the wallet
  const presentation = await provider.requestVerifiablePresentation(
    challenge,
    [credentialStatement],
  );
  setIsLoading(false);
  // 5. Extract revealed attributes from the proof
  setIdNumber(
    presentation.verifiableCredential[0].credentialSubject.proof
      .proofValue[0].attribute,
  );
  setNationality(
    presentation.verifiableCredential[0].credentialSubject.proof
      .proofValue[1].attribute,
  );

  // 6. Mark proof as valid (in production, verify on backend)
  setValidZKProof(true);

.. warning::

  In a production environment, this proof **MUST** be verified on a secure backend!
  This frontend-only implementation is for **demonstration purposes only**.
  Proper implementation would send the presentation to a backend `verifier <https://github.com/Concordium/concordium-web3id/tree/main/services/web3id-verifier>`_.

This section handles the proof request and processing:

1. It calls ``requestVerifiablePresentation()`` on the wallet provider

  * This prompts the wallet to show a UI for the user to approve the proof generation
  * The wallet handles all the complex cryptography to generate the proof

2. Once the proof is returned, it extracts revealed attributes:

  * The ID number from the first proof value
  * The nationality from the second proof value

3. It marks the proof as valid and exits the loading state

In a production environment, you would send the proof to a backend for cryptographic verification. In this demo, we're assuming any returned proof is valid for simplicity.
You can explore this `github repository <https://github.com/Concordium/concordium-web3id/tree/main/services/web3id-verifier>`_ which contains a verifier.

The component's render function handles different UI states (loading, verification success, and error states) and displays the results of the ZK proof to the user.
The complete implementation of this component can be found in the example repository, in ``frontend/src/components/proof/Proof.tsx``

The most powerful aspect of this implementation is that the wallet handles all the complex cryptography. The dApp only needs to:

#. Define what should be proven
#. Generate a challenge
#. Process the returned proof

This makes building privacy-preserving applications on Concordium accessible to developers without requiring deep cryptographic expertise.

In a production environment, you would send the verifiable presentation to a backend service that would cryptographically verify the proof before allowing the user to proceed.
For this demo, we're simplifying by assuming any returned proof is valid.

Conclusion
----------

This tutorial has shown how to build a Concordium dApp that leverages the platform's built-in identity system and zero-knowledge proof capabilities. The key advantages of Concordium's approach are:

1. **Simplified ZK Implementation**: The wallet handles all cryptographic operations
2. **Powerful Identity Verification**: Verify attributes without revealing unnecessary information
3. **Flexible Statement Types**: Support for revealing attributes, range proofs, and set membership proofs
4. **Seamless Wallet Integration**: Works with both browser extension and mobile wallets

By understanding these components, you can build privacy-preserving applications that verify user eligibility while minimizing data exposure - a perfect balance of compliance and privacy.
