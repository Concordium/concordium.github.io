# PLAN.md

## Scope

All work is restricted to `source/mainnet/`. Do not modify `source/academy/`, `source/shared/`, or any build/config files unless directly required by mainnet changes.

## Tasks

The restructuring follows the Divio/Diataxis framework, replacing the current **Docs** top-level menu with four menus: **Learn**, **Tutorials**, **How to**, and **Technical Reference**. We start with the **Learn** menu as its content mapping is most complete.

Every step below is self-contained: after completing it the site must build cleanly (`pipenv run make dev-mainnet` with no warnings). Each step must be confirmed before the next begins.

---

### Phase 0 — Preparation

**Step 1 — Create a decisions log**
Create `source/Scope-definitions/decisions-log.md` as a Markdown document alongside the other planning documents. It will record, for each moved or categorised document: where it was placed, why, and any recommendations for future improvements. This satisfies the requirement that everything in the restructure is documented. It lives outside the site build and will never appear in the navigation.

**Step 2 — Create the Learn directory skeleton**
Create the directory `source/mainnet/learn/` and a `learn/index.rst` that defines the section structure from Navigation structure.md:
- What is the Concordium Protocol
- Identity
- Accounts
- Transactions
- Smart Contracts *(stub — no existing explanation doc; requires a new document)*
- Network *(stub — no existing explanation doc; requires a new "what is a node" doc)*
- Consensus
- Tokenomics
- Staking
- Governance

At this stage the stubs are empty placeholders with a note explaining that content will follow.

**Step 3 — Add Learn to top-level navigation**
Update `source/mainnet/index.rst` to add `Learn <learn/index>` as a new top-level menu entry. The existing Docs menu is kept intact during the migration; it will be cleaned up after all content has been moved out of it.

---

### Phase 1 — Learn: move documents one section at a time FINISHED

Each step in this phase covers one Learn section. Every step includes:
- Moving the relevant file(s) to their new location under `learn/`
- Adding the section to the `learn/index.rst` toctree
- Removing the entry from `docs/index.rst`
- Adding URL redirects (via `sphinx-reredirects`) so existing links remain valid
- Searching for and updating all internal cross-references (`:ref:` targets, `:doc:` links) throughout `source/mainnet/`
- Verifying a clean build

**Step 4 — Learn: What is the Concordium Protocol**
Move `docs/protocol/concordium-protocol.rst` → `learn/concordium-protocol.rst`.

**Step 5 — Learn: Identity**
Move the Identity section (4 files) from `docs/protocol/` → `learn/identity/`:
- `identity.rst` (parent)
- `principles-of-privacy.rst`
- `user-processes.rst`
- `identity-disclosure-processes.rst`

**Step 6 — Learn: Accounts**
Move the Accounts section (4 files) from `docs/protocol/` → `learn/accounts/`:
- `manage-accounts.rst` (parent)
- `account-concepts.rst`
- `account-aliases.rst`
- `key-derivation-and-usage.rst`

**Step 7 — Learn: Transactions**
Move the Transactions section (4 files) from `docs/protocol/` → `learn/transactions/`:
- `transactions.rst` (parent)
- `transaction-reference.rst`
- `transaction-fees.rst`
- `sponsored-transactions.rst`

**Step 8 — Learn: Consensus**
Move the Consensus section from `docs/protocol/` → `learn/consensus/`:
- `consensus-mechanisms.rst` (parent)
- `concepts-baker.rst` (Block production and validation)
- `time-concepts.rst`
- `validator-suspension.rst`

*Note: the decisions log should record that `validator-suspension.rst` describes the mechanism from a protocol perspective; the practical validator-facing content lives separately in the How to and FAQ sections.*

**Step 9 — Learn: Tokenomics**
Move `docs/protocol/tokenomics.rst` → `learn/tokenomics.rst`.

**Step 10 — Learn: Staking**
Move the Staking section from `docs/protocol/` → `learn/staking/`:
- `staking.rst` (parent)
- `concepts-delegation.rst` (How to become a delegator)

**Step 11 — Learn: Governance**
Move `docs/voting/gc-voting.rst` → `learn/governance/gc-voting.rst`.

*Note: the remaining voting documents (`voting.rst`, `guardians.rst`, `verify-election-result.rst`, `coordinator.rst`) stay in place for now — they will be moved when we work on the How to and Technical Reference menus.*

---

### Phase 1 — Learn: stubs for sections that need new content

**Step 12 — Learn: Smart Contracts stub**
Replace the empty Smart Contracts stub in `learn/index.rst` with a proper placeholder page (`learn/smart-contracts.rst`) that explains what content is needed: a high-level explanation document covering what smart contracts are on Concordium. Record in the decisions log that the existing `docs/smart-contracts/introduction.rst` and related sub-docs contain a mix of Divio types and require editorial review before any content can be moved to Learn.

