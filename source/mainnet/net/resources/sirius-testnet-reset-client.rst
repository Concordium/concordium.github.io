.. _sirius-testnet-reset-client:

====================================
Client migration after Testnet reset
====================================

Concordium client saves account keys and can save local names for accounts, modules, or
contracts in its configuration folder.

Since testnet has been reset, you might want to remove the data from the old
testnet.

Concordium client saves all of its configuration data in a single folder.
The default locations are:

- Linux: ``~/.config/concordium``
- macOS: ``~/.config/concordium``
- Windows: ``%APPDATA%/.config``

The remainder of this guide will use the placeholder ``<config-folder>`` to
represent the platform-specific folder location. So if the guide refers to the
folder ``<config-folder>/some-folder``, and you are using the default location on
Linux, then the exact folder meant is ``~/.config/concordium/some-folder``.


Accounts
========

Concordium client stores account keys and can store local names for the accounts.

Account keys
------------

Account keys are stored in the folder ``<config-folder>/accounts/``. Each
account has its own folder in which all related keys are stored.

As an example, if you want to delete the keys for the account
``3a3wqVawNFfDtxJ6sFPagLpM68AKfLHJwTHH1coT8syLgXQedh``
delete the folder
``<config-folder>/accounts/3a3wqVawNFfDtxJ6sFPagLpM68AKfLHJwTHH1coT8syLgXQedh``.

.. warning::

   Deleting accounts keys can cause irreversible loss of your tokens if the keys
   are not backed up. This is fine for testnet accounts, but make sure you do
   not delete keys for mainnet accounts.

The account likely had a name associated with it. See below for how to remove it.

Account names
-------------

Concordium client can store local names or aliases for accounts to simplify using
them. When importing accounts from the Mobile Wallet, the names defined in the
Mobile Wallet are also imported. So most accounts will have a local name.

The names are stored in the file:
``<config-folder>/accounts/names.map``

The file could look like the following:

.. code-block::

   MyMainnetAccount = 3B9bBFAyyh3ie1S5HcctrQv3Y4AEPTmrLdc2aBt5urhYh8n1qy
   MyTestnetAccount = 3mwfniHrUDUPsYDu8TmQvfQVppRoe6UYwJbxTWUMrDexFNigcP

In this example there are two accounts: one for a mainnet account and one for a
testnet account along with the account addresses that they refer to.
To remove the testnet account name, delete the whole line starting with
``MyTestnetAccount``.

The resulting file thus becomes:

.. code-block::

   MyMainnetAccount = 3B9bBFAyyh3ie1S5HcctrQv3Y4AEPTmrLdc2aBt5urhYh8n1qy

Should you want to remove *all* account names, then you can either delete the
file or leave the file empty.


Smart contracts
===============

Concordium client can store local names or aliases for module references and
smart contract instances to simplify using them. If you've set names for either,
then you can remove them as described below.

Module names
------------

The module names mappings exist in the file:
``<config-folder>/contracts/moduleNames.map``

The file format is JSON, and it could look like the following:

.. code-block:: json

   {
        "MyMainnetModule": "299d7a100851cb16670ba6ea3ec8415cb5d930a1e36c31399f54a1cd2de53c88",
        "MyTestnetModule": "55b5a3f964c016407f1762806e3e83a40a20aa4635318a93c4e9386d2a8f0ffa"
   }

In this example there are two names: one for a mainnet module and one for a
testnet module along with the module references they refer to.
To remove the testnet module name, delete the whole line starting with
``"MyTestnetModule"``. Since the file is JSON and has to remain valid, the
last name entry cannot end with a comma. So you must also remove the trailing comma on the
line starting with ``"MyMainnetModule"``.

The resulting file thus becomes:

.. code-block:: json

   {
        "MyMainnetModule": "299d7a100851cb16670ba6ea3ec8415cb5d930a1e36c31399f54a1cd2de53c88"
   }

Should you want to remove *all* module names, then you can either delete the
file or leave the content to be a pair of curly brackets: ``{}``.


Contract names
--------------

The contract names mappings exist in the file:
``<config-folder>/contracts/contractNames.map``

The file format is JSON, and it could look like the following:

.. code-block:: json

   {
        "MyMainnetContract": {
            "index": 61,
            "subindex": 0
        },
        "MyTestnetContract": {
            "index": 63,
            "subindex": 0
        }
   }

In this example there are two names: one for a mainnet contract and one for a
testnet contract along with the contract addresses they refer to.
To remove the testnet contract name, delete the entry starting with
``"MyTestnetContract"`` (including the contract address). Since the file is JSON and has to remain valid, the
last name entry cannot end with a comma. So you must also remove the trailing comma on the
entry starting with ``"MyMainnetContract"``.

The resulting file thus becomes:

.. code-block:: json

   {
        "MyMainnetContract": {
            "index": 61,
            "subindex": 0
        }
   }

Should you want to remove *all* contract names, then you can either delete the
file or leave the content to be a pair of curly brackets: ``{}``.
