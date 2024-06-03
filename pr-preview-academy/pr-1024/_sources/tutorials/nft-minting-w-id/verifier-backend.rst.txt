.. _nft-w-id-backend:
.. include:: ../../../mainnet/variables.rst

=====================
The verifier back end
=====================

In this first part, you will implement a verifier back-end server that signs a claim if it is verified.

Zero-knowledge proofs (ZKP) and ID proofs
=========================================

The |bw| allows dApps or services to request proof that the user meets some requirement, such as proof the user is over a certain age or resides in a specific set of countries or areas. For more information about such proofs, see :ref:`Create proofs<create-proofs>`. But basically, when you have a Concordium account you have an ID object and the identity credential in your wallet. On-chain (in your account) there is a (list of) commitment(s) to your attributes. No one can know who you are other than being able to see your public address. But with zero-knowledge proof (ZK proof) technology (proving a claim without revealing any information but the claim itself), any dApp that wants to make sure that its users meet some criteria can create a query which uses a ZK proof to show correctness. Here these criteria are called **statements**. These statements can be located in the dApp itself or stored in the verifier which is a back-end HTTP server. For this particular tutorial’s scenario, the dApp statement is whether the user is older than 18.

When the dApp wants to prove someone meets the criteria, it first communicates with the verifier. The verifier is one of the key elements of this architecture. The dApp uses the verifier to verify the claims but it has a key function above all else. The verifier makes sure that a ZK proof query can't be reused by someone else, for example, if it's stolen somehow. When the dApp communicates with the verifier, it asks for a **challenge**, a one-time or time-bound random string, that will be used while creating the proofs. The verifier, when doing verification checks whether the proof is created with the particular challenge issued for the query. If the proof is not created with the particular challenge, it will not be verified.

When you have your Concordium account, meaning your ID object is created, there is a set of **attributes** that is inside of your encrypted data structure. A full list of the attributes can be :ref:`found here<create-proofs>`, but some of them are listed below.

* First name, Last name
* Sex
* Date of birth
* Country of nationality
* …

Using the |bw|, your dApp can request proofs for any of these attributes from its users. There is no possible way for us to know anything beyond that the statement doesn't include. When the user agrees to reveal these pieces of information, they will start experiencing true Self-Sovereign Identity.

Minting with ID 2.0
===================

Let’s get started with technical implementations. It’s always good to define the requirements and the steps that will lead you to implement the solution.

* We want to use the existing NFT minting tool React application for the sake of time and implementation.
* We will implement a verifier backend and re-use as much as possible that is shared by the Concordium team.
* Our minting dApp will allow people only older than 18, but we can increase the set of attributes or add new combinations.

Nice, we have a very short requirements list. Now take a look at the flow from the architectural point of view in general.

* When the user wants to mint something, dApp goes to the verifier backend and asks for a challenge alongside the statement(s).
* The dApp sends a request for proof of the given challenge and statement to the wallet.
* The user accepts the requests, wallet sends back the proof.
* The dApp sends it to the verifier, it verifies the proof is correct according to the challenge and statement.
* The dApp uses the private key of the owner, to sign a message.
* The smart contract’s _mint()_ function checks the signature created by the owner and allows for mint.

Verifier back end
=================

Use the back-end code in `Concordium’s dApp examples GitHub repo <https://github.com/Concordium/concordium-dapp-examples/tree/main/gallery/verifier>`_. You will make some modifications based on your needs.

First, create an empty project called **backend** using the command below.

.. code-block:: console

    cargo new backend

.. image:: ../../images/adv-verifier-backend1.png
    :alt: visual studio code window in dark mode with terminal window open showing command above

Concordium Rust-SDK
-------------------

Concordium Rust SDK is published on crates.io so you can add   `concordium-rust-sdk = 1 it` directly to your Cargo.toml file. You don't have to clone and install it.

For the development, serialization, encryption, and running of an HTTP server, you will need some dependencies below in your **cargo.toml** file.

- **tokio**: A runtime for writing reliable, asynchronous, and slim applications with the Rust programming language.

- **warp**: A super-easy, composable web server framework for warp speeds.

- **serde**: A very helpful framework for serializing/deserializing data structures generically.

