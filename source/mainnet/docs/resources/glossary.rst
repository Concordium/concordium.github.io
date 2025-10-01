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

      An addressable store of funds on the blockchain. An account is associated with one or more *account keys* that can be used to authorize transactions originating from the account, as well as with an :term:`encryption key`. An account is also associated with the account holder's :term:`identity`, although this association is encrypted. This identity can only be disclosed by :term:`privacy guardians<Privacy Guardian (PG)>`, in cooperation with the account's :term:`identity provider`.

   Account address

      Characters associated with an account that stores funds to access the account and perform transactions.

   Account credential

      A certificate derived from the :term:`identity object` that proves that the owner has been verified by an identity provider. The key feature of the credential is that it **does not** identify the owner to the identity provider, nor to any other single entity, however it contains enough information to allow disclosing an identity in concert with the identity provider to find the owner.

   Account private key

      Per account private key - 64 characters long hexadecimal string.

   Account weight

      The account weight of an account in an election is computed as the average amount of CCD on the account during the designated calculation period.

   Accumulated weight

      The weight of a vote is the weight assigned to that vote when tallying, i.e., the sum of all account weights that delegated to the account that cast the vote + the weight of the account that cast the vote (unless that account delegated its own weight to another account, but voted anyway).

   Alias

      A kind of sub-account structure that can be created. An account owner can create different aliases for different uses to keep track of transfers and assign them meaning. Each account has 16777216 addresses, namely a so-called canonical account address together with matching account aliases. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial 29 bytes are referred to as account aliases for the same account. Thus, accounts can be referred to by any address whose initial 29 bytes match.

   Allow list

      A configurable list for a :term:`Protocol-Level Token (PLT)` that, if enabled, specifies which accounts are permitted to perform token transfers. If an allow list is supported, both the sender and recipient accounts must be on the list for a token transfer to succeed. This list is administered by the nominated :term:`token-governance account`.

   Approval voting

      Approval voting is a single-winner electoral system in which the voter can choose or approve any number of candidates, effectively assigning a 0 or a 1 to every candidate. The winner is the single candidate approved by the largest number of voters. Approval voting can be achieved by setting the selection limit to the total number of options in a contest.

   Archive

      Action of hiding a verifiable credential from a wallet.

   Attributes

      User data, such as date of birth or country of residence, that is associated with a user :term:`identity`. Users can choose which attributes should be revealed in each of their accounts.

   Backup file

      A secure, portable data file containing wallet information, keys, and/or credentials that can be exported from a wallet application and later imported to restore access to blockchain assets. Backup files provide one method for disaster recovery and wallet migration.

   Block

      The basic unit of the blockchain, which is produced by a :term:`validator`. A block contains a (possibly empty) list of :term:`transactions<transaction>`, and has a pointer to a previous block (with the exception of the :term:`genesis block`). A block and its predecessors form a chain, and the sequence of transactions they contain form a ledger. Each block records when it was produced. A block also contains information relating to consensus, for instance establishing which validator created the block, and that the validator was entitled to do so.

   Block reward commission

      Sets the percentage of block rewards a validator retains when its pool successfully produces a block. Lower rates may attract more delegators, while higher rates increase your profit share from each block.

   BLS12-381

      An elliptic curve specifically designed for cryptographic applications requiring pairings, e.g., the BLS aggregate signature scheme or the Pointcheval-Sanders signature scheme. The latter can be used for blind signing and also allows for a simple proof of knowledge of a signature. BLS12-381 is a crucial component of privacy-based self-sovereign identity systems.

   Branch

      A chain of blocks that has split from the main chain. All branches have the potential to become the main chain. The Chain selection rule determines which branch is the best chain.

   Build

      Command to take a smart contract module written in Rust and create a Wasm module that can be deployed on chain. The command is run from :term:`cargo-concordium`.

   Bulletproof

      A type of efficient interactive proof system that enables various :term:`zero-knowledge proofs<zero-knowledge proof>`, including range-proofs, set-membership proofs, and
      set-non-membership proofs. The generated proofs have logarithmic size. They can be made non-interactive with the Fiat-Shamir transform.

   Burn

      A :term:`token-governance operation` that destroys a specified amount of tokens from an account, thereby decreasing the total circulating supply of the :term:`PLT<Protocol-level token (PLT)>` and the balance of the originating account. This operation can only be performed by the :term:`token-governance account`. For a burn operation to succeed, the token-governance account must have a sufficient balance, the PLT must not be paused, and the PLT's configuration must support burning.

   Candidate

      Option on the official list of candidates for the election.

   cargo-concordium

      The Concordium smart contract building and testing tool. An extension of Rust's ``cargo`` tool. It can be used for compiling and testing smart contracts, and enables features such as building contract schemas.

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

      Block explorer tool for the Concordium blockchain. CCDScan effectively serves as a search engine for data on the Concordium blockchain and enables users to search for, explore, and analyze relevant on-chain data. Often used to research validators and pools before deciding to delegate funds to a particular pool.

   Chain

      A sequence of :term:`blocks<block>`, starting from the :term:`genesis block`, in which each successive block points to the predecessor. There may be multiple valid chains, and the :term:`consensus` protocol establishes which chain is authoritative.

   Chain-governance operation

      An operation that can affect the entire chain, and is authorized by the chain governance keys. Chain-governance operations include updating chain parameters, protocol updates, and creating new :term:`PLTs<Protocol-level token (PLT)>`.

   Chain selection rule

      A rule that selects the best chain based on the following criteria:

      - chain with the most final blocks
      - longest chain
      - which last block has the earliest slot in the chains
      - which last block has the largest block luck in the chains
      - which last block has the largest hash in the chains.

   Challenge

      To make sure that :term:`zero-knowledge proofs<zero-knowledge proof>` cannot be reused (e.g., if they are stolen), the verifier can and should specify a challenge string. This can be an arbitrary byte array which is used by the prover (wallet) when producing the proof. The proof will only validate with respect to the challenge that was used to produce it. The verifier server can thus use the challenge to make sure the proofs it is receiving are not reused, and to handle their lifetime (e.g., it can set the challenge it supplied to expire in 5 minutes).

   Combined decryption share

      The combination of all decryption shares, allows to fully decrypt a tallied result.

   Concordium Byzantine Fault Tolerance (BFT) protocol

      The consensus protocol for the blockchain. The protocol offers high transaction throughput and lower confirmation time because a block can be produced as soon as the previous block has been signed. The protocol proceeds by rounds. In each round, a predetermined leader among the validators should produce a block. The other validators then sign this block, and their collective signatures are aggregated to form a quorum certificate (QC). This quorum certificate is then included in the next block. If the leader fails to produce a block in the round, or not enough signatures were gathered for a QC, then the validators will instead send timeout messages, which are aggregated to form a timeout certificate (TC). Each block always contains a quorum certificate and may contain a timeout certificate for the previous round if and only if the previous round timed out. When blocks on a common chain in two consecutive rounds have quorum certificates, the block in the first of these rounds (together with its ancestors) is considered final. At this point, the protocol ensures that it cannot be rolled back. The two consecutive blocks must also be within the same epoch.

   Concordium Client

      The Concordium command line tool. It is designed as a low-level interface to the Concordium blockchain. It cannot be used to create identities, but it can :ref:`import accounts<concordium-client-import-accounts-keys>` exported from the |bw|. Once an account has been imported, Concordium Client can be used to do CCD transfers from the account and other :ref:`transaction<transactions>` types supported by the Concordium blockchain.

   Concordium ID

      The protocol-level identity system on Concordium. All users must obtain a Concordium ID through identity verification with an approved identity provider before they can create and use accounts on the blockchain.

   Consensus

      The process by which nodes agree which :term:`transactions<transaction>` have occurred and in what order. This consists of :term:`validation<validation>`.

   Contract address

      Address of the smart contract; made up of contract index and subindex.

   Contract index

      Used when adding and managing tokens in the wallet.

   Contract initialization

      The act of initializing a smart contract on the chain.

   Contract subindex

      Not used in any user facing context. Always 0.

   Cool-down period

      A period of time during which a transaction is frozen. Examples of when cool-down periods apply include removing a validator and updating stake. The length of a cool-down period varies between transactions.

   Credential holder

      User holding one or more credentials. The role usually involves the ability to generate presentations from the credentials or zero-knowledge proofs about their attributes.

   Credential registry contract

      A contract used by issuers of verifiable credentials to register credentials when they are issued. This contract will also be used to track the state of a credential.

   dApp connectivity

      The ability of a wallet to interact with decentralized applications, dApps, on the blockchain. This allows users to access various services and platforms built on blockchain technology, such as DeFi, NFTs, and gaming.

   Decryption proof

      A proof that a decrypted plain text is correct with respect to a given joint election public key.

   Decryption share

      A partial decryption by a single guardian that will contribute to the full decryption.

   Delegated weight

      Sum of account weights that delegated to an account. Delegated weight is made up of the account weight of each account that delegated a vote to the account that cast a ballot.

   Delegation

      The act of contributing part of one's stake to a staking pool or to passive delegation.

   Delegator

      An account that contributes to a staking pool, or to passive delegation. When an account becomes a delegator, the delegated amount of CCD is locked so that it cannot be spent or transferred while it is delegated. Delegators earn rewards, minus a commission to the validator, in proportion to their delegated stake.

      For delegation in an election, see :term:`Vote delegation`.

   Deny list

      A configurable list for a :term:`Protocol-Level Token (PLT)` that, if enabled, specifies which accounts are not permitted to perform token transfers. If a deny list is supported, neither the sender nor the recipient account may be on the list for a token transfer to succeed. This list is administered by the nominated :term:`token-governance account`.

   Deploy

      Command that takes the built :term:`Wasm<webassembly>` file for a smart contract module and deploys it on chain. This command is run from :term:`Concordium client`.

   Earn

      To receive rewards on one's stake.

   Election manifest

      The manifest is the information that uniquely specifies and describes the structure and type of the election, including geopolitical units, contests, candidates, ballot styles, etc. In In ElectionGuard, it is a file that is created before running an election. The internal manifest is a wrapper around the manifest used in programming code to simplify and avoid processing the same information twice. Unlike the manifest, the internal manifest is not meant for serialization.

   Election phase

      Time period during the election when voting is open, either directly or via delegation.

   Encryption key

      An `ElGamal`_ public key associated to an account.

   Entrypoint

      An invocable function of the smart contract that usually takes arguments. Each entrypoint has specific arguments. Entrypoints can be invoked to update the state of the smart contract as well as to view information about different parts of contract state.

   Epoch

      A time period that is approximately one hour on testnet and mainnet. At the start of each epoch, a :term:`leadership election nonce<leader election>` is computed based on the block nonces of the previous epoch. The leadership election nonce is valid for the duration of the epoch. Each epoch has a nominal ending, and when a block is finalized after this nominal ending then epoch transition occurs.

   Final block

      A block is considered final when it cannot be rolled back anymore. When blocks on a common chain in two consecutive rounds have quorum certificates, the block in the first of these rounds (together with its ancestors) is considered final. A block is final at a minimum of two seconds after its creation. A new block has to be created descended from that block for the new block to be final.

   Gas

      A transaction fee paid in CCD for executing operations on the Concordium blockchain. Gas is calculated based on ENERGY (NRG) consumption, which measures computational resources required, converted to CCD using a stable EUR-pegged pricing mechanism. This ensures transaction costs remain predictable in EUR terms despite CCD price fluctuations.

   Genesis Block

      The first :term:`block` in a :term:`chain`. The genesis block establishes the starting state of the chain, before any transactions have occurred.

   Governance committee member

      Individual elected to the Concordium governance committee. Also known as member or committee member.

   Guardian

      One of a number of independent, trustworthy individuals who serve guardians in the election. All guardians must participate in a key ceremony to create a key to encrypt the election and may participate in the accompanying tally ceremony(s) to decrypt the tally(s). A guardian is available if they are available for the tally ceremony. A guardian is missing if they cannot attend the tally ceremony.

   Guardian encrypted share

      An encrypted version of a guardian share. Can be decrypted using the recipients guardian secret key. Can be computed using the dealer's guardian secret key (to get the guardian share) and the recipients guardian public key.

   Guardian joint election public key

      The joint public key of all guardians. It is used to encrypt ballots in the election. It can be computed from all guardian public keys.

   Guardian joint election secret key

      The secret key corresponding to the joint election public key. Is never used directly (for privacy reasons).

   Guardian joint election secret key share

      A share of the joint election secret key. Can be computed by the guardian from their guardian encrypted share and their guardian secret key.

   Guardian public key

      The public key of a guardian. It essentially consists of the coefficient commitments, and coefficient proofs of the corresponding secret key. In the specs the 0-th commitment is also called the public key.

   Guardian secret key

      The initial secret key generated by a guardian during key generation. It consists of the secret coefficients, the coefficient commitments, and the coefficient proof. In the specs the 0-th coefficient is also called the secret key.

   Guardian share

      A share of a guardian secret key. Can be computed from the coefficients of the secret key. A share is always associated with a dealer and a recipient.

   Identity

      Before opening an account on the Concordium platform, one's real-world identity must be verified and recorded by an :term:`identity provider`. A user’s identity is encrypted on-chain, however their real-world identity can be disclosed in response to a valid request from a government authority.

   Identity credential

      An Identity credential contains attributes on a user’s identity and is used to open accounts on-chain. It is issued by IDPs during user onboarding based on identity documents (e.g. passports). It is stored in both the user’s wallet and IDP’s database, but never accessible to Concordium. Users can share verified attributes using zero-knowledge proofs without revealing the underlying data.

   Identity disclosure

      When an authority suspects suspicious behaviour and wants to open an investigation, a process can be followed with multiple stakeholders (authorities, IDPs and privacy guardians) to disclose the identity of the user of a given account or the finding of all accounts of a given user.

   Identity Object

      An object issued by the :term:`identity provider` to the user which allows the user to prove to third parties that their real life identity has been verified by a trusted third party.

   Identity Provider

      A person or organization that performs off-chain identification of users. Users are required to obtain an identity object from an identity provider in order to open an account on the Concordium platform.

   Identity record

      The record on the account holder stored at the IDP after having issued an identity credential to the account holder.

   Initial account

      An initial account is an account submitted to the chain by the identity provider during the process of requesting a new identity. The initial account can perform all of the same actions as a regular account, however the real-life identity of the initial-account owner is known by the identity provider who submitted it to the chain. In contrast, the real-life identity of the owner of a regular account can only be ascertained by the :term:`Privacy Guardians<Privacy Guardian (PG)>` in concert with the identity provider.

      Initial accounts are only relevant for Desktop Wallet.

   Initial supply

      An optional amount of tokens that can be minted to the nominated :term:`token-governance account` when a new :term:`Protocol-Level Token (PLT)` is initially created as part of a :term:`chain-governance operation`.

   Initialize

      Action that creates a new smart contract instance with the initial state. The only way to update the instance state is by invoking the instance’s entrypoints.

   Instance

      A smart contract module together with a specific state and an amount of CCD tokens. Multiple smart contract instances can be created from the same module. Smart contract instances can be created from a deployed :ref:`smart contract module<contract-module>` via the ``init`` transaction which invokes the requested function in the smart contract module. This function can take a parameter. Its end result is the state of the smart contract instance.

   Invoke

      Invoke means to call something into effect.

      Invoke is also the act of triggering a receive function in a smart contract from ``concordium-client`` and viewing its return value. Invoking an instance is not a transaction and it does not change the state of a contract. Invoking can be useful to either view information about the instance or to test a receive method before running an update. Because invoking is not a transaction, there is no fee to run invoke. Click :ref:`here to see examples of how to use invoke to view information about the instance<nft-view-fn>`.

   Issuer

      Party that issues Web3 ID credentials to users.

   KYB

      Know Your Business - regulatory processes used to verify the identity and legitimacy of business entities, including their ownership structure, business activities, and compliance status.

   KYC

      Know Your Customer - regulatory processes used by financial institutions and other businesses to verify the identity of their customers, helping prevent money laundering, fraud, and other financial crimes.

   Leader Election

      In every round a leader is elected among the validators to produce a new block. The leader is chosen by hashing a leader election nonce and the round number, and interpreting the hash as a random number that picks a validator with probability equal to their relative stake. A new leader election nonce is generated every :term:`epoch` by hashing block nonces from the previous epoch. So the sequence of leaders for every epoch is determined at the beginning of the epoch when the leader election nonce is fixed.

      The :term:`winning probability` is proportional to the validator's relative stake.

      See :term:`lottery power`.

   Linking key

      The linking key allows finding all accounts of a given account holder. This identifier is stored in encrypted form in the identity record of an account holder.

   Lottery Power

      A validator's lottery power is its relative stake and is therefore proportional to the staked amount of that validator. The lottery power is updated each :term:`pay day`, and is based on the stake distribution at the end of the epoch before last. (This delay ensures that the stake distribution is determined before the randomness that fixes the validators for the epoch; otherwise, stakeholders might redistribute their stake to luckier validators, which undermines the security of the system.) :term:`Delegation<delegator>` affects the lottery power of the validator by increasing their stake, thus increasing the odds of that validator being chosen to produce a block.

   Mainnet

      The main Concordium network which launched in June 2021. The mainnet will receive periodic upgrades, but in contrast to the :term:`testnet`, it will never be reset, and accounts created on the mainnet will remain indefinitely.

   Member/Comitte member/Governance committee member

      Individual elected to the Concordium governance committee.

   Membership proof

      A proof to determine if an attribute of a user's identity is included in a given set, for example, lives in the EU. Can also be a :term:`non-membership proof`.

   Mint

      A :term:`token-governance operation` that creates new tokens, increasing both the total circulating supply of the :term:`Protocol-Level Token (PLT)` and the balance of the originating account. This operation can only be performed by the :term:`token-governance account`, and the newly minted amount is added to this account.

   Node

      A participant in the Concordium network. Nodes receive blocks and transactions, and track the current state of the blockchain. A validator node has cryptographic keys that enable it to take part in validation. A node without these keys is referred to as a *passive node*.

   Nominee

      Someone who has volunteered to be a candidate in an election.

   Non-membership proof

      A proof to determine that an attribute of a user's identity is **not** included in a set, for example, that they are **not** a resident of a country under trade sanctions.

   Nonce

      May refer to:

      -  *Block Nonce*: a randomized value included by the :term:`validator` in each :term:`block`, and used to determine the leadership election nonce.
      -  *Leadership Election Nonce*: a randomized value that is updated each :term:`epoch<epoch>` that is used to seed the :term:`leader election` process.
      -  :term:`Transaction sequence number` (same as account sequence number)

   Off-chain

      Refers to activities outside of the Concordium blockchain. Some on-chain actions need preliminary actions off-chain, for example to create an account on the Concordium blockchain the user must first work with an identity provider, e.g., via their website or mobile application, to obtain a specific digital certificate. Concordium refers to this certificate as the **identity**.

   On-chain

      Refers to an an event or activity that is propagated through the Concordium network and recorded on the Concordium blockchain. The recording can be explicit or implicit as part of the consensus protocol. An example of the former is a transaction such as a CCD transfer, an example of the latter are the rewards given out to, e.g., validators.

   Passive delegation

      A form of delegation where a delegator's stake is effectively distributed among all staking pools. It is not associated with a specific validator. Delegators earn lower rewards when delegating to passive delegation than when delegating to a specific staking pool. However, passive delegation is not affected by poor performance of a single validator.

   Pause/unpause

     :term:`Token-governance operations<token-governance operation>` that suspend (pause) or resume (unpause) all balance-changing activities for a :term:`Protocol-Level Token (PLT)`, including transfers, minting, and burning. While a PLT is paused, any attempts to perform these operations will fail. These operations can only be performed by the :term:`token-governance account`.

   Pay day

      A pay day is the point at which new CCDs are minted and rewards to validators and delegators are distributed. The stakes of validators and delegators are updated each pay day (but the changes for each pay day are fixed one epoch before). Pay day is thus when new validators begin validation and updates to delegation and validation take effect, such as increasing stake, restaking preferences, and adding delegation. In the case of decreasing stake or removing delegation or validation, there is a longer cool-down period, after which the change is executed at the **next pay day after the cool-down period ends**. The cool-down period is 3 weeks. Pay day is every 24 hours (i.e., 24 epochs) at approximately 09:00 UTC on Mainnet and approximately 12:00 UTC on Testnet. The list of lottery winners that are elected to be the leader for every round in that epoch is established at the beginning of the epoch.


   Privacy guardian (PG)

      Authorized entity participating in Concordium's identity disclosure process when legally required. PGs hold cryptographic keys that enable them to decrypt partial shares of encrypted identity information. Multiple PGs must collaborate to reconstruct complete identity data - a minimum threshold (minimum two out of three) of PGs must provide their decryption shares before the Authority can access the full information needed to connect accounts to identities.

   Privacy guardian private key

      Decryption key held by a privacy guardian.

   Privacy guardian public key

      Encryption key for a given privacy guardian. This key is public and available on-chain.

   Private key

      A random, secret string that is used in cryptography and cryptocurrency to prove ownership of an account and sign transactions to send, spend, delegate, and stake CCDs. A wallet consists of a set of public addresses and private keys. Anyone can deposit cryptocurrency in a public address, but funds cannot be removed from an address without the corresponding private key.

   Produce blocks

      The process of producing blocks performed by validators.

   Proof-of-stake

      A consensus mechanism where validators must stake (lock) CCD tokens to participate in block production. The chance of being selected to produce a block is proportional to the amount staked.

   proof-of-work

     A consensus mechanism where validators (miners) compete to solve complex cryptographic puzzles that require significant computational power. The first to solve the puzzle earns the right to produce the next block and receive the associated rewards.

   Protocol-level token (PLT)

      A feature that provides chain-native support for tokens other than CCD, implemented directly within the Concordium protocol without depending on smart contracts for their functionality. PLTs aim to enhance security, efficiency, and flexibility in token management by embedding core functionalities like creation, governance, and user operations directly at the protocol level. Each PLT is assigned a unique :term:`Token ID` upon creation.

   Qualified authority

      A governmental body that has the authority to act in a relevant jurisdiction. For example, a local police force, a local court or an investigatory division of a local authority that regulates financial conduct may have authority to act in their relevant jurisdictions. These authorities are qualified to begin the process of disclosing the identity of a user when they proceed through established legal channels and make a formal request. The outcome of such a request is likely to be that a qualified authority obtains an official order, which may be in the form of a warrant, court order, or similar instrument. Only after a qualified authority validly serves an official order upon the relevant :term:`Privacy Guardians<Privacy Guardian (PG)>` and :term:`identity provider`, can the real-world identity of a user be revealed and only to the extent set out in the order.

   Quorum certificate

      Aggregated signatures of the members of the finalization committee who signed this block forms a quorum certificate. The quorum certificate is included in the next block.  Each block either contains a quorum certificate or a timeout certificate for the previous round.

   Range proofs

      A range proof asks a user to prove that they meet an attribute within a range of values. For example, when renting a car, you might need to prove that you are between 25 and 65 years old to the car rental company. This could be constructed as a range proof.

   revoke

      Action of marking the credential as revoked in the credential registry contract.

   Round

      In each round, a predetermined leader among the validators should produce a block. Round leaders are determined each epoch, defined as a fixed time duration. Rounds are an index to a block or timeout. In every round, each validator checks locally whether they won the lottery, which entitles the winner to produce a block in that round.

   Rust

      The multi-paradigm, general purpose programming language used by Concordium smart contracts.

   Schema

      Used for smart contracts. A description of how to represent bytes in a more structured representation. It can be used by external tools when displaying the return value of a receive function and for specifying parameters using a structured representation, such as JSON. This makes it more human readable.

   Seed phrase

      Mnemonic word list preceding the Seed. A seed phrase consists of 24 words.

   Sigma protocols

      A class of efficient interactive :term:`zero-knowledge proof` systems that follow a three-round structure; commitment, challenge, and response. Sigma protocols enable a prover to demonstrate knowledge of secret information without revealing it. They can also be used for OR and AND statements, and can be made non-interactive with the Fiat-Shamir transform.

   Smart contract

      A computer program or a transaction protocol that is intended to automatically execute, control or document events and actions according to the terms of a contract or an agreement. An example is a smart contract for selling NFTs on a marketplace; it may contain information about royalties, selling the NFT on to others, and so on.

   Staking pool

      A validator and delegators that collectively pool their stake to participate in the consensus protocol and earn rewards. The validator runs a validator node on behalf of the staking pool to produce blocks using the collective stake of the pool to determine its lottery power. Rewards are accrued to the pool each time the validator produces a block. Each pay day, the accrued rewards are distributed to the pool's participants in proportion to their relative stakes in the pool, with the validator (the pool owner) receiving an additional commission from the delegators' rewards.

   Statement

      A list presented to a wallet by a dApp or service whose items are either attributes to reveal, or properties of attributes to prove.

   Suspension

      A state where a validator is temporarily excluded from block production due to prolonged inactivity. The suspension threshold varies based on the validator's stake size and remains in effect for at least one epoch until manually resumed.

   Sybil attack

      A form of network attack where a malicious actor creates multiple fake identities (nodes) to gain disproportionate influence over a decentralized network. In blockchain systems, Sybil attacks could allow attackers to disrupt consensus, manipulate transaction validation, or execute double-spending. Concordium's proof-of-stake mechanism prevents Sybil attacks by requiring validators to stake actual value (CCD), making it economically unfeasible to create and maintain multiple validator identities with significant influence.

   Tally

      The number of votes obtained by every candidate computed by adding up all the weighted votes for every candidate.

   Tally ceremony

      The process of decrypting the encrypted tally to the decrypted tally. The guardians from the key ceremony who are available attend this ceremony. There must be at least enough guardians to meet the quorum. Each guardian will decrypt their decryption shares and their share for each missing guardian. These shares will then be combined to create the decrypted spoiled ballots and decrypted tally.

      The tally ceremony is a part of the tally phase.

   Tally phase

      Time period after the election where voting is closed and guardians decrypt their share of the tally (tally ceremony is held) and the final election result is produced and registered.

   Testnet

      A test network run by Concordium to test its protocols and software. There can be several test networks in existence at the same time. All the features are tested on the testnet before they are released on the :term:`mainnet`.

   Timeout certificate

      If the leader fails to produce a block in the round, or not enough signatures were gathered for a quorum certificate, then the finalizers will instead send timeout messages, which are aggregated to form a timeout certificate. Each block either contains a quorum certificate or a timeout certificate for the previous round.

   Token-governance account

      A specific Concordium account nominated during the creation of a :term:`Protocol-Level Token (PLT)` that is granted the capabilities to perform administrative operations associated with that PLT. As of protocol version 9, this single account holds full authority over all :term:`token-governance operations<Token-governance operation>`, including minting, burning, administering allow/deny lists, and pausing/unpausing the token.


   Token-governance operation

      Administrative operations that control the behavior and supply of a :term:`Protocol-Level Token (PLT)`. These operations can only be performed by the :term:`token-governance account` for that specific PLT. Examples include minting tokens, burning tokens, administering allow- and deny-lists, and pausing or unpausing the token. These operations are submitted as part of a token update transaction.

   Token-holder operation

      Operations that individual token holders can perform with their :term:`PLTs<Protocol-Level Token (PLT)>`. As of protocol version 9, the only token-holder operation is the token transfer.

   Token ID

      A unique identifier assigned to each :term:`Protocol-Level Token (PLT)` when it is created via a :term:`chain-governance operation`. This identifier is used to uniquely identify the token on the Concordium chain in transactions and through its gRPC interface. A TokenId can be up to 128 characters long, consisting of a-z, A-Z, 0-9, -, ., and %, and is matched in a case-insensitive manner.

   Token Kernel

      The Token Kernel is a low-level component of the Concordium protocol that provides fundamental state update operations for :term:`Protocol-Level Tokens (PLTs)<Protocol-level token (PLT)>`. It defines the basic functionalities that the :term:`Token Module` uses to implement more complex transactions and queries. The Token Kernel ensures core invariants are maintained, such as that all token transfers are accompanied by an event that logs the transfer.

   Token Module
      The component within the Concordium protocol responsible for the general handling and management of :term:`Protocol-Level Tokens (PLTs)<Protocol-level token (PLT)>`. Protocol version 9 supports a single Token Module, but future versions may introduce new Token Modules with additional functionality. When the PLT is created, the Token Module associated with it is identified by a reference consisting of a SHA-256 hash.

   Token transfer

      The operation to send a specified amount of a :term:`Protocol-level token (PLT)` from one Concordium account to another.

   Token update transaction

      A new transaction type introduced in Protocol Version 9 to facilitate operations for :term:`Protocol-Level Tokens (PLTs)<Protocol-level token (PLT)>`. This transaction identifies a specific PLT by its :term:`Token ID` and contains a list of token operations that can include both :term:`token-governance operations<Token-governance operation>` (e.g., mint, burn, pause) and :term:`token-holder operations<Token-holder operation>` (e.g., transfer). Operations within the transaction are executed in order, and if any single operation fails, the entire transaction is rejected and has no effect.

   Total effective stake

      The total amount of stake in staking pools excluding passive delegation and any amount that exceeds the :ref:`staking pool bounding caps<delegation-caps>`.

   Transaction

      An atomic operation that defines a change of state in the ledger, such as transferring funds from one account to another. A transaction typically has a sender account and a :term:`transaction sequence number`, and incurs a fee. The sender account must sign the transaction to authorize it. (The exception to this is a credential deployment transaction that creates a new account, which does not have a sender account.)

   Transaction fee commission

      Determines the percentage of transaction fees a validator keep when delegators' stakes contribute to validating transactions. Lower percentages can attract more delegators but reduce the validator's earnings per transaction.

   Transaction Sequence Number

      A sequence number that orders :term:`transaction` on a given :term:`account`. In a ledger, all transactions for an account must be ordered with consecutive transaction sequence numbers, starting from 1. Transaction sequence numbers ensure that a transaction cannot be repeated in the ledger, and that the transactions occur in the order intended by the sender account holder.

   Transfer Memo

      Additional data that a user can provide when making a transfer, or a transfer with schedule. The data will appear on chain as a bytestring. It is expected to be CBOR encoded and can therefore represent strings, numbers and JSON values, but this is not enforced.

   Transfer with schedule

      A special kind of transfer of CCD that makes the CCD amount available to the receiver only in a limited way until a specified point in time. The point in time is specified as part of a transfer. The CCD are immediately owned by the receiver account, and the transfer cannot be revoked, but the receiver cannot spend the CCD until the specified time.

   User identity certificate

      Issued to the individual or entity once their real-world identity has been verified and recorded by an identity provider. You cannot use the Concordium platform without a user identity certificate.
      The user identity certificate includes attributes such as name, age, and nationality. When the identity provider has validated the attributes, it issues a user identity certificate, which is basically the identity provider’s signature over some cryptographic keys of the user and the validated personal attributes. Unlike usual public key certificates such as X.509 certificates, the user identity certificate is private to the user; it is not submitted to the chain. Note that the identity provider also stores some information, but this is only used for a possible, subsequent investigation of the user’s activities (i.e. disclosing an identity). The identity provider is not involved in any subsequent use of the user identity certificate. The user identity certificate is signed using the Pointcheval-Sanders signature scheme.

   Validation

      The process of production of :term:`blocks<block>`.

   Validator

      A node that participates in the production of :term:`blocks<block>`, referred to as *validation*.

   Verifiable credential

      Verifiable credentials are Web3 credentials. They have attributes that don’t have to have stringent requirements on anonymity revocation, but can also witness a number of other attributes of the holder. Examples of this would be club membership credentials, reward programs, etc. There are no requirements imposed on who can be an issuer of these credentials, and in contrast to protocol level identities, the Web3 ID credentials can be revoked according to the logic imposed by the issuer. This could be that the credential holder can revoke it, the credential expires, or the issuer or some other third party has rights to revoke it. Verifiable credentials are not associated with accounts. Verifiable credentials can be used to build verifiable presentations, which can also be cryptographically verified.

   Verifiable decryption

      The provable decryption of e.g. an election result. Provable means that the resulting plaintext comes with auxiliary information (here a ZK proof) that allows any third party to verify the correctness of the decryption process.

   Verifiable presentation

      Data derived from one or more verifiable credentials, issued by one or more issuers, that is shared with a specific verifier. A verifiable presentation is a tamper-evident presentation encoded in such a way that authorship of the data can be trusted after a process of cryptographic verification. Certain types of verifiable presentations might contain data that is synthesized from, but do not contain, the original verifiable credentials (for example, zero-knowledge proofs).

   Verification Audit Anchor

      A transaction initiated by the merchant after verifying of the presentation, and generating the verification audit record. The anchor makes the audit record tamper-evident and timestamps it.

   Verification Audit Record

      A private record stored by the merchant as a result of verifying a presentation (and shown to an auditor as needed).

   Verification Request Anchor
      A transaction initiated by the merchant immediately after generating a presentation request, but prior to sending it to the ID app. Its purpose is to allow the ID app to confirm that the presentation request is both authentic and recent.

   Verifier

      Party that verifies users' Web3 ID credentials.

   Vote delegation

      Method whereby a user can add account weight of their account to another account that will cast the ballot. This allows accounts accessed from wallets without smart contract capabilities to cast votes by delegating to another account held by the same owner.

   W3C standard

      Standards and guidelines developed by the World Wide Web Consortium (W3C), an international organization that creates technical specifications to ensure the long-term growth and interoperability of the web.

   Wallet

      A wallet is an app that allows cryptocurrency users to store and retrieve their digital assets, and manage identities and accounts.

   Web3 ID

      Web3 ID is an extension of the core protocol identity with other types of credentials that don’t have to have stringent requirements on anonymity revocation, but can also witness a number of other attributes of the holder. Examples of this would be club membership credentials, reward programs, etc. There are no requirements imposed on who can be an issuer of these credentials and in contrast to protocol identities the Web3 ID credentials can be revoked according to the logic imposed by the issuer. This could be that the credential holder can revoke it, the credential expires, the issuer, or some other third party has rights to revoke it.

   WebAssembly

      WebAssembly (Wasm) defines a portable binary-code format and a corresponding text format for executable programs as well as software interfaces for facilitating interactions between such programs and their host environment. Smart contracts are deployed on chain as Wasm files.

   Winning probability

      The winning probability is the probability that a validator wins in a given round. The probability is :math:`\alpha`, which equals the validator's relative stake.

   Zero-knowledge proof

      A method by which a user (the prover) can prove to another party (the verifier) that the user meets a requirement without revealing anything beyond that. Zero knowledge proofs generated by the wallet are non-interactive. They are verifiable forever in the future without further prover interaction.
