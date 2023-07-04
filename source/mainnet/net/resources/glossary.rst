.. _whitepaper: https://concordium.com/wp-content/uploads/2023/01/Concordium-White-Paper-v1.6.pdf
.. _ElGamal: https://en.wikipedia.org/wiki/ElGamal_encryption
.. _ciphertexts: https://en.wikipedia.org/wiki/Ciphertext
.. include:: ../../variables.rst
.. _glossary:

============================
Glossary of Concordium Terms
============================

See also our `whitepaper`_ for more details on the terms described
below.

.. _glossary-account:

Account
=======

An addressable store of funds on the blockchain. An account is associated with
one or more *account keys* that can be used to authorize transactions
originating from the account, as well as with an :ref:`encryption key<glossary-encryption-key>` that can be
used to send shielded transfers to the account. An account is also associated
with the account holder's :ref:`identity<glossary-identity>`, although this association is encrypted
for anonymity. This anonymity can only be revoked by :ref:`anonymity revokers<glossary-anonymity-revoker>`, in
cooperation with the account's :ref:`identity provider<glossary-identity-provider>`.

.. _glossary-alias:

Alias
=====

A kind of sub-account structure that can be created. An account owner can create different aliases for different uses to keep track of transfers and assign them meaning. Each account has 16777216 addresses, namely a so-called canonical account address together with matching account aliases. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial 29 bytes are referred to as account aliases for the same account. Thus, accounts can be referred to by any address whose initial 29 bytes match.

.. _glossary-anonymity-revoker:

Anonymity revoker
=================

An authority who has power to know the identity of a participant. The anonymity revokers and :ref:`identity provider<glossary-identity-provider>` can work together to determine the owner of an account and determine which accounts belong to the same owner. (They should only do so when legally obliged to, such as by a court order.) Anonymity revocation is a two-stage process, requiring cooperation of multiple parties.

.. _glossary-attribute:

Attributes
==========

User data, such as date of birth or country of residence, that is associated
with a user :ref:`identity<glossary-identity>`. Users can choose which attributes should be revealed in
each of their accounts.

.. _glossary-baker:

Baker
=====

A node that participates in the production of :ref:`blocks<glossary-block>`, referred to as
*baking*.

.. _glossary-baker-pool:

Baker pool
==========

A baker and delegators that collectively pool their stake to participate in the consensus protocol and earn rewards. The baker runs a baker node on behalf of the baker pool to bake (and possibly finalize) blocks using the collective stake of the pool to determine its lottery power. Rewards are accrued to the pool each time the baker produces a block. Each pay day, the accrued rewards are distributed to the pool's participants in proportion to their relative stakes in the pool, with the baker (the pool owner) receiving an additional commission from the delegators' rewards.

.. _glossary-best-block:

Best block
==========

Last block on the :ref:`best chain<glossary-best-chain>`.

.. _glossary-best-chain:

Best chain
==========

The chain a :ref:`baker<glossary-baker>` will build upon when making a new block. The best chain
selection procedure is determined by the consensus protocol. In particular, the
best chain has the most :ref:`finalized<glossary-finalization>` blocks, and the most blocks after the last
finalized block.

.. _glossary-block:

Block
=====

The basic unit of the blockchain, which is produced by a :ref:`baker<glossary-baker>`. A block
contains a (possibly empty) list of :ref:`transaction<glossary-transaction>`, and has a pointer to a
previous block (with the exception of the :ref:`genesis block<glossary-genesis-block>`). A block and its
predecessors form a chain, and the sequence of transactions they contain form a
ledger. Each block has a :ref:`slot time<glossary-slot>` that records when it was baked. A block
also contains information relating to consensus, for instance establishing which
baker created the block, and that the baker was entitled to do so.

.. _glossary-branch:

Branch
======

A chain of blocks that has split from the main chain. All branches have the potential to become
the main chain. The Chain selection rule determines which branch is the best chain.

.. _glossary-build:

Build
=====

Command to take a smart contract module written in Rust and create a Wasm module that can be deployed on chain. The command is run from :ref:`cargo-concordium<glossary-cargo-concordium>`.

.. _glossary-cargo-concordium:

cargo-concordium
================

An extension of Rust's ``cargo`` tool. It can be used for compiling and testing smart contracts, and enables features such as building contract schemas.

