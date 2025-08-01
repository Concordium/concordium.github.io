
.. include:: ../variables.rst
.. _framework: https://github.com/pcapriotti/optparse-applicative#user-content-bash-zsh-and-fish-completions
.. _Discord: https://discord.com/invite/xWmQ5tp
.. _IP address: https://en.wikipedia.org/wiki/IP_address
.. _port number: https://en.wikipedia.org/wiki/Port_(computer_networking)


.. _concordium-client:

=================
Concordium Client
=================

The Concordium distribution ships with a CLI tool named ``concordium-client``.

By default ``concordium-client`` performs its queries and sends transactions
through a :ref:`local node<run-a-node>` on ``127.0.0.1`` and port ``20000`` for mainnet. If the node runs on a different machine or in a custom setup, the options ``--grpc-ip`` and ``--grpc-port`` can be used
to set the `IP address`_ and `port number`_ where the node is accessible. These flags are supported by all ``concordium-client`` commands. Note that as of version
5.1.1, the `port number`_ must be the port where the GRPC V2 interface is enabled, in contrast to previous versions which required the port number of the V1 API of the Concordium node.

.. note::

   This page describes the commands that are related with configuration of
   the client, but the rest of available commands will be discussed on the pages
   where the features that use them are documented. Some commands will perform
   :ref:`queries<testnet-query-node>` and others send :ref:`transactions<transactions-old>`.

.. Note::
   All transfers and transactions cost a fee. The fee is based on the set :ref:`NRG <transaction-fees>` for that transaction and the current exchange rate.
   The cost of transaction fees is stable in Euros, and therefore the price in CCD varies depending on the CCD to EUR exchange rate. The fee will always be deducted from the **Balance** of the account, so it is important to have some available CCDs to cover fees.
   You can see the fee in the transaction log.

.. Note::
   It is presumed that the reader has some basic knowledge about executing commands from a command line using Terminal, Power Shell, or similar tools.

Run Concordium Client
=====================

.. Note::
   ``concordium-client`` binary is available on the :ref:`Downloads<downloads>` page

Run Concordium Client from the command line. On macOS or Linux, access the command line with the Terminal application. On Windows, use the Power Shell or Command Prompt application. If you run it outside of the command line (e.g., by double clicking in Windows Explorer), then the Concordium Client will exit immediately without doing anything useful.

.. tab-set::

   .. tab-item:: macOS

      On macOS, you can run the Concordium Client from the command line by typing ``concordium-client``,
      since the installation adds the client to the PATH.

   .. tab-item:: Linux

      On Linux, the binary file includes the version and build number, so you can run it by typing ``./concordium-client_6.3.0-1`` from the directory where the file is located. Otherwise, you have to specify the full path to the executable file,
      or ensure that it is in a directory that is on the PATH.
      Note that after downloading the file, you may need to make it executable by running
      ``chmod +x concordium-client_6.3.0-1`` before you can run it.

      You can run ``concordium-client`` directly by ensuring the executable is placed in a directory included in the PATH environment variable. In most UNIX-like operating systems, including Linux, ``/usr/local/bin`` is typically part of the default PATH. To make ``concordium-client`` accessible from any location in the terminal, move the executable to ``/usr/local/bin`` using the following command:

      .. code-block:: console

         sudo mv concordium-client_6.3.0-1 /usr/local/bin/concordium-client

   .. tab-item:: Windows

      On Windows, to run Concordium Client you usually have to specify the full path to the executable file,
      unless you are running the command from the same directory where ``concordium-client`` is located.
      In that case, you can invoke the client using either:

      .. code-block:: console

         concordium-client

      or

      .. code-block:: console

         ./concordium-client

      depending on the terminal you are using (e.g. PowerShell, Git Bash, or Command Prompt).

      For example, if you extracted ``concordium-client_6.3.0-1.zip`` to
      ``C:\Users\User\Downloads\concordium-client_6.3.0-1``, you can run the client by typing:

      .. code-block:: console

         C:\Users\User\Downloads\concordium-client_6.3.0-1\concordium-client

      When running commands for the Concordium Client in the terminal, replace
      ``concordium-client`` with the full path to the executable file, as shown in the following example:

      .. code-block:: console

         C:\Users\User\Downloads\concordium-client_6.3.0-1\concordium-client config account import concordium-backup.export --name AccountA

      To run the client from any directory without specifying the full path, you can add the folder
      containing ``concordium-client`` to your **user environment variable** ``PATH``.

      .. Note::

         To import the backup file as shown in the example, you must be in the same directory where
         the ``concordium-backup.export`` file is saved. If not, you need to specify the full path to the file, for example:

         .. code-block:: console

            C:\Users\User\Downloads\concordium-client_6.3.0-1\concordium-client config account import C:\Users\User\Desktop\concordium-backup.export --name AccountA

Commands and help
=================

The commands supported by the tool are divided into two categories: the
high-level and low-level commands. The high-level commands provide a streamlined
and consistent user interface, automatically handling as much complexity as
possible. While most of the common operations are available via high-level
commands, the low-level commands provide a more direct interface to the node,
and some information and capabilities are not available in high-level commands.

The high-level commands are grouped by topic (``account``, ``validator``, ``config``
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
*  decryption key-pair used for decrypting the shielded balance (:ref:`deprecated<shielded-balance-feature-deprecation>`) of the
   account.

For all those keys, the private part of the key-pair is encrypted in the local
storage and a password is required each time the key is needed. The password is
chosen when the keys are either imported via ``config account import`` (see
below), or when keys are added to the account afterwards.

Read more about accounts :ref:`here<managing_accounts>`.

Location
--------

The configuration directory is mapped by Docker into a
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

.. _concordium-client-display:

Display contents
----------------

.. code-block:: console

   $concordium-client config show

Display the full contents of the persistent configuration. This will display the
stored keys that are used for signing transactions (under the ``Account Keys``
section) and the stored key for decrypting its shielded balance (:ref:`deprecated<shielded-balance-feature-deprecation>`) (under the
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

   $ concordium-client config account import FILE [--name NAME]

This command imports an account keys into your local configuration, allowing it to be used with the ``concordium-client`` CLI.

Importing accounts from |bw| or |cryptox|
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can export a single account as a JSON file from the |bw| or |cryptox|.
When importing the account, the ``--name`` parameter lets you assign a custom name for local use.
This name is stored in your local Concordium Client configuration and can be used to refer to the account in all subsequent ``concordium-client`` commands.

Importing accounts from |mw-gen1|
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The |mw-gen1| allows you to export all accounts at once using the **Backup** option.
This generates a file that contains all accounts available in the wallet.
When importing this file into your local configuration using ``concordium-client``,
you can use the ``--name`` parameter to import a specific account by its name.

If ``--name`` is omitted, **all accounts** in the backup file will be imported under their original names.

.. note::
   The |mw-gen1| is deprecated, does not receive updates and is not recommended for use.

Account aliases
~~~~~~~~~~~~~~~~~~~~~~~~

A detailed description and explanation of the term alias is available here :ref:`Account aliases<account-aliases>`

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

.. toctree::
   :hidden:
   :maxdepth: 1

   transactions
   query-node
   multi-sig