- **serde_json**: A JSON serialization/deserialization file format.

- **clap**: Command Line Argument Parser for Rust (CLAP)

- **anyhow**: Easy error handling trait.

- **ed25519-dalek:** To produce and consume Ed25519 signatures and for other key operations.

.. code-block:: toml

    [dependencies]
    tokio = { version = "1", features = ["full"] }
    warp = "0.3"
    serde = { version = "1.0", features = ["derive"] }
    serde_json = "1.0"
    log = "0.4.11"
    env_logger = "0.9"
    clap = { version = "4", features = ["derive"] }
    anyhow = "1.0"
    chrono = "0.4.19"
    thiserror = "1"
    rand = "0.8"
    ed25519-dalek = "1.0.1"
    hex = "0.4.3"

    [dependencies.concordium-rust-sdk]
    path = "../deps/concordium-rust-sdk/"

Now you can build it with the ``cargo build`` command in the **concordium-rust-sdk** folder. For Mac users, if you face a protobuf error in this step, you might need to install it manually. Then build it again.

.. code-block:: console

    brew install protobuf

.. image:: ../../images/adv-verifier-backend3.png
    :alt: visual studio code window in dark mode with terminal window open showing error for mac users

Implementation
--------------

Create a **types.rs** file. You will use almost the same code as `in this link <https://github.com/Concordium/concordium-dapp-examples/blob/main/gallery/verifier/src/types.rs>`_. In this file, you will create the data structures and responses, and manipulate error codes.

First, you have the ``Challenge`` struct which is a u8 32 bytes array. This will be re-generated every time a new client connects or the back end gets a request.

``WithAccountAddress`` is used for storing the challenge created for a particular account.

``ChallengeStatus`` is used for storing the issued challenge, to whom it's issued(address), and its creation time on the state.

The ``Server`` is the state. When you run the verifier back end, you will create an empty state with an empty hashmap of challenges.

The ``InjectStatementError`` enum will be used for handling rejections with error codes.

