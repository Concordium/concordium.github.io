.. _proposed-transactions:

==========================
View transaction proposals
==========================

View a list of multi-signature proposals
========================================

The list of proposals gives you an overview of all the multi-signature proposals you've created and their status. The proposals are shown in chronological order. By default, you can view the latest 50 transactions, but you have the possibility of viewing more if needed.

.. not sure how this works yet. Maybe in the coming release?

- To get an overview of all the transactions you've proposed and their status, go to **Multi signature transactions** and then to **Your proposed transactions**.

- To view the details of a transaction, select the relevant transaction. You can then see the details of the proposal, export the proposal, import signatures, or submit the transaction to the chain depending on the status of the transaction.

Transactions can have the following status:

- **Unsubmitted**: The transaction has not been submitted to the chain yet for one of the following reasons:

   - You haven't sent the proposal to the co-signers yet, so they can't sign it.
   - The co-signer hasn't returned the proposal.
   - You haven't imported the signed proposal.
   - You haven't submitted the signed transaction to the chain.

- **Submitted -pending**: The transaction has been submitted to the chain and is awaiting finalization.

- **Finalized**: The proposal has been signed by all co-signers, the signatures have been imported, and the transaction has been submitted to the chain.

- **Expired**: The transaction was not submitted to the chain before the expiry time. You must submit proposals to the chain before the expiry date. Otherwise, the proposal will expire, and you'll have to create a new one.

- **Cancelled**: The proposal has been cancelled. You can cancel proposals with the status unsubmitted. This includes proposals that have been generated but not signed, proposals that have been generated and are awaiting signatures, and signed proposals that have not been submitted to the blockchain. Once a proposal has been submitted to the chain, you can't cancel it.