.. _glossary-catch-up:

Catch-up
========

The mechanism by which a node receive messages that may have been missed, for
instance because the node was offline when it was sent.

.. _glossary-ccd:

CCD
===

CCD is the currency of the Concordium blockchain. CCD can be used for multiple
purposes:

-  as a form of payment between users via transactions,
-  as a payment for executing smart contracts,
-  as a store of value,
-  as a reward for honest behaviour (e.g. :ref:`baking<glossary-baker>` or :ref:`finalizing<glossary-finalization>`
   blocks on top of the longest chain), to incentivize blockchain users.

The smallest subdivision of CCD is the µCCD (micro CCD), with 1 CCD = 1,000,000
µCCD. This means that CCD amounts are given with up to six decimal places of
precision.

.. _glossary-ccdscan:

CCDScan
=======

CCDScan effectively serves as a search engine for data on the Concordium blockchain and enables users to search for, explore, and analyze relevant on-chain data. Often used to research bakers and pools before deciding to delegate funds to a particular pool.

.. _glossary-chain:

Chain
=====

A sequence of :ref:`blocks<glossary-block>`, starting from the :ref:`genesis block<glossary-genesis-block>`, in which each
successive block points to the predecessor. There may be multiple valid chains,
and the :ref:`consensus<glossary-consensus>` protocol establishes which chain is authoritative.

.. _glossary-chain-selection-rule:

Chain selection rule
====================

A rule that selects the best chain based on the following criteria:

- chain with the most finalized blocks
- longest chain
- which last block has the earliest slot in the chains
- which last block has the largest block luck in the chains
- which last block has the largest hash in the chains.

.. _glossary-challenge:

Challenge
=========

To make sure that :ref:`zero knowledge proofs<glossary-zero-knowledge-proof>` cannot be reused (e.g., if they are stolen), the verifier can and should specify a challenge string. This can be an arbitrary byte array which is used by the prover (wallet) when producing the proof. The proof will only validate with respect to the challenge that was used to produce it. The verifier server can thus use the challenge to make sure the proofs it is receiving are not reused, and to handle their lifetime (e.g., it can set the challenge it supplied to expire in 5 minutes).

.. _glossary-concordium-client:

Concordium client
=================

A command-line tool that ships with the Concordium distribution.
It is designed as a low-level interface to the Concordium blockchain. It cannot be used to create identities, but it can :ref:`import accounts<concordium-client-import-accounts-keys>` exported from the mobile wallets. Once an account has been imported, Concordium client can be used to do CCD transfers from the account and other :ref:`transaction<transactions>` types supported by the Concordium blockchain.

.. _glossary-consensus:

Consensus
=========

The process by which nodes agree which :ref:`transaction<glossary-transaction>` have occurred and in what
order. This consists of :ref:`baking<glossary-baker>` and :ref:`finalization<glossary-finalization>`.

.. _glossary-cool-down-period:

Cool-down period
================

A period of time during which a transaction is frozen. Examples of when cool-down periods apply include removing a baker and updating stake. The length of a cool-down period varies between transactions.

.. _glossary-concordium-bft-protocol:

Concordium Byzantine Fault Tolerance (BFT) protocol
===================================================

The consensus protocol for the blockchain. The protocol offers high transaction throughput and lower confirmation time because a block can be produced as soon as the previous block has been signed. The protocol proceeds by rounds. In each round, a predetermined leader among the bakers should produce a block. The members of the finalization committee then sign this block, and their collective signatures are aggregated to form a quorum certificate. This quorum certificate is then included in the next block. If the leader fails to produce a block in the round, or not enough signatures were gathered for a QC, then the finalizers will instead send timeout messages, which are aggregated to form a timeout certificate. Each block always contains a quorum certificate and may contain a timeout certificate for the previous round if and only if the previous round timed out. When blocks on a common chain in two consecutive rounds have quorum certificates, the block in the first of these rounds (together with its ancestors) is considered finalized. At this point, the protocol ensures that it cannot be rolled back. The two consecutive blocks must also be within the same epoch.

.. _glossary-credential:

Credential
==========

A certificate derived from the :ref:`glossary-identity-object` that proves that
the owner has been verified by an identity provider. The key feature of the
credential is that it **does not** identify the owner to the identity provider,
nor to any other single entity, however it contains enough information to allow
anonymity revokers in concert with the identity provider to find the owner.