.. code-block:: console

    use concordium_rust_sdk::{
        common::{
            self as crypto_common,
            derive::{SerdeBase16Serialize, Serialize},
            Buffer, Deserial, ParseResult, ReadBytesExt, SerdeDeserialize, SerdeSerialize, Serial,
            Versioned,
        },
        endpoints::{QueryError, RPCError},
        id::{
            constants::{ArCurve, AttributeKind},
            id_proof_types::Proof,
            types::{AccountAddress, GlobalContext},
        },
        types::CredentialRegistrationID,
    };
    use std::{
        collections::HashMap,
        sync::{Arc, Mutex},
        time::SystemTime,
    };

    #[derive(
        Copy, Clone, Eq, PartialEq, Ord, PartialOrd, Hash, Debug, SerdeBase16Serialize, Serialize,
    )]
    pub struct Challenge(pub [u8; 32]);

    #[derive(serde::Deserialize, Debug, Clone)]
    pub struct WithAccountAddress {
        pub address: AccountAddress,
    }

    #[derive(Clone)]
    pub struct ChallengeStatus {
        pub address: AccountAddress,
        pub created_at: SystemTime,
    }

    #[derive(Clone)]
    pub struct Server {
        pub challenges: Arc<Mutex<HashMap<String, ChallengeStatus>>>,
        pub global_context: Arc<GlobalContext<ArCurve>>,
    }

    #[derive(Debug)]
    /// An internal error type used by this server to manage error handling.
    #[derive(thiserror::Error)]
    pub enum InjectStatementError {
        #[error("Not allowed")]
        NotAllowed,
        #[error("Invalid proof")]
        InvalidProofs,
        #[error("Node access error: {0}")]
        NodeAccess(#[from] QueryError),
        #[error("Error acquiring internal lock.")]
        LockingError,
        #[error("Proof provided for an unknown session.")]
        UnknownSession,
        #[error("Issue with credential.")]
        Credential,
    }

    impl warp::reject::Reject for InjectStatementError {}

    #[derive(serde::Serialize)]
    /// Response in case of an error. This is going to be encoded as a JSON body
    /// with fields 'code' and 'message'.
    pub struct ErrorResponse {
        pub code: u16,
        pub message: String,
    }

    #[derive(serde::Deserialize, serde::Serialize, Debug)]
    pub struct ChallengeResponse {
        pub challenge: Challenge,
    }

    #[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
    pub struct ChallengedProof {
        pub challenge: Challenge,
        pub proof: ProofWithContext,
    }

    #[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
    pub struct ProofWithContext {
        pub credential: CredentialRegistrationID,
        pub proof: Versioned<Proof<ArCurve, AttributeKind>>,
    }


Finally, you have the ``ChallengeResponse`` struct which will be used in the API responses, ``ChallengedProof`` and ``ProofWithContext``. When the back end receives the proof, it will use these to validate it using the client object.

Handlers.rs
-----------

Nice! Now create another file called **handlers.rs**. In this module, we will explain all functions one by one and add them to the file.

The ``handle_get_challenge()`` function gets input as the ``state`` and an ``address``. It runs asynchronously when someone asks for a challenge using an endpoint. It invokes the ``get_challenge_worker()`` which generates a random 32 bytes message (a.k.a. ``Challenge``), and adds it to the state’s ``challenges`` after encoding the challenge as a key and the ``address`` + issuing time as value ``ChallengeStatus``. As a result, it returns the challenge as a response to send it back through the endpoint.

.. code-block:: console

    use crate::crypto_common::base16_encode_string;
    use crate::types::*;
    use concordium_rust_sdk::{
        common::{self as crypto_common, types::KeyPair},
        id::{
            constants::{ArCurve, AttributeKind},
            id_proof_types::Statement,
            types::{AccountAddress, AccountCredentialWithoutProofs},
        },
        v2::BlockIdentifier,
    };
    use log::warn;
    use rand::Rng;
    use std::convert::Infallible;
    use std::time::SystemTime;
    use warp::{http::StatusCode, Rejection};

    static CHALLENGE_EXPIRY_SECONDS: u64 = 600;
    static CLEAN_INTERVAL_SECONDS: u64 = 600;

    pub async fn handle_get_challenge(
        state: Server,
        address: AccountAddress,
    ) -> Result<impl warp::Reply, Rejection> {
        let state = state.clone();
        log::debug!("Parsed statement. Generating challenge");
        match get_challenge_worker(state, address).await {
            Ok(r) => Ok(warp::reply::json(&r)),
            Err(e) => {
                warn!("Request is invalid {:#?}.", e);
                Err(warp::reject::custom(e))
            }
        }
    }

    /// A common function that produces a challenge and adds it to the state.
    async fn get_challenge_worker(
        state: Server,
        address: AccountAddress,
    ) -> Result<ChallengeResponse, InjectStatementError> {
        let mut challenge = [0u8; 32];
        rand::thread_rng().fill(&mut challenge[..]);
        let mut sm = state
            .challenges
            .lock()
            .map_err(|_| InjectStatementError::LockingError)?;
        log::debug!("Generated challenge: {:?}", challenge);
        let challenge = Challenge(challenge);

        sm.insert(
            base16_encode_string(&challenge.0),
            ChallengeStatus {
                address,
                created_at: SystemTime::now(),
            },
        );
        Ok(ChallengeResponse { challenge })
    }

The ``handle_provide_proof()`` function gets the ``client``, ``state``, ``statement``, ``request``, and ``key pair`` as input. It serves through an API endpoint and is primarily used for verifying the proof by calling the ``check_proof_worker()`` function.

The ``check_proof_worker()`` function validates the cryptographic proof. First, it locks the ``state`` and gets the ``status`` from the map using the challenge’s base16 encoded key of the map. Since the request is a ``ChallengedProof`` type, you can access the challenge, and more than that, it holds the ``ProofWithContext`` struct meaning both the credential and the proof is available to use in verification. Similarly, the ``status`` is a ``ChallengeStatus``, meaning you know the address issued and the time created. You will need these in the next step. And finally, the ``Statement`` is a struct that holds a list of atomic statements.

When this function is invoked with a POST request, you will have the request object and use it to extract the ``credential_id``. Note that every account has an account registration ID, which is the Credential ID of the first credential added to the account. Create a variable for the ``cred_id`` and get the account information using the Concordium Rust-SDK. The function takes mutable ``client: concordium_rust_sdk::v2::Client`` as a parameter. You will get the account information using that. Use the ``account address`` from the ``status`` as the first parameter of the ``client.get_account_info()`` and the ``BlockIdentifier::LastFinal`` as the second parameter. Basically, this function provides you with the required information for a given account address in the given block. So to give it the ``LastFinal`` block means the last finalized block at the time of the query.

Then find the credential by getting the initial element of the ``account_credentials`` map which is the map of all currently active credentials on the account. This includes public keys that can sign for the given credentials, as well as any revealed attributes. A credential contains commitments to these attributes. The map holds the ``AccountCredentialWithoutProofs`` which has the ``InitialCredentialDeploymentValues`` and ``CredentialDeploymentCommitments``.

.. code-block:: console

    pub async fn handle_provide_proof(
        client: concordium_rust_sdk::v2::Client,
        state: Server,
        statement: Statement<ArCurve, AttributeKind>,
        request: ChallengedProof,
        key_pair: KeyPair,
    ) -> Result<impl warp::Reply, Rejection> {
        let client = client.clone();
        let state = state.clone();
        let statement = statement.clone();
        match check_proof_worker(client, state, request, statement, key_pair).await {
            Ok(r) => Ok(warp::reply::json(&r)),
            Err(e) => {
                warn!("Request is invalid {:#?}.", e);
                Err(warp::reject::custom(e))
            }
        }
    }

    /// A common function that validates the cryptographic proofs in the request.
    async fn check_proof_worker(
        mut client: concordium_rust_sdk::v2::Client,
        state: Server,
        request: ChallengedProof,
        statement: Statement<ArCurve, AttributeKind>,
        key_pair: KeyPair,
    ) -> Result<String, InjectStatementError> {
        let status = {
            let challenges = state
                .challenges
                .lock()
                .map_err(|_| InjectStatementError::LockingError)?;

            challenges
                .get(&base16_encode_string(&request.challenge.0))
                .ok_or(InjectStatementError::UnknownSession)?
                .clone()
        };

        let cred_id = request.proof.credential;
        let acc_info = client
            .get_account_info(&status.address.into(), BlockIdentifier::LastFinal)
            .await?;

        // TODO Check remaining credentials
        let credential = acc_info
            .response
            .account_credentials
            .get(&0.into())
            .ok_or(InjectStatementError::Credential)?;

        if crypto_common::to_bytes(credential.value.cred_id()) != crypto_common::to_bytes(&cred_id) {
            return Err(InjectStatementError::Credential);
        }

        let commitments = match &credential.value {
            AccountCredentialWithoutProofs::Initial { icdv: _, .. } => {
                return Err(InjectStatementError::NotAllowed);
            }
            AccountCredentialWithoutProofs::Normal { commitments, .. } => commitments,
        };

        let mut challenges = state
            .challenges
            .lock()
            .map_err(|_| InjectStatementError::LockingError)?;

        if statement.verify(
            &request.challenge.0,
            &state.global_context,
            cred_id.as_ref(),
            commitments,
            &request.proof.proof.value, // TODO: Check version.
        ) {
            challenges.remove(&base16_encode_string(&request.challenge.0));
            let sig = key_pair.sign(&acc_info.response.account_address.0);
            Ok(hex::encode_upper(sig.sig))
        } else {
            Err(InjectStatementError::InvalidProofs)
        }
    }

The line below from the code snippet makes sure that the credential sent by the user is the same as the one that the account has.

.. code-block:: console

    if crypto_common::to_bytes(credential.value.cred_id()) != crypto_common::to_bytes(&cred_id) {
            return Err(InjectStatementError::Credential);
        }

Then you will get the commitments, which are the protectors of the attribute credentials in a way. They are the attributes that the user doesn't want to reveal on the account. So a user can decide to open certain commitments and reveal the attributes.

There is a great non-cryptographic analogy that explains commitments really well. Assume that you have data that you want to protect: you don't want others to see it and you don't want to change it. You put that in an envelope, seal it, and send it to the public. No one can see it because it's sealed and you can not change it because it's out now.

.. code-block:: console

    let commitments = match &credential.value {
            AccountCredentialWithoutProofs::Initial { icdv: _, .. } => {
                return Err(InjectStatementError::NotAllowed);
            }
            AccountCredentialWithoutProofs::Normal { commitments, .. } => commitments,
        };

And finally, verify the proof with this part and respond back with the result, which is the signature. You need the ``request``, ``global_context``, ``cred_id``, ``commitments``, and the ``proof`` itself to do that. If it's successful, you can remove the challenge from the map since it's a one-time thing and sign the account address (as string) with your private key. You used this approach to create and share the signature but it's also fine to sign any message. In the smart contract, while minting, you would like to verify that the claim is verified and signed with your private key. It may sound a bit complicated but you will understand it better while implementing the dApp.

.. code-block:: console

    if statement.verify(
            &request.challenge.0,
            &state.global_context,
            cred_id.as_ref(),
            commitments,
            &request.proof.proof.value, // TODO: Check version.
        ) {
            challenges.remove(&base16_encode_string(&request.challenge.0));
            let sig = key_pair.sign(&acc_info.response.account_address.0);
            Ok(hex::encode_upper(sig.sig))
        } else {
            Err(InjectStatementError::InvalidProofs)
        }

Main.rs
-------

Now you need to create the main program to run the HTTP server that listens to all endpoints required to create and send a challenge, share the statement, and verify the claim. Create a file called **main.rs**. Use **warp** to run an async HTTP server in a few easy steps as already mentioned. You definitely need the **handlers.rs** and **types.rs** to invoke the helper functions and the data structures.

Create a struct called **IdVerifierConfig** that accepts command line parameters while running the application. First, it should have a node ``endpoint`` to build and configure HTTP/2 channels (which gRPCv2 uses to stream). Second, you need a port for the server to listen and a logger using the **log** crate. Finally, give the ``statement``, ``verify_key``, and ``sign_key`` (the keys you get from the exported wallet file) as parameters in string form. Note that for all parameters you specified some default values with the ``clap``.

.. code-block:: console

    mod handlers;
    mod types;
    use crate::handlers::*;
    use crate::types::*;

    use clap::Parser;
    use concordium_rust_sdk::common::types::KeyPair;
    use concordium_rust_sdk::{
        common::{self as crypto_common},
        id::{
            constants::{ArCurve, AttributeKind},
            id_proof_types::Statement,
        },
        v2::BlockIdentifier,
    };
    use log::info;
    use std::{
        collections::HashMap,
        sync::{Arc, Mutex},
    };
    use warp::Filter;

    /// Structure used to receive the correct command line arguments.
    #[derive(clap::Parser, Debug)]
    #[clap(arg_required_else_help(true))]
    #[clap(version, author)]
    struct IdVerifierConfig {
        #[clap(
            long = "node",
            help = "GRPC V2 interface of the node.",
            default_value = "http://localhost:20000"
        )]
        endpoint: concordium_rust_sdk::v2::Endpoint,
        #[clap(
            long = "port",
            default_value = "8100",
            help = "Port on which the server will listen on."
        )]
        port: u16,
        #[structopt(
            long = "log-level",
            default_value = "debug",
            help = "Maximum log level."
        )]
        log_level: log::LevelFilter,
        #[clap(
            long = "statement",
            help = "The statement that the server accepts proofs for."
        )]
        statement: String,
        #[structopt(
            long = "sign-key",
            help = "Sign key of the first credential of the signer"
        )]
        sign_key: String,
        #[structopt(
            long = "verify-key",
            help = "Verify key of the first credential of the signer"
        )]
        verify_key: String,
    }

