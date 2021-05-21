.. _framework: https://github.com/pcapriotti/optparse-applicative#user-content-bash-zsh-and-fish-completions
.. _Discord: https://discord.com/invite/xWmQ5tp
.. _IP address: https://en.wikipedia.org/wiki/IP_address
.. _port number: https://en.wikipedia.org/wiki/Port_(computer_networking)

.. _concordium_client:

=================
Concordium Client
=================

.. contents::
   :local:
   :backlinks: none


The Concordium distribution ships with a CLI tool named ``concordium-client``.

By default ``concordium-client`` performs its queries and sends transactions
through a :ref:`local node<run-a-node>`. If the node runs on a different machine
or in a custom setup, the options ``--grpc-ip`` and ``--grpc-port`` can be used
to set the `IP address`_ and `port number`_ that the node is accessible at. These
flags are supported by all ``concordium-client`` commands.

.. note::

   This page will describe the commands that are related with configuration of
   the client, but the rest of available commands will be discussed on the pages
   where the features that use them are documented. Some commands will perform
   :ref:`queries<testnet-query-node>` and others send :ref:`transactions<transactions>`.

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

*  for each credential holder of the account, one or more (up to 256) key-pairs for signing transactions. They are
   identified by the key index, which is an integer starting at 0.
*  decryption key-pair used for decrypting the shielded balance of the
   account.

For all those keys, the private part of the key-pair is encrypted in the local
storage and a password is required each time the key is needed. The password is
chosen when the keys are either imported via ``config account import`` (see
below), or when keys are added to the account afterwards.

Read more about accounts :ref:`here<managing_accounts>`.

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

See also the :ref:`Managing accounts<managing_accounts>` section.

Add named account
~~~~~~~~~~~~~~~~~

.. code-block:: console

   $concordium-client config account name ADDRESS [--name NAME]

Add an account address to persistent configuration, naming it. This name may now be used to refer to the account
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
      "cidx": {
          "kidx": {
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
        },
        ...
    }

Here, ``cidx`` denotes the credential index, and ``kidx`` denotes the key index.

Update keys of an account
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

   $concordium-client config account update-keys --account ACCOUNT --keys KEYS

Update a sign/verify key-pair on a specific account. The ``KEYS`` parameter must be
a JSON file that contains the keys that will be added in the same format as for adding keys.


Remove keys of an account
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

   $concordium-client config account remove-keys --account ACCOUNT --credential-index CREDENTIALINDEX KEYINDICES

Remove sign/verify key-pairs from a specific credential of an account. The ``CREDENTIALINDEX`` specifies the credential that the key pairs should be removed from, and the space-seperated list of key indices specify which of the key pairs that should be removed.

.. _concordium-client-import-accounts-keys:

Import accounts and keys from the Wallet apps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: console

   $concordium-client config account import FILE [--name NAME]

Import the keys of one or more accounts from a JSON file exported from the
:ref:`Concordium ID<concordium_id>` app.

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