.. _glossary-credential-holder:

Credential holder
=================

The user holding a credential. An account is owned by one or more credential holders.

.. _glossary-cryptographic-proof:

Cryptographic proof
===================

A method by which one party (the prover) can prove to another party (the verifier) that a given statement is true while the prover avoids conveying any additional information apart from the fact that the statement is indeed true. This is known as a zero-knowledge proof.

.. _glossary-decryption-key:

Decryption key
==============

Dual to :ref:`encryption key<glossary-encryption-key>`. In contrast to the encryption key, which is public,
this key is only known to the account holder.

.. _glossary-delegate:

Delegator
==========

An account that contributes stake to a baker pool, or to passive delegation.
When an account becomes a delegator, the delegated amount of CCD is locked so that it cannot be spent or transferred while it is delegated.
Delegators earn rewards, minus a commission to the baker, in proportion to their delegated stake.

.. _glossary-deploy:

Deploy
======

Command that takes the built :ref:`Wasm<glossary-web-assembly>` file for a smart contract module and deploys it on chain. This command is run from :ref:`concordium-client<glossary-concordium-client>`.

.. _glossary-encryption-key:

Encryption key
==============

An `ElGamal`_ public key associated to an account which is used to encrypt all
:ref:`shielded amounts<glossary-shielded-amount>` on the account.

.. _glossary-endpoint:

Endpoint
========

A point at which an API -- the code that allows two software programs to communicate with each other -- connects with the software program. APIs work by sending requests for information from a web application or web server and receiving a response.

.. _glossary-entrypoint:

Entrypoint
==========

An invocable function of the smart contract that usually takes arguments. Each entrypoint has specific arguments. Entrypoints can be invoked to update the state of the smart contract as well as to view information about different parts of contract state.

.. _glossary-epoch:

Epoch
=====

A time period that is approximately one hour on testnet and mainnet. At the start of each epoch, a :ref:`leadership election nonce<glossary-leader-election>` is computed based on the block nonces of the previous epoch.
The leadership election nonce is valid for the duration of the epoch.
Each epoch has a nominal ending, and when a block is finalized after this nominal ending then epoch transition occurs.

.. _glossary-finalization:

Finalization
============

The process by which a block is marked to be "finalized", i.e. part of the
authoritative :ref:`chain<glossary-chain>`. Transactions that are part of finalized blocks are considered authoritative. New blocks can be only added following the last finalized block. The finalization process is conducted by the bakers with a staked amount of at least 0.1% of the total amount (stake) of CCD in pools, known as the Finalization committee. Total stake in pools is referred to as total stake in pools without Passive Delegation. Finalization has to happen for each round otherwise the blockchain cannot proceed to the next round.

.. _glossary-genesis-block:

Genesis Block
=============

The first :ref:`block<glossary-block>` in a :ref:`chain<glossary-chain>`. The genesis block establishes the starting state of the chain, before any transactions have occurred.

.. _glossary-identity:

Identity
========

Before opening an account on the Concordium Platform, one's real-world identity
must be verified and recorded by an :ref:`identity provider<glossary-identity-provider>`. A user’s identity is
anonymous on-chain, however this anonymity can be revoked and their real-world
identity revealed in response to a valid request from a government authority.

.. _glossary-identity-issuer:

Identity Issuer
===============

See :ref:`identity provider<glossary-identity-provider>`.

.. _glossary-identity-object:

Identity Object
===============

An object issued by the :ref:`glossary-identity-provider` to the user which
allows the user to prove to third parties that their real life identity has been
verified by a trusted third party.

.. _glossary-identity-provider:

Identity Provider
=================

A person or organization that performs off-chain identification of users. Users
are required to obtain an identity object from an identity provider in order to
open an account on the Concordium Platform.


.. _glossary-initial-account:

Initial Account
===============

An intial account is an account submitted to the chain by the identity provider
during the process of requesting a new identity. The initial account can
perform all of the same actions as a regular account, however the real-life
identity of the initial-account owner is known by the identity provider
who submitted it to the chain. In contrast, the real-life identity of the
owner of a regular account can only be ascertained by anonymity revokers working
in concert with the identity provider.

Initial accounts are only relevant for Desktop Wallet and |mw-gen1|.