As the final step, add the ``main()`` function. Add the ``#\[tokio::main]`` macro just before main. It transforms the async ``main()`` function into a synchronous ``main()`` function that initializes a runtime instance and executes the async ``main()`` function.

First, parse the parameters given as input while running the executable. After initializing the log file, serialize the statement (see the `concordium-rust-sdk <https://github.com/Concordium/concordium-rust-sdk>`_ for more details), create a client, and get the latest cryptographic parameters which are public and the ``global_context`` until the finalized last block from Concordium (or the request made). Create a state variable (initiate it) with empty challenges and the global context.

Get Challenge
^^^^^^^^^^^^^

cors is a standard in HTTP related to the permissions to access and manage a website that you set in the server's settings, and then implement the first endpoint which is the get challenge. So when someone wants to get a randomly generated challenge for their address, they must call this endpoint. You will get the address from the query payload and invoke ``handle_get_challange()``. Since you don't need input this is a ``GET`` function that is available at ``localhost:8000/api/challenge``, and you will use the same channel when the challenge is generated and stored on the state in a map with its key, such as base16 encoded version, <address, time>.

Get Statement
^^^^^^^^^^^^^

The second endpoint is the get statement. When your dApp wants to verify that a user meets some conditions, it needs to know what conditions they are. You will answer with the statement from our input variables using the same channel. You don't need input, so this is also a ``GET`` endpoint that is available at ``localhost:8000/api/statement``.

