.. _transactions-overview:

=====================
Transactions overview
=====================

.. contents::
    :local:
    :backlinks: none

A transaction on the Concordium blockchain is an operation which applies some change to the chain. All transactions are recorded on the chain and once recorded, they are immutable. A transaction always has one sender :ref:`account<glossary-account>` and is signed using the keys of this account.

The most basic transaction is the CCD transfer that is used to send CCD from one account to another. However, there are several transaction types on the Concordium blockchain:

- Send CCD
- Send CCD with a schedule
- Shield CCD
- Unshield CCD
- Make shielded transfer
- Add baker
- Remove baker
- Update baker stake
- Update restake earnings
- Update baker keys
- Update account credentials

You can make transactions using either the Desktop Wallet, the Mobile Wallet, or the Concordium Client. Note that the Mobile Wallet doesn’t support all transaction types, and that you need a Ledger device to submit transactions from the Desktop Wallet.

- Mobile Wallet: supports send CCD, shield CCD, and unshield CCD.
- Desktop Wallet: supports all transaction types (except smart contract transactions).
- Concordium Client: supports all transaction types.

How transactions work
=====================

When a baker receives a transaction from a participant on the chain, it performs a few basic checks to verify that the transaction is eligible for *inclusion* in a :ref:`block<glossary-block>`. Transactions that meet all checks are considered *successful* and their changes are applied to the chain. If any of the checks fail, the transaction is ignored. A transaction is permanent when the block that contains the transactions is :ref:`finalized<glossary-finalization>`.

In some situations, transactions are included in the blockchain but recorded as *rejected*. This can happen, for example, if a sender tries to overdraw their account. If a transaction is rejected, the transaction fee is still deducted from the sender account but other than that, it has no effect.

There’s a :ref:`sequence number<glossary-transaction-sequence-number>` associated with each account. This number increases sequentially with each transaction sent from the account and is recorded into the transaction. If a transaction has a sequence number that doesn’t  match the current sequence number of the account, the transaction is not eligible for inclusion on the chain. This ensures that transactions are included only once and in a specific order.

Transaction fees
=================

Every transaction has a well-defined *fee*, and the fee of each transaction depends on the transaction type. When the transaction is submitted to the chain, the fee is deducted from the sender's account and paid to the Concordium network as a fee for carrying out the transaction. The fee is measured in the unit NRG which corresponds to CCD according to a variable conversion factor (currently 1 NRG = 0.0001 CCD). Read more about conversions between CCD, NRG, and Euros in :ref:`exchange-rates`.
