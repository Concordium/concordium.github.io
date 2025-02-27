.. _ElGamal: https://en.wikipedia.org/wiki/ElGamal_encryption
.. _ciphertexts: https://en.wikipedia.org/wiki/Ciphertext
.. include:: ../../variables.rst
.. _glossary:

============================
Glossary of Concordium Terms
============================

Also see the Concordium `Whitepaper <https://developer.concordium.software/governance/whitepaper/Concordium%20White%20Paper.pdf>`_ for more details on the terms described below.

.. glossary::

   Account

      An addressable store of funds on the blockchain. An account is associated with one or more *account keys* that can be used to authorize transactions originating from the account, as well as with an :term:`encryption key`. An account is also associated with the account holder's :term:`identity`, although this association is encrypted. This identity can only be disclosed by :term:`identity disclosure authorities<identity disclosure authority>`, in cooperation with the account's :term:`identity provider`.

   Account credential

      A certificate derived from the :term:`identity object` that proves that the owner has been verified by an identity provider. The key feature of the credential is that it **does not** identify the owner to the identity provider, nor to any other single entity, however it contains enough information to allow disclosing an identity in concert with the identity provider to find the owner.


   Account weight

      The Account weight of an account corresponds to the weight this account has for voting. In the 2024 election, this is computed as the average amount of CCD on the account between the 1st of March and 31st of May 2024.

   Accumulated weight

      The weight of a vote is the weight assigned to that vote when tallying, i.e., the sum of all account weights that delegated to the account that cast the vote + the weight of the account that cast the vote (unless that account delegated its own weight to another account, but voted anyway).

   Alias

      A kind of sub-account structure that can be created. An account owner can create different aliases for different uses to keep track of transfers and assign them meaning. Each account has 16777216 addresses, namely a so-called canonical account address together with matching account aliases. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial 29 bytes are referred to as account aliases for the same account. Thus, accounts can be referred to by any address whose initial 29 bytes match.

   Identity disclosure authority

      An authority who has power to know the identity of a participant. The identity disclosure authority and :term:`identity provider` can work together to determine the owner of an account and determine which accounts belong to the same owner. (They should only do so when legally obliged to, such as by a court order.) Identity disclosure is a two-stage process, requiring cooperation of multiple parties.

   Approval voting

      Approval voting is a single-winner electoral system in which the voter can choose or approve any number of candidates, effectively assigning a 0 or a 1 to every candidate. The winner is the single candidate approved by the largest number of voters. Approval voting can be achieved by setting the selection limit to the total number of options in a contest.

   Attributes

      User data, such as date of birth or country of residence, that is associated with a user :term:`identity`. Users can choose which attributes should be revealed in each of their accounts.

   Baker

      This term is no longer used. See :term:`validator<validator>`.

   Baker pool

      This term is no longer used. See :term:`staking pool<staking pool>`.

   Best block

      This term is no longer used. See :term:`Concordium Byzantine Fault Tolerance (BFT) protocol`.

   Best chain

      This term is no longer used. See :term:`Concordium Byzantine Fault Tolerance (BFT) protocol`.

   Block

      The basic unit of the blockchain, which is produced by a :term:`validator`. A block contains a (possibly empty) list of :term:`transactions<transaction>`, and has a pointer to a previous block (with the exception of the :term:`genesis block`). A block and its predecessors form a chain, and the sequence of transactions they contain form a ledger. Each block has a :term:`slot time<slot>` that records when it was produced. A block also contains information relating to consensus, for instance establishing which validator created the block, and that the validator was entitled to do so.

   Block reward commission

      Sets the percentage of block rewards a validator retains when its pool successfully produces a block. Lower rates may attract more delegators, while higher rates increase your profit share from each block.

   Branch

      A chain of blocks that has split from the main chain. All branches have the potential to become the main chain. The Chain selection rule determines which branch is the best chain.

   Build

      Command to take a smart contract module written in Rust and create a Wasm module that can be deployed on chain. The command is run from :term:`cargo-concordium`.

   Candidate

      Option on the official list of candidates for the election. Since there are only 10 places for the 2024 election, not all nominees are necessarily candidates.

   cargo-concordium

      An extension of Rust's ``cargo`` tool. It can be used for compiling and testing smart contracts, and enables features such as building contract schemas.

   Catch-up

      The mechanism by which a node receive messages that may have been missed, for instance because the node was offline when it was sent.

   CCD

      CCD is the currency of the Concordium blockchain. CCD can be used for multiple purposes:

      -  as a form of payment between users via transactions,
      -  as a payment for executing smart contracts,
      -  as a store of value,
      -  as a reward for honest behavior (e.g. :term:`validation<validation>`
         blocks on top of the longest chain), to incentivize blockchain users.

      The smallest subdivision of CCD is the µCCD (micro CCD), with 1 CCD = 1,000,000 µCCD. This means that CCD amounts are given with up to six decimal places of precision.

   CCDScan

      CCDScan effectively serves as a search engine for data on the Concordium blockchain and enables users to search for, explore, and analyze relevant on-chain data. Often used to research validators and pools before deciding to delegate funds to a particular pool.

   Chain

      A sequence of :term:`blocks<block>`, starting from the :term:`genesis block`, in which each successive block points to the predecessor. There may be multiple valid chains, and the :term:`consensus` protocol establishes which chain is authoritative.

   Chain selection rule

      A rule that selects the best chain based on the following criteria:

      - chain with the most final blocks
      - longest chain
      - which last block has the earliest slot in the chains
      - which last block has the largest block luck in the chains
      - which last block has the largest hash in the chains.

   Challenge

      To make sure that :term:`zero-knowledge proofs<zero-knowledge proof>` cannot be reused (e.g., if they are stolen), the verifier can and should specify a challenge string. This can be an arbitrary byte array which is used by the prover (wallet) when producing the proof. The proof will only validate with respect to the challenge that was used to produce it. The verifier server can thus use the challenge to make sure the proofs it is receiving are not reused, and to handle their lifetime (e.g., it can set the challenge it supplied to expire in 5 minutes).

   Concordium client

      A command-line tool that ships with the Concordium distribution. It is designed as a low-level interface to the Concordium blockchain. It cannot be used to create identities, but it can :ref:`import accounts<concordium-client-import-accounts-keys>` exported from the mobile wallets. Once an account has been imported, Concordium client can be used to do CCD transfers from the account and other :ref:`transaction<transactions>` types supported by the Concordium blockchain.

   Consensus

      The process by which nodes agree which :term:`transactions<transaction>` have occurred and in what order. This consists of :term:`validation<validation>`.

   Cool-down period

      A period of time during which the funds are frozen and cannot be spent.


   Concordium Byzantine Fault Tolerance (BFT) protocol

      The consensus protocol for the blockchain. The protocol offers high transaction throughput and lower confirmation time because a block can be produced as soon as the previous block has been signed. The protocol proceeds by rounds. In each round, a predetermined leader among the validators should produce a block. The other validators then sign this block, and their collective signatures are aggregated to form a quorum certificate (QC). This quorum certificate is then included in the next block. If the leader fails to produce a block in the round, or not enough signatures were gathered for a QC, then the validators will instead send timeout messages, which are aggregated to form a timeout certificate (TC). Each block always contains a quorum certificate and may contain a timeout certificate for the previous round if and only if the previous round timed out. When blocks on a common chain in two consecutive rounds have quorum certificates, the block in the first of these rounds (together with its ancestors) is considered final. At this point, the protocol ensures that it cannot be rolled back. The two consecutive blocks must also be within the same epoch.

   Credential

      See :term:`account credential`.

   Credential holder

      The user holding a credential. An account is owned by one or more credential holders.

   Credential registry contract

      A smart contract used by :term:`issuers<issuer>` of :term:`verifiable credentials<verifiable credential>` to register credentials when they are issued. This contract will also be used to track the state of a credential, e.g., valid, revoked, expired.

   Cryptographic proof

      A method by which one party (the prover) can prove to another party (the verifier) that a given statement is true while the prover avoids conveying any additional information apart from the fact that the statement is indeed true. This is known as a :term:`zero-knowledge proof`.

   dApp connectivity

      The abiity of a wallet to interact with decentralized applications, dApps, on the blockchain. This allows users to access various services and platforms built on blockchain technology, such as DeFi, NFTs, and gaming.

   Decryption key

      Dual to :term:`encryption key`. In contrast to the encryption key, which is public, this key is only known to the account holder.

   Decryption share

      A guardian's partial share of a ballot decryption or tally decryption for an election.

   Delegated weight

      Sum of account weights that delegated to an account. Delegated weight is made up of the account weight of each account that delegated a vote to the account that cast a ballot.

   Delegator

      An account that contributes stake to a staking pool, or to passive delegation. When an account becomes a delegator, the delegated amount of CCD is locked so that it cannot be spent or transferred while it is delegated. Delegators earn rewards, minus a commission to the validator, in proportion to their delegated stake.

      For delegation in an election, see :term:`Vote delegation`.

   Deploy

      Command that takes the built :term:`Wasm<webassembly>` file for a smart contract module and deploys it on chain. This command is run from :term:`Concordium client`.

   Election manifest

      The manifest is the information that uniquely specifies and describes the structure and type of the election, including geopolitical units, contests, candidates, ballot styles, etc. In the Guardian app, it is a file that is created before running an election. The internal manifest is a wrapper around the manifest used in programming code to simplify and avoid processing the same information twice. Unlike the manifest, the internal manifest is not meant for serialization.

   Election phase

      Time period during the election when voting is open, either directly or via delegation.

   Encryption key

      An `ElGamal`_ public key associated to an account which is used to encrypt all :term:`shielded amounts<shielded amount>` (:ref:`deprecated<shielded-balance-feature-deprecation>`) on the account.

   Endpoint

      A point at which an API -- the code that allows two software programs to communicate with each other -- connects with the software program. APIs work by sending requests for information from a web application or web server and receiving a response.

   Entrypoint

      An invocable function of the smart contract that usually takes arguments. Each entrypoint has specific arguments. Entrypoints can be invoked to update the state of the smart contract as well as to view information about different parts of contract state.

   Epoch

      A time period that is approximately one hour on testnet and mainnet. At the start of each epoch, a :term:`leadership election nonce<leader election>` is computed based on the block nonces of the previous epoch. The leadership election nonce is valid for the duration of the epoch. Each epoch has a nominal ending, and when a block is finalized after this nominal ending then epoch transition occurs.

   Final block

      A block is considered final when it cannot be rolled back anymore. When blocks on a common chain in two consecutive rounds have quorum certificates, the block in the first of these rounds (together with its ancestors) is considered final. A block is final at a minimum of two seconds after its creation. A new block has to be created descended from that block for the new block to be final.

   GAS

      A transaction fee paid in CCD for executing operations on the Concordium blockchain. GAS is calculated based on ENERGY (NRG) consumption, which measures computational resources required, converted to CCD using a stable EUR-pegged pricing mechanism. This ensures transaction costs remain predictable in EUR terms despite CCD price fluctuations.

   Genesis Block

      The first :term:`block` in a :term:`chain`. The genesis block establishes the starting state of the chain, before any transactions have occurred.

   Governance committee member

      Individual elected to the Concordium governance committee. Also known as member or committee member.

   Guardian

      One of a number of independent, trustworthy individuals who serve guardians in the election. All guardians must participate in a key ceremony to create a key to encrypt the election and may participate in the accompanying tally ceremony(s) to decrypt the tally(s). A guardian is available if they are available for the tally ceremony. A guardian is missing if they cannot attend the tally ceremony.

   Identity

      Before opening an account on the Concordium Platform, one's real-world identity must be verified and recorded by an :term:`identity provider`. A user’s identity is encrypted on-chain, however their real-world identity can be disclosed in response to a valid request from a government authority.

   Identity Issuer

      See :term:`identity provider`.

   Identity Object

      An object issued by the :term:`identity provider` to the user which allows the user to prove to third parties that their real life identity has been verified by a trusted third party.

   Identity Provider

      A person or organization that performs off-chain identification of users. Users are required to obtain an identity object from an identity provider in order to open an account on the Concordium Platform.

   Initial Account

      An intial account is an account submitted to the chain by the identity provider during the process of requesting a new identity. The initial account can perform all of the same actions as a regular account, however the real-life identity of the initial-account owner is known by the identity provider who submitted it to the chain. In contrast, the real-life identity of the owner of a regular account can only be ascertained by the identity disclosure authority working in concert with the identity provider.

      Initial accounts are only relevant for Desktop Wallet.

   Initialize

      Action that creates a new smart contract instance with the initial state. The only way to update the instance state is by invoking the instance’s entrypoints.

   Instance

      A smart contract module together with a specific state and an amount of CCD tokens. Multiple smart contract instances can be created from the same module. Smart contract instances can be created from a deployed :ref:`smart contract module<contract-module>` via the ``init`` transaction which invokes the requested function in the smart contract module. This function can take a parameter. Its end result is the state of the smart contract instance.

   Invoke

      Invoke means to call something into effect.

      Invoke is also the act of triggering a receive function in a smart contract from ``concordium-client`` and viewing its return value. Invoking an instance is not a transaction and it does not change the state of a contract. Invoking can be useful to either view information about the instance or to test a receive method before running an update. Because invoking is not a transaction, there is no fee to run invoke. Click :ref:`here to see examples of how to use invoke to view information about the instance<nft-view-fn>`.

   Issuer

      Party that issues Web3 ID credentials to users. May also revoke Web3 ID credentials.

   Leader Election

      In every round a leader is elected among the validators to produce a new block. The leader is chosen by hashing a leader election nonce and the round number, and interpreting the hash as a random number that picks a validator with probability equal to their relative stake. A new leader election nonce is generated every :term:`epoch` by hashing block nonces from the previous epoch. So the sequence of leaders for every epoch is determined at the beginning of the epoch when the leader election nonce is fixed.

      The :term:`winning probability` is proportional to the validator's relative stake.

      See :term:`lottery power`.

   Lottery Power

      A validator's lottery power is its relative stake and is therefore proportional to the :term:`staked amount` of that validator. The lottery power is updated each :term:`pay day`, and is based on the stake distribution at the end of the epoch before last. (This delay ensures that the stake distribution is determined before the randomness that fixes the validators for the epoch; otherwise, stakeholders might redistribute their stake to luckier validators, which undermines the security of the system.) :term:`Delegation<delegator>` affects the lottery power of the validator by increasing their stake, thus increasing the odds of that validator being chosen to produce a block.

   Mainnet

      The main Concordium network which launched in June 2021. The mainnet will receive periodic upgrades, but in contrast to the :term:`testnet`, it will never be reset, and accounts created on the mainnet will remain indefinitely.

   Membership proof

      A proof to determine if an attribute of a user's identity is included in a given set, for example, lives in the EU. Can also be a :term:`non-membership proof`.

   Node

      A participant in the Concordium network. Nodes receive blocks and transactions, and track the current state of the blockchain. A :term:`validator node<baker>` has cryptographic keys that enable it to take part in validation. A node without these keys is referred to as a *passive node*.

   Nominee

      Someone who has volunteered to be a candidate in an election.

   Nonce

      May refer to:

      -  *Block Nonce*: a randomized value included by the :term:`validator` in each :term:`block`, and used to determine the leadership election nonce.
      -  *Leadership Election Nonce*: a randomized value that is updated each :term:`epoch<epoch>` that is used to seed the :term:`leader election` process.
      -  :term:`Transaction sequence number` (same as account sequence number)

   Non-membership proof

      A proof to determine that an attribute of a user's identity is **not** included in a set, for example, that they are **not** a resident of a country under trade sanctions.

   Off-chain

      Refers to activities outside of the Concordium blockchain. Some on-chain actions need preliminary actions off-chain, for example to create an account on the Concordium blockchain the user must first work with an identity provider, e.g., via their website or mobile application, to obtain a specific digital certificate. Concordium refers to this certificate as the **identity**.

   On-chain

      Refers to an an event or activity that is propagated through the Concordium network and recorded on the Concordium blockchain. The recording can be explicit or implicit as part of the consensus protocol. An example of the former is a transaction such as a CCD transfer, an example of the latter are the rewards given out to, e.g., validators.

   Pay day

      A pay day is the point at which new CCDs are minted and rewards to validators and delegators are distributed. The stakes of validators and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when new validators begin validation and updates to delegation and validation take effect, such as increasing stake, restaking preferences, adding delegation. In the case of decreasing stake or removing delegation or validation, there is a longer cool-down period, after which the change is executed at the **next pay day after the cool-down period ends**. The cool-down period is 3 weeks. Pay day is every 24 hours (i.e., 24 epochs) at approximately 09:00 UTC on Mainnet and approximately 12:00 UTC on Testnet. The list of lottery winners that are elected to be the leader for every round in that epoch is established at the beginning of the epoch.

   Passive delegation

      A form of delegation where a delegator's stake is effectively distributed among all staking pools. It is not associated with a specific validator. Delegators earn lower rewards when delegating to passive delegation than when delegating to a specific staking pool. However, passive delegation is not affected by poor performance of a single validator.

   Private keys

      A random, secret string that is used in cryptography and cryptocurrency to prove ownership of an account and sign transactions to send, spend, delegate, and stake CCDs. A wallet consists of a set of public addresses and private keys. Anyone can deposit cryptocurrency in a public address, but funds cannot be removed from an address without the corresponding private key.

   Proof-of-stake

      A consensus mechanism where validators must stake (lock) CCD tokens to participate in block production. The chance of being selected to produce a block is proportional to the amount staked.

   Qualified authority

      A governmental body that has the authority to act in a relevant jurisdiction. For example, a local police force, a local court or an investigatory division of a local authority that regulates financial conduct may have authority to act in their relevant jurisdictions. These authorities are qualified to begin the process of disclosing the identity of a user when they proceed through established legal channels and make a formal request. The outcome of such a request is likely to be that a qualified authority obtains an official order, which may be in the form of a warrant, court order, or similar instrument. Only after a qualified authority validly serves an official order upon the relevant :term:`identity disclosure authorities<identity disclosure authority>` and :term:`identity provider`, can the real-world identity of a user be revealed and only to the extent set out in the order.

   Quorum certificate

      When the validators sign the block, their collective signatures are aggregated to form a quorum certificate. This quorum certificate is then included in the next block. If the round leader fails to produce a block in the :term:`round`, or not enough signatures were gathered for a quorum certificate, then the validators will instead send timeout messages, which are aggregated to form a :term:`timeout certificate`. Each block either contains a quorum certificate or a timeout certificate for the previous round. A block always contains a quorum certificate as it serves as a reference to the parent block. The block might contain a timeout certificate if the previous round timed out. A quorum certificate or a timeout certificate ensures that the protocol progresses. When a node sees a valid quorum certificate or timeout certificate it progresses to the next round.

   Range proofs

      A range proof asks a user to prove that they meet an attribute within a range of values. For example, when renting a car, you might need to prove that you are between 25 and 65 years old to the car rental company. This could be constructed as a range proof.

   Reveal

      To reveal an attribute. This can be used in identity verification proof. When you reveal an attribute, you give the dApp or service that requested it your exact information, such as date of birth, or nationality. You should only do this if you have **absolute trust** in them, and if you are familiar with their data usage and protection procedures.

   Round

      Replaces slots in the Concordium BFT protocol. In each round, a predetermined leader among the validators should produce a block. Round leaders are determined each epoch, defined as a fixed time duration. Rounds are an index to a block or timeout. In every round, each validator checks locally whether they won the lottery, which entitles the winner to produce a block in that round. Zero, one, or multiple validators can win the lottery. The probability of these different events is controlled by the difficulty parameter *f*. For example, with difficulty 0.5 on average every second round will have a lottery winner.

   Rust

      The multi-paradigm, general purpose programming language used by Concordium smart contracts.

   Schema

      Used for smart contracts. A description of how to represent bytes in a more structured representation. It can be used by external tools when displaying the return value of a receive function and for specifying parameters using a structured representation, such as JSON. This makes it more human readable.

   Seed phrase

      A group of random words generated by the wallet that allows you to access the CCDs stored in it across devices or in case of non-functioning devices. Seed phrase is supported by |cryptox|.

   Secret recovery phrase

      Previously used term for seed phrase.

   Setup phase

      Time period prior to election start where setup of necessary election components occurs, candidates are nominated, guardians are selected, etc.

   Shielded amount

      (:ref:`deprecated<shielded-balance-feature-deprecation>`):

      An amount of :term:`CCD` that is encrypted with the public key of an account. Only the owner of the secret key can determine how many CCDs are contained in the encryption.

   Shielded balance

      (:ref:`deprecated<shielded-balance-feature-deprecation>`):

      The part of the balance of an :term:`account` that only the owner of the account can see. This is achieved by encrypting transfers to an account with the account's :term:`encryption key`. Every participant of the Concordium network can see the `ciphertexts`_ of all the transfers, however they provide no information on how many CCDs were transferred. The receiver of the transfer can use their secret key to decrypt the ciphertexts, and seeing how many CCDs they have received.

      For technical reasons the shielded balance of the account consists of two parts, the "self balance" and the "incoming shielded amounts".

      - Self balance: This is a single shielded amount that is updated each time the account performs a shielded transfer, :term:`shielding`, or :term:`unshielding`. Only the account itself can update this value.

      - Incoming shielded amount: This is a list of shielded amounts that is extended each time an account receives an shielded transfer. When the account makes a shielded transfer it can use a number of shielded amounts from this list as inputs to the transfer.

   Shielded transfer

      (:ref:`deprecated<shielded-balance-feature-deprecation>`):

      Transfer from :term:`shielded balance` of an account to a shielded balance of another account. The amount that is transferred is only visible to the sender and the receiver.

   Shielding

      (:ref:`Deprecated<shielded-balance-feature-deprecation>`):

      The action of transferring a part of the public balance to the :term:`shielded balance`.

   Slot

      See :term:`round`.

   Smart contract

      A computer program or a transaction protocol that is intended to automatically execute, control or document events and actions according to the terms of a contract or an agreement. An example is a smart contract for selling NFTs on a marketplace; it may contain information about royalties, selling the NFT on to others, and so on.

   Staked Amount

      :term:`Validators<validator>` can have part of the balance of their account staked. The amount that is staked remains locked while staked and cannot be transferred or moved in any way. The staked amount is proportional to the :term:`lottery power` of a validator.

      :term:`Delegators<delegator>` can delegate stake to a staking pool or passive delegation. This affects the staked amount of the validator and thus their lottery power.

   Staking pool

      A validator and delegators that collectively pool their stake to participate in the consensus protocol and earn rewards. The validator runs a validator node on behalf of the staking pool to produce blocks using the collective stake of the pool to determine its lottery power. Rewards are accrued to the pool each time the validator produces a block. Each pay day, the accrued rewards are distributed to the pool's participants in proportion to their relative stakes in the pool, with the validator (the pool owner) receiving an additional commission from the delegators' rewards.

   Statement

      A list presented to a wallet by a dApp or service whose items are either attributes to reveal, or properties of attributes to prove.

   Suspension

      A state where a validator is temporarily excluded from block production due to prolonged inactivity. The suspension threshold varies based on the validator's stake size and remains in effect for at least one epoch until manually resumed.

   Tally

      Tally (noun) is the number of votes obtained by every candidate computed by summing all weighted votes for every candidate. Also, tally (verb) is the process of calculating the number of votes.

   Tally ceremony

      The process of decrypting the encrypted tally to the decrypted tally. The guardians from the key ceremony who are available attend this ceremony. There must be at least enough guardians to meet the quorum. Each guardian will decrypt their decryption shares and their share for each missing guardian. These shares will then be combined to create the decrypted spoiled ballots and decrypted tally.

      The tally ceremony is a part of the tally phase.

   Tally phase

      Time period after the election where voting is closed and guardians decrypt their share of the tally (tally ceremony is held) and the final election result is produced and registered.

   Testnet

      A test network run by Concordium to test its protocols and software. There can be several test networks in existence at the same time. All the features are tested on the testnet before they are released on the :term:`mainnet`.

   Timeout certificate

      If the leader fails to produce a block in the round, or not enough signatures were gathered for a quorum certificate, then the finalizers will instead send timeout messages, which are aggregated to form a timeout certificate. A block always contains a quorum certificate as it serves as a reference to the parent block. The block might contain a timeout certificate if the previous round timed out. A quorum certificate or a timeout certificate ensures that the protocol progresses. When a node sees a valid quorum certificate or timeout certificate it progresses to the next round.

   Total effective stake

      The total amount of stake in staking pools excluding passive delegation and any amount that exceeds the :ref:`staking pool bounding caps<delegation-caps>`.

   Transaction

      An atomic operation that defines a change of state in the ledger, such as transferring funds from one account to another. A transaction typically has a sender account and a :term:`transaction sequence number`, and incurs a fee. The sender account must sign the transaction to authorize it. (The exception to this is a credential deployment transaction that creates a new account, which does not have a sender account.)

   Transaction fee commission

      Determines the percentage of transaction fees a validator keep when delegators' stakes contribute to validating transactions. Lower percentages can attract more delegators but reduce the validator's earnings per transaction.

   Transfer Memo

      Additional data that a user can provide when making a transfer, or a transfer with schedule. The data will appear on chain as a bytestring. It is expected to be CBOR encoded and can therefore represent strings, numbers and JSON values, but this is not enforced.

   Transfer with schedule

      A special kind of transfer of CCD that makes the CCD amount available to the receiver only in a limited way until a specified point in time. The point in time is specified as part of a transfer. The CCD are immediately owned by the receiver account, and the transfer cannot be revoked, but the receiver cannot spend the CCD until the specified time.

   Transaction Sequence Number

      A sequence number that orders :term:`transaction` on a given :term:`account`. In a ledger, all transactions for an account must be ordered with consecutive transaction sequence numbers, starting from 1. Transaction sequence numbers ensure that a transaction cannot be repeated in the ledger, and that the transactions occur in the order intended by the sender account holder.

   Unshielding

      (:ref:`Deprecated<shielded-balance-feature-deprecation>`):

      The action of transferring a part of the :term:`shielded balance` to the public balance.

   User identity certificate

      Issued to the individual or entity once their real-world identity has been verified and recorded by an Identity Provider. You cannot use the Concordium Platform without a User Identity Certificate.
      The user identity certificate includes attributes such as name, age, and nationality. When the Identity Provider has validated the attributes, it issues a user identity certificate, which is basically the Identity Provider’s signature over some cryptographic keys of the user and the validated personal attributes. Unlike usual public key certificates such as X.509 certificates, the user identity certificate is private to the user; it is not submitted to the chain. Note that the Identity Provider also stores some information, but this is only used for a possible, subsequent investigation of the user’s activities (i.e. disclosing an identity). The Identity Provider is not involved in any subsequent use of the user identity certificate. The user identity certificate is signed using the Pointcheval-Sanders signature scheme.

   Validation

      The process of production of :term:`blocks<block>` done by validators. Validation makes the block part of the authoritative :term:`chain`. Transactions that are part of validated blocks are considered authoritative. Validation is conducted by the validators with a staked amount of at least 0.1% of the :term:`total effective stake` in staking pools. Total effective stake in staking pools does not include passive delegation and any amount that exceeds the :ref:`staking pool bounding caps<delegation-caps>`.

   Validator

      A node that participates in the production of :term:`blocks<block>`, referred to as *validation*.

   Verifiable credential

      Issued to the individual by an :term:`issuer` who has authority for the credential to be issued. A verifiable credential contains some information about the individual independent of its identity, such as membership in a club or loyalty program, education, and more. Verifiable credentials can be checked by a :term:`verifier` using :term:`zero-knowledge proofs<zero-knowledge proof>`. The issuer can choose to have the verifiable credential expire, or revoke it, if necessary. The issuer manages the verifiable credentials with a smart contract, a credential registry contract.

   Verifiable presentation

      Data derived from one or more verifiable credentials and/or account credentials, issued by one or more issuers or identity providers, that is shared with a specific verifier. A verifiable presentation is tamper-evident and encoded in such a way that authorship of the data can be trusted after a process of cryptographic verification. It contains a link that points to the contract and holder ID. A presentation that contains a **zero-knowledge proof** might contain data that confirms the truth of a statement from verifiable credentials or account credentials, but the presentation does not reveal the actual attributes of verifiable credentials.

   Verifier

      Party that checks users' :term:`verifiable credentials<verifiable credential>`.

   Vote delegation

      Method whereby a user can add account weight of their account to another account that will cast the ballot. This is used by users of Desktop Wallet to cast ballots in the 2024 election.

      For delegation related to earning rewards on an account, see :term:`delegator`.

   Wallet

      A wallet is an app that allows cryptocurrency users to store and retrieve their digital assets, and manage identities and accounts. Concordium has three wallet types.

      - The Desktop Wallet: a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts from your desktop and to create transactions such as sending CCD, adding a validator, and exporting and importing account information.

      - |cryptox|: a digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple transactions, be a validator and delegate, and to export and import your accounts and identities.

      - The |bw|: a web browser extension wallet that enables you to create and manage your Concordium identities and accounts, to create simple transactions, and to connect to dApps.

   Web3 ID

      Web3 ID is an extension of the core protocol identity with other types of credentials that don’t have stringent requirements and won't be part of the identity disclosure process, but can also witness a number of other attributes of the holder. Examples of this would be club membership credentials, reward programs, etc. There are no requirements imposed on who can be an issuer of these credentials, and in contrast to protocol identities, the Web3 ID credentials can be revoked according to the logic imposed by the issuer. This could be that the credential holder can revoke it, the credential expires, or the issuer or some other third party has rights to revoke it.

   WebAssembly

      WebAssembly (Wasm) defines a portable binary-code format and a corresponding text format for executable programs as well as software interfaces for facilitating interactions between such programs and their host environment. Smart contracts are deployed on chain as Wasm files.

   Winning probability

      The winning probability is the probability that a validator wins in a given round. The probability is :math:`\alpha`, which equals the validator's relative stake.

   Zero-knowledge proof

      A method by which a user (the prover) can prove to another party (the verifier) that the user meets a requirement without revealing anything beyond that. Zero knowledge proofs generated by the wallet are non-interactive. They are verifiable forever in the future without further prover interaction.
