.. _Discord: https://discord.com/invite/xWmQ5tp

.. _managing_accounts:

========
Accounts
========

.. contents::
   :local:
   :backlinks: none


An account on the Concordium blockchain is owned by one or more :ref:`credential holders<glossary-credential-holder>` and consists of two parts: The :ref:`on-chain<glossary-on-chain>` part, which is publicly visible and maintained by the bakers, and the :ref:`off-chain<glossary-off-chain>` part.

The on-chain part of the account consists of

- the credentials of the credential holders associated with the account
- public balance
- shielded balance
- account sequence number
- public keys of each credential to verify transaction signatures.

The off-chain part of the account contains

-  private keys of credential holders which are used to sign actions by the
   account (e.g., sending transfers, deploying smart contracts)
-  the identity an account is created from (this is needed for managing
   the account on the chain)
-  decryption keys used for :ref:`shielded transfers<glossary-shielded-transfer>`.

Concordium provides several ways of interacting with the on-chain account.
Off-chain parts of accounts can be transferred between different devices, and
the same account can be used from multiple devices at the same time.

Accounts on the chain are identified via an account address, which is a 32-byte
sequence. The address is usually displayed in Base58Check encoding with version
byte 1. An example of such an address is
``3ZFGxLtnUUSJGW2WqjMh1DDjxyq5rnytCwkSqxFTpsWSFdQnNn``.

In the tools described below the user will typically select an **account name**
which makes the account easier to identify. This is only a local alias, and is not used by the Concordium blockchain.
The name is resolved to an address before interactions with the node.

Account concepts
================

.. _managing-account-balances:

Account balances
----------------

Each account has two balances, the *public balance* which can be *seen* by every
member of the Concordium Network, and a :ref:`shielded
balance<glossary-shielded-balance>`. The shielded balance is only known to the owner of the account. It
can only be used in :ref:`shielded transfers<glossary-shielded-transfer>` to
other accounts.

The public balance of the account is used for payment of transaction fees,
baking, finalization, and transfers.

At any given time some of the public balance might be unavailable for use. This
can happen in two ways:

- the account has :ref:`staked<glossary-staked-amount>` some (or all) of the public
  balance in order to become a baker
- some of the public balance is locked up because it was received via a
  :ref:`transfer with schedule<glossary-transfer-with-schedule>`

The locked-up balance can only be staked, but it can not be used for payment of
transaction fees, nor can it be transferred to other accounts.

Here's an example that illustrates the relationship between the different balances (in this this explanation, transaction fees are ignored). Suppose that on January 1 the account starts
with 100 CCD on the public balance. None of it is locked-up or staked.

Then on January 2 the account receives 50 CCD via a :ref:`transfer with
schedule<glossary-transfer-with-schedule>` with the release scheduled for
December 31 of the same year. At this point, January 2, the account has 100 CCD
at disposal, the rest being locked. If the account tried to transfer more than
100 CCD the transaction would be rejected.

On January 3 the account becomes a baker with the initial stake of 125 CCD.
This is successful because the total public balance is 150CCD.
After this the account still has 25 CCD at disposal.


Account sequence number
-----------------------

Each account on the Concordium blockchain has a :ref:`sequence number<glossary-transaction-sequence-number>` and each
transaction signed by the account must have a sequence number. For a transaction
to be considered valid its sequence number must be the next available one for
the account. The sequence number is maintained by all the bakers in order to
validate transactions.

The sequence number can be looked up from an up to date node by running

.. code-block:: console

   $concordium-client account show [ACCOUNT]

where ``[ACCOUNT]`` is an optional argument that is either an address of an
account or the name of an account chosen when importing the account. If no
address is provided, ``concordium-client`` will use the account name
``default``.

The Mobile Wallet keeps track of the sequence number and assigns the correct one when sending transactions.
``concordium-client`` tracks the sequence number automatically, but it can
also be set manually via the option ``--nonce``.

Account aliases
---------------

In protocol versions 1 and 2 accounts and account addresses have a one-to-one relationship. In protocol version 3 each account has 16777216 addresses, namely a so-called canonical account address together with
matching account aliases. The canonical account address is derived when an account is created on chain. The other 16 million addresses with matching initial 29 bytes are referred to as account aliases for
the same account. Thus, accounts can be referred to by any address whose initial 29 bytes match.

This allows each account to have aliases for different uses and creates a kind of sub-account structure. An account owner can give out different aliases for different uses to keep track of transfers and assign them meaning.

Each account still has one total account balance. Hence, transfers to and from aliases of an account add to and subtract from that total account balance, respectively. Transfers between different aliases of the same account do not change the balance of the account, apart from cost. Finalization, block, and baking rewards are always received on the account's canonical address.

To generate aliases, enter:

.. code-block:: console

   $ concordium-client account show-alias 3ofwYFAkgV59BsHqzmiWyRmmKRB5ZzrPfbmx5nup24cE53jNX5 --alias 17

This generates the output:

.. code-block:: console

   The requested alias for address 3ofwYFAkgV59BsHqzmiWyRmmKRB5ZzrPfbmx5nup24cE53jNX5 is 3ofwYFAkgV59BsHqzmiWyRmmKRB5ZzrPfbmx5nuou5Z2vaESRt.

Tools
=====

The Desktop Wallet
------------------

The Desktop Wallet is a digital wallet that enables you to create and manage your Concordium identities, credentials, and accounts from your desktop and to create transactions such as sending CCD, adding a baker, and exporting and importing account information.

The Mobile Wallet
--------------------------------

The Mobile Wallet is a digital smartphone wallet, that enables you to create and manage your Concordium identities and accounts, to create simple and shielded transactions, and to export and import your accounts and identities.

To learn more about the differences between the two wallets, see :ref:`Deciding between the Desktop Wallet and the Mobile Wallet<choosing-wallet>`.

.. warning:: You can't exchange identities and accounts between the Mobile Wallet and the Desktop Wallet. You can, however, send CCD from one wallet to another.

Command-line tool
-----------------

The Concordium distribution ships with a command-line tool named
:ref:`concordium-client<concordium_client>`. It is designed as a low-level interface to the
Concordium blockchain. It cannot be used to create identities, but it can
:ref:`import accounts<concordium-client-import-accounts-keys>` exported from the mobile wallets. Once an account has been
imported, the tool can be used to do CCD transfers from the account, as well as
send all other :ref:`transaction<transactions>` types supported by the Concordium blockchain.