.. _glossary-initialize:

Initialize
==========

Action that creates a new smart contract instance with the initial state. The only way to update the instance state is by invoking the instance’s entrypoints.

.. _glossary-instance:

Instance
========

A smart contract module together with a specific state and an amount of CCD tokens. Multiple smart contract instances can be created from the same module. Smart contract instances can be created from a deployed :ref:`smart contract
module<contract-module>` via the ``init`` transaction which invokes the requested function in the smart contract module. This function can take a parameter. Its end result is the state of the smart contract instance.
instance.

.. _glossary-invoke:

Invoke
======

Invoke means to call something into effect.

Invoke is also the act of triggering a receive function in a smart contract from ``concordium-client`` and viewing its return value. Invoking an instance is not a transaction and it does not change the state of a contract. Invoking can be useful to either view information about the instance or to test a receive method before running an update. Because invoking is not a transaction, there is no fee to run invoke. Click :ref:`here to see examples of how to use invoke to view information about the instance<nft-view-fn>`.

.. _glossary-leader-election:

Leader Election
===============

In each round, a predetermined leader among the bakers should produce a block. Round leaders are determined each epoch, defined as a fixed time duration. The leaders are determined from a leader election nonce that is updated each epoch. To update the leader election nonce the first block (the trigger block) after the nominal epoch time must be finalized. When this happens the chain starts a new epoch with the new leader election nonce set. When finalizers see the proof for the trigger block they stop signing additional blocks in the current epoch. When a baker sees the finalization proof it will bake in the new epoch. The leader election nonce is based on the block hashes up to the trigger block of the current epoch.

The :ref:`winning probability<glossary-winning-probability>` is roughly proportional to the baker's stake, and higher difficulty parameters decrease the winning probability for all parties.

See :ref:`lottery power<glossary-lottery-power>`.

.. _glossary-lottery-power:

Lottery Power
=============

A baker's lottery power is its relative stake and is therefore proportional to
the :ref:`staked amount<glossary-staked-amount>` of that baker. The lottery power is updated each
:ref:`epoch<glossary-epoch>`, and is based on the stake distribution at the end of the epoch before
last. (This delay ensures that the stake distribution is determined before the
randomness that fixes the bakers for the epoch: otherwise, stakeholders might
redistribute their stake to luckier bakers, which undermines the security of the
system.) :ref:`Delegation<glossary-delegate>` affects the lottery power of the baker by increasing their stake, thus increasing the odds of that baker being chosen to bake a block.

.. _glossary-mainnet:

Mainnet
=======

The main Concordium network which is expected to launch in early 2021. The
mainnet will receive periodic upgrades, but in contrast to the :ref:`testnet<glossary-testnet>`, it
will never be reset, and accounts created on the mainnet will remain
indefinitely.

.. _glossary-membership-proof:

Membership proof
================

A proof to determine if an attribute of a user's identity is included in a given set, for example, lives in the EU. Can also be a :ref:`non-membership proof<glossary-non-membership-proof>`.

.. _glossary-node:

Node
====

A participant in the Concordium network. Nodes receive blocks and transactions,
and track the current state of the blockchain. A :ref:`baker node<glossary-baker>` has cryptographic
keys that enable it to take part in baking and :ref:`finalization<glossary-finalization>`. A node without
these keys is referred to as a *passive node*.

.. _glossary-nonce:

Nonce
=====

May refer to:

-  *Block Nonce*: a randomized value included by the :ref:`baker<glossary-baker>` in each
   :ref:`block<glossary-block>`, and used to determine the leadership election nonce.
-  *Leadership Election Nonce*: a randomized value that is updated each
   :ref:`epoch<glossary-epoch>` that is used to seed the :ref:`leader election<glossary-leader-election>` process.
-  :ref:`Transaction sequence number<glossary-transaction-sequence-number>` (same as account sequence number)

.. _glossary-non-membership-proof:

Non-membership proof
====================

A proof to determine that an attribute of a user's identity is **not** included in a set, for example, that they are **not** a resident of a country under trade sanctions.

.. _glossary-off-chain:

Off-chain
=========

Refers to activities outside of the Concordium blockchain. Some on-chain actions
need preliminary actions off-chain, for example to create an account on the
Concordium blockchain the user must first work with an identity provider, e.g.,
via their website or mobile application, to obtain a specific digital
certificate. Concordium refers to this certificate as the **identity**.

