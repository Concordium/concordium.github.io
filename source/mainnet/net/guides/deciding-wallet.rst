.. include:: ../../variables.rst
.. _choosing-wallet:

============================
Deciding between the wallets
============================

Why you need a wallet
=====================

You need a :term:`wallet` to interact with the Concordium blockchain and to manage your CCD. Currently, there are several first party wallets available: the Concordium Desktop Wallet, the |bw|, and three mobile wallets; the |mw-gen1|, the |mw-gen2|, and the |cryptox|. This topic outlines the major differences that you should be aware of when you decide which wallet to use.

The wallets are developed by Concordium Software and can only be used to hold :term:`CCD`, the native token of the Concordium blockchain. You can't use these wallets for any other cryptocurrencies.

No import of identities and accounts between some wallets
=========================================================

Before you decide which wallet to use, notice this: Due to differences in private key handling, identities and accounts cannot be exchanged between the Desktop Wallet and any of the other wallet types. The same applies between |mw-gen1| and |mw-gen2|. 
For details regarding private key handling :ref:`see below<store-private-keys>`.

You can exchange identities and accounts between the |bw| and the |mw-gen2|.

The |cryptox| supports importing identities and accounts from the |mw-gen2|, |mw-gen1|, and |bw|.

You can always send CCD from one wallet to another.

Considering the above, carefully select your wallet before creating identities and accounts.

Which wallet is best for you?
=============================

The wallets work on different environments: the Desktop Wallet on a computer, the |bw| on any device with a web browser, and |mw-gen1|, |mw-gen2|, and |cryptox| on a phone. The Desktop Wallet has an extra layer of security in the form of LEDGER device, whereas the other wallet types are more accesible and easier to use on a day-to-day basis.

- Desktop Wallet: Choose this wallet if you want extra security in the form of a :ref:`LEDGER<install-ledger>` device, or want to create multi-signature transactions. Desktop wallet requires a node.

- |bw|: Choose this wallet if you want to be able to access your accounts on the go from any computer and you only need to create standard (single signature) transactions. This wallet is also for developers creating dApps to connect to the Concordium blockchain and for dApp users.

- The mobile wallets: Choose a mobile wallet if you want to be able to access your accounts on the go and only need to create standard (single signature) transactions. The mobile wallets do not require a node (unless you are a validator), and you don't need a LEDGER device. The mobile wallets differ in the following aspects:

  - |mw-gen1|: This is the first generation mobile wallet. It is no longer available for new users but is still available for existing users who need to restore backup.

  - |mw-gen2|: This is the second generation mobile wallet. It uses a secret recovery phrase for wallet recovery and also connects to dApps.

  - |cryptox|: This is the third generation mobile wallet. It allows you to choose between wallet recovery from either secret key phrase or key file. It also connects to dApps and can import identities and accounts from |mw-gen2|, |mw-gen1|, and |bw|. With a new design and ongoing feature development, |cryptox| sets a new standard.

.. Note::

   If you are a new mobile wallet user, you must use either |mw-gen2| or |cryptox|. It is no longer possible for users of |mw-gen1| to create new accounts.

The following provides more details on the differences between the wallets.

.. _store-private-keys:

How the wallets store your private keys
=======================================

One of the main differences between the wallets lies in how they store your private keys.

-  The Desktop Wallet stores your private keys on a LEDGER device that is secured by a PIN code and backed up by a recovery phrase. The private keys never leave the LEDGER device, and the LEDGER device doesn't require internet access, which means you can keep your private keys offline. However, this also means that you need the LEDGER device to sign the transactions you create in the Desktop Wallet, which makes it less convenient than the other wallet types.

- The other wallet types don't use the LEDGER device for transaction signing and are therefore easier to use. However, because your device is connected to the internet, these wallets are more vulnerable to breaches than the Desktop Wallet. The wallets handle your private keys in different ways:

  - The |bw| stores your private keys in the wallet backed up by a secret recovery phrase that you create during setup.

  - The |mw-gen1| creates and stores your private keys on the phone. You must back up the private keys on a file.

  - The |mw-gen2| Creates and stores your private keys on the phone backed up by a secret recovery phrase that is created during setup.

  - The |cryptox| Creates and stores your private keys on the phone and gives you two options for backing them up: either by generating a secret recovery phrase during setup or by storing a copy of your private keys on a file.

How to backup a wallet
======================

Concordium strongly recommends that you make a backup of your wallet if you are using the Desktop Wallet or |mw-gen1|. Backups are created in different ways in the wallets.

- Desktop Wallet: You create a backup of your accounts, identities, and addresses by exporting the data to a file from the Desktop Wallet. This is not the same as creating a backup of your private keys. The backup of your private keys is essentially the 24-word recovery phrase for the LEDGER device. So for a complete backup, you need both the exported file and the LEDGER device. If you lose the PIN code to the LEDGER device, you can restore the LEDGER device from your recovery phrase. You can also set up a new LEDGER device with the recovery phrase. It's vital that you keep the recovery phrase safe. For more information, see *Recover accounts without a backup file* in :ref:`Make a backup of identities, accounts, and addresses<export-import>`.

- |bw|: Backups are not necessary for the |bw| because the secret recovery phrase created during setup can be used to recover your wallet. You must save the recovery phrase in a safe place.

- |mw-gen1|: You create a backup of your accounts, identities, addresses, and private keys by exporting the data to a file from the Mobile Wallet. If you lose your phone or upgrade to a new phone, you can use the file to gain access to your accounts and identities. Concordium strongly recommends that you store the backup file in a safe location and not on the phone itself. It's also vital that you keep the password to the backup file safe. Anyone with access to the file can gain access to your crypto assets. For more information, see :ref:`Export or import your identities and accounts <export-import>`.

