.. _crypto-primitives:

========================
Cryptographic primitives
========================

V1 smart contracts natively support a number of common cryptographic primitives.
Compared to implementing the same functionality in the smart contract, using primitives is substantially cheaper.
At the same time, smart contract developers benefit from using a single, high-quality implementation of the primitives provided by the chain.

Since all contract inputs, as well as the contract state, on the Concordium blockchain are public, it is only reasonable to have primitives that take public inputs.
The currently supported primitives are:

- Signature verification for the ``ed25519`` signature scheme,  and ``ECDSA`` over the ``Secp256k1`` signature scheme (Bitcoin/Ethereum signatures).
- SHA2, SHA3, and Keccak digests with 256 bits of output.

References
==========

- `An example contract <https://github.com/Concordium/concordium-rust-smart-contracts/blob/main/examples/signature-verifier/src/lib.rs>`_
- `concordium-std documentation <https://docs.rs/concordium-std/latest/concordium_std/type.CryptoPrimitives.html>`_
- :ref:`Host function reference <host_function_crypto_primitives>`
