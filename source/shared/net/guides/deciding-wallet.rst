
.. _choosing-wallet:

=========================================================
Deciding between the Desktop Wallet and the Mobile Wallet
=========================================================

.. contents::
   :local:
   :backlinks: none

You need a wallet to interact with the Concordium blockchain and to manage your GTU. Currently, there are two wallets available: the Concordium Desktop Wallet and the Concordium Mobile Wallet.

While you can send GTU from one wallet to the other, you can’t import identities and accounts from the Mobile Wallet into the Desktop Wallet. Conversely, you can’t import identities and accounts from the Desktop Wallet into the Mobile Wallet. It’s therefore important that you choose between the wallets before you start creating identities and accounts. This topic describes main differences between the two to help you make an informed decision.

Both the Concordium Desktop Wallet and the Concordium Mobile Wallet are developed by Concordium Software and can only be used to hold GTU, the native token of the Concordium blockchain.

.. Warning::
   You are solely responsible for keeping your assets secure    regardless of which wallet you choose to use. You must never share your private keys, PIN codes, passwords, recovery phrases, Ledgers, or mobile devices with anyone.

Which wallet is best for you?
=============================

If you want extra security in the form of a Ledger hardware device, want to create multi-signature transactions, and want to be able to create a baker account, the Desktop Wallet is the right choice.
If you want to be able to access your accounts on the go, don’t want to run a node, don’t want to depend on a Ledger hardware device, and only need to create standard (single signature) transactions, the Mobile Wallet is the right choice.

What are the requirements for each wallet?
==========================================

**Mobile Wallet**: you’ll need an iPhone running iOS 13 or later or an Android phone running Android 8 or later.

**Desktop Wallet**: you’ll need a computer running Windows, macOS or Linux, and you’ll need a Ledger Nano S. You’ll also have to run a node, and your computer must meet the hardware requirements for this. Go to the :ref:`downloads <downloads>` page for more information.

Why do I need a Ledger hardware device to use the Desktop Wallet?
==================================================================

The Ledger provides an extra layer of security. The private key is stored offline on the Ledger and never leaves the device, and you can store the Ledger in a different place than the wallet.  However, this also means that you need the ledger to sign the transactions you create in the Desktop Wallet.

.. insert link to topic Learn more about the Ledger, when created

Comparison
==========

The following table lists the major features of each wallet.

.. list-table::
   :widths: 20 20 20
   :header-rows: 1

   * - Features
     - Desktop Wallet
     - Mobile Wallet
   * - **Secured by password and biometrics**
     - Password
     - Password and biometrics
   * - **Encrypted**
     - Yes
     - Yes
   * - **Create backup of identities and accounts**
     - Yes. The backup includes accounts, identities, and the address book.
     - Yes. The backup includes accounts, identities, address book, and account keys.
   * - **Storage of private keys**
     - Stored on the Ledger that is secured by a PIN code and backed up by recovery phrase.
     - Stored in the wallet.
   * - **Create and manage single signature accounts**
     - Yes
     - Yes
   * - **Create and manage multi signature accounts**
     - Yes
     - Yes
   * - **Create identities**
     - Yes
     - Yes
   * - **Create and manage baker accounts**
     - Yes
     - The Concordium Client can be used to manage baker accounts. Rewards are visible in the wallet.
   * - **Run a node**
     - Requirement
     - Not needed
