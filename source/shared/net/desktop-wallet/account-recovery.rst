.. _account-recovery-desktop:

=====================
Account recovery
=====================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

Recovering accounts in the desktop wallet
=======================================================

The recovery process is used to recover lost accounts using only the ledger device, which was used to create the accounts.

It should only be necessary to perform this recovery if you have lost the backup of your accounts and identities. To learn more abort making backups of your data, see :ref:`Make a backup of identities, accounts, and addresses <export-import-desktop>`.

If the user has lost their ledger device or the device has ceased to function, the keys can be restored in another ledger device, by initialising it with the same recovery phrase as the original device. To learn more about the recovery phrase of a ledger device: https://www.ledger.com/academy/crypto/what-is-a-recovery-phrase.

   .. Note::
      This recovery process will recover your accounts, but it is not possible to recover the identities used to create these accounts, because they do not exists on the chain, to learn more about identities see :ref:`Identities and accounts <reference-id-accounts>`.

The recovery process
--------------------------------------
The keys, which are used to sign account transactions are attached to credentials, and those credentials each belong to an identity.

In the desktop wallet, when we create a new identity, it has an associated number, which we refer to as the identity index. These indices are used sequentially, so the first identity created from a ledger uses index *0*, the next index *1* and so forth.

The recovery process take advantage of that and also checks the indices sequentially. Unfornately the identity process can fail, which could cause an index to be skipped, so the you must determine yourself when the recovery is finished. If you have never had your identity issuance fail, the recovery will complete when you encounter an unused index.

For each identity index, the recovery process uses your ledger device to calculate the ids of the credentials, which also have sequential indices. The wallet can then check on the chain whether the credentials have been deployed, and which account they are each attached to.

This allows us to discover which accounts the attached ledger is able to sign transactions from, and we can add those accounts to the wallet.

An incomplete backup
--------------------------------------

The recovery will also try to recover accounts on present identities. This is to allow you to recover your accounts from an incomplete backup where only some of the identity's accounts are missing.
