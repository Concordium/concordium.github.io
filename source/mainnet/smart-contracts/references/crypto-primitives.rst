.. _crypto-primitives:

========================
Cryptographic primitives
========================

V1 smart contracts natively support a number of common cryptographic primitives.
Compared to implementing the same functionality in the smart contract, using primitives is subtantially cheaper.
At the same time, smart contract developers benefit from using a single high-quality implementation of the primitives provided by the chain.

Since all contract inputs, as well as the contract state, on the concordium blockchain are public it only reasonable to have primitives that take public inputs.
The currently supported primitives are

- Signature verification for the ``ed25519`` signature scheme,  and ``ECDSA`` over the ``Secp256k1`` signature scheme (Bitcoin/Ethereum signatures).
- SHA2, SHA3, and Keccak digests with 256 bits of output.

References
==========

- `an example contract <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/signature-verifier/src/lib.rs>`_
- `concordium-std documentation <https://docs.rs/concordium-std/3.0.0/concordium_std/trait.HasCryptoPrimitives.html>`_
- :ref:`host function reference <host_function_crypto_primitives>`