.. _glossary-on-chain:

On-chain
========

Refers to an an event or activity that is propagated through the Concordium
network and recorded on the Concordium blockchain. The recording can be explicit
or implicit as part of the consensus protocol. An example of the former is a
transaction such as a CCD transfer, an example of the latter are the rewards
given out to, e.g., bakers.

.. _glossary-pay-day:

Pay day
=======

A pay day is the point at which new CCDs are minted and rewards to bakers and delegators are distributed. The stakes of bakers and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when new bakers begin baking and updates to delegation and baking take effect, such as increasing stake, restaking preferences, adding delegation. In the case of decreasing stake or removing delegation or baking, there is a longer cool-down period, after which the change is executed at the **next pay day after the cool-down period ends**. The cool-down period is 2 weeks for delegators and 3 weeks for bakers. Pay day is every 24 hours (i.e., 24 epochs) at approximately 08:05 UTC on Mainnet and approximately 11:05 UTC on Testnet. Bakers are finalized at the end of the epoch before that next epoch where they are eligible to bake.

.. _glossary-passive-delegation:

Passive delegation
==================

A form of delegation where a delegator's stake is effectively distributed among all baker pools. It is not associated with a specific baker. Delegators earn lower rewards when delegating to passive delegation than when delegating to a specific baker pool. However, passive delegation is not affected by poor performance of a single baker.

.. _glossary-private-keys:

Private keys
============

A random, secret string that is used in cryptography and cryptocurrency to prove ownership of an account and sign transactions to send, spend, delegate, and stake CCDs. A wallet consists of a set of public addresses and private keys. Anyone can deposit cryptocurrency in a public address, but funds cannot be removed from an address without the corresponding private key.

.. _glossary-qualified-authority:

Qualified authority
===================

A governmental body that has the authority to act in a relevant jurisdiction. For example, a local police force, a local court or an investigatory division of a local authority that regulates financial conduct may have authority to act in their relevant jurisdictions. These authorities are qualified to begin the process of revoking the anonymity of a user when they proceed through established legal channels and make a formal request. The outcome of such a request is likely to be that a qualified authority obtains an official order, which may be in the form of a warrant, court order, or similar instrument. Only after a qualified authority validly serves an official order upon the relevant :ref:`anonymity revokers<glossary-anonymity-revoker>` and :ref:`identity provider<glossary-identity-provider>`, can the real-world identity of a user be revealed and only to the extent set out in the order.

.. _glossary-quorum-certificate:

Quorum certificate
==================

When the members of the finalization committee finalize the block, their collective signatures are aggregated to form a quorum certificate. This quorum certificate is then included in the next block. If the leader fails to produce a block in the :ref:`round<glossary-round>`, or not enough signatures were gathered for a quorum certificate, then the finalizers will instead send timeout messages, which are aggregated to form a :ref:`timeout certificate<glossary-timeout-certificate>`. Each block either contains a quorum certificate or a timeout certificate for the previous round. A block always contains a quorum certificate as it serves as a reference to the parent block. The block might contain a timeout certificate if the previous round timed out. A quorum certificate or a timeout certificate ensures that the protocol progresses. When a node sees a valid quorum certificate or timeout certificate it progresses to the next round.

.. _glossary-range-proofs:

Range proofs
============

A range proof asks a user to prove that they meet an attribute within a range of values. For example, when renting a car, you might need to prove that you are between 25 and 65 years old to the car rental company. This could be constructed as a range proof.

.. _glossary-reveal-attribute:

Reveal
======

To reveal an attribute. This can be used in identity verification proof. When you reveal an attribute, you give the dApp or service that requested it your exact information, such as date of birth, or nationality. You should only do this if you have **absolute trust** in them, and if you are familiar with their data usage and protection procedures.

.. _glossary-round:

Round
=====

Replaces slots in the Concordium BFT protocol. In each round, a predetermined leader among the bakers should produce a block. Round leaders are determined each epoch, defined as a fixed time duration. Rounds are an index to a block or timeout.

.. _glossary-rust:

Rust
====

The multi-paradigm, general purpose programming language used by Concordium smart contracts.

.. _glossary-schema:

Schema
======

