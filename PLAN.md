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

### Phase 1 — Learn: move documents one section at a time

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

### Phase 2 — Assess and plan the remaining menus

*To be planned once Phase 1 is complete and approved.* Based on the content mapping, the order of remaining menus will be agreed with you before work begins. The How to menu has the most concrete mappings after Learn; Tutorials and Technical Reference have sections that require further editorial decisions before files can be moved.
