.. _gallery-backend:

=====================================
Writing the verifying backend
=====================================

The backend does the following:

- Serves the statement the user must prove using their identity.
- Serves the names of the gallery pieces.
- Serves a unique challenge that the frontend gives the user to ensure the user cannot reuse an old proof.
- Receives the resulting proof and verifies it, in which case it returns a token that the frontend can use for authentication.
- Serves the images of the gallery pieces, if given a valid token.

To do this it has an HTTP endpoint for each of theses tasks:

- :code:`GET  api/statement`
- :code:`GET  api/names`
- :code:`GET  api/challenge?address=:accountAddress`
- :code:`POST api/prove`
- :code:`GET  api/image/:name?auth=:authToken`

The backend is written in Rust and uses the Tokio runtime and Warp to create an http server.
It has some state that keeps track of sent challenges and tokens.

To only have a single server and allow the frontend to assume the location of the backend, the backend serves the frontend. This is easily done with Warp.
Here is how a Warp server that just serves the folder specified by app.public_folder might look:

.. code-block:: rust

   let serve_public_files = warp::get().and(warp::fs::dir(app.public_folder));

   warp::serve(serve_public_files).run(([0, 0, 0, 0], app.port)).await;

To see how this fits into the actual implementation, see `here <https://github.com/Concordium/concordium-dapp-examples/blob/main/gallery/verifier/src/main.rs>`_.

Serve statement and names
=========================

The statement and the list of names are static, so they can easily be returned as responses to the corresponding requests.

.. code-block:: rust

    let get_statement = warp::get()
        .and(warp::path!("api" / "statement"))
        .map(move || warp::reply::json(&app.statement));

    let get_names = warp::get()
        .and(warp::path!("api" / "names"))
        .map(move || warp::reply::json(&app.names));

Serve challenge
===============

A new challenge must be generated each time the backend gets a request. The challenge is 32 bytes. Challenges are randomly generated and saved in the state together with the given account address and a timestamp.

The address will be used when verifying a proof with this challenge, so that only the account that requested the challenge can use it. The timestamp will be used to put a time limit on the challenge after which it will expire, and eventually be cleaned from the state.

To learn how to do this, see the *get_challenge_worker* function in the `handlers file <https://github.com/Concordium/concordium-dapp-examples/blob/main/gallery/verifier/src/handlers.rs>`_.

Verify Proof
============

When the user wants to obtain a token they must send in a proof that can be verified. This endpoint expects a POST request with a body containing:

- the challenge
- the credential ID
- the actual proof.

The specific type is the ``ChallengedProof`` seen here:

.. code-block:: rust

   pub struct ChallengedProof {
       pub challenge: Challenge,
       pub proof: ProofWithContext,
   }

   pub struct ProofWithContext {
       pub credential: CredentialRegistrationID,
       pub proof: Versioned<Proof<ArCurve, AttributeKind>>,
   }

The handler for this request must do the following:

- Check that the challenge is in the state and has not expired.
- Fetch the credential on the account that was associated with the challenge.
- Verify that the proof is valid for the statement using the credential that was fetched.
- If every step succeeds, then generate, save, and return a token.

Like the challenge, a timestamp is saved alongside the token so that it can expire and be cleaned from the state later.

To learn how to do this, see the *check_proof_worker* function in the `handlers file <https://github.com/Concordium/concordium-dapp-examples/blob/main/gallery/verifier/src/handlers.rs>`_.

Serve Images
============

When receiving requests for an image, the provided token is verified to have been issued and that it has not expired yet. If the token is valid, the image of the item is returned.
For simplicity in this example, the response is a redirect to an image hosting that returns a random image, instead of having specific images for each item.

This is done by the *handle_image_access* function in the `handlers file <https://github.com/Concordium/concordium-dapp-examples/blob/main/gallery/verifier/src/handlers.rs>`_.

:ref:`Continue to the next part<gallery-frontend>` to learn how to make a frontend to interact with this backend and with the wallet.
