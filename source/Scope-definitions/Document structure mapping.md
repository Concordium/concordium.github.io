# **Documentation Structure – Content Mapping**

Maps documents to their new location in the proposed site structure. Current location shows the path in the existing Docs menu.

## **Learn**

| Document | Current location | Comments | Rationale |
| :---- | :---- | :---- | :---- |
| **What is the Concordium Protocol** |  |  |  |
| What is the Concordium Protocol | Docs/Concordium Protocol |  |  |
| **Identity** |  |  |  |
| Identity | Docs/Concordium Protocol |  |  |
| Principles of privacy | Docs/Concordium Protocol/Identity |  |  |
| User processes | Docs/Concordium Protocol/Identity |  |  |
| Identity disclosure processes | Docs/Concordium Protocol/Identity |  |  |
| **Accounts** |  |  |  |
| Accounts | Docs/Concordium Protocol |  |  |
| Account concepts | Docs/Concordium Protocol/Accounts |  |  |
| Account aliases | Docs/Concordium Protocol/Accounts |  |  |
| Key derivation and usage | Docs/Concordium Protocol/Accounts |  |  |
| **Transactions** |  |  |  |
| Transactions | Docs/Concordium Protocol |  |  |
| Transaction reference | Docs/Concordium Protocol/Transactions |  |  |
| Transaction fees | Docs/Concordium Protocol/Transactions |  |  |
| Sponsored transactions | Docs/Concordium Protocol/Transactions |  |  |
| **Smart Contracts** |  |  |  |
|  |  | Content from ‘What is a Smart Contract’ and maybe from its sub-docs should be considered for a high-level explanation here |  |
| **Network** |  |  |  |
| Nodes |  | New document needed: what is a node and node types.For inspiration, see:[What is a node](https://near-nodes.io/intro/what-is-a-node)[Node types](https://near-nodes.io/intro/node-types) |  |
| Validation | Docs/Concordium Protocol/Staking | Best practices content from [Validator Management](https://docs.concordium.com/en/mainnet/docs/network/baker-pool.html)  should be incorporated into this and Validator Management can then be retired as most of its content is redundant.  |  |
| **Consensus** |  |  |  |
| Consensus | Docs/Concordium Protocol |  |  |
| Block production and validation | Docs/Concordium Protocol/Consensus mechanisms |  |  |
| Time concepts | Docs/Concordium Protocol/Consensus mechanisms |  |  |
| Validator suspension | Docs/Concordium Protocol/Consensus mechanisms | This document describes the validator suspension mechanism from a protocol level and is correctly placed in Learn. The practical content for validators is covered across two other documents: the [Delegation and Validation FAQ](https://docs.concordium.com/en/mainnet/docs/help-and-faq/delegation-faq.html) (For validators section) and [Suspend/Unsuspend a validator](https://docs.concordium.com/en/mainnet/docs/network/guides/suspend-unsuspend-validator.html) (How-to). We may consider consolidating the validator-facing content  — so it is easier for validators to find (however, there are links between the documents) |  |
| **Tokenomics** |  |  |  |
| Tokenomics | Docs/Concordium Protocol |  |  |
| **Staking** |  |  |  |
| Staking | Docs/Concordium Protocol |  |  |
| How to become a delegator | Docs/Concordium Protocol/Staking |  |  |
| **Governance** |  |  |  |
| Concordium Governance Committee elections | Docs/Governance Committee Voting |  |  |

## **Tutorials**

| Document | Current location | Comments | Rationale |
| :---- | :---- | :---- | :---- |
| **Integrating Concordium ID** |  |  |  |
| **Integrating Concordium** |  |  |  |
| **Transactions Workflows** |  |  |  |
| **Tokens and Assets** |  |  |  |
| **Running Infrastructure** |  |  |  |
| **Building Smart Contracts** |  |  |  |
| Concordium smart contracts quick start guide | Docs/Smart Contracts | The individual steps could stand alone as how-tos, but the guide walks through the whole process from start to finish, making it a tutorial as a whole |  |
| What is a Smart Contract and its sub-docs | Docs/Smart Contracts | Review needed for correct placement – the content of the docs belongs to different Divio types, but we should also consider that they may have interdependencies |  |
| Build a smart contract and its sub-docs | Docs/Smart Contracts/Build | The section contains a mix of Divio types including how-tos and references – needs review before final placement |  |
| Deploy a smart contract module and its sub-docs | Docs/Smart Contracts/Deploy | The section contains a mix of Divio types including how-tos and references – needs review before final placement |  |
| **dApp Development** |  |  |  |

## **How to**

| Document | Current location | Comments | Rationale |
| :---- | :---- | :---- | :---- |
| **Getting Started** |  |  |  |
| **Concordium ID** |  |  |  |
| **Integrations** |  |  |  |
| Exchange onboarding guide | Docs/Help & FAQ |  |  |
| **Transactions** |  |  |  |
| **Tokens and Assets** |  |  |  |
| **Infrastructure** |  |  |  |
| Validation with Concordium wallets | Docs/Network |  | Walks the user through the necessary steps to complete to start validation on the Concordium network |
| Validation with the Concordium Client | Docs/Network | This document covers the same functionality as the separate wallet-based how-tos ([Add a validator](https://docs.concordium.com/en/mainnet/docs/network/guides/add-baker-mw.html), [Change validator options](https://docs.concordium.com/en/mainnet/docs/network/guides/update-baker-mw.html), [Suspend/Unsuspend a validator](https://docs.concordium.com/en/mainnet/docs/network/guides/suspend-unsuspend-validator.html), [Stop a validator](https://docs.concordium.com/en/mainnet/docs/network/guides/stop-validator.html)), but consolidated into a single document. Consider whether to align the structure – either by splitting this document into separate how-tos matching the wallet documents, or by consolidating the wallet documents similarly. | Walks the user through the necessary steps to start and manage validation on the Concordium network using the Concordium Client |
| Add a validator | Docs/Network |  | Walks the user through the necessary steps to complete to start validation on the Concordium network |
| Import validator keys | Docs/Network |  | Walks the user through the necessary steps to complete to start validation on the Concordium network |
| Change validator options | Docs/Network |  | Walks the user through the necessary steps to complete to start validation on the Concordium network |
| Suspend/Unsuspend a validator | Docs/Network |  | Walks the user through the necessary steps to complete to start validation on the Concordium network |
| Stop a validator | Docs/Network |  | Walks the user through the necessary steps to complete to start validation on the Concordium network |
| **Smart Contracts** |  |  |  |
| QuickStart (Concordium smart contracts quick start guide) | Docs/Smart Contracts |  | Tutorial moved here – user builds a deployed smart contract from scratch |
| Set up a project | Docs/Smart Contracts/Build |  |  |
| Module Compilation | Docs/Smart Contracts/Build |  |  |
| Build a contract schema | Docs/Smart Contracts/Build |  |  |
| Using no\_std | Docs/Smart Contracts/Build |  |  |
| Fallback entrypoints | Docs/Smart Contracts/Build |  | Consider renaming to 'How to use fallback entrypoints' |
| Upgradeability Guide | Docs/Smart Contracts/Build |  |  |
| Migrate contracts for concordium-std 8.1 | Docs/Smart Contracts/Build |  |  |
| Unit testing | Docs/Smart Contracts/Build |  |  |
| Integration tests | Docs/Smart Contracts/Build |  |  |
| Development (Best practices) | Docs/Smart Contracts/Best practices | Content is too technical and detailed for Learn. A more high-level explanation document on smart contract development is needed for Learn. |  |
| Cost reduction | Docs/Smart Contracts/Best practices |  |  |
| Factory pattern | Docs/Smart Contracts/Best practices | Content is mixed – explanation and implementation. To be assessed for potential split. |  |
| **Governance** |  | Proposed section |  |
| How to vote | Docs/Governance Committee Voting |  | Task-oriented: user follows steps to cast a vote |
| Guardians | Docs/Governance Committee Voting |  | Step-by-step guide through the guardian election process |
| Verify election result | Docs/Governance Committee Voting |  | Task-oriented: user follows commands to verify a result |

## **Technical Reference**

| Document | Current location | Comments | Rationale |
| :---- | :---- | :---- | :---- |
| **SDK’s** |  |  |  |
| **Concordium SDK** |  |  |  |
| **ID App SDK** |  |  |  |
| **Verification Web UI** |  |  |  |
| **API** |  |  |  |
| **gRPC API** |  |  |  |
| **Concordium Client** |  |  |  |
| **Smart Contracts** |  | Proposed section |  |
| Best practices and its sub-docs | Docs/Smart Contracts/Best practices |  | Technical reference material on smart contract best practices, security guidelines, and cost optimization – not task-oriented or tutorial content |
| References (Cryptographic primitives, Contract host functions, Local settings, References on-chain, Schema JSON representation, Simulation contexts, Rust contract examples, concordium-std) | Docs/Smart Contracts/References | To be reviewed individually |  |
| **Governance** |  | Proposed section |  |
| Election coordinator tool | Docs/Governance Committee Voting |  | Tool documentation |
| **Release notes** |  | Proposed section |  |
| Release notes | Docs/Help & FAQ |  |  |

## **Unplaced**

This table collects documents that could not be straightforwardly mapped to the new site structure. This includes documents that do not fit any of the four menus, documents that may not belong on the developer documentation site at all, and entire sections where placement and possible redesign need to be discussed before individual documents can be mapped.

| Document | Current location | Comments | Rationale |
| :---- | :---- | :---- | :---- |
| All documents under Docs/Concordium ID | Docs/Concordium ID | All documents in this section are explanations aimed at businesses implementing identity verification – needs review to determine whether they belong on the doc site or the Concordium website. Note: explanation-focused content on ZKPs is needed in Learn/Identity. Some content from sub-pages may be candidates for How-to guides for developers |  |
| All documents under Docs/Protocol Level Tokens | Docs/Protocol Level Tokens | All documents in this section need further discussion. ‘What are Protocol-Level Tokens (PLTs)?’ is explanatory and could go in Learn under an appropriate section. ‘Get started with PLTs’ together with its sub-docs (Request test CCD, Request PLT issuance) makes up a tutorial, though the sub-docs could alternatively be placed as How-tos with links from the tutorial. Operations, Concordium Client CLI Tool, Web SDK, and Rust SDK should go to Technical Reference. |  |
| Validator Management | Docs/Network | This document contains a mix of content aimed at two different audiences – validators and delegators. Much of the content is likely redundant as it overlaps with content in the Validator doc in the Learn/Network section and the Delegator doc in the Learn/Staking section. |  |
| Run a Concordium Node and its sub-docs | Docs/Network | The top-level document is a mix of explanation and how-to content; sub-docs are how-tos. Needs review before final placement. |  |
| Use Concordium’s ID layer and its sub-docs | Docs/Network | All documents in this section need review before final placement. The top-level document (Identity on Concordium) is an explanation that overlaps with content in the Learn section and should be reviewed in that context. Web3 ID issuers is tutorial-oriented but also contains reference material on the Concordium Issuer tool that should be separated out. Wallet identity provider interfaces is a reference document. Create proofs contains explanation content and may be a tutorial – needs review. ID attributes reference is a reference document. |  |
| Run a local chain and its sub-docs | Docs/Network | All documents in this section need review before final placement. The top-level document (Run a local chain) is explanatory. Using Docker is primarily a pointer to an external GitHub repository rather than a standalone how-to. Building from source is a how-to that walks through a multi-step process for building and running a node from source code. |  |
| Indexers and its sub-docs | Docs/Network | All documents in this section need review before final placement. The top-level document (Indexers) is explanatory and describes what indexers are. SubQuery is a third-party blockchain data indexing tool – if it belongs on the doc site at all, it would go under Technical Reference, but this should be discussed. |  |
| All documents under Docs/Integration | Docs/Integration | All documents in this section are explanations aimed at wallet integrators – needs review to determine whether they belong on the doc site or the Concordium website. Some content from sub-pages may be candidates for How-to guides for developers |  |
| Downloads | Docs/Help & FAQ | Consider a standalone top-level menu for this document |  |
| Concordium Wallets | Docs/Help & FAQ | Wallet documentation will likely be phased out from the developer documentation site. The final form and location has not yet been decided. However, the wallet docs should be reviewed to determine whether any content should be retained on the dev doc site, either as part of other documents or as standalone documents. |  |
| Concordium Standards | Docs/Help & FAQ | Not a document – external link to https://proposals.concordium.com/index.html |  |
| Delegation and validation FAQ | Docs/Help & FAQ | FAQ format does not map cleanly to Divio – individual items may span multiple content types |  |
| FAQ for Ethereum developers | Docs/Help & FAQ | FAQ format does not map cleanly to Divio – individual items may span multiple content types |  |
| FAQ for Solana developers | Docs/Help & FAQ | FAQ format does not map cleanly to Divio – individual items may span multiple content types |  |
| Onboarding for Solana developers | Docs/Help & FAQ | Do we want to keep this? |  |
| Set up Concordium documentation environment | Docs/Help & FAQ | For documentation contributors only – consider moving to Confluence |  |
| Concordium Documentation Style Guide | Docs/Help & FAQ | For documentation contributors only – consider moving to Confluence |  |

