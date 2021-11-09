
.. _choosing-wallet:

==========================================================
Deciding between the Desktop Wallet and the Mobile Wallet
==========================================================

.. contents::
   :local:
   :backlinks: none

Why you need a wallet
=====================

You need a wallet to interact with the Concordium blockchain and to manage your GTU. Currently, there are two first party wallets available: the Concordium Desktop Wallet and the Concordium Mobile Wallet. This topic outlines the major differences that you should be aware of when you decide which wallet to use.

Both the Concordium Desktop Wallet and the Concordium Mobile Wallet are developed by Concordium Software and can only be used to hold :ref:`GTU<glossary-GTU>`, the native token of the Concordium blockchain. You can't use these wallets for any other cryptocurrencies.

No import of identities and accounts between wallets
====================================================

Before you decide which wallet to use, it's important to know that you can’t import identities and accounts from the Mobile Wallet into the Desktop Wallet. Conversely, you can’t import identities and accounts from the Desktop Wallet into the Mobile Wallet. This is because they handle private keys in different ways. It’s therefore essential that you choose between the wallets before you start creating identities and accounts. You can, however, send GTU from one wallet to another.

Which wallet is best for you?
=============================

The wallets work on two different environments: the Desktop Wallet on a computer and the Mobile Wallet on a phone. The Mobile Wallet is more accessible and easier to use on a day-to-day basis whereas the Desktop Wallet has an extra layer of security in the form of a Ledger device.

- **Desktop Wallet**: Choose this wallet if you want extra security in the form of a :ref:`Ledger<install-Ledger-app>` hardware device, want to create multi-signature transactions, and want to be able to create a baker account.

- **Mobile Wallet**: Choose this wallet if you want to be able to access your accounts on the go, don’t want to run a node, don’t want to depend on a Ledger hardware device, and only need to create standard (single signature) transactions.

The following provides more details on the differences between the wallets.

How the wallets store your private keys
=======================================

One of the main differences between the two wallets lies in how they store your private keys.

-  The Desktop Wallet stores your private keys on a Ledger that is secured by a PIN code and backed up by a recovery phrase. The private keys never leave the Ledger hardware device, and the Ledger doesn't require internet access, which means you can keep your private keys offline. However, this also means that you need the Ledger to sign the transactions you create in the Desktop Wallet, which makes it less convenient than the Mobile Wallet.

- The Mobile Wallet creates and stores your private keys on the phone. This means it's easier to use because you don't need a Ledger device to make transactions. However, because your phone is connected to the internet, the wallet is more vulnerable to security breaches than the Desktop Wallet.

How to backup a wallet
======================

We strongly recommend that you make a backup of your wallet regardless of which one you use. Backups are created in different ways in the two wallets.

- **Backup of the Desktop Wallet**: You create a backup of your accounts, identities, and addresses by exporting them to a file from the Desktop Wallet. This doesn't mean that you create a backup of your private keys. The backup of your private keys is essentially the 24-recovery phrase for the Ledger. If you lose the PIN code to the Ledger, you can restore the Ledger device from your recovery phrase. You can also set up a new Ledger device with the recovery phrase. It's vital that you keep the recovery phrase safe. For more information, see :ref:`Make a backup of identities, accounts, and addresses<export-import-desktop>` and :ref:`Account recovery<account-recovery-desktop>`.

- **Backup of the Mobile Wallet**: You create a backup of your accounts, identities, addresses, and private keys by exporting them to a file from the Mobile Wallet. If you lose your phone or upgrade to a new phone, you can use the file to gain access to your accounts and identities. Alternatively, if you're using an iPhone and you have iCloud Backup turned on, you can make a backup from iCloud. It's vital that you keep the password to the backup file safe. Anyone with access to the file can gain access to your crypto assets. For more information, see :ref:`Explore the *More* page in the Mobile Wallet <explore-more>`.

.. Warning::
   You are solely responsible for keeping your assets secure regardless of which wallet you choose to use. You must never share your private keys, PIN codes, passwords, recovery phrases, Ledgers, or mobile devices with anyone.

What are the requirements for each wallet?
==========================================

- **Mobile Wallet**: you’ll need an iPhone running iOS 13 or later or an Android phone running Android 8 or later.

- **Desktop Wallet**: you’ll need a computer running Windows, macOS, or Linux, and you’ll need a Ledger Nano S. You’ll also have to run a node, and your computer must meet the hardware requirements for this.

Comparison
==========

The following table lists the major features of each wallet.

.. list-table::
   :widths: 20 20
   :header-rows: 1

   *  - **Desktop Wallet**
      - **Mobile Wallet**
   *  - Secured by password
      - Secured by password and biometrics
   *  - Encrypted
      - Encrypted
   *  - Backup includes accounts, identities, and the address book.
      - Backup includes accounts, identities, address book, and private keys.
   *  - Private keys are stored on the Ledger that is secured by a PIN code and backed up by recovery phrase.
      - Private keys are stored in the wallet.
   *  - Creation and management of single signature accounts
      - Creation and management of single signature accounts
   *  - Creation and management of multi signature accounts
      - No creation and management of multi signature accounts
   *  - Creation of identities
      - Creation of identities
   *  - Creation and management of baker accounts
      - The Concordium Client must be used to manage baker accounts. Rewards are visible in the wallet.
   *  - Running a node is a requirement
      - Running a node is not needed

Next steps
==========

If you want to use the Desktop Wallet, :ref:`download <downloads>` and install it on your computer, and then see :ref:`Overview of setting up the Desktop Wallet<overview-desktop>` for the next steps.

If you want to use the Mobile Wallet, :ref:`download <downloads>` the app on your mobile phone, and then see :ref:`Get started with the Mobile Wallet<mobile-get-started>` for the next steps.

If you want to learn more about the Ledger device, go to `Ledger's website <https://www.ledger.com>`_.
