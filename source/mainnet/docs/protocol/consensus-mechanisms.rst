.. include:: ../../variables.rst

.. _reference-consensus-mechanisms:

====================
Consensus mechanisms
====================

The consensus mechanism in Concordium is more than just its :term:`proof-of-stake` protocol. While proof-of-stake is a crucial component that prevents Sybil attacks, Concordium's consensus mechanism, :term:`ConcordiumBFT<Concordium Byzantine Fault Tolerance (BFT) protocol>`, is a more complex protocol that enables the network's nodes to reach agreement on the blockchain's state.

What is consensus?
------------------

Consensus in a blockchain context means that network participants agree on the current state of the system. In Concordium, consensus on a new state is reached when validators holding at least two-thirds of the total stake agree on a new block. The two-thirds threshold is crucial as it ensures the safety properties of the network.

What is a consensus mechanism?
------------------------------

Concordium's consensus mechanism refers to the entire stack of protocols and incentives that ensure a consistent network state. The mechanism includes:

* A proof-of-stake system that requires validators to lock up CCD as stake
* A leader election protocol based on verifiable random functions
* A block production and validation process
* A finalization mechanism that provides quick, deterministic finality
* Economic incentives that reward honest behavior and discourage attacks

Block Creation
--------------

In Concordium, block creation follows a leader-based approach. For each round, a leader is selected through a lottery-based system where the probability of selection is proportional to the validator's stake. The selected leader creates a new block and broadcasts it to the network.

Unlike proof-of-work systems that require solving complex puzzles, Concordium's block creation is energy-efficient. The chosen leader simply needs to create a valid block and prove they were legitimately selected through the verifiable random function (VRF) system.

Security
--------
The network's security is maintained through several mechanisms:

1. **Economic Security**: You would need to control one-third of the total staked CCD to attempt to corrupt the network. Given the significant financial investment this requires and the risk of losing or devaluing your stake, attacks are economically irrational.

2. **Byzantine Fault Tolerance**: The consensus protocol continues to operate correctly even if up to one-third of validators (weighted by stake) behave maliciously.

3. **Quick Finality**: Unlike systems that require waiting for multiple block confirmations, Concordium's finality is achieved within seconds and is deterministic, meaning finalized blocks cannot be reverted.

Epoch Structure
---------------

Concordium organizes time into epochs (one-hour periods) during which the validator set remains constant. This structure provides clear checkpoints for updates to the system and helps coordinate the network's operation. Every 24 epochs, there is a "pay day" where rewards are distributed and stake changes take effect.

Delegation and Participation
----------------------------

The consensus mechanism includes a sophisticated delegation system that allows CCD holders to participate in network staking security without running a validator node. Through delegation, users can add their stake to a validator's pool, increasing the validator's block production probability while sharing in the rewards.

Future Scalability
------------------

The consensus mechanism is designed with scalability in mind, incorporating:

* Parallel transaction execution
* Preparation for sharding implementation
* Support for layer-2 scaling solutions
* Separate consensus and execution layers

This architecture allows the network to adapt to increasing demand while maintaining its security guarantees.

The Role of Identity
--------------------

A unique aspect of Concordium's consensus mechanism is its integration with the identity layer. While consensus operates pseudonymously, the underlying identity system ensures that validators can be held accountable if necessary, providing an additional security guarantee without compromising the network's decentralized nature.