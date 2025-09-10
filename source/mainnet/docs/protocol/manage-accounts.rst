.. _Discord: https://discord.com/invite/xWmQ5tp
.. include:: ../../variables.rst
.. _managing_accounts:

========
Accounts
========

Accounts and :term:`identities<identity>` are strongly linked on the Concordium Platform. To be able to hold, send, or receive :term:`CCD` or become a :term:`validator` on the Concordium blockchain, you need an account and an identity. This is regardless of whether you are using the one of the Concordium wallets or :term:`Concordium Client` for your transactions.

You must have a verified identity and a user identity certificate issued by an authorized :term:`identity provider` to create accounts on the Concordium platform. For more information about identities, see :ref:`Identitity framework on Concordium<reference-identity>`.

About accounts
==============

An account on the Concordium blockchain is owned by one or more :term:`credential holders<credential holder>` and consists of two parts: The :term:`on-chain` part, which is publicly visible and maintained by the :term:`validators<validator>`, and the :term:`off-chain` part.

The on-chain part of the account consists of:

- the credentials of the credential holders associated with the account
- public balance
- account sequence number
- public keys of each credential to verify transaction signatures.

The off-chain part of the account contains:

-  private keys of credential holders which are used to sign actions by the
   account (e.g., sending transfers or deploying smart contracts)
-  the identity an account is created from (this is needed for managing
   the account on the chain)

Concordium provides several ways of interacting with the on-chain account.
The same account can be used from multiple devices at the same time, and off-chain parts of accounts can be transferred between different devices, however not between Desktop Wallet and other wallet types.

Accounts on the chain are identified via an account address, which is a 32-byte
sequence. The address is usually displayed in Base58Check encoding with version
byte 1. An example of such an address is
``3ZFGxLtnUUSJGW2WqjMh1DDjxyq5rnytCwkSqxFTpsWSFdQnNn``.

In the :ref:`tools<tools>` described below the user will typically select an **account name**
which makes the account easier to identify. This is only a local alias, and is not used by the Concordium blockchain.
The name is resolved to an address before interactions with the :term:`node`.



.. toctree::
   :hidden:
   :maxdepth: 1

   account-creation
   account-concepts

