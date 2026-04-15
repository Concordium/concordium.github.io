.. _reset-data:

==============================
Reset desktop wallet data
==============================

All the local data of the desktop wallet is stored in a database in the user's applications data folder.

The desktop wallet does not remove your user data when it is uninstalled; this avoids users losing their data, and simplifies the update process for the application.

Occasionally, it might be necessary to delete the user data. The following steps describe the process of deleting this user data. Make sure that you have a :ref:`backup <backup-import-recover>` with your data before starting this process.

.. warning:: Deleting the user data without a :ref:`backup <backup-import-recover>` will mean you can only recover what is recoverable with :ref:`account recovery <backup-import-recover>` (under "Recover accounts without a backup file"), which does not include your identities, address book, names or notes.

Delete the user data
=========================================================

Delete the following folder containing all the user data of the wallet:

.. dropdown:: Mainnet

   - macOS: Users/<user>/Library/Application Support/Concordium Wallet

   - Linux: ~/.config/Concordium Wallet

   - Windows: Users/<user>/AppData/Roaming/Concordium Wallet


.. dropdown:: Testnet

   - macOS: Users/<user>/Library/Application Support/Concordium Wallet testnet

   - Linux: ~/.config/Concordium Wallet testnet

   - Windows: Users/<user>/AppData/Roaming/Concordium Wallet testnet


.. Note:: To quickly navigate to the roaming folder on Windows, enter :code:`%appdata%` in the file explorer's navigation bar.

When you open the wallet for the first time after resetting the user data, it will behave as a fresh installation, and prompt you to accept the terms and conditions and choose a new password.
