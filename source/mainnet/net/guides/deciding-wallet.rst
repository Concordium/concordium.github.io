.. include:: ../../variables.rst
.. _choosing-wallet:

============================
Deciding between the wallets
============================

Why you need a wallet
=====================

You need a :ref:`wallet<glossary-wallet>` to interact with the Concordium blockchain and to manage your CCD. Currently, there are four first party wallets available: the Concordium Desktop Wallet, the |mw-gen2|, |mw-gen1|, and the |bw|. This topic outlines the major differences that you should be aware of when you decide which wallet to use.

The wallets are developed by Concordium Software and can only be used to hold :ref:`CCD<glossary-CCD>`, the native token of the Concordium blockchain. You can't use these wallets for any other cryptocurrencies.

No import of identities and accounts from one wallet to another
===============================================================

Before you decide which wallet to use, it's important to know that you can’t import identities and accounts from the |mw-gen1|, |mw-gen2|, or |bw| into the Desktop Wallet. Conversely, you can’t import identities and accounts from the Desktop Wallet into |mw-gen1|, |mw-gen2|, or |bw|. You also can't import identities and accounts between |mw-gen1| and |mw-gen2|. This is because they handle private keys in different ways as :ref:`described later<store-private-keys>` in this topic. It’s therefore essential that you choose between the wallets before you start creating identities and accounts.

You can only exchange identities and accounts between the |bw| and the |mw-gen2|.

You can always send CCD from one wallet to another.

Which wallet is best for you?
=============================

The wallets work on two different environments: the Desktop Wallet on a computer, the |bw| on any device with a web browser, and |mw-gen1| and |mw-gen2| on a phone. The |mw-gen1| and |mw-gen2| are more accessible and easier to use on a day-to-day basis whereas the Desktop Wallet has an extra layer of security in the form of a LEDGER device.

- Desktop Wallet: Choose this wallet if you want extra security in the form of a :ref:`LEDGER<install-Ledger-app>` device, or want to create multi-signature transactions. Desktop wallet requires a node. If you plan to become a baker, Concordium recommends the Desktop Wallet because of the extra security of the LEDGER device.

- |mw-gen2|: Choose this wallet if you want to be able to access your accounts on the go and only need to create standard (single signature) transactions. |mw-gen2| does not require a node (unless you are a baker), and you don’t need a LEDGER device. It uses a secret recovery phrase for wallet recovery. It also connects to dApps.

- |mw-gen1|: Is still available for users who have a backup that they need to restore but not for new users. Choose this wallet if you want to be able to access your accounts on the go and only need to create standard (single signature) transactions. |mw-gen1| does not require a node (unless you are a baker), and you don’t need a LEDGER device. Requires you to make backups regularly.

- |bw|: Choose this wallet if you want to be able to access your accounts on the go from any computer and you only need to create standard (single signature) transactions. This wallet is also for developers creating dApps to connect to the Concordium blockchain and for dApp users.

.. Note::

   If you are a new mobile wallet user, you must use the |mw-gen2|. It is no longer possible for users of |mw-gen1| to create new accounts.

The following provides more details on the differences between the wallets.

.. _store-private-keys:

How the wallets store your private keys
=======================================

One of the main differences between the wallets lies in how they store your private keys.

-  The Desktop Wallet stores your private keys on a LEDGER device that is secured by a PIN code and backed up by a recovery phrase. The private keys never leave the LEDGER device, and the LEDGER device doesn't require internet access, which means you can keep your private keys offline. However, this also means that you need the LEDGER device to sign the transactions you create in the Desktop Wallet, which makes it less convenient than the |mw-gen1| or |mw-gen2|.

- The |mw-gen1| creates and stores your private keys on the phone. This means it's easier to use because you don't need a LEDGER device to make transactions. However, because your phone is connected to the internet, the wallet is more vulnerable to security breaches than the Desktop Wallet. You must back up the private keys on your phone.

- The |mw-gen2| uses a secret recovery phrase that is created during setup to generate your private keys. You don't need a LEDGER device for transactions. However, because your phone is connected to the internet, the wallet is more vulnerable to security breaches than the Desktop Wallet.

- The |bw| relies on the secret recovery phrase you created during setup to secure your private keys. You don't need a LEDGER device for transactions. However, because your device is connected to the internet, the wallet is more vulnerable to security breaches than the Desktop Wallet.

How to backup a wallet
======================

Concordium strongly recommends that you make a backup of your wallet if you are using |mw-gen1| or Desktop Wallet. Backups are created in different ways in the wallets.

- Desktop Wallet: You create a backup of your accounts, identities, and addresses by exporting the data to a file from the Desktop Wallet. This is not the same as creating a backup of your private keys. The backup of your private keys is essentially the 24-word recovery phrase for the LEDGER device. So for a complete backup, you need both the exported file and the LEDGER device. If you lose the PIN code to the LEDGER device, you can restore the LEDGER device from your recovery phrase. You can also set up a new LEDGER device with the recovery phrase. It's vital that you keep the recovery phrase safe. For more information, see *Recover accounts without a backup file* in :ref:`Make a backup of identities, accounts, and addresses<export-import>`.

