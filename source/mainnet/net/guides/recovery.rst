.. include:: ../../variables.rst
.. _backup-import-recover:

===================
Backup and recovery
===================

It can be necessary to recover your wallet, for example if you get a new computer or mobile device. It is important to know how you can recover your wallet on a device if necessary. There are differences between what the wallets require for recovery.

.. list-table::
   :widths: 10 10 10 10
   :header-rows: 1

   *  - Desktop Wallet
      - |mw-gen1|
      - |mw-gen2|
      - |bw|
   *  - Backup recommended; can recover without backup
      - Backup required
      - Secret recovery phrase requierd
      - Secret recovery phrase required
   *  - Backup file includes account names and addresses, identities, and the address book. LEDGER device is needed for a full recovery.
      - Backup file includes accounts, identities, address book, and private keys.
      - Backup is not necessary but secret recovery phrase is needed.
      - Backup is not necessary but secret recovery phrase is needed.
   *  - Private keys are stored on the LEDGER device that is secured by a PIN code and backed up by recovery phrase.
      - Private keys are stored in the wallet.
      - Private keys are stored in the wallet and backed up by a secret recovery phrase.
      - Private keys are stored in the wallet and secured by the passcode used to encrypt the wallet and backed up with the secret recovery phrase.
   *  - Cannot recover in other wallet types
      - Cannot recover in other wallet types
      - Can recover in |mw-gen2| and |bw|
      - Can recover in |bw| and |mw-gen2|

.. toctree::
   :hidden:
   :maxdepth: 1

   ../guides/export-import
   ../guides/recover-wallet
