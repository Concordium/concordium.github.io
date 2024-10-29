.. include:: ../../variables.rst
.. _transactions-overview:

===================
Transaction anatomy
===================


Tools
=====

The |cryptox|
------------------

The |cryptox| is a digital smartphone wallet with a simpler onboarding process that enables you to create and manage your Concordium identities and accounts, to create simple transactions, validate and delegate, add and manage tokens, connect to dApps, and to export and import your accounts and identities.

The Desktop Wallet
------------------

The Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts from your desktop and to create transactions such as sending CCD, adding a validator, and exporting and importing account information.

The |mw-gen2|
------------------

The |mw-gen2| is a second generation digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, validate and delegate, add and manage tokens, connect to dApps, and to export and import your accounts and identities.

The |bw|
----------------

The |bw| is a web wallet extension that enables you to create and manage your Concordium identities and accounts, to create simple transactions, validate and delegate, and to connect to dApps.

The |mw-gen1|
-----------------

The |mw-gen1| is a digital smartphone wallet that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, validate and delegate, and to export and import your accounts and identities. If you are a validator who runs a staking pool, it is not possible for pool owners to set the commissions in the |mw-gen1|; they are fixed at 10%. If you want to be able to adjust commissions, you must use the |cryptox|, |mw-gen2|, or |bw|. For information about the process, see :ref:`the delegation FAQ<wallet-migrate>`.

Command-line tool
-----------------

The Concordium distribution ships with a command-line tool named :ref:`concordium-client<concordium-client>`. It is designed as a low-level interface to the Concordium blockchain. It cannot be used to create identities, but it can :ref:`import accounts<concordium-client-import-accounts-keys>` exported from the other wallets. Once an account has been imported, the tool can be used to do CCD transfers from the account, as well as send all other :ref:`transaction<transactions>` types supported by the Concordium blockchain.

To learn more about the differences between the wallets, see :ref:`Deciding between the wallets<choosing-wallet>`.

.. Warning::
   It is not possible to exchange identities and accounts between the |mw-gen1| and the Desktop Wallet. If you try to import a file that has been exported from the |mw-gen1| into the Desktop Wallet, the import will fail, and likewise, if you try to import a file exported from the Desktop Wallet into the |mw-gen1|.

.. Warning::
   Because of the difference in the way private keys are handled between |mw-gen2| / |bw| and the first generation wallets (|mw-gen1| and Desktop Wallet), you cannot exchange identities and accounts between them.

   It is possible to exchange accounts and identities between the |cryptox|, |mw-gen2|, and the |bw|. Additionally, |mw-gen1| users can import backup files to |cryptox|.

.. |check|  unicode:: U+2713 .. CHECKMARK
