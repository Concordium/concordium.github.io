.. _Commands and help: #commands-and-help
.. _Configuration: #configuration
.. _Location: #location
.. _Initialization: #initialization
.. _Display contents: #display-contents
.. _Add accounts and keys: #add-accounts-and-keys
.. _Add account: #add-account
.. _Add key to an account: #add-key-to-an-account
.. _Import accounts and keys from the Wallet apps: #import-accounts-and-keys-from-the-wallet-apps
.. _Shell completion: #shell-completion
.. _local node: /testnet/docs/quickstart-node
.. _queries: /testnet/docs/queries
.. _transactions: /testnet/docs/transactions
.. _Concordium ID: /testnet/docs/downloads#concordium-id
.. _framework: https://github.com/pcapriotti/optparse-applicative#bash-zsh-and-fish-completions
.. _Discord: https://discord.com/invite/xWmQ5tp
.. _here: /testnet/docs/managing-accounts
.. _Managing accounts: /testnet/docs/managing-accounts

=================
Concordium Client
=================

.. contents::
   :local:
   :backlinks: none


The Concordium distribution ships with a CLI tool named ``concordium-client``.

In the current testnet setup, this client requires a `local node`_
(``concordium-node``) to be running. The client will perform its queries and
send transactions through that node.

Due to directory mapping between the Docker container and the host machine, the
tool must be currently invoked from within the following system-dependent
directory:

-  Linux/macOS: ``$HOME/Documents/concordium-software``
-  Windows: {FOLDERID_Documents}\\concordium-software
   (``C:\\Users\\%USERNAME%\\Documents\\concordium-software`` in a
   standard setup)

**This page will describe the commands that are related with configuration of
the client, but the rest of available commands will be discussed on the pages
where the features that use them are documented. Some commands will perform**\
`queries`_\ **and others send**\ `transactions`_\ **.**

Commands and help
=================

The commands supported by the tool are divided into two categories: the
high-level and low-level commands. The high-level commands provide a streamlined
and consistent user interface, automatically handling as much complexity as
possible. While most of the common operations are available via high-level
commands, the low-level commands provide a more direct interface to the node,
and some information and capabilities are not available in high-level commands.

The high-level commands are grouped by topic (``account``, ``baker``, ``config``
etc.). The low-level commands are grouped in the ``raw`` category and have
CamelCase names.

Invoke ``concordium-client --help`` to see the full list of topics. Include the
topic to see the available commands within that topic:

.. code-block:: console

   $concordium-client config --help
   Usage: concordium-client config COMMAND
     Commands for inspecting and changing local configuration.

   Available options:
     -h,--help                Show this help text

   Available commands:
     init                     Initialize configuration.
     show                     Show configuration.
     account                  Commands for inspecting and changing account-specific configuration.

Give the full command to see available options related to that command:

.. code-block:: console

   $concordium-client config account import --help
   Usage: concordium-client config account import FILE [--name NAME]
     Import an account to persistent config.

   Available options:
     FILE                     Account file exported from the wallet.
     --name NAME              Name of the account.
     -h,--help                Show this help text

Configuration
=============

You can store accounts and their keys on disk to avoid having to pass them as
command-line options.

Accounts may also be associated with names which may then be used in place of
the address throughout the client's commands. This is an entirely local feature
for convenience and may be done for any account — it does not require possession
of the account's keys.

Each account has

-  one or more (up to 256) key-pairs for signing transactions. They are
   identified by the key index, which is an integer starting at 0.
-  decryption key-pair used for decrypting the shielded balance of the
   account.

For all those keys, the private part of the key-pair is encrypted in the local
storage and a password is required each time the key is needed. The password is
chosen when the keys are either imported via ``config account import`` (see
below), or when keys are added to the account afterwards.

Read more about accounts `here`_.

Location
--------

On the testnet, the configuration directory is mapped by Docker into a
system-dependent directory:

-  Linux/macOS: ``$HOME/.config/concordium``
-  Windows: {FOLDERID_RoamingAppData}\\concordium
   (``C:\\Users\\%USERNAME%\\AppData\\Roaming\\concordium`` in a
   standard setup)


Initialization
--------------

The command ``concordium-client config init`` initializes the configuration
structure. The distribution does this automatically, so it should not be
necessary to use this command. If the configuration structure becomes corrupt
for some reason, it may also be able to repair it.

Display contents
----------------

.. code-block:: console

   $concordium-client config show

Display the full contents of the persistent configuration. This will display the
stored keys that are used for signing transactions (under the ``Account Keys``
section) and the stored key for sending encrypted transfers (under the
``Encryption secret key`` section) when they are present.

Example:
~~~~~~~~

