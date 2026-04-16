# AI-Friendly Introductions — Implementation Plan

## Goal

Make how-to and tutorial pages more useful for AI agents answering developer questions by ensuring every page has a clear opening that states:

1. **What the task is** — what this page helps you do
2. **What you need** — prerequisites (tools, accounts, knowledge)
3. **What you will end up with** — the outcome

This also improves the experience for human readers scanning the page.

## Format

**Option chosen: inline prose (opening paragraph)**

Add or improve the opening paragraph of each page to naturally cover the three elements above. Example:

> This guide shows you how to compile a smart contract module into a Wasm binary using cargo-concordium. You will need Rust, the wasm32 target, and cargo-concordium installed. When you are done, you will have a `.wasm` file ready to deploy on the Concordium blockchain.

**Why not explicit sections (Prerequisites / What you will build)?**
Existing pages vary too much in structure — adding dedicated headings would require larger, more disruptive changes. Inline prose integrates naturally into any existing page structure. For new pages, explicit sections are encouraged (see the prompt/skill for new documents).

## Workflow

1. Take one section at a time (see list below)
2. Claude reads each page and extracts task/prerequisites/outcome from the existing content
3. Claude writes or improves the opening paragraph — no information is invented; if a page lacks enough content to write a clear intro, it is flagged
4. Review the batch, adjust if needed, then commit

## Sections to process

### How-to

Order matches the How-to navigation menu. All pages in each section should have an opening paragraph — including sub-documents, since each page is independently searchable and may be landed on directly by a user or AI agent.

| Section | Path | Status |
|---|---|---|
| Concordium ID / Verify and Access | `how-to/concordium-id/` | ⬜ Not started |
| Integrations | `how-to/integrations/` | ⬜ Not started |
| Validation | `how-to/infrastructure/` | ⬜ Not started |
| Nodes | `how-to/nodes/` | ⬜ Not started |
| Smart Contracts | `how-to/smart-contracts/` | ⬜ Not started |
| Governance | `how-to/governance/` | ⬜ Not started |
| Web3 ID | `how-to/web3-id/` | ⬜ Not started |

### Tutorials

| Section | Path | Status |
|---|---|---|
| Quick start | `tutorials/quick-start.rst` | ⬜ Not started |
| Integrating Concordium ID | `tutorials/verify-account-ownership-signature-proofs/`, `tutorials/using-ID-in-dApps/`, `tutorials/verify-access/`, `tutorials/company-identity/` | ⬜ Not started |
| Transaction Workflows | `tutorials/protocol-level-sponsored-transactions/`, `tutorials/sponsoredTransactions/` | ⬜ Not started |
| Protocol-Level Tokens | `tutorials/plt/` | ⬜ Not started |
| Tokens and Assets | `tutorials/fungible-tokens/`, `tutorials/nft-minting/`, `tutorials/sft-minting/`, `tutorials/wCCD/` | ⬜ Not started |
| Smart Contracts | `tutorials/piggy-bank/`, `tutorials/eSealing/`, `tutorials/smartContractUpgrade/` | ⬜ Not started |
| Governance | `tutorials/voting/` | ⬜ Not started |
| dApp Examples | `tutorials/daap-examples/` | ⬜ Not started |

## Notes

- There are approximately 120 pages in total across how-to and tutorials
- Pages that already have a clear structured intro can be skipped or lightly improved
- Pages where the existing content does not provide enough information to write a clear intro should be flagged for editorial attention
- Start with how-to/concordium-id (Verify and Access) as it is the first section in the How-to navigation