Used for smart contracts. A description of how to represent bytes in a more structured representation. It can be used by external tools when displaying the return value of a receive function and for specifying parameters using a
structured representation, such as JSON. This makes it more human readable.

.. _glossary-secret-recovery-phrase:

Secret recovery phrase
======================

Also known as a seed phrase, recovery phrase, mnemonic phrase, mnemonic seed, or backup phrase. A group of random words generated by the wallet that allows you to access the CCDs stored in it across devices or in case of non-functioning devices. Secret recovery phrase is supported by |mw-gen2|.

.. _glossary-shielded-amount:

Shielded amount
================

An amount of :ref:`CCD<glossary-CCD>` that is encrypted with the public key of an account. Only
the owner of the secret key can determine how many CCDs are contained in the
encryption.

.. _glossary-shielded-balance:

Shielded balance
================

The part of the balance of an :ref:`account<glossary-account>` that only the owner of the account can
see. This is achieved by encrypting transfers to an account with the account's
:ref:`encryption key<glossary-encryption-key>`. Every participant of the Concordium network can see the
`ciphertexts`_ of all the transfers, however they provide no information on how
many CCDs were transferred. The receiver of the transfer can use their secret
key to decrypt the ciphertexts, and seeing how many CCDs they have received.

For technical reasons the shielded balance of the account consists of two parts,
the "self balance" and the "incoming shielded amounts".

.. _glossary-self-balance:

Self balance
^^^^^^^^^^^^

This is a single shielded amount that is updated each time the account performs
a shielded transfer, :ref:`shielding<glossary-shielding>`, or :ref:`unshielding<glossary-unshielding>`. Only the account itself
can update this value.

.. _glossary-incoming-shielded-amount:

Incoming shielded amount
^^^^^^^^^^^^^^^^^^^^^^^^^

This is a list of shielded amounts that is extended each time an account
receives an shielded transfer. When the account makes a shielded transfer it
can use a number of shielded amounts from this list as inputs to the transfer.

.. _glossary-shielded-transfer:

Shielded transfer
=================

Transfer from :ref:`shielded balance<glossary-shielded-balance>` of an account
to a :ref:`shielded balance<glossary-shielded-balance>` of another account.
The amount that is transferred is only visible to the sender and the receiver.

.. _glossary-shielding:

Shielding
=========

The action of transferring a part of the public balance to the :ref:`shielded balance<glossary-shielded-balance>`.

.. _glossary-slot:

Slot
====

See :ref:`round<glossary-round>`.

In the blockchain, time is divided into equally sized units called *slots*. On
the testnet the duration of slot is one second. In every slot, each baker checks
locally whether they won the lottery, which entitles the winner to bake a block
in that slot. Zero, one, or multiple bakers can win the lottery. The probability
of these different events is controlled by the difficulty parameter *f*. For
example, with difficulty 0.5 on average every second slot will have a lottery
winner.

.. _glossary-smart-contract:

Smart contract
==============

A computer program or a transaction protocol that is intended to automatically execute, control or document events and actions according to the terms of a contract or an agreement. An example is a smart contract for selling NFTs on a marketplace; it may contain information about royalties, selling the NFT on to others, and so on.

.. _glossary-staked-amount:

Staked Amount
=============

:ref:`Bakers<glossary-baker>` can have part of the balance of their account staked. The amount that is
staked remains locked while staked and cannot be transferred or moved in any
way. The staked amount is proportional to the :ref:`lottery power<glossary-lottery-power>` of a baker.

:ref:`Delegators<glossary-delegate>` can delegate stake to a baker pool or passive delegation. This affects the staked amount of the baker and thus their lottery power.

.. _glossary-statement:

Statement
=========

A list presented to a wallet by a dApp or service whose items are either attributes to reveal, or properties of attributes to prove.

.. _glossary-testnet:

Testnet
=======

A test network run by Concordium to test its protocols and software. There can
be several test networks in existence at the same time. All the features are
tested on the testnet before they are released on the :ref:`mainnet<glossary-mainnet>`.

.. _glossary-timeout-certificate:

Timeout certificate
===================

If the leader fails to produce a block in the round, or not enough signatures were gathered for a quorum certificate, then the finalizers will instead send timeout messages, which are aggregated to form a timeout certificate. A block always contains a quorum certificate as it serves as a reference to the parent block. The block might contain a timeout certificate if the previous round timed out. A quorum certificate or a timeout certificate ensures that the protocol progresses. When a node sees a valid quorum certificate or timeout certificate it progresses to the next round.