**Step 13 — Learn: Network stub**
Replace the empty Network stub with a placeholder page (`learn/network.rst`) explaining what content is needed: a new "What is a node / Node types" explanation document. Record in the decisions log that no suitable existing document exists for this Learn section. Link to the two reference examples from the mapping (near-nodes.io) as inspiration for future authors.

---

### Phase 1 — Learn: final cleanup

**Step 14 — Remove migrated Protocol entries from Docs**
Remove all the sections moved in Steps 4–11 from the `docs/index.rst` toctree. Verify no orphan-document warnings appear in the build (all moved files must now be reachable through the Learn toctree).

---

### Phase 2 — Remaining menus: How to, Technical Reference, Tutorials

Phase 2 tackles the three remaining menus in order of mapping completeness and editorial readiness:

1. **Phase 2a — How to** (most concrete mapping, most files ready to move)
2. **Phase 2b — Technical Reference** (several clear candidates, some investigation needed)
3. **Phase 2c — Tutorials** (directory already exists and is populated; lighter restructuring needed)

The same pattern as Phase 1 applies throughout: every step must produce a clean build before the next step begins.

---

#### Key decisions and known conflicts (to be resolved before or during execution)

- **Quick-start guide placement**: `docs/smart-contracts/guides/quick-start.rst` appears in both the Tutorials mapping ("the guide walks through the whole process from start to finish, making it a tutorial as a whole") and the How to mapping ("QuickStart"). Recommendation: place in **Tutorials** (Building Smart Contracts section), not How to.
- **Smart contracts best practices conflict**: `docs/smart-contracts/best-practices/` is listed under both How to (Development, Cost reduction, Factory pattern) and Technical Reference (whole section). These files must be reviewed individually before moving — some may be how-to guides, others reference material. A decision is needed before Step 22.
- **Validator Management** (`docs/network/baker-pool.rst`): This document is unplaced in the mapping. Much of its content overlaps with the Learn/Staking section and the How to/Infrastructure validator guides. It likely needs to be retired or significantly trimmed. Record in decisions log; do not move until reviewed.
- **Tutorials directory already exists**: `source/mainnet/tutorials/` is already a functioning section with many tutorial pages. It does not need to be created from scratch — Phase 2c work is restructuring and aligning it with the proposed Divio section headings, and adding the quick-start guide.
- **Tools menu migration**: All Tools content has been reviewed (April 2026). The Tools menu will be retired once all content is moved out of it. Routing decisions:
  - *Wallet SDK* (parent + 5 sub-documents) → **How to / Integrations** (Step 19b). Content is task-oriented how-to guides for wallet developers. The parent document explicitly calls itself an "integration guide". Parent title to be revised — TBD, see decisions log.
  - *Developer Resources* (`developer-page.rst`, gRPC V2 docs) → **Technical Reference / API** (Step 25).
  - *CCDScan* (5 sub-documents) → **Technical Reference / CCDScan** (Step 25).
  - *Concordium Client* (`concordium-client.rst`, `query-node.rst`, `multi-sig.rst`) → **Technical Reference / Concordium Client** (Step 25).
  - *Auxiliary Tools* (`developer-tools.rst`) → **Technical Reference** (Step 25).
  - The Tools menu entry is removed from `source/mainnet/index.rst` once all content has been moved (Step 25).

---

### Phase 2a — How to menu FINISHED

**Step 15 — Create the How to skeleton**
Create `how-to/index.rst` with the full section structure from `Navigation structure.md`, adding one proposed section from the mapping:
- Getting Started *(stub — no content mapped yet)*
- Concordium ID *(stub — no content mapped yet)*
- Integrations
- Transactions *(stub — no content mapped yet)*
- Tokens and Assets *(stub — no content mapped yet)*
- Infrastructure
- Smart Contracts
- Governance *(proposed addition from mapping — not in Navigation structure.md but has clear content)*

Add `How to <how-to/index>` to `source/mainnet/index.rst`. Record all empty stubs and content gaps in `decisions-log.md`.

**Step 16 — How to: Infrastructure**
Move the validator how-to guides from `docs/network/guides/` → `how-to/infrastructure/`:
- `validation-with-wallets.rst`
- `become-validator.rst` (Validation with the Concordium Client)
- `add-baker-mw.rst` (Add a validator)
- `import-validator-keys.rst`
- `update-baker-mw.rst` (Change validator options)
- `suspend-unsuspend-validator.rst`
- `stop-validator.rst`

*Note: The mapping flags a structural question — `become-validator.rst` covers the same scope as the four separate wallet-based how-tos (`add-baker-mw`, `update-baker-mw`, `suspend-unsuspend-validator`, `stop-validator`). Record in decisions log and move as-is for now without restructuring. Also record that `docs/network/baker-pool.rst` (Validator Management) is not moved in this step — it requires separate editorial review.*