Prove
^^^^^

The last endpoint is the prove. Basically, the request that dApp posts (this is a POST endpoint) includes the challenge and the proof. You will send it to the ``handle_provide_proof()`` helper function to prove and sign it. In order to sign it, weyou need to re-create your key pair which are created using your ``verify_key`` and ``sign_key``. When the proof is verified, this endpoint returns a signature (the public key of the user signed by the back end’s private key) that can be verifiable in the smart contract. Then the user will be able to mint the token because the signature will be verifiable by the smart contract using the public key of the back-end address.

.. code-block:: console

    #[tokio::main]
    async fn main() -> anyhow::Result<()> {
        let app = IdVerifierConfig::parse();
        let mut log_builder = env_logger::Builder::new();
        // only log the current module (main).
        log_builder.filter_level(app.log_level); // filter filter_module(module_path!(), app.log_level);
        log_builder.init();
        let statement: Statement<ArCurve, AttributeKind> = serde_json::from_str(&app.statement)?;

        let mut client = concordium_rust_sdk::v2::Client::new(app.endpoint).await?;
        let global_context = client
            .get_cryptographic_parameters(BlockIdentifier::LastFinal)
            .await?
            .response;

        log::debug!("Acquired data from the node.");

        let state = Server {
            challenges: Arc::new(Mutex::new(HashMap::new())),
            global_context: Arc::new(global_context),
        };
        let prove_state = state.clone();
        let challenge_state = state.clone();

        let cors = warp::cors()
            .allow_any_origin()
            .allow_header("Content-Type")
            .allow_method("POST");

        // 1a. get challenge
        let get_challenge = warp::get()
            .and(warp::path!("api" / "challenge"))
            .and(warp::query::<WithAccountAddress>())
            .and_then(move |query: WithAccountAddress| {
                handle_get_challenge(challenge_state.clone(), query.address)
            });

        // 1b. get statement
        // change it to check older than 18 only.
        let get_statement = warp::get()
            .and(warp::path!("api" / "statement"))
            .map(move || warp::reply::json(&app.statement));

        // 2. Provide proof
        let provide_proof = warp::post()
            .and(warp::filters::body::content_length_limit(50 * 1024))
            .and(warp::path!("api" / "prove"))
            .and(warp::body::json())
            .and_then(move |request: ChallengedProof| {
                let kp = KeyPair::from(ed25519_dalek::Keypair {
                    public: ed25519_dalek::PublicKey::from_bytes(
                        hex::decode(&app.verify_key).unwrap().as_slice(),
                    )
                    .unwrap(),
                    secret: ed25519_dalek::SecretKey::from_bytes(
                        hex::decode(&app.sign_key).unwrap().as_slice(),
                    )
                    .unwrap(),
                });
                handle_provide_proof(
                    client.clone(),
                    prove_state.clone(),
                    statement.clone(),
                    request,
                    kp,
                )
            });

        info!(
            "Starting up HTTP serve
    r. Listening on port {}.",
            app.port
        );

        tokio::spawn(handle_clean_state(state.clone()));

        let server = get_challenge
            .or(get_statement)
            .or(provide_proof)
            .recover(handle_rejection)
            .with(cors)
            .with(warp::trace::request());
        warp::serve(server).run(([0, 0, 0, 0], app.port)).await;
        Ok(())
    }

Now you need to :ref:`create a smart contract for minting NFTs<nft-w-id-sc>`.
