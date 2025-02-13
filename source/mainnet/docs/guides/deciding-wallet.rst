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

- Desktop Wallet: A computer running Windows, macOS, or Linux, and a LEDGER NANO S or LEDGER NANO S PLUS. You also have to connect to a node. You can use the default Virtual Hive node (concordiumwalletnode.com), get a third-party to run a node for you, or run a node yourself. If you run a node yourself, your computer must meet the hardware requirements for this.
- |bw|: A device running one of the supported Chromium internet browsers (Chrome, Opera, Brave, Edge) with the |bw| extension installed.
- |cryptox|: An iPhone running iOS 15 or later or an Android phone running Android 8 or later.

.. Warning::
   You are solely responsible for keeping your assets secure regardless of which wallet you choose to use.
   You must never share your private keys, PIN codes, passwords, recovery phrases, LEDGER devices, or mobile devices with anyone.

Comparison
==========

The following table lists the major features of each wallet.

.. list-table::
   :widths: 10 10 10
   :header-rows: 1

   *  - Desktop Wallet
      - |bw|
      - |cryptox|
   *  - Must run on a computer
      - Must run on a computer
      - Runs only on mobile phone
   *  - Runs on MacOS, Windows, Linux
      - Runs on Chrome, Brave, Opera, Edge
      - Runs on iOS 15 or later, Android 8 or later
   *  - Secured by password and a LEDGER device
      - Secured by password and seed phrase
      - Secured by password and biometrics
   *  - Encrypted
      - Encrypted
      - Encrypted
   *  - Backup file includes account names and addresses, identities, and the address book. LEDGER device is needed for a full recovery.
      - Backup is not necessary but seed phrase is needed.
      - Backup is not necessary but seed phrase is needed.
   *  - Private keys are stored on the LEDGER device that is secured by a PIN code and backed up by recovery phrase.
      - Private keys are stored in the wallet and secured by the passcode used to encrypt the wallet and backed up with the seed phrase.
      - Private keys are stored in the wallet and backed up by a seed phrase.
   *  - Creation and management of single signature and multi-signature accounts
      - Creation and management of single signature accounts only
      - Creation and management of single signature accounts only
   *  - Creation of identities
      - Creation of identities
      - Creation of identities
   *  - Creation and management of validator accounts
      - Creation and management of validator accounts. Rewards are visible in the wallet.
      - Creation and management of validator accounts. Rewards are visible in the wallet.
   *  - A node is required
      - A node is not needed unless validator
      - A node is not needed unless validator
   *  - Cannot connect to dApps
      - Can connect to dApps
      - Can connect to dApps
   *  - Cannot recover in other wallet types
      - Can recover in |bw|
      - Can recover in |bw| and |cryptox|.

Next steps
==========

- If you want to use the Desktop Wallet, :ref:`download <downloads-desktop-wallet>` and install it on your computer, and then see :ref:`Overview of setting up the Desktop Wallet<overview-desktop>` for the next steps.
- If you want to learn more about the LEDGER device, go to `LEDGER's website <https://www.ledger.com>`_.
- If you want to use the |bw|, :ref:`install <downloads-browser-wallet>` the Google Chrome extension, and then see :ref:`Set up the Concordium Wallet for Chrome<setup-browser-wallet>` for the next steps.
- If you want to use the |cryptox|, :ref:`install <downloads-cryptox>` on your mobile phone, and then see :ref:`Set up<setup-cryptox-wallet>` for the next steps.


