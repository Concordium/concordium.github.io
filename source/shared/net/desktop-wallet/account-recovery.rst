.. _account-recovery-desktop:

=====================
Account recovery
=====================

.. contents::
    :local:
    :backlinks: none
    :depth: 1

Account recovery in the desktop wallet
=======================================================

The recovery process is used to recover lost accounts using only the ledger device, which was used to create those accounts.

It should only be necessary to perform this recovery if you have lost the backup of your accounts and identities. To learn more about making backups of your data, see :ref:`Make a backup of identities, accounts, and addresses <export-import-desktop>`.

If the user has lost their ledger device or the device has ceased to function, the keys can be restored in another ledger device, by initialising it with the same recovery phrase as the original device. To learn more about the recovery phrase of a ledger device:
`What is a recovery phrase <https://www.ledger.com/academy/crypto/what-is-a-recovery-phrase/>`_ .

   .. Note::
      This recovery process will recover your accounts, but it is not possible to recover the identities used to create these accounts, because they do not exists on the chain, to learn more about identities see :ref:`Identities and accounts <reference-id-accounts>`.
      The names of the accounts, and the notes on the credentials are also not recoverable, as these are only saved locally.

The recovery process
--------------------------------------
The keys, which are used to sign account transactions, are attached to credentials, and those credentials each belong to an identity.

In the desktop wallet, when we create a new identity, it has an associated number on the ledger, which we refer to as the identity index. These indices are used sequentially, so the first identity created from a ledger uses index *0*, the next uses index *1* and so forth.

The recovery process takes advantage of that and also checks the indices sequentially. Unfornately the identity process can fail, which could cause an index to be skipped, so the you must determine yourself when the recovery is finished. If you have never had your identity issuance fail, you can stop the recovery when you encounter an unused index.

For each identity index, the recovery process uses your ledger device to calculate the ids of the credentials, which also have sequential indices. The wallet can then check on the chain whether the credentials have been deployed, and which account they are each attached to. These accounts are added to the wallet, along with the credentials that had been deployed.

The recovery will also create placeholders for the missing identities, to indicate that the index has already been used. The information used to create new accounts and credentials on that identity cannot not recovered though, because it does not exist on the chain, and therefore you cannot create new accounts using these placeholders.

An incomplete backup
--------------------------------------

The recovery will also try to recover accounts on present identities. This is to allow you to recover your accounts from an incomplete backup where some of the identity's accounts are missing.
