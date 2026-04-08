# Decisions Log

Tracks categorisation and placement decisions made during the Divio/Diataxis restructuring of `source/mainnet/`. For each document: where it was placed, why, and any recommendations for future improvements.

**Phase 1 (Learn menu) — complete.** All explanation-oriented content has been moved to `learn/`, all redirects are in place, `docs/index.rst` has been cleaned of all migrated entries, and the build is clean with no warnings.

---

## Learn

| Document | Original location | New location | Rationale | Notes / Future recommendations |
|---|---|---|---|---|
| What is the Concordium Protocol | `docs/protocol/concordium-protocol.rst` | `learn/concordium-protocol.rst` | Explanation of the protocol at a conceptual level — fits the Learn (Explanations) category of the Divio framework. | — |
| Identity framework on Concordium | `docs/protocol/identity.rst` | `learn/identity/index.rst` | Explanation of Concordium's identity system, concepts and participants — understanding-oriented content with no task instructions. Correctly placed in Learn. | — |
| Principles of privacy | `docs/protocol/principles-of-privacy.rst` | `learn/identity/principles-of-privacy.rst` | Explanation of privacy design principles. No instructions or task content. Correctly placed in Learn under Identity. | — |
| User processes | `docs/protocol/user-processes.rst` | `learn/identity/user-processes.rst` | Explains the account creation process and Web3 ID from a conceptual perspective. Placed in Learn under Identity. Note: the content is borderline — it describes a process but does not instruct the reader step by step. A future improvement could be to create a cleaner separation between the conceptual overview (Learn) and a step-by-step how-to guide. | — |
| Identity disclosure processes | `docs/protocol/identity-disclosure-processes.rst` | `learn/identity/identity-disclosure-processes.rst` | Explains the two legal disclosure scenarios at a conceptual/process level. No developer task instructions. Correctly placed in Learn under Identity. | — |
| Accounts | `docs/protocol/manage-accounts.rst` | `learn/accounts/index.rst` | Explanation of what accounts are on Concordium, how they relate to identities, and how to use them. Understanding-oriented content. Correctly placed in Learn. | — |
| Account concepts | `docs/protocol/account-concepts.rst` | `learn/accounts/account-concepts.rst` | Technical explanation of account balances, initial accounts, and sequence numbers. Understanding-oriented. Correctly placed in Learn under Accounts. | — |
| Account aliases | `docs/protocol/account-aliases.rst` | `learn/accounts/account-aliases.rst` | Explanation of the alias mechanism introduced in protocol version 3. Understanding-oriented with some SDK references. Correctly placed in Learn under Accounts. Note: the SDK usage examples are borderline reference material; a future improvement could extract these into a Technical Reference entry. | — |
| Key derivation and usage | `docs/protocol/key-derivation-and-usage.rst` | `learn/accounts/key-derivation-and-usage.rst` | Explains the cryptographic key derivation scheme used for account and identity credentials. Understanding-oriented background material. Correctly placed in Learn under Accounts. | — |
| Transactions | `docs/protocol/transactions.rst` | `learn/transactions/index.rst` | Explanation of what transactions are on Concordium, how they work, and the main transaction types. Understanding-oriented. Correctly placed in Learn. | — |
| Transaction reference | `docs/protocol/transaction-reference.rst` | `learn/transactions/transaction-reference.rst` | Reference table of transaction types and wallet support. This is technically reference material (Divio: Reference), but is closely tied to the Transactions explanation and kept as a sub-document under Learn/Transactions for navigational coherence. Future improvement: consider moving to Technical Reference once that menu is built out. | Borderline reference content — consider moving to Technical Reference in a later phase. |
| Transaction fees | `docs/protocol/transaction-fees.rst` | `learn/transactions/transaction-fees.rst` | Explains the fee system, how costs are computed, and governance of the EUR/ENERGY conversion. Understanding-oriented with a detailed reference table. Correctly placed in Learn under Transactions. | — |
| Sponsored transactions | `docs/protocol/sponsored-transactions.rst` | `learn/transactions/sponsored-transactions.rst` | Explains the sponsored transactions feature at a conceptual level, including the signing flow and prerequisites. Correctly placed in Learn under Transactions. | — |
| Consensus mechanisms | `docs/protocol/consensus-mechanisms.rst` | `learn/consensus/index.rst` | Explanation of Concordium's consensus protocol, proof-of-stake, security model, and epoch structure. Understanding-oriented. Correctly placed in Learn. | — |
| Block production and validation | `docs/protocol/concepts-baker.rst` | `learn/consensus/concepts-baker.rst` | Explains how validation works, the lottery and staking pool mechanics, and validator rewards. Understanding-oriented. Correctly placed in Learn under Consensus. | — |
| Time concepts | `docs/protocol/time-concepts.rst` | `learn/consensus/time-concepts.rst` | Explains epochs, rounds, pay day, and cool-down period. Understanding-oriented. Correctly placed in Learn under Consensus. | — |
| Validator suspension | `docs/protocol/validator-suspension.rst` | `learn/consensus/validator-suspension.rst` | Describes the validator suspension mechanism at the protocol level. Understanding-oriented. Correctly placed in Learn under Consensus. Note: practical validator-facing content on suspension is covered separately in the Delegation and Validation FAQ and the Suspend/Unsuspend how-to guide. | — |
| Tokenomics | `docs/protocol/tokenomics.rst` | `learn/tokenomics.rst` | Explanation of the CCD token, transaction costs, staking pools, rewards, and cool-down periods. Understanding-oriented. Correctly placed in Learn. | — |
| Staking | `docs/protocol/staking.rst` | `learn/staking/index.rst` | Conceptual overview of proof-of-stake, validators, and delegators. Understanding-oriented. Correctly placed in Learn. | — |
| How to become a validator | `docs/protocol/how-to-become-a-validator.rst` | `learn/staking/how-to-become-a-validator.rst` | Explains prerequisites, setup process, and staking pool options for becoming a validator. Understanding-oriented (not a step-by-step task guide). Correctly placed in Learn under Staking. | — |
| Delegation concept | `docs/protocol/concepts-delegation.rst` | `learn/staking/concepts-delegation.rst` | Explains delegation mechanics, pool vs passive delegation, cool-downs, and how to choose a pool. Understanding-oriented. Correctly placed in Learn under Staking. | — |
| Governance Committee elections | `docs/voting/gc-voting.rst` | `learn/governance/gc-voting.rst` | Explains the election process, voting mechanics (approval voting, weight), guardian roles, and the three phases of an election. Understanding-oriented. Correctly placed in Learn under Governance. Note: the remaining voting documents (`coordinator.rst`, `voting.rst`, `guardians.rst`, `verify-election-result.rst`) stay in `docs/voting/` for now — they will be categorised when the How-to and Technical Reference menus are built. | — |

