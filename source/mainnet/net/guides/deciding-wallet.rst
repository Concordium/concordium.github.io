.. include:: ../../variables.rst
.. _choosing-wallet:

=============================================================
Deciding between the Desktop Wallet, |mw-gen1|, and |mw-gen2|
=============================================================

Why you need a wallet
=====================

You need a :ref:`wallet<glossary-wallet>` to interact with the Concordium blockchain and to manage your CCD. Currently, there are three first party wallets available: the Concordium Desktop Wallet, |mw-gen2|, and the |mw-gen1|. This topic outlines the major differences that you should be aware of when you decide which wallet to use.

All of the wallets are developed by Concordium Software and can only be used to hold :ref:`CCD<glossary-CCD>`, the native token of the Concordium blockchain. You can't use these wallets for any other cryptocurrencies.

No import of identities and accounts from one wallet to another
===============================================================

Before you decide which wallet to use, it's important to know that you can’t import identities and accounts from the |mw-gen1| or |mw-gen2| into the Desktop Wallet. Conversely, you can’t import identities and accounts from the Desktop Wallet into |mw-gen1| or |mw-gen2|. You also can't import identities and accounts between |mw-gen1| and |mw-gen2|. This is because they handle private keys in different ways as :ref:`described later<store-private-keys>` in this topic. It’s therefore essential that you choose between the wallets before you start creating identities and accounts.

.. warning:: You can't exchange identities and accounts between |mw-gen1| and |mw-gen2|, or |mw-gen1| or |mw-gen2| and the Desktop Wallet. You can, however, send CCD from one wallet to another.

Which wallet is best for you?
=============================

The wallets work on two different environments: the Desktop Wallet on a computer, and |mw-gen1| and |mw-gen2| on a phone. The |mw-gen1| and |mw-gen2| are more accessible and easier to use on a day-to-day basis whereas the Desktop Wallet has an extra layer of security in the form of a Ledger device.

- Desktop Wallet: Choose this wallet if you want extra security in the form of a :ref:`Ledger<install-Ledger-app>` hardware device, or want to create multi-signature transactions. Requires a node. If you plan to become a baker, Concordium recommends the Desktop Wallet because of the extra security of the Ledger hardware device.

- |mw-gen2|: Choose this wallet if you want to be able to access your accounts on the go and only need to create standard (single signature) transactions. |mw-gen2| does not require a node (unless you are a baker), and you don’t need a Ledger hardware device. Uses a secret recovery phrase for wallet recovery.

- |mw-gen1|: Is still available for users who have a backup that they need to restore but not for new users. Choose this wallet if you want to be able to access your accounts on the go and only need to create standard (single signature) transactions.|mw-gen1| does not require a node (unless you are a baker), and you don’t need a Ledger hardware device. Requires you to make backups regularly.

.. Note::

   If you are a new mobile wallet user, you must use the |mw-gen2|.

The following provides more details on the differences between the wallets.

.. _store-private-keys:

How the wallets store your private keys
=======================================

One of the main differences between the wallets lies in how they store your private keys.

-  The Desktop Wallet stores your private keys on a Ledger that is secured by a PIN code and backed up by a recovery phrase. The private keys never leave the Ledger hardware device, and the Ledger doesn't require internet access, which means you can keep your private keys offline. However, this also means that you need the Ledger to sign the transactions you create in the Desktop Wallet, which makes it less convenient than the |mw-gen1| or |mw-gen2|.

- The |mw-gen1| creates and stores your private keys on the phone. This means it's easier to use because you don't need a Ledger device to make transactions. However, because your phone is connected to the internet, the wallet is more vulnerable to security breaches than the Desktop Wallet. You must back up the private keys on your phone.

- The |mw-gen2| uses a secret recovery phrase that is created during setup to generate your private keys. You don't need a Ledger device for transactions. However, because your phone is connected to the internet, the wallet is more vulnerable to security breaches than the Desktop Wallet.

How to backup a wallet
======================