- |mw-gen2|: Backups are not necessary for the |mw-gen2| because the secret recovery phrase created during setup can be used to recover your wallet. You must save the recovery phrase in a safe place.

- |cryptox|: |cryptox| offers two options for restoring your wallet. Option 1: You can use the secret recovery phrase created during setup, in which case you don't need to back up your wallet. Option 2: You create a backup of your accounts, identities, addresses, and private keys by exporting the data to a file from the Mobile Wallet.

.. Warning::
   You are solely responsible for keeping your assets secure regardless of which wallet you choose to use. You must never share your private keys, PIN codes, passwords, recovery phrases, LEDGER devices, or mobile devices with anyone.

What are the requirements for each wallet?
==========================================

- Desktop Wallet: A computer running Windows, macOS, or Linux, and a LEDGER NANO S or LEDGER NANO S PLUS. You also have to connect to a node. You can use the default Virtual Hive node (concordiumwalletnode.com), get a third-party to run a node for you, or run a node yourself. If you run a node yourself, your computer must meet the hardware requirements for this.

- |bw|: A device running one of the supported Chromium internet browsers (Chrome, Opera, Brave, Edge) with the |bw| extension installed.

- |mw-gen1|: An iPhone running iOS 13 or later or an Android phone running Android 8 or later.

- |mw-gen2|: An iPhone running iOS 15 or later or an Android phone running Android 8 or later.

- |cryptox|: An iPhone running iOS 15 or later or an Android phone running Android 8 or later.


Comparison
==========

The following table lists the major features of each wallet.

.. list-table::
   :widths: 10 10 10 10 10
   :header-rows: 1

   *  - Desktop Wallet
      - |mw-gen1|
      - |mw-gen2|
      - |bw|
      - |cryptox|
   *  - Must run on a computer
      - Runs only on mobile phone
      - Runs only on mobile phone
      - Must run on a computer
      - Runs only on mobile phone
   *  - Runs on MacOS, Windows, Linux
      - Runs on iOS 13 or later, Android 8 or later
      - Runs on iOS 15 or later, Android 8 or later
      - Runs on Chrome, Brave, Opera, Edge
      - Runs on iOS 15 or later, Android 8 or later
   *  - Secured by password and a LEDGER device
      - Secured by password and biometrics
      - Secured by password and biometrics
      - Secured by password and secret recovery phrase
      - Secured by password and biometrics
   *  - Encrypted
      - Encrypted
      - Encrypted
      - Encrypted
      - Encrypted
   *  - Backup file includes account names and addresses, identities, and the address book. LEDGER device is needed for a full recovery.
      - Backup file includes accounts, identities, address book, and private keys.
      - Backup is not necessary but secret recovery phrase is needed.
      - Backup is not necessary but secret recovery phrase is needed.
      - Backup is not necessary but secret recovery phrase is needed.
   *  - Private keys are stored on the LEDGER device that is secured by a PIN code and backed up by recovery phrase.
      - Private keys are stored in the wallet.
      - Private keys are stored in the wallet and backed up by a secret recovery phrase.
      - Private keys are stored in the wallet and secured by the passcode used to encrypt the wallet and backed up with the secret recovery phrase.
      - Private keys are stored in the wallet and backed up by a secret recovery phrase.
   *  - Creation and management of single signature and multi-signature accounts
      - Creation and management of single signature accounts only
      - Creation and management of single signature accounts only
      - Creation and management of single signature accounts only
      - Creation and management of single signature accounts only
   *  - Creation of identities
      - Creation of identities
      - Creation of identities
      - Creation of identities
      - Creation of identities
   *  - Creation and management of validator accounts
      - Creation and management of validator accounts. Rewards are visible in the wallet.
      - Creation and management of validator accounts. Rewards are visible in the wallet.
      - Creation and management of validator accounts. Rewards are visible in the wallet.
      - Creation and management of validator accounts. Rewards are visible in the wallet.
   *  - A node is required
      - A node is not needed unless validator
      - A node is not needed unless validator
      - A node is not needed unless validator
      - A node is not needed unless validator
   *  - Cannot connect to dApps
      - Cannot connect to dApps
      - Can connect to dApps
      - Can connect to dApps
      - Can connect to dApps
   *  - Cannot recover in other wallet types
      - Cannot recover in other wallet types
      - Can recover in |mw-gen2| and |bw|
      - Can recover in |bw| and |mw-gen2|
      - Can recover from |mw-gen1|, |mw-gen2|, |bw|; can be recovered in |bw| and |mw-gen2|

Next steps
==========

- If you want to use the Desktop Wallet, :ref:`download <downloads-desktop-wallet>` and install it on your computer, and then see :ref:`Overview of setting up the Desktop Wallet<overview-desktop>` for the next steps.

- If you want to use the |mw-gen1|, :ref:`install <downloads-mwgen1>` the app on your mobile phone, and then see :ref:`Set up <setup-mobile-wallet>` for the next steps.

- If you want to use the |mw-gen2|, :ref:`install <downloads-mwgen2>` the app on your mobile phone, and then see :ref:`Set up <setup-g2-mobile-wallet>` for the next steps.

- If you want to learn more about the LEDGER device, go to `LEDGER's website <https://www.ledger.com>`_.

- If you want to use the |bw|, :ref:`install <downloads-browser-wallet>` the Google Chrome extension, and then see :ref:`Set up the Concordium Wallet for Chrome<setup-browser-wallet>` for the next steps.

- If you want to use the |cryptox|, :ref:`install <downloads-cryptox>` on your mobile phone, and then see :ref:`Set up<setup-cryptox-wallet>` for the next steps.

.. toctree::
   :hidden:
   :maxdepth: 1

   ../concepts/concepts-transactions
