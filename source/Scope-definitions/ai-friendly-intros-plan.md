# AI-Friendly Introductions — Implementation Plan

## Goal

Make how-to and tutorial pages more useful for AI agents answering developer questions by ensuring every page has a clear opening that states:

1. **What the task is** — what this page helps you do
2. **What you need** — prerequisites (tools, accounts, knowledge)
3. **What you will end up with** — the outcome

This also improves the experience for human readers scanning the page.

## Format

**Option chosen: `.. admonition:: At a glance` box**

Add an admonition block immediately after the page title on each page. The box contains a short paragraph covering the three elements above. Example:

```rst
.. admonition:: At a glance

   This guide shows you how to compile a smart contract module into a Wasm binary using cargo-concordium. You will need Rust, the wasm32 target, and cargo-concordium installed. When you are done, you will have a `.wasm` file ready to deploy on the Concordium blockchain.
```

**Why a named admonition box?**
The box visually separates the structured intro from the existing page content without disrupting the document's own flow. It is also easy for AI agents to identify as a summary section. For overview/index pages the outcome statement describes what you will *understand* after reading, not what you will have built.

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
| Concordium ID / Verify and Access | `how-to/concordium-id/` | ✅ Done |
| Integrations | `how-to/integrations/` | ✅ Done |
| Validation | `how-to/infrastructure/` | ✅ Done |
| Nodes | `how-to/nodes/` | ✅ Done |
| Smart Contracts | `how-to/smart-contracts/` | ✅ Done |
| Governance | `how-to/governance/` | ✅ Done |
| Web3 ID | `how-to/web3-id/` | ✅ Done |

### Tutorials

| Section | Path | Status |
|---|---|---|
| Quick start | `tutorials/quick-start.rst` | ✅ Done |
| Setup environment | `tutorials/setup-env.rst` | ✅ Done |
| Hello World / Counter | `tutorials/hello-world/`, `tutorials/counter/` | ✅ Done |
| Integrating Concordium ID | `tutorials/verify-account-ownership-signature-proofs/`, `tutorials/using-ID-in-dApps/`, `tutorials/verify-access/`, `tutorials/company-identity/` | ✅ Done |
| Transaction Workflows | `tutorials/protocol-level-sponsored-transactions/`, `tutorials/sponsoredTransactions/` | ✅ Done |
| Protocol-Level Tokens | `tutorials/plt/` | ✅ Done |
| Tokens and Assets | `tutorials/fungible-tokens/`, `tutorials/nft-minting/`, `tutorials/sft-minting/`, `tutorials/wCCD/`, `tutorials/onReceivingCIS2/` | ✅ Done |
| Building Smart Contracts | `tutorials/piggy-bank/`, `tutorials/smartContractUpgrade/` | ✅ Done |
| Governance | `tutorials/voting/` | ✅ Done |
| dApp Development | `tutorials/eSealing/`, `tutorials/low-code-nft-marketplace/`, `tutorials/daap-examples/` | ✅ Done |

## Notes

- There are approximately 120 pages in total across how-to and tutorials
- Pages that already have a clear structured intro can be skipped or lightly improved
- Pages where the existing content does not provide enough information to write a clear intro should be flagged for editorial attention
- Start with how-to/concordium-id (Verify and Access) as it is the first section in the How-to navigation
