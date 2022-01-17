.. _reset-data:

==============================
Reset desktop wallet data
==============================

All the local data of the desktop wallet is stored in a database in the applications user data folder.

The desktop wallet does not remove your user data when it is uninstalled, to avoid users losing their data, and to simplify the update process of the application.

We will here describe the process of deleting this user data, because it might be necessary to do, but you should make sure that you have a :ref:`backup <export-import>` with your data, before doing so.

.. warning:: Deleting the user data without a :ref:`backup <export-import>` will mean you can only recover what is recoverable with :ref:`account recovery <export-import>` (under "Recover accounts without a backup file"), which does not include your identities, address book, names or notes.

Deleting the user data
=========================================================

Delete the following folder, containing all the user data of the wallet:

.. tabs::

   .. tab:: Mainnet

            - MacOS: Users/<user>/Library/Application Support/Concordium Wallet

            - Linux: ~/.config/Concordium Wallet

            - Windows: Users/<user>/AppData/Roaming/Concordium Wallet


   .. tab:: Testnet

            - MacOS: Users/<user>/Library/Application Support/Concordium Wallet testnet

            - Linux: ~/.config/Concordium Wallet testnet

            - Windows: Users/<user>/AppData/Roaming/Concordium Wallet testnet


.. Note:: To quickly navigate to the roaming folder on Windows, enter :code:`%appdata%` in the file explorer's navigation bar.

When you next open the wallet, it will behave as a fresh installation, and prompt you to accept the terms and conditions and choose a new password.