## Tutorials

| Document | Original location | New location | Rationale | Notes / Future recommendations |
|---|---|---|---|---|
| | | | | |

## How to

| Document | Original location | New location | Rationale | Notes / Future recommendations |
|---|---|---|---|---|
| | | | | |

## Technical Reference

| Document | Original location | New location | Rationale | Notes / Future recommendations |
|---|---|---|---|---|
| | | | | |

## Unplaced / Deferred

| Document | Original location | Reason not placed | Recommendation |
|---|---|---|---|
| Smart contracts (Learn placeholder) | `docs/smart-contracts/introduction.rst` and sub-documents | `docs/smart-contracts/introduction.rst` contains a mix of Divio types: explanation content (what smart contracts are, use cases, limitations) alongside a toctree covering contract lifecycle, modules, instances, schemas, and development guides — which are a mix of explanation, how-to, and reference material. No single file can be moved to Learn without editorial work. | Create a new, standalone explanation document for Learn/Smart Contracts covering: what a smart contract is on Concordium, why/when to use one, key concepts (module, instance, schema). This could be a condensed and restructured version of the existing introduction, stripped of toctree and developer tooling content. The existing `docs/smart-contracts/` subtree should be reviewed separately when building the How-to and Technical Reference menus. |
| Network (Learn placeholder) | No existing document | No explanation-oriented document covering "what is a node" or node types exists in the codebase. All content under `docs/network/nodes/` consists of how-to guides for running a node on specific platforms (Ubuntu, Windows, macOS, Docker, AWS). | A new document needs to be written for Learn/Network. It should explain: what a node is on Concordium, why nodes matter for the network, the different node roles (regular node vs. validator node), and how nodes relate to the consensus mechanism. This is a content gap that requires a new authoring effort. |

## Documents recommended for removal from the dev doc site

| Document | Original location | Reason | Recommendation |
|---|---|---|---|
| | | | |