.. code-block:: console

   $concordium-client config show
   Base configuration:
   - Verbose:            no
   - Account config dir: /var/lib/concordium/config/accounts
   - Account name map:
       default -> 3urFJGp9AaU62fQ3DEfCczqJwVt9V3F1gjE5PPBaYgqBD6rqPB

   Account keys:
   - '3urFJGp9AaU62fQ3DEfCczqJwVt9V3F1gjE5PPBaYgqBD6rqPB'
   {
       "0": {
           "encryptedSignKey": {
               "metadata": {
                   "encryptionMethod": "AES-256",
                   "iterations": 100000,
                   "salt": "tRiBas12Z1Y7dydTTdsHbw==",
                   "initializationVector": "5hPahE0+YXzNs+pRJjkzgg==",
                   "keyDerivationMethod": "PBKDF2WithHmacSHA256"
               },
               "cipherText": "h8AXOHt9jHINQp/GWWQrWPiXP5k9swBHQBJmcsSNFcBsie8PjuG7XPjrOQbKzZOUm7+ad1jvsMRLR58hqxKPbRUCcM8+j3O1pWtbycSItE8="
           },
           "verifyKey": "7c50c09a5e5537b84e83964a5522a99731e4f7f45c6527ea753970f415e6671b",
           "schemeId": "Ed25519"
       },
       "1": {
           "encryptedSignKey": {
               "metadata": {
                   "encryptionMethod": "AES-256",
                   "iterations": 100000,
                   "salt": "Q8lU7AHxDrZ6mvKbS4lFmw==",
                   "initializationVector": "qR7n0N1FiIlNbzsmYWLYHg==",
                   "keyDerivationMethod": "PBKDF2WithHmacSHA256"
               },
               "cipherText": "5IVYAOAFWv6sCSQVXVE1/UfKKqC+Ati8DyV9MtFG1KqYQ6KG8/T9E5ZO05ORrm+ltsXZ6b273yDUnHCWtoErNzmKlqGRS7cIO/rwtDEg3nQ="
           },
           "verifyKey": "50ec0b507164f586e7410c09c20dac0666536136396766de06d29b07b6b61fa3",
           "schemeId": "Ed25519"
       },
       ...
   }
   Encryption secret keys:
   - '3urFJGp9AaU62fQ3DEfCczqJwVt9V3F1gjE5PPBaYgqBD6rqPB': {
       "metadata": {
           "encryptionMethod": "AES-256",
           "iterations": 100000,
           "salt": "w7pmsDi1K4bWf+zkLCuzVw==",
           "initializationVector": "EXhd7ctFeqKvaA0P/oB8wA==",
           "keyDerivationMethod": "PBKDF2WithHmacSHA256"
       },
       "cipherText": "pYvIywCAMLhvag1EJmGVuVezGsNvYn24zBnB6TCTkwEwOH50AOrx8NAZnVuQteZMQ7k7Kd7a1RorSxIQI1H/WX+Usi8f3VLnzdZFJmbk4Cme+dcgAbI+wWr0hisgrCDl"
   }

Note that listed location of the configuration is the path inside the Docker
container.

Add accounts and keys
---------------------

See also the `Managing accounts`_ section.

Add account
~~~~~~~~~~~

.. code-block:: console

   $concordium-client config account add ADDRESS [--name NAME]

Add account address to persistent configuration, optionally naming the account.

If a name was provided, this name may now be used to refer to the account
throughout the client.

This doesn't add any private information to the stored account, so it can be
considered as just creating an alias for an address.

Add key to an account
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

   $concordium-client config account add-keys --account ACCOUNT --keys KEYS

Add a sign/verify key-pair to a specific account. The ``KEYS`` parameter must be
a JSON file that contains the keys that will be added in the same format as they
were shown above when printing the configuration:

.. code-block:: js

   {
      "idx": {
        "encryptedSignKey": {
          "metadata": {
            "encryptionMethod": "AES-256",
            "iterations": ...,
            "salt": ...,
            "initializationVector": ...,
            "keyDerivationMethod": "PBKDF2WithHmacSHA256"
          },
          "cipherText": ...
        },
        "verifyKey": ...,
        "schemeId": "Ed25519"
      },
      ...
    }


Import accounts and keys from the Wallet apps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

   $concordium-client config account import FILE [--name NAME]``

Import the keys of one or more accounts from a JSON file exported from the
`Concordium ID`_ app.

The ``--name`` option selects which account to import and imports it with this
name. If it's omitted, all accounts in the file are imported under their
existing names.

Shell completion
================

The ``concordium-client`` has support for generating completion functions for
bash, zsh, and fish.

For bash, the command for installing the completions is:

.. code-block:: console

   $source <(concordium-client --bash-completion-script `which concordium-client`)

Replace ``--bash-completion-script`` by ``--zsh-completion-script`` or
``--fish-completion-script`` for zsh and fish, respectively.

See the documentation of the `framework`_ used to implement the command
structure of ``concordium-client`` for more details.

Support & Feedback
==================

If you run into any issues or have suggestions, post your question or feedback
on `Discord`_, or contact us at testnet@concordium.com.