**Step 17 — How to: Governance**
Move the remaining voting documents from `docs/voting/` → `how-to/governance/`:
- `voting.rst` (How to vote)
- `guardians.rst`
- `verify-election-result.rst`

Remove these entries from `docs/index.rst` Governance Committee Voting toctree.

**Step 18 — How to: Integrations**
Move `docs/resources/exchangeOnBoarding.rst` → `how-to/integrations/index.rst`.

**Step 19 — How to: Smart Contracts**
Move the clearly how-to guides from `docs/smart-contracts/guides/` → `how-to/smart-contracts/`:
- `setup-contract.rst`
- `compile-module.rst`
- `build-schema.rst`
- `no-std.rst`
- `fallback-entrypoints.rst`
- `upgradeable-contract.rst`
- `migrate-contracts.rst`
- `unit-test-contract.rst`
- `integration-test-contract.rst`

*Note: `quick-start.rst` is not moved here — it goes to Tutorials (Step 26). The best-practices files (`development.rst`, `costs.rst`, `factory-pattern.rst`) are not moved in this step — their placement (How to vs Technical Reference) requires the editorial decision noted above; record as deferred in decisions log.*

**Step 19b — How to: Wallet SDK integration guides**
Move `tools/wallet-sdk/` → `how-to/integrations/wallet-sdk/`:
- `wallet-sdk.rst` (parent — rename H1 title to **"Build a wallet"**; use **"Build a wallet with the Wallet SDK"** as the nav label in `how-to/index.rst`)
- `wallet-sdk-identity-creation.rst`
- `wallet-sdk-identity-recovery.rst`
- `wallet-sdk-credential-deployment.rst`
- `wallet-sdk-account-transaction.rst`
- `wallet-sdk-identity-provider.rst`

Add the group to the Integrations toctree in `how-to/index.rst`, nested under the parent. Remove the Wallet SDK section from `tools/index.rst` (leave the rest of the Tools content in place until Step 25). Add redirects in `conf.py` for all six moved files.

**Step 20 — How to: Document empty sections and unplaced content**
For each stub section with no mapped content (Getting Started, Concordium ID, Transactions, Tokens and Assets), add a detailed entry to `decisions-log.md` recording what content is needed. No new files are created beyond the stubs from Step 15.

---

### Phase 2b — Technical Reference menu

**Step 21 — Create the Technical Reference skeleton** FINISHED
Create `technical-reference/index.rst` with the following section structure, combining the `Navigation structure.md` outline with the Tools migration decisions above:
- SDKs *(stubs for Concordium SDK, ID App SDK, Verification Web UI — these point to external repositories/documentation; create stub pages with links and record in decisions log)*
- API / gRPC API *(stub — will receive `tools/developer-page.rst` content in Step 25)*
- Concordium Client *(stub — will receive `tools/concordium-client.rst`, `query-node.rst`, `multi-sig.rst` in Step 25)*
- CCDScan *(stub — will receive `tools/ccd-scan/` sub-documents in Step 25)*
- Auxiliary Tools *(stub — will receive `tools/developer-tools.rst` in Step 25)*
- Smart Contracts *(content moved in Step 22)*
- Governance *(content moved in Step 23)*
- Release Notes *(content moved in Step 24)*

Add `Technical Reference <technical-reference/index>` to `source/mainnet/index.rst`. Record all stubs and their planned content sources in `decisions-log.md`.

**Step 22 — Technical Reference: Smart Contracts references**
Move `docs/smart-contracts/references/` → `technical-reference/smart-contracts/references/`:
- `crypto-primitives.rst`
- `host-fns.rst`
- `local-settings.rst`
- `references-on-chain.rst`
- `schema-json.rst`
- `simulate-context.rst`
- `index.rst`

*Note: The best-practices section (`docs/smart-contracts/best-practices/`) placement is deferred pending the editorial decision flagged above.*

**Step 23 — Technical Reference: Governance**
Move `docs/voting/coordinator.rst` → `technical-reference/governance/coordinator.rst`.
This will empty the `docs/voting/` directory entirely — remove the now-empty Governance Committee Voting toctree from `docs/index.rst`.

**Step 24 — Technical Reference: Release Notes**
Move `docs/release-notes/` → `technical-reference/release-notes/`:
- `release-notes-lp.rst` (landing page)
- `release-notes-mainnet.rst`
- `release-notes.rst`

**Step 25 — Technical Reference: Migrate remaining Tools content and retire Tools menu** FINISHED
Following the routing decisions in the key decisions section, migrate all remaining `tools/` content to Technical Reference and retire the Tools menu:

