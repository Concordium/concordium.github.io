.. include:: ../../variables.rst
.. _choosing-wallet:

============================
Deciding between the wallets
============================


Why you need a wallet
=====================

You need a Concordium :term:`wallet` to interact with the Concordium blockchain and manage your CCD tokens. Here are the currently available wallets:

- Desktop Wallet: Offers the highest security but requires a LEDGER device.
- |bw|: Accessible from any device with a web browser supporting Chrome extensions. Ideal for standard transactions, great for developers and dApp users.
- |cryptox|: The latest mobile wallet, user-friendly with both seed phrase and file-based recovery and dApp connectivity.



The wallets are developed by Concordium Software and can only be used to hold :term:`CCD`,
the native token of the Concordium blockchain, and :ref:`CIS-2 tokens<tokens>`.
You can't use these wallets for any other crypto currencies.


Choosing the Right Wallet
=========================

Consider these factors when choosing a wallet:

- Security: Desktop Wallet offers the most security with its LEDGER device support.
- Accessibility: |bw| and |cryptox| are more accessible for everyday use.
- Device: Choose a wallet compatible with your device (computer or mobile).
- Features: |cryptox| offers the most features, including seed phrase or key file recovery and dApp connectivity.

Portability limits between wallets
=========================================================

- Identities and accounts cannot be directly transferred between Desktop Wallet and other wallets.
- |cryptox| can import accounts from other Concordium wallets via seed phrase of backup file.
- You can always send CCD tokens between any wallets.

Wallet Backups
==============

- Desktop Wallet: Requires exporting data and keeping the LEDGER recovery phrase safe.
- |bw| and |cryptox|: Securely store the seed phrase generated during setup.

What are the requirements for each wallet?
==========================================

- Desktop Wallet: A computer running Windows, macOS, or Linux, and a LEDGER NANO S PLUS.
- |bw|: A device running one of the supported Chromium internet browsers (Chrome, Opera, Brave, Edge) with the |bw| extension installed.
- |cryptox|: An iPhone running iOS 15 or later or an Android phone running Android 8 or later.

.. Warning::
   You are solely responsible for keeping your assets secure regardless of which wallet you choose to use.
   You must never share your private keys, PIN codes, passwords, recovery phrases, LEDGER devices, or mobile devices with anyone.

Comparison
==========

The following table lists the differences between wallets.

.. list-table::
   :widths: 10 10 10
   :header-rows: 1

   *  - Desktop Wallet
      - |bw|
      - |cryptox|
   *  - Must run on a computer
      - Must run on a computer
      - Runs only on mobile phone
   *  - Runs on macOS, Windows, Linux
      - Runs on Chrome, Brave, Opera, Edge
      - Runs on iOS 15 or later, Android 8 or later
   *  - Secured by password and a LEDGER device
      - Secured by password and seed phrase
      - Secured by passcode or password as well as biometrics
   *  - Backup file includes account names and addresses, identities, and the address book. LEDGER device is needed for recovery
      - Seed phrase recovers accounts and identities
      - Seed phrase recovers accounts and identities. Legacy backup file also includes address book, account and identity names
   *  - Private keys are stored on the LEDGER device that is secured by a PIN code and backed up by recovery phrase
      - Private keys are stored in the wallet and secured by the passcode used to encrypt the wallet and backed up with the seed phrase
      - Private keys are stored in the wallet and secured by password or passcode used to encrypt the wallet and backed up with the seed phrase
   *  - Creation and management of single signature and multi-signature accounts
      - Creation and management of single signature accounts only
      - Creation and management of single signature accounts only
   *  - Password is required to unlock the wallet. LEDGER device is required to create new accounts, identities and send transactions
      - Password is required to unlock the wallet
      - Password or passcode or biometrics is required to unlock the wallet, and later to create new accounts, identities and send transactions
   *  - Cannot connect to dApps
      - Can connect to dApps
      - Can connect to dApps
   *  - Can only hold CCD
      - Can hold CCD and CIS-2 tokens
      - Can hold CCD and CIS-2 tokens
   *  - Backup is not compatible with other wallets
      - Seed phrase backup can be used in |bw| and |cryptox|
      - Seed phrase backup can be ised in |bw| and |cryptox|. Legacy backup file can only be used in |cryptox|
   *  - Doesn't have transaction notifications
      - Doesn't have transaction notifications
      - Has push notifications for transactions

Next steps
==========

- If you want to use the Desktop Wallet, :ref:`download <downloads-desktop-wallet>` and install it on your computer, and then see :ref:`Overview of setting up the Desktop Wallet<overview-desktop>` for the next steps.
- If you want to learn more about the LEDGER device, go to `LEDGER's website <https://www.ledger.com>`_.
- If you want to use the |bw|, :ref:`install <downloads-browser-wallet>` the Google Chrome extension, and then see :ref:`Set up the Concordium Wallet for Chrome<setup-browser-wallet>` for the next steps.
- If you want to use the |cryptox|, :ref:`install <downloads-cryptox>` on your mobile phone, and then see :ref:`Set up<setup-concordium-wallet>` for the next steps.