- |mw-gen1|: You create a backup of your accounts, identities, addresses, and private keys by exporting the data to a file from the Mobile Wallet. If you lose your phone or upgrade to a new phone, you can use the file to gain access to your accounts and identities. Concordium strongly recommends that you store the backup file in a safe location and not on the phone itself. It's also vital that you keep the password to the backup file safe. Anyone with access to the file can gain access to your crypto assets. For more information, see :ref:`Export or import your identities and accounts <export-import>`.

- |bw|: Backups are not necessary for the |bw| because the secret recovery phrase created during setup can be used to recover your private keys.

- |mw-gen2|: Backups are not necessary for the |mw-gen2| because the secret recovery phrase created during setup can be used to recover your private keys.

.. Warning::
   You are solely responsible for keeping your assets secure regardless of which wallet you choose to use. You must never share your private keys, PIN codes, passwords, recovery phrases, LEDGER devices, or mobile devices with anyone.

What are the requirements for each wallet?
==========================================

- |mw-gen1| or |mw-gen2|: you’ll need an iPhone running iOS 13 or later or an Android phone running Android 8 or later.

- |bw|: you'll need a device running one of the supported Chromium internet browsers (Chrome, Opera, Brave, Edge) with the |bw| extension installed.

- Desktop Wallet: you’ll need a computer running Windows, macOS, or Linux, and you’ll need a LEDGER NANO S or LEDGER NANO S PLUS. You’ll also have to connect to a node. You can use the default Virtual Hive node (concordiumwalletnode.com), get a third-party to run a node for you, or run a node yourself. If you run a node yourself, your computer must meet the hardware requirements for this.

Comparison
==========

The following table lists the major features of each wallet.

.. list-table::
   :widths: 10 10 10 10
   :header-rows: 1

   *  - Desktop Wallet
      - |mw-gen1|
      - |mw-gen2|
      - |bw|
   *  - Must run on a computer
      - Runs only on mobile phone
      - Runs only on mobile phone
      - Must run on a computer
   *  - Runs on MacOS, Windows, Linux
      - Runs on iOS 13 or later, Android 8 or later
      - Runs on iOS 15 or later, Android 8 or later
      - Runs on Chrome, Brave, Opera, Edge
   *  - Secured by password and a LEDGER device
      - Secured by password and biometrics
      - Secured by password and biometrics
      - Secured by password and secret recovery phrase
   *  - Encrypted
      - Encrypted
      - Encrypted
      - Encrypted
   *  - Backup file includes account names and addresses, identities, and the address book. LEDGER device is needed for a full recovery.
      - Backup file includes accounts, identities, address book, and private keys.
      - Backup is not necessary but secret recovery phrase is needed.
      - Backup is not necessary but secret recovery phrase is needed.
   *  - Private keys are stored on the LEDGER device that is secured by a PIN code and backed up by recovery phrase.
      - Private keys are stored in the wallet.
      - Private keys are stored in the wallet and backed up by a secret recovery phrase.
      - Private keys are stored in the wallet and secured by the passcode used to encrypt the wallet and backed up with the secret recovery phrase.
   *  - Creation and management of single signature accounts
      - Creation and management of single signature accounts
      - Creation and management of single signature accounts
      - Creation and management of single signature accounts
   *  - Creation and management of multi signature accounts
      - N/A
      - N/A
      - N/A
   *  - Creation of identities
      - Creation of identities
      - Creation of identities
      - Creation of identities
   *  - Creation and management of baker accounts
      - Creation and management of baker accounts. Rewards are visible in the wallet.
      - Creation and management of baker accounts. Rewards are visible in the wallet.
      - Creation and management of baker accounts. Rewards are visible in the wallet.
   *  - A node is required
      - A node is not needed unless baking
      - A node is not needed unless baking
      - A node is not needed unless baking
   *  - Cannot connect to dApps
      - Cannot connect to dApps
      - Can connect to dApps
      - Can connect to dApps
   *  - Cannot recover in other wallet types
      - Cannot recover in other wallet types
      - Can recover in |mw-gen2| and |bw|
      - Can reover in |bw| and |mw-gen2|

Next steps
==========

- If you want to use the Desktop Wallet, :ref:`download <downloads>` and install it on your computer, and then see :ref:`Overview of setting up the Desktop Wallet<overview-desktop>` for the next steps.

- If you want to use the |mw-gen1|, :ref:`download <downloads>` the app on your mobile phone, and then see :ref:`Setup <setup-mobile-wallet>` for the next steps.

- If you want to use the |mw-gen2|, :ref:`download <downloads>` the app on your mobile phone, and then see :ref:`Setup <setup-g2-mobile-wallet>` for the next steps.

- If you want to learn more about the LEDGER device, go to `LEDGER's website <https://www.ledger.com>`_.

- If you want to use the |bw|, :ref:`download <downloads>` the Google Chrome extension, and then see :ref:`Set up the Concordium Wallet for Chrome<setup-browser-wallet>` for the next steps.

.. toctree::
   :hidden:
   :maxdepth: 1

   ../concepts/concepts-transactions