1. Move `tools/developer-page.rst` → `technical-reference/api/grpc-v2.rst`. Update the API / gRPC API section in `technical-reference/index.rst`.
2. Move `tools/ccd-scan/ccd-scan.rst` and its 5 sub-documents → `technical-reference/ccd-scan/`. Update the CCDScan section.
3. Move `tools/concordium-client.rst`, `tools/query-node.rst`, `tools/multi-sig.rst` → `technical-reference/concordium-client/`. Update the Concordium Client section.
4. Move `tools/developer-tools.rst` → `technical-reference/auxiliary-tools.rst`. Update the Auxiliary Tools section.
5. For the SDKs stubs (Concordium SDK, ID App SDK, Verification Web UI): confirm that these are external links only and finalize the stub pages with correct external URLs. Record in decisions log.
6. Remove `Tools <tools/index>` from `source/mainnet/index.rst`.
7. Add redirects in `conf.py` for all moved files.
8. Verify `tools/` directory is now empty of navigable content and can be archived or removed.

---

### Phase 2c — Tutorials menu FINISHED

**Step 26 — Tutorials: Add the quick-start guide**
Move `docs/smart-contracts/guides/quick-start.rst` → `tutorials/` (exact location to be confirmed based on `tutorials/index.rst` structure). Update `tutorials/index.rst` to include it under the Building Smart Contracts section.

**Step 27 — Tutorials: Align with Divio section headings**
Review the existing `tutorials/index.rst` and its sub-documents against the proposed section structure from `Navigation structure.md`:
- Integrating Concordium ID
- Integrating Concordium
- Transactions Workflows
- Tokens and Assets
- Running Infrastructure
- Building Smart Contracts
- dApp Development

Restructure the tutorials index to use these headings where content already exists. For sections with no matching content, add stubs and document the gap in `decisions-log.md`. No tutorial content files need to be moved — only the index structure changes.

**Step 28 — Tutorials: Review and move remaining Docs content**
Several documents still in `docs/` are candidates for the Tutorials menu but were not moved in Phase 2c because they require editorial review. For each, make a placement decision, move clearly tutorial-type content, and record deferred items in `decisions-log.md`:

- **`docs/smart-contracts/introduction.rst` and sub-docs** (`contract-lifecycle.rst`, `contract-module.rst`, `contract-instances.rst`, `contract-schema.rst`, `develop-contracts.rst`): Mixed content — explanation, how-to, and reference. Review individually before placement.
- **`docs/smart-contracts/guides/build-contract.rst`** and remaining files (`custom-errors.rst`, `json-params.rst`): Likely how-to material; `factory-pattern.rst` is mixed and may need splitting.
- **`docs/smart-contracts/guides/deploy-module.rst`** and sub-docs: Mixed content — some steps are how-to guides, some are reference. Review before placement.
- **`docs/network/guides/run-local-chain/`**: Potentially tutorial-oriented (building and running a local chain end-to-end). Review for placement under Running Infrastructure.

---

### Phase 2 — Unplaced documents review

The following sections in `docs/` are flagged as "Unplaced" in the mapping and require editorial decisions before any files can be moved. These are not assigned to specific steps — decisions are needed first:

- **`docs/concordium-id/`**: All documents are explanations aimed at businesses. Needs review to determine whether they belong on the dev doc site or the Concordium website.
- **`docs/plt/`** (Protocol Level Tokens): Mixed content — explanation, tutorial, and reference. `What are PLTs?` could go in Learn; `Get started with PLTs` is a tutorial; Operations/SDK docs belong in Technical Reference.
- **`docs/network/baker-pool.rst`** (Validator Management): Overlaps heavily with Learn/Staking content and How to/Infrastructure. Likely to be retired or significantly trimmed after the How to guides are in place.
- **`docs/network/nodes/`** (Run a Concordium Node): Top-level doc mixes explanation and how-to; sub-docs are how-tos. Needs split before placement.
- **`docs/network/web3-id/`** (Use Concordium's ID layer): Mixed content — explanation, tutorial, and reference. Needs individual review before placement.
- **`docs/network/guides/run-local-chain/`**: Mixed content — explanation and how-to. Needs review.
- **`docs/network/indexers/`**: Explanatory top-level doc; SubQuery is third-party tooling. Needs discussion.
- **`docs/integration/`**: Explanation-oriented content aimed at wallet integrators. Needs review for audience fit on dev doc site.
- **`docs/guides/wallets-lp.rst`** and wallet sub-docs: Likely to be phased out from dev doc site — pending final decision.
- **FAQs** (`delegation-faq.rst`, ETH/Solana FAQ): FAQ format doesn't map cleanly to Divio. Individual items need review.
- **`docs/help-and-faq/`** contributor docs (Style Guide, Documentation Environment): Not developer-facing — recommend moving to Confluence.
- **Downloads** (`docs/installation/downloads.rst`): Consider a standalone top-level entry.