Concordium strongly recommends that you make a backup of your wallet. Backups are created in different ways in the Desktop Wallet and |mw-gen1|.

- Desktop Wallet: You create a backup of your accounts, identities, and addresses by exporting the data to a file from the Desktop Wallet. This is not the same as creating a backup of your private keys. The backup of your private keys is essentially the 24-word recovery phrase for the Ledger. So for a complete backup, you need both the exported file and the Ledger. If you lose the PIN code to the Ledger, you can restore the Ledger device from your recovery phrase. You can also set up a new Ledger device with the recovery phrase. It's vital that you keep the recovery phrase safe. For more information, see :ref:`Make a backup of identities, accounts, and addresses<export-import>` and `Account recovery <https://developer.concordium.software/en/mainnet/net/guides/export-import.html?highlight=account%20recovery>`_.

- |mw-gen1|: You create a backup of your accounts, identities, addresses, and private keys by exporting the data to a file from the Mobile Wallet. If you lose your phone or upgrade to a new phone, you can use the file to gain access to your accounts and identities. Concordium strongly recommends that you store the backup file in a safe location and not on the phone itself. It's also vital that you keep the password to the backup file safe. Anyone with access to the file can gain access to your crypto assets. For more information, see :ref:`Export or import your identities and accounts <export-import>`.

Backups are not necessary for the |mw-gen2| because the secret recovery phrase created during setup protects your private keys.

.. Warning::
   You are solely responsible for keeping your assets secure regardless of which wallet you choose to use. You must never share your private keys, PIN codes, passwords, recovery phrases, Ledgers, or mobile devices with anyone.

What are the requirements for each wallet?
==========================================

- |mw-gen1| or |mw-gen2|: you’ll need an iPhone running iOS 13 or later or an Android phone running Android 8 or later.

- Desktop Wallet: you’ll need a computer running Windows, macOS, or Linux, and you’ll need a Ledger Nano S or Ledger Nano S Plus. You’ll also have to run a node, and your computer must meet the hardware requirements for this.

Comparison
==========

The following table lists the major features of each wallet.

.. list-table::
   :widths: 10 10 10
   :header-rows: 1

   *  - Desktop Wallet
      - |mw-gen1|
      - |mw-gen2|
   *  - Secured by password and a Ledger device
      - Secured by password and biometrics
      - Secured by password and biometrics
   *  - Encrypted
      - Encrypted
      - Encrypted
   *  - Backup file includes account names and addresses, identities, and the address book. Ledger is needed for a full recovery.
      - Backup file includes accounts, identities, address book, and private keys.
      - Backup is not necessary but secret recovery phrase is needed.
   *  - Private keys are stored on the Ledger that is secured by a PIN code and backed up by recovery phrase.
      - Private keys are stored in the wallet.
      - Private keys are stored in the wallet and secured by the passcode used to encrypt the wallet and backed up with the secret recovery phrase.
   *  - Creation and management of single signature accounts
      - Creation and management of single signature accounts
      - Creation and management of single signature accounts
   *  - Creation and management of multi signature accounts
      - N/A
      - N/A
   *  - Creation of identities
      - Creation of identities
      - Creatopm of identities
   *  - Creation and management of baker accounts
      - Creation and management of baker accounts
      - Creation and management of baker accounts
   *  - Running a node is a requirement
      - Running a node is not needed unless baking
      - Running a node is not needed unless baking

Next steps
==========

- If you want to use the Desktop Wallet, :ref:`download <downloads>` and install it on your computer, and then see :ref:`Overview of setting up the Desktop Wallet<overview-desktop>` for the next steps.

- If you want to use the |mw-gen1|, :ref:`download <downloads>` the app on your mobile phone, and then see :ref:`Setup <setup-mobile-wallet>` for the next steps.

- If you want to use the |mw-gen2|, :ref:`download <downloads>` the app on your mobile phone, and then see :ref:`Setup <setup-g2-mobile-wallet>` for the next steps.

- If you want to learn more about the Ledger device, go to `Ledger's website <https://www.ledger.com>`_.
