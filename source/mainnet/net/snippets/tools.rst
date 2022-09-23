.. include:: ../../variables.rst

Tools
=====

The Desktop Wallet
------------------

The Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts from your desktop and to create transactions such as sending CCD, adding a baker, and exporting and importing account information.

The |mw-gen1|
-----------------

The |mw-gen1| is a digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, bake and delegate, and to export and import your accounts and identities.

The |mw-gen2|
------------------

The |mw-gen2| is a second generation digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, bake and delegate, and to export and import your accounts and identities.

To learn more about the differences between the wallets, see :ref:`Deciding between the Desktop Wallet and the Mobile Wallet<choosing-wallet>`.

.. warning:: You can't exchange identities and accounts between the |mw-gen1| or |mw-gen2| and the Desktop Wallet. You can, however, send CCD from one wallet to another.

Command-line tool
-----------------

The Concordium distribution ships with a command-line tool named
:ref:`concordium-client<concordium-client>`. It is designed as a low-level interface to the
Concordium blockchain. It cannot be used to create identities, but it can
:ref:`import accounts<concordium-client-import-accounts-keys>` exported from the mobile wallets. Once an account has been
imported, the tool can be used to do CCD transfers from the account, as well as
send all other :ref:`transaction<transactions>` types supported by the Concordium blockchain.
