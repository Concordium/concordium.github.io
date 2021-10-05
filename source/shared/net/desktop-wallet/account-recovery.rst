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

The recovery process is used to recover lost accounts using only the Ledger device that was used to create those accounts.

You only have to perform a recovery if you have lost the backup of your accounts and identities. To learn more about making backups of your data, see :ref:`Make a backup of identities, accounts, and addresses <export-import-desktop>`.

If you've lost your Ledger device or the device has stopped working, you can restore the keys in another Ledger device by initializing it with the recovery phrase used for the original device. To learn more about the recovery phrase of a ledger device:
`What is a recovery phrase <https://www.ledger.com/academy/crypto/what-is-a-recovery-phrase/>`_ .

   .. Note::
      This recovery process only recovers your accounts, not the identities used to create the accounts because they don't exist on the chain. To learn more about identities, see :ref:`Identities and accounts <reference-id-accounts>`.
      The names of the accounts and the notes on the credentials are also not recoverable because they are only saved locally.

The recovery process
--------------------------------------
The keys you use to sign account transactions are attached to credentials, and those credentials each belong to an identity.

When you create a new identity in the Desktop Wallet, it has an associated number on the Ledger, referred to as the identity index. These indices are used sequentially, so the first identity created from a Ledger uses index *0*, the next uses index *1*, and so forth.

The recovery process checks the identities sequentially by using the indices. Unfortunately, the identity issuance process can fail and cause an index to be skipped, and therefore, you must determine yourself when the recovery is finished. If you've never had your identity issuance fail, you can stop the recovery when you encounter an unused index.

For each identity index, the recovery process uses your Ledger device to calculate the IDs of the credentials, which also have sequential indices. The wallet then checks on the chain whether the credentials have been deployed, and which account each credential is attached to. These accounts are added to the Desktop Wallet along with the deployed credentials.

The recovery also creates placeholders for the missing identities to indicate that the index has already been used. However, the information used to create new accounts and credentials on a missing identity can't be recovered because it doesn't exist on the chain. Therefore you can't create new accounts using these placeholders.

An incomplete backup
--------------------------------------

The recovery also tries to recover accounts on present identities. This is to allow you to recover accounts from an incomplete backup where some of the accounts associated with an identity are missing.