.. _glossary-transaction:

Transaction
===========

An atomic operation that defines a change of state in the ledger, such as
transferring funds from one account to another. A transaction typically has a
sender account and a :ref:`transaction sequence number<glossary-transaction-sequence-number>`, and incurs a fee. The
sender account must sign the transaction to authorize it. (The exception to this
is a credential deployment transaction that creates a new account, which does
not have a sender account.)

.. _glossary-transfer-memo:

Transfer Memo
=============

Additional data that a user can provide when making a transfer, a shielded transfer or a transfer with schedule.
The data will appear on chain as a bytestring. It is expected to be CBOR encoded and can therefore represent strings,
numbers and JSON values, but this is not enforced.

.. _glossary-transfer-with-schedule:

Transfer with schedule
======================

A special kind of transfer of CCD that makes the CCD amount available to the
receiver only in a limited way until a specified point in time. The point in
time is specified as part of a transfer. The CCD are immediately owned by the
receiver account, and the transfer cannot be revoked, but the receiver cannot
spend the CCD until the specified time.

.. _glossary-transaction-sequence-number:

Transaction Sequence Number
===========================

A sequence number that orders :ref:`transaction<glossary-transaction>` on a given :ref:`account<glossary-account>`. In a
ledger, all transactions for an account must be ordered with consecutive
transaction sequence numbers, starting from 1. Transaction sequence numbers
ensure that a transaction cannot be repeated in the ledger, and that the
transactions occur in the order intended by the sender account holder.

.. _glossary-unshielding:

Unshielding
===========

The action of transferring a part of the :ref:`shielded balance<glossary-shielded-balance>` to the public
balance.

.. _glossary-user-identity-certificate:

User identity certificate
=========================

Issued to the individual or entity once their real-world identity has been verified and recorded by an Identity Provider. You cannot use the Concordium Platform without a User Identity Certificate.
The user identity certificate includes attributes such as name, age, and nationality. When the Identity Provider has validated the attributes, it issues a user identity certificate, which is basically the Identity Provider’s signature over some cryptographic keys of the user and the validated personal attributes. Unlike usual public key certificates such as X.509 certificates, the user identity certificate is private to the user; it is not submitted to the chain. Note that the Identity Provider also stores some information, but this is only used for a possible, subsequent investigation of the user’s activities (i.e. anonymity revocation). The Identity Provider is not involved in any subsequent use of the user identity certificate. The user identity certificate is signed using the Pointcheval-Sanders signature scheme.

.. _glossary-wallet:

Wallet
======

A wallet is an app that allows cryptocurrency users to store and retrieve their digital assets, and manage identities and accounts. Concordium has four wallet types.

The Desktop Wallet
^^^^^^^^^^^^^^^^^^

The Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts from your desktop and to create transactions such as sending CCD, adding a baker, and exporting and importing account information.

The Mobile Wallet
^^^^^^^^^^^^^^^^^

The Mobile Wallet is a digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, bake and delegate, and to export and import your accounts and identities. There are two mobile wallets: |mw-gen2| and |mw-gen1|.

The |bw|
^^^^^^^^

The |bw| is a web browser extension wallet that enables you to create and manage your Concordium identities and accounts, to create simple transactions, and to connect to dApps.

.. _glossary-web-assembly:

WebAssembly
===========

WebAssembly (Wasm) defines a portable binary-code format and a corresponding text format for executable programs as well as software interfaces for facilitating interactions between such programs and their host environment. Smart contracts are deployed on chain as Wasm files.

.. _glossary-winning-probability:

Winning probability
===================

The winning probability is the probability that a baker wins in a given round.
The probability is :math:`1-(1-f)^α`, where :math:`f` is the difficulty parameter and :math:`α` is
the :ref:`lottery power<glossary-lottery-power>`.

.. _glossary-zero-knowledge-proof:

Zero-knowledge proof
====================

A method by which a user (the prover) can prove to another party (the verifier) that the user meets a requirement without revealing anything beyond that. Zero knowledge proofs generated by the wallet are non-interactive. They are verifiable forever in the future without further prover interaction.
