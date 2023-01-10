.. include:: ../../variables.rst
.. _backup:

======
Backup
======

.. Note::

   This information is not relevant for |mw-gen2| or |bw| which uses a secret recovery phrase to recover a wallet.

Making a backup is an essential action every time you create accounts whether it is an initial account or a regular account.

A backup is only necessary when creating new accounts, not every time a transaction is executed. Think of your account like a safe: it contains assets. If you lose the key, you cannot get into the safe unless you have a copy of the key. Your backup is your copy of the safe key.

You can make a backup from |mw-gen1| or from Desktop Wallet but there are differences between them.

Backups for |mw-gen1|
=====================

Because the |mw-gen1| does not use a secret recovery phrase, your backup file is the only way you can restore your account keys should you lose your phone or have to re-install your phone or wallet. You will permanently lose access to your wallet if you do not have a backup of your private key file. Concordium cannot recover your private keys if you lose them. If you don’t make a backup file you will lose access to your tokens forever.

If you set up a new phone and transfer the wallet, you will lose the private keys; they can only be recovered from the pre-exported backup file.

Account keys are not stored in the cloud, only on the device itself in order to protect your security.

A new backup file should be exported EVERY time a new account is made, otherwise keys for the account can´t be recovered.

How it works
------------

The |mw-gen1| provides built-in functionality to export wallet backups, encrypted under a passcode you choose. The wallet backup contains the keys for all wallet accounts. Each account has its own keys. Every time you make a new account in your wallet, you have to make a wallet backup to include the newly created account keys.

.. Warning:
   Concordium strongly urges you to backup your account keys using the export function in the wallet whenever a new account has been created. The wallet backup as well as the export password must be stored securely. You cannot recover your accounts without a wallet backup and its passcode.

Even if you have access to the wallet and can see the accounts after a phone restoration operation or similar action, the keys to the accounts on the wallet may be missing, in which case you don’t have access to the CCDs. The following describes how you can check if you have the necessary keys and access to your accounts.

How to check that you have your account keys
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The app does not indicate if it has the keys to the accounts. To check whether the app has the keys for all accounts, do the following:

#. Open your wallet.
#. Create one new account for each of your identities.

If this succeeds for all identities, the wallet has all the necessary account keys. The wallet does not have the keys to the accounts created under identities where this fails.

Backups for Desktop Wallet
==========================

Because the Desktop Wallet uses a LEDGER device to sign all transactions, you can more easily recover your wallet and accounts if anything happens to your Desktop Wallet or you cannot access it. To access your Desktop Wallet, you use the backup file that you create in combination with your LEDGER device.

If you lose the backup file with your accounts, you can use the Desktop Wallet in combination with your LEDGER device to recover those accounts. You only have to perform a recovery if you have lost the backup of your accounts and identities. If you still have the backup file, you can import the accounts back into the Desktop Wallet.

If you’ve lost your LEDGER device or the device has stopped working, you can restore the keys in another LEDGER device by restoring it from the recovery phrase used for the original device. As long as you have your recovery phrase available, you can recover your wallet and accounts.

How to proceed
==============

Upgrade
-------

Concordium is continuously improving the security and reliability of its products, so it is vital to ensure that your |mw-gen1| or Desktop Wallet is upgraded to the latest version available. To check which version of your Concordium Wallet is currently available, refer to the appropriate release notes:

- :ref:`Mainnet release notes<mainnet-release-notes>`
- :ref:`Testnet release notes <testnet-release-notes>`

Backup
------

For instructions on how to perform the backup, see :ref:`Backup and restore guide<export-import>`.

Final Notes
===========

If the wallet does not have the keys for some accounts and you have previously made a wallet backup using the export functionality, uninstall and reinstall the |mw-gen1| or Desktop Wallet. You can then import your wallet backup into the new wallet.

If the wallet does not have the keys from some accounts and you do not have a backup of the keys on an exported file, these accounts cannot be used. Therefore, you should ensure that you never ask anyone to transfer CCD to such accounts. Instead, go through a new identification process and generate new accounts that can be used in the future. And remember to export a new backup of the account keys each time you have generated a new account in the app.

Keep previous backup files until you have verified that your latest backup is working properly.
